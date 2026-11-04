// Overenie 1: tvoje dva problémy + klik/Späť/Vpred (1280×800)
const L = require('./lib2');
(async()=>{
  const {browser,page,errs} = await L.open(1280,800);
  await L.cols(page); await L.shot(page,'01-start');
  // A) myš stojí na Futbale
  const pf = await L.item(page,0,'Futbal'); await page.mouse.move(pf.x-80,pf.y,{steps:5}); await page.mouse.move(pf.x,pf.y,{steps:6}); await page.waitForTimeout(300);
  let s = await L.state(page); const a1 = JSON.stringify(s.colPath);
  await page.waitForTimeout(1500); s = await L.state(page);
  console.log('A) myš stojí na Futbale: po 0,3 s', a1, '→ po 1,8 s', JSON.stringify(s.colPath), '| scrollY', s.scrollY, '| wrapTop', s.wrapTop);
  await L.shot(page,'02-futbal-stojaca-mys');
  // B) jeden pohyb na Anglicko (hĺbka 4 → posun pásu)
  await L.go(page,1,'Kluby'); await L.go(page,2,'Európa');
  const pa = await L.go(page,3,'Anglicko',300); s = await L.state(page); const b1 = JSON.stringify(s.colPath);
  await page.waitForTimeout(1500); s = await L.state(page);
  console.log('B) jeden pohyb na Anglicko: po 0,3 s', b1, '→ po 1,8 s', JSON.stringify(s.colPath), '| wrapLeft', s.wrapLeft, 'stĺpce', s.cols.map(c=>c.left).join(','));
  const under = await page.evaluate(()=>{const e=document.elementFromPoint(_mx,_my); return e&&e.closest('.cit') ? e.closest('.cit').querySelector('.nm').textContent.trim() : (e&&e.className);});
  console.log('   pod nehybnou myšou je teraz:', under, '(neotvorilo sa)');
  await L.shot(page,'03-anglicko-po-posune-pasu');
  // ďalej Premier League (hĺbka 5) — pohyb z Anglicka do nového stĺpca
  await L.go(page,4,'Premier'); s = await L.state(page); console.log('   → Premier League:', JSON.stringify(s.colPath), 'stĺpcov', s.cols.length, 'wrapLeft', s.wrapLeft);
  await L.shot(page,'04-hlbka5-premier-league');
  // C) šikmý pohyb Európa → Nemecko (pomaly 0,5 s)
  await page.reload(); await page.waitForFunction(()=>typeof DB!=='undefined' && !DB._partial); await L.cols(page);
  await L.go(page,0,'Futbal'); await L.go(page,1,'Kluby'); const pe = await L.go(page,2,'Európa');
  const pt = await L.item(page,3,'Nemecko');
  const seen=[]; for(let i=1;i<=25;i++){ await page.mouse.move(pe.x+(pt.x-pe.x)*i/25, pe.y+(pt.y-pe.y)*i/25); await page.waitForTimeout(20); seen.push((await L.state(page)).colPath[2]); }
  await page.waitForTimeout(600); s = await L.state(page);
  console.log('C) šikmý pohyb Európa → Nemecko (0,5 s): col 2 počas pohybu', [...new Set(seen)].join('|'), '→ výsledok', JSON.stringify(s.colPath));
  await L.shot(page,'05-sikmy-pohyb-nemecko');
  // C2) šikmý pohyb pomalšie (1,2 s) — človek sa pozerá
  await L.go(page,2,'Európa'); const pt2 = await L.item(page,3,'Nemecko');
  for(let i=1;i<=30;i++){ await page.mouse.move(pe.x+(pt2.x-pe.x)*i/30, pe.y+(pt2.y-pe.y)*i/30); await page.waitForTimeout(40); }
  await page.waitForTimeout(600); s = await L.state(page); console.log('C2) šikmý pohyb 1,2 s →', JSON.stringify(s.colPath));
  // D) koliesko v dlhom stĺpci (Európa, 55 krajín)
  await page.reload(); await page.waitForFunction(()=>typeof DB!=='undefined' && !DB._partial); await L.cols(page);
  await L.go(page,0,'Futbal'); await L.go(page,1,'Kluby'); await L.go(page,2,'Európa');
  // myš na NÁZOV stĺpca 3 (nie na položku — tam by sa správne otvoril priečinok)
  const c3 = await page.evaluate(()=>{const r=document.querySelector('.col[data-lv="3"] .col-title').getBoundingClientRect(); return {x:r.left+r.width/2,y:r.top+r.height/2};});
  await page.mouse.move(c3.x,c3.y,{steps:4}); await page.waitForTimeout(300);
  const before = await L.state(page);
  const ys=[]; for(let i=0;i<4;i++){ await page.mouse.wheel(0,120); await page.waitForTimeout(120); const st=await L.state(page); ys.push(st.scrollY+'/'+st.cols[3].scrollTop); }
  console.log('D0) koliesko kým pás nie je prilepený: scrollY/scrollTop stĺpca:', before.scrollY+'/'+before.cols[3].scrollTop, '→', ys.join(' → '), '| wrapTop', (await L.state(page)).wrapTop, 'prilepenie pri', await page.evaluate(()=>colsStickTop()));
  // po prilepení je názov stĺpca inde — myš doň znova (kúsok pod názov, na 1. položku, ale hneď preč z nej na názov)
  // myš na 1. položku stĺpca 3 (otvorí sa — správne), potom koliesko: položky idú pod nehybnou myšou
  const vis0 = await page.evaluate(()=>{const c=document.querySelector('.col[data-lv="3"]'); const r=c.getBoundingClientRect(); return [...c.querySelectorAll('.cit')].filter(a=>{const b=a.getBoundingClientRect(); return b.top>=r.top+30&&b.bottom<=r.bottom;}).map(a=>a.querySelector('.nm').textContent.trim());});
  const c3b = await L.go(page,3,vis0[1],500);
  console.log('   myš stojí na položke „'+vis0[1]+'“:', JSON.stringify((await L.state(page)).colPath));
  for(let i=0;i<14;i++){ await page.mouse.wheel(0,300); await page.waitForTimeout(60); }
  await page.waitForTimeout(900); s = await L.state(page);
  console.log('D) po rolovaní kolieskom dole: scrollTop', s.cols[3].scrollTop, '/', s.cols[3].scrollH - s.cols[3].clientH, '| colPath', JSON.stringify(s.colPath), '| scrollY', s.scrollY, 'wrapTop', s.wrapTop, 'wrapH', s.wrapH);
  await L.shot(page,'06-zrolovane-dole');
  // D2) chvenie 3 px nad položkou pod kurzorom → nič; pohyb 10 px po tej istej položke → otvorí sa
  const under0 = await page.evaluate(()=>{const e=document.elementFromPoint(_mx+1,_my+1); const a=e&&e.closest('.cit[data-t="f"]'); return a?a.querySelector('.nm').textContent.trim():null;});
  await page.mouse.move(c3b.x+2,c3b.y+1,{steps:2}); await page.mouse.move(c3b.x+3,c3b.y+2,{steps:2}); await page.waitForTimeout(600); s = await L.state(page);
  console.log('D2) chvenie 3 px nad „'+under0+'“ (položka pod kurzorom po posune): colPath', JSON.stringify(s.colPath), '| scrollTop', s.cols[3].scrollTop);
  if(under0){ await page.mouse.move(c3b.x+12,c3b.y+2,{steps:4}); await page.waitForTimeout(600); s = await L.state(page);
    console.log('D3) pohyb 10 px po tej istej položke „'+under0+'“: colPath', JSON.stringify(s.colPath), '→ otvorila sa:', s.colPath.includes(under0), '| scrollTop', s.cols[3].scrollTop); }
  // E) o pár položiek vyššie: pohyb dole na položku (zastaví sa → otvorí sa, to je správne) a stĺpec musí ostať zrolovaný
  const vis = await page.evaluate(()=>{const c=document.querySelector('.col[data-lv="3"]'); const r=c.getBoundingClientRect(); return [...c.querySelectorAll('.cit')].filter(a=>{const b=a.getBoundingClientRect(); return b.top>=r.top+30&&b.bottom<=r.bottom;}).map(a=>a.querySelector('.nm').textContent.trim());});
  const target = vis[Math.floor(vis.length/2)];
  await L.go(page,3,target,600); s = await L.state(page);
  console.log('E) zastavenie na „'+target+'“ v strede zrolovaného stĺpca: scrollTop', s.cols[3].scrollTop, '| colPath', JSON.stringify(s.colPath));
  // o 3 položky vyššie
  const t2 = vis[Math.floor(vis.length/2)-3];
  await L.go(page,3,t2,600); s = await L.state(page);
  console.log('E2) o 3 položky vyššie na „'+t2+'“: scrollTop', s.cols[3].scrollTop, '| colPath', JSON.stringify(s.colPath));
  await L.shot(page,'07-po-pohybe-hore-ostal-dole');
  // koliesko hore o 2 cvaky → ostanem blízko konca, nič sa neotvorí
  const p3 = JSON.stringify(s.colPath); await page.mouse.wheel(0,-100); await page.waitForTimeout(80); await page.mouse.wheel(0,-100); await page.waitForTimeout(700); s = await L.state(page);
  console.log('E3) koliesko 2× hore: scrollTop', s.cols[3].scrollTop, '| colPath nezmenená:', JSON.stringify(s.colPath)===p3);
  // F) klik, Späť, Vpred — myš ostáva kde je
  const pk = await page.evaluate(()=>{const a=document.querySelector('.col[data-lv="3"] .cit.open'); const r=a.getBoundingClientRect(); return {x:r.left+r.width/2,y:r.top+r.height/2,t:a.querySelector('.nm').textContent.trim()};});
  await page.mouse.click(pk.x,pk.y); await page.waitForTimeout(400); s=await L.state(page); const f1=JSON.stringify(s.colPath);
  await page.waitForTimeout(1200); s=await L.state(page);
  console.log('F) klik na', pk.t, ': url', await page.evaluate(()=>location.pathname), '| colPath hneď', f1, '→ po 1,6 s', JSON.stringify(s.colPath), '| wrapTop', s.wrapTop, 'scrollY', s.scrollY, 'scrollTop stĺpca 3', s.cols[3].scrollTop);
  await L.shot(page,'08-po-kliknuti');
  await page.goBack(); await page.waitForTimeout(1500); s=await L.state(page);
  console.log('   Späť: url', await page.evaluate(()=>location.pathname), 'colPath', JSON.stringify(s.colPath), 'wrapTop', s.wrapTop);
  await page.goForward(); await page.waitForTimeout(1500); s=await L.state(page);
  console.log('   Vpred: url', await page.evaluate(()=>location.pathname), 'colPath', JSON.stringify(s.colPath), 'wrapTop', s.wrapTop);
  // G) prechod cez položku a rýchly odchod (časovač sa ruší)
  await page.mouse.move(640,30,{steps:3}); await page.waitForTimeout(300);
  const ph = await L.item(page,0,'Hokej'); await page.mouse.move(ph.x,ph.y,{steps:3}); await page.waitForTimeout(40); await page.mouse.move(ph.x,20,{steps:3}); await page.waitForTimeout(500); s=await L.state(page);
  console.log('G) prechod cez Hokej a odchod do hlavičky za 40 ms: colPath', JSON.stringify(s.colPath), '(Hokej sa nesmie otvoriť)');
  console.log('konzola:', errs, '| CSP:', await page.evaluate(()=>window.__csp));
  await browser.close();
})().catch(e=>{console.error(e); process.exit(1);});
