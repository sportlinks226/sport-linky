// D-2-pozorovane.js — pozorované (nesimulované) hodnoty z Lighthouse trace + fázy LCP + detail link-name
const fs=require('fs'),dir=process.argv[2];
for(const f of fs.readdirSync(dir).filter(f=>f.endsWith('.report.json')).sort()){
  const r=JSON.parse(fs.readFileSync(dir+'/'+f)); const m=r.audits.metrics.details.items[0]; const ph=r.audits['largest-contentful-paint-element'];
  console.log(`\n### ${f.replace('.report.json','')}: pozorované (bez simulácie siete, CPU 4×?): FCP ${m.observedFirstContentfulPaint} ms, LCP ${m.observedLargestContentfulPaint} ms, load ${m.observedLoad} ms, DCL ${m.observedDomContentLoaded} ms, CLS ${m.observedCumulativeLayoutShift}; simulované: FCP ${Math.round(m.firstContentfulPaint)}, LCP ${Math.round(m.largestContentfulPaint)}, TBT ${Math.round(m.totalBlockingTime)}, TTI ${Math.round(m.interactive)}`);
  try{ const it=ph.details.items[1].items; console.log('  fázy LCP: '+it.map(i=>i.phase+' '+Math.round(i.timing)+' ms').join(', ')); }catch(e){}
  try{ const it=ph.details.items[0].items[0].node; console.log('  LCP prvok: '+it.selector+' | '+it.nodeLabel.slice(0,60).replace(/\n/g,' ')); }catch(e){}
  const ln=r.audits['link-name']; if(ln&&ln.score!==null&&ln.score<1) console.log('  link-name: '+ln.details.items.map(i=>i.node.selector+' → '+i.node.snippet.slice(0,120)).join(' ; '));
  const ts=r.audits['target-size']; if(ts) console.log(`  target-size: skóre ${ts.score} (${ts.details&&ts.details.items?ts.details.items.length:0} položiek)`);
  const ct=r.audits['color-contrast']; if(ct) console.log(`  color-contrast: skóre ${ct.score}`);
  const net=r.audits['network-requests'].details.items; const dj=net.find(i=>/data\.json/.test(i.url)); const lcpT=m.observedLargestContentfulPaint; if(dj) console.log(`  data.json pozorované: štart ${Math.round(dj.networkRequestTime)} ms, koniec ${Math.round(dj.networkEndTime)} ms (LCP pozorované ${lcpT} ms → data.json ${dj.networkEndTime<lcpT?'SKONČIL PRED LCP (Lantern ho zaráta do LCP)':'skončil po LCP'})`);
}
