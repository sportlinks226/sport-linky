// Pomôcky pre testy ADMIN režimu (oblasť A2). Heslo nepoznáme: do načítaných dát
// vložíme vlastný odtlačok pwKdf (rovnaký PBKDF2-SHA256/600000 ako appka) a prihlásime
// sa heslom TEST_PW. Cudzie domény (Tipsport, GoatCounter, sportlinky.sk) sa blokujú.
const { chromium, devices } = require('playwright');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const SK = 'http://127.0.0.1:8123';
const EN = 'http://127.0.0.1:8124';
const SNIM = '/tmp/claude-0/-home-user/eed11a80-25e6-51b3-88cc-2253d64cd8b2/scratchpad/snimky';
const OUT = '/tmp/claude-0/-home-user/eed11a80-25e6-51b3-88cc-2253d64cd8b2/scratchpad/findings/skripty';
const DL = '/tmp/claude-0/-home-user/eed11a80-25e6-51b3-88cc-2253d64cd8b2/scratchpad/findings/skripty/A2-stiahnute';
fs.mkdirSync(DL, { recursive: true });

const TEST_PW = 'test1234';
const SALT = '00112233445566778899aabbccddeeff';
const KDF = { salt: SALT, iter: 600000, hash: crypto.pbkdf2Sync(TEST_PW, Buffer.from(SALT, 'hex'), 600000, 32, 'sha256').toString('hex') };

const EXT_BLOCK = /^(https?:)?\/\/([a-z0-9.-]*\.)?(tipsport\.sk|zgo\.at|goatcounter\.com|sportlinky\.sk|sportlinking\.com)(\/|$)/i;

async function newContext(browser, opts = {}) {
  const dev = opts.device ? devices[opts.device] : {};
  const ctx = await browser.newContext({
    viewport: opts.viewport || dev.viewport || { width: 1366, height: 768 },
    deviceScaleFactor: 1,
    ...(opts.device ? { userAgent: dev.userAgent, isMobile: dev.isMobile, hasTouch: dev.hasTouch } : {}),
    ...(opts.hasTouch ? { hasTouch: true, isMobile: true } : {}),
    locale: 'sk-SK',
    timezoneId: 'Europe/Bratislava',
    acceptDownloads: true,
  });
  const ext = [];
  await ctx.route(/.*/, async (route) => {
    const url = route.request().url();
    if (EXT_BLOCK.test(url)) { ext.push(url); return route.abort('blockedbyclient'); }
    if (opts.routeHook) { const r = await opts.routeHook(route, url); if (r === true) return; }
    return route.continue();
  });
  ctx._ext = ext;
  return ctx;
}

function watch(page) {
  const log = { console: [], errors: [], csp: [], dialogs: [] };
  page.on('console', (m) => {
    const t = m.type();
    if (t === 'error' || t === 'warning') {
      const txt = m.text();
      if (/Content Security Policy|Refused to/i.test(txt)) log.csp.push(txt.slice(0, 300));
      log.console.push({ type: t, text: txt.slice(0, 300) });
    }
  });
  page.on('pageerror', (e) => log.errors.push(String(e.message || e).slice(0, 300)));
  log.http = [];
  page.on('response', (r) => { if (r.status() >= 400) log.http.push(r.status() + ' ' + r.url().slice(0, 120)); });
  return log;
}
// dialógy (alert/confirm): zapíše text, confirm odpovie podľa opts.accept (default true)
function autoDialog(page, log, accept = true) {
  page.on('dialog', async (d) => {
    log.dialogs.push({ type: d.type(), msg: d.message().slice(0, 300) });
    const acc = typeof accept === 'function' ? accept(d.message()) : accept;
    if (d.type() === 'confirm' || d.type() === 'prompt') { acc ? await d.accept() : await d.dismiss(); } else await d.accept();
  });
}

async function waitFull(page, timeout = 30000) {
  await page.waitForFunction(() => typeof DB !== 'undefined' && DB && !DB._partial && DB.nodes && DB.nodes.length > 1000, null, { timeout });
}

// Prihlásenie: vloží náš pwKdf do DB (odľahčené dáta majú pwKdf), otvorí #admin, zadá heslo.
async function login(page, pw = TEST_PW) {
  await waitFull(page);
  await page.evaluate((k) => { DB.pwKdf = k; }, KDF);
  await page.evaluate(() => { location.hash = '#admin'; });
  await page.waitForSelector('#pwScreen.open', { timeout: 5000 });
  await page.fill('#pwIn', pw);
  const t0 = Date.now();
  await page.click('#pwBtn');
  await page.waitForFunction(() => adminMode === true || /Nesprávne|nepodarilo/.test(document.getElementById('pwErr').textContent), null, { timeout: 60000 });
  const dt = Date.now() - t0;
  const ok = await page.evaluate(() => adminMode === true);
  return { ok, ms: dt, err: await page.textContent('#pwErr') };
}

async function shot(page, name) { await page.screenshot({ path: path.join(SNIM, name), fullPage: false }); }

function saveLog(name, obj) { fs.writeFileSync(path.join(OUT, name), JSON.stringify(obj, null, 1)); }

module.exports = { chromium, devices, SK, EN, SNIM, OUT, DL, TEST_PW, KDF, newContext, watch, autoDialog, waitFull, login, shot, saveLog, fs, path };
