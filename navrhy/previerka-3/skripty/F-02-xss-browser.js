// Bezpečnostná skúška XSS: načíta stránky injektovaného webu (port 8125) v Chromiu
// a zistí, či sa vykoná vložený kód. Sleduje: dialog (alert), window.__XSS počítadlá,
// chyby. NIČ neposiela von. Web bol vygenerovaný zo škodlivej KÓPIE data.json.
const { chromium } = require('playwright');
const BASE = 'http://127.0.0.1:8125/';

async function skus(browser, cesta, akcie) {
  const ctx = await browser.newContext();
  const page = await ctx.newPage();
  let dialog = 0, pageerr = [];
  page.on('dialog', async d => { dialog++; await d.dismiss(); });
  page.on('pageerror', e => pageerr.push(String(e).split('\n')[0]));
  await page.goto(BASE + cesta, { waitUntil: 'load' });
  await page.waitForTimeout(2500);
  if (akcie) { try { await akcie(page); } catch (e) { pageerr.push('akcia: ' + e.message); } }
  await page.waitForTimeout(1500);
  // posčítaj všetky window.__XSS* vrátane kombinovaného __XSS
  const xss = await page.evaluate(() => {
    const out = {};
    for (const k of Object.keys(window)) if (/^__XSS/.test(k)) out[k] = window[k];
    return out;
  });
  const vykonane = Object.keys(xss).length;
  await ctx.close();
  return { cesta, dialog, vykonane, xss, pageerr: pageerr.slice(0, 4) };
}

(async () => {
  const browser = await chromium.launch();
  const vysledky = [];
  // 1) domov (appka prevezme stránku, vykreslí lištu Aktuálne, dlaždice, banner slot1)
  vysledky.push(await skus(browser, '', null));
  // 2) futbal: statická stránka so škodlivou linkou v koreni + appka
  vysledky.push(await skus(browser, 'futbal/', null));
  // 3) domov + otvorenie škodlivého priečinka (klik na prvú dlaždicu s payloadom), hľadanie
  vysledky.push(await skus(browser, '', async (page) => {
    await page.fill('#srch', 'Pokus');       // nájde škodlivý priečinok podľa názvu
    await page.waitForTimeout(800);
    const prva = page.locator('#main a.card-folder').first();
    if (await prva.count()) await prva.click().catch(() => {});
    await page.waitForTimeout(800);
  }));
  // 4) hash/admin a ?q= skúšky na domove
  vysledky.push(await skus(browser, '#%3Cimg%20src=x%20onerror=window.__XSShash=1%3E', null));
  vysledky.push(await skus(browser, '?q=%3Cimg%20src=x%20onerror=window.__XSSq=1%3E', null));
  vysledky.push(await skus(browser, '#admin', null));
  // 5) stránka Aktuálne (live) — vykresľuje karty z aktualne.json so škodlivými poľami
  vysledky.push(await skus(browser, 'aktualne/', null));
  await browser.close();
  let dlg = 0, exe = 0;
  for (const r of vysledky) {
    dlg += r.dialog; exe += r.vykonane;
    console.log(JSON.stringify(r));
  }
  console.log('SUHRN dialogov:', dlg, '| vykonanych XSS:', exe);
})();
