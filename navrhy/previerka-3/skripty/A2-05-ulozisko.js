// A2-05: úložisko v prehliadači — reload s rozpracovanými úpravami, nová verzia na webe (konflikt), rovnaká verzia s iným obsahom, IndexedDB nedostupná
const L = require('./A2-lib.js');
(async () => {
  const browser = await L.chromium.launch();
  const R = {};
  let webVer = null; // keď je nastavené, data.json / version.txt / data-full.json zo servera hlásia túto verziu
  const ctx = await L.newContext(browser, {
    routeHook: async (route, url) => {
      if (webVer === null) return false;
      if (/\/version\.txt/.test(url)) { await route.fulfill({ status: 200, contentType: 'text/plain', body: String(webVer) }); return true; }
      if (/\/data(-full)?\.json/.test(url)) {
        const r = await route.fetch(); let t = await r.text();
        t = t.replace(/"version":\s*1125/, '"version":' + webVer).replace('"subtitle":"Naviguj sa cez kategórie"', '"subtitle":"PODNADPIS Z WEBU v' + webVer + '"').replace('"subtitle": "Naviguj sa cez kategórie"', '"subtitle": "PODNADPIS Z WEBU v' + webVer + '"');
        await route.fulfill({ status: 200, contentType: 'application/json', body: t }); return true;
      }
      return false;
    },
  });
  const page = await ctx.newPage();
  const log = L.watch(page); L.autoDialog(page, log, true);
  page.on('download', async (d) => { const p = L.path.join(L.DL, 'A2-05-' + d.suggestedFilename()); await d.saveAs(p); (R.downloads = R.downloads || []).push(p); });
  await page.goto(L.SK + '/');
  R.login = await L.login(page);
  // úprava: nová linka v Tenis › Správy
  await page.evaluate(() => navigate('f_ten_spr'));
  await page.waitForTimeout(200);
  await page.evaluate(() => { openAdd(); document.getElementById('nName').value = 'Rozpracovaná linka A2'; document.getElementById('nUrl').value = 'https://priklad.sk/draft'; saveNode(); });
  await page.waitForTimeout(600);
  R.idbAfterSave = await page.evaluate(async () => { const s = await idbGet(); return { version: s.version, nodes: s.nodes.length, has: !!s.nodes.find(n => n.name === 'Rozpracovaná linka A2') }; });

  // 1) reload (web stále v1125) → rozpracované z IndexedDB majú prednosť
  await page.reload(); await L.waitFull(page);
  R.afterReloadSameVer = await page.evaluate(() => ({ ver: DB.version, has: !!DB.nodes.find(n => n.name === 'Rozpracovaná linka A2'), hasTitleEn: 'title_en' in DB, lite: DB._lite, dirty: localStorage.getItem('sportStromDirty'), sub: document.getElementById('siteSub').textContent, dialogs: 0 }));
  R.afterReloadSameVer.visitorSeesDraftLink = await page.evaluate(() => { navigate('f_ten_spr'); return !![...document.querySelectorAll('#main .cl-name')].find(e => e.textContent.includes('Rozpracovaná linka A2')); });
  R.loginAfterReload = await L.login(page);
  R.badgeAfterReload = await page.evaluate(() => document.getElementById('verBadge').textContent);
  // Publikovať → v1126 v prehliadači (súbor sa „nenahrá“)
  await page.evaluate(() => publishData());
  await page.waitForTimeout(1500);
  R.afterPublish = await page.evaluate(() => ({ ver: DB.version, lsVer: localStorage.getItem('sportStromVer'), dirty: localStorage.getItem('sportStromDirty') }));

  // 2) web má ROVNAKÚ verziu 1126, ale iný obsah (napr. publikované z PC cez Cowork) → ticho vyhrá lokálna kópia?
  webVer = 1126;
  const d1 = log.dialogs.length;
  await page.reload(); await L.waitFull(page);
  R.sameVerDifferentContent = { dialogs: log.dialogs.slice(d1).map(d => d.msg), ver: await page.evaluate(() => DB.version), sub: await page.evaluate(() => DB.subtitle), dirty: await page.evaluate(() => localStorage.getItem('sportStromDirty')), draftLinkStillShown: await page.evaluate(() => !!DB.nodes.find(n => n.name === 'Rozpracovaná linka A2')) };

  // 3) web má NOVŠIU verziu 1130 → ponuka zálohy, potom prevzatie webu
  webVer = 1130;
  const d2 = log.dialogs.length;
  await page.reload(); await L.waitFull(page);
  await page.waitForTimeout(1000);
  R.newerOnWeb = { dialogs: log.dialogs.slice(d2).map(d => d.msg), ver: await page.evaluate(() => DB.version), sub: await page.evaluate(() => DB.subtitle), dirty: await page.evaluate(() => localStorage.getItem('sportStromDirty')), lsVer: await page.evaluate(() => localStorage.getItem('sportStromVer')), draftGone: await page.evaluate(() => !DB.nodes.find(n => n.name === 'Rozpracovaná linka A2')), idb: await page.evaluate(async () => { const s = await idbGet(); return s ? 'ešte je (v' + s.version + ')' : 'zmazaná'; }), downloads: R.downloads };
  // prihlásenie pri v1130: data-full.json musí mať tú istú verziu
  R.loginAt1130 = await L.login(page);
  R.badgeAt1130 = await page.evaluate(() => document.getElementById('verBadge').textContent);
  // 4) data-full.json má INÚ verziu než data.json (napr. cache) → prihlásenie zlyhá s hláškou
  webVer = 1131; // data.json v pamäti je 1130, data-full príde 1131
  await page.evaluate(() => logoutAdmin());
  R.loginMismatch = await L.login(page);
  webVer = null;

  // 5) IndexedDB nedostupná (súkromné okno) → save() musí povedať nahlas
  const ctx2 = await L.newContext(browser);
  const page2 = await ctx2.newPage();
  const log2 = L.watch(page2); L.autoDialog(page2, log2, true);
  await page2.addInitScript(() => { Object.defineProperty(window, 'indexedDB', { value: undefined, configurable: true }); });
  await page2.goto(L.SK + '/');
  R.noIdb = { login: await L.login(page2) };
  await page2.evaluate(() => navigate('f_ten_spr'));
  await page2.waitForTimeout(200);
  const d3 = log2.dialogs.length;
  await page2.evaluate(() => { openAdd(); document.getElementById('nName').value = 'Bez IDB A2'; document.getElementById('nUrl').value = 'https://priklad.sk/noidb'; saveNode(); });
  await page2.waitForTimeout(800);
  R.noIdb.dialogs = log2.dialogs.slice(d3).map(d => d.msg);
  R.noIdb.inMemory = await page2.evaluate(() => !!DB.nodes.find(n => n.name === 'Bez IDB A2'));
  R.noIdb.ls = await page2.evaluate(() => ({ ver: localStorage.getItem('sportStromVer'), dirty: localStorage.getItem('sportStromDirty') }));
  R.noIdb.errors = log2.errors;
  // po reloade s dirty=1 a prázdnou (nedostupnou) IDB: nepadne to?
  await page2.reload(); await L.waitFull(page2).catch(() => {});
  R.noIdb.afterReload = await page2.evaluate(() => ({ ver: DB.version, nodes: DB.nodes.length, dirty: localStorage.getItem('sportStromDirty'), main: document.getElementById('main').children.length }));
  R.noIdb.errorsAfterReload = log2.errors;

  // 6) localStorage nedostupný (vyhadzuje) → appka beží? admin uloží?
  const ctx3 = await L.newContext(browser);
  const page3 = await ctx3.newPage();
  const log3 = L.watch(page3); L.autoDialog(page3, log3, true);
  await page3.addInitScript(() => { const thrower = { get: () => { throw new Error('QuotaExceededError'); } }; Object.defineProperty(window, 'localStorage', thrower); });
  await page3.goto(L.SK + '/');
  R.noLs = { login: await L.login(page3).catch(e => 'login zlyhal: ' + e.message.slice(0, 100)) };
  const d4 = log3.dialogs.length;
  await page3.evaluate(() => { navigate('f_ten_spr'); openAdd(); document.getElementById('nName').value = 'Bez LS A2'; document.getElementById('nUrl').value = 'https://priklad.sk/nols'; saveNode(); }).catch(e => { R.noLs.evalErr = e.message.slice(0, 200); });
  await page3.waitForTimeout(800);
  R.noLs.dialogs = log3.dialogs.slice(d4).map(d => d.msg);
  R.noLs.errors = log3.errors;
  R.noLs.inMemory = await page3.evaluate(() => !!DB.nodes.find(n => n.name === 'Bez LS A2')).catch(() => null);
  // Aktuálne bez localStorage
  await page3.evaluate(() => openAktualne()).catch(() => {});
  await page3.waitForTimeout(1500);
  R.noLs.aktDialogs = log3.dialogs.slice(d4 + R.noLs.dialogs.length).map(d => d.msg);
  R.noLs.aktInfo = await page3.evaluate(() => document.getElementById('aktInfo').innerText.slice(0, 200)).catch(() => null);

  R.dialogs = log.dialogs; R.console = log.console.filter(c => !/ERR_BLOCKED_BY_CLIENT/.test(c.text)); R.errors = log.errors; R.csp = log.csp; R.http = log.http;
  L.saveLog('A2-05-ulozisko.log.json', R);
  console.log(JSON.stringify(R, null, 1));
  await browser.close();
})().catch(e => { console.error('CHYBA', e); process.exit(1); });
