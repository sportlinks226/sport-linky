#!/usr/bin/env node
// Porovnanie appka ↔ statika (generator.py) pre VŠETKY priečinky + skutočné prevzatie na vzorke.
// Použitie: node J-porovnanie.js <base> <siteDir> <out.json> <vzorka> [sportyPrefixy,...]
//   napr. node J-porovnanie.js http://127.0.0.1:8123/ .../site-sk out-sk.json 300 tenis,zimne-sporty
const fs = require('fs'), path = require('path');
const { chromium } = require('playwright');
const [,, BASE, SITE, OUT, VZ, SPORTY] = process.argv;
const vzorka = parseInt(VZ || '300', 10);
const sporty = (SPORTY || '').split(',').filter(Boolean);

function dekod(s){ return s.replace(/&#x27;/g,"'").replace(/&quot;/g,'"').replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&#39;/g,"'").replace(/&amp;/g,'&'); }
function statika(cesta){
  const f = path.join(SITE, ...cesta.split('/').filter(Boolean), 'index.html');
  if(!fs.existsSync(f)) return null;
  const h0 = fs.readFileSync(f, 'utf8');
  const pb = h0.match(/id="pageBoot">(.*?)<\/script>/s);
  let id = null; try{ if(pb){ const j = JSON.parse(pb[1].replace(/\\u003c/g,'<').replace(/\\u003e/g,'>').replace(/\\u0026/g,'&')); id = j.full && j.full[0]; } }catch(e){}
  const h = h0.replace(/<script[\s\S]*?<\/script>/g, '');
  const g = (re) => { const m = h.match(re); return m ? dekod(m[1]).trim() : ''; };
  const title = g(/<title>([^<]*)<\/title>/);
  const meta = g(/<meta name="description" content="([^"]*)">/);
  const canon = g(/<link rel="canonical" href="([^"]*)">/);
  const h1 = g(/<h1>(.*?)<\/h1>/s).replace(/<span class="ic">.*?<\/span>/s,'').replace(/<[^>]+>/g,'').trim();
  const hl = (h.match(/<link rel="alternate" hreflang="/g) || []).length;
  const sek = (lbl) => { const m = h.match(new RegExp('<h2>(?:'+lbl+')</h2>([\\s\\S]*?)(?=<h2>|<div class="promo-warn"|<a class="appbtn"|<p class="live-intro")')); return m ? m[1] : ''; };
  const fold = sek('Kategórie|Categories'), link = sek('Linky|Links');
  const cistyNm = (x) => dekod(x.replace(/<span aria-hidden="true">[^<]*<\/span>\s*/g,'').replace(/<img[^>]*>\s*/g,'').replace(/<[^>]+>/g,'')).trim();
  const foldNames = [...fold.matchAll(/<div class="nm">(.*?)<\/div>/gs)].map(m=>cistyNm(m[1]));
  const nLinks = (link.match(/<a class="card"/g) || []).length;
  const live = (h.match(/<div class="grid live-grid">([\s\S]*?)<p class="live-intro"|<div class="grid live-grid">([\s\S]*?)<a class="appbtn"/) || []);
  const nLive = ((live[1] || live[2] || '').match(/<a class="card"/g) || []).length;
  return { title, meta, canon, h1, id, foldNames, nLinks: nLinks || nLive, hreflang: hl, bytes: h0.length };
}

// Beží v prehliadači: pre všetky viditeľné priečinky vypočíta to, čo appka nastaví po prevzatí.
const APP_JS = `() => {
  const vidno = new Set(), zas = [null];
  while(zas.length){ const p = zas.pop(); for(const k of getChildren(p)){ if(k.type==='folder' && !vidno.has(k.id)){ vidno.add(k.id); zas.push(k.id); } } }
  const povodny = curId, out = [];
  const m = document.querySelector('meta[name="description"]');
  for(const n of DB.nodes){
    if(n.type !== 'folder' || !vidno.has(n.id)) continue;
    const r = {id:n.id, name:nName(n), live:n.id===LIVE_ID, empty:emptyFolder(n), url:urlForId(n.id)};
    curId = n.id; CESTA_CELA = true; updateHead();
    r.title = document.title; r.meta = m ? m.content : ''; const l = document.querySelector('link[rel="canonical"]'); r.canon = l ? l.href : '';
    r.h1 = nName(n);
    const kids = tileKids(n.id);
    r.foldNames = kids.filter(k=>k.type==='folder').map(k=>nName(k));
    r.nLinks = kids.filter(k=>k.type==='link').length;
    out.push(r);
  }
  curId = povodny; updateHead();
  return out;
}`;

(async () => {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: {width:1366, height:900} });
  await ctx.route('**/*', r => { const u = r.request().url(); if(/goatcounter|zgo\.at|tipsport|google\.com|yandex/.test(u)) return r.abort(); r.continue(); });
  const page = await ctx.newPage();
  const jsErr = []; page.on('pageerror', e => jsErr.push(String(e)));
  await page.goto(BASE, { waitUntil: 'load' });
  await page.waitForFunction(() => typeof DB !== 'undefined' && DB && DB.nodes && DB.nodes.length > 100 && !DB._partial, null, { timeout: 120000 });
  try{ await page.waitForLoadState('networkidle', { timeout: 15000 }); }catch(e){}
  await page.waitForTimeout(1500);
  const app = await page.evaluate('(' + APP_JS + ')()');
  const base = await page.evaluate(() => BASE_PATH);
  // sitemap
  const sm = fs.readFileSync(path.join(SITE, 'sitemap.xml'), 'utf8');
  const locs = [...sm.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => decodeURIComponent(new URL(m[1]).pathname));
  const genByPath = {};
  for(const p of locs){ if(p === '/') continue; const s = statika(p); if(s) genByPath[p] = s; }
  const genById = {}; for(const [p, s] of Object.entries(genByPath)) if(s.id) genById[s.id] = { p, ...s };

  const roz = [], stat = { zhoda:0, rozdiel:0, chybaStatika:0, chybaAppka:0, prazdne:0 };
  const appPaths = new Set();
  for(const r of app){
    const g = genById[r.id];
    if(!g){ if(r.empty){ stat.prazdne++; continue; } stat.chybaStatika++; roz.push({id:r.id, name:r.name, url:r.url, co:'appka má stránku, statika nie'}); continue; }
    appPaths.add(r.url);
    const ch = [];
    if(r.url !== g.p) ch.push(`adresa ${r.url} ≠ ${g.p}`);
    if(r.title !== g.title) ch.push(`titulok „${r.title}“ ≠ „${g.title}“`);
    if(r.meta !== g.meta) ch.push(`meta „${r.meta}“ ≠ „${g.meta}“`);
    const gc = g.canon.replace(/^https?:\/\/[^/]+/, ''), ac = r.canon.replace(/^https?:\/\/[^/]+/, '');
    if(ac !== gc) ch.push(`canonical ${ac} ≠ ${gc}`);
    if(r.h1 !== g.h1) ch.push(`H1 „${r.h1}“ ≠ „${g.h1}“`);
    if(r.nLinks !== g.nLinks) ch.push(`počet liniek ${r.nLinks} ≠ ${g.nLinks}`);
    if(r.foldNames.join('|') !== g.foldNames.join('|')){
      const a = r.foldNames, b = g.foldNames;
      ch.push(a.length !== b.length || [...a].sort().join('|') !== [...b].sort().join('|')
        ? `podpriečinky ${a.length} [${a.slice(0,6).join(', ')}] ≠ ${b.length} [${b.slice(0,6).join(', ')}]`
        : `PORADIE podpriečinkov: appka [${a.slice(0,5).join(', ')}…] ≠ statika [${b.slice(0,5).join(', ')}…]`);
    }
    if(ch.length){ stat.rozdiel++; roz.push({id:r.id, name:r.name, url:r.url, co:ch}); } else stat.zhoda++;
  }
  for(const p of Object.keys(genByPath)) if(!appPaths.has(p) && !roz.some(x=>x.url===p)){ stat.chybaAppka++; roz.push({url:p, co:'statika má stránku, appka ju nevyrába/ je prázdna'}); }

  // --- skutočné prevzatie na vzorke
  const kandidati = Object.keys(genByPath);
  const vyber = new Set(kandidati.filter(p => sporty.some(s => p.startsWith('/'+s+'/'))));
  let seed = 7; const rnd = () => { seed = (seed * 9301 + 49297) % 233280; return seed / 233280; };
  const zvysok = kandidati.filter(p => !vyber.has(p)); while(vyber.size < Math.min(kandidati.length, vzorka + (vyber.size)) && zvysok.length){ const i = Math.floor(rnd()*zvysok.length); vyber.add(zvysok.splice(i,1)[0]); if(vyber.size >= vzorka + sporty.length*0) break; }
  const real = [], rstat = { zhoda:0, rozdiel:0, chyba:0, casy:[] };
  const p2 = await ctx.newPage(); const err2 = []; p2.on('pageerror', e => err2.push(String(e)));
  let i = 0;
  for(const p of vyber){
    i++; const g = genByPath[p]; const t0 = Date.now();
    try{
      await p2.goto(BASE.replace(/\/$/, '') + p, { waitUntil: 'domcontentloaded' });
      // prevzatie: nový dokument s appkou (funkcia render existuje) a vykreslené #main z mini-balíka alebo celých dát
      await p2.waitForFunction(() => typeof render === 'function' && typeof DB !== 'undefined' && DB && DB.nodes && document.querySelector('#breadcrumb .bc-h'), null, { timeout: 60000 });
      const tTake = Date.now() - t0;
      const cit = async () => await p2.evaluate(() => ({
        title: document.title, meta: (document.querySelector('meta[name="description"]')||{}).content||'',
        canon: (document.querySelector('link[rel="canonical"]')||{}).href||'', h1: (()=>{const e=document.querySelector('#breadcrumb .bc-h'); if(!e) return ''; const c=e.cloneNode(true); c.querySelectorAll('[aria-hidden]').forEach(x=>x.remove()); return c.textContent;})(),
        nLinks: document.querySelectorAll('#main .card-link').length, nFold: document.querySelectorAll('#main .card-folder, #main .card-root').length,
        foldNames: [...document.querySelectorAll('#main .card-folder .cf-name, #main .card-root .c-name')].map(e=>e.textContent.trim()),
        partial: !!DB._partial, hreflang: document.querySelectorAll('link[rel="alternate"][hreflang]').length, loading: !!document.querySelector('#main .empty')
      }));
      const a1 = await cit();
      await p2.waitForFunction(() => !DB._partial, null, { timeout: 60000 });
      await p2.waitForTimeout(400);
      const a2 = await cit();
      const tFull = Date.now() - t0;
      const ch = [];
      for(const [st, a] of [['po prevzatí', a1], ['po celých dátach', a2]]){
        if(a.title !== g.title) ch.push(`${st}: titulok „${a.title}“ ≠ „${g.title}“`);
        if(a.meta !== g.meta) ch.push(`${st}: meta „${a.meta}“ ≠ „${g.meta}“`);
        const gc = g.canon.replace(/^https?:\/\/[^/]+/, ''), ac = a.canon.replace(/^https?:\/\/[^/]+/, '');
        if(ac !== gc) ch.push(`${st}: canonical ${ac} ≠ ${gc}`);
        if(a.h1.trim() !== g.h1) ch.push(`${st}: H1 „${a.h1.trim()}“ ≠ „${g.h1}“`);
        if(a.loading) ch.push(`${st}: #main ukazuje prázdny stav/načítavam`);
        else {
          if(a.nLinks !== g.nLinks) ch.push(`${st}: liniek ${a.nLinks} ≠ ${g.nLinks}`);
          if(a.foldNames.join('|') !== g.foldNames.join('|')) ch.push(`${st}: podpriečinky/poradie [${a.foldNames.slice(0,5).join(', ')}] ≠ [${g.foldNames.slice(0,5).join(', ')}]`);
        }
        if(a.hreflang !== g.hreflang) ch.push(`${st}: hreflang ${a.hreflang} ≠ ${g.hreflang}`);
      }
      rstat.casy.push([tTake, tFull]);
      if(ch.length){ rstat.rozdiel++; real.push({url:p, co:ch}); } else rstat.zhoda++;
    }catch(e){ rstat.chyba++; real.push({url:p, co:'CHYBA: '+String(e).slice(0,200)}); }
    if(i % 50 === 0) console.error(`… ${i}/${vyber.size}`);
  }
  const avg = a => a.length ? Math.round(a.reduce((x,y)=>x+y,0)/a.length) : 0;
  const out = { base: BASE, app: app.length, statickych: Object.keys(genByPath).length, stat, rozdiely: roz, vzorka: vyber.size, rstat: {zhoda:rstat.zhoda, rozdiel:rstat.rozdiel, chyba:rstat.chyba,
    priemer_ms_prevzatie: avg(rstat.casy.map(c=>c[0])), priemer_ms_cele_data: avg(rstat.casy.map(c=>c[1]))}, realRozdiely: real, jsErr, err2: err2.slice(0,10) };
  fs.writeFileSync(OUT, JSON.stringify(out, null, 1));
  console.log(JSON.stringify({ app: app.length, statickych: out.statickych, stat, vzorka: out.vzorka, rstat: out.rstat, jsErr: jsErr.length, err2: err2.length }));
  await browser.close();
})().catch(e => { console.error(e); process.exit(1); });
