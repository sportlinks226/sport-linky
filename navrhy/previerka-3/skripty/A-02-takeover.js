// A-02: prevzatie statickej stránky appkou (TAKEOVER) — čas, bliknutie, zhoda obsahu pred/po
// Statickú verziu získame tak, že sa predstavíme ako Googlebot (TAKEOVER vtedy appku nepreberá).
const L = require('./A-lib');
const fs = require('fs');
const site = process.env.SITE || 'sk';
const BASE = site === 'en' ? L.EN : L.SK;
const ROOT = L.BUILD + '/site-' + site;
const R = { site, pages: [] };
function pick(n, seed) {
  const xml = fs.readFileSync(ROOT + '/sitemap.xml', 'utf8');
  const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname).filter((p) => p !== '/');
  let s = seed; const rnd = () => { s = (s * 9301 + 49297) % 233280; return s / 233280; };
  const out = new Set(); while (out.size < n) out.add(urls[Math.floor(rnd() * urls.length)]);
  return [...out];
}
async function staticView(page) {
  return page.evaluate(() => ({
    title: document.title,
    desc: (document.querySelector('meta[name=description]') || {}).content,
    canonical: (document.querySelector('link[rel=canonical]') || {}).href,
    h1: (document.querySelector('h1') || {}).innerText,
    folders: [...document.querySelectorAll('.grid a.card[href]:not([href^="http"]) .nm')].map((e) => e.innerText.trim()),
    links: [...document.querySelectorAll('.grid a.card[href^="http"]')].map((a) => ({ n: a.querySelector('.nm').innerText.trim(), u: a.getAttribute('href') })),
    akt: [...document.querySelectorAll('#akt a')].map((a) => a.innerText.trim()),
    promo: !!document.querySelector('.promo'),
    appbtn: getComputedStyle(document.getElementById('appbtn')).display,
    isApp: !!document.getElementById('srch'),
  }));
}
async function appView(page) {
  return page.evaluate(() => ({
    title: document.title,
    desc: (document.querySelector('meta[name=description]') || {}).content,
    canonical: (document.querySelector('link[rel=canonical]') || {}).href,
    h1: (document.querySelector('#breadcrumb .bc-h') || {}).innerText,
    folders: [...document.querySelectorAll('#main a.card-folder .cf-name, #main a.card-root .c-name')].map((e) => e.innerText.trim()),
    links: [...document.querySelectorAll('#main .card-link > a[href^="http"]')].map((a) => ({ n: a.querySelector('.cl-name').innerText.trim(), u: a.getAttribute('href') })),
    akt: [...document.querySelectorAll('#aktualneScroll a')].map((a) => a.innerText.trim()),
    promo: !!document.querySelector('#main .promo'),
    partial: !!DB._partial,
    curId,
  }));
}
(async () => {
  const browser = await L.launch();
  const pages = pick(10, site === 'en' ? 7 : 42);
  for (const p of pages) {
    // --- statická verzia (Googlebot) ---
    const gctx = await browser.newContext({ userAgent: 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)', viewport: { width: 1366, height: 768 } });
    await gctx.route(/.*/, (r) => (L.EXT_BLOCK.test(r.request().url()) ? r.abort() : r.continue()));
    const gp = await gctx.newPage();
    await gp.goto(BASE + p, { waitUntil: 'load' }); await gp.waitForTimeout(800);
    const st = await staticView(gp);
    await gctx.close();
    // --- návštevník (prevzatie) ---
    const ctx = await L.newContext(browser, { viewport: { width: 1366, height: 768 } });
    const page = await ctx.newPage(); const log = L.watch(page);
    const ev = [];
    const t0 = Date.now();
    page.on('domcontentloaded', () => ev.push(['domcontentloaded', Date.now() - t0]));
    page.on('load', () => ev.push(['load', Date.now() - t0]));
    page.on('framenavigated', (f) => { if (f === page.mainFrame()) ev.push(['framenavigated', Date.now() - t0, f.url().slice(-40)]); });
    await page.goto(BASE + p, { waitUntil: 'commit' });
    // sleduj, kedy sa objaví appka (#srch) a kedy zmizne statický obsah (.wrap)
    const tApp = await page.evaluate(() => new Promise((res) => {
      const t = performance.now(); const h = setInterval(() => { if (document.getElementById('srch')) { clearInterval(h); res(Math.round(performance.now() - t)); } if (performance.now() - t > 10000) { clearInterval(h); res(-1); } }, 5);
    })).catch(() => -2);
    const tAppAbs = Date.now() - t0;
    const firstPaint = await page.evaluate(() => { try { return performance.getEntriesByType('paint').map((e) => e.name + '=' + Math.round(e.startTime)).join(','); } catch (e) { return ''; } });
    await L.waitApp(page); const tRender = Date.now() - t0;
    const partialView = await appView(page).catch(() => null);
    await L.waitFull(page); const tFull = Date.now() - t0;
    await page.waitForTimeout(400);
    const ap = await appView(page);
    const reqs = log.requests.filter((r) => /index\.html|data\.json|version\.txt|aktualne\.json/.test(r.url)).map((r) => r.url.replace(BASE, ''));
    const same = (a, b) => JSON.stringify(a) === JSON.stringify(b);
    R.pages.push({
      page: p, cas: { appkaMs: tApp, appkaAbsMs: tAppAbs, vykresleneMs: tRender, celeDataMs: tFull, firstPaint, udalosti: ev },
      zhoda: { title: st.title === ap.title, desc: st.desc === ap.desc, canonical: st.canonical === ap.canonical, h1: (st.h1 || '').replace(/\s+/g, ' ').trim() === (ap.h1 || '').replace(/\s+/g, ' ').trim(),
        folders: same(st.folders, ap.folders), links: same(st.links.map((x) => x.n), ap.links.map((x) => x.n)), linkUrls: same(st.links.map((x) => x.u), ap.links.map((x) => x.u)), akt: same(st.akt, ap.akt.map((t) => t.replace(/^NEW\n?/, ''))), promo: st.promo === ap.promo,
        balikVsCele: partialView && same(partialView.links.map((x) => x.n), ap.links.map((x) => x.n)) && same(partialView.folders, ap.folders) },
      staticke: { title: st.title, h1: st.h1, folders: st.folders.length, links: st.links.length, akt: st.akt, appbtn: st.appbtn, isApp: st.isApp },
      appka: { title: ap.title, h1: ap.h1, folders: ap.folders.length, links: ap.links.length, akt: ap.akt, partialPri1: partialView && partialView.partial },
      rozdiely: { folders: st.folders.filter((x) => !ap.folders.includes(x)).concat(ap.folders.filter((x) => !st.folders.includes(x))).slice(0, 10), links: st.links.map((x) => x.n).filter((x) => !ap.links.map((y) => y.n).includes(x)).concat(ap.links.map((y) => y.n).filter((x) => !st.links.map((y) => y.n).includes(x))).slice(0, 10), title: st.title !== ap.title ? [st.title, ap.title] : null, desc: st.desc !== ap.desc ? [st.desc, ap.desc] : null },
      poziadavky: reqs, errors: log.errors.map((e) => e.msg), csp: log.csp.length,
    });
    await ctx.close();
  }
  // bliknutie: snímky po 30/80/150/300 ms od commit-u na jednej hlbokej stránke (mobil, pomalá sieť nie — len poradie)
  {
    const ctx = await L.newContext(browser, { device: 'Pixel 5' });
    const page = await ctx.newPage();
    const p = pages[0];
    await page.goto(BASE + p, { waitUntil: 'commit' });
    const shots = [];
    for (const d of [20, 60, 120, 250, 600, 1500]) {
      await page.waitForTimeout(d - (shots.length ? shots[shots.length - 1].d : 0));
      const st = await page.evaluate(() => ({ app: !!document.getElementById('srch'), static: !!document.querySelector('.wrap .crumbs'), main: (document.getElementById('main') || {}).children ? document.getElementById('main').children.length : -1, ready: document.readyState, scroll: scrollY }));
      await page.screenshot({ path: L.SNIM + '/A-02-blik-' + site + '-' + d + 'ms.png' });
      shots.push({ d, ...st });
    }
    R.bliknutie = { page: p, shots };
    await ctx.close();
  }
  await browser.close();
  console.log(JSON.stringify(R, null, 1));
  L.out(R, 'A-02-takeover-' + site + '.out.json');
})().catch((e) => { console.error('CHYBA', e); process.exit(1); });
