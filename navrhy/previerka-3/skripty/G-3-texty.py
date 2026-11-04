"""G-3: texty (popisy, názvy, name_en) — bod 4 zadania + spresnenie chýbajúcich name_en. Len číta."""
import collections
import os
import re
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from G_common import load, Tree, write_csv  # noqa: E402

d = load()
T = Tree(d)
ns = T.nodes
links = [n for n in ns if n["type"] == "link"]
folders = [n for n in ns if n["type"] == "folder"]


def hidden_en(n):
    return any(p.get("en") is False for p in T.path_nodes(n))


def top(n):
    return T.path_nodes(n)[0].get("name")


# ---------- popisy ----------
rows = collections.defaultdict(list)
lens = collections.Counter()
for n in ns:
    for key in ("desc", "desc_en"):
        v = n.get(key)
        if v is None:
            continue
        s = v.strip()
        p = T.path(n)
        if not s:
            continue
        lens[(key, min(len(s) // 50 * 50, 500))] += 1
        if re.search(r"<[a-zA-Z/!][^>]*>", s):
            rows[f"{key}-html"].append([n["id"], n["type"], p, s[:160]])
        elif "<" in s or ">" in s:
            rows[f"{key}-znak-vacsi-mensi"].append([n["id"], n["type"], p, s[:160]])
        if "  " in s:
            rows[f"{key}-dvojita-medzera"].append([n["id"], n["type"], p, s[:160]])
        if v != s:
            rows[f"{key}-medzera-kraj"].append([n["id"], n["type"], p, repr(v[:80])])
        if len(s) < 20:
            rows[f"{key}-kratky"].append([n["id"], n["type"], p, s])
        if len(s) > 300:
            rows[f"{key}-dlhy"].append([n["id"], n["type"], p, len(s), s[:100]])
        if re.search(r"&(amp|lt|gt|quot|#\d+|nbsp);", s):
            rows[f"{key}-html-entity"].append([n["id"], n["type"], p, s[:160]])
        if re.search(r"https?://|www\.", s):
            rows[f"{key}-url-v-popise"].append([n["id"], n["type"], p, s[:160]])
        if "\n" in s or "\r" in s or "\t" in s:
            rows[f"{key}-novy-riadok"].append([n["id"], n["type"], p, repr(s[:120])])
        if re.search(r"[​‌‍﻿ ]", s):
            rows[f"{key}-neviditelne-znaky"].append([n["id"], n["type"], p, repr(s[:120])])
        if re.search(r"\b(TODO|DOKONTROLOVAŤ|DOPLNIŤ|XXX|\?\?\?|placeholder|lorem)\b", s, re.I):
            rows[f"{key}-todo"].append([n["id"], n["type"], p, s[:160]])
        if key == "desc_en" and re.search(r"[ľťžščýáíéúôäňďŕĺ]", s) and re.search(r"\b(a|v|na|pre|klub|liga|ženy|muži|súťaž|oficiálny|oficiálna|stránka|výsledky|tabuľka)\b", s, re.I):
            rows["desc_en-po-slovensky"].append([n["id"], n["type"], p, s[:160]])
        if key == "desc" and not re.search(r"[ľťžščýáíéúôäňďŕĺ]", s) and re.search(r"\b(the|official|website|club|league|and|with|from|of)\b", s) and not re.search(r"\b(a|v|na|pre|so|je|sú|z|zo)\b", s):
            rows["desc-po-anglicky"].append([n["id"], n["type"], p, s[:160]])
        # popis = názov
        if s.lower() == (n.get("name") or "").strip().lower() or s.lower() == (n.get("name_en") or "").strip().lower():
            rows[f"{key}-rovnaky-ako-nazov"].append([n["id"], n["type"], p, s])

print("Popisy — anomálie:")
for k in sorted(rows):
    print(f"  {k:28} {len(rows[k])}")
    hdr = ["id", "typ", "cesta", "text"] + (["ukazka"] if any(len(r) > 4 for r in rows[k]) else [])
    write_csv(f"popisy-{k}.csv", hdr, [r + [""] * (len(hdr) - len(r)) for r in rows[k]])
print("  dĺžky desc (koš po 50):", sorted((k[1], v) for k, v in lens.items() if k[0] == "desc"))
print("  dĺžky desc_en (koš po 50):", sorted((k[1], v) for k, v in lens.items() if k[0] == "desc_en"))
dl = [len((n.get("desc") or "").strip()) for n in links]
print("  priemerná dĺžka desc liniek:", round(sum(dl) / len(dl), 1), "medián:", sorted(dl)[len(dl) // 2])

# šablónovité začiatky
for key in ("desc", "desc_en"):
    starts = collections.Counter(" ".join((n.get(key) or "").strip().split()[:3]).lower() for n in links if (n.get(key) or "").strip())
    print(f"\n  {key} — najčastejšie prvé 3 slová (top 15):")
    for s, c in starts.most_common(15):
        print(f"     {c:5}  {s}")
    starts5 = collections.Counter(" ".join((n.get(key) or "").strip().split()[:6]).lower() for n in links if (n.get(key) or "").strip())
    print(f"  {key} — najčastejšie prvých 6 slov (top 10):")
    for s, c in starts5.most_common(10):
        print(f"     {c:5}  {s}")
# úplne rovnaké popisy medzi rôznymi linkami
same = collections.defaultdict(list)
for n in links:
    s = (n.get("desc") or "").strip().lower()
    if s:
        same[s].append(n)
dups = {s: v for s, v in same.items() if len(v) > 1}
print(f"\n  rovnaký desc pri viacerých linkách: {len(dups)} textov, {sum(len(v) for v in dups.values())} liniek")
rows_s = []
for s, v in sorted(dups.items(), key=lambda kv: -len(kv[1])):
    for x in v:
        rows_s.append([s[:120], len(v), x["id"], T.path(x)])
write_csv("popisy-rovnake.csv", ["desc", "pocet", "id", "cesta"], rows_s)
for s, v in sorted(dups.items(), key=lambda kv: -len(kv[1]))[:8]:
    print(f"     {len(v):3}  {s[:110]}  (napr. {T.path(v[0])})")

# ---------- name_en: kde chýba a názov je prekladateľný ----------
# slovník: SK názov -> EN názov z uzlov, kde sa líšia (krajiny, kontinenty, pojmy)
trans = {}
for n in ns:
    a = (n.get("name") or "").strip()
    b = (n.get("name_en") or "").strip()
    if a and b and a != b:
        trans.setdefault(a, collections.Counter())[b] += 1
SKW = re.compile(r"\b(\w+(ská|ský|ské|cká|cký|cké|nská|nský)|pohár\w*|ženy|žien|muži|mužov|zväz|federácia|asociácia|konfederácia|výsledky|tabuľk\w*|dnes|"
                 r"reprezentácia|národn\w*|majstrovstvá|súťaž\w*|juniori|mládež|správy|denník|športov\w*|skupina|divízia|"
                 r"oblastn\w*|krajsk\w*|regionáln\w*|východ|západ|sever|juh|stred|ročník|sezóna|zimné|letné|ostatné|médiá|hráči|kluby|"
                 r"Európa|Ázia|Afrika|Amerika|Oceánia|Austrália|Severná|Južná|Stredná|Rakúsko|Poľsko|Maďarsko|Taliansko|Španielsko|Česko|Slovensko|"
                 r"Francúzsko|Anglicko|Holandsko|Belgicko|Švajčiarsko|Švédsko|Nórsko|Dánsko|Fínsko|Grécko|Turecko|Chorvátsko|Nemecko|"
                 r"Srbsko|Rumunsko|Bulharsko|Rusko|Japonsko|Čína|Brazília|Argentína|Kanada|Írsko|Litva|Lotyšsko|Estónsko|Portugalsko)\b", re.I)
miss = []
for n in links:
    if hidden_en(n) or (n.get("name_en") or "").strip():
        continue
    name = (n.get("name") or "").strip()
    why = ""
    if name in trans:
        why = "inde preložené ako: " + ", ".join(f"{k}" for k, _ in trans[name].most_common(2))
    elif SKW.search(name):
        why = "slovenské slovo: " + SKW.search(name).group(0)
    if why:
        miss.append([n["id"], T.path(n), name, n.get("url"), "LIGA" if n.get("order") == -1 else "", why])
print(f"\nLinky bez name_en, kde názov vyzerá prekladateľný (krajina/pojem/slov. slovo): {len(miss)}")
print("  podľa sekcie:", collections.Counter(T.path_nodes(T.by_id[r[0]])[0]["name"] for r in miss).most_common())
print("  z toho linky ligy (order -1):", sum(1 for r in miss if r[4]))
print("  dôvod:", collections.Counter(r[5].split(":")[0] for r in miss))
write_csv("bez-name_en-prekladatelne.csv", ["id", "cesta", "name", "url", "stitok", "dovod"], miss)
for r in miss[:12]:
    print("    ", r[1], "|", r[5])
# priečinky, ktorých name == name_en ale slovo je prekladateľné
fm = []
for n in folders:
    name = (n.get("name") or "").strip()
    if (n.get("name_en") or "").strip() == name and name and (name in trans or SKW.search(name)):
        fm.append([n["id"], T.path(n), name, (f"inde: {list(trans[name])[:2]}" if name in trans else "slovo: " + SKW.search(name).group(0))])
print(f"Priečinky s name_en == name, hoci názov vyzerá slovensky: {len(fm)}")
write_csv("priecinky-name_en-slovenske.csv", ["id", "cesta", "name", "dovod"], fm)
for r in fm[:15]:
    print("    ", r[1], "|", r[3])
# linky s name_en == name a slovenským slovom
lm = []
for n in links:
    name = (n.get("name") or "").strip()
    if (n.get("name_en") or "").strip() == name and name and not hidden_en(n) and (name in trans or SKW.search(name)):
        lm.append([n["id"], T.path(n), name, (f"inde: {list(trans[name])[:2]}" if name in trans else "slovo: " + SKW.search(name).group(0))])
print(f"Linky s name_en == name, hoci názov vyzerá slovensky: {len(lm)}")
write_csv("linky-name_en-slovenske.csv", ["id", "cesta", "name", "dovod"], lm)
for r in lm[:10]:
    print("    ", r[1], "|", r[3])

# nekonzistentné preklady toho istého SK názvu (napr. Severná Amerika -> 2 rôzne EN)
inc = {k: v for k, v in trans.items() if len(v) > 1}
print(f"\nSK názov preložený viacerými spôsobmi: {len(inc)}")
rows_i = [[k, "; ".join(f"{e} ({c})" for e, c in v.most_common())] for k, v in sorted(inc.items(), key=lambda kv: -sum(kv[1].values()))]
write_csv("name_en-nekonzistentne-preklady.csv", ["name", "name_en varianty"], rows_i)
for r in rows_i[:15]:
    print("    ", r)

# ---------- názvy ----------
rows_n = collections.defaultdict(list)
for n in ns:
    for key in ("name", "name_en"):
        v = n.get(key)
        if not v:
            continue
        p = T.path(n)
        if re.search(r"[​‌‍﻿ ]", v):
            rows_n[f"{key}-neviditelne"].append([n["id"], n["type"], p, repr(v)])
        if re.search(r"<[^>]+>|&[a-z]+;", v):
            rows_n[f"{key}-html"].append([n["id"], n["type"], p, v])
        if len(v.strip()) > 70:
            rows_n[f"{key}-dlhy"].append([n["id"], n["type"], p, v])
        if len(v.strip()) < 2:
            rows_n[f"{key}-kratky"].append([n["id"], n["type"], p, v])
        if v.strip() != v.strip().rstrip(".,;:-–") and n["type"] == "link":
            rows_n[f"{key}-interpunkcia-na-konci"].append([n["id"], n["type"], p, v])
        if re.search(r"\((www\.|https?:)", v) or re.search(r"\.(com|sk|cz|net|org)\b", v):
            rows_n[f"{key}-domena-v-nazve"].append([n["id"], n["type"], p, v])
        if v.strip() == v.strip().upper() and len(v.strip()) > 12 and re.search(r"[A-Z]{6,}", v) and " " in v.strip():
            rows_n[f"{key}-vsetko-velke"].append([n["id"], n["type"], p, v])
        if re.search(r"\b(TODO|DOKONTROLOVAŤ|XXX|\?\?)\b", v, re.I):
            rows_n[f"{key}-todo"].append([n["id"], n["type"], p, v])
print("\nNázvy — anomálie:")
for k in sorted(rows_n):
    print(f"  {k:28} {len(rows_n[k])}")
    write_csv(f"nazvy-{k}.csv", ["id", "typ", "cesta", "text"], rows_n[k])

# ---------- štítky LIGA ----------
lig = [n for n in links if n.get("order") == -1]
print("\nŠtítok LIGA (order -1):", len(lig))
# priečinok ligy (má linku order -1) — koľko priečinkov s klubmi (leaf folders s linkami) nemá linku ligy
leaf = [f for f in folders if T.kids(f["id"]) and all(k["type"] == "link" for k in T.kids(f["id"]))]
club_sections = [f for f in leaf if "Kluby" in [p.get("name") for p in T.path_nodes(f)]]
no_liga = [f for f in club_sections if not any(k.get("order") == -1 for k in T.kids(f["id"]))]
print(f"  listové priečinky v sekciách Kluby: {len(club_sections)}; bez linky ligy (order -1): {len(no_liga)}")
print("   podľa sekcie:", collections.Counter(top(f) for f in no_liga).most_common())
write_csv("kluby-bez-linky-ligy.csv", ["id", "cesta", "liniek"], [[f["id"], T.path(f), len(T.kids(f["id"]))] for f in no_liga])
# linky ligy, ktorých názov nesedí s názvom priečinka (hrubo: žiadne spoločné slovo)
def words(s):
    return {w for w in re.findall(r"[a-z0-9]+", (s or "").lower()) if len(w) > 2}
odd = []
for n in lig:
    par = T.by_id.get(n.get("parentId"))
    if par and not (words(n.get("name")) & words(par.get("name"))) and not (words(n.get("name_en")) & words(par.get("name_en"))):
        odd.append([n["id"], T.path(n), par.get("name"), n.get("name"), n.get("url")])
print(f"  linky ligy bez spoločného slova s názvom priečinka (hrubý test): {len(odd)}")
write_csv("linka-ligy-nazov-nesedi.csv", ["id", "cesta", "priecinok", "linka", "url"], odd)
for r in odd[:10]:
    print("    ", r[2], "→", r[3], "|", r[4])
# linky ligy mimo sekcie Kluby
out = [n for n in lig if "Kluby" not in [p.get("name") for p in T.path_nodes(n)]]
print("  linky order -1 mimo Kluby:", len(out), [T.path(n) for n in out][:8])
# linky ligy hosty
print("  hosty liniek ligy:", collections.Counter(re.sub(r"^www\.", "", (re.match(r"https?://([^/]+)", n.get("url") or "") or [None, ""])[1]) for n in lig).most_common(12))
