// VÝKON: čas renderColumns, prekreslenia za sekundu pri rýchlom pohybe
const L = require('./lib');
(async()=>{
  const {browser,page} = await L.open(1280,800);
  await L.cols(page);
  await page.evaluate(()=>{ window.__rc=[]; const o=renderColumns; window.renderColumns=function(...a){const t=performance.now(); const r=o.apply(this,a); window.__rc.push(performance.now()-t); return r;}; });
  // priamo meraj čas renderColumns pre rôzne hĺbky
  await L.hoverItem(page,0,'Futbal',1100); await L.hoverItem(page,1,'Kluby',1100); await L.hoverItem(page,2,'Európa',1100); await L.hoverItem(page,3,'Anglicko',1100); await L.hoverItem(page,4,'Premier',1100);
  let rc = await page.evaluate(()=>window.__rc.map(x=>x.toFixed(1)));
  console.log('čas renderColumns (ms) pri postupnom otváraní Futbal→Kluby→Európa→Anglicko→PL:', rc.join(', '));
  const sizes = await page.evaluate(()=>({html: document.getElementById('main').innerHTML.length, cit: document.querySelectorAll('.cit').length, img: document.querySelectorAll('#main img').length}));
  console.log('veľkosť vykresleného HTML:', sizes.html, 'znakov,', sizes.cit, 'položiek,', sizes.img, 'obrázkov');
  // rýchly pohyb myšou zvisle po stĺpci 3 (krajiny) 2 sekundy — koľko prekreslení?
  await page.evaluate(()=>{window.__rc=[];});
  const col = await page.evaluate(()=>{const r=document.querySelector('.col[data-lv="3"]').getBoundingClientRect(); return {x:r.left+r.width/2, top:r.top+70, bottom:r.bottom-50};});
  const t0=Date.now(); let moves=0;
  while(Date.now()-t0<2000){ for(let y=col.top;y<col.bottom;y+=12){ await page.mouse.move(col.x,y); moves++; } for(let y=col.bottom;y>col.top;y-=12){ await page.mouse.move(col.x,y); moves++; } }
  await page.waitForTimeout(300);
  rc = await page.evaluate(()=>window.__rc);
  console.log('rýchly pohyb 2 s po stĺpci krajín:', moves, 'pohybov,', rc.length, 'prekreslení (', (rc.length/2).toFixed(1), '/s ), priemer', (rc.reduce((a,b)=>a+b,0)/Math.max(1,rc.length)).toFixed(1), 'ms, max', Math.max(0,...rc).toFixed(1), 'ms');
  // pomalý pohyb — každá položka 150 ms (človek si číta zoznam)
  await page.evaluate(()=>{window.__rc=[];});
  const items = await page.evaluate(()=>[...document.querySelectorAll('.col[data-lv="3"] .cit')].slice(0,12).map(a=>{const r=a.getBoundingClientRect(); return {x:r.left+r.width/2,y:r.top+r.height/2};}));
  for(const it of items){ await page.mouse.move(it.x,it.y); await page.waitForTimeout(150); }
  await page.waitForTimeout(300); rc = await page.evaluate(()=>window.__rc);
  console.log('pomalý pohyb po 12 krajinách (150 ms/položka):', rc.length, 'prekreslení celého <main>, spolu', rc.reduce((a,b)=>a+b,0).toFixed(0), 'ms');
  // dlhá úloha (long task) merania cez PerformanceObserver pri pohybe
  await page.evaluate(()=>{window.__lt=[]; new PerformanceObserver(l=>l.getEntries().forEach(e=>window.__lt.push(e.duration))).observe({type:'longtask'});});
  for(let k=0;k<3;k++) for(const it of items){ await page.mouse.move(it.x,it.y); await page.waitForTimeout(140); }
  await page.waitForTimeout(300); const lt = await page.evaluate(()=>window.__lt);
  console.log('long tasks (>50 ms) počas 36 hoverov:', lt.length, lt.map(x=>x.toFixed(0)).join(','));
  // mousemove listener: koľko getBoundingClientRect za sekundu
  const mm = await page.evaluate(async()=>{ let n=0; const o=Element.prototype.getBoundingClientRect; Element.prototype.getBoundingClientRect=function(){n++; return o.call(this);}; await new Promise(r=>setTimeout(r,10)); window.__gb=()=>n; });
  await page.evaluate(()=>{window.__m0=0;});
  const t1=Date.now(); let mv=0; while(Date.now()-t1<1000){ await page.mouse.move(col.x+ (mv%2), col.top+100+(mv%5)); mv++; }
  console.log('mousemove 1 s:', mv, 'udalostí,', await page.evaluate(()=>window.__gb()), 'volaní getBoundingClientRect (layout) ');
  // pamäť / listenery: počet listenerov na main sa nemení (delegované) — overiť opakovaným renderom
  const mem0 = await page.evaluate(()=>performance.memory ? performance.memory.usedJSHeapSize : 0);
  for(let i=0;i<40;i++){ await page.evaluate(()=>{colPath=colPath.slice(0,3); colPath[3]=DB.nodes.find(n=>n.name==='Anglicko').id; renderColumns(document.getElementById('main'),''); colPath[3]=DB.nodes.find(n=>n.name==='Nemecko').id; renderColumns(document.getElementById('main'),'');}); }
  const mem1 = await page.evaluate(()=>performance.memory ? performance.memory.usedJSHeapSize : 0);
  console.log('pamäť JS po 80 prekresleniach:', (mem0/1e6).toFixed(1), '→', (mem1/1e6).toFixed(1), 'MB');
  await browser.close();
})().catch(e=>{console.error(e); process.exit(1);});
