// A2-01: prihlásenie, heslo (čas PBKDF2, počet pokusov), odhlásenie, únik admin stavu
const L = require('./A2-lib.js');
(async () => {
  const browser = await L.chromium.launch();
  const R = {};
  const ctx = await L.newContext(browser);
  const page = await ctx.newPage();
  const log = L.watch(page); L.autoDialog(page, log, true);
  await page.goto(L.SK + '/');
  await L.waitFull(page);

  // 1) dá sa admin otvoriť bez hesla? (toggleAdmin bez nášho pwKdf → musí pýtať heslo)
  await page.evaluate(() => toggleAdmin());
  R.pwScreenOpensWithoutKdf = await page.evaluate(() => document.getElementById('pwScreen').classList.contains('open'));
  R.adminModeAfterToggle = await page.evaluate(() => adminMode);
  // Escape zavrie okno hesla a zmaže #admin
  await page.evaluate(() => { location.hash = '#admin'; });
  await page.waitForTimeout(200);
  R.hashAfterAdminHash = await page.evaluate(() => location.hash);
  await page.keyboard.press('Escape');
  R.pwScreenAfterEsc = await page.evaluate(() => document.getElementById('pwScreen').classList.contains('open'));
  R.hashAfterEsc = await page.evaluate(() => location.hash);

  // 2) zlé heslo — čas overenia (desktop), 5 pokusov za sebou (žiadne spomalenie?)
  await page.evaluate((k) => { DB.pwKdf = k; }, L.KDF);
  const times = [];
  for (let i = 0; i < 5; i++) {
    await page.evaluate(() => toggleAdmin());
    await page.fill('#pwIn', 'zle' + i);
    const t0 = Date.now();
    await page.click('#pwBtn');
    await page.waitForFunction(() => document.getElementById('pwErr').textContent.length > 0, null, { timeout: 60000 });
    times.push(Date.now() - t0);
    R.wrongPwMsg = await page.textContent('#pwErr');
    await page.keyboard.press('Escape');
  }
  R.wrongPwTimesDesktopMs = times;

  // CPU spomalenie 4× a 6× (približne mobil) — čas jedného overenia
  const cdp = await ctx.newCDPSession(page);
  for (const rate of [4, 6]) {
    await cdp.send('Emulation.setCPUThrottlingRate', { rate });
    await page.evaluate(() => toggleAdmin());
    await page.fill('#pwIn', 'zle');
    const t0 = Date.now();
    await page.click('#pwBtn');
    await page.waitForFunction(() => document.getElementById('pwErr').textContent.length > 0, null, { timeout: 120000 });
    R['wrongPwMs_cpu' + rate + 'x'] = Date.now() - t0;
    await page.keyboard.press('Escape');
  }
  await cdp.send('Emulation.setCPUThrottlingRate', { rate: 1 });

  // 3) správne heslo
  const li = await L.login(page);
  R.login = li;
  R.afterLogin = await page.evaluate(() => ({
    adminMode, verBadge: document.getElementById('verBadge').textContent,
    adminBarVisible: getComputedStyle(document.getElementById('adminBar')).display,
    bodyClass: document.body.className,
    dbKeys: Object.keys(DB), lite: DB._lite, partial: DB._partial,
    nodeKeysSample: Object.keys(DB.nodes.find(n => n.id === 'f_fut')),
    anyCnt: DB.nodes.some(n => n._cnt !== undefined || n._sub !== undefined || n._k !== undefined),
    pwKdfIsReal: DB.pwKdf && DB.pwKdf.salt !== '00112233445566778899aabbccddeeff',
    hash: location.hash,
    cardBars: document.querySelectorAll('.card-admin-bar').length,
    cardBarDisplay: getComputedStyle(document.querySelector('.card-admin-bar')).display,
  }));
  await L.shot(page, 'A2-01-admin-desktop.png');

  // 4) úprava (nastavenia podnadpisu) → uloženie → odhlásenie → obnovenie stránky: čo vidí návštevník v tom istom prehliadači
  await page.evaluate(() => openSettings());
  await page.fill('#stSub', 'TEST PODNADPIS A2');
  await page.click('#settMo .btn-p');
  await page.waitForTimeout(500);
  R.lsAfterSave = await page.evaluate(() => ({ ver: localStorage.getItem('sportStromVer'), dirty: localStorage.getItem('sportStromDirty'), keys: Object.keys(localStorage) }));
  await page.click('#adminBar .btn-d');
  R.afterLogout = await page.evaluate(() => ({
    adminMode, bodyClass: document.body.className,
    adminBarDisplay: getComputedStyle(document.getElementById('adminBar')).display,
    sub: document.getElementById('siteSub').textContent,
    ls: { ver: localStorage.getItem('sportStromVer'), dirty: localStorage.getItem('sportStromDirty') },
    dbVersion: DB.version, dbHasTitleEn: 'title_en' in DB,
  }));
  await page.reload();
  await L.waitFull(page);
  R.afterReloadVisitor = await page.evaluate(async () => {
    const idb = await idbGet().catch(e => 'ERR ' + e.message);
    return {
      adminMode, sub: document.getElementById('siteSub').textContent,
      dbVersion: DB.version, lite: DB._lite, hasTitleEn: 'title_en' in DB, hasPwKdf: !!DB.pwKdf,
      idbStored: idb ? { version: idb.version, nodes: idb.nodes && idb.nodes.length, subtitle: idb.subtitle, hasTitleEn: 'title_en' in idb } : null,
      ls: { ver: localStorage.getItem('sportStromVer'), dirty: localStorage.getItem('sportStromDirty') },
      adminBarInDom: !!document.getElementById('adminBar'),
      modalsInDom: document.querySelectorAll('.mo').length,
    };
  });
  R.dialogs = log.dialogs; R.console = log.console; R.errors = log.errors; R.csp = log.csp; R.ext = ctx._ext.slice(0, 5);
  L.saveLog('A2-01-prihlasenie.log.json', R);
  console.log(JSON.stringify(R, null, 1));
  await browser.close();
})().catch(e => { console.error('CHYBA', e); process.exit(1); });
