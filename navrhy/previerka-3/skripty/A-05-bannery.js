// A-05: bannery (rotácia, kampaň, sekcie), promo blok Tipovanie, sandboxovaný iframe, CSP, cudzie požiadavky
const L = require('./A-lib');
const R = {};
async function sloty(page) {
  return page.evaluate(() => {
    const s = (id) => { const el = document.getElementById(id); const f = el.querySelector('iframe'); return { bid: el.dataset.bid, iframe: !!f, sandbox: f && f.getAttribute('sandbox'), srcdocLen: f && (f.getAttribute('srcdoc') || '').length, hasScriptTag: f && /<script/i.test(f.getAttribute('srcdoc') || ''), placeholder: !!el.querySelector('.banner-placeholder'), html: el.innerHTML.slice(0, 120), display: getComputedStyle(el).display, w: el.clientWidth, h: el.clientHeight }; };
    return { slot1: s('bannerSlot'), slot2: s('bannerSlot2'), rotate: DB.bannerSettings && DB.bannerSettings.rotate, interval: DB.bannerSettings && DB.bannerSettings.interval, rotateTimer: typeof rotateTimer !== 'undefined' && rotateTimer !== null, promo: (() => { const p = document.querySelector('#main .promo'); if (!p) return null; const f = p.querySelector('iframe'); return { iframe: !!f, sandbox: f && f.getAttribute('sandbox'), cls: f && f.className, h: f && f.clientHeight, title: (p.querySelector('h3') || {}).innerText, btn: (p.querySelector('.promo-btn') || {}).href, rel: (p.querySelector('.promo-btn') || {}).rel, warn: !!document.querySelector('#main .promo-warn'), label: (p.querySelector('.promo-tag') || {}).innerText }; })() };
  });
}
(async () => {
  const browser = await L.launch();
  // 1. domov desktop: sloty, iframe sandbox, CSP, cudzie požiadavky; rotácia s posunutým časom
  {
    const ctx = await L.newContext(browser, { viewport: { width: 1366, height: 768 } });
    const page = await ctx.newPage(); const log = L.watch(page);
    await page.goto(L.SK + '/'); await L.waitApp(page); await L.waitFull(page); await page.waitForTimeout(800);
    const s0 = await sloty(page);
    // Čo robí appka, keď je partnerský skript zablokovaný? (obsah okienka)
    const frames = page.frames().filter((f) => f !== page.mainFrame());
    const frameInfo = [];
    for (const f of frames) { try { frameInfo.push({ url: f.url(), body: (await f.evaluate(() => document.body.innerHTML.slice(0, 200))), origin: await f.evaluate(() => { try { return location.origin; } catch (e) { return 'ERR'; } }), parentAccess: await f.evaluate(() => { try { return !!parent.document; } catch (e) { return 'blocked: ' + e.name; } }), cookie: await f.evaluate(() => { try { document.cookie = 'a=1'; return document.cookie; } catch (e) { return 'blocked: ' + e.name; } }), ls: await f.evaluate(() => { try { return typeof localStorage.getItem; } catch (e) { return 'blocked: ' + e.name; } }) }); } catch (e) { frameInfo.push({ err: String(e).slice(0, 100) }); } }
    // rotácia: idx = floor(Date.now()/1000/interval) % pool → posuň čas o 30 s a zavolaj renderBannerSlot
    const rot = await page.evaluate(() => {
      const out = []; const real = Date.now;
      for (let k = 0; k < 6; k++) { Date.now = () => real() + k * 30000; renderBannerSlot(); out.push([document.getElementById('bannerSlot').dataset.bid, document.getElementById('bannerSlot2').dataset.bid]); }
      Date.now = real; renderBannerSlot(); return out;
    });
    // navigácia do sekcie → prekreslí sa slot (ten istý banner → bez prekreslenia)
    const before = await page.evaluate(() => [...document.querySelectorAll('.banner-slot iframe')].map((f) => f.contentWindow ? 1 : 0).length);
    const ifr1 = await page.evaluate(() => { window.__f1 = document.querySelector('#bannerSlot iframe'); return !!window.__f1; });
    await page.evaluate(() => navigate('f_hok')); await page.waitForTimeout(300);
    const sameIframe = await page.evaluate(() => window.__f1 === document.querySelector('#bannerSlot iframe'));
    R.domov = { sloty: s0, frames: frameInfo, rotaciaPosunCasu: rot, iframePoNavigaciiZostal: sameIframe, ext: ctx._ext, csp: log.csp, errors: log.errors, console: log.console.filter((c) => !/ERR_BLOCKED/.test(c.text)).map((c) => c.text) };
    await L.snap(page, 'A-05-domov-bannery');
    await ctx.close();
  }
  // 2. Tipovanie: promo blok + okienko s rotátorom; výška cez postMessage; falošná správa z cudzieho okna
  {
    const ctx = await L.newContext(browser, { viewport: { width: 1366, height: 768 } });
    const page = await ctx.newPage(); const log = L.watch(page);
    await page.goto(L.SK + '/tipovanie/'); await L.waitApp(page); await L.waitFull(page); await page.waitForTimeout(800);
    const s = await sloty(page);
    const tiles = await page.evaluate(() => [...document.querySelectorAll('#main .card-link .cl-name')].map((e) => e.innerText));
    // falošný postMessage z hlavného okna (e.source = window, nie okienko) → výška sa nesmie zmeniť
    const fake = await page.evaluate(async () => { const f = document.querySelector('#main iframe.adframe-auto'); const h0 = f.style.height; window.postMessage({ sportlinkyAdH: 900 }, '*'); await new Promise((r) => setTimeout(r, 200)); return { pred: h0, po: f.style.height }; });
    // promo blok mimo sekcie Tipovanie?
    await page.evaluate(() => navigate('f_fut')); await page.waitForTimeout(300);
    const promoVFutbale = await page.evaluate(() => !!document.querySelector('#main .promo'));
    // promo v stĺpcoch — mimo pásu?
    await page.evaluate(() => navigate('f_tip')); await page.waitForTimeout(300);
    await page.click('#vSwitch button[data-mode=cols]'); await page.waitForTimeout(500);
    const promoCols = await page.evaluate(() => ({ promo: !!document.querySelector('#colsPromo .promo'), vPase: !!document.querySelector('#colsWrap .promo') }));
    await page.click('#vSwitch button[data-mode=tiles]'); await page.waitForTimeout(300);
    // mobil
    const mctx = await L.newContext(browser, { device: 'iPhone 13' });
    const mp = await mctx.newPage(); const mlog = L.watch(mp);
    await mp.goto(L.SK + '/tipovanie/'); await L.waitApp(mp); await L.waitFull(mp); await mp.waitForTimeout(800);
    const ms = await sloty(mp);
    const mPromoPos = await mp.evaluate(() => { const p = document.querySelector('#main .promo'), g = document.querySelector('#main .grid-deep'); return { promoTop: p && p.getBoundingClientRect().top, gridTop: g && g.getBoundingClientRect().top, promoH: p && p.offsetHeight, banW: document.querySelector('.promo-ban') && document.querySelector('.promo-ban').offsetWidth, slot1W: document.getElementById('bannerSlot').clientWidth, slot1H: document.getElementById('bannerSlot').clientHeight, slot2Display: getComputedStyle(document.getElementById('bannerSlot2')).display }; });
    await L.snap(mp, 'A-05-iphone-tipovanie');
    await mctx.close();
    R.tipovanie = { sloty: s, dlazdice: tiles, falosnyPostMessage: fake, promoVFutbale, promoVStlpcoch: promoCols, mobil: { sloty: ms, poloha: mPromoPos, errors: mlog.errors }, ext: ctx._ext, csp: log.csp, errors: log.errors };
    await L.snap(page, 'A-05-tipovanie-desktop');
    await ctx.close();
  }
  // 3. Kampaň od–do a sekcie: podstrč data.json s upravenými bannermi (lokálny čas)
  {
    const d = JSON.parse(require('fs').readFileSync(L.BUILD + '/site-sk/data.json', 'utf8'));
    const today = new Date(); const ymd = (dt) => dt.getFullYear() + '-' + String(dt.getMonth() + 1).padStart(2, '0') + '-' + String(dt.getDate()).padStart(2, '0');
    const t = ymd(today), zajtra = ymd(new Date(today.getTime() + 86400000)), vcera = ymd(new Date(today.getTime() - 86400000));
    d.banners = [
      { id: 'k_dnes', name: 'dnes', html: '<a href="/">DNES</a>', active: true, slot: 1, startsAt: t, endsAt: t, weight: 1 },
      { id: 'k_zajtra', name: 'zajtra', html: '<a href="/">ZAJTRA</a>', active: true, slot: 1, startsAt: zajtra, endsAt: null, weight: 1 },
      { id: 'k_vcera', name: 'vcera', html: '<a href="/">VCERA</a>', active: true, slot: 1, startsAt: null, endsAt: vcera, weight: 1 },
      { id: 'k_hokej', name: 'hokej', html: '<a href="/">HOKEJ</a>', active: true, slot: 2, sectionId: 'f_hok', weight: 1 },
      { id: 'k_vypnuty', name: 'off', html: '<a href="/">OFF</a>', active: false, slot: 2, weight: 1 },
      { id: 'k_js', name: 'js', imageUrl: 'javascript:alert(1)', linkUrl: 'javascript:alert(2)', active: true, slot: 2, sectionId: 'f_fut', weight: 1 },
      { id: 'k_img', name: 'img onerror', html: '<img src="x" onerror="window.__xss=1">', active: true, slot: 1, sectionId: 'f_ten', weight: 1 },
    ];
    d.bannerSettings = { rotate: false, interval: 0, activeId: null };
    const body = JSON.stringify(d);
    const ctx = await L.newContext(browser, { viewport: { width: 1366, height: 768 }, routeHook: async (route, url) => { if (/data\.json/.test(url)) { await route.fulfill({ status: 200, contentType: 'application/json', body }); return true; } return false; } });
    const page = await ctx.newPage(); const log = L.watch(page);
    await page.goto(L.SK + '/'); await L.waitApp(page); await L.waitFull(page); await page.waitForTimeout(600);
    const h = await page.evaluate(() => ({ s1: document.getElementById('bannerSlot').innerText, s1bid: document.getElementById('bannerSlot').dataset.bid, s2: document.getElementById('bannerSlot2').innerText, s2bid: document.getElementById('bannerSlot2').dataset.bid, interval: bannerInterval(), eligible1: eligibleBanners(1).map((b) => b.id), eligible2: eligibleBanners(2).map((b) => b.id) }));
    await page.evaluate(() => navigate('f_hok')); await page.waitForTimeout(300);
    const hok = await page.evaluate(() => ({ s2bid: document.getElementById('bannerSlot2').dataset.bid, s2: document.getElementById('bannerSlot2').innerText }));
    await page.evaluate(() => navigate('f_hok_sut')); await page.waitForTimeout(300);
    const hokSut = await page.evaluate(() => ({ s2bid: document.getElementById('bannerSlot2').dataset.bid }));
    await page.evaluate(() => navigate('f_fut')); await page.waitForTimeout(300);
    const fut = await page.evaluate(() => ({ s2html: document.getElementById('bannerSlot2').innerHTML.slice(0, 300) }));
    await page.evaluate(() => navigate('f_ten')); await page.waitForTimeout(500);
    const ten = await page.evaluate(() => ({ s1html: document.getElementById('bannerSlot').innerHTML.slice(0, 200), xss: window.__xss }));
    R.kampan = { dnes: t, domov: h, hokej: hok, hokejSutaze: hokSut, futbalJsUrl: fut, tenisImgOnerror: ten, errors: log.errors, csp: log.csp };
    await ctx.close();
  }
  // 4. EN domov: EN bannery (SVG, navClick), kliknutie na banner = navigácia v appke?
  {
    const ctx = await L.newContext(browser, { viewport: { width: 1366, height: 768 } });
    const page = await ctx.newPage(); const log = L.watch(page);
    await page.goto(L.EN + '/'); await L.waitApp(page); await L.waitFull(page); await page.waitForTimeout(600);
    const s = await sloty(page);
    const a2 = await page.$('#bannerSlot2 a');
    let klik = null;
    if (a2) { await a2.click(); await page.waitForTimeout(400); klik = await page.evaluate(() => ({ url: location.href, curId })); }
    R.en = { sloty: s, klikSlot2: klik, ext: ctx._ext, csp: log.csp, errors: log.errors };
    await L.snap(page, 'A-05-en-domov');
    await ctx.close();
  }
  await browser.close();
  console.log(JSON.stringify(R, null, 1));
  L.out(R, 'A-05-bannery.out.json');
})().catch((e) => { console.error('CHYBA', e); process.exit(1); });
