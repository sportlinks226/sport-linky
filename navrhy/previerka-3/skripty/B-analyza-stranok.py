#!/usr/bin/env python3
"""Analýza lokálne vygenerovaných webov (SK + EN): titulky, popisy, canonical,
hreflang páry SK<->EN, sitemap, tenký obsah, interné prelinkovanie, H1.
Použitie: python3 B-analyza-stranok.py <site-sk> <site-en>
"""
import os, re, sys, json, collections
from urllib.parse import urljoin, urlsplit
from lxml import html as LH, etree

SK_DIR, EN_DIR = sys.argv[1], sys.argv[2]
BASE = {"sk": "https://sportlinky.sk", "en": "https://sportlinking.com"}


def pages(root):
    out = {}
    for d, _, fs in os.walk(root):
        for f in fs:
            if f == "index.html":
                rel = os.path.relpath(d, root).replace(os.sep, "/")
                rel = "" if rel == "." else rel + "/"
                out[rel] = os.path.join(d, f)
    return out


def parse(path, rel, lang):
    with open(path, encoding="utf-8") as f:
        raw = f.read()
    doc = LH.fromstring(raw)
    head = doc.find("head")
    g = lambda xp: doc.xpath(xp)
    title = (g("//title/text()") or [""])[0]
    desc = (g('//meta[@name="description"]/@content') or [""])[0]
    canon = (g('//link[@rel="canonical"]/@href') or [""])[0]
    hl = {l.get("hreflang"): l.get("href") for l in g('//link[@rel="alternate"][@hreflang]')}
    robots = g('//meta[@name="robots"]/@content')
    h1 = [" ".join(h.text_content().split()) for h in g("//h1")]
    jsonld = g('//script[@type="application/ld+json"]/text()')
    ld_types = []
    for j in jsonld:
        try:
            ld_types.append(json.loads(j.replace("<\\/", "</")).get("@type"))
        except Exception as e:
            ld_types.append("CHYBA:" + str(e)[:40])
    is_app = '<main id="main">' in raw and 'id="pageBoot"' not in raw
    if is_app:
        # domov (index.html appky): dlaždice v #main, odkazy v #hSports
        folder_cards = g('//main[@id="main"]//a[contains(@class,"card-root") or contains(@class,"card-folder")]/@href')
        link_cards = []
        has_desc = True
    else:
        folder_cards = g('//h2[1]/following-sibling::div[1][@class="grid"]/a/@href') if g('//h2[text()="Kategórie" or text()="Categories"]') else []
        link_cards = g('//div[contains(@class,"grid")]/a[@target="_blank"]/@href')
        has_desc = bool(g('//p[@class="desc"]') or g('//p[@class="live-intro"]'))
    # všetky interné odkazy (relatívne), rozlúštené na cestu webu
    page_url = BASE[lang] + "/" + rel
    internal = set()
    for a in g("//a/@href"):
        if a.startswith(("http://", "https://")) and not a.startswith(BASE[lang]):
            continue
        if a.startswith(("#", "javascript:", "mailto:")):
            continue
        u = urljoin(page_url, a)
        if u.startswith(BASE[lang]):
            p = urlsplit(u).path.lstrip("/")
            if "#" in a:
                continue
            internal.add(p)
    return dict(rel=rel, lang=lang, title=title, desc=desc, canonical=canon, hreflang=hl,
                robots=robots, h1=h1, ld=ld_types, n_fold=len(folder_cards),
                n_link=len(link_cards), has_desc=has_desc, internal=internal,
                size=len(raw.encode("utf-8")), is_app=is_app,
                pageboot='id="pageBoot"' in raw, noscript="<noscript>" in raw)


def sitemap(root, lang):
    t = etree.parse(os.path.join(root, "sitemap.xml"))
    ns = {"s": "http://www.sitemaps.org/schemas/sitemap/0.9", "x": "http://www.w3.org/1999/xhtml"}
    out = {}
    for u in t.findall("s:url", ns):
        loc = u.findtext("s:loc", namespaces=ns)
        rel = loc[len(BASE[lang]) + 1:]
        out[rel] = dict(lastmod=u.findtext("s:lastmod", namespaces=ns),
                        hl={l.get("hreflang"): l.get("href") for l in u.findall("x:link", ns)})
    return out


def main():
    P = {}
    for lang, root in (("sk", SK_DIR), ("en", EN_DIR)):
        pg = pages(root)
        P[lang] = {rel: parse(path, rel, lang) for rel, path in sorted(pg.items())}
        print(f"[{lang}] stránok (index.html): {len(P[lang])}")
    SM = {"sk": sitemap(SK_DIR, "sk"), "en": sitemap(EN_DIR, "en")}
    rep = []

    for lang in ("sk", "en"):
        other = "en" if lang == "sk" else "sk"
        pg, sm = P[lang], SM[lang]
        print(f"\n===== {lang.upper()} =====")
        # sitemap ↔ súbory
        print("sitemap adries:", len(sm), "| stránok na disku:", len(pg),
              "| v sitemape bez súboru:", [r for r in sm if r not in pg][:5],
              "| súbor bez sitemapy:", [r for r in pg if r not in sm][:5])
        lm = collections.Counter(v["lastmod"] for v in sm.values())
        print("lastmod rozloženie (top 6):", lm.most_common(6))
        # canonical
        bad_c = [r for r, p in pg.items() if p["canonical"] != BASE[lang] + "/" + r]
        print("canonical ≠ adresa:", len(bad_c), bad_c[:5])
        # robots/noindex
        print("stránok s meta robots:", sum(1 for p in pg.values() if p["robots"]))
        # hreflang
        no_hl = [r for r, p in pg.items() if not p["hreflang"]]
        bad_self = [r for r, p in pg.items() if p["hreflang"] and p["hreflang"].get(lang) != BASE[lang] + "/" + r]
        bad_xd = [r for r, p in pg.items() if p["hreflang"] and p["hreflang"].get("x-default") != p["hreflang"].get("en")]
        missing_target, no_backlink = [], []
        for r, p in pg.items():
            if not p["hreflang"]:
                continue
            tgt = p["hreflang"].get(other, "")
            trel = tgt[len(BASE[other]) + 1:] if tgt.startswith(BASE[other] + "/") else None
            if trel is None or trel not in P[other]:
                missing_target.append((r, tgt))
            else:
                back = P[other][trel]["hreflang"].get(lang)
                if back != BASE[lang] + "/" + r:
                    no_backlink.append((r, trel, back))
        # stránky bez hreflangu, hoci v druhom jazyku existuje rovnaká cesta (len indícia)
        print(f"hreflang: bez hreflangu {len(no_hl)} | self≠adresa {len(bad_self)} | x-default≠en {len(bad_xd)} "
              f"| cieľ v druhom builde chýba {len(missing_target)} | bez spätného odkazu {len(no_backlink)}")
        if no_hl: print("   bez hreflangu (prvých 15):", no_hl[:15])
        if missing_target: print("   chýbajúci cieľ:", missing_target[:5])
        if no_backlink: print("   bez spätného:", no_backlink[:5])
        # sitemap hreflang = HTML hreflang
        diff_sm = [r for r in sm if r in pg and sm[r]["hl"] != pg[r]["hreflang"]]
        print("sitemap hreflang ≠ HTML hreflang:", len(diff_sm), diff_sm[:5])
        # titulky/popisy
        tl = [len(p["title"]) for p in pg.values()]
        dl = [len(p["desc"]) for p in pg.values()]
        print(f"titulok dĺžka: min {min(tl)} priemer {sum(tl)/len(tl):.0f} max {max(tl)} | >65: {sum(1 for x in tl if x>65)} | >70: {sum(1 for x in tl if x>70)}")
        print(f"popis dĺžka: min {min(dl)} priemer {sum(dl)/len(dl):.0f} max {max(dl)} | >160: {sum(1 for x in dl if x>160)} | <50: {sum(1 for x in dl if x<50)} | prázdny: {sum(1 for x in dl if x==0)}")
        dup_t = {t: c for t, c in collections.Counter(p["title"] for p in pg.values()).items() if c > 1}
        dup_d = {t: c for t, c in collections.Counter(p["desc"] for p in pg.values()).items() if c > 1}
        print("duplicitné titulky:", len(dup_t), list(dup_t.items())[:5])
        print("duplicitné popisy:", len(dup_d), [(d[:70], c) for d, c in list(dup_d.items())[:5]])
        gen_desc = [r for r, p in pg.items() if not p["is_app"] and not p["has_desc"]]
        print("stránky bez vlastného popisu (meta popis je náhradný „X podkategórií, Y liniek“):", len(gen_desc))
        longest = sorted(pg.values(), key=lambda p: -len(p["title"]))[:3]
        print("najdlhšie titulky:", [(p["rel"], len(p["title"]), p["title"]) for p in longest])
        # H1
        print("stránok bez H1 / s viac H1:", sum(1 for p in pg.values() if len(p["h1"]) == 0),
              sum(1 for p in pg.values() if len(p["h1"]) > 1))
        h1dup = {t: c for t, c in collections.Counter(p["h1"][0] for p in pg.values() if p["h1"]).items() if c > 1}
        print("rovnaký H1 na viacerých stránkach (napr. „Európa“):", len(h1dup), sorted(h1dup.items(), key=lambda x: -x[1])[:6])
        # JSON-LD
        print("JSON-LD typy:", collections.Counter(tuple(p["ld"]) for p in pg.values()).most_common(4))
        # tenký obsah
        thin = [(r, p["n_link"], p["n_fold"], p["has_desc"]) for r, p in pg.items()
                if not p["is_app"] and p["n_fold"] == 0 and p["n_link"] <= 2]
        thin_nodesc = [t for t in thin if not t[3]]
        print(f"tenké stránky (0 podpriečinkov, ≤2 linky): {len(thin)}, z toho bez popisu: {len(thin_nodesc)}")
        print("   príklady:", thin[:8])
        one = [(r, p["n_link"]) for r, p in pg.items() if not p["is_app"] and p["n_fold"] == 0 and p["n_link"] == 1]
        print(f"stránky s presne 1 linkou a 0 podpriečinkami: {len(one)}", one[:6])
        nl = [p["n_link"] for p in pg.values() if not p["is_app"]]
        print("rozloženie počtu liniek na stránke: 0:", nl.count(0), "1-2:", sum(1 for x in nl if 1 <= x <= 2),
              "3-5:", sum(1 for x in nl if 3 <= x <= 5), "6-20:", sum(1 for x in nl if 6 <= x <= 20), ">20:", sum(1 for x in nl if x > 20),
              "max:", max(nl))
        # interné prelinkovanie
        inl = collections.Counter()
        dangling = collections.Counter()
        for r, p in pg.items():
            for t in p["internal"]:
                if t in pg:
                    inl[t] += 1
                else:
                    dangling[t] += 1
        print("odkazy na neexistujúce stránky (cieľ bez index.html):", sum(dangling.values()), dangling.most_common(5))
        ic = [inl.get(r, 0) for r in pg if r]
        print(f"prichádzajúce odkazy na stránku: min {min(ic)} medián {sorted(ic)[len(ic)//2]} max {max(ic)} | stránok s ≤1 odkazom: {sum(1 for x in ic if x<=1)} | s 0: {sum(1 for x in ic if x==0)}")
        print("   stránky s najmenej odkazmi:", [(r, inl.get(r, 0)) for r in sorted(pg, key=lambda r: inl.get(r, 0)) if r][:6])
        depth = collections.Counter(r.count("/") for r in pg)
        print("hĺbka (počet / v ceste):", sorted(depth.items()))
        sizes = [p["size"] for p in pg.values() if not p["is_app"]]
        print(f"veľkosť statickej stránky: priemer {sum(sizes)/len(sizes)/1024:.1f} kB, max {max(sizes)/1024:.0f} kB; index.html {pg['']['size']/1024:.0f} kB")
        print("stránok bez #pageBoot:", sum(1 for p in pg.values() if not p["is_app"] and not p["pageboot"]))
        rep.append(dict(lang=lang, n=len(pg), no_hl=no_hl, thin=thin, dup_t=dup_t, dup_d=dup_d, gen_desc=gen_desc))

    # SK stránky bez páru v EN podľa hreflangu
    sk_paired = {p["hreflang"].get("en") for p in P["sk"].values() if p["hreflang"]}
    en_paired = {p["hreflang"].get("sk") for p in P["en"].values() if p["hreflang"]}
    print("\nEN stránky, na ktoré neukazuje žiadny SK hreflang:",
          [r for r, p in P["en"].items() if BASE["en"] + "/" + r not in sk_paired])
    print("SK stránky, na ktoré neukazuje žiadny EN hreflang:",
          [r for r, p in P["sk"].items() if BASE["sk"] + "/" + r not in en_paired])
    json.dump(rep, open(os.path.join(os.path.dirname(__file__), "B-analyza-vystup.json"), "w"), ensure_ascii=False, indent=1)


main()
