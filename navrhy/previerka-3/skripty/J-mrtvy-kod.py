#!/usr/bin/env python3 -I
"""Mŕtvy kód: JS funkcie/globály, CSS triedy, HTML id v index.html; Python funkcie v generator.py.
Použitie sa overuje v index.html + generator.py + testy/*.py (CSS aj v HTML, ktoré vyrába generator.py)."""
import re, glob
SK = "/home/user/sport-linky"
html = open(f"{SK}/index.html", encoding="utf-8").read()
gen = open(f"{SK}/generator.py", encoding="utf-8").read()
tests = "".join(open(p, encoding="utf-8").read() for p in glob.glob(f"{SK}/testy/*.py"))
others = "".join(open(p, encoding="utf-8").read() for p in (f"{SK}/ikony.py", f"{SK}/vlajky.py", f"{SK}/strazca_liniek.py"))
ALL = html + gen + tests + others

# --- JS: skript bloky
scripts = re.findall(r"<script>(.*?)</script>", html, re.S)
js = "\n".join(scripts)
css = re.search(r"<style>(.*?)</style>", html, re.S).group(1)
body = html[html.index("<body>"):]

def strip_comments(s):
    s = re.sub(r"/\*.*?\*/", "", s, flags=re.S)
    s = re.sub(r"(?m)^\s*//.*$", "", s)
    s = re.sub(r"(?<=[;{}\)])\s*//[^\n'\"]*$", "", s, flags=re.M)
    return s
jsn = strip_comments(js)

funcs = re.findall(r"^function\s+([A-Za-z_$][\w$]*)\s*\(", jsn, re.M)
lets = re.findall(r"^(?:let|const)\s+([A-Za-z_$][\w$]*)", jsn, re.M)
# viacnásobné deklarácie "let a = 1, b = 2;"
for m in re.finditer(r"^(?:let|const)\s+(.+?);\s*$", jsn, re.M):
    for part in m.group(1).split(","):
        nm = part.strip().split("=")[0].strip()
        if re.fullmatch(r"[A-Za-z_$][\w$]*", nm) and nm not in lets:
            lets.append(nm)
print(f"== JS: funkcií na najvyššej úrovni: {len(funcs)}, globálnych let/const: {len(lets)} (spolu {len(funcs)+len(lets)} mien na window/globálne)")
code_no_decl = jsn
unused = []
for f in funcs:
    n = len(re.findall(rf"\b{re.escape(f)}\b", html)) + len(re.findall(rf"\b{re.escape(f)}\b", gen)) + len(re.findall(rf"\b{re.escape(f)}\b", tests))
    if n <= 1:
        unused.append(f)
print("JS funkcie bez jediného použitia (mimo definície) v index.html+generator.py+testy:", unused)
once = []
for v in lets:
    n = len(re.findall(rf"\b{re.escape(v)}\b", html))
    if n <= 1:
        once.append(v)
print("JS globálne premenné bez použitia (len deklarácia):", once)

# --- CSS triedy
defined = set(re.findall(r"\.([a-zA-Z_][\w-]*)", re.sub(r"\{[^}]*\}", "", css)))
used_src = body + gen + "".join(scripts)
unused_css = []
for c in sorted(defined):
    pats = [rf"class=\"[^\"]*\b{re.escape(c)}\b", rf"class='[^']*\b{re.escape(c)}\b", rf"classList\.(add|toggle|remove|contains)\(['\"]{re.escape(c)}['\"]",
            rf"className\s*=\s*['\"][^'\"]*\b{re.escape(c)}\b", rf"class=\${{[^}}]*{re.escape(c)}", rf"class=\"\${{[^\"]*\b{re.escape(c)}\b",
            rf"['\" ]{re.escape(c)}['\" ]", rf"\b{re.escape(c)}\b"]
    hit = any(re.search(p, used_src) for p in pats[:6])
    if not hit:
        # posledná záchrana: slovo sa vyskytuje v šablónach/JS mimo <style>
        hit = bool(re.search(rf"(?<![\w.-]){re.escape(c)}(?![\w-])", used_src))
    if not hit:
        unused_css.append(c)
print(f"== CSS tried definovaných: {len(defined)}; bez použitia v HTML/JS/generator.py: {unused_css}")

# --- HTML id
ids = re.findall(r'\sid="([^"]+)"', body)
dup = [i for i in set(ids) if ids.count(i) > 1]
unused_ids = []
for i in sorted(set(ids)):
    n = len(re.findall(rf"\b{re.escape(i)}\b", html)) + len(re.findall(rf"\b{re.escape(i)}\b", gen)) + len(re.findall(rf"\b{re.escape(i)}\b", tests))
    if n <= 1:
        unused_ids.append(i)
print(f"== HTML id: {len(set(ids))}, duplicitné: {dup}, nikde neodkazované (JS/CSS/generator/testy): {unused_ids}")

# --- Python funkcie v generator.py
pf = re.findall(r"^def\s+(\w+)\(", gen, re.M)
pun = [f for f in pf if len(re.findall(rf"\b{re.escape(f)}\b", gen + tests)) <= 1]
print(f"== generator.py funkcií: {len(pf)}, bez použitia: {pun}")
for mod, path in (("ikony.py", f"{SK}/ikony.py"), ("vlajky.py", f"{SK}/vlajky.py"), ("strazca_liniek.py", f"{SK}/strazca_liniek.py")):
    src = open(path, encoding="utf-8").read()
    fs = re.findall(r"^def\s+(\w+)\(", src, re.M)
    un = [f for f in fs if len(re.findall(rf"\b{re.escape(f)}\b", src + gen + tests)) <= 1]
    print(f"== {mod} funkcií: {len(fs)}, bez použitia: {un}")

# --- dĺžky JS funkcií (najdlhšie)
lines = js.split("\n")
starts = [(i, m.group(1)) for i, l in enumerate(lines) if (m := re.match(r"^(?:async\s+)?function\s+(\w+)\s*\(", l))]
lens = []
for k, (i, name) in enumerate(starts):
    # koniec = riadok '}' na začiatku riadku
    j = i + 1
    while j < len(lines) and not lines[j].startswith("}"):
        j += 1
    lens.append((j - i + 1, name, i))
lens.sort(reverse=True)
print("== Najdlhšie JS funkcie (riadky):", [(n, l) for l, n, _ in lens[:12]])
# --- dĺžky Python funkcií
pl = []
gl = gen.split("\n")
ps = [(i, m.group(1)) for i, l in enumerate(gl) if (m := re.match(r"^def\s+(\w+)\(", l))]
for k, (i, name) in enumerate(ps):
    end = ps[k+1][0] if k + 1 < len(ps) else len(gl)
    # odstrihni prázdne/komentáre na konci
    pl.append((end - i, name))
pl.sort(reverse=True)
print("== Najdlhšie Python funkcie v generator.py (riadky do ďalšieho def):", pl[:8])
# --- DB.nodes.find vs nodeById
print("== DB.nodes.find( výskytov v JS:", len(re.findall(r"DB\.nodes\.find\(", js)), "| nodeById( výskytov:", len(re.findall(r"\bnodeById\(", js)))
print("== document.getElementById výskytov:", len(re.findall(r"document\.getElementById\(", js)))
print("== addEventListener na najvyššej úrovni (window/document/prvok):", len(re.findall(r"^(?:window|document|document\.getElementById\([^)]*\))\.addEventListener", jsn, re.M)))
print("== onclick= v HTML/šablónach index.html:", len(re.findall(r"onclick=", html)))
