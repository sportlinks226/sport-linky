const L = require('./lib');
(async()=>{
  const {browser,page,errs} = await L.open(1280,800);
  await L.cols(page);
  await L.shot(page,'p1-00-start-stlpce');
  // PROBLÉM 1a: myš nehybne stojí na Futbale
  const pf = await L.hoverItem(page,0,'Futbal',160);
  await L.shot(page,'p1-01-futbal-otvoreny-pred-posunom');
  await page.waitForTimeout(300); await L.shot(page,'p1-02-stranka-sa-posunula');
  let under = await page.evaluate(()=>{const e=document.elementFromPoint(_mx,_my); return e && e.closest('.cit') ? e.closest('.cit').querySelector('.nm').textContent.trim() : (e&&e.className);});
  await page.waitForTimeout(500);
  const s1 = await L.state(page);
  await L.shot(page,'p1-03-po-0.9s-otvoreny-iny-priecinok');
  console.log('P1a: myš stojí na Futbale, po posune je pod ňou:', under, '| colPath po 0,9 s:', JSON.stringify(s1.colPath), 'scrollY', s1.scrollY);

  // znova čisto: reload, otvor cestu s dlhými čakaniami
  await page.reload(); await page.waitForFunction(()=>typeof DB!=='undefined' && !DB._partial);
  await L.cols(page);
  await L.hoverItem(page,0,'Futbal',1100); await L.hoverItem(page,1,'Kluby',1100); await L.hoverItem(page,2,'Európa',1100);
  let s = await L.state(page); console.log('cesta:', JSON.stringify(s.colPath), 'scrollY', s.scrollY, 'stĺpec3', JSON.stringify(s.cols[3]));
  // PROBLÉM 2: zrolovať stĺpec 3 kolieskom úplne dole
  const col3 = await page.evaluate(()=>{const r=document.querySelector('.col[data-lv="3"]').getBoundingClientRect(); return {x:r.left+r.width/2, y:r.top+r.height/2, top:r.top, bottom:r.bottom, left:r.left, width:r.width};});
  await page.mouse.move(col3.x, col3.y);
  for(let i=0;i<10;i++){ await page.mouse.wheel(0,400); await page.waitForTimeout(60); }
  await page.waitForTimeout(300);
  s = await L.state(page); console.log('P2 po rolovaní dole: scrollTop', s.cols[3].scrollTop, '/', s.cols[3].scrollH-s.cols[3].clientH, 'colPath', JSON.stringify(s.colPath));
  await L.shot(page,'p2-01-zrolovane-dole');
  const vis = await page.evaluate(()=>{const c=document.querySelector('.col[data-lv="3"]'); const r=c.getBoundingClientRect(); return [...c.querySelectorAll('.cit')].filter(a=>{const b=a.getBoundingClientRect(); return b.top>=r.top+60&&b.bottom<=r.bottom-36;}).map(a=>a.querySelector('.nm').textContent.trim());});
  console.log('viditeľné v strede (mimo zón auto-rolovania):', vis.join(', '));
  const target = vis[Math.floor(vis.length/2)];
  const p = await L.hoverItem(page,3,target,400);
  s = await L.state(page); console.log(`P2a po hoveri na "${target}": scrollTop stĺpca 3 =`, s.cols[3].scrollTop, '| colPath', JSON.stringify(s.colPath));
  under = await page.evaluate(()=>{const e=document.elementFromPoint(_mx,_my); return e && e.closest('.cit') ? e.closest('.cit').querySelector('.nm').textContent.trim() : (e&&e.className);});
  console.log('   pod myšou je teraz:', under);
  await L.shot(page,'p2-02-po-hoveri-stlpec-skocil-hore');
  // P2b: auto-rolovanie pri hornom okraji — zrolovať dole, myš 50 px pod vrch stĺpca
  for(let i=0;i<10;i++){ await page.mouse.wheel(0,400); await page.waitForTimeout(60); }
  await page.waitForTimeout(900); // nech prebehne prípadný synth. hover
  s = await L.state(page); console.log('P2b znova dole: scrollTop', s.cols[3].scrollTop);
  await page.mouse.move(col3.left+col3.width/2, col3.top+50, {steps:5});
  const samples=[]; for(let i=0;i<8;i++){ await page.waitForTimeout(250); samples.push((await L.state(page)).cols[3].scrollTop); }
  console.log('P2b myš 50 px od vrchu stĺpca (zóna 60 px), scrollTop každých 250 ms:', samples.join(' → '));
  await L.shot(page,'p2-03-auto-rolovanie-hore');
  // P2c: aká je rýchlosť auto-rolovania pri spodnom okraji (px/s)
  await page.mouse.move(col3.left+col3.width/2, col3.bottom-15, {steps:3});
  const t0=Date.now(); const a0=(await L.state(page)).cols[3].scrollTop; await page.waitForTimeout(1000); const a1=(await L.state(page)).cols[3].scrollTop;
  console.log('P2c auto-rolovanie dole: ', (a1-a0)/((Date.now()-t0)/1000), 'px/s');
  console.log('konzola:', errs);
  await browser.close();
})().catch(e=>{console.error(e); process.exit(1);});
