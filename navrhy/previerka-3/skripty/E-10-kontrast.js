// E-10-kontrast.js — kontrast textu: unikátne dvojice farba písma / pozadie (najbližší nepriehľadný predok), WCAG pomer; mobil
const L = require('./D-lib.js');
(async()=>{
  const browser = await L.chromium.launch(); const pairs = {};
  for(const [name,url] of [['domov',L.SK+'/'],['liga Championship',L.SK+'/futbal/kluby/europa/anglicko/championship/'],['hľadanie',L.SK+'/?q=slovan'],['Aktuálne',L.SK+'/aktualne/'],['sekcia Anglicko desktop',L.SK+'/futbal/kluby/europa/anglicko/']]){
    const ctx = await browser.newContext(name.includes('desktop')?L.DESKTOP:L.MOBILE); await L.blockExternal(ctx, []); const page = await ctx.newPage();
    const q = url.includes('?q=') ? url.split('?q=')[1] : null; await page.goto(url.split('?')[0],{waitUntil:'load'}); await page.waitForTimeout(4000); if(q){ await page.fill('#srch',q); await page.waitForTimeout(2500); }
    const res = await page.evaluate(()=>{
      const parse=c=>{const m=c.match(/rgba?\(([^)]+)\)/); if(!m) return null; const a=m[1].split(',').map(parseFloat); return {r:a[0],g:a[1],b:a[2],a:a.length>3?a[3]:1};};
      const lum=c=>{const f=v=>{v/=255;return v<=0.03928?v/12.92:Math.pow((v+0.055)/1.055,2.4)};return 0.2126*f(c.r)+0.7152*f(c.g)+0.0722*f(c.b)};
      const blend=(fg,bg)=>({r:fg.r*fg.a+bg.r*(1-fg.a),g:fg.g*fg.a+bg.g*(1-fg.a),b:fg.b*fg.a+bg.b*(1-fg.a),a:1});
      const bgOf=e=>{let bg={r:15,g:25,b:35,a:1}; const chain=[]; let n=e; while(n&&n!==document.documentElement){const c=parse(getComputedStyle(n).backgroundColor); if(c&&c.a>0) chain.unshift(c); n=n.parentElement;} const body=parse(getComputedStyle(document.body).backgroundColor); if(body&&body.a>0) bg=body; for(const c of chain) bg=c.a>=1?c:blend(c,bg); return bg;};
      const out={}; const walker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);
      let t; while(t=walker.nextNode()){ const s=t.textContent.trim(); if(!s) continue; const e=t.parentElement; if(!e||e.closest('.mo,#pwScreen,script,style,[hidden],.sr-only')) continue; const cs=getComputedStyle(e); if(cs.display==='none'||cs.visibility==='hidden'||parseFloat(cs.opacity)===0||!e.getClientRects().length) continue;
        let fg=parse(cs.color); if(!fg) continue; const op=parseFloat(cs.opacity); const bg=bgOf(e); if(fg.a<1||op<1){ fg={...fg,a:fg.a*op}; fg=blend(fg,bg);} 
        const ratio=((Math.max(lum(fg),lum(bg))+0.05)/(Math.min(lum(fg),lum(bg))+0.05)); const size=parseFloat(cs.fontSize), bold=parseInt(cs.fontWeight)>=700; const large=size>=24||(size>=18.66&&bold);
        const key=`rgb(${Math.round(fg.r)},${Math.round(fg.g)},${Math.round(fg.b)}) na rgb(${Math.round(bg.r)},${Math.round(bg.g)},${Math.round(bg.b)})`;
        const sel=e.tagName.toLowerCase()+(e.id?'#'+e.id:'')+(e.className&&typeof e.className==='string'?'.'+e.className.trim().split(/\s+/).slice(0,2).join('.'):'');
        if(!out[key]) out[key]={ratio:+ratio.toFixed(2), min:large?3:4.5, size, bold, sel:new Set(), n:0, sample:s.slice(0,30)}; out[key].n++; if(out[key].sel.size<4) out[key].sel.add(sel); if(size<out[key].size){out[key].size=size; out[key].min=large?3:4.5;} }
      return Object.fromEntries(Object.entries(out).map(([k,v])=>[k,{...v,sel:[...v.sel]}]));
    });
    for(const [k,v] of Object.entries(res)){ pairs[k]=pairs[k]||{...v, pages:new Set(), sel:new Set(v.sel)}; pairs[k].pages.add(name); v.sel.forEach(s=>pairs[k].sel.add(s)); pairs[k].n=Math.max(pairs[k].n,v.n); if(v.size<pairs[k].size){pairs[k].size=v.size;pairs[k].min=v.min;} }
    await ctx.close();
  }
  console.log('| Písmo | Pozadie | Pomer | Limit | Najmenšie písmo | Stav | Prvky | Stránky |'); console.log('|---|---|---:|---:|---:|---|---|---|');
  for(const [k,v] of Object.entries(pairs).sort((a,b)=>a[1].ratio-b[1].ratio)){ const [fg,bg]=k.split(' na '); console.log(`| ${fg} | ${bg} | ${v.ratio} | ${v.min} | ${v.size.toFixed(1)} px${v.bold?' tučné':''} | ${v.ratio<v.min?'**NEDOSTATOČNÝ**':v.ratio<7?'AA ✓':'AAA ✓'} | \`${[...v.sel].slice(0,3).join('`, `')}\` („${v.sample}“) | ${[...v.pages].join(', ')} |`); }
  await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});
