"""G-1: štruktúra data.json + integrita stromu (body 1 a 2 zadania). Len číta."""
import collections
import os
import sys
import re

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from G_common import load, Tree, slugify, write_csv  # noqa: E402

d = load()
T = Tree(d)
ns = T.nodes
print("version:", d.get("version"), "| uzlov:", len(ns))

# ---------- 1. štruktúra ----------
types = collections.Counter(n.get("type") for n in ns)
print("typy:", dict(types))
keys = collections.Counter()
keys_by_type = {t: collections.Counter() for t in types}
valtypes = collections.defaultdict(collections.Counter)
empty = collections.Counter()
for n in ns:
    for k, v in n.items():
        keys[k] += 1
        keys_by_type[n.get("type")][k] += 1
        valtypes[k][type(v).__name__] += 1
        if v is None or v == "" or v == [] or v == {}:
            empty[k] += 1
print("\nKľúče (počet, podľa typu uzla, typy hodnôt, prázdne):")
for k, c in keys.most_common():
    print(f"  {k:12} {c:6}  folder={keys_by_type['folder'][k]:5} link={keys_by_type['link'][k]:5}  "
          f"typy={dict(valtypes[k])}  prázdne/null={empty[k]}")

KNOWN = {"id", "parentId", "type", "name", "name_en", "desc", "desc_en", "slug", "slug_en",
         "order", "order_en", "icon", "url", "fb", "ig", "tag", "en", "enOnly", "noTileSk"}
unexpected = [(k, c) for k, c in keys.items() if k not in KNOWN]
print("\nNeočakávané kľúče:", unexpected)
rows = []
for n in ns:
    for k in n:
        if k not in KNOWN:
            rows.append([n.get("id"), n.get("type"), T.path(n), k, str(n[k])[:80]])
write_csv("neocakavane-kluce.csv", ["id", "typ", "cesta", "kluc", "hodnota"], rows)

# order nie číslo
bad_order = [[n["id"], n.get("type"), T.path(n), repr(n.get("order"))] for n in ns
             if not isinstance(n.get("order"), (int, float)) or isinstance(n.get("order"), bool)]
print("order nie je číslo:", len(bad_order))
write_csv("order-nie-cislo.csv", ["id", "typ", "cesta", "order"], bad_order)
bad_order_en = [[n["id"], n.get("type"), T.path(n), repr(n.get("order_en"))] for n in ns
                if "order_en" in n and not isinstance(n.get("order_en"), (int, float))]
print("order_en nie je číslo:", len(bad_order_en))
# order float
print("order float:", sum(1 for n in ns if isinstance(n.get("order"), float)))
# hodnoty tag
print("tag hodnoty:", collections.Counter(n.get("tag") for n in ns if "tag" in n))
print("en hodnoty:", collections.Counter(repr(n.get("en")) for n in ns if "en" in n))
print("enOnly hodnoty:", collections.Counter(repr(n.get("enOnly")) for n in ns if "enOnly" in n))
print("noTileSk hodnoty:", collections.Counter(repr(n.get("noTileSk")) for n in ns if "noTileSk" in n))
print("type iný než folder/link:", [n["id"] for n in ns if n.get("type") not in ("folder", "link")])
# link s poľom, ktoré patrí priečinku a naopak
print("link s slug:", sum(1 for n in ns if n.get("type") == "link" and "slug" in n))
print("link s slug_en:", sum(1 for n in ns if n.get("type") == "link" and "slug_en" in n))
print("folder s url:", sum(1 for n in ns if n.get("type") == "folder" and n.get("url")))
print("folder s fb/ig:", sum(1 for n in ns if n.get("type") == "folder" and (n.get("fb") or n.get("ig"))))
print("folder bez slug:", sum(1 for n in ns if n.get("type") == "folder" and not n.get("slug")))
print("folder bez slug_en:", sum(1 for n in ns if n.get("type") == "folder" and not n.get("slug_en")))
# duplicitné id
idc = collections.Counter(n.get("id") for n in ns)
dup_ids = [k for k, c in idc.items() if c > 1]
print("duplicitné id:", len(dup_ids), dup_ids[:10])
print("uzly bez id:", sum(1 for n in ns if not n.get("id")))
# id formát
idpat = collections.Counter(re.sub(r"[0-9]+", "#", n.get("id", ""))[:14] for n in ns)
print("vzory id (top 10):", idpat.most_common(10))

# ---------- 2. integrita ----------
ids = set(T.by_id)
orphans = [n for n in ns if n.get("parentId") is not None and n.get("parentId") not in ids]
print("\nOsirelé uzly (parent neexistuje):", len(orphans))
write_csv("osirele.csv", ["id", "typ", "name", "parentId"],
          [[n["id"], n.get("type"), n.get("name"), n.get("parentId")] for n in orphans])
# link ako parent
link_parents = [n for n in ns if n.get("parentId") in ids and T.by_id[n["parentId"]].get("type") == "link"]
print("uzly, ktorých rodič je linka:", len(link_parents))
# cykly
cycles = []
for n in ns:
    seen = set()
    cur = n
    while cur is not None:
        if cur["id"] in seen:
            cycles.append(n["id"])
            break
        seen.add(cur["id"])
        cur = T.by_id.get(cur.get("parentId")) if cur.get("parentId") is not None else None
print("uzly v cykle:", len(cycles))
# hĺbka
depth = collections.Counter(T.depth(n) for n in ns)
print("hĺbka (histogram):", dict(sorted(depth.items())))
depth_f = collections.Counter(T.depth(n) for n in ns if n.get("type") == "folder")
depth_l = collections.Counter(T.depth(n) for n in ns if n.get("type") == "link")
print("  priečinky:", dict(sorted(depth_f.items())), " linky:", dict(sorted(depth_l.items())))
deepest = sorted(ns, key=T.depth, reverse=True)[:5]
for n in deepest:
    print("  najhlbšie:", T.depth(n), T.path(n))
# koreň
roots = [n for n in ns if n.get("parentId") is None]
print("koreňové uzly:", [(n["id"], n.get("name"), n.get("type")) for n in roots])

# prázdne priečinky
folders = [n for n in ns if n.get("type") == "folder"]
memo = {}
empty_f = [n for n in folders if not T.kids(n["id"])]
only_empty = [n for n in folders if T.kids(n["id"]) and T.link_count(n["id"], memo) == 0]
print("priečinky bez detí (úplne prázdne):", len(empty_f))
print("priečinky s deťmi, ale bez jedinej linky v podstrome:", len(only_empty))
rows = [[n["id"], "prázdny", T.path(n), n.get("name_en", ""), repr(n.get("en", "")), repr(n.get("enOnly", ""))] for n in empty_f]
rows += [[n["id"], "len prázdne podpriečinky", T.path(n), n.get("name_en", ""), repr(n.get("en", "")), repr(n.get("enOnly", ""))] for n in only_empty]
write_csv("prazdne-priecinky.csv", ["id", "druh", "cesta", "name_en", "en", "enOnly"], rows)
# podľa sekcie
sec = collections.Counter(T.path_nodes(n)[0].get("name") for n in empty_f + only_empty)
print("  podľa sekcie:", sec.most_common())
# en:false folders / enOnly
print("uzly en:false:", sum(1 for n in ns if n.get("en") is False), " enOnly:", sum(1 for n in ns if n.get("enOnly") is True))
# prázdne priečinky viditeľné na EN (en nie false v ceste)
def hidden_en(n):
    return any(p.get("en") is False for p in T.path_nodes(n))
def hidden_sk(n):
    return any(p.get("enOnly") is True for p in T.path_nodes(n))
print("  prázdne (oba druhy) viditeľné na SK:", sum(1 for n in empty_f + only_empty if not hidden_sk(n)),
      "| na EN:", sum(1 for n in empty_f + only_empty if not hidden_en(n)))

# bez name
no_name = [n for n in ns if not (n.get("name") or "").strip()]
print("uzly bez name:", len(no_name), [n["id"] for n in no_name][:10])
links = [n for n in ns if n.get("type") == "link"]
no_url = [n for n in links if not (n.get("url") or "").strip()]
print("linky bez url:", len(no_url))
write_csv("linky-bez-url.csv", ["id", "cesta"], [[n["id"], T.path(n)] for n in no_url])

# priečinky bez desc / desc_en
f_no_desc = [n for n in folders if not (n.get("desc") or "").strip()]
f_no_desc_en = [n for n in folders if not (n.get("desc_en") or "").strip() and not hidden_en(n)]
print("priečinky bez desc:", len(f_no_desc), "| bez desc_en (viditeľné na EN):", len(f_no_desc_en))
write_csv("priecinky-bez-desc.csv", ["id", "cesta", "chyba", "linky_v_podstrome"],
          [[n["id"], T.path(n), "desc", T.link_count(n["id"], memo)] for n in f_no_desc]
          + [[n["id"], T.path(n), "desc_en", T.link_count(n["id"], memo)] for n in f_no_desc_en])
# priečinky bez name_en
f_no_name_en = [n for n in folders if not (n.get("name_en") or "").strip() and not hidden_en(n)]
print("priečinky bez name_en (viditeľné na EN):", len(f_no_name_en))

# linky bez name_en / desc_en (viditeľné na EN)
l_vis_en = [n for n in links if not hidden_en(n)]
l_no_name_en = [n for n in l_vis_en if not (n.get("name_en") or "").strip()]
l_no_desc_en = [n for n in l_vis_en if not (n.get("desc_en") or "").strip()]
l_no_desc = [n for n in links if not (n.get("desc") or "").strip()]
print("linky viditeľné na EN:", len(l_vis_en))
print("  bez name_en (EN ukáže SK názov):", len(l_no_name_en))
print("  bez desc_en (EN ukáže SK popis / nič):", len(l_no_desc_en))
print("linky bez desc (SK):", len(l_no_desc))
write_csv("bez-name_en.csv", ["id", "cesta", "name", "url"], [[n["id"], T.path(n), n.get("name"), n.get("url")] for n in l_no_name_en])
write_csv("bez-desc_en.csv", ["id", "cesta", "name", "desc_sk_dlzka"], [[n["id"], T.path(n), n.get("name"), len(n.get("desc") or "")] for n in l_no_desc_en])
write_csv("linky-bez-desc.csv", ["id", "cesta", "name", "url"], [[n["id"], T.path(n), n.get("name"), n.get("url")] for n in l_no_desc])
secc = collections.Counter(T.path_nodes(n)[0].get("name") for n in l_no_name_en)
print("  bez name_en podľa sekcie:", secc.most_common())
secc = collections.Counter(T.path_nodes(n)[0].get("name") for n in l_no_desc_en)
print("  bez desc_en podľa sekcie:", secc.most_common())
# name_en == name pri evidentne slovenských názvoch (diakritika alebo slová)
SK_WORDS = re.compile(r"(^|\s)(a|v|na|pre|kluby|súťaže|sutaze|liga|ženy|muži|hokej|futbal|hádzaná|volejbal|basketbal|tenis|stolný|zväz|federácia|asociácia|slovensk|česk|národn|správy|výsledky|tabuľk)", re.I)
same_sk = [n for n in ns if not hidden_en(n) and (n.get("name_en") or "").strip() and n.get("name_en").strip() == (n.get("name") or "").strip()
           and (re.search(r"[áäčďéíľĺňóôŕšťúýžÁČĎÉÍĽŇÓŠŤÚÝŽ]", n["name"]) or SK_WORDS.search(n["name"]))]
print("name_en == name a názov vyzerá slovensky:", len(same_sk))
write_csv("name_en-rovnake-slovenske.csv", ["id", "typ", "cesta", "name"], [[n["id"], n.get("type"), T.path(n), n["name"]] for n in same_sk])
same_desc = [n for n in ns if not hidden_en(n) and (n.get("desc_en") or "").strip() and n["desc_en"].strip() == (n.get("desc") or "").strip()]
print("desc_en == desc (neprázdne):", len(same_desc))
write_csv("desc_en-rovnake.csv", ["id", "typ", "cesta", "desc"], [[n["id"], n.get("type"), T.path(n), n["desc"][:120]] for n in same_desc])

# duplicitné name medzi súrodencami
dup_name = []
dup_slug = []
dup_slug_en = []
for pid, kids in T.children.items():
    c = collections.Counter((k.get("name") or "").strip().lower() for k in kids)
    for k in kids:
        if c[(k.get("name") or "").strip().lower()] > 1:
            dup_name.append(k)
    fk = [k for k in kids if k.get("type") == "folder"]
    cs = collections.Counter((k.get("slug") or slugify(k.get("name", ""))) for k in fk)
    ce = collections.Counter((k.get("slug_en") or slugify((k.get("name_en") or k.get("name") or ""))) for k in fk)
    for k in fk:
        if cs[(k.get("slug") or slugify(k.get("name", "")))] > 1:
            dup_slug.append(k)
        if ce[(k.get("slug_en") or slugify((k.get("name_en") or k.get("name") or "")))] > 1:
            dup_slug_en.append(k)
print("duplicitné name medzi súrodencami (uzlov):", len(dup_name))
write_csv("duplicitne-name-surodenci.csv", ["id", "typ", "cesta", "url"], [[n["id"], n.get("type"), T.path(n), n.get("url", "")] for n in dup_name])
print("priečinky s rovnakým SK slugom medzi súrodencami:", len(dup_slug), "| EN:", len(dup_slug_en))
write_csv("duplicitne-slugy-surodenci.csv", ["id", "jazyk", "cesta", "slug", "slug_en"],
          [[n["id"], "sk", T.path(n), n.get("slug"), n.get("slug_en")] for n in dup_slug]
          + [[n["id"], "en", T.path(n), n.get("slug"), n.get("slug_en")] for n in dup_slug_en])

# slugy s diakritikou / veľkými / medzerami / nevalidné
badslug = []
for n in folders:
    for key in ("slug", "slug_en"):
        s = n.get(key)
        if s and not re.fullmatch(r"[a-z0-9]+(-[a-z0-9]+)*", s):
            badslug.append([n["id"], key, T.path(n), s])
print("slugy nevalidné (diakritika/veľké/medzery/ine znaky):", len(badslug))
write_csv("slugy-nevalidne.csv", ["id", "pole", "cesta", "slug"], badslug)
# slug != slugify(name)
inc = []
for n in folders:
    if n.get("slug") and n["slug"] != slugify(n.get("name", "")) and not re.fullmatch(r".*-\d+", n["slug"]):
        inc.append([n["id"], "slug", T.path(n), n["slug"], slugify(n.get("name", ""))])
    en_name = (n.get("name_en") or n.get("name") or "")
    if n.get("slug_en") and n["slug_en"] != slugify(en_name) and not re.fullmatch(r".*-\d+", n["slug_en"]):
        inc.append([n["id"], "slug_en", T.path(n, "en"), n["slug_en"], slugify(en_name)])
print("slug sa líši od slugify(name) (bez -2/-3 dedupe):", len(inc), "(sk:", sum(1 for r in inc if r[1] == "slug"), "en:", sum(1 for r in inc if r[1] == "slug_en"), ")")
write_csv("slugy-nekonzistentne.csv", ["id", "pole", "cesta", "slug", "slugify(name)"], inc)
# slug -2 dedupe
print("slugy končiace -2/-3…:", sum(1 for n in folders if re.fullmatch(r".*-\d+", n.get("slug") or "") and not re.fullmatch(r".*-\d+", slugify(n.get("name", "")))))

# názvy s koncovými/úvodnými medzerami, dvojité medzery, emoji
ws = [n for n in ns if (n.get("name") or "") != (n.get("name") or "").strip() or (n.get("name_en") or "") != (n.get("name_en") or "").strip()]
print("názvy s medzerou na kraji:", len(ws))
dbl = [n for n in ns if "  " in (n.get("name") or "") or "  " in (n.get("name_en") or "")]
print("názvy s dvojitou medzerou:", len(dbl))
EMO = re.compile("[\U0001F300-\U0001FAFF☀-➿\U0001F1E6-\U0001F1FF]")
emo = [n for n in ns if EMO.search(n.get("name") or "") or EMO.search(n.get("name_en") or "")]
print("emoji v názve:", len(emo), [(n["id"], n.get("name")) for n in emo][:10])
write_csv("nazvy-medzery-emoji.csv", ["id", "typ", "cesta", "problem", "name", "name_en"],
          [[n["id"], n.get("type"), T.path(n), "kraj", repr(n.get("name")), repr(n.get("name_en"))] for n in ws]
          + [[n["id"], n.get("type"), T.path(n), "dvojita", repr(n.get("name")), repr(n.get("name_en"))] for n in dbl]
          + [[n["id"], n.get("type"), T.path(n), "emoji", n.get("name"), n.get("name_en")] for n in emo])

# štítky LIGA: order -1 a tag
lig = [n for n in links if n.get("order") == -1]
tags = [n for n in ns if n.get("tag")]
print("linky s order -1 (štítok LIGA):", len(lig), "| uzly s tag:", len(tags), collections.Counter(n.get("tag") for n in tags))
# priečinky s viac než jednou order -1
multi = []
for pid, kids in T.children.items():
    c = [k for k in kids if k.get("type") == "link" and k.get("order") == -1]
    if len(c) > 1:
        multi.append([pid, T.path(T.by_id[pid]) if pid in T.by_id else "?", len(c), " | ".join(k.get("name", "") for k in c)])
print("priečinky s viac než 1 linkou order -1:", len(multi))
write_csv("viac-liga-stitkov.csv", ["parentId", "cesta", "pocet", "nazvy"], multi)
# order -1 na priečinku
print("priečinky s order -1:", sum(1 for n in folders if n.get("order") == -1))
# order -1 ale názov nevyzerá ako liga/tabuľka — len info; a order < -1
print("order < -1:", [(n["id"], n.get("order"), n.get("name")) for n in ns if isinstance(n.get("order"), (int, float)) and n["order"] < -1][:10])
# duplicitné order medzi súrodencami (nedeterministické radenie)
dupord = 0
for pid, kids in T.children.items():
    c = collections.Counter(k.get("order") for k in kids)
    dupord += sum(v for v in c.values() if v > 1)
print("uzly so zhodným order ako súrodenec:", dupord)
# duplicitný order v priečinkoch kontinentov (kde sa neradí abecedne na SK)
dupord_f = []
for pid, kids in T.children.items():
    fk = [k for k in kids if k.get("type") == "folder"]
    c = collections.Counter(k.get("order") for k in fk)
    for k in fk:
        if c[k.get("order")] > 1:
            dupord_f.append([k["id"], T.path(k), k.get("order")])
print("priečinky so zhodným order ako súrodenecký priečinok:", len(dupord_f))
write_csv("duplicitny-order-priecinky.csv", ["id", "cesta", "order"], dupord_f)
