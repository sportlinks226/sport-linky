# Deploy visí v „syncing_files“ — rozbor a návrh (Zadanie 55, 10.11.2026)

## Problém

Workflow **Build & Deploy** od 9.11.2026 (večer) často zlyhá v úlohe `deploy`:
`actions/deploy-pages@v5` 10 minút vypisuje `Current status: syncing_files`
a skončí `Timeout reached, aborting!` (potom nasadenie sám zruší — „Canceled deployment“).
Úloha `build` prejde za 17–20 s, artefakt `github-pages` má ~22,3 MB (zbalený).
Keď deploy zlyhá, nespustí sa `en-build` ani **Test webu** a web ostane na starej verzii.

Zlyhali: #466, #469 (aj „Re-run failed jobs“), #471, #472. Prešli: #467, #470 (za 1 min 45 s).

## 1. Čo je v artefakte

Lokálny build `python generator.py --out _site` (kópia repozitára mimo repa, BASE_URL=https://sportlinky.sk),
stav main `be28667` (data.json verzia 1133):

| Časť | Súborov | Veľkosť (nezbalená) |
|---|---:|---:|
| Stránky priečinkov (`*/index.html`) | 1 545 | 46,14 MB |
| JSON + version.txt (data.json 5,5 MB, data-full.json 8,0 MB, aktualne.json) | 4 | 13,52 MB |
| `ikony/` | 8 130 | 12,28 MB |
| `vlajky/` | 1 617 | 1,47 MB |
| `index.html` + `404.html` | 2 | 0,82 MB |
| sitemap.xml, robots.txt, favicony, og-image | 6 | 0,78 MB |
| PWA (manifest, sw.js, 3 obrázky) | 5 | 0,03 MB |
| Presmerovania starých slugov (Zadanie 52) | 2 | ~0 MB |
| **Spolu** | **11 311** | **75,04 MB** |

Zbalený artefakt ~22 MB sedí s tým, čo ukazuje GitHub.

### Zbytočnosti v artefakte

- symbolické odkazy: **0**, skryté súbory: **0**, `__pycache__`/`.pyc`/zálohy (`.bak`, `~`, `.orig`): **0**;
- duplicitný obsah: 509 kópií (502 v `ikony/`, 7 vo `vlajky/`; napr. jedna rovnaká ikonka 243×),
  spolu ~0,6 MB — **zanedbateľné**, nie je dôvod to riešiť.

## 2. Porovnanie so stavom pred 7.–9.11.

| Stav | Súborov | Veľkosť |
|---|---:|---:|
| Pred Zadaním 50 (commit `ca3d741`, 7.11., vlastné dáta) | 11 295 | 74,32 MB |
| Starý kód `ca3d741` + dnešné dáta | 11 304 | 74,39 MB |
| Dnes (`be28667`) | 11 311 | 75,04 MB |

Pribudlo **16 súborov** (5 PWA, 2 presmerovania, 9 nových ikoniek) a **~0,7 MB (~1 %)**
(väčšie stránky po Zadaní 50–54). Počet ani veľkosť súborov sa podstatne **nezmenili**.

## 3. Koľko súborov zmení nová verzia dát

Dva buildy z rovnakých súborov, líšia sa len `"version": 1133` → `1134` (na kópii data.json):

| Porovnanie | Zmenených súborov | Veľkosť zmenených |
|---|---:|---:|
| Build A vs. build B (nič sa nezmenilo) | **0** z 11 311 | 0 MB |
| Verzia N → N+1, dnešný kód | **1 550** z 11 311 | 60,5 MB |
| Verzia N → N+1, starý kód zo 7.11. | **1 550** z 11 295 | 59,8 MB |

Zmenia sa: všetkých 1 545 stránok + `index.html`, `404.html`, `data.json`, `data-full.json`, `version.txt`.

**Predpoklad potvrdený:** každá stránka má verziu na **2 miestach**:
1. v zabudovaných dátach stránky: `{"version":"1133","nodes":[…]}` (generator.py, `pb = {"version": DATA_VER, …}`),
2. v adrese dát: `fetch("../data.json?v=1133")` (generator.py, `data_url`).

Ale: **takto to bolo aj pred 7.11.** (rovnakých 1 550 súborov) — nie je to nová vec.

## 4. Kľúčové zistenie: príčina je na strane GitHub Pages

| Beh | Dátum (UTC) | Čo sa zmenilo | Súborov odlišných od živého webu | Výsledok |
|---|---|---|---:|---|
| #459–#464 | 9.11. 12:53–17:22 | dáta, verzia 1129 → 1131 | ~1 550 | **prešli** za ~2 min |
| #465 | 9.11. 19:43 | Zadanie 54a (kód) | všetky stránky | prešiel za 2 min |
| #466 | 9.11. 20:18 | **len aktualne.json** (verzia ostala 1131) | **5** | **zlyhal** (timeout) |
| #467 | 9.11. 20:34 | aktualne.json | málo | prešiel za 1:45 |
| #469 | 10.11. 10:27 | data.json 1131 → 1132 | ~1 550 | **zlyhal**, aj „Re-run failed jobs“ zlyhal |
| #470 | 10.11. 10:54 | ten istý data.json znova (1132) | ~1 550 | prešiel za 1:45 (samotný deploy 8 s) |
| #471 | 10.11. 11:14 | data.json 1132 → 1133 | ~1 550 | **zlyhal** |
| #472 | 10.11. 11:26 | ten istý data.json znova (1133) | ~1 550 | **zlyhal** |

(Počet „odlišných súborov“ pri #466 je zmeraný lokálne: build `c17fc7e` vs. `2882e19` → 5 súborov:
404.html, index.html, aktualne.json, data.json, 1 stránka.)

Závery:
- **Beh #466 zlyhal, hoci sa oproti živému webu líšilo len 5 súborov.** Počet zmenených súborov
  teda príčinou nie je — inak by #466 prešiel a #459–#464 (1 550 zmenených) by zlyhali.
- **Mirova skúsenosť:** pri #469 „Re-run failed jobs“ (ten istý artefakt, nový pokus deploy) skončil
  znova chybou; pomohol až nový beh po novom nahratí súboru (#470) — a pri #472 nepomohol ani ten.
  **Automatický druhý pokus sa zatiaľ NEROBÍ.** (Podrobný rozbor logov je v časti 5b.)
- Zmeny zo 7.–9.11. (PWA — Zadanie 50, presmerovania — Zadanie 52, neskoršie ikonky, Zadanie 51 a 54)
  artefakt takmer nezmenili (+16 súborov, +1 %). **Príčina je takmer určite na strane GitHub Pages**
  (spomalené ukladanie súborov od 9.11. večer), nie v našom kóde. Verejné hlásenie konkrétnej
  poruchy na tieto dni som nenašiel.

## 5. Poistka „dlhší limit“ — NEFUNGUJE (zistené 10.11.2026, zmena vrátená)

Pôvodný nápad: kroku `actions/deploy-pages@v5` dať `with: timeout: 1800000` (30 minút) a úlohe
`deploy` `timeout-minutes: 35`. **Akcia to však nedovolí.** Overené v zdrojovom kóde presne tej verzie,
ktorú používame (`v5` = `v5.0.1` = commit `368f825`, rovnaký SHA je v logu behu
„Download action repository 'actions/deploy-pages@v5' (SHA:368f8252…)“), súbor `src/internal/deployment.js`:

```js
const MAX_TIMEOUT = 600000
…
if (Number(core.getInput('timeout')) > MAX_TIMEOUT) {
  core.warning(`Warning: timeout value is greater than the allowed maximum - timeout set to the maximum of ${MAX_TIMEOUT} milliseconds.`)
}
this.timeout = !timeoutInput || timeoutInput <= 0 ? MAX_TIMEOUT : Math.min(timeoutInput, MAX_TIMEOUT)
```

Hodnota 1 800 000 by sa skrátila späť na 600 000 ms (10 minút), pribudlo by len varovanie.
**Zmena z build.yml bola preto vyhodená** (aj `timeout-minutes: 35` — bez dlhšieho čakania kroku nemá zmysel).
build.yml je v tomto zadaní nezmenený.

## 5b. Čo ukázali logy úlohy deploy

Akcia pri nasadení pošle `pages_build_version` = SHA commitu. GitHub nevráti vlastné ID, preto akcia
používa ako ID nasadenia **SHA commitu** („Created deployment for <SHA>, ID: <SHA>“). Stav aj zrušenie
sa pýtajú cez `/pages/deployments/<SHA>`. Pri vypršaní limitu akcia nasadenie **sama zruší**
(v každom zlyhanom logu je „Canceled deployment with ID <SHA>“).

| Beh | Priebeh stavov | Výsledok |
|---|---|---|
| #466 (5 odlišných súborov) | `syncing_files` celých 10 min | timeout |
| #469 pokus 1 | `deployment_queued` 20 s → `syncing_files` 10 min | timeout, zrušené |
| #469 pokus 2 („Re-run failed jobs“, **to isté ID = SHA**) | hneď `syncing_files` (bez `deployment_queued`) 3,5 min → **`finished_file_sync`** 6,5 min | timeout, zrušené |
| #470 (nový commit, **rovnaký obsah** ako #469) | prvá kontrola po 5 s: `succeed` | **úspech za 8 s** |
| #471 | `deployment_queued` 1 min → `syncing_files` 9 min | timeout, zrušené |
| #472 (nový commit, rovnaký obsah ako #471) | `syncing_files` celých 10 min | timeout, zrušené |

Čo z toho vyplýva:
- **Opakovaný pokus s tým istým ID nenarazil na predošlé zaseknuté nasadenie.** To bolo zrušené
  (akcia to robí sama). Keby sa druhý pokus pozeral na staré zrušené nasadenie, akcia by hneď skončila
  hláškou „Deployment cancelled.“. Namiesto toho druhý pokus #469 pokročil **ďalej** ako prvý
  (súbory dobehli, stav `finished_file_sync`) a zasekol sa až v poslednej fáze (prepnutie webu).
  Či zdieľané ID tú poslednú fázu nejako ovplyvnilo, sa z logov dokázať nedá.
- **Zrušiť zaseknuté nasadenie pred novým pokusom už nie je čo** — akcia to robí sama pri každom timeoute.
  Ďalšie ručné/automatické zrušenie by nič nezmenilo.
- **GitHub si zrejme pamätá už nahraté súbory medzi pokusmi:** #469 pokus 2 preskočil frontu a súbory
  dobehli za 3,5 min; hneď nato #470 s rovnakým obsahom prešiel za 8 s. Keď sa však predošlý pokus
  nedostal ďaleko (#471 → #472), ďalší pokus nepomohol.
- Pomalé je teda ukladanie súborov na strane GitHub Pages. Trvá 10 min aj pri 5 zmenených súboroch (#466),
  takže GitHub zrejme spracúva celý artefakt (11 311 súborov), nielen zmenené súbory.

## 5c. Iné poistky (len návrh, nič nie je urobené — rozhodne Miro)

> **Stav 10.11.2026:** poistka 1 bola zavedená — pull request
> [#61](https://github.com/sportlinks226/sport-linky/pull/61) (Zadanie 55b, vetva `z55-deploy-druhy-pokus`).
> Urobená inak, než je tu pôvodne opísané: nie samostatná úloha, ale v tej istej úlohe `deploy`
> (1. pokus s `continue-on-error`, 5 min čakanie, 2. pokus len po zlyhaní 1.). Preto netreba meniť
> podmienky en-build ani Test webu — po úspešnom 2. pokuse je beh zelený.
> EN web (sportlinking) zatiaľ bez zmeny. Poistky 2 a 3 nezavedené.

1. **Automatický „dobiehací“ deploy o pár minút neskôr** (samostatná úloha `deploy-znova`,
   spustí sa len keď `deploy` zlyhá, najprv počká ~5 min, potom znova `deploy-pages` s tým istým artefaktom).
   Robí to isté, čo pri #469 → #470 pomohlo, len bez ručného nahrávania. Riziká: deploy môže trvať
   až ~25 min; ak GitHub nestihne ani druhý pokus (#471 → #472), nepomôže; workflow bude zložitejší
   (`en-build` musí počkať na ktorýkoľvek úspešný pokus; celý beh skončí červený, ak prvý pokus zlyhal,
   takže **Test webu by sa nespustil** — riešiteľné, ale treba upraviť aj podmienky).
2. **Menej súborov v artefakte** (ak GitHub spracúva celý artefakt): 9 747 z 11 311 súborov (86 %)
   sú ikonky a vlajky, ktoré sa takmer nemenia. Dali by sa zbaliť do pár väčších súborov (napr. jedna
   „mapa ikoniek“) — väčší zásah do generator.py, index.html a sw.js (1–2 zadania). Zmysel má, len ak
   problém potrvá dlhšie.
3. **Nič nemeniť, len vedieť, že web sa dorovná sám:** nočný build (cron) nasadí web znova;
   a ručne stačí „Re-run all jobs“ alebo nové nahratie, keď GitHub opäť zrýchli.
   Pri pretrvávajúcom probléme nahlásiť GitHub podpore (s odkazmi na behy #466, #469, #471, #472).

## 6. Návrh trvalého riešenia (NEROBÍ SA — rozhodne Miro)

### Cieľ
Pri bežnej zmene dát meniť len pár súborov (`data.json`, `data-full.json`, `version.txt`, `index.html`,
`sitemap.xml` a stránky, ktorých obsah sa naozaj zmenil) — nie všetkých 1 545 stránok.

### Ako
1. Zo stránok priečinkov vynechať číslo verzie:
   - v zabudovaných dátach stránky (`pb`) bez `"version"` (alebo konštantná hodnota);
   - `fetch("../data.json?v=NNN")` nahradiť tým, že si stránka najprv zistí verziu z `version.txt`
     (už dnes sa pýta `cache:'no-store'`, 2,5 s limit) a potom stiahne `data.json?v=<verzia z version.txt>`.
     index.html (appka) už túto logiku má (`verPromise`), stránkam priečinkov by sa len zjednodušil štart.
2. Domovská `index.html` a `404.html` môžu verziu ponechať (sú to 2 súbory).
3. Overiť dvomi buildmi (verzia N vs. N+1), že sa zmení ≤ 10 súborov.

### Výhody
- Pri bežnom nahratí dát sa zmení ~5–10 súborov namiesto 1 550 (~60 MB) → rýchlejšie nasadenie,
  menej práce pre CDN GitHub Pages.
- `sitemap-lastmod.json` už teraz nehľadí na verziu, takže SEO dátumy sa nezmenia.
- Prehliadače (a service worker) nebudú zbytočne sťahovať nové HTML stránok, keď sa ich obsah nezmenil.

### Riziká
- **Cache prehliadača:** stránka bez verzie v adrese musí vždy počkať na `version.txt`. Ak nepríde do 2,5 s,
  treba záložný postup (napr. `data.json` s `cache:'no-cache'`), inak by návštevník mohol vidieť staršie dáta.
  Jedno kolo siete navyše (`version.txt` je pár bajtov, dnes sa už aj tak sťahuje súčasne s data.json).
- **PWA service worker (sw.js):** stránky ukladá podľa adresy bez `?parametrov` a `data.json` cez sieť
  (offline posledná kópia, `ignoreSearch`). Funguje aj bez verzie v stránke, ale treba overiť offline režim
  a to, že po novej verzii dát appka nezobrazí starú kópiu z pamäte.
- **Test webu (testy/test_webu.py):** test kontroluje verziu v data.json a podstrkuje `version.txt`
  (oznam „⚠️ vN ešte nie je na webe“). Testy, ktoré čítajú verziu zo stránok, treba upraviť;
  pridať test „zmena len verzie mení ≤ 10 súborov“.
- **Bez záruky, že to vyrieši súčasné zlyhania:** beh #466 zlyhal s 5 zmenenými súbormi.
  Trvalé riešenie by zrýchlilo bežné nasadenia, ale **na terajší problém GitHub Pages pravdepodobne nepomôže**.
- **EN web (sportlinking)** má rovnakú štruktúru → zmenu treba spraviť aj tam (samostatná úloha).

### Odhad práce
Asi 1 zadanie (pol dňa až deň): generator.py (2 miesta), načítanie dát v index.html pre stránky priečinkov,
úprava a doplnenie Testu webu, overenie PWA offline a cache, potom rovnaké zadanie pre sportlinking.

### Odporúčanie
Teraz to nerobiť. Na terajšie zlyhania by pravdepodobne nepomohlo (pozri #466 — 10 min
`syncing_files` aj pri 5 zmenených súboroch). Ak bude treba znížiť záťaž GitHub Pages, väčší účinok
má zníženie počtu súborov (časť 5c, bod 2).

## Druhý web
Repozitár **sportlinking** (EN) má rovnaký krok `actions/deploy-pages@v5` s rovnakým 10-minútovým stropom.
Akúkoľvek poistku z časti 5c treba potom urobiť aj tam samostatnou úlohou.
