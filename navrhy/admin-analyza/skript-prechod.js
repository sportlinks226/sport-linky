const { chromium, devices } = require('playwright');
const S = process.env.S, OUT = S + '/shots/', log = {};
async function login(page, base, path){
  await page.goto(base + path + '#admin'); 
  await page.waitForSelector('#pwIn', {state:'visible'});
  await page.fill('#pwIn', 'test'); await page.press('#pwIn', 'Enter');
  await page.waitForFunction(()=>window.adminMode===true || document.body.classList.contains('admin-mode'), null, {timeout:20000});
  await page.waitForTimeout(800);
}
(async()=>{
  const br = await chromium.launch();
  // ===== SK desktop
  const ctx = await br.newContext({viewport:{width:1366,height:768}, acceptDownloads:true, locale:'sk-SK'});
  const page = await ctx.newPage(); await ctx.route(/tipsport|zgo\.at|goatcounter/, r=>r.abort());
  const dialogs = []; page.on('dialog', async d=>{ dialogs.push(d.message()); await d.accept(); });
  const errs=[]; page.on('pageerror', e=>errs.push(String(e)));
  const B='http://127.0.0.1:8123';
  await login(page, B, '/spravy-media/europa/slovensko/');
  await page.screenshot({path: OUT+'A-01-admin-priecinok-pc.png'});
  log.cardsBefore = await page.evaluate(()=>getChildren('f_med_eu_sk').map(n=>[n.name,n.url,n.order]));
  // pridanie
  await page.click('#adminBar >> text=Pridať sem');
  await page.waitForTimeout(300);
  log.addFields = await page.evaluate(()=>[...document.querySelectorAll('#nodeMo input')].filter(i=>i.offsetParent).map(i=>i.id));
  log.focusAfterOpen = await page.evaluate(()=>document.activeElement.id);
  await page.screenshot({path: OUT+'A-02-okno-pridat-prazdne-pc.png'});
  // len adresa bez https
  await page.fill('#nUrl', 'sportnet.sme.sk');
  dialogs.length=0; await page.click('#nodeMo >> text=Uložiť'); await page.waitForTimeout(200);
  log.saveOnlyUrl = dialogs.slice();
  await page.fill('#nName', 'Sportnet');
  dialogs.length=0; await page.click('#nodeMo >> text=Uložiť'); await page.waitForTimeout(200);
  log.saveNoHttps = dialogs.slice();
  // duplicita — adresa, ktorá už v priečinku je
  const dupUrl = log.cardsBefore.find(x=>x[1])[1];
  await page.fill('#nUrl', dupUrl); await page.fill('#nName', 'Duplicitná skúška'); await page.fill('#nDesc','test');
  await page.screenshot({path: OUT+'A-03-okno-vyplnene-pc.png'});
  dialogs.length=0; await page.click('#nodeMo >> text=Uložiť'); await page.waitForTimeout(400);
  log.saveDup = dialogs.slice();
  log.after = await page.evaluate(()=>{const c=getChildren('f_med_eu_sk'); const n=c[c.length-1]; return {count:c.length,last:n}});
  await page.evaluate(()=>window.scrollTo(0,document.body.scrollHeight)); await page.waitForTimeout(300);
  await page.screenshot({path: OUT+'A-04-nova-linka-na-konci-pc.png'});
  // duplicita cez celé dáta: adresa z iného priečinka
  log.dupGlobalExample = await page.evaluate(()=>{const m=new Map();DB.nodes.filter(n=>n.type==='link').forEach(n=>{const k=n.url.replace(/^https?:\/\/(www\.)?/,'').replace(/\/$/,'').toLowerCase();(m.get(k)||m.set(k,[]).get(k)).push(n.id)});let c=0;for(const v of m.values()) if(v.length>1)c++;return c});
  // úprava
  const newId = log.after.last.id;
  await page.evaluate(id=>openEdit(id), newId); await page.waitForTimeout(300);
  await page.screenshot({path: OUT+'A-05-okno-upravit-pc.png'});
  log.editFields = await page.evaluate(()=>[...document.querySelectorAll('#nodeMo input')].filter(i=>i.offsetParent).map(i=>i.id));
  await page.click('#nodeMo >> text=Zrušiť');
  // ▲ čas: presun poslednej položky Európy na začiatok
  await page.evaluate(()=>navigate('f_med_eu')); await page.waitForTimeout(800);
  const t = await page.evaluate(async()=>{const c=getChildren('f_med_eu');const id=c[c.length-1].id;const t0=performance.now();let k=0;
     for(let i=0;i<c.length-1;i++){moveNode(id,-1);k++;} return {clicks:k, ms:Math.round(performance.now()-t0), pos:getChildren('f_med_eu').findIndex(n=>n.id===id)}});
  log.moveLastToTop = t;
  // pomoc: koľko dlaždíc vidno a kde sú tlačidlá
  await page.screenshot({path: OUT+'B-01-sipky-na-kartach-pc.png'});
  // domov — hlavné sekcie
  await page.evaluate(()=>navigate(null)); await page.waitForTimeout(800);
  await page.screenshot({path: OUT+'B-02-domov-admin-pc.png'});
  log.homeHasArrows = await page.evaluate(()=>document.querySelectorAll('.card-admin-bar').length);
  // publikovanie
  dialogs.length=0;
  try{ const [dl] = await Promise.all([page.waitForEvent('download',{timeout:15000}), page.click('#adminBar >> text=Publikovať')]);
  const p = S+'/dl/'+dl.suggestedFilename(); await dl.saveAs(p);
  log.publish = {file: dl.suggestedFilename(), size: require('fs').statSync(p).size}; }catch(e){ log.publish={err:String(e).slice(0,100), dialogs:dialogs.slice(), lite: await page.evaluate(()=>isLiteDB()), ver: await page.evaluate(()=>DB.version)}; }
  await page.screenshot({path: OUT+'C-01-po-publikovani-pc.png'});
  // Aktuálne hromadné
  await page.click('#adminBar >> text=Aktuálne'); await page.waitForTimeout(800);
  await page.screenshot({path: OUT+'A-06-aktualne-zoznam-pc.png'});
  await page.evaluate(()=>openAktBulk()); await page.waitForTimeout(300);
  await page.screenshot({path: OUT+'A-07-aktualne-hromadne-pc.png'});
  log.dialogsAll = dialogs; log.errs = errs;
  await ctx.close();

  // ===== EN desktop
  const ce = await br.newContext({viewport:{width:1366,height:768}, locale:'en-US'});
  const pe = await ce.newPage(); const dE=[]; pe.on('dialog', async d=>{dE.push(d.message()); await d.accept();});
  const E='http://127.0.0.1:8124';
  await login(pe, E, '/');
  const enPath = await pe.evaluate(()=>{const p=getPath('f_med_eu');return location.pathname});
  log.enRoots = await pe.evaluate(()=>getChildren(null).map(n=>nName(n)));
  // EN Európa v Správach — abeceda?
  log.enMedEuAlpha = await pe.evaluate(()=>enAlphaFolder('f_med_eu'));
  log.enMedEuFirst = await pe.evaluate(()=>getChildren('f_med_eu').slice(0,6).map(n=>nName(n)));
  await pe.evaluate(()=>{const c=getChildren('f_med_eu'); moveNode(c[1].id,-1);});
  log.enAlphaAlert = dE.slice();
  await ce.close();

  // ===== iPhone 13
  const cm = await br.newContext({...devices['iPhone 13'], locale:'sk-SK'});
  const pm = await cm.newPage(); const dM=[]; pm.on('dialog', async d=>{dM.push(d.message()); await d.accept();});
  await login(pm, B, '/spravy-media/europa/slovensko/');
  await pm.screenshot({path: OUT+'D-01-admin-priecinok-iphone.png'});
  log.mobileBar = await pm.evaluate(()=>{const r=document.getElementById('adminBar').getBoundingClientRect();return {h:Math.round(r.height)}});
  log.mobileBtn = await pm.evaluate(()=>{const b=document.querySelector('.card-admin-bar .ibtn');if(!b)return null;const r=b.getBoundingClientRect();return [Math.round(r.width),Math.round(r.height)]});
  log.mobileInputFont = await pm.evaluate(()=>getComputedStyle(document.getElementById('nUrl')).fontSize);
  await pm.evaluate(()=>openAdd()); await pm.waitForTimeout(400);
  await pm.screenshot({path: OUT+'D-02-okno-pridat-iphone.png'});
  log.mobileModal = await pm.evaluate(()=>{const b=document.querySelector('#nodeMo .mo-box').getBoundingClientRect();const s=document.querySelector('#nodeMo .btn-p').getBoundingClientRect();return {boxH:Math.round(b.height),saveBottom:Math.round(s.bottom),vh:innerHeight}});
  await pm.evaluate(()=>closeMo('nodeMo'));
  await pm.evaluate(()=>navigate(null)); await pm.waitForTimeout(800);
  await pm.screenshot({path: OUT+'D-03-domov-admin-iphone.png'});
  log.dM = dM;
  await cm.close(); await br.close();
  require('fs').writeFileSync(S+'/a1.log.json', JSON.stringify(log,null,1));
  console.log(JSON.stringify(log,null,1).slice(0,6000));
})().catch(e=>{console.error(e);process.exit(1)});
