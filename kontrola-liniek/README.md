# Kontrola liniek (Strážca liniek)

Tento priečinok spravuje **automaticky** GitHub Actions (workflow „Strážca liniek“,
raz týždenne v noci na pondelok). Ručne tu nič nemeň.

| Súbor | Čo to je |
|---|---|
| `sprava.md` | týždenná správa — otvor priamo na GitHube |
| `sprava.csv` | to isté ako tabuľka (Excel / Cowork), oddeľovač `;` |
| `stav.json` | pamäť strážcu medzi behmi (adresa → výsledok, od kedy, koľko behov po sebe) |

## Značky

- 🔴 **MŔTVA** — stránka neexistuje (404/410) alebo neexistuje doména, **2 týždne po sebe** → opraviť alebo zmazať
- 🔵 **PRESŤAHOVANÁ** — web presmeruje na inú doménu → v správe je navrhnutá nová adresa
- 🟠 **PODOZRIVÁ** — mŕtva prvýkrát; ďalší týždeň sa buď potvrdí (🔴), alebo zmizne
- 🟡 **VAROVANIE** — web blokuje robotov (401/403/429/999), výpadok (5xx), timeout alebo SSL chyba → over ručne v prehliadači; „3× po sebe“ = trvá už 3 týždne
- ✅ **OK** — funguje

Facebook a Instagram (polia fb/ig aj adresy na facebook.com, fb.com, instagram.com)
sa nekontrolujú — blokujú roboty. V správe je len ich počet.

data.json strážca **nikdy nemení**. Opravy sa robia ručne na PC.
