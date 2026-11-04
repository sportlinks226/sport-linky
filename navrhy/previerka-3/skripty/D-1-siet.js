// D-1-siet.js — čo sa sťahuje pri otvorení stránok (počet, veľkosť, poradie), pokusy o externé domény
const L = require('./D-lib.js');
const PAGES = [
  ['domov', L.SK + '/'],
  ['sekcia Anglicko', L.SK + '/futbal/kluby/europa/anglicko/'],
  ['liga Championship (24 klubov)', L.SK + '/futbal/kluby/europa/anglicko/championship/'],
  ['Aktuálne', L.SK + '/aktualne/'],
  ['hľadanie „arsenal“ (domov → zadanie textu)', L.SK + '/?q'],
  ['EN domov', L.EN + '/'],
];
(async()=>{
  const browser = await L.chromium.launch();
  const out = [];
  for(const [name, url] of PAGES){
    const ctx = await browser.newContext(L.MOBILE); const ext = []; await L.blockExternal(ctx, ext);
    const page = await ctx.newPage(); const rows = L.requestLog(page);
    const t0 = Date.now();
    await page.goto(url.replace('/?q','/'), {waitUntil:'load'});
    await page.waitForTimeout(9000);
    if(url.endsWith('/?q')){
      rows.length && rows.forEach(r => r.phase = 'pred hľadaním');
      await page.fill('#srch', 'arsenal'); await page.waitForTimeout(5000);
    }
    const taken = await page.evaluate(() => ({ title: document.title, hasApp: !!document.getElementById('main'), nodes: (window.DB && window.DB.nodes && window.DB.nodes.length)||0, partial: !!(window.DB && window.DB._partial) }));
    const tot = {n:0, raw:0, gz:0, br:0, byType:{}};
    const lines = rows.map(r => {
      const s = L.gzSize(r.url) || {raw:r.len||0, gz:null, br:null};
      tot.n++; tot.raw += s.raw||0; tot.gz += s.gz||0; tot.br += s.br||0;
      const k = r.type; tot.byType[k] = tot.byType[k]||{n:0, raw:0, gz:0}; tot.byType[k].n++; tot.byType[k].raw += s.raw||0; tot.byType[k].gz += s.gz||0;
      return { url: r.url.replace(L.SK,'').replace(L.EN,'[EN]'), type:r.type, status:r.status, start:r.start, end:r.end, raw:s.raw, gz:s.gz, cc: r.headers && r.headers['cache-control'] || '-', phase: r.phase||'', failed:r.failed||'' };
    });
    out.push({name, url, taken, tot, ext, lines});
    await ctx.close();
  }
  await browser.close();
  L.fs.writeFileSync(__dirname + '/../data/D-1-siet.json', JSON.stringify(out, null, 1));
  for(const o of out){
    console.log(`\n### ${o.name} — ${o.url}  (po 9 s: appka=${o.taken.hasApp}, uzlov v DB=${o.taken.nodes}, partial=${o.taken.partial}, title="${o.taken.title}")`);
    console.log(`požiadaviek: ${o.tot.n}, nezbalené ${(o.tot.raw/1024).toFixed(0)} kB, gzip ${(o.tot.gz/1024).toFixed(0)} kB, brotli ${(o.tot.br/1024).toFixed(0)} kB; podľa typu: ${Object.entries(o.tot.byType).map(([k,v])=>`${k} ${v.n}× ${(v.raw/1024).toFixed(0)} kB (gz ${(v.gz/1024).toFixed(0)})`).join(', ')}`);
    console.log(`externé pokusy (zablokované): ${o.ext.length} → ${[...new Set(o.ext.map(e=>e.url))].join(' | ')}`);
    const big = o.lines.filter(l => !/\/(ikony|vlajky)\//.test(l.url));
    console.log('| # | čas štart→koniec (ms) | typ | stav | nezbal. B | gzip B | súbor |'); console.log('|---|---|---|---|---:|---:|---|');
    big.forEach((l,i)=>console.log(`| ${i+1} | ${l.start}→${l.end} | ${l.type} | ${l.status||l.failed} | ${l.raw} | ${l.gz??''} | ${l.url}${l.phase?' ('+l.phase+')':''} |`));
    const ik = o.lines.filter(l => /\/ikony\//.test(l.url)), vl = o.lines.filter(l => /\/vlajky\//.test(l.url));
    console.log(`ikonky: ${ik.length}× (${ik.reduce((a,l)=>a+(l.raw||0),0)} B, 404: ${ik.filter(l=>l.status===404).length}, prvá ${ik[0]?ik[0].start:'-'} ms, posledná ${ik.length?Math.max(...ik.map(l=>l.end||0)):'-'} ms); vlajky: ${vl.length}× (${vl.reduce((a,l)=>a+(l.raw||0),0)} B, 404: ${vl.filter(l=>l.status===404).length}) ${[...new Set(vl.map(l=>l.url.split('/')[2]))].join(',')}`);
  }
})().catch(e=>{console.error(e);process.exit(1)});
