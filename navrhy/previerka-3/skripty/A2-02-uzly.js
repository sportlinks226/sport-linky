// A2-02: okno Pridať/Upraviť uzol — otvorenie/zatvorenie, validácia, konzistencia dát, hore/dole, mazanie, dvojklik, dve okná, ochrana starého okna
const L = require('./A2-lib.js');
(async () => {
  const browser = await L.chromium.launch();
  const R = { steps: [] };
  const ctx = await L.newContext(browser);
  const page = await ctx.newPage();
  const log = L.watch(page); L.autoDialog(page, log, true);
  await page.goto(L.SK + '/');
  R.login = await L.login(page);
  const st = async () => page.evaluate(() => {
    const ids = new Set(DB.nodes.map(n => n.id));
    return { nodes: DB.nodes.length, orphans: DB.nodes.filter(n => n.parentId !== null && !ids.has(n.parentId)).length, curId };
  });

  // --- otvor priečinok Tenis › Správy a Štatistiky (39 liniek, bez podpriečinkov)
  await page.evaluate(() => navigate('f_ten_spr'));
  await page.waitForTimeout(300);
  R.steps.push({ krok: 'navigate f_ten_spr', url: page.url(), ...(await st()) });

  // --- otvorenie okna, fokus, Escape, klik mimo
  await page.evaluate(() => openAdd());
  await page.waitForTimeout(250);
  R.openAdd = await page.evaluate(() => ({ open: document.getElementById('nodeMo').classList.contains('open'), focus: document.activeElement && document.activeElement.id, title: document.getElementById('moTitle').textContent, typeLink: document.getElementById('typeBtnLink').classList.contains('active') }));
  await page.fill('#nName', 'Rozpísané ale nezavreté');
  await page.keyboard.press('Escape');
  R.escClosed = await page.evaluate(() => !document.getElementById('nodeMo').classList.contains('open'));
  R.focusAfterEsc = await page.evaluate(() => (document.activeElement && (document.activeElement.id || document.activeElement.tagName)));
  await page.evaluate(() => openAdd());
  await page.waitForTimeout(100);
  R.fieldsClearedOnReopen = await page.evaluate(() => document.getElementById('nName').value === '');
  await page.fill('#nName', 'Rozpísané');
  await page.mouse.click(5, 5); // klik mimo okna (na tmavé pozadie)
  R.clickOutsideClosed = await page.evaluate(() => !document.getElementById('nodeMo').classList.contains('open'));
  R.dialogsSoFar = log.dialogs.length; // žiadne „Máš neuložené zmeny“?

  // --- validácia
  const before = (await st()).nodes;
  const trySave = async (fields, type) => {
    await page.evaluate((t) => { openAdd(); setType(t); }, type || 'link');
    for (const [k, v] of Object.entries(fields)) await page.fill('#' + k, v);
    const d0 = log.dialogs.length;
    await page.evaluate(() => saveNode());
    await page.waitForTimeout(150);
    const nd = log.dialogs.slice(d0).map(d => d.msg);
    const open = await page.evaluate(() => document.getElementById('nodeMo').classList.contains('open'));
    await page.evaluate(() => closeMo('nodeMo'));
    return { alerts: nd, stillOpen: open, nodes: (await st()).nodes };
  };
  R.val = {};
  R.val.emptyName = await trySave({ nUrl: 'https://example.com/a' });
  R.val.emptyUrl = await trySave({ nName: 'Bez URL' });
  R.val.jsUrl = await trySave({ nName: 'JS linka A2', nUrl: 'javascript:alert(1)' });
  R.val.noScheme = await trySave({ nName: 'Bez schémy A2', nUrl: 'www.priklad.sk' });
  R.val.ftpUrl = await trySave({ nName: 'FTP A2', nUrl: 'ftp://priklad.sk' });
  R.val.badFb = await trySave({ nName: 'Zlý FB A2', nUrl: 'https://priklad.sk', nFb: 'javascript:alert(2)' });
  R.val.htmlName = await trySave({ nName: '<b>"Názov"</b> \'x\' <img src=x onerror=alert(1)>', nUrl: 'https://priklad.sk/html' });
  R.val.spacesOnly = await trySave({ nName: '   ', nUrl: 'https://priklad.sk/sp' });
  R.val.longName = await trySave({ nName: 'X'.repeat(500), nUrl: 'https://priklad.sk/long' });
  R.val.nodesAdded = (await st()).nodes - before;
  // čo sa z toho vykreslilo na karte (href, text)
  R.rendered = await page.evaluate(() => {
    const out = [];
    for (const nm of ['JS linka A2', 'Bez schémy A2', 'FTP A2', 'Zlý FB A2']) {
      const n = DB.nodes.find(x => x.name === nm);
      if (!n) { out.push({ nm, saved: false }); continue; }
      const card = [...document.querySelectorAll('.card-link')].find(c => c.querySelector('.cl-name') && c.querySelector('.cl-name').textContent.trim() === nm);
      out.push({ nm, saved: true, url: n.url, fb: n.fb, href: card && card.querySelector('a').getAttribute('href'), socHref: card && card.querySelector('.socs a') && card.querySelector('.socs a').getAttribute('href') });
    }
    const h = DB.nodes.find(x => x.name.startsWith('<b>'));
    const hc = [...document.querySelectorAll('.card-link .cl-name')].find(e => e.textContent.includes('Názov'));
    out.push({ nm: 'html', saved: !!h, cardText: hc && hc.textContent, imgInjected: !!document.querySelector('#main img[src="x"]'), bInjected: !!document.querySelector('#main .cl-name b') });
    return out;
  });
  await L.shot(page, 'A2-02-validacia-karty.png');

  // --- priečinok: slug, slug_en, duplicitný názov súrodenca, order
  await page.evaluate(() => navigate('f_ten'));
  await page.waitForTimeout(200);
  R.val.dupFolder = await trySave({ nName: 'Hráči' }, 'folder');          // súrodenec Hráči (slug hraci / players) už je
  R.val.dupFolderEn = await trySave({ nName: 'Hráči 2', nNameEn: 'Players' }, 'folder'); // EN názov zhodný s existujúcim slug_en
  R.val.diakritika = await trySave({ nName: 'Ženy & Juniori – ČŠŽ' }, 'folder');
  R.folderNodes = await page.evaluate(() => DB.nodes.filter(n => n.parentId === 'f_ten').map(n => ({ id: n.id, name: n.name, name_en: n.name_en, slug: n.slug, slug_en: n.slug_en, order: n.order, order_en: n.order_en })));
  R.folderUrls = await page.evaluate(() => DB.nodes.filter(n => n.parentId === 'f_ten' && /Hráči|Ženy/.test(n.name)).map(n => urlForId(n.id)));
  // premenovanie → slug ostáva?
  const hr2 = R.folderNodes.find(n => n.name === 'Hráči 2');
  await page.evaluate((id) => openEdit(id), hr2.id);
  await page.fill('#nName', 'Premenovaný priečinok');
  await page.evaluate(() => saveNode());
  R.renamed = await page.evaluate((id) => { const n = DB.nodes.find(x => x.id === id); return { name: n.name, slug: n.slug, slug_en: n.slug_en }; }, hr2.id);
  // prázdny priečinok: admin vidí, návštevník nie
  R.emptyFolderAdminSees = await page.evaluate((id) => !![...document.querySelectorAll('#main a')].find(a => a.getAttribute('href') === urlForId(id)), hr2.id);

  // --- hore/dole: linky v f_ten_spr; a v f_bas (duplicitné order -1/-2)
  await page.evaluate(() => navigate('f_ten_spr'));
  await page.waitForTimeout(200);
  R.move = {};
  R.move.before = await page.evaluate(() => getChildren('f_ten_spr').slice(0, 3).map(n => [n.name, n.order]));
  await page.evaluate(() => moveNode(getChildren('f_ten_spr')[1].id, -1));
  R.move.afterUp = await page.evaluate(() => getChildren('f_ten_spr').slice(0, 3).map(n => [n.name, n.order]));
  await page.evaluate(() => moveNode(getChildren('f_ten_spr')[0].id, -1)); // prvý hore = nič
  R.move.firstUp = await page.evaluate(() => getChildren('f_ten_spr').slice(0, 3).map(n => [n.name, n.order]));
  await page.evaluate(() => navigate('f_bas'));
  await page.waitForTimeout(200);
  R.move.basBefore = await page.evaluate(() => getChildren('f_bas').map(n => [n.name, n.order]));
  await page.evaluate(() => moveNode('f_bas_rychla2', -1)); // order -1 ↔ -1 (duplicita)
  R.move.basAfterRychla2Up = await page.evaluate(() => getChildren('f_bas').map(n => [n.name, n.order]));
  await page.evaluate(() => moveNode('f_bas_live_en', -1)); // -2 ↔ -2
  R.move.basAfterLiveEnUp = await page.evaluate(() => getChildren('f_bas').map(n => [n.name, n.order]));
  // vráť späť (nie je to nutné, dáta sú len v prehliadači)

  // --- zmazanie priečinka s deťmi: osirelé uzly?
  await page.evaluate(() => navigate('f_ten'));
  await page.waitForTimeout(200);
  const b4 = await st();
  const sub = await page.evaluate(() => { const ids = []; const walk = p => DB.nodes.filter(n => n.parentId === p).forEach(n => { ids.push(n.id); walk(n.id); }); walk('f_ten_spr'); return ids.length; });
  await page.evaluate(() => delNode('f_ten_spr'));
  await page.waitForTimeout(200);
  const aft = await st();
  R.delete = { confirm: log.dialogs[log.dialogs.length - 1], removed: b4.nodes - aft.nodes, expected: sub + 1, orphans: aft.orphans, stillInDom: await page.evaluate(() => !!DB.nodes.find(n => n.id === 'f_ten_spr')) };

  // --- dvojklik na Uložiť (skutočný dvojklik myšou)
  await page.evaluate(() => navigate('f_ten_sta'));
  await page.evaluate(() => navigate('f_ten'));
  await page.waitForTimeout(200);
  const n0 = (await st()).nodes;
  await page.evaluate(() => openAdd());
  await page.waitForTimeout(200);
  await page.fill('#nName', 'Dvojklik A2'); await page.fill('#nUrl', 'https://priklad.sk/dvojklik');
  const bb = await page.locator('#nodeMo .btn-p').boundingBox();
  await page.mouse.dblclick(bb.x + bb.width / 2, bb.y + bb.height / 2);
  await page.waitForTimeout(300);
  R.dblclick = { added: (await st()).nodes - n0, names: await page.evaluate(() => DB.nodes.filter(n => n.name === 'Dvojklik A2').length) };
  // dva kliknutia programovo (ako dva rýchle ťuknutia na mobile pred skrytím okna)
  const n1 = (await st()).nodes;
  await page.evaluate(() => { openAdd(); document.getElementById('nName').value = 'Dvojťuk A2'; document.getElementById('nUrl').value = 'https://priklad.sk/dvojtuk'; const b = document.querySelector('#nodeMo .btn-p'); b.click(); b.click(); });
  await page.waitForTimeout(200);
  R.dblclick.programmatic2clicks = (await st()).nodes - n1;

  // --- dve okná naraz
  await page.evaluate(() => { openAdd(); openSettings(); });
  await page.waitForTimeout(250);
  R.twoModals = await page.evaluate(() => ({ open: [...document.querySelectorAll('.mo.open')].map(m => m.id), focus: document.activeElement && document.activeElement.id, zNode: getComputedStyle(document.getElementById('nodeMo')).zIndex, zSett: getComputedStyle(document.getElementById('settMo')).zIndex }));
  await L.shot(page, 'A2-02-dve-okna.png');
  await page.keyboard.press('Escape');
  R.twoModalsAfterEsc = await page.evaluate(() => [...document.querySelectorAll('.mo.open')].map(m => m.id));

  // --- ochrana pred starým oknom: v localStorage je novšia verzia
  await page.evaluate(() => localStorage.setItem('sportStromVer', '9999'));
  const n2 = (await st()).nodes;
  await page.evaluate(() => { openAdd(); document.getElementById('nName').value = 'Staré okno A2'; document.getElementById('nUrl').value = 'https://priklad.sk/stare'; });
  const d0 = log.dialogs.length;
  await page.evaluate(() => saveNode());
  await page.waitForTimeout(200);
  R.oldWindowGuard = { alert: log.dialogs.slice(d0).map(d => d.msg), addedInMemory: (await st()).nodes - n2, modalStillOpen: await page.evaluate(() => document.getElementById('nodeMo').classList.contains('open')), lsVer: await page.evaluate(() => localStorage.getItem('sportStromVer')) };
  await page.evaluate(() => { closeMo('nodeMo'); localStorage.setItem('sportStromVer', '1125'); });

  R.final = await st();
  R.dialogs = log.dialogs; R.console = log.console.filter(c => !/ERR_BLOCKED_BY_CLIENT/.test(c.text)); R.errors = log.errors; R.csp = log.csp;
  L.saveLog('A2-02-uzly.log.json', R);
  console.log(JSON.stringify(R, null, 1));
  await browser.close();
})().catch(e => { console.error('CHYBA', e); process.exit(1); });
