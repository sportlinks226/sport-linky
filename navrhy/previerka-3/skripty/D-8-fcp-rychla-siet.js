// D-8-fcp-rychla-siet.js — prvé vykreslenie domova pri RÝCHLEJ sieti a 4× pomalšom CPU (overenie Lighthouse: pozorované FCP 1233 ms na SK domove vs 229 ms EN)
const L = require('./D-lib.js');
const INIT = `window.__p={paints:[],lt:[],marks:[]}; try{new PerformanceObserver(l=>l.getEntries().forEach(e=>__p.paints.push({n:e.name,t:Math.round(e.startTime)}))).observe({type:'paint',buffered:true});
new PerformanceObserver(l=>l.getEntries().forEach(e=>__p.lt.push(Math.round(e.startTime)+'+'+Math.round(e.duration)))).observe({type:'longtask',buffered:true});}catch(e){}
const _j=Response.prototype.json; Response.prototype.json=async function(){const u=this.url;const t=await this.text();const t0=performance.now();const r=JSON.parse(t);__p.marks.push(u.replace(/^.*?\\/\\/[^/]+/,'').split('?')[0]+' @'+Math.round(t0)+' parse '+Math.round(performance.now()-t0)+' ms');return r;};
window.addEventListener('load',()=>__p.marks.push('load @'+Math.round(performance.now())));`;
(async()=>{
  const browser = await L.chromium.launch();
  for(const [name,url] of [['SK domov gzip 8135','http://127.0.0.1:8135/'],['EN domov gzip 8136','http://127.0.0.1:8136/'],['SK domov gzip 8135 (2. meranie)','http://127.0.0.1:8135/'],['SK sekcia Anglicko gzip','http://127.0.0.1:8135/futbal/kluby/europa/anglicko/']]){
    for(const cpu of [4,1]){
      const ctx = await browser.newContext(L.MOBILE); await L.blockExternal(ctx, []); const page = await ctx.newPage(); await page.addInitScript(INIT);
      const cdp = await ctx.newCDPSession(page); await cdp.send('Emulation.setCPUThrottlingRate',{rate:cpu});
      await page.goto(url,{waitUntil:'commit'}); await page.waitForTimeout(5000);
      const p = await page.evaluate(()=>JSON.parse(JSON.stringify(window.__p)));
      console.log(`${name}, CPU ${cpu}×, rýchla sieť: FCP ${p.paints.find(x=>x.n==='first-contentful-paint')?.t} ms | ${p.marks.join(' | ')} | dlhé úlohy: ${p.lt.join(', ')}`);
      await ctx.close();
    }
  }
  await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});
