// A2-08: admin na EN webe — prihlásenie, hore/dole pri order_en a abecednom radení kontinentov, nová linka, Publikovať (zhoda so SK), Aktuálne (zdroj)
const L = require('./A2-lib.js');
(async () => {
  const browser = await L.chromium.launch();
  const R = {};
  const ctx = await L.newContext(browser);
  const page = await ctx.newPage();
  const log = L.watch(page); L.autoDialog(page, log, true);
  await page.goto(L.EN + '/');
  R.login = await L.login(page);
  R.afterLogin = await page.evaluate(() => ({ badge: document.getElementById('verBadge').textContent, lang: SITE_LANG, adminBarText: document.getElementById('adminBar').innerText.replace(/\s+/g, ' ').slice(0, 120), pwLabel: document.getElementById('pwClose').getAttribute('aria-label'), title: document.title }));
  await L.shot(page, 'A2-08-en-admin-domov.png');
  // hore/dole v priečinku s order_en (Tenis › Asociácie › Európa — abecedne v EN + order_en)
  await page.evaluate(() => navigate('f_ten_aso_eu'));
  await page.waitForTimeout(300);
  const kids = () => page.evaluate(() => getChildren('f_ten_aso_eu').slice(0, 5).map(n => [nName(n), n.order, n.order_en]));
  R.enMove = { before: await kids(), shown: await page.evaluate(() => [...document.querySelectorAll('#main .cl-name, #main .cf-name')].slice(0, 5).map(e => e.textContent.trim())) };
  await page.evaluate(() => moveNode(getChildren('f_ten_aso_eu')[2].id, -1)); // tretí (Andorra) hore
  R.enMove.afterUp = await kids();
  R.enMove.shownAfter = await page.evaluate(() => [...document.querySelectorAll('#main .cl-name, #main .cf-name')].slice(0, 5).map(e => e.textContent.trim()));
  R.enMove.changedOnScreen = JSON.stringify(R.enMove.shown) !== JSON.stringify(R.enMove.shownAfter);
  await L.shot(page, 'A2-08-en-presun.png');
  // priečinok bez abecedy, ale s order_en (napr. Tenis › Správy — f_ten_spr má order_en?)
  await page.evaluate(() => navigate('f_ten_spr'));
  await page.waitForTimeout(300);
  const kids2 = () => page.evaluate(() => getChildren('f_ten_spr').slice(0, 4).map(n => [nName(n), n.order, n.order_en]));
  R.enMove2 = { before: await kids2() };
  await page.evaluate(() => moveNode(getChildren('f_ten_spr')[1].id, -1));
  R.enMove2.afterUp = await kids2();
  R.enMove2.changed = JSON.stringify(R.enMove2.before) !== JSON.stringify(R.enMove2.afterUp);
  // nová linka v EN admine: order vs order_en susedov
  await page.evaluate(() => { openAdd(); document.getElementById('nName').value = 'Nová EN linka A2'; document.getElementById('nUrl').value = 'https://priklad.sk/en'; saveNode(); });
  await page.waitForTimeout(200);
  R.enNew = await page.evaluate(() => { const n = DB.nodes.find(x => x.name === 'Nová EN linka A2'); const k = getChildren('f_ten_spr'); return { order: n.order, order_en: n.order_en, posInEn: k.findIndex(x => x.id === n.id), total: k.length, lastOrderEn: Math.max(...k.map(x => x.order_en === undefined ? -99 : x.order_en)) }; });
  // titulky okna / výberov v EN admine (SK názvy?)
  await page.evaluate(() => openAdd());
  R.enTitles = { moTitle: await page.textContent('#moTitle'), placeholderName: await page.getAttribute('#nName', 'placeholder'), adminBarBtn: await page.textContent('#adminBar .btn-p') };
  await page.evaluate(() => closeMo('nodeMo'));
  await page.evaluate(() => openBannerFarm());
  R.enTitles.bannerSections = await page.evaluate(() => { openAddBanner(); return [...document.querySelectorAll('#bSection option')].slice(0, 4).map(o => o.textContent); });
  await page.evaluate(() => { closeMo('bannerEditMo'); closeMo('bannerFarmMo'); });
  // Publikovať z EN
  const [d] = await Promise.all([page.waitForEvent('download', { timeout: 20000 }), page.evaluate(() => publishData())]);
  const pp = L.path.join(L.DL, 'A2-en-publikovany-data.json'); await d.saveAs(pp);
  const j = JSON.parse(L.fs.readFileSync(pp, 'utf8'));
  R.enPublish = { name: d.suggestedFilename(), size: L.fs.statSync(pp).size, ver: j.version, keys: Object.keys(j), nodes: j.nodes.length, hasSkFields: !!j.nodes.find(n => n.id === 'f_fut').name, hasEnFields: !!j.nodes.find(n => n.id === 'f_fut').name_en, newLink: j.nodes.find(n => n.name === 'Nová EN linka A2') };
  // Aktuálne v EN admine: odkiaľ sa berú (AKT_MASTER = sportlinky.sk je blokovaný → lokálny aktualne.json)
  await page.evaluate(() => openAktualne());
  await page.waitForFunction(() => AKT_ADMIN === true, null, { timeout: 15000 });
  await page.waitForTimeout(300);
  R.enAkt = { info: await page.evaluate(() => document.getElementById('aktInfo').innerText.slice(0, 250)), urls: await page.evaluate(() => aktUrls()), ext: ctx._ext.filter(u => /aktualne/.test(u)) };
  await L.shot(page, 'A2-08-en-aktualne.png');
  R.dialogs = log.dialogs; R.console = log.console.filter(c => !/ERR_BLOCKED_BY_CLIENT/.test(c.text)); R.errors = log.errors; R.csp = log.csp; R.http = log.http;
  L.saveLog('A2-08-en.log.json', R);
  console.log(JSON.stringify(R, null, 1));
  await browser.close();
})().catch(e => { console.error('CHYBA', e); process.exit(1); });
