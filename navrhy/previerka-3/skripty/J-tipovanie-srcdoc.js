// Porovná srcdoc promo okienka na /tipovanie/: statické HTML (generátor) vs appka po prevzatí — po dekódovaní atribútu.
const fs=require('fs'),{chromium}=require('playwright');
const he=s=>s.replace(/&#x27;/g,"'").replace(/&quot;/g,'"').replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&#39;/g,"'").replace(/&amp;/g,'&');
(async()=>{
  const sh=fs.readFileSync('/tmp/claude-0/-home-user/eed11a80-25e6-51b3-88cc-2253d64cd8b2/scratchpad/build/site-sk/tipovanie/index.html','utf8');
  const sdoc=he((sh.match(/<iframe class="adframe adframe-auto"[^>]*srcdoc="([^"]*)"/)||[])[1]||'');
  const b=await chromium.launch(); const c=await b.newContext(); await c.route('**/*',r=>/tipsport|goatcounter|zgo/.test(r.request().url())?r.abort():r.continue());
  const p=await c.newPage(); await p.goto('http://127.0.0.1:8123/tipovanie/',{waitUntil:'domcontentloaded'});
  await p.waitForFunction(()=>typeof render==='function'&&document.querySelector('#main .promo'),null,{timeout:60000});
  const adoc=await p.evaluate(()=>{const f=document.querySelector('#main iframe.adframe-auto');return f?f.getAttribute('srcdoc'):'';});
  console.log('zhoda:',sdoc===adoc,'dĺžky',sdoc.length,adoc.length);
  if(sdoc!==adoc){ let i=0; while(i<sdoc.length&&sdoc[i]===adoc[i]) i++; console.log('prvý rozdiel na',i,'\nSTAT:',JSON.stringify(sdoc.slice(Math.max(0,i-80),i+120)),'\nAPP :',JSON.stringify(adoc.slice(Math.max(0,i-80),i+120))); }
  await b.close();
})();
