// A-11: rýchle overenie opráv z previerok 1–2 a správania tlačidla ← Späť
const L = require('./A-lib');
(async () => {
  const browser = await L.launch();
  const ctx = await L.newContext(browser, { viewport: { width: 1366, height: 768 } });
  const page = await ctx.newPage(); const log = L.watch(page);
  await page.goto(L.SK + '/'); await L.waitApp(page); await L.waitFull(page);
  const R = {};
  // p2 #5: žiadna dlaždica s 0 linkami pre návštevníka (prejdi všetky priečinky cez tileKids)
  R.prazdneDlazdice = await page.evaluate(() => { let n = 0, ex = []; const walk = (pid) => { for (const k of tileKids(pid)) { if (k.type !== 'folder') continue; const c = k._cnt !== undefined ? k._cnt : countAll(k.id); if (c === 0 && k.id !== LIVE_ID) { n++; if (ex.length < 5) ex.push(k.name); } walk(k.id); } }; walk(null); return { pocet: n, priklady: ex }; });
  // p2 #1: zatvorené okná adminu sú visibility:hidden; Tab 60× nikdy neskončí v .mo
  R.modalyHidden = await page.evaluate(() => [...document.querySelectorAll('.mo')].every((m) => getComputedStyle(m).visibility === 'hidden'));
  let inMo = 0; for (let i = 0; i < 60; i++) { await page.keyboard.press('Tab'); if (await page.evaluate(() => !!document.activeElement.closest('.mo, #pwScreen'))) inMo++; }
  R.tabDoOkien = inMo;
  // ← Späť v appke: pushState alebo history.back?
  await page.evaluate(() => navigate('f_fut')); await page.evaluate(() => navigate('f_fut_klu')); await page.waitForTimeout(200);
  const h0 = await page.evaluate(() => history.length);
  await page.click('.bc-back'); await page.waitForTimeout(300);
  const h1 = await page.evaluate(() => ({ len: history.length, url: location.pathname }));
  await page.goBack(); await page.waitForTimeout(300);
  R.tlacidloSpat = { historyPred: h0, poKlikuSpat: h1, poBrowserBack: await page.evaluate(() => location.pathname) };
  // p1 #11 banner na mobile; p1 #9 16px — mobil
  const m = await L.newContext(browser, { device: 'iPhone 13' }); const mp = await m.newPage();
  await mp.goto(L.SK + '/'); await L.waitApp(mp); await L.waitFull(mp);
  R.mobil = await mp.evaluate(() => ({ slot1: [document.getElementById('bannerSlot').clientWidth, document.getElementById('bannerSlot').clientHeight], slot2Display: getComputedStyle(document.getElementById('bannerSlot2')).display, srchFont: getComputedStyle(document.getElementById('srch')).fontSize, socIcon: (() => { const a = document.querySelector('.card-link .socs a.si'); return a ? [a.offsetWidth, a.offsetHeight] : null; })(), vSwitch: getComputedStyle(document.getElementById('vSwitch')).display }));
  await m.close();
  R.errors = log.errors;
  await browser.close();
  console.log(JSON.stringify(R, null, 1));
  L.out(R, 'A-11-prev.out.json');
})().catch((e) => { console.error('CHYBA', e); process.exit(1); });
