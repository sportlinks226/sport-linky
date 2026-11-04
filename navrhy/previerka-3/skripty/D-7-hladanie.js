// D-7-hladanie.js — dopad bodu 26 (len nové čísla): čas vykreslenia hľadania pri písaní, dlhé úlohy; mobil, CPU 4×
const L = require('./D-lib.js');
(async()=>{
  const browser = await L.chromium.launch();
  const ctx = await browser.newContext(L.MOBILE); await L.blockExternal(ctx, []); const page = await ctx.newPage();
  await page.addInitScript(`window.__lt=[]; try{ new PerformanceObserver(l=>l.getEntries().forEach(e=>__lt.push({t:e.startTime,d:e.duration}))).observe({type:'longtask',buffered:true}); }catch(e){}`);
  const cdp = await L.throttle(page, {cpu:4, net:null});
  await page.goto(L.SK + '/', {waitUntil:'load'}); await page.waitForTimeout(6000);
  await page.evaluate(()=>{ __lt.length=0; });
  console.log('| Hľadaný text | čas od zadania po výsledky (ms, vrátane 200 ms čakania) | výsledkov (kariet) | DOM prvkov v #main | dlhé úlohy počas (ms) |'); console.log('|---|---:|---:|---:|---|');
  for(const q of ['a','ar','ars','arse','arsen','slovan','real','liverpool','x','žilina','ko']){
    await page.evaluate(()=>{ __lt.length=0; document.getElementById('srch').value=''; });
    const t = await page.evaluate(async (q)=>{ const t0=performance.now(); const i=document.getElementById('srch'); i.value=q; i.dispatchEvent(new Event('input',{bubbles:true})); await new Promise(r=>{ const mo=new MutationObserver(()=>{ mo.disconnect(); requestAnimationFrame(()=>requestAnimationFrame(r)); }); mo.observe(document.getElementById('main'),{childList:true,subtree:true}); setTimeout(r,5000); }); const t1=performance.now(); return {ms:Math.round(t1-t0), n:document.querySelectorAll('#main .card-link').length, dom:document.getElementById('main').getElementsByTagName('*').length, lt:__lt.map(x=>Math.round(x.d))}; }, q);
    console.log(`| ${q} | ${t.ms} | ${t.n} | ${t.dom} | ${t.lt.join(', ')||'-'} (spolu ${t.lt.reduce((a,b)=>a+b,0)}) |`);
  }
  // písanie po písmenách „liverpool“ (každé písmeno = input, 200 ms debounce) — koľko dlhých úloh celkom
  await page.evaluate(()=>{ __lt.length=0; document.getElementById('srch').value=''; document.getElementById('srch').dispatchEvent(new Event('input',{bubbles:true})); });
  await page.waitForTimeout(800); await page.evaluate(()=>{ __lt.length=0; });
  await page.focus('#srch'); const t0=Date.now(); await page.keyboard.type('liverpool', {delay:150}); await page.waitForTimeout(1500);
  const lt = await page.evaluate(()=>__lt.map(x=>Math.round(x.d)));
  console.log(`\npísanie „liverpool“ po písmenách (150 ms/znak): dlhé úlohy ${lt.length}×, spolu ${lt.reduce((a,b)=>a+b,0)} ms: ${lt.join(', ')}`);
  // navigácia dlaždicou (nie hľadanie) — pre porovnanie: čas render() priečinka Anglicko a Futbal (CPU 4×)
  const nav = await page.evaluate(async()=>{ const out=[]; for(const id of ['f_fut','f_fut_klu','f_fut_klu_eu','f_fut_klu_eu_ang',null]){ __lt.length=0; const t0=performance.now(); navigate(id); await new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r))); out.push((id||'domov')+': '+Math.round(performance.now()-t0)+' ms ('+document.querySelectorAll('#main .card-root,#main .card-folder,#main .card-link').length+' dlaždíc)'); } return out; });
  console.log('navigate() + vykreslenie (CPU 4×): '+nav.join(' | '));
  await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});
