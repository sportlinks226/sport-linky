# A2 — ADMIN režim appky (index.html)

Previerka č. 3, oblasť A (admin). Testované v Chromiu (node Playwright) na lokálnom builde SK (http://127.0.0.1:8123/) a EN (http://127.0.0.1:8124/), desktop 1366×768, iPhone 13 (390 px), Pixel 5 (393 px) a 375×667 s dotykom. Heslo nepoznám — do načítaných dát som v prehliadači vložil vlastný odtlačok `pwKdf` (ten istý PBKDF2‑SHA‑256 / 600 000 opakovaní, aký appka používa) a prihlásil sa vlastným heslom. Nič v repozitároch som nemenil (`git status` v oboch repozitároch je čistý); generátor bežal na kópii v scratchpade.

Skripty: `scratchpad/findings/skripty/A2-01…A2-09*.js` (+ `A2-lib.js`, výstupy `*.log.json`, stiahnuté súbory v `A2-stiahnute/`). Snímky: `scratchpad/snimky/A2-*.png`.

Čísla riadkov sú z `/home/user/sport-linky/index.html` (EN `index.html` je zhodný, takže všetko platí pre oba weby, ak nie je napísané inak).

---

## Nálezy

### 1. Šípky ▲▼ v admine na EN webe nič neurobia, ale potichu zmenia poradie na SK webe — 🟠 dôležité; oblasť A
- **Čo je zle:** Tlačidlá Hore/Dole vymieňajú len pole `order` (riadok 2756–2766). EN web však radí podľa `order_en` (riadok 1510) a v priečinkoch kontinentov navyše abecedne (riadky 1512–1520). Keď v EN admine stlačíš ▲, na obrazovke sa nič nezmení (admin si myslí, že tlačidlo nefunguje), ale do dát sa zapíše vymenené `order` — teda zmení sa poradie na **slovenskom** webe, čo admin na EN webe vôbec nevidí. Týka sa 2 905 uzlov s `order_en` (311 priečinkov) a všetkých priečinkov kontinentov.
- **Dôkaz:** `A2-08-en.js` → `A2-08-en.log.json`: v Tenis › Asociácie › Európa ▲ na „Armenia“: pred `[Andorra 1/1, Armenia 2/2]` (order/order_en), po `[Andorra 2/1, Armenia 1/2]` — na obrazovke poradie rovnaké (`changedOnScreen: false`). V Tenis › Správy (má `order_en`) to isté: `order` sa vymení, zobrazenie podľa `order_en` ostane. Snímka `A2-08-en-presun.png`.
- **Riešenie:** v `moveNode` na EN webe (IS_EN) vymieňať `order_en` (ak uzol nemá, najprv ho doplniť z `order`); v priečinkoch s abecedným radením tlačidlá ▲▼ skryť alebo ukázať hlášku „tu sa radí abecedne“. Náročnosť malá. Súbor `index.html`, SK aj EN (rovnaký súbor).

### 2. Rozpracované úpravy v prehliadači potichu vyhrajú nad webom, keď majú rovnaké číslo verzie — 🟠 dôležité; oblasť A
- **Čo je zle:** Po 🚀 Publikovať ostáva v prehliadači príznak `sportStromDirty=1` a celá kópia dát v IndexedDB s verziou +1 (napr. v1126) — navždy, kým web nemá **vyššiu** verziu. Pri každom otvorení webu sa potom berú dáta z prehliadača, nie z webu (riadok 1033: `storedW.version >= published.version`). Ak sa na webe objaví v1126 s **iným obsahom** (napr. publikované z PC cez Cowork, alebo stiahnutý súbor si nikdy nenahral a medzitým vyšla iná v1126), prehliadač bez akejkoľvek hlášky ukazuje svoju starú kópiu a ďalšie Publikovať z neho vyrobí v1127, ktorá prepíše zmeny z PC. Navyše tvoj prehliadač pri každej návšteve číta 8 MB z disku.
- **Dôkaz:** `A2-05-ulozisko.js` → `A2-05-ulozisko.log.json` → `sameVerDifferentContent`: web vracal v1126 s podnadpisom „PODNADPIS Z WEBU v1126“, prehliadač mal rozpracovanú v1126 — po obnovení stránky `dialogs: []`, `sub: "Naviguj sa cez kategórie"` (lokálna kópia), `dirty: "1"`, testovacia linka z prehliadača stále zobrazená. Pri **vyššej** verzii na webe (v1130) to funguje správne: hláška, ponuka zálohy, kópia v prehliadači sa zmaže (`newerOnWeb`).
- **Riešenie:** pri Publikovať zapísať do dát aj značku publikovania (napr. `"updated": "2026-11-04T19:19:43Z"` ako má aktualne.json). V `load()`: ak je verzia rovnaká a značka rovnaká → prevziať web a zrušiť `dirty` (súbor je už nahratý); ak je verzia rovnaká a značka iná → tá istá hláška s ponukou zálohy ako pri novšej verzii. Náročnosť malá až stredná. `index.html` (SK aj EN); generátor značku len prenesie.

### 3. Zmazanie / vypnutie / aktivovanie bannera sa neuloží, kým nestlačíš „Uložiť nastavenia“ — 🟠 dôležité; oblasť A
- **Čo je zle:** `deleteBanner` (riadok 3093), `toggleBannerActive` (3087) a `activateBanner` (3082) menia len dáta v pamäti okna, nevolajú `save()`. Ukladá až `saveBannerSettings` (3175) alebo hocijaká iná úprava. Keď banner zmažeš, okno zavrieš cez „Zavrieť“ a obnovíš stránku, banner je späť. Pridanie/úprava bannera (`saveBanner`, 3145) sa ukladá správne.
- **Dôkaz:** `A2-07-nastavenia-bannery.log.json` → `ban.afterDeleteMem.inDb: false`, ale `afterDeleteIdb: true`, po obnovení `afterReloadStillThere: true`; vypnutie: v pamäti `active: false`, v úložisku `active: true` (`toggleInMem` / `toggleInIdb`).
- **Riešenie:** do všetkých troch funkcií doplniť `save();` (ako majú promá v `togglePromo`/`delPromo`, riadky 2305–2306). Náročnosť malá. `index.html`, SK aj EN.

### 4. Okno linky neoveruje adresu — uloží sa aj `javascript:`, `ftp://` či `www.bez-https.sk`, na webe z toho vznikne mŕtva linka „#“ — 🟠 dôležité; oblasť A
- **Čo je zle:** `saveNode` kontroluje len prázdny názov a prázdnu URL (riadky 2699–2700), tvar adresy nie (`<input type="url">` sa nevyhodnocuje). Rovnako polia Facebook/Instagram. Appka aj generátor takú adresu bezpečne premenia na `#` (`safeUrl`, riadok 1187; generátor `safe_url` riadok 237), takže bezpečnostný problém to nie je — ale linka je na webe nefunkčná a admin sa o tom nedozvie. Okno Aktuálnych túto kontrolu má (riadok 3635: „URL musí začínať https://“), bannery a promo nie (uložili `javascript:` cieľ, obrázok `http://` blokuje CSP).
- **Dôkaz:** `A2-02-uzly.log.json` → `val.jsUrl/noScheme/ftpUrl/badFb`: `alerts: []`, uzol uložený; `rendered`: `url: "www.priklad.sk"` → `href: "#"`, FB `javascript:` → ikonka s `href="#"`. `A2-07…log.json` → `ban.jsLink` uložené, `httpImg` → v konzole „violates Content Security Policy img-src“. Snímka `A2-02-validacia-karty.png`.
- **Riešenie:** v `saveNode`, `saveBanner`, `savePromo` použiť rovnakú kontrolu ako v `saveAkt` (`/^https?:\/\//i`), pre FB/IG a obrázky bannerov tiež (obrázok len `https://` alebo `/`). Náročnosť malá. `index.html`, SK aj EN.

### 5. Hore/Dole nefunguje pri súrodencoch s rovnakým `order` (rýchle linky v 6 športoch) — 🟢 drobné; oblasť A
- **Čo je zle:** `moveNode` vymieňa hodnoty `order` dvoch susedov; keď sú rovnaké (napr. obe −1), výmena nič nezmení. V data.json má 6 priečinkov súrodencov s rovnakým `order` (f_fut, f_hok, f_bas, f_had, f_vol: dve linky „dnes – live“ s −2 a dve „rýchle“ s −1).
- **Dôkaz:** `A2-02-uzly.log.json` → `move.basAfterRychla2Up` = `basBefore` (poradie nezmenené). Skript v Python výpočte: `parents with duplicate order values: 6`.
- **Riešenie:** v `moveNode` po výmene prečíslovať všetkých súrodencov podľa aktuálneho poradia (0, 1, 2…), prípadne zachovať záporné hodnoty pre „liga“ (`order === -1` má význam štítku LIGA, riadky 1857 a 1978 — pozor, prečíslovanie musí −1 nechať). Náročnosť malá. `index.html`, SK aj EN.

### 6. „Úprava sa NEULOŽILA“ (ochrana pred starým oknom) — uzol sa aj tak objaví na obrazovke — 🟢 drobné; oblasť A
- **Čo je zle:** `saveNode` ignoruje výsledok `save()` (riadok 2736: `save(); closeMo('nodeMo'); render();`). Pri hláške o starom okne sa uzol pridá do pamäte a vykreslí, hoci sa neuložil; to isté `delNode`, `moveNode`, bannery, promá. Admin vidí zmenu a myslí si, že prešla.
- **Dôkaz:** `A2-02-uzly.log.json` → `oldWindowGuard`: hláška áno, `addedInMemory: 1`, okno zavreté.
- **Riešenie:** `if(!save()) return;` pred zatvorením okna (a v `delNode`/`moveNode` zmenu vrátiť), alebo po hláške rovno obnoviť stránku. Náročnosť malá. SK aj EN.

### 7. Import staršej zálohy zníži verziu bez varovania; Publikovať potom vyrobí nižšie číslo než je na webe — 🟢 drobné; oblasť A
- **Čo je zle:** `importData` (2821) prevezme verziu zo súboru (aj v100) a `publishData` (2817) dá +1 → stiahne sa `data.json` v101. Po nahratí na web by `version.txt` hlásil 101, ochrana proti starému HTML (riadok 1003: len ak je číslo **vyššie**) by nefungovala a ostatné prehliadače by si nové dáta nevšimli. Pri ďalšom obnovení stránky navyše prehliadač import zahodí (web má v1125 > v100 — hláška ako pri novšej verzii).
- **Dôkaz:** `A2-03-publikovat.log.json` → `importOld`: „Import úspešný“, `verAfterImportOld.db: 100`, `publishAfterOldImport.ver: 101`, stiahnutý `data.json` (126 kB).
- **Riešenie:** pri importe staršej verzie než `PUB_VER`/`DB.version` upozorniť; v `publishData` použiť `max(DB.version, PUB_VER, lsVer) + 1`. Náročnosť malá. SK aj EN.

### 8. Ťuknutie mimo okna alebo Escape zahodí rozpísané údaje bez opýtania; Escape zavrie aj okno pod oknom — 🟢 drobné; oblasť A
- **Čo je zle:** Klik na tmavé pozadie (riadok 2848) a Escape (2863) zavrú okno bez otázky, aj keď je niečo rozpísané. Escape zavrie **všetky** otvorené okná naraz — pri úprave položky Aktuálnych sa zavrie aj zoznam Aktuálnych. Na mobile sa pozadie ťukne ľahko (okno uzla má 627 px, pod ním a vedľa je pozadie).
- **Dôkaz:** `A2-02-uzly.log.json` → `clickOutsideClosed: true`, `dialogsSoFar: 0`; `twoModalsAfterEsc: []`; `A2-04-aktualne.log.json` → `escBoth: []`.
- **Riešenie:** zatvárať klikom mimo len ak sú polia prázdne/nezmenené (inak `confirm`), Escape zatvárať len vrchné okno. Náročnosť malá. SK aj EN.

### 9. Mobil: tlačidlá na kartách prekrývajú text, rady bannerov pri 375 px orezané, lišta prekrýva pätičku, okno linky vyššie než obrazovka — 🟢 drobné; oblasť A
- **Čo je zle (všetko overené, admin z mobilu inak FUNGUJE):**
  - Lišta ▲▼✏️🗑 na karte linky (116 px) leží cez popis a dlhší názov (`.card-admin-bar` je `position:absolute` vpravo hore, riadky 347–351; karta má 351–369 px). Tlačidlá majú 26×26 px (riadok 352) — pod odporúčanou dotykovou plochou (≈ 40 px), 4 vedľa seba.
  - Správa bannerov pri 375 px: riadok bannera je širší než okno (scrollWidth 303 > 295 px), 🗑 je orezané (snímka `A2-09-375-bannery.png`, `A2-06-w375-bannery.png`).
  - Admin lišta na 375 px má 114 px (3 riadky tlačidiel), pätička má odsadenie len 64 px (riadok 248) → posledný riadok pätičky je pod lištou (snímka `A2-09-375-paticka.png`).
  - Okno Pridať/Upraviť linku je 624–627 px vysoké; na iPhone 13 aj 375×667 je tlačidlo Uložiť mimo obrazovky, treba rolovať v okne (funguje, `overflow-y:auto`). S otvorenou klávesnicou ostane z okna ~300 px.
- **Dôkaz:** `A2-06-mobil.log.json` (`cards.barCoversName: true`, `ibtn 26×26`, `nodeMo.saveBtnVisibleWithoutScroll: false` na iPhone 13 a 375), `A2-09-rozne.log.json` (`cards.descUnderButtons: true`, `bannerRow.delClipped: true`, `footer.noteHiddenByBar: true`). Snímky `A2-06-iphone13-linky.png`, `A2-06-iphone13-okno-uzol.png`, `A2-09-375-linky.png`, `A2-09-375-okno-uzol.png`, `A2-09-375-okno-uzol-dole.png`.
- **Riešenie:** na mobile dať lištu tlačidiel karty pod text (nie absolútne), tlačidlá 36–40 px; `.bfarm-row` nechať zalomiť (`flex-wrap`) alebo zmenšiť náhľad; `.admin-mode footer{margin-bottom}` podľa výšky lišty (napr. 120 px pod 700 px); v okne uzla dať EN polia do jedného riadku a tlačidlá Uložiť/Zrušiť „prilepiť“ dole (`position:sticky`). Náročnosť malá až stredná. `index.html`, SK aj EN.

### 10. „Pridať sem“ funguje aj v priečinku Aktuálne, linka sa uloží do dát, ale nikde sa neukáže — 🟢 drobné; oblasť A
- **Čo je zle:** V admine je v Aktuálnych upozornenie „Vlastné linky sem nepridávaj“ (riadok 1884), ale tlačidlo ➕ Pridať sem ostáva aktívne. Linka sa uloží s `parentId: "f_ltw"`, návštevník ju nevidí (appka berie obsah z Aktuálnych, generátor tiež: `generator.py` riadok 1745) — zostane len ako smetie v data.json.
- **Dôkaz:** `A2-09-rozne.log.json` → `addInLtw`: `added: 1, parent: "f_ltw", shownAdmin: true, shownVisitor: false`.
- **Riešenie:** v `openAdd` pri `curId === LIVE_ID` ukázať hlášku a neotvoriť okno (alebo rovno otvoriť Aktuálne). Náročnosť malá. SK aj EN.

### 11. Zmena názvu/podnadpisu v Nastaveniach po obnovení stránky nevidno (dáta ju majú) — 🟢 drobné; oblasť A
- **Čo je zle:** Pri rýchlom štarte z balíka BOOT sa hlavička nastaví z balíka; keď potom `load()` prevezme rozpracované dáta z IndexedDB, podnadpis sa už neprepíše (`afterLoad` pri `bootShown` nevolá `initApp`, riadky 3950–3981). Admin si myslí, že sa zmena stratila.
- **Dôkaz:** `A2-01-prihlasenie.log.json` → po uložení podnadpisu „TEST PODNADPIS A2“, odhlásení a obnovení: `afterReloadVisitor.sub: "Naviguj sa cez kategórie"`, pritom `idbStored.subtitle: "TEST PODNADPIS A2"` a `DB` je z úložiska (`hasTitleEn: true`).
- **Riešenie:** v `afterLoad` po prevzatí dát z IndexedDB (dirty) nastaviť `#siteSub` a `document.title` z `DB` (tak ako v `initApp`). Náročnosť malá. SK aj EN.

### 12. Každé stlačenie 🚀 Publikovať zvýši verziu, aj bez zmeny — 💡 nápad; oblasť A
- Dve kliknutia za sebou stiahli v1126 a v1127 s rovnakým obsahom (`A2-03-publikovat.log.json` → `verAfterPublish2: 1127`). To isté Publikovať Aktuálne (v4 → v5). Nie je to chyba, ale ak si súbor nenahráš, prehliadač „utečie“ o niekoľko verzií dopredu a nález č. 2 sa zhorší. Návrh: po Publikovať zablokovať tlačidlo, kým sa niečo nezmení (alebo tá istá verzia pri nezmenenom obsahu). Náročnosť malá.

---

## Čo je v poriadku (overené)
- **Prihlásenie:** bez hesla sa admin na http/https otvoriť nedá (`toggleAdmin` → okno hesla; bez hesla len z `file:`). `/#admin` sa z adresy hneď odstráni, Escape aj ✕ okno zavrú (p2 bod 27 funguje). Zlé heslo → „Nesprávne heslo!“, pole sa vyprázdni. Po správnom hesle sa stiahne `data-full.json` tej istej verzie, admin dostane úplné dáta (`title_en`, `name_en`…, bez `_lite`, `_cnt`, `_slugFix`), odznak verzie `v1125`.
- **Odhlásenie:** lišta aj tlačidlá na kartách zmiznú, `adminMode=false`, Aktuálne sa vrátia na verejnú verziu z webu. Admin okná sú v HTML pre každého, ale zavreté sú `visibility:hidden` a nedajú sa „vyklikať“ (p2 bod 1 funguje). Rozpracované dáta ostávajú v IndexedDB toho istého prehliadača (zámer) — iný návštevník k nim nemá prístup.
- **Okno uzla:** fokus ide do prvého poľa, po zavretí späť na nadpis; polia sa pri novom otvorení vyčistia; prázdny názov / samé medzery / prázdna URL → hláška. Názov s `< > " '` a `<img onerror>` sa bezpečne escapuje (nič sa nevloží do HTML). Skutočný dvojklik na Uložiť pridá uzol len raz.
- **Konzistencia dát:** nový priečinok dostane trvalý `slug` a `slug_en` (duplicitný názov súrodenca → `hraci-2`, EN `players-2`), premenovanie slug nemení; nový uzol má `order = počet súrodencov` (na EN sa zaradí na koniec); zmazanie priečinka zmaže celý podstrom (46 uzlov = 46 očakávaných), **0 osirelých uzlov**; prázdny priečinok admin vidí, návštevník nie. Presun do iného priečinka appka nemá (len ▲▼), takže „presun do vlastného potomka“ nehrozí.
- **Publikovať / Export:** stiahnutý `data.json` má **presne tie isté kľúče v rovnakom poradí** ako `data.json` v repozitári (`version, pwKdf, title, subtitle, banners, bannerSettings, nodes, title_en, subtitle_en, promos, promoBanner`), odsadenie 2 medzery ako v repozitári, 16 510 uzlov zhodných na bajt + pridané; bez `aktualne`, `_lite`, `_slugFix`, `_cnt`. Verzia +1, odznak aj `sportStromVer` sa zvýšia. Export = tá istá kópia s dátumom v názve. **Generátor** so stiahnutým súborom prešiel (exit 0, 1 545 stránok, nová linka na `/tenis/spravy-a-statistiky/`, `version.txt` 1126, `data.json` _lite + `data-full.json`).
- **Import:** odľahčený `data.json` z webu odmietne so zrozumiteľnou hláškou, pokazený JSON a súbor bez `nodes` tiež; vlastný stiahnutý súbor sa naimportuje (s potvrdením).
- **Aktuálne:** zoznam sa pri prihlásení vždy načíta čerstvý z webu; prázdny názov/URL, `javascript:` URL a dátumy naopak → hláška; prázdne dátumy = stále zobrazené; len DO = zobrazené do dátumu; budúce OD = „čaká“; skončené = vysivené, po 7 dňoch po DO sa pri publikovaní samy zmažú (hláška hovorí ktoré). ▲▼, ťahanie myšou, kópia (vloží sa pod originál, bez dátumov), vypnutie, zmazanie — poradie `order` 0…n bez dier. Hromadné pridanie: náhľad správne označí chybné riadky (dátumy naopak, neznámy šport, málo polí, chýba URL), komentár `#` preskočí, duplicitnú adresu upozorní. **Publikovať Aktuálne** stiahne `aktualne.json` v rovnakom tvare ako v repozitári (kľúče `version, updated, items`, položky s 13 kľúčmi, odsadenie 1), verzia = max(web, prehliadač)+1. Ochrany fungujú: novšia verzia na webe → NEPUBLIKUJE, ponúkne zálohu; iné okno (novší `rev`) → „Úprava sa NEULOŽILA“; po obnovení stránky sa pokračuje s rozpracovanou v5 („na webe je zatiaľ v3“).
- **Úložisko:** rozpracované úpravy prežijú obnovenie stránky (IndexedDB + `sportStromDirty`), návštevník v tom istom prehliadači ich vidí (zámer). Novšia verzia na webe → hláška, záloha `sport-strom-zaloha-stare-upravy.json`, kópia sa zmaže. Bez IndexedDB (súkromné okno) → jasná hláška „NEPREŽIJE obnovenie stránky“, appka po obnovení nespadne. Staré okno (novšia verzia v localStorage) → hláška, neuloží sa.
- **Admin a výpadok dát:** keď `data.json` zlyhá a klikneš Admin, ukáže sa „Nepodarilo sa načítať dáta / Skúsiť znova“ a po úspechu sa okno hesla otvorí samo; `/#admin` hneď po štarte (celé dáta ešte nedorazili) tiež počká (p2 bod 3 funguje).
- **Bannery/promo/nastavenia:** prázdny banner (bez obrázka aj kódu) a dátumy naopak → hláška; váha 99 → 10; interval 0 → 30 (p1 bod 21 funguje); promo bez povinných polí → hláška; promo sa v sekcii Tipovanie vykreslí s bezpečnou adresou; zmena hesla vyrobí nový `pwKdf` s novou soľou, staré heslo prestane platiť hneď, nové platí aj po obnovení stránky. Zmena nastavení okamžite v hlavičke.
- **EN admin:** prihlásenie, lišta, Publikovať (rovnaké kľúče ako SK, oba jazyky) a Aktuálne (najprv `https://sportlinky.sk/aktualne.json`, potom lokálna kópia) fungujú; okná sú po slovensky (zámer — používa ich len Miro).
- **Konzola:** počas celej práce v admine **0 chýb JavaScriptu** (`pageerror`), **0 porušení CSP** z vlastného kódu (jediné CSP hlásenie vyvolal môj test s `http://` obrázkom bannera — nález 4). 404 len na ikonky testovacích domén (`/ikony/priklad.sk.png`) a EN self‑promo obrázky `/banner-sportlinking-*.png` (tie na SK builde neexistujú — bannery s `lang:en` sa síce nezobrazujú, ale ich náhľad v Správe bannerov sa sťahuje; obmedzenie lokálneho buildu, nie chyba).

## Merania

| Čo | Hodnota |
|---|---|
| Overenie hesla (PBKDF2 600 000×), desktop headless | 129–146 ms (5 pokusov) |
| Overenie hesla pri 4× / 6× spomalení CPU | 177 / 193 ms (WebCrypto beží natívne, spomalenie JS ho takmer neovplyvní) |
| Prihlásenie vrátane stiahnutia `data-full.json` (8 MB, lokálne) — desktop / iPhone 13 / Pixel 5 / 375 px | 295 / 348 / 372 / 379 ms |
| Obmedzenie počtu pokusov o heslo | žiadne (5 pokusov za ~0,7 s); hádať online sa dá ~7×/s, offline z verejného `pwKdf` neobmedzene — známe z p1/p2 (bod 13), riešené dlhým heslom |
| `data.json` z Publikovať | 9 365 462 B (v1125 + 1 linka), 11 kľúčov zhodných s repozitárom, odsadenie 2; repozitár 9 365 173 B |
| `aktualne.json` z Publikovať Aktuálne | 4 064 B, v4 (web v3), 13 položiek, odsadenie 1 |
| Generátor so stiahnutým `data.json` | exit 0, 1 545 stránok, 119 prázdnych preskočených |
| Uzly po zmazaní priečinka Tenis › Správy | −46 (očakávaných 46), osirelých 0 |
| Priečinky so súrodencami s rovnakým `order` | 6 |
| Uzly s `order_en` (▲▼ v EN admine na ne nefunguje) | 2 905 (291 priečinkov, 2 614 liniek) |
| Tlačidlá na kartách (▲▼✏️🗑) | 26×26 px; lišta 116 px široká cez text karty |
| Admin lišta na mobile (výška) | 80 px (390/393 px), 114 px (375 px); pätička odsadená 64 px |
| Okno Pridať/Upraviť linku | 624–627 px (iPhone 13 / 375 px), Uložiť pod spodným okrajom |
| Správa bannerov, riadok pri 375 px | obsah 303 px v 295 px → 🗑 orezané |
| Chyby JS / CSP porušenia vlastného kódu počas adminu | 0 / 0 |
