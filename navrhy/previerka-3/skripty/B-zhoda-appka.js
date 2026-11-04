// Porovnanie: čo vidí robot (statická stránka, UA Googlebot — TAKEOVER sa nespustí)
// vs. čo vidí človek (po prevzatí appkou). Lokálne servery 8123 (SK) / 8124 (EN).
// Použitie: node B-zhoda-appka.js <site-sk> <site-en>
const { chromium } = require('playwright');
const fs = require('fs'), path = require('path');
const [SK_DIR, EN_DIR] = process.argv.slice(2);
const SNIMKY = path.join(path.dirname(__dirname), '..', 'snimky');
const BOT_UA = 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)';

function sample(dir, n, seed) {
  const out = [];
  (function walk(d, rel) {
    for (const f of fs.readdirSync(d)) {
      const p = path.join(d, f);
      if (fs.statSync(p).isDirectory() && !['ikony', 'vlajky'].includes(f)) walk(p, rel + f + '/');
      else if (f === 'index.html' && rel) out.push(rel);
    }
  })(dir, '');
  let s = seed; const rnd = () => (s = (s * 9301 + 49297) % 233280) / 233280;
  return out.sort().sort(() => rnd() - 0.5).slice(0, n);
}
const nhl = fs.readdirSync(path.join(SK_DIR, 'hokej/kluby')).map(c => `hokej/kluby/${c}/nhl/`).filter(p => fs.existsSync(path.join(SK_DIR, p)));
const PAGES = {
  sk: ['hokej/', 'hokej/kluby/', ...nhl, 'aktualne/', 'tipovanie/', 'futbal/kluby/afrika/eritrea/', 'futbal/kluby/europa/', ...sample(SK_DIR, 14, 7)],
  en: ['ice-hockey/', 'live-this-week/', 'basketball/clubs/europe/', 'basketball/clubs/asia/', 'handball/clubs/europe/', 'football/clubs/africa/',
       'news-media/africa/', 'football/associations/africa/', 'basketball/associations/africa/', 'volleyball/clubs/', ...sample(EN_DIR, 14, 3)],
};
const BASE = { sk: 'http://127.0.0.1:8123/', en: 'http://127.0.0.1:8124/' };
const norm = s => s.replace(/\s+/g, ' ').trim();

async function staticInfo(page, url) {
  await page.goto(url, { waitUntil: 'load' });
  await page.waitForTimeout(1200);
  return page.evaluate(() => {
    const q = s => document.querySelector(s);
    const grids = {};
    for (const h2 of document.querySelectorAll('h2')) {
      const g = h2.nextElementSibling;
      grids[h2.textContent.trim()] = g ? [...g.querySelectorAll('a.card .nm')].map(e => e.textContent.replace(/\s+/g, ' ').trim()) : [];
    }
    const live = q('.live-grid') ? [...q('.live-grid').querySelectorAll('a.card .nm')].map(e => e.textContent.trim()) : null;
    return {
      takeover: !document.getElementById('pageBoot'),
      title: document.title, desc: (q('meta[name="description"]') || {}).content || '',
      canonical: (q('link[rel="canonical"]') || {}).href || '',
      hreflang: [...document.querySelectorAll('link[rel="alternate"][hreflang]')].map(l => l.getAttribute('hreflang') + '=' + l.getAttribute('href')).sort().join(' | '),
      h1: q('h1') ? q('h1').textContent.replace(/\s+/g, ' ').trim() : '',
      folders: grids['Kategórie'] || grids['Categories'] || [], links: grids['Linky'] || grids['Links'] || live || [],
      descShown: !!q('p.desc') || !!q('p.live-intro'),
    };
  });
}
async function appInfo(page, url) {
  await page.goto(url, { waitUntil: 'load' });
  try {
    await page.waitForFunction(() => !document.getElementById('pageBoot') && typeof DB !== 'undefined' && DB.nodes && !DB._partial
      && document.querySelector('#main') && !document.querySelector('#main .empty') && document.querySelector('#main').children.length > 0, null, { timeout: 20000 });
  } catch (e) { return { err: 'prevzatie/dáta do 20 s neprišli: ' + e.message.slice(0, 80) }; }
  await page.waitForTimeout(600);
  return page.evaluate(() => {
    const q = s => document.querySelector(s);
    return {
      title: document.title, desc: (q('meta[name="description"]') || {}).content || '',
      canonical: (q('link[rel="canonical"]') || {}).href || '',
      hreflang: [...document.querySelectorAll('link[rel="alternate"][hreflang]')].map(l => l.getAttribute('hreflang') + '=' + l.getAttribute('href')).sort().join(' | '),
      h1: q('h1') ? q('h1').textContent.replace(/\s+/g, ' ').trim() : '(appka nemá h1)',
      folders: [...document.querySelectorAll('#main .c-name, #main .cf-name')].map(e => e.textContent.replace(/\s+/g, ' ').trim()),
      links: [...document.querySelectorAll('#main .cl-name')].map(e => e.textContent.replace(/\s+/g, ' ').trim()),
      counts: [...document.querySelectorAll('#main .c-count, #main .cf-count')].map(e => e.textContent.trim()).slice(0, 3),
      pathname: location.pathname, headerCount: (q('#linkCount') || q('.h-count') || {}).textContent || '',
      crumbs: (q('#crumbs') || q('.crumbs') || q('nav') || {}).textContent || '',
    };
  });
}

(async () => {
  const browser = await chromium.launch();
  const bot = await browser.newContext({ userAgent: BOT_UA });
  const man = await browser.newContext({ viewport: { width: 1200, height: 900 } });
  const pb = await bot.newPage(), pm = await man.newPage();
  const rows = []; let nDiff = 0, nPages = 0;
  for (const lang of ['sk', 'en']) {
    for (const rel of PAGES[lang]) {
      nPages++;
      const url = BASE[lang] + rel;
      const s = await staticInfo(pb, url);
      const a = await appInfo(pm, url);
      const d = [];
      if (a.err) d.push(a.err);
      else {
        if (s.takeover) d.push('ROBOT: stránku prevzala appka (pageBoot zmizol)!');
        if (s.title !== a.title) d.push(`title: statika „${s.title}“ ≠ appka „${a.title}“`);
        if (s.desc !== a.desc) d.push(`meta desc: statika (${s.desc.length} zn.) ≠ appka (${a.desc.length} zn.): „${s.desc.slice(0, 60)}…“ vs „${a.desc.slice(0, 60)}…“`);
        if (s.canonical !== a.canonical) d.push(`canonical: ${s.canonical} ≠ ${a.canonical}`);
        if (s.hreflang !== a.hreflang) d.push(`hreflang: statika [${s.hreflang}] ≠ appka [${a.hreflang}]`);
        const sf = s.folders.map(norm), af = a.folders.map(norm);
        if (sf.join('|') !== af.join('|')) {
          const sameSet = [...sf].sort().join('|') === [...af].sort().join('|');
          d.push(`priečinky ${sameSet ? 'INÉ PORADIE' : 'INÁ MNOŽINA'} (${sf.length} vs ${af.length}): statika [${sf.slice(0, 7).join(', ')}] appka [${af.slice(0, 7).join(', ')}]`);
        }
        const sl = s.links.map(norm), al = a.links.map(norm);
        if (sl.join('|') !== al.join('|')) {
          const sameSet = [...sl].sort().join('|') === [...al].sort().join('|');
          d.push(`linky ${sameSet ? 'INÉ PORADIE' : 'INÁ MNOŽINA'} (${sl.length} vs ${al.length}): statika [${sl.slice(0, 5).join(', ')}] appka [${al.slice(0, 5).join(', ')}]`);
        }
        if (a.pathname !== '/' + rel) d.push(`adresa po prevzatí: ${a.pathname} ≠ /${rel}`);
      }
      if (d.length) nDiff++;
      console.log(`\n[${lang}] /${rel}  statika: ${s.folders.length} priečinkov, ${s.links.length} liniek, h1 „${s.h1}“ | appka: ${a.folders ? a.folders.length : '?'} priečinkov, ${a.links ? a.links.length : '?'} liniek, počty na kartách ${a.counts ? JSON.stringify(a.counts) : ''}`);
      for (const x of d) console.log('   ✗ ' + x);
      if (!d.length) console.log('   ✓ zhodné (title, popis, canonical, hreflang, poradie priečinkov aj liniek)');
      rows.push({ lang, rel, diff: d });
    }
  }
  console.log(`\nSPOLU: ${nPages} stránok, s rozdielom ${nDiff}`);

  // snímky: robot vs človek na tej istej stránke
  await pb.goto(BASE.sk + nhl[0]); await pb.waitForTimeout(800);
  await pb.screenshot({ path: path.join(SNIMKY, 'B-01-robot-staticka-nhl.png'), fullPage: false });
  await pm.goto(BASE.sk + nhl[0]); await pm.waitForTimeout(2500);
  await pm.screenshot({ path: path.join(SNIMKY, 'B-02-clovek-po-prevzati-nhl.png'), fullPage: false });

  // 404.html ako appka: neznáma adresa, server vráti 404.html so stavom 404 (ako GitHub Pages)
  const p4 = await man.newPage();
  const html404 = fs.readFileSync(path.join(SK_DIR, '404.html'), 'utf8');
  await p4.route('**/hokej/neexistuje/', r => r.fulfill({ status: 404, contentType: 'text/html; charset=utf-8', body: html404 }));
  await p4.goto(BASE.sk + 'hokej/neexistuje/', { waitUntil: 'load' });
  await p4.waitForTimeout(3500);
  const r404 = await p4.evaluate(() => ({ title: document.title, path: location.pathname, main: (document.querySelector('#main') || {}).innerText?.slice(0, 160),
    canonical: (document.querySelector('link[rel="canonical"]') || {}).href || '(žiadny)', hreflang: document.querySelectorAll('link[hreflang]').length,
    crumbs: (document.querySelector('.crumb, #crumbs, .breadcrumb') || {}).innerText || '' }));
  console.log('\n404.html ako appka na /hokej/neexistuje/:', JSON.stringify(r404));
  await p4.screenshot({ path: path.join(SNIMKY, 'B-03-404-ako-appka.png') });
  // 404 s úplne cudzou cestou
  await p4.route('**/xyz/abc/', r => r.fulfill({ status: 404, contentType: 'text/html; charset=utf-8', body: html404 }));
  await p4.goto(BASE.sk + 'xyz/abc/', { waitUntil: 'load' }); await p4.waitForTimeout(3000);
  console.log('404.html na /xyz/abc/:', JSON.stringify(await p4.evaluate(() => ({ title: document.title, path: location.pathname, main: (document.querySelector('#main') || {}).innerText?.slice(0, 120) }))));
  await browser.close();
})();
