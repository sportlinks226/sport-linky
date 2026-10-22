# Technická previerka webu sportlinky.sk — 22. 10. 2026

**Čo som prezrel:** `index.html` (celá aplikácia), `generator.py` (statické SEO stránky), `.github/workflows/build.yml`. Súbor `data.json` som len čítal.
Generátor som raz spustil **na skúšku v dočasnom priečinku mimo repozitára**, aby som videl, čo z neho naozaj vyjde (1 545 stránok, 1 546 adries v sitemape). V repozitári som nič nezmenil, pribudla len táto správa.

**Čo som overiť nevedel:** živý web (sportlinky.sk / sportlinking.com) mi sieťové pravidlá tohto prostredia nepustili. Body, ktoré závisia od živého webu, sú označené **„overiť“**.

**Týka sa to aj anglického webu?** Áno, takmer všetko. `sportlinking` má rovnaký kód (`index.html`, `generator.py`), takže opravy treba spraviť aj tam, ako samostatnú úlohu.

**Legenda:**
- Dôležitosť: 🔴 vysoká · 🟠 stredná · 🟢 nízka
- Náročnosť opravy: **malá** (pár riadkov, do hodiny) · **stredná** (pol dňa až deň) · **veľká** (viac dní, treba premyslieť)

---

## Prehľad podľa dôležitosti

| # | Dôležitosť | Oblasť | Problém v skratke | Náročnosť |
|---|---|---|---|---|
| 1 | 🔴 | Chyba JS | V sekcii Tipovanie sa nemusí zobraziť linka Tipsport (zárobková linka) | malá |
| 2 | 🔴 | Rýchlosť | Každý návštevník z Googlu sťahuje celé dáta (9 MB, zbalené 1,7 MB) a stránka sa potom celá prekreslí | stredná až veľká |
| 3 | 🔴 | Rýchlosť | `data.json` je zbytočne veľký: slovenský web sťahuje aj anglické texty a odtlačok hesla | malá až stredná |
| 4 | 🟠 | SEO | Na 1 333 statických stránkach je v nadpise text „jp“, „de“… namiesto vlajky | malá |
| 5 | 🟠 | SEO | Domovská stránka nemá v HTML canonical a titulok je len „Športové Linky“ | malá |
| 6 | 🟠 | SEO | Domovská stránka nemá v surovom HTML žiadne odkazy na sekcie | stredná |
| 7 | 🟠 | SEO | Favicon je vložený priamo do kódu; Google ho vo výsledkoch hľadania asi neukáže | malá |
| 8 | 🟢 | SEO | hreflang na `https://sportlinky.sk` je správne (Miro overil); ostáva overiť sportlinking.com a opraviť zavádzajúci komentár | malá |
| 9 | 🟠 | Mobil | Na iPhone sa pri ťuknutí do vyhľadávania stránka sama priblíži | malá |
| 10 | 🟠 | Mobil | Prilepená hlavička zaberá na mobile asi pätinu obrazovky | malá |
| 11 | 🟠 | Mobil | Banner sa na mobile oreže po stranách | malá |
| 12 | 🟠 | Mobil | Ikonky FB/IG sú na prst príliš malé | malá |
| 13 | 🟠 | Bezpečnosť | Odtlačok admin hesla je verejný a dá sa naň skúšať hádať | malá |
| 14 | 🟠 | Bezpečnosť | Texty z dát idú do stránky bez ošetrenia | stredná |
| 15 | 🟠 | Bezpečnosť / súkromie | Ikony webov sa ťahajú z Googlu a Yandexu (posiela sa im IP návštevníka) | stredná až veľká |
| 16 | 🟠 | Bezpečnosť | Kód reklamného partnera má plný prístup k stránke | malá |
| 17 | 🟠 | Prístupnosť | Slabý kontrast niektorých textov (šedá na tmavej, biela na červenej) | malá |
| 18 | 🟢 | Chyba Python | Varovanie `invalid escape sequence '\s'` v generator.py | malá |
| 19 | 🟢 | Chyba JS | Dátum kampane bannera sa ráta podľa londýnskeho času | malá |
| 20 | 🟢 | Chyba JS | Pri neúplnej adrese ukáže canonical na vyšší priečinok | malá |
| 21 | 🟢 | Chyba JS/Python | Drobné „časované bomby“ (zlé údaje v dátach by zhodili web alebo build) | malá |
| 22 | 🟢 | Rýchlosť | Vlajky nemajú zadanú veľkosť, ikony webov sa niekedy sťahujú dvakrát | malá |
| 23 | 🟢 | SEO | Dlhé titulky a popisy, chýba `og:site_name`, robot sťahuje aj data.json | malá |
| 24 | 🟢 | SEO | Robotom sa ukazuje iná verzia stránky než ľuďom | — (len vedieť) |
| 25 | 🟢 | Prístupnosť | Štítok „+N ›“ nejde ovládať klávesnicou, emoji čítačka nahlas prečíta | malá |
| 26 | 🟢 | Prístupnosť | V appke chýbajú nadpisy sekcií, okná adminu nie sú „dialógy“ | stredná |
| 27 | 🟢 | Bezpečnosť | GitHub Actions: oprávnenia na celý workflow, akcie bez pevnej verzie | malá |
| 28 | 🟢 | Bezpečnosť | Verejný repozitár bez licencie, hoci pätička tvrdí „kopírovanie zakázané“ | malá |
| 29 | 🟢 | Dáta (info) | Duplicitné a `http://` linky, chýbajúce popisy (len na vedomie) | — |

Nižšie je každý bod rozpísaný.

---

## 1. Chyby v kóde (JavaScript, Python)

### 🔴 1. V sekcii Tipovanie sa nemusí zobraziť linka Tipsport
- **Kde:** `index.html` riadky 2457–2472 (čo sa stane, keď dorazia celé dáta) a `generator.py` riadky 286–298 (`build_boot`, ktorý dáva do štartovacieho balíka len priečinky).
- **Problém:** Domovská stránka a hlavné sekcie sa najprv vykreslia z malého „štartovacieho balíka“ (BOOT). V ňom sú **len priečinky, žiadne linky**. Keď potom dorazí celé `data.json`, appka hlavné sekcie **naschvál neprekresľuje**, aby karty neblikli. V dátach je však jedna hlavná sekcia, ktorá má linku priamo v sebe: **Tipovanie → Tipsport** (jediné dieťa tejto sekcie). Kto príde rovno na `/tipovanie/` (napr. z Googlu alebo zo zdieľaného odkazu), uvidí promo blok, ale **dlaždica Tipsport chýba**, kým neodíde inam a nevráti sa.
- **Prečo na tom záleží:** Je to zárobková (affiliate) linka. Navyše ide o tichú chybu, ktorú si sám nevšimneš, lebo ty väčšinou prichádzaš cez domovskú stránku.
- **Oprava:** V `load().then(...)` prekresliť stránku aj vtedy, keď aktuálny priečinok má priame linky. Jednoduchšie riešenie: prekresliť vždy, keď nie si na domovskej stránke. Druhá možnosť je dať do BOOT aj priame linky hlavných sekcií.
- **Náročnosť:** malá

### 🟢 18. Python varovanie `invalid escape sequence '\s'`
- **Kde:** `generator.py` riadok 636 (vnútri textu `TAKEOVER`: `/<link[^>]*hreflang=[^>]*>\s*/gi`).
- **Problém:** Python pri každom builde vypíše `SyntaxWarning`. Dnes to funguje, ale budúce verzie Pythonu z toho môžu urobiť chybu a build by spadol (workflow používa Python 3.12, takže pri zmene verzie hrozí prekvapenie).
- **Oprava:** Napísať `\\s` namiesto `\s`, prípadne z textu `TAKEOVER` spraviť „raw“ reťazec (`r"""..."""`).
- **Náročnosť:** malá

### 🟢 19. Kampaň bannera začína a končí podľa londýnskeho času
- **Kde:** `index.html` riadok 2029 (`bannerDateOk`: `new Date().toISOString()`) a rovnako v `generator.py` (DYN_JS, riadok 541).
- **Problém:** `toISOString()` vracia dátum v čase UTC. Kampaň „od 1. 11.“ sa na Slovensku zapne až o 1:00 (v lete o 2:00) a o hodinu-dve neskôr aj skončí. Aktuálne pritom počítajú so slovenským časom, takže sa to správa nejednotne.
- **Prečo na tom záleží:** Pri platenej kampani s presným začiatkom môže partner reklamovať.
- **Oprava:** Brať miestny dátum (zložiť ho z `getFullYear/getMonth/getDate`).
- **Náročnosť:** malá

### 🟢 20. Canonical môže ukázať na vyšší priečinok
- **Kde:** `index.html` riadky 1297–1299 (`updateHead`).
- **Problém:** Keď appka nevie rozlúštiť celú adresu (dáta sa nestihli načítať), správne adresu neprepíše (riadok 1087), ale canonical aj tak nastaví na priečinok, kam sa „dostala“, čiže na rodiča.
- **Prečo na tom záleží:** Roboti appku na podstránkach nepreberajú, takže Google to dnes asi nevidí. Je to však presne ten typ chyby, aký už v minulosti spôsobil problém „Stránka s presmerovaním“.
- **Oprava:** Ak cesta nie je celá (`CESTA_CELA === false`), canonical nemeniť.
- **Náročnosť:** malá

### 🟢 21. Drobné „časované bomby“ pri nezvyčajných dátach
Dnes nič z toho nenastáva (dáta som overil), ale stačí jeden nezvyčajný zápis:
- `generator.py` riadok 390: `int(a["addedAt"])`. Keby `addedAt` niekedy nebolo číslo (napr. ručne zapísaný dátum), **celý build spadne** a web sa neaktualizuje. Oprava: obaliť do `try`.
- `index.html` riadok 2064: ak by `bannerSettings.interval` v dátach chýbal alebo bol 0, delí sa nulou. `banner` potom bude `undefined`, `banner.id` vyhodí chybu a zastaví celý štart appky (už sa nevykoná ani `#admin`). Oprava: `interval || 30`.
- `generator.py` riadky 862–866: JSON-LD sa vkladá do `<script>` bez ošetrenia `</`. Keby názov priečinka obsahoval `</script>`, rozbil by stránku. Oprava: `.replace("</", "<\\/")`, ako sa to už robí pri BOOT (riadok 1081).
- Anglická appka (`nodeSlug`, riadok 1003) pri dvoch súrodencoch s rovnakým anglickým slugom nepridáva „-2“, generátor áno (riadky 242–245). Dnes takí súrodenci nie sú; keby vznikli, odkaz na druhý by v appke nefungoval.
- Komentáre v kóde uvádzajú rôzne veľkosti dát (1,4 / 3,6 / 5 / 8 MB). Skutočnosť je 9 MB, takže je dobré ich zjednotiť, aby nemýlili.
- **Náročnosť:** malá (spolu do hodiny)

---

## 2. Rýchlosť načítania

**Čísla:** `data.json` má **9,0 MB** (zbalené pri prenose asi **1,7 MB**), 16 434 položiek. `index.html` má po builde asi **150 kB**. Statická stránka má priemerne **16 kB**.

### 🔴 2. Návštevník z Googlu čaká na celé dáta a stránka sa potom „vymení“
- **Kde:** `generator.py` riadky 609–676 (`TAKEOVER`).
- **Problém:** Kto príde z Googlu na podstránku (napr. `/hokej/kluby/`), najprv vidí rýchlu statickú stránku. Na pozadí sa však stiahne celá appka a **celé data.json** a potom `document.write` zmaže celú stránku a vykreslí appku nanovo. Na pomalom mobile to môže trvať niekoľko sekúnd. Ak medzitým človek posúval stránku alebo začal čítať, obsah mu „poskočí“ a vráti ho hore.
- **Prečo na tom záleží:** Google meria rýchlosť a stabilitu u skutočných návštevníkov (Core Web Vitals) a toto ich zhoršuje. Pre človeka na mobilných dátach je to 1,7 MB pri každej prvej návšteve.
- **Oprava:** Je viac ciest, od najjednoduchšej:
  1. Appku nepreberať hneď, ale až keď ju človek naozaj potrebuje (klikne do vyhľadávania alebo na „Otvoriť v aplikácii“). Statická stránka už dnes ukazuje všetky linky.
  2. Rozdeliť dáta po športoch (`data/futbal.json`, `data/hokej.json`…) a sťahovať len to, čo treba (súvisí s bodom 3).
- **Náročnosť:** stredná (možnosť 1) až veľká (možnosť 2)

### 🔴 3. Slovenský web sťahuje aj anglické texty a odtlačok hesla
- **Kde:** `generator.py` riadky 1109–1112 (`data.json` sa kopíruje na web tak, ako je).
- **Problém:** Na slovenský web ide aj `desc_en`, `name_en`, `slug_en`, `order_en`, ktoré slovenská appka nepoužíva, a k tomu `passwordHash`. Súbor je navyše uložený s odsadením (medzery a nové riadky).
- **Koľko sa dá ušetriť (vyskúšané na kópii):** 9,0 MB → **5,2 MB** (zbalené 1,66 → **1,11 MB**, teda o tretinu menej). Mobil potom spracúva o 40 % menej dát.
- **Oprava:** Generátor zapíše do `_site` **upravenú kópiu** dát pre daný jazyk (bez nepotrebných polí, bez hesla, bez medzier). **Originál `data.json` v repozitári ani na tvojom PC sa nemení**, takže to neporušuje pravidlo o data.json. Admin si pracovné dáta berie z IndexedDB, resp. z importu (treba len overiť, že admin na webe nepotrebuje anglické polia, alebo pre admin ponechať plný súbor pod iným menom).
- **Náročnosť:** malá až stredná

### 🟢 22. Drobnosti pri obrázkoch a ikonách
- **Vlajky bez rozmerov:** `index.html` riadok 1238. `<img>` vlajky nemá `width`/`height`, takže po načítaní sa text posunie. Oprava: doplniť rozmery podľa `flagSize`. *(malá)*
- **Ikony webov dvakrát:** riadky 1744–1760. Pri webe so 16 px ikonou sa najprv stiahne obrázok z Googlu a potom ešte z Yandexu, teda 2 požiadavky na jednu dlaždicu. V sekciách so stovkami klubov sa to nasčítava (pomáha síce `loading="lazy"`). Dlhodobé riešenie je v bode 15. *(stredná)*
- **Chýba `preconnect`** k `www.google.com` a `flagcdn.com`, čo by zrýchlilo prvé ikony o pár desiatok milisekúnd. *(malá)*

**Čo je už dobré:** štartovací balík BOOT, `?v=` verzia dát kvôli pamäti prehliadača, `version.txt`, odložené sťahovanie dát po `load`, index detí (`childrenOf`) a oneskorené vyhľadávanie (debounce).

---

## 3. Mobil — zobrazenie a ovládanie

### 🟠 9. iPhone pri ťuknutí do vyhľadávania priblíži stránku
- **Kde:** `index.html` riadok 52 (`.h-search input{... font-size:0.88rem ...}`).
- **Problém:** Safari na iPhone automaticky priblíži stránku, keď má políčko písmo menšie ako 16 px (tu je to 14 px). Po napísaní ostane stránka priblížená a treba ju ručne oddialiť.
- **Oprava:** V `@media(max-width:560px)` dať `.h-search input{font-size:16px}`.
- **Náročnosť:** malá

### 🟠 10. Prilepená hlavička zaberá veľa miesta
- **Kde:** `index.html` riadky 30–36 (`position:sticky`) a 389–393.
- **Problém:** Na mobile má hlavička logo, podnadpis, počítadlo a pod tým vyhľadávanie na celú šírku. Dokopy je to zhruba 130 px, ktoré sú **stále prilepené hore**. Na bežnom telefóne je to asi pätina obrazovky.
- **Oprava:** Na mobile hlavičku neprilepiť, prípadne skryť podnadpis a počítadlo, keď človek posunie stránku nižšie.
- **Náročnosť:** malá

### 🟠 11. Banner sa na mobile oreže
- **Kde:** `index.html` riadky 95 (`object-fit:cover`) a 410 (`.banner-slot{height:50px}`). Statické stránky: `generator.py` riadky 474–476.
- **Problém:** Banner 468×60 sa na úzkom mobile zmestí do rámčeka asi 296×50. Kvôli `cover` sa obrázok **odreže po stranách** (zhruba štvrtina šírky), takže môže zmiznúť logo alebo text partnera.
- **Oprava:** Na mobile `object-fit:contain` alebo výšku dopočítať zo šírky (`aspect-ratio:468/60; height:auto`).
- **Náročnosť:** malá

### 🟠 12. Ikonky FB/IG sú na prst malé
- **Kde:** `index.html` riadky 397–401.
- **Problém:** Na mobile majú 20×20 px a sedia tesne pri hlavnej linke. Odporúčaná veľkosť dotykového cieľa je aspoň 44–48 px, takže človek ľahko ťukne vedľa.
- **Oprava:** Zväčšiť klikaciu plochu (napr. `padding`) a obrázok nechať malý.
- **Náročnosť:** malá

### 🟢 Ďalšie drobnosti na mobile
- Efekty „pri prejdení myšou“ (karty sa nadvihnú) ostanú na dotykovom displeji „zaseknuté“ po ťuknutí. Riešenie: obaliť do `@media(hover:hover)`. *(malá)*
- Promo blok v Tipovaní má na mobile min. výšku 250 px a je **nad** linkami (riadky 107 a 412–414). Je to vedomé rozhodnutie, len na zváženie.
- Štítky „LIGA“ a „NEW“ majú písmo okolo 9 px (`0.55rem`, riadky 225 a 376), čo sa na mobile ťažko číta.

**Čo je dobré:** `viewport` je nastavený správne, mriežky sa na 320 px zalomia do jedného stĺpca, Aktuálne majú posun do strany so štítkom „+N“ a admin lišta sa zalamuje.

---

## 4. Technické SEO statických stránok

Výsledok skúšobného buildu: **1 545 stránok**, **0 duplicitných titulkov**, **0 duplicitných popisov**, každá stránka má canonical, hreflang (sk, en, x-default), Open Graph a BreadcrumbList. Toto je veľmi dobrý stav. Nižšie je, čo sa dá ešte zlepšiť.

### 🟠 4. V nadpisoch je „jp“, „de“… namiesto vlajky (1 333 stránok)
- **Kde:** `generator.py` riadky 728 a 515 (`<h1><span class="ic">{icon}</span>...`) a riadok 760 (karty priečinkov).
- **Problém:** Pri krajinách je ikona uložená ako kód krajiny (`jp`). Appka z neho spraví vlajku, ale statická stránka ho vypíše **ako text**. Google tak vidí nadpis `jpJaponsko` a karty `de Nemecko`. Týka sa to 1 333 z 1 545 stránok.
- **Prečo na tom záleží:** Nadpis H1 je pre Google jeden z najdôležitejších textov na stránke a „jp“ v ňom je šum (a pre človeka pri chybe JavaScriptu aj čudný vzhľad).
- **Oprava:** V generátore rozpoznať kód krajiny rovnakým pravidlom ako appka (`^[a-z]{2}(-[a-z]{2,4})?$`) a namiesto textu vložiť `<img>` vlajky s `alt=""` alebo ikonu vynechať. To isté platí pre karty.
- **Náročnosť:** malá

### 🟠 5. Domovská stránka: chýba canonical a titulok je len názov webu
- **Kde:** `index.html` riadok 6 (`<title>Športové Linky</title>`), `generator.py` riadky 1098–1105 (domovu sa pridáva len hreflang).
- **Problém:** Podstránky majú canonical priamo v HTML, domov ho dostane až cez JavaScript. Titulok domova neobsahuje žiadne slovo, ktoré ľudia hľadajú (napr. „športové weby“, „linky na kluby“).
- **Oprava:** Generátor nech domovu doplní `<link rel="canonical" href="https://…/">` a titulok rozšíri napr. na „Športové Linky — rozcestník športových webov, klubov a líg“.
- **Náročnosť:** malá

### 🟠 6. Domovská stránka nemá v surovom HTML odkazy na sekcie
- **Kde:** `index.html` riadok 497 (`<main id="main"></main>` je prázdny, dlaždice dokreslí až JavaScript z BOOT).
- **Problém:** Google si JavaScript spustí, ale neskôr a nie vždy. Iné vyhľadávače (Bing, Seznam) a náhľady na sociálnych sieťach JavaScript často nespúšťajú vôbec. Z pohľadu robota je domov bez odkazov dovnútra webu, pričom domov je najsilnejšia stránka webu.
- **Oprava:** Rovnako ako `inject_aktualne()` (riadky 402–417) vložiť pri builde do `<main>` hotové dlaždice hlavných sekcií. Appka ich po štarte prekreslí na to isté.
- **Náročnosť:** stredná

### 🟠 7. Favicon je vložený priamo do kódu (data:)
- **Kde:** `index.html` riadok 8, `generator.py` riadky 489–495.
- **Problém:** Ikona webu je zapísaná priamo v HTML ako `data:image/svg+xml,...`. Google vo výsledkoch hľadania ukazuje favicon len vtedy, keď má **vlastnú adresu** (súbor), ktorú jeho robot vie stiahnuť. Pri vloženom obrázku sa vo výsledkoch zrejme ukáže všeobecná zemeguľa. Chýba aj `/favicon.ico` (prehliadače sa naň pýtajú samy a dostanú 404) a `apple-touch-icon` (ikona pri „Pridať na plochu“ v iPhone).
- **Oprava:** Pridať súbory `favicon.svg`, `favicon-48.png` (alebo `favicon.ico`) a `apple-touch-icon.png` (180×180), odkázať na ne v `<head>` a v generátore ich kopírovať do `_site`.
- **Náročnosť:** malá (overiť po nasadení v Google vyhľadávaní, trvá to týždne)

### 🟢 8. hreflang a adresa s „www“ — slovenská časť OVERENÁ, je v poriadku
- **Výsledok overenia (Miro, 22. 10. 2026):** `https://sportlinky.sk` ostáva bez www, takže hlavná adresa je **bez www** a `_ALT_DEFAULTS` pre slovenský web je **správne**. Problém, ktorého som sa obával, pri slovenskom webe nenastáva.
- **Čo ešte ostáva:**
  1. Rovnako overiť `https://sportlinking.com` (či sa neprepne na `www.sportlinking.com`). Ak ostane bez www, je všetko v poriadku.
  2. Komentár v `generator.py` riadok 70 tvrdí, že slovenský web beží na „www.sportlinky.sk“. To nesedí a pri budúcich úpravách to môže zmiasť, preto ho treba opraviť na „sportlinky.sk“. *(malá)*

Pôvodný popis pre úplnosť:
- **Kde:** `generator.py` riadok 66: `_ALT_DEFAULTS = {"sk": "https://sportlinky.sk", "en": "https://sportlinking.com"}`.
- **Problém:** Komentár o pár riadkov nižšie (riadok 70) hovorí, že slovenský web beží na **www**.sportlinky.sk. Anglický build preto v hreflang odkazuje na `https://sportlinky.sk/...` **bez www**. Ak je hlavná adresa s www, každý takýto odkaz ide cez presmerovanie a Google to hlási ako chybu hreflang („odkaz na nekanonickú stránku“).
- **Ako overiť:** Otvor v prehliadači `https://sportlinky.sk` a pozri, či adresa zostane bez www, alebo sa prepne na www. Potom to isté pre `sportlinking.com`. Alebo pozri v Search Console → Medzinárodné zacielenie.
- **Oprava:** Dať do `_ALT_DEFAULTS` presne tú adresu, ktorá je v canonical druhého webu (alebo ju nastaviť cez `ALT_BASE_URL` v build.yml).
- **Náročnosť:** malá

### 🟢 23. Drobnosti
- **110 titulkov má viac ako 65 znakov.** Google ich v hľadaní skráti, napr. „Litovské kluby v Optibet Hokeja līge — Litva · Hokej — Športové Linky“. Dá sa to vyriešiť tak, že pri dlhom titulku sa vynechá šport. *(malá)*
- **781 popisov má viac ako 160 znakov.** Google ich skráti. Nie je to chyba, len na tvoju úvahu pri písaní popisov (návrhy patria do `navrhy/`). *(—)*
- **Chýba `og:site_name` a `og:locale`** a všetky stránky zdieľajú jeden `og-image.png`. *(malá)*
- **robots.txt** (`generator.py` riadok 1008) púšťa robotov aj na `data.json` (9 MB), čo im zbytočne míňa „rozpočet“. Riadok `Disallow: /data.json` by nevadil, lebo roboti appku nepreberajú. *(malá)*
- Domovu by mohla pomôcť štruktúrovaná značka `WebSite` (názov webu vo výsledkoch). *(malá)*
- `x-default` ukazuje na anglický web aj zo slovenských stránok. Je to vedomá voľba (priorita EN trhu) a je v poriadku.

### 🟢 24. Roboti vidia inú verziu než ľudia (len na vedomie)
- **Kde:** `generator.py` riadok 617 (zoznam robotov podľa `navigator.userAgent`).
- **Čo to je:** Robotom sa nechá statická stránka, ľuďom sa vymení za appku. Google to volá „dynamické vykresľovanie“ a toleruje ho, kým je obsah rovnaký (u teba je), no označuje ho za dočasné riešenie. Ak sa vyrieši bod 2 (appka sa nepreberá hneď), tento rozdiel zmizne sám.

---

## 5. Prístupnosť

### 🟠 17. Slabý kontrast niektorých textov
Namerané pomery (norma WCAG žiada pre bežný text aspoň **4,5 : 1**):

| Text | Kde | Pomer |
|---|---|---|
| Adresa webu na karte (`.ur`) a pätička na statických stránkach, `#5f7183` | `generator.py` riadky 470, 485 | **3,05–3,53** ❌ |
| Biela na červenej (štítky LIGA, NEW, tlačidlá) | `index.html` riadky 225, 376, 113 | **3,97** ❌ (a písmo okolo 9 px) |
| Červený text na tmavom pozadí („AKTUÁLNE“, nadpisy na statických stránkach) | `index.html` 485, `generator.py` 464 | **4,47** (tesne pod hranicou) |
| Bežný šedý text `#90a5b7` | `--muted` | 5,75–6,97 ✅ |

- **Oprava:** `#5f7183` zosvetliť napr. na `#8396a8`, červenú pre text o odtieň zosvetliť (napr. `#ef5a5a`) a štítkom LIGA/NEW dať väčšie a tučnejšie písmo alebo tmavšiu červenú.
- **Náročnosť:** malá

### 🟢 25. Drobnosti
- Štítok „+N ›“ pri Aktuálnych (`index.html` riadok 493) je `<span onclick>`, takže sa nedá ovládať klávesnicou ani ho neohlási čítačka. Oprava: `<button>` s `aria-label`. *(malá)*
- Emoji ikony (⚽, 🏒…) čítačka obrazovky prečíta nahlas pred každým názvom. Oprava: obaliť do `<span aria-hidden="true">`. *(malá)*
- Blikajúca bodka pri „Aktuálne“ (riadok 486) ignoruje nastavenie „obmedziť pohyb“, karty ho rešpektujú (riadok 249). *(malá)*

### 🟢 26. Štruktúra pre čítačky
- V appke je jediný nadpis H1, a to logo. Názov sekcie, v ktorej človek je, nie je nadpis, takže čítačka nevie „skočiť“ na obsah. *(malá až stredná)*
- Okná adminu (`.mo`) nemajú `role="dialog"` a kurzor klávesnice z nich „uteká“. Používaš ich však len ty, takže nízka priorita. *(stredná)*

**Čo je dobré:** `lang="sk"`, vyhľadávanie má `aria-label`, ikonky FB/IG majú `aria-label`, dlaždice sú skutočné odkazy (`<a href>`), Escape zatvára okná a animácie rešpektujú `prefers-reduced-motion`.

---

## 6. Bezpečnosť (repozitár je verejný)

**Najprv dôležité upokojenie:** admin režim beží **len v prehliadači**. Nikto cudzí ním nevie zmeniť živý web, lebo zmena sa na web dostane, len keď **ty** nahráš `data.json` na GitHub. Kto by heslo obišiel, pokazí si nanajvýš vlastný prehliadač. Skutočnou „bránou“ webu je tvoj GitHub účet (odporúčam mať na ňom zapnuté dvojfázové overenie).

### 🟠 13. Odtlačok admin hesla je verejný
- **Kde:** `data.json` (pole `passwordHash`, ide aj na web) a `index.html` riadok 682 (v `DEFAULT` je ďalší, starší odtlačok).
- **Problém:** Je to SHA-256 **bez „soli“**. Ktokoľvek si ho stiahne a doma môže skúšať milióny hesiel za sekundu. Krátke alebo slovníkové heslo uhádne rýchlo. Pre web to nebezpečné nie je (pozri vyššie). Nebezpečné je, ak **rovnaké alebo podobné heslo používaš aj inde** (e-mail, GitHub, banka).
- **Oprava:**
  1. Over, že admin heslo nepoužívaš nikde inde. Ak áno, zmeň ho tam.
  2. Generátor nech pri kopírovaní na web pole `passwordHash` vynechá (súvisí s bodom 3). Admin si heslo overí z lokálnych dát. Treba vyskúšať, ako sa to zíde s tým, ako dnes otváraš admin na webe.
  3. Starý odtlačok v `DEFAULT` (riadok 682) nahradiť prázdnym.
- **Náročnosť:** malá

### 🟠 14. Texty z dát idú do stránky bez ošetrenia
- **Kde:** `index.html` napr. riadky 1394, 1418, 1448–1449 (`nName`, `nDesc`), 1445 a 1677 (`href="${n.url}"`), 2366–2369 (Aktuálne), 2082–2083 (bannery). Statické stránky: `generator.py` riadky 582–583.
- **Problém:** Názvy, popisy a adresy sa vkladajú do HTML tak, ako sú. Dáta pritom vo veľkom plnia AI modely z obsahu cudzích webov. Ak sa do názvu dostane `<` alebo adresa typu `javascript:...`, v lepšom prípade sa rozbije vzhľad, v horšom sa u návštevníka spustí cudzí kód. **Dnes v dátach nič také nie je** (overil som: 0 textov s `<` alebo `>`, všetky URL začínajú `http`).
- **Oprava:** Všade použiť existujúcu funkciu `attrEsc()` (riadok 965) a pri URL povoliť len `http://` a `https://`. Generátor to už robí správne (`escape`), okrem záložného skriptu DYN_JS.
- **Náročnosť:** stredná (veľa miest, ale mechanická práca)

### 🟠 15. Ikony webov z Googlu a Yandexu
- **Kde:** `index.html` riadky 1718, 1744, 1756.
- **Problém:** Pri každej dlaždici prehliadač návštevníka pošle Googlu (a pri malých ikonách aj ruskému **Yandexu**) svoju IP adresu a informáciu, ktorý web si práve prezerá. Podľa GDPR ide o prenos osobných údajov tretej strane bez súhlasu a pri Yandexe aj mimo EÚ. Okrem toho, ak služba vypadne alebo zmení správanie, ikony zmiznú.
- **Oprava:** Ikony stiahnuť raz pri builde (GitHub Actions), uložiť na vlastný web a appka by ich brala odtiaľ. Rýchlejšia polovičná cesta: aspoň vypnúť Yandex.
- **Náročnosť:** stredná (polovičná cesta: malá), celé riešenie: veľká

### 🟠 16. Kód reklamného partnera má plný prístup k stránke
- **Kde:** `index.html` riadky 1501 a 1512–1519 (promo blok), 2072–2080 (bannery); v dátach je to `ban.tipsport.sk/c/rotateA.php`.
- **Problém:** Partnerský skript beží s rovnakými právami ako tvoj vlastný kód. Ak by partnerov server niekto napadol, môže na tvojom webe zobraziť čokoľvek alebo návštevníkov presmerovať. Je to bežná prax pri affiliate, no dobré je o tom vedieť.
- **Oprava:** Pridať `Content-Security-Policy` (cez `<meta http-equiv>`, GitHub Pages hlavičky nastaviť nevie) so zoznamom povolených domén, prípadne vložiť banner do `<iframe sandbox>`, ak to partner dovolí.
- **Náročnosť:** malá až stredná (CSP treba opatrne vyskúšať, aby nič nezablokovala)

### 🟢 27. GitHub Actions
- **Kde:** `.github/workflows/build.yml` riadky 19–22 a 32–37, 64, 75.
- **Problém:** Oprávnenie `contents: write` platí pre celý workflow (aj pre krok nasadenia, ktorý ho nepotrebuje) a akcie sú zadané verziou `@v4` namiesto pevného odtlačku (SHA). Ide o oficiálne akcie GitHubu, takže riziko je malé.
- **Oprava:** Presunúť `permissions` k jednotlivým úlohám (build: `contents: write`; deploy: `pages: write`, `id-token: write`). Pripnutie na SHA je voliteľné.
- **Náročnosť:** malá
- **Čo je dobré:** `[skip ci]` proti nekonečnej slučke, `continue-on-error` pri commite sitemapy, `concurrency` pre Pages. V histórii repozitára som nenašiel heslo v čitateľnej podobe ani e-mailové adresy v dátach.

### 🟢 28. Verejný repozitár bez licencie
- **Problém:** Pätička hovorí, že kopírovanie databázy je zakázané, no celé `data.json` je verejne na GitHube. Súbor `LICENSE` chýba. Bez licencie síce platí „všetky práva vyhradené“, ale výslovný súbor to jasne povie každému, kto repozitár otvorí.
- **Oprava:** Pridať `LICENSE` s textom „Všetky práva vyhradené“ a odkazom na ochranu databáz. Prípadne zvážiť súkromný repozitár (GitHub Pages zo súkromného repozitára vyžaduje platený plán).
- **Náročnosť:** malá

---

## 29. Postrehy k dátam (len na vedomie, data.json som NEMENIL)
- **349 adries** sa v dátach vyskytuje viackrát (môže byť zámer, napr. jedna federácia vo viacerých sekciách).
- **17 liniek** začína `http://` (bez zabezpečenia). Niektoré weby už možno fungujú cez `https://`.
- **116 priečinkov** nemá popis (z nich sa na web dostanú len tie, ktoré majú linky; generátor pre ne vymyslí náhradný popis).
- Ak chceš, môžem tieto zoznamy vypísať do samostatného súboru v `navrhy/`.

---

## Odporúčané poradie práce
1. **Bod 1 (Tipsport v Tipovaní)**: malá oprava a priamo súvisí so zárobkom.
2. **Body 9, 10, 11, 12 (mobil)** a **4, 5 (SEO)**: všetko malé opravy s viditeľným efektom, dajú sa spraviť naraz v jednom PR.
3. **Body 13 a 3 (heslo a menšie data.json)**: spolu v jednom PR v generátore.
4. **Body 7, 8, 17**: favicon súbory, overenie www pri sportlinking.com a farby.
5. **Body 2, 6, 14, 15**: väčšie zmeny, každú najprv naplánovať samostatne.

Všetko platí aj pre anglický web **sportlinking**. Každú opravu treba urobiť v oboch repozitároch (samostatnou úlohou).
