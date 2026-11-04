# Kontrola liniek (Strážca liniek)

Tento priečinok spravuje **automaticky** GitHub Actions (workflow „Strážca liniek“,
raz týždenne v noci na pondelok). Ručne tu nič nemeň.

| Súbor | Čo to je |
|---|---|
| `sprava.md` | týždenná správa — otvor priamo na GitHube |
| `sprava.csv` | to isté ako tabuľka (Excel / Cowork), oddeľovač `;` — tu sú aj jednotlivé adresy, ktoré blokujú robotov |
| `stav.json` | pamäť strážcu medzi behmi (adresa → výsledok, od kedy, koľko behov po sebe); funkčné linky sa ukladajú len ako `{"v": "ok"}` |

## Značky

- 🔴 **MŔTVA** — stránka neexistuje (404/410) alebo neexistuje doména, **2 behy po sebe v rôznych dňoch** → opraviť alebo zmazať. Ručný beh v ten istý deň sa neráta.
- 🔵 **PRESŤAHOVANÁ** — web presmeruje na inú doménu → v správe je navrhnutá nová adresa (podstránka na inú doménu, alebo rovnaké meno s inou koncovkou, napr. dailymail.co.uk → dailymail.com)
- 🟠 **PODOZRIVÁ** — mŕtva prvýkrát; ďalší týždeň sa buď potvrdí (🔴), alebo zmizne
- 🚫 **BLOKUJE ROBOTOV** — web nepustí automatickú kontrolu (401/403/429/999). V prehliadači väčšinou funguje, netreba opravovať. V `sprava.md` je len súhrn po doménach, jednotlivé adresy sú v `sprava.csv`.
- 🟡 **VAROVANIE** — výpadok (5xx), timeout, SSL chyba alebo presmerovanie v slučke → over ručne v prehliadači; „3× po sebe“ = trvá už 3 týždne
  - ⚠️ **over ručne – možná predaná doména** — domovská stránka presmeruje na úplne cudziu doménu. Môže to byť nový web klubu, ale aj doména, ktorú kúpil niekto iný. Nová adresa sa **nenavrhuje**.
- ✅ **OK** — funguje

Facebook a Instagram (polia fb/ig aj adresy na facebook.com, fb.com, instagram.com)
sa nekontrolujú — blokujú roboty. V správe je len ich počet.

data.json strážca **nikdy nemení**. Opravy sa robia ručne na PC.
