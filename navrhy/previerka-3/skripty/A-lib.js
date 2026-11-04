// Spoločné pomôcky pre testy oblasti A (appka z pohľadu návštevníka)
const { chromium, devices } = require('playwright');
const fs = require('fs');
const path = require('path');

const SK = process.env.SK_URL || 'http://127.0.0.1:8123';
const EN = process.env.EN_URL || 'http://127.0.0.1:8124';
const SK404 = process.env.SK404_URL || 'http://127.0.0.1:8125'; // server, ktorý posiela 404.html ako GitHub Pages
const SNIM = '/tmp/claude-0/-home-user/eed11a80-25e6-51b3-88cc-2253d64cd8b2/scratchpad/snimky';
const BUILD = '/tmp/claude-0/-home-user/eed11a80-25e6-51b3-88cc-2253d64cd8b2/scratchpad/build';

// Cudzie domény: nikdy ich nevoláme naozaj (žiadne falošné zobrazenia reklamy).
const EXT_BLOCK = /^(https?:)?\/\/([a-z0-9.-]*\.)?(tipsport\.sk|zgo\.at|goatcounter\.com|sportlinky\.sk|sportlinking\.com)(\/|$)/i;

// Chromium s „mŕtvym“ proxy pre všetko okrem 127.0.0.1 — ani predpripojenie (preconnect)
// nejde na skutočný internet; HTTP požiadavky navyše blokuje route nižšie.
function launch(extra = {}) {
  return chromium.launch({ proxy: { server: 'http://127.0.0.1:9', bypass: '127.0.0.1,localhost' }, ...extra });
}
async function newContext(browser, opts = {}) {
  const dev = opts.device ? devices[opts.device] : {};
  const ctx = await browser.newContext({
    viewport: opts.viewport || dev.viewport || { width: 1366, height: 768 },
    deviceScaleFactor: 1,
    ...(opts.device ? { userAgent: dev.userAgent, isMobile: dev.isMobile, hasTouch: dev.hasTouch } : {}),
    locale: 'sk-SK',
    timezoneId: 'Europe/Bratislava',
  });
  const ext = []; // zachytené pokusy o cudzie požiadavky
  await ctx.route(/.*/, async (route) => {
    const url = route.request().url();
    if (EXT_BLOCK.test(url)) { ext.push(url); return route.abort('blockedbyclient'); }
    if (opts.routeHook) { const r = await opts.routeHook(route, url); if (r === true) return; }
    return route.continue();
  });
  ctx._ext = ext;
  return ctx;
}

// Zber konzoly / chýb stránky / CSP porušení
function watch(page) {
  const log = { console: [], errors: [], csp: [], requests: [], failed: [] };
  page.on('console', (m) => {
    const t = m.type();
    if (t === 'error' || t === 'warning') {
      const txt = m.text();
      if (/Content Security Policy|Refused to/i.test(txt)) log.csp.push(txt);
      log.console.push({ type: t, text: txt.slice(0, 400), url: page.url() });
    }
  });
  page.on('pageerror', (e) => log.errors.push({ msg: String(e.message || e).slice(0, 400), url: page.url() }));
  page.on('request', (r) => log.requests.push({ url: r.url(), type: r.resourceType() }));
  page.on('requestfailed', (r) => log.failed.push({ url: r.url(), err: r.failure() && r.failure().errorText }));
  return log;
}

// Čaká, kým sa appka prevezme a vykreslí (alebo vyprší čas)
async function waitApp(page, timeout = 15000) {
  const t0 = Date.now();
  await page.waitForFunction(() => {
    try{ return typeof DB === 'object' && DB && document.getElementById('srch') && document.getElementById('main') && document.getElementById('main').children.length > 0; }catch(e){ return false; }
  }, null, { timeout }).catch(() => {});
  return Date.now() - t0;
}
// Čaká na celé dáta (DB._partial zmizne)
async function waitFull(page, timeout = 20000) {
  await page.waitForFunction(() => { try{ return typeof DB === 'object' && DB && !DB._partial && DB.nodes && DB.nodes.length > 1000; }catch(e){ return false; } }, null, { timeout }).catch(() => {});
}

async function appState(page) {
  return page.evaluate(() => {
    const main = document.getElementById('main');
    window.DB = (typeof DB !== 'undefined') ? DB : undefined;
    const cards = [...main.querySelectorAll('.card-link .cl-name, .card-folder .cf-name, .card-root .c-name, .cit .nm')].map((e) => e.textContent.trim());
    return {
      url: location.href,
      title: document.title,
      curId: typeof curId !== 'undefined' ? curId : undefined,
      partial: !!(window.DB && window.DB._partial),
      nodes: window.DB && window.DB.nodes ? window.DB.nodes.length : 0,
      cestaCela: typeof CESTA_CELA !== 'undefined' ? CESTA_CELA : undefined,
      canonical: (document.querySelector('link[rel=canonical]') || {}).href,
      hreflang: [...document.querySelectorAll('link[rel=alternate][hreflang]')].map((l) => l.getAttribute('hreflang') + '=' + l.getAttribute('href')),
      breadcrumb: (document.getElementById('breadcrumb') || {}).innerText,
      cards,
      scrollY: window.scrollY,
      mainText: main.innerText.slice(0, 200),
      viewMode: typeof viewMode !== 'undefined' ? viewMode : undefined,
    };
  });
}

function snap(page, name) { return page.screenshot({ path: path.join(SNIM, name + '.png'), fullPage: false }); }

function out(obj, file) {
  const p = path.join('/tmp/claude-0/-home-user/eed11a80-25e6-51b3-88cc-2253d64cd8b2/scratchpad/findings/skripty', file);
  fs.writeFileSync(p, JSON.stringify(obj, null, 1));
  return p;
}

module.exports = { chromium, launch, devices, SK, EN, SK404, SNIM, BUILD, newContext, watch, waitApp, waitFull, appState, snap, out, EXT_BLOCK };
