const { chromium } = require('playwright');
const OUT = '/home/user/sport-linky/navrhy/stlpce-snimky/';
const URL = 'http://localhost:8123/';
async function open(w=1280,h=800,extra={}){
  const browser = await chromium.launch();
  const ctx = await browser.newContext({viewport:{width:w,height:h}, deviceScaleFactor:1, ...extra});
  const page = await ctx.newPage();
  const errs=[]; page.on('console', m=>{ if(['error','warning'].includes(m.type())) errs.push(m.type()+': '+m.text()); });
  page.on('pageerror', e=>errs.push('pageerror: '+e.message));
  await ctx.route(/tipsport|zgo\.at/, r=>r.abort()); await page.goto(URL); await page.waitForFunction(()=>typeof DB!=='undefined' && DB.nodes && DB.nodes.length>1000 && !DB._partial, null, {timeout:30000});
  return {browser, ctx, page, errs};
}
async function cols(page){ await page.click('#vSwitch button[data-mode=cols]'); await page.waitForSelector('#colsWrap'); }
// nájde položku podľa textu v stĺpci lv a vráti stred
async function item(page, lv, text){
  return page.evaluate(([lv,text])=>{
    const col=document.querySelector(`.col[data-lv="${lv}"]`); if(!col) return null;
    const it=[...col.querySelectorAll('.cit')].find(a=>a.querySelector('.nm').textContent.trim().startsWith(text)); if(!it) return null;
    const r=it.getBoundingClientRect(); return {x:r.left+r.width/2, y:r.top+r.height/2, w:r.width, h:r.height, top:r.top, bottom:r.bottom};
  },[lv,text]);
}
async function state(page){
  return page.evaluate(()=>({
    colPath: colPath && colPath.map(id=>{const n=DB.nodes.find(x=>x.id===id); return n?n.name:id;}),
    cols: [...document.querySelectorAll('.col')].map(c=>({lv:c.dataset.lv, collapsed:c.classList.contains('collapsed'), title:(c.querySelector('.col-title,.col-vt')||{}).textContent, scrollTop:c.scrollTop, scrollH:c.scrollHeight, clientH:c.clientHeight, left:Math.round(c.getBoundingClientRect().left)})),
    scrollY: window.scrollY, wrapLeft: (document.getElementById('colsWrap')||{}).scrollLeft,
    hover: colHover, edge: !!_edgeCol
  }));
}
// pri wait >= 1000 sa po čakaní overí, že priečinok naozaj ostal otvorený (chyba P1a ho môže
// nahradiť tým, čo sa po auto-posune stránky ocitlo pod kurzorom) — vtedy sa prejde znova
async function hoverItem(page, lv, text, wait=300){
  let p = await item(page, lv, text); if(!p) throw new Error('nenašiel '+lv+' '+text);
  await page.mouse.move(p.x, p.y); await page.waitForTimeout(wait);
  for(let k=0; wait>=1000 && k<3; k++){
    const ok = await page.evaluate(([lv,text])=>{const n=DB.nodes.find(x=>x.id===colPath[lv]); return n && n.name.startsWith(text);},[lv,text]);
    if(ok) break;
    p = await item(page, lv, text); if(!p) throw new Error('nenašiel '+lv+' '+text);
    await page.mouse.move(p.x+1, p.y+1); await page.waitForTimeout(wait);
  }
  return p;
}
async function shot(page, name){ await page.screenshot({path: OUT+name+'.png'}); }
module.exports = {open, cols, item, state, hoverItem, shot, OUT};
