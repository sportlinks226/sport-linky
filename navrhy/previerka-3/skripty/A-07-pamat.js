// A-07: race / únik pamäte — 200 navigácií, DOM uzly, poslucháči (CDP), halda, časovače, viacnásobný fetch data.json
const L = require('./A-lib');
const R = {};
(async () => {
  const browser = await L.launch();
  const ctx = await L.newContext(browser, { viewport: { width: 1366, height: 768 } });
  const page = await ctx.newPage(); const log = L.watch(page);
  const cdp = await ctx.newCDPSession(page);
  await cdp.send('HeapProfiler.enable'); await cdp.send('Runtime.enable'); await cdp.send('DOMDebugger.enable').catch(() => {});
  // časovače: obal setInterval/setTimeout, aby sme videli, čo sa vytvorí a nezruší
  await page.addInitScript(() => {
    window.__tim = { intervals: new Map(), timeouts: 0, cleared: 0 };
    const si = window.setInterval, ci = window.clearInterval;
    window.setInterval = function (fn, ms) { const id = si.apply(this, arguments); window.__tim.intervals.set(id, { ms, fn: String(fn).slice(0, 60), stack: (new Error().stack || '').split('\n')[2] }); return id; };
    window.clearInterval = function (id) { window.__tim.intervals.delete(id); window.__tim.cleared++; return ci.apply(this, arguments); };
    window.__listenerCount = 0; const ael = EventTarget.prototype.addEventListener;
    EventTarget.prototype.addEventListener = function () { window.__listenerCount++; return ael.apply(this, arguments); };
  });
  await page.goto(L.SK + '/'); await L.waitApp(page); await L.waitFull(page); await page.waitForTimeout(800);
  async function measure(label) {
    await page.evaluate(() => new Promise((r) => setTimeout(r, 100)));
    await cdp.send('HeapProfiler.collectGarbage');
    const dom = await page.evaluate(() => document.getElementsByTagName('*').length);
    const heap = await page.evaluate(() => performance.memory ? Math.round(performance.memory.usedJSHeapSize / 1048576 * 10) / 10 : null);
    const { result } = await cdp.send('Runtime.evaluate', { expression: 'document', objectGroup: 'm' });
    // poslucháči na window/document (CDP getEventListeners)
    const lw = await cdp.send('Runtime.evaluate', { expression: 'window', objectGroup: 'm' });
    const lsDoc = (await cdp.send('DOMDebugger.getEventListeners', { objectId: result.objectId })).listeners.length;
    const lsWin = (await cdp.send('DOMDebugger.getEventListeners', { objectId: lw.result.objectId })).listeners.length;
    // poslucháči na všetkých prvkoch v #main (vzorka)
    const main = await cdp.send('Runtime.evaluate', { expression: 'document.getElementById("main")', objectGroup: 'm' });
    const lsMain = (await cdp.send('DOMDebugger.getEventListeners', { objectId: main.result.objectId, depth: -1 })).listeners.length;
    await cdp.send('Runtime.releaseObjectGroup', { objectGroup: 'm' });
    const tim = await page.evaluate(() => ({ intervals: [...window.__tim.intervals.values()].map((x) => x.ms + 'ms:' + x.fn), addCalls: window.__listenerCount }));
    const m = { label, dom, heapMB: heap, listenersDocument: lsDoc, listenersWindow: lsWin, listenersMainSubtree: lsMain, intervals: tim.intervals, addEventListenerCalls: tim.addCalls, dataJsonFetches: log.requests.filter((r) => /data\.json/.test(r.url)).length, aktFetches: log.requests.filter((r) => /aktualne\.json/.test(r.url)).length, requests: log.requests.length };
    (R.merania = R.merania || []).push(m); return m;
  }
  await measure('start (domov, celé dáta)');
  // zoznam cieľov: náhodné priečinky z DB
  const ids = await page.evaluate(() => { const f = DB.nodes.filter((n) => n.type === 'folder' && (n._cnt === undefined ? countAll(n.id) : n._cnt) > 0 && !n.enOnly); let s = 7; const rnd = () => { s = (s * 9301 + 49297) % 233280; return s / 233280; }; const out = []; for (let i = 0; i < 200; i++) out.push(f[Math.floor(rnd() * f.length)].id); return out; });
  // 200 navigácií cez navigate() (ako klik), rýchlo za sebou
  const t0 = Date.now();
  for (let i = 0; i < 200; i++) { await page.evaluate((id) => navigate(id), ids[i]); if (i % 50 === 49) await measure('po ' + (i + 1) + ' navigáciách'); }
  R.cas200 = Date.now() - t0;
  // + 100 × domov ↔ sekcia + stĺpce
  await page.click('#vSwitch button[data-mode=cols]'); await page.waitForTimeout(300);
  for (let i = 0; i < 100; i++) await page.evaluate((id) => navigate(id), ids[i]);
  await measure('po 100 navigáciách v stĺpcoch');
  await page.click('#vSwitch button[data-mode=tiles]'); await page.waitForTimeout(300);
  // hľadanie 50×
  for (const q of ['a', 'ko', 'kos', 'kosi', 'slovan', 'bayern', 'liga', 'hokej', 'x', 'real']) for (let k = 0; k < 5; k++) { await page.fill('#srch', q); await page.waitForTimeout(230); }
  await page.fill('#srch', ''); await page.waitForTimeout(300);
  await measure('po 50 hľadaniach');
  // Späť 100×
  for (let i = 0; i < 100; i++) { await page.goBack().catch(() => {}); }
  await page.waitForTimeout(500);
  await measure('po 100× Späť');
  // rýchle klikanie: 30 klikov bez čakania (Promise.all) — stav musí sedieť s adresou
  await page.evaluate(() => navigate(null)); await page.waitForTimeout(300);
  await page.evaluate((ids) => { for (let i = 0; i < 30; i++) navigate(ids[i]); }, ids);
  await page.waitForTimeout(500);
  R.rychleKlikanie = await page.evaluate(() => ({ url: location.pathname, curId, urlSedi: location.pathname === urlForId(curId), bc: document.querySelector('#breadcrumb .bc-h') && document.querySelector('#breadcrumb .bc-h').innerText, hist: history.length }));
  // Späť/Vpred rýchlo za sebou 20× a overenie zhody adresa ↔ obsah
  for (let i = 0; i < 20; i++) { page.goBack().catch(() => {}); } await page.waitForTimeout(800);
  R.rychleSpat = await page.evaluate(() => ({ url: location.pathname, curId, urlSedi: location.pathname === urlForId(curId) }));
  // záverečné
  const fin = await measure('koniec');
  R.rozdielDOM = fin.dom - R.merania[0].dom; R.rozdielHalda = fin.heapMB - R.merania[0].heapMB;
  R.errors = log.errors; R.ext = ctx._ext.length; R.consoleIne = log.console.filter((c) => !/ERR_BLOCKED/.test(c.text)).slice(0, 10);
  // Druhý beh na mobile s obmedzeným CPU (4×) — čas navigácie do najväčšieho priečinka
  const mctx = await L.newContext(browser, { device: 'Pixel 5' });
  const mp = await mctx.newPage(); const mcdp = await mctx.newCDPSession(mp);
  await mcdp.send('Emulation.setCPUThrottlingRate', { rate: 4 });
  await mp.goto(L.SK + '/'); await L.waitApp(mp); await L.waitFull(mp); await mp.waitForTimeout(500);
  const big = await mp.evaluate(() => { let best = null, bn = 0; for (const n of DB.nodes) { if (n.type !== 'folder') continue; const k = childrenOf(n.id).length; if (k > bn) { bn = k; best = n.id; } } return { id: best, n: bn }; });
  const times = [];
  for (const id of [big.id, 'f_fut_klu_eu', 'f_fut', null, big.id]) { const t = await mp.evaluate((id) => { const t0 = performance.now(); navigate(id); return Math.round(performance.now() - t0); }, id); times.push({ id, ms: t }); }
  const srchT = await mp.evaluate(() => { document.getElementById('srch').value = 'a'; const t0 = performance.now(); render(); return Math.round(performance.now() - t0); });
  await mp.evaluate(() => { document.getElementById('srch').value = ''; render(); });
  R.mobilCpu4 = { najvacsiPriecinok: big, navigacie: times, hladanieA_ms: srchT };
  await mctx.close();
  await browser.close();
  console.log(JSON.stringify(R, null, 1));
  L.out(R, 'A-07-pamat.out.json');
})().catch((e) => { console.error('CHYBA', e); process.exit(1); });
