#!/usr/bin/env python3
"""Malý test strážcu liniek (strazca_liniek.py) — bez internetu.

Spustenie (z koreňa repozitára):
  python testy/test_strazca.py

Overí (previerka 2, body 14 a 22):
  - presmerovanie v slučke → varovanie (nie OK)
  - domovská stránka → cudzia doména → varovanie „možná predaná doména", bez návrhu
  - rovnaké meno s inou koncovkou (dailymail.co.uk → dailymail.com) → presťahovaná s návrhom
  - podstránka na inú doménu → presťahovaná s návrhom
  - 403 → blokuje robotov; 454 a 456 (anti-bot, napr. Akamai) tiež (previerka 3, bod 40)
  - 🔼 funkčná http:// linka, ktorej https:// verzia funguje na tom istom webe (aj s/bez www)
    → návrh „dá sa prepnúť na https" v stav.json, sprava.md a sprava.csv (previerka 3, bod 41)
  - druhý pokus nechá horší výsledok (404 neprepíše timeout), OK prepíše všetko
  - počítadlo „behov po sebe" sa v ten istý deň nezvýši
  - starý formát stav.json sa načíta a celý beh (správa, csv, komentár) prebehne
Na skutočné weby sa nepripája — všetko ide na lokálny server 127.0.0.1.
"""
import http.server
import json
import os
import shutil
import sys
import tempfile
import threading
import unittest

KOREN = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, KOREN)
import strazca_liniek as s  # noqa: E402

os.environ["NO_PROXY"] = os.environ["no_proxy"] = "127.0.0.1,localhost"


class Server(http.server.BaseHTTPRequestHandler):
    def do_GET(self):
        cesta = self.path.split("?")[0]
        if cesta == "/slucka-a":
            self._presmeruj("/slucka-b")
        elif cesta == "/slucka-b":
            self._presmeruj("/slucka-a")
        elif cesta == "/zakazane":
            self._odpoved(403)
        elif cesta in ("/antibot-454", "/antibot-456"):
            self._odpoved(int(cesta[-3:]))
        elif cesta == "/neexistuje":
            self._odpoved(404)
        else:
            self._odpoved(200)

    def _presmeruj(self, kam):
        self.send_response(302)
        self.send_header("Location", kam)
        self.send_header("Content-Length", "0")
        self.end_headers()

    def _odpoved(self, kod):
        self.send_response(kod)
        self.send_header("Content-Type", "text/html")
        self.send_header("Content-Length", "2")
        self.end_headers()
        self.wfile.write(b"ok")

    def log_message(self, *a):
        pass


def setUpModule():
    global SRV, ZAKLAD
    SRV = http.server.ThreadingHTTPServer(("127.0.0.1", 0), Server)
    threading.Thread(target=SRV.serve_forever, daemon=True).start()
    ZAKLAD = f"http://127.0.0.1:{SRV.server_address[1]}"


def tearDownModule():
    SRV.shutdown()
    SRV.server_close()


class Presmerovania(unittest.TestCase):          # bod 14
    def setUp(self):
        self.k = s.Kontrolor(timeout=5, pauza_domena=0)

    def test_slucka_je_varovanie(self):
        r = self.k.skontroluj(ZAKLAD + "/slucka-a")
        self.assertEqual(r["v"], "varovanie")
        self.assertIn("slučke", r["d"])

    def test_funkcna_stranka_je_ok(self):
        self.assertEqual(self.k.skontroluj(ZAKLAD + "/")["v"], "ok")

    def test_403_blokuje(self):
        r = self.k.skontroluj(ZAKLAD + "/zakazane")
        self.assertEqual((r["v"], r["kod"]), ("blokuje", 403))

    def test_454_456_blokuje(self):           # previerka 3, bod 40 (anti-bot kódy)
        for kod in (454, 456):
            r = self.k.skontroluj(ZAKLAD + f"/antibot-{kod}")
            self.assertEqual((r["v"], r["kod"]), ("blokuje", kod))
            self.assertIn("blokuje robotov", r["d"])
            self.assertEqual(s.kategoria(r), "blokuje")
        self.assertIn(454, s.BLOKUJE_KODY)
        self.assertIn(456, s.BLOKUJE_KODY)

    def test_404_mrtva(self):
        self.assertEqual(self.k.skontroluj(ZAKLAD + "/neexistuje")["v"], "mrtva")

    def test_domovska_na_cudziu_domenu(self):
        for url in ("https://gplallameryem.com/", "https://gplallameryem.com",
                    "https://www.klub.sk/index.html"):
            r = s.Kontrolor._podla_kodu(url, 200, "https://www.gethomeinspector.com/")
            self.assertEqual(r["v"], "varovanie", url)
            self.assertTrue(r.get("predana"))
            self.assertNotIn("nova", r)
            self.assertIn("doména mohla byť predaná", r["d"])

    def test_rovnake_meno_ina_koncovka(self):
        r = s.Kontrolor._podla_kodu("https://www.dailymail.co.uk/", 200, "https://www.dailymail.com/")
        self.assertEqual(r["v"], "prestahovana")
        self.assertEqual(r["nova"], "https://www.dailymail.com/")

    def test_podstranka_na_inu_domenu(self):
        r = s.Kontrolor._podla_kodu("https://www.fctables.com/a/b/", 200, "https://www.soccerway.com/")
        self.assertEqual(r["v"], "prestahovana")
        self.assertIn("nova", r)

    def test_domovska_s_dotazom_nie_je_domovska(self):
        r = s.Kontrolor._podla_kodu("https://a.com/?id=5", 200, "https://b.com/")
        self.assertEqual(r["v"], "prestahovana")

    def test_diakritika_v_domene_je_ta_ista_domena(self):
        r = s.Kontrolor._podla_kodu("https://www.peñarol.org", 200, "https://www.xn--pearol-xwa.org/")
        self.assertEqual(r["v"], "ok")


class Https(unittest.TestCase):                  # previerka 3, bod 41
    """Návrh „dá sa prepnúť na https" — falošný kontrolór (bez internetu)."""
    def kontrolor(self, odpovede):
        volane = []

        class Falosny(s.Kontrolor):
            def skontroluj(self, u):
                volane.append(u)
                return dict(odpovede.get(u, {"v": "varovanie", "d": "SSL chyba"}))
        return Falosny(), volane

    def test_presmerovanie_na_https_bez_novej_poziadavky(self):
        k, volane = self.kontrolor({})
        r = {"v": "ok", "konc": "https://klub.sk/a"}
        self.assertEqual(k.https_navrh("http://www.klub.sk/a", r), "https://klub.sk/a")   # s/bez www
        self.assertEqual(volane, [])

    def test_https_funguje(self):
        k, volane = self.kontrolor({"https://www.klub.sk/a?x=1": {"v": "ok", "konc": "https://klub.sk/a?x=1"}})
        self.assertEqual(k.https_navrh("http://www.klub.sk/a?x=1", {"v": "ok", "konc": "http://www.klub.sk/a?x=1"}),
                         "https://www.klub.sk/a?x=1")
        self.assertEqual(volane, ["https://www.klub.sk/a?x=1"])

    def test_bez_navrhu(self):
        k, _ = self.kontrolor({"https://a.sk/": {"v": "ok", "konc": "https://ina-domena.sk/"},
                               "https://b.sk/": {"v": "mrtva"}})
        self.assertIsNone(k.https_navrh("http://a.sk/", {"v": "ok"}))       # https ide na cudzí web
        self.assertIsNone(k.https_navrh("http://b.sk/", {"v": "ok"}))       # https nefunguje
        self.assertIsNone(k.https_navrh("http://c.sk/", {"v": "ok"}))       # SSL chyba
        self.assertIsNone(k.https_navrh("http://d.sk/", {"v": "varovanie"}))  # http linka sama nefunguje
        self.assertIsNone(k.https_navrh("https://e.sk/", {"v": "ok"}))      # už je https

    def test_beh_stav_a_sprava(self):
        k, _ = self.kontrolor({"http://klub.sk/": {"v": "ok", "konc": "http://klub.sk/"},
                               "https://klub.sk/": {"v": "ok", "konc": "https://www.klub.sk/"}})
        vys, _ = s.skontroluj_vsetko(["http://klub.sk/"], k, float("inf"), 2, 0)
        self.assertEqual(vys["http://klub.sk/"]["https"], "https://klub.sk/")
        stav = {}
        s.aktualizuj_stav(stav, vys, {"http://klub.sk/"}, "2026-11-09", {})
        self.assertEqual(stav["http://klub.sk/"], {"v": "ok", "https": "https://klub.sk/"})
        self.assertEqual(s.kategoria(stav["http://klub.sk/"]), "ok")
        d = tempfile.mkdtemp()
        try:
            riadky = [{"id": "x1", "url": "http://klub.sk/", "kluc": "http://klub.sk/", "sport": "Futbal",
                       "cesta": "Futbal › Klub", "zorad": [(0, "")], "kat": "ok", "z": stav["http://klub.sk/"]}]
            info = {"datum": "2026-11-09", "trvanie": "0 min 1 s", "skontrolovane": 1, "nestihnute": 0,
                    "pocty": {"fb_ig_adresa": 0, "fb_pole": 0, "ig_pole": 0, "nie_web": 0}, "stav": stav}
            s.napis_md(os.path.join(d, "sprava.md"), riadky, info, [], ".")
            s.napis_csv(os.path.join(d, "sprava.csv"), riadky)
            md = open(os.path.join(d, "sprava.md"), encoding="utf-8").read()
            self.assertIn("🔼 DÁ SA PREPNÚŤ NA HTTPS (1)", md)
            self.assertIn("| `x1` | Futbal › Klub | http://klub.sk/ | https://klub.sk/ |", md)
            csv = open(os.path.join(d, "sprava.csv"), encoding="utf-8-sig").read()
            self.assertIn("🔼;DÁ SA PREPNÚŤ NA HTTPS;x1;", csv)
        finally:
            shutil.rmtree(d)


class DruhyPokus(unittest.TestCase):             # bod 22c
    def beh(self, prvy, druhy):
        odpovede = {}

        class Falosny:
            def skontroluj(self, u):
                odpovede[u] = odpovede.get(u, 0) + 1
                return dict(prvy if odpovede[u] == 1 else druhy)
        vys, _ = s.skontroluj_vsetko(["http://x.sk/"], Falosny(), float("inf"), 2, 0)
        return vys["http://x.sk/"]["v"]

    def test_404_neprepise_timeout(self):
        self.assertEqual(self.beh({"v": "mrtva"}, {"v": "varovanie"}), "mrtva")

    def test_ok_prepise_vsetko(self):
        self.assertEqual(self.beh({"v": "mrtva"}, {"v": "ok"}), "ok")

    def test_horsi_druhy_pokus_sa_berie(self):
        self.assertEqual(self.beh({"v": "varovanie"}, {"v": "mrtva"}), "mrtva")
        self.assertEqual(self.beh({"v": "varovanie"}, {"v": "blokuje"}), "blokuje")


class Pocitadlo(unittest.TestCase):              # bod 22b, 22d
    def zapis(self, stav, v, dnes):
        r = {"v": v, "d": "x"}
        vys = s.aktualizuj_stav(stav, {"u": r}, {"u"}, dnes, {"u": []})
        return vys[0], dict(stav["u"])

    def test_ten_isty_den_nezvysi(self):
        stav = {}
        self.assertEqual(self.zapis(stav, "mrtva", "2026-11-09")[1]["n"], 1)
        nove, z = self.zapis(stav, "mrtva", "2026-11-09")      # ručný beh v ten istý deň
        self.assertEqual((nove, z["n"]), ([], 1))
        nove, z = self.zapis(stav, "mrtva", "2026-11-16")      # o týždeň
        self.assertEqual((nove, z["n"]), (["u"], 2))
        self.assertEqual(s.kategoria(z), "mrtva")
        nove, z = self.zapis(stav, "mrtva", "2026-11-16")      # znova v ten istý deň
        self.assertEqual((nove, z["n"]), ([], 2))              # nie je „nová mŕtva" druhýkrát

    def test_ok_sa_uklada_kratko(self):
        stav = {"u": {"k": "2026-11-03", "n": 1, "od": "2026-11-03", "v": "ok"}}   # starý formát
        self.assertEqual(self.zapis(stav, "ok", "2026-11-09")[1], {"v": "ok"})

    def test_stary_format_bez_k(self):
        stav = {"u": {"v": "mrtva", "od": "2026-11-02"}}
        self.assertEqual(self.zapis(stav, "mrtva", "2026-11-09")[1]["n"], 2)


class CelyBeh(unittest.TestCase):                # starý stav.json + správa
    def test_stary_stav_a_sprava(self):
        d = tempfile.mkdtemp()
        try:
            data = {"nodes": [
                {"id": "r", "name": "Futbal", "type": "folder"},
                {"id": "a", "name": "Slučka", "type": "link", "parentId": "r", "url": ZAKLAD + "/slucka-a"},
                {"id": "b", "name": "Zakázané", "type": "link", "parentId": "r", "url": ZAKLAD + "/zakazane"},
                {"id": "c", "name": "OK", "type": "link", "parentId": "r", "url": ZAKLAD + "/"},
                {"id": "e", "name": "Mŕtva", "type": "link", "parentId": "r", "url": ZAKLAD + "/neexistuje"},
                {"id": "f", "name": "Akamai", "type": "link", "parentId": "r", "url": ZAKLAD + "/antibot-454"},
            ], "banners": []}
            with open(os.path.join(d, "data.json"), "w", encoding="utf-8") as f:
                json.dump(data, f)
            # starý formát (do 3. 11. 2026): OK s k/n/od, varovanie 403 bez kódu
            stary = {"posledny_beh": {"datum": "2026-11-03"}, "adresy": {
                ZAKLAD + "/": {"k": "2026-11-03", "n": 1, "od": "2026-11-03", "v": "ok"},
                ZAKLAD + "/zakazane": {"d": "HTTP 403 – prístup zamietnutý", "k": "2026-11-03",
                                       "n": 1, "od": "2026-11-03", "v": "varovanie"},
                ZAKLAD + "/neexistuje": {"d": "HTTP 404", "k": "2026-11-03", "n": 1,
                                         "od": "2026-11-03", "v": "mrtva"},
            }}
            with open(os.path.join(d, "stav.json"), "w", encoding="utf-8") as f:
                json.dump(stary, f)
            argv = sys.argv
            sys.argv = ["strazca", "--data", os.path.join(d, "data.json"),
                        "--aktualne", os.path.join(d, "nie.json"), "--dir", d, "--pauza", "0",
                        "--dnes", "2026-11-09", "--komentar", os.path.join(d, "k.md")]
            try:
                s.main()
            finally:
                sys.argv = argv
            st = json.load(open(os.path.join(d, "stav.json"), encoding="utf-8"))["adresy"]
            self.assertEqual(st[ZAKLAD + "/"], {"v": "ok"})
            self.assertEqual(st[ZAKLAD + "/zakazane"]["v"], "blokuje")
            self.assertEqual(st[ZAKLAD + "/slucka-a"]["v"], "varovanie")
            self.assertEqual(s.kategoria(st[ZAKLAD + "/neexistuje"]), "mrtva")
            md = open(os.path.join(d, "sprava.md"), encoding="utf-8").read()
            self.assertEqual(st[ZAKLAD + "/antibot-454"]["v"], "blokuje")
            self.assertIn("BLOKUJÚ ROBOTOV (2 adries na 1 doménach)", md)
            self.assertIn("| 127.0.0.1 | 2 | 403, 454 |", md)
            self.assertIn("🔼 DÁ SA PREPNÚŤ NA HTTPS (0)", md)     # 127.0.0.1 https nemá — bez návrhu
            self.assertNotIn("https", json.dumps(st[ZAKLAD + "/"]))
            self.assertNotIn(ZAKLAD + "/zakazane", md)       # v md len súhrn, nie adresa
            self.assertIn("možná predaná doména", md)
            csv = open(os.path.join(d, "sprava.csv"), encoding="utf-8-sig").read()
            self.assertIn(ZAKLAD + "/zakazane", csv)         # v csv adresa je
            k = open(os.path.join(d, "k.md"), encoding="utf-8").read()
            self.assertIn("🚫 blokujú robotov: 2 adries", k)
            self.assertIn("Nové mŕtve", k)
        finally:
            shutil.rmtree(d)


if __name__ == "__main__":
    unittest.main(verbosity=2)
