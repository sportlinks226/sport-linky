const L = require('./lib');
(async()=>{
  let {browser,page,errs,ctx} = await L.open(1280,800);
  await page.evaluate(()=>{window.__csp=[]; document.addEventListener('securitypolicyviolation',e=>window.__csp.push(e.violatedDirective+' '+e.blockedURI)); window.__mo=[]; document.addEventListener('mouseover',e=>{ if(e.target.closest && e.target.closest('.cit')) window.__mo.push({t:Math.round(performance.now()), trusted:e.isTrusted, nm:e.target.closest('.cit').querySelector('.nm').textContent.trim()}); });});
  await L.cols(page);
  // KTO vyvolá otvorenie iného priečinka pri zbalení? (prehliadač sám = trusted, alebo kód = isTrusted:false)
  await L.hoverItem(page,0,'Futbal',1100); await L.hoverItem(page,1,'Kluby',1100); await L.hoverItem(page,2,'Európa',1100);
  await page.evaluate(()=>{window.__mo=[];}); const pa = await L.item(page,3,'Anglicko'); await page.mouse.move(pa.x,pa.y); await page.waitForTimeout(1200);
  console.log('ZBALENIE — udalosti mouseover po JEDNOM pohybe na Anglicko:', JSON.stringify(await page.evaluate(()=>window.__mo)));
  // PROMO IFRAME: navigate na Tipovanie (klik), potom hover podpriečinkov — koľkokrát sa rámik reklamy znovu pripojí
  await page.evaluate(()=>navigate(DB.nodes.find(n=>n.name==='Tipovanie').id)); await page.waitForTimeout(800);
  const pi = await page.evaluate(()=>({promo: !!document.querySelector('#main .promo'), adframe: document.querySelectorAll('#main iframe.adframe').length, promoH: document.querySelector('#main .promo')?.offsetHeight, kids:[...document.querySelectorAll('.col[data-lv="1"] .cit[data-t="f"] .nm')].map(e=>e.textContent.trim()).slice(0,4), links:[...document.querySelectorAll('.col[data-lv="1"] .cit.lnk .nm')].map(e=>e.textContent.trim()).slice(0,6)}));
  console.log('TIPOVANIE pripnuté: promo nad stĺpcami', pi.promo, 'iframe reklamy', pi.adframe, 'výška promo', pi.promoH, 'podpriečinky', pi.kids, 'linky', pi.links);
  await L.shot(page,'ux-03-tipovanie-promo-nad-stlpcami');
  // mechanizmus: každé prekreslenie stĺpcov vloží promo (aj iframe reklamy) nanovo?
  await page.evaluate(()=>{window.__fr=0; new MutationObserver(m=>m.forEach(x=>x.addedNodes.forEach(n=>{ if(n.querySelectorAll && n.querySelectorAll('iframe.adframe').length) window.__fr++; }))).observe(document.getElementById('main'),{childList:true});});
  let frames=0; page.on('frameattached', ()=>frames++);
  await page.evaluate(()=>{ for(let i=0;i<3;i++) renderColumns(document.getElementById('main'), _colPromo, true); });
  await page.waitForTimeout(500);
  console.log('  3× prekreslenie stĺpcov na Tipovaní → iframe reklamy nanovo vložený', await page.evaluate(()=>window.__fr), '×, nových rámcov', frames, '(Tipovanie nemá podpriečinky, takže myšou to dnes nenastane — nastalo by pri promo v sekcii s podpriečinkami)');
  const pk0 = pi.kids[0] || null;
  // hover linka → panel, potom hover priečinok → panel zmizne?
  await page.evaluate(()=>navigate(DB.nodes.find(n=>n.name==='Premier League' && getPath(n.id).some(p=>p.name==='Anglicko')).id)); await page.waitForTimeout(700);
  const lk = await page.evaluate(()=>{const a=document.querySelector('.col[data-lv="5"] .cit.lnk .nm'); return a && a.textContent.trim();});
  await L.hoverItem(page,5,lk,300); const d1 = await page.evaluate(()=>document.getElementById('colDetail').innerText.slice(0,30));
  await L.hoverItem(page,4,'Championship',500); const d2 = await page.evaluate(()=>document.getElementById('colDetail').innerText.slice(0,30));
  console.log('PANEL: po linke "'+d1.replace(/\n/g,' ')+'" → po priečinku "'+d2.replace(/\n/g,' ')+'"');
  // AKTUÁLNE cez lištu v stĺpcoch
  const ak = await page.evaluate(()=>{const a=document.querySelector('#aktHead, .aktHead, [class*=aktHead]'); if(!a) return null; const r=a.getBoundingClientRect(); return {x:r.left+r.width/2,y:r.top+r.height/2, tag:a.tagName, href:a.getAttribute('href'), oc:a.getAttribute('onclick')};});
  console.log('AKTUÁLNE lišta:', JSON.stringify(ak));
  if(ak){ await page.evaluate(()=>navigate(LIVE_ID)); await page.waitForTimeout(600); const s=await L.state(page); console.log('  navigate(Aktuálne) v stĺpcoch: colPath', JSON.stringify(s.colPath), 'stĺpcov', s.cols.length, 'položiek v poslednom', await page.evaluate(()=>document.querySelectorAll('.col:last-of-type .cit').length), 'lišta skrytá', await page.evaluate(()=>document.getElementById('aktualneWrap')?.style.display)); await L.shot(page,'ux-04-aktualne-v-stlpcoch'); }
  // DLHÉ NÁZVY: najdlhší viditeľný názov
  const ln = await page.evaluate(()=>{ const vis=DB.nodes.filter(n=>n.type==='folder' && !emptyFolder(n) && n.parentId); vis.sort((a,b)=>b.name.length-a.name.length); const n=vis[0]; colPath=getPath(n.parentId).map(x=>x.id); colHover=null; renderColumns(document.getElementById('main'),''); const a=[...document.querySelectorAll('.cit')].find(x=>x.dataset.id===n.id); const nm=a.querySelector('.nm'); return {name:n.name, len:n.name.length, cut:nm.scrollWidth>nm.clientWidth, title:a.getAttribute('title'), visibleText: nm.clientWidth}; });
  console.log('DLHÝ NÁZOV priečinka:', JSON.stringify(ln));
  const ll = await page.evaluate(()=>{ const vis=DB.nodes.filter(n=>n.type==='link' && n.parentId); vis.sort((a,b)=>b.name.length-a.name.length); const n=vis[0]; colPath=getPath(n.parentId).map(x=>x.id); colHover=null; renderColumns(document.getElementById('main'),''); const a=[...document.querySelectorAll('.cit')].find(x=>x.dataset.id===n.id); const nm=a.querySelector('.nm'); const ct=document.querySelector('.col:not(.collapsed):last-of-type .col-title'); return {name:n.name, len:n.name.length, cut:nm.scrollWidth>nm.clientWidth, title:a.getAttribute('title')}; });
  console.log('DLHÝ NÁZOV linky:', JSON.stringify(ll));
  await page.waitForTimeout(200); await L.shot(page,'ux-01-dlhe-nazvy');
  console.log('CSP porušenia:', await page.evaluate(()=>window.__csp));
  console.log('konzola:', errs.filter(e=>!/ERR_FAILED|ERR_BLOCKED/.test(e)));
  await browser.close();
  // DOTYK
  ({browser,page,errs,ctx} = await L.open(1280,800,{hasTouch:true}));
  console.log('DOTYK: vswitch viditeľný', await page.evaluate(()=>getComputedStyle(document.getElementById('vSwitch')).display), 'hover:hover', await page.evaluate(()=>matchMedia('(hover:hover)').matches));
  await L.cols(page);
  const pf = await L.item(page,0,'Futbal'); await page.touchscreen.tap(pf.x,pf.y); await page.waitForTimeout(800);
  let s=await L.state(page); console.log('  ťuknutie na Futbal: url', await page.evaluate(()=>location.pathname), 'colPath', JSON.stringify(s.colPath), 'stĺpcov', s.cols.length);
  const pk = await L.item(page,1,'Kluby'); if(pk){ await page.touchscreen.tap(pk.x,pk.y); await page.waitForTimeout(800); s=await L.state(page); console.log('  ťuknutie na Kluby: url', await page.evaluate(()=>location.pathname), 'colPath', JSON.stringify(s.colPath)); }
  await page.evaluate(()=>navigate(DB.nodes.find(n=>n.name==='Premier League' && getPath(n.id).some(p=>p.name==='Anglicko')).id)); await page.waitForTimeout(600);
  const pl = await page.evaluate(()=>{const a=document.querySelector('.cit.lnk'); if(!a) return null; const r=a.getBoundingClientRect(); return {x:r.left+r.width/2,y:r.top+r.height/2,t:a.textContent.trim()};});
  if(pl){ await page.touchscreen.tap(pl.x,pl.y); await page.waitForTimeout(500); console.log('  ťuknutie na linku', pl.t, '→ panel s popisom:', await page.evaluate(()=>document.getElementById('colDetail').innerText.slice(0,40).replace(/\n/g,' ')), '| otvorilo sa okno?', ctx.pages().length>1); }
  await L.shot(page,'ux-02-dotyk');
  await browser.close();
})().catch(e=>{console.error(e); process.exit(1);});
