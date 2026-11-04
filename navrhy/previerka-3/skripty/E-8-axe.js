// E-8-axe.js — axe-core 4.14 na 5 stránkach (mobil 390) + kontrast (dvojice farieb pod 4,5)
const L = require('./D-lib.js');
const AXE = L.fs.readFileSync('/tmp/claude-0/-home-user/eed11a80-25e6-51b3-88cc-2253d64cd8b2/scratchpad/tools/node_modules/axe-core/axe.min.js','utf8');
const PAGES = [['domov', L.SK+'/'], ['sekcia Anglicko', L.SK+'/futbal/kluby/europa/anglicko/'], ['liga Championship', L.SK+'/futbal/kluby/europa/anglicko/championship/'], ['hľadanie „slovan“', L.SK+'/?q=slovan'], ['Aktuálne', L.SK+'/aktualne/'], ['EN domov', L.EN+'/'], ['EN Live This Week', L.EN+'/live-this-week/']];
(async()=>{
  const browser = await L.chromium.launch(); const all = {}; const contrast = {};
  for(const [name, url] of PAGES){
    const ctx = await browser.newContext(L.MOBILE); await L.blockExternal(ctx, []); const page = await ctx.newPage();
    const q = url.includes('?q=') ? url.split('?q=')[1] : null;
    await page.goto(url.split('?')[0], {waitUntil:'load'}); await page.waitForTimeout(4000);
    if(q){ await page.fill('#srch', q); await page.waitForTimeout(2500); }
    await page.addScriptTag({content: AXE});
    const res = await page.evaluate(async()=>{ const r = await axe.run(document, {runOnly:{type:'tag', values:['wcag2a','wcag2aa','wcag21a','wcag21aa','wcag22aa','best-practice']}, resultTypes:['violations','incomplete']}); return {v:r.violations.map(v=>({id:v.id, impact:v.impact, help:v.help, n:v.nodes.length, nodes:v.nodes.slice(0,4).map(n=>({t:n.target.join(' '), h:n.html.slice(0,140), msg:(n.any[0]&&n.any[0].message)||(n.all[0]&&n.all[0].message)||'', data:n.any[0]&&n.any[0].data}))})), inc:r.incomplete.map(v=>({id:v.id, n:v.nodes.length}))}; });
    console.log(`\n### ${name} (${url})`);
    if(!res.v.length) console.log('- axe: bez porušení');
    for(const v of res.v){ console.log(`- **${v.id}** (${v.impact}, ${v.n}×): ${v.help}`); v.nodes.forEach(n=>console.log(`    - \`${n.t}\` — ${n.h.replace(/\n/g,' ')} ${n.msg?'→ '+n.msg.replace(/\n/g,' ').slice(0,200):''}`)); 
      if(v.id==='color-contrast') v.nodes.forEach(n=>{ if(n.data){ const k=`${n.data.fgColor} na ${n.data.bgColor}`; contrast[k]=contrast[k]||{ratio:n.data.contrastRatio, size:n.data.fontSize, w:n.data.fontWeight, pages:new Set(), sel:n.t}; contrast[k].pages.add(name);} });
      const key=v.id; all[key]=all[key]||{impact:v.impact, help:v.help, pages:{}}; all[key].pages[name]=v.n; }
    console.log(`- neúplné (treba ručne): ${res.inc.map(i=>i.id+'('+i.n+')').join(', ')||'-'}`);
    await ctx.close();
  }
  // kontrast: všetky dvojice farieb v axe výsledkoch — aj tie, čo prešli (pre tabuľku): spočítaj znova cez axe s všetkými uzlami
  console.log('\n### Súhrn porušení (pravidlo → stránky: počet)');
  for(const [k,v] of Object.entries(all)) console.log(`- ${k} (${v.impact}): ${Object.entries(v.pages).map(([p,n])=>p+': '+n).join(', ')} — ${v.help}`);
  console.log('\n### Dvojice farieb s kontrastom pod 4,5 (z axe color-contrast)');
  console.log('| Text | Pozadie | Pomer | Písmo | Kde | Stránky |'); console.log('|---|---|---|---|---|---|');
  for(const [k,v] of Object.entries(contrast)){ const [fg,bg]=k.split(' na '); console.log(`| ${fg} | ${bg} | ${v.ratio} | ${v.size} ${v.w} | \`${v.sel}\` | ${[...v.pages].join(', ')} |`); }
  await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});
