// D-4-ikonky.js — ikonky a vlajky na 5 stránkach: počet, 404, rozmery, lazy/decoding/width-height, nad ohybom (mobil 390×844 a desktop)
const L = require('./D-lib.js');
const PAGES = [['domov', L.SK+'/'], ['Anglicko', L.SK+'/futbal/kluby/europa/anglicko/'], ['Championship', L.SK+'/futbal/kluby/europa/anglicko/championship/'], ['Aktuálne', L.SK+'/aktualne/'], ['hľadanie „real“', L.SK+'/?q=real'], ['Premier League', L.SK+'/futbal/kluby/europa/anglicko/premier-league/'], ['Slovensko hokej kluby', L.SK+'/hokej/kluby/europa/slovensko/']];
(async()=>{
  const browser = await L.chromium.launch();
  for(const dev of [['mobil', L.MOBILE], ['desktop', L.DESKTOP]]){
    console.log(`\n## ${dev[0]}`);
    console.log('| Stránka | img spolu | ikonky (req) | 404 ikonky | vlajky (req) | 404 vlajky | nad ohybom (img) | lazy | bez width/height | decoding=async | B ikonky | B vlajky | ikonky ≤1px (neviditeľné) |');
    console.log('|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|');
    for(const [name, url] of PAGES){
      const ctx = await browser.newContext(dev[1]); await L.blockExternal(ctx, []); const page = await ctx.newPage();
      const reqs = []; page.on('response', r => { const u=r.url(); if(/\/(ikony|vlajky)\//.test(u)) reqs.push({u, s:r.status(), len:+(r.headers()['content-length']||0)}); });
      const q = url.includes('?q=') ? url.split('?q=')[1] : null;
      await page.goto(url.split('?')[0], {waitUntil:'load'}); await page.waitForTimeout(4000);
      if(q){ await page.fill('#srch', q); await page.waitForTimeout(3000); }
      // posuň sa dole a späť, aby sa načítali aj lazy obrázky pod ohybom (kvôli 404)
      await page.evaluate(async()=>{ for(let y=0;y<document.body.scrollHeight;y+=600){ window.scrollTo(0,y); await new Promise(r=>setTimeout(r,120)); } window.scrollTo(0,0); });
      await page.waitForTimeout(2500);
      const info = await page.evaluate(()=>{
        const vh = window.innerHeight; const imgs=[...document.images];
        const above = imgs.filter(i=>{const r=i.getBoundingClientRect(); return r.bottom>0 && r.top<vh && r.width>0;});
        return { total: imgs.length, above: above.length, lazy: imgs.filter(i=>i.loading==='lazy').length, noWH: imgs.filter(i=>!(i.getAttribute('width')&&i.getAttribute('height'))).length,
          dec: imgs.filter(i=>i.decoding==='async').length, tiny: imgs.filter(i=>i.complete&&i.naturalWidth<=1).length,
          noWHsel: [...new Set(imgs.filter(i=>!(i.getAttribute('width')&&i.getAttribute('height'))).map(i=>i.className||i.parentElement.className||i.tagName))].slice(0,5).join(', '),
          sizes: [...new Set(imgs.map(i=>i.naturalWidth+'x'+i.naturalHeight))].slice(0,8).join(' '),
          cssSizes: [...new Set(imgs.map(i=>Math.round(i.getBoundingClientRect().width)+'x'+Math.round(i.getBoundingClientRect().height)))].slice(0,6).join(' ') };
      });
      const ik = reqs.filter(r=>/\/ikony\//.test(r.u)), vl = reqs.filter(r=>/\/vlajky\//.test(r.u));
      console.log(`| ${name} | ${info.total} | ${ik.length} | ${ik.filter(r=>r.s===404).length} | ${vl.length} | ${vl.filter(r=>r.s===404).length} | ${info.above} | ${info.lazy} | ${info.noWH} (${info.noWHsel}) | ${info.dec} | ${ik.reduce((a,r)=>a+r.len,0)} | ${vl.reduce((a,r)=>a+r.len,0)} | ${info.tiny} |`);
      if(ik.filter(r=>r.s===404).length) console.log('  404: '+ik.filter(r=>r.s===404).map(r=>r.u.split('/').pop()).slice(0,10).join(', '));
      if(dev[0]==='mobil') console.log(`  rozmery súborov: ${info.sizes}; CSS rozmery: ${info.cssSizes}`);
      await ctx.close();
    }
  }
  // váha ikoniek a vlajok v repozitári
  const fs=L.fs, p=L.path, root=L.BUILD[L.SK];
  const ik=fs.readdirSync(root+'/ikony'); let tot=0, big=0, max=[0,'']; const hist={};
  for(const f of ik){ const s=fs.statSync(root+'/ikony/'+f).size; tot+=s; if(s>5000) big++; if(s>max[0]) max=[s,f]; const k=s<1000?'<1 kB':s<2000?'1–2 kB':s<5000?'2–5 kB':'>5 kB'; hist[k]=(hist[k]||0)+1; }
  console.log(`\nikony/: ${ik.length} súborov, ${(tot/1024/1024).toFixed(1)} MB, priemer ${(tot/ik.length).toFixed(0)} B, nad 5 kB: ${big}, najväčší ${max[1]} ${max[0]} B; rozdelenie: ${JSON.stringify(hist)}`);
  // formát (JPEG ako .png?) + rozmery podľa hlavičky PNG
  let jpg=0, png=0, other=0; const dims={};
  for(const f of ik){ const b=fs.readFileSync(root+'/ikony/'+f); if(b[0]===0x89&&b[1]===0x50){ png++; const w=b.readUInt32BE(16), h=b.readUInt32BE(20); const k=w+'x'+h; dims[k]=(dims[k]||0)+1; } else if(b[0]===0xFF&&b[1]===0xD8) jpg++; else other++; }
  console.log(`formát: PNG ${png}, JPEG s príponou .png ${jpg}, iné ${other}; rozmery PNG (top 8): ${Object.entries(dims).sort((a,b)=>b[1]-a[1]).slice(0,8).map(([k,v])=>k+':'+v).join(' ')}`);
  for(const d of fs.readdirSync(root+'/vlajky')){ const fl=fs.readdirSync(root+'/vlajky/'+d); const t=fl.reduce((a,f)=>a+fs.statSync(root+'/vlajky/'+d+'/'+f).size,0); console.log(`vlajky/${d}: ${fl.length} súborov, ${(t/1024).toFixed(0)} kB, priemer ${(t/fl.length).toFixed(0)} B`); }
  await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});
