# Vloží do KÓPIE data.json a aktualne.json škodlivé hodnoty (XSS skúška). Originál v repozitári sa nemení.
import json, sys
src = sys.argv[1]
d = json.load(open(src + '/data.json', encoding='utf-8'))
# koreňový priečinok "Hokej" -> f_hok? nájdi koreňové priečinky
roots = [n for n in d['nodes'] if n.get('parentId') is None and n.get('type')=='folder']
root = roots[0]
print('koreň:', root['id'], root['name'])
EV = '<img src=x onerror=window.__XSS=(window.__XSS||0)+1>'
# 1) škodlivý priečinok priamo pod koreňom
fx = {"id": "xss'f\"<>", "parentId": root['id'], "type": "folder",
      "name": EV + " Pokus", "name_en": EV + " Test",
      "desc": "popis </script><script>window.__XSS2=1</script>", "desc_en": "d </script>",
      "icon": '"onmouseover="alert(1)', "slug": "../..?a=1&b=<x>", "slug_en": "../?q", "order": 0}
# 2) škodlivá linka v tom priečinku
lx1 = {"id": "xssl1", "parentId": fx['id'], "type": "link", "name": EV + " javascript linka",
       "desc": "x\" onmouseover=\"window.__XSS3=1", "url": "javascript:window.__XSS4=1", "icon": "🔗", "order": 0,
       "fb": "javascript:window.__XSS5=1", "ig": "data:text/html,<script>window.__XSS6=1</script>"}
lx2 = {"id": "xss'l2", "parentId": fx['id'], "type": "link", "name": "data linka </script>",
       "desc": "</script><img src=x onerror=window.__XSS7=1>", "url": "data:text/html,<script>parent.__XSS8=1</script>",
       "icon": '<svg onload=window.__XSS9=1>', "order": 1, "tag": "<b onclick=1>"}
# 3) škodlivá linka priamo v koreňovom priečinku (aby bola v BOOT/mini-balíku)
lx3 = {"id": "xssl3", "parentId": root['id'], "type": "link", "name": EV + " v koreni", "desc": "</script>",
       "url": "https://example.com/?a=1&b=<x>\"'", "order": -5}
d['nodes'] = [fx, lx1, lx2, lx3] + d['nodes']
d['title'] = 'Športové Linky</title><script>window.__XSS10=1</script>'
d['subtitle'] = '<img src=x onerror=window.__XSS11=1>'
# banner s obrázkom javascript: a html bez <script> (img onerror)
d.setdefault('banners', []).insert(0, {"id": "bxss'", "name": "xss", "imageUrl": "javascript:alert(1)", "linkUrl": "javascript:window.__XSS12=1", "alt": "\"><img src=x onerror=window.__XSS13=1>", "active": True, "slot": 1, "weight": 10})
d['bannerSettings'] = {"rotate": False, "interval": 30, "activeId": "bxss'"}
d['promos'] = [{"id": "pxss", "title": "<img src=x onerror=window.__XSS14=1>", "text": "</script>", "btnText": "<b>x</b>", "btnUrl": "javascript:window.__XSS15=1", "active": True, "weight": 10}]
json.dump(d, open(src + '/data.json', 'w', encoding='utf-8'), ensure_ascii=False)
a = json.load(open(src + '/aktualne.json', encoding='utf-8'))
a['items'].insert(0, {"id": "axss'", "order": -1, "sport": "tenis", "icon": "<svg onload=window.__XSS16=1>", "name": EV + " Aktuálne", "name_en": EV,
                      "url": "javascript:window.__XSS17=1", "desc": "\"><img src=x onerror=window.__XSS18=1>", "desc_en": "", "startsAt": "", "endsAt": "", "disabled": False, "addedAt": 1784538636873})
json.dump(a, open(src + '/aktualne.json', 'w', encoding='utf-8'), ensure_ascii=False)
print('hotovo', len(d['nodes']))
