# 🔗 Strážca liniek — týždenná správa

Posledný beh: **2026-11-09** · trvanie 19 min 25 s · skontrolovaných adries v tomto behu: 10584

data.json sa NEMENÍ — opravy robí Miro ručne. Každý riadok = jedna linka v dátach (rovnaká adresa na viacerých miestach = viac riadkov). Tabuľka pre Excel/Cowork: [sprava.csv](sprava.csv).

| Značka | Význam | Liniek | Adries |
|---|---|---:|---:|
| 🔴 MŔTVA | 404/410 alebo neexistujúca doména **2 behy po sebe** (v rôznych dňoch) → oprav/zmaž | 27 | 25 |
| 🔵 PRESŤAHOVANÁ | presmeruje na inú doménu → zváž novú adresu | 2 | 2 |
| 🟠 PODOZRIVÁ | 404/410/DNS prvýkrát — ďalší týždeň sa potvrdí (alebo nie) | 5 | 5 |
| 🚫 BLOKUJE ROBOTOV | web nepustí robota (401/403/429/454/456/999) — v prehliadači väčšinou funguje; len súhrn po doménach | 897 | 878 |
| 🟡 VAROVANIE | výpadok / timeout / SSL / presmerovanie v slučke / ⚠️ možná predaná doména → over ručne v prehliadači | 264 | 262 |
| ✅ OK | funguje | 9593 | 9412 |

Vynechané (nekontrolujú sa): 4063 liniek na Facebook/Instagram v poli url, 5270 ikoniek FB a 7365 ikoniek IG (polia fb/ig), 2 prázdnych/nie-webových adries.

## 🔴 MŔTVE (27)


### Futbal (6)

| ID | Cesta | Adresa | Dôvod | Od |
|---|---|---|---|---|
| `n1784115956248qj0` | Futbal › Súťaže › Južná Amerika › Copa Libertadores U20 | https://www.conmebol.com/conmebol-libertadores-sub-20/ | HTTP 404 – stránka neexistuje | 2026-11-03 |
| `f_gib_l1_k1` | Futbal › Kluby › Európa › Gibraltár › Gibraltar Football League › Lincoln Red Imps FC | https://lincolnredimpsfc.co.uk | HTTP 404 – stránka neexistuje | 2026-11-03 |
| `f_tcd_l1_k12` | Futbal › Kluby › Afrika › Čad › Ligue Nationale de Football (Championnat National) › Scorpion FC de Borkou | https://globalsportsarchive.com/en/soccer/team/scorpion-fc-de-borkou/73513/ | HTTP 404 – stránka neexistuje | 2026-11-03 |
| `f_dji_l1_k10` | Futbal › Kluby › Afrika › Džibutsko › Première Division › AS JJ/Sapeur Pompier | https://globalsportsarchive.com/en/soccer/team/as-jj-sapeur-pompier/67673/ | HTTP 404 – stránka neexistuje | 2026-11-03 |
| `f_zaf_l2_k12` | Futbal › Kluby › Afrika › JAR › Motsepe Foundation Championship › Leicesterford City FC | https://leicesterfordcity.co.za/ | doména neexistuje (DNS) | 2026-11-03 |
| `n1784041266378nms` | Futbal › Asociácie › Afrika › Etiópia | https://theeff.org/en | doména neexistuje (DNS) | 2026-11-03 |

### Hokej (1)

| ID | Cesta | Adresa | Dôvod | Od |
|---|---|---|---|---|
| `f_hok_klu_na_bchl_k12` | Hokej › Kluby › Severná Amerika › BCHL › Prince George Spruce Kings | https://www.sprucekings.bc.ca/ | doména neexistuje (DNS) | 2026-11-03 |

### Basketbal (5)

| ID | Cesta | Adresa | Dôvod | Od |
|---|---|---|---|---|
| `f_bas_qat_l1_k6` | Basketbal › Kluby › Ázia › Katar › QBL › Al Sadd | https://al-saddclub.com/ar/%D8%A7%D9%84%D8%AA%D8%B5%D9%86%D9%8A%D9%81/%D8%A7%D9%84%D8%A7%D8%AE%D8%A8%D8%A7%D8%B1/%D9%83%D8%B1%D8%A9-%D8%A7%D9%84%D8%B3%D9%84%D8%A9/ | HTTP 404 – stránka neexistuje | 2026-11-03 |
| `f_bas_bra_l1_k17` | Basketbal › Kluby › Južná Amerika › Brazília › NBB › União Corinthians | https://basqueteuniaocorinthians.com.br/ | doména neexistuje (DNS) | 2026-11-03 |
| `f_bas_pri_l1_k1` | Basketbal › Kluby › Severná a Stredná Amerika › Portoriko › BSN › Atléticos de San Germán | https://www.atleticosbsn.org | HTTP 404 – stránka neexistuje | 2026-11-03 |
| `f_bas_aso_gl_k8` | Basketbal › Asociácie › Globálne › WABC | https://wabc.fiba.com/ | doména neexistuje (DNS) | 2026-11-03 |
| `f_bas_aso_ja_k6` | Basketbal › Asociácie › Južná Amerika › Kolumbia | https://www.fecolcesto.org/ | doména neexistuje (DNS) | 2026-11-03 |

### Hádzaná (4)

| ID | Cesta | Adresa | Dôvod | Od |
|---|---|---|---|---|
| `f_had_jpn_l2_k8` | Hádzaná › Kluby › Ázia › Japonsko › League H (ženy) › Kagawa Bank GiraSol Kagawa | https://www.kagawabank.co.jp/about/handball/handball.html | HTTP 404 – stránka neexistuje | 2026-11-03 |
| `f_had_aso_az_k9` | Hádzaná › Asociácie › Ázia › India | https://haiindia.in | doména neexistuje (DNS) | 2026-11-03 |
| `f_had_aso_ja_k5` | Hádzaná › Asociácie › Južná a Stredná Amerika (SCAHC) › Chile | https://www.balonmanochile.com | HTTP 404 – stránka neexistuje | 2026-11-03 |
| `f_had_sta_k21` | Hádzaná › Správy a Štatistiky › Handbolti.is | https://handbolti.is/ | doména neexistuje (DNS) | 2026-11-03 |

### Volejbal (8)

| ID | Cesta | Adresa | Dôvod | Od |
|---|---|---|---|---|
| `f_vol_sut_na_afe_u21m` | Volejbal › Súťaže › Severná a Stredná Amerika (NORCECA) › AFECAVOL U21 2026 – muži | https://www.afecavol.org/eventos/2026/10/xxi-campeonato-centroamericano-sub-21-masculino.aspx | HTTP 404 – stránka neexistuje | 2026-11-03 |
| `f_vol_klu_eu_france_m2_k7` | Volejbal › Kluby › Európa (CEV) › Francúzsko › Volstar Masculine 2 (muži) › L'Abeille Girondine ASI | https://www.labeillegirondineasi.com | HTTP 404 – stránka neexistuje | 2026-11-03 |
| `f_vol_klu_eu_cyprus_z1_k8` | Volejbal › Kluby › Európa (CEV) › Cyprus › 1. liga žien › Olympiada Neapolis | https://www.olympiadaneapolis.com.cy/ | HTTP 404 – stránka neexistuje | 2026-11-03 |
| `f_vol_klu_eu_austria_m1_k10` | Volejbal › Kluby › Európa (CEV) › Rakúsko › Austrian Volley League mužov › VCA Amstetten | https://vca.at/teams/ | HTTP 404 – stránka neexistuje | 2026-11-03 |
| `f_vol_klu_ao_qatar_m1_k6` | Volejbal › Kluby › Ázia a Oceánia (AVC) › Katar › Qatar Volleyball League mužov › Al Sadd | https://al-saddclub.com/ar/%D8%A7%D9%84%D8%AA%D8%B5%D9%86%D9%8A%D9%81/%D8%A7%D9%84%D8%A7%D8%AE%D8%A8%D8%A7%D8%B1/%D9%83%D8%B1%D8%A9-%D8%A7%D9%84%D8%B7%D8%A7%D8%A6%D8%B1%D8%A9/ | HTTP 404 – stránka neexistuje | 2026-11-03 |
| `f_vol_klu_ao_kazakhstan_m1_k4` | Volejbal › Kluby › Ázia a Oceánia (AVC) › Kazachstan › Národná liga mužov › Esil-SK | https://volley.kz/teams/7-esil-sk | HTTP 404 – stránka neexistuje | 2026-11-03 |
| `f_vol_klu_af_morocco_m1_k2` | Volejbal › Kluby › Afrika (CAVB) › Maroko › Marocká liga mužov › AS FAR | https://as-far.ma/fr/actualites/14-volleyball | HTTP 404 – stránka neexistuje | 2026-11-03 |
| `f_vol_klu_af_morocco_z1_k3` | Volejbal › Kluby › Afrika (CAVB) › Maroko › Marocká liga žien › AS FAR | https://as-far.ma/fr/actualites/14-volleyball | HTTP 404 – stránka neexistuje | 2026-11-03 |

### Správy & Médiá (3)

| ID | Cesta | Adresa | Dôvod | Od |
|---|---|---|---|---|
| `n1783772136625yex` | Správy & Médiá › Európa › Island › Handbolti.is | https://handbolti.is/ | doména neexistuje (DNS) | 2026-11-03 |
| `n1784318324589wds` | Správy & Médiá › Ázia › Bhután › Bhutan Athletics | https://bhutanathletics.org/ | doména neexistuje (DNS) | 2026-11-03 |
| `n1784461188738hmb` | Správy & Médiá › Ázia › Irak › Al Forat news sport | https://alforatnews.iq/ | doména neexistuje (DNS) | 2026-11-03 |

## 🔵 PRESŤAHOVANÉ (2)


### Správy & Médiá (2)

| ID | Cesta | Adresa | Navrhovaná nová adresa | Od |
|---|---|---|---|---|
| `n1782219117578rqz` | Správy & Médiá › Európa › Anglicko › Daily mail sport | https://www.dailymail.co.uk/sport/index.html | https://www.dailymail.com/sport/index.html | 2026-11-03 |
| `n1782134823796rdi` | Správy & Médiá › Európa › Česko › Seznamspravy sport | https://www.seznamzpravy.cz/sekce/sport-147 | https://cmp.seznam.cz/nastaveni-souhlasu?service=bcr&return_url=https%3A%2F%2Fwww.seznamzpravy.cz%2Fsekce%2Fsport-147%3Fcwreturn%3D1&cwtime=1794211696452&loginstate=forget&cwri=a10917bc77df5160a75d988ce72211f6&reason=missing&service_id=zpravy&cwvariant=cop | 2026-11-03 |

## 🟠 PODOZRIVÉ (zatiaľ 1 beh — netreba hneď opravovať) (5)


### Futbal (1)

| ID | Cesta | Adresa | Dôvod |
|---|---|---|---|
| `f_uzb_l1_k12` | Futbal › Kluby › Ázia › Uzbekistan › Uzbekistan Super League › Neftchi Fergana | https://fcneftchi.uz | doména neexistuje (DNS) |

### Tenis (2)

| ID | Cesta | Adresa | Dôvod |
|---|---|---|---|
| `f_ten_aso_az_k26` | Tenis › Asociácie › Ázia › Pakistan | https://paktenfed.com.pk/ | HTTP 404 – stránka neexistuje |
| `f_ten_aso_af_k21` | Tenis › Asociácie › Afrika › Nigéria | https://nigeriatennisfederation.org/ | HTTP 404 – stránka neexistuje |

### Volejbal (1)

| ID | Cesta | Adresa | Dôvod |
|---|---|---|---|
| `f_vol_klu_ja_brazil_m1_k6` | Volejbal › Kluby › Južná Amerika (CSV) › Brazília › Superliga mužov › Praia Clube | https://praiaclube.org.br/volei-masculino/ | HTTP 404 – stránka neexistuje |

### Správy & Médiá (1)

| ID | Cesta | Adresa | Dôvod |
|---|---|---|---|
| `n1784463299207kdk` | Správy & Médiá › Ázia › Irán › Varzesh3 | https://www.varzesh3.com/ | doména neexistuje (DNS) |

## 🚫 BLOKUJÚ ROBOTOV (878 adries na 441 doménach)

Tieto weby nepustia automatickú kontrolu (401/403/429/454/456/999), preto strážca nevie, či linka funguje. V prehliadači väčšinou fungujú — netreba ich opravovať. Jednotlivé adresy sú v [sprava.csv](sprava.csv).

| Doména | Adries | Kód |
|---|---:|---|
| sofascore.com | 158 | 403 |
| volleybox.net | 123 | 403 |
| iihf.com | 51 | 403 |
| fff.fr | 13 | 403 |
| eliteprospects.com | 11 | 403 |
| footystats.org | 10 | 403 |
| tntsports.co.uk | 9 | 403 |
| atptour.com | 8 | 403 |
| padelfip.com | 8 | 403 |
| geniussports.com | 7 | 403 |
| hockeyslovakia.sk | 7 | 403 |
| fenerbahce.org | 6 | 403 |
| bjk.com.tr | 4 | 403 |
| euroleaguebasketball.net | 4 | 429 |
| qatarsc.qa | 4 | 403 |
| x.com | 4 | 403 |
| alshamal.qa | 3 | 403 |
| chl.ca | 3 | 403 |
| frmvb.ma | 3 | 403 |
| tennis.com.au | 3 | 403 |
| xscores.com | 3 | 403 |
| alayam.com | 2 | 403 |
| argentinosjuniors.com.ar | 2 | 403 |
| athletic-club.eus | 2 | 403 |
| clubbrugge.be | 2 | 429 |
| diena.lt | 2 | 403 |
| fotbal.cz | 2 | 403 |
| fpf.pt | 2 | 403 |
| ikastvolley.dk | 2 | 454 |
| iwf.sport | 2 | 403 |
| movistarestudiantes.com | 2 | 403 |
| pba.ph | 2 | 403 |
| slaviavolley.bg | 2 | 403 |
| tribuna.com | 2 | 403 |
| volleyligaen.dk | 2 | 454 |
| werder.de | 2 | 429 |
| zerozero.pt | 2 | 403 |
| 1tv.ge | 1 | 403 |
| 24sata.hr | 1 | 403 |
| ad.nl | 1 | 403 |
| adaderana.lk | 1 | 403 |
| aekfc.gr | 1 | 403 |
| aelfc.gr | 1 | 403 |
| aitatennis.com | 1 | 403 |
| al-akhbar.com | 1 | 403 |
| al-ayyam.ps | 1 | 403 |
| alahlisc.qa | 1 | 403 |
| alarabiya.net | 1 | 403 |
| alianzafc.com.co | 1 | 403 |
| alkhaleej.ae | 1 | 403 |
| alsabaah.iq | 1 | 403 |
| alsharqiya.com | 1 | 403 |
| alwakrahsc.qa | 1 | 403 |
| anandabazar.com | 1 | 403 |
| api-football.com | 1 | 403 |
| aqvitalfc.hu | 1 | 403 |
| arabnews.com | 1 | 403 |
| armhandball.am | 1 | 403 |
| as.com | 1 | 403 |
| asbarez.com | 1 | 403 |
| ascvdbasketball.com | 1 | 403 |
| asiansquash.org | 1 | 403 |
| atleticodemadrid.com | 1 | 403 |
| aut.uy | 1 | 403 |
| avas.mv | 1 | 403 |
| avisclient-cbf.fr | 1 | 403 |
| azzaman.com | 1 | 403 |
| bandirmaspor.com.tr | 1 | 403 |
| barttorvik.com | 1 | 403 |
| basketcosta.com | 1 | 403 |
| bbm-japan.com | 1 | 403 |
| bccopenhagen.com | 1 | 454 |
| bd-pratidin.com | 1 | 403 |
| bebasket.fr | 1 | 403 |
| belfasttelegraph.co.uk | 1 | 403 |
| bharian.com.my | 1 | 403 |
| billericaytownfc.co.uk | 1 | 403 |
| bisnis.com | 1 | 403 |
| blitz.bg | 1 | 403 |
| bndestem.nl | 1 | 403 |
| borba.me | 1 | 403 |
| borneobulletin.com.bn | 1 | 403 |
| bostonteamhandball.org | 1 | 403 |
| botafogo.com.br | 1 | 403 |
| boxrec.com | 1 | 403 |
| britishhandball.com | 1 | 403 |
| britishrowing.org | 1 | 403 |
| brse.hu | 1 | 403 |
| budowlanilodz.pl | 1 | 403 |
| businessmirror.com.ph | 1 | 403 |
| canalplus.com | 1 | 403 |
| cavb.africa | 1 | 403 |
| cbcsport.az | 1 | 403 |
| ceskyflorbal.cz | 1 | 403 |
| cfcruzazul.com | 1 | 403 |
| chacaritajuniors.com.ar | 1 | 429 |
| champion.com.ua | 1 | 403 |
| chinapress.com.my | 1 | 403 |
| clubelo.com | 1 | 403 |
| clwbpeldroed.org | 1 | 403 |
| cpdporthmadogfc.com | 1 | 403 |
| cricinfo.com | 1 | 403 |
| curling.ca | 1 | 403 |
| cxmagazine.com | 1 | 403 |
| cyclocross24.com | 1 | 403 |
| dabashandball.hu | 1 | 403 |
| dailyexpress.com.my | 1 | 403 |
| dailynews.co.th | 1 | 403 |
| dailynews.lk | 1 | 403 |
| dailysportscar.com | 1 | 403 |
| dallasteamhandballclub.com | 1 | 403 |
| dartsplanet.tv | 1 | 403 |
| demorgen.be | 1 | 403 |
| dhakatribune.com | 1 | 403 |
| dinamina.lk | 1 | 403 |
| diyalaclub.com | 1 | 429 |
| dnes.bg | 1 | 403 |
| dnevnik.bg | 1 | 403 |
| dnevnik.hr | 1 | 403 |
| dvhn.nl | 1 | 403 |
| dziki.basketball | 1 | 403 |
| eastkilbridefootballclub.co.uk | 1 | 403 |
| ed.nl | 1 | 403 |
| efa.com.eg | 1 | 403 |
| egypttennis.com | 1 | 403 |
| eishockeynews.de | 1 | 403 |
| eldesmarque.com | 1 | 403 |
| elitesportvendsyssel.dk | 1 | 454 |
| enabbaladi.net | 1 | 403 |
| englandsquash.com | 1 | 403 |
| entella.it | 1 | 403 |
| erc-ingolstadt.de | 1 | 429 |
| espreso.tv | 1 | 403 |
| eurobasket.com | 1 | 403 |
| eurohockey.com | 1 | 403 |
| europeantour.com | 1 | 403 |
| eurosport.de | 1 | 403 |
| eurosport.fr | 1 | 403 |
| eurosport.it | 1 | 403 |
| eurosport.no | 1 | 403 |
| ewrc-results.com | 1 | 403 |
| extratime.com | 1 | 403 |
| f5haber.com | 1 | 403 |
| fakty.ua | 1 | 403 |
| fam.mw | 1 | 403 |
| fathailand.org | 1 | 403 |
| fbref.com | 1 | 403 |
| fco.com.ua | 1 | 403 |
| fdf.dj | 1 | 403 |
| fecofoot.cg | 1 | 403 |
| ffbb.com | 1 | 403 |
| ffk.cw | 1 | 403 |
| fiaerc.com | 1 | 403 |
| fiba3x3.com | 1 | 403 |
| figueirense.com.br | 1 | 403 |
| finhockey.fi | 1 | 403 |
| firstpost.com | 1 | 403 |
| flleida.cat | 1 | 403 |
| football.ch | 1 | 403 |
| football.org.il | 1 | 403 |
| frmf.ma | 1 | 403 |
| fuhandball.com | 1 | 403 |
| gazetaexpress.com | 1 | 403 |
| gds.ro | 1 | 403 |
| gelderlander.nl | 1 | 403 |
| giravanz.jp | 1 | 403 |
| gol.bg | 1 | 403 |
| golfdigest.com | 1 | 403 |
| golfstats.com | 1 | 403 |
| gva.be | 1 | 403 |
| hackastat.eu | 1 | 403 |
| handball-world.news | 1 | 403 |
| handballeger.hu | 1 | 403 |
| handballvikings.com | 1 | 403 |
| hb.fo | 1 | 454 |
| hkskalica.sk | 1 | 403 |
| hln.be | 1 | 403 |
| hnonline.sk | 1 | 403 |
| hobartinternational.com.au | 1 | 403 |
| hockeydb.com | 1 | 403 |
| honved.hu | 1 | 403 |
| hsf.fo | 1 | 454 |
| htfc.co.uk | 1 | 403 |
| ibasketball.co.il | 1 | 403 |
| iceflyers.com | 1 | 403 |
| ifkkristianstad.se | 1 | 454 |
| imgacademy.com | 1 | 403 |
| ina.iq | 1 | 403 |
| independent.com.mt | 1 | 403 |
| independent.ie | 1 | 403 |
| independente.tl | 1 | 403 |
| independienteyumbo.com | 1 | 403 |
| indianexpress.com | 1 | 403 |
| inquirer.net | 1 | 403 |
| insajderi.org | 1 | 403 |
| insidethegames.biz | 1 | 403 |
| iol.pt | 1 | 403 |
| israelhayom.co.il | 1 | 403 |
| ittf.com | 1 | 403 |
| iz.ru | 1 | 403 |
| japanbasketball.jp | 1 | 403 |
| japantoday.com | 1 | 403 |
| jatkoaika.com | 1 | 403 |
| jhf.jo | 1 | 403 |
| jn.pt | 1 | 403 |
| jordantimes.com | 1 | 403 |
| jpnn.com | 1 | 403 |
| jscherbourg.fr | 1 | 403 |
| jvf.jo | 1 | 403 |
| kalerkantho.com | 1 | 403 |
| karatoa.com.bd | 1 | 403 |
| khmertimeskh.com | 1 | 403 |
| kielcehandball.pl | 1 | 403 |
| kkspartak.rs | 1 | 403 |
| klix.ba | 1 | 403 |
| koha.net | 1 | 403 |
| korona-kielce.pl | 1 | 403 |
| kozarmislenyfc.hu | 1 | 403 |
| kprgo.pl | 1 | 403 |
| kprostrovia.pl | 1 | 403 |
| kraso.sk | 1 | 429 |
| kscszekszard.hu | 1 | 403 |
| ksruch.com | 1 | 403 |
| kumparan.com | 1 | 403 |
| kyiv.ua | 1 | 403 |
| langrenn.com | 1 | 403 |
| lc.nl | 1 | 403 |
| ldlcasvel.com | 1 | 403 |
| leparisien.fr | 1 | 403 |
| lequipe.fr | 1 | 403 |
| lesoir.be | 1 | 403 |
| letelegramme.fr | 1 | 403 |
| levangerfk.no | 1 | 403 |
| liberation.fr | 1 | 403 |
| libertatea.ro | 1 | 429 |
| liepajniekiem.lv | 1 | 403 |
| lioneers.tw | 1 | 403 |
| live-darts.com | 1 | 403 |
| lrytas.lt | 1 | 403 |
| lsm.lv | 1 | 403 |
| mackolik.com | 1 | 403 |
| maltatoday.com.mt | 1 | 403 |
| marica.bg | 1 | 403 |
| marinefc.com | 1 | 403 |
| marozsanfabian.com | 1 | 403 |
| mb.com.ph | 1 | 403 |
| mediapermata.com.bn | 1 | 403 |
| metsbasketball.com | 1 | 403 |
| mezokovesdzsory.hu | 1 | 403 |
| mhscfoot.com | 1 | 403 |
| mielec.pl | 1 | 403 |
| minsknews.by | 1 | 403 |
| mks-kalisz.pl | 1 | 403 |
| mmts.pl | 1 | 403 |
| motorlublin.eu | 1 | 403 |
| mrt.com.mk | 1 | 403 |
| msports.mn | 1 | 429 |
| muscatdaily.com | 1 | 403 |
| nacionale.com | 1 | 403 |
| nadialsalam.sa | 1 | 403 |
| nascar.com | 1 | 403 |
| naturalstattrick.com | 1 | 403 |
| nba.com | 1 | 403 |
| nbl.basketball | 1 | 403 |
| ndtv.com | 1 | 403 |
| newagebd.net | 1 | 403 |
| news18.com | 1 | 403 |
| nhltraderumors.me | 1 | 429 |
| nidaalwatan.com | 1 | 403 |
| nieuwsblad.be | 1 | 403 |
| nifootballleague.com | 1 | 403 |
| nkistra.com | 1 | 403 |
| nna-leb.gov.lb | 1 | 403 |
| norddjurshaandbold.dk | 1 | 454 |
| nordsjaelland-haandbold.dk | 1 | 403 |
| nova.cz | 1 | 403 |
| nu.nl | 1 | 403 |
| nytimes.com | 1 | 403 |
| o29m.com | 1 | 403 |
| odderhaandbold.dk | 1 | 454 |
| odraopole.pl | 1 | 403 |
| ogol.com.br | 1 | 403 |
| ojogo.pt | 1 | 403 |
| oneonline.mv | 1 | 403 |
| paakallo.fi | 1 | 403 |
| panorama.com.al | 1 | 403 |
| paobc.gr | 1 | 403 |
| paokfc.gr | 1 | 403 |
| parool.nl | 1 | 403 |
| pcb.com.pk | 1 | 403 |
| pembrokehamiltonclub.bm | 1 | 403 |
| petrojetsc.com | 1 | 401 |
| philta.org | 1 | 403 |
| phnompenhpost.com | 1 | 403 |
| piattitenniscenter.it | 1 | 403 |
| piotrkowianin.pl | 1 | 403 |
| piratichomutov.cz | 1 | 403 |
| pluska.sk | 1 | 403 |
| pogonszczecin.pl | 1 | 403 |
| pressandjournal.co.uk | 1 | 403 |
| pressball.by | 1 | 403 |
| pro-football-reference.com | 1 | 403 |
| proxcskiing.com | 1 | 403 |
| psmnews.mv | 1 | 403 |
| pssi.org | 1 | 403 |
| puckpedia.com | 1 | 403 |
| quanthockey.com | 1 | 403 |
| racer.com | 1 | 429 |
| racing-reference.info | 1 | 403 |
| rakow.com | 1 | 403 |
| rbfa.be | 1 | 403 |
| realgm.com | 1 | 403 |
| redbull.com | 1 | 403 |
| report.az | 1 | 403 |
| reuters.com | 1 | 401 |
| rgpunjabfc.com | 1 | 403 |
| rochdaleafc.co.uk | 1 | 403 |
| rri.co.id | 1 | 403 |
| rtklive.com | 1 | 403 |
| rtl.nl | 1 | 403 |
| rugbydatabase.co.uk | 1 | 403 |
| sa-h.dk | 1 | 454 |
| sadacruzeiro.com.br | 1 | 403 |
| santosfc.com.br | 1 | 403 |
| saudiesports.sa | 1 | 403 |
| sb.by | 1 | 403 |
| scoutbasketball.com | 1 | 403 |
| sicnoticias.pt | 1 | 403 |
| silkeborgvoel.dk | 1 | 454 |
| silumina.lk | 1 | 403 |
| sinchew.com.my | 1 | 403 |
| sitel.com.mk | 1 | 403 |
| skatingscores.com | 1 | 403 |
| skga.sk | 1 | 403 |
| sky.de | 1 | 403 |
| skysportaustria.at | 1 | 403 |
| slamonline.com | 1 | 403 |
| slaskhandball.pl | 1 | 403 |
| slaskwroclaw.pl | 1 | 403 |
| slobodenpecat.mk | 1 | 403 |
| slusemiprofootball.com | 1 | 403 |
| smcaen.fr | 1 | 403 |
| soccerstats.com | 1 | 403 |
| soenderjyskefodbold.dk | 1 | 454 |
| soydetelmo.com.ar | 1 | 403 |
| spa.gov.sa | 1 | 403 |
| spin.ph | 1 | 403 |
| sport.de | 1 | 403 |
| sport.ua | 1 | 403 |
| sport24.ru | 1 | 401 |
| sportas24.lt | 1 | 403 |
| sportazinas.com | 1 | 403 |
| sportnieuws.nl | 1 | 403 |
| sportskeeda.com | 1 | 403 |
| sportsport.ba | 1 | 403 |
| sportsv.net | 1 | 403 |
| sportsv.ro | 1 | 403 |
| sportyhq.com | 1 | 403 |
| squawka.com | 1 | 403 |
| sta.si | 1 | 403 |
| statsperform.com | 1 | 403 |
| sudinfo.be | 1 | 403 |
| sun.mv | 1 | 403 |
| sundayobserver.lk | 1 | 403 |
| sundaypost.com | 1 | 403 |
| suntory.co.jp | 1 | 403 |
| superleaguebasketballm.co.uk | 1 | 403 |
| superleaguebasketballw.co.uk | 1 | 403 |
| sverigesradio.se | 1 | 403 |
| swimcloud.com | 1 | 403 |
| swimrankings.net | 1 | 403 |
| tapology.com | 1 | 403 |
| tbf.org.tr | 1 | 403 |
| teamesbjerg.dk | 1 | 454 |
| telegraaf.nl | 1 | 403 |
| telegraphindia.com | 1 | 403 |
| tempo.co | 1 | 403 |
| tenisintegrado.com | 1 | 403 |
| tennisireland.ie | 1 | 403 |
| tennissa.co.za | 1 | 403 |
| tennisworldusa.org | 1 | 403 |
| tepatitlanfc.com | 1 | 403 |
| tff.or.tz | 1 | 403 |
| thairath.co.th | 1 | 403 |
| theanalyst.com | 1 | 403 |
| theborneopost.com | 1 | 403 |
| thecourier.co.uk | 1 | 403 |
| theshots.co.uk | 1 | 403 |
| timesofisrael.com | 1 | 403 |
| tipsport.sk | 1 | 403 |
| tntsports.com.ar | 1 | 403 |
| tntsports.com.br | 1 | 403 |
| tolonews.com | 1 | 403 |
| top-channel.tv | 1 | 403 |
| trabzonspor.org.tr | 1 | 403 |
| trouw.nl | 1 | 403 |
| trud.bg | 1 | 403 |
| tsg-hoffenheim.de | 1 | 403 |
| tsgskyhawks.com | 1 | 403 |
| tsports.com | 1 | 403 |
| tsv1882.de | 1 | 429 |
| tubantia.nl | 1 | 403 |
| tuskerfc.com | 1 | 403 |
| tuzos.com.mx | 1 | 403 |
| tv3.lv | 1 | 403 |
| tvn24.pl | 1 | 403 |
| uol.com.br | 1 | 403 |
| usmp.edu.pe | 1 | 403 |
| usopen.com | 1 | 403 |
| usskiandsnowboard.org | 1 | 403 |
| v-varen.com | 1 | 403 |
| vaguthu.mv | 1 | 403 |
| vcshahter.by | 1 | 403 |
| victoriahotspursfc.com | 1 | 403 |
| vif.fo | 1 | 454 |
| vilanovafc.com.br | 1 | 403 |
| vinotinto.ec | 1 | 403 |
| virakesari.lk | 1 | 403 |
| virgule.lu | 1 | 403 |
| vlcizilina.sk | 1 | 403 |
| vocketfc.com | 1 | 403 |
| volkskrant.nl | 1 | 403 |
| volleyball.dk | 1 | 454 |
| vov.vn | 1 | 403 |
| whoscored.com | 1 | 403 |
| widzew.com | 1 | 403 |
| widzewkosz.pl | 1 | 403 |
| windrawwin.com | 1 | 403 |
| winlingbc.com | 1 | 403 |
| wolfdogs.jp | 1 | 403 |
| woluesfc.co.uk | 1 | 403 |
| worldcurling.org | 1 | 403 |
| worldfootball.net | 1 | 403 |
| worldsport.ge | 1 | 403 |
| wort.lu | 1 | 403 |
| wprost.pl | 1 | 403 |
| wrc.com | 1 | 403 |
| wybrzeze-gdansk.pl | 1 | 403 |
| xgstat.com | 1 | 429 |
| xn--ikasthndbold-ycb.dk | 1 | 454 |
| zniczpruszkow.com.pl | 1 | 403 |

## 🔼 DÁ SA PREPNÚŤ NA HTTPS (1)

Linka s http:// funguje, ale funguje aj zabezpečená adresa https:// na tom istom webe. Len návrh — data.json sa nemení; ak chceš, adresu v dátach vymeň.

| ID | Cesta | Adresa | Navrhovaná adresa |
|---|---|---|---|
| `f_arg_l3b_k22` | Futbal › Kluby › Južná Amerika › Argentína › Primera B Metropolitana › Ituzaingo | http://www.caituzaingo.com.ar/ | https://caituzaingo.com.ar/ |

## 🟡 VAROVANIA (over ručne) (264)

### 🟡 ⚠️ over ručne – možná predaná doména (7)


#### Futbal (1)

| ID | Cesta | Adresa | Kam presmeruje | Od |
|---|---|---|---|---|
| `f_swe_l3n_k6` | Futbal › Kluby › Európa › Švédsko › Ettan Norra › FC Järfälla | https://www.fcjarfalla.se/ | https://fcjarfalla.sportadmin.dev/ | 2026-11-09 |

#### Hokej (1)

| ID | Cesta | Adresa | Kam presmeruje | Od |
|---|---|---|---|---|
| `f_hok_klu_na_ncdc_k37` | Hokej › Kluby › Severná Amerika › NCDC › Utica Jr. Comets | https://www.uticajrcomets.org/ | https://jrcomets.hockeyshift.com/ | 2026-11-09 |

#### Tenis (1)

| ID | Cesta | Adresa | Kam presmeruje | Od |
|---|---|---|---|---|
| `f_ten_aso_eu_k24` | Tenis › Asociácie › Európa › Portugalsko | https://www.fptenis.pt/ | https://tenis.tiesports.com/fpt/ | 2026-11-09 |

#### Hádzaná (3)

| ID | Cesta | Adresa | Kam presmeruje | Od |
|---|---|---|---|---|
| `f_had_nor_l3_k13` | Hádzaná › Kluby › Európa › Nórsko › Eliteserien (ženy) › Tertnes Håndball Elite | https://www.tertneshandballelite.no | https://tertneshandball.admin.topphandball.no/ | 2026-11-09 |
| `f_had_swe_l2_k9` | Hádzaná › Kluby › Európa › Švédsko › Allsvenskan › Kungälvs HK | https://kungalvhk.se/ | https://kungalvhk.web.sportadmin.se/start/ | 2026-11-09 |
| `f_had_aso_eu_k6` | Hádzaná › Asociácie › Európa › Belgicko | https://www.handballbelgium.be | https://www.clubee.com/handballbelgium | 2026-11-09 |

#### Volejbal (1)

| ID | Cesta | Adresa | Kam presmeruje | Od |
|---|---|---|---|---|
| `f_vol_klu_na_united-states_z2_k10` | Volejbal › Kluby › Severná a Stredná Amerika (NORCECA) › Spojené štáty americké › LOVB Pro (ženy) › San Francisco Signal | https://www.sanfranciscosignal.com/ | https://www.lovb.com/teams/sanfranciscosignal/home | 2026-11-09 |

Domovská stránka presmeruje na úplne cudziu doménu. Môže to byť nový web klubu, ale aj doména, ktorú kúpil niekto iný (reklama, spam). **Novú adresu nenavrhujem** — over v prehliadači.

### 🟡 Ostatné varovania (257)


#### Futbal (82)

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
| `n17841150750999z2` | ASEAN Hyundai Cup | https://www.aseanfootball.org/v3/competitions-2/aff-championship/asean-hyundai-cup-2026/ | timeout (web neodpovedal včas) | 2026-11-09 |
| `n1784115209655huk` | ASEAN Cup ženy | https://www.aseanfootball.org/v3/aff-womens-championship-2018/ | timeout (web neodpovedal včas) | 2026-11-09 |
| `f_esp_l2_k7` | Granada | https://granadacf.es/ | SSL chyba (certifikát): [SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed: unable to get local issuer cer | 2026-11-03 |
| `f_ger_bl_k0` | Bayern Mníchov | https://fcbayern.com/ | timeout (web neodpovedal včas) | 2026-11-03 |
| `f_ger_rn_k9` | SSV Jeddeloh | https://www.ssv-jeddeloh.de/ | HTTP 503 – chyba servera / výpadok | 2026-11-03 |
| `f_ger_rno_k9` | BFC Dynamo | https://bfc.com/ | timeout (web neodpovedal včas) | 2026-11-03 |
| `f_ger_rno_k14` | Greifswalder FC | https://greifswalder-fc.de/ | HTTP 503 – chyba servera / výpadok | 2026-11-03 |
| `f_ger_rsw_k1` | FSV Frankfurt | https://www.fsv-frankfurt.de/ | HTTP 503 – chyba servera / výpadok | 2026-11-03 |
| `f_ger_rsw_k7` | SSV Ulm 1846 | https://www.ssvulm1846-fussball.de/ | HTTP 503 – chyba servera / výpadok | 2026-11-03 |
| `f_ger_rb_k13` | TSV Aubstadt | https://www.tsv-aubstadt.de/ | HTTP 503 – chyba servera / výpadok | 2026-11-03 |
| `f_ger_rb_k15` | Bayern Mníchov II | https://fcbayern.com/de/teams/fc-bayern-campus/amateure | timeout (web neodpovedal včas) | 2026-11-03 |
| `f_fra_l2_k16` | USL Dunkerque | https://usldunkerque.com/ | SSL chyba (certifikát): [SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed: Hostname mismatch, certificate | 2026-11-03 |
| `f_fra_l3_k2` | Amiens SC | https://amiensfootball.com/ | SSL chyba (certifikát): [SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed: Hostname mismatch, certificate | 2026-11-03 |
| `f_blr_l1_liga` | Vyššia liga | https://championship.abff.by/male/tournaments/1/?tournamentId=7 | SSL chyba (certifikát): [SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed: unable to get local issuer cer | 2026-11-03 |
| `f_blr_l1_k7` | Neman Grodno | https://www.fcneman.by | timeout (web neodpovedal včas) | 2026-11-03 |
| `f_blr_l1_k13` | FC Vitebsk | https://fc.vitebsk.by | timeout (web neodpovedal včas) | 2026-11-03 |
| `f_bel_l3acff_k7` | Royale Union Tubize-Braine | https://www.rutb.be | timeout (web neodpovedal včas) | 2026-11-09 |
| `f_mne_l2_k2` | FK Zeta Golubovci | https://fk-zeta.me/ | SSL chyba (certifikát): [SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed: certificate has expired (_ssl. | 2026-11-09 |
| `f_fin_l2_k7` | Ekenäs IF | https://herrar.eiffotboll.fi/ | spojenie odmietnuté | 2026-11-03 |
| `f_ned_l2_k4` | FC Dordrecht | https://www.fcdordrecht.nl/ | HTTP 400 | 2026-11-03 |
| `f_mkd_l1_k3` | FC Struga | https://fcstruga.com/ | SSL chyba (certifikát): [SSL: UNEXPECTED_EOF_WHILE_READING] EOF occurred in violation of protocol (_ssl.c:1011) | 2026-11-09 |
| `f_hun_l1_k11` | Vasas FC | https://vasasfc.hu | timeout (web neodpovedal včas) | 2026-11-03 |
| `f_pol_l2_k3` | Miedź Legnica | https://miedzlegnica.eu | SSL chyba (certifikát): [SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed: unable to get local issuer cer | 2026-11-03 |
| `f_rus_l1_k16` | Dynamo Machačkala | https://dinamo-mx.ru/ | timeout (web neodpovedal včas) | 2026-11-03 |
| `f_rus_l2_k14` | Neftechimik Nižnekamsk | https://fcnh.ru/ | chyba spojenia: OSError [Errno 101] Network is unreachable | 2026-11-03 |
| `f_rus_l2_k15` | Rotor Volgograd | https://rotor-vlg.com/ | timeout (web neodpovedal včas) · **3× po sebe** | 2026-11-03 |
| `f_rus_l2_k16` | SKA-Chabarovsk | https://fcska.ru/ | timeout (web neodpovedal včas) | 2026-11-03 |
| `f_rus_l2_k17` | KAMAZ Naberežnyje Čelny | https://fckamaz.ru/ | timeout (web neodpovedal včas) | 2026-11-03 |
| `f_nir_l1_k3` | Carrick Rangers | https://www.carrickrangers.co.uk/ | HTTP 503 – chyba servera / výpadok | 2026-11-03 |
| `f_svn_l1_k1` | NK Aluminij | https://nkaluminij.net/ | HTTP 500 – chyba servera / výpadok | 2026-11-03 |
| `f_che_l1_k11` | BSC Young Boys | https://www.bscyb.ch/ | HTTP 503 – chyba servera / výpadok | 2026-11-03 |
| `f_ita_l2_k18` | Südtirol | https://www.fc-suedtirol.com/ | SSL chyba (certifikát): [SSL: DH_KEY_TOO_SMALL] dh key too small (_ssl.c:1011) | 2026-11-03 |
| `f_tur_l2_k19` | Ümraniyespor | https://www.umraniyespor.com.tr/ | SSL chyba (certifikát): [SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed: Hostname mismatch, certificate | 2026-11-09 |
| `f_ukr_l1_k5` | Obolon Kyjiv | https://fc.obolon.ua/ | SSL chyba (certifikát): [SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed: unable to get local issuer cer | 2026-11-03 |
| `f_wal_l1_k15` | Holywell Town | https://www.holywelltownfc.co.uk/ | HTTP 503 – chyba servera / výpadok | 2026-11-03 |
| `f_kaz_l1_k4` | FC Astana | https://fcastana.kz/ | timeout (web neodpovedal včas) | 2026-11-03 |
| `f_kaz_l2_k2` | FC Astana-2 | https://fcastana.kz/ | timeout (web neodpovedal včas) | 2026-11-03 |
| `f_cyp_l2_k5` | ASIL Lysi | https://asillysis.com/ | HTTP 503 – chyba servera / výpadok | 2026-11-03 |
| `f_jpn_l2_k18` | Vegalta Sendai | https://www.vegalta.co.jp | timeout (web neodpovedal včas) | 2026-11-03 |
| `f_kor_l1_k11` | FC Anyang | https://www.fc-anyang.com/ | SSL chyba (certifikát): [SSL: SSLV3_ALERT_HANDSHAKE_FAILURE] ssl/tls alert handshake failure (_ssl.c:1011) | 2026-11-03 |
| `f_kor_l2_k16` | Gimhae FC 2008 | https://www.gimhaefc2008.com/ | SSL chyba (certifikát): [SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed: unable to get local issuer cer | 2026-11-03 |
| `f_sau_l1_k13` | Al-Nassr | https://alnassr.sa | timeout (web neodpovedal včas) | 2026-11-03 |
| `f_tkm_l1_liga` | Ýokary Liga | https://tff.com.tm/competitions | SSL chyba (certifikát): [SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed: certificate has expired (_ssl. | 2026-11-03 |
| `f_vnm_l1_k3` | Cong An Ho Chi Minh City | https://cahcmfc.vn/ | timeout (web neodpovedal včas) | 2026-11-03 |
| `f_arg_l1_k23` | Atletico Tucuman | https://www.clubatleticotucuman.com.ar/ | HTTP 500 – chyba servera / výpadok | 2026-11-03 |
| `f_arg_l3b_k1` | Arsenal (Sarandi) | https://www.arsenalfc.com.ar/ | HTTP 503 – chyba servera / výpadok | 2026-11-03 |
| `f_bra_l1_k1` | Palmeiras | https://www.palmeiras.com.br/ | server prerušil spojenie | 2026-11-03 |
| `f_bra_l1_k3` | Athletico-PR | https://www.athletico.com.br/ | HTTP 405 | 2026-11-03 |
| `f_uru_l1_k11` | Club Deportivo Maldonado | https://deportivomaldonadosad.com | HTTP 503 – chyba servera / výpadok | 2026-11-03 |
| `f_ven_l1_liga` | Primera División | https://ligafutve.org/clasificacion-liga-futve/ | timeout (web neodpovedal včas) | 2026-11-09 |
| `f_ago_l1_k1` | Petro Atlético de Luanda | https://petroatletico.co.ao/ | SSL chyba (certifikát): [SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed: self-signed certificate (_ssl. | 2026-11-03 |
| `f_gha_l1_k3` | Hearts of Oak | https://www.heartsofoaksc.com/ | SSL chyba (certifikát): [SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed: certificate has expired (_ssl. | 2026-11-03 |
| `f_cmr_l1_k2` | Dynamo Douala | https://dynamoclub-douala.com/ | SSL chyba (certifikát): [SSL: TLSV1_ALERT_INTERNAL_ERROR] tlsv1 alert internal error (_ssl.c:1011) | 2026-11-03 |
| `f_lby_l1_k11` | Al-Ittihad Tripoli | https://ittihadclub.ly/ | timeout (web neodpovedal včas) | 2026-11-03 |
| `f_nga_l1_k3` | Ikorodu City | https://ikoroducityfc.com/ | SSL chyba (certifikát): [SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed: self-signed certificate in cer | 2026-11-03 |
| `f_bah_l1_k8` | University of The Bahamas (Mingoes) | https://www.gomingoes.com/sports/msoc/index | HTTP 405 | 2026-11-03 |
| `f_guf_l1_k6` | US Sinnamary | https://www.ussinnamary.footeo.com/ | SSL chyba (certifikát): [SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed: Hostname mismatch, certificate | 2026-11-03 |
| `n1784027166602qw3` | UEFA | https://www.uefa.com/ | timeout (web neodpovedal včas) | 2026-11-03 |
| `n1784027606939bvw` | AFF | https://www.aseanfootball.org/v3/ | timeout (web neodpovedal včas) | 2026-11-09 |
| `n1784029893842q1h` | Bielorusko | https://abff.by/ | SSL chyba (certifikát): [SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed: unable to get local issuer cer | 2026-11-03 |
| `n1784030738475eqr` | Maďarsko | https://en.mlsz.hu/ | SSL chyba (certifikát): [SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed: unable to get local issuer cer | 2026-11-03 |
| `n1784037384320k3l` | Turkménsko | https://tff.com.tm/ | SSL chyba (certifikát): [SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed: certificate has expired (_ssl. | 2026-11-03 |
| `n1784038128334q6m` | Peru | https://fpf.org.pe/ | SSL chyba (certifikát): [SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed: unable to get local issuer cer | 2026-11-03 |
| `n1784040473665y9n` | Alžírsko | https://www.faf.dz/category/equipe-nationale-a/ | timeout (web neodpovedal včas) | 2026-11-03 |
| `n1784040956028cb2` | Čad | https://ftfa.td | DNS dočasne neodpovedá | 2026-11-09 |
| `n1784053308186d1h` | Pobrežie Slonoviny | https://fifciv.com/ | HTTP 503 – chyba servera / výpadok | 2026-11-03 |
| `n1784055423893yob` | Papua-Nová Guinea | https://pngfootball.com.pg/ | timeout (web neodpovedal včas) | 2026-11-03 |

#### Hokej (50)

| ID | Cesta | Adresa | Dôvod | Od |
|---|---|---|---|---|
| `n17800437266674is` | ECHL – tretia zámorská liga | https://echl.com/ | HTTP 405 | 2026-11-09 |
| `n1783520324419c3v` | CEHL – Stredoeurópska hokejová liga | https://www.cehl.eu/ | SSL chyba (certifikát): [SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed: self-signed certificate (_ssl. | 2026-11-03 |
| `f_hok_klu_na_echl_liga` | ECHL – tretia zámorská liga | https://echl.com/standings | HTTP 405 | 2026-11-09 |
| `f_hok_klu_na_echl_k1` | Adirondack Thunder | https://echlthunder.com/ | HTTP 405 | 2026-11-09 |
| `f_hok_klu_na_echl_k2` | Allen Americans | https://allenamericans.com/ | HTTP 405 | 2026-11-09 |
| `f_hok_klu_na_echl_k3` | Atlanta Gladiators | https://atlantagladiators.com/ | HTTP 405 | 2026-11-09 |
| `f_hok_klu_na_echl_k4` | Bloomington Bison | https://bloomingtonbisonhockey.com/ | HTTP 405 | 2026-11-09 |
| `f_hok_klu_na_echl_k5` | Cincinnati Cyclones | https://cycloneshockey.com/ | HTTP 405 | 2026-11-09 |
| `f_hok_klu_na_echl_k6` | Florida Everblades | https://www.floridaeverblades.com/ | HTTP 405 | 2026-11-09 |
| `f_hok_klu_na_echl_k7` | Fort Wayne Komets | https://komets.com/ | HTTP 405 | 2026-11-09 |
| `f_hok_klu_na_echl_k8` | Greensboro Gargoyles | https://gargoyleshockey.com/ | HTTP 405 | 2026-11-09 |
| `f_hok_klu_na_echl_k9` | Greenville Swamp Rabbits | https://swamprabbits.com/ | HTTP 405 | 2026-11-09 |
| `f_hok_klu_na_echl_k10` | Idaho Steelheads | https://idahosteelheads.com/ | HTTP 405 | 2026-11-09 |
| `f_hok_klu_na_echl_k11` | Indy Fuel | https://indyfuelhockey.com/ | HTTP 405 | 2026-11-09 |
| `f_hok_klu_na_echl_k12` | Jacksonville Icemen | https://jacksonvilleicemen.com/ | HTTP 405 | 2026-11-09 |
| `f_hok_klu_na_echl_k13` | Kalamazoo Wings | https://kwings.com/ | HTTP 405 | 2026-11-09 |
| `f_hok_klu_na_echl_k14` | Kansas City Mavericks | https://kcmavericks.com/ | HTTP 405 | 2026-11-09 |
| `f_hok_klu_na_echl_k15` | Maine Mariners | https://mainemariners.com/ | HTTP 405 | 2026-11-09 |
| `f_hok_klu_na_echl_k16` | New Mexico Goatheads | https://nmgoatheads.com/ | HTTP 405 | 2026-11-09 |
| `f_hok_klu_na_echl_k17` | Norfolk Admirals | https://norfolkadmirals.com/ | HTTP 405 | 2026-11-09 |
| `f_hok_klu_na_echl_k18` | Orlando Solar Bears | https://orlandosolarbearshockey.com/ | HTTP 405 | 2026-11-09 |
| `f_hok_klu_na_echl_k19` | Rapid City Rush | https://rapidcityrush.com/ | HTTP 405 | 2026-11-09 |
| `f_hok_klu_na_echl_k20` | Reading Royals | https://royalshockey.com/ | HTTP 405 | 2026-11-09 |
| `f_hok_klu_na_echl_k21` | Savannah Ghost Pirates | https://ghostpirateshockey.com/ | HTTP 405 | 2026-11-09 |
| `f_hok_klu_na_echl_k22` | South Carolina Stingrays | https://stingrayshockey.com/ | HTTP 405 | 2026-11-09 |
| `f_hok_klu_na_echl_k23` | Tahoe Knight Monsters | https://knightmonstershockey.com/ | HTTP 405 | 2026-11-09 |
| `f_hok_klu_na_echl_k24` | Toledo Walleye | https://www.toledowalleye.com/ | HTTP 405 | 2026-11-09 |
| `f_hok_klu_na_echl_k25` | Trenton Ironhawks | https://trentonironhawks.com/ | HTTP 405 | 2026-11-09 |
| `f_hok_klu_na_echl_k26` | Trois-Rivières Lions | https://lions3r.com/ | HTTP 405 | 2026-11-09 |
| `f_hok_klu_na_echl_k27` | Tulsa Oilers | https://tulsaoilers.com/ | HTTP 405 | 2026-11-09 |
| `f_hok_klu_na_echl_k28` | Wheeling Nailers | https://wheelingnailers.com/ | HTTP 405 | 2026-11-09 |
| `f_hok_klu_na_echl_k29` | Wichita Thunder | https://wichitathunder.com/ | HTTP 405 | 2026-11-09 |
| `f_hok_klu_na_echl_k30` | Worcester Railers | https://railershc.com/ | HTTP 405 | 2026-11-09 |
| `f_hok_klu_na_nahl_k26` | Northeast Generals | https://northeastgenerals.com | SSL chyba (certifikát): [SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed: certificate has expired (_ssl. | 2026-11-09 |
| `f_hok_klu_eu_deu_l1_k3` | EHC Red Bull München | https://www.redbullmuenchen.de/ | HTTP 500 – chyba servera / výpadok | 2026-11-03 |
| `f_hok_klu_eu_deu_l1_k7` | Grizzlys Wolfsburg | https://www.grizzlys.de/ | HTTP 503 – chyba servera / výpadok | 2026-11-03 |
| `f_hok_klu_eu_deu_l1_k10` | Krefeld Pinguine | https://krefeld-pinguine.de/ | HTTP 503 – chyba servera / výpadok | 2026-11-03 |
| `f_hok_klu_eu_deu_l2_k5` | EC Bad Nauheim | https://ec-bn.de/ | HTTP 503 – chyba servera / výpadok | 2026-11-03 |
| `f_hok_klu_eu_rus_l1_k13` | Salavat Julajev Ufa | https://hcsalavat.ru/ | timeout (web neodpovedal včas) | 2026-11-03 |
| `f_hok_klu_eu_rus_l1_k17` | Spartak Moskva | https://spartak.ru/ | SSL chyba (certifikát): [SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed: unable to get local issuer cer | 2026-11-03 |
| `f_hok_klu_eu_rus_l2_k15` | Jugra Chanty-Mansijsk | https://www.ugra-hc.ru/ | chyba spojenia: OSError [Errno 101] Network is unreachable | 2026-11-03 |
| `f_hok_klu_eu_rus_l2_k20` | Molot Perm | https://hc-molot.ru/ | chyba spojenia: OSError [Errno 101] Network is unreachable | 2026-11-03 |
| `f_hok_klu_eu_rus_l2_k22` | Olimpija Kirovo-Čepeck | https://hcolimpia.ru/ | timeout (web neodpovedal včas) | 2026-11-03 |
| `f_hok_klu_eu_rus_l2_k28` | Toros Neftekamsk | https://hctoros.ru/ | timeout (web neodpovedal včas) | 2026-11-03 |
| `f_hok_klu_eu_fra_l1_k12` | Spartiates de Marseille | https://marseillehockeyclub.com/ | HTTP 503 – chyba servera / výpadok | 2026-11-03 |
| `f_hok_klu_eu_fra_l2_k5` | Diables Rouges de Valenciennes | https://www.diablesrouges.fr/ | HTTP 503 – chyba servera / výpadok | 2026-11-03 |
| `f_hok_klu_eu_aut_l1_k3` | EC Red Bull Salzburg | https://ecrbs.redbulls.com/ | HTTP 500 – chyba servera / výpadok | 2026-11-03 |
| `f_hok_klu_eu_aut_l2_k4` | Red Bull Hockey Juniors | https://ecrbs.redbulls.com/de/academy/teams?teamType=RBJ | HTTP 500 – chyba servera / výpadok | 2026-11-03 |
| `f_hok_klu_eu_gbr_l2_k3` | Hull Seahawks | https://www.hullseahawks.co.uk/ | HTTP 503 – chyba servera / výpadok | 2026-11-03 |
| `f_hok_klu_eu_gbr_l2_k7` | Romford Raiders | https://romfordraiders.co.uk/ | HTTP 503 – chyba servera / výpadok | 2026-11-03 |

#### Tenis (11)

| ID | Cesta | Adresa | Dôvod | Od |
|---|---|---|---|---|
| `n1788830000026a5` | Grand Prix Auvergne-Rhône-Alpes | https://www.grandprix-auvergnerhonealpes.com/ | HTTP 503 – chyba servera / výpadok | 2026-11-03 |
| `n1788830000012w5h` | Abierto GNP Seguros | https://abiertognpseguros.com/ | SSL chyba (certifikát): [SSL: TLSV1_UNRECOGNIZED_NAME] tlsv1 unrecognized name (_ssl.c:1011) | 2026-11-03 |
| `n1788890000033thz` | Karolína Plíšková | https://www.karolina-pliskova.com/en/ | chyba spojenia: OSError [Errno 101] Network is unreachable | 2026-11-03 |
| `f_ten_aso_eu_k41` | Arménsko | https://www.tennisarmenia.org/ | DNS dočasne neodpovedá | 2026-11-03 |
| `f_ten_aso_eu_k18` | Maďarsko | https://huntennis.hu/ | spojenie odmietnuté | 2026-11-09 |
| `f_ten_aso_eu_k50` | Monako | https://www.monaco-tennis.com/ | HTTP 503 – chyba servera / výpadok | 2026-11-03 |
| `f_ten_aso_az_k9` | Indonézia | https://www.pelti.org/ | SSL chyba (certifikát): [SSL: TLSV1_ALERT_INTERNAL_ERROR] tlsv1 alert internal error (_ssl.c:1011) | 2026-11-03 |
| `f_ten_aso_az_k18` | Kazachstan | https://ktf.kz/ | SSL chyba (certifikát): [SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed: unable to get local issuer cer | 2026-11-03 |
| `f_ten_aso_az_k34` | Turkménsko | https://ttf.gov.tm/ | timeout (web neodpovedal včas) | 2026-11-09 |
| `f_ten_aso_ja_k13` | Venezuela | https://fvtenis.org/ | HTTP 503 – chyba servera / výpadok | 2026-11-03 |
| `n1788790000000tnc00` | Národné tenisové centrum Bratislava | https://www.ntc.sk/ | timeout (web neodpovedal včas) | 2026-11-09 |

#### Basketbal (23)

| ID | Cesta | Adresa | Dôvod | Od |
|---|---|---|---|---|
| `f_bas_esp_l2_liga` | Primera FEB | https://www.feb.es/primerafeb/clasificacion.aspx | timeout (web neodpovedal včas) | 2026-11-03 |
| `f_bas_esp_l3_liga` | Liga Femenina | https://www.feb.es/lfendesa/clasificacion.aspx | timeout (web neodpovedal včas) | 2026-11-03 |
| `f_bas_ger_l1_k3` | Basketball Löwen Braunschweig | https://www.basketball-loewen.de | HTTP 503 – chyba servera / výpadok | 2026-11-03 |
| `f_bas_ger_l1_k5` | FC Bayern München | https://fcbayern.com/basketball/de | timeout (web neodpovedal včas) | 2026-11-03 |
| `f_bas_ger_l1_k13` | Riesen Ludwigsburg | https://mhp-riesen-ludwigsburg.de/ | HTTP 503 – chyba servera / výpadok | 2026-11-03 |
| `f_bas_ger_l2_k7` | ETB Miners Essen | https://miners.ruhr | HTTP 503 – chyba servera / výpadok · **3× po sebe** | 2026-11-03 |
| `f_bas_ger_l3_k2` | BC Marburg | https://bc-marburg.de/ | HTTP 503 – chyba servera / výpadok | 2026-11-03 |
| `f_bas_ger_l3_k8` | Rutronik Stars Keltern | https://www.rutronik-stars-keltern.de/ | HTTP 503 – chyba servera / výpadok | 2026-11-03 |
| `f_bas_bel_l3_k10` | Liège Panthers | https://www.liege-panthers.be/ | SSL chyba (certifikát): [SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed: Hostname mismatch, certificate | 2026-11-09 |
| `f_bas_klu_eu_lat_k1` | BK Liepāja | https://www.liepajasbasketbols.lv/ | timeout (web neodpovedal včas) | 2026-11-03 |
| `f_bas_klu_eu_nor_k10` | Tromsø Storm | https://tromsostorm.no | HTTP 500 – chyba servera / výpadok | 2026-11-09 |
| `f_bas_klu_eu_slo_k8` | Šenčur | https://kksencur.si/ | timeout (web neodpovedal včas) | 2026-11-03 |
| `f_bas_tur_l3_k2` | BOTAŞ | https://www.botasspor.org.tr/ | SSL chyba (certifikát): [SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed: unable to get local issuer cer | 2026-11-03 |
| `f_bas_jpn_l2_k4` | Denso Iris | https://iris.denso.com/ | HTTP 503 – chyba servera / výpadok | 2026-11-03 |
| `f_bas_kor_l2_k1` | Asan Woori Bank Woori Won | https://wooriwon.wooribank.com/basketball/main/main.php | SSL chyba (certifikát): [SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed: unable to get local issuer cer | 2026-11-03 |
| `f_bas_kor_l2_k5` | Incheon Shinhan Bank S-Birds | https://www.sbirds.com | server prerušil spojenie | 2026-11-03 |
| `f_bas_kaz_l1_k2` | Astana | https://astanabasket.kz/ru/ | timeout (web neodpovedal včas) | 2026-11-03 |
| `f_bas_ago_l1_k8` | Petro de Luanda | https://petroatletico.co.ao/basquetebol | SSL chyba (certifikát): [SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed: self-signed certificate (_ssl. | 2026-11-03 |
| `f_bas_lby_l1_k4` | Al-Ittihad | https://ittihadclub.ly/basketball | timeout (web neodpovedal včas) | 2026-11-03 |
| `f_bas_aso_eu_k40` | Španielsko | https://www.feb.es | timeout (web neodpovedal včas) | 2026-11-03 |
| `f_bas_aso_az_k2` | Bahrajn | https://basketball.bh | HTTP 503 – chyba servera / výpadok | 2026-11-03 |
| `f_bas_aso_az_k25` | Malajzia | https://malaysiabasketball.com | HTTP 500 – chyba servera / výpadok | 2026-11-09 |
| `f_bas_aso_az_k44` | Vietnam | https://vbf.vn | SSL chyba (certifikát): [SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed: Hostname mismatch, certificate | 2026-11-09 |

#### Hádzaná (20)

| ID | Cesta | Adresa | Dôvod | Od |
|---|---|---|---|---|
| `f_had_deu_l1_k9` | Rhein-Neckar Löwen | https://www.rhein-neckar-loewen.de | HTTP 503 – chyba servera / výpadok | 2026-11-03 |
| `f_had_deu_l2_k4` | Die Eulen Ludwigshafen | https://eulen-ludwigshafen.de | HTTP 503 – chyba servera / výpadok | 2026-11-03 |
| `f_had_deu_l2_k6` | HC Elbflorenz | https://hc-elbflorenz.de | HTTP 503 – chyba servera / výpadok | 2026-11-03 |
| `f_had_deu_l2_k16` | TV Großwallstadt | https://www.tvgrosswallstadt.de | HTTP 503 – chyba servera / výpadok | 2026-11-03 |
| `f_had_deu_l3_k7` | HSG Blomberg-Lippe | https://hsg-blomberg-lippe.de | HTTP 503 – chyba servera / výpadok | 2026-11-03 |
| `f_had_fra_l1_k14` | Sélestat Alsace Handball | https://www.sa-hb.com | timeout (web neodpovedal včas) | 2026-11-09 |
| `f_had_fra_l2_k5` | Grand Besançon Doubs Handball | https://gbdh.fr | HTTP 503 – chyba servera / výpadok | 2026-11-03 |
| `f_had_esp_l3_k13` | Sporting La Rioja | https://sportinglarioja.com/ | HTTP 503 – chyba servera / výpadok | 2026-11-03 |
| `f_had_hun_l1_k8` | Gyöngyösi KK | https://gykk.hu/ | timeout (web neodpovedal včas) | 2026-11-03 |
| `f_had_rou_l1_k9` | CSM Vaslui | https://csmvaslui.ro | timeout (web neodpovedal včas) | 2026-11-03 |
| `f_had_rus_l1_k6` | Kaustik Volgograd | https://kaustik-vlg.ru | chyba spojenia: OSError [Errno 101] Network is unreachable | 2026-11-03 |
| `f_had_rus_l1_k11` | Viktor Stavropoľ | https://hbc-victor.ru | chyba spojenia: OSError [Errno 101] Network is unreachable | 2026-11-03 |
| `f_had_rus_l2_k6` | Dinamo-Sinara Volgograd | https://handball-centre.ru | timeout (web neodpovedal včas) | 2026-11-03 |
| `f_had_rus_l2_k11` | Universitet Iževsk | https://www.udmhandball.ru | timeout (web neodpovedal včas) | 2026-11-03 |
| `f_had_rus_l2_k12` | Zvezda Zvenigorod | https://zvezda-handball.ru | timeout (web neodpovedal včas) | 2026-11-03 |
| `f_had_ang_l1_k9` | Oxford University | https://www.oxfordhandball.org/ | HTTP 503 – chyba servera / výpadok | 2026-11-03 |
| `f_had_lux_l1_k7` | HC Standard | https://hcstandard.lu/ | timeout (web neodpovedal včas) | 2026-11-09 |
| `f_had_ago_l1_k5` | Petro de Luanda | https://petroatletico.co.ao/noticia/category/andebol | SSL chyba (certifikát): [SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed: self-signed certificate (_ssl. | 2026-11-03 |
| `f_had_aso_eu_k46` | Španielsko | https://www.rfebm.com | timeout (web neodpovedal včas) | 2026-11-09 |
| `f_had_aso_az_k11` | Irak | https://iqhf.org.iq | SSL chyba (certifikát): [SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed: certificate has expired (_ssl. | 2026-11-09 |

#### Volejbal (34)

| ID | Cesta | Adresa | Dôvod | Od |
|---|---|---|---|---|
| `f_vol_klu_eu_italy_m2_k8` | Pineto Volley | https://www.pinetovolley.it | SSL chyba (certifikát): [SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed: unable to get local issuer cer | 2026-11-03 |
| `f_vol_klu_eu_italy_m2_k10` | Reggio Calabria | https://www.reggiocalabriavolley.it | chyba spojenia: OSError [Errno 101] Network is unreachable | 2026-11-03 |
| `f_vol_klu_eu_poland_m2_k11` | MCKiS Jaworzno | https://mckis.jaworzno.pl/siatkowka/ | SSL chyba (certifikát): [SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed: Hostname mismatch, certificate | 2026-11-09 |
| `f_vol_klu_eu_russia_m1_k13` | Nova Novokujbyševsk | https://nova-volley.ru/ | chyba spojenia: OSError [Errno 101] Network is unreachable | 2026-11-03 |
| `f_vol_klu_eu_russia_m2_k12` | Volžanin Kostroma | https://volganin.ru/ | timeout (web neodpovedal včas) | 2026-11-03 |
| `f_vol_klu_eu_russia_z1_k6` | Korabelka Petrohrad | https://vc-korabelka.ru/ | chyba spojenia: OSError [Errno 101] Network is unreachable | 2026-11-03 |
| `f_vol_klu_eu_russia_z1_k12` | Tulica Tula | https://tulitsa.com/ | chyba spojenia: OSError [Errno 101] Network is unreachable | 2026-11-03 |
| `f_vol_klu_eu_russia_z1_k14` | Zarečje-Odincovo | https://zarechie-odintsovo.ru/ | chyba spojenia: OSError [Errno 101] Network is unreachable | 2026-11-03 |
| `f_vol_klu_eu_france_m2_k6` | Harnes Volley-Ball | https://www.harnes-volleyball.fr | HTTP 503 – chyba servera / výpadok | 2026-11-03 |
| `f_vol_klu_eu_france_z1_k3` | Évreux Volley-Ball | https://www.evreuxvolleyball.com | server prerušil spojenie | 2026-11-09 |
| `f_vol_klu_eu_france_z1_k5` | Levallois Paris SC | https://les-mariannes.fr | HTTP 503 – chyba servera / výpadok | 2026-11-03 |
| `f_vol_klu_eu_france_z1_k9` | Terville Florange OC | https://tfoc.fr | HTTP 503 – chyba servera / výpadok | 2026-11-03 |
| `f_vol_klu_eu_belgium_z1_k5` | Damesvolley Gent | https://damesvolleygent.be/ | timeout (web neodpovedal včas) | 2026-11-03 |
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
| `f_vol_klu_eu_northmacedonia_m1_liga` | Prvá liga (muži) | https://vfmkd.org.mk/domasno-prvenstvo/mazhi-202627/ | DNS dočasne neodpovedá | 2026-11-09 |
| `f_vol_klu_eu_northmacedonia_z1_liga` | Prvá liga (ženy) | https://vfmkd.org.mk/domasno-prvenstvo/2026-27-zh1/ | DNS dočasne neodpovedá | 2026-11-09 |
| `f_vol_klu_eu_spain_z1_k5` | CV Cuesta Piedra | https://cvcuestapiedra.com/ | HTTP 503 – chyba servera / výpadok | 2026-11-03 |
| `f_vol_klu_ao_taiwan_m1_k2` | Taichung Winstreak | https://winstreak-volleyball.com/ | DNS dočasne neodpovedá | 2026-11-03 |
| `f_vol_klu_ao_taiwan_m1_k4` | Taoyuan Leopards | https://ty-leopards-vb.com/ | DNS dočasne neodpovedá | 2026-11-03 |
| `f_vol_klu_na_puerto-rico_z1_k3` | Criollas de Caguas | https://www.lascriollasdecaguas.com/ | DNS dočasne neodpovedá | 2026-11-09 |
| `f_vol_aso_eu_luxembourg` | Luxembursko | https://flvb.lu/ | chyba spojenia: OSError [Errno 101] Network is unreachable | 2026-11-03 |
| `f_vol_aso_eu_northmacedonia` | Severné Macedónsko | https://vfmkd.org.mk/ | DNS dočasne neodpovedá | 2026-11-09 |
| `f_vol_aso_ao_kuwait` | Kuvajt | https://volleyball.org.kw/ | timeout (web neodpovedal včas) | 2026-11-03 |
| `f_vol_aso_ao_sri-lanka` | Srí Lanka | https://srilankavolleyball.lk/ | spojenie odmietnuté | 2026-11-03 |
| `f_vol_aso_na_belize` | Belize | https://www.belizevolleyball.bz/ | timeout (web neodpovedal včas) | 2026-11-03 |

#### Zimné športy (4)

| ID | Cesta | Adresa | Dôvod | Od |
|---|---|---|---|---|
| `n1780505392257gfa` | Neveitalia | https://www.neveitalia.it/sport/scialpino/ | timeout (web neodpovedal včas) | 2026-11-03 |
| `n178076453390138l` | Skisprungschanzen | https://www.skisprungschanzen.com/ | HTTP 503 – chyba servera / výpadok | 2026-11-03 |
| `n1780771023781xwy` | FISI Italy | https://www.fisi.org/slittino/ | HTTP 503 – chyba servera / výpadok | 2026-11-03 |
| `n17931434659855ey` | ISMF ranking | https://www.dataskimo.org/ranking.php | HTTP 500 – chyba servera / výpadok | 2026-11-03 |

#### Ostatné športy (10)

| ID | Cesta | Adresa | Dôvod | Od |
|---|---|---|---|---|
| `n1780837899495czt` | Badminton India | https://www.badmintonindia.org/ | timeout (web neodpovedal včas) | 2026-11-03 |
| `n1780910701336o71` | UEFA Futsal Champions League | https://www.uefa.com/uefafutsalchampionsleague/ | timeout (web neodpovedal včas) | 2026-11-03 |
| `n1780912683570c8u` | Futsal Hungary | https://futsal.mlsz.hu/ | SSL chyba (certifikát): [SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed: unable to get local issuer cer | 2026-11-03 |
| `n178093324829801f` | Challenger series | https://www.challengerseries.net/ | HTTP 503 – chyba servera / výpadok | 2026-11-03 |
| `n1780952734783yn4` | Water polo Italy | https://www.federnuoto.it/home/pallanuoto.html | HTTP 503 – chyba servera / výpadok | 2026-11-03 |
| `n1780953808382zy1` | GFL Germany | https://gfl.info/ | HTTP 503 – chyba servera / výpadok | 2026-11-03 |
| `n17809899482426re` | Top 14 France | https://top14.lnr.fr/ | timeout (web neodpovedal včas) | 2026-11-09 |
| `n1780996555059we9` | El Gouna squash open | https://elgounainternational.com/ | HTTP 503 – chyba servera / výpadok | 2026-11-03 |
| `n17809938824743o2` | The squash site | https://thesquashsite.com/ | HTTP 503 – chyba servera / výpadok | 2026-11-03 |
| `n1781196596722lbo` | MLC USA | https://www.majorleaguecricket.com/ | SSL chyba (certifikát): [SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed: certificate has expired (_ssl. | 2026-11-03 |

#### Správy & Médiá (23)

| ID | Cesta | Adresa | Dôvod | Od |
|---|---|---|---|---|
| `n17823875005979wx` | Sport5 | https://sport5.by/ | server prerušil spojenie | 2026-11-03 |
| `n1783689918518lsn` | Fyens sport | https://fyens.dk/sport | timeout (web neodpovedal včas) | 2026-11-03 |
| `n1783770081043w36` | Crosarka | https://crosarka.com/ | spojenie odmietnuté · **3× po sebe** | 2026-11-03 |
| `n1783919287477z0w` | UTV sport | https://www.itv.com/news/utv/sport | timeout (web neodpovedal včas) | 2026-11-03 |
| `n1783952731473f3b` | ITV Wales sport | https://www.itv.com/news/wales/sport | timeout (web neodpovedal včas) | 2026-11-03 |
| `n17839584139950jx` | Silk GO sport | https://silkgo.ge/sport | SSL chyba (certifikát): [SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed: unable to get local issuer cer | 2026-11-03 |
| `n1783962083371tgb` | Liter sport | https://liter.kz/sport/ | HTTP 500 – chyba servera / výpadok | 2026-11-03 |
| `n1784235767202r58` | Bahrain News Agency sport | https://www.bna.bh/SportsNews.aspx?cms=iQRpheuphYtJ6pyXUGiNqv%2bxliCIF%2fFf | HTTP 405 | 2026-11-03 |
| `n17843181162574wi` | Kuensel sports | https://kuenselonline.com/news/sports | timeout (web neodpovedal včas) | 2026-11-03 |
| `n17843194829138eo` | People daily sports | https://sports.people.com.cn/ | SSL chyba (certifikát): [SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed: Hostname mismatch, certificate | 2026-11-03 |
| `n1784375541570fba` | Badminton India | https://www.badmintonindia.org/ | timeout (web neodpovedal včas) | 2026-11-03 |
| `n17844637163383b3` | Metrica | https://metrica.ir/ | timeout (web neodpovedal včas) | 2026-11-03 |
| `n1784552769843iom` | dmenu Sports | https://service.smt.docomo.ne.jp/portal/sports/index.html | SSL chyba (certifikát): [SSL: UNSAFE_LEGACY_RENEGOTIATION_DISABLED] unsafe legacy renegotiation disabled (_ssl.c:1 | 2026-11-03 |
| `n1784562689498127` | Al Watan sport | https://alwatanalakbar.com/category/Sports | HTTP 503 – chyba servera / výpadok | 2026-11-03 |
| `n1784711774328czd` | Harimau Malaya | https://harimaumalaya.com.my/ | SSL chyba (certifikát): [SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed: unable to get local issuer cer · **3× po sebe** | 2026-11-03 |
| `n1784714056397qaq` | Myawady Daily sport | https://www.myawady.net.mm/sport_news | SSL chyba (certifikát): [SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed: unable to get local issuer cer | 2026-11-03 |
| `n178472038787065j` | Goal Nepal | https://www.goalnepal.com/ | HTTP 502 – chyba servera / výpadok | 2026-11-03 |
| `n1784744342455hir` | Scoreline | https://www.scoreline.org/ | SSL chyba (certifikát): [SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed: self-signed certificate (_ssl. | 2026-11-03 |
| `n17847449464405gu` | Nawa-i-Waqt sports | https://www.nawaiwaqt.com.pk/sports | HTTP 503 – chyba servera / výpadok | 2026-11-03 |
| `n1784749768028shf` | Palsport | https://www.palsport.com/ | SSL chyba (certifikát): [SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed: certificate has expired (_ssl. | 2026-11-03 |
| `n17847532904520pz` | Al Riyadh sport | https://www.alriyadh.com/sport | SSL chyba (certifikát): [SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed: unable to get local issuer cer | 2026-11-03 |
| `n1785006529335ymj` | Al Thawra sport | https://althawrah.ye/archives/category/%d8%a7%d9%84%d8%b1%d9%8a%d8%a7%d8%b6%d8%a9 | timeout (web neodpovedal včas) | 2026-11-03 |
| `n1785185425485s7a` | Fox Sports Argentina | https://foxsports.com.ar/ | DNS dočasne neodpovedá | 2026-11-03 |

