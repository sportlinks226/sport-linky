// A-01: navigácia, routing, Späť/Vpred, prepínač Dlaždice/Stĺpce
const L = require('./A-lib');
const R = {};
(async () => {
  const browser = await L.launch();
  // ---------- 1. domov → sekcia → krajina → liga → klub a späť (desktop 1366) ----------
  {
    const ctx = await L.newContext(browser, { viewport: { width: 1366, height: 768 } });
    const page = await ctx.newPage(); const log = L.watch(page);
    await page.goto(L.SK + '/'); await L.waitApp(page); await L.waitFull(page);
    const steps = [];
    const click = async (sel, label) => {
      await page.click(sel); await page.waitForTimeout(400);
      const s = await L.appState(page); steps.push({ label, url: s.url, title: s.title, curId: s.curId, cards: s.cards.length, scrollY: s.scrollY, canonical: s.canonical });
    };
    await click('a.card-root[href="/futbal/"]', 'Futbal');
    await click('a.card-root[href="/futbal/kluby/"]', 'Kluby');
    await click('a[href="/futbal/kluby/europa/"]', 'Európa');
    // posuň sa dole (55 krajín) a klikni na Anglicko
    await page.evaluate(() => window.scrollTo(0, 1500)); await page.waitForTimeout(200);
    const scrollPred = await page.evaluate(() => window.scrollY);
    await click('a[href="/futbal/kluby/europa/anglicko/"]', 'Anglicko');
    await click('a[href="/futbal/kluby/europa/anglicko/premier-league/"]', 'Premier League');
    await L.snap(page, 'A-01-premier-league-desktop');
    // späť tlačidlom prehliadača 2×
    await page.goBack(); await page.waitForTimeout(500);
    let s = await L.appState(page); steps.push({ label: 'goBack→Anglicko', url: s.url, title: s.title, curId: s.curId, scrollY: s.scrollY });
    await page.goBack(); await page.waitForTimeout(600);
    s = await L.appState(page); steps.push({ label: 'goBack→Európa (posun pred klikom=' + scrollPred + ')', url: s.url, title: s.title, curId: s.curId, scrollY: s.scrollY });
    await page.goForward(); await page.waitForTimeout(500);
    s = await L.appState(page); steps.push({ label: 'goForward→Anglicko', url: s.url, title: s.title, curId: s.curId, scrollY: s.scrollY });
    // Späť tlačidlom v appke (← Späť)
    await page.click('.bc-back'); await page.waitForTimeout(400);
    s = await L.appState(page); steps.push({ label: 'bc-back→Európa', url: s.url, curId: s.curId, scrollY: s.scrollY });
    // breadcrumb domov
    await page.click('#breadcrumb a.bc-item'); await page.waitForTimeout(400);
    s = await L.appState(page); steps.push({ label: 'breadcrumb Domov', url: s.url, title: s.title, curId: s.curId, cards: s.cards.length });
    R.klikanie = steps; R.klikanieLog = { errors: log.errors, console: log.console.slice(0, 20), ext: ctx._ext.slice(0, 10) };
    await ctx.close();
  }
  // ---------- 2. Priamy príchod na statické adresy (server s 404.html) ----------
  {
    const cases = [
      '/futbal/kluby/europa/anglicko/',
      '/futbal/kluby/europa/anglicko',          // bez lomky
      '/futbal/kluby/europa/anglicko/?utm_source=test&x=1',
      '/futbal/kluby/europa/anglicko/#nieco',
      '/futbal/kluby/europa/anglicko/#/futbal/kluby',  // stará hash adresa na podstránke
      '/#/futbal/kluby/europa/anglicko',         // stará hash adresa na domove
      '/#/hokej/sutaze',
      '/Futbal/Kluby/Europa/Anglicko/',          // veľké písmená
      '/futbal/kluby/eur%C3%B3pa/anglicko/',     // diakritika
      '/hokej/neexistuje/',                      // neexistujúca cesta
      '/futbal/kluby/europa/anglicko/premier-league/neexistuje/',
      '/aktualne/',
      '/tipovanie/',
      '/futbal/kluby/europa/anglicko/index.html',
      '/neexistuje/',
    ];
    R.priamy = [];
    for (const c of cases) {
      const ctx = await L.newContext(browser, { viewport: { width: 1366, height: 768 } });
      const page = await ctx.newPage(); const log = L.watch(page);
      const resp = await page.goto(L.SK404 + c, { waitUntil: 'domcontentloaded' }).catch((e) => ({ status: () => 'ERR ' + e.message }));
      const status = resp && resp.status ? resp.status() : '?';
      const t = await L.waitApp(page, 12000);
      await L.waitFull(page, 12000); await page.waitForTimeout(500);
      const s = await L.appState(page);
      R.priamy.push({ adresa: c, httpStatus: status, prevzatieMs: t, urlPo: s.url, title: s.title, curId: s.curId, cestaCela: s.cestaCela, canonical: s.canonical, hreflang: s.hreflang, cards: s.cards.length, mainText: s.mainText.slice(0, 80), errors: log.errors.map((e) => e.msg), csp: log.csp.length });
      if (/neexistuje|Futbal\/|eur%C3/.test(c)) await L.snap(page, 'A-01-priamy-' + c.replace(/[^a-z0-9]+/gi, '_').slice(0, 40));
      await ctx.close();
    }
  }
  // ---------- 3. Prepínač Dlaždice/Stĺpce + pamätanie ----------
  {
    const ctx = await L.newContext(browser, { viewport: { width: 1366, height: 768 } });
    const page = await ctx.newPage(); const log = L.watch(page);
    await page.goto(L.SK + '/futbal/kluby/europa/'); await L.waitApp(page); await L.waitFull(page);
    const vis0 = await page.isVisible('#vSwitch');
    await page.click('#vSwitch button[data-mode=cols]'); await page.waitForTimeout(600);
    const s1 = await L.appState(page);
    const ls = await page.evaluate(() => localStorage.getItem('sportStromView'));
    const cols1 = await page.evaluate(() => document.querySelectorAll('#colsWrap .col').length);
    await L.snap(page, 'A-01-stlpce-europa');
    // reload → ostane v stĺpcoch?
    await page.reload(); await L.waitApp(page); await L.waitFull(page); await page.waitForTimeout(600);
    const s2 = await L.appState(page);
    const cols2 = await page.evaluate(() => document.querySelectorAll('#colsWrap .col').length);
    // hľadanie v stĺpcoch → výsledky v dlaždiciach? potom vymazať → späť stĺpce?
    await page.fill('#srch', 'arsenal'); await page.waitForTimeout(500);
    const srchCols = await page.evaluate(() => ({ cols: !!document.getElementById('colsWrap'), mode: document.getElementById('main').classList.contains('cols-mode'), cards: document.querySelectorAll('#main .card-link').length }));
    await page.fill('#srch', ''); await page.waitForTimeout(500);
    const afterClear = await page.evaluate(() => ({ cols: !!document.getElementById('colsWrap'), mode: document.getElementById('main').classList.contains('cols-mode') }));
    // mobil: prepínač skrytý?
    const mctx = await L.newContext(browser, { device: 'iPhone 13' });
    const mp = await mctx.newPage(); await mp.goto(L.SK + '/futbal/kluby/europa/'); await L.waitApp(mp); await L.waitFull(mp);
    const mVis = await mp.isVisible('#vSwitch');
    const mMode = await mp.evaluate(() => ({ viewMode, cols: !!document.getElementById('colsWrap'), lsView: localStorage.getItem('sportStromView') }));
    await mctx.close();
    // okno zúžené pod 700 px pri zapnutých stĺpcoch
    await page.setViewportSize({ width: 640, height: 800 }); await page.waitForTimeout(500);
    const narrow = await page.evaluate(() => ({ cols: !!document.getElementById('colsWrap'), mode: document.getElementById('main').classList.contains('cols-mode'), switchVisible: getComputedStyle(document.getElementById('vSwitch')).display }));
    await page.setViewportSize({ width: 1366, height: 768 }); await page.waitForTimeout(500);
    const wide = await page.evaluate(() => ({ cols: !!document.getElementById('colsWrap'), mode: document.getElementById('main').classList.contains('cols-mode') }));
    R.prepinac = { switchVisible: vis0, poKliku: { viewMode: s1.viewMode, ls, cols: cols1, url: s1.url }, poReloade: { viewMode: s2.viewMode, cols: cols2 }, hladanieVStlpcoch: srchCols, poVymazani: afterClear, mobil: { switchVisible: mVis, ...mMode }, uzke640: narrow, spat1366: wide, errors: log.errors };
    await ctx.close();
  }
  // ---------- 4. Späť/Vpred s posunom stránky — mobil (Pixel 5) ----------
  {
    const ctx = await L.newContext(browser, { device: 'Pixel 5' });
    const page = await ctx.newPage(); const log = L.watch(page);
    await page.goto(L.SK + '/futbal/kluby/europa/'); await L.waitApp(page); await L.waitFull(page);
    await page.evaluate(() => window.scrollTo(0, 2500)); await page.waitForTimeout(300);
    const y0 = await page.evaluate(() => window.scrollY);
    const href = await page.evaluate(() => { const a = [...document.querySelectorAll('#main a.card-folder')].find((x) => x.getBoundingClientRect().top > 0 && x.getBoundingClientRect().top < 600); return a && a.getAttribute('href'); });
    await page.click('#main a.card-folder[href="' + href + '"]'); await page.waitForTimeout(500);
    const s1 = await L.appState(page);
    await page.goBack(); await page.waitForTimeout(800);
    const s2 = await L.appState(page);
    await page.goForward(); await page.waitForTimeout(600);
    const s3 = await L.appState(page);
    R.mobilSpat = { posunPredKlikom: y0, kliknute: href, poKliku: { url: s1.url, scrollY: s1.scrollY }, poSpat: { url: s2.url, scrollY: s2.scrollY, curId: s2.curId }, poVpred: { url: s3.url, scrollY: s3.scrollY }, errors: log.errors };
    await L.snap(page, 'A-01-pixel5-po-spat');
    await ctx.close();
  }
  // ---------- 5. Späť z hľadania; hash #admin a scrollRestoration ----------
  {
    const ctx = await L.newContext(browser, { viewport: { width: 1920, height: 1080 } });
    const page = await ctx.newPage(); const log = L.watch(page);
    await page.goto(L.SK + '/hokej/'); await L.waitApp(page); await L.waitFull(page);
    await page.fill('#srch', 'slovan'); await page.waitForTimeout(500);
    const sr = await L.appState(page);
    // klik na prvý výsledok-priečinok
    const hasFolder = await page.$('#main a.card-folder');
    let afterClick = null, afterBack = null;
    if (hasFolder) { await hasFolder.click(); await page.waitForTimeout(500); afterClick = await L.appState(page); await page.goBack(); await page.waitForTimeout(600); afterBack = await L.appState(page); }
    const restoration = await page.evaluate(() => history.scrollRestoration);
    R.hladanieSpat = { pocasHladania: { url: sr.url, mainText: sr.mainText.slice(0, 60), cards: sr.cards.length }, poKliku: afterClick && { url: afterClick.url, curId: afterClick.curId }, poSpat: afterBack && { url: afterBack.url, curId: afterBack.curId, srchValue: await page.inputValue('#srch'), mainText: afterBack.mainText.slice(0, 60) }, scrollRestoration: restoration, errors: log.errors };
    await ctx.close();
  }
  await browser.close();
  console.log(JSON.stringify(R, null, 1));
  L.out(R, 'A-01-nav.out.json');
})().catch((e) => { console.error('CHYBA', e); process.exit(1); });
