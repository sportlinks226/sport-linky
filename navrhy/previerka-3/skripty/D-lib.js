// D-lib.js — spoločné pomôcky pre merania (Playwright + CDP)
const { chromium } = require('playwright');
const fs = require('fs'), path = require('path'), zlib = require('zlib');
const SK = 'http://127.0.0.1:8123', EN = 'http://127.0.0.1:8124';
const BUILD = { [SK]: '/tmp/claude-0/-home-user/eed11a80-25e6-51b3-88cc-2253d64cd8b2/scratchpad/build/site-sk',
                [EN]: '/tmp/claude-0/-home-user/eed11a80-25e6-51b3-88cc-2253d64cd8b2/scratchpad/build/site-en' };
const MOBILE = { viewport:{width:390,height:844}, deviceScaleFactor:1, isMobile:true, hasTouch:true,
  userAgent:'Mozilla/5.0 (Linux; Android 11; moto g power (2022)) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Mobile Safari/537.36' };
const DESKTOP = { viewport:{width:1350,height:940}, deviceScaleFactor:1 };
// externé domény sa blokujú a zapisujú (GoatCounter, Tipsport, …)
async function blockExternal(context, log){
  await context.route('**/*', route => {
    const u = route.request().url();
    if(/^https?:\/\/127\.0\.0\.1/.test(u)) return route.continue();
    log && log.push({url:u, type:route.request().resourceType()});
    return route.abort('blockedbyclient');
  });
}
function gzSize(url){
  try{
    const base = Object.keys(BUILD).find(b => url.startsWith(b)); if(!base) return null;
    let p = url.slice(base.length).split('?')[0].split('#')[0]; if(p.endsWith('/')) p += 'index.html';
    const f = path.join(BUILD[base], decodeURIComponent(p)); if(!fs.existsSync(f)) return null;
    const b = fs.readFileSync(f);
    return { raw:b.length, gz:zlib.gzipSync(b,{level:9}).length, br:zlib.brotliCompressSync(b).length };
  }catch(e){ return null; }
}
// zoznam požiadaviek s časovaním (relatívne k navigácii)
function requestLog(page){
  const rows = []; let t0 = null;
  page.on('request', r => { const now = Date.now(); if(t0===null) t0 = now; rows.push({url:r.url(), type:r.resourceType(), method:r.method(), start:now-t0, end:null, status:null, len:null, headers:null, fromCache:false, _r:r}); });
  page.on('response', async resp => {
    const row = rows.find(x => x._r === resp.request()); if(!row) return;
    row.status = resp.status(); row.headers = resp.headers();
    row.len = resp.headers()['content-length'] ? +resp.headers()['content-length'] : null;
  });
  page.on('requestfinished', r => { const row = rows.find(x => x._r === r); if(row){ row.end = Date.now()-t0; const t = r.timing(); row.timing = t; } });
  page.on('requestfailed', r => { const row = rows.find(x => x._r === r); if(row){ row.end = Date.now()-t0; row.failed = r.failure() && r.failure().errorText; } });
  return rows;
}
async function throttle(page, {cpu=4, net='slow4g'}={}){
  const cdp = await page.context().newCDPSession(page);
  await cdp.send('Emulation.setCPUThrottlingRate', {rate:cpu});
  if(net==='slow4g') await cdp.send('Network.emulateNetworkConditions', {offline:false, latency:150, downloadThroughput:1.6*1024*1024/8, uploadThroughput:750*1024/8}); // Lighthouse "slow 4G": 1,6 Mb/s, 150 ms RTT
  return cdp;
}
module.exports = { chromium, SK, EN, BUILD, MOBILE, DESKTOP, blockExternal, gzSize, requestLog, throttle, fs, path, zlib };
