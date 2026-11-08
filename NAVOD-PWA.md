# Web ako aplikácia na mobile (PWA) — návod

*(Zadanie 50, 8.11.2026. Rovnaký súbor je v oboch repozitároch: sport-linky aj sportlinking.)*

## Čo to je

Návštevník si môže web pridať na plochu mobilu ako aplikáciu:

- na ploche má **ikonku s logom „SL“** (SK červená, EN modrá),
- web sa otvorí **na celú obrazovku**, bez riadka s adresou,
- opakované otvorenie je rýchlejšie, lebo ikonky a vlajky má uložené v mobile,
- bez internetu ukáže naposledy otvorené stránky, inak správu „Nie si pripojený na internet“.

Obchody s aplikáciami (Google Play, App Store) sa nepoužívajú. Všetko robí web sám.

Pod ikonkou je názov **Sportlinky** (SK) alebo **Sportlinking** (EN).

## Ako si to návštevník nainštaluje

- **Android (Chrome, Samsung Internet):** v pätičke webu je odkaz **„📲 Pridať na plochu“**. Ťuk naň otvorí systémovú ponuku „Inštalovať“. Odkaz sa ukáže, až keď to prehliadač dovolí (väčšinou po chvíli na webe). Inak sa dá web pridať aj cez menu prehliadača ⋮ → „Pridať na plochu“ / „Inštalovať aplikáciu“.
- **iPhone (Safari):** ťuk na „📲 Pridať na plochu“ v pätičke ukáže krátky návod: **Zdieľať** (štvorček so šípkou) → **Pridať na plochu**.
- Odkaz sa ukazuje **len na dotykovom zariadení** (mobil, tablet). Na počítači sa neukáže nikdy, ani keď Chrome alebo Edge inštaláciu ponúkajú. Neukáže sa ani v už nainštalovanej aplikácii. Nikde sa neotvára žiadne vyskakovacie okno.

**Pozor na iPhone:** aplikácia z plochy má **vlastnú pamäť**, oddelenú od Safari. Obľúbené ★ uložené v Safari sa do aplikácie **nepreberú** (návod v pätičke to hovorí jednou vetou). Na Androide aplikácia zdieľa pamäť s Chrome, takže tam obľúbené ostanú.

## Vypnutie počítania vlastných návštev v aplikácii (GoatCounter)

V Safari ani Chrome si vlastné návštevy vypínaš adresou `…/#toggle-goatcounter`. Na iPhone to v aplikácii z plochy **neplatí** (má vlastnú pamäť) a aplikácia nemá riadok s adresou. Preto je tu skrytý spôsob:

1. Otvor aplikáciu a choď úplne dole do pätičky.
2. **5× rýchlo za sebou** (do 3 sekúnd) ťukni na text **„© 2026 · Všetky športové weby sveta…“**.
3. Objaví sa otázka „Nepočítať návštevy z tohto zariadenia (GoatCounter)?“ → **OK**.
4. Potvrdí sa to správou „Návštevy z tohto zariadenia sa už nepočítajú“.

Rovnakým postupom (5× ťuk) počítanie znova zapneš. Funguje to aj v obyčajnom prehliadači a je to to isté nastavenie ako `#toggle-goatcounter`. Návštevník nič nevidí. Ak by náhodou 5× ťukol, dostane otázku a bez potvrdenia sa nič nezmení.

## Štatistiky v GoatCounteri

Adresa aplikácie sa nemení (štart je čisté `/`), takže Google a canonical ostávajú bez zmeny. V GoatCounteri pribudnú dve **udalosti** (events):

- `pwa-spustenie` — niekto otvoril web z ikonky na ploche. Počíta sa raz za jedno otvorenie aplikácie.
- `pwa-instalacia` — niekto si web nainštaloval. Hlási to len Android, iPhone to neoznamuje.

Bežné návštevy stránok sa počítajú ako doteraz, aj tie z aplikácie.

## Ako PWA úplne vypnúť

1. V `generator.py` hore v časti KONFIGURÁCIA zmeň riadok `PWA = True` na `PWA = False`.
2. Ulož cez vetvu a pull request, potom merge do `main` (ako vždy). Po builde sa nasadí nový web.

Čo sa stane:

- zo všetkých stránok zmiznú odkazy na manifest a riadky pre aplikáciu,
- namiesto bežného `sw.js` sa nasadí **„samozničujúci“ sw.js**. Ľuďom, ktorí už web majú na ploche, pri najbližšom otvorení zmaže uložené súbory a odregistruje sa,
- odkaz „📲 Pridať na plochu“ zmizne,
- web sa správa presne ako pred PWA. Ikonka na ploche, ktorú si už niekto pridal, ostane, ale otvorí obyčajný web.

**Zapnutie späť:** `PWA = False` → `PWA = True` a znova pull request.

**Druhý web:** sportlinking má vlastný `generator.py`, takže vypínač treba prepnúť aj tam (samostatnou úlohou).

## Čo sa ukladá v mobile návštevníka

- **Stránky:** vždy sa načítajú najprv z internetu. Uložená kópia (najviac 60 stránok) sa použije len bez siete.
- **Dáta (`data.json`, `aktualne.json`):** vždy najprv z internetu, takže online je vždy čerstvá verzia z webu. Uložená je len posledná kópia, na čítanie bez siete.
- **Ikonky webov a vlajky:** ukážu sa hneď z mobilu a raz za deň sa na pozadí obnovia. Uložených je najviac 800 obrázkov (pár MB).
- **Nikdy sa neukladá** `data-full.json` ani nič z adminu. Admin vrátane 🚀 Publikovať funguje ako doteraz.
- Pri zmene kódu webu (index.html, sw.js) sa staré uložené stránky aj dáta zmažú samy. Návštevník nemusí nič robiť.

## Ikonky aplikácie

Ikonky sú v priečinku `pwa/`:

- `sk-192.png`, `sk-512.png`, `sk-maskable-512.png` — červené (sportlinky.sk),
- `en-192.png`, `en-512.png`, `en-maskable-512.png` — modré (sportlinking.com).

Pri builde sa skopírujú tie pre jazyk webu. Obe sady sú v oboch repozitároch, súbory sú zhodné.

Kto by chcel iné ikonky, stačí nahradiť PNG s rovnakým menom a rozmerom. „Maskable“ verzia má logo menšie v strede, lebo Android z nej vyreže kruh.

## Čo vyskúšať naživo

- **Android (Chrome):**
  1. Otvor sportlinky.sk, chvíľu sa po ňom pohybuj, choď do pätičky a ťukni na „📲 Pridať na plochu“ → Inštalovať.
  2. Otvor web z ikonky: má byť na celú obrazovku a bez adresy.
  3. Klub alebo liga sa otvorí v prehliadači. Systémové Späť ťa vráti do aplikácie.
  4. Zapni režim lietadlo, otvor aplikáciu a stránku, ktorú si predtým videl → má sa ukázať. Nenavštívená stránka → „Nie si pripojený na internet“.
- **iPhone (Safari):**
  1. Pätička → „📲 Pridať na plochu“ → podľa návodu Zdieľať → Pridať na plochu.
  2. Otvor web z ikonky: hlavička nesmie zaliezť pod hodiny ani výrez.
  3. Linky na kluby sa otvoria v okienku Safari s tlačidlom „Hotovo“, ktoré ťa vráti do aplikácie.
  4. Pohyb späť: drobčeky, „↑ Vyššie“, logo.
  5. Vypni počítanie (5× ťuk na © text).
