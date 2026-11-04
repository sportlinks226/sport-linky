const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch();
  const p = await b.newContext({viewport:{width:1366,height:900}}); const page = await p.newPage();
  await page.goto('http://127.0.0.1:8125/', {waitUntil:'load'});
  await page.waitForTimeout(2500);
  await page.fill('#srch','Pokus'); await page.waitForTimeout(900);
  await page.screenshot({path:'snimky/F-01-xss-hladanie-domov.png'});
  // text prvej karty (má byť doslovný payload ako TEXT, nie vykonaný)
  const t = await page.evaluate(()=>{const a=document.querySelector('#main a.card-folder .cf-name');return a?a.textContent:null;});
  console.log('karta text:', JSON.stringify(t));
  await b.close();
})();
