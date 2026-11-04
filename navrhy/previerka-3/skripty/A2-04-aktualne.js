// A2-04: Aktuálne v admine — pridanie, validácia, poradie, dátumy, vypnutie, hromadné, publikovanie aktualne.json, ochrany
const L = require('./A2-lib.js');
(async () => {
  const browser = await L.chromium.launch();
  const R = {};
  let srvVer = null; // keď je nastavené, aktualne.json zo servera vráti túto verziu
  const ctx = await L.newContext(browser, {
    routeHook: async (route, url) => {
      if (srvVer !== null && /\/aktualne\.json/.test(url)) {
        const r = await route.fetch(); const j = await r.json(); j.version = srvVer;
        await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify(j) }); return true;
      }
      return false;
    },
  });
  const page = await ctx.newPage();
  const log = L.watch(page); L.autoDialog(page, log, true);
  await page.goto(L.SK + '/');
  R.login = await L.login(page);
  await page.evaluate(() => openAktualne());
  await page.waitForFunction(() => AKT_ADMIN === true, null, { timeout: 15000 });
  await page.waitForTimeout(300);
  R.listOpen = await page.evaluate(() => ({ info: document.getElementById('aktInfo').innerText, rows: document.querySelectorAll('.akt-row').length, akt: { version: AKT.version, n: AKT.items.length }, draft: JSON.parse(localStorage.getItem('sportAktDraft') || 'null') && JSON.parse(localStorage.getItem('sportAktDraft')).dirty }));
  await L.shot(page, 'A2-04-aktualne-zoznam.png');

  const trySaveAkt = async (f) => {
    await page.evaluate(() => openAddAkt());
    await page.waitForTimeout(100);
    for (const [k, v] of Object.entries(f)) { if (k === 'aSport') await page.selectOption('#aSport', v); else await page.fill('#' + k, v); }
    const d0 = log.dialogs.length;
    await page.evaluate(() => saveAkt());
    await page.waitForTimeout(150);
    const r = { alerts: log.dialogs.slice(d0).map(d => d.msg), open: await page.evaluate(() => document.getElementById('aktualneEditMo').classList.contains('open')), n: await page.evaluate(() => AKT.items.length) };
    await page.evaluate(() => closeMo('aktualneEditMo'));
    return r;
  };
  R.val = {};
  R.val.empty = await trySaveAkt({});
  R.val.noUrl = await trySaveAkt({ aName: 'Bez URL' });
  R.val.badUrl = await trySaveAkt({ aName: 'Zlá URL', aUrl: 'javascript:alert(1)' });
  R.val.datesReversed = await trySaveAkt({ aName: 'Naopak', aUrl: 'https://priklad.sk/x', aStart: '2026-11-10', aEnd: '2026-11-05' });
  R.val.ok = await trySaveAkt({ aName: 'Test A2 tenis', aUrl: 'https://priklad.sk/a2', aSport: 'tenis', aStart: '2026-11-01', aEnd: '2026-11-30' });
  R.val.okNoDates = await trySaveAkt({ aName: 'Test A2 bez dátumov', aUrl: 'https://priklad.sk/a2b', aSport: 'hokej' });
  R.val.onlyEnd = await trySaveAkt({ aName: 'Test A2 len DO', aUrl: 'https://priklad.sk/a2c', aEnd: '2026-11-05' });
  R.val.endedLongAgo = await trySaveAkt({ aName: 'Test A2 dávno skončené', aUrl: 'https://priklad.sk/a2d', aStart: '2026-01-01', aEnd: '2026-01-10' });
  R.val.futureOnly = await trySaveAkt({ aName: 'Test A2 budúce', aUrl: 'https://priklad.sk/a2e', aStart: '2027-01-01' });
  R.val.dupUrl = await trySaveAkt({ aName: 'Duplikát ATP', aUrl: 'https://www.atptour.com/en/scores/current' });
  R.items = await page.evaluate(() => aktSorted(AKT.items).map(a => ({ name: a.name, order: a.order, sport: a.sport, icon: a.icon, s: a.startsAt, e: a.endsAt, dis: a.disabled, st: aktState(a) })));
  R.rowLabels = await page.evaluate(() => [...document.querySelectorAll('.akt-row')].map(r => r.querySelector('.akt-nm').textContent.trim().slice(0, 30) + ' | ' + (r.querySelector('.akt-st') || {}).textContent));
  R.publicCount = await page.evaluate(() => aktPublic().length);
  R.listaAdmin = await page.evaluate(() => [...document.querySelectorAll('#aktualneScroll .akt-card')].map(a => a.textContent.trim().slice(0, 25) + (a.classList.contains('akt-expired') ? ' [vysivené]' : '')));
  await L.shot(page, 'A2-04-aktualne-po-pridani.png');

  // poradie: hore/dole, drag&drop, kópia
  const names = () => page.evaluate(() => aktSorted(AKT.items).map(a => a.name));
  R.order = { before: await names() };
  await page.evaluate(() => moveAkt(1, -1));
  R.order.after1Up = await names();
  await page.evaluate(() => moveAkt(0, -1));
  R.order.firstUp = await names();
  R.order.ordersUnique = await page.evaluate(() => { const o = AKT.items.map(a => a.order); return new Set(o).size === o.length; });
  // drag & drop riadok 3 → pred riadok 0
  await page.evaluate(() => openAktualne());
  await page.waitForTimeout(200);
  const rows = page.locator('.akt-row');
  await rows.nth(3).dragTo(rows.nth(0));
  await page.waitForTimeout(200);
  R.order.afterDrag = await names();
  // vypnúť / zapnúť
  const idTest = await page.evaluate(() => AKT.items.find(a => a.name === 'Test A2 tenis').id);
  await page.evaluate((id) => toggleAkt(id), idTest);
  R.toggle = await page.evaluate((id) => { const a = AKT.items.find(x => x.id === id); return { disabled: a.disabled, st: aktState(a), pub: aktPublic().length }; }, idTest);
  await page.evaluate((id) => toggleAkt(id), idTest);
  // kópia
  const nB = await page.evaluate(() => AKT.items.length);
  await page.evaluate((id) => copyAkt(id), idTest);
  await page.waitForTimeout(100);
  R.copy = { title: await page.textContent('#aktEditTitle'), start: await page.inputValue('#aStart'), name: await page.inputValue('#aName') };
  await page.evaluate(() => saveAkt());
  R.copy.added = (await page.evaluate(() => AKT.items.length)) - nB;
  R.copy.pos = await names();
  // úprava: zmena názvu a zmazanie dátumov
  await page.evaluate((id) => openEditAkt(id), idTest);
  await page.fill('#aName', 'Test A2 tenis UPR'); await page.fill('#aStart', ''); await page.fill('#aEnd', '');
  await page.evaluate(() => saveAkt());
  R.edit = await page.evaluate((id) => { const a = AKT.items.find(x => x.id === id); return { name: a.name, s: a.startsAt, e: a.endsAt, st: aktState(a) }; }, idTest);
  // Escape pri otvorenom editačnom okne NAD zoznamom — zavrie obe?
  await page.evaluate(() => { openAktualne(); openAddAkt(); });
  await page.waitForTimeout(200);
  await page.keyboard.press('Escape');
  R.escBoth = await page.evaluate(() => [...document.querySelectorAll('.mo.open')].map(m => m.id));
  // zmazať
  const nC = await page.evaluate(() => AKT.items.length);
  const idDup = await page.evaluate(() => AKT.items.find(a => a.name === 'Duplikát ATP').id);
  await page.evaluate((id) => delAkt(id), idDup);
  R.del = { removed: nC - (await page.evaluate(() => AKT.items.length)) };

  // hromadné pridanie
  await page.evaluate(() => { openAktualne(); openAktBulk(); });
  await page.fill('#aBulk', [
    '2026-11-04; 2026-11-09; badminton; Hylo Open; Hylo Open; https://bwfworldtour.bwfbadminton.com/; Živé výsledky; Live scores',
    '5.11.2026; ; 🏓; Stolný tenis test; ; https://priklad.sk/tt',
    '2026-11-09; 2026-11-04; tenis; Naopak; ; https://priklad.sk/naopak',
    '; ; neznamysport; Zlý šport; ; https://priklad.sk/zly',
    'len; dve',
    '# komentár',
    '; ; tenis; Bez URL; ;',
    '; ; hokej; Duplikát; ; https://www.atptour.com/en/scores/current',
  ].join('\n'));
  await page.evaluate(() => previewAktBulk());
  R.bulk = { preview: await page.innerText('#aBulkPrev'), btnDisabled: await page.evaluate(() => document.getElementById('aBulkAdd').disabled) };
  const nD = await page.evaluate(() => AKT.items.length);
  await page.evaluate(() => addAktBulk());
  await page.waitForTimeout(200);
  R.bulk.added = (await page.evaluate(() => AKT.items.length)) - nD;
  R.bulk.note = await page.evaluate(() => AKT_NOTE);
  await L.shot(page, 'A2-04-aktualne-hromadne.png');

  // Publikovať Aktuálne
  const dl = async (fn) => {
    const [d] = await Promise.all([page.waitForEvent('download', { timeout: 20000 }), page.evaluate(fn)]);
    const p = L.path.join(L.DL, d.suggestedFilename()); await d.saveAs(p); return { name: d.suggestedFilename(), path: p, size: L.fs.statSync(p).size };
  };
  const d0 = log.dialogs.length;
  R.publish = await dl(() => publishAkt());
  R.publish.dialogs = log.dialogs.slice(d0).map(d => d.msg);
  R.publish.after = await page.evaluate(() => ({ ver: AKT.version, lsVer: localStorage.getItem('sportAktVer'), draftDirty: JSON.parse(localStorage.getItem('sportAktDraft')).dirty, note: AKT_NOTE.replace(/<[^>]+>/g, '') }));
  const pub = JSON.parse(L.fs.readFileSync(R.publish.path, 'utf8'));
  R.publish.file = { version: pub.version, updated: pub.updated, n: pub.items.length, keys: Object.keys(pub), itemKeys: Object.keys(pub.items[0]), orders: pub.items.map(i => i.order), indent1: L.fs.readFileSync(R.publish.path, 'utf8').startsWith('{\n "version"') };
  // druhé publikovanie bez zmeny → verzia +1?
  R.publish2 = await dl(() => publishAkt());
  R.publish2.ver = JSON.parse(L.fs.readFileSync(R.publish2.path, 'utf8')).version;
  // na webe je NOVŠIA verzia (napr. z mobilu) → nesmie sa stiahnuť
  srvVer = 50;
  const d1 = log.dialogs.length;
  let p3 = null; try { p3 = await dl(() => publishAkt()); } catch (e) { p3 = 'nestiahlo sa (správne)'; }
  R.publishNewerOnServer = { result: typeof p3 === 'string' ? p3 : p3.name, dialogs: log.dialogs.slice(d1).map(d => d.msg), ver: await page.evaluate(() => AKT.version) };
  srvVer = null;
  // ochrana pred iným oknom: draft s novším rev
  await page.evaluate(() => { const d = JSON.parse(localStorage.getItem('sportAktDraft')); d.rev = Date.now() + 100000; localStorage.setItem('sportAktDraft', JSON.stringify(d)); });
  const d2 = log.dialogs.length;
  await page.evaluate(() => toggleAkt(AKT.items[0].id));
  R.otherWindowGuard = log.dialogs.slice(d2).map(d => d.msg);

  // po reloade a novom prihlásení: draft (v5) vs server (v3) → pracuje sa s draftom
  await page.reload(); await L.waitFull(page);
  R.relogin = await L.login(page);
  await page.evaluate(() => openAktualne());
  await page.waitForFunction(() => AKT_ADMIN === true, null, { timeout: 15000 });
  await page.waitForTimeout(300);
  R.afterReload = await page.evaluate(() => ({ info: document.getElementById('aktInfo').innerText.slice(0, 300), ver: AKT.version, n: AKT.items.length }));
  // odhlásenie: lišta ukáže verejnú verziu z webu?
  await page.evaluate(() => logoutAdmin());
  await page.waitForTimeout(800);
  R.afterLogout = await page.evaluate(() => ({ AKT_ADMIN, ver: AKT && AKT.version, lista: [...document.querySelectorAll('#aktualneScroll .akt-card')].length, draftInLs: !!localStorage.getItem('sportAktDraft') }));

  R.dialogs = log.dialogs; R.console = log.console.filter(c => !/ERR_BLOCKED_BY_CLIENT/.test(c.text)); R.errors = log.errors; R.csp = log.csp;
  L.saveLog('A2-04-aktualne.log.json', R);
  console.log(JSON.stringify(R, null, 1));
  await browser.close();
})().catch(e => { console.error('CHYBA', e); process.exit(1); });
