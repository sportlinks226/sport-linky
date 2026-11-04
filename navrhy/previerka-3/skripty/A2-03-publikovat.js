// A2-03: Export, Publikovať (čo presne stiahne), Import (platný / odľahčený / pokazený), verzia, kľúče
const L = require('./A2-lib.js');
(async () => {
  const browser = await L.chromium.launch();
  const R = {};
  const ctx = await L.newContext(browser);
  const page = await ctx.newPage();
  const log = L.watch(page); L.autoDialog(page, log, true);
  await page.goto(L.SK + '/');
  R.login = await L.login(page);
  // malá úprava: nová linka do Tenis › Správy a Štatistiky
  await page.evaluate(() => navigate('f_ten_spr'));
  await page.waitForTimeout(200);
  await page.evaluate(() => { openAdd(); document.getElementById('nName').value = 'Testovacia linka A2'; document.getElementById('nUrl').value = 'https://priklad.sk/a2'; document.getElementById('nNameEn').value = 'Test link A2'; document.getElementById('nDescEn').value = 'EN desc'; saveNode(); });
  await page.waitForTimeout(200);

  const dl = async (fn) => {
    const [d] = await Promise.all([page.waitForEvent('download', { timeout: 20000 }), page.evaluate(fn)]);
    const p = L.path.join(L.DL, d.suggestedFilename());
    await d.saveAs(p);
    return { name: d.suggestedFilename(), path: p, size: L.fs.statSync(p).size };
  };
  // Export
  R.export = await dl(() => exportData());
  R.verAfterExport = await page.evaluate(() => ({ db: DB.version, badge: document.getElementById('verBadge').textContent, ls: localStorage.getItem('sportStromVer') }));
  // Publikovať
  const d0 = log.dialogs.length;
  R.publish = await dl(() => publishData());
  R.publishDialogs = log.dialogs.slice(d0);
  R.verAfterPublish = await page.evaluate(() => ({ db: DB.version, badge: document.getElementById('verBadge').textContent, ls: localStorage.getItem('sportStromVer'), dirty: localStorage.getItem('sportStromDirty') }));
  // druhé Publikovať hneď za sebou (bez zmeny) → verzia +1 znova?
  R.publish2 = await dl(() => publishData());
  R.verAfterPublish2 = await page.evaluate(() => DB.version);

  // Import vlastného stiahnutého súboru
  const imp = async (p) => {
    const d1 = log.dialogs.length;
    await page.setInputFiles('#adminBar input[type=file]', p);
    await page.waitForTimeout(1500);
    return log.dialogs.slice(d1).map(d => d.msg);
  };
  R.importOwn = await imp(R.publish.path);
  R.verAfterImport = await page.evaluate(() => ({ db: DB.version, nodes: DB.nodes.length, test: !!DB.nodes.find(n => n.name === 'Testovacia linka A2'), ls: localStorage.getItem('sportStromVer') }));
  // Import odľahčeného data.json z webu
  R.importLite = await imp('/tmp/claude-0/-home-user/eed11a80-25e6-51b3-88cc-2253d64cd8b2/scratchpad/build/site-sk/data.json');
  // Import pokazeného súboru
  const bad = L.path.join(L.DL, 'pokazeny.json'); L.fs.writeFileSync(bad, '{"nodes": [1,2');
  R.importBroken = await imp(bad);
  // Import súboru bez nodes
  const nn = L.path.join(L.DL, 'bez-nodes.json'); L.fs.writeFileSync(nn, '{"version": 5}');
  R.importNoNodes = await imp(nn);
  // Import staršej verzie (v100) — prejde? verzia klesne?
  const old = JSON.parse(L.fs.readFileSync(R.publish.path, 'utf8')); old.version = 100; old.nodes = old.nodes.slice(0, 200);
  const op = L.path.join(L.DL, 'stara-v100.json'); L.fs.writeFileSync(op, JSON.stringify(old));
  R.importOld = await imp(op);
  R.verAfterImportOld = await page.evaluate(() => ({ db: DB.version, nodes: DB.nodes.length, badge: document.getElementById('verBadge').textContent, ls: localStorage.getItem('sportStromVer') }));
  // po importe v100: Publikovať → stiahne v101? (ochrana starého okna: lsVer 1127 > 100 → zablokuje?)
  const d2 = log.dialogs.length;
  let pub3 = null;
  try { pub3 = await dl(() => publishData()); } catch (e) { pub3 = 'žiadne stiahnutie: ' + e.message.slice(0, 80); }
  R.publishAfterOldImport = { pub3, dialogs: log.dialogs.slice(d2).map(d => d.msg), ver: await page.evaluate(() => DB.version) };

  R.dialogs = log.dialogs; R.console = log.console.filter(c => !/ERR_BLOCKED_BY_CLIENT/.test(c.text)); R.errors = log.errors; R.csp = log.csp;
  L.saveLog('A2-03-publikovat.log.json', R);
  console.log(JSON.stringify(R, null, 1));
  await browser.close();
})().catch(e => { console.error('CHYBA', e); process.exit(1); });
