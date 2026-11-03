# Technická previerka webu sportlinky.sk č. 2 (4. 11. 2026)

## Čo som prezrel
- **Súbory:** `index.html` (appka), `generator.py`, `ikony.py`, `vlajky.py`, `strazca_liniek.py`, `testy/test_webu.py`, všetkých 7 súborov v `.github/workflows`, stránka `/aktualne/`, `aktualne.json`, admin (`/#admin`, `data-full.json`), CSP a okienko reklamy Tipsport.
- **Zostavenie webu:** web som zostavil generátorom do dočasného priečinka mimo repozitára. V repozitári som nič nezmenil, `data.json` ani `sitemap-lastmod.json` sa nezmenili.
- **Testy:**
  - Existujúci test `testy/test_webu.py` som spustil proti lokálnej kópii. Prešlo **všetkých 15 kontrol** (43 s).
  - Appku som navyše zmeral v prehliadači Chromium s napodobeným mobilom (Pixel 5, 4× spomalený procesor).
- **Živý web:** `sportlinky.sk` mi sieťové pravidlá tohto prostredia nepustili. Namiesto toho som prečítal výsledky automatického testu živého webu na GitHube. Posledný beh z 3. 11. o 19:29 UTC: **všetko ✅** (domov, data.json v1124, 3 stránky z Googlu, vyhľadávanie, mobil, banner, admin, 404, vlajky, reklama + CSP, Aktuálne).

**Prvá previerka (29 bodov):** opravy fungujú. Znova ich nenavrhujem. Pri dvoch som našiel nedokončenú časť alebo nový problém, ktorý oprava spôsobila (body 1 a 9 nižšie, sú tam označené).

**Týka sa to aj anglického webu?** Takmer všetko áno, lebo `sportlinking` má rovnaký `index.html`, `generator.py` aj skripty (overil som, že `index.html` je v oboch repozitároch zhodný). Pri každom bode je to napísané. Opravy v `sportlinking` treba urobiť ako samostatnú úlohu.

---

## Merania (skutočné čísla)

| Čo | Hodnota |
|---|---|
| Statických stránok | 1 545 (+ domov), v sitemape 1 546 adries, 119 prázdnych priečinkov bez stránky |
| Súborov na webe | 11 294, spolu ~64 MB (ikonky 12,3 MB, vlajky 1,4 MB, HTML stránky 38 MB) |
| Statická stránka | priemer 24,7 kB, **zbalená 8,2 kB**; z toho skripty 8,6 kB a štýly 3,3 kB (rovnaké na každej stránke) |
| `index.html` (appka) po builde | 247 kB, zbalený 73 kB; z toho JavaScript 183 kB, štartovací balík BOOT 26 kB |
| `data.json` (pre návštevníkov) | 5,5 MB, **zbalený 1,2 MB**; popisy (`desc`) tvoria 41 % |
| `data-full.json` (pre admina a EN web) | 8,0 MB, zbalený 1,75 MB |
| Generátor (lokálne) | **2,8 s** |
| Build na GitHube | 35–125 s, typicky ~75 s: stiahnutie repozitára 32 s, ikonky 30 s, generátor 2 s, nasadenie 6 s |
| Test živého webu na GitHube | ~2 min, z toho 49 s inštalácia prehliadača |
| Domov na mobile (4× spomalený) | stránka hotová za 1,7 s, celé dáta za 3,5 s; potom 2 „zaseknutia“ prehliadača po 0,8–0,9 s |
| Vyhľadávanie na mobile (4× spomalený) | „praha“ 0,54 s (prvé hľadanie), „kosice“ 0,30 s, „a“ 0,50 s |
| Strážca liniek | posledný beh 18 min, 10 623 adries: 9 078 OK, 1 466 varovaní, 52 presťahovaných, 27 podozrivých |

---

## Prehľad bodov

| # | Názov | Dôležitosť | Oblasť | Práca |
|---|---|---|---|---|
| 1 | Zatvorené okná adminu sa dajú „vyklikať“ klávesnicou a čítačka ich vidí | 🔴 | Prístupnosť | malá |
| 2 | Po kliknutí na sekciu ostane stránka posunutá dole | 🔴 | Mobil | malá |
| 3 | Keď sa nestiahne data.json, hlbšie stránky ukazujú „Načítavam…“ donekonečna | 🟠 | Chybové stavy | malá |
| 4 | Vyhľadávanie nenájde Brøndby, Białystok, Łódź, Preußen… (169 názvov) | 🟠 | Vyhľadávanie | malá |
| 5 | Appka ukazuje 11 prázdnych sekcií, ich adresa vráti chybu 404 | 🟠 | SEO / návštevník | malá |
| 6 | Anglický web dostane nové dáta až na druhý deň okolo obeda | 🟠 | Build | stredná |
| 7 | Denný nočný build v skutočnosti beží až o 9:00 – 11:00 nášho času | 🟠 | Build / SEO | malá |
| 8 | ikony.py: pri neúspešnom `git pull` pokračuje v polorozbitom stave | 🟠 | Build | malá |
| 9 | ikony.py obnovuje ikonky pri každom builde, nie raz za 30 dní | 🟠 | Build | malá |
| 10 | Linky na statických stránkach a tlačidlo promo bez kontroly adresy (`safe_url`) | 🟠 | Bezpečnosť | malá |
| 11 | Každý návštevník sťahuje 1,2 MB dát, mobil sa potom na ~1 s zasekne | 🟠 | Rýchlosť | stredná až veľká |
| 12 | GoatCounter nepočíta preklikávanie v appke | 🟠 | Štatistiky | malá |
| 13 | Čítačka sa nedozvie o zmene stránky ani o výsledkoch hľadania | 🟠 | Prístupnosť | malá |
| 14 | Strážca liniek: slučka presmerovaní = „OK“, predaná doména = „presťahovaná“ | 🟠 | Watchdog | malá |
| 15 | Zrkadlové funkcie v appke a generátore nikto automaticky neporovnáva | 🟠 | Kvalita kódu | stredná |
| 16 | Stránka /aktualne/: tenký obsah, chýbajú štruktúrované dáta udalostí | 🟢 | SEO | malá až stredná |
| 17 | GitHub Actions: zastarané verzie akcií (Node 20) | 🟢 | Build | malá |
| 18 | Nasadenie sa môže zrušiť uprostred, build nemá časový limit | 🟢 | Build | malá |
| 19 | Test živého webu: pri meškajúcom nasadení otestuje starý web a ukáže ✅ | 🟢 | Testy | malá |
| 20 | Čo test živého webu nekontroluje | 🟢 | Testy | stredná |
| 21 | Strážca data.json: drobné medzery | 🟢 | Build | malá |
| 22 | Strážca liniek: 1 184 varovaní „403“ zahlcuje správu, počítadlo behov | 🟢 | Watchdog | malá |
| 23 | Repozitár rastie zbytočne rýchlo (commity robota) | 🟢 | Build | malá |
| 24 | Ikonky: 18 neviditeľných, 590 JPEG uložených ako .png; vlajky: dočasné súbory | 🟢 | Ikonky / vlajky | malá |
| 25 | Admin kód (~63 kB) sťahuje každý návštevník | 🟢 | Rýchlosť | stredná |
| 26 | Vyhľadávanie a drobné spomalenia na slabom mobile | 🟢 | Rýchlosť | malá |
| 27 | Okno s heslom (`/#admin`) sa nedá zavrieť | 🟢 | Admin | malá |
| 28 | Neexistujúca podstránka v appke nenapíše „stránka neexistuje“ | 🟢 | Návštevník | malá |
| 29 | Mŕtvy a zdvojený kód v generator.py a index.html | 🟢 | Kvalita kódu | malá |
| 30 | Drobnosti: EN počítadlo, `www.` pri sťahovaní pre EN, časové pásmo, id v onclick, heslo | 🟢 | Rôzne | malá |

---

## Rozpis bodov

### 🔴 1. Zatvorené okná adminu sa dajú „vyklikať“ klávesnicou a čítačka ich vidí
- **Kde:** `index.html` riadky 377–382 (`.mo{opacity:0;pointer-events:none}`), okná na riadkoch 640–846.
- **Problém:**
  - Zatvorené okná adminu (úprava liniek, nastavenia, heslo…) sú len **priehľadné**, nie skryté.
  - Kto ide po stránke klávesom Tab, už pri 34. stlačení „spadne“ do neviditeľného políčka. **Z 400 stlačení Tabu skončilo 267 v neviditeľných oknách.**
  - Čítačka obrazovky vidí všetkých 9 okien. Niektoré čítačky berú také okno ako jediný obsah stránky.
  - Vzniklo to pri oprave bodu 26 z prvej previerky: oknám pribudlo `role="dialog"`, ale nie skrytie.
- **Prečo na tom záleží:** pre človeka s čítačkou alebo bez myši je web prakticky nepoužiteľný. Týka sa to každej stránky, nielen adminu.
- **Ako opraviť:** do `.mo` pridať `visibility:hidden` a do `.mo.open` `visibility:visible`. Plynulé zobrazenie ostane zachované.
- **SK aj EN:** áno.

### 🔴 2. Po kliknutí na sekciu ostane stránka posunutá dole
- **Kde:** `index.html` funkcia `navigate()`, riadky 1390–1401.
- **Problém:** keď na mobile zídeš dole v dlhom zozname (napr. 55 krajín) a klikneš na dlaždicu, otvorí sa nová sekcia, ale **posun ostane rovnaký**. Človek vidí stred novej stránky a nevie, kde je. Overené: po posune na 2 500 px ostala nová stránka na 2 500 px.
- **Prečo na tom záleží:** je to najčastejší pohyb po webe a na mobile pôsobí ako chyba.
- **Ako opraviť:** v `navigate()` pri bežnom kliknutí (nie pri tlačidle Späť) zavolať `window.scrollTo(0,0)`.
- **SK aj EN:** áno.

### 🟠 3. Keď sa nestiahne data.json, hlbšie stránky ukazujú „Načítavam…“ donekonečna
- **Kde:** `index.html` riadky 1066 a 3741–3746 (`if(DB._partial){ return; }`).
- **Problém:** keď `data.json` nepríde (slabý signál, výpadok), domov a hlavné sekcie fungujú zo štartovacieho balíka. Hlbšie sekcie a vyhľadávanie však ukazujú ⏳ **navždy**, bez správy a bez možnosti skúsiť znova. Tlačidlo Admin vtedy potichu nič nespraví. Overené tak, že som `data.json` nechal vrátiť chybu.
- **Ako opraviť:** keď sa dáta nepodarí stiahnuť, ukázať vetu „Nepodarilo sa načítať dáta“ a tlačidlo „Skúsiť znova“.
- **SK aj EN:** áno.

### 🟠 4. Vyhľadávanie nenájde Brøndby, Białystok, Łódź, Preußen…
- **Kde:**
  - `index.html` `norm()` (riadok 2141) a `slugify()` (riadok 1241)
  - `generator.py` `slugify()` (riadok 157)
- **Problém:**
  - Odstraňovanie diakritiky nevie niektoré písmená: **ø, ł, ı, æ, œ, ß, đ, ð, þ, ə**.
  - V dátach je **169 názvov** s takými písmenami. „brondby“ nenájde Brøndby IF, „lodz“ nenájde ŁKS Łódź, „tromso“ ani „preussen“ nič.
  - Z rovnakého dôvodu vznikla zlá anglická adresa „2-lig-k-rm-z-grup“ pre „Kırmızı Grup“.
- **Ako opraviť:**
  - Po odstránení diakritiky ešte nahradiť ł→l, ø→o, ß→ss, ı→i, æ→ae, œ→oe, đ/ð→d, þ→th, ə→e.
  - Vo vyhľadávaní je to bezpečné.
  - Pri `slugify` **pozor:** zmena by zmenila adresy už existujúcich stránok. Uložené slugy v dátach ostávajú, takže sa to dotkne len nových priečinkov. Ak by sa menila aj tá jedna zlá adresa, treba presmerovanie.
- **SK aj EN:** áno (vyhľadávanie aj adresy).

### 🟠 5. Appka ukazuje 11 prázdnych sekcií, ich adresa vráti chybu 404
- **Kde:** `index.html` `renderLevel()` (riadky 1730–1770) ukazuje aj priečinky s 0 linkami. `generator.py` pre ne stránku nevyrobí (riadok 1762).
- **Problém:**
  - V sekcii Správy & Médiá sú dlaždice „Afrika“, „Oceánia“, „Severná a Stredná Amerika“ a 8 krajín Južnej Ameriky s textom „0 liniek“.
  - Po kliknutí návštevník vidí „Táto sekcia je prázdna“.
  - Keď takú adresu otvorí priamo, zdieľa ju alebo ju nájde Google, server vráti **chybu 404**. Google vidí tieto odkazy na domove, ktorý si vykreslí s JavaScriptom.
- **Prečo na tom záleží:** prázdne dlaždice odrádzajú návštevníka a v Search Console pribúdajú chyby „Nenájdené (404)“.
- **Ako opraviť:** návštevníkovi (nie adminovi) neukazovať priečinky s 0 linkami. Počet už je v `_cnt`, takže je to jedna podmienka.
- **SK aj EN:** áno.

### 🟠 6. Anglický web dostane nové dáta až na druhý deň okolo obeda
- **Kde:** `sportlinking/.github/workflows/build.yml` (spúšťa sa len pri zmene v EN repozitári a raz denne o 3:00 UTC).
- **Problém:**
  - Keď o 19:00 nahráš `data.json` sem, slovenský web je hotový o 2 minúty.
  - Anglický web si dáta stiahne až pri dennom builde. Ten v praxi beží až o 7:00 – 10:00 UTC (pozri bod 7).
  - **Anglický web teda mešká 12–15 hodín.** Rovnako aj Aktuálne v statickom HTML pre Google na EN webe.
- **Prečo na tom záleží:** EN trh má prioritu (x-default ukazuje na EN).
- **Ako opraviť:**
  - **Rýchla cesta:** pridať do EN repozitára ďalšie denné behy, napr. každé 3 hodiny.
  - **Čistá cesta:** na konci SK buildu spustiť EN build (`repository_dispatch` alebo `workflow_dispatch`). Na to treba v SK repozitári uložiť prístupový kľúč (token) s právom spúšťať akcie v `sportlinking`. Pomôžem ti ho vytvoriť.
- **SK aj EN:** zmena hlavne v EN repozitári (pri čistej ceste aj krok tu).

### 🟠 7. Denný nočný build v skutočnosti beží až o 9:00 – 11:00 nášho času
- **Kde:** `build.yml` riadok 15 (`cron: "30 2 * * *"`), v EN repozitári `"0 3 * * *"`.
- **Problém:**
  - GitHub plánované behy pri vyťažení posúva. Za posledných 20 dní bežal „2:30“ build skutočne medzi **7:06 a 9:48 UTC** (8:00 – 11:00 u nás).
  - Komentár v `build.yml` tvrdí, že SK beží pred EN. Nie je to zaručené, poradie je náhodné.
  - Do toho času sú v statickom HTML (domov, `/aktualne/`, titulok `/aktualne/`) ešte včera skončené udalosti. Návštevník to nevidí, lebo appka si stiahne čerstvý `aktualne.json`. **Google to však vidí.**
- **Ako opraviť:**
  - Posunúť čas na neokrúhlu minútu (napr. `17 23 * * *`, teda tesne po polnoci u nás). GitHub najviac zdržiava behy naplánované na celú hodinu.
  - Prípadne pridať druhý beh. Opraviť aj komentár.
- **SK aj EN:** áno (oba `build.yml`).

### 🟠 8. ikony.py: pri neúspešnom `git pull` pokračuje v polorozbitom stave
- **Kde:**
  - `ikony.py` riadok 351 (`g("pull", "--rebase", …)` bez kontroly výsledku)
  - rovnako `vlajky.py` riadok 156 a krok „Ulož dátumy zmien pre sitemap“ v `build.yml` riadok 91 (`|| true`)
- **Problém:**
  - Build začína od commitu, ktorý ho spustil, nie od najnovšieho stavu `main`.
  - Keď nahráš dáta 2× rýchlo za sebou, dva buildy obnovujú tie isté ikonky a `ikony/stav.json` sa „pobije“.
  - `git pull` vtedy zlyhá a repozitár ostane uprostred zlučovania. Skript to nezistí a ďalší commit sa aj tak pushne.
  - Potom zlyhá uloženie `sitemap-lastmod.json`. Je to **tichá chyba**, ktorú pomocník napodobnil na skúšobnom repozitári.
- **Ako opraviť:** keď `pull` zlyhá, zavolať `git rebase --abort` a nepushovať (ikonky sa dorovnajú pri ďalšom builde). V `build.yml` dať `actions/checkout` s `ref: main`.
- **SK aj EN:** áno.

### 🟠 9. ikony.py obnovuje ikonky pri každom builde, nie raz za 30 dní
- **Kde:** `ikony.py` riadky 437–439.
- **Problém:**
  - Zámer bol obnoviť každú ikonku raz za ~30 dní (1/30 webov denne).
  - Limit však platí **na jeden build**. Pri ~9 buildoch denne sa obnoví ~2 400 ikoniek denne, takže celá sada sa obnoví za ~3 dni.
  - Každý build tak pošle Googlu a Yandexu až ~540 požiadaviek, predĺži sa o ~30 s a vyrobí commit, v ktorom sa zmení 271 riadkov `stav.json`, hoci sa zmenia len 1–5 obrázkov.
  - Je to nový problém z opravy bodu 15 prvej previerky. Zvyšuje aj riziko bodu 8.
- **Ako opraviť:** obnovovať len ikonky, ktorých dátum je starší ako 30 dní (alebo počítať limit na deň, nie na build).
- **SK aj EN:** áno.

### 🟠 10. Linky na statických stránkach a tlačidlo promo bez kontroly adresy
- **Kde:**
  - `generator.py` riadok 1575: karty liniek na statických stránkach, `escape(l.get("url"))` bez `safe_url`.
  - `generator.py` riadok 1376: tlačidlo promo `btnUrl`.
- **Problém:** pri bode 14 prvej previerky dostala kontrolu adresy appka, záložný skript aj stránka Aktuálne, ale **hlavné karty liniek na 1 545 statických stránkach nie**. Adresa typu `javascript:…` (napr. chybou pri automatickom plnení) by prešla priamo do HTML, ktoré číta Google. Dnes v dátach taká nie je.
- **Ako opraviť:** použiť existujúcu `safe_url()` aj na týchto dvoch miestach.
- **SK aj EN:** áno.

### 🟠 11. Každý návštevník sťahuje 1,2 MB dát, mobil sa potom na ~1 s zasekne
- **Kde:** `index.html` `load()`, riadky 966–1022. Stiahnutie začne po načítaní stránky, s nízkou prioritou.
- **Problém:**
  - Prvé zobrazenie je už rýchle (štartovací balík a mini-balík fungujú dobre).
  - Hneď potom sa však vždy sťahuje celý `data.json` (5,5 MB, zbalený 1,2 MB), aj keď si človek pozrie jednu stránku.
  - Na slabšom mobile jeho spracovanie zablokuje stránku dvakrát na 0,8–0,9 s. Ak človek práve vtedy ťukne, odozva mešká. Google to meria ako INP (rýchlosť odozvy).
- **Ako opraviť (od najjednoduchšieho):**
  1. Celé dáta sťahovať až vtedy, keď ich treba: keď človek klikne do vyhľadávania alebo ide hlbšie, než pokrýva balík. Na podstránke z Googlu už mini-balík obsahuje všetko.
  2. Popisy (`desc`, 41 % súboru) dať do samostatného súboru, ktorý sa stiahne až pri hľadaní.
  3. Dáta rozdeliť po športoch.
- **SK aj EN:** áno.

### 🟠 12. GoatCounter nepočíta preklikávanie v appke
- **Kde:** `index.html` riadok 3770 (skript GoatCounter), `navigate()` riadky 1390–1401.
- **Problém:** GoatCounter zaznamená len prvé otvorenie webu. Keď sa človek preklikne do 5 sekcií, v štatistike je 1 zobrazenie. **Nevidíš teda, ktoré sekcie ľudí zaujímajú.**
- **Ako opraviť:** v `navigate()` zavolať `window.goatcounter.count({path: location.pathname})`, ak GoatCounter je načítaný.
- **SK aj EN:** áno.

### 🟠 13. Čítačka sa nedozvie o zmene stránky ani o výsledkoch hľadania
- **Kde:** `index.html` `navigate()` a `renderSearch()`. Na stránke nie je žiadne `aria-live`.
- **Problém:** po kliknutí na dlaždicu sa kliknutý prvok zmaže a kurzor klávesnice skočí na začiatok dokumentu. Čítačka nič neohlási. Rovnako neohlási, koľko výsledkov hľadanie našlo.
- **Ako opraviť:** po zmene sekcie presunúť kurzor na nadpis sekcie (`tabindex="-1"` a `focus()`). Pridať skrytý oznam „Nájdených 37 výsledkov“ s `aria-live="polite"`. Políčku hľadania dať `type="search"`.
- **SK aj EN:** áno.

### 🟠 14. Strážca liniek: slučka presmerovaní = „OK“, predaná doména = „presťahovaná“
- **Kde:** `strazca_liniek.py` riadky 234–240 a 266–275.
- **Problém:**
  - Web, ktorý presmerúva dookola (A→B→A), strážca označí ako **OK**. Pomocník to overil.
  - Keď doménu klubu kúpi niekto iný a presmeruje ju inam, správa napíše „presťahovaná, zváž novú adresu“. Skutočný prípad: `gplallameryem.com → gethomeinspector.com`. To zvádza nahradiť linku spamom.
  - Naopak `dailymail.co.uk → dailymail.com` je planý poplach.
- **Ako opraviť:**
  - Presmerovanie v slučke označiť ako „varovanie“.
  - Pri presmerovaní **domovskej stránky** na úplne inú doménu písať „over ručne, doména mohla byť predaná“ a nenavrhovať novú adresu.
- **SK aj EN:** strážca beží len tu (dáta sú spoločné).

### 🟠 15. Zrkadlové funkcie v appke a generátore nikto automaticky neporovnáva
- **Kde:** asi 18 dvojíc, ktoré „MUSIA zostať zhodné“. Napríklad:
  - `slugify`, `nodeSlugBase`/`slug_base`, riešenie rovnakých slugov
  - `renderIcon`/`icon_html`, `safeUrl`/`safe_url`, `aktVisible`/`akt_visible`
  - funkcie stránky Aktuálne (`liveTitle`, `liveMetaDesc`…), titulky
  - značkovanie dlaždíc domova, okienko reklamy
  - CSP: tú build kontroluje, ostatné nie
- **Problém:** pri každej úprave treba meniť dve miesta v dvoch jazykoch. Keď sa na jedno zabudne, vzniknú presne tie ťažko odhaliteľné chyby, aké boli v minulosti („Stránka s presmerovaním“, duplicity titulkov). Test živého webu skúša len 3 náhodné stránky.
- **Ako opraviť:**
  - Do testu (alebo do buildu) pridať kontrolu: appku spustiť v prehliadači a pre všetkých 1 545 stránok porovnať adresu a titulok, ktoré vyrobí appka, s tými od generátora.
  - Druhá možnosť: zoznam adries a titulkov z generátora dávať appke hotový, ako sa to už robí pri `_slugFix` a `_titleNoSport`.
- **SK aj EN:** áno.

### 🟢 16. Stránka /aktualne/: tenký obsah, chýbajú štruktúrované dáta udalostí
- **Kde:** `generator.py` `live_static_html()` (riadok 434) a `live_meta_desc()` (riadok 422).
- **Čo som videl:**
  - Stránka je technicky správne: vlastný titulok, canonical, hreflang SK↔EN, je v sitemape, má drobčeky.
  - Dnes má však len **3 linky bez popisov**. Keď nič nebeží, ostane na nej len veta „Práve teraz nie je nič aktívne“. Google také stránky môže označiť za „tenký obsah“ alebo „soft 404“.
  - Titulok hovorí „tenis, stolný tenis“, meta popis len „tenis“, lebo dlhá úvodná veta zaberie miesto.
- **Ako zlepšiť:**
  1. Ku kartám vypisovať dátum „od – do“ (polia `startsAt`/`endsAt` už existujú) a popis.
  2. Pridať štruktúrované dáta `ItemList` s položkami `SportsEvent` (názov, dátum, odkaz). Google tak rozumie, že ide o podujatia.
  3. Skrátiť úvodnú vetu popisu, aby sa zmestili všetky športy.
- **SK aj EN:** áno (EN `/live-this-week/`).

### 🟢 17. GitHub Actions: zastarané verzie akcií (Node 20)
- **Kde:** všetky workflowy (`checkout@v4`, `setup-python@v5`, `configure-pages@v5`, `upload-artifact@v4`, `upload-pages-artifact@v3`, `deploy-pages@v4`).
- **Problém:** GitHub v logu hlási „Node.js 20 is deprecated… forced to run on Node.js 24“. Dnes to funguje, no pri ďalšej zmene na strane GitHubu môžu akcie prestať fungovať.
- **Ako opraviť:** zvýšiť verzie na aktuálne (napr. `checkout@v5`, `setup-python@v6`).
- **SK aj EN:** áno.

### 🟢 18. Nasadenie sa môže zrušiť uprostred, build nemá časový limit
- **Kde:** `build.yml` riadky 24–26 (`cancel-in-progress: true`) a riadok 29 (bez `timeout-minutes`).
- **Problém:**
  - Nový build zruší starší **aj počas samotného nasadzovania** na GitHub Pages. GitHub preto v predlohe odporúča `false`.
  - Bez limitu by zaseknutý build bežal až 6 hodín.
  - Keď generátor spadne, web ostane starý a príde len bežný e-mail od GitHubu (to je v poriadku, len vedieť).
- **Ako opraviť:** úlohe `deploy` dať vlastnú skupinu bez rušenia a úlohe `build` pridať `timeout-minutes: 30`.
- **SK aj EN:** áno.

### 🟢 19. Test živého webu: pri meškajúcom nasadení otestuje starý web a ukáže ✅
- **Kde:** `testy/test_webu.py` riadky 264–269 a 343–354.
- **Problém:**
  - Ak sa nová verzia na webe neobjaví do 5 minút, test len upozorní a otestuje **starý** web. Nasadenie, ktoré sa nepodarilo, tak vyzerá zelené.
  - Test berie adresy zo sitemapy tak, ako sú, takže pri skúške na inej adrese testuje aj tak ostrý web.
  - Spúšťač na „Build & Deploy (EN)“ v tomto repozitári nikdy nezaberie (je zámerne spoločný, nevadí).
- **Ako opraviť:** pri meškajúcom nasadení dať ❌. Adresy zo sitemapy prepísať na zadanú `--url`. Inštaláciu prehliadača (49 s) dať do pamäte (cache).
- **SK aj EN:** áno.

### 🟢 20. Čo test živého webu nekontroluje
Pre budúce rozšírenie (stačí raz denne, nie po každom builde):
- páry hreflang SK↔EN a canonical,
- či je `sitemap.xml` platná a **všetky** jej adresy vracajú 200 (dnes sa skúšajú 3),
- `robots.txt`,
- či sa verzia `data.json` na webe zhoduje s repozitárom,
- presmerovanie `http→https` a `www→bez www`,
- obrázky v `/ikony/`.
- **SK aj EN:** áno.

### 🟢 21. Strážca data.json: drobné medzery
- **Kde:** `strazca-data-json.yml` riadok 18.
- **Čo som overil:** strážca porovnáva celý návrh (všetky commity), takže funguje správne.
- **Medzery:**
  - Keď sa `data.json` v návrhu **premenuje**, strážca to nezachytí.
  - Nechráni priečinky, ktoré spravuje robot (`ikony/stav.json`, `kontrola-liniek/`).
  - Nemá blok `permissions`.
- **Ako opraviť:** `git diff --name-only --no-renames`, doplniť priečinky do zoznamu a pridať `permissions: contents: read`. Over aj v nastaveniach repozitára (Branch protection), že je to **povinná** kontrola, inak sa dá zlúčiť aj s červeným krížikom.
- **SK aj EN:** áno.

### 🟢 22. Strážca liniek: 1 184 varovaní „403“ zahlcuje správu, počítadlo behov
- **Kde:** `strazca_liniek.py` riadky 277–278, 330, 356–360.
- **Problém:**
  - 11 % adries (sofascore 158, volleybox ~123, iihf 51…) vracia 403, lebo tieto weby blokujú robotov. Správa `sprava.md` (251 kB) je z väčšiny len ony.
  - „Mŕtva = 2 behy po sebe“ počíta behy, nie týždne. Ručný beh v ten istý deň tak spraví z „podozrivej“ linky „mŕtvu“.
  - Pri druhom pokuse prepíše výsledok 404 výsledkom „časový limit“.
  - `stav.json` (1,2 MB) sa každý týždeň prepíše celý.
- **Ako opraviť:**
  - 401/403/429 dať do samostatnej skupiny „blokuje robotov“ (súhrn po doménach).
  - Počítadlo zvyšovať len pri behu v inom dni a nechávať horší výsledok.
  - Dátum kontroly ukladať len pri linkách, ktoré nie sú OK.

### 🟢 23. Repozitár rastie zbytočne rýchlo (commity robota)
- **Čísla:** len 3. 11. pribudlo 9 commitov „ikony“, 6 „sitemap“, 1 „vlajky“ a 1 „Strážca“. Každý commit „ikony“ mení 271 riadkov `stav.json`. Stiahnutie repozitára pri builde už trvá **32 s** (najdlhší krok buildu).
- **Ako opraviť:** body 9 a 22 to väčšinou vyriešia. Navyše sa dá v `actions/checkout` nastaviť `sparse-checkout` (build nepotrebuje napr. `kontrola-liniek/`).

### 🟢 24. Ikonky a vlajky: drobnosti
- **Neviditeľné ikonky:** 18 ikoniek od Yandexu je úplne priehľadných (16×16, každý bod neviditeľný). `ikony.py` (riadok 297) ich berie ako platné, takže na webe je namiesto ikonky prázdne miesto. Oprava: celopriehľadný alebo jednofarebný obrázok brať ako „bez ikonky“.
- **Zlá prípona:** 590 súborov sú v skutočnosti JPEG uložené ako `.png` (riadok 478). Prehliadače si poradia, ale typ súboru je zlý. Oprava: previesť na PNG alebo uložiť so správnou príponou.
- **Dočasné súbory vlajok:** `vlajky.py` (riadky 199–201) zapisuje dočasný súbor priamo do `vlajky/`. Keby sa build zastavil uprostred, súbor `.tmp` sa môže commitnúť. `ikony.py` to už robí správne. Sťahovanie vlajky nemá limit veľkosti (flagcdn je dôveryhodný, riziko malé).
- **Čo je dobré:** ikonky a vlajky sú malé (1,5 kB, resp. ~0,9 kB). Ďalšia optimalizácia by ušetrila len ~1 %.
- **SK aj EN:** áno.

### 🟢 25. Admin kód (~63 kB) sťahuje každý návštevník
- **Kde:** `index.html`: ~49 kB JavaScriptu len pre admin (riadky ~2055–2132, 2361–2660, 2821–2985, 3196–3600) a ~14 kB HTML okien adminu (640–846).
- **Problém:** návštevník ho nikdy nepoužije, a predsa ho stiahne (zbalené ~15–20 kB) a prehliadač ho musí spracovať.
- **Ako opraviť:** admin časť presunúť do samostatného súboru `admin.js`, ktorý sa načíta až po `/#admin`. Je to väčší zásah do kódu, oplatí sa až spolu s bodom 11.
- **SK aj EN:** áno.

### 🟢 26. Vyhľadávanie a drobné spomalenia na slabom mobile
- **Kde a čo:**
  - `renderSearch()` (riadok 2178) pri **každom** písmene znova prechádza celý strom kvôli skrytým priečinkom (`markHidden`), hoci sa to dá spočítať raz.
  - Hľadanie „a“ vyrobí ~5 000 prvkov na stránke (0,5 s). Pomohlo by hľadať až od 2 znakov.
  - `getPath`, `nodeIcon` a `bannerSectionOk` hľadajú uzly cez `DB.nodes.find` (16 500 položiek) pri každom predkovi. Pomohla by jedna spoločná mapa id → uzol.
  - Posúvanie lišty Aktuálne (`updateAktFade`, riadok 3636) pri každom pohybe prepočítava rozloženie stránky (38 ms na spomalenom mobile).
  - `ensureSlugs()` beží pri každom štarte návštevníka (19 ms), hoci žiadny priečinok slug nepotrebuje.
- **SK aj EN:** áno.

### 🟢 27. Okno s heslom (`/#admin`) sa nedá zavrieť
- **Kde:** `index.html` riadky 568–576 a 2651–2652.
- **Problém:** okno hesla nemá krížik a nezavrie ho ani Escape. Návštevník, ktorý omylom otvorí `/#admin`, musí znova načítať stránku.
- **Ako opraviť:** pridať tlačidlo „Zavrieť“ a zavrieť okno aj klávesom Escape.

### 🟢 28. Neexistujúca podstránka v appke nenapíše „stránka neexistuje“
- **Kde:** `index.html` riadky 1329–1381.
- **Problém:**
  - Pri preklepe v adrese (napr. `/hokej/neexistuje/`) server správne vráti 404, takže pre Google je to v poriadku.
  - Appka však potichu ukáže najbližšiu existujúcu sekciu (Hokej) s jej titulkom, bez vysvetlenia.
- **Ako opraviť:** keď sa adresa nedá celá rozlúštiť ani po stiahnutí dát, zobraziť pásik „Táto stránka neexistuje, tu je najbližšia sekcia“.

### 🟢 29. Mŕtvy a zdvojený kód
- **generator.py:**
  - Riadok 1682: premenná `body` sa nikde nepoužíva.
  - Riadok 1678: náhrada `__DATAURL__` v `TAKEOVER` už nemá čo nahradiť.
  - Riadky 638–640: prebytočné prázdne riadky.
  - Počítanie liniek v podstrome je **4×** (`build_boot`, `link_counts`, `home_static_html`, čiastočne `compute_has_link`).
  - Statický domov má titulky tlačidiel adminu len po slovensky (`Hore`, `Dole`…) aj na EN webe, ale zhodne s appkou.
- **index.html:**
  - `todayLocal` (2698) a `aktToday` (3014) sú rovnaké funkcie.
  - Zisťovanie hostiteľa z adresy je skopírované 3× (1784, 2252, 3115), hoci existuje `colHost`.
  - Text počtov v `renderLevel` je 2× (1739–1745 a 1768–1771).
  - Ostali staré vetvy pre `passwordHash`/`password` a `lsLegacyTake`.
  - Funkcie `renderLevel` (~150 riadkov), `load` (~137) a `renderSearch` (~110) sú príliš dlhé na pohodlnú údržbu.
- **ikony.py:** riadok 384, premenná `data_ok` sa nepoužíva.
- **Čo je dobré:** všetkých 5 Python súborov prejde bez varovaní. Komentáre sú vecné a vysvetľujú *prečo*.
- **SK aj EN:** áno.

### 🟢 30. Drobnosti
- **EN počítadlo liniek:** `index.html` riadok 1507 formátuje vždy po slovensky („14 512“), na EN webe má byť „14,512“. Riadok 2789 to už robí správne.
- **`www.` pri sťahovaní dát pre EN:** EN build sťahuje z `https://www.sportlinky.sk/data-full.json` (EN `build.yml`). Web beží bez www, takže každé stiahnutie ide cez presmerovanie. Stačí opraviť adresu. Potom sa dá z CSP vyhodiť aj `https://www.sportlinky.sk`.
- **Časové pásmo pri builde:** `generator.py` (`akt_visible`, `_promo_ok`, `akt_shown_ms`) ráta dátum v čase servera (UTC). Medzi polnocou a 1:00 (v lete 2:00) u nás je to ešte „včera“. Appka ráta správne miestny čas, takže to ovplyvní len statické HTML. Oprava: `zoneinfo("Europe/Bratislava")`.
- **Id v onclick:** `index.html` vkladá id uzlov do `onclick="...('${id}')"` (napr. 1742–1748, 3352–3356) bez ošetrenia apostrofu. Dnes sú id bezpečné (generuje ich appka). Je to len poistka.
- **Banner bez `<script>`/`<iframe>`** ide do stránky priamo (`index.html` 2738, 2797; `generator.py` 1211). Napr. `<img onerror=…>` by sa vykonal. Zadáva ho len admin, takže je to len na vedomie.
- **Heslo admina:** zabezpečenie je teraz dobré (PBKDF2, 600 000 opakovaní, soľ). Odtlačok je však v `data.json` aj v `data-full.json`, ktoré sú verejné (`data-full.json` musí ostať kvôli EN webu). Stačí, aby heslo bolo dlhé a nepoužívané nikde inde. Z `data.json` pre návštevníkov by sa `pwKdf` dalo vynechať a admin by si ho vzal z `data-full.json`.

---

## Čo je v poriadku (netreba robiť nič)
- **Opravy z prvej previerky fungujú:**
  - prevzatie podstránky appkou bez čakania (mini-balík)
  - odľahčený `data.json` bez hesla
  - ikonky a vlajky z vlastného webu (0× flagcdn.com)
  - favicon súbory, titulky (0 duplicít, nad 65 znakov ostáva 33)
  - `og:site_name`/`og:locale`, `WebSite` na domove, `robots.txt` bez dátových súborov
  - kontrast, CSP: **0 porušení** v teste
  - okienko reklamy so sandboxom, kontrola `e.source` pri správach z okienka
- **Domov** má dlaždice aj Aktuálne priamo v HTML, appka ich prevezme **bez prekreslenia** (0 zmien v stránke).
- **sitemap:** 1 546 adries s hreflang trojicou, `lastmod` podľa skutočnej zmeny. Môj build ho nezmenil (0 zmenených).
- **Najväčší priečinok** má 64 položiek, prechod doň trvá 0,12 s.
- **Strážca liniek** sa správa slušne k cudzím webom (max. 2 požiadavky naraz na doménu, 1 s odstup). Ikonky sa sťahujú bezpečne (limit 512 kB, kontrola, že ide o obrázok).

---

## Odporúčané poradie opráv

1. **Hneď, malé opravy v `index.html` (jeden pull request):** body **1, 2, 3, 5, 12, 27**, plus EN počítadlo z bodu 30. Spolu do pár hodín, efekt pre každého návštevníka.
2. **Vyhľadávanie:** bod **4**, len časť pre vyhľadávanie, bez zmeny adries. Dá sa pridať do toho istého pull requestu ako krok 1.
3. **Build a ikonky (jeden pull request):** body **7, 8, 9, 17, 18** a oprava `www.` z bodu 30. Spolu s bodom **6** (EN build), ktorý však potrebuje aj úpravu v `sportlinking`.
4. **Generátor:** body **10** a **29** (mŕtvy kód), časové pásmo z bodu 30. Malé, dajú sa naraz.
5. **Prístupnosť:** bod **13**. Dá sa spojiť s krokom 1, ak chceš mať prístupnosť vybavenú naraz.
6. **Strážca liniek:** body **14** a **22** naraz, potom bod **21**.
7. **Testy:** body **19, 20** a **15** (kontrola zhody appky a generátora). Najlepšie pred väčšími zmenami z bodu 11, aby ich test strážil.
8. **Väčšie veci, každú najprv naplánovať:** body **11** a **25** (menej sťahovaných dát, admin zvlášť), bod **16** (Aktuálne pre Google), bod **24** a bod **26**.

**Anglický web:** všetko okrem bodov 14 a 22 (strážca liniek beží len tu) treba urobiť aj v `sportlinking`. Bod 6 je hlavne o `sportlinking`.
