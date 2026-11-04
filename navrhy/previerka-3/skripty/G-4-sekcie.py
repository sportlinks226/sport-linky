"""G-4: počty liniek podľa sekcie / kontinentu / krajiny (bod 5). Len číta."""
import collections
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from G_common import load, Tree, write_csv  # noqa: E402

d = load()
T = Tree(d)
memo = {}
folders = [n for n in T.nodes if n["type"] == "folder"]
links = [n for n in T.nodes if n["type"] == "link"]

print("Linky podľa sekcie (koreň):")
rows = []
for r in T.kids(None):
    c = T.link_count(r["id"], memo)
    f = sum(1 for n in folders if T.path_nodes(n)[0]["id"] == r["id"])
    rows.append([r["name"], r.get("name_en"), c, f])
    print(f"  {r['name']:18} liniek={c:6}  priečinkov={f}")
write_csv("sekcie-pocty.csv", ["sekcia", "name_en", "liniek", "priecinkov"], rows)

print("\nÚroveň 2 (sekcia › podsekcia):")
rows = []
for r in T.kids(None):
    for k in T.kids(r["id"]):
        if k["type"] == "folder":
            c = T.link_count(k["id"], memo)
            rows.append([T.path(k), c, sum(1 for x in T.kids(k["id"]) if x["type"] == "folder")])
            print(f"  {T.path(k):60} {c:6}")
write_csv("podsekcie-pocty.csv", ["cesta", "liniek", "podpriecinkov"], rows)

# kontinenty = priečinky úrovne 3 s názvom kontinentu, krajiny = ich deti-priečinky
CONT = ("Európa", "Ázia", "Afrika", "Amerika", "Oceánia", "Globálne", "Karibik")
rows_c, rows_k = [], []
for n in folders:
    pn = T.path_nodes(n)
    if len(pn) == 3 and any(c in n["name"] for c in CONT):
        rows_c.append([T.path(n), T.link_count(n["id"], memo), sum(1 for x in T.kids(n["id"]) if x["type"] == "folder")])
        for k in T.kids(n["id"]):
            if k["type"] == "folder":
                kc = T.link_count(k["id"], memo)
                subs = [x for x in T.kids(k["id"]) if x["type"] == "folder"]
                direct_links = [x for x in T.kids(k["id"]) if x["type"] == "link"]
                liga = sum(1 for x in T.nodes if x["type"] == "link" and x.get("order") == -1 and T.by_id.get(x.get("parentId")) and k["id"] in [p["id"] for p in T.path_nodes(x)])
                rows_k.append([T.path(k), k.get("name_en", ""), k["id"], kc, len(subs), len(direct_links), liga, k.get("icon", "")])
rows_c.sort(key=lambda r: -r[1])
rows_k.sort(key=lambda r: -r[3])
write_csv("kontinenty-pocty.csv", ["cesta", "liniek", "krajin_priecinkov"], rows_c)
write_csv("krajiny-pocty.csv", ["cesta", "name_en", "id", "liniek", "podpriecinkov", "priamych_liniek", "liniek_ligy", "icon"], rows_k)
print("\nKontinenty (top 15):")
for r in rows_c[:15]:
    print(f"  {r[0]:65} {r[1]:5}  krajín={r[2]}")
print("\nKrajiny TOP 20:")
for r in rows_k[:20]:
    print(f"  {r[0]:70} {r[3]:5}")
tail = [r for r in rows_k if r[3] <= 2]
print(f"\nKrajiny s 0–2 linkami: {len(tail)} z {len(rows_k)}")
print("  podľa sekcie:", collections.Counter(r[0].split(" › ")[0] for r in tail).most_common())
print("  s 0 linkami:", sum(1 for r in tail if r[3] == 0), " s 1:", sum(1 for r in tail if r[3] == 1), " s 2:", sum(1 for r in tail if r[3] == 2))
for r in [x for x in tail if x[3] > 0][:20]:
    print(f"    {r[0]:70} {r[3]}")
write_csv("krajiny-chvost.csv", ["cesta", "name_en", "id", "liniek", "podpriecinkov", "priamych_liniek", "liniek_ligy", "icon"], tail)

# krajina, ktorá má podpriečinok ligy s LEN linkou ligy (žiadne kluby)
only_liga = []
for n in folders:
    kids = T.kids(n["id"])
    lk = [x for x in kids if x["type"] == "link"]
    if lk and all(x.get("order") == -1 for x in lk) and not any(x["type"] == "folder" for x in kids):
        only_liga.append([n["id"], T.path(n), len(lk)])
print(f"\nPriečinky, kde je LEN linka ligy a žiadny klub: {len(only_liga)}")
print("  podľa sekcie:", collections.Counter(r[1].split(" › ")[0] for r in only_liga).most_common())
for r in only_liga[:15]:
    print("   ", r[1])
write_csv("liga-bez-klubov.csv", ["id", "cesta", "liniek_ligy"], only_liga)

# priečinky s 1 linkou (zbytočná úroveň?)
one = [[n["id"], T.path(n), T.kids(n["id"])[0].get("name")] for n in folders if len(T.kids(n["id"])) == 1 and T.kids(n["id"])[0]["type"] == "link"]
print(f"\nPriečinky s jedinou linkou: {len(one)}")
print("  podľa sekcie:", collections.Counter(r[1].split(" › ")[0] for r in one).most_common())
write_csv("priecinky-jedna-linka.csv", ["id", "cesta", "linka"], one)
for r in one[:12]:
    print("   ", r[1], "→", r[2])
# priečinky s jedným podpriečinkom (a nič iné)
one_f = [[n["id"], T.path(n), T.kids(n["id"])[0].get("name")] for n in folders if len(T.kids(n["id"])) == 1 and T.kids(n["id"])[0]["type"] == "folder"]
print(f"Priečinky s jediným podpriečinkom a ničím iným: {len(one_f)}")
write_csv("priecinky-jeden-podpriecinok.csv", ["id", "cesta", "podpriecinok"], one_f)
for r in one_f[:12]:
    print("   ", r[1], "→", r[2])

# najväčšie priečinky (listové) — veľa liniek na jednej stránke
big = sorted(((len([x for x in T.kids(n["id"]) if x["type"] == "link"]), T.path(n)) for n in folders), reverse=True)[:15]
print("\nNajviac priamych liniek v jednom priečinku:")
for c, p in big:
    print(f"  {c:5}  {p}")

# zmiešané priečinky (linky aj podpriečinky)
mixed = [n for n in folders if any(x["type"] == "link" for x in T.kids(n["id"])) and any(x["type"] == "folder" for x in T.kids(n["id"]))]
print(f"\nPriečinky s linkami AJ podpriečinkami: {len(mixed)}")
print("  podľa sekcie:", collections.Counter(T.path_nodes(n)[0]["name"] for n in mixed).most_common())
write_csv("priecinky-zmiesane.csv", ["id", "cesta", "liniek", "podpriecinkov"],
          [[n["id"], T.path(n), sum(1 for x in T.kids(n["id"]) if x["type"] == "link"), sum(1 for x in T.kids(n["id"]) if x["type"] == "folder")] for n in mixed])

# ikony: priečinky krajín bez ikony vlajky
import re
noflag = [[n["id"], T.path(n)] for n in folders if len(T.path_nodes(n)) == 4 and any(c in T.path_nodes(n)[2]["name"] for c in CONT) and not re.fullmatch(r"[a-z]{2}(-[a-z]+)?", n.get("icon") or "")]
print(f"\nPriečinky krajín (úroveň 4 pod kontinentom) bez kódu vlajky v icon: {len(noflag)}")
for r in noflag[:15]:
    print("   ", r[1], T.by_id[r[0]].get("icon"))
write_csv("krajiny-bez-vlajky.csv", ["id", "cesta"], noflag)
# ikony vlajok, ktoré nie sú známe ISO kódy (porovnanie s vlajky.py ak sa dá)
try:
    src = open("/home/user/sport-linky/vlajky.py", encoding="utf-8").read()
    codes = set(re.findall(r"[\"']([a-z]{2}(?:-[a-z]+)?)[\"']", src))
    used = collections.Counter(n.get("icon") for n in T.nodes if re.fullmatch(r"[a-z]{2}(-[a-z]+)?", n.get("icon") or ""))
    unknown = {k: v for k, v in used.items() if k not in codes}
    print("kódy vlajok v dátach, ktoré vlajky.py nepozná:", unknown)
except OSError:
    pass
