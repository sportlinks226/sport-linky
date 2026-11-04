#!/usr/bin/env python3
"""Odolnosť generator.py voči zlým dátam. Pre každý prípad vyrobí dočasný priečinok
s kópiou generator.py, index.html, vlajky.py, upravenou kópiou data.json a aktualne.json,
spustí generátor a zapíše: návratový kód, traceback / varovania a kontrolu výstupu.
NIČ v repozitári nemení. Použitie: python3 B-odolnost.py <sk-src> <pracovny-priecinok>
"""
import copy, json, os, shutil, subprocess, sys, re, glob

SRC, WORK = sys.argv[1], sys.argv[2]
os.makedirs(WORK, exist_ok=True)
DATA = json.load(open(os.path.join(SRC, "data.json"), encoding="utf-8"))
AKT = json.load(open(os.path.join(SRC, "aktualne.json"), encoding="utf-8"))
by_id = {n["id"]: n for n in DATA["nodes"]}
# vzorový hlboký priečinok s linkami: hokej/kluby/usa/nhl
NHL = next(n for n in DATA["nodes"] if n.get("type") == "folder" and n.get("name") == "NHL")
NHL_LINK = next(n for n in DATA["nodes"] if n.get("type") == "link" and n.get("parentId") == NHL["id"])
print("vzorový priečinok:", NHL["id"], NHL["name"], "| vzorová linka:", NHL_LINK["id"], NHL_LINK["name"])


def case(name, mut_data=None, mut_akt=None, raw_akt=None, no_akt=False, check=None):
    d = os.path.join(WORK, re.sub(r"[^a-z0-9]+", "-", name.lower()))
    shutil.rmtree(d, ignore_errors=True)
    os.makedirs(d)
    for f in ("generator.py", "index.html", "vlajky.py", "favicon.ico", "apple-touch-icon.png", "og-image.png"):
        if os.path.exists(os.path.join(SRC, f)):
            shutil.copy(os.path.join(SRC, f), d)
    data = copy.deepcopy(DATA)
    if mut_data:
        mut_data(data)
    json.dump(data, open(os.path.join(d, "data.json"), "w", encoding="utf-8"), ensure_ascii=False)
    if raw_akt is not None:
        open(os.path.join(d, "aktualne.json"), "w", encoding="utf-8").write(raw_akt)
    elif not no_akt:
        akt = copy.deepcopy(AKT)
        if mut_akt:
            mut_akt(akt)
        json.dump(akt, open(os.path.join(d, "aktualne.json"), "w", encoding="utf-8"), ensure_ascii=False)
    r = subprocess.run([sys.executable, "generator.py", "--out", "_site"], cwd=d, capture_output=True, text=True,
                       env={**os.environ, "BASE_URL": "https://sportlinky.sk", "SITE_LANG": "sk"}, timeout=300)
    tb = r.stderr.strip().splitlines()
    last = tb[-1] if tb else ""
    warn = [l for l in r.stdout.splitlines() if "UPOZORNENIE" in l or "CHYBA" in l]
    status = "PADOL" if r.returncode else "prešiel"
    extra = ""
    if check and r.returncode == 0:
        try:
            extra = check(os.path.join(d, "_site"))
        except Exception as e:
            extra = f"kontrola zlyhala: {e!r}"
    print(f"\n### {name}\n  výsledok: {status} (kód {r.returncode})")
    if last:
        print("  stderr:", last[:300])
        if "Traceback" in r.stderr:
            fr = [l for l in tb if "generator.py" in l]
            print("  miesto:", fr[-1].strip() if fr else "?")
    for w in warn[:4]:
        print("  varovanie:", w[:200])
    if extra:
        print("  výstup:", extra)


def nhl_html(site):
    p = glob.glob(os.path.join(site, "hokej", "kluby", "*", "nhl", "index.html"))
    return open(p[0], encoding="utf-8").read() if p else ""


# ---------- prípady ----------
def m_no_name(data):
    by = {n["id"]: n for n in data["nodes"]}
    del by[NHL["id"]]["name"]
case("linka a priecinok bez name", m_no_name, check=lambda s: "H1 NHL stránky: " + re.search(r"<h1>(.*?)</h1>", nhl_html(s)).group(1)[:80] + " | cesta: " + ",".join(glob.glob(os.path.join(s, "hokej/kluby/*/*/"))[:0]) + str([os.path.basename(os.path.dirname(x)) for x in glob.glob(os.path.join(s, "hokej/kluby/*/*/index.html")) if "nhl" in x or "kat-" in x]))

def m_no_name_link(data):
    by = {n["id"]: n for n in data["nodes"]}
    del by[NHL_LINK["id"]]["name"]
case("linka bez name", m_no_name_link, check=lambda s: ("prázdny názov karty: " + str('<div class="nm"></div>' in nhl_html(s) or '<div class="nm"> </div>' in nhl_html(s))))

def m_no_url(data):
    by = {n["id"]: n for n in data["nodes"]}
    del by[NHL_LINK["id"]]["url"]
case("linka bez url", m_no_url, check=lambda s: "karta s href=\"#\": " + str('href="#"' in nhl_html(s)))

def m_no_parent(data):
    by = {n["id"]: n for n in data["nodes"]}
    del by[NHL["id"]]["parentId"]
case("priecinok bez parentId (stane sa korenovym)", m_no_parent, check=lambda s: "NHL ako koreňová stránka: " + str(os.path.exists(os.path.join(s, "nhl", "index.html"))) + " | na domove dlaždica NHL: " + str('href="/nhl/"' in open(os.path.join(s, "index.html"), encoding="utf-8").read()))

def m_orphan(data):
    by = {n["id"]: n for n in data["nodes"]}
    by[NHL["id"]]["parentId"] = "f_neexistuje"
case("osirely uzol (parent neexistuje)", m_orphan, check=lambda s: "NHL stránka existuje: " + str(bool(glob.glob(os.path.join(s, "**", "nhl", "index.html"), recursive=True))) + " (linky v nej sú potichu mimo webu)")

def m_cycle(data):
    by = {n["id"]: n for n in data["nodes"]}
    parent = by[NHL["parentId"]]
    by[NHL["id"]]["parentId"] = parent["id"]
    parent["parentId"] = NHL["id"]   # cyklus NHL <-> rodič
case("cyklus parentId (A->B->A)", m_cycle)

def m_dup_slug(data):
    by = {n["id"]: n for n in data["nodes"]}
    sib = [n for n in data["nodes"] if n.get("type") == "folder" and n.get("parentId") == NHL["parentId"] and n["id"] != NHL["id"]][0]
    sib["slug"] = by[NHL["id"]].get("slug") or "nhl"
    sib["name"] = "NHL"
case("duplicitne slugy surodencov", m_dup_slug, check=lambda s: "priečinky so slugom nhl*: " + str(sorted(os.path.basename(os.path.dirname(x)) for x in glob.glob(os.path.join(s, "hokej/kluby/*/nhl*/index.html")))) + " | _slugFix v data.json: " + str(json.load(open(os.path.join(s, "data.json"), encoding="utf-8")).get("_slugFix")))

def m_script_name(data):
    by = {n["id"]: n for n in data["nodes"]}
    by[NHL_LINK["id"]]["name"] = 'Zlý </script><script>alert(1)</script> "x" \'y\' <b>'
    by[NHL_LINK["id"]]["desc"] = 'Popis </script><img src=x onerror=alert(2)>'
    by[NHL["id"]]["name"] = 'NHL </script> "q"'
def c_script(s):
    h = nhl_html(s)
    raw_script = "<script>alert(1)</script>" in h or "onerror=alert" in h
    # pageBoot: JSON v <script type=application/json> — nesmie obsahovať "</"
    pb = re.search(r'<script type="application/json" id="pageBoot">(.*?)</script>', h, re.S).group(1)
    ld = re.search(r'<script type="application/ld\+json">(.*?)</script>', h, re.S).group(1)
    t = re.search(r"<title>(.*?)</title>", h).group(1)
    return (f"neescapovaný skript v HTML: {raw_script} | '</' v pageBoot: {'</' in pb} | '</' v JSON-LD: {'</' in ld} "
            f"| title: {t[:60]} | h1 obsahuje &lt;/script&gt;: {'&lt;/script&gt;' in h}")
case("nazov s </script>, uvodzovkami a apostrofom", m_script_name, check=c_script)

def m_js_url(data):
    by = {n["id"]: n for n in data["nodes"]}
    by[NHL_LINK["id"]]["url"] = "javascript:alert(1)"
    by[NHL_LINK["id"]]["fb"] = "javascript:alert(2)"
def c_js(s):
    h = nhl_html(s)
    return f"javascript: v href: {'href=\"javascript:' in h} | javascript: kdekoľvek v HTML (pageBoot JSON): {'javascript:' in h} | data.json obsahuje javascript: {('javascript:alert' in open(os.path.join(s,'data.json'),encoding='utf-8').read())}"
case("url javascript:", m_js_url, check=c_js)

def m_long(data):
    by = {n["id"]: n for n in data["nodes"]}
    by[NHL["id"]]["name"] = "Veľmi dlhý názov " * 40
    by[NHL["id"]]["slug"] = ""
def c_long(s):
    p = glob.glob(os.path.join(s, "hokej/kluby/*/velmi-dlhy*/index.html"))
    if not p:
        return "stránka s dlhým slugom nevznikla"
    h = open(p[0], encoding="utf-8").read()
    return f"dĺžka slugu: {len(os.path.basename(os.path.dirname(p[0])))} | dĺžka title: {len(re.search(r'<title>(.*?)</title>', h).group(1))}"
case("velmi dlhy nazov (680 znakov) bez slugu", m_long, check=c_long)

case("prazdne nodes", lambda d: d.update(nodes=[]), check=lambda s: "index.html: " + str(os.path.exists(os.path.join(s, "index.html"))) + " | sitemap adries: " + str(open(os.path.join(s, "sitemap.xml"), encoding="utf-8").read().count("<url>")) + " | titulok: " + re.search(r"<title>(.*?)</title>", open(os.path.join(s, "index.html"), encoding="utf-8").read()).group(1))
case("nodes chyba uplne", lambda d: d.pop("nodes"))
case("nevalidny aktualne.json (useknuty)", raw_akt='{"version": 3, "items": [{"id": "x"', check=lambda s: "aktualne.json na webe: " + str(os.path.exists(os.path.join(s, "aktualne.json"))) + " | lišta na domove: " + str(open(os.path.join(s, "index.html"), encoding="utf-8").read().count('class="akt-card"')) + " kariet")
case("aktualne.json bez items", raw_akt='{"version": 3}', check=lambda s: "aktualne.json na webe: " + str(os.path.exists(os.path.join(s, "aktualne.json"))))
case("aktualne.json je pole", raw_akt='[]')
def m_akt_text(a):
    a["items"][0]["addedAt"] = "včera"
    a["items"][0]["order"] = "prvý"
    a["items"][0]["startsAt"] = "2026-13-45"
    a["items"][1]["endsAt"] = 20261231
    a["items"].append("nie slovník")
    a["items"].append({"name": "bez url"})
case("aktualne: addedAt text, order text, zly datum, endsAt cislo, polozka nie slovnik", mut_akt=m_akt_text, check=lambda s: "kariet na domove: " + str(open(os.path.join(s, "index.html"), encoding="utf-8").read().count('class="akt-card"')))
case("bez aktualne.json (fallback na data.json)", no_akt=True, check=lambda s: "aktualne.json na webe: " + str(os.path.exists(os.path.join(s, "aktualne.json"))) + " | kariet na domove: " + str(open(os.path.join(s, "index.html"), encoding="utf-8").read().count('class="akt-card"')))
case("chyba bannerSettings a banners", lambda d: (d.pop("bannerSettings", None), d.pop("banners", None)))
case("banners nie je zoznam", lambda d: d.update(banners="x", promos=None, promoBanner="y"))
case("version chyba", lambda d: d.pop("version"), check=lambda s: "version.txt: " + repr(open(os.path.join(s, "version.txt")).read()) + " | data.json?v= v stránke: " + str(re.search(r'data\.json(\?v=[^"]*)?"', nhl_html(s)).group(0)))
def m_type(data):
    by = {n["id"]: n for n in data["nodes"]}
    del by[NHL_LINK["id"]]["type"]
case("uzol bez type", m_type)
def m_order(data):
    by = {n["id"]: n for n in data["nodes"]}
    by[NHL_LINK["id"]]["order"] = "abc"
case("order ako text", m_order)
def m_icon(data):
    by = {n["id"]: n for n in data["nodes"]}
    by[NHL["id"]]["icon"] = "../../etc"
    by[NHL_LINK["id"]]["icon"] = '"><img src=x>'
case("icon so znakmi cesty a HTML", m_icon, check=lambda s: "surový <img src=x> v HTML: " + str('<img src=x>' in nhl_html(s)) + " | vlajka ../: " + str('vlajky/24x18/../' in nhl_html(s)))
def m_dup_id(data):
    n2 = copy.deepcopy(NHL_LINK)
    data["nodes"].append(n2)
case("duplicitne id uzla", m_dup_id, check=lambda s: "počet kariet v NHL: " + str(nhl_html(s).count('class="card"')))
def m_folder_empty_name_slug(data):
    by = {n["id"]: n for n in data["nodes"]}
    by[NHL["id"]]["name"] = "???"
    by[NHL["id"]]["slug"] = ""
case("nazov len z otaznikov bez slugu (slugify -> prazdne)", m_folder_empty_name_slug, check=lambda s: "priečinky: " + str([os.path.basename(os.path.dirname(x)) for x in glob.glob(os.path.join(s, "hokej/kluby/*/kat-*/index.html"))]))
