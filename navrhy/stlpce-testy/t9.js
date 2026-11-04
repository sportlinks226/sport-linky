const L = require('./lib');
(async()=>{
  let {browser,page,ctx} = await L.open(1280,800);
  await L.cols(page);
  // PANEL po linke → priečinok (presne)
  await page.mouse.move(640,30); await page.evaluate(()=>navigate(DB.nodes.find(n=>n.name==='Premier League' && getPath(n.id).some(p=>p.name==='Anglicko')).id)); await page.waitForTimeout(900);
  const lk = await page.evaluate(()=>{const a=document.querySelector('.col[data-lv="5"] .cit.lnk .nm'); return a && a.textContent.trim();});
  await L.hoverItem(page,5,lk,300); let st=await L.state(page); const d1 = await page.evaluate(()=>document.getElementById('colDetail').innerText.slice(0,25).replace(/\n/g,' '));
  const pc = await L.item(page,4,'Championship'); await page.mouse.move(pc.x,pc.y); await page.waitForTimeout(600); st=await L.state(page);
  const d2 = await page.evaluate(()=>document.getElementById('colDetail').innerText.slice(0,25).replace(/\n/g,' '));
  console.log('PANEL: linka →"'+d1+'" | po priečinku Championship: colPath', JSON.stringify(st.colPath), 'hover', st.hover, 'edge', st.edge, 'panel →"'+d2+'"');
  await browser.close();
  // DOTYKOVÝ NOTEBOOK: dotyk + hover:hover (Windows notebook s myšou aj dotykom)
  ({browser,page,ctx} = await L.open(1280,800,{hasTouch:true}));
  await page.addInitScript(()=>{ const o=window.matchMedia; window.matchMedia=q=>q.includes('hover')?{matches:true,media:q,addEventListener(){},removeEventListener(){},addListener(){},removeListener(){}}:o.call(window,q); });
  await page.reload(); await page.waitForFunction(()=>typeof DB!=='undefined' && !DB._partial);
  await page.evaluate(()=>{ const s=document.createElement('style'); s.textContent='.vswitch{display:flex!important}'; document.head.appendChild(s); });
  await L.cols(page);
  const pf = await L.item(page,0,'Futbal'); await page.touchscreen.tap(pf.x,pf.y); await page.waitForTimeout(900);
  let s=await L.state(page); console.log('DOTYK notebook — ťuknutie na Futbal: url', await page.evaluate(()=>location.pathname), 'colPath', JSON.stringify(s.colPath), 'stĺpcov', s.cols.length, 'scrollY', s.scrollY);
  const pk = await L.item(page,1,'Kluby'); if(pk){ await page.touchscreen.tap(pk.x,pk.y); await page.waitForTimeout(900); s=await L.state(page); console.log('  ťuknutie na Kluby: url', await page.evaluate(()=>location.pathname), 'colPath', JSON.stringify(s.colPath)); }
  await page.mouse.move(640,30); await page.evaluate(()=>navigate(DB.nodes.find(n=>n.name==='Premier League' && getPath(n.id).some(p=>p.name==='Anglicko')).id)); await page.waitForTimeout(800);
  const pl = await page.evaluate(()=>{const a=document.querySelector('.col[data-lv="5"] .cit.lnk'); const r=a.getBoundingClientRect(); return {x:r.left+r.width/2,y:r.top+r.height/2,t:a.textContent.trim()};});
  const before = ctx.pages().length; await page.touchscreen.tap(pl.x,pl.y); await page.waitForTimeout(800);
  console.log('  ťuknutie na linku', pl.t, '→ panel:', await page.evaluate(()=>document.getElementById('colDetail').innerText.slice(0,30).replace(/\n/g,' ')), '| otvorila sa nová karta:', ctx.pages().length>before, '(popis sa dotykom nedá pozrieť bez otvorenia webu)');
  await L.shot(page,'ux-02-dotyk');
  await browser.close();
})().catch(e=>{console.error(e.message.split('\n')[0]); process.exit(1);});
