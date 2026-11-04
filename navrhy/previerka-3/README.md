# Podklady k previerke č. 3 (5. 11. 2026)

Správa: `../previerka-3-2026-11-05.md`. Tu sú podklady:

- `A-appka.md`, `A2-admin.md`, `B-generator-seo.md`, `D-E-vykon-mobil.md`, `F-I-bezpecnost-testy.md`, `G-data.md`, `J-H-kod-en.md`, `K-rast.md` — podrobné správy jednotlivých oblastí (viac meraní a drobností než v hlavnej správe).
- `data/` — celé zoznamy z rozboru data.json (CSV s id a cestou uzla), surové výstupy skriptov (`*.txt`, `*.json`).
- `skripty/` — skripty, ktorými sa dá všetko zopakovať (node Playwright `*.js`, Python `*.py`; web musí bežať lokálne z `_site/`, viď hlavičky skriptov). Python skripty nad data.json spúšťať `python3 -I skript.py` — data.json len čítajú.
- `snimky/` — snímky obrazovky (A = appka, A2 = admin, B = generátor, E = mobil/prístupnosť, F = bezpečnosť, G = dáta, K = návštevník).

data.json, aktualne.json ani sitemap-lastmod.json sa v tejto previerke nemenili.
