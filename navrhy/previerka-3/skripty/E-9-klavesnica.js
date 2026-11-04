// E-9-klavesnica.js — klávesnica (Tab poradie, viditeľný focus, Escape, skip link), čítačka (landmarks, nadpisy, aria-live, alt, lang), reduced-motion, zoom 200 %
const L = require('./D-lib.js');
(async()=>{
  const browser = await L.chromium.launch();
  for(const [name, url, dev] of [['domov desktop', L.SK+'/', L.DESKTOP], ['sekcia Anglicko desktop', L.SK+'/futbal/kluby/europa/anglicko/', L.DESKTOP], ['liga Championship mobil', L.SK+'/futbal/kluby/europa/anglicko/championship/', L.MOBILE]]){
    const ctx = await browser.newContext(dev); await L.blockExternal(ctx, []); const page = await ctx.newPage();
    await page.goto(url, {waitUntil:'load'}); await page.waitForTimeout(4000);
    const sr = await page.evaluate(()=>{
      const q=s=>[...document.querySelectorAll(s)];
      const vis=e=>{const cs=getComputedStyle(e);return cs.display!=='none'&&cs.visibility!=='hidden'&&e.getClientRects().length>0;};
      const hs=q('h1,h2,h3,h4').filter(vis).map(h=>h.tagName+': '+h.textContent.trim().replace(/\s+/g,' ').slice(0,50));
      const lm={header:q('header,[role=banner]').filter(vis).length, nav:q('nav,[role=navigation]').filter(vis).map(n=>n.getAttribute('aria-label')||'(bez aria-label)'), main:q('main,[role=main]').filter(vis).length, footer:q('footer,[role=contentinfo]').filter(vis).length, search:q('[role=search]').length, region:q('[role=region],section[aria-label]').length};
      const live=q('[aria-live]').map(e=>e.id+'='+e.getAttribute('aria-live')+(e.textContent.trim()?' („'+e.textContent.trim().slice(0,40)+'“)':' (prázdne)'));
      const imgs=q('img'); const noAlt=imgs.filter(i=>!i.hasAttribute('alt')).length; const emptyAlt=imgs.filter(i=>i.getAttribute('alt')==='').length;
      const skip=q('a[href^="#"]').filter(a=>/skip|preskoč|obsah|content/i.test(a.textContent+a.className)).map(a=>a.textContent.trim());
      const firstFocusable=q('a[href],button,input,[tabindex]:not([tabindex="-1"])').filter(vis).slice(0,8).map(e=>e.tagName.toLowerCase()+(e.id?'#'+e.id:'')+(e.className&&typeof e.className==='string'?'.'+e.className.trim().split(/\s+/)[0]:'')+' „'+(e.getAttribute('aria-label')||e.textContent.trim().replace(/\s+/g,' ').slice(0,25))+'“');
      const tiles=q('#main .card-root, #main .card-folder').filter(vis); const tileInfo=tiles.slice(0,3).map(t=>t.tagName+' tabindex='+t.getAttribute('tabindex')+' role='+t.getAttribute('role')+' onkeydown='+(t.getAttribute('onkeydown')||t.onkeydown?'áno':'nie'));
      const emojiAria=q('#main .c-icon, #main .cf-icon').slice(0,3).map(e=>e.tagName+' aria-hidden='+e.getAttribute('aria-hidden')+' role='+e.getAttribute('role'));
      const motion=[...document.styleSheets].flatMap(s=>{try{return [...s.cssRules]}catch(e){return []}}).filter(r=>r.media&&/reduced-motion/.test(r.media.mediaText)).map(r=>r.cssText.slice(0,100));
      return {lang:document.documentElement.lang, title:document.title, hs, lm, live, imgs:imgs.length, noAlt, emptyAlt, skip, firstFocusable, tiles:tiles.length, tileInfo, emojiAria, motion:motion.length, motionRules:motion};
    });
    console.log(`\n### ${name}`); console.log(JSON.stringify(sr, null, 1).replace(/\n\s*/g,' ').replace(/\],/g,'],\n'));
    // Tab poradie — prvých 25 zastávok + viditeľnosť focusu (outline / box-shadow / border zmena)
    const stops=[]; await page.keyboard.press('Tab');
    for(let i=0;i<28;i++){
      const info = await page.evaluate(()=>{ const e=document.activeElement; if(!e||e===document.body) return 'BODY'; const cs=getComputedStyle(e); const r=e.getBoundingClientRect();
        const focusVisible = e.matches(':focus-visible'); const ring = (cs.outlineStyle!=='none' && parseFloat(cs.outlineWidth)>0) || cs.boxShadow!=='none';
        return (e.tagName.toLowerCase()+(e.id?'#'+e.id:'')+(e.className&&typeof e.className==='string'?'.'+e.className.trim().split(/\s+/)[0]:''))+' „'+((e.getAttribute('aria-label')||e.textContent.trim()).replace(/\s+/g,' ').slice(0,22))+'“ '+(r.width>0&&r.height>0?'':'[MIMO OBRAZOVKY/skrytý] ')+(ring?'✓focus':'✗BEZ viditeľného focusu')+(e.closest('.mo')?' [V ZATVORENOM OKNE .mo]':''); });
      stops.push(info); await page.keyboard.press('Tab');
    }
    console.log('Tab poradie: '+stops.map((s,i)=>(i+1)+'. '+s).join(' | '));
    // Enter na dlaždici (klávesnicou) — otvorí sekciu?
    const before = page.url();
    const tile = await page.$('#main .card-root, #main .card-folder');
    if(tile){ await tile.focus().catch(()=>{}); const focused = await page.evaluate(()=>document.activeElement && document.activeElement.className); await page.keyboard.press('Enter'); await page.waitForTimeout(800); console.log(`Enter na dlaždici (focus bol na „${focused}“): adresa ${before} → ${page.url()} ${page.url()!==before?'(otvorilo sa ✓)':'(NIČ ✗)'}`); }
    // Escape — zavrie hľadanie / vráti sa?
    await page.fill('#srch','slovan'); await page.waitForTimeout(900); const r1 = await page.evaluate(()=>document.querySelectorAll('#main .card-link').length);
    await page.focus('#srch'); await page.keyboard.press('Escape'); await page.waitForTimeout(600); const r2 = await page.evaluate(()=>({v:document.getElementById('srch').value, n:document.querySelectorAll('#main .card-link').length}));
    console.log(`Escape v hľadaní: pred ${r1} výsledkov, po Escape hodnota „${r2.v}“, výsledkov ${r2.n} ${r2.v===''?'(vyčistené ✓)':'(nič sa nestalo)'}`);
    // reduced-motion: animácia kariet?
    await page.emulateMedia({reducedMotion:'reduce'}); await page.fill('#srch',''); await page.waitForTimeout(500);
    const anim = await page.evaluate(()=>{ const e=document.querySelector('#main .anim > *'); return e ? getComputedStyle(e).animationName : 'bez .anim'; });
    console.log(`prefers-reduced-motion: animácia kariet = ${anim}`);
    await page.emulateMedia({reducedMotion:'no-preference'});
    await ctx.close();
  }
  // zoom 200 % (desktop 1280 → viditeľná šírka 640 CSS px) — vodorovný scroll? prekrývanie?
  for(const [name,url] of [['domov', L.SK+'/'], ['liga Championship', L.SK+'/futbal/kluby/europa/anglicko/championship/']]){
    const ctx = await browser.newContext({viewport:{width:640,height:360}, deviceScaleFactor:2}); await L.blockExternal(ctx, []); const page = await ctx.newPage();
    await page.goto(url,{waitUntil:'load'}); await page.waitForTimeout(3500);
    const z = await page.evaluate(()=>({sw:document.documentElement.scrollWidth, iw:innerWidth, hdr: document.querySelector('header')&&document.querySelector('header').getBoundingClientRect().height}));
    console.log(`zoom 200 % (${name}, 1280 px okno): scrollWidth ${z.sw} / innerWidth ${z.iw} ${z.sw>z.iw?'VODOROVNÝ SCROLL ✗':'bez vodorovného scrollu ✓'}, hlavička ${Math.round(z.hdr)} px`);
    await page.screenshot({path:'/tmp/claude-0/-home-user/eed11a80-25e6-51b3-88cc-2253d64cd8b2/scratchpad/snimky/E-6-zoom200-'+name.split(' ')[0]+'.png'});
    await ctx.close();
  }
  await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});
