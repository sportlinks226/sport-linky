"""G-2: kontrola URL v data.json (bod 3 zadania). Len číta."""
import collections
import os
import re
import sys
from urllib.parse import urlsplit, parse_qsl, urlunsplit, urlencode

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from G_common import load, Tree, write_csv  # noqa: E402

d = load()
T = Tree(d)
links = [n for n in T.nodes if n.get("type") == "link"]
print("liniek:", len(links))

TRACK = {"utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "utm_id", "fbclid", "gclid",
         "mc_cid", "mc_eid", "ref", "ref_src", "igshid", "igsh", "_ga", "yclid", "msclkid"}


def host_of(u):
    try:
        return (urlsplit(u.strip()).hostname or "").lower()
    except ValueError:
        return ""


def norm(u):
    """Normalizácia: bez schémy, bez www., bez koncovej lomky, bez utm/fbclid, bez fragmentu, malé písmená hosta."""
    u = u.strip()
    try:
        p = urlsplit(u)
    except ValueError:
        return u.lower()
    host = (p.hostname or "").lower()
    if host.startswith("www."):
        host = host[4:]
    if host.startswith("m.") and ("facebook" in host or "instagram" in host):
        host = host[2:]
    path = re.sub(r"/+$", "", p.path) or ""
    path = re.sub(r"/index\.(html?|php)$", "", path)
    q = [(k, v) for k, v in parse_qsl(p.query, keep_blank_values=True) if k.lower() not in TRACK]
    qs = urlencode(sorted(q))
    return host + path + ("?" + qs if qs else "")


def host_base(h):
    """Hlavná doména (bez subdomén) — zjednodušene posledné 2 (alebo 3 pri co.uk a pod.) časti."""
    parts = h.split(".")
    if len(parts) >= 3 and parts[-2] in ("co", "com", "org", "net", "gov", "ac", "edu", "or", "ne") and len(parts[-1]) == 2:
        return ".".join(parts[-3:])
    return ".".join(parts[-2:])


def top(n):
    return T.path_nodes(n)[0].get("name")


# ---------- základné anomálie ----------
rows = collections.defaultdict(list)
for n in links:
    u = (n.get("url") or "").strip()
    raw = n.get("url") or ""
    p = T.path(n)
    try:
        sp = urlsplit(u)
    except ValueError:
        rows["nevalidne"].append([n["id"], p, raw]); continue
    scheme = sp.scheme.lower()
    if raw != u:
        rows["medzera-kraj"].append([n["id"], p, repr(raw)])
    if " " in u or "\t" in u or "\n" in u:
        rows["medzera-vnutri"].append([n["id"], p, repr(raw)])
    if scheme in ("mailto", "tel", "javascript"):
        rows["mailto-tel-js"].append([n["id"], p, raw]); continue
    if scheme not in ("http", "https"):
        rows["nevalidne"].append([n["id"], p, raw]); continue
    if not sp.hostname or "." not in sp.hostname:
        rows["nevalidne"].append([n["id"], p, raw]); continue
    if scheme == "http":
        rows["http"].append([n["id"], p, raw])
    if re.fullmatch(r"\d+\.\d+\.\d+\.\d+", sp.hostname or ""):
        rows["ip"].append([n["id"], p, raw])
    try:
        if sp.port:
            rows["port"].append([n["id"], p, raw])
    except ValueError:
        rows["nevalidne"].append([n["id"], p, raw])
    if sp.fragment or u.endswith("#"):
        rows["fragment"].append([n["id"], p, raw])
    qk = {k.lower() for k, _ in parse_qsl(sp.query, keep_blank_values=True)}
    if qk & TRACK:
        rows["utm"].append([n["id"], p, raw, ",".join(sorted(qk & TRACK))])
    h = sp.hostname.lower()
    if re.search(r"(^|\.)(bit\.ly|t\.co|tinyurl\.com|goo\.gl|ow\.ly|is\.gd|buff\.ly|cutt\.ly|rb\.gy|shorturl\.at|tiny\.cc|lnk\.to|linktr\.ee|bio\.link|linkin\.bio|beacons\.ai|lnk\.bio|s\.id)$", h):
        rows["skracovac"].append([n["id"], p, raw])
    if re.search(r"(^|\.)(facebook\.com|fb\.com|fb\.me)$", h):
        rows["url-facebook"].append([n["id"], p, raw, n.get("fb", "")])
    if re.search(r"(^|\.)instagram\.com$", h):
        rows["url-instagram"].append([n["id"], p, raw, n.get("ig", "")])
    if re.search(r"(^|\.)(twitter\.com|x\.com|youtube\.com|youtu\.be|tiktok\.com|threads\.net|vk\.com|t\.me|telegram\.me|whatsapp\.com|wa\.me)$", h):
        rows["url-ina-socialna-siet"].append([n["id"], p, raw])
    if re.search(r"(^|\.)(wikipedia\.org|wikiwand\.com)$", h):
        rows["url-wikipedia"].append([n["id"], p, raw])
    if re.search(r"[A-Z]", sp.netloc):
        rows["host-velke-pismena"].append([n["id"], p, raw])
    if re.search(r"https?://[^/]*https?://", u) or "//" in sp.path:
        rows["dvojita-lomka-alebo-schema"].append([n["id"], p, raw])
    if "xn--" in h:
        rows["punycode"].append([n["id"], p, raw])
    if re.search(r"[^\x00-\x7f]", u):
        rows["non-ascii"].append([n["id"], p, raw])
    if re.search(r"(^|\.)(google\.[a-z.]+|bing\.com|duckduckgo\.com)$", h) and ("search" in sp.path or sp.query):
        rows["vyhladavac"].append([n["id"], p, raw])
    if re.search(r"(^|\.)(web\.archive\.org|archive\.org|archive\.ph|archive\.today)$", h):
        rows["archiv"].append([n["id"], p, raw])
    if re.search(r"(^|\.)(localhost|example\.com|test\.com)$", h) or h.endswith(".local"):
        rows["placeholder"].append([n["id"], p, raw])
    if h.endswith(".pdf") or sp.path.lower().endswith(".pdf"):
        rows["pdf"].append([n["id"], p, raw])
    if re.search(r"/(login|signin|sign-in|prihlasenie|register)\b", sp.path.lower()):
        rows["login-stranka"].append([n["id"], p, raw])

# fb / ig polia
for n in links:
    for key, pat in (("fb", r"(^|\.)(facebook\.com|fb\.com|fb\.me)$"), ("ig", r"(^|\.)instagram\.com$")):
        v = n.get(key)
        if not v:
            continue
        v = str(v)
        h = host_of(v)
        if not v.lower().startswith(("http://", "https://")) or not h:
            rows[f"{key}-nevalidne"].append([n["id"], T.path(n), v])
        elif not re.search(pat, h):
            rows[f"{key}-ina-domena"].append([n["id"], T.path(n), v])
        elif v.startswith("http://"):
            rows[f"{key}-http"].append([n["id"], T.path(n), v])
        if v.strip() != v or " " in v.strip():
            rows[f"{key}-medzera"].append([n["id"], T.path(n), repr(v)])
    # fb == url / ig == url
    if n.get("fb") and n["fb"].strip().rstrip("/").lower() == (n.get("url") or "").strip().rstrip("/").lower():
        rows["fb-rovnake-ako-url"].append([n["id"], T.path(n), n["url"]])
    if n.get("ig") and n["ig"].strip().rstrip("/").lower() == (n.get("url") or "").strip().rstrip("/").lower():
        rows["ig-rovnake-ako-url"].append([n["id"], T.path(n), n["url"]])
    # fb pole obsahuje profile.php / groups / posts (nestabilné)
    if n.get("fb") and re.search(r"/(posts|photos|videos|events)/|/groups/|profile\.php|story\.php|/permalink", n["fb"]):
        rows["fb-nie-profil"].append([n["id"], T.path(n), n["fb"]])
    if n.get("ig") and re.search(r"/(p|reel|reels|stories|explore)/", n["ig"]):
        rows["ig-nie-profil"].append([n["id"], T.path(n), n["ig"]])

print("\nAnomálie URL (počty):")
for k in sorted(rows):
    print(f"  {k:30} {len(rows[k])}")
    hdr = ["id", "cesta", "url"] + (["extra"] if any(len(r) > 3 for r in rows[k]) else [])
    write_csv(f"url-{k}.csv", hdr, [r + [""] * (len(hdr) - len(r)) for r in rows[k]])

# fb/ig a url facebook sekcie
print("  url-facebook podľa sekcie:", collections.Counter(top(T.by_id[r[0]]) for r in rows["url-facebook"]).most_common())
print("  url-facebook s vyplneným aj fb poľom:", sum(1 for r in rows["url-facebook"] if r[3]))
print("  http podľa sekcie:", collections.Counter(top(T.by_id[r[0]]) for r in rows["http"]).most_common())
fb_http_hosts = collections.Counter(host_of(r[2]) for r in rows["http"])
print("  http top hosty:", fb_http_hosts.most_common(10))
print("  fb-ina-domena ukážka:", [r[2] for r in rows["fb-ina-domena"]][:8])
print("  ig-ina-domena ukážka:", [r[2] for r in rows["ig-ina-domena"]][:8])

# ---------- duplicity ----------
exact = collections.defaultdict(list)
normd = collections.defaultdict(list)
for n in links:
    u = (n.get("url") or "").strip()
    exact[u].append(n)
    normd[norm(u)].append(n)
dup_exact = {u: v for u, v in exact.items() if len(v) > 1}
dup_norm = {u: v for u, v in normd.items() if len(v) > 1}
print(f"\nDuplicitné URL presne: {len(dup_exact)} URL, {sum(len(v) for v in dup_exact.values())} liniek")
print(f"Duplicitné URL po normalizácii: {len(dup_norm)} URL, {sum(len(v) for v in dup_norm.values())} liniek")
# len tie, ktoré pribudli normalizáciou
only_norm = {u: v for u, v in dup_norm.items() if len({(x.get('url') or '').strip() for x in v}) > 1}
print(f"  z toho duplicity LEN po normalizácii (rôzny zápis, rovnaká adresa): {len(only_norm)}")
rows_d = []
for u, v in sorted(dup_norm.items(), key=lambda kv: -len(kv[1])):
    secs = collections.Counter(top(x) for x in v)
    same_parent = len({x.get("parentId") for x in v}) < len(v)
    same_name = len({(x.get("name") or "").strip().lower() for x in v}) == 1
    for x in v:
        rows_d.append([u, len(v), x["id"], T.path(x), x.get("url"), "/".join(f"{k}:{c}" for k, c in secs.items()),
                       "áno" if same_parent else "", "áno" if same_name else ""])
write_csv("duplicitne-url.csv", ["url_norm", "pocet", "id", "cesta", "url", "sekcie", "rovnaky_priecinok", "rovnaky_nazov"], rows_d)
# ten istý priečinok (naozajstná chyba)
same_parent_dups = [(u, v) for u, v in dup_norm.items() if len({x.get("parentId") for x in v}) < len(v)]
print(f"  duplicity v TOM ISTOM priečinku (istá chyba): {len(same_parent_dups)} URL")
rows_sp = []
for u, v in same_parent_dups:
    c = collections.Counter(x.get("parentId") for x in v)
    for x in v:
        if c[x.get("parentId")] > 1:
            rows_sp.append([u, x["id"], T.path(x), x.get("url"), x.get("name")])
write_csv("duplicitne-url-rovnaky-priecinok.csv", ["url_norm", "id", "cesta", "url", "name"], rows_sp)
# rovnaká sekcia (šport) ale iný priečinok
same_sport = [(u, v) for u, v in dup_norm.items() if len({top(x) for x in v}) < len(v) and (u, v) not in same_parent_dups]
cross_sport = [(u, v) for u, v in dup_norm.items() if len({top(x) for x in v}) == len(v)]
print(f"  duplicity v rovnakej sekcii (iný priečinok): {len(same_sport)} | len naprieč sekciami: {len(cross_sport)}")
print("\nTOP 30 duplicitných URL (po normalizácii):")
for u, v in sorted(dup_norm.items(), key=lambda kv: -len(kv[1]))[:30]:
    secs = collections.Counter(top(x) for x in v)
    folders = collections.Counter(" › ".join(p.get("name") for p in T.path_nodes(x)[:-1]) for x in v)
    print(f"  {len(v):3}  {u}  | sekcie: {dict(secs)} | priečinky: {len(folders)} napr. {list(folders)[:2]}")

# ---------- hosty vo viacerých priečinkoch ----------
host_nodes = collections.defaultdict(list)
for n in links:
    h = host_of(n.get("url") or "")
    if h.startswith("www."):
        h = h[4:]
    host_nodes[h].append(n)
rows_h = []
for h, v in host_nodes.items():
    parents = {x.get("parentId") for x in v}
    secs = collections.Counter(top(x) for x in v)
    rows_h.append([h, len(v), len(parents), len(secs), "/".join(f"{k}:{c}" for k, c in secs.most_common())])
rows_h.sort(key=lambda r: -r[1])
write_csv("hosty-pocty.csv", ["host", "liniek", "priecinkov", "sekcii", "sekcie"], rows_h)
print("\nTOP 30 hostov podľa počtu liniek (host, liniek, priečinkov, sekcií):")
for r in rows_h[:30]:
    print("  ", r)
multi = [r for r in rows_h if r[2] > 1]
print(f"hostov s linkami vo viacerých priečinkoch: {len(multi)} z {len(rows_h)} hostov")

# ---------- tretie strany ----------
THIRD = ["wikipedia.org", "youtube.com", "flashscore", "sofascore.com", "soccerway.com", "transfermarkt",
         "eurobasket.com", "volleybox.net", "eliteprospects.com", "livesport", "fotmob.com", "besoccer.com",
         "espn.com", "google.com", "scoreboard.com", "footballdatabase", "globalsportsarchive", "realgm.com",
         "proballers.com", "basketball-reference", "hockeydb.com", "handball-planet", "worldfootball.net",
         "cbf.com.br", "thefinalball", "futbol24", "zerozero", "ogol.com.br", "playmakerstats.com", "fifa.com",
         "uefa.com", "olympics.com", "lequipe.fr", "facebook.com", "instagram.com", "x.com", "twitter.com",
         "tiktok.com", "linktr.ee", "scoresway", "aiscore", "365scores", "livescore", "goal.com", "onefootball.com",
         "footystats", "soccer24", "tipsport", "nike.sk", "fortuna", "bet365"]
tp = collections.defaultdict(lambda: collections.Counter())
for n in links:
    h = host_of(n.get("url") or "")
    for t in THIRD:
        if t in h:
            tp[t][top(n)] += 1
            break
print("\nTretie strany (host → sekcie):")
rows_t = []
for t, c in sorted(tp.items(), key=lambda kv: -sum(kv[1].values())):
    print(f"  {t:22} {sum(c.values()):5}  {dict(c.most_common())}")
    rows_t.append([t, sum(c.values()), "/".join(f"{k}:{v}" for k, v in c.most_common())])
write_csv("tretie-strany.csv", ["domena", "liniek", "sekcie"], rows_t)
# zoznam všetkých liniek na tretie strany flashscore/sofascore/wikipedia/youtube s cestou
rows_t2 = []
for n in links:
    h = host_of(n.get("url") or "")
    for t in ("wikipedia.org", "youtube.com", "flashscore", "sofascore.com", "soccerway.com", "transfermarkt", "eurobasket.com", "volleybox.net", "eliteprospects.com", "livesport", "fotmob", "besoccer", "google."):
        if t in h:
            rows_t2.append([t, n["id"], T.path(n), n.get("url"), "LIGA" if n.get("order") == -1 else ""])
            break
write_csv("tretie-strany-linky.csv", ["domena", "id", "cesta", "url", "stitok"], rows_t2)
# tretie strany pri klubových linkách (nie order -1) — to je fallback
fb_clubs = collections.Counter(r[0] for r in rows_t2 if not r[4])
print("  tretie strany pri bežných linkách (nie linka ligy):", dict(fb_clubs))

# ---------- Tipovanie: domény mimo tipsport ----------
tip = [n for n in links if top(n) == "Tipovanie"]
th = collections.Counter(host_base(host_of(n.get("url") or "")) for n in tip)
print("\nTipovanie — hosty:", th.most_common())
write_csv("tipovanie-hosty.csv", ["id", "cesta", "url"], [[n["id"], T.path(n), n.get("url")] for n in tip if "tipsport" not in host_of(n.get("url") or "")])

# ---------- sekcia vs. doména TLD vs. krajina (hrubý test: krajina v ceste, TLD nesedí) ----------
CC = {"Slovensko": "sk", "Česko": "cz", "Nemecko": "de", "Rakúsko": "at", "Poľsko": "pl", "Maďarsko": "hu", "Taliansko": "it",
      "Španielsko": "es", "Francúzsko": "fr", "Anglicko": "uk", "Škótsko": "uk", "Holandsko": "nl", "Belgicko": "be",
      "Portugalsko": "pt", "Švajčiarsko": "ch", "Švédsko": "se", "Nórsko": "no", "Dánsko": "dk", "Fínsko": "fi",
      "Grécko": "gr", "Turecko": "tr", "Chorvátsko": "hr", "Srbsko": "rs", "Slovinsko": "si", "Rumunsko": "ro",
      "Bulharsko": "bg", "Ukrajina": "ua", "Rusko": "ru", "Japonsko": "jp", "Čína": "cn", "Brazília": "br", "Argentína": "ar",
      "Austrália": "au", "Kanada": "ca", "Island": "is", "Írsko": "ie", "Litva": "lt", "Lotyšsko": "lv", "Estónsko": "ee"}
mism = []
for n in links:
    pn = T.path_nodes(n)
    country = next((p.get("name") for p in pn if p.get("name") in CC), None)
    if not country:
        continue
    h = host_of(n.get("url") or "")
    tld = h.rsplit(".", 1)[-1] if "." in h else ""
    other = {v for k, v in CC.items() if k != country and v != CC[country]}
    if tld in other and tld not in ("com", "org", "net"):
        mism.append([n["id"], T.path(n), n.get("url"), country, tld])
print(f"\nLinky s TLD inej krajiny než priečinok (hrubý test, len info): {len(mism)}")
cm = collections.Counter((r[3], r[4]) for r in mism)
print("  top:", cm.most_common(12))
write_csv("tld-ina-krajina.csv", ["id", "cesta", "url", "krajina", "tld"], mism)
