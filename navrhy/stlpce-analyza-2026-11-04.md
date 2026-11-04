# Analýza stĺpcového zobrazenia (Zadanie 26a) — 4. 11. 2026

Len správa. `index.html` ani nič iné som nemenil. Testoval som lokálny build (`python3 generator.py` → `_site/`,
servírované cez `python3 -m http.server`) v Chromiu cez Playwright **skutočným pohybom myši a kolieskom**,
nie volaním funkcií. Snímky sú v `navrhy/stlpce-snimky/`, testovacie skripty v `navrhy/stlpce-testy/`
(dajú sa spustiť znova pri oprave: `node navrhy/stlpce-testy/t1.js`, web musí bežať na `localhost:8123`).

Kód stĺpcov je v oboch repozitároch **úplne rovnaký** (porovnal som SK a EN `index.html` — 0 rozdielnych
riadkov v bloku stĺpcov), takže všetko nižšie platí aj pre sportlinking.com a oprava sa bude robiť 2×.

---

## (a) Zhrnutie pre začiatočníka

Obidva problémy, ktoré ťa trápia, som zreprodukoval hneď a majú **spoločnú príčinu**: kód nerozlišuje, či sa
**myš naozaj pohla**, alebo sa **pod nehybnou myšou pohol obsah** (stránka sa sama posunula, stĺpce sa
zbalili do pásikov a posunuli doľava, stĺpec sa zroloval). Prehliadač v oboch prípadoch hlási „myš je nad
novou položkou“ a kód to po 0,12 s poslušne otvorí. Navyše pri každom otvorení priečinka sa **zmaže a nanovo
postaví celý obsah stránky** (`main.innerHTML = …`), čím sa každý stĺpec vráti na začiatok (scrollTop = 0).

Konkrétne:

* **„Spadnem niekam, kam som nechcel“** — tri mechanizmy, všetky zmerané:
  1. Po otvorení prvého stĺpca sa stránka sama posunie (bannery a Aktuálne odídu hore) a kód po 0,76 s
     **sám vyvolá prechod myšou** na to, čo sa po posune ocitlo pod kurzorom. Myš stojí na „Futbal“, otvorí sa
     „Ostatné športy“. (snímky `p1-01` → `p1-03`, video `video-p1-futbal-stojaca-mys.webm`)
  2. Pri 5. úrovni sa prvý stĺpec zbalí do pásika — všetky stĺpce **skočia o 186 px doľava** a pod nehybnou
     myšou je iná položka v inom stĺpci. Prehliadač to ohlási ako prechod myšou → otvorí sa, stĺpce skočia
     znova → otvorí sa ďalšie. Jedným pohybom na „Anglicko“ som skončil na „Anglicko › League One › Barnsley“
     za 0,3 s. (snímka `p1-05`)
  3. Chýba „menu aim“: keď ideš šikmo z „Európa“ na „Nemecko“ v ďalšom stĺpci, prejdeš cez „Južná Amerika“,
     tá sa otvorí a Nemecko zmizne. (snímka `p1-04`)
* **„Hodí ma to úplne hore“** — každé otvorenie priečinka prekreslí celý `<main>`, takže dlhý stĺpec, ktorý si
  zroloval dole, začne znova od vrchu. Stačí **len rolovať kolieskom**: položky sa posúvajú pod nehybnou
  myšou, prehliadač hlási prechod, po 0,12 s sa priečinok otvorí a stĺpec skočí hore. Automatické rolovanie
  pri hornom okraji je tu až druhoradé (a po prekreslení sa aj samo vypne).
  (snímky `p2-01` → `p2-02`, video `video-p2-rolovanie-a-skok-hore.webm`)

Výkon **nie je** problém (prekreslenie 20–36 ms, 60 fps, žiadne úniky pamäte, žiadne chyby v konzole ani
porušenia CSP). Problém je návrh: „prekresli všetko a reaguj na každý prechod“ + „hýb obsahom pod myšou“.

**Odporúčam stĺpce prepísať nanovo (čistejšie), nie záplatovať** — podrobne v časti (d).

---

## (b) Nájdené chyby a slabiny

Závažnosť: 🔴 návštevník to zažije bežne a vadí to · 🟠 stane sa to, ale menej často / menej bolí · 🟢 drobnosť.

### Tvoje dva problémy (zreprodukované ako prvé)

**1. 🔴 Umelý prechod myšou po automatickom posune stránky (`colsIntoView`)**
* *Kde:* `colsIntoView()` — po `window.scrollBy({behavior:'smooth'})` nastaví `_colsQuietUntil` (0,7 s) a po
  0,76 s urobí `document.elementFromPoint(_mx,_my).dispatchEvent(new MouseEvent('mouseover'))`.
* *Prejav:* Z domova prejdeš myšou na „Futbal“ a nehýbeš sa. Stránka sa posunie o 219 px, pod kurzorom je
  teraz „Ostatné športy“ a tie sa otvoria. Zmerané: `colPath` po 0,9 s = `["Ostatné športy"]`.
  Po celých 0,7 s sa navyše všetky skutočné prechody myšou ignorujú (pôsobí to „zaseknuto“).
* *Oprava:* Umelý prechod úplne zrušiť. Po posune stránky čakať na **skutočný pohyb myši** (porovnať
  `clientX/Y` s poslednou polohou — otvárať len ak sa myš pohla aspoň o pár px). Ešte lepšie: stránku pod
  kurzorom vôbec neposúvať (viď otázka 3 v časti (e)).

**2. 🔴 Zbalenie do pásikov posúva stĺpce pod myšou → reťazová reakcia**
* *Kde:* `renderColumns` — `firstFull = levels.length - COLS_MAX`, zbalený stĺpec má 34 px namiesto 220 px,
  takže všetko vpravo skočí o 186 px doľava. K tomu `wrap.scrollLeft = wrap.scrollWidth` (vodorovný posun).
  Prehliadač po zmene rozloženia sám ohlási `mouseover` na novú položku (`isTrusted: true`, zmerané).
* *Prejav:* Jeden pohyb na „Anglicko“ (4. úroveň) → zbalí sa „Sekcie“ → pod myšou je „League One“ → otvorí
  sa → zbalí sa „Futbal“ → pod myšou „Barnsley“. Časy: Anglicko 0 ms, League One +155 ms, Barnsley +300 ms.
  Na 1024 px je to ešte horšie, lebo k tomu pribúda vodorovné rolovanie (`wrapLeft` 292 px).
* *Oprava:* (1) nikdy neotvárať priečinok na základe prechodu, ktorý nevznikol pohybom myši (rovnaká
  ochrana ako v bode 1 — jedna funkcia vyrieši 1, 2, 4 aj 7); (2) rozloženie stĺpcov vľavo od aktívneho
  **nemeniť počas hoveru** — zbaľovať len pri kliknutí/pripnutí, alebo pásiky zrušiť a nechať stĺpce
  rolovať vodorovne ako Finder (otázka 1).

**3. 🔴 Chýba „menu aim“ (šikmý pohyb cez susedné položky)**
* *Kde:* delegovaný `mouseover` na `<main>` + `setTimeout(…,120)`. Oneskorenie 0,12 s je príliš krátke na
  prechod do ďalšieho stĺpca (ten je 228 px ďalej) a nič neberie do úvahy smer pohybu.
* *Prejav:* Pomalý šikmý pohyb z „Európa“ (col 2) na „Nemecko“ (col 3, o 130 px nižšie) za 0,5 s: cestou sa
  otvorí „Južná Amerika“, Nemecko zmizne, skončíš v „Južná Amerika › Ekvádor“. Rýchly pohyb (0,15 s) prejde
  — ale potom zasiahne bod 2 („Nemecko › Regionalliga Nordost“ bez pohybu myši).
* *Oprava:* Štandardný „menu aim“ (trojuholník smeru, ako Amazon / Ben Kamens `jQuery-menu-aim`): ak sa
  kurzor hýbe smerom k otvorenému podstĺpcu (do trojuholníka medzi kurzorom a horným/dolným rohom
  ďalšieho stĺpca), prechod cez iné položky sa **neotvára**, kým sa pohyb nezastaví. Jednoduchšia alternatíva:
  otvárať až keď sa myš **zastaví** na položke (rýchlosť < ~0,1 px/ms počas 150–200 ms), nie po pevných 120 ms.
  Oneskorenie zvýšiť na ~150–200 ms.

**4. 🔴 Každé otvorenie priečinka prekreslí celý `<main>` → stĺpce stratia posun (scrollTop = 0)**
* *Kde:* `renderColumns` stavia HTML reťazec pre **všetky** stĺpce a robí `main.innerHTML = html`.
* *Prejav:* Stĺpec „Európa“ (55 krajín, 1 817 px obsahu v 668 px) zroluješ dole. Akýkoľvek prechod na
  krajinu → celý stĺpec je znova od „Slovensko“. Dokonca **samotné rolovanie kolieskom** to spustí: položky
  sa posúvajú pod nehybnou myšou, prehliadač ohlási prechod, otvorí sa „Švédsko“/„Belgicko“ a stĺpec skočí
  hore (zmerané: po 10 otáčkach kolieska `scrollTop` 1149 → 0).
* *Oprava:* Prekresľovať **len to, čo sa mení**: stĺpce vpravo od úrovne, na ktorej sa otvoril nový priečinok,
  pridať/odobrať; stĺpce vľavo nechať v DOM (len prepnúť triedu `open`). Alebo núdzovo: pred prekreslením si
  zapamätať `scrollTop` každého stĺpca podľa `data-lv` a po ňom ho vrátiť. Plus ochrana z bodu 1 (prechod
  bez pohybu myši = nič).

**5. 🟠 Automatické rolovanie pri okraji stĺpca**
* *Kde:* `mousemove` na `<main>` → `colEdgeStep` (4 px/snímku = 243 px/s, zmerané), zóna 60 px hore,
  36 px dole. Počas rolovania sa položky neotvárajú (`if(_edgeCol) return`).
* *Prejav:* (1) Položky v horných 60 px a dolných 36 px rolovateľného stĺpca sa myšou **nedajú otvoriť**,
  kým sa stĺpec nedoroluje na koniec. (2) Po akomkoľvek prekreslení sa rolovanie vypne (`!isConnected`)
  a znova nabehne až po ďalšom pohybe myši (v teste 0 px/s, kým som nepohol o 1 px). (3) Keď zo zóny uhneš,
  otvorí sa to, čo je práve pod myšou (bod 4) a stĺpec skočí hore. (4) Pevná rýchlosť bez rozbehu — ťažko sa
  trafiť na položku.
* *Oprava:* Odporúčam **zrušiť** — Finder ani mega-menu auto-rolovanie nemajú, koliesko stačí a po oprave
  bodu 4 bude koliesko fungovať. Ak ho chceš nechať: zóna max. 24 px, rýchlosť úmerná vzdialenosti od
  okraja, neblokovať otváranie položiek.

### Ďalšie chyby správania

**6. 🟠 Časovač sa nezruší pri opustení položky**
* *Kde:* `colTimer` sa ruší len pri ďalšom `mouseover` na inú položku; `mouseout`/`mouseleave` sa nespracúva.
* *Prejav:* Prejdeš cez „Hokej“ za 40 ms a odídeš do hlavičky → po 120 ms sa Hokej aj tak otvorí, hoci myš
  je úplne inde (zmerané `colPath = ["Hokej"]`).
* *Oprava:* `clearTimeout(colTimer)` pri `mouseout` z `.cit` a pri `mouseleave` z `#colsWrap`.

**7. 🟠 Po kliknutí, Späť a Vpred sa otvorí „niečo“ pod kurzorom**
* *Kde:* `navigate()` → `render()` → `renderColumns` — nové rozloženie, myš stojí → prehliadač ohlási prechod.
* *Prejav:* Klik na „Anglicko“ → ihneď `colPath` = „… Anglicko › League One“ (nechcel som). Vpred → „… Európa ›
  Slovensko“ (náhodná položka pod kurzorom).
* *Oprava:* rovnaká ako bod 1/2 (prechod bez pohybu myši sa ignoruje).

**8. 🟠 Po kliknutí ostáva stránka posunutá — vrch stĺpcov je pod hlavičkou**
* *Kde:* `navigate()` — v stĺpcovom režime sa `scrollTo(0,0)` vynecháva (bod 2 previerky) a `colsIntoView`
  sa pri kliknutí nevolá.
* *Prejav:* Stránka posunutá o 400 px, klik na priečinok → vrch stĺpcov je −74 px od okraja okna (hlavička
  má 97 px) → názvy stĺpcov a prvé položky sú schované (snímka `nav-10`, podobne `ux-04` Aktuálne).
* *Oprava:* Po `navigate` v stĺpcoch posunúť stránku tak, aby stĺpce začínali pod hlavičkou (bez umelého
  hoveru), alebo stĺpce urobiť `position:sticky` pod hlavičkou.

**9. 🟠 Počet stĺpcov nezávisí od šírky okna**
* *Kde:* `COLS_MAX = 4` natvrdo; 4 × 220 + 280 (panel) + medzery = 1 192 px.
* *Prejav:* 1024 px: obsah 1 192 px v 984 px → vodorovné rolovanie, prvý stĺpec odrezaný (`wrapLeft` 208).
  1280 px pri 5.–6. úrovni: 1 276–1 308 px v 1 240 px → pásiky „Sekcie“/„Futbal“ sú odrezané vľavo
  (`left` −16 px, snímka `rozl-1280x800-hlbka5`). 1440 a 1920 px: všetko sa zmestí (`main` má max 1 320 px, pri
  1920 ostáva 600 px prázdnych — stĺpce by mohli byť širšie alebo by ich mohlo byť viac).
* *Oprava:* Počet viditeľných stĺpcov počítať zo šírky: `Math.floor((šírka_wrap − 280 − 8) / 228)`,
  minimálne 2; pri 1920 px dovoliť 5–6 stĺpcov alebo širšie stĺpce (dlhé názvy by sa neodrezávali).

**10. 🟠 Klik na pásik zahodí cestu**
* *Kde:* `colExpand(lv)` → `colPath = colPath.slice(0, lv)`.
* *Prejav:* Si v „Futbal › Kluby › Európa › Anglicko“, klikneš na pásik „Sekcie“ → všetko zmizne, ostane len
  koreňový stĺpec, a pod myšou sa hneď otvorí „Tipovanie“ (bod 7). Finder by cestu nechal a len posunul pohľad.
* *Oprava:* Pásik = posun pohľadu (vodorovné rolovanie na ten stĺpec), nie skrátenie cesty. Ak pásiky
  ostanú, skracovať na `lv + 1`, aby bol kliknutý stĺpec aj s označenou položkou viditeľný.

**11. 🟠 Klávesnica a čítačka**
* *Zistené:* pásiky sú `<div onclick>` bez `tabindex`/`role` (klávesnicou nedostupné); stĺpce nemajú
  `role`; panel s popisom nemá `aria-live` (čítačka zmenu neohlási); prepínač ▦/▥ nemá `aria-pressed`;
  fokus na položke nič neotvorí (len Enter = navigácia), šípky nefungujú; po Enter skočí fokus na H1
  (bod 13 previerky) — človek s klávesnicou stratí miesto v stĺpci; Tab prechádza aj cez 2 reklamné iframy;
  počet „4 📂“ čítačka prečíta ako „4 open file folder“.
* *Oprava:* `role="tree"`/`"treeitem"` + `aria-expanded`, šípky ←/→/↑/↓ (vpravo = otvoriť, vľavo = späť),
  pásiky ako `<button>`, `aria-live="polite"` na paneli, `aria-pressed` na prepínači, `aria-label` na
  počtoch. (Rozsah: stredný; môže byť samostatné zadanie.)

**12. 🟢 Notebook s dotykovou obrazovkou**
* Pri dotyku je ťuknutie = navigácia (funguje, adresa sa mení), ale **popis linky sa dotykom nedá zobraziť**
  — ťuknutie na linku rovno otvorí web. Prepínač sa na čisto dotykovom zariadení správne skryje
  (`hover:none`). Oprava (ak chceš): dlhé podržanie = popis, alebo malé „i“ pri linke.

**13. 🟢 Promo blok (aj reklamný iframe) sa pri každom prekreslení vkladá nanovo**
* *Kde:* `_colPromo` je súčasť reťazca `main.innerHTML`. Zmerané: 3 prekreslenia na „Tipovaní“ = 3× nový
  `<iframe class="adframe">` (rotátor partnera sa načíta odznova).
* Dnes sa to myšou nestane, lebo Tipovanie nemá podpriečinky. Ak niekedy dáš promo do sekcie
  s podpriečinkami, reklama bude pri každom prechode myšou blikať a načítavať sa.
* *Oprava:* promo blok držať v samostatnom prvku mimo prekresľovanej časti.

**14. 🟢 Hľadanie v stĺpcovom režime** — `main` si nechá triedu `cols-mode` (prepína sa len v `renderLevel`),
takže výsledky hľadania majú `min-height: 700px` (prázdne miesto dole). Inak hľadanie funguje a po
zmazaní sa stĺpce vrátia aj s cestou. Oprava: triedu prepínať v `render()`.

**15. 🟢 Dlhé názvy** — „Ligue Nationale de Football (Championnat National)“ (50 znakov) a linka „FIBA
Basketball World Cup 2027 – európska kvalifikácia (muži)“ (61) sa orežú s „…“ a **nemajú `title`**, takže
celý názov sa nedá zistiť inak než v paneli (priečinky) / vôbec (linky, kým na ne neprejdeš). Oprava:
`title` na položke, alebo širšie stĺpce (bod 9).

**16. 🟢 Koliesko na konci stĺpca posúva celú stránku** — `.col` nemá `overscroll-behavior: contain`;
pri rolovaní dole dorolujem stĺpec a ďalšie otáčky posunú stránku, stĺpce vbehnú pod hlavičku (vidno na
videu P2). Oprava: `overscroll-behavior: contain` na `.col` a `.cdetail`.

**17. 🟢 Prevzatie statickej stránky** — statické HTML je vždy v dlaždiciach; s uloženou voľbou „Stĺpce“
návštevník na zlomok sekundy vidí dlaždice, potom skok do stĺpcov. Štartovací balík to zvláda rýchlo
(stĺpce boli na obrazovke už pri prvej kontrole po načítaní), takže len upozorňujem. Hlbšie úrovne pred
príchodom `data.json` správne ukážu „Načítavam…“.

### Kód — čo je krehké, zložité alebo duplicitné

**18. 🟠 Tri časovače a tri stavové premenné, ktoré si prekážajú** — `colTimer` (120 ms), `_colsQuietUntil`
+ `_colsQuietT` (700/760 ms, odhadnuté podľa trvania `smooth` scrollu — na pomalom PC alebo pri
`prefers-reduced-motion` to nesedí), `_edgeRaf`. Každý rieši dôsledok iného („zaseklo sa“ → umelý hover;
„otvára sa počas rolovania“ → blokovanie). Správne riešenie je jedno pravidlo: **otvárať len po
skutočnom pohybe myši, ktorý sa zastavil nad položkou**.

**19. 🟠 `renderColumns` robí všetko naraz** — stavia HTML všetkých stĺpcov + panel + promo, vkladá cez
`innerHTML`, nastavuje `scrollLeft`, zastavuje rolovanie, posúva stránku. Nedá sa prekresliť jeden stĺpec.
Správny tvar: `stav → zoznam stĺpcov → pre každú úroveň: ak existuje a je rovnaká, nechaj; inak nahraď`.

**20. 🟢 Duplicita** — `colClick` je kópia `navClick` + nastavenie `colPath` (to by `renderColumns` aj tak
urobil, lebo `_colPathCur !== curId`). `colHost` / `favHtml` / `socHtml` sú spoločné s dlaždicami (dobre),
ale položka priečinka a linky sa skladá inline reťazcom — ťažko sa to číta a testuje.

**21. 🟢 Globálne poslucháče** — `mousemove`, `mouseover`, `mouseleave` na `#main` sú zaregistrované raz
(delegované), **únik poslucháčov som nenašiel** (pamäť po 80 prekresleniach stabilná 21,7 MB). `resize`
správne prepne režim pri prechode pod 700 px a späť. `mousemove` beží aj v režime dlaždíc (hneď sa vráti —
zanedbateľné).

**22. 🟢 Stav `colPath` pri navigácii** — `_colPathCur` funguje: po kliknutí sa cesta nastaví podľa adresy,
pri Späť/Vpred (`popstate`) tiež; prepnutie Dlaždice ↔ Stĺpce v hĺbke zachová otvorenú sekciu (stratia sa
len stĺpce otvorené myšou nad ňou — v poriadku). Obnovenie stránky zachová režim (`localStorage`). Aktuálne
v stĺpcoch ukáže 3 linky dňa a lištu skryje (správne), ale platí bod 8 (vrch pod hlavičkou).

### Čo je v poriadku (netreba riešiť)
Výkon (viď (c)); žiadne chyby v konzole; žiadne porušenia CSP; klik na linku otvorí novú kartu a adresa
ostane; Späť/Vpred menia adresu aj stĺpce správne; priamy príchod na `/hokej/kluby/severna-amerika/`
so zapamätanými stĺpcami vykreslí 4 stĺpce správne; zmenšenie okna pod 700 px prepne do dlaždíc a späť.

---

## (c) Namerané čísla (Chromium, 1280×800, lokálny build s 14 847 linkami)

| Meranie | Hodnota |
|---|---|
| `renderColumns` — čas jedného prekreslenia | 18–36 ms (prvé 85 ms); pri 5 stĺpcoch 36,7 kB HTML, 89 položiek, 84 obrázkov |
| Pomalý pohyb po 12 krajinách (150 ms/položka) | 12 prekreslení celého `<main>`, priemer 20 ms, max 29 ms, spolu 240 ms z 2 009 ms (12 % času) |
| Rýchly pohyb hore-dole po stĺpci 2 s (184 pohybov) | len 2 prekreslenia (0,12 s oneskorenie to dobre tlmí) |
| Dlhé úlohy (> 50 ms) počas 36 prechodov | 0 |
| Snímky/s počas automatického rolovania | 61 fps |
| Rýchlosť automatického rolovania | 243 px/s (4 px/snímku), zóna 60 px hore / 36 px dole |
| `mousemove` za sekundu / čítania rozloženia (`getBoundingClientRect`) | 58 / 10 — v poriadku |
| Pamäť JS po 80 prekresleniach | 21,7 → 21,7 MB (bez úniku) |
| Automatický posun stránky po prvom otvorení z domova | 219 px (1280×800), 233 px po kliknutí |
| Reťazová reakcia po jednom pohybe na „Anglicko“ | League One +155 ms, Barnsley +300 ms (bez pohybu myši) |
| Šírka obsahu pri 4 stĺpcoch + panel | 1 192 px → 1024 px okno roluje o 208 px; 1280 px pri 6 úrovniach 1 276–1 308 px → roluje o 36 px |
| Chyby v konzole / porušenia CSP | 0 / 0 (okrem zablokovaných externých reklám v cloude) |

Záver: sekanie ani pomalosť nie sú problém. Problémy sú v logike, nie vo výkone.

---

## Porovnanie s dobre spravenými stĺpcovými prehliadačmi

**macOS Finder (stĺpcové zobrazenie):**
* Priečinok sa otvára **kliknutím** (alebo šípkou →), nie prechodom myši. Hover nič nemení. Preto tam
  „spadnutie“ neexistuje.
* Stĺpce sa **nezbaľujú do pásikov** — pri hĺbke sa celý pás stĺpcov posunie vodorovne (posuvník dole),
  staršie stĺpce ostávajú plnohodnotné a dajú sa doň vrátiť.
* Každý stĺpec si **drží svoj posun**; otvorenie ďalšieho stĺpca nikdy neovplyvní už otvorené.
* Panel s náhľadom je posledný stĺpec a vždy ukazuje **označenú** položku (nie hovernutú).
* Šírka stĺpca sa dá ťahať; dlhé názvy sa orežú, ale celé sú v náhľade / tooltipe.
* Klávesnica: ↑↓ v stĺpci, → otvorí, ← späť.

**Mega-menu s „menu aim“ (Amazon, jQuery-menu-aim):**
* Hover otvára podmenu, ale: (1) oneskorenie ~150–300 ms, (2) ak sa kurzor hýbe **smerom k otvorenému
  podmenu** (do trojuholníka kurzor ↔ rohy podmenu), susedné položky sa ignorujú, (3) podmenu sa otvára
  **vedľa**, bez posunu toho, čo už je otvorené, (4) opustenie menu ruší časovač.
* Nikdy nehýbu obsahom pod kurzorom ani nevyvolávajú umelé udalosti.

**Čo si z toho vziať:**
1. Hover len **pridáva** stĺpec vpravo; nikdy neposúva ani neprekresľuje to, čo je vľavo.
2. Prechod bez pohybu myši (zmena rozloženia, rolovanie) sa ignoruje — jediný zdroj pravdy je skutočný
   pohyb myši a jej zastavenie nad položkou.
3. Menu aim alebo „zastavenie“ ako podmienka otvorenia.
4. Pásiky nahradiť vodorovným posunom (alebo ich zbaľovať až pri kliknutí), počet stĺpcov podľa šírky.
5. Stĺpce si držia posun; žiadne automatické rolovanie pri okraji.
6. Stránku neposúvať pod kurzorom; stĺpce radšej prilepiť pod hlavičku (`sticky`) a výšku dať podľa okna.
7. Klávesnica: šípky; čítačka: `tree`/`treeitem`, `aria-live` panel.

---

## (d) Odporúčaný smer: prepísať stĺpce nanovo (čistejšie)

**Prečo nie po kúskoch:** body 1, 2, 4, 6, 7 sú dôsledky jedného návrhu („prekresli všetko a reaguj na každý
prechod“). Záplata na každý z nich pridá ďalší časovač alebo ďalšiu výnimku k trom existujúcim — presne to,
čo kód už teraz robí (`_colsQuietUntil`, umelý hover, blokovanie počas rolovania) a prečo je krehký.
Pri prepise ostáva vzhľad (CSS) takmer rovnaký; mení sa len logika (~190 riadkov JS v bloku stĺpcov +
pár riadkov v `renderLevel`/`navigate`).

**Jadro nového návrhu (stručne):**
* Stav: `colPath` (ako dnes) + `colScroll[lv]` (posun každého stĺpca).
* Vykreslenie po úrovniach: existujúci stĺpec rovnakej úrovne s rovnakým rodičom sa **nedotkne**, len sa
  prepne trieda `open`; mení sa len úroveň ≥ zmenená. Panel a promo sú samostatné prvky.
* Jediný vstup pre hover: `mousemove` nad položkou → ak sa myš pohla ≥ 3 px od posledného otvorenia
  a **zastavila sa** nad položkou (alebo menu-aim trojuholník), po 150–200 ms otvor. `mouseleave` ruší časovač.
  Žiadne umelé udalosti, žiadne „ticho“ po posune stránky.
* Zbaľovanie: buď zrušiť (vodorovný posun ako Finder) alebo len pri kliknutí/pripnutí; počet stĺpcov zo šírky.
* Auto-rolovanie zrušiť; `overscroll-behavior: contain`.
* Po kliknutí posunúť stránku tak, aby stĺpce boli pod hlavičkou (bez umelého hoveru).
* Klávesnica + aria (môže byť 2. krok).

**Odhad rozsahu:** jedno zadanie (26b) — cca 250–350 riadkov JS nahradených, ~20 riadkov CSS; EN repozitár
rovnaká zmena samostatným zadaním (26c). Testy z `navrhy/stlpce-testy/` sa dajú po oprave spustiť znova
(t1, t2, t3 = tvoje dva problémy + navigácia; očakávané výsledky sú v tejto správe).

**Ak by si predsa chcel najprv rýchlu záplatu** (odhad ~40 riadkov, ale ostanú body 3, 9, 10, 11):
(1) zrušiť umelý `mouseover` v `colsIntoView`; (2) v `mouseover` otvárať len ak sa `_mx/_my` zmenili od
posledného otvorenia aspoň o 3 px; (3) `clearTimeout` pri `mouseout`; (4) pred `main.innerHTML` uložiť
`scrollTop` stĺpcov a po ňom vrátiť; (5) `overscroll-behavior: contain`. Tým zmizne väčšina „spadnutí“
a skok stĺpca hore, ale šikmý pohyb a pásiky ostanú nepríjemné.

---

## (e) Otázky na teba (treba tvoje rozhodnutie)

1. **Pásiky (zbalené stĺpce):** nechať (zbaľovať len pri kliknutí) alebo zrušiť a nechať stĺpce rolovať
   vodorovne ako vo Finderi? *(Moje odporúčanie: zrušiť — menej skokov, stĺpcov podľa šírky okna.)*
2. **Otváranie myšou vs. kliknutím:** nechať hover (s menu-aim a zastavením) alebo prejsť na Finder
   (klik/šípka otvára, hover len mení popis v paneli)? *(Odporúčanie: hover nechať, ak ti ide o rýchlosť;
   Finder-štýl je bezpečnejší a jednoduchší na naprogramovanie.)*
3. **Automatický posun stránky pod hlavičku** (bannery a Aktuálne odídu hore): nechať, alebo stĺpce
   radšej prilepiť pod hlavičku a výšku dať podľa okna (nič sa neposúva)? *(Odporúčanie: sticky, žiadny posun.)*
4. **Automatické rolovanie pri okraji stĺpca:** zrušiť (koliesko stačí) alebo nechať v miernej podobe?
   *(Odporúčanie: zrušiť.)*
5. **Oneskorenie otvorenia:** 120 ms dnes; navrhujem 150–200 ms + podmienka zastavenia myši. Súhlasíš?
6. **Šírka stĺpcov na veľkých monitoroch** (1920 px): nechať 220 px a 4 stĺpce, alebo 5–6 stĺpcov / širšie
   stĺpce (dlhé názvy by sa neorezávali)?
7. **Panel s popisom:** vždy vpravo (aj prázdny s „Prejdi myšou…“), alebo len keď je čo ukázať?
8. **Klávesnica a čítačka (bod 11):** riešiť v rámci prepisu, alebo samostatne neskôr?
9. **Dotykové notebooky (bod 12):** potrebuješ, aby sa popis linky dal pozrieť dotykom, alebo stačí tap = otvoriť web?
10. Je priečinok s najviac 64 položkami naozaj maximum, alebo plánuješ väčšie (stovky)? Pri stovkách by som
    odporučil v stĺpci jednoduché filtrovanie písaním.

---

## Zoznam snímok (`navrhy/stlpce-snimky/`)

* `p1-00…p1-03`, `p1-seq-1/2/5`, `video-p1-futbal-stojaca-mys.webm` — problém 1a (myš stojí na Futbale,
  otvorí sa Ostatné športy)
* `p1-04` — šikmý pohyb Európa → Nemecko skončí v Južnej Amerike (menu aim)
* `p1-05`, `p1-06` — zbalenie do pásikov, posun stĺpcov pod myšou, 5. úroveň
* `p2-01…p2-03`, `p2-seq-1`, `video-p2-rolovanie-a-skok-hore.webm` — problém 2 (zrolované dole → skok hore)
* `rozl-*` — 1024/1280/1440/1920 × 800/1080 v 5. úrovni; `rozl-1024x800-hlbka3-prvy-stlpec-odrezany`
* `nav-01…nav-08`, `nav-10` — klik, Späť, Vpred, panel, Dlaždice ↔ Stĺpce, reload, priamy príchod,
  hľadanie, vrch stĺpcov pod hlavičkou
* `ux-01` dlhé názvy · `ux-02` dotyk · `ux-03` promo nad stĺpcami (Tipovanie) · `ux-04` Aktuálne v stĺpcoch

## Ako som testoval
Playwright (Node) + Chromium, `_site/` z `generator.py` (data.json z repozitára, nemenený), externé
reklamné domény zablokované (v cloude nie sú dostupné). Skripty: `navrhy/stlpce-testy/lib.js` (pomocné
funkcie), `t1.js` (tvoje problémy), `t2.js` (auto-rolovanie, menu aim, pásiky), `t3.js` (navigácia),
`t4.js`+`t7.js` (výkon, rozlíšenie 1024, 1920×1080), `t5.js` (rozlíšenia), `t6.js`+`t8.js`+`t9.js`+`t10.js`
(aria, klávesnica, dotyk, CSP, promo, dlhé názvy, Aktuálne, koliesko), `vid.js` (videá).
