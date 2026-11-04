// A-06: chybové stavy — data.json 500 / pomalý / poškodený, version.txt, mini-balík, offline, Načítavam…, Skúsiť znova
const L = require('./A-lib');
const R = {};
const fs = require('fs');
const DATA = fs.readFileSync(L.BUILD + '/site-sk/data.json', 'utf8');
function hook(v) {
  return async (route, url) => {
    if (/data\.json/.test(url)) {
      if (v === '500') { await route.fulfill({ status: 500, body: 'err' }); return true; }
      if (v === 'bad') { await route.fulfill({ status: 200, contentType: 'application/json', body: DATA.slice(0, 50000) }); return true; }
      if (v === 'net') { await route.abort('connectionfailed'); return true; }
      if (v === 'slow') { await new Promise((r) => setTimeout(r, 6000)); await route.continue(); return true; }
      if (v === 'html') { await route.fulfill({ status: 200, contentType: 'text/html', body: '<html>captive portal</html>' }); return true; }
      if (v === 'nonodes') { await route.fulfill({ status: 200, contentType: 'application/json', body: '{"version":1}' }); return true; }
      if (v === 'ver') { if (/v=1125/.test(url)) { await route.fulfill({ status: 200, contentType: 'application/json', body: DATA }); return true; } if (/v=1130/.test(url)) { await route.fulfill({ status: 200, contentType: 'application/json', body: DATA.replace('"version": 1125', '"version": 1130') }); return true; } }
      if (v === 'fix') { route._n = (hook._n = (hook._n || 0) + 1); if (hook._n <= 4) { await route.fulfill({ status: 500, body: 'x' }); return true; } }
    }
    if (/version\.txt/.test(url)) {
      if (v === 'ver') { await route.fulfill({ status: 200, contentType: 'text/plain', body: '1130' }); return true; }
      if (v === 'verbad') { await route.fulfill({ status: 200, contentType: 'text/plain', body: '<html>' }); return true; }
      if (v === 'verslow') { await new Promise((r) => setTimeout(r, 5000)); await route.fulfill({ status: 200, body: '1125' }); return true; }
    }
    if (v === 'offline') { await route.abort('internetdisconnected'); return true; }
    return false;
  };
}
async function stav(page) {
  return page.evaluate(() => ({ url: location.href, title: document.title, curId, partial: !!DB._partial, nodes: (DB.nodes || []).length, fail: typeof DATA_FAIL !== 'undefined' ? DATA_FAIL : undefined, main: document.getElementById('main').innerText.replace(/\s+/g, ' ').slice(0, 100), retryBtn: !!document.querySelector('#main .load-fail button'), count: document.getElementById('linkCount').innerText, pubVer: typeof PUB_VER !== 'undefined' ? PUB_VER : undefined, ver: DB.version }));
}
(async () => {
  const browser = await L.launch();
  const cases = [
    ['500', '/', 2500], ['500', '/futbal/', 2500], ['500', '/futbal/kluby/europa/anglicko/', 2500], ['500', '/#/futbal/kluby/europa/anglicko', 2500],
    ['bad', '/futbal/kluby/europa/anglicko/', 2500], ['net', '/hokej/sutaze/', 2500], ['html', '/', 2500], ['nonodes', '/', 2500],
    ['slow', '/hokej/sutaze/', 1200], ['ver', '/', 2500], ['verbad', '/', 2500], ['verslow', '/', 1500], ['offline', '/futbal/kluby/europa/anglicko/', 2500],
  ];
  for (const [v, p, w] of cases) {
    hook._n = 0;
    const ctx = await L.newContext(browser, { viewport: { width: 1366, height: 768 }, routeHook: hook(v) });
    const page = await ctx.newPage(); const log = L.watch(page);
    const t0 = Date.now();
    let navErr = null;
    await page.goto(L.SK + p, { waitUntil: 'domcontentloaded', timeout: 15000 }).catch((e) => { navErr = String(e.message).slice(0, 80); });
    await page.waitForTimeout(w);
    const s1 = await stav(page).catch((e) => ({ err: String(e).slice(0, 100) }));
    let s2 = null, s3 = null, srch = null;
    if (v === 'slow') { await page.waitForTimeout(6000); s2 = await stav(page); }
    if (v === 'ver') { await page.waitForTimeout(1500); s2 = await stav(page); }
    // hľadanie počas výpadku
    if (!navErr && /500|net|bad/.test(v)) { await page.fill('#srch', 'kosice'); await page.waitForTimeout(500); srch = await page.evaluate(() => document.getElementById('main').innerText.replace(/\s+/g, ' ').slice(0, 80)); await page.fill('#srch', ''); await page.waitForTimeout(300); }
    if (!navErr && s1.retryBtn) { await page.click('#main .load-fail button'); await page.waitForTimeout(1500); s2 = await stav(page); }
    const dataReq = log.requests.filter((r) => /data\.json|version\.txt/.test(r.url)).map((r) => r.url.replace(L.SK, ''));
    R[v + ' ' + p] = { navErr, ms: Date.now() - t0, stav1: s1, stav2: s2, hladanie: srch, poziadavky: dataReq, errors: log.errors.map((e) => e.msg), console: log.console.filter((c) => !/ERR_BLOCKED|ERR_CONNECTION|ERR_INTERNET|500 \(Internal/.test(c.text)).map((c) => c.text.slice(0, 120)) };
    if (/500|offline/.test(v) && /anglicko|hokej/.test(p)) await L.snap(page, 'A-06-' + v + '-' + p.replace(/[^a-z]+/g, '_'));
    await ctx.close();
  }
  // „Skúsiť znova“: prvé 4 pokusy 500 (2 pokusy × 2 kolá), potom OK
  {
    hook._n = 0;
    const ctx = await L.newContext(browser, { viewport: { width: 1366, height: 768 }, routeHook: hook('fix') });
    const page = await ctx.newPage(); const log = L.watch(page);
    await page.goto(L.SK + '/futbal/kluby/europa/anglicko/premier-league/'); await page.waitForTimeout(2500);
    const s1 = await stav(page);
    await page.evaluate(() => navigate('f_fut_klu_eu_ang')); await page.waitForTimeout(300); // hore do priečinka z balíka
    const s1b = await stav(page);
    await page.evaluate(() => navigate('f_ang_pl')); await page.waitForTimeout(300);
    const s1c = await stav(page);
    const btn = await page.$('#main .load-fail button');
    let s2 = null;
    if (btn) { await btn.click(); await page.waitForTimeout(2500); s2 = await stav(page); }
    R.skusitZnova = { predKlikom: s1, hore: s1b, spatDole: s1c, poKliku: s2, pokusy: hook._n, errors: log.errors };
    await L.snap(page, 'A-06-skusit-znova');
    await ctx.close();
  }
  // Mini-balík chýba (statická stránka bez #pageBoot) – simulácia: podstrč HTML statickej stránky bez balíka
  {
    const html = fs.readFileSync(L.BUILD + '/site-sk/futbal/kluby/europa/anglicko/premier-league/index.html', 'utf8').replace(/<script type="application\/json" id="pageBoot">[\s\S]*?<\/script>/, '');
    const ctx = await L.newContext(browser, { viewport: { width: 1366, height: 768 }, routeHook: async (route, url) => { if (url.endsWith('/premier-league/')) { await route.fulfill({ status: 200, contentType: 'text/html', body: html }); return true; } return false; } });
    const page = await ctx.newPage(); const log = L.watch(page);
    await page.goto(L.SK + '/futbal/kluby/europa/anglicko/premier-league/', { waitUntil: 'domcontentloaded' });
    const t = await page.evaluate(() => new Promise((res) => { const t0 = performance.now(); const h = setInterval(() => { if (document.getElementById('srch')) { clearInterval(h); res(Math.round(performance.now() - t0)); } }, 5); }));
    await page.waitForTimeout(150);
    const s1 = await stav(page);
    await L.waitFull(page); await page.waitForTimeout(300);
    const s2 = await stav(page);
    R.bezMiniBalika = { prevzatieMs: t, hnedPoPrevzati: s1, poDatach: s2, errors: log.errors };
    await ctx.close();
  }
  await browser.close();
  console.log(JSON.stringify(R, null, 1));
  L.out(R, 'A-06-chyby.out.json');
})().catch((e) => { console.error('CHYBA', e); process.exit(1); });
