# Zadanie 47a — kontrola mobilnej verzie webu (len správa)

Dátum: 7. 11. 2026 · Repozitár: sport-linky · Nič sa neopravovalo. `index.html`, `generator.py`, `data.json` ani `aktualne.json` sa nemenili.

---

## Zhrnutie pre začiatočníka

**Čo je v poriadku (a je toho veľa):**

- **Nikde nič nepreteká do strany.** Na 10 nastaveniach mobilov × 10 stránkach (SK aj EN) sa stránka ani raz nedala posunúť do boku.
- **Tlačidlo/gesto SPÄŤ funguje na všetkých zariadeniach** (Android aj iPhone). Cesta domov → futbal → kluby → Európa → Taliansko → liga sa 5× Späť vráti krok po kroku a vráti aj miesto, kde ste boli posunutí (napr. 2 932 px dole v zozname Európy). Späť na domove web normálne opustí, nič „nevisí“. Pri príchode z Googlu na hlbokú stránku Späť vráti človeka rovno do Googlu.
- **Priblíženie prstom je povolené.** Dvojité ťuknutie nerobí nič nechcené.
- **Hľadanie** („slovan“ 29 výsledkov, „brondby“ nájde Brøndby, nezmysel ukáže „nič sa nenašlo“), **obľúbené** (pridať ★, panel, stránka obľúbených, vymazať s otázkou) aj **okno admina** (otvorí sa, zmestí sa, dá sa zavrieť) fungujú všade.
- **V konzole nie sú žiadne chyby ani CSP chyby.** Reklama Tipsport bola v teste zablokovaná, takže nevzniklo žiadne falošné zobrazenie.
- **Prvý obsah je na obrazovke rýchlo**, aj na pomalom Androide do 1 sekundy.

**Čo nie je v poriadku:**

- 🔴 **Nič rozbité som nenašiel.** Všetky funkcie sa dajú použiť.
- 🟠 **7 vecí vadí:**
  1. Na pomalom Androide prídu úplné dáta až za 10–14 s. Dovtedy hľadanie a ťuk hlbšie ukazujú len „⏳ Načítavam…“.
  2. iPhone (Safari) sťahuje súbor appky dvakrát.
  3. Pri veľkom systémovom písme na Androide hlavička zaberá skoro tretinu obrazovky a lupa vytŕča za okraj.
  4. Na šírku sa hlavička nezbalí.
  5. Na iPhone na šírku sa stránka pri ťuknutí do hľadania sama priblíži.
  6. V tmavom režime prehliadača je EN banner nečitateľný.
  7. Viaceré dotykové plochy sú malé: ★ na karte, FB/IG, drobčeky, „+1 ›“.
- 🟢 **7 drobností** a 💡 **4 nápady**, viď nižšie.

---

## Ako som testoval

| # | Zariadenie | Ako |
|---|---|---|
| 1 | Android malý 360×800, DPR 3 | Chromium 153, mobilný UA (Samsung Galaxy), is_mobile + has_touch |
| 2 | Android veľký 412×915, DPR 2,625 | Chromium, UA Pixel 8 |
| 3 | Android malý + **veľké písmo** | **Hlavný variant:** nový Chrome na Androide prenáša systémovú veľkosť písma do priblíženia stránky (page zoom). Pri 130 % stránka „vidí“ displej široký 360 / 1,3 = **277 px** (výška 615 px, DPR 3,9). **Variant B (3b):** 360×800 a koreňové písmo `html{font-size:130%}`, tak ako zväčšenie textu v Samsung Internet. |
| 4 | Android malý na šírku 800×360 | Chromium |
| 5 | iPhone SE 375×667, DPR 2 | **WebKit 26.6** (jadro Safari). Stiahol sa po povolení adresy cdn.playwright.dev. |
| 6 | iPhone 15/16 393×852, DPR 3 | WebKit. Doplnkovo aj **na šírku 852×393**. |
| 7 | iPhone Pro Max 430×932, DPR 3 | WebKit |
| 8 | Android pomalý | Chromium cez CDP: procesor 4× pomalší, sieť „Slow 4G“ (1,6 Mb/s, odozva 562 ms, rovnako ako v DevTools) |
| 9 | Android tmavý režim prehliadača | Chromium `--enable-features=WebContentsForceDark` + `Emulation.setAutoDarkModeOverride` (rovnaké „auto dark“ ako Chrome / Samsung Internet) |

- **Web:** skúšobný SK aj EN build z `generator.py` a `data.json` zo sport-linky. Vznikol v dočasnom priečinku mimo repozitára, po teste bol zmazaný.
- **Server:** malý lokálny server posielal súbory skomprimované (gzip) ako GitHub Pages, takže veľkosti sťahovania sú reálne.
- **Blokovanie:** Tipsport aj GoatCounter boli zablokované.
- **Stránky:** domov, šport, krajina, liga s dlhými názvami (MOL liga ženy), Bangladéš (liga) a navyše:
  - najdlhší zoznam: hokej NCDC, 64 liniek,
  - najdlhšie názvy: FIBA kvalifikácie v basketbalových súťažiach Európy.
  
  K tomu Správy & Médiá, Aktuálne, Tipovanie (len SK), hľadanie, obľúbené, zbalenie hlavičky, Späť, `/#admin`.

**Obmedzenia testu (úprimne):**

- Ide o simuláciu v prehliadačoch na serveri, nie o skutočné telefóny.
- WebKit na Linuxe je jadro Safari, nie celý Safari z iPhonu. Výrez (notch) a klávesnicu sa dá posúdiť len odhadom.
- Samsung Internet som nemal k dispozícii.
- Obsah reklám Tipsportu sa nenačítal (blokovaný), preto som ho nehodnotil.
- EN web si Aktuálne berie zo sportlinky.sk, čo bolo v teste zablokované. Aktuálne na EN sa preto zobrazili z údajov vložených v stránke.

---

## Nálezy

### 🔴 Rozbité

Nenašiel som nič, čo by na mobile nefungovalo.

### 🟠 Vadí

**🟠1 — Pomalý Android: úplné dáta prídu až po 10–14 sekundách**
- **Zariadenie:** 8 (pomalý Android). V menšej miere každý mobil na slabom signáli.
- **Stránky:** všetky. Hľadanie a ťuk do hlbšieho priečinka pred dočítaním.
- **Snímky:** [18-pomaly-hladanie-nacitavam.png](mobil-kontrola/18-pomaly-hladanie-nacitavam.png), [19-pomaly-z-googlu-tuk-nacitavam.png](mobil-kontrola/19-pomaly-z-googlu-tuk-nacitavam.png)
- **Čo je zle:** Prvý obsah je vidieť rýchlo (≈ 0,7–0,9 s). Úplné dáta (`data.json`, 1,16 MB po skomprimovaní, 5,4 MB rozbalené) sa však na pomalom mobile sťahujú ≈ 9,5 s na domove a až 14 s na stránke s mnohými ikonkami. Kto medzitým začne hľadať alebo ťukne na krajinu, ktorá nie je v balíčku stránky, vidí len „⏳ Načítavam…“ a nevie, ako dlho to potrvá. Ťuk na sekciu priamo zo stránky (napr. Futbal) funguje hneď, lebo údaje sú v balíčku stránky.
- **Prečo:** 40 % objemu dát tvoria popisy liniek (2 MB z 5,4 MB). Ďalšiu časť tvoria odkazy a FB/IG adresy.
- **Návrh opravy:**
  - (a) **malá:** pri „Načítavam…“ po 2 s doplniť vetu, napr. „Načítavam celý zoznam (1,2 MB), na pomalom pripojení to trvá do 10 s“.
  - (b) **stredná až veľká:** popisy dávať do samostatného súboru, ktorý sa stiahne až po stromoch. Dáta potrebné na kreslenie a hľadanie podľa názvu by tak klesli zhruba na ~0,7 MB. Hľadanie v popisoch by fungovalo o pár sekúnd neskôr.
  - (c) **veľká:** dáta po športoch.
  - Odporúčam začať (a), (b) zvážiť samostatne.

**🟠2 — iPhone (Safari) sťahuje súbor appky `index.html` dvakrát**
- **Zariadenia:** 5, 6, 7 (WebKit). Na Androide nie.
- **Stránka:** každá stránka otvorená priamo (z Googlu, zo záložky).
- **Čo je zle:**
  - Statická stránka si `index.html` (appku) vopred stiahne cez `<link rel="preload" … as="fetch" crossorigin>`.
  - Safari si toto stiahnutie nespáruje s neskorším `fetch("../index.html")`, takže súbor (114 KB po skomprimovaní) stiahne ešte raz.
  - V konzole Safari je preto pri každej takej stránke varovanie „preloaded … but not used“. Overené: Chromium 1 stiahnutie, WebKit 2.
  - iOS má 55 % návštev, takže na pomalšom signáli to spomaľuje prevzatie stránky appkou.
- **Návrh opravy:** v `generator.py` (riadok s preload) vyskúšať varianty, ktoré Safari spáruje, a overiť vo WebKite, že sa stiahne len raz. Ak to nepôjde, preload vynechať (Chrome by prišiel o malé zrýchlenie).
- **Veľkosť:** malá (1 riadok + test). Týka sa **oboch webov** (generator.py je v oboch repozitároch rovnaký).

**🟠3 — Veľké systémové písmo (Android): hlavička zaberá skoro tretinu obrazovky, lupa vytŕča za okraj**
- **Zariadenie:** 3 (zoom 130 %, stránka široká 277 px). Variant 3b je v poriadku.
- **Stránky:** všetky.
- **Snímka:** [03-velke-pismo-zoom130.png](mobil-kontrola/03-velke-pismo-zoom130.png) (domov / liga / zbalená hlavička)
- **Čo je zle:**
  - Hlavička sa zalomí do 3 riadkov: logo, potom samotné tlačidlo „☆ 0“, potom hľadanie. Vysoká je 174 px z 615 px (28 %).
  - Text v hľadaní je orezaný („Hľadaj kdekoľvek v str“).
  - Po zbalení hlavičky lupa 🔍 čiastočne vytŕča za pravý okraj. Dá sa na ňu ťuknúť len v pruhu širokom 26 px.
  - Na domove je jedna dlaždica na riadok. To je v poriadku a nemením tým tvoje rozhodnutie č. 3.
- **Návrh opravy:**
  - CSS pre veľmi úzke displeje (napr. `@media (max-width:330px)`): „☆ 0“ dať vedľa loga, logo o kúsok menšie, kratší text v políčku hľadania.
  - V zbalenej hlavičke zmenšiť logo, aby sa lupa zmestila.
- **Veľkosť:** malá až stredná (len CSS, oba weby).

**🟠4 — Na šírku sa hlavička nikdy nezbalí (zaberá štvrtinu výšky)**
- **Zariadenia:** 4 (Android 800×360), iPhone 15 na šírku (852×393).
- **Stránky:** všetky dlhšie.
- **Snímky:** [05-android-na-sirku.png](mobil-kontrola/05-android-na-sirku.png), [10-iphone-15-na-sirku.png](mobil-kontrola/10-iphone-15-na-sirku.png)
- **Čo je zle:** Zbaľovanie hlavičky (Zadanie 34) sa zapína len pri šírke do 560 px. Na šírku je mobil široký 800+ px, takže hlavička ostane plná: 97 px z 360 px (27 %). Na obsah ostáva ~260 px, teda asi 1,5 riadka kariet. Inak sa na šírku nič nerozbije (karty sú v 3 stĺpcoch, nič nepreteká).
- **Návrh opravy:** zbaľovať aj vtedy, keď je okno nízke, napr. `(max-width:560px), (max-height:500px) and (hover:none)`. Ide o úpravu v `hdrMobil()` a v rovnakej podmienke v CSS.
- **Veľkosť:** malá (oba weby).

**🟠5 — iPhone na šírku: ťuk do hľadania stránku priblíži**
- **Zariadenie:** iPhone 15 na šírku (WebKit 852×393). Týka sa aj Androidu na šírku, tam však bez priblíženia.
- **Stránky:** všetky (políčko hľadania v hlavičke).
- **Snímka:** [10-iphone-15-na-sirku.png](mobil-kontrola/10-iphone-15-na-sirku.png)
- **Čo je zle:** Safari stránku samo priblíži, keď ťuknete do políčka s písmom menším ako 16 px. Pravidlo „hľadanie má 16 px“ (previerka 22.10., bod 9) platí len do šírky 560 px. Na šírku má políčko 14 px, takže iPhone stránku po ťuknutí priblíži a človek ju musí späť oddialiť. Rovnako je na tom hľadanie v obľúbených (`.fv-srch`).
- **Návrh opravy:** doplniť `@media(hover:none){.h-search input,.fv-srch{font-size:16px}}`.
- **Veľkosť:** 1 riadok CSS (oba weby).

**🟠6 — Tmavý režim prehliadača: EN banner je nečitateľný**
- **Zariadenie:** 9 (auto dark, ako Samsung Internet v tmavom režime / Chrome „auto dark“).
- **Stránky:** EN stránky, kde sa zobrazuje vlastný banner (napr. „Every official club & league site“).
- **Snímka:** [06-tmavy-rezim-en-banner.png](mobil-kontrola/06-tmavy-rezim-en-banner.png). Vľavo normálne, v strede tmavý režim, vpravo tmavý režim + skúšobná značka `meta color-scheme`.
- **Čo je zle:**
  - Banner je obrázok SVG so svetlým pozadím a tmavým textom. Prehliadač ho v tmavom režime stmaví, text ostane tmavý a takmer zmizne.
  - Skúsil som aj značku `<meta name="color-scheme" content="dark">` a **nepomohla**.
  - Na SK webe sa okrem jemne svetlejších okrajov nič nečitateľné nestalo. Web je tmavý, takže ho prehliadač skoro nemení.
- **Návrh opravy:** EN bannery (sú v dátach, upravujú sa v admine) prekresliť na tmavé pozadie so svetlým textom. Tmavý banner prehliadač nemení. Nie je to zmena kódu, len obsahu bannera. Návrh SVG môžem pripraviť do `navrhy/`.
- **Veľkosť:** malá.

**🟠7 — Malé dotykové plochy (★ na karte, FB/IG, drobčeky, „+1 ›“)**
- **Zariadenia:** všetky.
- **Stránky:** liga, krajina, dlhé zoznamy, každá stránka s Aktuálne.
- **Snímky:** [02-android-maly-liga.png](mobil-kontrola/02-android-maly-liga.png), [08-iphone-15-liga.png](mobil-kontrola/08-iphone-15-liga.png)
- **Čo je zle:**
  - **★ na karte** má plochu 44×28 px a priamo nad ňou (medzera 0–1 px) začína hlavná linka. Kto netrafí hviezdičku, otvorí web klubu v novej karte. To je otravné, najmä keď si chce pridať niekoľko obľúbených.
  - **FB/IG** majú aj so zväčšenou neviditeľnou plochou len ~30×26 px.
  - **Drobčeky** (Domov › Hádzaná › …) sú vysoké 16 px s medzerou 6 px.
  - **„+1 ›“** pri Aktuálnych má 36×19 px a dotýka sa karty vedľa.
  - Celý zoznam je v tabuľke nižšie.
- **Návrh opravy:**
  - drobčeky: väčší vnútorný okraj, aby mal každý aspoň 32–44 px výšky,
  - „+1 ›“: väčšie tlačidlo (44×32),
  - ★: zvýšiť na 44×36 a odsadiť od linky o 4–6 px (karta s ★ má na mobile aj tak výšku 82 px),
  - FB/IG: plocha 36×36 tam, kde to výška karty dovolí.
- **Veľkosť:** malá až stredná (CSS, oba weby).

### 🟢 Drobnosti

**🟢1 — Späť pri otvorenom paneli obľúbených neodíde len z panela, ale o stránku späť**
- **Zariadenia:** všetky. Na Androide sa to prejaví najviac.
- **Snímka:** [13-oblubene-panel.png](mobil-kontrola/13-oblubene-panel.png)
- **Čo je zle:** Na Androide ľudia čakajú, že Späť najprv zavrie otvorené okienko. Teraz sa panel zavrie, ale zároveň sa vráti predchádzajúca stránka. Nič sa nerozbije. Stránka obľúbených (`?oblubene`) už Späť správne rieši.
- **Návrh:** pri otvorení panela pridať záznam do histórie a Späť ho iba zavrie.
- **Veľkosť:** malá až stredná (JS, treba otestovať Späť).

**🟢2 — Písmo menšie ako 12 px**
- **Zariadenia:** všetky. Na veľkom písme 3b je to väčšie.
- **Snímky:** [20-tipovanie.png](mobil-kontrola/20-tipovanie.png), [02-android-maly-liga.png](mobil-kontrola/02-android-maly-liga.png)
- **Čo je malé:**
  - štítok LIGA/SCORES/LEAGUE 8,8 px,
  - „overených liniek“ 10,4 px,
  - „+1 ›“ 10,9 px,
  - „REKLAMA · TIPSPORT“ 10,4 px,
  - **upozornenie o riziku hazardných hier 11,2 px.** Pri zákonnom upozornení odporúčam aspoň 12–13 px, aby bolo nespochybniteľne čitateľné.
- **Návrh:** zväčšiť na ≥ 12 px (štítok LIGA môže ostať menší, je to len značka).
- **Veľkosť:** malá (CSS).

**🟢3 — Kontrast počítadla**
- **Čo je zle:** Červené číslo „14 847“ (a „LINKY“ v logu) má kontrast 4,47 : 1. Hranica je 4,5 : 1, takže je to tesne pod ňou.
- **Návrh:** o odtieň svetlejšia červená.
- **Veľkosť:** 1 farba.

**🟢4 — Pri písme 130 % (3b) štítok LIGA/LEAGUE/SCORES prekrýva koniec názvu prvej linky**
- **Snímka:** [04-velke-pismo-html130.png](mobil-kontrola/04-velke-pismo-html130.png) (napr. „Bangladesh Football League (BFL)“).
- **Návrh:** karte so štítkom dať vpravo hore miesto (padding-right).
- **Veľkosť:** malá (CSS).

**🟢5 — Okno admina: malé tlačidlá; na šírku klávesnica pravdepodobne prekryje heslo**
- **Snímky:** [16-admin-heslo-android.png](mobil-kontrola/16-admin-heslo-android.png), [17-admin-heslo-iphone-se.png](mobil-kontrola/17-admin-heslo-iphone-se.png)
- **Čo je dobré:** Okno sa zmestí na všetkých zariadeniach, heslo má 16 px (iPhone nepriblíži) a krížik okno zavrie.
- **Čo je zle:**
  - Krížik má 34×29 px a „Prihlásiť“ je vysoké len 29 px.
  - Na šírku (výška 360 px) je spodok políčka hesla na 215 px. Klávesnica zaberá ~55–60 % výšky, takže políčko bude pravdepodobne pod ňou. Odhad, nie meranie.
  - Na výšku je všetko v poriadku.
- **Návrh:** tlačidlá 44 px; okno na nízkej obrazovke posunúť hore (`align-items:flex-start`).
- **Veľkosť:** malá.

**🟢6 — EN banner má na mobile drobný text**
- **Snímka:** [21-en-domov-android.png](mobil-kontrola/21-en-domov-android.png)
- **Čo je zle:** Druhý riadok bannera („14,847 verified links · straight to the source“) má po zmenšení SVG na 360 px šírku ≈ 9 px.
- **Návrh:** riešiť spolu s 🟠6 (väčší druhý riadok).

**🟢7 — Panel obľúbených: krížik 36×36 px, ★ v riadkoch 40×40 px s medzerou 2 px**
- **Snímka:** [13-oblubene-panel.png](mobil-kontrola/13-oblubene-panel.png)
- **Návrh:** krížik 44×44 px.
- **Veľkosť:** malá.

### 💡 Nápady

- **💡1 — Celý popis linky na dotyk.** Na mobile je popis orezaný na 2 riadky s „…“. Zámer je správny, karty ostanú rovnako vysoké. Celý text je však len v `title`, ktorý sa na dotykovom displeji nedá zobraziť. Okienko „popis linky“ zo zadania na webe neexistuje. Nápad: dlhé podržanie alebo malé „ⓘ“ zobrazí celý popis. Je to nová funkcia, stredná zmena.
- **💡2 — Ikonky na dlhých zoznamoch nesťahovať naraz s dátami.** Na NCDC (64 liniek) sa súčasne s `data.json` sťahuje 32 ikoniek. Dáta potom prídu o ~3,5 s neskôr ako na krajine. Nápad: ikonky mimo obrazovky načítať až po dátach (`loading="lazy"` alebo až po prevzatí).
- **💡3 — Mobilný test do Hĺbkového testu**, viď posledná časť.
- **💡4 — Na skutočnom Androide raz ručne overiť Samsung Internet v tmavom režime.** Napríklad kamarátovým telefónom stačí otvoriť EN stránku ligy. Ostatné výsledky simulácie považujem za spoľahlivé.

---

## Tabuľka výkonu (zariadenie 8: CPU 4× pomalší + Slow 4G)

- Dve merania na každú stránku (rozsah) plus pre porovnanie jedno meranie bez spomalenia.
- Prázdna vyrovnávacia pamäť, ako pri prvej návšteve.
- Čas „prevzatie“ znamená, kedy appka nahradí statickú stránku. „Úplné dáta“ znamená, kedy je načítaný celý `data.json`. „Reakcia na ťuk“ je čas od ťuknutia na priečinok po zmenu stránky (po načítaní dát).

| Stránka | Prvý obsah (FCP) | Najväčší obsah (LCP) | Prevzatie appkou | Úplné dáta | Reakcia na ťuk | Dlhé úlohy (spolu / najdlhšia) | Stiahnuté |
|---|---|---|---|---|---|---|---|
| SK domov | 0,9 s | 0,9 s | 0,7–1,0 s | **9,7 s** | 0,3–0,4 s | 0,8–1,0 s / 0,5–0,6 s | 1,27 MB |
| SK krajina z Googlu | 0,75–0,8 s | 0,8 s | 2,3–2,4 s | **10,5 s** | 0,3–0,4 s | 1,0–1,2 s / 0,5 s | 1,29 MB |
| SK NCDC (64 liniek) z Googlu | 0,7–0,8 s | 0,7–0,8 s | 2,6–2,9 s | **13,8 s** | – (len linky) | 1,9–2,0 s / 0,6–0,7 s | 1,35 MB |
| EN domov | 0,7–0,8 s | 0,7–0,8 s | 0,7–0,9 s | **9,4 s** | 0,15–0,2 s | 0,6–0,7 s / 0,4 s | 1,28 MB |
| EN krajina z Googlu | 0,65 s | 0,65 s | 2,2–2,3 s | **10,3 s** | 0,2–0,3 s | 0,8–0,9 s / 0,4 s | 1,29 MB |
| *bez spomalenia (SK domov / krajina)* | *0,16 / 0,04 s* | *0,16 s* | *0,15–0,18 s* | *0,65 s* | *0,1 s* | *0,2 s / 0,1 s* | – |

**Z čoho sa skladá stiahnutých ~1,3 MB (po skomprimovaní):**

| Súbor | Veľkosť |
|---|---|
| `data.json` | 1 162 KB (≈ 90 %) |
| appka `index.html` | 112 KB (na iPhone 2× = 224 KB, viď 🟠2) |
| statická stránka | 8–14 KB |
| vlajky | ~5 KB |
| ikonky | 0–60 KB podľa stránky |
| `aktualne.json` + `version.txt` | ~1 KB |

**Čo z toho vyplýva:**

- Kostra stránky aj appka sú rýchle.
- Takmer celý čas čakania ide na `data.json`.
- Dlhé úlohy sú do 0,75 s. Najdlhšia nastane pri spracovaní dát po ich príchode. Je to krátke zamrznutie, nič vážne.
- Pozn.: v prvom meraní mal EN domov jednu 17 s úlohu. Opakované meranie a profil ju nepotvrdili (EN domov má 0,6 s bez spomalenia), takže ju považujem za chybu merania (súbežne bežal iný proces).

---

## Tabuľka dotykových plôch pod 44 px

Plocha je zmeraná „ťukaním“ do bodov okolo prvku, takže započítava aj neviditeľné zväčšenie (napr. FB/IG `::before`). Uvedená je najmenšia nameraná hodnota cez všetky zariadenia.

| Prvok | Kde | Plocha (š × v) | Medzera k susedovi | Zariadenia |
|---|---|---|---|---|
| „+1 ›“ (ďalšie Aktuálne) | pás Aktuálne, každá stránka | **36 × 19** | **0 px** (karta Aktuálne) | 1, 2, 3, 3b, 5, 6, 7, 9 |
| Drobčeky (Domov › Šport › …) | každá podstránka | ~48–126 × **16** | 6 px | všetky |
| FB / IG ikonka na karte | karty klubov | **30 × 26** | 7 px | všetky |
| ★ na karte (pridať do obľúbených) | karty liniek | 44 × **27–28** | **0–1 px** (hlavná linka) | všetky |
| „AKTUÁLNE ›“ / „LIVE THIS WEEK ›“ | nadpis pásu | 102 × 16 | 9–13 px | všetky |
| Pätička: „Aktuálne – live výsledky“, logo | pätička | 90–122 × 16–18 | 61 px | všetky |
| Lupa 🔍 (zbalená hlavička) | hlavička po posune | **26 × 44** (vytŕča za okraj) | 14 px | **3** (veľké písmo) |
| Krížik okna admina | `/#admin` | 34 × 29 | 83 px | všetky |
| „Prihlásiť“ | `/#admin` | široké × 29 | 10 px | všetky |
| „↑ Vyššie“ | drobčeky | 63 × 30 | 6 px | všetky |
| Karta Aktuálne (ATP scores…) | pás Aktuálne | 140 × 31–38 | 0 px („+1 ›“) | všetky |
| Krížik panela obľúbených | panel ★ | 36 × 36 | 8 px | všetky |
| ★ v paneli obľúbených | panel ★ | 40 × 40 | 2 px | všetky |
| „☆ 0“ / „★ 2“ v hlavičke | hlavička | 56 × 36 | 9–12 px | všetky |
| „✕ Zavrieť“ na stránke obľúbených | `?oblubene` | 79 × 38 | 10 px | všetky |
| „Áno, vymazať“ / „Nie“ | `?oblubene` | 99 × 40 / 48 × 40 | 10 px | 4 (na šírku) |
| Políčko hľadania | hlavička | široké × 40–42 | 15 px | všetky (prijateľné) |

V poriadku (≥ 44 px): karty priečinkov a dlaždice domova, hlavná linka na karte, lupa v zbalenej hlavičke (okrem zariadenia 3), riadky v paneli obľúbených.

---

## Kontrola po bodoch zadania (stručne)

| Bod | Výsledok |
|---|---|
| a) pretečenie, orezané a prekrývajúce sa texty | Pretečenie do strany: **0** prípadov. Popisy kariet sú zámerne orezané na 2 riadky s „…“. Prekrytie len štítkom LIGA pri písme 130 % (🟢4). Dlhé názvy (FIBA…, NCDC, Bangladéš) sa zalamujú správne ([09](mobil-kontrola/09-iphone-promax-dlhe-nazvy.png), [24](mobil-kontrola/24-dlhe-nazvy-android-maly.png), [22](mobil-kontrola/22-dlhy-zoznam-ncdc-pixel.png)). |
| b) dotykové plochy | Tabuľka vyššie, 🟠7 |
| c) písmo < 12 px, kontrast | 🟢2, 🟢3. Tmavý režim: 🟠6 |
| d) hlavička, notch | Zbalenie 126 → 54 px funguje na všetkých mobiloch na výšku, obsah neposkočí ([23](mobil-kontrola/23-hlavicka-zbalena.png)). Rozbalenie je podľa zámeru (Zadanie 34) až pri návrate navrch alebo ťukom na lupu. Na šírku sa nezbalí (🟠4). Web nepoužíva `viewport-fit=cover`, takže Safari drží obsah mimo výrezu. Na šírku sú po stranách tmavé okraje v farbe webu, čo je v poriadku. Spodný okraj (`safe-area-inset-bottom`) má len lišta na vrátenie zmazanej obľúbenej, čo stačí. |
| e) Späť | ✅ všade: 5 krokov späť s obnovou posunu, Späť z domova opustí web, z Googlu → hlboká stránka → liga → Späť → krajina (posun obnovený) → Späť → Google |
| f) priblíženie, dvojklik | ✅ `width=device-width, initial-scale=1.0`, priblíženie nie je zakázané. Dvojťuk nerobí nič. Pozor len na 🟠5 (iPhone na šírku). |
| g) výkon | Tabuľka výkonu, 🟠1, 🟠2 |
| h) konzola, CSP | ✅ 0 chýb a 0 CSP chýb v Chromiu aj WebKite. Vo WebKite je len varovanie o nevyužitom preloade (🟠2). Tipsport zablokovaný (37–47 pokusov na beh), GoatCounter zablokovaný. |
| i) okná a panely | Heslo, panel obľúbených, stránka obľúbených, otázka „vymazať?“ a hľadanie sa zmestia a dajú sa zavrieť. Hľadanie je navrchu (spodok políčka na 112 px), klávesnica ho neprekryje. Admin na šírku: 🟢5. |
| j) na šírku | Nič sa nerozbije (3 stĺpce kariet, bez pretečenia). Problémy: 🟠4, 🟠5, 🟢5. |

---

## Návrh trvalého testu

Podľa tvojej predvoľby navrhujem mobilnú kontrolu dať do **denného Hĺbkového testu**. Test webu po nasadení ostane rýchly a bez zmeny.

Do `testy/test_hlbkovy.py` by pribudla časť „mobil“:

1. **4 zariadenia:**
   - Android malý 360×800 (Chromium),
   - veľké písmo 277×615 (Chromium),
   - Android na šírku 800×360,
   - iPhone SE 375×667 (**WebKit**, v Actions treba doinštalovať WebKit, odhadom +1–2 min s pamäťou cache).
2. **Stránky:** domov, krajina, liga s ★ a FB/IG, dlhé názvy, Aktuálne.
3. **Kontroly ❌ (zlyhanie):**
   - pretečenie do strany,
   - chyby v konzole a CSP,
   - Späť 3 kroky + obnova posunu + Späť z Googlu,
   - okno admina sa zmestí a zavrie,
   - hľadanie má na dotykových zariadeniach ≥ 16 px (aj na šírku),
   - na WebKite sa `index.html` stiahne len raz (po oprave 🟠2).
4. **Kontroly ⚠️ (len upozornenie):**
   - hlavička vyššia ako 30 % obrazovky,
   - dotykové plochy ★, FB/IG, krížikov, drobčekov a „+N ›“ pod stanovenou hranicou,
   - písmo < 12 px,
   - kontrast < 4,5.
5. **Výkon:** jedno meranie na pomalom Androide (domov + krajina z Googlu). ⚠️, keď úplné dáta prídu neskôr ako 12 s alebo keď `data.json` po skomprimovaní narastie nad 1,4 MB. Tak sa včas uvidí, že dáta rastú.
6. **Tmavý režim:** snímka EN stránky v auto dark do príloh testu (len na pozretie, nie ❌).

Odhad: Hĺbkový test sa predĺži o ~4–6 minút.

---

## Návrh rozdelenia opráv do 47b

Všetky opravy kódu sa týkajú **oboch webov** (`index.html` a `generator.py` sú v sport-linky aj sportlinking rovnaké). Druhý repozitár bude samostatná úloha.

| Časť | Čo | Nálezy | Veľkosť |
|---|---|---|---|
| **47b-1** | Rýchle CSS opravy: hľadanie 16 px na dotykových zariadeniach, písmo ≥ 12 px (vrátane upozornenia o hazarde), kontrast počítadla, miesto pre štítok LIGA, tlačidlá admina 44 px, krížik panela 44 px | 🟠5, 🟢2, 🟢3, 🟢4, 🟢5, 🟢7 | malá |
| **47b-2** | Dotykové plochy: drobčeky, „+1 ›“, ★ na karte (výška + odsadenie od linky), FB/IG | 🟠7 | malá až stredná |
| **47b-3** | Hlavička: veľmi úzke displeje / veľké písmo (≤ 330 px) a zbaľovanie na šírku (nízke okno) | 🟠3, 🟠4 | stredná |
| **47b-4** | Safari: `index.html` len raz (preload v generator.py) + test vo WebKite | 🟠2 | malá |
| **47b-5** | EN bannery v tmavých farbách (obsah v admine; návrh SVG pripravím do `navrhy/`) | 🟠6, 🟢6 | malá |
| **47b-6** | Pomalé pripojenie: veta pri „Načítavam…“ (a); samostatne rozhodnúť o rozdelení popisov (b) | 🟠1, 💡2 | (a) malá, (b) veľká |
| **47b-7** | Späť zatvára panel obľúbených (voliteľné) | 🟢1 | malá až stredná |
| **47b-8** | Mobilná časť Hĺbkového testu | 💡3 | stredná |

Navrhované poradie: 47b-1 → 47b-4 → 47b-2 → 47b-3 → 47b-5 → 47b-8. O 47b-6 (b) a 47b-7 rozhodneš ty.

---

## Snímky

25 snímok je v [mobil-kontrola/](mobil-kontrola/). Sú zmenšené na veľkosť v CSS pixeloch a uložené so 128 farbami, spolu ~0,6 MB. Farby sa preto môžu nepatrne líšiť od originálu.
