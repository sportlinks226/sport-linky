// Overenie 3: výkon, prepnutie režimu, reload, priamy príchod, hľadanie, resize, promo iframe, Aktuálne, dotyk
const L = require('./lib2');
(async()=>{
  let {browser,page,errs,ctx} = await L.open(1280,800);
  await L.cols(page);
  await page.evaluate(()=>{ window.__rc=[]; const o=renderColumns; window.renderColumns=function(...a){const t=performance.now(); const r=o.apply(this,a); window.__rc.push(performance.now()-t); return r;}; });
  await L.go(page,0,'Futbal'); await L.go(page,1,'Kluby'); await L.go(page,2,'Európa'); await L.go(page,3,'Anglicko'); await L.go(page,4,'Premier');
  let rc = await page.evaluate(()=>window.__rc.map(x=>x.toFixed(1)));
  console.log('VÝKON: renderColumns (ms) Futbal→…→PL:', rc.join(', '), '| položiek', await page.evaluate(()=>document.querySelectorAll('.cit').length));
  await page.evaluate(()=>{window.__rc=[]; window.__lt=[]; new PerformanceObserver(l=>l.getEntries().forEach(e=>window.__lt.push(e.duration))).observe({type:'longtask'});});
  await L.go(page,2,'Európa');
  const names = await page.evaluate(()=>[...document.querySelectorAll('.col[data-lv="3"] .cit .nm')].map(e=>e.textContent.trim()).slice(0,12));
  const t0=Date.now(); for(const n of names){ await L.go(page,3,n,220); }
  rc = await page.evaluate(()=>window.__rc); const lt = await page.evaluate(()=>window.__lt);
  console.log('VÝKON: 12 krajín (220 ms/položka):', rc.length, 'prekreslení, priemer', (rc.reduce((a,b)=>a+b,0)/rc.length).toFixed(1), 'ms, max', Math.max(...rc).toFixed(1), 'ms, spolu', rc.reduce((a,b)=>a+b,0).toFixed(0), 'ms z', Date.now()-t0, 'ms; long tasks', lt.length, '| stĺpce 0–2 ostali v DOM (nie nanovo):', await page.evaluate(()=>window.__keep));
  // rýchly pohyb 2 s
  await page.evaluate(()=>{window.__rc=[];});
  const col = await page.evaluate(()=>{const r=document.querySelector('.col[data-lv="3"]').getBoundingClientRect(); return {x:r.left+r.width/2, top:r.top+40, bottom:r.bottom-20};});
  const t1=Date.now(); let moves=0; while(Date.now()-t1<2000){ for(let y=col.top;y<col.bottom;y+=12){ await page.mouse.move(col.x,y); moves++; } for(let y=col.bottom;y>col.top;y-=12){ await page.mouse.move(col.x,y); moves++; } }
  await page.waitForTimeout(400); rc = await page.evaluate(()=>window.__rc);
  console.log('VÝKON: rýchly pohyb 2 s (', moves, 'pohybov ):', rc.length, 'prekreslení');
  // prepnutie Dlaždice ↔ Stĺpce v hĺbke
  await page.mouse.move(640,30); await page.evaluate(()=>navigate(DB.nodes.find(n=>n.name==='Anglicko'&&getPath(n.id).some(p=>p.name==='Futbal')).id)); await page.waitForTimeout(500);
  await page.click('#vSwitch button[data-mode=tiles]'); await page.waitForTimeout(300);
  console.log('PREPNUTIE → Dlaždice: cols-mode', await page.evaluate(()=>document.querySelector('main').classList.contains('cols-mode')), 'aria-pressed', await page.evaluate(()=>[...document.querySelectorAll('#vSwitch button')].map(b=>b.getAttribute('aria-pressed')).join('/')), 'dlaždíc', await page.evaluate(()=>document.querySelectorAll('#main a.card-folder').length));
  await page.click('#vSwitch button[data-mode=cols]'); await page.waitForTimeout(600); let s=await L.state(page);
  console.log('PREPNUTIE → Stĺpce: colPath', JSON.stringify(s.colPath), 'stĺpcov', s.cols.length, 'wrapTop', s.wrapTop, 'wrapLeft', s.wrapLeft);
  await L.shot(page,'10-prepnutie-v-hlbke');
  // reload v hĺbke
  await page.reload(); await page.waitForTimeout(250);
  const early = await page.evaluate(()=>({cols: document.querySelector('main')?.classList.contains('cols-mode'), wrap: !!document.getElementById('colsWrap'), partial: typeof DB!=='undefined' && !!DB._partial}));
  await page.waitForFunction(()=>typeof DB!=='undefined' && !DB._partial); await page.waitForTimeout(400); s=await L.state(page);
  console.log('RELOAD v hĺbke: hneď po načítaní', JSON.stringify(early), '| po dátach colPath', JSON.stringify(s.colPath), 'stĺpcov', s.cols.length, 'wrapTop', s.wrapTop);
  await L.shot(page,'11-reload-v-hlbke');
  // priamy príchod
  await page.goto('http://localhost:8123/hokej/kluby/severna-amerika/'); await page.waitForFunction(()=>typeof DB!=='undefined' && !DB._partial); await page.waitForTimeout(400); s=await L.state(page);
  console.log('PRIAMY PRÍCHOD /hokej/kluby/severna-amerika/: colPath', JSON.stringify(s.colPath), 'stĺpcov', s.cols.length, 'wrapTop', s.wrapTop);
  // hľadanie
  await page.fill('#srch','arsenal'); await page.waitForTimeout(500);
  console.log('HĽADANIE: cols-mode', await page.evaluate(()=>document.querySelector('main').classList.contains('cols-mode')), 'výsledkov', await page.evaluate(()=>document.querySelectorAll('#main a').length));
  await page.fill('#srch',''); await page.waitForTimeout(500); s=await L.state(page); console.log('   po zmazaní: colPath', JSON.stringify(s.colPath), 'stĺpcov', s.cols.length);
  // resize
  await page.setViewportSize({width:640,height:800}); await page.waitForTimeout(400); console.log('RESIZE 640: cols-mode', await page.evaluate(()=>document.querySelector('main').classList.contains('cols-mode')));
  await page.setViewportSize({width:1920,height:800}); await page.waitForTimeout(400); s=await L.state(page); console.log('RESIZE 1920: cols-mode', await page.evaluate(()=>document.querySelector('main').classList.contains('cols-mode')), 'šírka stĺpca', s.cols[0]&&s.cols[0].width, 'wrapH', s.wrapH);
  await page.setViewportSize({width:1280,height:800}); await page.waitForTimeout(300);
  // promo iframe na Tipovaní: 3 prekreslenia → 0 nových rámcov
  await page.mouse.move(640,30); await page.evaluate(()=>navigate(DB.nodes.find(n=>n.name==='Tipovanie').id)); await page.waitForTimeout(600);
  let frames=0; page.on('frameattached',()=>frames++);
  const pi0 = await page.evaluate(()=>({promo: !!document.querySelector('#colsPromo .promo'), adframe: document.querySelectorAll('#colsPromo iframe.adframe').length}));
  await page.evaluate(()=>{ for(let i=0;i<3;i++) renderColumns(document.getElementById('main'), _colPromo); }); await page.waitForTimeout(400);
  console.log('PROMO Tipovanie: promo nad pásom', pi0.promo, 'iframe', pi0.adframe, '→ 3× prekreslenie: nových rámcov', frames);
  await L.shot(page,'12-tipovanie-promo');
  // Aktuálne
  await page.evaluate(()=>navigate(LIVE_ID)); await page.waitForTimeout(500);
  console.log('AKTUÁLNE: položiek', await page.evaluate(()=>document.querySelectorAll('.col[data-lv="1"] .cit').length), 'wrapTop', (await L.state(page)).wrapTop);
  // hover linka → panel; potom priečinok
  await page.evaluate(()=>navigate(DB.nodes.find(n=>n.name==='Premier League'&&getPath(n.id).some(p=>p.name==='Anglicko')).id)); await page.waitForTimeout(600);
  const lk = await page.evaluate(()=>document.querySelector('.col[data-lv="5"] .cit.lnk .nm').textContent.trim());
  await L.go(page,5,lk,300); const d1 = await page.evaluate(()=>document.getElementById('colDetail').innerText.slice(0,22).replace(/\n/g,' '));
  await L.go(page,4,'Championship',500); const d2 = await page.evaluate(()=>document.getElementById('colDetail').innerText.slice(0,22).replace(/\n/g,' '));
  console.log('PANEL: linka →', JSON.stringify(d1), '| priečinok Championship →', JSON.stringify(d2), '| title na dlhom názve:', await page.evaluate(()=>{const a=[...document.querySelectorAll('.cit')].find(x=>x.title); return a? a.title : 'žiadny';}));
  await L.shot(page,'13-panel-popis');
  console.log('konzola:', errs, '| CSP:', await page.evaluate(()=>window.__csp));
  await browser.close();
  // dotykový notebook
  ({browser,page,errs,ctx} = await L.open(1280,800,{hasTouch:true}));
  await page.addInitScript(()=>{ const o=window.matchMedia; window.matchMedia=q=>q.includes('hover')?{matches:true,media:q,addEventListener(){},removeEventListener(){},addListener(){},removeListener(){}}:o.call(window,q); });
  await page.reload(); await page.waitForFunction(()=>typeof DB!=='undefined' && !DB._partial);
  await page.evaluate(()=>{ const s=document.createElement('style'); s.textContent='.vswitch{display:flex!important}'; document.head.appendChild(s); });
  await L.cols(page);
  const pf = await L.item(page,0,'Futbal'); await page.touchscreen.tap(pf.x,pf.y); await page.waitForTimeout(800); let st=await L.state(page);
  console.log('DOTYK: ťuknutie Futbal → url', await page.evaluate(()=>location.pathname), 'colPath', JSON.stringify(st.colPath));
  await browser.close();
})().catch(e=>{console.error(e); process.exit(1);});
