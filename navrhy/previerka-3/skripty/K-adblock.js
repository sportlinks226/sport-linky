const { chromium, devices } = require('playwright');
(async()=>{
  const b=await chromium.launch();
  for(const [name,ctxOpt,url] of [['sk-desktop',{viewport:{width:1366,height:768}},'http://127.0.0.1:8123/'],['sk-iphone',{...devices['iPhone 13']},'http://127.0.0.1:8123/futbal/'],['en-desktop',{viewport:{width:1366,height:768}},'http://127.0.0.1:8124/']]){
    const ctx=await b.newContext(ctxOpt); const pg=await ctx.newPage();
    await pg.route(/ban\.tipsport\.sk|goatcounter|gc\.zgo\.at/, r=>r.abort('blockedbyclient'));
    await pg.goto(url); await pg.waitForTimeout(4000);
    const info=await pg.evaluate(()=>{
      const out=[];
      for(const id of ['bannerSlot','bannerSlot2']){ const el=document.getElementById(id); if(!el) {out.push({id,missing:true});continue;}
        const r=el.getBoundingClientRect(); const f=el.querySelector('iframe');
        out.push({id,w:Math.round(r.width),h:Math.round(r.height),visible:r.height>0&&getComputedStyle(el).display!=='none',bid:el.dataset.bid,html:el.innerHTML.slice(0,80),iframe:!!f, cls:el.className});
      }
      return out;});
    console.log(name, JSON.stringify(info));
    await ctx.close();
  }
  await b.close();
})();
