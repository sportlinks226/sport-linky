// A-09: doplnky — posun pri Späť (časová os), dvojité načítanie reklamy, hreflang po prekliku, prepínač jazyka,
// prevzatie na pomalej sieti (+ posun počas statickej fázy), Skúsiť znova, snímky pre pohľad návštevníka
const L = require('./A-lib');
const fs = require('fs');
const R = {};
(async () => {
  const browser = await L.launch();
  // 1. Posun pri Späť — časová os: scrollY pri popstate, po render, po 300 ms
  for (const [label, opts] of [['desktop1366', { viewport: { width: 1366, height: 768 } }], ['pixel5', { device: 'Pixel 5' }]]) {
    const ctx = await L.newContext(browser, opts);
    const page = await ctx.newPage();
    await page.goto(L.SK + '/futbal/kluby/europa/'); await L.waitApp(page); await L.waitFull(page);
    const docH = await page.evaluate(() => document.documentElement.scrollHeight);
    await page.evaluate(() => window.scrollTo(0, Math.min(1500, document.documentElement.scrollHeight - innerHeight))); await page.waitForTimeout(200);
    const y0 = await page.evaluate(() => scrollY);
    await page.evaluate(() => { window.__tl = []; addEventListener('popstate', () => { window.__tl.push(['popstate', scrollY, document.documentElement.scrollHeight]); requestAnimationFrame(() => window.__tl.push(['rAF', scrollY, document.documentElement.scrollHeight])); setTimeout(() => window.__tl.push(['t300', scrollY, document.documentElement.scrollHeight]), 300); }); });
    await page.click('a[href="/futbal/kluby/europa/anglicko/"]'); await page.waitForTimeout(400);
    const hAng = await page.evaluate(() => document.documentElement.scrollHeight);
    await page.goBack(); await page.waitForTimeout(700);
    const tl = await page.evaluate(() => ({ tl: window.__tl, now: scrollY, h: document.documentElement.scrollHeight, restoration: history.scrollRestoration, state: history.state }));
    R['spatPosun_' + label] = { vyskaEuropa: docH, vyskaAnglicko: hAng, posunPredKlikom: y0, poSpat: tl };
    await ctx.close();
  }
  // 2. Dvojité načítanie reklamy pri priamom príchode: / a /tipovanie/ (počet pokusov o partnerský skript za 4 s)
  for (const p of ['/', '/tipovanie/', '/futbal/kluby/europa/anglicko/']) {
    const ctx = await L.newContext(browser, { viewport: { width: 1366, height: 768 } });
    const page = await ctx.newPage(); const log = L.watch(page);
    await page.goto(L.SK + p, { waitUntil: 'domcontentloaded' }); await L.waitApp(page);
    await page.evaluate(() => { window.__fr1 = document.querySelector('#main .promo iframe'); window.__sl1 = document.querySelector('#bannerSlot iframe'); });
    await L.waitFull(page); await page.waitForTimeout(3500);
    const same = await page.evaluate(() => ({ promoIframeZostal: window.__fr1 ? window.__fr1 === document.querySelector('#main .promo iframe') : null, slotIframeZostal: window.__sl1 ? window.__sl1 === document.querySelector('#bannerSlot iframe') : null, renderCount: undefined }));
    const ads = ctx._ext.filter((u) => /tipsport/.test(u));
    R['reklama_' + p] = { pokusyOPartnerskySkript: ads, pocet: ads.length, ...same, errors: log.errors };
    await ctx.close();
  }
  // 3. hreflang po prekliku v appke + prepínač jazyka (existuje?)
  {
    const ctx = await L.newContext(browser, { viewport: { width: 1366, height: 768 } });
    const page = await ctx.newPage();
    await page.goto(L.SK + '/futbal/kluby/europa/anglicko/'); await L.waitApp(page); await L.waitFull(page);
    const h0 = await page.evaluate(() => [...document.querySelectorAll('link[rel=alternate][hreflang]')].map((l) => l.getAttribute('hreflang') + '=' + l.getAttribute('href')));
    await page.click('a[href="/futbal/kluby/europa/anglicko/premier-league/"]'); await page.waitForTimeout(400);
    const h1 = await page.evaluate(() => ({ url: location.pathname, canonical: document.querySelector('link[rel=canonical]').href, hreflang: [...document.querySelectorAll('link[rel=alternate][hreflang]')].map((l) => l.getAttribute('hreflang') + '=' + l.getAttribute('href')) }));
    await page.evaluate(() => navigate('f_tip')); await page.waitForTimeout(300);
    const h2 = await page.evaluate(() => ({ url: location.pathname, canonical: document.querySelector('link[rel=canonical]').href, hreflang: [...document.querySelectorAll('link[rel=alternate][hreflang]')].map((l) => l.getAttribute('hreflang') + '=' + l.getAttribute('href')) }));
    const switcher = await page.evaluate(() => ({ odkazyNaEN: [...document.querySelectorAll('a[href*="sportlinking"]')].map((a) => a.outerHTML.slice(0, 100)), textEN: /\bEN\b|English|🇬🇧/.test(document.body.innerText), hreflangLinkElements: document.querySelectorAll('link[hreflang]').length }));
    R.hreflangPoPrekliku = { statickaAnglicko: h0, poKlikuPremierLeague: h1, poNavigaciiTipovanie: h2 };
    R.prepinacJazyka = switcher;
    // EN: odkaz na SK?
    await page.goto(L.EN + '/football/clubs/europe/england/'); await L.waitApp(page); await L.waitFull(page);
    R.prepinacJazykaEN = await page.evaluate(() => ({ odkazyNaSK: [...document.querySelectorAll('a[href*="sportlinky"]')].map((a) => a.outerHTML.slice(0, 100)), textSK: /\bSK\b|Slovensky|🇸🇰/.test(document.body.innerText), hreflang: [...document.querySelectorAll('link[rel=alternate][hreflang]')].map((l) => l.getAttribute('hreflang') + '=' + l.getAttribute('href')) }));
    await ctx.close();
  }
  // 3b. hreflang na stránkach bez náprotivku (statické): Tipovanie (SK only), EN stránka s en:false?
  {
    const html = fs.readFileSync(L.BUILD + '/site-sk/tipovanie/index.html', 'utf8');
    R.hreflangTipovanieStaticke = (html.match(/<link rel="alternate"[^>]*>/g) || []).length;
    const d = JSON.parse(fs.readFileSync(L.BUILD + '/site-sk/data-full.json', 'utf8'));
    R.enFalseFolders = d.nodes.filter((n) => n.type === 'folder' && n.en === false).length;
    R.enOnlyFolders = d.nodes.filter((n) => n.type === 'folder' && n.enOnly === true).map((n) => n.name);
  }
  // 4. Prevzatie na pomalej sieti (Slow 4G: 400 ms RTT, 400 kb/s) — ako dlho vidno statickú stránku, posun počas nej
  for (const [label, dev] of [['desktop', null], ['pixel5', 'Pixel 5']]) {
    const ctx = await L.newContext(browser, dev ? { device: dev } : { viewport: { width: 1366, height: 768 } });
    const page = await ctx.newPage(); const log = L.watch(page);
    const cdp = await ctx.newCDPSession(page);
    await cdp.send('Network.enable');
    await cdp.send('Network.emulateNetworkConditions', { offline: false, latency: 400, downloadThroughput: 400 * 1024 / 8, uploadThroughput: 200 * 1024 / 8 });
    const t0 = Date.now();
    const ev = [];
    page.on('domcontentloaded', () => ev.push(['DCL', Date.now() - t0]));
    page.on('load', () => ev.push(['load', Date.now() - t0]));
    await page.goto(L.SK + '/futbal/kluby/europa/anglicko/premier-league/', { waitUntil: 'domcontentloaded' });
    const tStatic = Date.now() - t0;
    // návštevník počas statickej fázy posunie stránku
    await page.waitForTimeout(300);
    await page.evaluate(() => window.scrollTo(0, 600)); await page.waitForTimeout(100);
    const yStatic = await page.evaluate(() => scrollY);
    const seen = [];
    const tApp = await page.evaluate(() => new Promise((res) => { const t = performance.now(); const h = setInterval(() => { if (document.getElementById('srch')) { clearInterval(h); res(Math.round(performance.now())); } if (performance.now() - t > 60000) { clearInterval(h); res(-1); } }, 20); }));
    const tAppAbs = Date.now() - t0;
    await page.waitForTimeout(100);
    const yApp = await page.evaluate(() => scrollY);
    const partial = await page.evaluate(() => ({ partial: !!DB._partial, cards: document.querySelectorAll('#main .card-link, #main .card-folder').length }));
    await L.waitFull(page, 90000); const tFull = Date.now() - t0;
    const sizes = {}; log.requests.forEach(() => {});
    R['pomalaSiet_' + label] = { statickaDCLms: tStatic, udalosti: ev, appkaPoMs: tAppAbs, appkaPerfNow: tApp, celeDataMs: tFull, posunPocasStatickej: yStatic, posunPoPrevzati: yApp, hnedPoPrevzati: partial, errors: log.errors };
    await L.snap(page, 'A-09-pomala-siet-' + label);
    await ctx.close();
  }
  // 5. Skúsiť znova — správny priebeh: data.json 500 pri 1. stiahnutí (2 pokusy), tlačidlo → OK
  {
    let n = 0;
    const ctx = await L.newContext(browser, { viewport: { width: 1366, height: 768 }, routeHook: async (route, url) => { if (/data\.json/.test(url)) { n++; if (n <= 2) { await route.fulfill({ status: 500, body: 'x' }); return true; } } return false; } });
    const page = await ctx.newPage(); const log = L.watch(page);
    await page.goto(L.SK + '/futbal/kluby/europa/anglicko/'); await page.waitForTimeout(2500);
    await page.evaluate(() => navigate('f_ang_pl')); await page.waitForTimeout(300); // hlbšie než balík → správa
    const s1 = await page.evaluate(() => ({ main: document.getElementById('main').innerText.replace(/\s+/g, ' ').slice(0, 80), btn: !!document.querySelector('#main .load-fail button'), fail: DATA_FAIL }));
    await L.snap(page, 'A-09-skusit-znova-pred');
    const t0 = Date.now();
    await page.click('#main .load-fail button'); await page.waitForTimeout(200);
    const s2 = await page.evaluate(() => ({ main: document.getElementById('main').innerText.replace(/\s+/g, ' ').slice(0, 40) }));
    await L.waitFull(page); await page.waitForTimeout(300);
    const s3 = await page.evaluate(() => ({ main: document.getElementById('main').innerText.replace(/\s+/g, ' ').slice(0, 80), cards: document.querySelectorAll('#main .card-link').length, fail: DATA_FAIL, partial: !!DB._partial, count: document.getElementById('linkCount').innerText.replace(/\s+/g, ' ') }));
    R.skusitZnova = { predKlikom: s1, hnedPoKliku: s2, poNacitani: s3, ms: Date.now() - t0, pokusy: n, errors: log.errors };
    await ctx.close();
  }
  // 6. Snímky pre pohľad návštevníka
  {
    const shots = [
      ['desktop1920-domov', { viewport: { width: 1920, height: 1080 } }, '/', null],
      ['desktop1366-europa', { viewport: { width: 1366, height: 768 } }, '/futbal/kluby/europa/', null],
      ['desktop1920-stlpce-pl', { viewport: { width: 1920, height: 1080 } }, '/futbal/kluby/europa/anglicko/premier-league/', 'cols'],
      ['iphone13-domov', { device: 'iPhone 13' }, '/', null],
      ['iphone13-domov-posun', { device: 'iPhone 13' }, '/', 'scroll'],
      ['pixel5-pl', { device: 'Pixel 5' }, '/futbal/kluby/europa/anglicko/premier-league/', null],
      ['iphone13-hladanie-prazdne', { device: 'iPhone 13' }, '/', 'empty'],
      ['desktop1366-neexistuje', { viewport: { width: 1366, height: 768 } }, '/hokej/neexistuje/', '404'],
    ];
    for (const [name, opts, p, extra] of shots) {
      const ctx = await L.newContext(browser, opts);
      const page = await ctx.newPage();
      await page.goto((extra === '404' ? L.SK404 : L.SK) + p); await L.waitApp(page); await L.waitFull(page); await page.waitForTimeout(500);
      if (extra === 'cols') { await page.click('#vSwitch button[data-mode=cols]'); await page.waitForTimeout(500); const lnk = await page.$('#colsWrap .cit.lnk'); if (lnk) { await lnk.hover(); await page.waitForTimeout(400); } }
      if (extra === 'scroll') { await page.evaluate(() => window.scrollTo(0, 500)); await page.waitForTimeout(300); R.iphoneHlavicka = await page.evaluate(() => ({ headerH: document.querySelector('header').offsetHeight, innerH: innerHeight, podiel: Math.round(document.querySelector('header').offsetHeight / innerHeight * 100) + ' %', aktWrapH: document.getElementById('aktualneWrap').offsetHeight, bannerH: document.querySelector('.banner-wrap').offsetHeight, breadcrumbH: document.getElementById('breadcrumb').offsetHeight, prvaDlazdicaTop: document.querySelector('#main .card-root').getBoundingClientRect().top + scrollY })); }
      if (extra === 'empty') { await page.fill('#srch', 'xyzneexistuje'); await page.waitForTimeout(500); }
      await L.snap(page, 'A-09-' + name);
      await ctx.close();
    }
  }
  await browser.close();
  console.log(JSON.stringify(R, null, 1));
  L.out(R, 'A-09-doplnky.out.json');
})().catch((e) => { console.error('CHYBA', e); process.exit(1); });
