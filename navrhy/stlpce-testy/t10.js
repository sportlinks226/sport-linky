const L = require('./lib');
(async()=>{
  const {browser,page} = await L.open(1280,800);
  await L.cols(page);
  await L.hoverItem(page,0,'Futbal',1100); await L.hoverItem(page,1,'Kluby',1100); await L.hoverItem(page,2,'Európa',1100);
  // reťazenie kolieska: stĺpec na konci → roluje sa stránka?
  const c = await page.evaluate(()=>{const r=document.querySelector('.col[data-lv="3"]').getBoundingClientRect(); return {x:r.left+r.width/2, y:r.top+r.height/2};});
  await page.mouse.move(c.x,c.y); const y0 = await page.evaluate(()=>scrollY);
  await page.evaluate(()=>{document.querySelector('.col[data-lv="3"]').scrollTop=99999;}); await page.waitForTimeout(100);
  await page.mouse.wheel(0,300); await page.waitForTimeout(300);
  console.log('KOLIESKO na konci stĺpca: scrollY stránky', y0, '→', await page.evaluate(()=>scrollY), '(overscroll-behavior stĺpca:', await page.evaluate(()=>getComputedStyle(document.querySelector('.col')).overscrollBehavior)+')');
  // po kliknutí (navigate) v posunutej stránke: je vrch stĺpcov pod hlavičkou?
  await page.mouse.move(640,30); await page.evaluate(()=>scrollTo(0,400)); await page.waitForTimeout(200);
  await page.evaluate(()=>navigate(DB.nodes.find(n=>n.name==='Anglicko' && getPath(n.id).some(p=>p.name==='Futbal')).id)); await page.waitForTimeout(500);
  const g = await page.evaluate(()=>({scrollY, wrapTop: Math.round(document.getElementById('colsWrap').getBoundingClientRect().top), headerH: document.querySelector('header').offsetHeight, docH: document.documentElement.scrollHeight}));
  console.log('NAVIGATE pri posunutej stránke: scrollY', g.scrollY, 'vrch stĺpcov', g.wrapTop, 'px od okraja okna, hlavička', g.headerH, 'px → vrch stĺpcov schovaný pod hlavičkou:', g.wrapTop < g.headerH);
  await L.shot(page,'nav-10-po-kliknuti-vrch-stlpcov-pod-hlavickou');
  // Aktuálne – počet položiek v stĺpci
  await page.evaluate(()=>navigate(LIVE_ID)); await page.waitForTimeout(500);
  console.log('AKTUÁLNE v stĺpcoch: položiek', await page.evaluate(()=>document.querySelectorAll('.col[data-lv="1"] .cit').length), 'lišta Aktuálne:', await page.evaluate(()=>document.getElementById('aktualneWrap')?.style.display||'zobrazená'));
  await browser.close();
})().catch(e=>{console.error(e.message.split('\n')[0]); process.exit(1);});
