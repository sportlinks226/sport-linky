const { chromium, devices } = require('playwright');
const S='/tmp/claude-0/-home-user/eed11a80-25e6-51b3-88cc-2253d64cd8b2/scratchpad/snimky/';
(async()=>{
  const b=await chromium.launch();
  const shots=[['http://127.0.0.1:8123/','K-01-domov-desktop'],['http://127.0.0.1:8123/futbal/kluby/europa/anglicko/championship/','K-02-championship-desktop'],['http://127.0.0.1:8123/aktualne/','K-03-aktualne-desktop'],['http://127.0.0.1:8124/','K-04-en-domov-desktop'],['http://127.0.0.1:8123/tipovanie/','K-05-tipovanie-desktop']];
  const ctx=await b.newContext({viewport:{width:1366,height:768}});
  const pg=await ctx.newPage();
  await pg.route(/ban\.tipsport\.sk|goatcounter|gc\.zgo\.at/, r=>r.abort());
  for(const [u,n] of shots){ await pg.goto(u); await pg.waitForTimeout(2500); await pg.screenshot({path:S+n+'.png'}); }
  await ctx.close();
  const m=await b.newContext({...devices['iPhone 13']});
  const mp=await m.newPage();
  await mp.route(/ban\.tipsport\.sk|goatcounter|gc\.zgo\.at/, r=>r.abort());
  for(const [u,n] of [['http://127.0.0.1:8123/','K-06-domov-iphone'],['http://127.0.0.1:8123/futbal/kluby/europa/anglicko/championship/','K-07-championship-iphone'],['http://127.0.0.1:8123/futbal/','K-08-futbal-iphone']]){ await mp.goto(u); await mp.waitForTimeout(2500); await mp.screenshot({path:S+n+'.png'}); }
  await mp.goto('http://127.0.0.1:8123/'); await mp.waitForTimeout(2500); await mp.screenshot({path:S+'K-09-domov-iphone-full.png', fullPage:true});
  await b.close();
})();
