#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
SEO generátor pre Športové Linky (sport-strom).

Číta data.json a vygeneruje:
  - statickú HTML stránku pre každý priečinok (napr. hokej/sutaze/index.html)
  - sitemap.xml a robots.txt
  - skopíruje index.html (aplikáciu) a data.json do výstupného priečinka

Použitie:
  python generator.py                 # výstup do _site/
  python generator.py --out _site

BASE_URL (absolútna adresa webu pre sitemap/canonical) sa berie z premennej
prostredia BASE_URL — v GitHub Actions ju dodá configure-pages automaticky.

PRÍPRAVA NA ANGLIČTINU (zatiaľ nerealizované):
  - všetky UI texty sú v slovníku UI nižšie — stačí doplniť UI["en"]
  - popisy: pre LANG="en" sa použije pole "desc_en" s fallbackom na "desc"
  - anglická vetva sa vygeneruje spustením s LANG="en" a OUT_PREFIX="en"
  - slugy (adresy) sa VŽDY tvoria zo slovenských názvov — nemenia sa

DYNAMICKÉ ČASTI (banner + Aktuálne) — každá vygenerovaná stránka obsahuje
malý skript, ktorý ich načíta z data.json pri otvorení stránky. Denná
aktualizácia Aktuálnych a bannerov teda NEVYŽADUJE prebudovanie webu.
Logika zrkadlí sport-strom.html vrátane cielenia bannerov na sekcie,
kampaní od–do a váh rotácie.
"""

import json
import os
import re
import shutil
import sys
import unicodedata
from datetime import date
from html import escape

# ------------------------------------------------------------
# KONFIGURÁCIA
# ------------------------------------------------------------
LANG = "sk"          # jazyk výstupu (budúce: "en")
OUT_PREFIX = ""      # podpriečinok výstupu (budúce: "en" pre /en/ vetvu)
BASE_URL = os.environ.get("BASE_URL", "").rstrip("/")

UI = {
    "sk": {
        "home": "Domov",
        "folders": "Kategórie",
        "links": "Linky",
        "open_app": "Otvoriť v interaktívnej aplikácii",
        "meta_folder": "{name} — športové linky: {nfold} podkategórií, {nlink} liniek.",
        "footer": "Prehľadný rozcestník športových webov.",
        "aktualne": "Aktuálne",
    },
    # "en": { ... }  # doplniť pri realizácii angličtiny
}
T = UI[LANG]

# ------------------------------------------------------------
# POMOCNÉ FUNKCIE
# ------------------------------------------------------------

def slugify(name: str) -> str:
    """Musí sa správať ROVNAKO ako slugify() v sport-strom.html (hash routing)."""
    s = unicodedata.normalize("NFD", name or "")
    s = "".join(c for c in s if not unicodedata.combining(c))
    s = s.lower()
    s = re.sub(r"[^a-z0-9]+", "-", s)
    return s.strip("-")


def node_desc(node: dict) -> str:
    """Popis v aktuálnom jazyku s fallbackom na slovenčinu."""
    if LANG != "sk":
        v = (node.get("desc_" + LANG) or "").strip()
        if v:
            return v
    return (node.get("desc") or "").strip()


def load_data(path: str) -> dict:
    with open(path, encoding="utf-8") as f:
        return json.load(f)


# ------------------------------------------------------------
# STROM
# ------------------------------------------------------------

def build_tree(nodes: list):
    """Vráti (children, by_id): mapy pre rýchlu navigáciu stromom."""
    children: dict = {}
    by_id = {}
    for n in nodes:
        by_id[n["id"]] = n
        children.setdefault(n.get("parentId"), []).append(n)
    for lst in children.values():
        lst.sort(key=lambda x: x.get("order", 0))
    return children, by_id


def folder_paths(children: dict):
    """Priradí každému priečinku URL cestu (zoznam slugov). Rieši duplicitné slugy.

    Prednosť má TRVALÝ slug uložený v dátach (pole "slug" — priraďuje ho
    aplikácia pri vytvorení priečinka / migrácii ensureSlugs). Fallback na
    slugify(názov) je len pre dáta, ktoré migráciou ešte neprešli.
    Algoritmus (poradie podľa order + dedupe) je IDENTICKÝ s ensureSlugs()
    v sport-strom.html — obe strany musia vyrobiť rovnaké adresy.
    """
    paths = {}  # folder id -> [slug, slug, ...]

    def walk(parent_id, prefix):
        used = set()
        for n in children.get(parent_id, []):
            if n.get("type") != "folder":
                continue
            slug = (n.get("slug")
                    or slugify(n.get("name", ""))
                    or "kat-" + slugify(n["id"]))
            base, i = slug, 2
            while slug in used:          # súrodenci s rovnakým slugom
                slug = f"{base}-{i}"
                i += 1
            used.add(slug)
            p = prefix + [slug]
            paths[n["id"]] = p
            walk(n["id"], p)

    walk(None, [])
    return paths


# ------------------------------------------------------------
# HTML ŠABLÓNA
# ------------------------------------------------------------
CSS = """
*{margin:0;padding:0;box-sizing:border-box}
body{background:#0f1923;color:#e8edf2;font-family:'Segoe UI',Arial,sans-serif;line-height:1.5}
a{color:#e8edf2;text-decoration:none}
.wrap{max-width:900px;margin:0 auto;padding:20px 16px 60px}
.crumbs{font-size:.9rem;color:#8fa3b3;margin-bottom:18px}
.crumbs a{color:#8fa3b3}
.crumbs a:hover{color:#e84242}
h1{font-size:1.6rem;margin-bottom:6px}
h1 .ic{margin-right:8px}
.desc{color:#8fa3b3;margin-bottom:22px}
h2{font-size:1.05rem;color:#e84242;margin:26px 0 10px;text-transform:uppercase;letter-spacing:.05em}
.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(250px,1fr));gap:10px}
.card{display:block;background:#182635;border:1px solid #24364a;border-radius:10px;padding:12px 14px;transition:.15s}
.card:hover{border-color:#e84242;transform:translateY(-1px)}
.card .nm{font-weight:600}
.card .ds{font-size:.85rem;color:#8fa3b3;margin-top:3px}
.card .ur{font-size:.78rem;color:#5f7183;margin-top:3px;word-break:break-all}
.appbtn{display:inline-block;background:#e84242;color:#fff;border-radius:8px;padding:10px 18px;font-weight:600;margin-top:30px}
.appbtn:hover{background:#c73535}
.bslot{width:468px;max-width:100%;height:60px;margin:0 0 16px;border-radius:8px;overflow:hidden}
.bslot a{display:block;width:100%;height:100%}
.bslot img{width:100%;height:100%;object-fit:cover;display:block}
.akt{display:flex;flex-wrap:wrap;gap:8px;margin:0 0 20px;align-items:center}
.akt .lbl{color:#e84242;font-weight:600;font-size:.78rem;text-transform:uppercase;letter-spacing:.05em}
.akt a{background:#182635;border:1px solid #24364a;border-radius:20px;padding:6px 12px;font-size:.85rem}
.akt a:hover{border-color:#e84242}
"""

FAVICON = ("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E"
           "%3Crect width='64' height='64' rx='12' fill='%230f1923'/%3E"
           "%3Crect y='54' width='64' height='10' fill='%23e84242'/%3E"
           "%3Ctext x='32' y='42' font-family='Arial,sans-serif' font-size='32' font-weight='800'"
           " font-style='italic' text-anchor='middle' fill='%23ffffff'%3ES"
           "%3Ctspan fill='%23e84242'%3EL%3C/tspan%3E%3C/text%3E%3C/svg%3E")

PAGE = """<!DOCTYPE html>
<html lang="{lang}">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>{title}</title>
<meta name="description" content="{meta_desc}">
<link rel="icon" href="{favicon}">
{canonical}
{og_tags}
<style>{css}</style>
</head>
<body>
<div class="wrap">
<nav class="crumbs">{crumbs}</nav>
<div id="bslot" class="bslot" hidden></div>
<div id="akt" class="akt" hidden></div>
<h1><span class="ic">{icon}</span>{name}</h1>
{desc_html}
{folders_html}
{links_html}
<a class="appbtn" href="{app_href}">{open_app} →</a>
<footer>{site_title} — {footer}</footer>
</div>
{dyn_js}
</body>
</html>
"""

# Dynamický JS: banner + Aktuálne z data.json.
# __ANC__ = id priečinkov od koreňa po túto stránku (cielenie bannerov),
# __ROOT__ = relatívna cesta ku koreňu webu, __AKT_LABEL__ = nadpis pásu.
DYN_JS = """<script>
(function(){
  var ANC=__ANC__;
  fetch("__ROOT__data.json",{cache:"no-store"}).then(function(r){return r.json()}).then(function(d){
    var today=new Date().toISOString().slice(0,10);
    var bs=(d.banners||[]).filter(function(b){
      if(b.active===false)return false;
      if(b.startsAt&&today<b.startsAt)return false;
      if(b.endsAt&&today>b.endsAt)return false;
      if(b.sectionId&&ANC.indexOf(b.sectionId)<0)return false;
      return true;
    });
    if(bs.length){
      var st=d.bannerSettings||{},b;
      if(st.rotate&&bs.length>1){
        var pool=[];
        bs.forEach(function(x){var w=Math.max(1,Math.min(10,parseInt(x.weight)||1));for(var i=0;i<w;i++)pool.push(x)});
        b=pool[Math.floor(Math.random()*pool.length)];
      }else{
        b=bs.filter(function(x){return x.id===st.activeId})[0]||bs[0];
      }
      var el=document.getElementById("bslot");
      el.hidden=false;
      el.innerHTML=b.html?b.html:'<a href="'+(b.linkUrl||"#")+'" target="_blank" rel="noopener sponsored"><img src="'+b.imageUrl+'" alt="'+(b.alt||"Reklama")+'"></a>';
    }
    var ak=(d.aktualne||[]).filter(function(a){return !(a.endsAt&&today>a.endsAt)});
    if(ak.length){
      var el2=document.getElementById("akt");
      el2.hidden=false;
      el2.innerHTML='<span class="lbl">__AKT_LABEL__</span>'+ak.map(function(a){
        return '<a href="'+a.url+'" target="_blank" rel="noopener">'+(a.icon?a.icon+" ":"")+a.name+'</a>';
      }).join("");
    }
  }).catch(function(e){});
})();
</script>"""


def render_page(node, path, children, by_id, paths, site_title):
    depth = len(path)
    root = "../" * depth
    name = escape(node.get("name", ""))
    icon = escape(node.get("icon", "") or "")
    desc = escape(node_desc(node))

    # breadcrumbs
    crumbs = [f'<a href="{root}">{T["home"]}</a>']
    acc = node
    chain = []
    while acc is not None:
        chain.append(acc)
        acc = by_id.get(acc.get("parentId"))
    for i, anc in enumerate(reversed(chain)):
        if anc["id"] == node["id"]:
            crumbs.append(name)
        else:
            up = "../" * (depth - i - 1)
            crumbs.append(f'<a href="{up}">{escape(anc.get("name",""))}</a>')
    crumbs_html = " › ".join(crumbs)

    kids = children.get(node["id"], [])
    # karty priečinkov len pre tie, ktoré majú vlastnú stránku (nie prázdne)
    folders = [k for k in kids if k.get("type") == "folder" and k["id"] in paths]
    links = [k for k in kids if k.get("type") == "link"]

    fold_cards = ""
    if folders:
        cards = []
        for f in folders:
            slug = paths[f["id"]][-1]
            d = escape(node_desc(f))
            ds = f'<div class="ds">{d}</div>' if d else ""
            cards.append(
                f'<a class="card" href="{slug}/">'
                f'<div class="nm">{escape(f.get("icon","") or "")} {escape(f.get("name",""))}</div>{ds}</a>'
            )
        fold_cards = f'<h2>{T["folders"]}</h2><div class="grid">' + "".join(cards) + "</div>"

    link_cards = ""
    if links:
        cards = []
        for l in links:
            d = escape(node_desc(l))
            ds = f'<div class="ds">{d}</div>' if d else ""
            url = escape(l.get("url", ""), quote=True)
            host = re.sub(r"^https?://(www\.)?", "", l.get("url", "")).split("/")[0]
            cards.append(
                f'<a class="card" href="{url}" target="_blank" rel="noopener">'
                f'<div class="nm">{escape(l.get("icon","") or "")} {escape(l.get("name",""))}</div>{ds}'
                f'<div class="ur">{escape(host)}</div></a>'
            )
        link_cards = f'<h2>{T["links"]}</h2><div class="grid">' + "".join(cards) + "</div>"

    meta = desc or T["meta_folder"].format(name=name, nfold=len(folders), nlink=len(links))
    url_path = "/".join(path) + "/"
    canonical = f'<link rel="canonical" href="{BASE_URL}/{url_path}">' if BASE_URL else ""

    # OG tagy — náhľad pri zdieľaní na sociálnych sieťach
    page_title = f"{name} — {escape(site_title)}"
    og = [f'<meta property="og:title" content="{page_title}">',
          f'<meta property="og:description" content="{escape(meta, quote=True)}">',
          '<meta property="og:type" content="website">']
    if BASE_URL:
        og.append(f'<meta property="og:url" content="{BASE_URL}/{url_path}">')
        og.append(f'<meta property="og:image" content="{BASE_URL}/og-image.png">')
    og_tags = "\n".join(og)

    # dynamický JS: banner + Aktuálne z data.json (ANC = id-čka od koreňa po túto stránku)
    anc_ids = [n["id"] for n in reversed(chain)]
    dyn_js = (DYN_JS
              .replace("__ANC__", json.dumps(anc_ids))
              .replace("__ROOT__", root)
              .replace("__AKT_LABEL__", escape(T["aktualne"])))

    return PAGE.format(
        lang=LANG,
        title=page_title,
        meta_desc=escape(meta, quote=True),
        favicon=FAVICON,
        canonical=canonical,
        og_tags=og_tags,
        css=CSS,
        crumbs=crumbs_html,
        icon=icon,
        name=name,
        desc_html=f'<p class="desc">{desc}</p>' if desc else "",
        folders_html=fold_cards,
        links_html=link_cards,
        app_href=f'{root}#/{"/".join(path)}',
        open_app=T["open_app"],
        footer=T["footer"],
        site_title=escape(site_title),
        dyn_js=dyn_js,
    )


# ------------------------------------------------------------
# HLAVNÝ BEH
# ------------------------------------------------------------

def main():
    out = "_site"
    if "--out" in sys.argv:
        out = sys.argv[sys.argv.index("--out") + 1]
    if OUT_PREFIX:
        out = os.path.join(out, OUT_PREFIX)

    data = load_data("data.json")
    site_title = data.get("title", "Športové Linky")
    nodes = data.get("nodes", [])
    children, by_id = build_tree(nodes)
    paths = folder_paths(children)

    # POISTKA: stránku dostanú len priečinky s aspoň 1 linkou v podstrome.
    # Prázdne sekcie (rozostavané) tak nemajú verejnú SEO stránku — neodradia
    # návštevníkov ani Google („tenký obsah"). Po doplnení liniek sa stránka
    # vyrobí automaticky pri najbližšom builde.
    has_link = {}

    def check_links(fid):
        kids = children.get(fid, [])
        result = any(k.get("type") == "link" for k in kids)
        for k in kids:
            if k.get("type") == "folder":
                result = check_links(k["id"]) or result
        has_link[fid] = result
        return result

    for top in children.get(None, []):
        if top.get("type") == "folder":
            check_links(top["id"])
    skipped = [fid for fid in paths if not has_link.get(fid)]
    paths = {fid: p for fid, p in paths.items() if has_link.get(fid)}

    os.makedirs(out, exist_ok=True)

    # stránky priečinkov
    count = 0
    for fid, path in paths.items():
        d = os.path.join(out, *path)
        os.makedirs(d, exist_ok=True)
        html = render_page(by_id[fid], path, children, by_id, paths, site_title)
        with open(os.path.join(d, "index.html"), "w", encoding="utf-8") as f:
            f.write(html)
        count += 1

    # sitemap.xml (len v hlavnej jazykovej vetve)
    if not OUT_PREFIX:
        today = date.today().isoformat()
        urls = [f"{BASE_URL}/"] + [
            f'{BASE_URL}/{"/".join(p)}/' for p in sorted(paths.values())
        ]
        sm = ['<?xml version="1.0" encoding="UTF-8"?>',
              '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">']
        for u in urls:
            sm.append(f"  <url><loc>{escape(u)}</loc><lastmod>{today}</lastmod></url>")
        sm.append("</urlset>")
        with open(os.path.join(out, "sitemap.xml"), "w", encoding="utf-8") as f:
            f.write("\n".join(sm))

        with open(os.path.join(out, "robots.txt"), "w", encoding="utf-8") as f:
            f.write(f"User-agent: *\nAllow: /\nSitemap: {BASE_URL}/sitemap.xml\n")

        # skopíruj aplikáciu a dáta; do index.html doplň og:url a og:image
        # (marker <!--OG_DYNAMIC--> — absolútna adresa je známa až pri builde)
        if os.path.exists("index.html"):
            html = open("index.html", encoding="utf-8").read()
            if BASE_URL and "<!--OG_DYNAMIC-->" in html:
                og_dyn = (f'<meta property="og:url" content="{BASE_URL}/"/>\n'
                          f'<meta property="og:image" content="{BASE_URL}/og-image.png"/>')
                html = html.replace("<!--OG_DYNAMIC-->", og_dyn, 1)
            with open(os.path.join(out, "index.html"), "w", encoding="utf-8") as f:
                f.write(html)
        for fname in ("data.json", "og-image.png"):
            if os.path.exists(fname):
                shutil.copy(fname, os.path.join(out, fname))

    print(f"Hotovo: {count} stránok priečinkov -> {out}/ (preskočených prázdnych: {len(skipped)})")
    if not BASE_URL:
        print("UPOZORNENIE: BASE_URL nie je nastavená — sitemap/canonical budú relatívne (na GitHube sa doplní automaticky).")


if __name__ == "__main__":
    main()
