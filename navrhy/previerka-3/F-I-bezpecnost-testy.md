# Previerka č. 3 — oblasť F) Bezpečnosť + I) Testy a strážcovia

Pripravil: tím pre bezpečnosť a testy. Všetky tvrdenia sú overené (súbor:riadok, výstup skriptu alebo snímka). Experimenty bežali na KÓPIÁCH v scratchpad/build/, v repozitároch sa nič nemenilo.

---

## 🔴 Kritické

### 1. Staré heslo `[staré heslo — zámerne nevypísané]` je natrvalo v git histórii oboch verejných repozitárov — F) Bezpečnosť
- **Čo je zle:** Repozitáre `sportlinks226/sport-linky` aj `sportlinks226/sportlinking` sú VEREJNÉ. V ich histórii je commitnuté heslo admina v čitateľnej podobe. Hoci sa dnes prihlasuje cez `pwKdf` a čitateľné heslo už v aktuálnom `data.json` nie je, z histórie sa dá kedykoľvek vytiahnuť:
  - `git log -p -S'"password"' -- data.json` → commit `5a64ee0` (2026-07-07) a `602ed29`/`db39488` (2026-07-13): `"password": "[staré heslo — zámerne nevypísané]"`.
  - Neskôr bol aj `"passwordHash"` (SHA-256 bez soli) v histórii — `2573ec5`, `data.json:3` → `3a2e92ef…` (SHA-256 bez soli sa dá rýchlo prelomiť slovníkom).
- **Prečo záleží:** Čokoľvek raz commitnuté do verejného repozitára treba považovať za zverejnené navždy. Ak Miro to isté heslo (alebo jeho obmenu) používa kdekoľvek inde (GitHub, e-mail `miral73@gmail.com`, Tipsport…), útočník ho má zadarmo.
- **Dôkaz:** `git -C /home/user/sport-linky log -p -S'"password"'` → `+ "password": "[staré heslo — zámerne nevypísané]",`. E-mail `miral73@gmail.com` je autor všetkých 360 SK / 93 EN commitov (`git log --format='%ae'`).
- **Riešenie:** Heslo `[staré heslo — zámerne nevypísané]` (a každé podobné) treba zmeniť všade, kde ho Miro použil — najmä ak ho má na GitHube alebo e-maile. Nové admin heslo nech je dlhé a nikde inde nepoužité. Prepisovať git históriu netreba (admin dnes nemá serverovú moc — viď bod 2), ale heslo sa už nesmie nikde inde používať. Náročnosť: malá (zmena hesiel). SK aj EN.

---

## 🟠 Dôležité

### 2. Odtlačok admin hesla (`pwKdf`) je vo verejne stiahnuteľnom `data.json` — F) Bezpečnosť
- **Čo je zle:** Odľahčený `data.json` pre návštevníkov PONECHÁVA `pwKdf` (soľ + odtlačok). `generator.py:736-737` maže len `passwordHash` a `password`, nie `pwKdf` (komentár `generator.py:726`: „pwKdf ostáva — overuje sa ním heslo"). Súbor je verejný na `sportlinky.sk/data.json` (robots.txt ho síce „Disallow", ale to je len odporúčanie, súbor sa dá stiahnuť).
- **Reálne riziko — zhodnotené:** PBKDF2-SHA-256, soľ 16 bajtov, **600 000 opakovaní**, 256 bitov (`index.html:1147,1154-1163`). 600k je presne hodnota, ktorú odporúča OWASP pre PBKDF2-SHA256 — na silné heslo je offline útok drahý. Dosah prelomenia je ale **nízky**: admin na živom webe nerobí nič so serverom — po prihlásení len stiahne `data.json`/`aktualne.json` a vyrobí súbor na ručné nahratie. Nahrať ho na web môže len ten, kto má write do repozitára (= iba Miro, 0 ďalších spolupracovníkov, 0 forkov). Útočník s prelomeným heslom teda vie admin otvoriť vo svojom prehliadači, ale **nevie zmeniť živý web**.
- **Dôkaz:** `python3 -c "import json;d=json.load(open('data.json'));print(d['pwKdf'])"` → `salt` 32 hex znakov, `iter` 600000. `generator.py` `lite_data()` neodstraňuje `pwKdf`.
- **Riešenie:** Zvážiť presun `pwKdf` len do `data-full.json` (ten sťahuje až admin po „prihlásení") — ale pozor, prihlásenie overuje heslo ešte pred stiahnutím full dát (`index.html:2596-2611`), takže by sa musel upraviť tok (najprv stiahnuť malý súbor len s `pwKdf`). Keďže dosah je nízky, stačí mať silné, nikde inak nepoužité heslo (bod 1). Náročnosť: stredná, priorita nižšia. SK aj EN.

### 3. Správa Strážcu liniek v repozitári je ZASTARANÁ — 1206 blokujúcich adries je vedených ako „varovania" — I) Testy a strážcovia
- **Čo je zle:** `kontrola-liniek/sprava.md` a `sprava.csv` boli vyrobené STARŠOU verziou `strazca_liniek.py`. Súhrn hlása **1467 varovaní** a len **15 blokujúcich adries**. Lenže z 1467 „varovaní" je **1186× HTTP 403, 16× HTTP 429, 4× HTTP 401** — teda **1206 adries, ktoré AKTUÁLNY kód (`strazca_liniek.py:91,331-337`, `BLOKUJE_KODY = (401,403,429,999)`) zaraďuje do „🚫 blokuje robotov" (len súhrn), nie medzi varovania.** Rozdiel potvrdzuje aj text dôvodu: v `sprava.csv` je „403 – prístup zamietnutý (web asi blokuje robotov)", kým aktuálny kód píše „(blokuje robotov)".
- **Prečo záleží:** Miro pozerá správu na GitHube a vidí 1467 „over ručne" položiek — pritom ~1206 z nich sú weby, ktoré len nepúšťajú roboty (netreba ich riešiť). Report tak pôsobí oveľa horšie, než realita.
- **Dôkaz:** `python3` rozbor `sprava.csv` → `VAROVANIE` spolu 1467, z toho `HTTP 403` 1186, `HTTP 429` 16, `HTTP 401` 4 (= 1206 patrí do „blokuje"). `stav.json`: `varovanie` 1440, `blokuje` 15.
- **Riešenie:** Stačí nechať zbehnúť Strážcu liniek s aktuálnym kódom (ďalší pondelok, alebo ručne Actions → „Strážca liniek") — `stav.json` aj správa sa samy prepíšu a 401/403/429 sa presunú do súhrnu „blokuje". Po behu bude actionable nálezov ~36 (1 mŕtva + 7 presťahované + 28 podozrivé) a varovaní ~260 (timeout/5xx/SSL). Náročnosť: malá. SK (EN strážcu nemá).

---

## 🟢 Drobné

### 4. CSP `frame-ancestors` sa v `<meta>` ignoruje → clickjacking sa takto nedá zakázať — F) Bezpečnosť
- **Čo:** CSP je vložená cez `<meta http-equiv>` (`index.html:13`, `generator.py:1081-1085`), lebo GitHub Pages neumožní nastaviť HTTP hlavičky. Direktíva `frame-ancestors` v `<meta>` NEFUNGUJE (prehliadač ju tam ignoruje) a `X-Frame-Options` sa cez meta tiež nedá. Web sa teda dá vložiť do `<iframe>` na cudzej stránke (clickjacking).
- **Riziko:** Nízke — je to rozcestník odkazov, niet čo „preklikať" v neprospech používateľa. Uvádzam ako známu hranicu GitHub Pages, nie ako chybu kódu.
- **Dôkaz:** CSP reťazec v `index.html:13` neobsahuje `frame-ancestors` (a aj keby, v meta by nemal účinok). `object-src 'none'`, `base-uri 'self'`, `form-action 'self'` sú správne a v meta fungujú.
- **Riešenie:** Ak by raz web bežal za vlastným serverom/CDN, pridať hlavičku `Content-Security-Policy: frame-ancestors 'self'` + `X-Content-Type-Options: nosniff` + HSTS. Na GitHub Pages sa nedá, netreba riešiť. Náročnosť: malá (len keby sa menil hosting).

### 5. SK repozitár nemá `.gitignore` — F) Bezpečnosť
- **Čo:** `/home/user/sport-linky` nemá `.gitignore` (EN repozitár má — ignoruje `aktualne.json`, `__pycache__/`). Pri ručnom commite sa tak môže omylom dostať `__pycache__/` alebo dočasné súbory do repozitára.
- **Dôkaz:** `ls -la /home/user/sport-linky/.gitignore` → neexistuje; `git check-ignore __pycache__` → nič.
- **Riešenie:** Pridať `.gitignore` s `__pycache__/`, `*.pyc`, prípadne lokálnymi výstupmi (`_site/`, `test-vystup/`). Náročnosť: malá. SK (EN už má).

### 6. `actions/cache@v5` je o jeden major pozadu (najnovší v6) — F) Bezpečnosť/workflowy
- **Čo:** Vo workflowoch test-webu.yml a test-hlbkovy.yml (oba repozitáre) je `actions/cache@v5`. Overené aktuálne majory (github.com/releases): checkout **v7** (máte v7 ✓), setup-python **v7** (✓), configure-pages **v6** (✓), upload-pages-artifact **v5** (✓), deploy-pages **v5** (✓), upload-artifact **v7** (✓), **cache v6 (máte v5 ✗)**.
- **Riziko:** Nízke (funkčné, len staršie). 
- **Riešenie:** Pri najbližšej úprave zdvihnúť `actions/cache@v5` → `@v6`. Náročnosť: malá. SK aj EN.

### 7. Anti-bot kódy mimo 401/403/429/999 (napr. HTTP 454) ostávajú „varovanie" — I) Testy a strážcovia
- **Čo:** V `sprava.csv` je 18× HTTP 454 (nesprávny/neštandardný kód, typicky anti-bot ochrana ako Akamai) vedených ako varovanie. `strazca_liniek.py:331` pozná len `BLOKUJE_KODY = (401,403,429,999)`.
- **Riešenie (nápad):** Pridať do `BLOKUJE_KODY` aj 454 (prípadne 456), aby sa anti-bot weby nehromadili vo varovaniach. Náročnosť: malá. SK.

---

## 💡 Nápady

### 8. Chýba test, ktorý overí escapovanie (XSS) na úrovni generátora — I) Testy
- Dnešné testy kontrolujú porušenia CSP za behu (`test_webu` cez `securitypolicyviolation`), ale žiadny test cielene neskúša, že škodlivé hodnoty z dát sa správne escapujú. Odporúčam pridať malý test (vzor: `findings/skripty/F-01-xss-data.py`), ktorý do kópie dát vloží `<img onerror>`, `javascript:` URL, `</script>` a over, že výstup `generator.py` ich má escapované a `safeUrl` ich zmení na `#`. Náročnosť: malá–stredná. SK aj EN (súbory sú zhodné).

### 9. Strážca liniek — čo by sa oplatilo pridať — I)
- **soft-404:** web vráti HTTP 200, ale stránka je „nenájdené" (bežné u CMS). Dalo by sa odchytiť podľa titulku/kľúčových slov. Náročnosť: stredná.
- **http:// linky s dostupným https://** — ak linka začína `http://` a `https://` tej istej adresy funguje, navrhnúť povýšenie. Náročnosť: malá.
- **presmerovanie na inú doménu** už je pokryté (`prestahovana` / „možná predaná doména") — dobré.

### 10. SHA-pinning akcií (teraz tagy `vN`) — F)
- Akcie sú pripnuté na pohyblivé tagy (`@v7`), nie na SHA. Pri first-party `actions/*` je riziko nízke, ale SHA-pin by zabránil tichej zmene tagu. Len nápad, nie nutnosť. SK aj EN.

### 11. `'unsafe-inline'` v `script-src` je hlavná (a ťažko odstrániteľná) slabina CSP — F)
- CSP povoľuje `'unsafe-inline'` pre skripty aj štýly, lebo appka má všade inline `onclick` a inline `<script>`. Znamená to, že CSP sama o sebe XSS nezastaví — bráni mu až dôsledné escapovanie (ktoré drží, viď „Čo je v poriadku"). Prechod na nonce/hash by bol veľký zásah (prepísať desiatky `onclick`). Uvádzam ako známy kompromis, nie ako akčnú položku. Pozitívne: `'unsafe-eval'` povolené NIE je (potvrdené aj tým, že `test_webu.py:1060` sa vyhýba `eval`).

---

## Čo je v poriadku (overené)

**F) Bezpečnosť**
- **XSS prakticky overené — nič sa nevykoná.** Do kópie `data.json`/`aktualne.json` som vložil `<img src=x onerror=…>`, popis s `</script>`, `url: javascript:…` a `data:text/html,…`, icon s `"`, slug s `../` a `?`, škodlivé bannery a promo. Web som vygeneroval (`generator.py`) a spustil na porte 8125 v Chromiu (node Playwright). Výsledok skriptu `findings/skripty/F-02-xss-browser.js` naprieč vektormi (domov, /futbal/, hľadanie + klik na škodlivý priečinok, `/#<img onerror>`, `?q=<img>`, `/#admin`, stránka Aktuálne): **0 dialógov, 0 vykonaných XSS, 0 chýb JS.** Snímka: `snimky/F-01-xss-hladanie-domov.png`.
  - V statickom HTML sú payloady buď escapované (`&lt;img …`, `index.html` 2×), alebo sú vnútri JSON reťazca v `<script>`/JSON-LD, kde generátor nahrádza `</` → `<\/` (`generator.py:690,1657,1946,1974`), takže `</script>`/`</title>` značku nezavrú. `javascript:` a `data:` adresy `safeUrl()` zmení na `#` (`index.html:1187`, `generator.py:237-240`).
- **Sandbox reklamy je správny.** `AD_SANDBOX = 'allow-scripts allow-popups allow-popups-to-escape-sandbox'` (`index.html:2950`, `generator.py:1091`) — **bez** `allow-same-origin` a **bez** `allow-top-navigation`: partnerský skript nevidí stránku, cookies ani localStorage a nevie presmerovať hlavné okno. `postMessage` prijíma výšku len od vlastného okienka (`f.contentWindow === e.source`, `index.html:2972`) a obmedzuje ju na 10–1000 px. Test `test_webu.py` j) to overuje (`SANDBOX_ZAKAZANE`/`SANDBOX_POTREBNE`).
- **Admin:** stará cesta `passwordHash`/`password` je mŕtva — `pwMatches` a `hasPw` v aktuálnom `index.html` pracujú len s `pwKdf` (`index.html:1166-1172`), generátor `passwordHash`/`password` maže (`generator.py:736-737`). PBKDF2 600k = odporúčanie OWASP. Session: v prehliadači sa drží len verzia dát (`sportStromVer`) a príznak `dirty` v `localStorage`; celé dáta v IndexedDB len pre admina s rozpracovanými úpravami. Admin nerobí nič so serverom (len sťahuje a vyrába súbory).
- **Tajomstvá:** v histórii oboch repozitárov NIE sú tokeny ani API kľúče (`git log -p | grep` na `ghp_/github_pat_/gho_/AKIA/xox…/PRIVATE KEY/api_key` → 0). Jediné „citlivé" sú staré heslo (bod 1) a e-mail majiteľa (verejný v commitoch).
- **Workflowy:** `build.yml` (oba) beží len na `push`/`schedule`/`workflow_dispatch`, NIE `pull_request`/`pull_request_target` → fork nespustí build so secretmi. `permissions` sú na úrovni workflow `contents: read` a dvíhajú sa až per-job na minimum (build `contents:write pages:read`, deploy `pages:write id-token:write`, en-build `permissions: {}`). `strazca-data-json.yml` beží na `pull_request` (z base vetvy — fork ho nezmení), `contents: read`, žiadne secrets, len `git diff` + `exit 1`; keďže ochrana main nemá povinné kontroly (rozhodnutie 4), je to poistka-upozornenie, nie blokáda — v poriadku podľa zadania. `EN_BUILD_TOKEN` sa používa len v `en-build` (`permissions: {}`, `continue-on-error`), je to fine-grained PAT obmedzený na repozitár `sportlinking` (Actions: write) — úzky dosah; write do SK repa má len Miro.
- **`[skip ci]`** sa používa správne (bot commity vlajok/ikoniek/sitemap/strážcu nespúšťajú ďalší build); nie je to obchádzanie kontrol (jediná PR kontrola `[skip ci]` neovplyvní).
- **Ochrana main:** ruleset „ochrana main" je `active` (GitHub API `repos/.../rulesets`), bez povinných kontrol a povinných PR (rešpektuje rozhodnutie 4 a 2 — Miro nahráva `data.json`/`aktualne.json` priamo). Repozitáre: `secret_scanning` + `push_protection` zapnuté, 0 ďalších spolupracovníkov, 0 forkov.
- **Závislosti:** Playwright pripnutý (`PW_VERSION: 1.64.1`, `playwright-core@1.48.2`); strážca používa len štandardný Python.

**I) Testy**
- `test_strazca.py` (223 r.): **16/16 OK** (lokálne, bez siete). Pokrýva bod 14 (slučka, predaná doména, rovnaké meno/iná koncovka, podstránka), bod 22 (403=blokuje, druhý pokus necháva horší výsledok, počítadlo behov sa v ten istý deň nezvýši, starý formát `stav.json`). Dobré pokrytie logiky.
- `test_webu.py` (1242 r.): proti lokálnemu SK webu **15/16 OK**. Jediné ❌ „h) Stránka 404 je prázdna (335 znakov)" je **obmedzenie prostredia** — lokálny `python -m http.server` neservíruje `404.html` (vráti vlastnú malú 404). Na GitHub Pages to funguje. Reklamy aj GoatCounter test BLOKUJE (`BLOKOVANE`), takže nerobí falošné zobrazenia (rozhodnutie 7 ✓). Beh ~50 s lokálne.
- `test_hlbkovy.py` (768 r.): proti lokálnemu SK webu zlyhali a)/b)/g) — **obmedzenie prostredia**: `sitemap.xml` obsahuje absolútne adresy `https://sportlinky.sk/…` (lokálny build mal `BASE_URL=sportlinky.sk`), takže kontrola `u.startswith('http://127.0.0.1:8123/')` neprejde a b)/g) kaskádovo padnú. c) robots a d) verzia dát OK, e)/f) varovania (lokálna adresa / prázdny zoznam stránok). Proti živému webu by bežali správne.
- Falošné „✅": riziko malé. Drobnosti: `f) Banner` len kontroluje existenciu kontajnera (pri chybe `warn`); `k) Aktuálne` pri starej appke vráti `warn` a preskočí podstrčený súbor — teoreticky by rozbitá appka mohla prejsť ako `warn`. Nie je to falošné zelené „pass" celého testu. Test beží proti správnej verzii (`--od` čaká na `Last-Modified` ≥ štart buildu, bod 19; hĺbkový porovnáva `data-full.json` s `main`).

---

## Merania

| Vec | Hodnota |
|---|---|
| XSS vektory (browser) | 7 scenárov, **0 dialógov, 0 vykonaní** |
| `test_strazca.py` | 16/16 OK, 6,6 s |
| `test_webu.py` (lokál SK) | 15 ✅ / 1 ❌ (404 = obmedzenie http.server) |
| `test_hlbkovy.py` (lokál SK) | 2 ✅ / 2 ⚠️ / 3 ❌ (a,b,g = sitemap base sportlinky.sk ≠ 127.0.0.1) |
| Strážca — committed `stav.json` | ok 9120, varovanie 1440, mŕtva 27, blokuje 15, presťahovaná 7 |
| z „varovaní" patrí do „blokuje" (nový kód) | 1206 (403×1186, 429×16, 401×4) |
| Actionable nálezy strážcu po refaktore | ~36 (1 mŕtva + 7 presťahované + 28 podozrivé) |
| PBKDF2 | SHA-256, soľ 16 B, 600 000 iterácií, 256 b |
| pwKdf vo verejnom `data.json` | ÁNO (len `passwordHash`/`password` sa mažú) |
| Spolupracovníci / forky | 1 admin (Miro) / 0 forkov; secret scanning + push protection ON |
| Verzie akcií | všetky na aktuálnom majore okrem `actions/cache@v5` (najnovší v6) |

Skripty: `findings/skripty/F-01-xss-data.py`, `F-02-xss-browser.js`, `F-03-xss-snimka.js`. Snímka: `snimky/F-01-xss-hladanie-domov.png`. Výstupy testov: `findings/data/test-webu-sk/`, `findings/data/test-hlbkovy-sk/`.
