// A2-07: Nastavenia (title/subtitle/heslo), bannery (validácia, zmazanie bez uloženia), promo blok; + jedno Publikovať pre test generátora
const L = require('./A2-lib.js');
(async () => {
  const browser = await L.chromium.launch();
  const R = {};
  const ctx = await L.newContext(browser);
  const page = await ctx.newPage();
  const log = L.watch(page); L.autoDialog(page, log, true);
  await page.goto(L.SK + '/');
  R.login = await L.login(page);

  // --- NASTAVENIA
  await page.evaluate(() => openSettings());
  await page.waitForTimeout(150);
  R.sett = { focus: await page.evaluate(() => document.activeElement && document.activeElement.id), title: await page.inputValue('#stTitle') };
  await page.fill('#stTitle', ''); await page.fill('#stSub', '');
  await page.evaluate(() => saveSett());
  await page.waitForTimeout(300);
  R.sett.afterEmpty = await page.evaluate(() => ({ title: DB.title, sub: DB.subtitle, docTitle: document.title, siteSub: document.getElementById('siteSub').textContent }));
  // zmena hesla → odhlásiť → prihlásiť novým (bez reloadu) a po reloade
  await page.evaluate(() => openSettings());
  await page.fill('#stPw', 'nove5678');
  const kdfBefore = await page.evaluate(() => DB.pwKdf.salt);
  await page.evaluate(() => saveSett());
  await page.waitForTimeout(500);
  R.pw = { saltChanged: (await page.evaluate(() => DB.pwKdf.salt)) !== kdfBefore, iter: await page.evaluate(() => DB.pwKdf.iter) };
  await page.evaluate(() => logoutAdmin());
  // prihlásenie bez vloženia nášho KDF (DB už nie je lite → overí sa oproti DB.pwKdf)
  await page.evaluate(() => { location.hash = '#admin'; });
  await page.waitForSelector('#pwScreen.open');
  await page.fill('#pwIn', L.TEST_PW); await page.click('#pwBtn');
  await page.waitForFunction(() => adminMode === true || /Nesprávne/.test(document.getElementById('pwErr').textContent), null, { timeout: 60000 });
  R.pw.oldPwAfterChange = await page.evaluate(() => ({ admin: adminMode, err: document.getElementById('pwErr').textContent }));
  await page.fill('#pwIn', 'nove5678'); await page.click('#pwBtn');
  await page.waitForFunction(() => adminMode === true || /Nesprávne/.test(document.getElementById('pwErr').textContent), null, { timeout: 60000 });
  R.pw.newPwAfterChange = await page.evaluate(() => ({ admin: adminMode, err: document.getElementById('pwErr').textContent }));
  // po reloade: DB z IndexedDB (dirty) → nové heslo platí? (lite dáta z webu majú STARÝ pwKdf, ale dirty draft má nový)
  await page.reload(); await L.waitFull(page);
  await page.evaluate(() => { location.hash = '#admin'; });
  await page.waitForSelector('#pwScreen.open');
  await page.fill('#pwIn', 'nove5678'); await page.click('#pwBtn');
  await page.waitForFunction(() => adminMode === true || /Nesprávne|nepodarilo/.test(document.getElementById('pwErr').textContent), null, { timeout: 60000 });
  R.pw.newPwAfterReload = await page.evaluate(() => ({ admin: adminMode, err: document.getElementById('pwErr').textContent, lite: DB._lite, ver: DB.version }));
  if (!(await page.evaluate(() => adminMode))) { await page.keyboard.press('Escape'); R.login2 = await L.login(page); }

  // --- BANNERY
  await page.evaluate(() => openBannerFarm());
  await page.waitForTimeout(200);
  R.ban = { rows: await page.evaluate(() => document.querySelectorAll('.bfarm-row').length), n: await page.evaluate(() => DB.banners.length) };
  await L.shot(page, 'A2-07-bannery.png');
  const tryBanner = async (f) => {
    await page.evaluate(() => openAddBanner());
    await page.waitForTimeout(100);
    for (const [k, v] of Object.entries(f)) { if (k === 'bSlot' || k === 'bSection') await page.selectOption('#' + k, v); else await page.fill('#' + k, v); }
    const d0 = log.dialogs.length;
    await page.evaluate(() => saveBanner());
    await page.waitForTimeout(150);
    const r = { alerts: log.dialogs.slice(d0).map(d => d.msg), open: await page.evaluate(() => document.getElementById('bannerEditMo').classList.contains('open')), n: await page.evaluate(() => DB.banners.length) };
    await page.evaluate(() => closeMo('bannerEditMo'));
    return r;
  };
  R.ban.empty = await tryBanner({ bName: 'Prázdny' });
  R.ban.datesReversed = await tryBanner({ bName: 'Naopak', bImg: 'https://priklad.sk/b.png', bFrom: '2026-12-01', bTo: '2026-11-01' });
  R.ban.imgNoLink = await tryBanner({ bName: 'Obrázok bez cieľa A2', bImg: 'https://priklad.sk/b.png' });
  R.ban.jsLink = await tryBanner({ bName: 'JS cieľ A2', bImg: 'https://priklad.sk/b.png', bLink: 'javascript:alert(1)' });
  R.ban.httpImg = await tryBanner({ bName: 'HTTP obrázok A2', bImg: 'http://priklad.sk/b.png', bLink: 'https://priklad.sk' });
  R.ban.htmlScript = await tryBanner({ bName: 'HTML skript A2', bHtml: '<img src=x onerror="document.title=\'XSS\'"><script>document.body.dataset.xss="1"</script>' });
  R.ban.weight99 = await tryBanner({ bName: 'Váha 99 A2', bImg: 'https://priklad.sk/w.png', bWeight: '99' });
  R.ban.saved = await page.evaluate(() => DB.banners.filter(b => /A2$/.test(b.name)).map(b => ({ name: b.name, linkUrl: b.linkUrl, imageUrl: b.imageUrl, weight: b.weight, slot: b.slot, active: b.active, html: (b.html || '').slice(0, 40) })));
  R.ban.xssTitle = await page.evaluate(() => document.title); R.ban.xssBody = await page.evaluate(() => document.body.dataset.xss || null);
  R.ban.slotHtml = await page.evaluate(() => document.getElementById('bannerSlot').innerHTML.slice(0, 200));
  // zmazanie bannera bez „Uložiť nastavenia“ → zavrieť okno → reload → je späť?
  const idDel = await page.evaluate(() => DB.banners.find(b => b.name === 'Váha 99 A2').id);
  await page.evaluate((id) => { openBannerFarm(); deleteBanner(id); }, idDel);
  await page.waitForTimeout(100);
  R.ban.afterDeleteMem = await page.evaluate((id) => ({ inDb: !!DB.banners.find(b => b.id === id), dirtyLs: localStorage.getItem('sportStromDirty') }), idDel);
  R.ban.afterDeleteIdb = await page.evaluate(async (id) => { const s = await idbGet(); return !!(s && s.banners.find(b => b.id === id)); }, idDel);
  await page.evaluate(() => closeMo('bannerFarmMo'));
  await page.reload(); await L.waitFull(page);
  R.ban.afterReloadStillThere = await page.evaluate((id) => !!DB.banners.find(b => b.id === id), idDel);
  // to isté pre ⏸ vypnutie a ⚡ aktivovanie
  R.login3 = await L.login(page);
  const idTog = await page.evaluate(() => DB.banners.find(b => b.name === 'HTTP obrázok A2').id);
  await page.evaluate((id) => { openBannerFarm(); toggleBannerActive(id); activateBanner(id); closeMo('bannerFarmMo'); }, idTog);
  R.ban.toggleInMem = await page.evaluate((id) => ({ active: DB.banners.find(b => b.id === id).active, activeId: DB.bannerSettings.activeId }), idTog);
  R.ban.toggleInIdb = await page.evaluate(async (id) => { const s = await idbGet(); return { active: s.banners.find(b => b.id === id).active, activeId: s.bannerSettings.activeId }; }, idTog);
  // rotácia: interval 0 / 99999
  await page.evaluate(() => { openBannerFarm(); document.getElementById('rotateChk').checked = true; document.getElementById('rotateInterval').value = '0'; saveBannerSettings(); });
  R.ban.interval0 = await page.evaluate(() => ({ stored: DB.bannerSettings.interval, used: bannerInterval() }));
  await page.evaluate(() => { openBannerFarm(); document.getElementById('rotateInterval').value = '1'; saveBannerSettings(); });
  R.ban.interval1 = await page.evaluate(() => ({ stored: DB.bannerSettings.interval, used: bannerInterval() }));

  // --- PROMO
  await page.evaluate(() => openPromoList());
  await page.waitForTimeout(200);
  R.promo = { rows: await page.evaluate(() => document.querySelectorAll('.promo-list-row').length), sections: await page.evaluate(() => [...document.querySelectorAll('#pbSection option')].length) };
  await L.shot(page, 'A2-07-promo.png');
  const tryPromo = async (f) => {
    await page.evaluate(() => openAddPromo());
    await page.waitForTimeout(100);
    for (const [k, v] of Object.entries(f)) { if (k === 'pSection') await page.selectOption('#' + k, v); else await page.fill('#' + k, v); }
    const d0 = log.dialogs.length;
    await page.evaluate(() => savePromo());
    await page.waitForTimeout(150);
    const r = { alerts: log.dialogs.slice(d0).map(d => d.msg), open: await page.evaluate(() => document.getElementById('promoEditMo').classList.contains('open')), n: await page.evaluate(() => DB.promos.length) };
    await page.evaluate(() => closeMo('promoEditMo'));
    return r;
  };
  R.promo.empty = await tryPromo({ pName: 'x' });
  R.promo.jsBtn = await tryPromo({ pTitle: 'T', pText: 'txt', pBtnText: 'B', pBtnUrl: 'javascript:alert(1)' });
  R.promo.ok = await tryPromo({ pName: 'Promo A2', pTitle: 'Nadpis A2 <b>x</b>', pText: 'odsek 1\n\nodsek 2', pBtnText: 'Klik', pBtnUrl: 'https://priklad.sk/promo', pSection: 'f_tip' });
  R.promo.datesReversed = await tryPromo({ pTitle: 'T', pText: 'txt', pBtnText: 'B', pBtnUrl: 'https://p.sk', pFrom: '2026-12-01', pTo: '2026-11-01' });
  await page.evaluate(() => navigate('f_tip'));
  await page.waitForTimeout(300);
  R.promo.renderedInTip = await page.evaluate(() => ({ block: !!document.querySelector('.promo-block, .promo-txt'), titles: [...document.querySelectorAll('.promo-txt h3')].map(h => h.textContent), btnHrefs: [...document.querySelectorAll('.promo-btn')].map(a => a.getAttribute('href')), editBtn: !!document.querySelector('.promo-edit-btn') }));
  await L.shot(page, 'A2-07-promo-tipovanie.png');
  // promoBanner: uložiť s prázdnym kódom
  await page.evaluate(() => { openPromoList(); document.getElementById('pbHtml').value = ''; document.getElementById('pbLabel').value = ''; savePromoBanner(); });
  R.promo.bannerEmpty = await page.evaluate(() => DB.promoBanner);

  // --- jedno Publikovať pre test generátora (uloží sa ako A2-publikovany-data.json)
  await page.evaluate(() => navigate('f_ten_spr'));
  await page.evaluate(() => { openAdd(); document.getElementById('nName').value = 'Testovacia linka A2'; document.getElementById('nUrl').value = 'https://priklad.sk/a2'; document.getElementById('nNameEn').value = 'Test link A2'; saveNode(); });
  await page.evaluate(() => { openAdd(); setType('folder'); document.getElementById('nName').value = 'Nový priečinok A2'; saveNode(); });
  const [d] = await Promise.all([page.waitForEvent('download', { timeout: 20000 }), page.evaluate(() => publishData())]);
  const pp = L.path.join(L.DL, 'A2-publikovany-data.json'); await d.saveAs(pp);
  R.publish = { name: d.suggestedFilename(), path: pp, size: L.fs.statSync(pp).size, ver: await page.evaluate(() => DB.version) };

  R.dialogs = log.dialogs; R.console = log.console.filter(c => !/ERR_BLOCKED_BY_CLIENT/.test(c.text)); R.errors = log.errors; R.csp = log.csp; R.http = log.http;
  L.saveLog('A2-07-nastavenia-bannery.log.json', R);
  console.log(JSON.stringify(R, null, 1));
  await browser.close();
})().catch(e => { console.error('CHYBA', e); process.exit(1); });
