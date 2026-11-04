// výkon: pomalý pohyb po položkách (meranie podľa mena), 1024 ladenie, domov 1080
const L = require('./lib');
(async()=>{
  let {browser,page} = await L.open(1280,800);
  await L.cols(page);
  await page.evaluate(()=>{ window.__rc=[]; const o=renderColumns; window.renderColumns=function(...a){const t=performance.now(); const r=o.apply(this,a); window.__rc.push(performance.now()-t); return r;}; });
  await L.hoverItem(page,0,'Futbal',1100); await L.hoverItem(page,1,'Kluby',1100); await L.hoverItem(page,2,'Európa',1100);
  await page.evaluate(()=>{window.__rc=[];});
  const names = await page.evaluate(()=>[...document.querySelectorAll('.col[data-lv="3"] .cit .nm')].map(e=>e.textContent.trim()).slice(0,12));
  const t0=Date.now(); for(const n of names){ await L.hoverItem(page,3,n,150); }
  let rc = await page.evaluate(()=>window.__rc);
  console.log('pomalý pohyb po 12 krajinách (150 ms/položka):', rc.length, 'prekreslení <main>, priemer', (rc.reduce((a,b)=>a+b,0)/rc.length).toFixed(1), 'ms, max', Math.max(...rc).toFixed(1), 'ms, spolu', rc.reduce((a,b)=>a+b,0).toFixed(0), 'ms z', Date.now()-t0, 'ms');
  // FPS počas auto-rolovania
  const col3 = await page.evaluate(()=>{const r=document.querySelector('.col[data-lv="3"]').getBoundingClientRect(); return {x:r.left+r.width/2, bottom:r.bottom};});
  await page.mouse.move(col3.x, col3.bottom-15,{steps:3}); await page.waitForTimeout(300); await page.mouse.move(col3.x, col3.bottom-16);
  const fps = await page.evaluate(()=>new Promise(r=>{let n=0; const t=performance.now(); function f(){ n++; if(performance.now()-t<1000) requestAnimationFrame(f); else r(n);} requestAnimationFrame(f);}));
  console.log('snímky/s počas auto-rolovania:', fps);
  await browser.close();
  // 1024 ladenie
  ({browser,page} = await L.open(1024,800));
  await L.cols(page);
  await L.hoverItem(page,0,'Futbal',1100); await L.hoverItem(page,1,'Kluby',1100); await L.hoverItem(page,2,'Európa',1100);
  let s = await L.state(page); console.log('1024: po Európe stĺpce ľavé okraje', s.cols.map(c=>c.left).join(','), 'wrapLeft', s.wrapLeft, 'šírka wrap', await page.evaluate(()=>document.getElementById('colsWrap').clientWidth));
  await L.shot(page,'rozl-1024x800-hlbka3-prvy-stlpec-odrezany');
  const pa = await L.item(page,3,'Anglicko'); console.log('  Anglicko pozícia', pa && Math.round(pa.x), pa && Math.round(pa.y), 'viditeľné v okne', pa && pa.x<1024);
  if(pa){ await page.mouse.move(pa.x,pa.y); await page.waitForTimeout(1100); s=await L.state(page); console.log('  po hoveri Anglicko colPath', JSON.stringify(s.colPath), 'okraje', s.cols.map(c=>c.left+(c.collapsed?'*':'')).join(','), 'wrapLeft', s.wrapLeft); await L.shot(page,'rozl-1024x800-hlbka4'); }
  await browser.close();
  // 1920x1080 domov: posúva sa stránka?
  ({browser,page} = await L.open(1920,1080));
  await L.cols(page);
  const pf = await L.item(page,0,'Futbal'); await page.mouse.move(pf.x,pf.y); await page.waitForTimeout(1000); s=await L.state(page);
  console.log('1920x1080: po Futbale scrollY', s.scrollY, 'colPath', JSON.stringify(s.colPath), 'výška dokumentu', await page.evaluate(()=>document.documentElement.scrollHeight), 'min-height main', await page.evaluate(()=>getComputedStyle(document.querySelector('main')).minHeight));
  await L.shot(page,'rozl-1920x1080-po-futbale');
  await browser.close();
})().catch(e=>{console.error(e); process.exit(1);});
