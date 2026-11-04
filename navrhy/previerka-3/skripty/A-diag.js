const L = require('./A-lib');
(async () => {
  const browser = await L.launch();
  const ctx = await L.newContext(browser, {});
  const page = await ctx.newPage(); const log = L.watch(page);
  let t = Date.now();
  await page.goto(L.SK + '/', { waitUntil: 'domcontentloaded' });
  console.log('domcontentloaded', Date.now() - t);
  const ta = await L.waitApp(page); console.log('app', ta);
  await L.waitFull(page); console.log('full', Date.now() - t, 'partial', await page.evaluate(() => DB._partial));
  await page.waitForTimeout(1500);
  console.log('ext blocked by route:', ctx._ext.length, ctx._ext.slice(0, 5));
  console.log('failed:', log.failed.slice(0, 10));
  console.log('requests to non-local:', log.requests.filter(r => !r.url.startsWith('http://127.0.0.1')).map(r => r.url).slice(0, 10));
  console.log('frames:', page.frames().map(f => f.url().slice(0, 60)));
  console.log('errors', log.errors, 'csp', log.csp.length, log.console.slice(0,5));
  await browser.close();
})();
