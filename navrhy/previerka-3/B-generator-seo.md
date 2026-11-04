# B) Generátor a build · C) SEO statických stránok · H) hreflang SK↔EN — previerka č. 3 (4. 11. 2026)

**Čo som prezrel:** celý `generator.py` (2028 r.), `ikony.py`, `vlajky.py`, všetkých 8 workflowov v SK a 6 v EN repozitári, skutočné behy GitHub Actions (posledných ~25 buildov SK aj EN, cron behy od 25. 9., Test webu, Strážca liniek, logy 8 behov), lokálne vygenerované weby SK (1 546 stránok) a EN (1 545 stránok). V repozitároch som nič nemenil; pokusy bežali na kópiách v `scratchpad/build/`.

**Skripty (všetko v `scratchpad/findings/skripty/`):** `B-analyza-stranok.py` (titulky, popisy, canonical, hreflang páry, sitemap, prelinkovanie → `B-analyza-stranok.txt`), `B-rozdiel-sk-en.py` (prečo sa líšia počty SK/EN → `B-rozdiel-sk-en.txt`), `B-odolnost.py` (25 prípadov zlých dát → `B-odolnost.txt`), `B-zhoda-appka.js` (Playwright: čo vidí robot vs. človek na 45 stránkach + 404.html → `B-zhoda-appka.txt`). Snímky: `scratchpad/snimky/B-01-robot-staticka-nhl.png`, `B-02-clovek-po-prevzati-nhl.png`, `B-03-404-ako-appka.png`.

**Obmedzenia prostredia (nie sú chyby webu):** lokálny `http.server` nevracia `404.html` (test 404 som urobil podstrčením súboru so stavom 404), appka si po prevzatí nastaví canonical na `http://127.0.0.1:…` (na živom webe je to tá istá doména, takže je to v poriadku), živý web nebol dostupný.

---

## Nálezy

### 🔴 1. EN web: dátumy zmien pre sitemap sa už neukladajú — každý EN build ich zahadzuje
- **Oblasť:** B (build), C (SEO) — **len EN repozitár `sportlinking`**
- **Čo je zle:** Krok „Ulož dátumy zmien pre sitemap“ v EN buildе najprv commitne `sitemap-lastmod.json`, potom spraví `git pull --rebase origin main`. Lenže EN build si pred tým **stiahol `data.json` zo sportlinky.sk cez sledovaný súbor `data.json`** (ten je v EN repozitári uložený ako stará verzia v762). Git teda vidí „neuložené zmeny“ a rebase odmietne. Krok (správne) nič nepushne, len vypíše varovanie — a to **pri každom builde od 4. 11. 02:17 UTC** (odvtedy, čo tam pribudol rebase, PR #18 „bod 8“). Výsledok: stav dátumov v EN repozitári zamrzol na 3. 11. 19:30. Každá EN stránka, ktorá sa odvtedy zmenila, dostane **lastmod = deň buildu, a to znova pri každom builde** (dnes sú to `/` a `/live-this-week/`, po každej ďalšej zmene dát pribudnú ďalšie). To je presne signál „všetko sa mení každý deň“, ktorému Google neverí — kvôli nemu sa celý mechanizmus 2. 10. zavádzal.
- **Dôkaz:**
  - log EN behu 389 (18:44 UTC) aj 387: `[main 98f6fea] sitemap: dátumy zmien stránok [skip ci]` → `error: cannot pull with rebase: You have unstaged changes.` → `##[warning]git pull --rebase zlyhal — rebase zrušený, NEpushujem` (uložené v `scratchpad/build/logs/en-41890138760.log`, `en-41887153583.log`);
  - EN repozitár na GitHube: posledný commit `c089123` (18:44), posledný commit lastmod `9a2afad` z 3. 11. 19:30 — hoci behy 387, 388 aj 389 hlásili „dnes zmenených/nových 2“;
  - `sportlinking/.github/workflows/build.yml:149` (`git pull --rebase origin main` bez `--autostash`) vs. `ikony.py:357` a `vlajky.py:156`, ktoré `--autostash` používajú a preto im to v EN funguje;
  - SK beh 426: ten istý krok prešiel (`cb07c88..452abad main -> main`), lebo v SK je pracovný priečinok čistý.
- **Riešenie:** v `sportlinking/.github/workflows/build.yml` riadok 149 zmeniť na `git pull --rebase --autostash origin main` (to isté pre istotu aj v SK `build.yml:111`, hoci tam to dnes nevadí). Čistejšie navyše: nesťahovať dáta cez sledovaný `data.json`, ale do iného mena a generátoru dať premennú `DATA_FILE` (ako už má `AKTUALNE_FILE`, `generator.py:220`, `load_data("data.json")` na r. 1721). **Náročnosť: malá** (1 slovo). **Súbory:** EN `build.yml` (SK voliteľne).

### 🟠 2. Anglický web: Google vidí iné poradie krajín/súťaží ako návštevník (15 zo 67 priečinkov)
- **Oblasť:** B, C — **SK aj EN** (`generator.py` a `index.html` sú v oboch repozitároch rovnaké; prejaví sa len na EN webe)
- **Čo je zle:** V EN sa deti „kontinentov“ radia abecedne. Appka a generátor to ale robia trochu inak:
  1. appka má **PINNED_EN** (Španielsko, Nemecko… vpredu) — generátor ho nemá → `basketball/clubs/europe/` statika začína Albania, appka Spain; rovnako `basketball/clubs/asia/`, `handball/clubs/europe/`, `handball/clubs/asia/`;
  2. appka má v zozname kontinentov aj „Južná a Stredná Amerika (SCAHC)“ a „Severná Amerika a Karibik (NACHC)“, generátor nie → 4 hádzanárske priečinky; pri `handball/competitions/south-central-america/` a `…/north-america-caribbean/` appka **abecedne preradí aj súťaže** (IHF Trophy U17 pred majstrovstvá), čo je asi omyl appky (tieto dva priečinky chýbajú v `NO_EN_ALPHA`), statika drží ručné poradie;
  3. abeceda: appka `localeCompare('en')` (diakritika sa ignoruje: São Tomé pred Senegal, Réunion pred Rwanda), generátor `lower()` (písmená s diakritikou idú až za abecedu) → 7 priečinkov (Afrika vo futbale, basketbale, hádzanej, tenise, médiách; `ice-hockey/competitions/europe/` EWHL).
  Na význam pre Google to nie je kritické (obsah je ten istý), ale komentár v TAKEOVER tvrdí „obsah je ten istý, nejde o cloaking“ — poradie by malo sedieť, a návštevník po prevzatí vidí, ako sa zoznam preskladá.
- **Dôkaz:** `index.html:1189–1208` (CONTINENTS_SK, PINNED_EN, NO_EN_ALPHA) a `:1512–1518` (localeCompare) vs. `generator.py:113–119` (CONTINENTS bez SCAHC/NACHC, bez PINNED) a `:495–497` (`lower()`); Playwright `B-zhoda-appka.txt` („priečinky INÉ PORADIE“ 5×, „linky INÉ PORADIE“ 2× z 45 stránok); presný zoznam 15 priečinkov s prvou odlišnou pozíciou je vo výstupe node skriptu v tejto správe nižšie (sekcia Merania) a v `B-rozdiel-sk-en.txt`.
- **Riešenie:** (a) do `generator.py` doplniť rovnaký `PINNED_EN` a dva názvy do `CONTINENTS`, a radiť kľúčom bez diakritiky (`unicodedata` NFD + odstrániť combining, `lower()`), čo zodpovedá `localeCompare('en')`; (b) v `index.html` pridať `f_had_sut_ja`, `f_had_sut_na` do `NO_EN_ALPHA` (súťaže nie sú krajiny). Dlhodobo by bolo lepšie mať tieto zoznamy na jednom mieste (napr. príznak v dátach), aby sa nerozchádzali. **Náročnosť: stredná.** **Súbory:** `generator.py`, `index.html` — SK aj EN repozitár.

### 🟠 3. Build potichu nasadí aj „prázdny“ web, keby prišli pokazené dáta
- **Oblasť:** B — SK aj EN
- **Čo je zle:** Generátor nemá žiadnu poistku na rozumný počet stránok. Pri `"nodes": []` alebo chýbajúcom `nodes` prejde bez chyby, vyrobí 0 stránok, domov s titulkom „Športové Linky — 0 webov klubov, líg a správ“, sitemap s 1 adresou — a workflow by to nasadil (SK build nemá kontrolu, EN kontroluje len príznak `_lite`). Podobne potichu prejdú: uzol s `parentId` na neexistujúci uzol (celý podstrom vrátane liniek z webu zmizne bez varovania), cyklus rodičov (to isté), priečinok bez `parentId` (stane sa koreňovou sekciou a dlaždicou na domove), duplicitné `id` (karta sa zobrazí dvakrát). Dnes to dáta nemajú (0 osirelých, SLUG_FIX prázdny), ale `data.json` sa nahráva ručne cez GitHub a chyba pri uložení by sa nikde neukázala.
- **Dôkaz:** `B-odolnost.txt` — prípady „prazdne nodes“ (prešiel, sitemap 1 adresa, titulok „0 webov“), „nodes chyba uplne“ (prešiel), „osirely uzol“ (prešiel, stránka NHL neexistuje), „cyklus parentId“ (prešiel), „priecinok bez parentId“ (prešiel, dlaždica NHL na domove), „duplicitne id“ (34 kariet namiesto 33). `generator.py:1736–1759` (nič neoveruje), `build_tree` r. 477–498 (uzly mimo koreňa sa jednoducho nedostanú do `children`).
- **Riešenie:** v `main()` po výpočte `paths`: (1) spočítať uzly, ktoré nie sú dosiahnuteľné z koreňa (osirelé/cyklus) a vypísať ich ako UPOZORNENIE s id a názvom; (2) ak je počet stránok menší než 90 % počtu záznamov v `sitemap-lastmod.json` (alebo menší než napr. 500), skončiť `SystemExit("CHYBA: podozrivo málo stránok …")` — build spadne, starý web ostane. **Náročnosť: malá.** **Súbory:** `generator.py` (SK aj EN).

### 🟢 4. Generátor spadne pri troch druhoch zlých dát (web ostane starý, len červený krížik)
- **Oblasť:** B — SK aj EN
- **Čo je zle / dôkaz** (`B-odolnost.txt`): `order` ako text → `TypeError` v `build_tree` (`generator.py:492`); `promoBanner` nie je slovník (napr. text) → `AttributeError` v `promo_block` (`:1359`); názov priečinka dlhší než ~250 znakov bez `slug` → `OSError: File name too long` pri `os.makedirs` (`:1795`). Ostatné prípady (chýbajúce `name`/`url`/`type`/`version`/`bannerSettings`, `aktualne.json` useknutý/bez `items`/pole, `addedAt` text, `order` text v Aktuálnych, zlý dátum, položka nie slovník, ikona s `../` alebo HTML, názov s `</script>` a úvodzovkami, `url: javascript:`) prešli správne — escapované, `href="#"`, s varovaním. Pozn.: bez `version` vznikne `data.json` bez `?v=` a prázdny `version.txt` (cache sa prestane obnovovať) — tiež potichu.
- **Riešenie:** kľúč radenia cez bezpečný prevod na číslo (ako `akt_norm`, `:252`), `isinstance(dict)` pre `promoBanner`/`promos`, skrátenie slugu (napr. na 80 znakov) — ale ROVNAKO aj v `nodeSlugBase` v `index.html:1272`, inak sa adresy rozídu. **Náročnosť: malá.** **Súbory:** `generator.py` (+ `index.html` pri slugu), SK aj EN.

### 🟢 5. Nočný cron v skutočnosti beží o 4,5–8 hodín neskôr (oba repozitáre) — zmena minúty z previerky 2 to nerieši
- **Oblasť:** B — SK aj EN
- **Čo je zle:** GitHub spúšťa plánované behy v týchto repozitároch so stále rovnakým meškaním: SK cron `30 2` bežal 07:06–09:48 UTC (meškanie 4 h 36 min – 7 h 18 min, 40 behov od 25. 9.), EN `0 3` bežal 07:36–10:42 UTC, nový EN `41 4` dnes 12:33 UTC (meškanie 7 h 52 min). Nový SK `17 23` ešte nebežal (prvý beh dnes v noci), ale podľa histórie ho čakajme okolo 4:00–7:00 UTC, nie 0:17 nášho času, ako hovorí komentár v `build.yml:22`. Dôsledok je malý: appka si Aktuálne berie vždy čerstvé z `aktualne.json`, meškanie vidí len Google v statickom HTML (skončená položka tam vydrží do rána). Hĺbkový test (`30 5`) bude meškať rovnako, ale ostane „po nočných buildoch“.
- **Dôkaz:** zoznam behov `event: schedule` (API `actions_list`, tabuľka v Meraniach).
- **Riešenie:** nič netreba; opraviť komentáre v oboch `build.yml` (aby Miro nehľadal chybu) a nerátať s presným časom. Ak by presnosť niekedy bola dôležitá, jediná spoľahlivá cesta je spúšťať `workflow_dispatch` zvonku (externý plánovač s tokenom) — pre začiatočníka to neodporúčam. **Náročnosť: malá (komentár).**

### 🟢 6. Meta popis je na 54 % stránok dlhší, než Google ukáže (priemer 170 znakov, max 510)
- **Oblasť:** C — SK aj EN
- **Čo je zle:** `meta name="description"` (aj `og:description`) je celý popis priečinka. SK: 832 z 1 546 stránok nad 160 znakov, EN 862 z 1 545; max 510 (SK) / 519 (EN). Google úryvok odreže okolo 155–160 znakov, takže koniec vety sa nezobrazí; často si potom úryvok zloží sám. Stránka Aktuálne to už rieši (`live_meta_desc`, prvá veta + skrátenie, `generator.py:433–442`).
- **Dôkaz:** `B-analyza-stranok.txt` („popis dĺžka: min 26 priemer 170 max 510 | >160: 832“).
- **Riešenie:** meta popis = prvá veta (prípadne dve), skrátený na ~155 znakov funkciami `live_first_sentence`/`live_cut`, ktoré už existujú; plný popis ostáva v `<p class="desc">`. To isté musí robiť `updateHead` v `index.html:1646` (`nDesc(n)`), aby popis po prevzatí ostal zhodný (test „meta desc“ to dnes kontroluje). **Náročnosť: malá.** **Súbory:** `generator.py`, `index.html`, SK aj EN.

### 🟢 7. 33 SK / 30 EN titulkov je stále nad 65 znakov (max 86)
- **Oblasť:** C — SK aj EN
- **Čo je zle:** `compute_titles` vynechá šport, ale pri dlhom názve + dlhom rodičovi ostane napr. „Volleyball League of America — Tier 1 (muži) — Spojené štáty americké — Športové Linky“ (86). Google odreže.
- **Dôkaz:** build log („statických stránok s titulkom nad 65 znakov ostáva: 33“), `B-analyza-stranok.txt` (najdlhšie titulky).
- **Riešenie:** druhý stupeň skrátenia: ak je titulok bez športu stále > 65, skúsiť „{názov} — {web}“, opäť len ak je jedinečný (rovnaká slučka ako dnes, `generator.py:1506–1516`), a zoznam odovzdať appke tak, ako sa odovzdáva `TITLE_NOSPORT`. **Náročnosť: malá.** SK aj EN.

### 🟢 8. Drobnosti pri lastmod
- **Oblasť:** B/C — SK aj EN
- (a) Dátum pre lastmod sa berie z `date.today()` (čas servera = UTC, `generator.py:1806`), kým všetko ostatné z `dnes()` (Bratislava, `:232`). Build medzi 0:00 a 1:00 (v lete 2:00) nášho času zapíše včerajší dátum. Neškodí, len je to nejednotné. **Oprava:** `today = dnes()`.
- (b) Odtlačok domova (`home_fingerprint`, `:785–793`) obsahuje popisy koreňových sekcií, ktoré sa na domove nezobrazujú → zmena popisu sekcie „Aktuálne“ (commit `cb07c88`) zmenila lastmod domova (beh 426: „zmenených 2“ = `/` a `/aktualne/`; overené aj pokusom E). Naopak nová linka zmení počty na dlaždiciach domova, ale lastmod domova nie (pokus D). Obe veci sú prijateľné; keby sa to malo spresniť, do odtlačku domova dať `_cnt`/`_sub` namiesto popisu.
- **Dôkaz:** pokusy A–E (výstup v tejto správe nižšie): bez zmeny → 0 zmien; vypnutá položka Aktuálnych → `/` + `aktualne/`; zmenený popis linky → len jej priečinok; nová linka → len jej priečinok; popis koreňa → `/` + `hokej/`.

### 🟢 9. ikony.py: limit obnovy je „na build“, nie „na deň“; EN sťahuje všetko druhýkrát
- **Oblasť:** B — SK aj EN
- (a) `--obnov 300` platí na jeden beh (`ikony.py:380, 454`). Pri dňoch s 10 buildmi (dnes ich bolo 11 v SK) sa obnoví až 3 000 ikoniek za deň — 2. 12. (30 dní po prvom stiahnutí 8 102 ikoniek) sa tak obnova rozbehne naraz vo všetkých buildoch. Nie je to chyba, len viac požiadaviek na Google/Yandex, než plánoval bod 9 previerky 2. **Oprava:** do `stav.json` zapísať deň poslednej obnovy a limit rátať na deň.
- (b) EN repozitár sťahuje a ukladá tých istých 8 102 ikoniek druhýkrát (vlastné `ikony/`, vlastný `stav.json`, log EN: „Webov v dátach: 8102 | v stav.json s výsledkom: 8102“). Dvojnásobná záťaž Google/Yandex aj úložiska. **Nápad:** EN build by si mohol `ikony/` kopírovať zo sportlinky.sk (ako `data-full.json`) namiesto sťahovania — stredná náročnosť, netreba súrne.
- (c) Overené v poriadku: hosty z Aktuálnych sa berú (`hosty_z_aktualnych`, v EN je krok sťahovania `aktualne.json` správne PRED ikonkami), bezpečnosť (host len `[a-z0-9.-]` cez `SAFE_HOST`, kontrola hlavičky obrázka, limit 512 kB, SVG sa neuloží), atomický zápis, `--autostash` + `rebase --abort`, 30-dňové mazanie s poistkou 80 %. Súbeh dvoch buildov v jednom repozitári nenastane (skupina `pages-build` s rušením); so Strážcom liniek (pushuje `kontrola-liniek/` so 4 pokusmi) sa prípadná kolízia vyrieši opakovaním. Vlajky: 1 617 súborov kompletné, nič sa nesťahuje.

### 🟢 10. Jedno zlyhané nasadenie EN (beh 385) ostalo bez upozornenia okrem krížika
- **Oblasť:** B — EN
- **Čo sa stalo:** push do EN main 4. 11. 16:33 (PR #22) → build OK, `deploy-pages` dvakrát „Deployment cancelled“ (aj po ručnom opakovaní o 16:50). Web ostal na staršej verzii, kým Miro o 16:58 nespustil build ručne (386, OK). „Test webu“ po neúspešnom builde nebeží (`if: conclusion == 'success'`), takže jediná stopa je červený krížik. Príčinu z logu neviem určiť (GitHub Pages zrušil nasadenie; v tom čase žiadne iné EN nasadenie nebežalo). Jednorazové, sledovať.
- **Dôkaz:** log `deploy` jobu 126719783857: `##[error]Deployment cancelled.`

### 🟢 11. 404.html funguje ako appka, len človek sa nedozvie, že adresa neexistuje
- **Oblasť:** B/C — SK aj EN
- **Overené:** `404.html` = domovský `index.html` bez canonical, hreflang a WebSite JSON-LD (jediný rozdiel: 5 riadkov), s BOOT, `SITE_ROOT`, `DATA_VER`, dlaždicami a Aktuálnymi. Pri `/hokej/neexistuje/` appka ukáže sekciu Hokej (titulok „Hokej — Športové Linky“), adresu nemení, canonical nenastaví (bod 20 previerky 1 funguje); pri `/xyz/abc/` ukáže domov. GitHub Pages ju vracia so stavom 404, takže Google ju neindexuje — SEO v poriadku. Snímka `B-03-404-ako-appka.png`.
- **Drobnosť:** návštevník s preklepom v adrese nevidí žiadnu hlášku, len „najbližšiu“ sekciu. **Nápad:** keď `CESTA_CELA === false`, ukázať nad obsahom riadok „Táto adresa neexistuje, ukazujeme najbližšiu sekciu“. Malá.

### 💡 12. Hlboké stránky majú len jeden interný odkaz (od rodiča)
- **Oblasť:** C — SK aj EN
- 1 016 z 1 545 stránok (hĺbka 4–5) dostane odkaz len z rodičovskej stránky (+ drobčeky smerom hore a pätička na 10 sekcií). Google ich nájde cez sitemap, ale „váha“ sa k nim dostane jednou cestou. Lacné zlepšenie: na statickej stránke pod linkami blok „Ďalšie krajiny/ligy v {rodič}“ s odkazmi na súrodencov (dáta sú v `children[parent]`, 5–50 odkazov, +1–3 kB). Rovnaký blok by potom mala kresliť aj appka, inak sa obsah po prevzatí líši (dnes appka súrodencov neukazuje). Stredná.

### 💡 13. Statické karty priečinkov bez počtov
- **Oblasť:** C — SK aj EN
- Appka na kartách ukazuje „55 sekcií · 2 257 liniek“, statická stránka len názov + popis (`generator.py:1558–1561`), hoci `lcnt`/`sub_count` sú k dispozícii. Google by videl o niečo viac (čísla sú pre hľadajúceho zaujímavé) a obsah by sa po prevzatí menej líšil. Malá.

### 💡 14. JSON-LD — čo by REÁLNE pomohlo
- Dnes: `BreadcrumbList` na všetkých 1 545 podstránkach (platný JSON, `</` escapované) a `WebSite` na domove. To je pre tento typ webu správne množstvo. Ďalšie typy (`ItemList` so zoznamom liniek, `Organization`, `SiteNavigationElement`) Google vo výsledkoch pre rozcestník nezobrazí — neodporúčam pridávať. Jediné, čo má zmysel zvážiť: `WebSite` doplniť o `alternateName` („sportlinky.sk“) — bez záruky efektu. Nič súrne.

### 🟢 15. Verzie akcií — v poriadku, jediná staršia je `actions/cache@v5`
- **Oblasť:** B — SK aj EN
- Overené cez stránky Releases (GitHub cez WebFetch, bez roku v dátumoch): checkout **v7** (najnovšia v7.0.1 ✓), configure-pages **v6** ✓, setup-python **v7** (v7.1.0 ✓), upload-pages-artifact **v5** ✓, deploy-pages **v5** (v5.0.1 ✓), upload-artifact **v7** (v7.0.2 ✓), cache **v5** — ako „Latest“ je označená v6.1.0 (v5.1.0 vyšla v ten istý deň, v5 je teda stále udržiavaná). Behy z 3. 11. ešte hlásili `Node.js 20 is deprecated` pre checkout@v4/configure-pages@v5/setup-python@v5 — aktualizácia 4. 11. to vyriešila. **Riešenie:** pri najbližšej úprave `test-webu.yml`/`test-hlbkovy.yml` dať `actions/cache@v6` (oba repozitáre). Malá.

### 🟢 16. Drobnosti vo workflowoch (len na vedomie)
- `test-webu.yml` v SK repozitári počúva aj na workflow „Build & Deploy (EN)“, ktorý v SK repozitári neexistuje — neškodí (súbor je spoločný).
- EN cron je po zavedení `en-build` v podstate záloha: EN sa stavia po každom SK builde (aj nočnom). Správne, nechať.
- `en-build`: `sleep 60` je dnes dostatočný — `deploy-pages` skončí až po nasadení, EN si stiahol novú verziu: SK beh 426 (data v1125, nasadenie hotové 18:25:13) → EN beh 388 spustený 18:26:20, log „data.json OK, verzia 1125“. Súbeh EN cronu s dispatch rieši `cancel-in-progress` v skupine `pages-build`; nasadenie sa neruší (`pages-deploy`). Slučky `[skip ci]` nehrozia (všetky robotické commity ho majú; `data.json` sa v EN necommituje). Oprávnenia sú minimálne (`contents: read` + per-job), `en-build` má `permissions: {}` a vlastný token. Timeouty sú rozumné (build 40/45 min, kroky 10 + 15 min).

---

## Čo je v poriadku (overené)
- **Canonical:** 1 546 SK + 1 545 EN stránok, všetky = vlastná adresa; domov má canonical, `404.html` nemá.
- **hreflang:** každá SK stránka okrem `/tipovanie/` (en:false → správne bez hreflangu) má trojicu sk/en/x-default; **1 545 párov, všetky obojsmerné**, cieľ vždy existuje v druhom builde, `x-default` = EN všade, hreflang v sitemape = hreflang v HTML (0 rozdielov). Appka po prevzatí hreflang zachová (Playwright: 0 rozdielov na 45 stránkach).
- **Titulok a meta popis:** po prevzatí appkou zhodné so statikou (0 rozdielov na 45 stránkach vrátane `/aktualne/`, `/live-this-week/`, `/tipovanie/`, NHL); žiadne duplicitné titulky ani popisy; všetky stránky majú vlastný popis (žiadny náhradný „X podkategórií“); H1 presne jeden na každej stránke.
- **Robot vs človek:** s UA Googlebot ostáva statická stránka (pageBoot nezmizne), človek dostane appku na tej istej adrese; obsah (množina priečinkov a liniek) je rovnaký, rozdiely sú len v poradí na EN (nález 2) a v počtoch na kartách (nález 13).
- **Sitemap:** 1 546 / 1 545 adries = počet súborov, lastmod podľa skutočnej zmeny — pri opakovanom builde 0 zmien, mení sa presne tam, kde sa zmenil obsah (pokusy A–E). `robots.txt` správny (data.json/data-full.json zakázané, odkaz na sitemap), nikde `noindex`.
- **Prázdne priečinky:** 118 (3 v hĺbke 2, 115 v hĺbke 3, napr. Správy & Médiá › Južná Amerika › Chile) nemajú stránku a **nevedie na ne žiadny odkaz** (0 odkazov na neexistujúce stránky); appka ich skrýva (`tileKids`/`emptyFolder`). Tenké stránky: 8 SK / 7 EN s 1 linkou (Eritrea, Pakistan, Severná Kórea, Austrália, Lichtenštajnsko, Monako, Basketbal 3x3, Tipovanie) — všetky s popisom, nič netreba.
- **Rozdiel SK vs EN:** 1 545 vs 1 544 stránok = `/tipovanie/` (en:false). 14 842 vs 14 830 liniek = 17 liniek len SK (5× „šport dnes – live výsledky“, 11× „rýchle linky“ výsledkov slovenských líg, Tipsport) mínus 5 liniek len EN (enOnly „… today – live scores“). Duplicitné slugy súrodencov: žiadne (SLUG_FIX prázdny; mechanizmus „-2“ funguje, overené).
- **Escapovanie:** názov s `</script>`, `"` a `'` je všade escapovaný (title, H1, karty), v `#pageBoot` a JSON-LD nie je žiadne `</`; `url: javascript:` → `href="#"`; ikona s `../` alebo HTML sa nevypíše surovo.
- **Lokálny generátor:** 2,5 s na celý web (1 545 stránok), stabilný výstup.

---

## Merania

| Čo | Hodnota |
|---|---|
| Lokálny generátor SK, celý beh | **2,5 s** (EN 2,3 s); pamäť ~0,5 GB |
| cProfile (5,5 s s profilovaním): zápis `data-full.json` + `data.json` | 2,24 s (41 %) — `json.dump` 1,33 mil. volaní |
| … `render_page` 1 545× | 0,68 s |
| … kopírovanie 8 120 ikoniek + 1 617 vlajok | 0,71 s + 0,41 s |
| … načítanie `data.json` (9,5 MB) | 0,45 s |
| Statická stránka | priemer 24 kB, max 58 kB; `index.html` 255 kB (EN 259 kB) |
| `data.json` (lite) / `data-full.json` | 5,49 MB / 8,02 MB |
| Titulky SK: min/priemer/max | 22 / 50 / 86 znakov; > 65: 33 (EN 30) |
| Meta popisy SK: min/priemer/max | 26 / 170 / 510; > 160: 832 (EN 862); < 50: 65 |
| Rovnaký H1 na viacerých stránkach | 222 skupín (Premier League 20×, Ligue 1 9×…) — titulok ich rozlišuje |
| Stránky podľa počtu liniek | 0: 518 · 1–2: 12 · 3–5: 35 · 6–20: 852 · > 20: 128 (max 64) |
| Hĺbka od domova | 1: 11 · 2: 67 · 3: 205 · 4: 523 · 5: 739 |
| Prichádzajúce interné odkazy na stránku | medián 1; 1 016 stránok má presne 1 |
| EN priečinky s iným poradím statika vs appka | 15 z 67 (PINNED_EN 4, SCAHC/NACHC 4, diakritika 7) |

**Skutočné behy GitHub Actions (UTC):**

| Beh | Spustenie | Trvanie celkom | build job | deploy | en-build / pozn. |
|---|---|---|---|---|---|
| SK 426 (push, data v1125) | 11-04 18:24:44 | 1 min 39 s | 14 s (ikony 0 s, generátor 2 s) | 6 s | 62 s (sleep 60) → EN 388 o 18:26:20, EN dostal v1125 |
| SK 425 (push PR #31) | 11-04 17:55:33 | 4 min 23 s | 14 s | **2 min 46 s** | 62 s → EN 387 o 17:59:53 |
| SK 424 / 423 / 422 / 421 / 420 / 419 / 418 | 11-04 | 3:16 / 1:58 / 1:43 / 1:46 / 1:45 / 1:38 / 1:46 | ~15 s | 6 s – 2 min | EN spustený vždy ~65 s po nasadení |
| SK 409 (**cron `30 2`**) | 11-03 **09:48** (meškanie 7 h 18 min) | 52 s | 19 s (ikony 8 s: obnova 271) | 18 s | — (ešte bez en-build) |
| SK cron od 25. 9. (40 behov) | bežal 07:06–09:48 UTC | | | | meškanie 4 h 36 min – 7 h 18 min; 0 zlyhaní |
| EN 389 (push PR #23) | 11-04 18:44:41 | 40 s | 14 s | 14 s | lastmod commit **nepushnutý** (nález 1) |
| EN 388 / 387 (dispatch zo SK) | 18:26:20 / 17:59:53 | 32 s / 31 s | ~15 s | ~10 s | data v1125 / v1124 (správne) |
| EN 385 (push PR #22) | 16:33:55 | **zlyhal** 2× | 19 s | „Deployment cancelled“ | ručne znova 386 o 16:58 OK |
| EN 384 (dispatch) | 16:29:52 | 7 min 19 s | 14 s | čakanie 2 min + 10 s | |
| EN 381 (**cron `41 4`**) | 11-04 **12:33** (meškanie 7 h 52 min) | 36 s | | | data v1124 |
| EN cron od 26. 9. (40 behov, `0 3`) | bežal 07:36–10:42 UTC | | | | meškanie 4 h 36 min – 7 h 42 min; 0 zlyhaní |
| Test webu (38 behov) | po každom builde | 1,5–2,5 min | | | 5 zlyhaní — všetky `pull_request` behy (nový test proti starému živému webu), po merge ✅ |
| Strážca liniek | 2 ručné behy (3. 11. 18 min, 4. 11. 3 min) | | | | cron pondelok 01:17 ešte nebežal |
| Hĺbkový test | cron `30 5` | | | | bude meškať rovnako ako build |

**Pokusy lastmod (kópia v `scratchpad/build/lastmod-test`):** A bez zmeny → 0; B vypnutá položka Aktuálnych → `/`, `aktualne/`; C zmenený popis linky v NHL → `hokej/kluby/severna-amerika/nhl/`; D nová linka v NHL → len NHL; E zmenený popis koreňa Hokej → `/`, `hokej/`.

**Odolnosť (25 prípadov, `B-odolnost.txt`):** spadol 3× (order text, promoBanner text, názov 680 znakov), potichu so zlým výstupom 7× (prázdne/chýbajúce nodes, osirelý uzol, cyklus, bez parentId, duplicitné id, bez version), správne s varovaním alebo escapovaním 15×.

**Verzie akcií (Releases, 4. 11. 2026):** checkout v7.0.1 · configure-pages v6.0.0 · setup-python v7.1.0 · upload-pages-artifact v5.0.0 · deploy-pages v5.0.1 · upload-artifact v7.0.2 · cache v6.1.0 (používa sa v5).
