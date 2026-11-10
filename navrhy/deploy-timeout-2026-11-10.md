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
| #470 | 10.11. 10:54 | ten istý data.json znova (1132) | ~1 550 | prešiel za 1:45 |
| #471 | 10.11. 11:14 | data.json 1132 → 1133 | ~1 550 | **zlyhal** |
| #472 | 10.11. 11:26 | ten istý data.json znova (1133) | ~1 550 | **zlyhal** |

(Počet „odlišných súborov“ pri #466 je zmeraný lokálne: build `c17fc7e` vs. `2882e19` → 5 súborov:
404.html, index.html, aktualne.json, data.json, 1 stránka.)

Závery:
- **Beh #466 zlyhal, hoci sa oproti živému webu líšilo len 5 súborov.** Počet zmenených súborov
  teda príčinou nie je — inak by #466 prešiel a #459–#464 (1 550 zmenených) by zlyhali.
- **Mirova skúsenosť:** pri #469 „Re-run failed jobs“ (ten istý artefakt, nový pokus deploy) visel
  v `syncing_files` znova; pomohol až nový beh po novom nahratí súboru (#470) — a pri #472 nepomohol
  ani ten. Automatické opakovanie kroku deploy by preto pravdepodobne nepomohlo, len by predĺžilo čakanie.
  **Automatický druhý pokus sa zatiaľ NEROBÍ.**
- Zmeny zo 7.–9.11. (PWA — Zadanie 50, presmerovania — Zadanie 52, neskoršie ikonky, Zadanie 51 a 54)
  artefakt takmer nezmenili (+16 súborov, +1 %). **Príčina je takmer určite na strane GitHub Pages**
  (spomalené ukladanie súborov od 9.11. večer), nie v našom kóde. Verejné hlásenie konkrétnej
  poruchy na tieto dni som nenašiel.

## 5. Rýchla poistka (urobené v Zadaní 55)

`.github/workflows/build.yml`, úloha `deploy`:
- krok `actions/deploy-pages@v5`: `with: timeout: 1800000` (30 minút namiesto 10),
- úloha `deploy`: `timeout-minutes: 35` (rezerva na prihlásenie a prípadné zrušenie nasadenia).

Kontrola, že sa nič nepokazí:
- `en-build` má `needs: deploy` → len počká dlhšie; spustí sa po úspešnom deployi ako doteraz.
- `concurrency` sa nemení. Upozornenie: kým jeden deploy beží, ďalší čaká; keby medzitým prišiel
  ešte novší beh, GitHub staršie **čakajúce** nasadenie zruší a nasadí najnovšie — web dostane
  najnovšie dáta, nič sa nestratí (en-build spustí ten najnovší beh).
- **Test webu** sa spúšťa po skončení celého behu (`workflow_run`) → len sa spustí neskôr.

### Ako overiť, že to pomohlo
Pri najbližšom nahratí dát otvor beh **Build & Deploy** → úloha `deploy`:
- ak `syncing_files` trvá viac ako 10 minút a potom príde `succeed` / úloha je zelená → poistka pomohla
  (predtým by to skončilo chybou);
- ak to visí celých 30 minút a skončí `Timeout reached` → problém je hlbší na strane GitHubu
  (pozri https://www.githubstatus.com, prípadne nahlásiť GitHub podpore); 30 minút už nemá zmysel ďalej predlžovať.

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
Najprv počkať, či pomôže 30-minútová poistka. Ak deploye prechádzajú (aj keď pomaly), trvalé riešenie
nie je súrne. Ak by zlyhania pokračovali aj s 30-minútovým limitom, trvalé riešenie ich pravdepodobne
neodstráni (pozri #466) — vtedy je na rade GitHub podpora.

## Druhý web
Repozitár **sportlinking** (EN) má rovnaký krok `actions/deploy-pages@v5` bez dlhšieho limitu
→ rovnakú poistku treba urobiť samostatnou úlohou.
