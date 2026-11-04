// D-6-cache.js — druhá návšteva cez gzip server s hlavičkami ako GitHub Pages (max-age=600, ETag): čo sa sťahuje znova, čo ide z cache
// Externé domény blokované cez CDP (route() by vypol cache prehliadača).
const L = require('./D-lib.js');
const G = 'http://127.0.0.1:8135';
(async()=>{
  const browser = await L.chromium.launch();
  const ctx = await browser.newContext(L.MOBILE);
  const page = await ctx.newPage(); const cdp = await ctx.newCDPSession(page);
  await cdp.send('Network.enable'); await cdp.send('Network.setBlockedURLs', {urls:['*gc.zgo.at*','*goatcounter.com*','*tipsport.sk*','*sportlinky.sk*','*sportlinking.com*']});
  const reqs = new Map();
  cdp.on('Network.requestWillBeSent', e => reqs.set(e.requestId, {url:e.request.url.replace(G,''), t:e.timestamp}));
  cdp.on('Network.requestServedFromCache', e => { const r=reqs.get(e.requestId); if(r) r.cache='pamäť/disk (bez požiadavky)'; });
  cdp.on('Network.responseReceived', e => { const r=reqs.get(e.requestId); if(!r) return; r.status=e.response.status; r.cc=e.response.headers['Cache-Control']||''; r.ce=e.response.headers['Content-Encoding']||''; if(e.response.fromDiskCache||e.response.fromMemoryCache) r.cache=r.cache||'cache'; });
  cdp.on('Network.loadingFinished', e => { const r=reqs.get(e.requestId); if(r) r.enc=e.encodedDataLength; });
  cdp.on('Network.loadingFailed', e => { const r=reqs.get(e.requestId); if(r) r.status='BLOK '+e.errorText; });
  const visit = async (label, url, wait=6000) => { reqs.clear(); await page.goto(url, {waitUntil:'load'}); await page.waitForTimeout(wait);
    console.log(`\n### ${label}: ${url}`); console.log('| Súbor | stav | z cache | prenesené B (so hlavičkami) | Cache-Control | kódovanie |'); console.log('|---|---|---|---:|---|---|');
    let tot=0; [...reqs.values()].filter(r=>!/^data:/.test(r.url)).forEach(r=>{ tot+= r.enc||0; console.log(`| ${r.url.slice(0,60)} | ${r.status} | ${r.cache||'nie'} | ${r.enc??''} | ${r.cc} | ${r.ce} |`); });
    console.log(`spolu prenesené: ${(tot/1024).toFixed(1)} kB`); };
  await visit('1. návšteva (prázdna cache) — sekcia Anglicko', G+'/futbal/kluby/europa/anglicko/');
  await visit('2. návšteva do 10 min — liga Championship (iná stránka)', G+'/futbal/kluby/europa/anglicko/championship/');
  await visit('3. návšteva do 10 min — domov (appka priamo)', G+'/');
  await visit('4. opätovné otvorenie tej istej sekcie Anglicko', G+'/futbal/kluby/europa/anglicko/');
  // po vypršaní max-age (simulácia: server pošle max-age=0 → prehliadač revaliduje) — nedá sa čakať 10 min; namiesto toho reload (Chrome revaliduje hlavný dokument)
  reqs.clear(); await page.reload({waitUntil:'load'}); await page.waitForTimeout(6000);
  console.log('\n### 5. obnovenie stránky (F5) — Chrome revaliduje (If-None-Match → 304?)'); console.log('| Súbor | stav | z cache | prenesené B |'); console.log('|---|---|---|---:|');
  [...reqs.values()].filter(r=>!/^data:/.test(r.url)).forEach(r=>console.log(`| ${r.url.slice(0,60)} | ${r.status} | ${r.cache||'nie'} | ${r.enc??''} |`));
  await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});
