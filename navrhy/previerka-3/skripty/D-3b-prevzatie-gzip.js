// D-3-prevzatie.js — časová os prevzatia statickej stránky appkou, CLS, dlhé úlohy, JSON.parse, INP (klik hneď po príchode)
// gzip server 8135 (ako GitHub Pages). Podmienky: mobil 390×844, CPU 4× pomalšie, sieť „slow 4G“ (1,6 Mb/s, 150 ms RTT) — ako Lighthouse mobil.
const L = require('./D-lib.js');
const PAGES = [
  ['sekcia Anglicko', 'http://127.0.0.1:8135/futbal/kluby/europa/anglicko/', '#main .card-root, #main .card-folder'],
  ['liga Championship', 'http://127.0.0.1:8135/futbal/kluby/europa/anglicko/championship/', '#main .card-link a'],
  ['Aktuálne', 'http://127.0.0.1:8135/aktualne/', '#main .card-link a'],
  ['domov (appka priamo)', 'http://127.0.0.1:8135/', '#main .card-root'],
];
const INIT = `
(function(){
  if(window.__perf) { window.__perf.reinit = (window.__perf.reinit||0)+1; return; }
  const P = window.__perf = {paints:[], ls:[], lcp:[], lt:[], ev:[], marks:[], reinit:0, appAt:null, tilesAt:null, writeAt:null, t0: performance.timeOrigin};
  const obs = (type, fn, extra) => { try{ new PerformanceObserver(l=>l.getEntries().forEach(fn)).observe(Object.assign({type, buffered:true}, extra||{})); }catch(e){} };
  obs('paint', e=>P.paints.push({n:e.name, t:e.startTime}));
  obs('layout-shift', e=>P.ls.push({t:e.startTime, v:e.value, inp:e.hadRecentInput, src:(e.sources||[]).map(s=>(s.node&&(s.node.id||s.node.className||s.node.tagName))+' '+(s.previousRect?Math.round(s.previousRect.y)+'→'+Math.round(s.currentRect.y)+'y h'+Math.round(s.previousRect.height)+'→'+Math.round(s.currentRect.height):'')).slice(0,4).join('; ')}));
  obs('largest-contentful-paint', e=>P.lcp.push({t:e.startTime, size:e.size, el:e.element&&(e.element.tagName+'#'+e.element.id+'.'+e.element.className), url:e.url}));
  obs('longtask', e=>P.lt.push({t:e.startTime, d:e.duration}));
  obs('event', e=>{ if(e.interactionId || e.name==='click') P.ev.push({n:e.name, t:e.startTime, d:e.duration, pd:e.processingStart-e.startTime, pe:e.processingEnd-e.processingStart, id:e.interactionId, tgt:e.target&&(e.target.tagName+'.'+e.target.className)}); }, {durationThreshold:16});
  const _j = Response.prototype.json;
  Response.prototype.json = async function(){ const u=this.url; const txt = await this.text(); const t=performance.now(); const r = JSON.parse(txt); P.marks.push({what:'JSON.parse '+u.replace(/^.*?\\/\\/[^/]+/,'')+' ('+txt.length+' zn.)', t, d:performance.now()-t}); return r; };
  const _open = document.open; document.open = function(){ P.writeAt = performance.now(); return _open.apply(document, arguments); };
  (function poll(){ const n=performance.now();
    if(!P.appAt && document.getElementById('main')) P.appAt = n;
    if(!P.tilesAt && document.querySelector('#main .card-folder, #main .card-root, #main .card-link')) P.tilesAt = n;
    requestAnimationFrame(poll); })();
})();`;
(async()=>{
  const browser = await L.chromium.launch();
  const out = [];
  for(const [name, url, clickSel] of PAGES){
    for(const klik of [false, true]){
      const ctx = await browser.newContext(L.MOBILE); const ext=[]; await L.blockExternal(ctx, ext);
      const page = await ctx.newPage(); await page.addInitScript(INIT);
      await L.throttle(page, {cpu:4, net:'slow4g'});
      const t0 = Date.now();
      await page.goto(url, {waitUntil:'commit'});
      let clicks = [];
      if(klik){
        // klik na prvú dlaždicu hneď, ako sa objaví v appke, a potom každých 700 ms (počas sťahovania/spracovania data.json)
        for(let i=0;i<14;i++){
          try{
            const el = await page.waitForSelector(clickSel, {timeout:8000, state:'visible'});
            const box = await el.boundingBox();
            if(box){ const tc = Date.now()-t0; await page.mouse.click(box.x+box.width/2, box.y+Math.min(box.height/2, 20)); clicks.push(tc); }
            if(i===0) { /* po prvom kliku sa možno zmenila sekcia — ďalšie kliky idú na „Späť“/prvú dlaždicu */ }
          }catch(e){ clicks.push('-'); }
          await page.waitForTimeout(700);
          if(page.url()!==url){ await page.goBack({waitUntil:'commit'}).catch(()=>{}); }
        }
      }
      await page.waitForTimeout(klik ? 2000 : 14000);
      const P = await page.evaluate(()=>{ const p = window.__perf; return p ? JSON.parse(JSON.stringify(p)) : null; });
      const cls = P ? P.ls.filter(x=>!x.inp).reduce((a,x)=>a+x.v,0) : null;
      out.push({name, url, klik, clicks, P, cls});
      await ctx.close();
    }
  }
  await browser.close();
  L.fs.writeFileSync(__dirname + '/../data/D-3b-prevzatie-gzip.json', JSON.stringify(out, null, 1));
  for(const o of out){
    const P=o.P; if(!P){ console.log(o.name,'bez dát'); continue; }
    console.log(`\n### ${o.name}${o.klik?' — S KLIKANÍM':''} (${o.url}) reinit=${P.reinit}`);
    console.log(`FCP ${P.paints.find(p=>p.n==='first-contentful-paint')?.t.toFixed(0)} ms | document.open (prevzatie) ${P.writeAt?.toFixed(0)} ms | #main (appka v DOM) ${P.appAt?.toFixed(0)} ms | dlaždice appky ${P.tilesAt?.toFixed(0)} ms`);
    console.log(`LCP kandidáti: ${P.lcp.map(l=>`${l.t.toFixed(0)} ms ${l.el} ${l.size}px²`).join(' → ')}`);
    console.log(`CLS (bez vstupu) = ${o.cls?.toFixed(4)}; posuny: ${P.ls.map(l=>`${l.t.toFixed(0)}ms ${l.v.toFixed(4)}${l.inp?'(po vstupe)':''} [${l.src}]`).join('; ')}`);
    console.log(`JSON: ${P.marks.map(m=>`${m.what} @${m.t.toFixed(0)} ms trvalo ${m.d.toFixed(0)} ms`).join(' | ')}`);
    const lt = P.lt; console.log(`dlhé úlohy (>50 ms) do 14 s: ${lt.length}×, spolu ${lt.reduce((a,x)=>a+x.d,0).toFixed(0)} ms, TBT≈${lt.reduce((a,x)=>a+Math.max(0,x.d-50),0).toFixed(0)} ms, najdlhšia ${Math.max(0,...lt.map(x=>x.d)).toFixed(0)} ms; zoznam: ${lt.map(x=>`${x.t.toFixed(0)}+${x.d.toFixed(0)}`).join(', ')}`);
    if(o.klik){ console.log(`kliky (ms od štartu): ${o.clicks.join(', ')}`); console.log(`interakcie (event timing): ${P.ev.map(e=>`${e.n}@${e.t.toFixed(0)} trvanie ${e.d.toFixed(0)} ms (čakanie ${e.pd.toFixed(0)}, spracovanie ${e.pe.toFixed(0)}) ${e.tgt}`).join('; ')}`); const ds=P.ev.map(e=>e.d); console.log(`INP≈ max ${ds.length?Math.max(...ds).toFixed(0):'-'} ms, 98. percentil ${ds.length?ds.sort((a,b)=>a-b)[Math.floor(ds.length*0.98)-1>=0?Math.floor(ds.length*0.98)-1:0].toFixed(0):'-'} ms, počet ${ds.length}`); }
  }
})().catch(e=>{console.error(e);process.exit(1)});
