// Overenie 2: rozlíšenia 1024/1280/1440/1920 × 800/1080, hĺbka 5–6, spodok stĺpca, koliesko
const L = require('./lib2');
(async()=>{
  for(const w of [1024,1280,1440,1920]) for(const h of [800,1080]){
    const {browser,page,errs} = await L.open(w,h);
    await L.cols(page);
    let s0 = await L.state(page);
    for(const [lv,t] of [[0,'Futbal'],[1,'Kluby'],[2,'Európa'],[3,'Anglicko'],[4,'Premier']]) await L.go(page,lv,t,500);
    await page.waitForTimeout(600);
    const s = await L.state(page);
    const info = await page.evaluate(()=>{const w=document.getElementById('colsWrap'); const wr=w.getBoundingClientRect(); const d=document.getElementById('colDetail').getBoundingClientRect(); const cols=[...document.querySelectorAll('.col')].map(c=>c.getBoundingClientRect()); const vis=cols.filter(r=>r.left>=wr.left-1&&r.right<=wr.right+1).length; const cut=cols.filter(r=>r.right>wr.left&&r.left<wr.right&&(r.left<wr.left-1||r.right>wr.right+1)).length; return {wrapBottom:Math.round(wr.bottom), innerH:innerHeight, panelVisible:d.left>=wr.left-1&&d.right<=wr.right+1, vis, cut, colW:Math.round(cols[0].width), wrapW:Math.round(wr.width), scrollW:w.scrollWidth, left:w.scrollLeft};});
    console.log(`${w}x${h}: stĺpcov ${s.cols.length}, šírka ${info.colW}px, celých vidno ${info.vis}, odrezaných ${info.cut}, panel vidno ${info.panelVisible}, pás ${info.wrapW}/${info.scrollW}px posun ${info.left}, spodok pásu ${info.wrapBottom}/${info.innerH}px, výška pásu pred/po ${s0.wrapH}/${s.wrapH}, wrapTop ${s.wrapTop}, scrollY ${s.scrollY} | ${JSON.stringify(s.colPath)}`);
    await L.shot(page,`rozl-${w}x${h}-hlbka5`);
    if(h===800){
      // spodok: Európa (55 krajín) — kolieskom na koniec; je posledná položka vidno?
      await L.go(page,2,'Európa',400); // vráti sa na hĺbku 3 (Európa otvorená, deti = krajiny v col 3)
      let c3 = await page.evaluate(()=>{const r=document.querySelector('.col[data-lv="3"] .col-title').getBoundingClientRect(); return {x:r.left+r.width/2,y:r.top+r.height/2};});
      await page.mouse.move(c3.x,c3.y,{steps:4}); await page.waitForTimeout(300);
      for(let i=0;i<6;i++){ await page.mouse.wheel(0,120); await page.waitForTimeout(120); }  // stránka → prilepenie
      c3 = await page.evaluate(()=>{const r=document.querySelector('.col[data-lv="3"] .col-title').getBoundingClientRect(); return {x:r.left+r.width/2,y:r.top+r.height/2};});
      await page.mouse.move(c3.x,c3.y,{steps:3}); await page.waitForTimeout(250);
      const lenBefore = await page.evaluate(()=>colPath.length);
      for(let i=0;i<20;i++){ await page.mouse.wheel(0,300); await page.waitForTimeout(40); }
      await page.waitForTimeout(500);
      const b = await page.evaluate(()=>{const c=document.querySelector('.col[data-lv="3"]'); const last=[...c.querySelectorAll('.cit')].pop(); const r=last.getBoundingClientRect(); const cr=c.getBoundingClientRect(); const f=document.querySelector('footer').getBoundingClientRect(); return {last:last.querySelector('.nm').textContent.trim(), lastBottom:Math.round(r.bottom), colBottom:Math.round(cr.bottom), footTop:Math.round(f.top), innerH:innerHeight, atEnd:c.scrollTop+c.clientHeight>=c.scrollHeight-1, scrollY, maxY:document.documentElement.scrollHeight-innerHeight, wrapTop:Math.round(document.getElementById('colsWrap').getBoundingClientRect().top), stick:document.querySelector('header').offsetHeight+8, colPath:colPath.length};});
      console.log(`   ${w}x${h} spodok: po kolieskom dole — posledná položka „${b.last}“ dolný okraj ${b.lastBottom}px, stĺpec do ${b.colBottom}px, pätička od ${b.footTop}px, okno ${b.innerH}px, na konci stĺpca: ${b.atEnd}, pás prilepený (top ${b.wrapTop} = ${b.stick}): ${b.wrapTop<=b.stick+1}, scrollY ${b.scrollY}/${b.maxY}, nič sa neotvorilo: ${b.colPath===lenBefore}`);
      await L.shot(page,`rozl-${w}x${h}-spodok-dlheho-stlpca`);
      // koliesko hore na začiatku stĺpca → stránka sa posunie hore (bannery)
      await page.evaluate(()=>{document.querySelector('.col[data-lv="3"]').scrollTop=0;}); await page.waitForTimeout(100);
      const y1 = await page.evaluate(()=>scrollY); for(let i=0;i<4;i++){ await page.mouse.wheel(0,-120); await page.waitForTimeout(60); } const y2 = await page.evaluate(()=>scrollY);
      // krátky stĺpec (Kluby, 6 položiek): koliesko posúva stránku
      const c1 = await page.evaluate(()=>{const r=document.querySelector('.col[data-lv="1"]').getBoundingClientRect(); return {x:r.left+r.width/2,y:r.top+r.height/2, can: document.querySelector('.col[data-lv="1"]').scrollHeight>document.querySelector('.col[data-lv="1"]').clientHeight};});
      await page.mouse.move(c1.x,c1.y,{steps:4}); await page.waitForTimeout(300); const y3=await page.evaluate(()=>scrollY); await page.mouse.wheel(0,120); await page.waitForTimeout(150); const y4=await page.evaluate(()=>scrollY);
      console.log(`   ${w}x${h} koliesko: stĺpec na začiatku + hore → stránka ${y1}→${y2}; krátky stĺpec (rolovateľný: ${c1.can}) + dole → stránka ${y3}→${y4}`);
    }
    if(errs.length) console.log('   konzola:', errs);
    await browser.close();
  }
})().catch(e=>{console.error(e); process.exit(1);});
