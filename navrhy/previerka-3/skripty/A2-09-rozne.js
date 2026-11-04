// A2-09: 375 px s dotykom (snímky), admin čakajúci na „Skúsiť znova“ / na celé dáta, Pridať sem v Aktuálnych, zavreté okná skryté (p2 bod 1), lišta vs. pätička
const L = require('./A2-lib.js');
(async () => {
  const browser = await L.chromium.launch();
  const R = {};

  // --- 1) 375 px, dotyk: snímky všetkých okien + merania
  {
    const ctx = await L.newContext(browser, { viewport: { width: 375, height: 667 }, hasTouch: true });
    const page = await ctx.newPage();
    const log = L.watch(page); L.autoDialog(page, log, true);
    const r = {};
    await page.goto(L.SK + '/');
    await L.waitFull(page);
    await page.evaluate((k) => { DB.pwKdf = k; location.hash = '#admin'; }, L.KDF);
    await page.waitForSelector('#pwScreen.open');
    await L.shot(page, 'A2-09-375-heslo.png');
    await page.fill('#pwIn', L.TEST_PW);
    await page.locator('#pwBtn').tap();
    await page.waitForFunction(() => adminMode === true, null, { timeout: 60000 });
    await page.waitForTimeout(400);
    await L.shot(page, 'A2-09-375-domov.png');
    // pätička vs. lišta: posuň na koniec stránky
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(200);
    r.footer = await page.evaluate(() => { const f = document.querySelector('footer').getBoundingClientRect(); const b = document.getElementById('adminBar').getBoundingClientRect(); const note = document.querySelector('footer .f-note').getBoundingClientRect(); return { footerBottom: Math.round(f.bottom), barTop: Math.round(b.top), barH: Math.round(b.height), noteBottom: Math.round(note.bottom), noteHiddenByBar: note.bottom > b.top, marginBottom: getComputedStyle(document.querySelector('footer')).marginBottom }; });
    await L.shot(page, 'A2-09-375-paticka.png');
    await page.evaluate(() => { window.scrollTo(0, 0); navigate('f_ten_spr'); });
    await page.waitForTimeout(400);
    await L.shot(page, 'A2-09-375-linky.png');
    r.cards = await page.evaluate(() => { const c = document.querySelector('.card-link'); const bar = c.querySelector('.card-admin-bar').getBoundingClientRect(); const d = c.querySelector('.cl-desc').getBoundingClientRect(); const n = c.querySelector('.cl-name').getBoundingClientRect(); return { barLeft: Math.round(bar.left), nameRight: Math.round(n.right), descRight: Math.round(d.right), descUnderButtons: d.right > bar.left && d.top < bar.bottom, ibtn: Math.round(c.querySelector('.ibtn').getBoundingClientRect().width) }; });
    await page.locator('.card-link .ibtn').nth(2).tap(); // ✏️
    await page.waitForTimeout(300);
    r.editOpened = await page.evaluate(() => document.getElementById('nodeMo').classList.contains('open'));
    r.nodeMo = await page.evaluate(() => { const box = document.querySelector('#nodeMo .mo-box').getBoundingClientRect(); const btn = document.querySelector('#nodeMo .mo-acts .btn-p').getBoundingClientRect(); return { boxH: Math.round(box.height), top: Math.round(box.top), bottom: Math.round(box.bottom), vh: innerHeight, saveVisible: btn.bottom <= innerHeight, focus: document.activeElement && document.activeElement.id }; });
    await L.shot(page, 'A2-09-375-okno-uzol.png');
    await page.locator('#nodeMo .mo-box').evaluate(el => el.scrollTop = el.scrollHeight);
    await page.waitForTimeout(100);
    await L.shot(page, 'A2-09-375-okno-uzol-dole.png');
    await page.evaluate(() => closeMo('nodeMo'));
    await page.evaluate(() => openAktualne());
    await page.waitForFunction(() => AKT_ADMIN === true, null, { timeout: 15000 });
    await page.waitForTimeout(300);
    await L.shot(page, 'A2-09-375-aktualne.png');
    await page.evaluate(() => openAddAkt());
    await page.waitForTimeout(200);
    await L.shot(page, 'A2-09-375-aktualne-edit.png');
    await page.evaluate(() => { closeMo('aktualneEditMo'); closeMo('aktualneListMo'); openBannerFarm(); });
    await page.waitForTimeout(200);
    r.bannerRow = await page.evaluate(() => { const row = document.querySelector('.bfarm-row'); const del = row.querySelector('.ibtn.d').getBoundingClientRect(); const box = document.querySelector('#bannerFarmMo .mo-box').getBoundingClientRect(); return { rowScrollW: row.scrollWidth, rowClientW: row.clientWidth, delRight: Math.round(del.right), boxRight: Math.round(box.right), delClipped: del.right > row.getBoundingClientRect().right }; });
    await L.shot(page, 'A2-09-375-bannery.png');
    await page.evaluate(() => { closeMo('bannerFarmMo'); openAddBanner(); });
    await page.waitForTimeout(200);
    await L.shot(page, 'A2-09-375-banner-edit.png');
    await page.evaluate(() => { closeMo('bannerEditMo'); openPromoList(); });
    await page.waitForTimeout(200);
    await L.shot(page, 'A2-09-375-promo.png');
    await page.evaluate(() => { closeMo('promoListMo'); openSettings(); });
    await page.waitForTimeout(200);
    await L.shot(page, 'A2-09-375-nastavenia.png');
    await page.evaluate(() => closeMo('settMo'));
    // Pridať sem v priečinku Aktuálne (f_ltw)
    await page.evaluate(() => navigate('f_ltw'));
    await page.waitForTimeout(300);
    await L.shot(page, 'A2-09-375-aktualne-stranka-admin.png');
    const n0 = await page.evaluate(() => DB.nodes.length);
    await page.evaluate(() => { openAdd(); document.getElementById('nName').value = 'Linka v Aktuálnych A2'; document.getElementById('nUrl').value = 'https://priklad.sk/ltw'; saveNode(); });
    await page.waitForTimeout(300);
    r.addInLtw = { added: (await page.evaluate(() => DB.nodes.length)) - n0, parent: await page.evaluate(() => (DB.nodes.find(n => n.name === 'Linka v Aktuálnych A2') || {}).parentId), shownAdmin: await page.evaluate(() => !![...document.querySelectorAll('#main .cl-name')].find(e => e.textContent.includes('Linka v Aktuálnych A2'))) };
    await page.evaluate(() => logoutAdmin());
    await page.waitForTimeout(300);
    r.addInLtw.shownVisitor = await page.evaluate(() => !![...document.querySelectorAll('#main .cl-name')].find(e => e.textContent.includes('Linka v Aktuálnych A2')));
    // zavreté okná: skryté (display none) a nedajú sa „vyklikať“ (p2 bod 1)
    r.closedModals = await page.evaluate(() => [...document.querySelectorAll('.mo')].map(m => getComputedStyle(m).display + '/' + getComputedStyle(m).visibility).filter((v, i, a) => a.indexOf(v) === i));
    r.closedModalFocusable = await page.evaluate(() => { const i = document.getElementById('nName'); i.focus(); return document.activeElement === i; });
    r.pwScreenClosed = await page.evaluate(() => getComputedStyle(document.getElementById('pwScreen')).display);
    r.console = log.console.filter(x => !/ERR_BLOCKED_BY_CLIENT|404/.test(x.text)); r.errors = log.errors; r.csp = log.csp;
    R.w375 = r;
    await ctx.close();
  }

  // --- 2) data.json zlyhá → #admin ukáže „Skúsiť znova“; po úspechu sa admin otvorí (p2 bod 3)
  {
    let fail = true;
    const ctx = await L.newContext(browser, { routeHook: async (route, url) => { if (fail && /\/data\.json/.test(url)) { await route.fulfill({ status: 500, body: 'err' }); return true; } return false; } });
    const page = await ctx.newPage();
    const log = L.watch(page); L.autoDialog(page, log, true);
    await page.goto(L.SK + '/#admin');
    await page.waitForTimeout(6000);
    const r = {};
    r.state = await page.evaluate(() => ({ DATA_FAIL, pending: _adminPending, partial: !!DB._partial, main: document.getElementById('main').innerText.slice(0, 160), pwOpen: document.getElementById('pwScreen').classList.contains('open'), retryBtn: !!document.querySelector('#main button') }));
    await L.shot(page, 'A2-09-skusit-znova.png');
    fail = false;
    const btn = page.locator('#main button').first();
    if (await btn.count()) await btn.click();
    await page.waitForFunction(() => typeof DB !== 'undefined' && !DB._partial && DB.nodes.length > 1000, null, { timeout: 30000 }).catch(() => {});
    await page.waitForTimeout(500);
    r.afterRetry = await page.evaluate(() => ({ DATA_FAIL, pending: _adminPending, pwOpen: document.getElementById('pwScreen').classList.contains('open'), nodes: DB.nodes.length }));
    r.errors = log.errors; r.console = log.console.filter(x => !/ERR_BLOCKED_BY_CLIENT|404|500/.test(x.text));
    R.retry = r;
    await ctx.close();
  }

  // --- 3) #admin hneď po štarte (celé dáta ešte neprišli — oneskorený data.json 4 s) → okno hesla sa otvorí po dotiahnutí
  {
    const ctx = await L.newContext(browser, { routeHook: async (route, url) => { if (/\/data\.json/.test(url)) { await new Promise(r => setTimeout(r, 4000)); } return false; } });
    const page = await ctx.newPage();
    const log = L.watch(page); L.autoDialog(page, log, true);
    await page.goto(L.SK + '/#admin', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(800);
    const r = {};
    r.early = await page.evaluate(() => ({ partial: !!(typeof DB !== 'undefined' && DB._partial), pending: typeof _adminPending !== 'undefined' && _adminPending, pwOpen: document.getElementById('pwScreen').classList.contains('open'), hash: location.hash }));
    await page.waitForFunction(() => typeof DB !== 'undefined' && !DB._partial && DB.nodes.length > 1000, null, { timeout: 30000 }).catch(() => {});
    await page.waitForTimeout(500);
    r.late = await page.evaluate(() => ({ pending: _adminPending, pwOpen: document.getElementById('pwScreen').classList.contains('open') }));
    r.errors = log.errors;
    R.pending = r;
    await ctx.close();
  }

  // --- 4) overenie, či sa dá localStorage vypnúť (pre test A2-05 bod 6) + stale id v moveNode
  {
    const ctx = await L.newContext(browser);
    const page = await ctx.newPage();
    const log = L.watch(page); L.autoDialog(page, log, true);
    await page.addInitScript(() => { try { Object.defineProperty(window, 'localStorage', { get: () => { throw new Error('SecurityError'); } }); } catch (e) {} });
    await page.goto(L.SK + '/');
    R.lsOverride = await page.evaluate(() => { try { localStorage; return 'localStorage dostupné (override nefungoval)'; } catch (e) { return 'localStorage vyhadzuje: ' + e.message; } });
    await L.waitFull(page).catch(() => {});
    R.lsOverrideLogin = await L.login(page).catch(e => 'zlyhalo: ' + e.message.slice(0, 80));
    const d0 = log.dialogs.length;
    await page.evaluate(() => { navigate('f_ten_spr'); openAdd(); document.getElementById('nName').value = 'Bez LS'; document.getElementById('nUrl').value = 'https://priklad.sk/nols'; saveNode(); });
    await page.waitForTimeout(500);
    R.lsOverrideSaveDialogs = log.dialogs.slice(d0).map(d => d.msg);
    R.lsOverrideIdb = await page.evaluate(async () => { const s = await idbGet(); return !!(s && s.nodes.find(n => n.name === 'Bez LS')); });
    await page.evaluate(() => openAktualne());
    await page.waitForTimeout(2000);
    R.lsOverrideAktDialogs = log.dialogs.slice(d0 + R.lsOverrideSaveDialogs.length).map(d => d.msg);
    R.lsOverrideErrors = log.errors;
    // moveNode so zastaraným id (karta z iného okna) → chyba v konzole?
    const e0 = log.errors.length;
    await page.evaluate(() => { try { moveNode('neexistuje', 1); } catch (e) { window.__mvErr = e.message; } });
    R.moveStaleId = await page.evaluate(() => window.__mvErr || null);
    await ctx.close();
  }
  L.saveLog('A2-09-rozne.log.json', R);
  console.log(JSON.stringify(R, null, 1));
  await browser.close();
})().catch(e => { console.error('CHYBA', e); process.exit(1); });
