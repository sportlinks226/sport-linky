const { chromium } = require('playwright'); const fs=require('fs'); const L=require('./lib2');
(async()=>{
  const browser = await chromium.launch(); const ctx = await browser.newContext({viewport:{width:1280,height:800}, recordVideo:{dir:L.OUT+'_v/', size:{width:1280,height:800}}});
  await ctx.route(/tipsport|zgo\.at/, r=>r.abort());
  const page = await ctx.newPage(); await page.goto('http://localhost:8123/'); await page.waitForFunction(()=>typeof DB!=='undefined' && DB.nodes && !DB._partial);
  await L.cols(page); await page.waitForTimeout(500);
  // myš stojí na Futbale 1,5 s
  const pf = await L.item(page,0,'Futbal'); await page.mouse.move(pf.x-80,pf.y,{steps:8}); await page.mouse.move(pf.x,pf.y,{steps:8}); await page.waitForTimeout(1500);
  for(const [lv,t] of [[1,'Kluby'],[2,'Európa']]){ await L.go(page,lv,t,700); }
  // šikmo na Nemecko
  const pe = await L.item(page,2,'Európa'); const pt = await L.item(page,3,'Nemecko'); for(let i=1;i<=25;i++){ await page.mouse.move(pe.x+(pt.x-pe.x)*i/25, pe.y+(pt.y-pe.y)*i/25); await page.waitForTimeout(20);} await page.waitForTimeout(900);
  // Anglicko → Premier League (posun pásu) a nehybná myš
  await L.go(page,3,'Anglicko',1200); await L.go(page,4,'Premier',1200);
  // koliesko: stránka → prilepenie → stĺpec
  const c3 = await page.evaluate(()=>{const r=document.querySelector('.col[data-lv="3"] .col-title').getBoundingClientRect(); return {x:r.left+r.width/2,y:r.top+r.height/2};});
  await page.mouse.move(c3.x,c3.y,{steps:6}); await page.waitForTimeout(400);
  for(let i=0;i<12;i++){ await page.mouse.wheel(0,150); await page.waitForTimeout(120); }
  await page.waitForTimeout(600);
  const vis = await page.evaluate(()=>{const c=document.querySelector('.col[data-lv="3"]'); const r=c.getBoundingClientRect(); return [...c.querySelectorAll('.cit')].filter(a=>{const b=a.getBoundingClientRect(); return b.top>=r.top+30&&b.bottom<=r.bottom;}).map(a=>a.querySelector('.nm').textContent.trim());});
  await L.go(page,3,vis[Math.floor(vis.length/2)],900); await L.go(page,3,vis[Math.floor(vis.length/2)-3],900);
  await page.waitForTimeout(500);
  const v = page.video(); await ctx.close(); const p = await v.path(); fs.renameSync(p, L.OUT+'video-po-prepise-hlbka-a-koliesko.webm'); await browser.close();
  fs.rmSync(L.OUT+'_v',{recursive:true,force:true}); console.log('video ok');
})().catch(e=>{console.error(e); process.exit(1);});
