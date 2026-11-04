# J) Údržba a prehľadnosť kódu + H) EN web: texty, preklady, rozdiely SK↔EN

**Čo som prezrel (len čítal, nič nemenil):** celý `index.html` (3 986 r.), celý `generator.py` (2 028 r.), `ikony.py`, `vlajky.py`, `strazca_liniek.py`, `testy/test_webu.py`, `testy/test_hlbkovy.py`, `testy/test_strazca.py`, všetky workflowy v oboch repozitároch, EN repozitár `sportlinking` (diff -r), obrázky favicon/og-image/apple-touch-icon, `data.json` (len čítanie, cez skripty).
**Overenie zrkadlových funkcií:** vlastný skript spustil appku v prehliadači (Playwright) na lokálnom builde a pre **VŠETKY priečinky** (SK 1 663, EN 1 662 — z toho 118 prázdnych bez stránky) porovnal adresu, titulok, meta popis, canonical, H1, počet liniek a **poradie podpriečinkov** s HTML statických stránok (SK 1 545, EN 1 544). Navyše **naozaj otvoril** 300 náhodných SK stránok (+ všetky z tenisu a zimných športov) a 209 EN stránok (+ všetky z tenisu, zimných športov a hádzanej), počkal na prevzatie appkou a porovnal, čo appka nastavila — po prevzatí (z mini-balíka) aj po príchode celých dát. Výsledky v časti „Merania“.
Skripty: `findings/skripty/J-porovnanie.js` (hlavné porovnanie), `J-domov.js` (domov, lišta Aktuálne, okienko reklamy), `J-tipovanie-srcdoc.js`, `J-mrtvy-kod.py`, `J-ids-v-datach.py`, `J-en-texty.py`; výstupy v `findings/data/J-*.json|log` a `findings/skripty/J-*.log`.

Čo už bolo nájdené v predošlých previerkach a je hotové, znova nenavrhujem. Odložené body 11/25/26 (rozdelenie kódu, admin.js, mapa id→uzol) uvádzam len ako 💡 tam, kde na ne narážam.

---

## Nálezy

### 1. Poradie krajín na anglickom webe: appka a generátor radia inak (5 stránok)
- **Závažnosť:** 🟠 dôležité; oblasť J (zrkadlové funkcie) + H
- **Čo je zle:** na EN webe sa krajiny v kontinentoch radia podľa anglickej abecedy. Appka a generátor to však robia trojako inak, takže návštevník z Googlu najprv vidí statickú stránku s jedným poradím dlaždíc a o chvíľu (po prevzatí appkou) sa dlaždice **preskupia** — na 5 stránkach. Dôvody:
  1. **PINNED_EN** (priečinky, ktoré majú ostať vpredu — Španielsko, Nemecko…, 25 id) existuje **len v appke** (`index.html:1193–1204`), generátor nič nepripína a radí všetko abecedne (`generator.py:494–497`).
  2. **CONTINENTS_SK** v appke (`index.html:1186–1188`) má o 2 názvy viac než **CONTINENTS** v generátore (`generator.py:113–114`): „Južná a Stredná Amerika (SCAHC)“ a „Severná Amerika a Karibik (NACHC)“ (hádzaná, 3 + 3 priečinky v dátach). Appka ich deti radí abecedne, generátor nie.
  3. Spôsob radenia: appka `localeCompare(…, 'en')` (`index.html:1518`), generátor `.lower()` (`generator.py:497`). Pri písmenách s diakritikou dá iné poradie: „São Tomé and Príncipe“ je v statickej stránke `/football/clubs/africa/` na 47. mieste z 53 (medzi Sudan a Tanzania), v appke na 40. (medzi Rwanda a Senegal).
- **Dôkaz:** `findings/data/J-porovnanie-en.json` → rozdiely „PORADIE podpriečinkov“ na `/basketball/clubs/europe/` (appka: Spain, Germany, Italy, France, Albania…; statika: Albania, Armenia, Austria…), `/basketball/clubs/asia/`, `/handball/clubs/europe/` (appka: Slovakia, Czechia, Germany…; statika: Austria, Belarus, Belgium…), `/handball/clubs/asia/`, `/football/clubs/africa/`. Pri skutočnom otvorení stránok `/handball/clubs/europe/` a `/handball/clubs/asia/` sa poradie po prevzatí appkou zmenilo (2 z 209 otvorených EN stránok). Na SK webe 0 rozdielov v poradí. Skript `J-ids-v-datach.py` (výstup `J-ids-v-datach.log`): „len v index.html: ['Južná a Stredná Amerika (SCAHC)', 'Severná Amerika a Karibik (NACHC)']“, „PINNED_EN je len v index.html: True“.
- **Prečo na tom záleží:** preskupenie dlaždíc po načítaní pôsobí ako chyba a „krajiny, ktoré majú ostať vpredu“ (Mirova voľba) Google ani návštevník bez prevzatia nevidí. Je to presne typ nezhody, ktorý previerka 2 (bod 15) chcela odstrániť.
- **Riešenie:** jediný zdroj pravdy. Najjednoduchšie: generátor pošle appke hotové poradie (ako už robí `_slugFix`/`_titleNoSport`): do odľahčeného `data.json`/BOOT/mini-balíka dať pole `order_en` vypočítané generátorom (PINNED + abeceda), a v appke EN radenie úplne vypustiť (ostane len `order_en`). Alebo aspoň: PINNED_EN a oba názvy kontinentov preniesť do `generator.py` a radiť rovnakým kľúčom (napr. bez diakritiky: `slugify(name)`) na oboch stranách. Náročnosť: stredná. Súbory: `generator.py`, `index.html`. SK aj EN (kód je spoločný; prejaví sa len na EN).

### 2. EN repozitár nesie starý `data.json` (v762, 7,8 MB) s nesoleným odtlačkom hesla
- **Závažnosť:** 🟠 dôležité; oblasť H (7)
- **Čo je zle:** `sportlinking/data.json` je verzia **762** (SK má 1 125), 16 270 uzlov (SK 16 510), stále obsahuje `passwordHash` (64 hex = SHA-256 bez soli) a 21 starých položiek `aktualne`. Build EN webu ho **nikdy nepoužije** — vždy stiahne `data-full.json` zo sportlinky.sk a keď sa to nepodarí, build zastaví (`sportlinking/.github/workflows/build.yml:66–69`). Používa ho len `vlajky-skuska.yml` (EN) a každý, kto si EN repo spustí lokálne — dostane 4 mesiace staré dáta a môže sa čudovať. Súbor sa v EN repe menil 16× („Add files via upload“), naposledy pred PR #23.
- **Prečo na tom záleží:** (a) mätie — test_hlbkovy kontrola d) na EN porovnáva web so SK webom, nie s týmto súborom, takže nikto si nevšimne, že je zastaraný; (b) bezpečnosť — `passwordHash` je rýchly odtlačok bez soli. Previerka 1 (bod 13) odporučila dostať ho z webu, to sa stalo (`generator.py:736–737` ho maže), ale v EN repe je ďalej verejne čitateľný. Ak admin heslo ostalo rovnaké ako pred zavedením pwKdf (26.10.2026), dá sa z tohto odtlačku lámať offline. (História gitu ho obsahuje aj v SK repe — 2 commity — takže zmazanie súboru je len prvý krok.)
- **Dôkaz:** `python3 -c "…"` výstup: `EN data.json: version 762 nodes 16270 … passwordHash True`; `ls -la`: 7 837 777 B; `git log --all --oneline -- data.json | wc -l` = 16.
- **Riešenie:** z EN repa `data.json` zmazať (PR), pridať `data.json` do `sportlinking/.gitignore` (je tam už `aktualne.json`), `vlajky-skuska.yml` v EN nech si dáta stiahne ako `ikony-vzorka.yml` (riadky 24–27). Miro: ak je admin heslo rovnaké ako pred 26.10.2026, zmeniť ho (🛠 Nastavenia → Zmena hesla). Náročnosť: malá. Len EN repo (+ heslo).

### 3. Mŕtvy kód a nedokončený bod 29 previerky 2
- **Závažnosť:** 🟢 drobné; oblasť J (1, 5)
- **Čo je zle (overené grepom v index.html + generator.py + testy):**
  - `childCount()` — `index.html:1544`, nikde sa nevolá.
  - CSS `.pw-hint` — `index.html:437`, trieda sa v HTML ani v JS nepoužíva.
  - CSS `.search-results .sr-path` — `index.html:447`, trieda `search-results` sa nikde nepoužíva (výsledky hľadania používajú `.cl-desc.sr-path`, r. 284).
  - `data_ok` — `ikony.py:398`, priradené, nikdy nečítané (ruff F841). **Previerka 2, bod 29 to už hlásila a bod je označený ako hotový — tento kus ostal.**
  - `timedelta` — `generator.py:54`, nepoužitý import (ruff F401; `timedelta` sa používa len v `ikony.py`).
  - `lsLegacyTake()` (`index.html:954–959`, volania 1027 a 1069) — migrácia celých dát z localStorage (kľúč `sportStrom`) do IndexedDB od v605 (16. 9. 2026). Návštevníkom sa celé dáta do localStorage nikdy neukladali (komentár r. 918), takže kľúč mohol mať len Mirov prehliadač v admine pred 7 týždňami. Dnes už zbytočné; dá sa zmazať aj s komentárom r. 952–953.
  - `.cols{… top:105px}` (`index.html:98`) — hodnotu vždy prepíše `colsLayout()` (`index.html:2040`, `wrap.style.top = …`), v CSS je mŕtva a zavádza.
  - Staré vetvy, ktoré **majú zmysel nechať**: `passwordHash/password` mazanie v `lite_data()` (`generator.py:736–737`) — kým existuje EN `data.json` z bodu 2, je to poistka; `#/`-routing (`index.html:1345–1346, 1364, 1388`) — staré zdieľané adresy a tlačidlo „Otvoriť v interaktívnej aplikácii“ (`generator.py:1702`, `app_href=…#/…`) ho používajú; vetva `stored.version === DEFAULT.version` (`index.html:1072–1091`) — len pre otvorenie súboru z disku. Prechodné vetvy pre staré pole `aktualne` v `data.json` (`index.html:3264, 3486–3492, 2811–2816, 2830/3792`; `generator.py:275, 295`): SK `data.json` kľúč `aktualne` už nemá (overené), má ho len starý EN súbor z bodu 2 — po jeho zmazaní sa dajú vypustiť (💡, nie nutné; `akt_for_web` v BOOT/odľahčených dátach je zámerná záloha pre appku).
- **Dôkaz:** `findings/skripty/J-mrtvy-kod.log`; `ruff check --select F,E9,B` (nižšie bod 10).
- **Riešenie:** zmazať uvedené riadky. Náročnosť: malá. `index.html`, `ikony.py`, `generator.py`, SK aj EN.

### 4. Komentáre, ktoré nesedia s kódom alebo odkazujú na neexistujúce súbory
- **Závažnosť:** 🟢 drobné; oblasť J (3)
- **Čo je zle:**
  - `index.html:23` „Posledná úprava kostry: 2026-07-15“ — kostra sa odvtedy menila desiatky ráz (bod 16 CSP 3. 11., Zadanie 26b 4. 11.…). Buď aktualizovať pri každej zmene, alebo riadok zrušiť (git to vie lepšie).
  - `index.html:1145` „Rovnako ho vyrába nástroj nastav-heslo.html“ — súbor v repozitári nie je (asi na Mirovom PC); treba dopísať, kde je, inak budúci čitateľ hľadá márne.
  - `index.html:1908` „z analýzy navrhy/stlpce-analyza-2026-11-04.md“ — v `navrhy/` je len `stlpce-prepis-2026-11-04.md`.
  - `index.html:2504` „záloha index-2026-10-05-pred-tlmeny-sport.html“ — v repozitári nie je.
  - `index.html:3170` „ulož do localStorage“ — `save()` ukladá do IndexedDB (od v605).
  - `generator.py:31, 118, 161, 508` — hovoria o `sport-strom.html`; appka sa volá `index.html` (4 miesta).
  - `generator.py:504–509` (docstring `folder_paths`): „Algoritmus … je IDENTICKÝ s ensureSlugs()“ — nie je: appka adresy skladá cez `nodeSlug()/nodeSlugBase()` + mapu `SLUG_FIX` (`index.html:1283–1300`), `ensureSlugs()` je len migrácia slovenských slugov (EN `slug_en` vôbec nerieši). Správny odkaz je `nodeSlug()`.
  - `generator.py:99` `"aktualne": "Live this week"` vs. `generator.py:378` a appka „Live This Week“ — dve verzie toho istého nápisu (malé/veľké písmená); prvá sa použije v záložnom DYN_JS.
  - Čo **sedí** (overené): veľkosti v `generator.py:684–687` a `index.html:895–897, 1001` (data.json 5,49 MB / zbalený 1,20 MB; data-full 8,02 MB / 1,77 MB; BOOT 25,6 kB SK, 29,5 kB EN); CSP komentár; opis BOOT/mini-balíka; `AKT_SPORTS` je v `index.html` a `generator.py` zhodný (22 športov); `NO_EN_ALPHA` zhodné; CSP zhodné; všetkých 23 EN náhrad v `generator.py` (riadky 1831–1861) sa v `index.html` naozaj nachádza.
- **Riešenie:** opraviť texty. Náročnosť: malá. SK aj EN.

### 5. Latentný rozdiel: náhradný meta popis priečinka bez popisu
- **Závažnosť:** 🟢 drobné (dnes sa neprejavuje); oblasť J (2)
- **Čo je zle:** keď priečinok nemá popis, appka zloží meta popis **s kontextom** „Názov (rodič · šport) — športové linky: N podkategórií, M liniek.“ (`index.html:1646–1653`), generátor **bez kontextu** „Názov — športové linky: …“ (`generator.py:88, 1588–1589`). Dnes má popis všetkých 1 544 SK aj 1 543 EN priečinkov so stránkou (overené skriptom), preto porovnanie 0 rozdielov. Pri prvom novom priečinku bez popisu sa meta popis po prevzatí appkou zmení.
- **Riešenie:** jedna z dvoch strán prevezme tvar druhej (odporúčam generátor doplniť kontext ako appka — je jedinečnejší). Náročnosť: malá. `generator.py` (alebo `index.html`). SK aj EN.

### 6. Duplicitné bloky kódu
- **Závažnosť:** 🟢 drobné; oblasť J (3)
- **Čo je zle:**
  - Admin lišta na karte (4 tlačidlá ▲▼✏️🗑) je **3×** v `index.html` (r. 1813–1818, 1832–1837, 1858–1863) a **2×** v `generator.py` (914–919, 929–934). Pri zmene treba 5 miest.
  - Stiahnutie súboru cez `Blob` + `<a download>` je **4×** (`index.html:1045–1049, 1084–1088, 2796–2800, 3429–3432`), hoci `aktDownload(obj, name)` už robí presne to.
  - Nastavenie podnadpisu + titulku pri štarte je 2× (`index.html:3891–3894` v `initApp()` a 3929–3932 v BOOT vetve) a ďalšie 2× v admine (2782–2783, 2835–2836) — tam sa na EN webe nastaví **slovenský** `DB.title`/`DB.subtitle` (nie `title_en`), čiže po uložení nastavení alebo importe v EN admine sa titulok prepne na „Športové Linky“ (len do obnovenia stránky; admin).
  - `ikony.py` ↔ `vlajky.py`: `git_uloz()` (ikony 349–375 / vlajky 157–183, líšia sa len textami logu), `png_1x1_priehladny()` (180–184 / 65–69), `log()`. `strazca_liniek.py` má tiež vlastný `log()`.
  - Tie isté konštanty na viacerých miestach: `SOCIAL_FAV`/`NO_FAVICON_HOSTS` 3× (`index.html:2466–2467`, `ikony.py:62–63`, `test_hlbkovy.py`), `AKT_SPORTS` 3× (`index.html:3207–3221`, `generator.py:138–150`, `test_webu.py` SPORT_NAZVY — tam chýba „ine“, čo je v poriadku, lebo „iné“ sa v titulku vynecháva), `AKT_MASTER` 3× (`index.html:3200`, `generator.py:229`, `test_webu.py:90`), `LIVE_ID`, `CONTINENTS` (bod 1), `CSP` (tú build kontroluje ✓), prah „≤ 10 = veľké dlaždice“ (`index.html:1807`, `generator.py:903`), `AD_SANDBOX`.
  - `test_webu.py` ↔ `test_hlbkovy.py`: 9 rovnako pomenovaných funkcií (`stiahni`, `titulok_z_html` — zhodná, `meta_z_html`, `kontrola` — 24 r. s malými odchýlkami, `zhrnutie`, `smerovanie`, `spusti`, `main`, `__init__`) a konštanty `UA_PC`, `X_TEST`, `BLOKOVANE`, `AKT_MASTER`.
- **Riešenie:** pomocné funkcie (`adminBarHtml(id)`, `stiahniJson(obj, meno)`, `nastavTitulok()`), `testy/_spolocne.py` pre oba testy, `git_uloz`/`png_1x1` do malého `build_pomocne.py` (alebo nechať — dva skripty majú byť samostatné, potom aspoň zjednotiť texty). Náročnosť: malá–stredná. SK aj EN.

### 7. Magické konštanty bez vysvetlenia / bez spoločného mena
- **Závažnosť:** 🟢 drobné; oblasť J (3)
- **Čo je zle (index.html):** `2500` ms 2× (r. 998 časový limit version.txt; r. 1015 čakanie na `load`) a `8000` (r. 3369 limit aktualne.json) — bez mena; `700` px 2× (CSS r. 90 a JS `colsAllowed()` r. 1937 — musia sedieť, nič to nestráži); `1150` (r. 82); `228`, `170`, `300`, `2`, `6` v `colsLayout()` (r. 2043–2044) — len čísla; `guard++ < 12` (r. 1607) a `< 15` (r. 2509) pre hĺbku stromu — dve rôzne hodnoty pre to isté; `22` (r. 1972 dĺžka názvu pre tooltip); `1400` (r. 1568); `200` (r. 2318 debounce) vs. `SRCH_MAX = 200` (r. 2320) — náhodná zhoda, ľahko sa pomýli; `140px` (r. 500); `64px` (r. 248). V `generator.py` `TITLE_MAX = 65` (r. 1471) a `LIVE_TITLE_MAX = 65` (r. 366) sú dve nezávislé konštanty pre jednu vec.
- **Riešenie:** pomenovať (`const CAS_VERZIA_MS = 2500` …) s jednoriadkovým „prečo“. Náročnosť: malá. SK aj EN.

### 8. Natvrdo zapísané id a názvy — všetky existujú, riziko je v tom, kde sú
- **Závažnosť:** 🟢 drobné; oblasť J (3)
- **Overené:** 32 id priečinkov v `index.html` (PINNED_EN 25, NO_EN_ALPHA 6, `f_ltw`, `f_tip`) a 7 v `generator.py` — **všetky sú v data.json** (`J-ids-v-datach.log`). 10 názvov kontinentov — všetky existujú (Európa 14 priečinkov, Ázia 12, Afrika 11, Oceánia 11, Severná a Stredná Amerika 8, Južná Amerika 7, SCAHC 3, NACHC 3, Severná Amerika 2, Ázia & Oceánia 2).
- **Riziká:** (a) PINNED_EN je zoznam 25 id uprostred kódu appky, ktorý Miro mení ručne pri každej novej „dôležitej“ krajine (komentár r. 1197–1203 opisuje 3 dávky) a generátor ho nepozná (bod 1) — lepšie ako pole v dátach (`pinEn:true`) alebo `order_en`; (b) radenie podľa **názvu** kontinentu (nie id) — premenovanie priečinka „Európa“ (napr. na „Európa (EHF)“) potichu vypne abecedu; (c) `f_tip` ako predvolená sekcia promo banneru (`index.html:2240, 2270`) — len admin; (d) `LIVE_ID`/`AKT_MASTER` sú 2–3× — kontroluje ich len človek.
- **Riešenie:** viď bod 1; kontinenty označovať príznakom v dátach (`alphaEn:true`) namiesto zoznamu názvov. Náročnosť: stredná (dáta mení Cowork). SK aj EN.

### 9. Štruktúra `index.html` (len na vedomie, 💡)
- **Závažnosť:** 💡 nápad; oblasť J (4) — súvisí s odloženými bodmi 11/25
- **Čísla:** CSS r. 26–575 (550 r.), HTML r. 577–857, malý skript na vyprázdnenie `#main` r. 663–677, hlavný skript r. 859–3980 (3 120 r.), GoatCounter r. 3983. **215 funkcií + 92 globálnych `let/const` = 307 mien v globálnom priestore** (všetko na `window`); 13 `addEventListener` na najvyššej úrovni; **78** inline `onclick=` v HTML a šablónach; 222 volaní `getElementById`; `DB.nodes.find(` 19× hoci existuje `nodeById()` (2 použitia) — to je odložený bod 26, len pripomínam.
- **Poradie blokov** je rozumné (stav → úložisko → heslo → jazyk → navigácia → render → stĺpce → promo → hľadanie → ikonky → admin auth → CRUD → nastavenia → export → okná → bannery → reklamné okienko → Aktuálne dáta → stránka Aktuálne → Aktuálne admin → render Aktuálne → init). Admin časti sú rozhádzané medzi návštevnícke (CRUD 2645–2768, nastavenia 2769–2787, export 2788–2843, bannerová farma 2902–3184 je spolu s `renderBannerSlot` pre návštevníka, Aktuálne admin 3392–3804).
- **Čo by sa dalo oddeliť bez zmeny správania** (až s bodmi 11/25): `admin.js` ≈ 1 300 r. (CRUD, nastavenia, export/import, admin bannerov a promo, admin Aktuálnych, okno hesla), `stlpce.js` ≈ 280 r. (1898–2175, uzavretý celok s vlastnými listenermi), hľadanie ≈ 160 r. (2318–2474). Najdlhšie funkcie: `renderLevel` 141 r. (1761–1904), `load` 137 r. (961–1098), `renderSearch` 98 r. (2374–2474); v `generator.py` `main()` 316 r. (1714–2031) a `render_page()` 193 r. (1521–1714). Globály by stačilo zabaliť do jedného objektu `App` alebo IIFE, inline `onclick` nahradiť delegovaním — ale to je väčší zásah, oplatí sa až pri rozdeľovaní.

### 10. Python: ruff a typy
- **Závažnosť:** 🟢 drobné; oblasť J (5)
- **Výsledok `ruff check --select F,E9,B`** (ruff 0.16.9) na 7 súboroch: **15 nálezov**, všetky okrem dvoch v testoch:
  - `generator.py:54` F401 `timedelta` nepoužitý; `ikony.py:398` F841 `data_ok` (bod 3).
  - `test_hlbkovy.py:294, 453, 460, 624` a `test_webu.py:357, 487, 552, 782` B904 — `raise Zlyhanie(...)` vnútri `except` bez `from e` (pri páde sa stratí pôvodná chyba zo stopy; len kozmetika v logu testu).
  - `test_hlbkovy.py:318, 324, 547, 552` a `test_webu.py:827` B905 — `zip()` bez `strict=` (keby mali zoznamy rôznu dĺžku, potichu sa oreže).
  - `strazca_liniek.py`, `vlajky.py`: čisté. EN repo: rovnakých 15 (súbory sú zhodné) mínus strážca.
- **Typy:** `generator.py` má anotácie pri väčšine funkcií, testy a `ikony.py`/`strazca_liniek.py` nie (štýl, nie chyba).
- **Riešenie:** `ruff --fix` na F401, `raise … from e`, `zip(…, strict=True)`. Náročnosť: malá. SK aj EN.

### 11. Drobné rozdiely v zrkadlových funkciách, ktoré sa dnes neprejavia
- **Závažnosť:** 💡 nápad; oblasť J (2)
- `slugify()`: JS maže len kombinujúce znaky U+0300–U+036F (`index.html:1265`), Python maže **všetky** kombinujúce znaky (`unicodedata.combining`, `generator.py:163`). Pri názvoch s inými značkami (arabské, hebrejské, thajské tóny) by vznikli rôzne slugy. Dnes 0 rozdielov (všetky latinské). Poistka: v JS použiť `/\p{M}/gu`.
- „Dnes“: generátor ráta v Bratislave (`generator.py:244`), appka v čase prehliadača návštevníka — zámerne (komentár); v Amerike sa tak lišta Aktuálne/NEW štítok môže na pár hodín líšiť od statického HTML. Nič netreba, len vedieť.
- `#/`-adresa v tlačidle „Otvoriť v interaktívnej aplikácii“ (`generator.py:1702`) sa ukáže len bez JavaScriptu (`<noscript>`), kde appka aj tak nebeží — tlačidlo by mohlo viesť na obyčajnú adresu `/` (domov so statickými dlaždicami).

### 12. SK repozitár nemá `.gitignore`
- **Závažnosť:** 🟢 drobné; oblasť J/H (7)
- EN repo má `.gitignore` (`aktualne.json`, `__pycache__/`), SK nie. Lokálne spustenie testov alebo `import generator` vytvorí `testy/__pycache__/` / `__pycache__/`, ktoré by sa dali omylom pridať do PR. Riešenie: `.gitignore` s `__pycache__/` aj v SK. Náročnosť: malá. Len SK.

### 13. EN web: slovenské texty, ktoré návštevník alebo čítačka môže dostať
- **Závažnosť:** 🟢 drobné; oblasť H (6)
- **Overené** (skript `J-en-texty.py`, výstup `J-en-texty.log`; grep `site-en`): generátor pri EN builde nahrádza 23 reťazcov (`generator.py:1831–1861`) — **všetky sa v index.html našli**; 150 riadkov JS so slovenčinou bez `IS_EN` som prešiel: 112 je v admin funkciách, zvyšok sú SK vetvy ternárov, názvy športov v `AKT_SPORTS` (majú EN stĺpec), promo blok (na EN sa nevykresľuje, `index.html:2214`) a súbor z disku. **Ostávajú tieto:**
  1. `aria-label="Zobrazenie"` na prepínači ▦/▥ (`index.html:600`) — generátor ho nenahrádza, `initViewMode()` (r. 1940) prepína len texty a `title` tlačidiel. Čítačka na EN povie „Zobrazenie“. Oprava: pridať do EN náhrad v `generator.py` alebo nastaviť v `initViewMode`.
  2. `title="Reklama"` na okienku reklamy (`index.html:2963`, `generator.py:1114`, DYN_JS `generator.py:1207`) a `alt="Reklama"` náhrada obrázkového bannera (`index.html:3012`, `generator.py:1206`) — v dátach je 7 EN bannerov s HTML kódom (okienko) a 2 obrázkové s vyplneným `alt`. Čítačka na EN ohlási „Reklama“. Oprava: `IS_EN ? 'Advertisement' : 'Reklama'` (a v generátore podľa `LANG`).
  3. Okno hesla `/#admin` na EN: `aria-label="Admin prístup"`, `<h3>Admin prístup</h3>`, „Prihlásiť“, „Nesprávne heslo!“, „Načítavam úplné dáta…“ (`index.html:578–587, 2596–2612`); `toggleAdmin()` prepína `aria-label` krížika na „Close“ (r. 2569), ale `title="Zavrieť"` (r. 580) nie. Celý admin (okná, tlačidlá, hlášky, `title="Hore/Dole/Upraviť/Zmazať"` aj v statickom HTML domova, `generator.py:915–918`) je po slovensky aj na EN webe — ak je to zámer (admin je len Miro), je to v poriadku; potom by som zjednotil aspoň ten krížik (title) a nemenil `aria-label` na EN, aby to nebolo napoly.
  4. Slovenský HTML komentár „PREVZATIE APPKOU…“ (`generator.py:1239–1243`) je v každej z 1 544 EN statických stránok (~330 B × 1 544 ≈ 0,5 MB v súčte, zbalené zanedbateľné); SK komentáre sú aj v EN appke. Neviditeľné, len neporiadok — 💡 generátor by mohol komentáre z výstupu vyhodiť.
- **Čo je v poriadku:** titulok, meta, og, `<html lang>`, podnadpis, hľadanie (placeholder, aria-label, „No results for“, „Showing first 200 of N“, „Mentioned in descriptions“, „N results found“), „Loading…“, „Could not load data“/„Try again“, „This section is empty.“, „Back“/„Home“, „Categories“/„Links“, počítadlo „verified links“ (formát 14,830), „section/sections“, „link/links“, „LEAGUE“, lišta „Live This Week ›“, „No current events“, „Show N more links“, pätička, stránka Live This Week (titulok „Live scores this week: …“, „Nothing is live right now — check back later.“, „Live now:“), stĺpce („Sections“, „Tiles“/„Columns“, „Open website“, „Move the mouse over a section on the left…“), ikonky „Club Facebook“/„Club Instagram“, 404 (= EN index.html), statické stránky generátora (`UI["en"]`, `LIVE_TXT["en"]`).

### 14. EN web: 102 liniek bez anglického názvu so slovenskými slovami
- **Závažnosť:** 🟠 dôležité (dáta, nie kód); oblasť H (6)
- **Čo je zle:** `nName()` na EN berie `name_en`, inak slovenský `name`. V dátach je **102 liniek** viditeľných na EN webe bez `name_en`, ktoré majú v názve slovenské slovo — na EN webe sa ukazujú napr. „Svetový pohár muži 2026“, „Svetový pohár ženy 2026“, „Division 1 (ženy)“, „Kvindeligaen (ženy)“, „MOL liga (ženy)“, „Superliga (ženy)“, „Superliga mužov“, „Extraliga žien“, „League H (ženy)“. V statickom EN HTML: `handball/clubs/europe/russia/superleague-women/index.html` → „Superliga (ženy)“, `volleyball/clubs/europe-cev/bulgaria/…` → „Superliga mužov/žien“, `hungary/…` → „Extraliga žien/mužov“. Priečinky: 0 bez `name_en`; popisy: 0 liniek a 0 priečinkov s `desc` bez `desc_en` ✓.
- **Dôkaz:** skript v tejto previerke (výstup v tejto správe vyššie: „EN: linky BEZ name_en so slovenským slovom: 102“), grep `site-en`.
- **Riešenie:** doplniť `name_en` (väčšinou mechanicky: „(ženy)“→„(women)“, „(muži)“→„(men)“, „mužov“→„men's“, „žien“→„women's“, „Svetový pohár“→„World Cup“). Dáta mení Cowork — zoznam viem vypísať do `navrhy/` na vyžiadanie. Náročnosť: malá (dáta). Len dáta (prejaví sa na EN).

### 15. Kvalita anglických textov — návrhy (💡)
- **Závažnosť:** 💡 nápad; oblasť H (6). Texty sú gramaticky správne; tieto by zneli prirodzenejšie:
  - Podnadpis „Navigate through the categories“ (`generator.py:1840`, `data.json subtitle_en`) → „Browse by sport and country“.
  - Hľadanie „🔍 Search anywhere in the tree...“ / `aria-label="Search the tree"` (`generator.py:1841–1842`) — „tree“ je programátorské slovo → „Search all sports links…“ / „Search sports links“.
  - „No current events“ (`index.html:3816`) → „No live events right now“.
  - „Move the mouse over a section on the left…“ (`index.html:2081`) → „Hover over a section on the left…“.
  - „Club Facebook“/„Club Instagram“ (`index.html:2496`) → „Facebook page“/„Instagram profile“ (ikonky sú aj pri linkách, ktoré nie sú kluby — napr. ligy).
  - Nejednotné písanie: „Live This Week“ (lišta, pätička, `generator.py:378`) vs. „Live this week“ (`generator.py:99`, záložný DYN_JS) vs. titulok „Live scores this week“ (`generator.py:372`) — zjednotiť na jedno.
  - „Columns — folders open on mouse hover“ (`index.html:1940`) → „Columns — hover to open folders“.
  - EN pätička a `UI["en"]["footer"]` („database rights (Directive 96/9/EC)“) — správne; „Open in the interactive app“ — správne.

### 16. Rozdiely SK ↔ EN repozitár (H 7) — čo je v poriadku a čo nie
- **Zhodné (diff -r bez .git/ikony/vlajky/navrhy/kontrola-liniek):** `index.html`, `generator.py`, `ikony.py`, `vlajky.py`, `testy/test_webu.py`, `testy/test_hlbkovy.py`, `CLAUDE.md`, `LICENSE`, workflowy `strazca-data-json.yml`, `test-webu.yml`, `test-hlbkovy.yml`, `vlajky-skuska.yml`. Testy si adresu webu berú z `configure-pages` (`test-webu.yml:72`, `test-hlbkovy.yml:77`) — na EN testujú EN web ✓.
- **Líši sa (povolené):** `build.yml`, `ikony-vzorka.yml` (EN si sťahuje dáta zo SK webu).
- **Chýba v EN:** `strazca_liniek.py`, `testy/test_strazca.py`, `strazca-liniek*.yml`, `aktualne.json` (v `.gitignore` — správne, sťahuje sa pri builde) — **v poriadku**: EN web má tie isté linky (kópia SK dát), strážca stačí raz. `strazca-data-json.yml` v EN chráni aj `kontrola-liniek/`, ktorý tam nie je — neškodí.
- **Navyše v EN:** `.gitignore` (SK nemá — bod 12), `banner-sportlinking-1/2.png` (vlastné EN bannery, generátor ich kopíruje `generator.py:1985`), `data.json` v762 — bod 2.
- **`vlajky-skuska.yml` v EN** používa starý repo `data.json` (nesťahuje čerstvý ako `ikony-vzorka.yml:24–27`) — skúška vlajok v EN nevidí nové kódy krajín (🟢, rieši sa s bodom 2).
- **Obrázky (pozrel som ich):** `favicon.ico` (16/32/48 px), `apple-touch-icon.png` (180×180), `og-image.png` (1200×630) — SK: červené „SL“ a nápis „ŠPORTOVÉ LINKY.“; EN: modré „SL“ a „SPORT LINKING.“ — správne odlíšené, rovnaké rozmery, rovnaký štýl ✓. `favicon.svg` vyrába generátor vo farbe jazyka ✓.

---

## Čo je v poriadku (overené)
- **Zrkadlové dvojice — skutočne porovnané v prehliadači:** `slugify`/`nodeSlugBase`↔`slug_base` + `SLUG_FIX` (adresy: 1 543/1 543 SK a 1 544/1 544 EN zhodné), titulky vrátane `compute_titles`/`TITLE_NOSPORT` a `liveTitle`↔`live_title` (0 rozdielov), meta popisy vrátane `liveMetaDesc` (0), canonical (0 okrem známych slugov s diakritikou — viď Merania), H1 (0), počty liniek na stránke (0), podpriečinky a ich poradie (SK 0, EN 5 — bod 1). Pri 300 naozaj otvorených SK stránkach: po prevzatí appkou z mini-balíka aj po celých dátach titulok/meta/canonical/H1/karty/hreflang zhodné (299/300; 1 = diakritika), 0 chýb JS. EN: 207/209 (2 = poradie, bod 1).
- Domov: dlaždice (`home_static_html`↔`renderLevel`), ikonky športov (`renderSportsNav`), lišta Aktuálne (`akt_static_html`↔`renderAktualne` — zhodné až na koncové odriadkovanie), počítadlo, odkaz „Aktuálne ›“ a pätička (`inject_live_links`↔`renderLiveLinks`) — zhodné na SK aj EN; appka pri štarte z BOOT dlaždice **neprepisuje** (`main_boot_rovnake: true`).
- Okienko reklamy: `adFrame()`↔`ad_frame_doc()` znak po znaku zhodné (slot aj auto), sandbox zhodný, promo okienko na `/tipovanie/` po prevzatí = statické (srcdoc 869 B = 869 B); karta Tipsport pod promo blokom po prevzatí aj po dátach 1 ✓ (bod 1 previerky 1 opravený).
- `safeUrl`↔`safe_url` (rovnaký regex), `skl`, `emptyFolder`/`subCount`↔`sub_count`/`link_counts` (počty sedia na všetkých stránkach), `aktVisible`↔`akt_visible`↔DYN_JS, `bannerDateOk`↔`_promo_ok`, `renderIcon`↔`icon_html` (dlaždice zhodné), CSP (build kontroluje), `AKT_SPORTS`, `NO_EN_ALPHA`, `LIVE_ID`, `AKT_MASTER` — zhodné.
- Všetky natvrdo zapísané id (39) a názvy kontinentov existujú v `data.json`; HTML id: 101, žiadne duplicitné, všetky používané; CSS triedy: 145, mŕtve len 2 (bod 3); funkcie v `generator.py` (62), `ikony.py` (13), `vlajky.py` (10), `strazca_liniek.py` (21) — všetky používané; JS funkcie 215 — mŕtva 1.
- ruff: žiadna skutočná chyba (E9), žiadny nedefinovaný názov (F821), žiadny tieňovaný import.
- EN testy bežia proti EN webu; EN build nikdy nestavia zo starého repo `data.json`.

## Merania
| Čo | SK | EN |
|---|---|---|
| Priečinkov v appke (viditeľných) / z toho prázdnych bez stránky | 1 663 / 118 | 1 662 / 118 |
| Statických stránok (sitemap bez domova) | 1 545 | 1 544 |
| Zhoda appka↔statika pre všetky priečinky (adresa, titulok, meta, canonical, H1, počet liniek, poradie) | **1 543 zhodných, 2 rozdiely** (len canonical: statika `…/jemenská-liga/`, appka `…/jemensk%C3%A1-liga/` — známe slugy s diakritikou; prehliadač vracia `link.href` zakódovaný, generátor píše surové písmená) | **1 538 zhodných, 6 rozdielov** (5 poradie — bod 1; 1 canonical diakritika) |
| Skutočne otvorené stránky (prevzatie appkou) | 300: **299 zhodných**, 1 diakritika, 0 chýb JS | 209: **207 zhodných**, 2 poradie, 0 chýb JS |
| Priemerný čas do prevzatia appkou / do celých dát (lokálny server) | 196 ms / 840 ms | 168 ms / 816 ms |
| index.html po builde (gz) | 261 kB (79 kB) | 265 kB (80 kB) |
| data.json / data-full.json (gz) | 5,49 MB (1,20 MB) / 8,02 MB (1,77 MB) | 5,75 MB (1,19 MB) / — |
| BOOT v index.html | 25,6 kB | 29,5 kB |
| Statická stránka: priemer / max; mini-balík pageBoot priemer / max (300 stránok) | 24,8 kB / 59,3 kB; 4,1 kB / 23,2 kB | — |
| JS: funkcie / globálne premenné / listenery / inline onclick / getElementById | 215 / 92 / 13 / 78 / 222 | rovnaké |
| CSS tried / nepoužité; HTML id / nepoužité | 145 / 2; 101 / 0 | rovnaké |
| Najdlhšie funkcie | renderLevel 141 r., load 137, renderSearch 98; generator main() 316, render_page 193 | rovnaké |
| ruff F,E9,B | 15 (2 skutočné: F401, F841; 13 štýl v testoch) | 13 |
| Natvrdo zapísané id priečinkov (index / generator) — chýbajúce v dátach | 32 / 7 — 0 | — |
| EN linky bez name_en so SK slovom / priečinky bez name_en / popisy bez desc_en | — | 102 / 0 / 0 |
| EN repo data.json | — | v762 (SK 1125), 7,8 MB, passwordHash áno |
