// klik, Späť/Vpred, priamy príchod, prepnutie režimu, reload, hľadanie, resize, výkon
const L = require('./lib');
(async()=>{
  const {browser,page,errs,ctx} = await L.open(1280,800);
  await L.cols(page);
  await L.hoverItem(page,0,'Futbal',1100); await L.hoverItem(page,1,'Kluby',1100); await L.hoverItem(page,2,'Európa',1100);
  // klik na priečinok Anglicko
  const pa = await L.item(page,3,'Anglicko'); await page.mouse.click(pa.x,pa.y); await page.waitForTimeout(500);
  let s = await L.state(page); console.log('KLIK Anglicko: url', await page.evaluate(()=>location.pathname), 'colPath', JSON.stringify(s.colPath), 'scrollY', s.scrollY, 'h1', await page.evaluate(()=>document.querySelector('#breadcrumb .bc-h')?.textContent.trim()));
  await L.shot(page,'nav-01-klik-anglicko');
  // hover ďalej PL, potom Späť
  await L.hoverItem(page,4,'Premier',1100); s=await L.state(page); console.log('hover PL: colPath', JSON.stringify(s.colPath), 'url', await page.evaluate(()=>location.pathname));
  await page.goBack(); await page.waitForTimeout(600); s=await L.state(page); console.log('SPÄŤ: url', await page.evaluate(()=>location.pathname), 'colPath', JSON.stringify(s.colPath), 'curId name', await page.evaluate(()=>curId && DB.nodes.find(n=>n.id===curId).name));
  await L.shot(page,'nav-02-spat');
  await page.goForward(); await page.waitForTimeout(600); s=await L.state(page); console.log('VPRED: url', await page.evaluate(()=>location.pathname), 'colPath', JSON.stringify(s.colPath));
  // klik na linku (target _blank) — otvorí novú kartu?
  await L.hoverItem(page,3,'Anglicko',1100); await L.hoverItem(page,4,'Premier',1100);
  const plnk = await page.evaluate(()=>{const a=document.querySelector('.col[data-lv="5"] .cit.lnk'); const r=a.getBoundingClientRect(); return {x:r.left+r.width/2,y:r.top+r.height/2,t:a.textContent.trim(),href:a.href};});
  await page.mouse.move(plnk.x,plnk.y); await page.waitForTimeout(300);
  const det = await page.evaluate(()=>document.getElementById('colDetail').innerText.slice(0,120).replace(/\n/g,' / '));
  console.log('HOVER linka', plnk.t, '→ panel:', det);
  await L.shot(page,'nav-03-panel-popis');
  const [np] = await Promise.all([ctx.waitForEvent('page',{timeout:3000}).catch(()=>null), page.mouse.click(plnk.x,plnk.y)]);
  console.log('KLIK linka → nová karta:', np ? np.url() : 'NIE', '| url ostala', await page.evaluate(()=>location.pathname));
  if(np) await np.close();
  // prepnutie na dlaždice v hĺbke a späť
  await page.click('#vSwitch button[data-mode=tiles]'); await page.waitForTimeout(300);
  console.log('→ Dlaždice: url', await page.evaluate(()=>location.pathname), 'cols-mode', await page.evaluate(()=>document.querySelector('main').classList.contains('cols-mode')), 'dlaždíc', await page.evaluate(()=>document.querySelectorAll('#main .tile, #main .card, #main a').length));
  await L.shot(page,'nav-04-dlazdice-v-hlbke');
  await page.click('#vSwitch button[data-mode=cols]'); await page.waitForTimeout(300); s=await L.state(page);
  console.log('→ Stĺpce späť: colPath', JSON.stringify(s.colPath), 'stĺpcov', s.cols.length, 'zbalených', s.cols.filter(c=>c.collapsed).length, 'wrapLeft', s.wrapLeft, 'scrollY', s.scrollY);
  await L.shot(page,'nav-05-stlpce-v-hlbke-po-prepnuti');
  // reload v hĺbke (statická stránka + localStorage cols)
  await page.reload(); await page.waitForTimeout(300);
  const early = await page.evaluate(()=>({cols: document.querySelector('main')?.classList.contains('cols-mode'), partial: typeof DB!=='undefined' && DB._partial, loading: !!document.querySelector('#main .loading, #main .nacitavam'), mainText: document.getElementById('main').innerText.slice(0,80).replace(/\n/g,' / ')}));
  await page.waitForFunction(()=>typeof DB!=='undefined' && !DB._partial); await page.waitForTimeout(300); s=await L.state(page);
  console.log('RELOAD v hĺbke: skoro po načítaní', JSON.stringify(early), '| po dátach colPath', JSON.stringify(s.colPath), 'stĺpcov', s.cols.length, 'scrollY', s.scrollY);
  await L.shot(page,'nav-06-reload-v-hlbke');
  // priamy príchod na adresu
  await page.goto('http://localhost:8123/hokej/kluby/severna-amerika/'); await page.waitForTimeout(200);
  const early2 = await page.evaluate(()=>({cols: document.querySelector('main')?.classList.contains('cols-mode'), partial: typeof DB!=='undefined' && DB._partial, mainText: document.getElementById('main').innerText.slice(0,100).replace(/\n/g,' / ')}));
  await page.waitForFunction(()=>typeof DB!=='undefined' && !DB._partial); await page.waitForTimeout(300); s=await L.state(page);
  console.log('PRIAMY PRÍCHOD /hokej/kluby/severna-amerika/: skoro', JSON.stringify(early2), '| colPath', JSON.stringify(s.colPath), 'stĺpcov', s.cols.length);
  await L.shot(page,'nav-07-priamy-prichod');
  // hľadanie počas stĺpcov
  await page.fill('#srch','arsenal'); await page.waitForTimeout(500);
  console.log('HĹADANIE "arsenal": cols-mode', await page.evaluate(()=>document.querySelector('main').classList.contains('cols-mode')), 'colsWrap', await page.evaluate(()=>!!document.getElementById('colsWrap')), 'main začiatok:', await page.evaluate(()=>document.getElementById('main').innerText.slice(0,60).replace(/\n/g,' / ')));
  await L.shot(page,'nav-08-hladanie-v-stlpcoch');
  await page.fill('#srch',''); await page.waitForTimeout(500); s=await L.state(page); console.log('  po zmazaní hľadania: colPath', JSON.stringify(s.colPath), 'stĺpcov', s.cols.length);
  // resize okna: 1280 → 640 (mobil) → 1280
  await page.setViewportSize({width:640,height:800}); await page.waitForTimeout(400);
  console.log('RESIZE 640: cols-mode', await page.evaluate(()=>document.querySelector('main').classList.contains('cols-mode')), 'vswitch viditeľný', await page.evaluate(()=>getComputedStyle(document.getElementById('vSwitch')).display));
  await page.setViewportSize({width:1280,height:800}); await page.waitForTimeout(400); s=await L.state(page);
  console.log('RESIZE späť 1280: cols-mode', await page.evaluate(()=>document.querySelector('main').classList.contains('cols-mode')), 'colPath', JSON.stringify(s.colPath));
  // Aktuálne priečinok v stĺpcoch
  const pak = await L.item(page,0,'Aktu'); if(pak){ await page.mouse.move(pak.x,pak.y); await page.waitForTimeout(1100); s=await L.state(page); console.log('AKTUÁLNE v stĺpcoch: colPath', JSON.stringify(s.colPath), 'položiek', await page.evaluate(()=>document.querySelectorAll('.col[data-lv="1"] .cit').length), 'panel', await page.evaluate(()=>document.getElementById('colDetail').innerText.slice(0,60).replace(/\n/g,' / '))); await L.shot(page,'nav-09-aktualne'); } else console.log('Aktuálne nie je v koreňovom stĺpci (noTileSk?)', await page.evaluate(()=>[...document.querySelectorAll('.col[data-lv="0"] .cit .nm')].map(e=>e.textContent)));
  console.log('konzola (bez blokovaných reklám):', errs.filter(e=>!/ERR_FAILED|ERR_BLOCKED/.test(e)));
  await browser.close();
})().catch(e=>{console.error(e); process.exit(1);});
