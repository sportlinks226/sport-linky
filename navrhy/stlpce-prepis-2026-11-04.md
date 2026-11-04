# Prepis stĺpcového zobrazenia (Zadanie 26b) — výsledky overenia, 4. 11. 2026

Podklad: `navrhy/stlpce-analyza-2026-11-04.md` (vetva `stlpce-analyza`, PR #27). Zmenené súbory:
`index.html` (CSS + JS blok stĺpcov, `render()`, `renderLevel()`, `navigate()`, prepínač),
`testy/test_webu.py` (nová kontrola „m) Stĺpce“). Snímky **po** prepise: `navrhy/stlpce-snimky/po-prepise/`
(snímky **pred** = `p1-*`, `p2-*`, `rozl-*` vo vetve `stlpce-analyza`, PR #27).
Video: `po-prepise/video-po-prepise-hlbka-a-koliesko.webm`.
Testy sa dajú zopakovať: `node navrhy/stlpce-testy/po1.js` (po2 = rozlíšenia a koliesko, po3 = výkon
a ostatné), web musí bežať na `localhost:8123` z `_site/` (`python3 generator.py`).

## Čo sa zmenilo (jednoducho)

* Priečinok sa otvorí len keď sa myš **naozaj pohla a zastavila** nad ním (0,17 s). Prechod, ktorý vznikol
  pohybom obsahu pod nehybnou myšou (koliesko, posun stránky, prekreslenie, posun pásu, klik, Späť/Vpred),
  neotvorí nič — položka, ktorá sa pod kurzor dostala posunom, sa ignoruje, kým ju myš neopustí **alebo
  sa od miesta posunu nepohne aspoň o 6 px** (chvenie 2–3 px nič neotvorí; doplnené 4. 11. po kontrole PR).
  Poloha myši sa sleduje na celom dokumente (len zápis súradníc), aby posun stránky pri myši mimo pásu
  nepoužil starú polohu.
  Žiadne umelé udalosti, žiadne „ticho“ po posune, časovač sa ruší pri odchode z položky aj z pásu.
* „Menu aim“: šikmý pohyb smerom do otvoreného stĺpca vpravo dáva susedným položkám dlhšie oneskorenie (0,42 s).
* Prekresľujú sa len stĺpce od zmenenej úrovne doprava; ostatné ostávajú v DOM aj s posunom (scrollTop).
  Promo blok a reklamný iframe sú mimo pásu — pri otváraní sa nenačítavajú nanovo.
* Pásiky zrušené. Pás stĺpcov je prilepený pod hlavičkou, pri hĺbke sa plynulo posúva vodorovne (Finder).
  Počet a šírka stĺpcov podľa okna: 1024 px → 3 stĺpce (226 px) + panel, 1280 → 4 (232 px), 1440 → 4 (272 px),
  1920 → 6 (238 px). Nič nie je odrezané.
* Výška pásu: po spodný okraj okna mínus pätička; kým sú bannery vidieť, pás je kratší (spodok nie je
  odrezaný). Stránka sa dá posunúť presne po prilepenie pásu pod hlavičku (221 px na domove).
* Koliesko: pás neprilepený → posúva stránku; prilepený → roluje stĺpec; krátky stĺpec, medzera alebo
  stĺpec na začiatku (smerom hore) → stránku. Samoposun stránky a auto-rolovanie pri okraji zrušené.
* Drobnosti: `title` na dlhých názvoch (> 22 znakov), `aria-pressed` na prepínači, `cols-mode` sa prepína
  v `render()` (hľadanie bez prázdneho miesta), `colClick` zrušený (klik = `navClick` → `navigate`).

## Overenie (Chromium, lokálny build, skutočný pohyb myši)

| Scenár | Výsledok |
|---|---|
| Myš stojí na „Futbal“ 1,8 s | otvorený ostal len Futbal ✅ (pred: Ostatné športy) |
| Jeden pohyb na „Anglicko“ (pás sa posunie o 240 px, pod myšou je League One) | otvorené len Anglicko, aj po 1,8 s ✅ (pred: League One › Barnsley) |
| Šikmý pohyb Európa → Nemecko 0,5 s aj 1,2 s | Nemecko ✅ (pred: Južná Amerika › Ekvádor) |
| Koliesko v dlhom stĺpci (55 krajín) | stránka → prilepenie → stĺpec 1223/1223 px, nič sa neotvorilo, stĺpec neskočil ✅ |
| Zrolované dole → zastavenie na položke → o 3 položky vyššie | scrollTop ostal 1223 ✅, otvorila sa len položka, na ktorej myš stojí |
| Koliesko 2× hore | scrollTop 1223 → 1023, nič sa neotvorilo ✅ |
| Po posune obsahu: chvenie 3 px nad položkou pod kurzorom / pohyb 10 px po nej | nič ✅ / položka sa otvorila ✅ (aj v `test_webu.py` m) |
| Klik, Späť, Vpred (myš stojí) | nič navyše sa neotvorilo, názvy stĺpcov pod hlavičkou (wrapTop 105) ✅ |
| Prechod cez „Hokej“ a odchod za 40 ms | Hokej sa neotvoril ✅ |
| 1024/1280/1440/1920 × 800/1080, hĺbka 5–6 | 0 odrezaných stĺpcov, panel vidno, pás sa posúva plynulo ✅ |
| Spodok dlhého stĺpca (× 800) | posledná položka „Cyprus“ dolný okraj 670–718 px, pätička pod ním, okno 800 px ✅ |
| Koliesko na 1024/1280/1440/1920 × 800 | neprilepený → stránka 0→221; na začiatku stĺpca hore → stránka 221→0; krátky stĺpec → stránka ✅ |
| Prepnutie Dlaždice ↔ Stĺpce v hĺbke, reload, priamy príchod, hľadanie, resize 640/1920 | ✅ |
| Promo + reklamný iframe (Tipovanie), 3 prekreslenia | 0 nových rámcov ✅ (pred: 3) |
| Aktuálne v stĺpcoch, panel linky → priečinka, dotykový notebook (ťuknutie = navigácia) | ✅ |
| Konzola / CSP | 0 chýb / 0 porušení ✅ |

**Výkon:** prekreslenie 17–30 ms (pred 18–36), 12 otvorení = 9 prekreslení po 21 ms, 0 dlhých úloh,
rýchly pohyb 2 s = 1 prekreslenie (pred 2). `test_webu.py` lokálne: m) Stĺpce ✅ (ostatné ❌ v lokálnom
behu sú len kvôli lokálnemu serveru — relatívne adresy v sitemap a 404 — nesúvisia so stĺpcami).
