# G) Dáta — data.json (v1125, 16 510 uzlov) a aktualne.json

Všetko overené skriptami v `/tmp/claude-0/-home-user/eed11a80-25e6-51b3-88cc-2253d64cd8b2/scratchpad/findings/skripty/` (G-1 štruktúra, G-2 URL, G-3 texty, G-4 sekcie, G-6 overenie v appke cez Playwright). data.json sa len čítal. Celé zoznamy (CSV) sú v `/tmp/claude-0/-home-user/eed11a80-25e6-51b3-88cc-2253d64cd8b2/scratchpad/findings/data/` — pri každom riadku je id uzla a cesta (Šport › Kontinent › Krajina › …). Surové výpisy skriptov sú tam tiež (`_G1-vystup.txt` … `_G4-vystup.txt`).

Ako appka a generátor dáta čítajú (aby bolo jasné, čo je povinné):
- povinné polia: `id`, `type` (folder/link), `parentId`, `name`, `order`; linka navyše `url` (`generator.py:313`, `index.html:1182-1183`, `:1497-1515`)
- voliteľné: `name_en`, `desc`, `desc_en`, `slug`, `slug_en`, `order_en`, `icon`, `fb`, `ig`, `tag`, `en`, `enOnly`, `noTileSk`
- EN web: `nName = name_en || name`, `nDesc = desc_en || desc` (`index.html:1182`, `generator.py:169-186`) — keď `name_en` chýba, Angličan vidí slovenský názov
- štítok LIGA/LEAGUE: `order === -1` alebo pole `tag` (`index.html:1857`, `:1978`, `:2452`)
- slug priečinka: uložený `slug`/`slug_en`, inak `slugify(name)`; duplicity medzi súrodencami dostanú `-2` (`generator.py:501-541`)

---

## Nálezy

### 1. Linky líg a ďalších prekladateľných názvov bez `name_en` — na EN webe svieti slovenčina
- **Závažnosť:** 🟠 dôležité; oblasť G
- **Čo je zle:** 11 233 liniek viditeľných na EN webe nemá `name_en` (z 14 830). Pri kluboch je to podľa Mirovho pravidla v poriadku (vlastné meno klubu sa neprekladá). Ale **201 liniek** má názov, ktorý je zjavne slovenský alebo inde v dátach preložený — z toho **160 sú linky líg (order -1)**, napr. „Jemenská liga", „Svetový pohár muži 2026", „Golf Česko", „FIS stats". Angličan na stránke ligy vidí slovenský prvý riadok.
- **Dôkaz:** `bez-name_en-prekladatelne.csv` (201 riadkov, stĺpec „dovod"); overené v EN builde: `build/site-en/football/clubs/asia/yemen/yemeni-league/index.html` obsahuje linku `f_yem_l1_liga` s názvom „Jemenská liga" a bez `name_en`. Podľa sekcií: Volejbal 92, Futbal 45, Hádzaná 37, Ostatné 10, Zimné 6, Hokej 6, Basketbal 3, Správy 2. Celý zoznam všetkých 11 233 liniek bez `name_en` je v `bez-name_en.csv` (väčšina = kluby, zámer).
- **Riešenie:** doplniť `name_en` pri 201 linkách zo zoznamu (hlavne linky líg vo volejbale: „Superliga mužov", „1. divízia žien"…). Náročnosť: stredná (ručne/Cowork cez data.json na Mirovom PC). Súbory: len data.json. SK aj EN: dáta sú spoločné, prejaví sa na EN.

### 2. Štítok LIGA/LEAGUE sa ukazuje aj pri tenisových federáciách (order -1 mimo Klubov)
- **Závažnosť:** 🟢 drobné (možno zámer „pripnúť" federáciu hore); oblasť G (+ C appka)
- **Čo je zle:** 17 liniek s `order: -1` je mimo sekcií Kluby: 6 kontinentálnych tenisových federácií (Tennis Europe, ATF, CAT, COSAT, COTECC, OTF) v `Tenis › Asociácie › …` a 11 „rýchlych" liniek v koreňoch športov (tie sú zámer — „SBL – výsledky a tabuľka"). Appka dáva štítok LIGA/LEAGUE každej linke s `order === -1` bez ohľadu na sekciu, takže **Tennis Europe má štítok „LIGA"**, hoci to nie je liga ani tabuľka.
- **Dôkaz:** `index.html:1857`, `:1978`, `:2452` (`n.order===-1 → LIGA`); snímka `snimky/G-1-sk-tenis-europa-liga-stitok.png` (SK: „LIGA Tennis Europe"), `snimky/G-4-en-tenis-europa.png` (EN: „LEAGUE Tennis Europe"); zoznam v `_G3-vystup.txt` („linky order -1 mimo Kluby"). Statická stránka generátora štítok nerobí (0× `class="lt"` v `build/site-sk/tenis/asociacie/europa/index.html`), takže návštevník ho uvidí až po prevzatí appkou.
- **Riešenie:** ak má byť federácia len „pripnutá hore", dať jej `order: -2` (ako live linky) alebo `0` a ostatným od 1 — štítok je len pri presne `-1`. Ak má mať vlastný štítok, použiť pole `tag` (napr. `tag: "federácia"` — appka ho vypíše veľkými). Náročnosť: malá, len data.json (6 uzlov). SK aj EN.

### 3. Interná linka na sportlinky.sk — na EN webe vedie na slovenský web
- **Závažnosť:** 🟢 drobné; oblasť G
- **Čo je zle:** `Futbal › Kluby › Oceánia › Austrália › Kluby Austrálie (sekcia Ázia)` (id `f_fut_klu_oc_aus_k1`) má `url: https://www.sportlinky.sk/futbal/kluby/azia/australia/`. Na sportlinking.com sa Angličan klikom dostane na slovenskú stránku (otvorí sa v novom okne ako externá linka). Je to jediná linka v dátach, ktorá ukazuje na vlastný web.
- **Dôkaz:** snímka `snimky/G-2-en-australia-interny-odkaz.png`; Playwright na `http://127.0.0.1:8124/football/clubs/oceania/australia/` vypísal href `https://www.sportlinky.sk/futbal/kluby/azia/australia/`.
- **Riešenie:** buď dve linky (SK s `en:false` na sportlinky.sk, EN s `enOnly:true` na `https://sportlinking.com/football/clubs/asia/australia/`) — rovnaký trik, aký už používajú live linky `f_fut_live_sk`/`f_fut_live_en`; alebo priečinok Austrália v Oceánii zmazať a nechať len popis. Náročnosť: malá, data.json. Týka sa EN.

### 4. Duplicitné URL v tom istom priečinku (4 prípady) a 47 rovnakých adries zapísaných rôzne
- **Závažnosť:** 🟢 drobné; oblasť G
- **Čo je zle:**
  - V tom istom priečinku je tá istá adresa 2× (istá chyba, nie zámer): `Rakúsko › Regionalliga Süd` — „Regionalliga Süd – Štajersko" aj „– Korutánsko" (obe `order -2`) vedú na tú istú tabuľku `soccerway.com/austria/regionalliga-south/standings/`; `Hádzaná › Škótsko › Senior Men's League` — kluby „Cumbernauld" aj „Tryst 77" majú tú istú FB stránku Tryst 77 (jeden klub má zlú linku); `Volejbal › Škótsko › SVL Premier mužov` — „City of Glasgow Ragazzi" aj „Forza Ragazzi" na `facebook.com/suragazzi`; `Hádzaná › Súťaže › SCAHC` — 4 súťaže na tú istú stránku handballsca.com, líšia sa len #kotvou (to môže byť zámer).
  - 47 adries je v dátach viac ráz s rôznym zápisom (s/bez `www.`, s/bez lomky na konci) — napr. `rusg.brussels` vs `www.rusg.brussels`, `facebook.com/SmouhaOfficial` vs `…/SmouhaOfficial/`. Funkčne to nevadí, ale ikonky (`ikony/<host>.png` — `ikony.py:93-110` `www.` neodstraňuje, takže sa stiahnu 2 súbory) a strážca liniek to vidia ako rôzne weby.
  - Celkovo 389 adries (805 liniek) sa opakuje: 290 v rámci jedného športu v rôznych priečinkoch (klub v mužskej aj ženskej lige, tenisový turnaj v ATP aj WTA — **zámer**), 95 naprieč športmi (multišportové kluby Egypta, Tuniska, Kuvajtu — FB stránka klubu v futbale, basketbale, hádzanej aj volejbale — **zámer**).
- **Dôkaz:** `duplicitne-url-rovnaky-priecinok.csv` (10 riadkov), `duplicitne-url.csv` (805 riadkov, stĺpce `rovnaky_priecinok`, `rovnaky_nazov`, `sekcie`), výpis TOP 30 v `_G2-vystup.txt`.
- **Riešenie:** opraviť 3 skutočné chyby (Regionalliga Süd, Tryst 77/Cumbernauld, Ragazzi); zjednotiť zápis (bez `www.`? — skôr nechať, ale pri nových linkách dodržať jeden tvar). Náročnosť: malá, data.json.

### 5. Prázdne priečinky: 118 krajín v Správy & Médiá (+ 3 celé kontinenty bez jedinej linky)
- **Závažnosť:** 🟢 drobné (pravdepodobne zámer — pripravené priečinky na plnenie); oblasť G
- **Čo je zle:** 116 priečinkov nemá žiadne dieťa (115 v `Správy & Médiá › Afrika / Severná a Stredná Amerika / Oceánia` + `Aktuálne`, ktorý je prázdny zámerne), 3 priečinky majú len prázdne podpriečinky (tie 3 kontinenty). Všetkých 115 krajín je zároveň **bez `desc` aj `desc_en`** (jediné priečinky bez popisu v celých dátach). Na webe sa neukážu (appka aj generátor prázdne priečinky skrývajú — bod 5 previerky 2), ale cestujú v `data.json` aj v štartovacom balíku (BOOT obsahuje všetky priečinky, `generator.py:580-599`).
- **Dôkaz:** `prazdne-priecinky.csv` (119 riadkov), `priecinky-bez-desc.csv` (230 riadkov = 115 × desc + 115 × desc_en).
- **Riešenie:** ak sa tie krajiny v dohľadnom čase plniť nebudú, zmazať (zmenšia sa dáta o ~115 uzlov, ~25 kB); inak nechať. Náročnosť: malá.

### 6. Slugy s diakritikou — zostali 3 (nie 13), plus 148 slugov, ktoré nesedia s názvom (to je zámer: trvalé slugy)
- **Závažnosť:** 🟢 drobné (známe); oblasť G
- **Čo je zle:** Známych „13 slugov s diakritikou" je dnes už len **3 hodnoty v 2 priečinkoch**: `f_yem_l1` slug `jemenská-liga`, `f_bas_fra_l3` slug `la-boulangère-wonderligue-zeny` a slug_en `la-boulangère-wonderligue-women`. Sú aj v sitemape (SK 2 adresy, EN 1). Ostatné už boli opravené. Pozor: oprava zmení adresy stránok → treba presmerovanie (bod 4 previerky 2).
- 148 slugov sa líši od `slugify(name)` (69 SK, 79 EN) — to je správne správanie (trvalý slug sa po premenovaní nemení), nie chyba; zoznam `slugy-nekonzistentne.csv` je len informačný. 4 slugy končia `-2` (riešenie duplicít). Duplicitné slugy medzi súrodencami: 0 (SK aj EN). 190 priečinkov nemá `slug_en` (174 volejbal, 16 futbal) — EN adresa sa počíta z `name_en`, funguje, ale pri premenovaní by sa zmenila.
- **Dôkaz:** `slugy-nevalidne.csv`, `build/site-sk/sitemap.xml` (2 adresy s diakritikou), `build/site-en/sitemap.xml` (1).
- **Riešenie:** 2 priečinky — zmeniť slug na `jemenska-liga` a `la-boulangere-wonderligue-zeny`/`-women` + presmerovanie zo starých adries (ak už boli v Googli). Náročnosť: malá.

### 7. Ten istý slovenský názov preložený rôzne (47 prípadov)
- **Závažnosť:** 🟢 drobné; oblasť G
- **Čo je zle:** napr. „Turecko" → „Turkey" (9×) aj „Türkiye" (3×); „Severná a Stredná Amerika" → „North & Central America" (7×) aj „North and Central America" (1×); „Pobrežie Slonoviny" → „Ivory Coast" (7×) / „Côte d'Ivoire" (1×); „Veľká Británia" → „Great Britain" (4×) / „United Kingdom" (2×); „Turks a Caicos" → 2 tvary. Časť rozdielov je zámer (napr. „Superliga mužov" → „Slovenian Superliga (men)" s krajinou v názve), ale pri krajinách a kontinentoch to na EN webe pôsobí nejednotne (vedľa seba v zozname asociácií).
- **Dôkaz:** `name_en-nekonzistentne-preklady.csv` (47 riadkov s početnosťou).
- **Riešenie:** zjednotiť aspoň krajiny a kontinenty (Turkey, Ivory Coast, Great Britain, North & Central America). Náročnosť: malá, data.json.

### 8. EN repozitár má v gite zastaraný data.json (v762 z 27. 9. 2026), hoci build ho vždy sťahuje zo SK webu
- **Závažnosť:** 🟢 drobné; oblasť G (+ H build)
- **Čo je zle:** `/home/user/sportlinking/data.json` (7,8 MB, verzia 762, 16 270 uzlov, ešte so starým `passwordHash` a poľom `aktualne` s 21 položkami) je v gite sledovaný (`git ls-files` ho vracia), ale `.gitignore` ho nemá (má len `aktualne.json` a `__pycache__/`). Build (`sportlinking/.github/workflows/build.yml:66-69`) ho vždy prepíše stiahnutým `data-full.json` zo sportlinky.sk a komentár v build.yml:10 hovorí „data.json sa NEcommituje". Súbor je teda mŕtva záťaž v repozitári a mätie (obsahuje starý hash hesla — `passwordHash`, nie `pwKdf`; a staré Aktuálne).
- **Dôkaz:** `git -C /home/user/sportlinking ls-files | grep data.json` → 1; `git log -1 -- data.json` → 4362b03 2026-09-27; `.gitignore` v EN repo (3 riadky, bez data.json).
- **Riešenie:** v EN repo `git rm --cached data.json` a pridať `data.json` do `.gitignore` (tak ako aktualne.json). Testy nič lokálne nečítajú (`test_hlbkovy.py:455` číta data.json len pre SK web cez `REPO_DATA_JSON`). Náročnosť: malá. Len EN repo (samostatná úloha).

### 9. Drobnosti v štruktúre (nie chyby, len poriadok)
- **Závažnosť:** 🟢 drobné; oblasť G
- 288 liniek (kluby, id `f_*_k*`, napr. Americká Samoa, Jemen) má polia `slug` a `slug_en`, ktoré majú len priečinky — generátor ich pri linkách nepoužíva (`generator.py:516-517`), len zväčšujú data.json (~20 kB). Zoznam: `_G1-vystup.txt` („link s slug: 288").
- 2 priečinky majú `"url": null` (`n17830911562642il` Motorizmus, `n178475510658360n` Správy & Médiá › Oceánia › Austrália) — neškodné.
- 2 priečinky-súrodenci majú rovnaký `order` (Portugalsko: „Liga Portugal 2" a „Liga 3 - Série A" obe `order 2`) → poradie určuje len poradie v súbore. `duplicitny-order-priecinky.csv`.
- 5 priečinkov má viac než 1 linku s `order -1` (koreň Hádzaná 3, Basketbal/Volejbal/Futbal/Hokej 2) — zámer (rýchle linky na tabuľky), v poriadku.
- 10 párov liniek so zhodným názvom medzi súrodencami = páry `*_live_sk` (`en:false`) / `*_live_en` (`enOnly:true`) — zámer.
- 6 krajín v Kluboch má len 1 linku a žiadnu ligu (Eritrea, Severná Kórea, Pakistan, Austrália-Oceánia, Lichtenštajnsko, Monako) — zámer (federácia/jediný klub). `kluby-bez-linky-ligy.csv`, `krajiny-chvost.csv`.
- 266 priečinkov krajín má jediný podpriečinok (krajina › jediná liga) — zámer podľa skillov (podpriečinok ligy), ale návštevník klikne 2× tam, kde by stačilo raz. 💡 nápad: zvážiť pri krajinách s jednou ligou (zoznam `priecinky-jeden-podpriecinok.csv`).
- 9 priečinkov mieša linky aj podpriečinky (`priecinky-zmiesane.csv`) — appka to zvládne.
- Popisy: 7 veľmi krátkych SK (<20 zn., napr. „Snooker na BBC"), 18 krátkych EN, 167 dlhých SK (>300 zn.) a 237 dlhých EN (najdlhší 500+; sú to popisy krajín v Kluboch so zoznamom líg — zámer); 17 textov popisu sa opakuje pri 39 linkách (napr. „Oficiálny instagramový profil českého tenistu." 4×). Žiadny popis nemá HTML, dvojité medzery ani nový riadok; 1 popis má nedeliteľnú medzeru (`45\xa0000` — v poriadku). `popisy-*.csv`.
- Šablónovité začiatky: „Klub z mesta …" 378×, „Tabuľka volejbalovej súťaže …" 138×, EN „Club from the …" 814× — pri 15 000 linkách prirodzené, nie chyba.
- Názvy: 0 s medzerou na kraji, 0 s dvojitou medzerou, 0 s emoji; 45 názvov obsahuje doménu („Hokej.cz", „Atletika.sk" — zámer, názov webu); 9 názvov končí bodkou (skratky „champ.", „rep.", „n.O." — pri 4 z Ostatných športov by sa dalo rozpísať: „United rugby champ.", „PDC world champ.", „ICC World test champ.", „Euro beach soccer l.").
- `desc_en == desc` len 1× (Šípky › PDC Premier league, popis „Premier League Darts" — v poriadku).

---

## URL — čo som zistil (štatistika, nie chyby)
- 14 847 liniek, 8 069 rôznych hostov; 672 hostov má linky vo viacerých priečinkoch.
- **Hlavná adresa je Facebook pri 3 029 linkách (20 %) a Instagram pri 1 035 (7 %)** — spolu 27 % všetkých liniek vedie na sociálnu sieť (futbal 1 532 FB, volejbal 681…). Ani jedna z nich nemá zároveň vyplnené pole `fb`/`ig` (appka si ikonku odvodí z url, `index.html:2490`). Je to dôsledok fallbackov zo skillov, nie chyba. `url-url-facebook.csv`, `url-url-instagram.csv`.
- 307 FB adries v tvare `facebook.com/profile.php?id=…` — platný tvar stránky, v poriadku. Polia `fb` (5 269) a `ig` (7 366) sú **všetky** na správnej doméne a s https; 0 nevalidných.
- Ďalšie siete ako hlavná adresa: 15 (x.com 5, vk.com 7, youtube 3, t.me 1) — ruské/bieloruské kluby (zámer). `url-url-ina-socialna-siet.csv`.
- Tretie strany ako hlavná adresa (`tretie-strany.csv`, `tretie-strany-linky.csv`): soccerway 259 (182 linky líg + 77 klubov), flashscore 177 (163 líg + 14), sofascore 160 (25 líg + **135 klubov** — futbalové kluby bez vlastného webu), volleybox 123 (36 líg + 87 klubov), eurobasket 20, eliteprospects 11, wikipedia 2 (2 linky líg: USVISF Premier League, Australian Handball Club Championship — jediné 2 wiki linky), google 2, youtube 3.
- `http://` namiesto `https://`: len **7** (3 severokórejské weby, 4 kluby) — `url-http.csv`. Skracovače (bit.ly, t.co…): 0. mailto/tel/javascript: 0. IP adresy: 0. Porty: 0. Medzery/nevalidné: 0. `?utm`/`fbclid`: 0. Placeholder/localhost: 0.
- `#fragment`: 16 (kotvy na tabuľky — zámer), `url-fragment.csv`. Nie-ASCII v adrese: 9 (arabské FB stránky, `peñarol.org`, `хкрязань.рф`) + 3 punycode — funkčné. `url-non-ascii.csv`.
- Tipovanie: 1 linka (tipsport.sk) — nič cudzie.
- Domény inej krajiny než priečinok: 6, všetky vysvetliteľné (Belfast Telegraph v Írsku, `corsaires.dk` = Dunkerque, litovské kluby v lotyšskej lige, ukrajinský klub v poľskej lige…). `tld-ina-krajina.csv`.

## Sekcie — počty
| Sekcia | liniek | priečinkov |
|---|---:|---:|
| Futbal | 5 390 | 563 |
| Volejbal | 2 254 | 296 |
| Basketbal | 2 185 | 235 |
| Správy & Médiá | 1 486 | 220 (118 prázdnych) |
| Hádzaná | 1 350 | 164 |
| Hokej | 1 065 | 113 |
| Tenis | 570 | 30 |
| Ostatné športy | 433 | 26 |
| Zimné športy | 113 | 14 |
| Tipovanie | 1 | 1 |
| Aktuálne | 0 (z aktualne.json) | 1 |

- Najväčšie krajiny: Futbal Anglicko 171, Nemecko 155, Argentína 129, Taliansko 105, Rakúsko 98. Krajiny s 1–2 linkami: 6 (všetky s 1, pozri bod 9). Priečinok bez klubov, len s linkou ligy: 0. Najviac liniek na jednej stránke: Hokej › NCDC 64, Tenis › Hráči › Ženy 57, asociácie 52–55.
- Hĺbka stromu: max 6 úrovní (Futbal › Kluby › Európa › Anglicko › Premier League › Arsenal); 9 892 liniek je v hĺbke 6, 3 339 v hĺbke 4. Celé tabuľky: `sekcie-pocty.csv`, `podsekcie-pocty.csv`, `kontinenty-pocty.csv`, `krajiny-pocty.csv`.

## aktualne.json
- Štruktúra `{version: 3, updated: "2026-11-03T19:26:11Z", items: [5]}`, každá položka má všetkých 13 polí z `generator.py:210-211` (id, order, sport, icon, name, name_en, url, desc, desc_en, startsAt, endsAt, disabled, addedAt). Hodnoty sú správneho typu (`order` int 0–4, `addedAt` ms, `disabled` bool).
- 5 položiek: ATP scores, WTA scores, TT Star series (aktívne), WNBA, MLB (`disabled: true`). `startsAt`/`endsAt` všade prázdne (= bez obmedzenia, správne podľa Mirovho rozhodnutia 2). `desc`/`desc_en` všade prázdne — na stránke Aktuálne tak linky nemajú title (nie chyba, len prázdne). `addedAt` z 20. a 27. 7. 2026 → štítok NEW sa už neukáže (správne).
- Pole `sport` je prázdne pri WNBA a MLB — oba sú vypnuté; pri aktívnych je `tenis`, `stolny-tenis` (platné kódy z `AKT_SPORTS`, `generator.py:136`). Prázdny `sport` generátor znesie (kód „ine" sa nepoužije, ikona je v `icon`). 🟢 nič na opravu.

## Porovnanie s /home/user/sportlinking/data.json
- Je to stará kópia v762 (27. 9. 2026): 16 270 uzlov, ešte `passwordHash` (nie `pwKdf`) a pole `aktualne` (21 položiek) priamo v data.json. EN generator.py je zhodný so SK a číta `data.json` z pracovného priečinka; build ho ale vždy nahradí stiahnutým `data-full.json` zo sportlinky.sk a `aktualne.json` tiež stiahne (build.yml:66, :86). EN repo tento súbor teda **nepotrebuje** — pozri nález 8.

---

## Čo je v poriadku (overené)
- 0 osirelých uzlov, 0 cyklov, 0 duplicitných id, 0 uzlov bez `name`, 0 liniek bez `url`, 0 uzlov s rodičom-linkou, typ je vždy folder/link. Všetky `order` aj `order_en` sú celé čísla (žiadne texty). Žiadne neočakávané kľúče (len 19 známych).
- Každá linka má `desc` aj `desc_en` (0 chýbajúcich pri linkách); každý priečinok s obsahom má `desc` aj `desc_en` a `name_en`; všetky priečinky majú `slug`.
- `en:false` (17) a `enOnly` (5) sú použité len tam, kde majú zmysel (Tipovanie, slovenské rýchle linky, live páry); `noTileSk` len pri Aktuálne; `tag` len `scores` (10 live liniek).
- Ikony: 271 rôznych hodnôt, všetky buď emoji, alebo kód vlajky `xx`/`gb-eng` (3 191 uzlov), nič pokazené. Priečinky líg Severnej Ameriky majú 🏒 namiesto vlajky (zámer).
- fb/ig polia: 100 % na správnych doménach, https, bez medzier; žiadny `fb` sa nerovná `url`.
- 789 listových priečinkov v Kluboch — 783 má linku ligy (order -1), 6 bez nej sú zámerné výnimky.

## Merania
| Meranie | Hodnota |
|---|---:|
| Uzly / priečinky / linky | 16 510 / 1 663 / 14 847 |
| data.json v repo / data-full.json / data.json (lite) na webe | 9,56 MB / 8,02 MB / 5,49 MB |
| Linky viditeľné na EN bez `name_en` | 11 233 (z toho prekladateľných 201, z nich líg 160) |
| Linky s Facebook / Instagram ako hlavná adresa | 3 029 / 1 035 (27 %) |
| Duplicitné adresy (po normalizácii) | 389 URL / 805 liniek; v tom istom priečinku 4 |
| Rôzny zápis tej istej adresy | 47 |
| http:// | 7 |
| Prázdne priečinky (bez liniek v podstrome) | 119 (118 Správy & Médiá + Aktuálne) |
| Slugy s diakritikou | 3 hodnoty / 2 priečinky |
| Slugy líšiace sa od názvu (trvalé slugy) | 148 |
| Linky s `order -1` | 800 (17 mimo Klubov) |
| Rôzne preklady toho istého SK názvu | 47 |
| aktualne.json položiek / aktívnych | 5 / 3 |
| EN repo data.json | v762, 16 270 uzlov, 7,8 MB, zastaraný, sledovaný v gite |
