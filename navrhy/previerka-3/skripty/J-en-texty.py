#!/usr/bin/env python3 -I
"""H) Texty pre používateľa v index.html (JS) so slovenčinou, ktoré NIE sú na riadku s IS_EN/SITE_LANG
a nie sú nahradené EN náhradami generator.py. Vypíše ich s číslom riadku a odhadom, či sú len pre admina.
Navyše overí, že každý reťazec z EN náhrad v generator.py (main) sa v index.html naozaj nachádza."""
import re
SK = "/home/user/sport-linky"
html = open(f"{SK}/index.html", encoding="utf-8").read()
gen = open(f"{SK}/generator.py", encoding="utf-8").read()
lines = html.split("\n")
DIA = re.compile(r"[ľščťžýáíéúäôňďĽŠČŤŽÝÁÍÉÚÄÔŇĎ]")
# admin funkcie (odhad): od názvu funkcie po najbližšie '^}' — zoznam podľa čítania kódu
ADMIN_FN = {"save","alertLite","updateVerBadge","chkPw","toggleAdmin","enterAdmin","logoutAdmin","fetchFullData","openAdd","openEdit","saveNode","delNode","moveNode",
 "openSettings","saveSett","downloadJSON","exportData","publishData","importData","openPromoList","renderPromoListGrid","fillPromoSectionSelect","openAddPromo","openEditPromo",
 "savePromo","togglePromo","delPromo","savePromoBanner","openBannerFarm","toggleRotate","renderBannerFarmGrid","activateBanner","toggleBannerActive","deleteBanner","fillBannerSectionSelect",
 "openAddBanner","openEditBanner","saveBanner","saveBannerSettings","aktDraftPut","aktAdminLoad","aktCanEdit","aktSave","openAktualne","renderAktList","dropAkt","aktFillSports",
 "aktFillForm","openAddAkt","openEditAkt","copyAkt","saveAkt","toggleAkt","delAkt","moveAkt","openAktBulk","aktParseBulk","previewAktBulk","addAktBulk","publishAkt","aktOfferImport","load"}
# mapa riadok → funkcia
fn_of = {}
cur = None
for i, l in enumerate(lines, 1):
    m = re.match(r"^(?:async\s+)?function\s+(\w+)\s*\(", l)
    if m: cur = m.group(1)
    fn_of[i] = cur
    if l.startswith("}"): cur = None if not m else cur
in_script = False
out = []
for i, l in enumerate(lines, 1):
    if "<script>" in l: in_script = True
    if "</script>" in l: in_script = False
    if not in_script: continue
    code = re.sub(r"^\s*//.*$", "", l)
    # odstráň komentár za kódom (hrubo)
    code = re.sub(r"\s//(?![^'\"]*['\"][^'\"]*$).*$", "", code)
    strs = re.findall(r"'([^'\\]*(?:\\.[^'\\]*)*)'|\"([^\"\\]*(?:\\.[^\"\\]*)*)\"|`([^`]*)`", code)
    txt = [a or b or c for a, b, c in strs]
    txt = [t for t in txt if DIA.search(t) or re.search(r"\b(linka|liniek|sekci|Načít|Zavrieť|Späť|Domov|Hore|Dole|Upraviť|Zmazať|Reklama|Viac)\b", t)]
    if not txt: continue
    if "IS_EN" in l or "SITE_LANG" in l or "LANG" in l: continue
    fn = fn_of.get(i)
    out.append((i, fn, "ADMIN" if fn in ADMIN_FN else "?", txt[:3]))
print(f"== JS riadky so slovenským textom bez IS_EN: {len(out)}; z toho mimo admin funkcií: {sum(1 for o in out if o[2]=='?')}")
for i, fn, kind, t in out:
    if kind == "?":
        print(f"  r.{i:4d} [{fn}] {t}")
print("\n== EN náhrady v generator.py (main) — reťazce, ktoré v index.html NIE SÚ (náhrada potichu zlyhá):")
blk = re.search(r"for a, b in \((.*?)\n\s*\):\n\s*html = html\.replace\(a, b\)", gen, re.S).group(1)
pairs = re.findall(r"\(\s*('(?:[^'\\]|\\.)*'|\"(?:[^\"\\]|\\.)*\")\s*,", blk)
n_ok = 0
for p in pairs:
    s = eval(p)
    if s in html: n_ok += 1
    else: print("  CHÝBA:", repr(s)[:120])
print(f"  overených dvojíc: {len(pairs)}, nájdených v index.html: {n_ok}")
# HTML atribúty v tele (mimo skriptov) so slovenčinou: title/aria-label/placeholder/alt
body = html[html.index("<body>"):]
body = re.sub(r"<script>.*?</script>", "", body, flags=re.S)
attrs = re.findall(r'(title|aria-label|placeholder|alt)="([^"]*[ľščťžýáíéúäôňďĽŠČŤŽÝÁÍÉÚÄÔŇĎ][^"]*)"', body)
rep = [eval(p) for p in pairs]
print("\n== HTML atribúty (title/aria-label/placeholder/alt) so slovenčinou v tele index.html:", len(attrs))
for a, v in attrs:
    nahr = any(v in r for r in rep)
    print(f"  {a}=\"{v}\"  {'→ nahrádza generátor' if nahr else '(nenahrádza sa — EN admin/JS?)'}")
