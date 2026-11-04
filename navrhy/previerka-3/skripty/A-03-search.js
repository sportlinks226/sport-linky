// A-03: vyhľadávanie — diakritika, zvýraznenie, prázdne, krátke/dlhé, rýchle písanie, Escape, EN, popisy, URL, Späť
const L = require('./A-lib');
const R = {};
async function search(page, q, wait = 450) {
  await page.fill('#srch', q); await page.waitForTimeout(wait);
  return page.evaluate((q) => {
    const main = document.getElementById('main');
    const secs = [...main.querySelectorAll('.section-label')].map((e) => e.innerText.trim());
    const first = [...main.querySelectorAll('.card-folder .cf-name, .card-link .cl-name')].slice(0, 6).map((e) => e.innerText.trim());
    return { q, url: location.href, secs, total: main.querySelectorAll('.card-folder, .card-link').length, first, marks: main.querySelectorAll('mark').length, snips: main.querySelectorAll('.sr-snip').length, empty: !!main.querySelector('.empty'), text: main.innerText.slice(0, 90), srLive: (document.getElementById('srLive') || {}).textContent, title: document.title, ms: 0 };
  }, q);
}
(async () => {
  const browser = await L.launch();
  const ctx = await L.newContext(browser, { viewport: { width: 1366, height: 768 } });
  const page = await ctx.newPage(); const log = L.watch(page);
  await page.goto(L.SK + '/'); await L.waitApp(page); await L.waitFull(page);
  R.sk = {};
  for (const q of ['kosice', 'Košice', 'KOŠICE', 'brondby', 'Brøndby', 'lodz', 'preussen', 'slovan', 'juhoslov', 'a', 'ab', 'x', 'žž', '   ', 'xyzxyzneexistuje', 'slovan hokej', 'dac dun', 'real madrid', 'bayern', 'hokej', 'liga', '.', '(', '*', '\\', 'a'.repeat(300)]) {
    const t0 = Date.now();
    const r = await search(page, q);
    r.ms = Date.now() - t0;
    R.sk[q.length > 20 ? q.slice(0, 10) + '…(' + q.length + ')' : q] = r;
  }
  // zvýraznenie v popise: hľadanie slova, ktoré je len v popise
  R.popis = await search(page, 'tradicny');
  await L.snap(page, 'A-03-hladanie-popis');
  // rýchle písanie: 'ko','kos','kosi','kosic','kosice' po 50 ms → výsledok musí patriť poslednému
  {
    await page.fill('#srch', '');
    for (const part of ['k', 'ko', 'kos', 'kosi', 'kosic', 'kosice']) { await page.fill('#srch', part); await page.waitForTimeout(50); }
    await page.waitForTimeout(500);
    R.rychlePisanie = await page.evaluate(() => ({ q: document.getElementById('srch').value, first: [...document.querySelectorAll('#main .cl-name, #main .cf-name')].slice(0, 3).map((e) => e.innerText), total: document.querySelectorAll('#main .card-folder, #main .card-link').length }));
  }
  // race: napíš dotaz a HNEĎ klikni na dlaždicu/odkaz (navigácia pred debounce)
  {
    await page.fill('#srch', ''); await page.waitForTimeout(400);
    await page.fill('#srch', 'kosice');
    await page.waitForTimeout(20);
    await page.evaluate(() => navigate('f_hok'));
    await page.waitForTimeout(600);
    R.raceDebounceNav = await page.evaluate(() => ({ url: location.href, srch: document.getElementById('srch').value, curId, mainText: document.getElementById('main').innerText.slice(0, 60), isSearch: !!document.querySelector('#main .sr-path') }));
  }
  // Escape / vymazanie
  {
    await page.fill('#srch', 'kosice'); await page.waitForTimeout(400);
    await page.focus('#srch'); await page.keyboard.press('Escape'); await page.waitForTimeout(400);
    R.escape = await page.evaluate(() => ({ srch: document.getElementById('srch').value, isSearch: !!document.querySelector('#main .sr-path'), url: location.href }));
    await page.fill('#srch', ''); await page.waitForTimeout(400);
    R.vymazane = await page.evaluate(() => ({ srch: document.getElementById('srch').value, isSearch: !!document.querySelector('#main .sr-path'), url: location.href, curId }));
  }
  // URL stav počas hľadania + reload + Späť
  {
    await page.fill('#srch', 'kosice'); await page.waitForTimeout(400);
    const u = page.url();
    await page.reload(); await L.waitApp(page); await L.waitFull(page); await page.waitForTimeout(300);
    R.urlStav = { pocas: u, poReloade: { srch: await page.inputValue('#srch'), isSearch: await page.evaluate(() => !!document.querySelector('#main .sr-path')) } };
  }
  // hľadanie Aktuálnych (ATP) — majú ísť prvé
  R.aktualneVHladani = await search(page, 'atp');
  // Hľadanie z hlbokej stránky — zostáva URL hlbokej stránky?
  await page.evaluate(() => navigate('f_fut_klu_eu_ang')); await page.waitForTimeout(300);
  R.zHlbky = await search(page, 'arsenal');
  await page.evaluate(() => navigate(null)); await page.waitForTimeout(300);
  // mobil
  const mctx = await L.newContext(browser, { device: 'iPhone 13' });
  const mp = await mctx.newPage(); const mlog = L.watch(mp);
  await mp.goto(L.SK + '/'); await L.waitApp(mp); await L.waitFull(mp);
  R.mobil = await search(mp, 'kosice');
  await L.snap(mp, 'A-03-iphone-hladanie');
  R.mobilFontSize = await mp.evaluate(() => getComputedStyle(document.getElementById('srch')).fontSize);
  await mctx.close();
  // EN web: name_en, EN popisy, skryté en:false
  const ectx = await L.newContext(browser, { viewport: { width: 1366, height: 768 } });
  const ep = await ectx.newPage(); const elog = L.watch(ep);
  await ep.goto(L.EN + '/'); await L.waitApp(ep); await L.waitFull(ep);
  R.en = {};
  for (const q of ['kosice', 'košice', 'germany', 'nemecko', 'england', 'anglicko', 'brondby', 'tipsport', 'atp', 'slovan']) R.en[q] = await search(ep, q);
  await L.snap(ep, 'A-03-en-hladanie');
  // SK: skryté enOnly? hľadaj 'live this week'
  R.skEnOnly = await search(page, 'live this');
  R.skTipovanie = await search(page, 'tipsport');
  R.log = { skErrors: log.errors, enErrors: elog.errors, mobErrors: mlog.errors, skConsole: log.console.filter((c) => !/ERR_BLOCKED/.test(c.text)).slice(0, 10) };
  await browser.close();
  console.log(JSON.stringify(R, null, 1));
  L.out(R, 'A-03-search.out.json');
})().catch((e) => { console.error('CHYBA', e); process.exit(1); });
