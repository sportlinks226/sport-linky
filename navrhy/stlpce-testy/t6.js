// klávesnica, aria, dotyk, CSP, mouseleave, iframe reklamy pri prekreslení, cols-mode pri hľadaní
const L = require('./lib');
(async()=>{
  let {browser,page,errs,ctx} = await L.open(1280,800);
  await page.evaluate(()=>{window.__csp=[]; document.addEventListener('securitypolicyviolation',e=>window.__csp.push(e.violatedDirective+' '+e.blockedURI));});
  await L.cols(page);
  // ARIA / štruktúra
  const aria = await page.evaluate(()=>{
    const w=document.getElementById('colsWrap'); const cols=[...w.querySelectorAll('.col')];
    return {wrapRole:w.getAttribute('role'), colRoles:cols.map(c=>c.getAttribute('role')||'-'), colTabIndex:cols.map(c=>c.tabIndex), citTag:[...w.querySelectorAll('.cit')].slice(0,2).map(a=>a.tagName+' href='+(a.getAttribute('href')||'')), ariaExpanded:[...w.querySelectorAll('.cit[aria-expanded]')].length, detailRole:document.getElementById('colDetail').getAttribute('role'), detailLive:document.getElementById('colDetail').getAttribute('aria-live'), vswitchPressed:[...document.querySelectorAll('#vSwitch button')].map(b=>b.getAttribute('aria-pressed')), countText:document.querySelector('.cit .cnt')?.textContent, arrAria:document.querySelector('.cit .arr')?.getAttribute('aria-hidden')};
  });
  console.log('ARIA:', JSON.stringify(aria));
  // KLÁVESNICA: Tab od vyhľadávania
  await page.focus('#srch');
  const seq=[]; for(let i=0;i<8;i++){ await page.keyboard.press('Tab'); seq.push(await page.evaluate(()=>{const a=document.activeElement; return (a.id||a.className||a.tagName).toString().slice(0,20)+':'+(a.textContent||'').trim().slice(0,14);})); }
  console.log('TAB poradie:', seq.join(' → '));
  // Tab na položku Futbal, Enter
  await page.evaluate(()=>{ [...document.querySelectorAll('.col[data-lv="0"] .cit')].find(a=>a.textContent.includes('Futbal')).focus(); });
  let s = await L.state(page); console.log('fokus na Futbal (bez Enter): otvoril sa stĺpec?', s.colPath.length>0, '| panel:', await page.evaluate(()=>document.getElementById('colDetail').innerText.slice(0,40)));
  await page.keyboard.press('Enter'); await page.waitForTimeout(500); s=await L.state(page);
  console.log('Enter na Futbal: url', await page.evaluate(()=>location.pathname), 'colPath', JSON.stringify(s.colPath), 'fokus:', await page.evaluate(()=>document.activeElement.className+':'+document.activeElement.textContent.trim().slice(0,20)));
  await page.keyboard.press('ArrowDown'); await page.waitForTimeout(200); console.log('Šípka dole: fokus', await page.evaluate(()=>document.activeElement.className+':'+document.activeElement.textContent.trim().slice(0,20)), 'scrollY', await page.evaluate(()=>scrollY));
  // zbalený pásik klávesnicou?
  await L.hoverItem(page,1,'Kluby',1100); await L.hoverItem(page,2,'Európa',1100); await L.hoverItem(page,3,'Anglicko',1100);
  const strip = await page.evaluate(()=>{const c=document.querySelector('.col.collapsed'); return c ? {tag:c.tagName, tabIndex:c.tabIndex, role:c.getAttribute('role'), label:c.getAttribute('aria-label'), title:c.title} : null;});
  console.log('ZBALENÝ PÁSIK:', JSON.stringify(strip));
  // MOUSELEAVE: prejsť cez položku a hneď (50 ms) opustiť main
  await page.reload(); await page.waitForFunction(()=>typeof DB!=='undefined' && !DB._partial); await L.cols(page);
  const ph = await L.item(page,0,'Hokej'); await page.mouse.move(ph.x,ph.y); await page.waitForTimeout(40); await page.mouse.move(ph.x, 20); await page.waitForTimeout(400);
  s=await L.state(page); console.log('MOUSELEAVE po 40 ms (myš je už v hlavičke): colPath', JSON.stringify(s.colPath), '(očakávané: prázdne)');
  // link hover → panel, potom prejsť na priečinok → panel?
  await page.mouse.move(ph.x+1,ph.y); await page.waitForTimeout(1100);
  // REKLAMNÝ IFRAME: koľkokrát sa pripojí rámik pri 5 otvoreniach stĺpcov (cez Tipovanie, kde je promo)
  let frames=0; page.on('frameattached', ()=>frames++);
  const promoInfo = await page.evaluate(()=>({promoBanner: !!(DB.promoBanner&&DB.promoBanner.active!==false&&(DB.promoBanner.html||'').trim()), section: DB.promoBanner&&DB.promoBanner.sectionId, promos:(DB.promos||[]).length, promoNow: !!document.querySelector('#main .promo'), adframe: !!document.querySelector('#main iframe.adframe')}));
  console.log('PROMO v dátach:', JSON.stringify(promoInfo));
  const tip = await L.item(page,0,'Tipovanie'); if(tip){ await page.mouse.move(tip.x,tip.y); await page.waitForTimeout(1100); const pi=await page.evaluate(()=>({promoNow: !!document.querySelector('#main .promo'), adframe: !!document.querySelector('#main iframe.adframe'), promoH: document.querySelector('#main .promo')?.offsetHeight})); console.log('  nad stĺpcami po otvorení Tipovania:', JSON.stringify(pi)); frames=0;
    const kids = await page.evaluate(()=>[...document.querySelectorAll('.col[data-lv="1"] .cit[data-t="f"] .nm')].map(e=>e.textContent.trim()).slice(0,5)); 
    for(const k of kids){ try{ await L.hoverItem(page,1,k,400);}catch(e){} } console.log('  5 otvorení v Tipovaní → iframe reklamy znovu pripojený', frames, '×'); }
  // HĽADANIE: cols-mode trieda počas hľadania
  await page.fill('#srch','slovan'); await page.waitForTimeout(500);
  console.log('HĽADANIE: main má cols-mode:', await page.evaluate(()=>document.querySelector('main').classList.contains('cols-mode')), 'min-height:', await page.evaluate(()=>getComputedStyle(document.querySelector('main')).minHeight), 'výsledkov:', await page.evaluate(()=>document.querySelectorAll('#main a').length));
  await page.fill('#srch',''); await page.waitForTimeout(400);
  // dlhé názvy
  await page.evaluate(()=>{ colPath=getPath(DB.nodes.find(n=>n.name.startsWith('FIBA Basketball World Cup 2027')).parentId).map(n=>n.id); renderColumns(document.getElementById('main'),''); });
  await page.waitForTimeout(200);
  const longInfo = await page.evaluate(()=>{const a=[...document.querySelectorAll('.cit')].find(x=>x.textContent.includes('FIBA Basketball World Cup 2027')); const nm=a.querySelector('.nm'); return {text:nm.textContent, cut: nm.scrollWidth>nm.clientWidth, title:a.getAttribute('title'), colTitle: document.querySelector('.col[data-lv="3"] .col-title')?.textContent};});
  console.log('DLHÝ NÁZOV:', JSON.stringify(longInfo));
  await L.shot(page,'ux-01-dlhe-nazvy');
  console.log('CSP porušenia:', await page.evaluate(()=>window.__csp));
  console.log('konzola:', errs.filter(e=>!/ERR_FAILED|ERR_BLOCKED/.test(e)));
  await browser.close();
  // DOTYK: notebook s dotykovou obrazovkou (hover:hover ostáva, hasTouch)
  ({browser,page,errs,ctx} = await L.open(1280,800,{hasTouch:true}));
  console.log('DOTYK: vswitch viditeľný', await page.evaluate(()=>getComputedStyle(document.getElementById('vSwitch')).display), 'hover:hover', await page.evaluate(()=>matchMedia('(hover:hover)').matches));
  await L.cols(page);
  const pf = await L.item(page,0,'Futbal'); await page.touchscreen.tap(pf.x,pf.y); await page.waitForTimeout(600);
  s=await L.state(page); console.log('  ťuknutie na Futbal: url', await page.evaluate(()=>location.pathname), 'colPath', JSON.stringify(s.colPath), 'stĺpcov', s.cols.length);
  const pk = await L.item(page,1,'Kluby'); if(pk){ await page.touchscreen.tap(pk.x,pk.y); await page.waitForTimeout(600); s=await L.state(page); console.log('  ťuknutie na Kluby: url', await page.evaluate(()=>location.pathname), 'colPath', JSON.stringify(s.colPath)); }
  const pl = await page.evaluate(()=>{const a=document.querySelector('.cit.lnk'); if(!a) return null; const r=a.getBoundingClientRect(); return {x:r.left+r.width/2,y:r.top+r.height/2,t:a.textContent.trim()};});
  console.log('  linka dostupná na ťuknutie bez možnosti vidieť popis:', pl ? pl.t : 'žiadna v zobrazených stĺpcoch');
  await L.shot(page,'ux-02-dotyk');
  await browser.close();
})().catch(e=>{console.error(e); process.exit(1);});
