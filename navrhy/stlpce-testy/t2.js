// P2c auto-rolovanie samostatne + šikmý pohyb (menu aim) + zbaľovanie do pásikov
const L = require('./lib');
(async()=>{
  const {browser,page} = await L.open(1280,800);
  await L.cols(page);
  await L.hoverItem(page,0,'Futbal',1100); await L.hoverItem(page,1,'Kluby',1100); await L.hoverItem(page,2,'Európa',1100);
  const col3 = await page.evaluate(()=>{const r=document.querySelector('.col[data-lv="3"]').getBoundingClientRect(); return {x:r.left+r.width/2, top:r.top, bottom:r.bottom, left:r.left, width:r.width, h:r.height};});
  // --- auto-rolovanie nadol: myš do spodnej zóny, počkať na prípadné otvorenie, potom 1px pohyb
  await page.mouse.move(col3.x, col3.bottom-15, {steps:4}); await page.waitForTimeout(300);
  await page.mouse.move(col3.x, col3.bottom-16); // obnoví auto-rolovanie po prekreslení
  const a=[]; for(let i=0;i<6;i++){ await page.waitForTimeout(500); a.push((await L.state(page)).cols[3].scrollTop); }
  console.log('AUTO dole, scrollTop každých 0,5 s:', a.join(' → '), '→ rýchlosť ≈', Math.round((a[5]-a[0])/2.5), 'px/s');
  let s = await L.state(page); console.log('  colPath počas auto-rolovania:', JSON.stringify(s.colPath), 'edge', s.edge);
  // koľko položiek sa presunulo pod myšou počas rolovania bez toho, aby sa otvorili?
  // teraz myš uhne zo zóny (o 40 px vyššie) — čo sa otvorí?
  await page.mouse.move(col3.x, col3.bottom-60, {steps:3}); await page.waitForTimeout(400);
  s = await L.state(page); console.log('  po uhnutí zo zóny: colPath', JSON.stringify(s.colPath), 'scrollTop', s.cols[3].scrollTop);

  // --- MENU AIM: reload, otvor Futbal›Kluby›Európa, potom šikmo z "Európa" (col 2) na krajinu dole v col 3
  await page.reload(); await page.waitForFunction(()=>typeof DB!=='undefined' && !DB._partial); await L.cols(page);
  await L.hoverItem(page,0,'Futbal',1100); await L.hoverItem(page,1,'Kluby',1100);
  const pe = await L.hoverItem(page,2,'Európa',1100);
  const pt = await L.item(page,3,'Nemecko');
  console.log('MENU AIM: z Európa', Math.round(pe.x),Math.round(pe.y),'na Nemecko', Math.round(pt.x),Math.round(pt.y));
  // pomalý šikmý pohyb (ako človek) — 25 krokov, ~20 ms každý = 0,5 s
  const path=[]; for(let i=1;i<=25;i++){ await page.mouse.move(pe.x+(pt.x-pe.x)*i/25, pe.y+(pt.y-pe.y)*i/25); await page.waitForTimeout(20); const st=await L.state(page); path.push(st.colPath[2]||'-'); }
  await page.waitForTimeout(400); s = await L.state(page);
  console.log('  položka v col 2 počas pohybu:', [...new Set(path)].join(' | '), '| výsledok colPath:', JSON.stringify(s.colPath));
  await L.shot(page,'p1-04-sikmy-pohyb-vysledok');
  // rýchly šikmý pohyb (0,15 s)
  await L.hoverItem(page,2,'Európa',1100); const pt2 = await L.item(page,3,'Nemecko');
  if(pt2){ for(let i=1;i<=8;i++){ await page.mouse.move(pe.x+(pt2.x-pe.x)*i/8, pe.y+(pt2.y-pe.y)*i/8); await page.waitForTimeout(18); } await page.waitForTimeout(400); s=await L.state(page); console.log('  rýchly šikmý pohyb (≈0,15 s): colPath', JSON.stringify(s.colPath)); }
  else console.log('  Nemecko už nie je v col 3 (col 3 sa zmenil)');

  // --- ZBAĹOVANIE: Futbal›Kluby›Európa›Anglicko›Premier League (6 úrovní, COLS_MAX 4)
  await page.reload(); await page.waitForFunction(()=>typeof DB!=='undefined' && !DB._partial); await L.cols(page);
  await L.hoverItem(page,0,'Futbal',1100); await L.hoverItem(page,1,'Kluby',1100); await L.hoverItem(page,2,'Európa',1100);
  let before = await L.state(page); console.log('ZBAĹ pred: ľavé okraje stĺpcov', before.cols.map(c=>c.left+(c.collapsed?'*':'')).join(','), 'wrapLeft', before.wrapLeft);
  const pa = await L.hoverItem(page,3,'Anglicko',160);
  let mid = await L.state(page); console.log('  hneď po otvorení Anglicka: ľavé okraje', mid.cols.map(c=>c.left+(c.collapsed?'*':'')).join(','), 'wrapLeft', mid.wrapLeft, 'scrollY', mid.scrollY);
  let under = await page.evaluate(()=>{const e=document.elementFromPoint(_mx,_my); return e && e.closest('.cit') ? e.closest('.cit').querySelector('.nm').textContent.trim() : (e&&(e.className||e.tagName));});
  console.log('  myš stále na mieste Anglicka ('+Math.round(pa.x)+','+Math.round(pa.y)+'), pod ňou je teraz:', under);
  await L.shot(page,'p1-05-zbalenie-posun-stlpcov');
  await page.waitForTimeout(900); s = await L.state(page); console.log('  po 1 s colPath:', JSON.stringify(s.colPath));
  // ďalej: Premier League
  const ppl = await L.item(page,4,'Premier'); if(ppl){ await page.mouse.move(ppl.x,ppl.y); await page.waitForTimeout(160); mid=await L.state(page); console.log('  po otvorení Premier League: okraje', mid.cols.map(c=>c.left+(c.collapsed?'*':'')).join(','), 'colPath', JSON.stringify(mid.colPath));
    under = await page.evaluate(()=>{const e=document.elementFromPoint(_mx,_my); return e && e.closest('.cit') ? e.closest('.cit').querySelector('.nm').textContent.trim() : (e&&(e.className||e.tagName));}); console.log('  pod myšou (miesto Premier League):', under); await page.waitForTimeout(900); s=await L.state(page); console.log('  po 1 s colPath:', JSON.stringify(s.colPath)); await L.shot(page,'p1-06-hlbka5-pasiky'); }
  // klik na pásik = rozbalenie
  await page.click('.col.collapsed'); await page.waitForTimeout(300); s=await L.state(page); console.log('  klik na 1. pásik → colPath', JSON.stringify(s.colPath), 'stĺpcov', s.cols.length);
  await browser.close();
})().catch(e=>{console.error(e); process.exit(1);});
