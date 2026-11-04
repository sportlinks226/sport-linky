// D-2-suhrn.js — tabuľka z Lighthouse JSON správ
const fs=require('fs'),dir=process.argv[2];
console.log('| Beh | Výkon | Prístup. | Best pr. | SEO | FCP | LCP | TBT | CLS | SI | TTI | LCP prvok |');console.log('|---|---|---|---|---|---|---|---|---|---|---|---|');
for(const f of fs.readdirSync(dir).filter(f=>f.endsWith('.report.json')).sort()){
  const r=JSON.parse(fs.readFileSync(dir+'/'+f));const a=r.audits,c=r.categories;const v=k=>a[k]?a[k].displayValue:'-';
  let lcpEl='';try{lcpEl=a['largest-contentful-paint-element'].details.items[0].items[0].node.snippet;}catch(e){}
  console.log(`| ${f.replace('.report.json','')} | ${Math.round(c.performance.score*100)} | ${Math.round(c.accessibility.score*100)} | ${Math.round(c['best-practices'].score*100)} | ${Math.round(c.seo.score*100)} | ${v('first-contentful-paint')} | ${v('largest-contentful-paint')} | ${v('total-blocking-time')} | ${v('cumulative-layout-shift')} | ${v('speed-index')} | ${v('interactive')} | ${(lcpEl||'').slice(0,90).replace(/\|/g,'/')} |`);
}
console.log('\n## Odporúčania (audit so skóre < 0.9 alebo úspora), podľa behu');
for(const f of fs.readdirSync(dir).filter(f=>f.endsWith('.report.json')).sort()){
  const r=JSON.parse(fs.readFileSync(dir+'/'+f));const a=r.audits;
  const rows=Object.values(a).filter(x=>x.score!==null&&x.score<0.9&&x.scoreDisplayMode!=='informative'&&x.scoreDisplayMode!=='notApplicable').map(x=>`${x.id} (skóre ${x.score}${x.displayValue?', '+x.displayValue:''})`);
  const diag=Object.values(a).filter(x=>x.details&&x.details.overallSavingsMs>0).map(x=>`${x.id} úspora ${Math.round(x.details.overallSavingsMs)} ms`);
  console.log(`\n### ${f.replace('.report.json','')}\n- neúspešné: ${rows.join('; ')}\n- úspory: ${diag.join('; ')}`);
  const na=r.runWarnings||[];if(na.length)console.log('- varovania: '+na.join(' | '));
  const net=a['network-requests']&&a['network-requests'].details.items; if(net) console.log(`- požiadaviek: ${net.length}, prenesené ${Math.round(net.reduce((s,i)=>s+(i.transferSize||0),0)/1024)} kB (transfer), ${Math.round(net.reduce((s,i)=>s+(i.resourceSize||0),0)/1024)} kB (resource); najväčšie: ${net.sort((x,y)=>(y.transferSize||0)-(x.transferSize||0)).slice(0,4).map(i=>i.url.replace(/^http:\/\/127\.0\.0\.1:\d+/,'')+' '+Math.round((i.transferSize||0)/1024)+' kB').join(', ')}`);
  const acc=Object.values(a).filter(x=>x.score!==null&&x.score<1&&/aria|color|contrast|label|heading|link-name|button-name|image-alt|tabindex|target-size|focus|html-|meta-viewport|list|dlitem|duplicate-id|landmark|bypass|frame-title|document-title|crawlable|hreflang|canonical|font-size|tap-targets/.test(x.id)).map(x=>x.id+(x.details&&x.details.items?' ('+x.details.items.length+')':''));
  if(acc.length) console.log('- prístupnosť/SEO neúspešné: '+acc.join('; '));
  const lt=a['long-tasks']&&a['long-tasks'].details&&a['long-tasks'].details.items; if(lt) console.log('- dlhé úlohy: '+lt.map(i=>Math.round(i.duration)+' ms @'+Math.round(i.startTime)).join(', '));
}
