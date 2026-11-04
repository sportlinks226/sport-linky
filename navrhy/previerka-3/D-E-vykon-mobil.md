# Previerka č. 3 — oblasti D) Výkon, E) Mobil a prístupnosť, C) Core Web Vitals

Dátum merania: 4. 11. 2026. Web zostavený generátorom (verzia dát 1125), meraný lokálne. V repozitároch som nič nemenil.

**Ako som meral (dôležité pre čítanie čísel):**
- Lokálny `python http.server` (porty 8123/8124) **neposiela gzip ani cache hlavičky**. Preto som spustil vlastný lokálny server (`findings/skripty/D-gzip-server.js`, porty 8135/8136), ktorý sa správa ako GitHub Pages: gzip, `Cache-Control: max-age=600`, ETag → 304, `404.html` so stavom 404. Všetky čísla o rýchlosti nižšie sú z tohto gzip servera, ak nie je napísané inak.
- Mobil = Playwright/Chromium, 390×844 px, **CPU 4× spomalené, sieť „slow 4G“** (1,6 Mb/s, 150 ms odozva) — rovnaké podmienky ako Lighthouse mobil. Lighthouse 12.8.2 (Moto G Power, slow 4G, 4× CPU).
- Externé domény (GoatCounter `gc.zgo.at`, `ban.tipsport.sk`, `sportlinky.sk` z EN webu) som zablokoval a zapísal pokusy.
- Čo sa lokálne **nedá** zmerať: skutočný čas odozvy GitHub Pages/CDN (TTFB), brotli (GitHub Pages posiela gzip), správanie po vypršaní 10-minútovej cache na živom webe (len odvodené z hlavičiek), skutočné dáta od používateľov (CrUX v Search Console), reklama Tipsport (blokovaná).
- Skripty: `findings/skripty/D-*.js`, `E-*.js`; surové výstupy: `findings/data/`; Lighthouse správy (HTML + JSON): `findings/lighthouse/` (python server) a `findings/lighthouse-gzip/` (gzip server); snímky: `snimky/E-*.png`.

Poznámka k zadaniu: adresa `/futbal/europa/anglicko/` neexistuje — kluby Anglicka sú na `/futbal/kluby/europa/anglicko/`, meral som tú. Hlboká liga s 20+ klubmi: `/futbal/kluby/europa/anglicko/championship/` (24 klubov + linka ligy).

---

## Nálezy

### 1. Ikonky Facebook/Instagram na kartách klubov sú na dotyk primalé (15×15 px) — 🟠 dôležité; oblasť E
- **Čo je zle:** na stránke ligy je 48 ikoniek FB/IG (`a.si`) s dotykovou plochou **15×15 px** (ikona sama) resp. 20×20 px. Odporúčané minimum pre prst je 44×44 px (Apple/Google), WCAG 2.2 vyžaduje aspoň 24×24 px. Ikonky sú prilepené na pravý okraj karty, hneď vedľa hlavnej linky klubu — ťuknutie o pár pixelov vedľa otvorí web klubu namiesto Facebooku (alebo naopak).
- **Dôkaz:** `index.html:316` (`.card-link .socs a.si{...width:15px;height:15px...}`), `index.html:319`; meranie `findings/data/E-7-sirky.txt` — tabuľka „Dotykové ciele menšie než 44×44 px“: `a.si (v .card-link)` **48 na stránke**, rozmery 15×15 a 20×20 (všetky šírky 320–768). Snímka `snimky/E-3-liga-320.png` (ikonky pri pravom okraji). Lighthouse audit `target-size` prešiel, lebo počíta aj s medzerou okolo prvku — na prst je to však stále 15 px.
- **Riešenie:** zväčšiť dotykovú plochu bez zmeny vzhľadu: ikona ostane 15 px, ale odkaz dostane plochu aspoň 28–32 px (napr. `padding` alebo `::before{content:"";position:absolute;inset:-8px}` na `a.si`; `.socs` rozšíriť z 18 px na ~32 px a kartám s ikonkami dať `padding-right` ~34 px, riadok 322 `.card-link.has-soc>a{padding-right:16px}` a 525 (mobil 20 px)). Náročnosť **malá**, súbor `index.html` (CSS). **SK aj EN.**

### 2. Bannery a lišta Aktuálne sú mimo „landmarkov“, drobčeky nie sú `<nav>` — 🟢 drobné; oblasť E
- **Čo je zle:** čítačka obrazovky ponúka skoky po oblastiach stránky (hlavička, navigácia, hlavný obsah…). Drobčeková navigácia (`#breadcrumb`) a lišta Aktuálne (`#aktualneWrap`) sú obyčajné `<div>` mimo týchto oblastí — axe hlási 3–15 prvkov „not contained by landmarks“ na každej stránke.
- **Dôkaz:** `index.html:605` (`<div id="breadcrumb"></div>`), `index.html:620` (`<div id="aktualneWrap" ...>`); `findings/data/E-8-axe.txt` — pravidlo `region` (moderate): domov 5, Anglicko 13, Championship 15, hľadanie 5, Aktuálne 3, EN domov 5.
- **Riešenie:** `<nav id="breadcrumb" aria-label="Kde som">` a `<section id="aktualneWrap" aria-label="Aktuálne">` (EN: „Live This Week“). Náročnosť **malá**, `index.html`. **SK aj EN.**

### 3. EN: banner „Live This Week“ je odkaz bez názvu pre čítačku — 🟢 drobné; oblasť E (len EN)
- **Čo je zle:** na EN domove a stránke Live This Week je banner `<a href="/live-this-week/"><svg…>` — vnútri je len obrázok SVG bez textu pre čítačku. axe: `link-name` (serious), Lighthouse prístupnosť EN domov **95** (SK 100).
- **Dôkaz:** `findings/data/E-8-axe.txt` (EN domov, EN Live This Week: `#bannerSlot > a[href$="live-this-week/"]` — „Element does not have text that is visible to screen readers“); `findings/lighthouse-gzip/mobil-en-domov.report.html`. HTML banneru pochádza z dát (`banners[].html` v data.json), vykresľuje ho `index.html:3010` (`el.innerHTML = adNeedsFrame(h) ? adFrame(h,false) : h`).
- **Riešenie:** (a) v admine v HTML banneru doplniť `aria-label="Live This Week"` na `<a>` (zmena dát — robí Cowork/Miro), alebo (b) v kóde `renderOneSlot` (`index.html:2996–3010`) — ak vlastný HTML banner nemá text, doplniť odkazu `aria-label` z poľa `alt`/názvu banneru. Náročnosť **malá**. **Len EN** (SK banner Tipsport beží v iframe).

### 4. Bez „Preskočiť na obsah“, reklamné iframy sú v poradí Tab bez viditeľného zvýraznenia — 🟢 drobné; oblasť E
- **Čo je zle:** človek s klávesnicou musí na podstránke stlačiť Tab 15–21× (11 športov v hlavičke, hľadanie, 2 tlačidlá zobrazenia, Späť, 5–6 drobčekov, 1–2 reklamné iframy, lišta Aktuálne), kým sa dostane k prvej dlaždici. Pri iframe reklamy sa focus „stratí“ (nič nie je zvýraznené).
- **Dôkaz:** `findings/data/E-9-klavesnica.txt` — Tab poradie: Anglicko desktop: dlaždice až na 27. mieste; položky 21–22 `iframe.adframe „“ ✗BEZ viditeľného focusu`. Na mobile (Championship): prvá karta 16. zastávka, iframe 10.
- **Riešenie:** skrytý odkaz „Preskočiť na obsah“ ako prvý prvok v `<body>` (`href="#main"`, `#main` má `tabindex="-1"`; CSS `.sr-only` z riadku 426 + viditeľný pri `:focus`); iframom `.adframe` dať `tabindex="-1"`. Náročnosť **malá**, `index.html` (+ `generator.py` ADFRAME, ak sa má týkať aj záložných bannerov statickej stránky). **SK aj EN.**

### 5. Admin na mobile: políčka majú písmo 14 px → iPhone pri ťuknutí priblíži stránku — 🟢 drobné; oblasť E
- **Čo je zle:** iOS Safari automaticky zväčší (zoomne) stránku, keď sa ťukne do políčka s písmom pod 16 px. Hľadanie to má vyriešené (16 px, bod 9 z 22. 10.), ale všetkých ~50 políčok adminu má 14,08 px. Miro admin z mobilu používa (rozhodnutie 3).
- **Dôkaz:** `index.html:396–400` (`.fg input,.fg select,.fg textarea{...font-size:0.88rem...}` = 14,08 px); `findings/data/E-7-sirky.txt` (390 px): `srch:16px`, `aUrl:14.08px`, `nUrl:14.08px`, `stPw:14.08px` … Políčko hesla `#pwIn` tiež (`.pw-box input`, riadok 435).
- **Riešenie:** `@media(hover:none){.fg input,.fg select,.fg textarea,.pw-box input{font-size:16px}}`. Náročnosť **malá**, `index.html`. **SK aj EN.**

### 6. Po vydaní novej verzie dát sa môže data.json stiahnuť dvakrát (starý aj nový, 2 × 1,2 MB) — 🟢 drobné; oblasť D
- **Čo je zle:** appka sťahuje `data.json?v=1125` a súčasne `version.txt`. Keď `version.txt` ohlási novšiu verziu (prehliadač má ešte starý `index.html` z cache — do 10 minút po builde, na mobile aj dlhšie), appka **najprv dočká celý starý data.json** (1,19 MB) a potom stiahne ešte nový. `version.txt` pritom príde za jedno kolo siete (~0,2 s), kým data.json na slow 4G trvá ~6 s — stiahnutie starého sa dá prerušiť hneď.
- **Dôkaz:** `index.html:1020–1024`: `const [d0, verNew] = await Promise.all([fetchData(DATA_VER), verPromise]); ... if(verNew !== DATA_VER){ const d1 = await fetchData(verNew); ...}`. Komentár na riadkoch 976–978 to pripúšťa („zriedkavé“). Lokálne sa to nedá vyvolať (version.txt sa generuje spolu s index.html) — ide o čítanie kódu.
- **Riešenie:** `fetchData` dostane `AbortController`; keď `verPromise` vráti inú verziu, zavolať `abort()` na prebiehajúce sťahovanie starého súboru a rovno stiahnuť nový. Náročnosť **malá**, `index.html` (`load()`). **SK aj EN.**

### 7. Domov na mobile: hlavička a obsah poskočia o 32 px hneď po štarte (CLS 0,035) — 🟢 drobné; oblasť C/E
- **Čo je zle:** prvé vykreslenie domova ukáže hlavičku bez riadku „14 847 overených liniek“ a bez drobčekov „🏠 Domov“; skript ich dopíše o chvíľu neskôr a všetko pod nimi (hľadanie, banner, Aktuálne, dlaždice) sa posunie dole. Hodnota 0,035 je ešte v zelenej zóne Google (do 0,1), ale je to viditeľný poskok na najnavštevovanejšej stránke. Na podstránkach (prevzatie appkou) je CLS prakticky 0 (0,0002).
- **Dôkaz:** `findings/data/D-3b-prevzatie-gzip.txt` (domov): posun @681 ms, hodnota 0,0354, zdroje `h-search 53→70 px` (+17 px, počítadlo liniek), `banner-wrap 121→154`, `aktualneWrap 178→210`, `main 279→311` (+32 px = počítadlo + drobčeky). Lighthouse (python server) `mobil-domov` CLS **0,036**. Kód: `index.html:595` (`<div class="h-count" id="linkCount"></div>` prázdne), `index.html:605` (`<div id="breadcrumb"></div>` prázdne), plnia ich `updateLinkCount()` (1555) a `renderBreadcrumb()` (1722). Generátor už vkladá dlaždice domova do HTML (`generator.py:952 inject_home`), tieto dva riadky nie.
- **Riešenie:** v `inject_home` (generator.py) vložiť do HTML aj text počítadla (číslo `_totalLinks` už má) a drobček „🏠 Domov“, alebo dať `#linkCount` a `#breadcrumb` pevnú `min-height`. Náročnosť **malá**, `generator.py` (+ CSS v `index.html`). **SK aj EN.**

### 8. Lighthouse/PageSpeed ukazuje LCP 7,6–7,8 s na mobile — je to artefakt simulácie, nie skutočný čas; skutočné LCP je 0,26–0,33 s — 💡 vysvetlenie pre Mira; oblasť C
- **Čo sa deje:** Lighthouse (aj PageSpeed Insights) meria stránku na rýchlej sieti a potom **dopočítava** pomalú sieť. V nameranom behu `data.json` (1,16 MB) dobehne za pár desiatok ms, teda **skôr**, než appka stihne vykresliť dlaždice (so 4× pomalším CPU to trvá ~0,7–1,2 s). Lighthouse preto usúdi, že najväčší prvok „závisel“ od data.json, a do simulovaného LCP pripočíta jeho ~6-sekundové sťahovanie na slow 4G. Fázy LCP v správe: „Render Delay 7,1–7,4 s“. Rovnaký mechanizmus vysvetľuje Mirovo „LCP 9,4 s v PageSpeed 2. 10. 2026“ (komentár `index.html:1013`).
- **Dôkaz:** `findings/data/D-2-pozorovane.txt` — mobil Anglicko: pozorované LCP **976 ms**, data.json skončil 592 ms (pred LCP) → simulované LCP 7 582 ms; Championship 716 ms → 7 809 ms; domov 1 233 ms → 7 657 ms. Naopak EN domov: data.json skončil **po** LCP → simulované LCP 1,8 s. Skutočný prehliadač s naozaj spomalenou sieťou (`findings/data/D-3b-prevzatie-gzip.txt`): LCP kandidáti končia na **0,26–0,33 s** (statická stránka: `P.desc`, `FOOTER`; domov: hľadanie/wordmark), data.json dorazí až @ 6,8–7,9 s a nový LCP kandidát už nevytvorí.
- **Čo z toho plynie:** pre poradie v Google rozhodujú **skutočné dáta od návštevníkov** (CrUX — v Search Console „Základné webové ukazovatele“), nie laboratórne číslo PageSpeed. Odporúčam sledovať tam. Laboratórny LCP by sa dal „opraviť“ len odložením data.json o sekundy po vykreslení — to by zbytočne spomalilo hľadanie a hlbšie sekcie, **nenavrhujem**. Ak chce Miro v PageSpeed pekné číslo, jediná skutočná cesta je bod 11 (menej dát pre návštevníka). Náročnosť: žiadna zmena.

### 9. Prevzatie appkou: sťahovanie `index.html` (80 kB) sa začína až po spracovaní statickej stránky — 💡 nápad; oblasť D
- **Čo sa deje:** skript TAKEOVER je na konci `<body>`; `fetch("/index.html")` sa spustí, až keď prehliadač stiahne a rozparsuje statickú stránku (8–10 kB gz). Na slow 4G: statická stránka vykreslená @ 0,26–0,31 s, `document.open()` @ 0,77–0,90 s, dlaždice appky @ 1,03–1,30 s. Časť ~0,15–0,25 s je čakanie, než sa fetch vôbec spustí.
- **Dôkaz:** `generator.py:1260–1321` (TAKEOVER, `fetch("__ROOT__index.html")`), vložený na koniec stránky (`generator.py:1705` `takeover=`); meranie `findings/data/D-3b-prevzatie-gzip.txt`. V `<head>` nie je žiadny `preload`/`prefetch` (`grep` v generator.py: žiadny výskyt).
- **Riešenie (ak sa oplatí):** do `<head>` statickej stránky dať `<link rel="preload" href="/index.html" as="fetch" crossorigin="anonymous">` a v TAKEOVER volať `fetch(..., {credentials:'same-origin', mode:'cors'})` tak, aby sa preload použil (inak by sa stiahol 2×, treba overiť v DevTools). Odhadovaný zisk ~0,15–0,25 s z ~1,1 s prevzatia na slow 4G; na 2. a ďalšej stránke je index.html z cache, takže nulový. Náročnosť **malá–stredná** (riziko dvojitého sťahovania), `generator.py`. **SK aj EN.**

### 10. Ikonky: 243 zástupných obrázkov 1×1 px sa sťahujú zbytočne; chýba `decoding="async"` — 💡 nápad; oblasť D
- **Čo sa deje:** `ikony/` obsahuje 243 súborov PNG 1×1 px (web nemá ikonku). Appka ich najprv stiahne (~330 B + kolo siete) a až potom vymení za emoji športu (`favLoad`, `index.html:2536`). Ikonky sú 64×64 px PNG zobrazené na 24×24 px (priemer 1,5 kB — v poriadku), bez `decoding="async"` (prehliadač ich dekóduje na hlavnom vlákne; pri 27–53 ikonkách na stránke je to pár ms).
- **Dôkaz:** `findings/data/D-4-ikonky.txt`: `rozmery PNG: 64x64:5558 16x16:816 32x32:395 48x48:336 1x1:243`; `index.html:2534` (`<img class="fav fav-wait" ... loading="lazy" ...>` bez `decoding`). 404 ikoniek: **0** na 7 stránkach.
- **Riešenie:** generátor môže zoznam hostov s 1×1 ikonkou pribaliť (napr. pole `_noIcon` v odľahčenom data.json / mini-balíku) a `favHtml` ich rovno vykreslí ako emoji; do `<img>` doplniť `decoding="async"`. Náročnosť **malá**, `index.html` + `generator.py`/`ikony.py`. **SK aj EN.** (Nesúvisí s bodom 24 — ten rieši priehľadné 16×16 ikonky a JPEG.)

---

## Odložené body 11, 25, 26 — nové čísla (nenavrhujem znova, len meriam dopad)

### Bod 11 — každý návštevník sťahuje celý data.json
| Meranie (gzip server, mobil slow 4G, CPU 4×) | Hodnota |
|---|---|
| Prenos data.json (gzip, ako GitHub Pages) | **1 192 kB** (brotli by bol 870 kB — GitHub Pages brotli neposiela) |
| Podiel data.json na prenose 1. návštevy | domov 1 164 z 1 244 kB (**94 %**), Anglicko 1 164 z 1 257 kB, Championship 1 164 z 1 307 kB |
| Kedy dorazí na slow 4G | @ 6,8–7,9 s po otvorení stránky (`D-3b`) |
| `JSON.parse` 5,33 mil. znakov, CPU 4× | **75–116 ms** (CPU 1×: 26–32 ms) |
| Dlhé úlohy pri príchode dát (parse + `afterLoad` + prekreslenie), CPU 4× | **2 úlohy, spolu 350–440 ms** (napr. 183 + 256 ms; domov 187 + 212 ms) |
| Lighthouse mobil TBT (gzip) | domov 750 ms, Anglicko 780 ms, Championship 970 ms, Aktuálne 840 ms, EN domov 380 ms |
| Klik, ktorý trafí spracovanie dát (INP) | Anglicko: 144 ms (pred tým 32–56 ms); domov 112 ms (pred tým 40–96 ms) |
| Pamäť po dátach | 1,6 MB → **10,0 MB** haldy (`D-5`) |
| Cache | do 10 min sa nesťahuje znova (2. stránka: 62 kB, tá istá stránka: 1,2 kB); po 10 min revalidácia ETag → 304 (lokálne neoveriteľné, odvodené z hlavičiek GitHub Pages) |

### Bod 25 — admin kód v index.html
| Meranie | Hodnota |
|---|---|
| `index.html` appky po builde | 261 492 B, gzip **79,5 kB**, brotli 65,9 kB (EN 265 kB / 80,5 kB) |
| Dlhá úloha pri prevzatí (parsovanie + spustenie appky + prvé vykreslenie), CPU 4× | **300–403 ms** (jedna súvislá úloha, `D-3b`: Anglicko 348/403 ms, Championship 349/381 ms, Aktuálne 261/300 ms) |
| Lighthouse „unused-javascript“ (domov) | úspora 26 kB (gzip), odhad 150 ms |
| Rozpis hlavného vlákna Lighthouse (mobil) | domov 2,0 s (skripty 344 ms, štýly+layout 321 ms), Championship 3,1 s (skripty 631 ms, štýly+layout 466 ms) |

### Bod 26 — hľadanie a drobné spomalenia (CPU 4×, mobil)
| Meranie | Hodnota |
|---|---|
| Hľadanie „a“ | 313 výsledkov, 4 865 DOM prvkov, **1 573 ms** do zobrazenia, dlhé úlohy 879 + 484 ms |
| Hľadanie „ko“ / „ar“ / „x“ | 1 434 / 1 664 / 1 127 ms (371 / 366 / 234 výsledkov) |
| Hľadanie s 9–17 výsledkami („liverpool“, „slovan“) | 452–610 ms, jedna dlhá úloha **219–367 ms** aj pri 9 výsledkoch (prechod celého stromu `markHidden`) |
| Písanie „liverpool“ po písmenách | len 1 dlhá úloha (216 ms) — 200 ms čakanie funguje |
| Klik na dlaždicu PRED príchodom data.json (mini-balík, ~60 uzlov) | 32–56 ms |
| Klik na dlaždicu PO príchode data.json (16 500 uzlov, `DB.nodes.find`) | **112–152 ms** — 2–3× pomalšie, stále pod hranicou 200 ms |
| `navigate()` + vykreslenie | Futbal 119 ms, Európa (55 dlaždíc) 150 ms, Anglicko 187 ms |
| Lighthouse „forced reflow“ | `updateAktFade` (`index.html:3840`) — 55–65 ms vynúteného layoutu na stránku |
| Pamäť pri hľadaní „a“ | 10,2 → 17,2 MB, po vyčistení ostáva 17,2 MB (po GC) |

---

## Čo je v poriadku (overené)
- **Žiadne vodorovné pretekanie** na 320, 360, 375, 390, 414, 430 ani 768 px (`scrollWidth == innerWidth` na 5 stránkach × 7 šírok; lišta Aktuálne preteká len vo vlastnom posuvnom páse). Snímky `snimky/E-1…E-5-*-{320,390,768}.png`.
- **Zoom:** `meta viewport width=device-width, initial-scale=1.0` bez `user-scalable=no`; políčko hľadania 16 px; zväčšenie 200 % bez vodorovného posuvníka (`snimky/E-6-zoom200-*.png`).
- **Stĺpce na dotyku vypnuté** (`colsAllowed()` `index.html:1937`: len `hover:hover` a > 700 px; prepínač `.vswitch` skrytý aj na iPade 768 px). **Hover efekty** len v `@media(hover:hover)` (riadky 78, 265, 283, 295, 302, 318, 468).
- **Prevzatie appkou neposúva obsah** (CLS 0,0002 na podstránkach), nebliká — statická stránka a appka majú rovnaké rozloženie; pozícia posunu sa prenáša (`__PAGE_SCROLL`).
- **INP** aj na 4× pomalom CPU pod 200 ms (max 152 ms). Kliky na linky klubov 16–24 ms.
- **Pamäť stabilná:** +0,2 MB po 100 navigáciách (37 priečinkov), DOM uzly 1 213–1 466 — bez úniku.
- **Ikonky a vlajky:** 0 × 404 na 7 stránkach (mobil aj desktop), všetky `loading="lazy"`, `alt=""` (dekoratívne), pevné rozmery cez CSS (24×24) → bez posunu; vlajky majú `width/height` a `srcset 2x`; priemer ikonky 1,5 kB, vlajky 0,5–1,6 kB. Na mobile nad ohybom 18 obrázkov (Championship), domov 0.
- **Cache stratégia** (`?v=` + `version.txt` bez cache + `aktualne.json?t=` bez cache) funguje: index.html aj data.json ostanú 10 min v cache, aktualne.json (826 B) a version.txt (394 B) sa pýtajú vždy — zámerne, lacno. F5 revaliduje statickú stránku (334 B, 304).
- **Externé spojenia:** len GoatCounter (`gc.zgo.at/count.js`) a 2 sloty Tipsport (`ban.tipsport.sk`, v sandboxovanom iframe) — žiadne fonty (systémové Segoe UI/Arial), favicon v SVG priamo v HTML, žiadne externé CSS/JS. EN web najprv skúša `sportlinky.sk/aktualne.json` a pri neúspechu správne použije vlastnú kópiu.
- **Klávesnica:** Tab poradie logické a viditeľné (červený rám / box-shadow) na všetkých prvkoch okrem iframe reklamy; dlaždice sú `<a>` → Enter otvorí sekciu; Escape v hľadaní vyčistí text a vráti zoznam; `Escape`/focus v admin oknách bol vyriešený v previerke 2.
- **Čítačka:** `lang="sk"`/`"en"`, `<header>`, `<nav aria-label="Športy">`, `<main>`, `<footer>`, jeden `<h1>` na stránku (názov sekcie), `aria-live="polite"` (`#srLive`) pre zmeny, políčko hľadania `type="search"` s `aria-label`, dekoratívne emoji športov s `aria-hidden`, tlačidlo „+N ›“ s `aria-label` („Zobraziť ďalšie 4 linky“).
- **Kontrast:** axe 0 porušení na 7 stránkach; vlastný výpočet (`E-10`): všetok bežný text ≥ 5,3 : 1 (väčšina ≥ 7). Pod 4,5 sú len dekoratívne znaky „›“ (1,52), „→“ (3,68), emoji a slovo „LINKY“ v logu (4,47 — o vlások, 16 px tučné v pätičke; v hlavičke 19 px → limit 3,0 ✓).
- **prefers-reduced-motion** vypína animáciu kariet, pulz bodky Aktuálne a plynulý posun stĺpcov (riadky 99, 336, 452; overené: `animationName: none`).
- **Lighthouse (gzip server):** prístupnosť 100 (EN 95 — bod 3), best practices 100, SEO 100; desktop domov výkon 99 (FCP 0,3 s, LCP 0,5 s, TBT 100 ms, CLS 0).
- Dve veci, ktoré Lighthouse vyčíta, ale **nedajú sa zmeniť**: `no-document-write` (prevzatie appkou — Mirovo rozhodnutie 1) a `uses-long-cache-ttl` (GitHub Pages posiela pevne `max-age=600`).

---

## Merania

### M1. Veľkosti súborov (build SK, `D-velkosti.js`)
| Súbor | nezbalené | gzip -9 | brotli | GitHub Pages posiela |
|---|---:|---:|---:|---|
| `index.html` (appka, domov aj 404.html) | 261 492 B | 79 532 B | 65 930 B | gzip (~80 kB) |
| statická stránka sekcie (Anglicko) | 22 189 B | 7 842 B | 6 760 B | gzip |
| statická stránka ligy (Championship, 24 klubov) | 32 765 B | 9 730 B | 8 432 B | gzip |
| `/aktualne/` statická | 16 767 B | 6 818 B | 5 943 B | gzip |
| `data.json` (návštevník) | 5 488 797 B | 1 170 008 B | 869 873 B | gzip (1 192 kB pri úrovni 6) |
| `data-full.json` (admin) | 8 021 249 B | 1 742 175 B | 1 288 197 B | gzip |
| `aktualne.json` | 1 576 B | 449 B | 390 B | gzip |
| `version.txt` | 5 B | — | — | — |
| vlajka 24×18 / 48×36 | 605 / 834 B | — | — | — |
| ikonka (priemer, 8 120 súborov, 11,7 MB) | 1 511 B | — | — | — |
| mini-balík `#pageBoot` v statickej stránke | Anglicko 1 794 B (9 uzlov), Championship 8 797 B (28 uzlov), Aktuálne 317 B | 573 / 2 447 / 259 B | | súčasť HTML stránky |

### M2. Čo sa sťahuje pri 1. návšteve (gzip server, mobil 390 px, externé zablokované) — `D-1`, `D-6`, Lighthouse
| Stránka | požiadaviek | prenesené spolu | z toho data.json | HTML | index.html appky | ikonky | vlajky | externé pokusy |
|---|---:|---:|---:|---:|---:|---|---|---|
| domov `/` | 7 | 1 244 kB | 1 164 kB | 78 kB (= appka) | — | 0 | 0 | gc.zgo.at, 2× ban.tipsport.sk |
| Anglicko | 12 | 1 257 kB | 1 164 kB | 8 kB | 78 kB | 0 | 4 (2,6 kB: 16x12, 20x15, 24x18, 40x30) | 3 |
| Championship | 37 | 1 307 kB | 1 164 kB | 10 kB | 78 kB | 27 (43,6 kB) | 2 | 3 |
| Aktuálne | 11 | 1 257 kB | 1 164 kB | 7 kB | 78 kB | 3 (4,6 kB) | 0 | 3 |
| hľadanie „arsenal“ | +13 | +21 kB | — | — | — | 10 (18,9 kB) | 3 | — |
| EN domov | 8 | 1 242 kB | 1 161 kB | 79 kB | — | 0 | 0 | sportlinky.sk/aktualne.json, gc.zgo.at |

Poradie (Anglicko, slow 4G): statická HTML 0→~0,25 s → `fetch /index.html` → `document.open` 0,8 s → appka v DOM 1,16 s → `aktualne.json` + `version.txt` ~1,3 s → `data.json` štart ~1,5 s (po `load`) → dorazí ~7,2 s → parse 103 ms + prekreslenie 256 ms.

Opakované návštevy (`D-6`): 2. stránka do 10 min **62 kB** (HTML + ikonky; index.html a data.json z cache), domov **79 kB**, tá istá stránka **1,2 kB** (len aktualne.json + version.txt).

### M3. Lighthouse 12.8.2 — gzip server (ako GitHub Pages)
| Beh | Výkon | Prístup. | BP | SEO | FCP | LCP (simul.) | LCP (pozorované, skutočné) | TBT | CLS | Speed Index |
|---|---|---|---|---|---|---|---|---|---|---|
| mobil domov SK | 57 | 100 | 100 | 100 | 1,3 s | 7,7 s * | 1,2 s | 750 ms | 0 | 2,3 s |
| mobil Anglicko | 57 | 100 | 100 | 100 | 0,7 s | 7,6 s * | 1,0 s | 780 ms | 0 | 1,1 s |
| mobil Championship | 54 | 100 | 100 | 100 | 0,7 s | 7,8 s * | 0,7 s | 970 ms | 0 | 1,0 s |
| mobil Aktuálne | 80 | 100 | 100 | 100 | 0,7 s | 1,8 s | 0,3 s | 840 ms | 0 | 0,8 s |
| mobil EN domov | 90 | 95 | 100 | 100 | 1,4 s | 1,8 s | 0,2 s | 380 ms | 0 | 1,4 s |
| desktop domov SK | 99 | 100 | 100 | 100 | 0,3 s | 0,5 s | 0,25 s | 100 ms | 0 | 0,4 s |

\* artefakt simulácie — viď nález 8. Pre porovnanie python server bez gzip: mobil domov 71 / LCP 2,3 s / TBT 1 380 ms; Anglicko 63 / LCP 29,7 s; Championship 63 / LCP 30,0 s; Aktuálne 85; EN 86; desktop 100 — tieto čísla sú skreslené chýbajúcim gzipom (`uses-text-compression` 4,4 MB) a neberiem ich.

Top odporúčania Lighthouse (gzip): `total-blocking-time` (750–970 ms), `max-potential-fid` (360–530 ms), `mainthread-work-breakdown` (2,0–3,3 s), `unused-javascript` 26 kB (admin kód — bod 25), `unminified-javascript` 19 kB, `forced-reflow` (`updateAktFade`), `largest-contentful-paint` (artefakt), `no-document-write` (zámer), `uses-long-cache-ttl` (GitHub Pages). **Nemerateľné lokálne / artefakt lokálneho servera:** `uses-text-compression`, `total-byte-weight`, `document-latency-insight` (python server bez gzip a cache hlavičiek — na gzip serveri zmizli).

### M4. Prevzatie statickej stránky appkou (`D-3b`, gzip server, mobil, CPU 4×, slow 4G)
| Stránka | FCP (statická) | `document.open` | dlaždice appky | LCP (konečné) | CLS bez vstupu | dlhá úloha prevzatia | data.json dorazí | parse | dlhé úlohy po dátach | TBT≈ (14 s) |
|---|---:|---:|---:|---|---:|---:|---:|---:|---|---:|
| Anglicko | 288 ms | 811 ms | 1 156 ms | 288 ms (`p.desc`) | 0,0002 | 348 ms | 7,29 s | 103 ms | 186 + 256 ms | 640 ms |
| Championship | 264 ms | 817 ms | 1 169 ms | 264 ms (`p.desc`) | 0,0002 | 349 ms | 7,88 s | 95 ms | 184 + 243 ms | 626 ms |
| Aktuálne | 284 ms | 772 ms | 1 074 ms | 284 ms (footer) | 0,0003 | 300 ms | 7,22 s | 97 ms | 214 + 222 ms | 586 ms |
| domov (appka priamo) | 332 ms | — | 315 ms | 332 ms (hľadanie) | 0,0354 (nález 7) | 88 + 71 + 133 ms | 6,80 s | 116 ms | 187 + 212 ms | 441 ms |

Rýchla sieť + CPU 4× (`D-8`): FCP domov 220–284 ms, Anglicko 128 ms; data.json spracovaný @ 0,9–1,0 s; po udalosti `load` nasledujú 3 dlhé úlohy spolu ~0,55 s (183 + 178 + 190 ms).

### M5. INP — klik každých ~0,75 s od príchodu (`D-3b`)
| Stránka | kliky pred data.json | kliky počas spracovania | kliky po data.json | max |
|---|---|---|---|---|
| Anglicko (dlaždice) | 32–56 ms | 144 ms | 112–152 ms | **152 ms** |
| domov (dlaždice) | 40–96 ms | 112 ms | 80–104 ms | 112 ms |
| Championship (linky klubov, nové okno) | 16–24 ms | 16 ms | 16 ms | 24 ms |
| Aktuálne (linky) | 16–32 ms | 16 ms | 16 ms | 32 ms |

### M6. Pamäť (`D-5`, desktop, po vynútenom GC)
| Stav | halda | DOM uzly | poslucháči |
|---|---:|---:|---:|
| domov zo štartovacieho balíka (bez data.json) | 1,6 MB | 1 466 | 133 |
| po data.json | 10,0 MB | 1 466 | 133 |
| po 50 navigáciách | 10,2 MB | 1 213 | 92 |
| po 100 navigáciách (37 priečinkov) | 10,2 MB | 1 243 | 97 |
| hľadanie „a“ (313 výsledkov) | 17,2 MB | 10 716 | 1 121 |
| po vyčistení hľadania | 17,2 MB | 1 249 | 110 |

### M7. Mobilné šírky (`E-7`) — výber
| Stránka | vodorovný scroll (320–768) | dotykové ciele < 44 px (z celku) | stĺpce | prepínač zobrazenia |
|---|---|---|---|---|
| domov | nie | 10 z 20 (drobček 16 px, „Aktuálne ›“ 101×15, „+N ›“ 36×20, pätička 15–17 px, karty Aktuálne 36 px vysoké) | nie | skrytý |
| sekcia Anglicko | nie | 15 z 22 (+ 5 drobčekov 16 px, Späť 75×30) | nie | skrytý |
| liga Championship | nie | **64–70 z 89** (48× `a.si` 15×15, 15× linka klubu 33 px vysoká) | nie | skrytý |
| hľadanie „slovan“ | nie | 55 z 69 | nie | skrytý |
| Aktuálne | nie | 10 z 10 (linky 33 px vysoké) | nie | skrytý |

### M8. Kontrast (`E-10`, dvojice pod 4,5 : 1)
| Text | Pozadie | Pomer | Kde | Hodnotenie |
|---|---|---:|---|---|
| #2a3a4a | #0f1923 | 1,52 | `.bc-sep` „›“ | dekoratívne, v poriadku |
| #e84242 | #1a2a3a | 3,68 | `.c-arrow`/`.cf-arrow` „→“ | dekoratívne |
| #77808c | #1a2a3a | 3,67 | emoji športu `.fav-sport` | emoji, netýka sa |
| #e84242 | #0f1923 | 4,47 | „LINKY“ v pätičke (16 px tučné) | o 0,03 pod limitom; v hlavičke 19 px → limit 3,0 ✓ |

### M9. axe-core 4.14 (`E-8`)
| Stránka | porušenia |
|---|---|
| domov / hľadanie / EN domov | `region` 5× (drobčeky, lišta Aktuálne) |
| Anglicko / Championship | `region` 13× / 15× |
| Aktuálne / EN Live This Week | `region` 3× ; EN: `link-name` 1× (banner) |
| kontrast | 0 porušení (9–23 „neúplných“ = prvky s priehľadným pozadím, overené ručne v M8) |
