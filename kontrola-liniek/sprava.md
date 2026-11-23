# 🔗 Strážca liniek — týždenná správa

Posledný beh: **2026-11-23** · trvanie 22 min 55 s · skontrolovaných adries v tomto behu: 11474

data.json sa NEMENÍ — opravy robí Miro ručne. Každý riadok = jedna linka v dátach (rovnaká adresa na viacerých miestach = viac riadkov). Tabuľka pre Excel/Cowork: [sprava.csv](sprava.csv).

| Značka | Význam | Liniek | Adries |
|---|---|---:|---:|
| 🔴 MŔTVA | 404/410 alebo neexistujúca doména **2 behy po sebe** (v rôznych dňoch) → oprav/zmaž | 5 | 5 |
| 🔵 PRESŤAHOVANÁ | presmeruje na inú doménu → zváž novú adresu | 3 | 3 |
| 🟠 PODOZRIVÁ | 404/410/DNS prvýkrát — ďalší týždeň sa potvrdí (alebo nie) | 5 | 5 |
| 🚫 BLOKUJE ROBOTOV | web nepustí robota (401/403/429/454/456/999) — v prehliadači väčšinou funguje; len súhrn po doménach | 1004 | 980 |
| 🟡 VAROVANIE | výpadok / timeout / SSL / presmerovanie v slučke / ⚠️ možná predaná doména → over ručne v prehliadači | 250 | 248 |
| ✅ OK | funguje | 10407 | 10233 |

Vynechané (nekontrolujú sa): 4174 liniek na Facebook/Instagram v poli url, 5225 ikoniek FB a 7365 ikoniek IG (polia fb/ig), 2 prázdnych/nie-webových adries.

## ✅ Opravené od minula (5)

| Adresa | Čo sa stalo | Bola mŕtva od |
|---|---|---|
| https://nigeriatennisfederation.org/ | zmizla z dát | 2026-11-09 |
| https://paktenfed.com.pk/ | zmizla z dát | 2026-11-09 |
| https://praiaclube.org.br/volei-masculino/ | zmizla z dát | 2026-11-09 |
| https://www.sprucekings.bc.ca/ | zmizla z dát | 2026-11-03 |
| https://www.varzesh3.com/ | zmizla z dát | 2026-11-09 |

## 🔴 MŔTVE (5)


### Futbal (1)

| ID | Cesta | Adresa | Dôvod | Od |
|---|---|---|---|---|
| `n1784115956248qj0` | Futbal › Súťaže › Južná Amerika › Copa Libertadores U20 | https://www.conmebol.com/conmebol-libertadores-sub-20/ | HTTP 404 – stránka neexistuje | 2026-11-03 |

### Basketbal (1)

| ID | Cesta | Adresa | Dôvod | Od |
|---|---|---|---|---|
| `f_bas_aso_az_k2` | Basketbal › Asociácie › Ázia › Bahrajn | https://basketball.bh | doména neexistuje (DNS) | 2026-11-16 |

### Hádzaná (1)

| ID | Cesta | Adresa | Dôvod | Od |
|---|---|---|---|---|
| `f_had_fro_l1_k2` | Hádzaná › Kluby › Európa › Faerské ostrovy › Landskappingin (muži) › H71 | https://www.h71.fo | doména neexistuje (DNS) | 2026-11-16 |

### Volejbal (1)

| ID | Cesta | Adresa | Dôvod | Od |
|---|---|---|---|---|
| `f_vol_klu_eu_germany_z1_k11` | Volejbal › Kluby › Európa (CEV) › Nemecko › 1. Bundesliga (ženy) › VC Wiesbaden | https://www.vc-wiesbaden.de/vcw-home.html | HTTP 404 – stránka neexistuje | 2026-11-16 |

### Správy & Médiá (1)

| ID | Cesta | Adresa | Dôvod | Od |
|---|---|---|---|---|
| `n17848380905590s8` | Správy & Médiá › Ázia › Turkménsko › Orient TM sport | https://orient.tm/en/news/sport | HTTP 404 – stránka neexistuje | 2026-11-16 |

## 🔵 PRESŤAHOVANÉ (3)


### Správy & Médiá (3)

| ID | Cesta | Adresa | Navrhovaná nová adresa | Od |
|---|---|---|---|---|
| `n1782219117578rqz` | Správy & Médiá › Európa › Anglicko › Daily mail sport | https://www.dailymail.co.uk/sport/index.html | https://www.dailymail.com/sport/index.html | 2026-11-03 |
| `n1782134823796rdi` | Správy & Médiá › Európa › Česko › Seznamspravy sport | https://www.seznamzpravy.cz/sekce/sport-147 | https://cmp.seznam.cz/nastaveni-souhlasu?service=bcr&return_url=https%3A%2F%2Fwww.seznamzpravy.cz%2Fsekce%2Fsport-147%3Fcwreturn%3D1&cwtime=1795425194052&loginstate=forget&cwri=ae8e206a230c2a81a7d7334a5dfda927&reason=missing&service_id=zpravy&cwvariant=cop | 2026-11-03 |
| `n1794521710238ctg` | Správy & Médiá › Severná a Stredná Amerika › Kanada › SaltWire sports | https://www.saltwire.com/category/sports/ | https://halifaxherald.com/category/sports/ | 2026-11-23 |

## 🟠 PODOZRIVÉ (zatiaľ 1 beh — netreba hneď opravovať) (5)


### Aktuálne (1)

| ID | Cesta | Adresa | Dôvod |
|---|---|---|---|
| `a17948355743877ie0` | Aktuálne › Futbal amputovaných – MS Mexiko | https://amputeefootball.org/2026/11/12/world-cup-2026-live-result-system/ | HTTP 404 – stránka neexistuje |

### Futbal (2)

| ID | Cesta | Adresa | Dôvod |
|---|---|---|---|
| `f_vnm_l1_k3` | Futbal › Kluby › Ázia › Vietnam › V.League 1 › Cong An Ho Chi Minh City | https://cahcmfc.vn/ | doména neexistuje (DNS) |
| `f_cmr_l2_k15` | Futbal › Kluby › Afrika › Kamerun › Elite Two › Tonnerre Kalara Club de Yaoundé | https://tonnerrekalaraclub.com/ | doména neexistuje (DNS) |

### Basketbal (1)

| ID | Cesta | Adresa | Dôvod |
|---|---|---|---|
| `f_bas_idn_l1_k3` | Basketbal › Kluby › Ázia › Indonézia › IBL › Hangtuah Jakarta | https://www.hangtuah.id/ | doména neexistuje (DNS) |

### Hádzaná (1)

| ID | Cesta | Adresa | Dôvod |
|---|---|---|---|
| `f_had_arg_l2_k9` | Hádzaná › Kluby › Južná a Stredná Amerika (SCAHC) › Argentína › Liga de Honor Oro (ženy) › Mariano Acosta | https://www.marianoacostahandball.com.ar/ | doména neexistuje (DNS) |

## 🚫 BLOKUJÚ ROBOTOV (980 adries na 522 doménach)

Tieto weby nepustia automatickú kontrolu (401/403/429/454/456/999), preto strážca nevie, či linka funguje. V prehliadači väčšinou fungujú — netreba ich opravovať. Jednotlivé adresy sú v [sprava.csv](sprava.csv).

| Doména | Adries | Kód |
|---|---:|---|
| sofascore.com | 159 | 403 |
| volleybox.net | 125 | 403 |
| iihf.com | 51 | 403 |
| fff.fr | 13 | 403 |
| eliteprospects.com | 11 | 403 |
| footystats.org | 10 | 403 |
| padelfip.com | 10 | 403 |
| tntsports.co.uk | 9 | 403 |
| atptour.com | 8 | 403 |
| geniussports.com | 7 | 403 |
| hockeyslovakia.sk | 7 | 403 |
| euroleaguebasketball.net | 6 | 429 |
| fenerbahce.org | 6 | 403 |
| bjk.com.tr | 5 | 403 |
| oem.com.mx | 5 | 403 |
| qatarsc.qa | 4 | 403 |
| slovakhandball.sk | 4 | 403 |
| ahram.org.eg | 3 | 403 |
| frmvb.ma | 3 | 403 |
| mygameday.app | 3 | 403 |
| slovakvolley.sk | 3 | 403 |
| tennis.com.au | 3 | 403 |
| x.com | 3 | 403 |
| xscores.com | 3 | 403 |
| alayam.com | 2 | 403 |
| alshamal.qa | 2 | 403 |
| argentinosjuniors.com.ar | 2 | 403 |
| athletic-club.eus | 2 | 403 |
| clubbrugge.be | 2 | 429 |
| diena.lt | 2 | 403 |
| dostor.org | 2 | 403 |
| fiba3x3.com | 2 | 403 |
| fotbal.cz | 2 | 403 |
| fpf.pt | 2 | 403 |
| ikastvolley.dk | 2 | 454 |
| iwf.sport | 2 | 403 |
| movistarestudiantes.com | 2 | 403 |
| pba.ph | 2 | 403 |
| portugalvoleibol.com | 2 | 403 |
| slaviavolley.bg | 2 | 403 |
| tribuna.com | 2 | 403 |
| tsg-hoffenheim.de | 2 | 403 |
| volleyligaen.dk | 2 | 454 |
| werder.de | 2 | 429 |
| zerozero.pt | 2 | 403 |
| 1tv.ge | 1 | 403 |
| 2m.ma | 1 | 403 |
| ad.nl | 1 | 403 |
| adaderana.lk | 1 | 403 |
| aekfc.gr | 1 | 403 |
| aelfc.gr | 1 | 403 |
| aitatennis.com | 1 | 403 |
| al-akhbar.com | 1 | 403 |
| al-ayyam.ps | 1 | 403 |
| alahlisc.qa | 1 | 403 |
| alarabiya.net | 1 | 403 |
| albawabhnews.com | 1 | 403 |
| alianzafc.com.co | 1 | 403 |
| alkhaleej.ae | 1 | 403 |
| alsharqiya.com | 1 | 403 |
| alwafd.news | 1 | 403 |
| alwakrahsc.qa | 1 | 403 |
| anandabazar.com | 1 | 403 |
| api-football.com | 1 | 403 |
| aqvitalfc.hu | 1 | 403 |
| arabnews.com | 1 | 403 |
| asaaseradio.com | 1 | 403 |
| asbarez.com | 1 | 403 |
| asiansquash.org | 1 | 403 |
| assabah.ma | 1 | 403 |
| atleticodemadrid.com | 1 | 403 |
| aut.uy | 1 | 403 |
| avas.mv | 1 | 403 |
| avisclient-cbf.fr | 1 | 403 |
| azertag.az | 1 | 403 |
| azzaman.com | 1 | 403 |
| badmintonplanet.com | 1 | 403 |
| bandirmaspor.com.tr | 1 | 403 |
| barlamanesport.com | 1 | 403 |
| barttorvik.com | 1 | 403 |
| basketcosta.com | 1 | 403 |
| bbm-japan.com | 1 | 403 |
| bccopenhagen.com | 1 | 454 |
| bd-pratidin.com | 1 | 403 |
| bebasket.fr | 1 | 403 |
| belfasttelegraph.co.uk | 1 | 403 |
| bes-reporter.com | 1 | 403 |
| bharian.com.my | 1 | 403 |
| billericaytownfc.co.uk | 1 | 403 |
| bisnis.com | 1 | 403 |
| blitz.bg | 1 | 403 |
| bndestem.nl | 1 | 403 |
| bonaire.nu | 1 | 403 |
| borba.me | 1 | 403 |
| borneobulletin.com.bn | 1 | 403 |
| bostonteamhandball.org | 1 | 403 |
| botafogo.com.br | 1 | 403 |
| boxrec.com | 1 | 403 |
| britishhandball.com | 1 | 403 |
| britishrowing.org | 1 | 403 |
| brse.hu | 1 | 403 |
| btolat.com | 1 | 403 |
| budowlanilodz.pl | 1 | 403 |
| businessmirror.com.ph | 1 | 403 |
| cairo24.com | 1 | 403 |
| canalplus.com | 1 | 403 |
| cavb.africa | 1 | 403 |
| caymancompass.com | 1 | 403 |
| cbcsport.az | 1 | 403 |
| ceskyflorbal.cz | 1 | 403 |
| cetateasuceava.com | 1 | 401 |
| cfcruzazul.com | 1 | 403 |
| chacaritajuniors.com.ar | 1 | 429 |
| champion.com.ua | 1 | 403 |
| chesterstandard.co.uk | 1 | 403 |
| chinapress.com.my | 1 | 403 |
| chl.ca | 1 | 403 |
| clwbpeldroed.org | 1 | 403 |
| congoactu.net | 1 | 403 |
| cpdporthmadogfc.com | 1 | 403 |
| cricinfo.com | 1 | 403 |
| cuetracker.net | 1 | 403 |
| curacao.nu | 1 | 403 |
| curling.ca | 1 | 403 |
| cxmagazine.com | 1 | 403 |
| cyclocross24.com | 1 | 403 |
| dabashandball.hu | 1 | 403 |
| dailyexpress.com.my | 1 | 403 |
| dailynews.co.th | 1 | 403 |
| dailynews.lk | 1 | 403 |
| dailysportscar.com | 1 | 403 |
| dallasteamhandballclub.com | 1 | 403 |
| dartsorakel.com | 1 | 403 |
| dartsplanet.tv | 1 | 403 |
| delfinek.hu | 1 | 403 |
| demorgen.be | 1 | 403 |
| derthonabasket.it | 1 | 403 |
| dhakatribune.com | 1 | 403 |
| diarionorte.com | 1 | 403 |
| dinamina.lk | 1 | 403 |
| dnevnik.bg | 1 | 403 |
| dnevnik.hr | 1 | 403 |
| dvhn.nl | 1 | 403 |
| dziki.basketball | 1 | 403 |
| eastleighvoice.co.ke | 1 | 403 |
| ecuavisa.com | 1 | 403 |
| ed.nl | 1 | 403 |
| efa.com.eg | 1 | 403 |
| egypttennis.com | 1 | 403 |
| eishockeynews.de | 1 | 403 |
| elaragueno.com.ve | 1 | 403 |
| elbotola.com | 1 | 403 |
| elcaribe.com.do | 1 | 403 |
| elcrackdeportivo.com.ar | 1 | 403 |
| eldeportivo.com.co | 1 | 403 |
| eldesmarque.com | 1 | 403 |
| elemergente.com | 1 | 403 |
| elfagr.org | 1 | 403 |
| elgrafico.com | 1 | 403 |
| elitesportvendsyssel.dk | 1 | 454 |
| elmoudjahid.dz | 1 | 403 |
| elpais.com.uy | 1 | 403 |
| elperiodiquito.com | 1 | 403 |
| elpilon.com.co | 1 | 429 |
| elpotosi.net | 1 | 403 |
| enabbaladi.net | 1 | 403 |
| encancha.cl | 1 | 403 |
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
| expreso.com.pe | 1 | 403 |
| extratime.com | 1 | 403 |
| f5haber.com | 1 | 403 |
| fakty.ua | 1 | 403 |
| fam.mw | 1 | 403 |
| fbref.com | 1 | 403 |
| fc-zenit.ru | 1 | 403 |
| fco.com.ua | 1 | 403 |
| fegabab.org | 1 | 403 |
| ferisports.com | 1 | 403 |
| ffbb.com | 1 | 403 |
| ffk.cw | 1 | 403 |
| fiaerc.com | 1 | 403 |
| figueirense.com.br | 1 | 403 |
| finhockey.fi | 1 | 403 |
| firstpost.com | 1 | 403 |
| flleida.cat | 1 | 403 |
| football.ch | 1 | 403 |
| football.org.il | 1 | 403 |
| freepressseries.co.uk | 1 | 403 |
| fremadamagerelite.dk | 1 | 454 |
| frmf.ma | 1 | 403 |
| fuhandball.com | 1 | 403 |
| futbolred.com | 1 | 403 |
| futsports506.cr | 1 | 403 |
| gds.ro | 1 | 403 |
| gelderlander.nl | 1 | 403 |
| ghanasoccernet.com | 1 | 403 |
| giravanz.jp | 1 | 403 |
| glasgowtimes.co.uk | 1 | 403 |
| gol.bg | 1 | 403 |
| golfdigest.com | 1 | 403 |
| golfstats.com | 1 | 403 |
| gva.be | 1 | 403 |
| hackastat.eu | 1 | 403 |
| handball-world.news | 1 | 403 |
| handballeger.hu | 1 | 403 |
| handballvikings.com | 1 | 403 |
| hb.fo | 1 | 454 |
| hch.tv | 1 | 403 |
| heraldodemexico.com.mx | 1 | 403 |
| heraldscotland.com | 1 | 403 |
| hibapress.com | 1 | 403 |
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
| impartialreporter.com | 1 | 403 |
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
| jmdeportes.com | 1 | 403 |
| jn.pt | 1 | 403 |
| jordantimes.com | 1 | 403 |
| jornada.com.mx | 1 | 403 |
| jpnn.com | 1 | 403 |
| jscherbourg.fr | 1 | 403 |
| jvf.jo | 1 | 403 |
| kalerkantho.com | 1 | 403 |
| karatoa.com.bd | 1 | 403 |
| khmertimeskh.com | 1 | 403 |
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
| kyiv.ua | 1 | 403 |
| lamananadigital.com | 1 | 403 |
| langrenn.com | 1 | 403 |
| laprensagrafica.com | 1 | 403 |
| lc.nl | 1 | 403 |
| ldlcasvel.com | 1 | 403 |
| leparisien.fr | 1 | 403 |
| lequipe.fr | 1 | 403 |
| lequotidien-oran.dz | 1 | 403 |
| lesoir.be | 1 | 403 |
| letelegramme.fr | 1 | 403 |
| levangerfk.no | 1 | 403 |
| lexpressiondz.com | 1 | 403 |
| liberation.fr | 1 | 403 |
| liepajniekiem.lv | 1 | 403 |
| live-darts.com | 1 | 403 |
| lnr-dz.com | 1 | 403 |
| lrytas.lt | 1 | 403 |
| lsm.lv | 1 | 403 |
| mackolik.com | 1 | 403 |
| maltatoday.com.mt | 1 | 403 |
| mapnews.ma | 1 | 403 |
| marica.bg | 1 | 403 |
| marinefc.com | 1 | 403 |
| maroelamedia.co.za | 1 | 403 |
| marozsanfabian.com | 1 | 403 |
| mb.com.ph | 1 | 403 |
| medi1news.com | 1 | 403 |
| mediapermata.com.bn | 1 | 403 |
| megacadena.com.py | 1 | 403 |
| metsbasketball.com | 1 | 403 |
| mezokovesdzsory.hu | 1 | 403 |
| mhscfoot.com | 1 | 403 |
| mielec.pl | 1 | 403 |
| mks-kalisz.pl | 1 | 403 |
| mmts.pl | 1 | 403 |
| monitor.co.ug | 1 | 403 |
| moroccoworldnews.com | 1 | 403 |
| motorlublin.eu | 1 | 403 |
| mrt.com.mk | 1 | 403 |
| mskpb.sk | 1 | 403 |
| msports.mn | 1 | 429 |
| mundoascenso.com.ar | 1 | 403 |
| musavat.com | 1 | 403 |
| muscatdaily.com | 1 | 403 |
| nacionale.com | 1 | 403 |
| nadialsalam.sa | 1 | 403 |
| nascar.com | 1 | 403 |
| nation.africa | 1 | 403 |
| naturalstattrick.com | 1 | 403 |
| nba.com | 1 | 403 |
| nbl.basketball | 1 | 403 |
| ndtv.com | 1 | 403 |
| nessma.tv | 1 | 403 |
| newagebd.net | 1 | 403 |
| news.com.au | 1 | 403 |
| news18.com | 1 | 403 |
| nidaalwatan.com | 1 | 403 |
| nieuwsblad.be | 1 | 403 |
| nifootballleague.com | 1 | 403 |
| nkistra.com | 1 | 403 |
| nna-leb.gov.lb | 1 | 403 |
| norddjurshaandbold.dk | 1 | 454 |
| nordsjaelland-haandbold.dk | 1 | 403 |
| northwalespioneer.co.uk | 1 | 403 |
| nova.cz | 1 | 403 |
| nu.nl | 1 | 403 |
| nytimes.com | 1 | 403 |
| nzs.si | 1 | 403 |
| o29m.com | 1 | 403 |
| odderhaandbold.dk | 1 | 454 |
| odraopole.pl | 1 | 403 |
| ojogo.pt | 1 | 403 |
| oneonline.mv | 1 | 403 |
| owngoalnigeria.com | 1 | 403 |
| oxu.az | 1 | 403 |
| paakallo.fi | 1 | 403 |
| panorama.com.al | 1 | 403 |
| paobc.gr | 1 | 403 |
| paokfc.gr | 1 | 403 |
| parool.nl | 1 | 403 |
| pcb.com.pk | 1 | 403 |
| pembrokehamiltonclub.bm | 1 | 403 |
| peru21.pe | 1 | 403 |
| petrojetsc.com | 1 | 401 |
| philta.org | 1 | 403 |
| phnompenhpost.com | 1 | 403 |
| piattitenniscenter.it | 1 | 403 |
| piotrkowianin.pl | 1 | 403 |
| piratichomutov.cz | 1 | 403 |
| pluska.sk | 1 | 403 |
| pogonszczecin.pl | 1 | 403 |
| prensa.com | 1 | 403 |
| press.ma | 1 | 403 |
| pressandjournal.co.uk | 1 | 403 |
| pro-football-reference.com | 1 | 403 |
| proceso.com.mx | 1 | 403 |
| proxcskiing.com | 1 | 403 |
| pssi.org | 1 | 403 |
| puckpedia.com | 1 | 403 |
| qarabagh.com | 1 | 403 |
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
| rosaelyoussef.com | 1 | 403 |
| rp.pl | 1 | 403 |
| rri.co.id | 1 | 403 |
| rtklive.com | 1 | 403 |
| rtl.nl | 1 | 403 |
| rue20.com | 1 | 403 |
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
| sknnews.com | 1 | 403 |
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
| solomonstarnews.com | 1 | 403 |
| soydetelmo.com.ar | 1 | 403 |
| soyfutbol.com | 1 | 403 |
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
| talaaelgaish.com | 1 | 401 |
| talkbasket.net | 1 | 403 |
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
| thecable.ng | 1 | 403 |
| thecourier.co.uk | 1 | 403 |
| thenational.scot | 1 | 403 |
| thenationonlineng.net | 1 | 403 |
| theshots.co.uk | 1 | 403 |
| timesofisrael.com | 1 | 403 |
| tipsport.sk | 1 | 403 |
| tntsports.cl | 1 | 403 |
| tntsports.com.ar | 1 | 403 |
| tolonews.com | 1 | 403 |
| top-channel.tv | 1 | 403 |
| trabzonspor.org.tr | 1 | 403 |
| trouw.nl | 1 | 403 |
| trud.bg | 1 | 403 |
| tsports.com | 1 | 403 |
| tsv1882.de | 1 | 429 |
| tubantia.nl | 1 | 403 |
| tuskerfc.com | 1 | 403 |
| tuzos.com.mx | 1 | 403 |
| tv3.lv | 1 | 403 |
| tvn24.pl | 1 | 403 |
| tvperu.gob.pe | 1 | 403 |
| unionradio.net | 1 | 403 |
| usmp.edu.pe | 1 | 403 |
| usopen.com | 1 | 403 |
| usskiandsnowboard.org | 1 | 403 |
| v-varen.com | 1 | 403 |
| vaguthu.mv | 1 | 403 |
| vanguardia.com.mx | 1 | 403 |
| vanguardngr.com | 1 | 403 |
| vcshahter.by | 1 | 403 |
| vetogate.com | 1 | 403 |
| victoriahotspursfc.com | 1 | 403 |
| vietnamnews.vn | 1 | 403 |
| vif.fo | 1 | 454 |
| vilanovafc.com.br | 1 | 403 |
| virakesari.lk | 1 | 403 |
| virgule.lu | 1 | 403 |
| vlcizilina.sk | 1 | 403 |
| vocketfc.com | 1 | 403 |
| volkskrant.nl | 1 | 403 |
| volleyball.dk | 1 | 454 |
| volleynet.at | 1 | 403 |
| vov.vn | 1 | 403 |
| wataninet.com | 1 | 403 |
| whoscored.com | 1 | 403 |
| widzew.com | 1 | 403 |
| widzewkosz.pl | 1 | 403 |
| windrawwin.com | 1 | 403 |
| wired868.com | 1 | 403 |
| wolfdogs.jp | 1 | 403 |
| woluesfc.co.uk | 1 | 403 |
| worldcurling.org | 1 | 403 |
| worldfootball.net | 1 | 403 |
| wort.lu | 1 | 403 |
| wprost.pl | 1 | 403 |
| wrc.com | 1 | 403 |
| wybrzeze-gdansk.pl | 1 | 403 |
| xgstat.com | 1 | 429 |
| xn--ikasthndbold-ycb.dk | 1 | 454 |
| zdg.md | 1 | 403 |
| zniczpruszkow.com.pl | 1 | 403 |

## 🔼 DÁ SA PREPNÚŤ NA HTTPS (1)

Linka s http:// funguje, ale funguje aj zabezpečená adresa https:// na tom istom webe. Len návrh — data.json sa nemení; ak chceš, adresu v dátach vymeň.

| ID | Cesta | Adresa | Navrhovaná adresa |
|---|---|---|---|
| `f_arg_l3b_k22` | Futbal › Kluby › Južná Amerika › Argentína › Primera B Metropolitana › Ituzaingo | http://www.caituzaingo.com.ar/ | https://caituzaingo.com.ar/ |

## 🟡 VAROVANIA (over ručne) (250)

### 🟡 ⚠️ over ručne – možná predaná doména (8)


#### Futbal (2)

| ID | Cesta | Adresa | Kam presmeruje | Od |
|---|---|---|---|---|
| `f_lva_l2_k7` | Futbal › Kluby › Európa › Lotyšsko › Nākotnes līga › Riga Mariners | https://rigamariners.lv/ | https://mariners.lv/ | 2026-11-23 |
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

### 🟡 Ostatné varovania (242)


#### Aktuálne (5)

| ID | Cesta | Adresa | Dôvod | Od |
|---|---|---|---|---|
| `a1795365605778psn18` | Futbal – Európska liga | https://www.uefa.com/uefaeuropaleague/fixtures-results/ | timeout (web neodpovedal včas) | 2026-11-23 |
| `a1795365605778u5v19` | Futbal – Konferenčná liga | https://www.uefa.com/uefaconferenceleague/fixtures-results/ | timeout (web neodpovedal včas) | 2026-11-23 |
| `a1795365605778tpn17` | Futbal – Liga majstrov | https://www.uefa.com/uefachampionsleague/fixtures-results/ | timeout (web neodpovedal včas) | 2026-11-23 |
| `a1794835574387ls510` | Jazdectvo – GC Playoffs Verona | https://www.longinestiming.com/equestrian/2026/global-champions-playoffs-verona | timeout (web neodpovedal včas) | 2026-11-23 |
| `a17948355743876ry20` | Skoky do vody – SP High Diving | https://www.omegatiming.com/2026/world-aquatics-high-diving-world-cup-2026---stop-3-live-results | timeout (web neodpovedal včas) | 2026-11-23 |

#### Futbal (66)

| ID | Cesta | Adresa | Dôvod | Od |
|---|---|---|---|---|
| `n1784113212680s6i` | ME muži 2028 | https://www.uefa.com/euro2028/ | timeout (web neodpovedal včas) · **4× po sebe** | 2026-11-03 |
| `n178411325834500d` | Liga národov muži | https://www.uefa.com/uefanationsleague/ | timeout (web neodpovedal včas) · **4× po sebe** | 2026-11-03 |
| `n1784113327693sy5` | Liga majstrov | https://www.uefa.com/uefachampionsleague/ | timeout (web neodpovedal včas) · **4× po sebe** | 2026-11-03 |
| `n178411334679368q` | Európska liga | https://www.uefa.com/uefaeuropaleague/ | timeout (web neodpovedal včas) · **4× po sebe** | 2026-11-03 |
| `n1784113364906kty` | Konferenčná liga | https://www.uefa.com/uefaconferenceleague/ | timeout (web neodpovedal včas) · **4× po sebe** | 2026-11-03 |
| `n17841133816378tx` | Superpohár | https://www.uefa.com/uefasupercup/ | timeout (web neodpovedal včas) · **4× po sebe** | 2026-11-03 |
| `n17841134233822j5` | ME muži U21 | https://www.uefa.com/under21/ | timeout (web neodpovedal včas) · **4× po sebe** | 2026-11-03 |
| `n1784113458471i73` | ME muži U19 | https://www.uefa.com/under19/ | timeout (web neodpovedal včas) · **4× po sebe** | 2026-11-03 |
| `n1784113480304soi` | ME muži U17 | https://www.uefa.com/under17/ | timeout (web neodpovedal včas) · **4× po sebe** | 2026-11-03 |
| `n1784113609217o2w` | ME ženy | https://www.uefa.com/womenseuro/ | timeout (web neodpovedal včas) · **4× po sebe** | 2026-11-03 |
| `n1784113643274jsb` | Liga národov ženy | https://www.uefa.com/womensnationsleague/ | timeout (web neodpovedal včas) · **4× po sebe** | 2026-11-03 |
| `n178411367786861h` | ME ženy u19 | https://www.uefa.com/womensunder19/ | timeout (web neodpovedal včas) · **4× po sebe** | 2026-11-03 |
| `n1784113705982s7c` | ME ženy U17 | https://www.uefa.com/womensunder17/ | timeout (web neodpovedal včas) · **4× po sebe** | 2026-11-03 |
| `n1784113745882dy1` | UEFA Youth league | https://www.uefa.com/uefayouthleague/ | timeout (web neodpovedal včas) · **4× po sebe** | 2026-11-03 |
| `n1784113772891qvd` | UEFA Regions cup | https://www.uefa.com/regionscup/ | timeout (web neodpovedal včas) · **4× po sebe** | 2026-11-03 |
| `f_svk_l2_k10` | MŠK Považská Bystrica | https://mskpb.eu | HTTP 455 | 2026-11-16 |
| `f_esp_l2_k7` | Granada | https://granadacf.es/ | SSL chyba (certifikát): [SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed: unable to get local issuer cer · **4× po sebe** | 2026-11-03 |
| `f_ger_bl_k0` | Bayern Mníchov | https://fcbayern.com/ | timeout (web neodpovedal včas) · **4× po sebe** | 2026-11-03 |
| `f_ger_rn_k9` | SSV Jeddeloh | https://www.ssv-jeddeloh.de/ | HTTP 503 – chyba servera / výpadok · **4× po sebe** | 2026-11-03 |
| `f_ger_rno_k9` | BFC Dynamo | https://bfc.com/ | timeout (web neodpovedal včas) | 2026-11-23 |
| `f_ger_rno_k14` | Greifswalder FC | https://greifswalder-fc.de/ | HTTP 503 – chyba servera / výpadok · **4× po sebe** | 2026-11-03 |
| `f_ger_rsw_k1` | FSV Frankfurt | https://www.fsv-frankfurt.de/ | HTTP 503 – chyba servera / výpadok · **4× po sebe** | 2026-11-03 |
| `f_ger_rsw_k7` | SSV Ulm 1846 | https://www.ssvulm1846-fussball.de/ | HTTP 503 – chyba servera / výpadok · **4× po sebe** | 2026-11-03 |
| `f_ger_rb_k13` | TSV Aubstadt | https://www.tsv-aubstadt.de/ | HTTP 503 – chyba servera / výpadok · **4× po sebe** | 2026-11-03 |
| `f_ger_rb_k15` | Bayern Mníchov II | https://fcbayern.com/de/teams/fc-bayern-campus/amateure | timeout (web neodpovedal včas) · **4× po sebe** | 2026-11-03 |
| `f_fra_l2_k16` | USL Dunkerque | https://usldunkerque.com/ | SSL chyba (certifikát): [SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed: Hostname mismatch, certificate · **4× po sebe** | 2026-11-03 |
| `f_fra_l3_k2` | Amiens SC | https://amiensfootball.com/ | SSL chyba (certifikát): [SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed: Hostname mismatch, certificate · **4× po sebe** | 2026-11-03 |
| `f_blr_l1_liga` | Vyššia liga | https://championship.abff.by/male/tournaments/1/?tournamentId=7 | SSL chyba (certifikát): [SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed: unable to get local issuer cer · **4× po sebe** | 2026-11-03 |
| `f_ned_l2_k4` | FC Dordrecht | https://www.fcdordrecht.nl/ | HTTP 400 · **4× po sebe** | 2026-11-03 |
| `f_isl_l1_liga` | Besta deild karla | https://bestadeildin.is/deildin/ | timeout (web neodpovedal včas) | 2026-11-23 |
| `f_isl_l2_k12` | Ægir | https://aegirfc.is/ | timeout (web neodpovedal včas) | 2026-11-23 |
| `f_pol_l2_k3` | Miedź Legnica | https://miedzlegnica.eu | SSL chyba (certifikát): [SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed: unable to get local issuer cer · **4× po sebe** | 2026-11-03 |
| `f_rus_l2_k14` | Neftechimik Nižnekamsk | https://fcnh.ru/ | chyba spojenia: OSError [Errno 101] Network is unreachable | 2026-11-23 |
| `f_rus_l2_k17` | KAMAZ Naberežnyje Čelny | https://fckamaz.ru/ | timeout (web neodpovedal včas) | 2026-11-23 |
| `f_nir_l1_k3` | Carrick Rangers | https://www.carrickrangers.co.uk/ | HTTP 503 – chyba servera / výpadok · **4× po sebe** | 2026-11-03 |
| `f_svn_l1_k1` | NK Aluminij | https://nkaluminij.net/ | HTTP 500 – chyba servera / výpadok · **4× po sebe** | 2026-11-03 |
| `f_svn_l2_k11` | ND Primorje | https://ndprimorje.si/ | HTTP 500 – chyba servera / výpadok | 2026-11-23 |
| `f_che_l1_k11` | BSC Young Boys | https://www.bscyb.ch/ | HTTP 503 – chyba servera / výpadok · **4× po sebe** | 2026-11-03 |
| `f_ita_l2_k1` | Arezzo | https://ssarezzo.it/ | SSL chyba (certifikát): [SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed: certificate has expired (_ssl. | 2026-11-23 |
| `f_ita_l2_k18` | Südtirol | https://www.fc-suedtirol.com/ | SSL chyba (certifikát): [SSL: DH_KEY_TOO_SMALL] dh key too small (_ssl.c:1011) · **4× po sebe** | 2026-11-03 |
| `f_tur_l2_k6` | Bursaspor | https://www.bursaspor.org.tr/ | timeout (web neodpovedal včas) | 2026-11-23 |
| `f_ukr_l1_k5` | Obolon Kyjiv | https://fc.obolon.ua/ | SSL chyba (certifikát): [SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed: unable to get local issuer cer · **4× po sebe** | 2026-11-03 |
| `f_ukr_l2_k15` | Kulykiv-Bilka | https://fckulykiv-bilka.com.ua/ | HTTP 502 – chyba servera / výpadok | 2026-11-23 |
| `f_wal_l1_k15` | Holywell Town | https://www.holywelltownfc.co.uk/ | HTTP 503 – chyba servera / výpadok · **4× po sebe** | 2026-11-03 |
| `f_aze_l1_k3` | Neftçi Baku | https://neftchi.az/ | HTTP 468 | 2026-11-16 |
| `f_cyp_l2_k5` | ASIL Lysi | https://asillysis.com/ | HTTP 503 – chyba servera / výpadok · **4× po sebe** | 2026-11-03 |
| `f_jpn_l3_k7` | Kagoshima United FC | https://kufc.co.jp | HTTP 503 – chyba servera / výpadok | 2026-11-23 |
| `f_kor_l1_k11` | FC Anyang | https://www.fc-anyang.com/ | SSL chyba (certifikát): [SSL: SSLV3_ALERT_HANDSHAKE_FAILURE] ssl/tls alert handshake failure (_ssl.c:1011) · **4× po sebe** | 2026-11-03 |
| `f_kor_l2_k16` | Gimhae FC 2008 | https://www.gimhaefc2008.com/ | SSL chyba (certifikát): [SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed: unable to get local issuer cer · **4× po sebe** | 2026-11-03 |
| `f_sau_l1_k5` | Al-Faisaly | https://alfaisalyfc.net | SSL chyba (certifikát): [SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed: unable to get local issuer cer | 2026-11-16 |
| `f_vnm_l1_k12` | The Cong-Viettel | https://viettelsports.vn/ | chyba spojenia: OSError [Errno 101] Network is unreachable | 2026-11-16 |
| `f_arg_l1_k23` | Atletico Tucuman | https://www.clubatleticotucuman.com.ar/ | HTTP 500 – chyba servera / výpadok · **4× po sebe** | 2026-11-03 |
| `f_arg_l2_k3` | Colon Santa Fe | https://www.clubcolon.com.ar/ | SSL chyba (certifikát): [SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed: certificate has expired (_ssl. | 2026-11-23 |
| `f_arg_l3b_k1` | Arsenal (Sarandi) | https://www.arsenalfc.com.ar/ | HTTP 503 – chyba servera / výpadok · **4× po sebe** | 2026-11-03 |
| `f_bra_l1_k3` | Athletico-PR | https://www.athletico.com.br/ | HTTP 405 | 2026-11-23 |
| `f_uru_l1_k11` | Club Deportivo Maldonado | https://deportivomaldonadosad.com | HTTP 503 – chyba servera / výpadok · **4× po sebe** | 2026-11-03 |
| `f_lby_l1_k11` | Al-Ittihad Tripoli | https://ittihadclub.ly/ | timeout (web neodpovedal včas) · **4× po sebe** | 2026-11-03 |
| `f_bah_l1_k8` | University of The Bahamas (Mingoes) | https://www.gomingoes.com/sports/msoc/index | HTTP 405 | 2026-11-23 |
| `f_cri_l2_k8` | FC Moravia (Fútbol Consultants) | https://fcmoravia.com/ | HTTP 500 – chyba servera / výpadok | 2026-11-16 |
| `n1784027166602qw3` | UEFA | https://www.uefa.com/ | timeout (web neodpovedal včas) · **4× po sebe** | 2026-11-03 |
| `n1784029893842q1h` | Bielorusko | https://abff.by/ | SSL chyba (certifikát): [SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed: unable to get local issuer cer · **4× po sebe** | 2026-11-03 |
| `n1784030738475eqr` | Maďarsko | https://en.mlsz.hu/ | SSL chyba (certifikát): [SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed: unable to get local issuer cer · **4× po sebe** | 2026-11-03 |
| `n1784038128334q6m` | Peru | https://fpf.org.pe/ | SSL chyba (certifikát): [SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed: unable to get local issuer cer · **4× po sebe** | 2026-11-03 |
| `n1784053308186d1h` | Pobrežie Slonoviny | https://fifciv.com/ | HTTP 503 – chyba servera / výpadok · **4× po sebe** | 2026-11-03 |
| `n1784053401045psc` | Rwanda | https://ferwafa.rw/ | timeout (web neodpovedal včas) | 2026-11-16 |
| `n17843670020433kq` | Statbunker | https://www.statbunker.com/ | timeout (web neodpovedal včas) | 2026-11-23 |

#### Hokej (48)

| ID | Cesta | Adresa | Dôvod | Od |
|---|---|---|---|---|
| `n17800437266674is` | ECHL – tretia zámorská liga | https://echl.com/ | HTTP 405 | 2026-11-23 |
| `f_hok_klu_na_echl_liga` | ECHL – tretia zámorská liga | https://echl.com/standings | HTTP 405 | 2026-11-23 |
| `f_hok_klu_na_echl_k1` | Adirondack Thunder | https://echlthunder.com/ | HTTP 405 | 2026-11-23 |
| `f_hok_klu_na_echl_k2` | Allen Americans | https://allenamericans.com/ | HTTP 405 | 2026-11-23 |
| `f_hok_klu_na_echl_k3` | Atlanta Gladiators | https://atlantagladiators.com/ | HTTP 405 | 2026-11-23 |
| `f_hok_klu_na_echl_k4` | Bloomington Bison | https://bloomingtonbisonhockey.com/ | HTTP 405 | 2026-11-23 |
| `f_hok_klu_na_echl_k5` | Cincinnati Cyclones | https://cycloneshockey.com/ | HTTP 405 | 2026-11-23 |
| `f_hok_klu_na_echl_k6` | Florida Everblades | https://www.floridaeverblades.com/ | HTTP 405 | 2026-11-23 |
| `f_hok_klu_na_echl_k7` | Fort Wayne Komets | https://komets.com/ | HTTP 405 | 2026-11-23 |
| `f_hok_klu_na_echl_k8` | Greensboro Gargoyles | https://gargoyleshockey.com/ | HTTP 405 | 2026-11-23 |
| `f_hok_klu_na_echl_k9` | Greenville Swamp Rabbits | https://swamprabbits.com/ | HTTP 405 | 2026-11-23 |
| `f_hok_klu_na_echl_k10` | Idaho Steelheads | https://idahosteelheads.com/ | HTTP 405 | 2026-11-23 |
| `f_hok_klu_na_echl_k11` | Indy Fuel | https://indyfuelhockey.com/ | HTTP 405 | 2026-11-23 |
| `f_hok_klu_na_echl_k12` | Jacksonville Icemen | https://jacksonvilleicemen.com/ | HTTP 405 | 2026-11-23 |
| `f_hok_klu_na_echl_k13` | Kalamazoo Wings | https://kwings.com/ | HTTP 405 | 2026-11-23 |
| `f_hok_klu_na_echl_k14` | Kansas City Mavericks | https://kcmavericks.com/ | HTTP 405 | 2026-11-23 |
| `f_hok_klu_na_echl_k15` | Maine Mariners | https://mainemariners.com/ | HTTP 405 | 2026-11-23 |
| `f_hok_klu_na_echl_k16` | New Mexico Goatheads | https://nmgoatheads.com/ | HTTP 405 | 2026-11-23 |
| `f_hok_klu_na_echl_k17` | Norfolk Admirals | https://norfolkadmirals.com/ | HTTP 405 | 2026-11-23 |
| `f_hok_klu_na_echl_k18` | Orlando Solar Bears | https://orlandosolarbearshockey.com/ | HTTP 405 | 2026-11-23 |
| `f_hok_klu_na_echl_k19` | Rapid City Rush | https://rapidcityrush.com/ | HTTP 405 | 2026-11-23 |
| `f_hok_klu_na_echl_k20` | Reading Royals | https://royalshockey.com/ | HTTP 405 | 2026-11-23 |
| `f_hok_klu_na_echl_k21` | Savannah Ghost Pirates | https://ghostpirateshockey.com/ | HTTP 405 | 2026-11-23 |
| `f_hok_klu_na_echl_k22` | South Carolina Stingrays | https://stingrayshockey.com/ | HTTP 405 | 2026-11-23 |
| `f_hok_klu_na_echl_k23` | Tahoe Knight Monsters | https://knightmonstershockey.com/ | HTTP 405 | 2026-11-23 |
| `f_hok_klu_na_echl_k24` | Toledo Walleye | https://www.toledowalleye.com/ | HTTP 405 | 2026-11-23 |
| `f_hok_klu_na_echl_k25` | Trenton Ironhawks | https://trentonironhawks.com/ | HTTP 405 | 2026-11-23 |
| `f_hok_klu_na_echl_k26` | Trois-Rivières Lions | https://lions3r.com/ | HTTP 405 | 2026-11-23 |
| `f_hok_klu_na_echl_k27` | Tulsa Oilers | https://tulsaoilers.com/ | HTTP 405 | 2026-11-23 |
| `f_hok_klu_na_echl_k28` | Wheeling Nailers | https://wheelingnailers.com/ | HTTP 405 | 2026-11-23 |
| `f_hok_klu_na_echl_k29` | Wichita Thunder | https://wichitathunder.com/ | HTTP 405 | 2026-11-23 |
| `f_hok_klu_na_echl_k30` | Worcester Railers | https://railershc.com/ | HTTP 405 | 2026-11-23 |
| `f_hok_klu_eu_deu_l1_k3` | EHC Red Bull München | https://www.redbullmuenchen.de/ | HTTP 500 – chyba servera / výpadok · **4× po sebe** | 2026-11-03 |
| `f_hok_klu_eu_deu_l1_k7` | Grizzlys Wolfsburg | https://www.grizzlys.de/ | HTTP 503 – chyba servera / výpadok · **4× po sebe** | 2026-11-03 |
| `f_hok_klu_eu_deu_l1_k10` | Krefeld Pinguine | https://krefeld-pinguine.de/ | HTTP 503 – chyba servera / výpadok · **4× po sebe** | 2026-11-03 |
| `f_hok_klu_eu_deu_l2_k5` | EC Bad Nauheim | https://ec-bn.de/ | HTTP 503 – chyba servera / výpadok · **4× po sebe** | 2026-11-03 |
| `f_hok_klu_eu_rus_l1_k17` | Spartak Moskva | https://spartak.ru/ | SSL chyba (certifikát): [SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed: unable to get local issuer cer · **4× po sebe** | 2026-11-03 |
| `f_hok_klu_eu_rus_l2_k1` | AKM Tula | https://akm-hockey.ru/ | SSL chyba (certifikát): [SSL: TLSV1_UNRECOGNIZED_NAME] tlsv1 unrecognized name (_ssl.c:1011) | 2026-11-23 |
| `f_hok_klu_eu_rus_l2_k15` | Jugra Chanty-Mansijsk | https://www.ugra-hc.ru/ | chyba spojenia: OSError [Errno 101] Network is unreachable | 2026-11-23 |
| `f_hok_klu_eu_rus_l2_k16` | Južnyj Ural Orsk | https://www.orsk-hockey.ru/ | timeout (web neodpovedal včas) | 2026-11-16 |
| `f_hok_klu_eu_rus_l2_k20` | Molot Perm | https://hc-molot.ru/ | chyba spojenia: OSError [Errno 101] Network is unreachable | 2026-11-23 |
| `f_hok_klu_eu_rus_l2_k24` | Riazaň-VDV | https://хкрязань.рф/ | timeout (web neodpovedal včas) | 2026-11-23 |
| `f_hok_klu_eu_fra_l1_k12` | Spartiates de Marseille | https://marseillehockeyclub.com/ | HTTP 503 – chyba servera / výpadok · **4× po sebe** | 2026-11-03 |
| `f_hok_klu_eu_fra_l2_k5` | Diables Rouges de Valenciennes | https://www.diablesrouges.fr/ | HTTP 503 – chyba servera / výpadok · **4× po sebe** | 2026-11-03 |
| `f_hok_klu_eu_aut_l1_k3` | EC Red Bull Salzburg | https://ecrbs.redbulls.com/ | HTTP 500 – chyba servera / výpadok · **4× po sebe** | 2026-11-03 |
| `f_hok_klu_eu_aut_l2_k4` | Red Bull Hockey Juniors | https://ecrbs.redbulls.com/de/academy/teams?teamType=RBJ | HTTP 500 – chyba servera / výpadok · **4× po sebe** | 2026-11-03 |
| `f_hok_klu_eu_gbr_l2_k3` | Hull Seahawks | https://www.hullseahawks.co.uk/ | HTTP 503 – chyba servera / výpadok · **4× po sebe** | 2026-11-03 |
| `f_hok_klu_eu_gbr_l2_k7` | Romford Raiders | https://romfordraiders.co.uk/ | HTTP 503 – chyba servera / výpadok · **4× po sebe** | 2026-11-03 |

#### Tenis (10)

| ID | Cesta | Adresa | Dôvod | Od |
|---|---|---|---|---|
| `n1788830000026a5` | Grand Prix Auvergne-Rhône-Alpes | https://www.grandprix-auvergnerhonealpes.com/ | HTTP 503 – chyba servera / výpadok · **4× po sebe** | 2026-11-03 |
| `n1788890000046thz` | Steffi Graf | https://steffi-graf.net/ | SSL chyba (certifikát): [SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed: certificate has expired (_ssl. | 2026-11-16 |
| `f_ten_aso_eu_k14` | Island | https://tsi.is/ | timeout (web neodpovedal včas) | 2026-11-23 |
| `f_ten_aso_eu_k50` | Monako | https://www.monaco-tennis.com/ | HTTP 503 – chyba servera / výpadok · **4× po sebe** | 2026-11-03 |
| `f_ten_aso_eu_k35` | Ukrajina | https://ftu.org.ua/ | timeout (web neodpovedal včas) | 2026-11-23 |
| `f_ten_aso_az_k9` | Indonézia | https://www.pelti.org/ | SSL chyba (certifikát): [SSL: TLSV1_ALERT_INTERNAL_ERROR] tlsv1 alert internal error (_ssl.c:1011) · **4× po sebe** | 2026-11-03 |
| `f_ten_aso_ja_k11` | Surinam | https://surinametennis.sr/ | timeout (web neodpovedal včas) | 2026-11-23 |
| `f_ten_aso_ja_k13` | Venezuela | https://fvtenis.org/ | HTTP 503 – chyba servera / výpadok · **4× po sebe** | 2026-11-03 |
| `f_ten_aso_af_k14` | Kongo (DR) | https://frdtennis.cd/ | HTTP 503 – chyba servera / výpadok | 2026-11-23 |
| `n1788780000015tak15` | Rick Macci Tennis Academy | https://rickmacci.com/ | timeout (web neodpovedal včas) | 2026-11-23 |

#### Basketbal (20)

| ID | Cesta | Adresa | Dôvod | Od |
|---|---|---|---|---|
| `f_bas_esp_l2_liga` | Primera FEB | https://www.feb.es/primerafeb/clasificacion.aspx | timeout (web neodpovedal včas) · **4× po sebe** | 2026-11-03 |
| `f_bas_esp_l3_liga` | Liga Femenina | https://www.feb.es/lfendesa/clasificacion.aspx | timeout (web neodpovedal včas) · **4× po sebe** | 2026-11-03 |
| `f_bas_ger_l1_k3` | Basketball Löwen Braunschweig | https://www.basketball-loewen.de | HTTP 503 – chyba servera / výpadok · **4× po sebe** | 2026-11-03 |
| `f_bas_ger_l1_k5` | FC Bayern München | https://fcbayern.com/basketball/de | timeout (web neodpovedal včas) · **4× po sebe** | 2026-11-03 |
| `f_bas_ger_l1_k13` | Riesen Ludwigsburg | https://mhp-riesen-ludwigsburg.de/ | HTTP 503 – chyba servera / výpadok · **4× po sebe** | 2026-11-03 |
| `f_bas_ger_l2_k7` | ETB Miners Essen | https://miners.ruhr | HTTP 503 – chyba servera / výpadok · **5× po sebe** | 2026-11-03 |
| `f_bas_ger_l3_k2` | BC Marburg | https://bc-marburg.de/ | HTTP 503 – chyba servera / výpadok · **4× po sebe** | 2026-11-03 |
| `f_bas_ger_l3_k8` | Rutronik Stars Keltern | https://www.rutronik-stars-keltern.de/ | HTTP 503 – chyba servera / výpadok · **4× po sebe** | 2026-11-03 |
| `f_bas_gre_l3_k1` | Amyntas | https://www.amyntas.gr/agonistika-tmimata/gynaikeio/ | HTTP 500 – chyba servera / výpadok | 2026-11-23 |
| `f_bas_isl_l1_k8` | Njarðvík | https://umfn.is/flokkur/korfubolti/ | timeout (web neodpovedal včas) | 2026-11-23 |
| `f_bas_isl_l3_k7` | Njarðvík | https://umfn.is/flokkur/korfubolti/ | timeout (web neodpovedal včas) | 2026-11-23 |
| `f_bas_klu_eu_lat_k1` | BK Liepāja | https://www.liepajasbasketbols.lv/ | timeout (web neodpovedal včas) · **4× po sebe** | 2026-11-03 |
| `f_bas_jpn_l2_k4` | Denso Iris | https://iris.denso.com/ | HTTP 503 – chyba servera / výpadok · **4× po sebe** | 2026-11-03 |
| `f_bas_kor_l2_k1` | Asan Woori Bank Woori Won | https://wooriwon.wooribank.com/basketball/main/main.php | SSL chyba (certifikát): [SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed: unable to get local issuer cer · **4× po sebe** | 2026-11-03 |
| `f_bas_kaz_l1_k2` | Astana | https://astanabasket.kz/ru/ | timeout (web neodpovedal včas) | 2026-11-23 |
| `f_bas_lby_l1_k4` | Al-Ittihad | https://ittihadclub.ly/basketball | timeout (web neodpovedal včas) · **4× po sebe** | 2026-11-03 |
| `f_bas_aso_eu_k40` | Španielsko | https://www.feb.es | timeout (web neodpovedal včas) · **4× po sebe** | 2026-11-03 |
| `f_bas_aso_az_k23` | Libanon | https://lebanon.basketball | HTTP 500 – chyba servera / výpadok | 2026-11-23 |
| `f_bas_aso_az_k28` | Mongolsko | https://mongolia.basketball | HTTP 525 – chyba servera / výpadok | 2026-11-23 |
| `f_bas_aso_na_k21` | Mexiko | https://ademeba.org/ | DNS dočasne neodpovedá | 2026-11-23 |

#### Hádzaná (18)

| ID | Cesta | Adresa | Dôvod | Od |
|---|---|---|---|---|
| `f_had_cze_l1_k2` | Handball Club Zlín | https://www.hazenazlin.cz/ | SSL chyba (certifikát): [SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed: self-signed certificate (_ssl. | 2026-11-23 |
| `f_had_cze_l3_k4` | DHK Zora Olomouc | https://www.dhkolomouc.cz/ | HTTP 455 | 2026-11-16 |
| `f_had_cze_l3_k5` | Handball club Zlín | https://www.hazenazlin.cz/ | SSL chyba (certifikát): [SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed: self-signed certificate (_ssl. | 2026-11-23 |
| `f_had_deu_l1_k9` | Rhein-Neckar Löwen | https://www.rhein-neckar-loewen.de | HTTP 503 – chyba servera / výpadok · **4× po sebe** | 2026-11-03 |
| `f_had_deu_l2_k4` | Die Eulen Ludwigshafen | https://eulen-ludwigshafen.de | HTTP 503 – chyba servera / výpadok · **4× po sebe** | 2026-11-03 |
| `f_had_deu_l2_k6` | HC Elbflorenz | https://hc-elbflorenz.de | HTTP 503 – chyba servera / výpadok · **4× po sebe** | 2026-11-03 |
| `f_had_deu_l2_k16` | TV Großwallstadt | https://www.tvgrosswallstadt.de | HTTP 503 – chyba servera / výpadok · **4× po sebe** | 2026-11-03 |
| `f_had_deu_l3_k7` | HSG Blomberg-Lippe | https://hsg-blomberg-lippe.de | HTTP 503 – chyba servera / výpadok · **4× po sebe** | 2026-11-03 |
| `f_had_fra_l2_k5` | Grand Besançon Doubs Handball | https://gbdh.fr | HTTP 503 – chyba servera / výpadok · **4× po sebe** | 2026-11-03 |
| `f_had_esp_l3_k13` | Sporting La Rioja | https://sportinglarioja.com/ | HTTP 503 – chyba servera / výpadok · **4× po sebe** | 2026-11-03 |
| `f_had_rus_l1_k6` | Kaustik Volgograd | https://kaustik-vlg.ru | chyba spojenia: OSError [Errno 101] Network is unreachable | 2026-11-23 |
| `f_had_rus_l1_k11` | Viktor Stavropoľ | https://hbc-victor.ru | chyba spojenia: OSError [Errno 101] Network is unreachable | 2026-11-23 |
| `f_had_rus_l2_k11` | Universitet Iževsk | https://www.udmhandball.ru | timeout (web neodpovedal včas) · **4× po sebe** | 2026-11-03 |
| `f_had_rus_l2_k12` | Zvezda Zvenigorod | https://zvezda-handball.ru | timeout (web neodpovedal včas) | 2026-11-23 |
| `f_had_ang_l1_k9` | Oxford University | https://www.oxfordhandball.org/ | HTTP 503 – chyba servera / výpadok · **4× po sebe** | 2026-11-03 |
| `f_had_isl_l1_k4` | Haukar | https://haukar.is/handbolti | timeout (web neodpovedal včas) | 2026-11-23 |
| `f_had_lux_l1_k7` | HC Standard | https://hcstandard.lu/ | timeout (web neodpovedal včas) | 2026-11-23 |
| `f_had_aso_az_k9` | India | https://handballindia.com/ | DNS dočasne neodpovedá | 2026-11-16 |

#### Volejbal (30)

| ID | Cesta | Adresa | Dôvod | Od |
|---|---|---|---|---|
| `f_vol_klu_eu_czechia_m1_k1` | Aero Odolena Voda | https://www.volejbalov.cz | HTTP 455 | 2026-11-16 |
| `f_vol_klu_eu_italy_m2_k8` | Pineto Volley | https://www.pinetovolley.it | SSL chyba (certifikát): [SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed: unable to get local issuer cer · **4× po sebe** | 2026-11-03 |
| `f_vol_klu_eu_russia_m1_k13` | Nova Novokujbyševsk | https://nova-volley.ru/ | chyba spojenia: OSError [Errno 101] Network is unreachable | 2026-11-23 |
| `f_vol_klu_eu_russia_z1_k6` | Korabelka Petrohrad | https://vc-korabelka.ru/ | chyba spojenia: OSError [Errno 101] Network is unreachable | 2026-11-23 |
| `f_vol_klu_eu_russia_z1_k12` | Tulica Tula | https://tulitsa.com/ | chyba spojenia: OSError [Errno 101] Network is unreachable | 2026-11-23 |
| `f_vol_klu_eu_russia_z1_k14` | Zarečje-Odincovo | https://zarechie-odintsovo.ru/ | chyba spojenia: OSError [Errno 101] Network is unreachable | 2026-11-23 |
| `f_vol_klu_eu_france_m2_k6` | Harnes Volley-Ball | https://www.harnes-volleyball.fr | HTTP 503 – chyba servera / výpadok · **4× po sebe** | 2026-11-03 |
| `f_vol_klu_eu_france_z1_k5` | Levallois Paris SC | https://les-mariannes.fr | HTTP 503 – chyba servera / výpadok · **4× po sebe** | 2026-11-03 |
| `f_vol_klu_eu_france_z1_k9` | Terville Florange OC | https://tfoc.fr | HTTP 503 – chyba servera / výpadok · **4× po sebe** | 2026-11-03 |
| `f_vol_klu_eu_belgium_z1_k5` | Damesvolley Gent | https://damesvolleygent.be/ | timeout (web neodpovedal včas) | 2026-11-23 |
| `f_vol_klu_eu_belarus_m1_k9` | Zapadnyj Bug Brest | https://vcbrest.by/zapadnyi-bug | SSL chyba (certifikát): [SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed: Hostname mismatch, certificate | 2026-11-16 |
| `f_vol_klu_eu_belarus_z1_k8` | Pribužje Brest | https://vcbrest.by/pribuzhye | SSL chyba (certifikát): [SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed: Hostname mismatch, certificate | 2026-11-16 |
| `f_vol_klu_eu_germany_z1_k7` | Schwarz-Weiß Erfurt | https://schwarz-weiss-erfurt.de/ | timeout (web neodpovedal včas) | 2026-11-23 |
| `f_vol_klu_eu_portugal_z1_k6` | GC Vilacondense | https://gcv.pt/modalidades/voleibol/ | HTTP 503 – chyba servera / výpadok | 2026-11-16 |
| `f_vol_klu_eu_slovenia_z1_k9` | Radol'ca Volley | https://okradovljica.si/ | SSL chyba (certifikát): [SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed: certificate has expired (_ssl. | 2026-11-23 |
| `f_vol_klu_eu_spain_z1_k5` | CV Cuesta Piedra | https://cvcuestapiedra.com/ | HTTP 503 – chyba servera / výpadok · **4× po sebe** | 2026-11-03 |
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
| `f_vol_klu_af_uganda_m1_k3` | KAVC | https://kavcuganda.org/ | timeout (web neodpovedal včas) | 2026-11-23 |
| `f_vol_aso_eu_iceland` | Island | https://bli.is/ | timeout (web neodpovedal včas) | 2026-11-23 |
| `f_vol_aso_ao_iran` | Irán | https://volleyball.ir/ | timeout (web neodpovedal včas) | 2026-11-16 |

#### Zimné športy (5)

| ID | Cesta | Adresa | Dôvod | Od |
|---|---|---|---|---|
| `n1780505392257gfa` | Neveitalia | https://www.neveitalia.it/sport/scialpino/ | timeout (web neodpovedal včas) · **4× po sebe** | 2026-11-03 |
| `n178076453390138l` | Skisprungschanzen | https://www.skisprungschanzen.com/ | HTTP 503 – chyba servera / výpadok | 2026-11-23 |
| `n1780771023781xwy` | FISI Italy | https://www.fisi.org/slittino/ | HTTP 503 – chyba servera / výpadok · **4× po sebe** | 2026-11-03 |
| `n17807716234727bn` | ČSBS (Bobteam.cz) | https://www.bobteam.cz/ | HTTP 455 | 2026-11-16 |
| `n17931434659855ey` | ISMF ranking | https://www.dataskimo.org/ranking.php | HTTP 500 – chyba servera / výpadok · **4× po sebe** | 2026-11-03 |

#### Ostatné športy (8)

| ID | Cesta | Adresa | Dôvod | Od |
|---|---|---|---|---|
| `n1780910701336o71` | UEFA Futsal Champions League | https://www.uefa.com/uefafutsalchampionsleague/ | timeout (web neodpovedal včas) · **4× po sebe** | 2026-11-03 |
| `n1780912683570c8u` | Futsal Hungary | https://futsal.mlsz.hu/ | SSL chyba (certifikát): [SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed: unable to get local issuer cer · **4× po sebe** | 2026-11-03 |
| `n178093324829801f` | Challenger series | https://www.challengerseries.net/ | HTTP 503 – chyba servera / výpadok · **4× po sebe** | 2026-11-03 |
| `n1780951072037b72` | Czechswimming | https://www.czechswimming.cz/ | HTTP 455 | 2026-11-16 |
| `n1780952734783yn4` | Water polo Italy | https://www.federnuoto.it/home/pallanuoto.html | HTTP 503 – chyba servera / výpadok · **4× po sebe** | 2026-11-03 |
| `n1780953808382zy1` | GFL Germany | https://gfl.info/ | HTTP 503 – chyba servera / výpadok · **4× po sebe** | 2026-11-03 |
| `n1780996555059we9` | El Gouna squash open | https://elgounainternational.com/ | HTTP 503 – chyba servera / výpadok · **4× po sebe** | 2026-11-03 |
| `n17809938824743o2` | The squash site | https://thesquashsite.com/ | HTTP 503 – chyba servera / výpadok · **4× po sebe** | 2026-11-03 |

#### Správy & Médiá (32)

| ID | Cesta | Adresa | Dôvod | Od |
|---|---|---|---|---|
| `n17823875005979wx` | Sport5 | https://sport5.by/ | server prerušil spojenie · **4× po sebe** | 2026-11-03 |
| `n1783689893231udo` | Stiften sport | https://stiften.dk/sport | timeout (web neodpovedal včas) | 2026-11-23 |
| `n1783690128180pks` | HSFO sport | https://hsfo.dk/sport | HTTP 503 – chyba servera / výpadok | 2026-11-23 |
| `n1783919287477z0w` | UTV sport | https://www.itv.com/news/utv/sport | timeout (web neodpovedal včas) · **4× po sebe** | 2026-11-03 |
| `n1783952731473f3b` | ITV Wales sport | https://www.itv.com/news/wales/sport | timeout (web neodpovedal včas) · **4× po sebe** | 2026-11-03 |
| `n1784235767202r58` | Bahrain News Agency sport | https://www.bna.bh/SportsNews.aspx?cms=iQRpheuphYtJ6pyXUGiNqv%2bxliCIF%2fFf | HTTP 405 · **4× po sebe** | 2026-11-03 |
| `n1784367859330pb8` | Dongqiudi | https://www.dongqiudi.com/ | HTTP 567 – chyba servera / výpadok | 2026-11-16 |
| `n1784459853033scz` | Jebreeet Media | https://jebreeetmedia.com/ | HTTP 503 – chyba servera / výpadok | 2026-11-23 |
| `n1784552769843iom` | dmenu Sports | https://service.smt.docomo.ne.jp/portal/sports/index.html | SSL chyba (certifikát): [SSL: UNSAFE_LEGACY_RENEGOTIATION_DISABLED] unsafe legacy renegotiation disabled (_ssl.c:1 · **4× po sebe** | 2026-11-03 |
| `n1784562689498127` | Al Watan sport | https://alwatanalakbar.com/category/Sports | HTTP 503 – chyba servera / výpadok · **4× po sebe** | 2026-11-03 |
| `n178457472959333x` | Ministerstvo športu | http://www.sdprk.org.kp/ | DNS dočasne neodpovedá | 2026-11-23 |
| `n1784574781763k61` | KCNA | http://www.kcna.kp/ | DNS dočasne neodpovedá | 2026-11-23 |
| `n1784711774328czd` | Harimau Malaya | https://harimaumalaya.com.my/ | SSL chyba (certifikát): [SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed: unable to get local issuer cer · **5× po sebe** | 2026-11-03 |
| `n1784714056397qaq` | Myawady Daily sport | https://www.myawady.net.mm/sport_news | SSL chyba (certifikát): [SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed: unable to get local issuer cer · **4× po sebe** | 2026-11-03 |
| `n1784719561871v2v` | MNB sport | https://www.mnb.mn/p/mnb-sport | HTTP 500 – chyba servera / výpadok | 2026-11-23 |
| `n178472038787065j` | Goal Nepal | https://www.goalnepal.com/ | timeout (web neodpovedal včas) | 2026-11-23 |
| `n17847449464405gu` | Nawa-i-Waqt sports | https://www.nawaiwaqt.com.pk/sports | HTTP 503 – chyba servera / výpadok · **4× po sebe** | 2026-11-03 |
| `n17847532904520pz` | Al Riyadh sport | https://www.alriyadh.com/sport | SSL chyba (certifikát): [SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed: unable to get local issuer cer · **4× po sebe** | 2026-11-03 |
| `n17848382504388d5` | Arzuw news sport | https://arzuw.news/category/sports | timeout (web neodpovedal včas) | 2026-11-23 |
| `n179443657570903v` | El Diario deportes | https://www.eldiario.net/portal/category/secciones/deportes/ | HTTP 307 – presmerovanie sa nedá dokončiť (chýba alebo je zlý cieľ) | 2026-11-16 |
| `n179519906501501l` | Horizons sports | https://www.horizons.dz/category/sports/ | server prerušil spojenie | 2026-11-23 |
| `n17951990650201go` | Ech-Chaab sports | https://www.ech-chaab.com/new/category/k2cat-1/k2cat-4/ | HTTP 500 – chyba servera / výpadok | 2026-11-23 |
| `n179536065266107sm` | ANGOP desporto | https://www.angop.ao/angola/noticias/?vtab=desporto&vtabid=1077 | HTTP 503 – chyba servera / výpadok | 2026-11-23 |
| `n179536281406902ng` | Sport Corner Ethiopia | https://sportcornerethiopia.com/ | SSL chyba (certifikát): [SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed: unable to get local issuer cer | 2026-11-23 |
| `n1795126985544fck` | SABC News sport | https://www.sabcnews.com/sabcnews/category/sport/ | SSL chyba (certifikát): [SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed: unable to get local issuer cer | 2026-11-23 |
| `n1795201458014g4q` | TAP sports | https://www.tap.info.tn/fr/Portail-Sports-FR | SSL chyba (certifikát): [SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed: unable to get local issuer cer | 2026-11-23 |
| `n1794950841238og1` | OnTrack Bermuda | https://www.ontrackbda.com/News/ | timeout (web neodpovedal včas) | 2026-11-23 |
| `n1794530349320grw` | Proceso Digital deportes | https://proceso.hn/category/secciones/deportes/ | HTTP 307 – presmerovanie sa nedá dokončiť (chýba alebo je zlý cieľ) | 2026-11-16 |
| `n17946844411492v0` | The Star sports | https://jamaica-star.com/sports | SSL chyba (certifikát): [SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed: unable to get local issuer cer | 2026-11-23 |
| `n179466411158106b` | Radio Rebelde deportes | https://www.radiorebelde.cu/deportes/ | timeout (web neodpovedal včas) | 2026-11-23 |
| `n179466411158524q` | Girón deportes | https://giron.cu/category/deportes/ | HTTP 500 – chyba servera / výpadok | 2026-11-23 |
| `n1794491884367jte` | TVWAN sports | https://tvwan.com.pg/category/sports | SSL chyba (certifikát): [SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed: unable to get local issuer cer | 2026-11-16 |

