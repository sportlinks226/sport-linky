"""Spoločné pomôcky pre skripty G-*.py (previerka dát). data.json sa LEN číta."""
import csv
import json
import os
import re
import unicodedata

DATA = "/home/user/sport-linky/data.json"
AKT = "/home/user/sport-linky/aktualne.json"
OUT = "/tmp/claude-0/-home-user/eed11a80-25e6-51b3-88cc-2253d64cd8b2/scratchpad/findings/data"
os.makedirs(OUT, exist_ok=True)


def slugify(name):
    """Rovnaké ako generator.py / index.html."""
    s = unicodedata.normalize("NFD", name or "")
    s = "".join(c for c in s if not unicodedata.combining(c))
    s = s.lower()
    s = re.sub(r"[^a-z0-9]+", "-", s)
    return s.strip("-")


def load():
    with open(DATA, encoding="utf-8") as f:
        return json.load(f)


class Tree:
    def __init__(self, data):
        self.data = data
        self.nodes = data["nodes"]
        self.by_id = {}
        self.children = {}
        for n in self.nodes:
            self.by_id[n.get("id")] = n
            self.children.setdefault(n.get("parentId"), []).append(n)
        for lst in self.children.values():
            lst.sort(key=lambda x: _num(x.get("order")))

    def path_nodes(self, n):
        out = []
        seen = set()
        cur = n
        while cur is not None and cur.get("id") not in seen:
            seen.add(cur.get("id"))
            out.append(cur)
            cur = self.by_id.get(cur.get("parentId")) if cur.get("parentId") is not None else None
        return list(reversed(out))

    def path(self, n, lang="sk"):
        key = "name_en" if lang == "en" else "name"
        return " › ".join((p.get(key) or p.get("name") or "?") for p in self.path_nodes(n))

    def depth(self, n):
        return len(self.path_nodes(n))

    def kids(self, nid):
        return self.children.get(nid, [])

    def link_count(self, nid, _memo=None):
        """Počet liniek v celom podstrome."""
        if _memo is None:
            _memo = {}
        if nid in _memo:
            return _memo[nid]
        c = 0
        for k in self.kids(nid):
            if k.get("type") == "link":
                c += 1
            else:
                c += self.link_count(k["id"], _memo)
        _memo[nid] = c
        return c

    def top(self, n):
        p = self.path_nodes(n)
        return p[0] if p else None


def _num(v):
    try:
        return float(v)
    except (TypeError, ValueError):
        return 0.0


def write_csv(name, header, rows):
    p = os.path.join(OUT, name)
    with open(p, "w", encoding="utf-8", newline="") as f:
        w = csv.writer(f)
        w.writerow(header)
        for r in rows:
            w.writerow(r)
    print(f"  -> {p} ({len(rows)} riadkov)")
    return p
