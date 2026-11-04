#!/usr/bin/env node
// Domov: statické HTML z generátora (#main dlaždice, #hSports, #aktualneScroll, #aktualneCount, #aktHead, #fLive)
// vs. to, čo appka vykreslí po štarte. + okienko reklamy: adFrame (appka) vs ad_frame_doc (generátor) + promo na /tipovanie/.
// Použitie: node J-domov.js <base> <siteDir> <srcDir>
const fs = require('fs'), path = require('path'), cp = require('child_process');
const { chromium } = require('playwright');
const [,, BASE, SITE, SRC] = process.argv;
const html = fs.readFileSync(path.join(SITE, 'index.html'), 'utf8');
const g = (re) => { const m = html.match(re); return m ? m[1] : null; };
const stat = {
  main: g(/<main id="main">([\s\S]*?)<\/main>/), nav: g(/<nav class="h-sports" id="hSports"[^>]*>([\s\S]*?)<\/nav>/),
  akt: g(/<div id="aktualneScroll"[^>]*>([\s\S]*?)<\/div>\s*<button/), cnt: g(/<span id="aktualneCount"[^>]*>([^<]*)<\/span>/),
  head: g(/(<a id="aktHead"[^>]*>)/), flive: g(/(<a class="f-live" id="fLive"[^>]*>[^<]*<\/a>)/), headTxt: g(/<span id="aktHeadTxt">([^<]*)<\/span>/),
};
const norm = s => (s || '').replace(/\s+/g, ' ').trim();
(async () => {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: {width:1366, height:900} });
  await ctx.route('**/*', r => /goatcounter|zgo\.at|tipsport|google\.com/.test(r.request().url()) ? r.abort() : r.continue());
  const page = await ctx.newPage();
  const errs = []; page.on('pageerror', e => errs.push(String(e)));
  await page.goto(BASE, { waitUntil: 'load' });
  // 1) hneď po štarte z BOOT (ešte pred celými dátami) — appka má obsah porovnať a NEprepísať
  const skor = await page.evaluate(() => ({ partial: !!DB._partial, main: document.getElementById('main').innerHTML, nav: document.getElementById('hSports').innerHTML }));
  await page.waitForFunction(() => !DB._partial, null, { timeout: 120000 });
  try{ await page.waitForLoadState('networkidle', { timeout: 15000 }); }catch(e){}
  await page.waitForTimeout(1500);
  const app = await page.evaluate(() => {
    const t = (h) => { const x = document.createElement('template'); x.innerHTML = h; return x.innerHTML; };
    return { main: document.getElementById('main').innerHTML, nav: document.getElementById('hSports').innerHTML,
      akt: document.getElementById('aktualneScroll').innerHTML, cnt: document.getElementById('aktualneCount').textContent,
      head: document.getElementById('aktHead').outerHTML.match(/^<a[^>]*>/)[0], flive: document.getElementById('fLive').outerHTML,
      headTxt: document.getElementById('aktHeadTxt').textContent, adSlot: adFrame('X', false), adAuto: adFrame('X', true), t };
  });
  // statický HTML prehnať cez <template> ako appka (porovnanie po spracovaní prehliadačom)
  const viaT = async (h) => page.evaluate((h) => { const x = document.createElement('template'); x.innerHTML = h; return x.innerHTML; }, h);
  const out = { base: BASE, errs };
  out.main_boot_rovnake = norm(skor.main) === norm(stat.main);
  out.main_zhoda = (await viaT(stat.main)) === app.main;
  out.nav_zhoda = (await viaT(stat.nav)) === app.nav;
  out.akt_zhoda = (await viaT(stat.akt)) === app.akt; out.cnt_zhoda = norm(stat.cnt) === norm(app.cnt);
  out.head_zhoda = stat.head === app.head; out.headTxt_zhoda = stat.headTxt === app.headTxt;
  out.flive_zhoda = (await viaT(stat.flive)) === (await viaT(app.flive));
  if(!out.main_zhoda){ out.main_stat = (await viaT(stat.main)).slice(0, 900); out.main_app = app.main.slice(0, 900); }
  if(!out.nav_zhoda){ out.nav_stat = stat.nav.slice(0, 500); out.nav_app = app.nav.slice(0, 500); }
  if(!out.akt_zhoda){ out.akt_stat = (await viaT(stat.akt)).slice(0, 700); out.akt_app = app.akt.slice(0, 700); }
  if(!out.head_zhoda){ out.head_stat = stat.head; out.head_app = app.head; }
  if(!out.flive_zhoda){ out.flive_stat = stat.flive; out.flive_app = app.flive; }
  // okienko reklamy: generátor (python import, LEN čítanie) vs appka
  const py = cp.execFileSync('python3', ['-c', `import sys; sys.path.insert(0, ${JSON.stringify(SRC)}); import os; os.chdir(${JSON.stringify(SRC)}); import generator as g; import json
print(json.dumps([g.ad_frame('X', False), g.ad_frame('<script>X</script>', False), g.ad_frame('<script>X</script>', True)]))`], { encoding: 'utf8' });
  const [pyPlain, pySlot, pyAuto] = JSON.parse(py.trim().split('\n').pop());
  const appSlot = await page.evaluate(() => adFrame('<script>X</script>', false)), appAuto = await page.evaluate(() => adFrame('<script>X</script>', true));
  out.adframe_slot_zhoda = pySlot === appSlot; out.adframe_auto_zhoda = pyAuto === appAuto;
  if(!out.adframe_slot_zhoda){ out.ad_py = pySlot.slice(0, 600); out.ad_app = appSlot.slice(0, 600); }
  // /tipovanie/ (len SK): promo okienko statika vs appka po prevzatí
  const tip = path.join(SITE, 'tipovanie', 'index.html');
  if(fs.existsSync(tip)){
    const sh = fs.readFileSync(tip, 'utf8');
    const sdoc = (sh.match(/<iframe class="adframe adframe-auto"[^>]*srcdoc="([^"]*)"/) || [])[1] || '';
    const p2 = await ctx.newPage();
    await p2.goto(BASE + 'tipovanie/', { waitUntil: 'domcontentloaded' });
    await p2.waitForFunction(() => typeof render === 'function' && document.querySelector('#main .promo'), null, { timeout: 60000 });
    const adoc = await p2.evaluate(() => { const f = document.querySelector('#main iframe.adframe-auto'); return f ? f.getAttribute('srcdoc') : ''; });
    const sand = await p2.evaluate(() => { const f = document.querySelector('#main iframe.adframe-auto'); return f ? f.getAttribute('sandbox') : ''; });
    const ssand = (sh.match(/<iframe class="adframe adframe-auto" sandbox="([^"]*)"/) || [])[1] || '';
    out.tipovanie_promo_iframe_zhoda = (sdoc && adoc) ? (await viaT(sdoc)) === (await viaT(adoc)) : `chýba (statika ${sdoc.length} B, appka ${adoc.length} B)`;
    out.tipovanie_sandbox = [ssand, sand];
    // karta Tipsport pod promo (bod 1 previerky 1)
    out.tipovanie_linky_po_prevzati = await p2.evaluate(() => document.querySelectorAll('#main .card-link').length);
    await p2.waitForFunction(() => !DB._partial, null, { timeout: 60000 }); await p2.waitForTimeout(300);
    out.tipovanie_linky_po_datach = await p2.evaluate(() => document.querySelectorAll('#main .card-link').length);
  }
  console.log(JSON.stringify(out, null, 1));
  await browser.close();
})().catch(e => { console.error(e); process.exit(1); });
