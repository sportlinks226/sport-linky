// rozlíšenia: 1024/1280/1440/1920 × 800/1080 — hĺbka Futbal›Kluby›Európa›Anglicko›Premier League
const L = require('./lib');
(async()=>{
  for(const w of [1024,1280,1440,1920]) for(const h of [800,1080]){
    const {browser,page} = await L.open(w,h);
    await L.cols(page);
    for(const [lv,t] of [[0,'Futbal'],[1,'Kluby'],[2,'Európa'],[3,'Anglicko'],[4,'Premier']]){ try{ await L.hoverItem(page,lv,t,1100); }catch(e){ console.log(w+'x'+h,'chýba',t); break; } }
    const s = await L.state(page);
    const info = await page.evaluate(()=>{const w=document.getElementById('colsWrap'); const d=document.getElementById('colDetail'); const r=d.getBoundingClientRect(); const main=document.getElementById('main'); return {wrapW:w.clientWidth, wrapScrollW:w.scrollWidth, overflowX:w.scrollWidth>w.clientWidth+1, detailRight:Math.round(r.right), detailVisible:r.left>=0&&r.right<=innerWidth, colH:document.querySelector('.col:not(.collapsed)').clientHeight, mainMaxW:getComputedStyle(main).maxWidth, mainW:main.clientWidth, headerH:document.querySelector('header').offsetHeight};});
    console.log(`${w}x${h}: stĺpcov ${s.cols.length} (zbalených ${s.cols.filter(c=>c.collapsed).length}), šírka obsahu ${info.wrapScrollW}/${info.wrapW}px, vodorovné rolovanie: ${info.overflowX}, wrapLeft ${s.wrapLeft}, panel celý viditeľný: ${info.detailVisible}, výška stĺpca ${info.colH}px, main ${info.mainW}px (max ${info.mainMaxW}), hlavička ${info.headerH}px, scrollY ${s.scrollY}`);
    await L.shot(page,`rozl-${w}x${h}-hlbka5`);
    await browser.close();
  }
})().catch(e=>{console.error(e); process.exit(1);});
