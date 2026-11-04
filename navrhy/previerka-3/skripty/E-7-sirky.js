// E-7-sirky.js — mobilné šírky: snímky, vodorovné pretekanie, viewport/zoom, veľkosť písma vstupov, dotykové ciele < 44×44, stĺpce na dotyku
const L = require('./D-lib.js');
const W = [[320,'iPhone SE (1. gen) / Galaxy S8 320'],[360,'Galaxy / Pixel 5 360'],[375,'iPhone SE 2/3 375'],[390,'iPhone 13/14 390'],[414,'iPhone 11 / XR 414'],[430,'iPhone 15 Pro Max 430'],[768,'iPad 768']];
const PAGES = [['domov', L.SK+'/', 'E-1-domov'], ['sekcia', L.SK+'/futbal/kluby/europa/anglicko/', 'E-2-sekcia'], ['liga', L.SK+'/futbal/kluby/europa/anglicko/championship/', 'E-3-liga'], ['hladanie', L.SK+'/?q=slovan', 'E-4-hladanie'], ['aktualne', L.SK+'/aktualne/', 'E-5-aktualne']];
const SN = '/tmp/claude-0/-home-user/eed11a80-25e6-51b3-88cc-2253d64cd8b2/scratchpad/snimky/';
(async()=>{
  const browser = await L.chromium.launch();
  const small = {}; // selektor → počet malých cieľov (agregované)
  console.log('| Stránka | šírka | scrollWidth > innerWidth? | doc šírka | pretekajúce prvky | dotykové ciele <44 px (z N) | stĺpce (.cols) viditeľné? | vswitch viditeľný? |');
  console.log('|---|---:|---|---|---|---|---|---|');
  for(const [name, url, snim] of PAGES){
    for(const [w, label] of W){
      const ctx = await browser.newContext({...L.MOBILE, viewport:{width:w, height: w>=768?1024:800}}); await L.blockExternal(ctx, []); const page = await ctx.newPage();
      const q = url.includes('?q=') ? url.split('?q=')[1] : null;
      await page.goto(url.split('?')[0], {waitUntil:'load'}); await page.waitForTimeout(3500);
      if(q){ await page.fill('#srch', q); await page.waitForTimeout(2500); }
      const r = await page.evaluate(()=>{
        const iw = window.innerWidth, sw = document.documentElement.scrollWidth;
        const over = [...document.querySelectorAll('body *')].filter(e=>{const b=e.getBoundingClientRect(); return b.right>iw+1 && b.width>0 && getComputedStyle(e).visibility!=='hidden';}).map(e=>(e.tagName.toLowerCase()+(e.id?'#'+e.id:'')+(e.className&&typeof e.className==='string'?'.'+e.className.trim().split(/\s+/).slice(0,2).join('.'):''))+' '+Math.round(e.getBoundingClientRect().right-iw)+'px');
        const tg = [...document.querySelectorAll('a[href],button,input,select,textarea,[onclick],[role=button],[tabindex]:not([tabindex="-1"])')].filter(e=>{const b=e.getBoundingClientRect(); const cs=getComputedStyle(e); return b.width>0&&b.height>0&&cs.visibility!=='hidden'&&cs.display!=='none'&&!e.closest('.mo:not(.open)')&&!e.closest('#pwScreen:not(.open)')&&!e.closest('[hidden]');});
        const sm = tg.filter(e=>{const b=e.getBoundingClientRect(); return b.width<44||b.height<44;});
        const bySel = {}; sm.forEach(e=>{const k=e.tagName.toLowerCase()+(e.id?'#'+e.id:'')+(e.className&&typeof e.className==='string'?'.'+e.className.trim().split(/\s+/).slice(0,2).join('.'):'')+(e.closest('.card-link')?' (v .card-link)':e.closest('.akt-bar,#aktualneWrap')?' (v Aktuálne)':e.closest('header')?' (v header)':e.closest('footer')?' (vo footer)':e.closest('.crumbs,.bc')?' (v drobčekoch)':''); const b=e.getBoundingClientRect(); const sz=Math.round(b.width)+'×'+Math.round(b.height); bySel[k]=bySel[k]||{n:0,sz:new Set()}; bySel[k].n++; bySel[k].sz.add(sz);});
        const cols = document.querySelector('.cols'); const vs = document.getElementById('vSwitch');
        const inputs = [...document.querySelectorAll('input,select,textarea')].filter(e=>e.offsetParent).map(e=>e.id+':'+getComputedStyle(e).fontSize);
        return { iw, sw, over: over.slice(0,6), tgN: tg.length, smN: sm.length, bySel: Object.fromEntries(Object.entries(bySel).map(([k,v])=>[k,{n:v.n,sz:[...v.sz].slice(0,3).join(',')}])), cols: !!(cols&&cols.offsetParent), vs: !!(vs&&vs.offsetParent), inputs: inputs.join(' '), meta: (document.querySelector('meta[name=viewport]')||{}).content, docH: document.documentElement.scrollHeight };
      });
      for(const [k,v] of Object.entries(r.bySel)){ const kk = k; small[kk]=small[kk]||{n:0,sz:new Set(),pages:new Set()}; small[kk].n=Math.max(small[kk].n, v.n); v.sz.split(',').forEach(s=>small[kk].sz.add(s)); small[kk].pages.add(name+'@'+w); }
      console.log(`| ${name} | ${w} | ${r.sw>r.iw?'**ÁNO**':'nie'} | ${r.sw}/${r.iw} | ${r.over.join('; ')||'-'} | ${r.smN} z ${r.tgN} | ${r.cols?'ÁNO':'nie'} | ${r.vs?'ÁNO':'nie'} |`);
      if(w===390 || w===320 || w===768) await page.screenshot({path: SN + snim + '-' + w + '.png', fullPage: w===390});
      if(w===390) console.log(`  meta viewport: "${r.meta}"; vstupy (font-size): ${r.inputs}; výška dokumentu ${r.docH}px`);
      await ctx.close();
    }
  }
  console.log('\n### Dotykové ciele menšie než 44×44 px (max. počet na jednej stránke, rozmery, kde)');
  console.log('| Selektor | max. počet | rozmery | stránky |'); console.log('|---|---:|---|---|');
  for(const [k,v] of Object.entries(small).sort((a,b)=>b[1].n-a[1].n)) console.log(`| \`${k}\` | ${v.n} | ${[...v.sz].slice(0,4).join(', ')} | ${[...v.pages].slice(0,4).join(', ')}${v.pages.size>4?' …':''} |`);
  await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});
