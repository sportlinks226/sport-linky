#!/usr/bin/env python3 -I
"""Overí, či natvrdo zapísané id/názvy v index.html a generator.py existujú v data.json (LEN ČÍTANIE)."""
import json, re, sys
SK = "/home/user/sport-linky"
d = json.load(open(f"{SK}/data.json", encoding="utf-8"))
by = {n["id"]: n for n in d["nodes"]}
names = {n["name"] for n in d["nodes"] if n.get("type") == "folder"}
html = open(f"{SK}/index.html", encoding="utf-8").read()
gen = open(f"{SK}/generator.py", encoding="utf-8").read()

def ids_in(src, label):
    found = sorted(set(re.findall(r'"(f_[a-z0-9_]+)"', src)) | set(re.findall(r"'(f_[a-z0-9_]+)'", src)))
    print(f"\n== {label}: natvrdo zapísané id priečinkov: {len(found)}")
    for i in found:
        n = by.get(i)
        if not n:
            print(f"  CHÝBA v data.json: {i}")
        else:
            par = by.get(n.get("parentId"))
            print(f"  ok {i:22s} {n.get('name')!r:40s} rodič={par.get('name') if par else None!r} enOnly={n.get('enOnly')} en={n.get('en')} noTileSk={n.get('noTileSk')}")
    return found

a = ids_in(html, "index.html")
b = ids_in(gen, "generator.py")
print("\nlen v index.html:", sorted(set(a) - set(b)))
print("len v generator.py:", sorted(set(b) - set(a)))

# CONTINENTS: názvy
cs = re.search(r"const CONTINENTS_SK = new Set\(\[(.*?)\]\);", html, re.S).group(1)
cs = set(re.findall(r'"([^"]+)"', cs))
cg = re.search(r"CONTINENTS = \{(.*?)\}", gen, re.S).group(1)
cg = set(re.findall(r'"([^"]+)"', cg))
print("\n== CONTINENTS_SK (index.html):", sorted(cs))
print("== CONTINENTS (generator.py):", sorted(cg))
print("len v index.html:", sorted(cs - cg))
print("len v generator.py:", sorted(cg - cs))
for nm in sorted(cs | cg):
    cnt = sum(1 for n in d["nodes"] if n.get("type") == "folder" and n.get("name") == nm)
    print(f"  {nm!r}: {cnt} priečinkov v data.json")

# AKT_SPORTS zhoda index.html / generator.py / test_webu.py
ai = re.search(r"const AKT_SPORTS = \[(.*?)\n\];", html, re.S).group(1)
ai = re.findall(r"\['([^']+)','([^']+)','([^']+)','([^']+)'\]", ai)
ag = re.search(r"AKT_SPORTS = \[(.*?)\n\]", gen, re.S).group(1)
ag = re.findall(r'\("([^"]+)", "([^"]+)", "([^"]+)", "([^"]+)"\)', ag)
print("\n== AKT_SPORTS index:", len(ai), "generator:", len(ag), "zhodné:", ai == ag)
tw = open(f"{SK}/testy/test_webu.py", encoding="utf-8").read()
tn = dict(re.findall(r'"([a-z-]+)": \("([^"]+)", "[^"]+"\)', re.search(r"SPORT_NAZVY = \{(.*?)\n\}", tw, re.S).group(1)))
print("   test_webu SPORT_NAZVY:", len(tn), "chýba oproti appke:", [s[0] for s in ai if s[0] not in tn])

# CSP zhoda
csp_h = re.search(r'<meta http-equiv="Content-Security-Policy" content="([^"]+)"', html).group(1)
csp_g = re.search(r'CSP = \((.*?)\)\nCSP_META', gen, re.S).group(1)
csp_g = "".join(re.findall(r'"([^"]*)"', csp_g))
print("\n== CSP zhodné:", csp_h == csp_g)

# NO_EN_ALPHA, PINNED_EN
for nm in ("NO_EN_ALPHA",):
    hi = set(re.findall(r'"(f_[a-z0-9_]+)"', re.search(rf"const {nm} = new Set\(\[(.*?)\]\)", html, re.S).group(1)))
    gi = set(re.findall(r'"(f_[a-z0-9_]+)"', re.search(rf"{nm} = \{{(.*?)\}}", gen, re.S).group(1)))
    print(f"== {nm} zhodné:", hi == gi, "| index:", sorted(hi), "| gen:", sorted(gi))
print("== PINNED_EN je len v index.html:", "PINNED_EN" not in gen)
