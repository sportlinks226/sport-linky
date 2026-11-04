// A2-06: admin z mobilu (iPhone 13, Pixel 5, 375 px) — okno hesla, lišta, karty s tlačidlami, okná, prekrývanie, šírka, snímky
const L = require('./A2-lib.js');
(async () => {
  const browser = await L.chromium.launch();
  const R = {};
  const confs = [
    { key: 'iphone13', device: 'iPhone 13', base: L.SK },
    { key: 'pixel5', device: 'Pixel 5', base: L.SK },
    { key: 'w375', viewport: { width: 375, height: 667 }, base: L.SK },
    { key: 'en_pixel5', device: 'Pixel 5', base: L.EN },
  ];
  for (const c of confs) {
    const ctx = await L.newContext(browser, c.device ? { device: c.device } : { viewport: c.viewport });
    const page = await ctx.newPage();
    const log = L.watch(page); L.autoDialog(page, log, true);
    const r = { viewport: page.viewportSize() };
    await page.goto(c.base + '/');
    await L.waitFull(page);
    await page.evaluate((k) => { DB.pwKdf = k; location.hash = '#admin'; }, L.KDF);
    await page.waitForSelector('#pwScreen.open');
    await page.waitForTimeout(200);
    r.pwBox = await page.evaluate(() => { const b = document.querySelector('.pw-box').getBoundingClientRect(); return { w: b.width, left: b.left, right: b.right, vw: innerWidth, inputFocused: document.activeElement && document.activeElement.id }; });
    await L.shot(page, `A2-06-${c.key}-heslo.png`);
    await page.fill('#pwIn', L.TEST_PW);
    const t0 = Date.now();
    await page.click('#pwBtn');
    await page.waitForFunction(() => adminMode === true, null, { timeout: 60000 });
    r.loginMs = Date.now() - t0;
    await page.waitForTimeout(400);
    r.home = await page.evaluate(() => {
      const bar = document.getElementById('adminBar').getBoundingClientRect();
      const btns = [...document.querySelectorAll('#adminBar .btn, #adminBar label')].map(b => { const x = b.getBoundingClientRect(); return { t: b.textContent.trim().slice(0, 14), w: Math.round(x.width), h: Math.round(x.height), visible: x.width > 0 && x.right <= innerWidth + 1 }; });
      const foot = document.querySelector('footer').getBoundingClientRect();
      return { barH: Math.round(bar.height), barTop: Math.round(bar.top), barRows: new Set(btns.map(b => Math.round(b.h))).size, btns, vh: innerHeight, scrollW: document.documentElement.scrollWidth, vw: innerWidth, horizScroll: document.documentElement.scrollWidth > innerWidth, footerBottomMargin: getComputedStyle(document.querySelector('footer')).marginBottom, cardBars: document.querySelectorAll('.card-admin-bar').length };
    });
    await L.shot(page, `A2-06-${c.key}-domov.png`);
    // priečinok s linkami: tlačidlá na kartách
    await page.evaluate(() => navigate('f_ten_spr'));
    await page.waitForTimeout(400);
    r.cards = await page.evaluate(() => {
      const b = document.querySelector('.card-link .ibtn').getBoundingClientRect();
      const card = document.querySelector('.card-link').getBoundingClientRect();
      const bar = document.querySelector('.card-link .card-admin-bar').getBoundingClientRect();
      const name = document.querySelector('.card-link .cl-name').getBoundingClientRect();
      return { ibtn: { w: Math.round(b.width), h: Math.round(b.height) }, card: { w: Math.round(card.width), h: Math.round(card.height) }, barCoversName: bar.left < name.right && bar.top < name.bottom, barW: Math.round(bar.width), nameRight: Math.round(name.right), barLeft: Math.round(bar.left), linkClickDisabled: document.querySelector('.card-link a').getAttribute('onclick') };
    });
    await L.shot(page, `A2-06-${c.key}-linky.png`);
    // ťuknutie na ✏️ na karte (skutočný tap) → otvorí okno?
    const edBtn = page.locator('.card-link .ibtn[title="Upraviť"], .card-link .ibtn:nth-child(3)').first();
    try { await edBtn.tap({ timeout: 3000 }); } catch (e) { r.tapEditErr = e.message.slice(0, 100); }
    await page.waitForTimeout(300);
    r.tapEditOpened = await page.evaluate(() => document.getElementById('nodeMo').classList.contains('open'));
    r.nodeMo = await page.evaluate(() => {
      const box = document.querySelector('#nodeMo .mo-box').getBoundingClientRect();
      const cs = getComputedStyle(document.querySelector('#nodeMo .mo-box'));
      const btn = document.querySelector('#nodeMo .mo-acts .btn-p').getBoundingClientRect();
      return { boxW: Math.round(box.width), boxH: Math.round(box.height), boxTop: Math.round(box.top), boxBottom: Math.round(box.bottom), vw: innerWidth, vh: innerHeight, fitsW: box.left >= 0 && box.right <= innerWidth, overflowY: cs.overflowY, maxH: cs.maxHeight, saveBtnVisibleWithoutScroll: btn.bottom <= innerHeight, focus: document.activeElement && document.activeElement.id, inputFont: getComputedStyle(document.getElementById('nName')).fontSize };
    });
    await L.shot(page, `A2-06-${c.key}-okno-uzol.png`);
    // fokus do posledného poľa (ako keď sa objaví klávesnica — okno sa dá rolovať?)
    await page.focus('#nIcon');
    await page.waitForTimeout(200);
    r.nodeMoScrolledToIcon = await page.evaluate(() => { const b = document.getElementById('nIcon').getBoundingClientRect(); return { top: Math.round(b.top), bottom: Math.round(b.bottom), vh: innerHeight, visible: b.top >= 0 && b.bottom <= innerHeight }; });
    await page.evaluate(() => closeMo('nodeMo'));
    // Aktuálne
    await page.evaluate(() => openAktualne());
    await page.waitForFunction(() => AKT_ADMIN === true, null, { timeout: 15000 });
    await page.waitForTimeout(300);
    r.aktMo = await page.evaluate(() => {
      const box = document.querySelector('#aktualneListMo .mo-box').getBoundingClientRect();
      const row = document.querySelector('.akt-row');
      const rb = row ? row.getBoundingClientRect() : null;
      const btns = row ? [...row.querySelectorAll('.ibtn')].map(b => { const x = b.getBoundingClientRect(); return [Math.round(x.width), Math.round(x.height), x.right <= innerWidth]; }) : [];
      const pub = document.querySelector('#aktualneListMo .mo-acts .btn-p').getBoundingClientRect();
      return { boxW: Math.round(box.width), boxH: Math.round(box.height), fitsW: box.right <= innerWidth && box.left >= 0, rowH: rb && Math.round(rb.height), rowW: rb && Math.round(rb.width), rowOverflow: row && row.scrollWidth > row.clientWidth, btns, publishBtnVisible: pub.bottom <= innerHeight && pub.top >= 0, gridH: document.getElementById('aktualneListGrid').getBoundingClientRect().height };
    });
    await L.shot(page, `A2-06-${c.key}-aktualne.png`);
    await page.evaluate(() => openAddAkt());
    await page.waitForTimeout(200);
    r.aktEdit = await page.evaluate(() => { const b = document.querySelector('#aktualneEditMo .mo-box').getBoundingClientRect(); const s = document.querySelector('#aktualneEditMo .mo-acts .btn-p').getBoundingClientRect(); return { boxH: Math.round(b.height), vh: innerHeight, saveVisible: s.bottom <= innerHeight, twoOpen: document.querySelectorAll('.mo.open').length }; });
    await L.shot(page, `A2-06-${c.key}-aktualne-edit.png`);
    await page.evaluate(() => { closeMo('aktualneEditMo'); closeMo('aktualneListMo'); openBannerFarm(); });
    await page.waitForTimeout(200);
    r.bannerFarm = await page.evaluate(() => { const b = document.querySelector('#bannerFarmMo .mo-box').getBoundingClientRect(); const row = document.querySelector('.bfarm-row'); return { boxW: Math.round(b.width), fitsW: b.right <= innerWidth, rowOverflow: row && row.scrollWidth > row.clientWidth + 1, rows: document.querySelectorAll('.bfarm-row').length }; });
    await L.shot(page, `A2-06-${c.key}-bannery.png`);
    await page.evaluate(() => { closeMo('bannerFarmMo'); openPromoList(); });
    await page.waitForTimeout(200);
    await L.shot(page, `A2-06-${c.key}-promo.png`);
    await page.evaluate(() => { closeMo('promoListMo'); openSettings(); });
    await page.waitForTimeout(200);
    await L.shot(page, `A2-06-${c.key}-nastavenia.png`);
    await page.evaluate(() => closeMo('settMo'));
    // odhlásenie ťuknutím na tlačidlo v lište
    try { await page.locator('#adminBar .btn-d').tap({ timeout: 3000 }); } catch (e) { r.tapLogoutErr = e.message.slice(0, 100); }
    await page.waitForTimeout(200);
    r.loggedOut = await page.evaluate(() => adminMode === false);
    r.console = log.console.filter(x => !/ERR_BLOCKED_BY_CLIENT/.test(x.text)); r.errors = log.errors; r.csp = log.csp; r.http = log.http; r.dialogs = log.dialogs;
    R[c.key] = r;
    await ctx.close();
  }
  L.saveLog('A2-06-mobil.log.json', R);
  console.log(JSON.stringify(R, null, 1));
  await browser.close();
})().catch(e => { console.error('CHYBA', e); process.exit(1); });
