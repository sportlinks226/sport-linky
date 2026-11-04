// A-04: lišta Aktuálne (posun, +N, NEW), stránka /aktualne/ a /live-this-week/, výpadok aktualne.json
const L = require('./A-lib');
const R = {};
const AKT_OK = JSON.stringify({ version: 9, items: [
  { id: 'x1', order: 0, sport: 'tenis', icon: '🎾', name: 'Nová linka NEW', name_en: 'New link NEW', url: 'https://example.com/1', desc: 'Popis SK', desc_en: 'Desc EN', startsAt: '', endsAt: '', disabled: false, addedAt: Date.now() - 3600 * 1000 },
  { id: 'x2', order: 1, sport: 'hokej', icon: '🏒', name: 'Stará linka', name_en: '', url: 'https://example.com/2', desc: '', desc_en: '', startsAt: '', endsAt: '', disabled: false, addedAt: Date.now() - 30 * 86400000 },
  { id: 'x3', order: 2, sport: 'futbal', icon: '⚽', name: 'Vypnutá', url: 'https://example.com/3', disabled: true, addedAt: Date.now() },
  { id: 'x4', order: 3, sport: 'futbal', icon: '⚽', name: 'Budúca', url: 'https://example.com/4', startsAt: '2099-01-01', disabled: false, addedAt: Date.now() },
  { id: 'x5', order: 4, sport: 'basketbal', icon: '🏀', name: 'Skončená', url: 'https://example.com/5', endsAt: '2020-01-01', disabled: false, addedAt: Date.now() },
  { id: 'x6', order: -5, sport: 'golf', icon: '⛳', name: 'Záporné poradie (prvá?)', url: 'https://example.com/6', disabled: false, addedAt: 0 },
  { id: 'x7', order: 6, sport: 'ine', icon: '', name: 'Bez emoji', url: 'https://example.com/7', disabled: false, addedAt: Date.now() },
  { id: 'x8', order: 7, sport: 'sipky', icon: '🎯', name: 'Osem', url: 'https://example.com/8', disabled: false },
  { id: 'x9', order: 8, sport: 'sipky', icon: '🎯', name: 'Deväť', url: 'https://example.com/9', disabled: false },
  { id: 'x10', order: 9, sport: 'sipky', icon: '🎯', name: 'Desať s dlhším názvom podujatia', url: 'https://example.com/10', disabled: false },
  { id: 'x11', order: 10, sport: 'sipky', icon: '🎯', name: 'Jedenásť', url: 'https://example.com/11', disabled: false },
  { id: 'x12', order: 11, sport: 'sipky', icon: '🎯', name: 'Dvanásť', url: 'https://example.com/12', disabled: false },
  { id: 'x13', order: 12, sport: 'tenis', icon: '🎾', name: 'Bez URL', url: '', disabled: false },
  { id: 'x14', order: 13, sport: 'tenis', icon: '🎾', name: 'Zlá URL', url: 'javascript:alert(1)', disabled: false },
] });
async function lista(page) {
  return page.evaluate(() => {
    const s = document.getElementById('aktualneScroll');
    return { items: [...s.querySelectorAll('.akt-card')].map((a) => ({ t: a.innerText.replace(/\n/g, ' ').trim(), href: a.getAttribute('href'), title: a.getAttribute('title'), isNew: !!a.querySelector('.akt-new') })), count: document.getElementById('aktualneCount').textContent, hasMore: document.getElementById('aktualneWrap').classList.contains('has-more'), badge: document.getElementById('aktMoreBadge').textContent, badgeVisible: getComputedStyle(document.getElementById('aktMoreBadge')).display !== 'none', scrollW: s.scrollWidth, clientW: s.clientWidth, maxH: getComputedStyle(s).maxHeight, scrollH: s.scrollHeight, h: s.clientHeight, headHref: document.getElementById('aktHead').getAttribute('href'), headTxt: document.getElementById('aktHeadTxt').textContent, wrapDisplay: getComputedStyle(document.getElementById('aktualneWrap')).display };
  });
}
(async () => {
  const browser = await L.launch();
  const mk = (variant) => async (route, url) => {
    if (/aktualne\.json/.test(url)) {
      if (variant === 'ok') { await route.fulfill({ status: 200, contentType: 'application/json', body: AKT_OK }); return true; }
      if (variant === 'empty') { await route.fulfill({ status: 200, contentType: 'application/json', body: '{"version":5,"items":[]}' }); return true; }
      if (variant === '500') { await route.fulfill({ status: 500, body: 'err' }); return true; }
      if (variant === 'bad') { await route.fulfill({ status: 200, contentType: 'application/json', body: '{"version":5,"items":[' }); return true; }
      if (variant === 'net') { await route.abort('connectionfailed'); return true; }
      if (variant === '404') { await route.fulfill({ status: 404, body: 'nope' }); return true; }
      if (variant === 'slow') { await new Promise((r) => setTimeout(r, 9000)); await route.fulfill({ status: 200, contentType: 'application/json', body: AKT_OK }); return true; }
    }
    return false;
  };
  // 1. skutočný aktualne.json — desktop + mobil, stránka /aktualne/
  for (const dev of [null, 'iPhone 13']) {
    const ctx = await L.newContext(browser, dev ? { device: dev } : { viewport: { width: 1366, height: 768 } });
    const page = await ctx.newPage(); const log = L.watch(page);
    await page.goto(L.SK + '/'); await L.waitApp(page); await L.waitFull(page); await page.waitForTimeout(600);
    const l = await lista(page);
    await page.click('#aktHead'); await page.waitForTimeout(500);
    const pg = await page.evaluate(() => ({ url: location.href, title: document.title, desc: document.querySelector('meta[name=description]').content, cards: [...document.querySelectorAll('#main .card-link')].map((c) => ({ n: c.querySelector('.cl-name').innerText, isNew: !!c.querySelector('.liga-tag'), desc: (c.querySelector('.cl-desc') || {}).innerText })), intro: (document.querySelector('#main .live-intro') || {}).innerText, introPodLinkami: (() => { const i = document.querySelector('#main .live-intro'), g = document.querySelector('#main .grid-deep'); return i && g ? !!(g.compareDocumentPosition(i) & Node.DOCUMENT_POSITION_FOLLOWING) : null; })(), listaSkryta: getComputedStyle(document.getElementById('aktualneWrap')).display === 'none', datumy: /\d{1,2}\.\s?\d{1,2}\./.test(document.getElementById('main').innerText), skupiny: document.querySelectorAll('#main .section-label').length, h1: (document.querySelector('.bc-h') || {}).innerText, fLive: document.getElementById('fLive').hidden }));
    await L.snap(page, 'A-04-aktualne-' + (dev ? 'iphone' : 'desktop'));
    R['skutocne_' + (dev || 'desktop')] = { lista: l, stranka: pg, errors: log.errors };
    await ctx.close();
  }
  // 2. podstrčený aktualne.json so 14 položkami (posun, +N, NEW, poradie, vypnuté, zlá URL)
  for (const dev of [null, 'iPhone 13', 'Pixel 5']) {
    const ctx = await L.newContext(browser, { ...(dev ? { device: dev } : { viewport: { width: 1366, height: 768 } }), routeHook: mk('ok') });
    const page = await ctx.newPage(); const log = L.watch(page);
    await page.goto(L.SK + '/'); await L.waitApp(page); await L.waitFull(page); await page.waitForTimeout(700);
    const l = await lista(page);
    let klik = null;
    if (l.badgeVisible) { await page.click('#aktMoreBadge'); await page.waitForTimeout(700); klik = await lista(page); }
    await L.snap(page, 'A-04-lista14-' + (dev || 'desktop').replace(' ', ''));
    await page.evaluate(() => navigate('f_ltw')); await page.waitForTimeout(500);
    const pg = await page.evaluate(() => ({ title: document.title, cards: [...document.querySelectorAll('#main .card-link')].map((c) => ({ n: c.querySelector('.cl-name').innerText, isNew: !!c.querySelector('.liga-tag'), href: c.querySelector('a').getAttribute('href') })) }));
    await L.snap(page, 'A-04-stranka14-' + (dev || 'desktop').replace(' ', ''));
    R['lista14_' + (dev || 'desktop')] = { lista: l, poKlikuNaBadge: klik, stranka: pg, errors: log.errors };
    await ctx.close();
  }
  // 3. výpadky aktualne.json
  for (const v of ['empty', '500', 'bad', 'net', '404', 'slow']) {
    const ctx = await L.newContext(browser, { viewport: { width: 1366, height: 768 }, routeHook: mk(v) });
    const page = await ctx.newPage(); const log = L.watch(page);
    const t0 = Date.now();
    await page.goto(L.SK + '/'); await L.waitApp(page); await L.waitFull(page); await page.waitForTimeout(v === 'slow' ? 9500 : 800);
    const l = await lista(page);
    await page.evaluate(() => navigate('f_ltw')); await page.waitForTimeout(400);
    const pg = await page.evaluate(() => ({ title: document.title, cards: document.querySelectorAll('#main .card-link').length, text: document.getElementById('main').innerText.slice(0, 120) }));
    R['vypadok_' + v] = { lista: { items: l.items.map((i) => i.t), count: l.count }, stranka: pg, errors: log.errors, ms: Date.now() - t0 };
    await ctx.close();
  }
  // 4. EN: Live This Week (dlaždica na domove, stránka, lišta)
  {
    const ctx = await L.newContext(browser, { viewport: { width: 1366, height: 768 } });
    const page = await ctx.newPage(); const log = L.watch(page);
    await page.goto(L.EN + '/'); await L.waitApp(page); await L.waitFull(page); await page.waitForTimeout(800);
    const l = await lista(page);
    const tile = await page.evaluate(() => !!document.querySelector('#main a.card-root[href="/live-this-week/"]'));
    const hSports = await page.evaluate(() => [...document.querySelectorAll('#hSports a')].map((a) => a.getAttribute('href')));
    await page.click('#aktHead'); await page.waitForTimeout(500);
    const pg = await page.evaluate(() => ({ url: location.href, title: document.title, desc: document.querySelector('meta[name=description]').content, cards: [...document.querySelectorAll('#main .card-link .cl-name')].map((e) => e.innerText), intro: (document.querySelector('#main .live-intro') || {}).innerText, h1: (document.querySelector('.bc-h') || {}).innerText, ext: 0 }));
    await L.snap(page, 'A-04-en-live-this-week');
    R.en = { lista: l, dlazdicaNaDomove: tile, hSports, stranka: pg, extPoziadavky: ctx._ext, errors: log.errors };
    await ctx.close();
  }
  // 5. SK domov: nie je dlaždica Aktuálne (noTileSk), ale je v pätičke a v hlavičke lišty
  {
    const ctx = await L.newContext(browser, { viewport: { width: 1366, height: 768 } });
    const page = await ctx.newPage();
    await page.goto(L.SK + '/'); await L.waitApp(page); await L.waitFull(page);
    R.skDomov = await page.evaluate(() => ({ dlazdicaAktualne: !!document.querySelector('#main a.card-root[href="/aktualne/"]'), hSports: [...document.querySelectorAll('#hSports a')].map((a) => a.getAttribute('href')), fLive: { hidden: document.getElementById('fLive').hidden, href: document.getElementById('fLive').getAttribute('href'), text: document.getElementById('fLive').textContent }, aktHead: document.getElementById('aktHead').getAttribute('href') }));
    await ctx.close();
  }
  await browser.close();
  console.log(JSON.stringify(R, null, 1));
  L.out(R, 'A-04-aktualne.out.json');
})().catch((e) => { console.error('CHYBA', e); process.exit(1); });
