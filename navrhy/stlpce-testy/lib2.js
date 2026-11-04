const { chromium } = require('playwright');
const OUT = '/home/user/sport-linky/navrhy/stlpce-snimky/po-prepise/';
const URL = 'http://localhost:8123/';
async function open(w=1280,h=800,extra={}){
  const browser = await chromium.launch();
  const ctx = await browser.newContext({viewport:{width:w,height:h}, deviceScaleFactor:1, ...extra});
  await ctx.route(/tipsport|zgo\.at/, r=>r.abort());
  const page = await ctx.newPage();
  const errs=[]; page.on('console', m=>{ if(['error','warning'].includes(m.type()) && !/ERR_FAILED|ERR_BLOCKED/.test(m.text())) errs.push(m.type()+': '+m.text()); });
  page.on('pageerror', e=>errs.push('pageerror: '+e.message));
  await page.addInitScript(()=>{ window.__csp=[]; document.addEventListener('securitypolicyviolation',e=>window.__csp.push(e.violatedDirective+' '+e.blockedURI)); });
  await page.goto(URL); await page.waitForFunction(()=>typeof DB!=='undefined' && DB.nodes && DB.nodes.length>1000 && !DB._partial, null, {timeout:30000});
  return {browser, ctx, page, errs};
}
async function cols(page){ await page.click('#vSwitch button[data-mode=cols]'); await page.waitForSelector('#colsWrap'); await page.waitForTimeout(200); }
async function item(page, lv, text){
  return page.evaluate(([lv,text])=>{
    const col=document.querySelector(`.col[data-lv="${lv}"]`); if(!col) return null;
    const it=[...col.querySelectorAll('.cit')].find(a=>a.querySelector('.nm').textContent.trim().startsWith(text)); if(!it) return null;
    const r=it.getBoundingClientRect(); return {x:r.left+r.width/2, y:r.top+r.height/2, w:r.width, h:r.height, top:r.top, bottom:r.bottom, left:r.left};
  },[lv,text]);
}
async function state(page){
  return page.evaluate(()=>({
    colPath: colPath && colPath.map(id=>{const n=DB.nodes.find(x=>x.id===id); return n?n.name:id;}),
    cols: [...document.querySelectorAll('.col')].map(c=>({lv:c.dataset.lv, title:(c.querySelector('.col-title')||{}).textContent, scrollTop:c.scrollTop, scrollH:c.scrollHeight, clientH:c.clientHeight, left:Math.round(c.getBoundingClientRect().left), width:c.clientWidth})),
    scrollY: window.scrollY, wrapLeft: Math.round((document.getElementById('colsWrap')||{}).scrollLeft), wrapTop: Math.round((document.getElementById('colsWrap')||{getBoundingClientRect:()=>({top:0})}).getBoundingClientRect().top), wrapH: (document.getElementById('colsWrap')||{}).clientHeight,
    hover: colHover
  }));
}
// prejde na položku ľudsky (viac krokov) a počká, kým sa otvorí
async function go(page, lv, text, wait=450){
  const p = await item(page, lv, text); if(!p) throw new Error('nenašiel '+lv+' '+text);
  await page.mouse.move(p.x, p.y, {steps:6}); await page.waitForTimeout(wait); return p;
}
async function shot(page, name){ await page.screenshot({path: OUT+name+'.png'}); }
module.exports = {open, cols, item, state, go, shot, OUT};
