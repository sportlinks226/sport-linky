# 🔗 Strážca liniek — týždenná správa

Posledný beh: **2026-11-16** · trvanie 19 min 21 s · skontrolovaných adries v tomto behu: 11094

data.json sa NEMENÍ — opravy robí Miro ručne. Každý riadok = jedna linka v dátach (rovnaká adresa na viacerých miestach = viac riadkov). Tabuľka pre Excel/Cowork: [sprava.csv](sprava.csv).

| Značka | Význam | Liniek | Adries |
|---|---|---:|---:|
| 🔴 MŔTVA | 404/410 alebo neexistujúca doména **2 behy po sebe** (v rôznych dňoch) → oprav/zmaž | 6 | 6 |
| 🔵 PRESŤAHOVANÁ | presmeruje na inú doménu → zváž novú adresu | 2 | 2 |
| 🟠 PODOZRIVÁ | 404/410/DNS prvýkrát — ďalší týždeň sa potvrdí (alebo nie) | 7 | 7 |
| 🚫 BLOKUJE ROBOTOV | web nepustí robota (401/403/429/454/456/999) — v prehliadači väčšinou funguje; len súhrn po doménach | 743 | 727 |
| 🟡 VAROVANIE | výpadok / timeout / SSL / presmerovanie v slučke / ⚠️ možná predaná doména → over ručne v prehliadači | 210 | 210 |
| ✅ OK | funguje | 10328 | 10142 |

Vynechané (nekontrolujú sa): 4095 liniek na Facebook/Instagram v poli url, 5258 ikoniek FB a 7358 ikoniek IG (polia fb/ig), 2 prázdnych/nie-webových adries.

## ✅ Opravené od minula (23)

| Adresa | Čo sa stalo | Bola mŕtva od |
|---|---|---|
| https://al-saddclub.com/ar/%D8%A7%D9%84%D8%AA%D8%B5%D9%86%D9%8A%D9%81/%D8%A7%D9%84%D8%A7%D8%AE%D8%A8%D8%A7%D8%B1/%D9%83%D8%B1%D8%A9-%D8%A7%D9%84%D8%B3%D9%84%D8%A9/ | zmizla z dát | 2026-11-03 |
| https://al-saddclub.com/ar/%D8%A7%D9%84%D8%AA%D8%B5%D9%86%D9%8A%D9%81/%D8%A7%D9%84%D8%A7%D8%AE%D8%A8%D8%A7%D8%B1/%D9%83%D8%B1%D8%A9-%D8%A7%D9%84%D8%B7%D8%A7%D8%A6%D8%B1%D8%A9/ | zmizla z dát | 2026-11-03 |
| https://alforatnews.iq/ | zmizla z dát | 2026-11-03 |
| https://as-far.ma/fr/actualites/14-volleyball | zmizla z dát | 2026-11-03 |
| https://basqueteuniaocorinthians.com.br/ | zmizla z dát | 2026-11-03 |
| https://bhutanathletics.org/ | zmizla z dát | 2026-11-03 |
| https://globalsportsarchive.com/en/soccer/team/as-jj-sapeur-pompier/67673/ | zmizla z dát | 2026-11-03 |
| https://globalsportsarchive.com/en/soccer/team/scorpion-fc-de-borkou/73513/ | zmizla z dát | 2026-11-03 |
| https://haiindia.in | zmizla z dát | 2026-11-03 |
| https://handbolti.is/ | zmizla z dát | 2026-11-03 |
| https://leicesterfordcity.co.za/ | zmizla z dát | 2026-11-03 |
| https://lincolnredimpsfc.co.uk | zmizla z dát | 2026-11-03 |
| https://theeff.org/en | zmizla z dát | 2026-11-03 |
| https://vca.at/teams/ | zmizla z dát | 2026-11-03 |
| https://volley.kz/teams/7-esil-sk | zmizla z dát | 2026-11-03 |
| https://wabc.fiba.com/ | zmizla z dát | 2026-11-03 |
| https://www.afecavol.org/eventos/2026/10/xxi-campeonato-centroamericano-sub-21-masculino.aspx | zmizla z dát | 2026-11-03 |
| https://www.atleticosbsn.org | zmizla z dát | 2026-11-03 |
| https://www.balonmanochile.com | zmizla z dát | 2026-11-03 |
| https://www.fecolcesto.org/ | zmizla z dát | 2026-11-03 |
| https://www.kagawabank.co.jp/about/handball/handball.html | zmizla z dát | 2026-11-03 |
| https://www.labeillegirondineasi.com | zmizla z dát | 2026-11-03 |
| https://www.olympiadaneapolis.com.cy/ | zmizla z dát | 2026-11-03 |

## 🔴 MŔTVE (6)


### Futbal (1)

| ID | Cesta | Adresa | Dôvod | Od |
|---|---|---|---|---|
| `n1784115956248qj0` | Futbal › Súťaže › Južná Amerika › Copa Libertadores U20 | https://www.conmebol.com/conmebol-libertadores-sub-20/ | HTTP 404 – stránka neexistuje | 2026-11-03 |

### Hokej (1)

| ID | Cesta | Adresa | Dôvod | Od |
|---|---|---|---|---|
| `f_hok_klu_na_bchl_k12` | Hokej › Kluby › Severná Amerika › BCHL › Prince George Spruce Kings | https://www.sprucekings.bc.ca/ | doména neexistuje (DNS) | 2026-11-03 |

### Tenis (2)

| ID | Cesta | Adresa | Dôvod | Od |
|---|---|---|---|---|
| `f_ten_aso_az_k26` | Tenis › Asociácie › Ázia › Pakistan | https://paktenfed.com.pk/ | HTTP 404 – stránka neexistuje | 2026-11-09 |
| `f_ten_aso_af_k21` | Tenis › Asociácie › Afrika › Nigéria | https://nigeriatennisfederation.org/ | HTTP 404 – stránka neexistuje | 2026-11-09 |

### Volejbal (1)

| ID | Cesta | Adresa | Dôvod | Od |
|---|---|---|---|---|
| `f_vol_klu_ja_brazil_m1_k6` | Volejbal › Kluby › Južná Amerika (CSV) › Brazília › Superliga mužov › Praia Clube | https://praiaclube.org.br/volei-masculino/ | HTTP 404 – stránka neexistuje | 2026-11-09 |

### Správy & Médiá (1)

| ID | Cesta | Adresa | Dôvod | Od |
|---|---|---|---|---|
| `n1784463299207kdk` | Správy & Médiá › Ázia › Irán › Varzesh3 | https://www.varzesh3.com/ | doména neexistuje (DNS) | 2026-11-09 |

## 🔵 PRESŤAHOVANÉ (2)


### Správy & Médiá (2)

| ID | Cesta | Adresa | Navrhovaná nová adresa | Od |
|---|---|---|---|---|
| `n1782219117578rqz` | Správy & Médiá › Európa › Anglicko › Daily mail sport | https://www.dailymail.co.uk/sport/index.html | https://www.dailymail.com/sport/index.html | 2026-11-03 |
| `n1782134823796rdi` | Správy & Médiá › Európa › Česko › Seznamspravy sport | https://www.seznamzpravy.cz/sekce/sport-147 | https://cmp.seznam.cz/nastaveni-souhlasu?service=bcr&return_url=https%3A%2F%2Fwww.seznamzpravy.cz%2Fsekce%2Fsport-147%3Fcwreturn%3D1&cwtime=1794816243327&loginstate=forget&cwri=4d7b9b709b1f846c6ac5591b6a9b8734&reason=missing&service_id=zpravy&cwvariant=cop | 2026-11-03 |

## 🟠 PODOZRIVÉ (zatiaľ 1 beh — netreba hneď opravovať) (7)


### Tenis (1)

| ID | Cesta | Adresa | Dôvod |
|---|---|---|---|
| `n1788840000002w2h` | Tenis › Turnaje a Súťaže › WTA Tour › WTA 250 › Ostrava Open | https://wtaostravaopen.com | doména neexistuje (DNS) |

### Basketbal (1)

| ID | Cesta | Adresa | Dôvod |
|---|---|---|---|
| `f_bas_aso_az_k2` | Basketbal › Asociácie › Ázia › Bahrajn | https://basketball.bh | doména neexistuje (DNS) |

### Hádzaná (3)

| ID | Cesta | Adresa | Dôvod |
|---|---|---|---|
| `f_had_hun_l2_k4` | Hádzaná › Kluby › Európa › Maďarsko › NB I (ženy) › Esztergomi KC | https://www.esztergomhandball.hu | doména neexistuje (DNS) |
| `f_had_bel_l1_k3` | Hádzaná › Kluby › Európa › Belgicko › Super Handball League › HC Sprimont | https://www.hcsprimont.be/website/ | HTTP 404 – stránka neexistuje |
| `f_had_fro_l1_k2` | Hádzaná › Kluby › Európa › Faerské ostrovy › Landskappingin (muži) › H71 | https://www.h71.fo | doména neexistuje (DNS) |

### Volejbal (1)

| ID | Cesta | Adresa | Dôvod |
|---|---|---|---|
| `f_vol_klu_eu_germany_z1_k11` | Volejbal › Kluby › Európa (CEV) › Nemecko › 1. Bundesliga (ženy) › VC Wiesbaden | https://www.vc-wiesbaden.de/vcw-home.html | HTTP 404 – stránka neexistuje |

### Správy & Médiá (1)

| ID | Cesta | Adresa | Dôvod |
|---|---|---|---|
| `n17848380905590s8` | Správy & Médiá › Ázia › Turkménsko › Orient TM sport | https://orient.tm/en/news/sport | HTTP 404 – stránka neexistuje |

## 🚫 BLOKUJÚ ROBOTOV (727 adries na 455 doménach)

Tieto weby nepustia automatickú kontrolu (401/403/429/454/456/999), preto strážca nevie, či linka funguje. V prehliadači väčšinou fungujú — netreba ich opravovať. Jednotlivé adresy sú v [sprava.csv](sprava.csv).

| Doména | Adries | Kód |
|---|---:|---|
| volleybox.net | 125 | 403 |
| iihf.com | 51 | 403 |
| fff.fr | 13 | 403 |
| eliteprospects.com | 11 | 403 |
| footystats.org | 10 | 403 |
| padelfip.com | 9 | 403 |
| atptour.com | 8 | 403 |
| hockeyslovakia.sk | 7 | 403 |
| chl.ca | 6 | 403 |
| euroleaguebasketball.net | 6 | 429 |
| fenerbahce.org | 6 | 403 |
| oem.com.mx | 5 | 403 |
| bjk.com.tr | 4 | 403 |
| frmvb.ma | 3 | 403 |
| tennis.com.au | 3 | 403 |
| xscores.com | 3 | 403 |
| alayam.com | 2 | 403 |
| argentinosjuniors.com.ar | 2 | 403 |
| athletic-club.eus | 2 | 403 |
| clubbrugge.be | 2 | 429 |
| diena.lt | 2 | 403 |
| echl.com | 2 | 403 |
| europeantour.com | 2 | 403 |
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
| 24chasa.bg | 1 | 403 |
| abnamro-open.nl | 1 | 403 |
| ad.nl | 1 | 403 |
| aekfc.gr | 1 | 403 |
| aelfc.gr | 1 | 403 |
| aitatennis.com | 1 | 403 |
| al-akhbar.com | 1 | 403 |
| al-ayyam.ps | 1 | 403 |
| alarabiya.net | 1 | 403 |
| alghad.com | 1 | 403 |
| alianzafc.com.co | 1 | 403 |
| alkhaleej.ae | 1 | 403 |
| allenamericans.com | 1 | 403 |
| alsharqiya.com | 1 | 403 |
| anandabazar.com | 1 | 403 |
| api-football.com | 1 | 403 |
| aqvitalfc.hu | 1 | 403 |
| arabnews.com | 1 | 403 |
| asgiana.com | 1 | 403 |
| atlantagladiators.com | 1 | 403 |
| atleticodemadrid.com | 1 | 403 |
| avas.mv | 1 | 403 |
| avisclient-cbf.fr | 1 | 403 |
| azzaman.com | 1 | 403 |
| b1tv.ro | 1 | 429 |
| badmintonplanet.com | 1 | 403 |
| bandirmaspor.com.tr | 1 | 403 |
| basketcosta.com | 1 | 403 |
| basketnews.com | 1 | 403 |
| bbm-japan.com | 1 | 403 |
| bccopenhagen.com | 1 | 454 |
| bd-pratidin.com | 1 | 403 |
| belfasttelegraph.co.uk | 1 | 403 |
| bgbasket.com | 1 | 403 |
| bharian.com.my | 1 | 403 |
| billericaytownfc.co.uk | 1 | 403 |
| bisnis.com | 1 | 403 |
| blitz.bg | 1 | 403 |
| bloomingtonbisonhockey.com | 1 | 403 |
| bndestem.nl | 1 | 403 |
| borba.me | 1 | 403 |
| borneobulletin.com.bn | 1 | 403 |
| bostonteamhandball.org | 1 | 403 |
| botafogo.com.br | 1 | 403 |
| boxrec.com | 1 | 403 |
| britishhandball.com | 1 | 403 |
| britishrowing.org | 1 | 403 |
| brse.hu | 1 | 403 |
| businessmirror.com.ph | 1 | 403 |
| canalplus.com | 1 | 403 |
| cavb.africa | 1 | 403 |
| cbcsport.az | 1 | 403 |
| ceskyflorbal.cz | 1 | 403 |
| cfcruzazul.com | 1 | 403 |
| chacaritajuniors.com.ar | 1 | 429 |
| chesterstandard.co.uk | 1 | 403 |
| chinapress.com.my | 1 | 403 |
| clubelo.com | 1 | 403 |
| clwbpeldroed.org | 1 | 403 |
| cpdporthmadogfc.com | 1 | 403 |
| cricinfo.com | 1 | 403 |
| curling.ca | 1 | 403 |
| cxmagazine.com | 1 | 403 |
| cycloneshockey.com | 1 | 403 |
| dabashandball.hu | 1 | 403 |
| dailyexpress.com.my | 1 | 403 |
| dailynews.co.th | 1 | 403 |
| dailynews.lk | 1 | 403 |
| dailysportscar.com | 1 | 403 |
| dallasteamhandballclub.com | 1 | 403 |
| dartsplanet.tv | 1 | 403 |
| demorgen.be | 1 | 403 |
| dhakatribune.com | 1 | 403 |
| dhiyares.com | 1 | 403 |
| diarionorte.com | 1 | 403 |
| dinamina.lk | 1 | 403 |
| dnes.bg | 1 | 403 |
| dnevnik.bg | 1 | 403 |
| dvhn.nl | 1 | 403 |
| e1.ru | 1 | 403 |
| echlthunder.com | 1 | 403 |
| ecuavisa.com | 1 | 403 |
| ed.nl | 1 | 403 |
| efa.com.eg | 1 | 403 |
| egypttennis.com | 1 | 403 |
| elaph.com | 1 | 403 |
| elaragueno.com.ve | 1 | 403 |
| elcaribe.com.do | 1 | 403 |
| elcrackdeportivo.com.ar | 1 | 403 |
| eldesmarque.com | 1 | 403 |
| elemergente.com | 1 | 403 |
| elgrafico.com | 1 | 403 |
| elitesportvendsyssel.dk | 1 | 454 |
| elpais.com.uy | 1 | 403 |
| elperiodiquito.com | 1 | 403 |
| elpilon.com.co | 1 | 429 |
| elpotosi.net | 1 | 403 |
| enabbaladi.net | 1 | 403 |
| encancha.cl | 1 | 403 |
| englandsquash.com | 1 | 403 |
| entella.it | 1 | 403 |
| erc-ingolstadt.de | 1 | 429 |
| eurobasket.com | 1 | 403 |
| eurohockey.com | 1 | 403 |
| ewrc-results.com | 1 | 403 |
| expreso.com.pe | 1 | 403 |
| extratime.com | 1 | 403 |
| f5haber.com | 1 | 403 |
| fadeawayworld.net | 1 | 403 |
| fajar.co.id | 1 | 403 |
| fakty.ua | 1 | 403 |
| fam.mw | 1 | 403 |
| fbref.com | 1 | 403 |
| fcf.cv | 1 | 403 |
| fdf.dj | 1 | 403 |
| fecofoot.cg | 1 | 403 |
| ferisports.com | 1 | 403 |
| ffk.cw | 1 | 403 |
| fiaerc.com | 1 | 403 |
| figueirense.com.br | 1 | 403 |
| fijilive.com | 1 | 403 |
| finhockey.fi | 1 | 403 |
| firstpost.com | 1 | 403 |
| flleida.cat | 1 | 403 |
| floridaeverblades.com | 1 | 403 |
| football.ch | 1 | 403 |
| football.org.il | 1 | 403 |
| freepressseries.co.uk | 1 | 403 |
| fremadamagerelite.dk | 1 | 454 |
| frmf.ma | 1 | 403 |
| fsuniverse.net | 1 | 403 |
| fuhandball.com | 1 | 403 |
| futbolred.com | 1 | 403 |
| futsports506.cr | 1 | 403 |
| gargoyleshockey.com | 1 | 403 |
| gazetaexpress.com | 1 | 403 |
| gelderlander.nl | 1 | 403 |
| ghostpirateshockey.com | 1 | 403 |
| glasgowtimes.co.uk | 1 | 403 |
| gol.bg | 1 | 403 |
| golfdigest.com | 1 | 403 |
| golfstats.com | 1 | 403 |
| gva.be | 1 | 403 |
| hackastat.eu | 1 | 403 |
| handballeger.hu | 1 | 403 |
| handballvikings.com | 1 | 403 |
| hb.fo | 1 | 454 |
| hch.tv | 1 | 403 |
| hctoros.ru | 1 | 403 |
| heraldodemexico.com.mx | 1 | 403 |
| heraldscotland.com | 1 | 403 |
| hknitra.sk | 1 | 403 |
| hkskalica.sk | 1 | 403 |
| hln.be | 1 | 403 |
| hobartinternational.com.au | 1 | 403 |
| honved.hu | 1 | 403 |
| hsf.fo | 1 | 454 |
| htfc.co.uk | 1 | 403 |
| ibasketball.co.il | 1 | 403 |
| iceflyers.com | 1 | 403 |
| idahosteelheads.com | 1 | 403 |
| ifkkristianstad.se | 1 | 454 |
| impartialreporter.com | 1 | 403 |
| indeksonline.net | 1 | 403 |
| independent.com.mt | 1 | 403 |
| independent.ie | 1 | 403 |
| independente.tl | 1 | 403 |
| independienteyumbo.com | 1 | 403 |
| indyfuelhockey.com | 1 | 403 |
| inquirer.net | 1 | 403 |
| insajderi.org | 1 | 403 |
| insidethegames.biz | 1 | 403 |
| iol.pt | 1 | 403 |
| israelhayom.co.il | 1 | 403 |
| ittf.com | 1 | 403 |
| iz.ru | 1 | 403 |
| jacksonvilleicemen.com | 1 | 403 |
| japantoday.com | 1 | 403 |
| jatkoaika.com | 1 | 403 |
| jhf.jo | 1 | 403 |
| jmdeportes.com | 1 | 403 |
| jordantimes.com | 1 | 403 |
| jornada.com.mx | 1 | 403 |
| jpnn.com | 1 | 403 |
| jscherbourg.fr | 1 | 403 |
| jvf.jo | 1 | 403 |
| kalerkantho.com | 1 | 403 |
| karatoa.com.bd | 1 | 403 |
| kcmavericks.com | 1 | 403 |
| khmertimeskh.com | 1 | 403 |
| kicker.de | 1 | 403 |
| kkspartak.rs | 1 | 403 |
| klix.ba | 1 | 403 |
| knightmonstershockey.com | 1 | 403 |
| koha.net | 1 | 403 |
| komets.com | 1 | 403 |
| kozarmislenyfc.hu | 1 | 403 |
| kraso.sk | 1 | 429 |
| kscszekszard.hu | 1 | 403 |
| kwings.com | 1 | 403 |
| kyiv.ua | 1 | 403 |
| lamananadigital.com | 1 | 403 |
| langrenn.com | 1 | 403 |
| laprensagrafica.com | 1 | 403 |
| lc.nl | 1 | 403 |
| ldlcasvel.com | 1 | 403 |
| leparisien.fr | 1 | 403 |
| lequipe.fr | 1 | 403 |
| lesoir.be | 1 | 403 |
| letelegramme.fr | 1 | 403 |
| levangerfk.no | 1 | 403 |
| liberation.fr | 1 | 403 |
| liepajniekiem.lv | 1 | 403 |
| lions3r.com | 1 | 403 |
| live-darts.com | 1 | 403 |
| lrytas.lt | 1 | 403 |
| lsm.lv | 1 | 403 |
| mackolik.com | 1 | 403 |
| mainemariners.com | 1 | 403 |
| maltatoday.com.mt | 1 | 403 |
| marica.bg | 1 | 403 |
| marinefc.com | 1 | 403 |
| marozsanfabian.com | 1 | 403 |
| mb.com.ph | 1 | 403 |
| mediapermata.com.bn | 1 | 403 |
| megacadena.com.py | 1 | 403 |
| metsbasketball.com | 1 | 403 |
| mezokovesdzsory.hu | 1 | 403 |
| mhscfoot.com | 1 | 403 |
| mrt.com.mk | 1 | 403 |
| msports.mn | 1 | 429 |
| mundoascenso.com.ar | 1 | 403 |
| musavat.com | 1 | 403 |
| muscatdaily.com | 1 | 403 |
| nacionale.com | 1 | 403 |
| nadialsalam.sa | 1 | 403 |
| nascar.com | 1 | 403 |
| naturalstattrick.com | 1 | 403 |
| nba.com | 1 | 403 |
| nbl.basketball | 1 | 403 |
| ndtv.com | 1 | 403 |
| newagebd.net | 1 | 403 |
| news.com.au | 1 | 403 |
| news18.com | 1 | 403 |
| nieuwsblad.be | 1 | 403 |
| nifootballleague.com | 1 | 403 |
| nkistra.com | 1 | 403 |
| nmgoatheads.com | 1 | 403 |
| nna-leb.gov.lb | 1 | 403 |
| norddjurshaandbold.dk | 1 | 454 |
| nordsjaelland-haandbold.dk | 1 | 403 |
| norfolkadmirals.com | 1 | 403 |
| northwalespioneer.co.uk | 1 | 403 |
| nova.cz | 1 | 403 |
| nst.com.my | 1 | 403 |
| nu.nl | 1 | 403 |
| o29m.com | 1 | 403 |
| odderhaandbold.dk | 1 | 454 |
| oneonline.mv | 1 | 403 |
| orlandosolarbearshockey.com | 1 | 403 |
| oslobodjenje.ba | 1 | 403 |
| paakallo.fi | 1 | 403 |
| panorama.com.al | 1 | 403 |
| paobc.gr | 1 | 403 |
| parool.nl | 1 | 403 |
| pcb.com.pk | 1 | 403 |
| pembrokehamiltonclub.bm | 1 | 403 |
| peru21.pe | 1 | 403 |
| petrojetsc.com | 1 | 401 |
| philta.org | 1 | 403 |
| piattitenniscenter.it | 1 | 403 |
| piratichomutov.cz | 1 | 403 |
| pluska.sk | 1 | 403 |
| premierleague.com | 1 | 403 |
| prensa.com | 1 | 403 |
| pressandjournal.co.uk | 1 | 403 |
| pro-football-reference.com | 1 | 403 |
| proceso.com.mx | 1 | 403 |
| proxcskiing.com | 1 | 403 |
| psmnews.mv | 1 | 403 |
| pssi.org | 1 | 403 |
| puckpedia.com | 1 | 403 |
| quanthockey.com | 1 | 403 |
| racer.com | 1 | 429 |
| racing-reference.info | 1 | 403 |
| racingcba.com.ar | 1 | 429 |
| radiohouse.hn | 1 | 403 |
| railershc.com | 1 | 403 |
| rapidcityrush.com | 1 | 403 |
| rbfa.be | 1 | 403 |
| realgm.com | 1 | 403 |
| redbull.com | 1 | 403 |
| reuters.com | 1 | 401 |
| rochdaleafc.co.uk | 1 | 403 |
| royalshockey.com | 1 | 403 |
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
| sky.de | 1 | 403 |
| skysportaustria.at | 1 | 403 |
| slamonline.com | 1 | 403 |
| slobodenpecat.mk | 1 | 403 |
| slusemiprofootball.com | 1 | 403 |
| smcaen.fr | 1 | 403 |
| soccerstats.com | 1 | 403 |
| soenderjyskefodbold.dk | 1 | 454 |
| solomonstarnews.com | 1 | 403 |
| soydetelmo.com.ar | 1 | 403 |
| soyfutbol.com | 1 | 403 |
| spin.ph | 1 | 403 |
| sport.de | 1 | 403 |
| sport24.ru | 1 | 401 |
| sportas24.lt | 1 | 403 |
| sportazinas.com | 1 | 403 |
| sportnieuws.nl | 1 | 403 |
| sports.tj | 1 | 403 |
| sportsport.ba | 1 | 403 |
| sportsv.net | 1 | 403 |
| sportsv.ro | 1 | 403 |
| sportyhq.com | 1 | 403 |
| squawka.com | 1 | 403 |
| sta.si | 1 | 403 |
| statsperform.com | 1 | 403 |
| stingrayshockey.com | 1 | 403 |
| sudinfo.be | 1 | 403 |
| sundayobserver.lk | 1 | 403 |
| sundaypost.com | 1 | 403 |
| suntory.co.jp | 1 | 403 |
| svenskfotboll.se | 1 | 403 |
| sverigesradio.se | 1 | 403 |
| swamprabbits.com | 1 | 403 |
| swimcloud.com | 1 | 403 |
| swimrankings.net | 1 | 403 |
| taipeitimes.com | 1 | 403 |
| tapology.com | 1 | 403 |
| tbf.org.tr | 1 | 403 |
| teamesbjerg.dk | 1 | 454 |
| telegraaf.nl | 1 | 403 |
| telegraphindia.com | 1 | 403 |
| tempo.co | 1 | 403 |
| tennisireland.ie | 1 | 403 |
| tennissa.co.za | 1 | 403 |
| tennistonic.com | 1 | 403 |
| tennisworldusa.org | 1 | 403 |
| tepatitlanfc.com | 1 | 403 |
| tff.or.tz | 1 | 403 |
| thawra.sy | 1 | 403 |
| theanalyst.com | 1 | 403 |
| theborneopost.com | 1 | 403 |
| thecourier.co.uk | 1 | 403 |
| thenational.scot | 1 | 403 |
| thenews.com.pk | 1 | 403 |
| theshots.co.uk | 1 | 403 |
| timesofisrael.com | 1 | 403 |
| tipsport.sk | 1 | 403 |
| tntsports.cl | 1 | 403 |
| tntsports.com.ar | 1 | 403 |
| toledowalleye.com | 1 | 403 |
| tolonews.com | 1 | 403 |
| trabzonspor.org.tr | 1 | 403 |
| trentonironhawks.com | 1 | 403 |
| trouw.nl | 1 | 403 |
| trud.bg | 1 | 403 |
| tsg-hoffenheim.de | 1 | 403 |
| tsgskyhawks.com | 1 | 403 |
| tsports.com | 1 | 403 |
| tsv1882.de | 1 | 429 |
| tubantia.nl | 1 | 403 |
| tulsaoilers.com | 1 | 403 |
| tuskerfc.com | 1 | 403 |
| tuzos.com.mx | 1 | 403 |
| tv3.lv | 1 | 403 |
| unionradio.net | 1 | 403 |
| usmp.edu.pe | 1 | 403 |
| usopen.com | 1 | 403 |
| usskiandsnowboard.org | 1 | 403 |
| vaguthu.mv | 1 | 403 |
| vanguardia.com.mx | 1 | 403 |
| vavel.com | 1 | 403 |
| vcshahter.by | 1 | 403 |
| victoriahotspursfc.com | 1 | 403 |
| vietnamnews.vn | 1 | 403 |
| vif.fo | 1 | 454 |
| vilanovafc.com.br | 1 | 403 |
| virgule.lu | 1 | 403 |
| vlcizilina.sk | 1 | 403 |
| vocketfc.com | 1 | 403 |
| volkskrant.nl | 1 | 403 |
| volleyball.dk | 1 | 454 |
| volleynet.at | 1 | 403 |
| vov.vn | 1 | 403 |
| wheelingnailers.com | 1 | 403 |
| whoscored.com | 1 | 403 |
| wichitathunder.com | 1 | 403 |
| windrawwin.com | 1 | 403 |
| wolfdogs.jp | 1 | 403 |
| woluesfc.co.uk | 1 | 403 |
| worldcurling.org | 1 | 403 |
| worldfootball.net | 1 | 403 |
| worldsport.ge | 1 | 403 |
| wort.lu | 1 | 403 |
| wprost.pl | 1 | 403 |
| wrc.com | 1 | 403 |
| xgstat.com | 1 | 429 |
| xn--ikasthndbold-ycb.dk | 1 | 454 |
| zdg.md | 1 | 403 |
| zniczpruszkow.com.pl | 1 | 403 |

## 🔼 DÁ SA PREPNÚŤ NA HTTPS (1)

Linka s http:// funguje, ale funguje aj zabezpečená adresa https:// na tom istom webe. Len návrh — data.json sa nemení; ak chceš, adresu v dátach vymeň.

| ID | Cesta | Adresa | Navrhovaná adresa |
|---|---|---|---|
| `f_arg_l3b_k22` | Futbal › Kluby › Južná Amerika › Argentína › Primera B Metropolitana › Ituzaingo | http://www.caituzaingo.com.ar/ | https://caituzaingo.com.ar/ |

## 🟡 VAROVANIA (over ručne) (210)

### 🟡 ⚠️ over ručne – možná predaná doména (9)


#### Futbal (1)

| ID | Cesta | Adresa | Kam presmeruje | Od |
|---|---|---|---|---|
| `f_swe_l3n_k6` | Futbal › Kluby › Európa › Švédsko › Ettan Norra › FC Järfälla | https://www.fcjarfalla.se/ | https://fcjarfalla.sportadmin.dev/ | 2026-11-09 |

#### Hokej (1)

| ID | Cesta | Adresa | Kam presmeruje | Od |
|---|---|---|---|---|
| `f_hok_klu_na_ncdc_k37` | Hokej › Kluby › Severná Amerika › NCDC › Utica Jr. Comets | https://www.uticajrcomets.org/ | https://jrcomets.hockeyshift.com/ | 2026-11-09 |

#### Tenis (3)

| ID | Cesta | Adresa | Kam presmeruje | Od |
|---|---|---|---|---|
| `f_ten_aso_eu_k4` | Tenis › Asociácie › Európa › Bulharsko | https://www.bgtennis.bg/ | https://bft.bg/ | 2026-11-16 |
| `f_ten_aso_eu_k24` | Tenis › Asociácie › Európa › Portugalsko | https://www.fptenis.pt/ | https://tenis.tiesports.com/fpt/ | 2026-11-09 |
| `f_ten_aso_ja_k12` | Tenis › Asociácie › Južná Amerika (COSAT) › Uruguaj | https://aut.uy/ | https://uy.tenisintegrado.com/home | 2026-11-16 |

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

### 🟡 Ostatné varovania (201)


#### Aktuálne (3)

| ID | Cesta | Adresa | Dôvod | Od |
|---|---|---|---|---|
| `a179432669607026f3` | Futbal – Liga národov | https://www.uefa.com/uefanationsleague/fixtures-results/ | timeout (web neodpovedal včas) | 2026-11-16 |
| `a179450253549708i0` | Jazdectvo – Stuttgart German Masters | https://www.longinestiming.com/equestrian/2026/stuttgart-german-masters-stuttgart/ | timeout (web neodpovedal včas) | 2026-11-16 |
| `a1794237205410crp13` | OH mládeže Dakar | https://www.olympics.com/en/dakar-2026/schedule-results#/en | timeout (web neodpovedal včas) | 2026-11-16 |

#### Futbal (74)

| ID | Cesta | Adresa | Dôvod | Od |
|---|---|---|---|---|
| `n1784113212680s6i` | ME muži 2028 | https://www.uefa.com/euro2028/ | timeout (web neodpovedal včas) · **3× po sebe** | 2026-11-03 |
| `n178411325834500d` | Liga národov muži | https://www.uefa.com/uefanationsleague/ | timeout (web neodpovedal včas) · **3× po sebe** | 2026-11-03 |
| `n1784113327693sy5` | Liga majstrov | https://www.uefa.com/uefachampionsleague/ | timeout (web neodpovedal včas) · **3× po sebe** | 2026-11-03 |
| `n178411334679368q` | Európska liga | https://www.uefa.com/uefaeuropaleague/ | timeout (web neodpovedal včas) · **3× po sebe** | 2026-11-03 |
| `n1784113364906kty` | Konferenčná liga | https://www.uefa.com/uefaconferenceleague/ | timeout (web neodpovedal včas) · **3× po sebe** | 2026-11-03 |
| `n17841133816378tx` | Superpohár | https://www.uefa.com/uefasupercup/ | timeout (web neodpovedal včas) · **3× po sebe** | 2026-11-03 |
| `n17841134233822j5` | ME muži U21 | https://www.uefa.com/under21/ | timeout (web neodpovedal včas) · **3× po sebe** | 2026-11-03 |
| `n1784113458471i73` | ME muži U19 | https://www.uefa.com/under19/ | timeout (web neodpovedal včas) · **3× po sebe** | 2026-11-03 |
| `n1784113480304soi` | ME muži U17 | https://www.uefa.com/under17/ | timeout (web neodpovedal včas) · **3× po sebe** | 2026-11-03 |
| `n1784113609217o2w` | ME ženy | https://www.uefa.com/womenseuro/ | timeout (web neodpovedal včas) · **3× po sebe** | 2026-11-03 |
| `n1784113643274jsb` | Liga národov ženy | https://www.uefa.com/womensnationsleague/ | timeout (web neodpovedal včas) · **3× po sebe** | 2026-11-03 |
| `n178411367786861h` | ME ženy u19 | https://www.uefa.com/womensunder19/ | timeout (web neodpovedal včas) · **3× po sebe** | 2026-11-03 |
| `n1784113705982s7c` | ME ženy U17 | https://www.uefa.com/womensunder17/ | timeout (web neodpovedal včas) · **3× po sebe** | 2026-11-03 |
| `n1784113745882dy1` | UEFA Youth league | https://www.uefa.com/uefayouthleague/ | timeout (web neodpovedal včas) · **3× po sebe** | 2026-11-03 |
| `n1784113772891qvd` | UEFA Regions cup | https://www.uefa.com/regionscup/ | timeout (web neodpovedal včas) · **3× po sebe** | 2026-11-03 |
| `f_svk_l2_k10` | MŠK Považská Bystrica | https://mskpb.eu | HTTP 455 | 2026-11-16 |
| `f_esp_l2_k7` | Granada | https://granadacf.es/ | SSL chyba (certifikát): [SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed: unable to get local issuer cer · **3× po sebe** | 2026-11-03 |
| `f_ger_bl_k0` | Bayern Mníchov | https://fcbayern.com/ | timeout (web neodpovedal včas) · **3× po sebe** | 2026-11-03 |
| `f_ger_rn_k9` | SSV Jeddeloh | https://www.ssv-jeddeloh.de/ | HTTP 503 – chyba servera / výpadok · **3× po sebe** | 2026-11-03 |
| `f_ger_rno_k14` | Greifswalder FC | https://greifswalder-fc.de/ | HTTP 503 – chyba servera / výpadok · **3× po sebe** | 2026-11-03 |
| `f_ger_rsw_k1` | FSV Frankfurt | https://www.fsv-frankfurt.de/ | HTTP 503 – chyba servera / výpadok · **3× po sebe** | 2026-11-03 |
| `f_ger_rsw_k7` | SSV Ulm 1846 | https://www.ssvulm1846-fussball.de/ | HTTP 503 – chyba servera / výpadok · **3× po sebe** | 2026-11-03 |
| `f_ger_rb_k13` | TSV Aubstadt | https://www.tsv-aubstadt.de/ | HTTP 503 – chyba servera / výpadok · **3× po sebe** | 2026-11-03 |
| `f_ger_rb_k15` | Bayern Mníchov II | https://fcbayern.com/de/teams/fc-bayern-campus/amateure | timeout (web neodpovedal včas) · **3× po sebe** | 2026-11-03 |
| `f_fra_l2_k16` | USL Dunkerque | https://usldunkerque.com/ | SSL chyba (certifikát): [SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed: Hostname mismatch, certificate · **3× po sebe** | 2026-11-03 |
| `f_fra_l3_k2` | Amiens SC | https://amiensfootball.com/ | SSL chyba (certifikát): [SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed: Hostname mismatch, certificate · **3× po sebe** | 2026-11-03 |
| `f_blr_l1_liga` | Vyššia liga | https://championship.abff.by/male/tournaments/1/?tournamentId=7 | SSL chyba (certifikát): [SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed: unable to get local issuer cer · **3× po sebe** | 2026-11-03 |
| `f_blr_l1_k7` | Neman Grodno | https://www.fcneman.by | timeout (web neodpovedal včas) · **3× po sebe** | 2026-11-03 |
| `f_blr_l1_k13` | FC Vitebsk | https://fc.vitebsk.by | timeout (web neodpovedal včas) · **3× po sebe** | 2026-11-03 |
| `f_mne_l2_k2` | FK Zeta Golubovci | https://fk-zeta.me/ | SSL chyba (certifikát): [SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed: certificate has expired (_ssl. | 2026-11-09 |
| `f_fin_l2_k7` | Ekenäs IF | https://herrar.eiffotboll.fi/ | spojenie odmietnuté · **3× po sebe** | 2026-11-03 |
| `f_ned_l2_k4` | FC Dordrecht | https://www.fcdordrecht.nl/ | HTTP 400 · **3× po sebe** | 2026-11-03 |
| `f_isl_l2_k4` | Þróttur Reykjavík | https://trottur.is/ | timeout (web neodpovedal včas) | 2026-11-16 |
| `f_mkd_l1_k3` | FC Struga | https://fcstruga.com/ | SSL chyba (certifikát): [SSL: UNEXPECTED_EOF_WHILE_READING] EOF occurred in violation of protocol (_ssl.c:1011) | 2026-11-09 |
| `f_hun_l1_k11` | Vasas FC | https://vasasfc.hu | spojenie odmietnuté · **3× po sebe** | 2026-11-03 |
| `f_pol_l2_k3` | Miedź Legnica | https://miedzlegnica.eu | SSL chyba (certifikát): [SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed: unable to get local issuer cer · **3× po sebe** | 2026-11-03 |
| `f_aut_l2_k5` | FC Liefering | https://www.fc-liefering.at/de | HTTP 503 – chyba servera / výpadok | 2026-11-16 |
| `f_rus_l1_k11` | Achmat Groznyj | https://www.fc-akhmat.ru/ | chyba spojenia: OSError [Errno 113] No route to host | 2026-11-16 |
| `f_nir_l1_k3` | Carrick Rangers | https://www.carrickrangers.co.uk/ | HTTP 503 – chyba servera / výpadok · **3× po sebe** | 2026-11-03 |
| `f_svn_l1_k1` | NK Aluminij | https://nkaluminij.net/ | HTTP 500 – chyba servera / výpadok · **3× po sebe** | 2026-11-03 |
| `f_che_l1_k11` | BSC Young Boys | https://www.bscyb.ch/ | HTTP 503 – chyba servera / výpadok · **3× po sebe** | 2026-11-03 |
| `f_ita_l2_k18` | Südtirol | https://www.fc-suedtirol.com/ | SSL chyba (certifikát): [SSL: DH_KEY_TOO_SMALL] dh key too small (_ssl.c:1011) · **3× po sebe** | 2026-11-03 |
| `f_ukr_l1_k5` | Obolon Kyjiv | https://fc.obolon.ua/ | SSL chyba (certifikát): [SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed: unable to get local issuer cer · **3× po sebe** | 2026-11-03 |
| `f_wal_l1_k15` | Holywell Town | https://www.holywelltownfc.co.uk/ | HTTP 503 – chyba servera / výpadok · **3× po sebe** | 2026-11-03 |
| `f_kaz_l2_k8` | Taraz | https://tarazfc.kz/ru/ | HTTP 500 – chyba servera / výpadok | 2026-11-16 |
| `f_aze_l1_k3` | Neftçi Baku | https://neftchi.az/ | HTTP 468 | 2026-11-16 |
| `f_cyp_l2_k5` | ASIL Lysi | https://asillysis.com/ | HTTP 503 – chyba servera / výpadok · **3× po sebe** | 2026-11-03 |
| `f_jpn_l2_k18` | Vegalta Sendai | https://www.vegalta.co.jp | chyba spojenia: OSError [Errno 113] No route to host · **3× po sebe** | 2026-11-03 |
| `f_kor_l1_k11` | FC Anyang | https://www.fc-anyang.com/ | SSL chyba (certifikát): [SSL: SSLV3_ALERT_HANDSHAKE_FAILURE] ssl/tls alert handshake failure (_ssl.c:1011) · **3× po sebe** | 2026-11-03 |
| `f_kor_l2_k16` | Gimhae FC 2008 | https://www.gimhaefc2008.com/ | SSL chyba (certifikát): [SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed: unable to get local issuer cer · **3× po sebe** | 2026-11-03 |
| `f_sau_l1_k5` | Al-Faisaly | https://alfaisalyfc.net | SSL chyba (certifikát): [SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed: unable to get local issuer cer | 2026-11-16 |
| `f_uzb_l1_k13` | Pakhtakor | https://pakhtakor.uz | DNS dočasne neodpovedá | 2026-11-16 |
| `f_vnm_l1_k12` | The Cong-Viettel | https://viettelsports.vn/ | chyba spojenia: OSError [Errno 101] Network is unreachable | 2026-11-16 |
| `f_arg_l1_k23` | Atletico Tucuman | https://www.clubatleticotucuman.com.ar/ | HTTP 500 – chyba servera / výpadok · **3× po sebe** | 2026-11-03 |
| `f_arg_l3b_k1` | Arsenal (Sarandi) | https://www.arsenalfc.com.ar/ | HTTP 503 – chyba servera / výpadok · **3× po sebe** | 2026-11-03 |
| `f_uru_l1_k11` | Club Deportivo Maldonado | https://deportivomaldonadosad.com | HTTP 503 – chyba servera / výpadok · **3× po sebe** | 2026-11-03 |
| `f_ago_l1_k1` | Petro Atlético de Luanda | https://petroatletico.co.ao/ | SSL chyba (certifikát): [SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed: self-signed certificate (_ssl. · **3× po sebe** | 2026-11-03 |
| `f_gha_l1_k3` | Hearts of Oak | https://www.heartsofoaksc.com/ | SSL chyba (certifikát): [SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed: certificate has expired (_ssl. · **3× po sebe** | 2026-11-03 |
| `f_zaf_l1_k3` | Kaizer Chiefs | https://www.kaizerchiefs.com/ | HTTP 503 – chyba servera / výpadok | 2026-11-16 |
| `f_cmr_l1_k2` | Dynamo Douala | https://dynamoclub-douala.com/ | SSL chyba (certifikát): [SSL: TLSV1_ALERT_INTERNAL_ERROR] tlsv1 alert internal error (_ssl.c:1011) · **3× po sebe** | 2026-11-03 |
| `f_lby_l1_k11` | Al-Ittihad Tripoli | https://ittihadclub.ly/ | timeout (web neodpovedal včas) · **3× po sebe** | 2026-11-03 |
| `f_zwe_l1_k11` | MWOS | https://mwosfc.co.zw/ | timeout (web neodpovedal včas) | 2026-11-16 |
| `f_guf_l1_k6` | US Sinnamary | https://www.ussinnamary.footeo.com/ | SSL chyba (certifikát): [SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed: Hostname mismatch, certificate · **3× po sebe** | 2026-11-03 |
| `f_cri_l2_k8` | FC Moravia (Fútbol Consultants) | https://fcmoravia.com/ | timeout (web neodpovedal včas) | 2026-11-16 |
| `n1784027166602qw3` | UEFA | https://www.uefa.com/ | timeout (web neodpovedal včas) · **3× po sebe** | 2026-11-03 |
| `n1784029893842q1h` | Bielorusko | https://abff.by/ | SSL chyba (certifikát): [SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed: unable to get local issuer cer · **3× po sebe** | 2026-11-03 |
| `n1784030738475eqr` | Maďarsko | https://en.mlsz.hu/ | SSL chyba (certifikát): [SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed: unable to get local issuer cer · **3× po sebe** | 2026-11-03 |
| `n1784036219550xj1` | Kambodža | https://the-ffc.org | HTTP 500 – chyba servera / výpadok | 2026-11-16 |
| `n1784037269838ix2` | Vietnam | https://vff.org.vn/ | timeout (web neodpovedal včas) | 2026-11-16 |
| `n1784038128334q6m` | Peru | https://fpf.org.pe/ | SSL chyba (certifikát): [SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed: unable to get local issuer cer · **3× po sebe** | 2026-11-03 |
| `n1784040473665y9n` | Alžírsko | https://www.faf.dz/category/equipe-nationale-a/ | timeout (web neodpovedal včas) · **3× po sebe** | 2026-11-03 |
| `n1784053308186d1h` | Pobrežie Slonoviny | https://fifciv.com/ | HTTP 503 – chyba servera / výpadok · **3× po sebe** | 2026-11-03 |
| `n1784053401045psc` | Rwanda | https://ferwafa.rw/ | timeout (web neodpovedal včas) | 2026-11-16 |
| `n1784055423893yob` | Papua-Nová Guinea | https://pngfootball.com.pg/ | timeout (web neodpovedal včas) · **3× po sebe** | 2026-11-03 |

#### Hokej (14)

| ID | Cesta | Adresa | Dôvod | Od |
|---|---|---|---|---|
| `n1783520324419c3v` | CEHL – Stredoeurópska hokejová liga | https://www.cehl.eu/ | timeout (web neodpovedal včas) · **3× po sebe** | 2026-11-03 |
| `f_hok_klu_eu_deu_l1_k3` | EHC Red Bull München | https://www.redbullmuenchen.de/ | HTTP 500 – chyba servera / výpadok · **3× po sebe** | 2026-11-03 |
| `f_hok_klu_eu_deu_l1_k7` | Grizzlys Wolfsburg | https://www.grizzlys.de/ | HTTP 503 – chyba servera / výpadok · **3× po sebe** | 2026-11-03 |
| `f_hok_klu_eu_deu_l1_k10` | Krefeld Pinguine | https://krefeld-pinguine.de/ | HTTP 503 – chyba servera / výpadok · **3× po sebe** | 2026-11-03 |
| `f_hok_klu_eu_deu_l2_k5` | EC Bad Nauheim | https://ec-bn.de/ | HTTP 503 – chyba servera / výpadok · **3× po sebe** | 2026-11-03 |
| `f_hok_klu_eu_rus_l1_k13` | Salavat Julajev Ufa | https://hcsalavat.ru/ | timeout (web neodpovedal včas) · **3× po sebe** | 2026-11-03 |
| `f_hok_klu_eu_rus_l1_k17` | Spartak Moskva | https://spartak.ru/ | SSL chyba (certifikát): [SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed: unable to get local issuer cer · **3× po sebe** | 2026-11-03 |
| `f_hok_klu_eu_rus_l2_k16` | Južnyj Ural Orsk | https://www.orsk-hockey.ru/ | chyba spojenia: OSError [Errno 113] No route to host | 2026-11-16 |
| `f_hok_klu_eu_fra_l1_k12` | Spartiates de Marseille | https://marseillehockeyclub.com/ | HTTP 503 – chyba servera / výpadok · **3× po sebe** | 2026-11-03 |
| `f_hok_klu_eu_fra_l2_k5` | Diables Rouges de Valenciennes | https://www.diablesrouges.fr/ | HTTP 503 – chyba servera / výpadok · **3× po sebe** | 2026-11-03 |
| `f_hok_klu_eu_aut_l1_k3` | EC Red Bull Salzburg | https://ecrbs.redbulls.com/ | HTTP 500 – chyba servera / výpadok · **3× po sebe** | 2026-11-03 |
| `f_hok_klu_eu_aut_l2_k4` | Red Bull Hockey Juniors | https://ecrbs.redbulls.com/de/academy/teams?teamType=RBJ | HTTP 500 – chyba servera / výpadok · **3× po sebe** | 2026-11-03 |
| `f_hok_klu_eu_gbr_l2_k3` | Hull Seahawks | https://www.hullseahawks.co.uk/ | HTTP 503 – chyba servera / výpadok · **3× po sebe** | 2026-11-03 |
| `f_hok_klu_eu_gbr_l2_k7` | Romford Raiders | https://romfordraiders.co.uk/ | HTTP 503 – chyba servera / výpadok · **3× po sebe** | 2026-11-03 |

#### Tenis (9)

| ID | Cesta | Adresa | Dôvod | Od |
|---|---|---|---|---|
| `n1788830000026a5` | Grand Prix Auvergne-Rhône-Alpes | https://www.grandprix-auvergnerhonealpes.com/ | HTTP 503 – chyba servera / výpadok · **3× po sebe** | 2026-11-03 |
| `n1788830000012w5h` | Abierto GNP Seguros | https://abiertognpseguros.com/ | SSL chyba (certifikát): [SSL: TLSV1_UNRECOGNIZED_NAME] tlsv1 unrecognized name (_ssl.c:1011) · **3× po sebe** | 2026-11-03 |
| `n1788890000046thz` | Steffi Graf | https://steffi-graf.net/ | SSL chyba (certifikát): [SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed: certificate has expired (_ssl. | 2026-11-16 |
| `f_ten_aso_eu_k41` | Arménsko | https://www.tennisarmenia.org/ | DNS dočasne neodpovedá · **3× po sebe** | 2026-11-03 |
| `f_ten_aso_eu_k50` | Monako | https://www.monaco-tennis.com/ | HTTP 503 – chyba servera / výpadok · **3× po sebe** | 2026-11-03 |
| `f_ten_aso_az_k9` | Indonézia | https://www.pelti.org/ | SSL chyba (certifikát): [SSL: TLSV1_ALERT_INTERNAL_ERROR] tlsv1 alert internal error (_ssl.c:1011) · **3× po sebe** | 2026-11-03 |
| `f_ten_aso_az_k18` | Kazachstan | https://ktf.kz/ | SSL chyba (certifikát): [SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed: unable to get local issuer cer · **3× po sebe** | 2026-11-03 |
| `f_ten_aso_az_k34` | Turkménsko | https://ttf.gov.tm/ | timeout (web neodpovedal včas) | 2026-11-09 |
| `f_ten_aso_ja_k13` | Venezuela | https://fvtenis.org/ | HTTP 503 – chyba servera / výpadok · **3× po sebe** | 2026-11-03 |

#### Basketbal (18)

| ID | Cesta | Adresa | Dôvod | Od |
|---|---|---|---|---|
| `f_bas_esp_l2_liga` | Primera FEB | https://www.feb.es/primerafeb/clasificacion.aspx | timeout (web neodpovedal včas) · **3× po sebe** | 2026-11-03 |
| `f_bas_esp_l2_k1` | Albacete Basket | https://albacetebasket.es | timeout (web neodpovedal včas) | 2026-11-16 |
| `f_bas_esp_l3_liga` | Liga Femenina | https://www.feb.es/lfendesa/clasificacion.aspx | timeout (web neodpovedal včas) · **3× po sebe** | 2026-11-03 |
| `f_bas_ger_l1_k3` | Basketball Löwen Braunschweig | https://www.basketball-loewen.de | HTTP 503 – chyba servera / výpadok · **3× po sebe** | 2026-11-03 |
| `f_bas_ger_l1_k5` | FC Bayern München | https://fcbayern.com/basketball/de | timeout (web neodpovedal včas) · **3× po sebe** | 2026-11-03 |
| `f_bas_ger_l1_k13` | Riesen Ludwigsburg | https://mhp-riesen-ludwigsburg.de/ | HTTP 503 – chyba servera / výpadok · **3× po sebe** | 2026-11-03 |
| `f_bas_ger_l2_k7` | ETB Miners Essen | https://miners.ruhr | HTTP 503 – chyba servera / výpadok · **4× po sebe** | 2026-11-03 |
| `f_bas_ger_l3_k2` | BC Marburg | https://bc-marburg.de/ | HTTP 503 – chyba servera / výpadok · **3× po sebe** | 2026-11-03 |
| `f_bas_ger_l3_k8` | Rutronik Stars Keltern | https://www.rutronik-stars-keltern.de/ | HTTP 503 – chyba servera / výpadok · **3× po sebe** | 2026-11-03 |
| `f_bas_fra_l1_k6` | Élan Béarnais Pau-Lacq-Orthez | https://www.elan-bearnais.fr | timeout (web neodpovedal včas) | 2026-11-16 |
| `f_bas_klu_eu_lat_k1` | BK Liepāja | https://www.liepajasbasketbols.lv/ | timeout (web neodpovedal včas) · **3× po sebe** | 2026-11-03 |
| `f_bas_hun_l3_k1` | BKG-PRIMA Szigetszentmiklós | https://bkgakademia.hu/ | spojenie odmietnuté | 2026-11-16 |
| `f_bas_tur_l3_k2` | BOTAŞ | https://www.botasspor.org.tr/ | SSL chyba (certifikát): [SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed: unable to get local issuer cer · **3× po sebe** | 2026-11-03 |
| `f_bas_jpn_l2_k4` | Denso Iris | https://iris.denso.com/ | HTTP 503 – chyba servera / výpadok · **3× po sebe** | 2026-11-03 |
| `f_bas_kor_l2_k1` | Asan Woori Bank Woori Won | https://wooriwon.wooribank.com/basketball/main/main.php | SSL chyba (certifikát): [SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed: unable to get local issuer cer · **3× po sebe** | 2026-11-03 |
| `f_bas_ago_l1_k8` | Petro de Luanda | https://petroatletico.co.ao/basquetebol | SSL chyba (certifikát): [SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed: self-signed certificate (_ssl. · **3× po sebe** | 2026-11-03 |
| `f_bas_lby_l1_k4` | Al-Ittihad | https://ittihadclub.ly/basketball | timeout (web neodpovedal včas) · **3× po sebe** | 2026-11-03 |
| `f_bas_aso_eu_k40` | Španielsko | https://www.feb.es | timeout (web neodpovedal včas) · **3× po sebe** | 2026-11-03 |

#### Hádzaná (16)

| ID | Cesta | Adresa | Dôvod | Od |
|---|---|---|---|---|
| `f_had_cze_l3_k4` | DHK Zora Olomouc | https://www.dhkolomouc.cz/ | HTTP 455 | 2026-11-16 |
| `f_had_deu_l1_k9` | Rhein-Neckar Löwen | https://www.rhein-neckar-loewen.de | HTTP 503 – chyba servera / výpadok · **3× po sebe** | 2026-11-03 |
| `f_had_deu_l2_k4` | Die Eulen Ludwigshafen | https://eulen-ludwigshafen.de | HTTP 503 – chyba servera / výpadok · **3× po sebe** | 2026-11-03 |
| `f_had_deu_l2_k6` | HC Elbflorenz | https://hc-elbflorenz.de | HTTP 503 – chyba servera / výpadok · **3× po sebe** | 2026-11-03 |
| `f_had_deu_l2_k16` | TV Großwallstadt | https://www.tvgrosswallstadt.de | HTTP 503 – chyba servera / výpadok · **3× po sebe** | 2026-11-03 |
| `f_had_deu_l3_k7` | HSG Blomberg-Lippe | https://hsg-blomberg-lippe.de | HTTP 503 – chyba servera / výpadok · **3× po sebe** | 2026-11-03 |
| `f_had_fra_l2_k5` | Grand Besançon Doubs Handball | https://gbdh.fr | HTTP 503 – chyba servera / výpadok · **3× po sebe** | 2026-11-03 |
| `f_had_fra_l2_k13` | US Créteil Handball | https://uschb.fr | HTTP 503 – chyba servera / výpadok | 2026-11-16 |
| `f_had_esp_l3_k13` | Sporting La Rioja | https://sportinglarioja.com/ | HTTP 503 – chyba servera / výpadok · **3× po sebe** | 2026-11-03 |
| `f_had_rus_l2_k11` | Universitet Iževsk | https://www.udmhandball.ru | timeout (web neodpovedal včas) · **3× po sebe** | 2026-11-03 |
| `f_had_ang_l1_k9` | Oxford University | https://www.oxfordhandball.org/ | HTTP 503 – chyba servera / výpadok · **3× po sebe** | 2026-11-03 |
| `f_had_che_l1_liga` | Swiss Handball League | https://www.handball.ch/de/quickline-handball-league/ | SSL chyba (certifikát): [SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed: unable to get local issuer cer | 2026-11-16 |
| `f_had_ago_l1_k5` | Petro de Luanda | https://petroatletico.co.ao/noticia/category/andebol | SSL chyba (certifikát): [SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed: self-signed certificate (_ssl. · **3× po sebe** | 2026-11-03 |
| `f_had_aso_eu_k47` | Švajčiarsko | https://www.handball.ch | SSL chyba (certifikát): [SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed: unable to get local issuer cer | 2026-11-16 |
| `f_had_aso_az_k9` | India | https://handballindia.com/ | DNS dočasne neodpovedá | 2026-11-16 |
| `f_had_aso_az_k11` | Irak | https://iqhf.org.iq | SSL chyba (certifikát): [SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed: certificate has expired (_ssl. | 2026-11-09 |

#### Volejbal (28)

| ID | Cesta | Adresa | Dôvod | Od |
|---|---|---|---|---|
| `f_vol_klu_eu_czechia_m1_k1` | Aero Odolena Voda | https://www.volejbalov.cz | HTTP 455 | 2026-11-16 |
| `f_vol_klu_eu_italy_m2_k8` | Pineto Volley | https://www.pinetovolley.it | SSL chyba (certifikát): [SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed: unable to get local issuer cer · **3× po sebe** | 2026-11-03 |
| `f_vol_klu_eu_france_m2_k6` | Harnes Volley-Ball | https://www.harnes-volleyball.fr | HTTP 503 – chyba servera / výpadok · **3× po sebe** | 2026-11-03 |
| `f_vol_klu_eu_france_z1_k5` | Levallois Paris SC | https://les-mariannes.fr | HTTP 503 – chyba servera / výpadok · **3× po sebe** | 2026-11-03 |
| `f_vol_klu_eu_france_z1_k9` | Terville Florange OC | https://tfoc.fr | HTTP 503 – chyba servera / výpadok · **3× po sebe** | 2026-11-03 |
| `f_vol_klu_eu_belarus_m1_k9` | Zapadnyj Bug Brest | https://vcbrest.by/zapadnyi-bug | SSL chyba (certifikát): [SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed: Hostname mismatch, certificate | 2026-11-16 |
| `f_vol_klu_eu_belarus_z1_k8` | Pribužje Brest | https://vcbrest.by/pribuzhye | SSL chyba (certifikát): [SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed: Hostname mismatch, certificate | 2026-11-16 |
| `f_vol_klu_eu_hungary_m1_k3` | MÁV Előre Székesfehérvár | https://www.mavelore.hu/category/roplabda/ferfi-roplabda-hirek/ | DNS dočasne neodpovedá | 2026-11-16 |
| `f_vol_klu_eu_hungary_z1_k4` | MÁV Előre Székesfehérvár | https://www.mavelore.hu/category/roplabda/noi-roplabda-hirek/ | DNS dočasne neodpovedá | 2026-11-16 |
| `f_vol_klu_eu_portugal_z1_k6` | GC Vilacondense | https://gcv.pt/modalidades/voleibol/ | HTTP 503 – chyba servera / výpadok | 2026-11-16 |
| `f_vol_klu_eu_austria_z1_k3` | Erzbergmadln Trofaiach Eisenerz | https://www.etvolley.at/ | HTTP 500 – chyba servera / výpadok | 2026-11-16 |
| `f_vol_klu_eu_spain_z1_k5` | CV Cuesta Piedra | https://cvcuestapiedra.com/ | HTTP 503 – chyba servera / výpadok · **3× po sebe** | 2026-11-03 |
| `f_vol_klu_ao_china_m1_k1` | Baoding | https://league20252026.volleyballchina.com/teamDetail?teamId=10 | SSL chyba (certifikát): [SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed: certificate has expired (_ssl. | 2026-11-16 |
| `f_vol_klu_ao_china_m1_k2` | Beijing | https://league20252026.volleyballchina.com/teamDetail?teamId=14 | SSL chyba (certifikát): [SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed: certificate has expired (_ssl. | 2026-11-16 |
| `f_vol_klu_ao_china_m1_k3` | Fujian | https://league20252026.volleyballchina.com/teamDetail?teamId=24 | SSL chyba (certifikát): [SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed: certificate has expired (_ssl. | 2026-11-16 |
| `f_vol_klu_ao_china_m1_k4` | Guangdong | https://league20252026.volleyballchina.com/teamDetail?teamId=15 | SSL chyba (certifikát): [SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed: certificate has expired (_ssl. | 2026-11-16 |
| `f_vol_klu_ao_china_m1_k5` | Jiangsu | https://league20252026.volleyballchina.com/teamDetail?teamId=28 | SSL chyba (certifikát): [SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed: certificate has expired (_ssl. | 2026-11-16 |
| `f_vol_klu_ao_china_m1_k8` | Tianjin | https://league20252026.volleyballchina.com/teamDetail?teamId=11 | SSL chyba (certifikát): [SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed: certificate has expired (_ssl. | 2026-11-16 |
| `f_vol_klu_ao_china_z1_k1` | Beijing | https://league20252026.volleyballchina.com/teamDetail?teamId=5 | SSL chyba (certifikát): [SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed: certificate has expired (_ssl. | 2026-11-16 |
| `f_vol_klu_ao_china_z1_k2` | Fujian | https://league20252026.volleyballchina.com/teamDetail?teamId=7 | SSL chyba (certifikát): [SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed: certificate has expired (_ssl. | 2026-11-16 |
| `f_vol_klu_ao_china_z1_k3` | Henan | https://league20252026.volleyballchina.com/teamDetail?teamId=8 | SSL chyba (certifikát): [SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed: certificate has expired (_ssl. | 2026-11-16 |
| `f_vol_klu_ao_china_z1_k5` | Shandong | https://league20252026.volleyballchina.com/teamDetail?teamId=6 | SSL chyba (certifikát): [SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed: certificate has expired (_ssl. | 2026-11-16 |
| `f_vol_klu_ao_china_z1_k8` | Zhejiang | https://league20252026.volleyballchina.com/teamDetail?teamId=18 | SSL chyba (certifikát): [SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed: certificate has expired (_ssl. | 2026-11-16 |
| `f_vol_klu_ao_taiwan_m1_k2` | Taichung Winstreak | https://winstreak-volleyball.com/ | DNS dočasne neodpovedá · **3× po sebe** | 2026-11-03 |
| `f_vol_klu_ao_taiwan_m1_k4` | Taoyuan Leopards | https://ty-leopards-vb.com/ | DNS dočasne neodpovedá · **3× po sebe** | 2026-11-03 |
| `f_vol_klu_na_puerto-rico_z1_k3` | Criollas de Caguas | https://www.lascriollasdecaguas.com/ | DNS dočasne neodpovedá | 2026-11-09 |
| `f_vol_aso_ao_iran` | Irán | https://volleyball.ir/ | timeout (web neodpovedal včas) | 2026-11-16 |
| `f_vol_aso_ao_sri-lanka` | Srí Lanka | https://srilankavolleyball.lk/ | spojenie odmietnuté · **3× po sebe** | 2026-11-03 |

#### Zimné športy (4)

| ID | Cesta | Adresa | Dôvod | Od |
|---|---|---|---|---|
| `n1780505392257gfa` | Neveitalia | https://www.neveitalia.it/sport/scialpino/ | timeout (web neodpovedal včas) · **3× po sebe** | 2026-11-03 |
| `n1780771023781xwy` | FISI Italy | https://www.fisi.org/slittino/ | HTTP 503 – chyba servera / výpadok · **3× po sebe** | 2026-11-03 |
| `n17807716234727bn` | ČSBS (Bobteam.cz) | https://www.bobteam.cz/ | HTTP 455 | 2026-11-16 |
| `n17931434659855ey` | ISMF ranking | https://www.dataskimo.org/ranking.php | HTTP 500 – chyba servera / výpadok · **3× po sebe** | 2026-11-03 |

#### Ostatné športy (11)

| ID | Cesta | Adresa | Dôvod | Od |
|---|---|---|---|---|
| `n1780833301850cu3` | Atletismo Sudamericano | https://atletismosudamericano.org/ | HTTP 503 – chyba servera / výpadok | 2026-11-16 |
| `n1780910701336o71` | UEFA Futsal Champions League | https://www.uefa.com/uefafutsalchampionsleague/ | timeout (web neodpovedal včas) · **3× po sebe** | 2026-11-03 |
| `n1780912683570c8u` | Futsal Hungary | https://futsal.mlsz.hu/ | SSL chyba (certifikát): [SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed: unable to get local issuer cer · **3× po sebe** | 2026-11-03 |
| `n1780932480744ouj` | Fabriq | https://fabriqmma.eu/ | HTTP 500 – chyba servera / výpadok | 2026-11-16 |
| `n178093324829801f` | Challenger series | https://www.challengerseries.net/ | HTTP 503 – chyba servera / výpadok · **3× po sebe** | 2026-11-03 |
| `n1780951072037b72` | Czechswimming | https://www.czechswimming.cz/ | HTTP 455 | 2026-11-16 |
| `n1780952734783yn4` | Water polo Italy | https://www.federnuoto.it/home/pallanuoto.html | HTTP 503 – chyba servera / výpadok · **3× po sebe** | 2026-11-03 |
| `n1780953808382zy1` | GFL Germany | https://gfl.info/ | HTTP 503 – chyba servera / výpadok · **3× po sebe** | 2026-11-03 |
| `n1780996555059we9` | El Gouna squash open | https://elgounainternational.com/ | HTTP 503 – chyba servera / výpadok · **3× po sebe** | 2026-11-03 |
| `n17809938824743o2` | The squash site | https://thesquashsite.com/ | HTTP 503 – chyba servera / výpadok · **3× po sebe** | 2026-11-03 |
| `n1781167133271cvp` | Mastercaller | https://mastercaller.com/ | HTTP 418 | 2026-11-16 |

#### Správy & Médiá (24)

| ID | Cesta | Adresa | Dôvod | Od |
|---|---|---|---|---|
| `n1782219093817rl5` | The Telegraph sport | https://www.telegraph.co.uk/sport/ | HTTP 402 | 2026-11-16 |
| `n17823875005979wx` | Sport5 | https://sport5.by/ | server prerušil spojenie · **3× po sebe** | 2026-11-03 |
| `n1783689918518lsn` | Fyens sport | https://fyens.dk/sport | HTTP 503 – chyba servera / výpadok · **3× po sebe** | 2026-11-03 |
| `n1783770081043w36` | Crosarka | https://crosarka.com/ | spojenie odmietnuté · **4× po sebe** | 2026-11-03 |
| `n1783919287477z0w` | UTV sport | https://www.itv.com/news/utv/sport | timeout (web neodpovedal včas) · **3× po sebe** | 2026-11-03 |
| `n1783952731473f3b` | ITV Wales sport | https://www.itv.com/news/wales/sport | timeout (web neodpovedal včas) · **3× po sebe** | 2026-11-03 |
| `n17839584139950jx` | Silk GO sport | https://silkgo.ge/sport | SSL chyba (certifikát): [SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed: unable to get local issuer cer · **3× po sebe** | 2026-11-03 |
| `n1784235767202r58` | Bahrain News Agency sport | https://www.bna.bh/SportsNews.aspx?cms=iQRpheuphYtJ6pyXUGiNqv%2bxliCIF%2fFf | HTTP 405 · **3× po sebe** | 2026-11-03 |
| `n17843194829138eo` | People daily sports | https://sports.people.com.cn/ | SSL chyba (certifikát): [SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed: Hostname mismatch, certificate · **3× po sebe** | 2026-11-03 |
| `n1784367859330pb8` | Dongqiudi | https://www.dongqiudi.com/ | HTTP 567 – chyba servera / výpadok | 2026-11-16 |
| `n17844637163383b3` | Metrica | https://metrica.ir/ | timeout (web neodpovedal včas) · **3× po sebe** | 2026-11-03 |
| `n1784552769843iom` | dmenu Sports | https://service.smt.docomo.ne.jp/portal/sports/index.html | SSL chyba (certifikát): [SSL: UNSAFE_LEGACY_RENEGOTIATION_DISABLED] unsafe legacy renegotiation disabled (_ssl.c:1 · **3× po sebe** | 2026-11-03 |
| `n1784562689498127` | Al Watan sport | https://alwatanalakbar.com/category/Sports | HTTP 503 – chyba servera / výpadok · **3× po sebe** | 2026-11-03 |
| `n1784578260189roc` | Dong-A Ilbo sports | https://www.donga.com/news/Sports | timeout (web neodpovedal včas) | 2026-11-16 |
| `n1784711774328czd` | Harimau Malaya | https://harimaumalaya.com.my/ | SSL chyba (certifikát): [SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed: unable to get local issuer cer · **4× po sebe** | 2026-11-03 |
| `n1784714056397qaq` | Myawady Daily sport | https://www.myawady.net.mm/sport_news | SSL chyba (certifikát): [SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed: unable to get local issuer cer · **3× po sebe** | 2026-11-03 |
| `n1784744342455hir` | Scoreline | https://www.scoreline.org/ | SSL chyba (certifikát): [SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed: self-signed certificate (_ssl. · **3× po sebe** | 2026-11-03 |
| `n17847449464405gu` | Nawa-i-Waqt sports | https://www.nawaiwaqt.com.pk/sports | HTTP 503 – chyba servera / výpadok · **3× po sebe** | 2026-11-03 |
| `n17847532904520pz` | Al Riyadh sport | https://www.alriyadh.com/sport | SSL chyba (certifikát): [SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed: unable to get local issuer cer · **3× po sebe** | 2026-11-03 |
| `n1784754937128pp7` | Sri Lanka Cricket | https://srilankacricket.lk/ | timeout (web neodpovedal včas) | 2026-11-16 |
| `n179443657570903v` | El Diario deportes | https://www.eldiario.net/portal/category/secciones/deportes/ | HTTP 307 – presmerovanie sa nedá dokončiť (chýba alebo je zlý cieľ) | 2026-11-16 |
| `n1794530349320grw` | Proceso Digital deportes | https://proceso.hn/category/secciones/deportes/ | HTTP 307 – presmerovanie sa nedá dokončiť (chýba alebo je zlý cieľ) | 2026-11-16 |
| `n1794561795742jqg` | Hoy En El Deporte | https://www.hoyeneldeportecr.com/ | SSL chyba (certifikát): [SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed: unable to get local issuer cer | 2026-11-16 |
| `n1794491884367jte` | TVWAN sports | https://tvwan.com.pg/category/sports | SSL chyba (certifikát): [SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed: unable to get local issuer cer | 2026-11-16 |

