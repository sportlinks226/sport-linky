const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch(); const p = await b.newPage({viewport:{width:1200,height:800}});
  for (const [url, name] of [['http://127.0.0.1:8123/tenis/asociacie/europa/','sk-tenis-europa'],['http://127.0.0.1:8124/football/clubs/oceania/australia/','en-australia'],['http://127.0.0.1:8124/football/clubs/asia/yemen/yemen-league/','en-jemen']]) {
    await p.goto(url, {waitUntil:'networkidle'}); await p.waitForTimeout(1500);
    const tags = await p.$$eval('.liga-tag, .lt', els => els.map(e => (e.closest('.card-link')||e.parentElement).innerText.replace(/\s+/g,' ').slice(0,80)));
    const links = await p.$$eval('.card-link a[href], a.card-link', els => els.slice(0,6).map(e => e.getAttribute('href')+' | '+e.innerText.replace(/\s+/g,' ').slice(0,60)));
    console.log(name, 'štítky:', tags.slice(0,6)); console.log(name, 'linky:', links);
    await p.screenshot({path:'snimky/G-'+name+'.png'});
  }
  await b.close();
})();
