// D-5-pamat.js — veľkosť haldy JS (CDP Performance.getMetrics JSHeapUsedSize) pred dátami, po data.json, po 100 navigáciách (desktop, bez spomalenia)
const L = require('./D-lib.js');
(async()=>{
  const browser = await L.chromium.launch();
  const ctx = await browser.newContext(L.DESKTOP); await L.blockExternal(ctx, []); const page = await ctx.newPage();
  const cdp = await ctx.newCDPSession(page); await cdp.send('Performance.enable'); await cdp.send('HeapProfiler.enable');
  const heap = async (label) => { await cdp.send('HeapProfiler.collectGarbage'); await page.waitForTimeout(300); const m = (await cdp.send('Performance.getMetrics')).metrics; const g = k => m.find(x=>x.name===k).value; console.log(`| ${label} | ${(g('JSHeapUsedSize')/1048576).toFixed(1)} MB | ${(g('JSHeapTotalSize')/1048576).toFixed(1)} MB | ${g('Nodes')} | ${g('JSEventListeners')} | ${g('Documents')} |`); return g('JSHeapUsedSize'); };
  console.log('| Stav | halda použitá | halda celkom | DOM uzly | poslucháči | dokumenty |'); console.log('|---|---:|---:|---:|---:|---:|');
  // 1) pred data.json: zablokuj data.json dočasne
  await ctx.route('**/data.json*', r => r.abort());
  await page.goto(L.SK + '/', {waitUntil:'load'}); await page.waitForTimeout(3000);
  await heap('domov zo štartovacieho balíka (bez data.json)');
  await ctx.unroute('**/data.json*');
  await page.goto(L.SK + '/', {waitUntil:'load'}); await page.waitForTimeout(5000);
  const h1 = await heap('domov po stiahnutí a spracovaní data.json');
  // 2) 100 navigácií po priečinkoch (náhodne, cez navigate(id) z atribútov onclick)
  let n=0; const seen=new Set();
  for(let i=0;i<100;i++){
    const ids = await page.evaluate(()=>[...document.querySelectorAll('#main [onclick*="navClick"]')].map(e=>(e.getAttribute('onclick').match(/navClick\(event,'([^']+)'\)/)||[])[1]).filter(Boolean));
    let id = ids.filter(x=>!seen.has(x))[0] || ids[Math.floor(Math.random()*ids.length)];
    if(!id || Math.random()<0.25){ await page.evaluate(()=>{ const b=document.querySelector('.bc-back'); if(b&&b.offsetParent) b.click(); else navigate(null); }); }
    else { seen.add(id); await page.evaluate(id=>navigate(id), id); }
    n++; await page.waitForTimeout(60);
    if(i===49) await heap('po 50 navigáciách');
  }
  await page.waitForTimeout(1500);
  const h2 = await heap('po 100 navigáciách (' + seen.size + ' rôznych priečinkov)');
  // 3) hľadanie „a“ (najviac výsledkov) a späť
  await page.fill('#srch','a'); await page.waitForTimeout(2500); const nres = await page.evaluate(()=>document.querySelectorAll('#main .card-link').length);
  await heap('počas hľadania „a“ ('+nres+' výsledkov na stránke)');
  await page.fill('#srch',''); await page.waitForTimeout(1500); await heap('po vyčistení hľadania');
  console.log(`\nrozdiel po 100 navigáciách oproti stavu po dátach: ${((h2-h1)/1048576).toFixed(1)} MB`);
  await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});
