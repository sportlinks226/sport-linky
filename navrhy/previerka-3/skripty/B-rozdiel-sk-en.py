#!/usr/bin/env python3
"""Prečo sa líši počet stránok (1545 vs 1544) a liniek (14842 vs 14830) SK ↔ EN.
Používa funkcie z generator.py (kópia v scratchpad/build/sk-src), data.json len číta.
Použitie: cd <sk-src> && python3 B-rozdiel-sk-en.py
"""
import importlib, json, os, sys, collections
sys.path.insert(0, os.getcwd())
os.environ.setdefault("SITE_LANG", "sk")
import generator as G

data = G.load_data("data.json")
nodes = data["nodes"]
by_id = {n["id"]: n for n in nodes}
res = {}
for lang in ("sk", "en"):
    ch, _ = G.build_tree(nodes, lang)
    lcnt = G.link_counts(ch)
    paths = G.folder_paths(ch, lang)
    live = G.live_on(by_id, lang)
    has = {fid: c > 0 for fid, c in lcnt.items()}
    if live:
        has[G.LIVE_ID] = True
    pub = {fid: p for fid, p in paths.items() if has.get(fid)}
    nlinks = sum(1 for fid in pub if fid != G.LIVE_ID for k in ch.get(fid, []) if k.get("type") == "link")
    res[lang] = dict(ch=ch, paths=paths, pub=pub, nlinks=nlinks, lcnt=lcnt)
    print(f"[{lang}] priečinkov so stránkou {len(pub)} (všetkých priečinkov v strome {len(paths)}), liniek {nlinks}")

def nm(fid, lang):
    n = by_id[fid]
    chain = []
    while n is not None:
        chain.append(G.node_name(n, lang))
        n = by_id.get(n.get("parentId"))
    return " › ".join(reversed(chain))

sk, en = res["sk"], res["en"]
print("\nPriečinky so stránkou LEN na SK:")
for fid in sk["pub"]:
    if fid not in en["pub"]:
        n = by_id[fid]
        print("  ", fid, nm(fid, "sk"), "| en:", n.get("en"), "enOnly:", n.get("enOnly"), "| linky v podstrome SK:", sk["lcnt"].get(fid), "EN:", en["lcnt"].get(fid, "—"), "| cesta SK:", "/".join(sk["pub"][fid]))
print("Priečinky so stránkou LEN na EN:")
for fid in en["pub"]:
    if fid not in sk["pub"]:
        n = by_id[fid]
        print("  ", fid, nm(fid, "en"), "| en:", n.get("en"), "enOnly:", n.get("enOnly"), "| cesta EN:", "/".join(en["pub"][fid]))

print("\nLinky rátané na SK a nie na EN (a naopak):")
sk_links = {k["id"] for fid in sk["pub"] if fid != G.LIVE_ID for k in sk["ch"].get(fid, []) if k.get("type") == "link"}
en_links = {k["id"] for fid in en["pub"] if fid != G.LIVE_ID for k in en["ch"].get(fid, []) if k.get("type") == "link"}
for lid in sorted(sk_links - en_links):
    n = by_id[lid]
    print("  len SK:", lid, nm(lid, "sk"), "| en:", n.get("en"), "| rodič en:", by_id[n["parentId"]].get("en"))
for lid in sorted(en_links - sk_links):
    n = by_id[lid]
    print("  len EN:", lid, nm(lid, "en"), "| enOnly:", n.get("enOnly"))

# uzly en:false / enOnly v dátach vôbec
print("\nuzlov s en:false:", sum(1 for n in nodes if n.get("en") is False),
      "| enOnly:true:", sum(1 for n in nodes if n.get("enOnly") is True),
      "| noTileSk:", sum(1 for n in nodes if n.get("noTileSk") is True))
# prázdne priečinky (bez stránky)
emp_sk = [fid for fid in sk["paths"] if fid not in sk["pub"]]
print("prázdne priečinky bez stránky SK:", len(emp_sk), "| ich rodičia so stránkou:",
      sum(1 for fid in emp_sk if by_id[fid].get("parentId") in sk["pub"]),
      "| koreňové:", [nm(f, "sk") for f in emp_sk if by_id[f].get("parentId") is None])
depth = collections.Counter(len(sk["paths"][f]) for f in emp_sk)
print("  hĺbka prázdnych:", sorted(depth.items()))
print("  príklady:", [nm(f, "sk") for f in emp_sk[:8]])

# slugy súrodencov s -2
print("\nSLUG_FIX (duplicitné slugy súrodencov) SK:", {f: p[-1] for f, p in sk["paths"].items() if p[-1] != G.slug_base(by_id[f], "sk")})
print("SLUG_FIX EN:", {f: p[-1] for f, p in en["paths"].items() if p[-1] != G.slug_base(by_id[f], "en")})

# radenie EN: Python lower() vs localeCompare — kde sa líši poradie krajín
# (generator: node_name.lower(); appka: localeCompare('en') + PINNED_EN)
PINNED_EN = {"f_bas_klu_eu_esp","f_bas_klu_eu_ger","f_bas_klu_eu_ita","f_bas_klu_eu_fra","f_bas_klu_az_chn","f_bas_klu_az_jpn","f_bas_klu_az_kor","f_bas_klu_az_tpe","f_bas_klu_az_idn","f_had_deu","f_had_fra","f_had_esp","f_had_dnk","f_had_nor","f_had_swe","f_had_cze","f_had_svk","f_had_hun","f_had_rou","f_had_rus","f_had_jpn","f_had_kor","f_had_bra","f_had_arg"}
CONT_APP = G.CONTINENTS | {"Južná a Stredná Amerika (SCAHC)", "Severná Amerika a Karibik (NACHC)"}
diff_order = 0
examples = []
import unicodedata
def loc_key(s):
    # približne localeCompare('en'): bez diakritiky, bez ohľadu na veľkosť písmen
    return "".join(c for c in unicodedata.normalize("NFD", s) if not unicodedata.combining(c)).lower()
for pid, kids in en["ch"].items():
    p = by_id.get(pid)
    if p is None or pid in G.NO_EN_ALPHA:
        continue
    gen_order = [k["id"] for k in kids]  # poradie generátora
    if p.get("name") in CONT_APP:
        base = sorted(kids, key=lambda x: x.get("order_en", x.get("order", 0)))
        pinned = [k for k in base if k["id"] in PINNED_EN]
        rest = sorted([k for k in base if k["id"] not in PINNED_EN], key=lambda k: loc_key(G.node_name(k, "en")))
        app_order = [k["id"] for k in pinned + rest]
    else:
        app_order = [k["id"] for k in sorted(kids, key=lambda x: x.get("order_en", x.get("order", 0)))]
    if app_order != gen_order:
        diff_order += 1
        if len(examples) < 6:
            ga = [G.node_name(by_id[i], "en") for i in gen_order[:6]]
            aa = [G.node_name(by_id[i], "en") for i in app_order[:6]]
            examples.append((nm(pid, "en"), "GEN:" + ", ".join(ga), "APP:" + ", ".join(aa)))
print(f"\nEN: priečinkov, kde sa poradie detí v statike líši od appky (odhad podľa localeCompare + PINNED_EN): {diff_order}")
for e in examples:
    print("  ", e[0]); print("     ", e[1]); print("     ", e[2])
