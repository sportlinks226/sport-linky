// videá + sekvencie snímok pre P1 a P2
const { chromium } = require('playwright'); const fs=require('fs'); const L=require('./lib');
async function rec(name, fn){
  const browser = await chromium.launch(); const ctx = await browser.newContext({viewport:{width:1280,height:800}, recordVideo:{dir:L.OUT+'_v/', size:{width:1280,height:800}}});
  await ctx.route(/tipsport|zgo\.at/, r=>r.abort());
  const page = await ctx.newPage(); await page.goto('http://localhost:8123/'); await page.waitForFunction(()=>typeof DB!=='undefined' && DB.nodes && !DB._partial);
  await L.cols(page); await fn(page); const v = page.video(); await ctx.close(); const p = await v.path(); fs.renameSync(p, L.OUT+name+'.webm'); await browser.close();
}
(async()=>{
  // P1: myš sa postaví na Futbal a nehýbe sa
  await rec('video-p1-futbal-stojaca-mys', async page=>{
    await page.waitForTimeout(600);
    const p = await L.item(page,0,'Futbal'); await page.mouse.move(p.x-60,p.y,{steps:8}); await page.mouse.move(p.x,p.y,{steps:6});
    for(let i=1;i<=7;i++){ await page.waitForTimeout(150); await page.screenshot({path:L.OUT+`p1-seq-${i}.png`}); }
    await page.waitForTimeout(600);
  });
  // P2: cesta Futbal›Kluby›Európa, koliesko dole, malý pohyb myši hore
  await rec('video-p2-rolovanie-a-skok-hore', async page=>{
    await page.waitForTimeout(400);
    await L.hoverItem(page,0,'Futbal',1100); await L.hoverItem(page,1,'Kluby',1100); await L.hoverItem(page,2,'Európa',1100);
    const c = await page.evaluate(()=>{const r=document.querySelector('.col[data-lv="3"]').getBoundingClientRect(); return {x:r.left+r.width/2, y:r.top+r.height/2};});
    await page.mouse.move(c.x,c.y,{steps:6}); await page.waitForTimeout(300); await page.screenshot({path:L.OUT+'p2-seq-1-pred-rolovanim.png'});
    for(let i=0;i<12;i++){ await page.mouse.wheel(0,300); await page.waitForTimeout(80); }
    await page.waitForTimeout(100); await page.screenshot({path:L.OUT+'p2-seq-2-hned-po-rolovani.png'});
    await page.waitForTimeout(400); await page.screenshot({path:L.OUT+'p2-seq-3-po-0.5s-stlpec-hore.png'});
    const s=await L.state(page); console.log('P2 video: po kolieskom dole → scrollTop stĺpca 3 =', s.cols[3].scrollTop, 'colPath', JSON.stringify(s.colPath));
    await page.waitForTimeout(600);
  });
  console.log('videá hotové'); fs.rmSync(L.OUT+'_v', {recursive:true, force:true});
})().catch(e=>{console.error(e); process.exit(1);});
