// A-08: konzola — chyby/varovania na 30 náhodných stránkach + domov + hľadanie + EN (priamy príchod aj preklik)
const L = require('./A-lib');
const fs = require('fs');
const R = { strany: [], suhrn: {} };
function pick(root, n, seed) {
  const xml = fs.readFileSync(root + '/sitemap.xml', 'utf8');
  const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname).filter((p) => p !== '/');
  let s = seed; const rnd = () => { s = (s * 9301 + 49297) % 233280; return s / 233280; };
  const out = new Set(); while (out.size < n) out.add(urls[Math.floor(rnd() * urls.length)]);
  return [...out];
}
(async () => {
  const browser = await L.launch();
  const sk = pick(L.BUILD + '/site-sk', 30, 99).map((p) => [L.SK, p]);
  const en = pick(L.BUILD + '/site-en', 8, 5).map((p) => [L.EN, p]);
  const all = [[L.SK, '/'], [L.EN, '/'], ...sk, ...en, [L.SK, '/aktualne/'], [L.EN, '/live-this-week/'], [L.SK, '/tipovanie/']];
  const agg = {};
  for (const [base, p] of all) {
    const ctx = await L.newContext(browser, { viewport: { width: 1366, height: 768 } });
    const page = await ctx.newPage(); const log = L.watch(page);
    await page.goto(base + p, { waitUntil: 'domcontentloaded' }).catch(() => {});
    await L.waitApp(page); await L.waitFull(page); await page.waitForTimeout(500);
    // preklik do prvej podsekcie + hľadanie
    const sub = await page.$('#main a.card-folder, #main a.card-root');
    if (sub) { await sub.click().catch(() => {}); await page.waitForTimeout(300); }
    await page.fill('#srch', 'ko').catch(() => {}); await page.waitForTimeout(400);
    await page.fill('#srch', '').catch(() => {}); await page.waitForTimeout(200);
    const msgs = log.console.filter((c) => !/ERR_BLOCKED_BY_CLIENT/.test(c.text)).map((c) => c.type + ': ' + c.text);
    const failed = log.failed.filter((f) => !L.EXT_BLOCK.test(f.url)).map((f) => f.url.replace(base, '') + ' ' + f.err);
    // 404 na vlastnom webe (ikonky, vlajky)
    const st404 = [];
    page.on('response', () => {});
    R.strany.push({ base: base === L.EN ? 'EN' : 'SK', p, errors: log.errors.map((e) => e.msg), console: msgs, csp: log.csp, failed, ext: ctx._ext.length });
    for (const m of [...msgs, ...log.errors.map((e) => 'PAGEERROR: ' + e.msg)]) agg[m.replace(/https?:\/\/[^ ]+/g, 'URL')] = (agg[m.replace(/https?:\/\/[^ ]+/g, 'URL')] || 0) + 1;
    await ctx.close();
  }
  // 404 odpovede vlastného webu (ikonky/vlajky) na 10 stránkach — zbierame cez response
  {
    const ctx = await L.newContext(browser, { viewport: { width: 1366, height: 768 } });
    const page = await ctx.newPage();
    const n404 = {};
    page.on('response', (r) => { if (r.status() >= 400 && !L.EXT_BLOCK.test(r.url())) n404[r.url().replace(L.SK, '')] = r.status(); });
    for (const [, p] of sk.slice(0, 10)) { await page.goto(L.SK + p, { waitUntil: 'domcontentloaded' }).catch(() => {}); await L.waitApp(page); await page.waitForTimeout(600); }
    R.odpovede4xx = n404;
    await ctx.close();
  }
  R.suhrn = agg;
  await browser.close();
  console.log(JSON.stringify(R, null, 1));
  L.out(R, 'A-08-konzola.out.json');
})().catch((e) => { console.error('CHYBA', e); process.exit(1); });
