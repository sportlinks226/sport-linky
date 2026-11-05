#!/usr/bin/env python3
"""STRÁŽCA NEFUNKČNÝCH LINIEK (raz týždenne, len správa).

Skript prejde všetky linky z data.json a aktualne.json a zistí, ktoré nefungujú.
data.json aj aktualne.json iba ČÍTA — nikdy ich nemení. Opravy robí Miro ručne.

Čo kontroluje:
  - uzly type "link" (pole url) a bannery (banners[].linkUrl) z data.json
  - Aktuálne (items[].url) z aktualne.json (od 3.11.2026 vo vlastnom súbore);
    kým aktualne.json neexistuje, staré pole aktualne[].url z data.json
  - VYNECHÁ polia fb/ig a všetky adresy na facebook.com, fb.com, instagram.com
    (blokujú roboty) — v správe je len ich počet
  - rovnakú adresu kontroluje len raz (aj keď je v dátach viackrát)

Výsledky (značky):
  🔴 MŔTVA        404/410 alebo neexistujúca doména — 2 behy po sebe v RÔZNYCH dňoch
                  (ručný beh v ten istý deň sa neráta ako ďalší beh)
  🟠 PODOZRIVÁ    to isté, ale zatiaľ len 1 beh (ďalší týždeň sa potvrdí alebo nie)
  🔵 PRESŤAHOVANÁ presmerovanie na INÚ doménu (navrhne novú adresu):
                  - podstránka na akúkoľvek inú doménu
                  - domovská stránka na rovnaké meno s inou koncovkou
                    (dailymail.co.uk → dailymail.com)
                  peñarol.org → xn--pearol-xwa.org je tá istá doména (len iný zápis) = OK
  🚫 BLOKUJE      401/403/429/454/456/999 — web nepustí robota; v sprava.md len súhrn po doménach,
                  jednotlivé adresy v sprava.csv
  🟡 VAROVANIE    5xx, timeout, SSL, presmerovanie v slučke… — treba overiť ručne
                  ⚠️ zvlášť: DOMOVSKÁ stránka presmeruje na úplne cudziu doménu →
                  „over ručne – možná predaná doména" (nová adresa sa NEnavrhuje)
  ✅ OK
  🔼 HTTPS        (len návrh, popri ✅ OK) linka http://, ktorej https:// verzia funguje
                  na tom istom webe (aj s/bez www) → v správe zvlášť „dá sa prepnúť na https"

Stav medzi behmi: kontrola-liniek/stav.json (adresa → posledný výsledok,
od kedy, koľko behov po sebe, dátum kontroly). OK linky sa ukladajú len ako
{"v": "ok"}, aby sa súbor každý týždeň neprepisoval celý.
Správa: kontrola-liniek/sprava.md a sprava.csv.

Slušnosť: bežný User-Agent prehliadača, najviac 2 požiadavky naraz na jednu
doménu (+ krátka pauza medzi nimi), celkovo 20 naraz, timeout 15 s, sťahuje sa
len začiatok stránky. Čo nie je OK, skúsi sa na konci behu ešte raz po pauze.

Časový limit (--cas-min): čo beh nestihne, skontroluje sa ďalší týždeň ako prvé
(najdlhšie nekontrolované adresy idú vždy na rad prvé). Nič nespadne.

Iba štandardný Python 3 (bez ďalších knižníc).

Použitie:
  python strazca_liniek.py                       # celý beh (ako na GitHube)
  python strazca_liniek.py --limit 300           # skúška: len 300 adries
  python strazca_liniek.py --dir /tmp/skuska     # stav a správa inde (mimo repozitára)
  python strazca_liniek.py --komentar k.md       # zapíše text komentára do Issue,
                                                 # ak je niečo nové (inak súbor nevznikne)
"""
import argparse
import collections
import concurrent.futures as cf
import csv
import datetime as dt
import hashlib
import http.client
import http.cookiejar
import json
import os
import socket
import ssl
import sys
import threading
import time
import urllib.error
import urllib.parse
import urllib.request

UA = ("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
      "(KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36")
HLAVICKY = {
    "User-Agent": UA,
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
    "Accept-Language": "sk,en;q=0.8",
}
VYNECHAT = ("facebook.com", "fb.com", "instagram.com")
# druhé úrovne typu co.uk, com.au — doména je vtedy posledné 3 časti
DRUHA_UROVEN = {"co", "com", "org", "net", "gov", "ac", "edu", "or", "ne", "go",
                "gob", "gv", "nic", "sch", "in", "ltd", "plc", "info", "biz", "web", "nom"}

ZNACKY = {"mrtva": "🔴", "prestahovana": "🔵", "podozriva": "🟠", "blokuje": "🚫",
          "varovanie": "🟡", "ok": "✅"}
NAZVY = {"mrtva": "MŔTVA", "prestahovana": "PRESŤAHOVANÁ", "podozriva": "PODOZRIVÁ",
         "blokuje": "BLOKUJE ROBOTOV", "varovanie": "VAROVANIE", "ok": "OK"}
# ktorý výsledok je „horší" — pri druhom pokuse sa nechá horší (404 neprepíše timeout),
# okrem prípadu, keď druhý pokus vyjde OK (web len dočasne nefungoval)
ZAVAZNOST = {"ok": 0, "varovanie": 1, "blokuje": 2, "prestahovana": 3, "mrtva": 4}
PREDANA = "over ručne – možná predaná doména"
HTTPS_ZNACKA = "🔼"
# 454/456 = anti-bot kódy (napr. Akamai) — previerka 3, bod 40
BLOKUJE_KODY = (401, 403, 429, 454, 456, 999)
MAX_V_KOMENTARI = 50
MAX_ZNAKOV_KOMENTARA = 60000


def log(*a):
    print(*a, flush=True)


# ---------------------------------------------------------------- adresy
def hlavna_domena(host):
    """www.klub.co.uk → klub.co.uk ; women.volleybox.net → volleybox.net
    Domény s diakritikou sa porovnávajú v tvare xn--… (peñarol.org = xn--pearol-xwa.org)."""
    host = (host or "").lower().rstrip(".")
    if host.replace(".", "").isdigit() or ":" in host:
        return host                    # IP adresa (napr. 127.0.0.1) — nedeliť
    try:
        host = host.encode("idna").decode("ascii")
    except UnicodeError:
        pass
    casti = host.split(".")
    if len(casti) >= 3 and len(casti[-1]) == 2 and casti[-2] in DRUHA_UROVEN:
        return ".".join(casti[-3:])
    return ".".join(casti[-2:])


def meno_domeny(host):
    """klub.co.uk → klub ; dailymail.com → dailymail (meno bez koncovky)"""
    return hlavna_domena(host).split(".")[0]


def je_domovska(url):
    """Domovská stránka webu: bez cesty (alebo /, /index.html…) a bez ?dotazu."""
    p = urllib.parse.urlsplit(url)
    cesta = p.path.strip("/").lower()
    return not p.query and cesta in ("", "index.html", "index.htm", "index.php")


def vynechat(url):
    host = (urllib.parse.urlsplit(url).hostname or "").lower()
    return any(host == d or host.endswith("." + d) for d in VYNECHAT)


def bez_www(host):
    """www.klub.sk → klub.sk (malé písmená, diakritika v tvare xn--) — na porovnanie
    „ten istý web" pri návrhu https (http://www.x.sk → https://x.sk je OK)."""
    host = (host or "").lower().rstrip(".")
    try:
        host = host.encode("idna").decode("ascii")
    except UnicodeError:
        pass
    return host[4:] if host.startswith("www.") else host


def kluc(url):
    """Adresa bez #časti — to isté pre server, kontroluje sa len raz."""
    return urllib.parse.urldefrag(url.strip())[0]


def na_ascii(url):
    """Adresa s diakritikou/azbukou → tvar, ktorý urllib vie poslať."""
    p = urllib.parse.urlsplit(url)
    host = p.hostname or ""
    try:
        host = host.encode("idna").decode("ascii")
    except UnicodeError:
        pass
    netloc = host + (f":{p.port}" if p.port else "")
    cesta = urllib.parse.quote(p.path, safe="/%:@!$&'()*+,;=-._~")
    dotaz = urllib.parse.quote(p.query, safe="=&%/:?@!$'()*+,;-._~")
    return urllib.parse.urlunsplit((p.scheme, netloc, cesta or "/", dotaz, ""))


# ---------------------------------------------------------------- dáta
def nacitaj_aktualne(akt_path, d):
    """Položky Aktuálnych: z aktualne.json (všetky, aj vypnuté a naplánované);
    keď súbor nie je alebo je poškodený, staré pole "aktualne" z data.json."""
    if akt_path and os.path.exists(akt_path):
        try:
            with open(akt_path, encoding="utf-8") as f:
                a = json.load(f)
            if isinstance(a, dict) and isinstance(a.get("items"), list):
                return [x for x in a["items"] if isinstance(x, dict)], akt_path
        except (OSError, ValueError) as e:
            log(f"UPOZORNENIE: {akt_path} sa nedá prečítať ({e}) — Aktuálne beriem z data.json")
    return [x for x in (d.get("aktualne") or []) if isinstance(x, dict)], "data.json"


def nacitaj_linky(data_path, akt_path="aktualne.json"):
    """Vráti (výskyty, počty). Výskyt = jedna linka v dátach (id, cesta, adresa)."""
    with open(data_path, encoding="utf-8") as f:
        d = json.load(f)
    uzly = {u["id"]: u for u in d.get("nodes", [])}

    def poradie(u):
        return (u.get("order", 9999), (u.get("name") or "").casefold())

    def retaz(u):
        r, videne = [], set()
        while u is not None and u["id"] not in videne:
            videne.add(u["id"])
            r.append(u)
            u = uzly.get(u.get("parentId"))
        return list(reversed(r))

    vyskyty = []
    pocty = collections.Counter()
    for u in d.get("nodes", []):
        if u.get("fb"):
            pocty["fb_pole"] += 1
        if u.get("ig"):
            pocty["ig_pole"] += 1
        if u.get("type") != "link" or not u.get("url"):
            continue
        r = retaz(u)
        vyskyty.append({
            "id": u["id"], "url": u["url"].strip(),
            "sport": r[0].get("name", "") if len(r) > 1 else "(bez športu)",
            "cesta": " › ".join(x.get("name", "") for x in r),
            "zorad": [poradie(x) for x in r],
        })
    akt, zdroj = nacitaj_aktualne(akt_path, d)
    pocty["aktualne"] = len(akt)
    log(f"Aktuálne: {len(akt)} položiek z {zdroj}")
    for a in akt:
        if a.get("url"):
            vyskyty.append({"id": a.get("id", ""), "url": a["url"].strip(), "sport": "Aktuálne",
                            "cesta": "Aktuálne › " + (a.get("name") or ""), "zorad": [(-2, "")]})
    for b in d.get("banners", []) or []:
        if b.get("linkUrl"):
            vyskyty.append({"id": b.get("id", ""), "url": b["linkUrl"].strip(), "sport": "Bannery",
                            "cesta": "Bannery › " + (b.get("name") or ""), "zorad": [(-1, "")]})

    vysledok = []
    for v in vyskyty:
        sch = urllib.parse.urlsplit(v["url"]).scheme.lower()
        if sch not in ("http", "https"):
            pocty["nie_web"] += 1          # napr. "/" alebo mailto:
            continue
        if vynechat(v["url"]):
            pocty["fb_ig_adresa"] += 1
            continue
        v["kluc"] = kluc(v["url"])
        vysledok.append(v)
    return vysledok, pocty


# ---------------------------------------------------------------- kontrola jednej adresy
class Kontrolor:
    def __init__(self, timeout=15, na_domenu=2, pauza_domena=1.0):
        self.timeout = timeout
        self.na_domenu = na_domenu
        self.pauza_domena = pauza_domena
        self._zamok = threading.Lock()
        self._sem = {}
        self._posledny = {}
        self.ctx = ssl.create_default_context()

    def _semafor(self, dom):
        with self._zamok:
            if dom not in self._sem:
                self._sem[dom] = threading.Semaphore(self.na_domenu)
            return self._sem[dom]

    def _pockaj_na_domenu(self, dom):
        while True:
            with self._zamok:
                teraz = time.monotonic()
                dalsi = self._posledny.get(dom, 0) + self.pauza_domena
                if teraz >= dalsi:
                    self._posledny[dom] = teraz
                    return
            time.sleep(dalsi - teraz)

    def skontroluj(self, url):
        dom = hlavna_domena(urllib.parse.urlsplit(url).hostname)
        with self._semafor(dom):
            self._pockaj_na_domenu(dom)
            return self._stiahni(url)

    def _stiahni(self, url):
        """Vráti dict: v (ok/mrtva/prestahovana/varovanie), d (dôvod), nova, kod."""
        opener = urllib.request.build_opener(
            urllib.request.HTTPCookieProcessor(http.cookiejar.CookieJar()),
            urllib.request.HTTPSHandler(context=self.ctx))
        req = urllib.request.Request(na_ascii(url), headers=HLAVICKY, method="GET")
        try:
            with opener.open(req, timeout=self.timeout) as r:
                r.read(2048)               # stačí začiatok odpovede
                return self._podla_kodu(url, r.status, r.geturl())
        except urllib.error.HTTPError as e:
            konc = e.geturl() or url
            sprava = str(getattr(e, "msg", "") or "")
            try:
                e.close()
            except Exception:
                pass
            if 300 <= e.code < 400:
                # bod 14: presmerovanie sa nedá dokončiť — slučka (A→B→A), viac ako 10
                # presmerovaní, chýba cieľ alebo cieľ nie je webová adresa. NIE je to OK.
                if "infinite loop" in sprava:
                    d = "presmerovanie v slučke (web presmerúva dookola)"
                else:
                    d = f"HTTP {e.code} – presmerovanie sa nedá dokončiť (chýba alebo je zlý cieľ)"
                return {"v": "varovanie", "d": d, "kod": e.code}
            return self._podla_kodu(url, e.code, konc)
        except urllib.error.URLError as e:
            return self._chyba(e.reason)
        except Exception as e:             # timeout, SSL, odpojenie…
            return self._chyba(e)

    @staticmethod
    def _chyba(r):
        if isinstance(r, socket.gaierror):
            if r.errno in (socket.EAI_NONAME, getattr(socket, "EAI_NODATA", -5)):
                return {"v": "mrtva", "d": "doména neexistuje (DNS)"}
            return {"v": "varovanie", "d": "DNS dočasne neodpovedá"}
        if isinstance(r, (TimeoutError, socket.timeout)):
            return {"v": "varovanie", "d": "timeout (web neodpovedal včas)"}
        if isinstance(r, ssl.SSLError) or isinstance(r, ssl.CertificateError):
            return {"v": "varovanie", "d": "SSL chyba (certifikát): " + str(r)[:90]}
        if isinstance(r, ConnectionRefusedError):
            return {"v": "varovanie", "d": "spojenie odmietnuté"}
        if isinstance(r, (ConnectionResetError, http.client.RemoteDisconnected)):
            return {"v": "varovanie", "d": "server prerušil spojenie"}
        if isinstance(r, OSError) and "timed out" in str(r):
            return {"v": "varovanie", "d": "timeout (web neodpovedal včas)"}
        return {"v": "varovanie", "d": f"chyba spojenia: {type(r).__name__} {str(r)[:80]}".strip()}

    @staticmethod
    def _podla_kodu(url, kod, konc):
        h1 = urllib.parse.urlsplit(url).hostname
        h2 = urllib.parse.urlsplit(konc).hostname
        ina = hlavna_domena(h1) != hlavna_domena(h2) if h2 else False
        # rovnaké meno, iná koncovka (dailymail.co.uk → dailymail.com) = asi ten istý majiteľ
        ine_meno = ina and meno_domeny(h1) != meno_domeny(h2)
        po = f" (po presmerovaní na {h2})" if ina else ""
        if kod in (404, 410):
            return {"v": "mrtva", "d": f"HTTP {kod} – stránka neexistuje{po}", "kod": kod}
        if 200 <= kod < 400:
            if ine_meno and je_domovska(url):
                # bod 14: domovská stránka ide na úplne cudzí web — doména mohla byť
                # predaná (gplallameryem.com → gethomeinspector.com). Nič nenavrhujeme.
                return {"v": "varovanie", "predana": True, "kam": konc, "kod": kod,
                        "d": f"presmeruje na cudziu doménu ({h2}) – over ručne, "
                             f"doména mohla byť predaná"}
            if ina:
                # podstránka na inú doménu alebo rovnaké meno s inou koncovkou
                return {"v": "prestahovana", "d": f"presmeruje na inú doménu ({h2})",
                        "nova": konc, "kod": kod}
            return {"v": "ok", "kod": kod, "konc": konc}
        if kod in BLOKUJE_KODY:
            # bod 22: samostatná skupina, v správe len súhrn po doménach
            d = {401: "HTTP 401 – vyžaduje prihlásenie (blokuje robotov)",
                 403: "HTTP 403 – prístup zamietnutý (blokuje robotov)",
                 429: "HTTP 429 – príliš veľa požiadaviek (blokuje robotov)",
                 454: "HTTP 454 – anti-bot ochrana (blokuje robotov)",
                 456: "HTTP 456 – anti-bot ochrana (blokuje robotov)",
                 999: "HTTP 999 – blokuje robotov"}[kod]
            return {"v": "blokuje", "d": d + po, "kod": kod}
        if kod >= 500:
            d = f"HTTP {kod} – chyba servera / výpadok"
        else:
            d = f"HTTP {kod}"
        return {"v": "varovanie", "d": d + po, "kod": kod}


    def https_navrh(self, url, r):
        """Previerka 3, bod 41: pre FUNKČNÚ linku http:// vráti adresu https://, ktorá
        funguje na tom istom webe (aj s/bez www), inak None. Keď web sám presmeroval
        na https (r["konc"]), nová požiadavka netreba — navrhne sa cieľ presmerovania."""
        p = urllib.parse.urlsplit(url)
        if p.scheme.lower() != "http" or r.get("v") != "ok":
            return None
        konc = r.get("konc") or ""
        k = urllib.parse.urlsplit(konc)
        if k.scheme.lower() == "https" and bez_www(k.hostname) == bez_www(p.hostname):
            return konc
        nova = urllib.parse.urlunsplit(("https",) + tuple(p[1:]))
        r2 = self.skontroluj(nova)
        k2 = urllib.parse.urlsplit(r2.get("konc") or nova)
        if (r2.get("v") == "ok" and k2.scheme.lower() == "https"
                and bez_www(k2.hostname) == bez_www(p.hostname)):
            return nova
        return None


# ---------------------------------------------------------------- beh
def poradie_kontroly(kluce, stav, limit, dnes=""):
    """Poradie: 1. nikdy nekontrolované, 2. problémové (mŕtve, podozrivé, presťahované,
    varovania, blokujúce) od najdlhšie nekontrolovaných, 3. OK (nemajú dátum kontroly)
    v poradí, ktoré sa mení každý beh — keby beh nestihol všetko, nabudúce prídu
    na rad iné. V rámci jednej vrstvy sa adresy premiešajú po doménach,
    aby sa jedna doména nenahromadila."""
    def k(u):
        s = stav.get(u)
        if not s:
            vrstva = (0, "")
        elif s.get("k"):
            vrstva = (1, s["k"])
        else:
            vrstva = (2, "")
        return (vrstva, hashlib.md5((dnes + u).encode()).hexdigest())
    vyber = sorted(kluce, key=k)
    if limit:
        vyber = vyber[:limit]
    vrstvy = collections.OrderedDict()
    for u in vyber:
        vrstvy.setdefault(k(u)[0], []).append(u)
    vysledok = []
    for vrstva in vrstvy.values():
        podla_dom = collections.OrderedDict()
        for u in vrstva:
            podla_dom.setdefault(hlavna_domena(urllib.parse.urlsplit(u).hostname), []).append(u)
        rady = list(podla_dom.values())
        while rady:
            for r in rady:
                vysledok.append(r.pop(0))
            rady = [r for r in rady if r]
    return vysledok


def skontroluj_vsetko(adresy, kontrolor, koniec, sucasne, pauza_opakovania):
    vysledky = {}
    zamok = threading.Lock()
    hotovo = [0]
    start = time.monotonic()

    def prac(u, opakovanie=False):
        if time.monotonic() > koniec:
            return
        r = kontrolor.skontroluj(u)
        with zamok:
            if opakovanie:
                r["opakovane"] = True
                prvy = vysledky.get(u)
                # bod 22: keď druhý pokus nevyjde OK, nechá sa horší výsledok
                # (404 z prvého pokusu neprepíše „timeout" z druhého)
                if (prvy and r["v"] != "ok"
                        and ZAVAZNOST[prvy["v"]] > ZAVAZNOST[r["v"]]):
                    r = {**prvy, "opakovane": True}
            vysledky[u] = r
            hotovo[0] += 1
            if hotovo[0] % 250 == 0:
                log(f"  … {hotovo[0]} adries za {int(time.monotonic() - start)} s")

    with cf.ThreadPoolExecutor(sucasne) as ex:
        list(ex.map(prac, adresy))
    nestihnute = [u for u in adresy if u not in vysledky]

    # druhý pokus pre mŕtve, varovania a blokujúce (presťahované netreba — tie odpovedajú)
    zle = [u for u, r in vysledky.items() if r["v"] in ("mrtva", "varovanie", "blokuje")]
    if zle and time.monotonic() + pauza_opakovania < koniec:
        log(f"Druhý pokus pre {len(zle)} adries (po pauze {pauza_opakovania} s)…")
        time.sleep(pauza_opakovania)
        hotovo[0] = 0
        with cf.ThreadPoolExecutor(sucasne) as ex:
            list(ex.map(lambda u: prac(u, True), zle))

    # 🔼 funkčné http:// linky: funguje aj https://? (len návrh do správy, bod 41)
    http_ok = [u for u, r in vysledky.items()
               if r["v"] == "ok" and urllib.parse.urlsplit(u).scheme.lower() == "http"]
    if http_ok and time.monotonic() < koniec:
        log(f"Skúšam https:// pre {len(http_ok)} funkčných http:// adries…")

        def skus_https(u):
            if time.monotonic() > koniec:
                return
            try:
                navrh = kontrolor.https_navrh(u, vysledky[u])
            except Exception as e:          # návrh je len doplnok — beh nesmie spadnúť
                log(f"  https pre {u}: {type(e).__name__} {e}")
                return
            if navrh:
                with zamok:
                    vysledky[u]["https"] = navrh
        with cf.ThreadPoolExecutor(sucasne) as ex:
            list(ex.map(skus_https, http_ok))
    return vysledky, nestihnute


def aktualizuj_stav(stav, vysledky, vsetky_kluce, dnes, vyskyty_podla_kluca):
    """Zapíše výsledky do stavu. Vráti zoznamy nových/opravených.
    Počítadlo „n" (behov po sebe) sa zvýši len pri behu v INOM dni ako posledný
    beh ("k", inak "od") — ručný beh v ten istý deň z podozrivej linky nespraví
    mŕtvu (bod 22). OK linky sa ukladajú len ako {"v": "ok"} (menšie zmeny v gite);
    starý formát (OK aj s n/od/k) sa pri ďalšej kontrole prepíše."""
    nove_mrtve, nove_prest, nove_predane, opravene, podoz_ok = [], [], [], [], 0
    for u, r in vysledky.items():
        stary = stav.get(u)
        bol_mrtvy = bool(stary and stary["v"] == "mrtva" and stary.get("n", 1) >= 2)
        ten_isty = bool(stary and stary["v"] == r["v"]
                        and bool(stary.get("predana")) == bool(r.get("predana")))
        n_stary = stary.get("n", 1) if ten_isty else 0
        if ten_isty:
            posledny = stary.get("k") or stary.get("od")
            n = n_stary + (0 if posledny == dnes else 1)
            od = stary.get("od", dnes)
        else:
            n, od = 1, dnes
        if r["v"] == "ok":
            zaznam = {"v": "ok"}
            if r.get("https"):
                zaznam["https"] = r["https"]      # 🔼 návrh: dá sa prepnúť na https
        else:
            zaznam = {"v": r["v"], "n": n, "od": od, "k": dnes}
            for pole in ("d", "nova", "kam", "kod", "predana"):
                if r.get(pole):
                    zaznam[pole] = r[pole]
        stav[u] = zaznam
        if r["v"] == "mrtva" and n >= 2 and n_stary < 2:
            nove_mrtve.append(u)
        if r["v"] == "prestahovana" and not ten_isty:
            nove_prest.append(u)
        if r.get("predana") and not ten_isty:
            nove_predane.append(u)
        if bol_mrtvy and r["v"] == "ok":
            opravene.append({"url": u, "preco": "už funguje", "bola_od": stary.get("od"),
                             "dovod": stary.get("d", ""),
                             "kde": [(v["id"], v["cesta"]) for v in vyskyty_podla_kluca.get(u, [])]})
        if stary and stary["v"] == "mrtva" and stary.get("n", 1) == 1 and r["v"] == "ok":
            podoz_ok += 1
    # adresy, ktoré z dát zmizli
    for u in [u for u in stav if u not in vsetky_kluce]:
        s = stav.pop(u)
        if s["v"] == "mrtva" and s.get("n", 1) >= 2:
            opravene.append({"url": u, "preco": "zmizla z dát", "bola_od": s.get("od"),
                             "dovod": s.get("d", ""), "kde": []})
    return nove_mrtve, nove_prest, nove_predane, opravene, podoz_ok


def kategoria(z):
    if z["v"] == "mrtva":
        return "mrtva" if z.get("n", 1) >= 2 else "podozriva"
    return z["v"]


# ---------------------------------------------------------------- správa
def riadky_spravy(vyskyty, stav):
    riadky = []
    for v in vyskyty:
        z = stav.get(v["kluc"])
        if not z:
            continue
        riadky.append({**v, "kat": kategoria(z), "z": z})
    riadky.sort(key=lambda r: (r["zorad"], r["cesta"].casefold(), r["url"]))
    return riadky


def esc(t):
    return str(t).replace("|", "\\|").replace("\n", " ")


def napis_md(cesta, riadky, info, opravene, repo_url):
    pocty = collections.Counter(r["kat"] for r in riadky)
    adresy_kat = collections.Counter(kategoria(z) for u, z in info["stav"].items())
    o = []
    o.append("# 🔗 Strážca liniek — týždenná správa\n")
    o.append(f"Posledný beh: **{info['datum']}** · trvanie {info['trvanie']} · "
             f"skontrolovaných adries v tomto behu: {info['skontrolovane']}"
             + (f" · **nestihnuté (dokončí sa ďalší týždeň): {info['nestihnute']}**" if info['nestihnute'] else "")
             + "\n")
    o.append("data.json sa NEMENÍ — opravy robí Miro ručne. Každý riadok = jedna linka v dátach "
             "(rovnaká adresa na viacerých miestach = viac riadkov). Tabuľka pre Excel/Cowork: "
             "[sprava.csv](sprava.csv).\n")
    o.append("| Značka | Význam | Liniek | Adries |\n|---|---|---:|---:|")
    vyzn = {
        "mrtva": "404/410 alebo neexistujúca doména **2 behy po sebe** (v rôznych dňoch) → oprav/zmaž",
        "prestahovana": "presmeruje na inú doménu → zváž novú adresu",
        "podozriva": "404/410/DNS prvýkrát — ďalší týždeň sa potvrdí (alebo nie)",
        "blokuje": "web nepustí robota (401/403/429/454/456/999) — v prehliadači väčšinou funguje; "
                   "len súhrn po doménach",
        "varovanie": "výpadok / timeout / SSL / presmerovanie v slučke / ⚠️ možná predaná doména "
                     "→ over ručne v prehliadači",
        "ok": "funguje",
    }
    for k in ("mrtva", "prestahovana", "podozriva", "blokuje", "varovanie", "ok"):
        o.append(f"| {ZNACKY[k]} {NAZVY[k]} | {vyzn[k]} | {pocty[k]} | {adresy_kat[k]} |")
    o.append("")
    p = info["pocty"]
    o.append(f"Vynechané (nekontrolujú sa): {p['fb_ig_adresa']} liniek na Facebook/Instagram "
             f"v poli url, {p['fb_pole']} ikoniek FB a {p['ig_pole']} ikoniek IG (polia fb/ig), "
             f"{p['nie_web']} prázdnych/nie-webových adries.\n")

    if opravene:
        o.append(f"## ✅ Opravené od minula ({len(opravene)})\n")
        o.append("| Adresa | Čo sa stalo | Bola mŕtva od |\n|---|---|---|")
        for x in opravene:
            o.append(f"| {esc(x['url'])} | {x['preco']} | {x.get('bola_od', '')} |")
        o.append("")

    def sekcia(kat, nadpis, stlpce, riadok, rr=None, uroven="##"):
        if rr is None:
            rr = [r for r in riadky if r["kat"] == kat]
        o.append(f"{uroven} {ZNACKY[kat]} {nadpis} ({len(rr)})\n")
        if not rr:
            o.append("_Žiadne._\n")
            return
        sport = None
        for r in rr:
            if r["sport"] != sport:
                sport = r["sport"]
                n = sum(1 for x in rr if x["sport"] == sport)
                o.append(f"\n{uroven}# {sport} ({n})\n")
                o.append("| " + " | ".join(stlpce) + " |\n|" + "---|" * len(stlpce))
            o.append("| " + " | ".join(esc(x) for x in riadok(r)) + " |")
        o.append("")

    sekcia("mrtva", "MŔTVE", ["ID", "Cesta", "Adresa", "Dôvod", "Od"],
           lambda r: [f"`{r['id']}`", r["cesta"], r["url"], r["z"].get("d", ""), r["z"]["od"]])
    sekcia("prestahovana", "PRESŤAHOVANÉ", ["ID", "Cesta", "Adresa", "Navrhovaná nová adresa", "Od"],
           lambda r: [f"`{r['id']}`", r["cesta"], r["url"], r["z"].get("nova", ""), r["z"]["od"]])
    sekcia("podozriva", "PODOZRIVÉ (zatiaľ 1 beh — netreba hneď opravovať)",
           ["ID", "Cesta", "Adresa", "Dôvod"],
           lambda r: [f"`{r['id']}`", r["cesta"], r["url"], r["z"].get("d", "")])
    # bod 22: blokujúce weby len ako súhrn po hlavných doménach, bez jednotlivých adries
    # (tie sú v sprava.csv)
    bl_adresy = [(u, z) for u, z in info["stav"].items() if z["v"] == "blokuje"]
    domeny = collections.defaultdict(lambda: {"adries": 0, "kody": set()})
    for u, z in bl_adresy:
        x = domeny[hlavna_domena(urllib.parse.urlsplit(u).hostname)]
        x["adries"] += 1
        if z.get("kod"):
            x["kody"].add(z["kod"])
    o.append(f"## {ZNACKY['blokuje']} BLOKUJÚ ROBOTOV ({len(bl_adresy)} adries na "
             f"{len(domeny)} doménach)\n")
    if not bl_adresy:
        o.append("_Žiadne._\n")
    else:
        o.append("Tieto weby nepustia automatickú kontrolu (401/403/429/454/456/999), preto strážca nevie, "
                 "či linka funguje. V prehliadači väčšinou fungujú — netreba ich opravovať. "
                 "Jednotlivé adresy sú v [sprava.csv](sprava.csv).\n")
        o.append("| Doména | Adries | Kód |\n|---|---:|---|")
        for dom, x in sorted(domeny.items(), key=lambda kv: (-kv[1]["adries"], kv[0])):
            o.append(f"| {esc(dom)} | {x['adries']} | {', '.join(map(str, sorted(x['kody'])))} |")
        o.append("")
    # 🔼 http:// linky, ktorých https:// verzia funguje (bod 41) — len návrh
    hs = [r for r in riadky if r["kat"] == "ok" and r["z"].get("https")]
    o.append(f"## {HTTPS_ZNACKA} DÁ SA PREPNÚŤ NA HTTPS ({len(hs)})\n")
    if not hs:
        o.append("_Žiadne._\n")
    else:
        o.append("Linka s http:// funguje, ale funguje aj zabezpečená adresa https:// na tom istom webe. "
                 "Len návrh — data.json sa nemení; ak chceš, adresu v dátach vymeň.\n")
        o.append("| ID | Cesta | Adresa | Navrhovaná adresa |\n|---|---|---|---|")
        for r in hs:
            o.append("| " + " | ".join(esc(x) for x in [f"`{r['id']}`", r["cesta"], r["url"],
                                                          r["z"]["https"]]) + " |")
        o.append("")
    # varovania: najprv možné predané domény (bod 14), potom ostatné podľa športu
    var = [r for r in riadky if r["kat"] == "varovanie"]
    predane = [r for r in var if r["z"].get("predana")]
    o.append(f"## {ZNACKY['varovanie']} VAROVANIA (over ručne) ({len(var)})\n")
    sekcia("varovanie", f"⚠️ {PREDANA}", ["ID", "Cesta", "Adresa", "Kam presmeruje", "Od"],
           lambda r: [f"`{r['id']}`", r["cesta"], r["url"], r["z"].get("kam", ""), r["z"]["od"]],
           rr=predane, uroven="###")
    if predane:
        o.append("Domovská stránka presmeruje na úplne cudziu doménu. Môže to byť nový web klubu, "
                 "ale aj doména, ktorú kúpil niekto iný (reklama, spam). **Novú adresu nenavrhujem** "
                 "— over v prehliadači.\n")
    sekcia("varovanie", "Ostatné varovania", ["ID", "Cesta", "Adresa", "Dôvod", "Od"],
           lambda r: [f"`{r['id']}`", r["cesta"].rsplit(" › ", 1)[-1], r["url"],
                      r["z"].get("d", "") + (f" · **{r['z'].get('n', 1)}× po sebe**"
                                             if r["z"].get("n", 1) >= 3 else ""),
                      r["z"]["od"]],
           rr=[r for r in var if not r["z"].get("predana")], uroven="###")
    with open(cesta, "w", encoding="utf-8") as f:
        f.write("\n".join(o) + "\n")


def napis_csv(cesta, riadky):
    with open(cesta, "w", encoding="utf-8-sig", newline="") as f:
        w = csv.writer(f, delimiter=";")
        w.writerow(["znacka", "kategoria", "id", "sport", "cesta", "adresa", "dovod",
                    "nova_adresa", "od", "behov_po_sebe", "posledna_kontrola"])
        for r in riadky:
            z = r["z"]
            if r["kat"] == "ok":
                if z.get("https"):          # 🔼 návrh na https (bod 41)
                    w.writerow([HTTPS_ZNACKA, "DÁ SA PREPNÚŤ NA HTTPS", r["id"], r["sport"], r["cesta"],
                                r["url"], "funguje aj https://", z["https"], "", "", ""])
                continue
            dovod = z.get("d", "") + (f" → {z['kam']}" if z.get("kam") else "")
            w.writerow([ZNACKY[r["kat"]], NAZVY[r["kat"]], r["id"], r["sport"], r["cesta"], r["url"],
                        dovod, z.get("nova", ""), z.get("od", ""), z.get("n", ""), z.get("k", "")])


def napis_komentar(cesta, riadky, info, nove_mrtve, nove_prest, nove_predane, opravene, odkaz):
    pocty = collections.Counter(r["kat"] for r in riadky)
    blokuje_adries = sum(1 for z in info["stav"].values() if z["v"] == "blokuje")
    nm, npr, npd = set(nove_mrtve), set(nove_prest), set(nove_predane)
    o = [f"## 🔗 Strážca liniek — beh {info['datum']}\n",
         f"🔴 mŕtve: **{pocty['mrtva']}** · 🔵 presťahované: **{pocty['prestahovana']}** · "
         f"🟠 podozrivé: {pocty['podozriva']} · 🚫 blokujú robotov: {blokuje_adries} adries · "
         f"🟡 varovania: {pocty['varovanie']} · ✅ OK: {pocty['ok']}  ",
         f"Nové mŕtve: **{len(nove_mrtve)}** · nové presťahované: **{len(nove_prest)}** · "
         f"možné predané domény: **{len(nove_predane)}** · opravené od minula: **{len(opravene)}**"
         + (f" · nestihnuté adresy (budú ďalší týždeň): {info['nestihnute']}" if info["nestihnute"] else ""),
         f"\n📄 Celá správa: {odkaz}/sprava.md · tabuľka: {odkaz}/sprava.csv\n"]
    zostava = MAX_V_KOMENTARI

    def zoznam(nadpis, rr, stlpec):
        nonlocal zostava
        if not rr:
            return
        o.append(f"### {nadpis} ({len(rr)})\n")
        for r in rr[:max(zostava, 0)]:
            o.append(f"- `{r['id']}` {r['cesta']} — {r['url']} — {stlpec(r)}")
        if len(rr) > zostava:
            o.append(f"- … a ďalších {len(rr) - max(zostava, 0)} v sprava.md")
        zostava -= len(rr)
        o.append("")

    zoznam("🔴 Nové mŕtve", [r for r in riadky if r["kluc"] in nm and r["kat"] == "mrtva"],
           lambda r: r["z"].get("d", ""))
    zoznam("🔵 Nové presťahované", [r for r in riadky if r["kluc"] in npr and r["kat"] == "prestahovana"],
           lambda r: "→ " + r["z"].get("nova", ""))
    zoznam(f"⚠️ Nové: {PREDANA}",
           [r for r in riadky if r["kluc"] in npd and r["z"].get("predana")],
           lambda r: f"presmeruje na {r['z'].get('kam', '')} — novú adresu nenavrhujem")
    if opravene:
        o.append(f"### ✅ Opravené od minula ({len(opravene)})\n")
        for x in opravene[:MAX_V_KOMENTARI]:
            o.append(f"- {x['url']} — {x['preco']}")
        if len(opravene) > MAX_V_KOMENTARI:
            o.append(f"- … a ďalších {len(opravene) - MAX_V_KOMENTARI} v sprava.md")
    text = "\n".join(o) + "\n"
    if len(text) > MAX_ZNAKOV_KOMENTARA:
        text = text[:MAX_ZNAKOV_KOMENTARA] + "\n\n… (skrátené, celé v sprava.md)\n"
    with open(cesta, "w", encoding="utf-8") as f:
        f.write(text)


# ---------------------------------------------------------------- stav
def nacitaj_stav(cesta):
    try:
        with open(cesta, encoding="utf-8") as f:
            return json.load(f)
    except FileNotFoundError:
        return {"adresy": {}}


def uloz_stav(cesta, stav):
    # jedna adresa = jeden riadok → malé a čitateľné zmeny v gite
    adresy = stav["adresy"]
    o = ["{", '"posledny_beh": ' + json.dumps(stav.get("posledny_beh", {}), ensure_ascii=False) + ",",
         '"adresy": {']
    kl = sorted(adresy)
    for i, u in enumerate(kl):
        o.append(json.dumps(u, ensure_ascii=False) + ": "
                 + json.dumps(adresy[u], ensure_ascii=False, sort_keys=True)
                 + ("," if i < len(kl) - 1 else ""))
    o.append("}}")
    tmp = cesta + ".tmp"
    with open(tmp, "w", encoding="utf-8") as f:
        f.write("\n".join(o) + "\n")
    os.replace(tmp, cesta)


# ---------------------------------------------------------------- hlavný program
def main():
    ap = argparse.ArgumentParser(description=__doc__.split("\n")[0])
    ap.add_argument("--data", default="data.json")
    ap.add_argument("--aktualne", default="aktualne.json", help="súbor s Aktuálnymi (ak chýba, berú sa z data.json)")
    ap.add_argument("--dir", default="kontrola-liniek", help="priečinok so stavom a správou")
    ap.add_argument("--limit", type=int, default=0, help="skontroluj len N adries (0 = všetky)")
    ap.add_argument("--cas-min", type=float, default=270, help="časový limit behu v minútach")
    ap.add_argument("--sucasne", type=int, default=20, help="požiadaviek naraz celkovo")
    ap.add_argument("--na-domenu", type=int, default=2, help="požiadaviek naraz na jednu doménu")
    ap.add_argument("--timeout", type=float, default=15)
    ap.add_argument("--pauza", type=float, default=60, help="pauza pred druhým pokusom (s)")
    ap.add_argument("--komentar", help="súbor pre text komentára do Issue (len ak je niečo nové)")
    ap.add_argument("--odkaz", default=os.environ.get("ODKAZ_SPRAVA", "."),
                    help="webová adresa priečinka so správou (do komentára)")
    ap.add_argument("--dnes", help="dátum behu RRRR-MM-DD (len na skúšky)")
    a = ap.parse_args()

    start = time.monotonic()
    koniec = start + a.cas_min * 60
    dnes = a.dnes or dt.date.today().isoformat()
    os.makedirs(a.dir, exist_ok=True)
    cesta_stavu = os.path.join(a.dir, "stav.json")

    vyskyty, pocty = nacitaj_linky(a.data, a.aktualne)
    podla_kluca = collections.defaultdict(list)
    for v in vyskyty:
        podla_kluca[v["kluc"]].append(v)
    stav_cely = nacitaj_stav(cesta_stavu)
    stav = stav_cely.setdefault("adresy", {})
    log(f"Liniek na kontrolu: {len(vyskyty)} (rôznych adries {len(podla_kluca)}); vynechané "
        f"FB/IG adresy {pocty['fb_ig_adresa']}, polia fb {pocty['fb_pole']}, ig {pocty['ig_pole']}")

    poradie = poradie_kontroly(list(podla_kluca), stav, a.limit, dnes)
    log(f"Kontrolujem {len(poradie)} adries (súčasne {a.sucasne}, na doménu {a.na_domenu}, "
        f"timeout {a.timeout:g} s, limit {a.cas_min:g} min)…")
    kontrolor = Kontrolor(timeout=a.timeout, na_domenu=a.na_domenu)
    vysledky, nestihnute = skontroluj_vsetko(poradie, kontrolor, koniec, a.sucasne, a.pauza)

    # pri skúške s limitom nemažeme adresy, ktoré „zmizli" — nič nezmizlo
    nove_mrtve, nove_prest, nove_predane, opravene, podoz_ok = aktualizuj_stav(
        stav, vysledky, set(podla_kluca), dnes, podla_kluca)

    trvanie = int(time.monotonic() - start)
    info = {"datum": dnes, "trvanie": f"{trvanie // 60} min {trvanie % 60} s",
            "skontrolovane": len(vysledky), "nestihnute": len(nestihnute), "pocty": pocty,
            "stav": stav}
    stav_cely["posledny_beh"] = {
        "datum": dnes, "trvanie_s": trvanie, "skontrolovane": len(vysledky),
        "nestihnute": len(nestihnute), "nove_mrtve": len(nove_mrtve),
        "nove_prestahovane": len(nove_prest), "nove_predane": len(nove_predane), "opravene": opravene,
        "podozrive_uz_ok": podoz_ok}
    uloz_stav(cesta_stavu, stav_cely)

    riadky = riadky_spravy(vyskyty, stav)
    napis_md(os.path.join(a.dir, "sprava.md"), riadky, info, opravene, a.odkaz)
    napis_csv(os.path.join(a.dir, "sprava.csv"), riadky)

    k = collections.Counter(kategoria(z) for z in stav.values())
    log(f"\nHOTOVO za {info['trvanie']}. Adresy podľa výsledku: "
        + ", ".join(f"{ZNACKY[x]} {NAZVY[x]} {k[x]}" for x in ZNACKY))
    n_https = sum(1 for z in stav.values() if z.get("https"))
    log(f"{HTTPS_ZNACKA} dá sa prepnúť na https: {n_https} adries")
    log(f"Nové mŕtve {len(nove_mrtve)}, nové presťahované {len(nove_prest)}, "
        f"nové možné predané domény {len(nove_predane)}, opravené {len(opravene)}, "
        f"podozrivé, ktoré už fungujú {podoz_ok}, nestihnuté {len(nestihnute)}")

    if a.komentar:
        if os.path.exists(a.komentar):
            os.remove(a.komentar)
        if nove_mrtve or nove_prest or nove_predane or opravene:
            napis_komentar(a.komentar, riadky, info, nove_mrtve, nove_prest, nove_predane,
                           opravene, a.odkaz)
            log(f"Komentár do Issue pripravený: {a.komentar}")
        else:
            log("Nič nové — komentár do Issue sa nepridá (súbory sa len aktualizujú).")

    if os.environ.get("GITHUB_STEP_SUMMARY"):
        with open(os.environ["GITHUB_STEP_SUMMARY"], "a", encoding="utf-8") as f:
            f.write(f"## 🔗 Strážca liniek {dnes}\n\nTrvanie {info['trvanie']}, skontrolované "
                    f"{len(vysledky)}, nestihnuté {len(nestihnute)}\n\n"
                    + "\n".join(f"- {ZNACKY[x]} {NAZVY[x]}: {k[x]} adries" for x in ZNACKY)
                    + f"\n- {HTTPS_ZNACKA} dá sa prepnúť na https: {n_https} adries"
                    + f"\n\nNové mŕtve {len(nove_mrtve)}, nové presťahované {len(nove_prest)}, "
                      f"opravené {len(opravene)}\n")


if __name__ == "__main__":
    sys.exit(main())
