# 🔗 Strážca liniek — týždenná správa

Posledný beh: **2026-11-04** · trvanie 1 min 52 s · skontrolovaných adries v tomto behu: 300

data.json sa NEMENÍ — opravy robí Miro ručne. Každý riadok = jedna linka v dátach (rovnaká adresa na viacerých miestach = viac riadkov). Tabuľka pre Excel/Cowork: [sprava.csv](sprava.csv).

| Značka | Význam | Liniek | Adries |
|---|---|---:|---:|
| 🔴 MŔTVA | 404/410 alebo neexistujúca doména **2 behy po sebe** (v rôznych dňoch) → oprav/zmaž | 1 | 1 |
| 🔵 PRESŤAHOVANÁ | presmeruje na inú doménu → zváž novú adresu | 7 | 7 |
| 🟠 PODOZRIVÁ | 404/410/DNS prvýkrát — ďalší týždeň sa potvrdí (alebo nie) | 28 | 26 |
| 🚫 BLOKUJE ROBOTOV | web nepustí robota (401/403/429/999) — v prehliadači väčšinou funguje; len súhrn po doménach | 16 | 15 |
| 🟡 VAROVANIE | výpadok / timeout / SSL / presmerovanie v slučke / ⚠️ možná predaná doména → over ručne v prehliadači | 1467 | 1440 |
| ✅ OK | funguje | 9269 | 9120 |

Vynechané (nekontrolujú sa): 4064 liniek na Facebook/Instagram v poli url, 5269 ikoniek FB a 7366 ikoniek IG (polia fb/ig), 2 prázdnych/nie-webových adries.

## 🔴 MŔTVE (1)


### Hádzaná (1)

| ID | Cesta | Adresa | Dôvod | Od |
|---|---|---|---|---|
| `f_had_aso_ja_k5` | Hádzaná › Asociácie › Južná a Stredná Amerika (SCAHC) › Chile | https://www.balonmanochile.com | HTTP 404 – stránka neexistuje | 2026-11-03 |

## 🔵 PRESŤAHOVANÉ (7)


### Futbal (1)

| ID | Cesta | Adresa | Navrhovaná nová adresa | Od |
|---|---|---|---|---|
| `f_swe_l3n_k6` | Futbal › Kluby › Európa › Švédsko › Ettan Norra › FC Järfälla | https://www.fcjarfalla.se/ | https://fcjarfalla.sportadmin.dev/ | 2026-11-03 |

### Hokej (1)

| ID | Cesta | Adresa | Navrhovaná nová adresa | Od |
|---|---|---|---|---|
| `f_hok_klu_na_ncdc_k37` | Hokej › Kluby › Severná Amerika › NCDC › Utica Jr. Comets | https://www.uticajrcomets.org/ | https://jrcomets.hockeyshift.com/ | 2026-11-03 |

### Hádzaná (3)

| ID | Cesta | Adresa | Navrhovaná nová adresa | Od |
|---|---|---|---|---|
| `f_had_nor_l3_k13` | Hádzaná › Kluby › Európa › Nórsko › Eliteserien (ženy) › Tertnes Håndball Elite | https://www.tertneshandballelite.no | https://tertneshandball.admin.topphandball.no/ | 2026-11-03 |
| `f_had_swe_l2_k9` | Hádzaná › Kluby › Európa › Švédsko › Allsvenskan › Kungälvs HK | https://kungalvhk.se/ | https://kungalvhk.web.sportadmin.se/start/ | 2026-11-03 |
| `f_had_aso_eu_k6` | Hádzaná › Asociácie › Európa › Belgicko | https://www.handballbelgium.be | https://www.clubee.com/handballbelgium | 2026-11-03 |

### Správy & Médiá (2)

| ID | Cesta | Adresa | Navrhovaná nová adresa | Od |
|---|---|---|---|---|
| `n1782219117578rqz` | Správy & Médiá › Európa › Anglicko › Daily mail sport | https://www.dailymail.co.uk/sport/index.html | https://www.dailymail.com/sport/index.html | 2026-11-03 |
| `n1782134823796rdi` | Správy & Médiá › Európa › Česko › Seznamspravy sport | https://www.seznamzpravy.cz/sekce/sport-147 | https://cmp.seznam.cz/nastaveni-souhlasu?service=bcr&return_url=https%3A%2F%2Fwww.seznamzpravy.cz%2Fsekce%2Fsport-147%3Fcwreturn%3D1&cwtime=1793664860613&loginstate=forget&cwri=4bcd25913b7ab194e1814fae4e2692b0&reason=missing&service_id=zpravy&cwvariant=cop | 2026-11-03 |

## 🟠 PODOZRIVÉ (zatiaľ 1 beh — netreba hneď opravovať) (28)


### Futbal (7)

| ID | Cesta | Adresa | Dôvod |
|---|---|---|---|
| `n1784115956248qj0` | Futbal › Súťaže › Južná Amerika › Copa Libertadores U20 | https://www.conmebol.com/conmebol-libertadores-sub-20/ | HTTP 404 – stránka neexistuje |
| `f_gib_l1_k1` | Futbal › Kluby › Európa › Gibraltár › Gibraltar Football League › Lincoln Red Imps FC | https://lincolnredimpsfc.co.uk | HTTP 404 – stránka neexistuje |
| `f_mkd_l1_k3` | Futbal › Kluby › Európa › Severné Macedónsko › 1. MFL › FC Struga | https://fcstruga.com/ | doména neexistuje (DNS) |
| `f_tcd_l1_k12` | Futbal › Kluby › Afrika › Čad › Ligue Nationale de Football (Championnat National) › Scorpion FC de Borkou | https://globalsportsarchive.com/en/soccer/team/scorpion-fc-de-borkou/73513/ | HTTP 404 – stránka neexistuje |
| `f_dji_l1_k10` | Futbal › Kluby › Afrika › Džibutsko › Première Division › AS JJ/Sapeur Pompier | https://globalsportsarchive.com/en/soccer/team/as-jj-sapeur-pompier/67673/ | HTTP 404 – stránka neexistuje |
| `f_zaf_l2_k12` | Futbal › Kluby › Afrika › JAR › Motsepe Foundation Championship › Leicesterford City FC | https://leicesterfordcity.co.za/ | doména neexistuje (DNS) |
| `n1784041266378nms` | Futbal › Asociácie › Afrika › Etiópia | https://theeff.org/en | doména neexistuje (DNS) |

### Hokej (1)

| ID | Cesta | Adresa | Dôvod |
|---|---|---|---|
| `f_hok_klu_na_bchl_k12` | Hokej › Kluby › Severná Amerika › BCHL › Prince George Spruce Kings | https://www.sprucekings.bc.ca/ | doména neexistuje (DNS) |

### Basketbal (6)

| ID | Cesta | Adresa | Dôvod |
|---|---|---|---|
| `f_bas_qat_l1_k6` | Basketbal › Kluby › Ázia › Katar › QBL › Al Sadd | https://al-saddclub.com/ar/%D8%A7%D9%84%D8%AA%D8%B5%D9%86%D9%8A%D9%81/%D8%A7%D9%84%D8%A7%D8%AE%D8%A8%D8%A7%D8%B1/%D9%83%D8%B1%D8%A9-%D8%A7%D9%84%D8%B3%D9%84%D8%A9/ | HTTP 404 – stránka neexistuje |
| `f_bas_bra_l1_k17` | Basketbal › Kluby › Južná Amerika › Brazília › NBB › União Corinthians | https://basqueteuniaocorinthians.com.br/ | doména neexistuje (DNS) |
| `f_bas_mar_l1_k3` | Basketbal › Kluby › Afrika › Maroko › Division Excellence › AS FAR | https://as-far.ma/fr/presentation/12 | HTTP 404 – stránka neexistuje |
| `f_bas_pri_l1_k1` | Basketbal › Kluby › Severná a Stredná Amerika › Portoriko › BSN › Atléticos de San Germán | https://www.atleticosbsn.org | HTTP 404 – stránka neexistuje |
| `f_bas_aso_gl_k8` | Basketbal › Asociácie › Globálne › WABC | https://wabc.fiba.com/ | doména neexistuje (DNS) |
| `f_bas_aso_ja_k6` | Basketbal › Asociácie › Južná Amerika › Kolumbia | https://www.fecolcesto.org/ | doména neexistuje (DNS) |

### Hádzaná (3)

| ID | Cesta | Adresa | Dôvod |
|---|---|---|---|
| `f_had_jpn_l2_k8` | Hádzaná › Kluby › Ázia › Japonsko › League H (ženy) › Kagawa Bank GiraSol Kagawa | https://www.kagawabank.co.jp/about/handball/handball.html | HTTP 404 – stránka neexistuje |
| `f_had_aso_az_k9` | Hádzaná › Asociácie › Ázia › India | https://haiindia.in | doména neexistuje (DNS) |
| `f_had_sta_k21` | Hádzaná › Správy a Štatistiky › Handbolti.is | https://handbolti.is/ | doména neexistuje (DNS) |

### Volejbal (8)

| ID | Cesta | Adresa | Dôvod |
|---|---|---|---|
| `f_vol_sut_na_afe_u21m` | Volejbal › Súťaže › Severná a Stredná Amerika (NORCECA) › AFECAVOL U21 2026 – muži | https://www.afecavol.org/eventos/2026/10/xxi-campeonato-centroamericano-sub-21-masculino.aspx | HTTP 404 – stránka neexistuje |
| `f_vol_klu_eu_france_m2_k7` | Volejbal › Kluby › Európa (CEV) › Francúzsko › Volstar Masculine 2 (muži) › L'Abeille Girondine ASI | https://www.labeillegirondineasi.com | HTTP 404 – stránka neexistuje |
| `f_vol_klu_eu_cyprus_z1_k8` | Volejbal › Kluby › Európa (CEV) › Cyprus › 1. liga žien › Olympiada Neapolis | https://www.olympiadaneapolis.com.cy/ | HTTP 404 – stránka neexistuje |
| `f_vol_klu_eu_austria_m1_k10` | Volejbal › Kluby › Európa (CEV) › Rakúsko › Austrian Volley League mužov › VCA Amstetten | https://vca.at/teams/ | HTTP 404 – stránka neexistuje |
| `f_vol_klu_ao_qatar_m1_k6` | Volejbal › Kluby › Ázia a Oceánia (AVC) › Katar › Qatar Volleyball League mužov › Al Sadd | https://al-saddclub.com/ar/%D8%A7%D9%84%D8%AA%D8%B5%D9%86%D9%8A%D9%81/%D8%A7%D9%84%D8%A7%D8%AE%D8%A8%D8%A7%D8%B1/%D9%83%D8%B1%D8%A9-%D8%A7%D9%84%D8%B7%D8%A7%D8%A6%D8%B1%D8%A9/ | HTTP 404 – stránka neexistuje |
| `f_vol_klu_ao_kazakhstan_m1_k4` | Volejbal › Kluby › Ázia a Oceánia (AVC) › Kazachstan › Národná liga mužov › Esil-SK | https://volley.kz/teams/7-esil-sk | HTTP 404 – stránka neexistuje |
| `f_vol_klu_af_morocco_m1_k2` | Volejbal › Kluby › Afrika (CAVB) › Maroko › Marocká liga mužov › AS FAR | https://as-far.ma/fr/actualites/14-volleyball | HTTP 404 – stránka neexistuje |
| `f_vol_klu_af_morocco_z1_k3` | Volejbal › Kluby › Afrika (CAVB) › Maroko › Marocká liga žien › AS FAR | https://as-far.ma/fr/actualites/14-volleyball | HTTP 404 – stránka neexistuje |

### Správy & Médiá (3)

| ID | Cesta | Adresa | Dôvod |
|---|---|---|---|
| `n1783772136625yex` | Správy & Médiá › Európa › Island › Handbolti.is | https://handbolti.is/ | doména neexistuje (DNS) |
| `n1784318324589wds` | Správy & Médiá › Ázia › Bhután › Bhutan Athletics | https://bhutanathletics.org/ | doména neexistuje (DNS) |
| `n1784461188738hmb` | Správy & Médiá › Ázia › Irak › Al Forat news sport | https://alforatnews.iq/ | doména neexistuje (DNS) |

## 🚫 BLOKUJÚ ROBOTOV (15 adries na 12 doménach)

Tieto weby nepustia automatickú kontrolu (401/403/429/999), preto strážca nevie, či linka funguje. V prehliadači väčšinou fungujú — netreba ich opravovať. Jednotlivé adresy sú v [sprava.csv](sprava.csv).

| Doména | Adries | Kód |
|---|---:|---|
| volleybox.net | 4 | 403 |
| alghad.com | 1 | 403 |
| athletic-club.eus | 1 | 403 |
| basketnews.com | 1 | 403 |
| hln.be | 1 | 403 |
| hockeyslovakia.sk | 1 | 403 |
| iihf.com | 1 | 403 |
| lsm.lv | 1 | 403 |
| metsbasketball.com | 1 | 403 |
| nst.com.my | 1 | 403 |
| sparta-rotterdam.nl | 1 | 403 |
| vocketfc.com | 1 | 403 |

## 🟡 VAROVANIA (over ručne) (1467)

### 🟡 ⚠️ over ručne – možná predaná doména (0)

_Žiadne._

### 🟡 Ostatné varovania (1467)


#### Aktuálne (1)

| ID | Cesta | Adresa | Dôvod | Od |
|---|---|---|---|---|
| `a1784538636873` | ATP scores | https://www.atptour.com/en/scores/current | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |

#### Futbal (461)

| ID | Cesta | Adresa | Dôvod | Od |
|---|---|---|---|---|
| `n1784113212680s6i` | ME muži 2028 | https://www.uefa.com/euro2028/ | timeout (web neodpovedal včas) | 2026-11-03 |
| `n178411325834500d` | Liga národov muži | https://www.uefa.com/uefanationsleague/ | timeout (web neodpovedal včas) | 2026-11-03 |
| `n1784113327693sy5` | Liga majstrov | https://www.uefa.com/uefachampionsleague/ | timeout (web neodpovedal včas) | 2026-11-03 |
| `n178411334679368q` | Európska liga | https://www.uefa.com/uefaeuropaleague/ | timeout (web neodpovedal včas) | 2026-11-03 |
| `n1784113364906kty` | Konferenčná liga | https://www.uefa.com/uefaconferenceleague/ | timeout (web neodpovedal včas) | 2026-11-03 |
| `n17841133816378tx` | Superpohár | https://www.uefa.com/uefasupercup/ | timeout (web neodpovedal včas) | 2026-11-03 |
| `n17841134233822j5` | ME muži U21 | https://www.uefa.com/under21/ | timeout (web neodpovedal včas) | 2026-11-03 |
| `n1784113458471i73` | ME muži U19 | https://www.uefa.com/under19/ | timeout (web neodpovedal včas) | 2026-11-03 |
| `n1784113480304soi` | ME muži U17 | https://www.uefa.com/under17/ | timeout (web neodpovedal včas) | 2026-11-03 |
| `n1784113609217o2w` | ME ženy | https://www.uefa.com/womenseuro/ | timeout (web neodpovedal včas) | 2026-11-03 |
| `n1784113643274jsb` | Liga národov ženy | https://www.uefa.com/womensnationsleague/ | timeout (web neodpovedal včas) | 2026-11-03 |
| `n178411367786861h` | ME ženy u19 | https://www.uefa.com/womensunder19/ | timeout (web neodpovedal včas) | 2026-11-03 |
| `n1784113705982s7c` | ME ženy U17 | https://www.uefa.com/womensunder17/ | timeout (web neodpovedal včas) | 2026-11-03 |
| `n1784113745882dy1` | UEFA Youth league | https://www.uefa.com/uefayouthleague/ | timeout (web neodpovedal včas) | 2026-11-03 |
| `n1784113772891qvd` | UEFA Regions cup | https://www.uefa.com/regionscup/ | timeout (web neodpovedal včas) | 2026-11-03 |
| `f_ang_l2_k16` | Rochdale | https://www.rochdaleafc.co.uk/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_ang_nl_k1` | Aldershot Town | https://www.theshots.co.uk/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_ang_nl_k18` | Sutton United | https://www.suttonunited.net/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_ang_nln_k9` | Hednesford Town | https://htfc.co.uk/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_ang_nln_k13` | Marine | https://www.marinefc.com/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_ang_nls_k1` | Billericay Town | https://billericaytownfc.co.uk/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_ang_nls_k5` | Dagenham & Redbridge | https://www.daggers.co.uk/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_ang_nls_k8` | Ebbsfleet United | https://www.ebbsfleetunited.co.uk/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_esp_l1_k2` | Atlético Madrid | https://www.atleticodemadrid.com/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_esp_l1_k3` | Athletic Club | https://www.athletic-club.eus/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_esp_l2_k7` | Granada | https://granadacf.es/ | SSL chyba (certifikát): [SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed: unable to get local issuer cer | 2026-11-03 |
| `f_esp_r1_k15` | Unionistas | https://www.unionistascf.com/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_ger_bl_k0` | Bayern Mníchov | https://fcbayern.com/ | timeout (web neodpovedal včas) | 2026-11-03 |
| `f_ger_bl_k6` | Werder Brémy | https://www.werder.de/ | HTTP 429 – príliš veľa požiadaviek (blokuje robotov) | 2026-11-03 |
| `f_ger_l3_k19` | TSG Hoffenheim II | https://www.tsg-hoffenheim.de/teams/u23/team | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_ger_rn_k9` | SSV Jeddeloh | https://www.ssv-jeddeloh.de/ | HTTP 503 – chyba servera / výpadok | 2026-11-03 |
| `f_ger_rn_k14` | Werder Brémy II | https://www.werder.de/news/u23 | HTTP 429 – príliš veľa požiadaviek (blokuje robotov) | 2026-11-03 |
| `f_ger_rno_k9` | BFC Dynamo | https://bfc.com/ | timeout (web neodpovedal včas) | 2026-11-03 |
| `f_ger_rno_k14` | Greifswalder FC | https://greifswalder-fc.de/ | HTTP 503 – chyba servera / výpadok | 2026-11-03 |
| `f_ger_rw_k6` | FC Gütersloh | https://www.fcguetersloh.de/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_ger_rsw_k1` | FSV Frankfurt | https://www.fsv-frankfurt.de/ | HTTP 503 – chyba servera / výpadok | 2026-11-03 |
| `f_ger_rsw_k7` | SSV Ulm 1846 | https://www.ssvulm1846-fussball.de/ | HTTP 503 – chyba servera / výpadok | 2026-11-03 |
| `f_ger_rb_k8` | TSV Landsberg | https://tsv1882.de/ | HTTP 429 – príliš veľa požiadaviek (blokuje robotov) | 2026-11-03 |
| `f_ger_rb_k13` | TSV Aubstadt | https://www.tsv-aubstadt.de/ | HTTP 503 – chyba servera / výpadok | 2026-11-03 |
| `f_ger_rb_k15` | Bayern Mníchov II | https://fcbayern.com/de/teams/fc-bayern-campus/amateure | timeout (web neodpovedal včas) | 2026-11-03 |
| `f_fra_l1_k16` | ES Troyes AC | https://estac.fr/ | timeout (web neodpovedal včas) | 2026-11-03 |
| `f_fra_l2_k2` | Montpellier HSC | https://www.mhscfoot.com/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_fra_l2_k16` | USL Dunkerque | https://usldunkerque.com/ | SSL chyba (certifikát): [SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed: Hostname mismatch, certificate | 2026-11-03 |
| `f_fra_l3_liga` | Ligue 3 | https://epreuves.fff.fr/competition/engagement/1-ligue-3-betclic/phase/1/1/classement | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_fra_l3_k0` | SM Caen | https://www.smcaen.fr/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_fra_l3_k2` | Amiens SC | https://amiensfootball.com/ | SSL chyba (certifikát): [SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed: Hostname mismatch, certificate | 2026-11-03 |
| `f_fra_l3_k8` | FC Villefranche Beaujolais | https://www.fcvb.fr/ | timeout (web neodpovedal včas) | 2026-11-03 |
| `f_and_l1_k1` | Inter Club d’Escaldes | https://interescaldes.com | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_blr_l1_liga` | Vyššia liga | https://championship.abff.by/male/tournaments/1/?tournamentId=7 | SSL chyba (certifikát): [SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed: unable to get local issuer cer | 2026-11-03 |
| `f_blr_l1_k7` | Neman Grodno | https://www.fcneman.by | timeout (web neodpovedal včas) | 2026-11-03 |
| `f_blr_l1_k13` | FC Vitebsk | https://fc.vitebsk.by | timeout (web neodpovedal včas) | 2026-11-03 |
| `f_blr_l1_k16` | FC Baranoviči | https://fcbaranovichi.by | timeout (web neodpovedal včas) | 2026-11-03 |
| `f_bel_l1_k1` | Club Brugge | https://www.clubbrugge.be | HTTP 429 – príliš veľa požiadaviek (blokuje robotov) | 2026-11-03 |
| `f_bel_l2_k11` | KSC Lokeren | https://www.sporting.be | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_bel_l2_k12` | Club NXT (Club Brugge U23) | https://www.clubbrugge.be/nl/teams/nxt | HTTP 429 – príliš veľa požiadaviek (blokuje robotov) | 2026-11-03 |
| `f_bel_l3vv_k1` | Hoogstraten VV | https://www.hoogstratenvv.be | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_bul_l1_k14` | Dunav Ruse | https://fcdunav.bg | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_bul_l2_liga` | Vtora liga | https://bfu-tournaments.com/leagues/second | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_dnk_l1_k12` | SønderjyskE | https://soenderjyskefodbold.dk/ | HTTP 454 | 2026-11-03 |
| `f_est_l1_k1` | FCI Levadia Tallinn | https://fcilevadia.ee/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_est_l2_k5` | FCI Levadia Tallinn U21 | https://fcilevadia.ee/category/fci-levadia-u21/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_fro_l1_k4` | HB Tórshavn | https://hb.fo | HTTP 454 | 2026-11-03 |
| `f_fin_l2_k7` | Ekenäs IF | https://herrar.eiffotboll.fi/ | spojenie odmietnuté | 2026-11-03 |
| `f_fin_l2_k8` | KäPa Helsinki | https://kapylanpalloedustus.fi/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_gre_l1_k2` | PAOK Solún | https://www.paokfc.gr/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_gre_l1_k3` | AEK Atény | https://www.aekfc.gr/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_gre_l1_k7` | Atromitos Atény | https://www.atromitosfc.gr/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_gre_l1_k8` | Levadiakos | https://www.levadiakosfc.gr/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_gre_l2_k1` | AEL Larisa | https://www.aelfc.gr/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_gre_l2_k14` | PAOK B | https://www.paokfc.gr/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_ned_l1_k3` | Feyenoord Rotterdam | https://www.feyenoord.com/nl | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_ned_l2_k4` | FC Dordrecht | https://www.fcdordrecht.nl/ | HTTP 400 | 2026-11-03 |
| `f_ned_l3_k3` | HHC Hardenberg | https://www.hhc.nl/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_ned_l3_k5` | Kozakken Boys | https://www.kozakkenboys.nl/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_ned_l3_k12` | VV Kloetinge | https://www.vvkloetinge.nl/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_ned_l3_k14` | Rohda Raalte | https://www.rohdaraalte.nl/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_ned_l3_k17` | Jong Sparta Rotterdam | https://www.sparta-rotterdam.nl/clubliefde/selectie-jong-sparta/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_ned_l4a_k1` | ACV Assen | https://www.acvassen.nl | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_ned_l4a_k2` | ADO '20 | https://www.ado20.nl | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_ned_l4a_k3` | VV DOVO | https://www.dovo.nl | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_ned_l4a_k4` | DVS '33 Ermelo | https://www.dvs33.nl | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_ned_l4a_k8` | Harkemase Boys | https://www.harkemaseboys.nl | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_ned_l4a_k10` | HVV Hollandia | https://www.hvvhollandia.nl | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_ned_l4a_k12` | VPV Purmersteijn | https://www.purmersteijn.eu | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_ned_l4a_k15` | Sportlust '46 | https://www.sportlust46.nl | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_ned_l4a_k16` | VV Staphorst | https://www.vvstaphorst.nl | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_ned_l4a_k17` | SVZW Wierden | https://www.svzw.nl | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_ned_l4b_k5` | Excelsior Maassluis | https://www.excelsiormaassluis.nl | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_ned_l4b_k13` | sv Poortugaal | https://www.svpoortugaal.nl | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_ned_l4b_k16` | VV UNA | https://www.vvuna.nl | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_ned_l4b_k17` | VVSB | https://www.vvsb.nl | timeout (web neodpovedal včas) | 2026-11-03 |
| `f_ned_l4b_k18` | VV Zwaluwen | https://www.vvzwaluwen.nl | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_cro_l1_k1` | Dinamo Zagreb | https://gnkdinamo.hr/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_cro_l1_k2` | Hajduk Split | https://hajduk.hr/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_cro_l1_k7` | Istra 1961 | https://nkistra.com/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_cro_l2_k16` | Dinamo Zagreb II | https://gnkdinamo.hr/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_irl_l1_k9` | Waterford FC | https://waterfordfc.ie/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_ltu_l1_k2` | FK Kauno Žalgiris | https://zalgiris.lt/komandos/fk-kauno-zalgiris | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_ltu_l2_k15` | FK Kauno Žalgiris B | https://zalgiris.lt/komandos/fk-kauno-zalgiris-b | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_lva_l1_k3` | Riga FC | https://rigafc.lv/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_lva_l2_k11` | Riga FC-2 | https://rigafc.lv/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_lux_l1_k6` | FC Progrès Niederkorn | https://www.fcprogresniederkorn.lu/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_hun_l1_k11` | Vasas FC | https://vasasfc.hu | timeout (web neodpovedal včas) | 2026-11-03 |
| `f_hun_l2_k2` | Diósgyőri VTK | https://dvtk.eu | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_hun_l2_k5` | Kozármisleny SE | https://kozarmislenyfc.hu | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_hun_l2_k6` | Mezőkövesd Zsóry FC | https://mezokovesdzsory.hu | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_hun_l2_k7` | FC Csákvár | https://aqvitalfc.hu | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_mlt_l2_k16` | Victoria Hotspurs | https://www.victoriahotspursfc.com/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_nor_l1_k12` | IK Start | https://www.ikstart.no/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_nor_l3b_k7` | Levanger FK | https://www.levangerfk.no/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_pol_l1_k5` | Korona Kielce | https://korona-kielce.pl | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_pol_l1_k8` | Motor Lublin | https://motorlublin.eu | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_pol_l1_k10` | Pogoń Szczecin | https://pogonszczecin.pl | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_pol_l1_k12` | Raków Częstochowa | https://rakow.com | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_pol_l1_k13` | Widzew Łódź | https://widzew.com | timeout (web neodpovedal včas) | 2026-11-03 |
| `f_pol_l1_k17` | Śląsk Wrocław | https://slaskwroclaw.pl | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_pol_l2_k3` | Miedź Legnica | https://miedzlegnica.eu | SSL chyba (certifikát): [SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed: unable to get local issuer cer | 2026-11-03 |
| `f_pol_l2_k4` | Odra Opole | https://odraopole.pl | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_pol_l2_k10` | Ruch Chorzów | https://ksruch.com | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_pol_l3_k16` | Znicz Pruszków | https://zniczpruszkow.com.pl | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_rus_l1_k16` | Dynamo Machačkala | https://dinamo-mx.ru/ | timeout (web neodpovedal včas) | 2026-11-03 |
| `f_rus_l2_k12` | Volga Uljanovsk | https://www.fcvu.ru/ | timeout (web neodpovedal včas) | 2026-11-03 |
| `f_rus_l2_k14` | Neftechimik Nižnekamsk | https://fcnh.ru/ | chyba spojenia: OSError [Errno 101] Network is unreachable | 2026-11-03 |
| `f_rus_l2_k15` | Rotor Volgograd | https://rotor-vlg.com/ | timeout (web neodpovedal včas) | 2026-11-03 |
| `f_rus_l2_k16` | SKA-Chabarovsk | https://fcska.ru/ | timeout (web neodpovedal včas) | 2026-11-03 |
| `f_rus_l2_k17` | KAMAZ Naberežnyje Čelny | https://fckamaz.ru/ | timeout (web neodpovedal včas) | 2026-11-03 |
| `f_nir_l1_k3` | Carrick Rangers | https://www.carrickrangers.co.uk/ | HTTP 503 – chyba servera / výpadok | 2026-11-03 |
| `f_sco_l3_k5` | East Kilbride FC | https://eastkilbridefootballclub.co.uk/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_sco_l3_k10` | Ross County FC | https://www.rosscountyfootballclub.co.uk/ | timeout (web neodpovedal včas) | 2026-11-03 |
| `f_sco_l4_k2` | Clyde FC | https://www.clydefc.co.uk/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_svn_l1_k1` | NK Aluminij | https://nkaluminij.net/ | HTTP 500 – chyba servera / výpadok | 2026-11-03 |
| `f_srb_l2_k1` | Smederevo 1924 | https://fksmederevo1924.rs/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_che_l1_k11` | BSC Young Boys | https://www.bscyb.ch/ | HTTP 503 – chyba servera / výpadok | 2026-11-03 |
| `f_swe_l1_k3` | Degerfors IF | https://degerforsif.se/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_swe_l3n_k14` | Sollentuna FK | https://www.sollentunafk.se/ | timeout (web neodpovedal včas) | 2026-11-03 |
| `f_swe_l3n_k15` | Umeå FC | https://www.ufc.se/ | timeout (web neodpovedal včas) | 2026-11-03 |
| `f_ita_l1_k6` | Frosinone | https://www.frosinonecalcio.com/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_ita_l2_k16` | Pisa | https://pisasportingclub.com/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_ita_l2_k18` | Südtirol | https://www.fc-suedtirol.com/ | SSL chyba (certifikát): [SSL: DH_KEY_TOO_SMALL] dh key too small (_ssl.c:1010) | 2026-11-03 |
| `f_ita_l2_k20` | Virtus Entella | https://www.entella.it/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_ita_l3c_k11` | Foggia | https://www.calciofoggia1920.net/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_tur_l1_k3` | Beşiktaş | https://bjk.com.tr/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_tur_l1_k7` | Fenerbahçe | https://www.fenerbahce.org/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_tur_l1_k18` | Trabzonspor | https://www.trabzonspor.org.tr/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_tur_l2_k2` | Bandırmaspor | https://www.bandirmaspor.com.tr/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_tur_l2_k6` | Bursaspor | https://www.bursaspor.org.tr/ | timeout (web neodpovedal včas) | 2026-11-03 |
| `f_tur_l2_k18` | Sivasspor | https://sivasspor.org.tr/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_ukr_l1_k5` | Obolon Kyjiv | https://fc.obolon.ua/ | SSL chyba (certifikát): [SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed: unable to get local issuer cer | 2026-11-03 |
| `f_ukr_l2_k1` | Oleksandrija | https://www.fco.com.ua/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_wal_l1_k15` | Holywell Town | https://www.holywelltownfc.co.uk/ | HTTP 503 – chyba servera / výpadok | 2026-11-03 |
| `f_wal_l2n_k4` | Porthmadog | https://cpdporthmadogfc.com/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_wal_l2n_k9` | Penrhyncoch | https://penrhyncochfc.com/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_arm_l1_liga` | Premier League | https://premierleague.ffa.am/en/table | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_arm_l2_liga` | First League | https://www.ffa.am/en/first-league/table | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_isr_l1_k5` | Hapoel Tel Aviv | https://www.htafc.co.il/en/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_kaz_l1_k4` | FC Astana | https://fcastana.kz/ | timeout (web neodpovedal včas) | 2026-11-03 |
| `f_kaz_l1_k5` | Aktobe | https://fc-aktobe.kz/en | timeout (web neodpovedal včas) | 2026-11-03 |
| `f_kaz_l1_k10` | Kaisar Kyzylorda | https://kaysar.kz/ | timeout (web neodpovedal včas) | 2026-11-03 |
| `f_kaz_l2_k2` | FC Astana-2 | https://fcastana.kz/ | timeout (web neodpovedal včas) | 2026-11-03 |
| `f_kaz_l2_k9` | Aktobe-2 | https://fc-aktobe.kz/en | timeout (web neodpovedal včas) | 2026-11-03 |
| `f_aze_l1_k1` | Qarabag | https://qarabagh.com/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_cyp_l2_k5` | ASIL Lysi | https://asillysis.com/ | HTTP 503 – chyba servera / výpadok | 2026-11-03 |
| `f_afg_l1_liga` | Afghanistan Champions League | https://www.sofascore.com/tournament/football/afghanistan/afghanistan-champions-league/24194 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_afg_l1_k2` | Aino Mina FC | https://www.sofascore.com/team/football/aino-fc/939368 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_afg_l1_k3` | Ariana Khost FC | https://www.sofascore.com/team/football/ariana/1276002 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_bhr_l1_k15` | Al-Ittifaq | https://www.sofascore.com/football/team/al-ittifaq/213603 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_bgd_l1_k9` | Arambagh KS | https://www.sofascore.com/football/team/arambagh-ks/273720 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_brn_l1_liga` | Brunei Super League | https://www.sofascore.com/tournament/football/brunei/super-league/17017 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_brn_l1_k4` | MS PPDB | https://www.sofascore.com/team/football/ms-ppdb/385121 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_brn_l1_k7` | Kuala Belait FC | https://www.sofascore.com/team/football/kuala-belait-fc/933957 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_brn_l1_k8` | Jerudong FC | https://www.sofascore.com/team/football/jerudong-fc/385127 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_chn_l2_k1` | Guangdong GZ-Power | https://www.sofascore.com/team/football/guangzhou-e-power-fc/510606 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_chn_l2_k2` | Shenzhen Juniors | https://www.sofascore.com/team/football/shenzhen-juniors-fc/510603 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_chn_l2_k4` | Guangxi Hengchen | https://www.sofascore.com/team/football/guangxi-hengchen-fc/510605 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_chn_l2_k5` | Yanbian Longding | https://www.sofascore.com/team/football/yanbian-longding/382025 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_chn_l2_k15` | Foshan Nanshi | https://www.sofascore.com/team/football/foshan-nanshi/508366 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_phl_l1_k11` | Philippine Army | https://www.sofascore.com/team/football/philippine-army/142200 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_gum_l1_k1` | ASC Trust Islanders FC | https://guamfa.com/islanders-fc | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_gum_l1_k3` | Crushers FC | https://guamfa.com/crushers-fc | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_gum_l1_k5` | Guam Shipyard Windward Wolverines SC | https://guamfa.com/windward-wolverines-sc | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_gum_l1_k7` | Quality Distributors FC | https://guamfa.com/quality-distributors-fc | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_gum_l1_k9` | Southern Cobras SC | https://guamfa.com/southern-cobras | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_gum_l1_k10` | Southern Heat | https://guamfa.com/southern-heat | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_ind_l1_k6` | Punjab | https://rgpunjabfc.com | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_ind_l2_k9` | Gokulam | https://gokulamkeralafc.com | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_idn_l1_k12` | Persija | https://persija.id | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_idn_l2_k11` | Persiraja | https://persiraja.id | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_irq_l1_liga` | Stars League | https://iraqstarsleague.com/en/standings | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_jpn_l1_k6` | Shimizu S-Pulse | https://www.s-pulse.co.jp | SSL chyba (certifikát): [SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed: unable to get local issuer cer | 2026-11-03 |
| `f_jpn_l1_k7` | Nagoya Grampus | https://nagoya-grampus.jp | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_jpn_l1_k14` | V-Varen Nagasaki | https://www.v-varen.com | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_jpn_l2_k9` | Montedio Yamagata | https://www.montedioyamagata.jp | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_jpn_l2_k12` | Sagan Tosu | https://www.sagan-tosu.net | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_jpn_l2_k18` | Vegalta Sendai | https://www.vegalta.co.jp | timeout (web neodpovedal včas) | 2026-11-03 |
| `f_jpn_l3_k5` | Gainare Tottori | https://www.gainare.co.jp | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_jpn_l3_k6` | Giravanz Kitakyushu | https://www.giravanz.jp | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_qat_l1_k5` | Al-Arabi | https://alarabi.qa/ | timeout (web neodpovedal včas) | 2026-11-03 |
| `f_qat_l1_k6` | Al-Ahli | https://alahlisc.qa | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_qat_l1_k7` | Qatar SC | https://qatarsc.qa/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_qat_l1_k8` | Al-Wakrah | https://alwakrahsc.qa/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_qat_l1_k11` | Al-Shamal | https://alshamal.qa | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_kgz_l1_k15` | OshSU-Aldier | https://www.sofascore.com/team/football/oshmu-aldier/475664 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_kor_l1_k11` | FC Anyang | https://www.fc-anyang.com/ | timeout (web neodpovedal včas) | 2026-11-03 |
| `f_kor_l2_k16` | Gimhae FC 2008 | https://www.gimhaefc2008.com/ | SSL chyba (certifikát): [SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed: unable to get local issuer cer | 2026-11-03 |
| `f_lao_l1_k10` | Army | https://www.sofascore.com/team/football/lao-army-fc/379272 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_mac_l1_k10` | Universidade de Macau | https://www.sofascore.com/team/football/universidade-de-macau/506264 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_mys_l1_k7` | Negeri Sembilan | https://nsfc1923.com/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_mdv_l1_liga` | Dhivehi Premier League | https://www.sofascore.com/football/tournament/maldives/dhivehi-premier-league/16554 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_npl_l1_liga` | ANFA National League | https://www.sofascore.com/tournament/football/nepal/nepal-national-league/32049 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_npl_l1_k10` | Nawa Jana Jagriti Yuwa Club | https://www.sofascore.com/team/football/nawa-jana-jagriti-yuwa-club/1165674 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_sau_l1_k13` | Al-Nassr | https://alnassr.sa | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_mnp_l1_liga` | Marianas Soccer League | https://www.sofascore.com/tournament/football/northern-mariana-islands/msl-1/23694 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_mnp_l1_k2` | Latte FC | https://www.sofascore.com/team/football/latte-fc/1211153 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_lka_l1_k4` | Navy Sea Hawks | https://www.sofascore.com/team/football/navy-sea-hawks/1246519 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_lka_l1_k5` | Blue Eagles | https://www.sofascore.com/team/football/blue-eagles/1246517 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_lka_l1_k7` | Ratnam SC | https://www.sofascore.com/team/football/ratnam-sc/304859 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_tkm_l1_liga` | Ýokary Liga | https://tff.com.tm/competitions | SSL chyba (certifikát): [SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed: certificate has expired (_ssl. | 2026-11-03 |
| `f_tkm_l1_k1` | Ahal FK | https://www.sofascore.com/team/football/ahal-fk/186777 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_tkm_l1_k2` | Altyn Asyr FK | https://www.sofascore.com/team/football/altyn-asyr-fk/164020 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_tkm_l1_k5` | Köpetdag Aşgabat | https://www.sofascore.com/team/football/fk-kopetdag-asgabat/345696 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_tkm_l1_k7` | Nebitçi FT | https://www.sofascore.com/team/football/nebitci-ft/165986 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_tkm_l1_k8` | Şagadam FK | https://www.sofascore.com/team/football/sagadam-fk/345700 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_are_l1_k6` | Al Nasr | https://www.alnasrclub.com/en/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_vnm_l1_k3` | Cong An Ho Chi Minh City | https://cahcmfc.vn/ | timeout (web neodpovedal včas) | 2026-11-03 |
| `f_vnm_l1_k12` | The Cong-Viettel | https://viettelsports.vn/ | chyba spojenia: OSError [Errno 101] Network is unreachable | 2026-11-03 |
| `f_tls_l1_liga` | Liga Futebol Timor-Leste | https://www.sofascore.com/tournament/football/timor-leste/lfa-primeira-divisao/18235 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_tls_l1_k1` | Benfica Laulara | https://www.sofascore.com/team/football/sport-laulara-e-benfica/398270 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_tls_l1_k3` | Emmanuel | https://www.sofascore.com/team/football/emmanuel-fc-dili/397635 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_tls_l1_k4` | Santa Cruz | https://www.sofascore.com/team/football/santa-cruz-fc-dili/397626 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_tls_l1_k7` | DIT | https://www.sofascore.com/team/football/dili-institute-of-technology-fc/398269 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_tls_l1_k8` | Coração | https://www.sofascore.com/team/football/fc-atletico-ultramar/397630 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_tls_l1_k9` | AS Marca | https://www.sofascore.com/team/football/as-marca-fc-dili/397634 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_tls_l1_k10` | Assalam | https://www.sofascore.com/team/football/assalam-fc/398271 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_arg_l1_k5` | Union de Santa Fe | https://www.clubaunion.com.ar/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_arg_l1_k13` | Talleres (Cordoba) | https://www.clubtalleres.com.ar/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_arg_l1_k16` | Argentinos Juniors | https://argentinosjuniors.com.ar/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_arg_l1_k17` | Racing Club | https://www.racingclub.com.ar/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_arg_l1_k23` | Atletico Tucuman | https://www.clubatleticotucuman.com.ar/ | HTTP 500 – chyba servera / výpadok | 2026-11-03 |
| `f_arg_l2_k15` | San Telmo | https://www.soydetelmo.com.ar/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_arg_l2_k33` | Chacarita Juniors | https://www.chacaritajuniors.com.ar/ | HTTP 429 – príliš veľa požiadaviek (blokuje robotov) | 2026-11-03 |
| `f_arg_l3b_k1` | Arsenal (Sarandi) | https://www.arsenalfc.com.ar/ | HTTP 503 – chyba servera / výpadok | 2026-11-03 |
| `f_bra_l1_k1` | Palmeiras | https://www.palmeiras.com.br/ | server prerušil spojenie | 2026-11-03 |
| `f_bra_l1_k3` | Athletico-PR | https://www.athletico.com.br/ | HTTP 405 | 2026-11-03 |
| `f_bra_l1_k9` | Botafogo | https://www.botafogo.com.br/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_bra_l1_k14` | Santos | https://www.santosfc.com.br/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_bra_l1_k19` | Remo | https://www.clubedoremo.com.br/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_bra_l2_k3` | Vila Nova FC | https://www.vilanovafc.com.br/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_bra_l2_k4` | Juventude | https://www.juventude.com.br/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_bra_l2_k9` | Sport Recife | https://sportrecife.com.br/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_bra_l3_k11` | Figueirense | https://figueirense.com.br/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_ecu_l1_k7` | Independiente del Valle | https://www.independientedelvalle.com/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_ecu_l2_k2` | Independiente Juniors | https://www.independientedelvalle.com/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_ecu_l2_k5` | Vinotinto FC Ecuador | https://vinotinto.ec/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_col_l1_k1` | Millonarios FC | https://millonarios.com.co/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_col_l1_k9` | Alianza Fútbol Club | https://alianzafc.com.co/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_col_l1_k17` | Club Atlético Nacional | https://www.atlnacional.com.co/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_col_l2_k10` | Independiente Valle del Cauca (IVC) | https://independienteyumbo.com/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_par_l2_k14` | Club Deportivo Santani | https://www.deportivosantani.com.py/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_per_l2_k5` | Universidad San Martín | https://clubdeportivo.usmp.edu.pe/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_uru_l1_k11` | Club Deportivo Maldonado | https://deportivomaldonadosad.com | HTTP 503 – chyba servera / výpadok | 2026-11-03 |
| `f_ago_l1_k1` | Petro Atlético de Luanda | https://petroatletico.co.ao/ | SSL chyba (certifikát): [SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed: certificate has expired (_ssl. | 2026-11-03 |
| `f_dji_l1_liga` | Première Division | https://footystats.org/djibouti/division-1 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_dji_l1_k1` | AS Port | https://www.sofascore.com/team/football/as-port/408552 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_dji_l1_k3` | Garde-Côtes Djiboutiennes | https://www.sofascore.com/team/football/garde-cotes-fc/502463 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_dji_l1_k5` | CF Gendarmerie Nationale | https://www.sofascore.com/team/football/gendarmerie-nationale/409742 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_dji_l1_k8` | AS Arta/Solar7 | https://www.sofascore.com/team/football/artasolar7/305237 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_dji_l1_k9` | FC Obock | https://www.sofascore.com/team/football/as-obock/1156577 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_egy_l1_k17` | Petrojet | https://petrojetsc.com/ | HTTP 401 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_egy_l2_k20` | Al Nasr Cairo | https://www.sofascore.com/team/football/al-nasr-cairo/150894 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_egy_l2_k13` | El Dakhleya | https://www.sofascore.com/football/team/el-dakhlya/58317 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_egy_l2_k21` | Team FC Cairo | https://www.sofascore.com/team/football/team-fc-cairo/503227 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_gha_l1_k3` | Hearts of Oak | https://www.heartsofoaksc.com/ | SSL chyba (certifikát): [SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed: certificate has expired (_ssl. | 2026-11-03 |
| `f_ssd_l1_liga` | South Sudan Premier League | https://www.sofascore.com/tournament/football/south-sudan/premier-league/24561 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_ssd_l1_k12` | Salam FC Aweil | https://www.sofascore.com/team/football/salam-aweil/1048169 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_ssd_l1_k14` | Wajuma SC | https://www.sofascore.com/team/football/wajuma-fc/1048166 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_cmr_l1_k2` | Dynamo Douala | https://dynamoclub-douala.com/ | SSL chyba (certifikát): [SSL: TLSV1_ALERT_INTERNAL_ERROR] tlsv1 alert internal error (_ssl.c:1010) | 2026-11-03 |
| `f_cmr_l2_k18` | Mintack FC | https://www.sofascore.com/team/football/mintack-fc/1246657 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_cpv_l1_k11` | SC Atlético | https://www.sofascore.com/team/football/atletico-ribeira-brava/1223987 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_ken_l1_k9` | Tusker FC | https://tuskerfc.com/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_com_l1_liga` | D1 Ngazidja | https://www.sofascore.com/tournament/football/comoros/comoros-premier-league/21979 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_cod_l1_k33` | AS Butras | https://www.sofascore.com/team/football/as-brutas/1236092 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_lso_l1_k18` | Mzamane FC | https://www.sofascore.com/team/football/mzamane-fc/1093101 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_lby_l1_k39` | Al-Bashaer | https://www.sofascore.com/team/football/al-bashayer-misrata/404506 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_lby_l1_k40` | Al-Butnan | https://www.sofascore.com/team/football/al-butnan-fc/475155 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_lby_l1_k11` | Al-Ittihad Tripoli | https://ittihadclub.ly/ | timeout (web neodpovedal včas) | 2026-11-03 |
| `f_mdg_l1_liga` | Pureplay Football League | https://www.sofascore.com/tournament/football/madagascar/pure-play-football-league/20122 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_mdg_l1_k6` | Tsaramandroso | https://www.sofascore.com/team/football/tsaramandroso-formation-fc/467610 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_mdg_l1_k10` | Avenir Sainte Anne | https://www.sofascore.com/team/football/as-sainte-anne/520033 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_mli_l1_k11` | Afrique Football Elite | https://www.sofascore.com/team/football/afrique-football-elite/421506 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_mar_l2_k1` | Moghreb Tetouan (MAT) | https://www.matfoot.com/ | spojenie odmietnuté | 2026-11-03 |
| `f_mar_l2_k4` | Jeunesse Massira | https://www.sofascore.com/team/football/js-massira/55029 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_mar_l1_k14` | Olympique Dcheira | https://www.sofascore.com/team/football/olympique-dcheira/204299 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_mar_l2_k14` | US Boujaad | https://www.sofascore.com/team/football/union-sportive-boujaad/525454 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_mus_l1_k5` | AS Riviere du Rempart | https://www.sofascore.com/team/football/as-riviere-du-rempart/374258 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_mus_l1_k7` | Petite Riviere Noire FC | https://www.sofascore.com/team/football/petite-riviere-noire-fc/372910 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_mus_l1_k8` | AS Vacoas-Phoenix | https://www.sofascore.com/team/football/as-vacoas-phoenix/372912 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_mus_l1_k10` | Pointe-aux-Sables Mates | https://www.sofascore.com/team/football/pointe-aux-sables-mates/374262 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_mrt_l1_k3` | AS Douanes | https://www.sofascore.com/team/football/as-douanes/339159 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_mrt_l1_k4` | AS Pompiers | https://www.sofascore.com/team/football/as-pompier/462642 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_mrt_l1_k6` | ASC Gendrim | https://www.sofascore.com/team/football/asc-gendrim/408952 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_mrt_l1_k16` | FC Arc-en-Ciel | https://www.sofascore.com/team/football/arc-en-ciel/381014 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_mrt_l1_k8` | Nouakchott King's | https://www.sofascore.com/team/football/nouakchott-kings/305253 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_nam_l1_liga` | Namibia Premiership | https://www.tntsports.co.uk/football/mtc-namibia-premier-league/standings.shtml | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_ner_l1_k13` | AS UAM | https://www.sofascore.com/team/football/as-uam/939574 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_ner_l1_k14` | Liberté FC | https://www.sofascore.com/team/football/liberte-fc/1109319 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_ner_l1_k12` | Urana FC | https://www.sofascore.com/team/football/urana-fc/404618 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_nga_l1_k3` | Ikorodu City | https://ikoroducityfc.com/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_gnq_l1_liga` | Liga Nacional — Región Continental | https://www.sofascore.com/tournament/football/equatorial-guinea/primera-division-honor/31928 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_gnq_l2_liga` | Liga Nacional — Región Insular | https://www.sofascore.com/tournament/football/equatorial-guinea/primera-division-honor/31928 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_gnq_l2_k2` | Cano Sport Academy | https://www.sofascore.com/team/football/cano-sport-academy/325642 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_gnq_l2_k3` | Diablo Rojo de Niefang FC | https://www.sofascore.com/team/football/diablo-rojo/1164150 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_gnq_l2_k4` | CD Unidad | https://www.sofascore.com/team/football/deportivo-unidad/1164152 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_gnq_l2_k9` | UD Santa María | https://www.sofascore.com/team/football/ud-santa-maria/1164154 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_gnq_l2_k10` | CD Sony de Elá Nguema | https://www.sofascore.com/team/football/sony-ela-nguema/1164165 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_som_l1_k12` | FC Gantaalaha | https://www.sofascore.com/team/football/gantaalaha/1161750 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_som_l1_k9` | Jeenyo FC | https://www.sofascore.com/team/football/jeenyo/517783 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_som_l1_k10` | Raadsan SC | https://www.sofascore.com/team/football/raadsan/517782 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_sdn_l1_k4` | Al Ahli SC Wad Madani | https://awm-sc.com/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_stp_l1_liga` | Campeonato Nacional | https://www.sofascore.com/tournament/football/sao-tome-and-principe/campeonato-nacional/18272 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_stp_l1_k5` | UD Rei Amador | https://www.sofascore.com/team/football/ud-rei-amador/399711 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_stp_l1_k6` | FC Inter Bom-Bom | https://www.sofascore.com/team/football/inter-bom-bom/470286 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_stp_l1_k7` | AC Monte Café | https://www.sofascore.com/team/football/agro-sport-monte-cafe/399713 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_stp_l1_k8` | SC Praia Cruz | https://www.sofascore.com/team/football/sporting-clube-da-praia-cruz/399720 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_stp_l1_k9` | AD Kê Morabeza | https://www.sofascore.com/team/football/ad-ke-morabeza/1214187 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_stp_l1_k10` | Trindade FC | https://www.sofascore.com/team/football/trindade-fc/399712 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_stp_l1_k11` | UDSC Água-Izé | https://www.sofascore.com/team/football/udescai/1074784 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_stp_l1_k12` | FC Aliança Nacional | https://www.sofascore.com/team/football/alianca-nacional-de-pantufo-fc/399717 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_stp_l2_liga` | Campeonato Nacional | https://www.sofascore.com/tournament/football/sao-tome-and-principe/campeonato-nacional/18272 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_stp_l2_k1` | Desportivo Primeiro de Maio | https://www.sofascore.com/team/football/cd-1o-de-maio/399725 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_stp_l2_k2` | GD Os Operários | https://www.sofascore.com/team/football/sport-operario-e-benfica/399726 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_stp_l2_k4` | FC Porto Real | https://www.sofascore.com/team/football/fc-porto-real/399724 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_stp_l2_k5` | GD Sundy | https://www.sofascore.com/team/football/sundy-fc/399723 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_stp_l2_k6` | UD APPB | https://www.sofascore.com/team/football/udapb/399722 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_bah_l1_k8` | University of The Bahamas (Mingoes) | https://www.gomingoes.com/sports/msoc/index | HTTP 405 | 2026-11-03 |
| `f_ber_l1_k3` | Pembroke Hamilton Club Zebras | https://www.pembrokehamiltonclub.bm/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) (po presmerovaní na pembrokehamilton.teamsnapsites.com) | 2026-11-03 |
| `f_vgb_l1_liga` | BVIFA National League | https://footystats.org/british-virgin-islands/bvifa-national-league | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_vgb_l1_k11` | Wolues FC | https://www.woluesfc.co.uk/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_cur_l1_liga` | Promé Divishon | https://footystats.org/curacao/curacao-prome-divishon | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_guf_l1_liga` | Régional 1 | https://epreuves.fff.fr/competition/engagement/449721-regional-1/phase/1/1/classement | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_guf_l1_k7` | AS Grand Santi | https://epreuves.fff.fr/competition/club/546602-a-s-grand-santi/information.html | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_guf_l1_k4` | COSMA Foot | https://epreuves.fff.fr/competition/club/533368-c-o-s-m-a-foot/information.html | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_guf_l1_k6` | US Sinnamary | https://www.ussinnamary.footeo.com/ | SSL chyba (certifikát): [SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed: Hostname mismatch, certificate | 2026-11-03 |
| `f_grn_l1_liga` | GFA Premier League | https://footystats.org/grenada/gfa-premier-league | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_glp_l1_liga` | Régionale 1 | https://epreuves.fff.fr/competition/engagement/457545-regional-1-vito/phase/1/1/classement | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_glp_l1_k8` | Jeunesse Évolution FC | https://epreuves.fff.fr/competition/club/581477-j-e-fc/information.html | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_glp_l1_k4` | La Gauloise (Basse-Terre) | https://epreuves.fff.fr/competition/club/512718-la-gauloise-basse-te/information.html | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_gua_l1_liga` | Liga Nacional de Guatemala | https://ligagt.org/table/actual/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_guy_l1_liga` | GFF Elite League | https://footystats.org/guyana/gff-elite-league | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_guy_l1_k10` | Camptown FC | https://www.sofascore.com/team/football/camptown-fc/1241759 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_hon_l1_liga` | Liga Nacional de Honduras | https://www.lnphn.com/posiciones | timeout (web neodpovedal včas) | 2026-11-03 |
| `f_mtq_l1_k4` | Club Colonial | https://club-colonial.footeo.com/ | HTTP 500 – chyba servera / výpadok | 2026-11-03 |
| `f_mex_l1_k5` | Cruz Azul | https://cfcruzazul.com/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_mex_l1_k11` | Pachuca | https://tuzos.com.mx/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_mex_l2_k3` | Atlético La Paz | https://www.clubatleticolapaz.com/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_mex_l2_k9` | Jaiba Brava | https://x.com/jaibabravamx | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_mex_l2_k12` | Piratas FC | https://x.com/Piratasfutbolfc | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_mex_l2_k14` | Tepatitlán FC | https://www.tepatitlanfc.com/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_pri_l1_liga` | Liga Puerto Rico Pro (LPR) | https://footystats.org/puerto-rico/liga-puerto-rico | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_slv_l1_k2` | Alianza FC | https://alianzafc.com.sv/ | SSL chyba (certifikát): [SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed: Hostname mismatch, certificate | 2026-11-03 |
| `f_lca_l1_k7` | Central Castries | https://slusemiprofootball.com/team/central-castries/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_tca_l1_k7` | Flamingo FC | https://www.sofascore.com/team/football/flamingo-fc/497454 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_asm_l1_liga` | FFAS Senior League | https://www.sofascore.com/football/tournament/american-samoa/ffas-senior-league/21134 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_asm_l1_k1` | Royal Puma | https://www.sofascore.com/team/football/royal-puma-fc/491994 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_asm_l1_k3` | Ilaoa and To'omata SC | https://www.sofascore.com/team/football/ilaoa-and-toomata-sc/491992 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_asm_l1_k5` | Utulei Youth | https://www.sofascore.com/team/football/utulei-youth/492001 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_asm_l1_k6` | Vaiala Tongan | https://www.sofascore.com/team/football/vaiala-tongan/491999 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_asm_l1_k7` | Lion Heart | https://www.sofascore.com/team/football/lion-heart/491998 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_asm_l1_k8` | Black Roses | https://www.sofascore.com/team/football/black-roses/491995 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_asm_l1_k9` | Green Bay | https://www.sofascore.com/team/football/green-bay-fagaalu/491997 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_asm_l1_k12` | Tupulaga Fagasa | https://www.sofascore.com/team/football/tupulaga-fagasa/556616 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_asm_l1_k11` | Tafuna Jets | https://www.sofascore.com/team/football/tafuna-jets/492000 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_cok_l1_liga` | Round Cup | https://www.sofascore.com/football/tournament/cook-islands/round-cup/21537 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_cok_l1_k6` | Titikaveka | https://www.sofascore.com/team/football/titikaveka-fc/498524 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_ncl_l1_liga` | Super Ligue | https://footystats.org/new-caledonia/super-ligue | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_ncl_l1_k4` | Horizon Patho | https://www.sofascore.com/team/football/as-horizon-patho/1089909 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_nzl_l1_liga` | Dettol National League — Severná liga | https://www.xscores.com/soccer/new-zealand/premiership/national-league-northern-league/standings/2026 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_nzl_l2_liga` | Dettol National League — Centrálna liga | https://www.xscores.com/soccer/new-zealand/premiership/national-league-central-league/standings/2026 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_nzl_l3_liga` | Dettol National League — Južná liga | https://www.xscores.com/soccer/new-zealand/premiership/national-league-southern-league/standings/2026 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_nzl_l3_k10` | Northern AFC | https://www.sporty.co.nz/northernafc/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_png_l1_liga` | Premier Soccer League | https://footystats.org/papua-new-guinea/national-soccer-league | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_png_l1_k7` | FC Morobe Wawens | https://www.sofascore.com/football/team/fc-morobe-wawens/309619 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_png_l1_k13` | Kula FC | https://www.sofascore.com/football/team/kula-fc/1099184 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_png_l1_k11` | NCD FC | https://www.sofascore.com/football/team/ncd-fc/1233204 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_png_l1_k5` | PNG Hekari FC | https://www.sofascore.com/football/team/hekari-united-fc/45341 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_png_l1_k9` | Wawa FC | https://www.sofascore.com/football/team/wawa-fc/1233199 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_wsm_l1_liga` | National League | https://www.sofascore.com/football/tournament/samoa/upolu-national-league/19034 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_wsm_l1_k1` | Faatoia United | https://www.sofascore.com/football/team/faatoia-united/383127 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_wsm_l1_k7` | Sogi | https://www.sofascore.com/football/team/sogi-sc/382557 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_slb_l1_liga` | S-League | https://footystats.org/solomon-islands/s-league | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_slb_l1_k4` | Honiara City FC | https://www.sofascore.com/football/team/fc-honiara-city/371200 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_slb_l1_k6` | Marist FC | https://www.sofascore.com/football/team/marist-fc/246594 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_slb_l1_k7` | SOSA FC | https://www.sofascore.com/football/team/sosa-fc/470827 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_slb_l1_k12` | Southern United FC | https://www.sofascore.com/football/team/fc-southern-united-honiara/371199 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_tah_l1_k7` | AS Dragon | https://www.sofascore.com/football/team/as-dragon/502297 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_tah_l1_k10` | AS Jeunes Tahitiens | https://www.sofascore.com/football/team/as-les-jeunes-tahitiens/502295 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_tah_l1_k6` | AS Pueu | https://www.sofascore.com/football/team/as-pueu/502296 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_ton_l1_liga` | Major League | https://www.sofascore.com/football/tournament/tonga/tfa-major-league/23098 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_ton_l1_k3` | Folaha FC | https://www.sofascore.com/football/team/folaha-marist-kauvai/556523 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_ton_l1_k10` | Ha'amoko United | https://www.sofascore.com/football/team/haamoko-united/931708 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_ton_l1_k4` | Lavengatonga FC | https://www.sofascore.com/football/team/lavengatonga-fc/556518 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_ton_l1_k9` | Longoteme FC | https://www.sofascore.com/football/team/longoteme-fc/931718 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_ton_l1_k5` | Lotohaʻapai United | https://www.sofascore.com/football/team/lotohaapai-united-fc/556521 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_ton_l1_k7` | Navutoka FC | https://www.sofascore.com/team/football/navutoka-fc/556525 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_van_l1_liga` | Super League | https://www.sofascore.com/football/tournament/vanuatu/pvfa-premier-league/20485 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_van_l1_k1` | ABM Galaxy FC | https://www.sofascore.com/football/team/abm-galaxy-fc/338553 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_van_l1_k2` | iCount Yatel FC | https://www.sofascore.com/football/team/icount-yatel-fc/477953 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_van_l1_k6` | Mauriki FC | https://www.sofascore.com/football/team/mauriki-fc/397749 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_van_l1_k5` | Naka United FC | https://www.sofascore.com/football/team/naka-fc/501041 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1784027166602qw3` | UEFA | https://www.uefa.com/ | timeout (web neodpovedal včas) | 2026-11-03 |
| `n1784029367694x1u` | Albánsko | https://fshf.org/sq/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1784029422213xxe` | Arménsko | https://www.ffa.am/hy | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1784029877118k4f` | Belgicko | https://www.rbfa.be/nl | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1784029893842q1h` | Bielorusko | https://abff.by/ | SSL chyba (certifikát): [SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed: unable to get local issuer cer | 2026-11-03 |
| `n1784029934932gcz` | Bulharsko | https://bfunion.bg/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n17840299646206ih` | Česko | https://www.fotbal.cz/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1784030175566fg0` | Francúzsko | https://www.fff.fr/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1784030405677hx9` | Írsko | https://www.fai.ie/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n178403047309482u` | Izrael | https://www.football.org.il/en/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1784030738475eqr` | Maďarsko | https://en.mlsz.hu/ | SSL chyba (certifikát): [SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed: unable to get local issuer cer | 2026-11-03 |
| `n1784030848159t7q` | Portugalsko | https://www.fpf.pt/pt/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1784031101588zgd` | Švajčiarsko | https://www.football.ch/sfv.aspx | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1784032490620jf0` | Guam | https://guamfa.com/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1784032560127x2q` | Indonézia | https://www.pssi.org/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n17840365733894cf` | Malajzia | https://fam.org.my/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1784036632087kq4` | Mjanmarsko | https://the-mff.org/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n17840371409952c9` | Thajsko | https://fathailand.org/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1784037384320k3l` | Turkménsko | https://tff.com.tm/ | SSL chyba (certifikát): [SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed: certificate has expired (_ssl. | 2026-11-03 |
| `n17840380896255ju` | Kolumbia | https://fcf.com.co/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1784038128334q6m` | Peru | https://fpf.org.pe/ | SSL chyba (certifikát): [SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed: unable to get local issuer cer | 2026-11-03 |
| `n17840381487547rz` | Uruguaj | https://www.auf.org.uy/ | timeout (web neodpovedal včas) | 2026-11-03 |
| `n1784040473665y9n` | Alžírsko | https://www.faf.dz/category/equipe-nationale-a/ | timeout (web neodpovedal včas) | 2026-11-03 |
| `n1784041038670w35` | Džibutsko | https://fdf.dj | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n17840411025441z3` | Egypt | https://efa.com.eg/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1784049529545n72` | Kongo | https://www.fecofoot.cg | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1784049655086d5u` | Kongo (DR) | https://fecofa.cd/ | HTTP 503 – chyba servera / výpadok | 2026-11-03 |
| `n17840530148598jm` | Madagaskar | https://fmf.mg | timeout (web neodpovedal včas) | 2026-11-03 |
| `n17840530587880ma` | Malawi | https://fam.mw/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1784053124102lsy` | Maroko | https://frmf.ma/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1784053308186d1h` | Pobrežie Slonoviny | https://fifciv.com/ | HTTP 503 – chyba servera / výpadok | 2026-11-03 |
| `n1784053401045psc` | Rwanda | https://ferwafa.rw/ | timeout (web neodpovedal včas) | 2026-11-03 |
| `n1784054101006wtm` | Tanzánia | https://tff.or.tz/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1784097959446i0h` | Curaçao | https://ffk.cw/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1784103498758lvd` | Francúzska Guyana | https://guyane-foot.fff.fr/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1784103551670glb` | Guadeloupe | https://liguefoot-guadeloupe.fff.fr/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1784104027273tkt` | Martinik | https://liguefoot-martinique.fff.fr/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n17841048634012sr` | Svätý Martin (fr.) | https://saint-martin.fff.fr/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1784055423893yob` | Papua-Nová Guinea | https://pngfootball.com.pg/ | timeout (web neodpovedal včas) | 2026-11-03 |
| `n1784366783555uoy` | Opta stats perform | https://optaplayerstats.statsperform.com/en_GB/soccer | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1784201860550hn3` | Sofascore | https://www.sofascore.com/sk | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n17842018890810ne` | Whoscored | https://www.whoscored.com/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1784201962911f50` | FBref | https://fbref.com/en/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n17842020747244lo` | Soccerstats | https://www.soccerstats.com/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1784202097021f3d` | Footystats | https://footystats.org/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n17842022013536h2` | Squawka | https://www.squawka.com/en/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1784202297407epi` | 11v11 | https://www.11v11.com/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n17842023527476xp` | Club Elo | https://clubelo.com/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1784202392436891` | Worldfootball | https://www.worldfootball.net/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1784202515639a4v` | API-football | https://www.api-football.com/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1784202658111hlg` | Xgstat | https://www.xgstat.com/ | HTTP 429 – príliš veľa požiadaviek (blokuje robotov) | 2026-11-03 |
| `n1784366887968w2h` | Windrawwin | https://www.windrawwin.com/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n17843670020433kq` | Statbunker | https://www.statbunker.com/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |

#### Hokej (133)

| ID | Cesta | Adresa | Dôvod | Od |
|---|---|---|---|---|
| `f_hok_rychla2` | Slovenská hokejová liga – výsledky a tabuľka | https://shl.hockeyslovakia.sk/sk/stats/standings/1198/tipos-shl | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_hok_sut_gl_turnaje` | Zoznam turnajov IIHF | https://www.iihf.com/en/tournaments | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1779957307590bqf` | Majstrovstvá sveta – muži | https://www.iihf.com/en/events/2027/wm | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1779957406553q3o` | Muži – divízia I A | https://www.iihf.com/en/events/2026/wmia | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1779957458588a3j` | Muži – divízia I B | https://www.iihf.com/en/events/2026/wmib | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n17799729180786j4` | Muži – divízia II B | https://www.iihf.com/en/events/2026/wmiib | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n17799729447036wo` | Muži – divízia III A | https://www.iihf.com/en/events/2026/wmiiia | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1779972971205l7j` | Muži – divízia III B | https://www.iihf.com/en/events/2026/wmiiib | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1779973077270r7j` | Majstrovstvá sveta juniorov | https://www.iihf.com/en/events/2026/wm20 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1779973261466y8y` | Juniori – divízia I A | https://www.iihf.com/en/events/2026/wm20ia | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1779973309690ikw` | Juniori – divízia I B | https://www.iihf.com/en/events/2026/wm20ib | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1779973403916qd8` | Juniori – divízia II A | https://www.iihf.com/en/events/2026/wm20iia | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n177997343722714v` | Juniori – divízia II B | https://www.iihf.com/en/events/2026/wm20iib | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n17800409125828mc` | Juniori – divízia III A | https://www.iihf.com/en/events/2026/wm20iiia | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1780040983939emm` | Juniori – divízia III B | https://www.iihf.com/en/events/2026/wm20iiib | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n178004106395703f` | Majstrovstvá sveta do 18 rokov | https://www.iihf.com/en/events/2027/wm18 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n17800411059541r2` | Do 18 rokov – divízia I A | https://www.iihf.com/en/events/2026/wm18ia | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1780041135153dbi` | Do 18 rokov – divízia I B | https://www.iihf.com/en/events/2026/wm18ib | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n17800412568945ti` | Majstrovstvá sveta žien | https://www.iihf.com/en/events/2026/ww | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1780041364084ojn` | Ženy – divízia I A | https://www.iihf.com/en/events/2026/wwia | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1780041423660bzz` | Ženy – divízia I B | https://www.iihf.com/en/events/2026/wwib | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1780041450345ch1` | Ženy – divízia II A | https://www.iihf.com/en/events/2026/wwiia | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1780041476932bbv` | Ženy – divízia II B | https://www.iihf.com/en/events/2026/wwiib | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1780041567814xkw` | Ženy – divízia III A | https://www.iihf.com/en/events/2026/wwiiia | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1780041593132f9m` | Ženy – divízia III B | https://www.iihf.com/en/events/2026/wwiiib | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1780041760713w51` | Majstrovstvá sveta žien do 18 rokov | https://www.iihf.com/en/events/2026/ww18 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1780041796316c5e` | Ženy do 18 rokov – divízia I A | https://www.iihf.com/en/events/2026/ww18ia | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1780041849975vvw` | Ženy do 18 rokov – divízia I B | https://www.iihf.com/en/events/2026/ww18ib | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1789209279394sut90` | IIHF Development Cup | https://www.iihf.com/en/static/55440/development_cup | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1780045098912syh` | LNAH – Ligue Nord-Américaine de Hockey | https://www.lnah.com/fr/index.html | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1789210196518eht00` | Karjala Cup – Fínske hokejové hry | https://www.leijonat.com/karjala-turnaus/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1789210196518eht02` | České hokejové hry | https://www.hokej.cz/reprezentace/zapasy/fortuna-hockey-games/21 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1789209279393sut00` | Kontinentálny pohár IIHF | https://www.iihf.com/en/tournaments?tournamentCategory=clubs | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1783520324419c3v` | CEHL – Stredoeurópska hokejová liga | https://www.cehl.eu/ | SSL chyba (certifikát): [SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed: self-signed certificate (_ssl. | 2026-11-03 |
| `n1789209279393sut04` | IIHF Európsky pohár národov | https://www.iihf.com/en/static/75466/european_cup_of_nations | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_hok_sut_az_s2` | Majstrovstvá Ázie – muži | https://www.iihf.com/en/events/2026/aom | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_hok_sut_az_s3` | Majstrovstvá Ázie – ženy | https://www.iihf.com/en/events/2026/aow | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_hok_sut_az_s4` | Majstrovstvá Ázie a Oceánie U18 | https://www.iihf.com/en/events/2026/aom18 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_hok_klu_na_sphl_k9` | Pensacola Ice Flyers | https://iceflyers.com/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_hok_klu_na_sphl_k10` | Peoria Rivermen | https://www.rivermen.net/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_hok_klu_na_lnah_liga` | LNAH – Ligue Nord-Américaine de Hockey | https://www.lnah.com/fr/stats/classement.html | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_hok_klu_na_lnah_k1` | Jonquière Marquis | https://jonquiere.lnah.com/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_hok_klu_na_lnah_k2` | Manotick Mariners | https://mariners.lnah.com/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_hok_klu_na_lnah_k3` | National de Québec | https://national.lnah.com/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_hok_klu_na_lnah_k4` | Rivière-du-Loup 3L | https://rdl.lnah.com/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_hok_klu_na_lnah_k5` | Saint-Georges Cool FM 103.5 | https://st-georges.lnah.com/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_hok_klu_na_lnah_k6` | Saint-Hyacinthe Bataillon | https://bataillon.lnah.com/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_hok_klu_na_lnah_k7` | Sorel-Tracy Éperviers | https://sorel.lnah.com/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_hok_klu_na_lnah_k8` | Thetford Assurancia | https://thetford.lnah.com/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_hok_klu_na_ohl_liga` | OHL – Ontario Hockey League | https://chl.ca/ohl/standings/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_hok_klu_na_nahl_k5` | Billings Cattle Punchers | https://cattlepunchers.com | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_hok_klu_na_nahl_k14` | Idaho Falls Spud Kings | https://ifspudkings.com | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_hok_klu_na_ncdc_k22` | Red River Spartans | https://spartanshockeytn.com/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_hok_klu_na_ncdc_k44` | Universel Quebec | https://www.eliteprospects.com/team/44969/universel-college-quebec | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_hok_klu_eu_svk_l1_k8` | HK Nitra | https://hknitra.sk/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_hok_klu_eu_svk_l1_k12` | Vlci Žilina | https://www.vlcizilina.sk/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) (po presmerovaní na vlcizilina.hockeyslovakia.sk) | 2026-11-03 |
| `f_hok_klu_eu_svk_l2_liga` | Slovensko – Slovenská hokejová liga | https://shl.hockeyslovakia.sk/sk/stats/standings/1198/tipos-shl | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_hok_klu_eu_svk_l2_k4` | HC Topoľčany | https://hctopolcany.hockeyslovakia.sk/sk/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_hok_klu_eu_svk_l2_k11` | HK ‘95 Považská Bystrica | https://hk95pby.hockeyslovakia.sk/sk/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_hok_klu_eu_svk_l2_k8` | HK Skalica | https://www.hkskalica.sk/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) (po presmerovaní na hkskalica.hockeyslovakia.sk) | 2026-11-03 |
| `f_hok_klu_eu_svk_l2_k12` | Rytieri Martin | https://mhamartin.hockeyslovakia.sk/sk/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_hok_klu_eu_cze_l1_liga` | Česko – Tipsport extraliga | https://www.hokej.cz/tipsport-extraliga/table | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_hok_klu_eu_cze_l1_k2` | BK Mladá Boleslav | https://www.bkboleslav.cz/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_hok_klu_eu_cze_l2_liga` | Česko – Maxa liga | https://www.hokej.cz/maxa-liga/table | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_hok_klu_eu_cze_l2_k11` | Piráti Chomutov | https://www.piratichomutov.cz/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_hok_klu_eu_deu_l1_k3` | EHC Red Bull München | https://www.redbullmuenchen.de/ | HTTP 500 – chyba servera / výpadok | 2026-11-03 |
| `f_hok_klu_eu_deu_l1_k5` | ERC Ingolstadt | https://www.erc-ingolstadt.de/ | HTTP 429 – príliš veľa požiadaviek (blokuje robotov) | 2026-11-03 |
| `f_hok_klu_eu_deu_l1_k7` | Grizzlys Wolfsburg | https://www.grizzlys.de/ | HTTP 503 – chyba servera / výpadok | 2026-11-03 |
| `f_hok_klu_eu_deu_l1_k10` | Krefeld Pinguine | https://krefeld-pinguine.de/ | HTTP 503 – chyba servera / výpadok | 2026-11-03 |
| `f_hok_klu_eu_deu_l2_k5` | EC Bad Nauheim | https://ec-bn.de/ | HTTP 503 – chyba servera / výpadok | 2026-11-03 |
| `f_hok_klu_eu_rus_l1_k13` | Salavat Julajev Ufa | https://hcsalavat.ru/ | timeout (web neodpovedal včas) | 2026-11-03 |
| `f_hok_klu_eu_rus_l1_k17` | Spartak Moskva | https://spartak.ru/ | SSL chyba (certifikát): [SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed: unable to get local issuer cer | 2026-11-03 |
| `f_hok_klu_eu_rus_l2_k7` | Dizel Penza | https://hcdizel.ru/ | timeout (web neodpovedal včas) | 2026-11-03 |
| `f_hok_klu_eu_rus_l2_k9` | Dynamo-Altaj Barnaul | https://hcda.ru/ | timeout (web neodpovedal včas) | 2026-11-03 |
| `f_hok_klu_eu_rus_l2_k15` | Jugra Chanty-Mansijsk | https://www.ugra-hc.ru/ | chyba spojenia: OSError [Errno 101] Network is unreachable | 2026-11-03 |
| `f_hok_klu_eu_rus_l2_k20` | Molot Perm | https://hc-molot.ru/ | chyba spojenia: OSError [Errno 101] Network is unreachable | 2026-11-03 |
| `f_hok_klu_eu_rus_l2_k22` | Olimpija Kirovo-Čepeck | https://hcolimpia.ru/ | timeout (web neodpovedal včas) | 2026-11-03 |
| `f_hok_klu_eu_rus_l2_k24` | Riazaň-VDV | https://хкрязань.рф/ | timeout (web neodpovedal včas) | 2026-11-03 |
| `f_hok_klu_eu_rus_l2_k25` | Rubin Ťumeň | https://rubinhc.ru/ | timeout (web neodpovedal včas) | 2026-11-03 |
| `f_hok_klu_eu_rus_l2_k28` | Toros Neftekamsk | https://hctoros.ru/ | timeout (web neodpovedal včas) | 2026-11-03 |
| `f_hok_klu_eu_bih_l1_liga` | Bosna a Hercegovina – Hokejová liga | https://www.eliteprospects.com/league/bosnia/standings | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_hok_klu_eu_bih_l1_k1` | Blue Bulls Sarajevo | https://www.eliteprospects.com/team/16685/blue-bulls-sarajevo | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_hok_klu_eu_bgr_l1_liga` | Bulharsko – Hokejová liga | https://www.eliteprospects.com/league/bulgaria/standings | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_hok_klu_eu_bgr_l1_k6` | Balkan Botevgrad | https://www.eliteprospects.com/team/50731/balkan-botevgrad | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_hok_klu_eu_bgr_l1_k7` | Dinamo Sofia | https://www.eliteprospects.com/team/6713/dinamo-sofia | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_hok_klu_eu_bgr_l1_k5` | Slavia Sofia | https://www.eliteprospects.com/team/4498/hc-slavia-sofia | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_hok_klu_eu_fra_l1_k12` | Spartiates de Marseille | https://marseillehockeyclub.com/ | HTTP 503 – chyba servera / výpadok | 2026-11-03 |
| `f_hok_klu_eu_fra_l2_k5` | Diables Rouges de Valenciennes | https://www.diablesrouges.fr/ | HTTP 503 – chyba servera / výpadok | 2026-11-03 |
| `f_hok_klu_eu_hrv_l1_liga` | Chorvátsko – Prvenstvo Hrvatske | https://www.eliteprospects.com/league/croatia/standings | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_hok_klu_eu_isl_l1_liga` | Island – Toppdeild karla | https://www.eliteprospects.com/league/iceland/standings | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_hok_klu_eu_kaz_l1_k5` | HK Aktobe | https://hfaktobe.kz/ru/pro | timeout (web neodpovedal včas) | 2026-11-03 |
| `f_hok_klu_eu_hun_l1_k4` | DVTK Jegesmedvék Miskolc | https://dvtk.eu/3-jegkorong-sportag | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_hok_klu_eu_nor_l2_k8` | Tromsø Ishockeyklubb | https://www.tromsohockey.no/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_hok_klu_eu_aut_l1_k3` | EC Red Bull Salzburg | https://ecrbs.redbulls.com/ | HTTP 500 – chyba servera / výpadok | 2026-11-03 |
| `f_hok_klu_eu_aut_l2_k4` | Red Bull Hockey Juniors | https://ecrbs.redbulls.com/de/academy/teams?teamType=RBJ | HTTP 500 – chyba servera / výpadok | 2026-11-03 |
| `f_hok_klu_eu_rou_l1_k8` | Steaua București | https://www.eliteprospects.com/team/2915/steaua-bucuresti | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_hok_klu_eu_svn_l1_k2` | HDK Maribor | https://lisjaki.net/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_hok_klu_eu_ita_l1_k5` | HC Pustertal | https://www.hcpustertal.com/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_hok_klu_eu_gbr_l2_k3` | Hull Seahawks | https://www.hullseahawks.co.uk/ | HTTP 503 – chyba servera / výpadok | 2026-11-03 |
| `f_hok_klu_eu_gbr_l2_k7` | Romford Raiders | https://romfordraiders.co.uk/ | HTTP 503 – chyba servera / výpadok | 2026-11-03 |
| `f_hok_aso_gl_iihf` | IIHF – Medzinárodná hokejová federácia | https://www.iihf.com/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_hok_aso_gl_iihfhalloffa` | IIHF Hall of Fame | https://www.iihf.com/en/static/5114/hall-of-fame | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_hok_aso_eu_svk` | Slovensko | https://www.hockeyslovakia.sk/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_hok_aso_eu_fin` | Fínsko | https://www.finhockey.fi/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_hok_aso_eu_ukr` | Ukrajina | https://fhu.com.ua/ | chyba spojenia: OSError [Errno 101] Network is unreachable | 2026-11-03 |
| `f_hok_aso_na_ca` | Kanada | https://www.hockeycanada.ca/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_hok_aso_ao_cn` | Čína | https://www.iihf.com/en/associations/334/china | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_hok_aso_ao_hk` | Hongkong | https://www.iihf.com/en/associations/348/hong-kong | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_hok_aso_ao_id` | Indonézia | https://www.iihf.com/en/associations/352/indonesia | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_hok_aso_ao_ir` | Irán | https://www.iihf.com/en/associations/14688/iran | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_hok_aso_ao_kw` | Kuvajt | https://www.iihf.com/en/associations/1340/kuwait | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_hok_aso_ao_mo` | Macao | https://www.iihf.com/en/associations/1346/macau | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_hok_aso_ao_my` | Malajzia | https://www.iihf.com/en/associations/1347/malaysia | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_hok_aso_ao_mn` | Mongolsko | https://www.iihf.com/en/associations/1350/mongolia | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_hok_aso_ao_om` | Omán | https://www.iihf.com/en/associations/1356/oman | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_hok_aso_ao_ae` | SAE | https://www.iihf.com/en/associations/1375/united-arab-emirates | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_hok_aso_ao_kp` | Severná Kórea | https://www.iihf.com/en/associations/339/dpr-korea | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_hok_aso_ao_th` | Thajsko | https://www.iihf.com/en/associations/1371/thailand | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_hok_aso_ao_tm` | Turkménsko | https://www.iihf.com/en/associations/1373/turkmenistan | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_hok_aso_afja_ma` | Maroko | https://www.iihf.com/en/associations/1351/morocco | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_hok_sta_k3` | Hokej.cz | https://www.hokej.cz/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_hok_sta_k38` | HockeySlovakia – štatistiky | https://www.hockeyslovakia.sk/sk/stats/players/1197/tipsport-liga | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_hok_sta_k5` | Elite Prospects | https://www.eliteprospects.com/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_hok_sta_k9` | Natural Stat Trick | https://www.naturalstattrick.com/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_hok_sta_k13` | QuantHockey | https://www.quanthockey.com/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_hok_sta_k14` | HockeyDB | https://www.hockeydb.com/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_hok_sta_k15` | Eurohockey.com | https://www.eurohockey.com/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_hok_sta_k16` | IIHF – Svetový rebríček mužov | https://www.iihf.com/en/static/68775/iihf_world_rankings_men | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_hok_sta_k17` | PuckPedia | https://puckpedia.com/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_hok_sta_k41` | Smaht Scouting | https://smahtscouting.com/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_hok_sta_k31` | Eishockey News | https://www.eishockeynews.de/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_hok_sta_k33` | Jatkoaika | https://www.jatkoaika.com/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_hok_sta_k37` | The IX Hockey | https://www.theixsports.com/hockey-newsroom/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |

#### Tenis (47)

| ID | Cesta | Adresa | Dôvod | Od |
|---|---|---|---|---|
| `n1788820000001a5` | ABN AMRO Open | https://www.abnamro-open.nl/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1788820000006a5` | Barcelona Open Banc Sabadell | https://www.barcelonaopenbancsabadell.com/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1788830000000a5` | Brisbane International | https://www.tennis.com.au/brisbane-international | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1788830000002a5` | Adelaide International | https://www.tennis.com.au/adelaide-international | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1788830000003a5` | ASB Classic | https://www.asbclassic.co.nz/en | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1788830000023a5` | Chengdu Open | https://www.atptour.com/en/tournaments/chengdu/7581/overview | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1788830000026a5` | Grand Prix Auvergne-Rhône-Alpes | https://www.grandprix-auvergnerhonealpes.com/ | HTTP 503 – chyba servera / výpadok | 2026-11-03 |
| `n1788830000000w5h` | Brisbane International | https://www.tennis.com.au/brisbane-international | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1788830000001w5h` | Adelaide International | https://www.tennis.com.au/adelaide-international | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1788830000012w5h` | Abierto GNP Seguros | https://abiertognpseguros.com/ | SSL chyba (certifikát): [SSL: TLSV1_UNRECOGNIZED_NAME] tlsv1 unrecognized name (_ssl.c:1010) | 2026-11-03 |
| `n1788840000000w2h` | ASB Classic | https://www.asbclassic.co.nz/en | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1788840000001w2h` | Hobart International | https://www.hobartinternational.com.au/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1788850000000oth` | ATP Challenger Tour | https://www.atptour.com/en/challenger-tour | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1788881000002thm` | Fabian Marozsán | https://marozsanfabian.com/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1788890000033thz` | Karolína Plíšková | https://www.karolina-pliskova.com/en/ | chyba spojenia: OSError [Errno 101] Network is unreachable | 2026-11-03 |
| `n1788870000001glo` | ATP Tour | https://www.atptour.com/en | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_ten_aso_eu_k41` | Arménsko | https://www.tennisarmenia.org/ | DNS dočasne neodpovedá | 2026-11-03 |
| `f_ten_aso_eu_k13` | Írsko | https://www.tennisireland.ie/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_ten_aso_eu_k50` | Monako | https://www.monaco-tennis.com/ | HTTP 503 – chyba servera / výpadok | 2026-11-03 |
| `f_ten_aso_eu_k24` | Portugalsko | https://www.fptenis.pt/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) (po presmerovaní na tenis.tiesports.com) | 2026-11-03 |
| `f_ten_aso_az_k6` | Filipíny | https://www.philta.org/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_ten_aso_az_k8` | India | https://www.aitatennis.com/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_ten_aso_az_k9` | Indonézia | https://www.pelti.org/ | SSL chyba (certifikát): [SSL: TLSV1_ALERT_INTERNAL_ERROR] tlsv1 alert internal error (_ssl.c:1010) | 2026-11-03 |
| `f_ten_aso_az_k18` | Kazachstan | https://ktf.kz/ | SSL chyba (certifikát): [SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed: unable to get local issuer cer | 2026-11-03 |
| `f_ten_aso_ja_k12` | Uruguaj | https://aut.uy/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) (po presmerovaní na uy.tenisintegrado.com) | 2026-11-03 |
| `f_ten_aso_ja_k13` | Venezuela | https://fvtenis.org/ | HTTP 503 – chyba servera / výpadok | 2026-11-03 |
| `f_ten_aso_af_k3` | Angola | https://ao.tenisintegrado.com/home | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_ten_aso_af_k8` | Egypt | https://www.egypttennis.com/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_ten_aso_af_k12` | JAR | https://www.tennissa.co.za/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_ten_aso_af_k20` | Namíbia | https://tennisnamibia.sportyhq.com/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_ten_aso_na_k9` | Dominikánska republika | https://fedotenis.org.do/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_ten_aso_oc_k1` | OTF – Oceánska tenisová federácia | https://www.oceaniatennis.com/ | timeout (web neodpovedal včas) | 2026-11-03 |
| `f_ten_aso_oc_k3` | Austrália | https://www.tennis.com.au/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1788780000007tak07` | IMG Academy | https://www.imgacademy.com/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1788780000010tak10` | Piatti Tennis Center | https://www.piattitenniscenter.it/en/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_ten_spr_k1` | ATP – rebríček dvojhry | https://www.atptour.com/en/rankings/singles | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_ten_spr_k2` | ATP – rebríček štvorhry | https://www.atptour.com/en/rankings/doubles | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_ten_spr_k3` | ATP Race to Turin | https://www.atptour.com/en/rankings/singles-race-to-turin | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_ten_spr_k4` | ATP Race – štvorhra | https://www.atptour.com/en/rankings/doubles-team-rankings | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_ten_spr_k17` | Tenisový svet | https://www.tenisovysvet.cz/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_ten_spr_k21` | Live Tennis Ranking | https://live-tennis.eu/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_ten_spr_k23` | SofaScore – Tenis | https://www.sofascore.com/tennis | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_ten_spr_k24` | Tennis Abstract | https://www.tennisabstract.com/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_ten_spr_k30` | Tennis World USA | https://www.tennisworldusa.org/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_ten_spr_k31` | Perfect Tennis | https://www.perfect-tennis.com/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_ten_spr_k33` | Tennis Tonic | https://www.tennistonic.com/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_ten_spr_k38` | Tennishead | https://tennishead.net/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |

#### Basketbal (116)

| ID | Cesta | Adresa | Dôvod | Od |
|---|---|---|---|---|
| `f_bas_sut_eu_k3` | EuroLeague (muži) | https://www.euroleaguebasketball.net/en/euroleague/ | HTTP 429 – príliš veľa požiadaviek (blokuje robotov) | 2026-11-03 |
| `f_bas_sut_eu_k5` | EuroCup (muži) | https://www.euroleaguebasketball.net/en/eurocup/ | HTTP 429 – príliš veľa požiadaviek (blokuje robotov) | 2026-11-03 |
| `f_bas_sut_eu_k22` | NextGen EuroLeague | https://www.euroleaguebasketball.net/en/nge/ | HTTP 429 – príliš veľa požiadaviek (blokuje robotov) | 2026-11-03 |
| `f_bas_sut_na_k1` | NBA | https://www.nba.com | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_bas_cze_l1_liga` | Národní basketbalová liga | https://nbl.basketball/tabulka | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_bas_esp_l1_k11` | Força Lleida | https://flleida.cat | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_bas_esp_l2_liga` | Primera FEB | https://www.feb.es/primerafeb/clasificacion.aspx | timeout (web neodpovedal včas) | 2026-11-03 |
| `f_bas_esp_l2_k12` | Estudiantes | https://www.movistarestudiantes.com | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_bas_esp_l3_liga` | Liga Femenina | https://www.feb.es/lfendesa/clasificacion.aspx | timeout (web neodpovedal včas) | 2026-11-03 |
| `f_bas_esp_l3_k14` | Movistar Estudiantes | https://www.movistarestudiantes.com/femenino/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_bas_ger_l1_k3` | Basketball Löwen Braunschweig | https://www.basketball-loewen.de | HTTP 503 – chyba servera / výpadok | 2026-11-03 |
| `f_bas_ger_l1_k5` | FC Bayern München | https://fcbayern.com/basketball/de | timeout (web neodpovedal včas) | 2026-11-03 |
| `f_bas_ger_l1_k13` | Riesen Ludwigsburg | https://mhp-riesen-ludwigsburg.de/ | HTTP 503 – chyba servera / výpadok | 2026-11-03 |
| `f_bas_ger_l2_k7` | ETB Miners Essen | https://miners.ruhr | HTTP 503 – chyba servera / výpadok | 2026-11-03 |
| `f_bas_ger_l3_k2` | BC Marburg | https://bc-marburg.de/ | HTTP 503 – chyba servera / výpadok | 2026-11-03 |
| `f_bas_ger_l3_k8` | Rutronik Stars Keltern | https://www.rutronik-stars-keltern.de/ | HTTP 503 – chyba servera / výpadok | 2026-11-03 |
| `f_bas_ita_l3_k1` | Basket Costa Masnaga | https://basketcosta.com/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_bas_fra_l1_k1` | ASVEL | https://ldlcasvel.com | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_bas_fra_l1_k8` | JDA Dijon | https://www.jdadijon.com | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_bas_fra_l1_k10` | Le Mans Sarthe Basket | https://www.msb.fr | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_bas_fra_l3_liga` | Ligue féminine — tabuľka | https://competitions.ffbb.com/competitions/lbwl/classement | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_bas_fra_l3_k4` | C'Chartres Basket Féminin | https://www.avisclient-cbf.fr/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_bas_klu_eu_alb_k3` | Elbasani | https://basketball.eurobasket.com/team/Elbasani/5517 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_bas_klu_eu_alb_k5` | Flamurtari Vlorë | https://basketball.eurobasket.com/team/Flamurtari-Vlore/5510 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_bas_klu_eu_alb_k8` | Partizani Tiranë | https://basketball.eurobasket.com/team/Partizani-Tirana/1430 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_bas_klu_eu_alb_k11` | Tirana Neptun | https://basketball.eurobasket.com/team/Sport-Klub-Tirana-Neptun/2191 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_bas_klu_eu_arm_liga` | League A | https://basketball.eurobasket.com/Armenia/basketball-LeagueA-Standings.aspx | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_bas_klu_eu_arm_k1` | Artik BC | https://basketball.eurobasket.com/team/Artik-BC/14129 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_bas_klu_eu_arm_k2` | BC Olympavan | https://basketball.eurobasket.com/team/BC-Olympavan/73644 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_bas_klu_eu_arm_k3` | BKMA | https://basketball.eurobasket.com/team/BKMA-Yerevan/62497 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_bas_klu_eu_arm_k4` | Erebuni | https://basketball.eurobasket.com/team/Erebuni-Yerevan/49184 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_bas_klu_eu_arm_k6` | Phoenix | https://basketball.eurobasket.com/team/Phoenix/73709 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_bas_klu_eu_arm_k8` | US Titans | https://basketball.eurobasket.com/team/US-Titans-Yerevan/70055 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_bas_klu_eu_aze_liga` | Azerbaijan Basketball League | https://basketball.eurobasket.com/Azerbaijan/Azerbaijan-Basketball-League-Standings.aspx | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_bas_klu_eu_blr_k2` | Grodno-93 | https://basketball.eurobasket.com/team/Belarus/BK-Grodno-93/1311 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_bas_klu_eu_blr_k4` | RGUOR Minsk | https://basketball.eurobasket.com/team/Belarus/RGUOR-Minsk/497 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_bas_klu_eu_cyp_k10` | Keravnos | https://keravnosbc.com/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_bas_klu_eu_mne_k3` | Dečić | https://basketball.eurobasket.com/team/decic/65981 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_bas_den_l1_k2` | BC Copenhagen | https://bccopenhagen.com/ | HTTP 454 | 2026-11-03 |
| `f_bas_fin_l1_k9` | Lahti Basketball | https://lahtibasketball.fi | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_bas_gre_l1_k10` | Panathinaikos | https://www.paobc.gr | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_bas_gre_l1_k11` | PAOK | https://www.paokbc.gr | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_bas_ned_l3_k5` | Jolly Jumpers | https://jollyjumpersbasketbal.nl/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_bas_ltu_l1_liga` | Lietuvos krepšinio lyga | https://lkl.lt/turnyrine-lentele | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_bas_ltu_l1_k10` | Žalgiris Kaunas | https://zalgiris.lt/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_bas_klu_eu_lat_k1` | BK Liepāja | https://www.liepajasbasketbols.lv/ | timeout (web neodpovedal včas) | 2026-11-03 |
| `f_bas_hun_l1_k4` | Budapesti Honvéd | https://honved.hu/kosarlabda/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_bas_hun_l3_k4` | ELTE BEAC Újbuda | https://kosarlabda.beac.hu/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_bas_hun_l3_k6` | KSC Szekszárd | https://kscszekszard.hu/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_bas_klu_eu_nor_k1` | Ammerud Basket | https://www.ammerudbasket.no | HTTP 401 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_bas_pol_l1_k5` | Dziki Warszawa | https://dziki.basketball | timeout (web neodpovedal včas) | 2026-11-03 |
| `f_bas_pol_l3_k12` | Widzew Łódź | https://www.widzewkosz.pl/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_bas_aut_l1_k1` | BBC Nord Dragonz | https://bbc-nord.at/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_bas_rou_l1_k7` | CSU Sibiu | https://www.csusibiu.ro/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_bas_rou_l3_k1` | ACS Sepsi-SIC | https://sepsi-sic.ro/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_bas_klu_eu_slo_k8` | Šenčur | https://kksencur.si/ | timeout (web neodpovedal včas) | 2026-11-03 |
| `f_bas_srb_l1_k19` | Spartak Subotica | https://www.kkspartak.rs/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_bas_srb_l3_k4` | Kraljevo | https://basketball.eurobasket.com/team/Serbia/ZKK-Kraljevo/10549 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_bas_srb_l3_k5` | Mega MIS | https://basketball.eurobasket.com/team/Serbia/ZKK-Mega-MIS-Beograd/49542 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_bas_tur_l1_k4` | Beşiktaş | https://bjk.com.tr | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_bas_tur_l1_k5` | Bursaspor | https://www.bursaspor.org.tr/bs/basketbol/ | timeout (web neodpovedal včas) | 2026-11-03 |
| `f_bas_tur_l1_k9` | Fenerbahçe | https://www.fenerbahce.org/branslar/basketbolerkek/haberler | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_bas_tur_l1_k15` | Trabzonspor | https://www.trabzonspor.org.tr | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_bas_tur_l3_k1` | Beşiktaş | https://bjk.com.tr/tr/takim/11/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_bas_tur_l3_k2` | BOTAŞ | https://www.botasspor.org.tr/ | SSL chyba (certifikát): [SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed: unable to get local issuer cer | 2026-11-03 |
| `f_bas_tur_l3_k5` | Fenerbahçe | https://www.fenerbahce.org/branslar/basketbolkadin | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_bas_gbr_l1_liga` | Super League Basketball | https://www.superleaguebasketballm.co.uk/competitions/?WHurl=%2Fcompetition%2F49597%2Fstandings | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_bas_gbr_l3_liga` | Super League Basketball (ženy) | https://www.superleaguebasketballw.co.uk/competitions/?WHurl=%2Fcompetition%2F49542%2Fstandings | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_bas_jpn_l2_k4` | Denso Iris | https://iris.denso.com/ | HTTP 503 – chyba servera / výpadok | 2026-11-03 |
| `f_bas_kor_l2_k1` | Asan Woori Bank Woori Won | https://wooriwon.wooribank.com/basketball/main/main.php | SSL chyba (certifikát): [SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed: unable to get local issuer cer | 2026-11-03 |
| `f_bas_kor_l2_k5` | Incheon Shinhan Bank S-Birds | https://www.sbirds.com | server prerušil spojenie | 2026-11-03 |
| `f_bas_tpe_l1_k2` | Hsinchu Lioneers | https://www.lioneers.tw/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_bas_idn_l1_liga` | Indonesian Basketball League (IBL) | https://iblindonesia.com/games/standing | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_bas_phl_l1_liga` | Philippine Basketball Association (PBA) | https://www.pba.ph/standings | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_bas_phl_l1_k11` | Terrafirma Dyip | https://www.pba.ph/teams/terrafirma-dyip | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_bas_hkg_l1_k10` | Winling | https://www.winlingbc.com | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_bas_qat_l1_k2` | Al Arabi | https://alarabi.qa/category/basketball-ar/ | timeout (web neodpovedal včas) | 2026-11-03 |
| `f_bas_qat_l1_k7` | Al Shamal | https://alshamal.qa/category/basketball/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_bas_qat_l1_k9` | Qatar SC | https://qatarsc.qa/category/basketball | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_bas_kaz_l1_k2` | Astana | https://astanabasket.kz/ru/ | timeout (web neodpovedal včas) | 2026-11-03 |
| `f_bas_sau_l1_k1` | Al Farouq | https://x.com/farouksports | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_bas_sau_l1_k7` | Al Salam | https://nadialsalam.sa | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_bas_sau_l1_k8` | Al-Ula | https://alulaclub.sa | timeout (web neodpovedal včas) | 2026-11-03 |
| `f_bas_arg_l1_k11` | Oberá Tenis Club | https://oberatenisclub.com.ar | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_bas_bra_l1_liga` | Novo Basquete Brasil (NBB) | https://lnb.com.br/nbb/classificacao/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_bas_ago_l1_k8` | Petro de Luanda | https://petroatletico.co.ao/basquetebol | SSL chyba (certifikát): [SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed: certificate has expired (_ssl. | 2026-11-03 |
| `f_bas_lby_l1_liga` | Libyan Division I | https://www.sofascore.com/basketball/tournament/libya/libyan-basketball-league/24175 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_bas_lby_l1_k4` | Al-Ittihad | https://ittihadclub.ly/basketball | timeout (web neodpovedal včas) | 2026-11-03 |
| `f_bas_sen_l1_k4` | ASC Ville de Dakar | https://ascvdbasketball.com | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_bas_nzl_l1_k11` | Wellington Saints | https://www.saints.co.nz | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_bas_aso_eu_k21` | Izrael | https://ibasketball.co.il | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_bas_aso_eu_k27` | Malta | https://maltabasketball.web.geniussports.com | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_bas_aso_eu_k40` | Španielsko | https://www.feb.es | timeout (web neodpovedal včas) | 2026-11-03 |
| `f_bas_aso_eu_k44` | Turecko | https://www.tbf.org.tr | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_bas_aso_eu_k46` | Veľká Británia | https://www.eurobasket.com/Great-Britain/basketball.aspx | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_bas_aso_az_k2` | Bahrajn | https://basketball.bh | HTTP 503 – chyba servera / výpadok | 2026-11-03 |
| `f_bas_aso_ja_k2` | Bolívia | https://fbol.web.geniussports.com/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_bas_aso_af_k2` | Angola | https://fab.web.geniussports.com/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_bas_aso_af_k29` | Madagaskar | https://mbf.web.geniussports.com/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_bas_aso_af_k41` | Rwanda | https://ferwaba.web.geniussports.com/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_bas_aso_af_k52` | Uganda | https://fuba.web.geniussports.com/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_bas_aso_na_k10` | Dominikánska republika | https://fedombal.org/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_bas_aso_na_k19` | Kostarika | https://fcba.web.geniussports.com/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_bas_sta_k1` | Eurobasket.com | https://www.eurobasket.com/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_bas_sta_k15` | Basketball Insiders | https://www.basketballinsiders.com/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_bas_sta_k16` | SLAM | https://slamonline.com/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_bas_sta_k17` | NBADraft.net | https://www.nbadraft.net/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_bas_sta_k20` | Bart Torvik | https://barttorvik.com/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_bas_sta_k21` | KenPom | https://kenpom.com/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_bas_sta_k23` | RealGM | https://basketball.realgm.com/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_bas_sta_k4` | EuroLeague Stats | https://www.euroleaguebasketball.net/en/euroleague/stats/ | HTTP 429 – príliš veľa požiadaviek (blokuje robotov) | 2026-11-03 |
| `f_bas_sta_k24` | Proballers | https://www.proballers.com/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_bas_sta_k25` | Hack a Stat | https://hackastat.eu/en/home-page-eng/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_bas_sta_k30` | TalkBasket | https://www.talkbasket.net/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_bas_sta_k31` | Scoutbasketball | https://scoutbasketball.com/ | HTTP 502 – chyba servera / výpadok | 2026-11-03 |
| `f_bas_sta_k32` | BeBasket | https://www.bebasket.fr/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |

#### Hádzaná (84)

| ID | Cesta | Adresa | Dôvod | Od |
|---|---|---|---|---|
| `f_had_deu_l1_k9` | Rhein-Neckar Löwen | https://www.rhein-neckar-loewen.de | HTTP 503 – chyba servera / výpadok | 2026-11-03 |
| `f_had_deu_l2_k4` | Die Eulen Ludwigshafen | https://eulen-ludwigshafen.de | HTTP 503 – chyba servera / výpadok | 2026-11-03 |
| `f_had_deu_l2_k6` | HC Elbflorenz | https://hc-elbflorenz.de | HTTP 503 – chyba servera / výpadok | 2026-11-03 |
| `f_had_deu_l2_k16` | TV Großwallstadt | https://www.tvgrosswallstadt.de | HTTP 503 – chyba servera / výpadok | 2026-11-03 |
| `f_had_deu_l3_k7` | HSG Blomberg-Lippe | https://hsg-blomberg-lippe.de | HTTP 503 – chyba servera / výpadok | 2026-11-03 |
| `f_had_fra_l1_k2` | Caen Handball | https://www.handballvikings.com/accueil | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_had_fra_l2_k5` | Grand Besançon Doubs Handball | https://gbdh.fr | HTTP 503 – chyba servera / výpadok | 2026-11-03 |
| `f_had_fra_l2_k8` | JS Cherbourg Manche Handball | https://www.jscherbourg.fr | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_had_fra_l3_k5` | JDA Bourgogne Dijon Handball | https://www.jdadijon.com/handball/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_had_esp_l1_k1` | Ademar León | https://www.ademar.com | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_had_esp_l2_k16` | Zarautz ZKE | https://zke-eskubaloia.com/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_had_esp_l3_k10` | Lobas Oviedo | https://lobasalimerkaoviedo.com/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_had_esp_l3_k13` | Sporting La Rioja | https://sportinglarioja.com/ | HTTP 503 – chyba servera / výpadok | 2026-11-03 |
| `f_had_dnk_l1_k9` | Skanderborg AGF | https://sa-h.dk | HTTP 454 | 2026-11-03 |
| `f_had_dnk_l2_k3` | Elitesport Vendsyssel | https://elitesportvendsyssel.dk/ | HTTP 454 | 2026-11-03 |
| `f_had_dnk_l2_k9` | Norddjurs Håndbold | https://norddjurshaandbold.dk/ | HTTP 454 | 2026-11-03 |
| `f_had_dnk_l2_k10` | Odder Håndbold | https://odderhaandbold.dk/ | HTTP 454 | 2026-11-03 |
| `f_had_dnk_l2_k14` | TM Tønder Håndbold | https://tmth.dk/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_had_dnk_l3_k4` | Ikast Håndbold | https://xn--ikasthndbold-ycb.dk/ | HTTP 454 | 2026-11-03 |
| `f_had_dnk_l3_k10` | Silkeborg-Voel KFUM | https://www.silkeborgvoel.dk/ | HTTP 454 | 2026-11-03 |
| `f_had_dnk_l3_k13` | Team Esbjerg | https://www.teamesbjerg.dk/ | HTTP 454 | 2026-11-03 |
| `f_had_swe_l1_k7` | IFK Kristianstad | https://ifkkristianstad.se | HTTP 454 | 2026-11-03 |
| `f_had_hun_l1_k2` | Budai Farkasok | https://budaifarkasok.hu/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_had_hun_l1_k4` | Dabasi KK | https://www.dabashandball.hu/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_had_hun_l1_k5` | Eger | https://handballeger.hu/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_had_hun_l1_k8` | Gyöngyösi KK | https://gykk.hu/ | timeout (web neodpovedal včas) | 2026-11-03 |
| `f_had_rou_l1_k9` | CSM Vaslui | https://csmvaslui.ro | timeout (web neodpovedal včas) | 2026-11-03 |
| `f_had_rus_l1_k6` | Kaustik Volgograd | https://kaustik-vlg.ru | chyba spojenia: OSError [Errno 101] Network is unreachable | 2026-11-03 |
| `f_had_rus_l1_k11` | Viktor Stavropoľ | https://hbc-victor.ru | chyba spojenia: OSError [Errno 101] Network is unreachable | 2026-11-03 |
| `f_had_rus_l2_k6` | Dinamo-Sinara Volgograd | https://handball-centre.ru | timeout (web neodpovedal včas) | 2026-11-03 |
| `f_had_rus_l2_k11` | Universitet Iževsk | https://www.udmhandball.ru | timeout (web neodpovedal včas) | 2026-11-03 |
| `f_had_rus_l2_k12` | Zvezda Zvenigorod | https://zvezda-handball.ru | timeout (web neodpovedal včas) | 2026-11-03 |
| `f_had_ang_l1_k9` | Oxford University | https://www.oxfordhandball.org/ | HTTP 503 – chyba servera / výpadok | 2026-11-03 |
| `f_had_bel_l1_k4` | HC Visé BM | https://www.hcvise.be | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_had_bel_l1_k5` | Hubo Handbal | https://hubohandbal.be | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_had_cyp_l1_k5` | Omonia 29 Maiou | https://www.o29m.com/handball/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_had_mne_l1_k1` | Berane 1949 | https://www.sofascore.com/handball/team/rk-berane-1949/1146166 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_had_mne_l1_k5` | Jedinstvo Bemax | https://www.sofascore.com/handball/team/rk-jedinstvo-bemax/1146169 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_had_mne_l1_k7` | Mornar 7 Bar | https://www.sofascore.com/handball/team/rk-mornar-7/247828 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_had_mne_l1_k10` | Sutjeska Nikšić | https://www.sofascore.com/handball/team/rk-sutjeska/1146155 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_had_fro_l1_k8` | VÍF | https://vif.fo | HTTP 454 | 2026-11-03 |
| `f_had_grc_l1_k1` | AEK Athens | https://www.aek.gr/category/handball/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_had_hrv_l1_k3` | MRK Čakovec | https://mrk-cakovec.hr/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_had_xkx_l1_liga` | Superliga e Kosovës | https://www.sofascore.com/handball/tournament/kosovo/superliga-e-meshkujt/34444 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_had_lva_l1_k1` | ASK/MSĢ | https://www.sofascore.com/handball/team/askmsg/1128494 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_had_lva_l1_k2` | HK Jūrmala | https://jurmalahandbols.lv/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_had_pol_l1_k2` | Gwardia Opole | https://www.kprgo.pl/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_had_pol_l1_k3` | KS Kielce | https://www.kielcehandball.pl/en/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_had_pol_l1_k5` | MKS Kalisz | https://handball.mks-kalisz.pl/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_had_pol_l1_k6` | MMTS Kwidzyn | https://www.mmts.pl/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_had_pol_l1_k7` | Ostrovia | https://www.kprostrovia.pl/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_had_pol_l1_k8` | Piotrkowianin | https://www.piotrkowianin.pl/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_had_pol_l1_k9` | Śląsk Wrocław | https://slaskhandball.pl/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_had_pol_l1_k10` | Stal Mielec | https://handballstal.mielec.pl/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_had_pol_l1_k12` | Wybrzeże Gdańsk | https://www.wybrzeze-gdansk.pl/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_had_aut_l1_k7` | HSG Holding Graz | https://hsggraz.at | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_had_srb_l1_k2` | Dinamo Pančevo | https://rkdinamo.rs | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_had_ita_l1_k11` | Pressano | https://pallamanopressano.com | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_had_tur_l1_k1` | Beşiktaş | https://bjk.com.tr/tr/brans/3/hentbol.html | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_had_jpn_l1_k5` | Earthfriends BM Tokyo/Kanagawa | https://earthfriends-bm.jp/ | HTTP 503 – chyba servera / výpadok | 2026-11-03 |
| `f_had_qat_l1_k1` | Al-Ahli SC | https://alahlisc.qa | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_had_qat_l1_k2` | Al-Arabi SC | https://alarabi.qa | timeout (web neodpovedal včas) | 2026-11-03 |
| `f_had_qat_l1_k8` | Al-Shamal SC | https://alshamal.qa | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_had_qat_l1_k10` | Qatar SC | https://qatarsc.qa/category/handball | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_had_kwt_l1_liga` | Kuvajtská liga | https://www.sofascore.com/handball/tournament/kuwait/kuwait-handball-league/25311 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_had_kwt_l1_k5` | Al-Sulaibikhat SC | https://www.sofascore.com/handball/team/al-salibihaet/245956 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_had_are_l1_k2` | Al Nasr | https://www.alnasrclub.com/en/handball | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_had_bra_l2_k8` | Handebol Maringá | https://www.handebolmaringa.com.br/ | DNS dočasne neodpovedá | 2026-11-03 |
| `f_had_arg_l1_liga` | Liga de Honor Oro | https://www.sofascore.com/handball/tournament/argentina/liga-de-honor-oro/35185 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_had_arg_l1_k2` | Argentinos Juniors | https://argentinosjuniors.com.ar/deportes/handball/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_had_arg_l2_liga` | Liga de Honor Oro (ženy) | https://www.sofascore.com/handball/tournament/argentina/liga-de-honor-oro/35184 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_had_arg_l2_k1` | Argentinos Juniors | https://argentinosjuniors.com.ar/deportes/handball/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_had_tun_l1_liga` | Division Élite | https://www.sofascore.com/handball/tournament/tunisia/championnat-elite-seniors-premiere-phase/34425 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_had_ago_l1_k5` | Petro de Luanda | https://petroatletico.co.ao/noticia/category/andebol | SSL chyba (certifikát): [SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed: certificate has expired (_ssl. | 2026-11-03 |
| `f_had_alg_l1_liga` | Division Excellence | https://www.sofascore.com/handball/tournament/algeria/division-nationale-excellence-a/39447 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_had_usa_l1_k1` | Boston THC | https://bostonteamhandball.org/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_had_usa_l1_k5` | Dallas THC | https://dallasteamhandballclub.com/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_had_aso_eu_k15` | Faerské ostrovy | https://hsf.fo | HTTP 454 | 2026-11-03 |
| `f_had_aso_eu_k52` | Veľká Británia | https://britishhandball.com | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_had_aso_az_k15` | Jordánsko | https://jhf.jo | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_had_aso_ja_k18` | Uruguaj | https://fuhandball.com | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_had_sta_k1` | Handball-Planet | https://www.handball-planet.com/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_had_sta_k8` | Handball-World | https://www.handball-world.news/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_had_sta_k14` | Balkan-Handball | https://www.balkan-handball.com/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |

#### Volejbal (203)

| ID | Cesta | Adresa | Dôvod | Od |
|---|---|---|---|---|
| `f_vol_sut_af_msm` | Majstrovstvá Afriky 2026 – muži | https://volleybox.net/men-african-championship-2026-o42331 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_vol_sut_af_msz` | Majstrovstvá Afriky 2026 – ženy | https://women.volleybox.net/women-african-championships-2026-o45358 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_vol_sut_af_klm` | Africký klubový šampionát 2025/26 – muži | https://volleybox.net/men-african-club-championships-2025-26-o42587 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_vol_sut_af_klz` | Africký klubový šampionát 2025/26 – ženy | https://women.volleybox.net/women-african-club-championship-2025-26-o43097 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_vol_sut_af_ahm` | Africké hry 2027 – muži | https://volleybox.net/men-african-games-2027-o47902 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_vol_sut_af_ahz` | Africké hry 2027 – ženy | https://women.volleybox.net/women-african-games-2027-o48255 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_vol_sut_af_u20m` | Majstrovstvá Afriky U20 2025 – muži | https://volleybox.net/men-african-championship-u20-2025-o42386 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_vol_sut_af_u18z` | Majstrovstvá Afriky U18 2026 – dievčatá | https://women.volleybox.net/women-african-championship-u18-2026-o47321 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_vol_sut_af_u16m` | Majstrovstvá Afriky U16 2025 – chlapci | https://volleybox.net/men-2025-boys-african-nations-volleyball-championship-u16-2025-o44646 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_vol_sut_af_cavb` | CAVB | https://cavb.africa/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_vol_sut_ja_msm` | Juhoamerický šampionát 2026 – muži | https://volleybox.net/men-south-american-championship-2026-o43716 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_vol_sut_ja_msz` | Juhoamerický šampionát 2026 – ženy | https://women.volleybox.net/women-south-american-championships-2026-o41480 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_vol_sut_ja_jpm` | Juhoamerický pohár 2026 – muži | https://volleybox.net/men-copa-america-2026-o41096 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_vol_sut_ja_jpz` | Juhoamerický pohár 2026 – ženy | https://women.volleybox.net/women-copa-america-2026-o41095 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_vol_sut_ja_klm` | Juhoamerický klubový šampionát 2025/26 – muži | https://volleybox.net/men-south-american-club-championship-2025-26-o40747 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_vol_sut_ja_klz` | Juhoamerický klubový šampionát 2025/26 – ženy | https://women.volleybox.net/women-south-american-club-championship-2025-26-o39520 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_vol_sut_ja_u21m` | Juhoamerický šampionát U21 2024 – muži | https://volleybox.net/men-south-american-championship-u21-2024-o36963 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_vol_sut_ja_u21z` | Juhoamerický šampionát U21 2024 – ženy | https://women.volleybox.net/women-south-american-championship-u20-2024-o36555 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_vol_sut_ja_u19m` | Juhoamerický šampionát U19 2026 – chlapci | https://volleybox.net/men-south-american-championship-u19-2026-o44234 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_vol_sut_ja_u19z` | Juhoamerický šampionát U19 2026 – dievčatá | https://women.volleybox.net/women-south-american-championship-u19-2026-o39582 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_vol_sut_ja_u17m` | Juhoamerický šampionát U17 2026 – chlapci | https://volleybox.net/men-south-american-championship-u17-2026-o42592 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_vol_sut_ja_u17z` | Juhoamerický šampionát U17 2025 – dievčatá | https://women.volleybox.net/women-south-american-championship-u17-2025-o38424 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_vol_klu_eu_slovakia_z1_k2` | Slávia EUBA Bratislava | https://slaviaeuba.sk/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_vol_klu_eu_italy_m1_liga` | SuperLega | https://www.legavolley.it/classifica/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_vol_klu_eu_italy_m2_liga` | Serie A2 mužov | https://www.legavolley.it/classifica/?IdCampionato=1000 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_vol_klu_eu_italy_m2_k8` | Pineto Volley | https://www.pinetovolley.it | SSL chyba (certifikát): [SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed: unable to get local issuer cer | 2026-11-03 |
| `f_vol_klu_eu_italy_m2_k10` | Reggio Calabria | https://www.reggiocalabriavolley.it | chyba spojenia: OSError [Errno 101] Network is unreachable | 2026-11-03 |
| `f_vol_klu_eu_poland_z1_k2` | Budowlani Łódź | https://www.budowlanilodz.pl | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_vol_klu_eu_turkiye_m1_k3` | Fenerbahçe | https://www.fenerbahce.org/branslar/voleybolerkek/haberler | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_vol_klu_eu_turkiye_m2_k3` | Fenerbahçe | https://www.fenerbahce.org/branslar/voleybolaltyapi/haberler | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_vol_klu_eu_turkiye_z1_k3` | Beşiktaş | https://www.bjk.com.tr/tr/brans/4/voleybol.html | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_vol_klu_eu_turkiye_z1_k5` | Fenerbahçe | https://www.fenerbahce.org/branslar/voleybolkadin/haberler | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_vol_klu_eu_russia_m1_k13` | Nova Novokujbyševsk | https://nova-volley.ru/ | chyba spojenia: OSError [Errno 101] Network is unreachable | 2026-11-03 |
| `f_vol_klu_eu_russia_m2_k12` | Volžanin Kostroma | https://volganin.ru/ | timeout (web neodpovedal včas) | 2026-11-03 |
| `f_vol_klu_eu_russia_z1_k6` | Korabelka Petrohrad | https://vc-korabelka.ru/ | chyba spojenia: OSError [Errno 101] Network is unreachable | 2026-11-03 |
| `f_vol_klu_eu_russia_z1_k12` | Tulica Tula | https://tulitsa.com/ | chyba spojenia: OSError [Errno 101] Network is unreachable | 2026-11-03 |
| `f_vol_klu_eu_russia_z1_k14` | Zarečje-Odincovo | https://zarechie-odintsovo.ru/ | chyba spojenia: OSError [Errno 101] Network is unreachable | 2026-11-03 |
| `f_vol_klu_eu_france_m2_k6` | Harnes Volley-Ball | https://www.harnes-volleyball.fr | HTTP 503 – chyba servera / výpadok | 2026-11-03 |
| `f_vol_klu_eu_france_z1_k5` | Levallois Paris SC | https://les-mariannes.fr | HTTP 503 – chyba servera / výpadok | 2026-11-03 |
| `f_vol_klu_eu_france_z1_k9` | Terville Florange OC | https://tfoc.fr | HTTP 503 – chyba servera / výpadok | 2026-11-03 |
| `f_vol_klu_eu_france_z1_k10` | Vandœuvre Nancy VB | https://www.vnvb.fr | timeout (web neodpovedal včas) | 2026-11-03 |
| `f_vol_klu_eu_azerbaijan_m1_liga` | Yüksək Liqa (muži) | https://volleybox.net/men-azerbaijan-league-tt647 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_vol_klu_eu_azerbaijan_z1_liga` | Yüksək Liqa (ženy) | https://women.volleybox.net/women-azerbaijan-superleague-tt10 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_vol_klu_eu_belgium_z1_k5` | Damesvolley Gent | https://damesvolleygent.be/ | timeout (web neodpovedal včas) | 2026-11-03 |
| `f_vol_klu_eu_belgium_z1_k10` | VLAVO Saturnus Michelbeke | https://www.vlavo.be/ploegen/dames-liga/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_vol_klu_eu_belarus_m1_k5` | Marko-VGTU Vitebsk | http://vo-klub.by/index.php/comand/marko-vgtu/ | timeout (web neodpovedal včas) | 2026-11-03 |
| `f_vol_klu_eu_belarus_m1_k7` | Šachťor Soligorsk | https://vcshahter.by/ | timeout (web neodpovedal včas) | 2026-11-03 |
| `f_vol_klu_eu_bulgaria_m1_k5` | Levski Sofia | https://www.levskivc.bg/bg/team/systav-levski | timeout (web neodpovedal včas) | 2026-11-03 |
| `f_vol_klu_eu_bulgaria_m1_k11` | Slavia Sofia | https://slaviavolley.bg/%d1%81%d0%bb%d0%b0%d0%b2%d0%b8%d1%8f-%d0%bc%d1%8a%d0%b6%d0%b5/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_vol_klu_eu_bulgaria_z1_k5` | Levski Sofia | https://www.levskivc.bg/bg/team/systav-levski-zheni | timeout (web neodpovedal včas) | 2026-11-03 |
| `f_vol_klu_eu_bulgaria_z1_k6` | Marica 2022 Plovdiv | https://women.volleybox.net/vc-maritza-t20994 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_vol_klu_eu_bulgaria_z1_k9` | Slavia Sofia | https://slaviavolley.bg/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_vol_klu_eu_denmark_m1_liga` | Volleyligaen (muži) | https://volleyligaen.dk/herrer/ | HTTP 454 | 2026-11-03 |
| `f_vol_klu_eu_denmark_m1_k6` | Ikast KFUM | https://ikastvolley.dk/herrer-1/ | HTTP 454 | 2026-11-03 |
| `f_vol_klu_eu_denmark_z1_liga` | Volleyligaen (ženy) | https://volleyligaen.dk/kvinder/ | HTTP 454 | 2026-11-03 |
| `f_vol_klu_eu_denmark_z1_k9` | Ikast KFUM | https://ikastvolley.dk/kvinder-1/ | HTTP 454 | 2026-11-03 |
| `f_vol_klu_eu_greece_z1_k1` | AEK | https://www.aek.gr/volei-gynaikon/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_vol_klu_eu_netherlands_m1_k2` | Lycurgus Groningen | https://www.lycurgus.nl/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_vol_klu_eu_luxembourg_m1_liga` | Národná divízia mužov | https://flvb.lu/indoor/results/championship/championship-men-matches-results | chyba spojenia: OSError [Errno 101] Network is unreachable | 2026-11-03 |
| `f_vol_klu_eu_luxembourg_m1_k1` | CHEV Diekirch | https://volley-diekirch.lu/haeren-84/1-haeren-equipe/equipe-h1 | timeout (web neodpovedal včas) | 2026-11-03 |
| `f_vol_klu_eu_luxembourg_m1_k5` | VC Stroossen | https://vcs.lu/equipes/hommes-1 | timeout (web neodpovedal včas) | 2026-11-03 |
| `f_vol_klu_eu_luxembourg_m1_k6` | Volley Bartreng | https://volley-bartreng.lu/teams/senior-men-1 | chyba spojenia: OSError [Errno 101] Network is unreachable | 2026-11-03 |
| `f_vol_klu_eu_luxembourg_m1_k7` | Volleyball Echternach | https://volleyball-echternach.lu/ | timeout (web neodpovedal včas) | 2026-11-03 |
| `f_vol_klu_eu_luxembourg_z1_liga` | Národná divízia žien | https://flvb.lu/indoor/results/championship/championship-women-matches-results | chyba spojenia: OSError [Errno 101] Network is unreachable | 2026-11-03 |
| `f_vol_klu_eu_luxembourg_z1_k1` | CS Gym Volley | https://gym-volley.net/de/teams/damen | timeout (web neodpovedal včas) | 2026-11-03 |
| `f_vol_klu_eu_luxembourg_z1_k6` | VC Steinfort | https://vcsteinfort.lu/vc-steinfort-teams?view=article&id=3:senior-dames-1&catid=2 | timeout (web neodpovedal včas) | 2026-11-03 |
| `f_vol_klu_eu_luxembourg_z1_k7` | Volley Bartreng | https://volley-bartreng.lu/teams/senior-women-1 | chyba spojenia: OSError [Errno 101] Network is unreachable | 2026-11-03 |
| `f_vol_klu_eu_luxembourg_z1_k8` | Volleyball Echternach | https://volleyball-echternach.lu/teams | timeout (web neodpovedal včas) | 2026-11-03 |
| `f_vol_klu_eu_hungary_z1_k1` | Békéscsabai RSE | https://brse.hu/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_vol_klu_eu_austria_z1_k1` | ASKÖ Purgstall | https://askoepurgstall.at/volleyball/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_vol_klu_eu_northmacedonia_m1_k12` | Vesna Probištip | https://volleybox.net/vesna-probistip-t8213 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_vol_klu_eu_spain_z1_k5` | CV Cuesta Piedra | https://cvcuestapiedra.com/ | HTTP 503 – chyba servera / výpadok | 2026-11-03 |
| `f_vol_klu_ao_bahrain_m1_liga` | Liga Isu bin Rašída | https://volleybox.net/men-bahrain-league-tt640 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_vol_klu_ao_indonesia_m1_k2` | Jakarta Garuda Jaya | https://volleybox.net/jakarta-garuda-t2674 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_vol_klu_ao_indonesia_z1_k1` | Bandung bjb Tandamata | https://women.volleybox.net/bandung-bjb-tandamata-t5006 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_vol_klu_ao_iraq_m1_liga` | Iracká liga | https://volleybox.net/men-iraq-league-tt1083 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_vol_klu_ao_iraq_m1_k3` | Al Habbaniyah | https://volleybox.net/al-habbaniyah-t12641 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_vol_klu_ao_iraq_m1_k4` | Al Kufa | https://volleybox.net/al-kufa-t12637 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_vol_klu_ao_iraq_m1_k5` | Al Miqdadiya | https://volleybox.net/al-miqdadiya-sc-t44070 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_vol_klu_ao_iraq_m1_k7` | Al Sinaah | https://volleybox.net/al-sinaah-t10586 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_vol_klu_ao_iraq_m1_k8` | Erbil | https://volleybox.net/erbil-sc-t10589 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_vol_klu_ao_japan_m1_k8` | Suntory Sunbirds Osaka | https://www.suntory.co.jp/culture-sports/sunbirds/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_vol_klu_ao_japan_m1_k12` | Wolfdogs Nagoya | https://www.wolfdogs.jp/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_vol_klu_ao_japan_z1_k4` | Denso Airybees | https://airybees.denso.com/ | HTTP 503 – chyba servera / výpadok | 2026-11-03 |
| `f_vol_klu_ao_jordan_m1_liga` | Jordánska liga | https://volleybox.net/men-jordan-league-tt5547 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_vol_klu_ao_jordan_m1_k6` | Shabab Al Awda | https://volleybox.net/al-awdeh-t18515 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_vol_klu_ao_qatar_m1_k2` | Al Arabi | https://alarabi.qa/category/volley-ball-ar/ | timeout (web neodpovedal včas) | 2026-11-03 |
| `f_vol_klu_ao_qatar_m1_k7` | Al Shamal | https://alshamal.qa/category/vollyball/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_vol_klu_ao_qatar_m1_k9` | Police SC | https://volleybox.net/police-union-t1822 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_vol_klu_ao_qatar_m1_k10` | Qatar SC | https://qatarsc.qa/category/vollyball | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_vol_klu_ao_kuwait_m1_liga` | Kuvajtská liga | https://volleybox.net/men-kuwait-league-tt239 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_vol_klu_ao_kuwait_m1_k4` | Al Shabab | https://volleybox.net/alshabab-t3952 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_vol_klu_ao_kuwait_m1_k5` | Al Sulaibikhat | https://volleybox.net/sulaibikhat-club-t38973 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_vol_klu_ao_nepal_z1_liga` | Everest Women's Volleyball League | https://women.volleybox.net/women-everest-womens-volleyball-league-tt5259 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_vol_klu_ao_nepal_z1_k6` | Pokhara Ninjas | https://women.volleybox.net/pokhara-ninjas-t44678 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_vol_klu_ao_new-zealand_m1_k2` | Capital Wolves | https://www.sporty.co.nz/wolfpacknz | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_vol_klu_ao_new-zealand_m1_k4` | Hamilton Huskies | https://www.sporty.co.nz/hamiltonhuskies | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_vol_klu_ao_new-zealand_m1_k10` | Tahunanui Sharks | https://www.sporty.co.nz/tahunanuivolleyballclub | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_vol_klu_ao_new-zealand_z1_k4` | Hamilton Huskies | https://www.sporty.co.nz/hamiltonhuskies | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_vol_klu_ao_new-zealand_z1_k10` | Tahunanui Sharks | https://www.sporty.co.nz/tahunanuivolleyballclub | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_vol_klu_ao_oman_m1_liga` | Liga prvej divízie | https://volleybox.net/men-omani-league-division-1-tt540 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_vol_klu_ao_saudi-arabia_m1_liga` | Super League | https://volleybox.net/men-saudi-arabia-super-league-tt637 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_vol_klu_ao_united-arab-emirates_m1_liga` | Emirátska liga mužov | https://volleybox.net/men-uae-first-league-tt653 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_vol_klu_ao_united-arab-emirates_m1_k5` | Al Nasr | https://www.alnasrclub.com/volleyball | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_vol_klu_ao_taiwan_m1_k2` | Taichung Winstreak | https://winstreak-volleyball.com/ | DNS dočasne neodpovedá | 2026-11-03 |
| `f_vol_klu_ao_taiwan_m1_k4` | Taoyuan Leopards | https://ty-leopards-vb.com/ | DNS dočasne neodpovedá | 2026-11-03 |
| `f_vol_klu_ao_taiwan_m1_k5` | TSG SkyHawks | https://www.tsgskyhawks.com/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_vol_klu_ao_taiwan_z1_liga` | TVL žien | https://tvl.ctvba.org.tw/wstanding | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_vol_klu_ao_taiwan_z1_k4` | New Taipei CMFC | https://tvl.ctvba.org.tw/wteam/5 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_vol_klu_ao_thailand_m1_liga` | Volleyball Thailand League | https://volleybox.net/men-thailand-league-tt594 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_vol_klu_ao_thailand_z1_liga` | Volleyball Thailand League | https://women.volleybox.net/women-thailand-league-tt357 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_vol_klu_ao_vietnam_m1_liga` | Volleyball Vietnam League | https://volleybox.net/men-vietnamese-league-tt649 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_vol_klu_ao_vietnam_m1_k3` | Đà Nẵng | https://volleybox.net/da-nang-t22336 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_vol_klu_ao_vietnam_m1_k5` | Ninh Bình | https://volleybox.net/lp-bank-ninh-binh-t3030 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_vol_klu_ao_vietnam_m1_k6` | Sanest Khánh Hòa | https://volleybox.net/sanest-khanh-hoa-t3593 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_vol_klu_ao_vietnam_z1_liga` | Volleyball Vietnam League | https://women.volleybox.net/women-vietnam-league-tt528 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_vol_klu_ao_vietnam_z1_k5` | Ngân hàng Công Thương | https://women.volleybox.net/vietinbank-t5123 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_vol_klu_ao_vietnam_z1_k6` | Ninh Bình | https://women.volleybox.net/lp-bank-ninh-binh-t15550 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_vol_klu_af_algeria_m1_liga` | Alžírska liga mužov | https://volleybox.net/men-algerian-league-tt933 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_vol_klu_af_algeria_m1_k4` | EF Aïn Azel | https://volleybox.net/fanar-ain-azel-t7586 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_vol_klu_af_algeria_m1_k5` | ES Bethioua | https://volleybox.net/es-bethioua-t10878 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_vol_klu_af_algeria_m1_k7` | ES Sétif | https://volleybox.net/es-setif-t5530 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_vol_klu_af_algeria_m1_k15` | OMK El Milia | https://volleybox.net/omk-el-milia-t6517 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_vol_klu_af_algeria_z1_liga` | Alžírska liga žien | https://women.volleybox.net/women-algerian-league-tt999 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_vol_klu_af_algeria_z1_k5` | MC Alger | https://women.volleybox.net/mc-alger-t2391 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_vol_klu_af_algeria_z1_k7` | NR Chlef | https://women.volleybox.net/nr-chlef-t8419 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_vol_klu_af_algeria_z1_k10` | Seddouk VB | https://women.volleybox.net/seddouk-vb-t8423 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_vol_klu_af_algeria_z1_k11` | US Ben Aknoun | https://women.volleybox.net/us-ben-aknoun-t11889 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_vol_klu_af_benin_m1_liga` | Beninská liga mužov | https://volleybox.net/men-championnat-professionnel-de-benin-tt8108 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_vol_klu_af_egypt_m1_liga` | Egyptská liga mužov | https://volleybox.net/men-egyptian-league-tt427 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_vol_klu_af_egypt_m1_k5` | Al-Shorta | https://volleybox.net/ittihad-el-shorta-t8083 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_vol_klu_af_egypt_m1_k12` | Gezira | https://volleybox.net/gezira-sporting-club-t6776 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_vol_klu_af_egypt_z1_liga` | Egyptská liga žien | https://women.volleybox.net/women-egyptian-league-tt2284 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_vol_klu_af_egypt_z1_k8` | Gezira | https://women.volleybox.net/gezira-sporting-club-t18512 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_vol_klu_af_cape-verde_m1_liga` | Kapverdský šampionát | https://volleybox.net/men-campeonato-nacional-tt987 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_vol_klu_af_libya_m1_liga` | Líbyjská liga mužov | https://volleybox.net/men-libyan-league-tt319 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_vol_klu_af_libya_m1_k4` | Al-Bashair | https://volleybox.net/al-bashair-t46555 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_vol_klu_af_libya_m1_k6` | Al-Huda | https://volleybox.net/alhuda-sports-club-t5440 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_vol_klu_af_libya_m1_k8` | Al-Ittihad Tripoli | https://volleybox.net/al-ittihad-tripoli-sports-club-t2699 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_vol_klu_af_libya_m1_k9` | Al-Jazeera Zuwara | https://volleybox.net/aljazeera-sports-club-t4996 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_vol_klu_af_libya_m1_k13` | Al-Tahaddi | https://volleybox.net/al-tahdi-club-t46554 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_vol_klu_af_libya_m1_k14` | Asarya | https://volleybox.net/asarya-university-club-t4999 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_vol_klu_af_morocco_m1_liga` | Marocká liga mužov | https://competitions.frmvb.ma/r-excellence-hommes/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_vol_klu_af_morocco_m1_k4` | CZVB Zenata | https://volleybox.net/czvb-t19534 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_vol_klu_af_morocco_m1_k6` | FUS Rabat | https://volleybox.net/fus-rabat-t6162 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_vol_klu_af_morocco_z1_liga` | Marocká liga žien | https://competitions.frmvb.ma/r-excellence-dames/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_vol_klu_af_morocco_z1_k2` | Aman Marrakech | https://women.volleybox.net/aman-marrakech-t29882 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_vol_klu_af_morocco_z1_k4` | CODER Errachidia | https://women.volleybox.net/coder-t36840 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_vol_klu_af_morocco_z1_k6` | FUS Rabat | https://women.volleybox.net/fus-rabat-t30159 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_vol_klu_af_morocco_z1_k8` | IZ Khémisset | https://women.volleybox.net/iz-khoumisset-t48720 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_vol_klu_af_morocco_z1_k11` | Nour Marrakech | https://women.volleybox.net/anm-t39537 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_vol_klu_af_morocco_z1_k12` | OC Safi | https://women.volleybox.net/ocs-t35818 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_vol_klu_af_namibia_m1_liga` | MTC Volleyball National League | https://volleybox.net/men-mtc-volleyball-national-league-tt7947 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_vol_klu_af_rwanda_m1_liga` | Rwandská liga mužov | https://volleybox.net/men-rwanda-national-league-serie-a-tt5451 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_vol_klu_af_rwanda_m1_k2` | EAUR | https://volleybox.net/east-african-university-t38240 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_vol_klu_af_rwanda_m1_k5` | Kigali VC | https://volleybox.net/kigali-vc-t11041 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_vol_klu_af_rwanda_m1_k9` | RP Ngoma | https://volleybox.net/polytechni-ngoma-t38241 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_vol_klu_af_tanzania_m1_liga` | Tanzania Volleyball National League | https://volleybox.net/men-tanzania-volleyball-national-league-tt7467 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_vol_klu_af_tanzania_m1_k6` | KIUT | https://volleybox.net/kuit-t49263 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_vol_klu_af_tunisia_m1_liga` | Tuniská liga mužov | https://volleybox.net/men-tunisian-league-tt244 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_vol_klu_af_tunisia_m1_k2` | ASPTT Sfax | https://volleybox.net/asptt-sfax-t12912 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_vol_klu_af_tunisia_z1_liga` | Tuniská liga žien | https://women.volleybox.net/women-tunisian-league-tt1104 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_vol_klu_af_uganda_m1_liga` | Ugandská liga mužov | https://volleybox.net/men-uganda-volleyball-national-league-tt3704 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_vol_klu_af_uganda_m1_k1` | Elyon | https://volleybox.net/elyon-volleyball-club-t37686 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_vol_klu_af_uganda_m1_k2` | Kampala University | https://volleybox.net/kampala-university-t50919 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_vol_klu_af_uganda_m1_k4` | KCCA | https://volleybox.net/kampala-capital-city-authority-t38736 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_vol_klu_af_uganda_m1_k7` | Sky | https://volleybox.net/sky-volleyball-club-t20715 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_vol_klu_af_uganda_m1_k9` | Tigers | https://volleybox.net/tigers-t50913 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_vol_klu_na_costa-rica_m1_liga` | Primera División mužov | https://volleybox.net/men-primera-division-de-costa-rica-tt4615 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_vol_klu_na_costa-rica_z1_liga` | Primera División žien | https://women.volleybox.net/women-costa-rica-primera-division-tt5501 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_vol_klu_na_costa-rica_z1_k10` | Universidad Nacional (UNA) | https://women.volleybox.net/una-vb-t35360 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_vol_klu_na_mexico_m1_liga` | LVP Mx mužov | https://lvpmx.torneomax.com/tournaments | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_vol_klu_na_mexico_z1_liga` | LVP Mx žien | https://lvpmx.torneomax.com/tournaments | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_vol_klu_na_nicaragua_z1_liga` | Primera División žien | https://women.volleybox.net/women-nicaragua-primera-division-tt5493 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_vol_klu_na_nicaragua_z1_k3` | Frente Sur Rivas | https://women.volleybox.net/frente-sur-rivas-t35328 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_vol_klu_na_nicaragua_z1_k9` | Tigresas de Chinandega | https://women.volleybox.net/tigresas-de-chinandega-t35331 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_vol_klu_na_puerto-rico_m1_liga` | Liga de Voleibol Superior Masculino | https://volleybox.net/men-puerto-rican-league-tt501 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_vol_klu_na_puerto-rico_z1_liga` | Liga de Voleibol Superior Femenino | https://women.volleybox.net/women-puerto-rican-league-tt318 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_vol_klu_ja_bolivia_m1_liga` | Liga Superior mužov | https://volleybox.net/men-liga-boliviana-de-voleibol-masculino-tt5699 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_vol_klu_ja_bolivia_z1_liga` | Liga Superior žien | https://women.volleybox.net/women-bolivian-league-tt5452 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_vol_klu_ja_bolivia_z1_k5` | San Simón | https://women.volleybox.net/universidad-mayor-de-san-simon-t6053 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_vol_klu_ja_brazil_m1_k6` | Praia Clube | https://praiaclube.org.br/volei-masculino/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_vol_klu_ja_brazil_m1_k7` | Sada Cruzeiro | https://www.sadacruzeiro.com.br/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_vol_klu_ja_brazil_z1_k10` | Praia Clube | https://praiaclube.org.br/volei-feminino/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_vol_klu_ja_chile_m1_liga` | Liga A1 mužov | https://volleybox.net/men-chilean-league-a1-tt648 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_vol_klu_ja_chile_z1_liga` | Liga A1 žien | https://women.volleybox.net/women-chilean-league-a1-tt989 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_vol_klu_ja_peru_m1_k1` | DC Asociados | https://volleybox.net/dc-asociados-de-tacna-t6741 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_vol_klu_ja_peru_m1_k3` | Junior César de los Ríos | https://volleybox.net/junior-callao-t6742 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_vol_aso_gl_cavb` | CAVB | https://cavb.africa/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_vol_aso_eu_denmark` | Dánsko | https://volleyball.dk/ | HTTP 454 | 2026-11-03 |
| `f_vol_aso_eu_latvia` | Lotyšsko | https://volejbols.lv/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_vol_aso_eu_luxembourg` | Luxembursko | https://flvb.lu/ | chyba spojenia: OSError [Errno 101] Network is unreachable | 2026-11-03 |
| `f_vol_aso_eu_moldova` | Moldavsko | https://fvrm.md/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_vol_aso_ao_iran` | Irán | https://volleyball.ir/ | timeout (web neodpovedal včas) | 2026-11-03 |
| `f_vol_aso_ao_jordan` | Jordánsko | https://jvf.jo/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_vol_aso_ao_kuwait` | Kuvajt | https://volleyball.org.kw/ | timeout (web neodpovedal včas) | 2026-11-03 |
| `f_vol_aso_ao_sri-lanka` | Srí Lanka | https://srilankavolleyball.lk/ | spojenie odmietnuté | 2026-11-03 |
| `f_vol_aso_af_morocco` | Maroko | https://frmvb.ma/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_vol_aso_af_uganda` | Uganda | https://x.com/Ugvolley | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_vol_aso_na_belize` | Belize | https://www.belizevolleyball.bz/ | timeout (web neodpovedal včas) | 2026-11-03 |
| `f_vol_aso_na_canada` | Kanada | https://volleyball.ca/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_vol_sta_k5` | Volleybox | https://volleybox.net/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_vol_sta_k6` | Volleybox – ženy | https://women.volleybox.net/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |

#### Zimné športy (21)

| ID | Cesta | Adresa | Dôvod | Od |
|---|---|---|---|---|
| `n1780505392257gfa` | Neveitalia | https://www.neveitalia.it/sport/scialpino/ | timeout (web neodpovedal včas) | 2026-11-03 |
| `n1780505602002f7k` | Eurosport ski | https://www.eurosport.de/ski-alpin/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1780764042595fxo` | Langrenn | https://www.langrenn.com/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1780763963490bln` | Proxcskiing | https://www.proxcskiing.com/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n178076453390138l` | Skisprungschanzen | https://www.skisprungschanzen.com/ | HTTP 503 – chyba servera / výpadok | 2026-11-03 |
| `n17807649269254nf` | TNT ski jumping | https://www.tntsports.co.uk/ski-jumping/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1793143465972cxq` | TNT nordic combined | https://www.tntsports.co.uk/nordic-combined/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1780765304495bma` | Penaltyloop | https://penaltyloop.com/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1780766181455y7a` | Golden skate | https://www.goldenskate.com/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1780766336101roh` | Skating scores | https://skatingscores.com/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1780766398071nt7` | Kraso.sk | https://www.kraso.sk/ | HTTP 429 – príliš veľa požiadaviek (blokuje robotov) | 2026-11-03 |
| `n1780767731704u9g` | World curling | https://worldcurling.org/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n17807679970156ad` | Curlingnews | https://thecurlingnews.com/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1780768090233idc` | Curling.ca | https://www.curling.ca/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1780771023781xwy` | FISI Italy | https://www.fisi.org/slittino/ | HTTP 503 – chyba servera / výpadok | 2026-11-03 |
| `n1780771198309fx9` | Insidethegames luge | https://www.insidethegames.biz/sports/winter-sports/luge | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n17807717386295pj` | TNT bobsleigh | https://www.tntsports.co.uk/bobsleigh/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n17807721331898px` | TNT skeleton | https://www.tntsports.co.uk/skeleton/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1780773071245k9d` | U.S. Ski & Snowboard | https://www.usskiandsnowboard.org/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n17931434659855ey` | ISMF ranking | https://www.dataskimo.org/ranking.php | HTTP 500 – chyba servera / výpadok | 2026-11-03 |
| `n17931434659884m7` | TNT ski mountaineering | https://www.tntsports.co.uk/ski-mountaineering/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |

#### Ostatné športy (76)

| ID | Cesta | Adresa | Dôvod | Od |
|---|---|---|---|---|
| `n1780832077813xfp` | European Athletics | https://www.european-athletics.com/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1780832582250r5i` | ME v atletike | https://www.european-athletics.com/competitions/european-athletics-championships/overview | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1780836831499t1i` | BWF | https://bwfbadminton.com/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1780836862211dhg` | BWF kalendár | https://bwfbadminton.com/calendar/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1780836889735koe` | BWF rankings | https://bwfbadminton.com/rankings/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1780837293173wz5` | BWF World Tour | https://bwfworldtour.bwfbadminton.com/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n178083713794974z` | Badminton Europe | https://badmintoneurope.com/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1780837777075jej` | Badminton Indonesia | https://pbsi.id/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1780837899495czt` | Badminton India | https://www.badmintonindia.org/ | timeout (web neodpovedal včas) | 2026-11-03 |
| `n1780909123941u48` | Procyclingstats | https://www.procyclingstats.com/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1780909293977cb4` | Wielerflits | https://www.wielerflits.nl/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1780909679798fgw` | Cyclocross24 | https://cyclocross24.com/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n178090975032331t` | CX Magazine | https://www.cxmagazine.com/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1780909802612ed6` | MTB Data | https://mtbdata.com/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1780910701336o71` | UEFA Futsal Champions League | https://www.uefa.com/uefafutsalchampionsleague/ | timeout (web neodpovedal včas) | 2026-11-03 |
| `n1780911894968en4` | Futsal Portugal | https://www.fpf.pt/pt/competicoes/futsal/masculino/liga-placard | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1780912041040r45` | Futsal Brasil | https://lnfoficial.com.br/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1780912183003bmu` | Futsal Česko | https://www.fotbal.cz/futsal/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n17809126601524a1` | Futsal France | https://www.fff.fr/futsal | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1780912683570c8u` | Futsal Hungary | https://futsal.mlsz.hu/ | SSL chyba (certifikát): [SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed: unable to get local issuer cer | 2026-11-03 |
| `n1780914411496811` | DP World Tour | https://www.europeantour.com/dpworld-tour/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1780914924443kau` | US Open | https://www.usopen.com/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1780915056859cwn` | Golf Slovakia | https://www.skga.sk/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1780915187258vr0` | Golf stats | https://www.golfstats.com/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1780915284717q63` | Golfdigest | https://www.golfdigest.com/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1780915356007uyd` | Bunkered | https://www.bunkered.co.uk/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1780915981423bww` | WBC | https://wbcboxing.com/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1780916268502q02` | Boxrec | https://boxrec.com/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1780916376811lkb` | Boxing scene | https://www.boxingscene.com/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n17809165695249oc` | Fightnews | https://fightnews.com/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1780932613800v69` | Tapology | https://www.tapology.com/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1780933059149qkd` | ITTF | https://www.ittf.com/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n178093324829801f` | Challenger series | https://www.challengerseries.net/ | HTTP 503 – chyba servera / výpadok | 2026-11-03 |
| `n17809506021560a8` | Swimrankings | https://www.swimrankings.net/index.php?page=home | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1780950781624gaa` | Swimcloud | https://www.swimcloud.com/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1780951526063vt1` | Swimming Australia | https://www.swimming.org.au/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1780952549758m85` | Total waterpolo | https://total-waterpolo.com/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1780952734783yn4` | Water polo Italy | https://www.federnuoto.it/home/pallanuoto.html | HTTP 503 – chyba servera / výpadok | 2026-11-03 |
| `n1780953808382zy1` | GFL Germany | https://gfl.info/ | HTTP 503 – chyba servera / výpadok | 2026-11-03 |
| `n1780954036363rd2` | Pro football reference | https://www.pro-football-reference.com/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1780994189232f1f` | Asian squash | https://www.asiansquash.org/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n17809942348370e9` | England squash | https://www.englandsquash.com/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1780996555059we9` | El Gouna squash open | https://elgounainternational.com/ | HTTP 503 – chyba servera / výpadok | 2026-11-03 |
| `n17809938824743o2` | The squash site | https://thesquashsite.com/ | HTTP 503 – chyba servera / výpadok | 2026-11-03 |
| `n1781076703486zyj` | Český floorball | https://www.ceskyflorbal.cz/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1781078975285cuj` | Floorball Denmark | https://floorball.dk/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1781078537803bs4` | Paakallo.fi | https://paakallo.fi/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1781088781641kzs` | ZeroZero.pt | https://www.zerozero.pt/futebol-de-praia | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1793272924938mot` | NASCAR | https://www.nascar.com/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1793272924945mot` | Isle of Man TT | https://www.iomtt.com/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1793272924946mot` | WRC | https://www.wrc.com/en | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1793272924947mot` | ERC | https://www.fiaerc.com/en | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1793273484786mot` | eWRC-results | https://ewrc-results.com/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1793272924954mot` | Racing-Reference | https://www.racing-reference.info/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1793273484791mot` | RACER | https://racer.com/ | HTTP 429 – príliš veľa požiadaviek (blokuje robotov) | 2026-11-03 |
| `n1793273484794mot` | Dailysportscar | https://www.dailysportscar.com/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n17810966138530g7` | UKDA | https://ukdartsassociation.com/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n17810970356279op` | Live-darts | https://www.live-darts.com/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1781097060809cx6` | Darts orakel | https://dartsorakel.com/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1781167215725fvu` | Darts planet TV | https://dartsplanet.tv/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1781169781504wws` | TNT sport snooker | https://www.tntsports.co.uk/snooker/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1781191966787h7d` | Paddle UK | https://paddleuk.org.uk/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n17811919979202lv` | Paddle Australia | https://paddle.org.au/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1781192397413mmg` | Regatta Central | https://www.regattacentral.com/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1781192479106ca2` | British rowing | https://www.britishrowing.org/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1781192658157yx5` | Canottaggio Italy | https://www.canottaggio.org/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1781192848738spd` | IWF | https://iwf.sport/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1781192931331drn` | IWF calendar | https://iwf.sport/events/calendar-2026/?cy=2027 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n178119300614430f` | TNT weightlifting | https://www.tntsports.co.uk/weightlifting/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n178119616752604b` | Cricinfo | https://www.cricinfo.com/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1781196596722lbo` | MLC USA | https://www.majorleaguecricket.com/ | SSL chyba (certifikát): [SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed: certificate has expired (_ssl. | 2026-11-03 |
| `n1781197195422mej` | Cricket Pakistan | https://www.pcb.com.pk/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `f_ost_basket3x3_k1` | FIBA 3x3 | https://fiba3x3.com/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1793277203249pad` | Red Bull – Premier Padel | https://www.redbull.com/int-en/event-series/premier-padel | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1793277203253pad` | WeCourts | https://wecourts.com/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1793277203260pad` | Svenska Padelförbundet | https://svenskpadel.se/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |

#### Správy & Médiá (324)

| ID | Cesta | Adresa | Dôvod | Od |
|---|---|---|---|---|
| `n17821327522502tf` | TNT Sports | https://www.tntsports.co.uk/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n17821330301478gt` | The Athletic | https://www.nytimes.com/athletic/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n17821331977503iq` | Reuters Sports | https://www.reuters.com/sports/ | HTTP 401 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1782220963022npk` | El Desmarque | https://www.eldesmarque.com/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n17822214636537lj` | Sport.de | https://www.sport.de/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1782221761073b2a` | Skysport.de | https://sport.sky.de/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1782222143625ugy` | L'Équipe | https://www.lequipe.fr/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1782222237535sdn` | Eurosport France | https://www.eurosport.fr/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1782222354138dww` | Le Parisien sports | https://www.leparisien.fr/sports/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1782222377936r7z` | Liberation sports | https://www.liberation.fr/sports/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1782222432252zf9` | Le Telegramme sports | https://www.letelegramme.fr/sports/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1782222693252m87` | Canalplus sport | https://www.canalplus.com/sport/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1782134739563wfv` | Šport24 | https://sport24.pluska.sk/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1782134757957q7r` | HNonline.sk šport | https://hnonline.sk/sport | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1782134262695ybn` | TN.cz sport | https://tn.nova.cz/sport | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n17822440076793up` | Panorama sport | https://www.panorama.com.al/sport/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1782244028649bfo` | Telesport | https://telesport.al/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1782244218114h45` | Gazeta shqiptare | https://gazetashqiptare.al/category/sport/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1782244249956qez` | Top channel sport | https://top-channel.tv/sport/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n178224434197069f` | Shqip sport | https://shqip.com/category/sport/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1782244518306ckp` | CNA sport | https://www.cna.al/sport | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1782387394069ku1` | Pressball | https://pressball.by/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1782387421777lg5` | Tribuna | https://by.tribuna.com/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n17823875005979wx` | Sport5 | https://sport5.by/ | server prerušil spojenie | 2026-11-03 |
| `n1782387568377eka` | SB | https://www.sb.by/articles/main_sport/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1782387799239f20` | Tochka sport | https://tochka.by/articles/sport/ | timeout (web neodpovedal včas) | 2026-11-03 |
| `n1782400314298anx` | Nieuwsblad sport | https://www.nieuwsblad.be/sport/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1782400348730hdg` | Le Soir sport | https://www.lesoir.be/13/sections/sports | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1782400768595qu7` | De Morgen sport | https://www.demorgen.be/sport/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1782400930013s0v` | GVA sport | https://www.gva.be/sport/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n17824009912280t1` | Sudinfo sport | https://www.sudinfo.be/2020/sections/sport | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1782401255980h2u` | Sportsport | https://sportsport.ba/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n17824012788867lt` | SCsport | https://scsport.raport.ba/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1782401381607nes` | Klix sport | https://www.klix.ba/sport | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1782405128177wk2` | Bljesak sport | https://bljesak.info/sport | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1782405199505k6o` | Faktor sport | https://faktor.ba/sport | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1782405299214dga` | Nezavisne sport | https://www.nezavisne.com/sport | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1782405339069gnl` | Sarajevo times sport | https://sarajevotimes.com/category/sport/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1782405568637wyz` | Glas Srpske sport | https://www.glassrpske.com/lat/sport | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1782405787985z48` | Krajina sport | https://krajina.ba/kategorija/sport/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1782406092872vax` | Gol | https://www.gol.bg/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1782406252262139` | Trud sport | https://trud.bg/a/category/%D1%81%D0%BF%D0%BE%D1%80%D1%82 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n17824062709912r7` | Dnevnik sport | https://www.dnevnik.bg/sport/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1782406437139p4w` | Dnes sport | https://www.dnes.bg/c/9-sport | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n17824065220433w1` | Marica sport | https://www.marica.bg/sport | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1782406983505xav` | Blitz sport | https://sport.blitz.bg/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1783687946046cwg` | CdM sport | https://www.cdm.me/sport/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1783687969181dw2` | Pobjeda sport | https://www.pobjeda.me/sport | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n17836889464239r2` | Borba sport | https://borba.me/sport/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1783689174772m3u` | MINA sport | https://mina.news/category/sport-paket | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1783689918518lsn` | Fyens sport | https://fyens.dk/sport | HTTP 503 – chyba servera / výpadok | 2026-11-03 |
| `n1783718256717rps` | ERR sport | https://sport.err.ee/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1783718380196n82` | Soccernet | https://soccernet.ee/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1783719217264jd8` | Jatkoaika | https://www.jatkoaika.com/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n17837198376938rw` | SDNA | https://www.sdna.gr/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1783720194119c8j` | Eleftheros Typos sports | https://www.eleftherostypos.gr/sports | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n17837530038332c0` | De Telegraaf sport | https://www.telegraaf.nl/sport/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1783753062575hyn` | AD Sportwereld | https://www.ad.nl/sport/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1783753184382um3` | NU.nl sport | https://www.nu.nl/sport | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1783753224047mgv` | RTL nieuws sport | https://www.rtl.nl/nieuws/sport | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) (po presmerovaní na myprivacy.dpgmedia.nl) | 2026-11-03 |
| `n1783753258350opo` | Volkskrant sport | https://www.volkskrant.nl/sport/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n17837534083398g7` | Trouw sport | https://www.trouw.nl/sport/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1783753438875te9` | WielerFlits | https://www.wielerflits.nl/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1783753558114luz` | Parool sport | https://www.parool.nl/sport/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1783753595326vrr` | LC sport | https://www.lc.nl/sport/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1783753621960bxd` | DVHN sport | https://www.dvhn.nl/sport/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1783753654304u1o` | Tubantia sport | https://www.tubantia.nl/sport/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n17837536880258wj` | ED sport | https://www.ed.nl/sport/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1783753726937dsh` | Gelderlander sport | https://www.gelderlander.nl/sport/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n17837537739639en` | BN DeStem sport | https://www.bndestem.nl/sport/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1783753814970k57` | Sportnieuws | https://sportnieuws.nl/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n17837696644238p4` | 24sata sport | https://www.24sata.hr/sport | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n178376980756193t` | Gol.hr | https://gol.dnevnik.hr/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1783770081043w36` | Crosarka | https://crosarka.com/ | spojenie odmietnuté | 2026-11-03 |
| `n17837706892331be` | Independent sport | https://www.independent.ie/sport/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n17837708782626jb` | Extratime | https://www.extratime.com/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1783770986815c40` | Connacht Tribune sport | https://www.connachttribune.ie/sport | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1783771585720yqu` | Belfast telegraph | https://www.belfasttelegraph.co.uk/sport/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1783772063701hg7` | MBL sport | https://www.mbl.is/sport/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1783772560306ynk` | Koha sport | https://www.koha.net/sport | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1783772609553f55` | Gazeta Express sport | https://www.gazetaexpress.com/sport/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n17837726493657i8` | RTK sport | https://www.rtklive.com/sq/news-category.php?CatID=3 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1783772750573a7n` | Arbresh sport | https://www.arbresh.info/sport/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1783773111172gel` | Nacionale sport | https://www.nacionale.com/sq/xk/category/sport | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1783773158845sob` | Insajderi sport | https://insajderi.org/category/sport/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1783773194013ow8` | Gazeta Blic sport | https://gazetablic.com/category/sporti/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1783774674413fkc` | Krepšinis.net | https://www.krepsinis.net/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n17837747272431ip` | Sportas24 | https://sportas24.lt/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n17837748565271o9` | Lrytas sport | https://www.lrytas.lt/sportas | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1783775799189hsq` | Kauno diena sport | https://kauno.diena.lt/naujienos/sportas | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1783775861869u0y` | Klaipėda sport | https://klaipeda.diena.lt/naujienos/sportas | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n17837759626742f6` | Sportazinas | https://www.sportazinas.com/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1783776212164q7x` | TV3 sports | https://tv3.lv/sports/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1783776365674h9m` | Liepajniekiem sports | https://www.liepajniekiem.lv/sports/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1783777886043t58` | Wort sport | https://www.wort.lu/sport/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1783778038302ivg` | Virgule sports | https://www.virgule.lu/sports/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n17837785106712vl` | Derbi | https://derbi.mk/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1783778596675emw` | MRT sport | https://mrt.com.mk/sport | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n178377863534476h` | Sloboden pečat | https://www.slobodenpecat.mk/category/sport/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1783778695830tse` | Sitel sport | https://sitel.com.mk/sport | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1783778715836r3d` | Kanal 5 sport | https://kanal5.com.mk/sport | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1783778819335jr5` | Fokus sport | https://fokus.mk/category/sport/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1783779909805yox` | Telex sport | https://telex.hu/rovat/sport | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1783780419638jpg` | Haon sport | https://www.haon.hu/rovat/sport | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1783780478639bjb` | Kisalföld sport | https://www.kisalfold.hu/rovat/helyi-sport | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1783780515384pad` | Bama sport | https://www.bama.hu/rovat/sport | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1783781521184onq` | Independent sports | https://www.independent.com.mt/sports | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n17837815427133fb` | Malta Today sports | https://www.maltatoday.com.mt/sports | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n17837842783752xq` | Noi sport | https://noi.md/md/sport | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1783784467813x6r` | Jurnal sport | https://www.jurnal.md/ro/category/sport | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n17838608636437qi` | Eurosport | https://www.eurosport.no/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n178386092122366d` | Langrenn | https://www.langrenn.com/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1783883867150ojv` | Eurosport TVN24 | https://eurosport.tvn24.pl/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1783884209595evp` | Wprost sport | https://sport.wprost.pl/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n178388432195766h` | i.pl | https://i.pl/sport | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n17838846434763pv` | O Jogo | https://www.ojogo.pt/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1783884671203iq7` | Zerozero | https://www.zerozero.pt/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n17838847651212wc` | SIC Notícias | https://sicnoticias.pt/desporto | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1783884901427p53` | Jornal de Notícias | https://www.jn.pt/desporto | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1783889248751lb9` | Sky Sport Austria | https://www.skysportaustria.at/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1783890187766hj1` | Ziare sport | https://ziare.com/sport/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1783890208094pux` | B1 TV sport | https://www.b1tv.ro/sport | HTTP 429 – príliš veľa požiadaviek (blokuje robotov) | 2026-11-03 |
| `n1783890335377v0n` | GDS sport | https://www.gds.ro/Sport/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1783890455229o1y` | Cotidianul sport | https://www.cotidianul.ro/articole/sport/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1783890654629rk5` | SportSV | https://sportsv.ro/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1783890911678yb4` | Sport24 | https://sport24.ru/ | HTTP 401 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n178389111523274p` | Izvestia sport | https://iz.ru/rubric/sport | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1783919021626arv` | NIFL | https://www.nifootballleague.com/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n17839191188383s1` | Belfast Telegraph sport | https://www.belfasttelegraph.co.uk/sport/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n17839192593183n8` | News Letter sport | https://www.newsletter.co.uk/sport | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1783919287477z0w` | UTV sport | https://www.itv.com/news/utv/sport | timeout (web neodpovedal včas) | 2026-11-03 |
| `n17839193334004cu` | Derry Journal sport | https://www.derryjournal.com/sport | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1783919420914gqm` | Coleraine Now sport | https://www.colerainenow.co.uk/sport | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1783919750917g2a` | Pie & Bovril | https://www.pieandbovril.com/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1783919910573lvz` | The Scotsman sport | https://www.scotsman.com/sport | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1783920013719vvo` | The Courier sport | https://www.thecourier.co.uk/category/sport/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1783920075911wg9` | Fife Today sport | https://www.fifetoday.co.uk/sport | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1783920129035ctn` | Press and Journal sport | https://www.pressandjournal.co.uk/category/sport/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n17839204410471lf` | Sunday Post sport | https://www.sundaypost.com/category/sport/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1783921941632f7c` | STA sport | https://www.sta.si/sport | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n17839220231859un` | Celje.info sport | https://www.celje.info/kategorija/sport/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n17839225265224m2` | Dnevnik sport | https://www.dnevnik.rs/sport | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n17839228470985l6` | Južne vesti sport | https://www.juznevesti.com/sport/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1783932842518fc9` | Sveriges Radio sport | https://www.sverigesradio.se/sport | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1783933547176zup` | Eurosport Italia | https://www.eurosport.it/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n17839482159434t7` | Mackolik | https://arsiv.mackolik.com/default.aspx | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n17839490245152u2` | F5 Haber spor | https://www.f5haber.com/spor | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n17839491265907hx` | Haber Ekspres spor | https://www.haberekspres.com.tr/spor | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1783949164502rfz` | IHA spor | https://www.iha.com.tr/spor | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1783950750745f8f` | Tribuna | https://ua.tribuna.com/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n17839507660313om` | Sport | https://sport.ua/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n178395082050767b` | Sportarena | https://sportarena.ua/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1783950877623s74` | Suspilne sport | https://suspilne.media/sport/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1783950927029c79` | NV Sport | https://sport.nv.ua/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n17839513263183dt` | Espreso TV sport | https://espreso.tv/sport | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1783951399944yoy` | Champion | https://champion.com.ua/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n178395150148000r` | Fakty sport | https://fakty.ua/ru/categories/sport | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1783951675111l0i` | Vechirniy Kyiv sport | https://vechirniy.kyiv.ua/tag/sport/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n17839522935303z3` | Y Clwb Pêl-droed | https://clwbpeldroed.org/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1783952731473f3b` | ITV Wales sport | https://www.itv.com/news/wales/sport | timeout (web neodpovedal včas) | 2026-11-03 |
| `n17839532937179sr` | Armsport | https://armsport.am/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1783953353666k4m` | Armenpress sports | https://armenpress.am/en/articles/sports | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n178395338000034w` | NEWS.am Sport | https://sport.news.am/arm/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n17839538735656ks` | Armradio sport | https://en.armradio.am/category/allnews/sport/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1783963775889ei5` | Asbarez sports | https://www.asbarez.com/category/entertainment/sports/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1783958271245mew` | Worldsport | https://www.worldsport.ge/ge | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1783957666131z06` | 1TV Sporti | https://1tv.ge/sporti/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n17839584139950jx` | Silk GO sport | https://silkgo.ge/sport | SSL chyba (certifikát): [SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed: unable to get local issuer cer | 2026-11-03 |
| `n1783958698456w1u` | Israel Hayom sport | https://www.israelhayom.co.il/sport | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1783958896823l6g` | Times of Israel sports | https://www.timesofisrael.com/topic/sports/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n17839618451839hn` | Caravan sport | https://www.caravan.kz/sport/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1783962083371tgb` | Liter sport | https://liter.kz/sport/ | HTTP 500 – chyba servera / výpadok | 2026-11-03 |
| `n1783963210305jxj` | Azerisport | https://azerisport.com/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1783963283179h8a` | CBC Sport | https://cbcsport.az/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1783963348128b98` | Report sport | https://report.az/idman-xeberleri | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1783963390516ya4` | AZERTAC sport | https://azertag.az/en/bolme/sports | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n17839635642167xm` | Sportnews | https://sportnews.az/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1783963585208tzs` | Oxu sport | https://oxu.az/ru/sport | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n17839671612636ns` | Protathlima | https://protathlima.cyprustimes.com/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n17839672505004zx` | Goal (Philenews) | https://goal.philenews.com/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1783967511171pxv` | ShootandGoal | https://shootandgoal.cyprustimes.com/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1783967704520dr2` | Philenews sport | https://en.philenews.com/category/sports/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1784234170149b69` | TOLOnews sport | https://www.tolonews.com/sports | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n17842354367314jk` | Al Ayam sports | https://www.alayam.com/alayam/sports | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1784235558686wud` | Al Bilad sport | https://www.albiladpress.com/news/sport | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1784235767202r58` | Bahrain News Agency sport | https://www.bna.bh/SportsNews.aspx?cms=iQRpheuphYtJ6pyXUGiNqv%2bxliCIF%2fFf | HTTP 405 | 2026-11-03 |
| `n1784235836251s9l` | News of Bahrain | https://www.newsofbahrain.com/en/news/sports | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1784236662025725` | T Sports | https://www.tsports.com/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1784236919414649` | Dhaka Tribune sports | https://www.dhakatribune.com/sport | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1784236999283vfu` | Kaler Kantho sport | https://www.kalerkantho.com/online/sport | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n17842371137093c9` | 1 News BD | https://www.onenewsbd.com/sports | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1784237314857eer` | Bangladesh Journal sports | https://www.bd-journal.com/sports | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n17842374206731fn` | BD24Live sports | https://www.bd24live.com/category/sports/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1784237589888k1s` | Karatoa sports | https://www.karatoa.com.bd/category/sports | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1784237969476i6x` | Independent TV sports | https://www.itvbd.com/sports | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1784238024869hck` | New Age sports | https://www.newagebd.net/articlelist/22/sports | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1784238053718evy` | Bangladesh Pratidin sports | https://www.bd-pratidin.com/sports | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n17843181162574wi` | Kuensel sports | https://kuenselonline.com/news/sports | timeout (web neodpovedal včas) | 2026-11-03 |
| `n1784318526218o0n` | Borneo Bulletin sports | https://borneobulletin.com.bn/category/sports/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n178431859730885q` | Media Permata sports | https://mediapermata.com.bn/category/sukan/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1784318981282epl` | Borneo Post sports | https://www.theborneopost.com/sports/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n17843194829138eo` | People daily sports | https://sports.people.com.cn/ | SSL chyba (certifikát): [SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed: Hostname mismatch, certificate | 2026-11-03 |
| `n1784367859330pb8` | Dongqiudi | https://www.dongqiudi.com/ | HTTP 567 – chyba servera / výpadok | 2026-11-03 |
| `n1784370190080dju` | Inquirer Sports | https://sports.inquirer.net/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1784370268012zvv` | Manila Bulletin Sports | https://mb.com.ph/category/sports | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1784370732958w2t` | BusinessMirror Sports | https://businessmirror.com.ph/category/sports/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1784370837022lmz` | Dugout | https://www.dugout.ph/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n17843722264532nv` | Cricinfo | https://www.cricinfo.com/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1784372869791ulj` | Sportskeeda | https://www.sportskeeda.com/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1784373182110dqk` | News18 Sports | https://www.news18.com/sports/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1784374796138ux6` | Indian Express sports | https://indianexpress.com/section/sports/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1784374885364752` | Telegraph India Sports | https://www.telegraphindia.com/sports | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1784375132251xxz` | NDTV Sports | https://sports.ndtv.com/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n17843753004852aq` | Firstpost Sports | https://www.firstpost.com/sports/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n17843754286259z9` | Anandabazar sports | https://www.anandabazar.com/sports | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n178437552162986s` | AITA tennis | https://www.aitatennis.com/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1784375541570fba` | Badminton India | https://www.badmintonindia.org/ | timeout (web neodpovedal včas) | 2026-11-03 |
| `n1784456905123c6d` | RRI Radio | https://rri.co.id/olahraga | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1784457479573mkh` | Tempo olahraga | https://www.tempo.co/olahraga | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1784459706679du2` | IBL basketbal | https://iblindonesia.com/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1784460172031td9` | Tirto olahraga | https://tirto.id/news/flash-news/olahraga | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n17844601951855pi` | Bisnis sport | https://sport.bisnis.com/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n17844602293463kz` | kumparanSPORT | https://kumparan.com/kumparansport | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1784460254292fff` | JPNN olahraga | https://www.jpnn.com/olahraga | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n17844606402493h7` | Al Sharqiya sports | https://www.alsharqiya.com/en/news/category/sports | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1784460735686fgq` | INA sport | https://ina.iq/en/sport/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1784460789582d72` | Al-Sabah sport | https://alsabaah.iq/%D8%A7%D9%84%D8%B1%D9%8A%D8%A7%D8%B6%D8%A9/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1784461276783ukl` | Azzaman sports | https://www.azzaman.com/category/sports/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1784462424710pwc` | Al-Sabah Al-Jadeed sport | https://newsabah.com/newspaper/category/sport | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n17844637163383b3` | Metrica | https://metrica.ir/ | timeout (web neodpovedal včas) | 2026-11-03 |
| `n1784552403256s6s` | BBM Sports | https://www.bbm-japan.com/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1784552769843iom` | dmenu Sports | https://service.smt.docomo.ne.jp/portal/sports/index.html | SSL chyba (certifikát): [SSL: UNSAFE_LEGACY_RENEGOTIATION_DISABLED] unsafe legacy renegotiation disabled (_ssl.c:1 | 2026-11-03 |
| `n1784553297239ugn` | Japan Today sports | https://japantoday.com/category/sports | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n17845576938924mv` | Al Rai sport | https://alrai.com/%D8%B1%D9%8A%D8%A7%D8%B6%D8%A9 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1784557777741gh6` | Jordan Times sport | https://jordantimes.com/news/sports | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1784558864189at8` | ThmeyThmey sport | https://thmeythmey.com/category/31 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1784558949946x6g` | Khmer Times sport | https://www.khmertimeskh.com/category/sports/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n17845590233408h6` | Phnom Penh Post sport | https://phnompenhpost.com/category/sport/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1784562689498127` | Al Watan sport | https://alwatanalakbar.com/category/Sports | HTTP 503 – chyba servera / výpadok | 2026-11-03 |
| `n1784563045667z68` | Doha news sport | https://dohanews.co/category/sports/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1784574216828yoy` | Reporter sport | https://reporter.kg/ru/category/news/sport-ru/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1784709687450uj9` | Elsport | https://elsport.com/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n17847100213780j1` | L'Orient-Le Jour sport | https://www.lorientlejour.com/rubrique/8-sport | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1784710141779nk9` | Al Joumhouria sport | https://www.aljoumhouria.com/ar/news/no-politics | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1784710343042tev` | Al Akhbar sports | https://www.al-akhbar.com/category/sports | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n17847104379011m0` | Nidaa Al Watan sport | https://www.nidaalwatan.com/section/21-%D8%A7%D9%84%D8%B1%D9%8A%D8%A7%D8%B6%D8%A9 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n17847113827268n8` | NNA sports | https://www.nna-leb.gov.lb/ar/categories/9/sports | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1784711690461g5e` | Makanbola | https://makanbola.com/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1784711774328czd` | Harimau Malaya | https://harimaumalaya.com.my/ | SSL chyba (certifikát): [SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed: unable to get local issuer cer | 2026-11-03 |
| `n178471222172095h` | Berita Harian sukan | https://www.bharian.com.my/sukan | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n178471226182161k` | Sin Chew Daily sport | https://www.sinchew.com.my/category/%E4%BD%93%E8%82%B2 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1784712326182o1b` | Daily Express sports | https://www.dailyexpress.com.my/sports/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1784712614017630` | China Press sports | https://www.chinapress.com.my/category/体育/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1784713068283qzh` | Sun Online sports | https://sun.mv/sports | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n17847129089614lv` | PSM News sports | https://psmnews.mv/en/sports | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1784713107613zk2` | Avas sports | https://avas.mv/sports | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1784713195088880` | Vaguthu sport | https://vaguthu.mv/sport/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1784713233880oq6` | One Online sports | https://oneonline.mv/sports | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1784713292550847` | Dhiyares sports | https://dhiyares.com/sports | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1784713523440vna` | MNL futbal | https://themnl.com/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1784713779159ft5` | Eleven sports | https://elevenmyanmar.com/sports | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1784713856585foq` | GNLM sports | https://www.gnlm.com.mm/category/sports/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1784714056397qaq` | Myawady Daily sport | https://www.myawady.net.mm/sport_news | SSL chyba (certifikát): [SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed: unable to get local issuer cer | 2026-11-03 |
| `n1784719465306t6j` | Msports | https://www.msports.mn/ | HTTP 429 – príliš veľa požiadaviek (blokuje robotov) | 2026-11-03 |
| `n1784720013557rg5` | Eguur sport | https://eguur.mn/category/%d0%bd%d0%b8%d0%b9%d0%b3%d1%8d%d0%bc/%d1%81%d0%bf%d0%be%d1%80%d1%82/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n178472038787065j` | Goal Nepal | https://www.goalnepal.com/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n17847207173287yy` | Kantipur sports | https://ekantipur.com/sports | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1784721142964o0e` | Nepal news sport | https://nepalnews.com/category/sports/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n17847231116848rh` | Muscat Daily sports | https://www.muscatdaily.com/category/sports/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n17847245428206ud` | Al Roya sports | https://alroya.om/category/69/%D8%B1%D9%8A%D8%A7%D8%B6%D8%A9 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1784744263535zu9` | PCB – Pakistan Cricket Board | https://www.pcb.com.pk/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1784744342455hir` | Scoreline | https://www.scoreline.org/ | SSL chyba (certifikát): [SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed: self-signed certificate (_ssl. | 2026-11-03 |
| `n1784744519245upb` | Dawn sport | https://www.dawn.com/sport | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1784744664089t6f` | Jang English sports | https://jang.com.pk/en/category/sports | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n178474478363080u` | Daily Times sports | https://dailytimes.com.pk/sports/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n17847448122815rp` | Business Recorder sports | https://www.brecorder.com/sports | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n17847449464405gu` | Nawa-i-Waqt sports | https://www.nawaiwaqt.com.pk/sports | HTTP 503 – chyba servera / výpadok | 2026-11-03 |
| `n1784749388642lpx` | Pakistan Today sports | https://www.pakistantoday.com.pk/category/sports | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1784749768028shf` | Palsport | https://www.palsport.com/ | SSL chyba (certifikát): [SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed: certificate has expired (_ssl. | 2026-11-03 |
| `n1784750013563gze` | Al-Ayyam sport | https://www.al-ayyam.ps/ar/Category/52/%D8%B1%D9%8A%D8%A7%D8%B6%D8%A9-%D9%85%D8%AD%D9%84%D9%8A%D8%A9 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1784750071589e6q` | Al-Quds sport | https://alquds.com/ar/categories/sport | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n17847528627818uu` | Al Arabiya sport | https://www.alarabiya.net/sport | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1784753059301ihx` | Saudi Esports Federation | https://saudiesports.sa/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n17847532904520pz` | Al Riyadh sport | https://www.alriyadh.com/sport | SSL chyba (certifikát): [SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed: unable to get local issuer cer | 2026-11-03 |
| `n1784753362098uiu` | Sabq sports | https://sabq.org/category/sports | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1784753779523mlo` | Elaph sports | https://elaph.com/sports.html | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1784754937128pp7` | Sri Lanka Cricket | https://srilankacricket.lk/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1784755288929gvt` | Dinamina sports | https://www.dinamina.lk/category/sports/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1784755343163zcc` | Daily News sports | https://dailynews.lk/category/sports/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1784755412851634` | Sunday Observer sports | https://www.sundayobserver.lk/category/sport/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1784755435665bua` | Ada Derana sports | https://adaderana.lk/categories/sports | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1784755595862tm9` | Divaina sports | https://www.divaina.lk/category/sports-news | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n178475588582393y` | Silumina sport | https://www.silumina.lk/category/sport/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1784756028543xm9` | Sri Lanka Mirror sports | https://srilankamirror.com/category/sports/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n17847561419033xs` | Virakesari sports | https://www.virakesari.lk/category/sports | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1784756172854dfb` | Viva Lanka sports | https://www.vivalanka.com/news/pagelist.jsp?categoryid=102 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1784833523432b3z` | Enab Baladi sport | https://www.enabbaladi.net/category/sport/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1784833864843pkf` | Al Ayam sport | https://www.alayam.com/online/sport | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n17848346852850ej` | Avesta sport | https://en.avesta.tj/news/sport/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n17848351584723ye` | P League basketbal | https://pleagueofficial.com/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n178483583782691j` | China Times sports | https://www.chinatimes.com/sports | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1784836222536nzd` | Sportsv | https://www.sportsv.net/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1784836618338p7h` | Ballthai | https://www.ballthai.com/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1784836919681r97` | Thairath sport | https://www.thairath.co.th/sport | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n17848384588286f2` | Sport360 | https://sport360.com/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1784838746089e7x` | Al Khaleej sport | https://www.alkhaleej.ae/%D8%B1%D9%8A%D8%A7%D8%B6%D8%A9 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n17848390002531rc` | Erem news sports | https://www.eremnews.com/sports | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n17848393311188u6` | Tribuna.uz | https://tribuna.uz/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n17849977104680d4` | Thethao247 | https://thethao247.vn/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1784998084754i6k` | VOV thethao | https://vov.vn/the-thao | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1785002099943eyt` | Timor post desportu | https://timorpost.com/desportu/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1785006250377c5s` | Yemen Shabab | https://yemenshabab.net/sections/NEWS/Yemeni%20League | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1785006529335ymj` | Al Thawra sport | https://althawrah.ye/archives/category/%d8%a7%d9%84%d8%b1%d9%8a%d8%a7%d8%b6%d8%a9 | timeout (web neodpovedal včas) | 2026-11-03 |
| `n1785006703805m43` | Al Wahdawi sport | https://alwahdawi.net/news/6 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1785185425485s7a` | Fox Sports Argentina | https://foxsports.com.ar/ | DNS dočasne neodpovedá | 2026-11-03 |
| `n1785185763583p1m` | El Gráfico | https://www.elgrafico.com.ar/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1785185833497y6a` | TNT Sports Argentina | https://tntsports.com.ar/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1785185944757ti5` | BDFA | https://www.bdfa.com.ar/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1785185986607hma` | Básquet Plus | https://basquetplus.com/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n17851868067172ia` | El Tribuno deportes | https://www.eltribuno.com/seccion/deportes | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1786815665956js1` | oGol | https://www.ogol.com.br/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1786815746994n47` | TNT Sports Brasil | https://tntsports.com.br/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1786816941010wsc` | Grande Prêmio | https://grandepremio.com/br/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |
| `n1786817579438dp5` | BOL Esporte | https://www.bol.uol.com.br/esporte/ | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |

#### Tipovanie (1)

| ID | Cesta | Adresa | Dôvod | Od |
|---|---|---|---|---|
| `f_tip_tipsport` | Tipsport | https://www.tipsport.sk/PartnerRedirectAction.do?pid=5261&sid=6446&bid=5009&tid=2925&urlid=373 | HTTP 403 – prístup zamietnutý (web asi blokuje robotov) | 2026-11-03 |

