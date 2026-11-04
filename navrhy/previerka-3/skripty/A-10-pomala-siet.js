// A-10: prevzatie na pomalej sieti so serverom s gzip (ako GitHub Pages): Slow 4G (400 ms RTT, 400 kb/s) a 3G (1,6 Mb/s, 150 ms)
const L = require('./A-lib');
const R = {};
(async () => {
  const browser = await L.launch();
  for (const [net, cond] of [['slow4G_400kbps_400ms', { latency: 400, downloadThroughput: 400 * 1024 / 8, uploadThroughput: 200 * 1024 / 8 }], ['3G_1.6Mbps_150ms', { latency: 150, downloadThroughput: 1.6 * 1024 * 1024 / 8, uploadThroughput: 750 * 1024 / 8 }]]) {
    for (const [label, dev] of [['desktop', null], ['pixel5_cpu4x', 'Pixel 5']]) {
      const ctx = await L.newContext(browser, dev ? { device: dev } : { viewport: { width: 1366, height: 768 } });
      const page = await ctx.newPage();
      const cdp = await ctx.newCDPSession(page);
      await cdp.send('Network.enable');
      await cdp.send('Network.emulateNetworkConditions', { offline: false, ...cond });
      if (dev) await cdp.send('Emulation.setCPUThrottlingRate', { rate: 4 });
      const t0 = Date.now();
      await page.goto(L.SK404 + '/futbal/kluby/europa/anglicko/premier-league/', { waitUntil: 'domcontentloaded' });
      const tStatic = Date.now() - t0;
      const fp = await page.evaluate(() => performance.getEntriesByType('paint').map((e) => e.name + '=' + Math.round(e.startTime)).join(','));
      await page.evaluate(() => new Promise((res) => { const h = setInterval(() => { if (document.getElementById('srch')) { clearInterval(h); res(); } }, 20); }));
      const tApp = Date.now() - t0;
      await L.waitApp(page); const tRender = Date.now() - t0;
      await L.waitFull(page, 120000); const tFull = Date.now() - t0;
      R[net + '_' + label] = { statickaDCLms: tStatic, paint: fp, appkaMs: tApp, vykresleneMs: tRender, celeDataMs: tFull };
      await ctx.close();
    }
  }
  await browser.close();
  console.log(JSON.stringify(R, null, 1));
  L.out(R, 'A-10-pomala-siet.out.json');
})().catch((e) => { console.error('CHYBA', e); process.exit(1); });
