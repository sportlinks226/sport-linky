#!/bin/bash
# D-2-lighthouse.sh — Lighthouse 12.8.2: mobil (predvolené = Moto G Power, slow 4G simulácia, 4× CPU) + desktop pre domov
export CHROME_PATH=/opt/pw-browsers/chromium
S=/tmp/claude-0/-home-user/eed11a80-25e6-51b3-88cc-2253d64cd8b2/scratchpad
LH=$S/tools/node_modules/.bin/lighthouse
OUT=$S/findings/lighthouse-gzip
BLOCK='--blocked-url-patterns=*gc.zgo.at* --blocked-url-patterns=*goatcounter.com* --blocked-url-patterns=*tipsport.sk* --blocked-url-patterns=*sportlinky.sk* --blocked-url-patterns=*sportlinking.com*'
run(){ # názov url [extra]
  $LH "$2" $3 $BLOCK --only-categories=performance,accessibility,best-practices,seo --chrome-flags="--headless --no-sandbox" --output=json --output=html --output-path=$OUT/$1 --quiet 2>&1 | tail -2
  echo "hotovo: $1"
}
run mobil-domov "http://127.0.0.1:8135/"
run mobil-anglicko "http://127.0.0.1:8135/futbal/kluby/europa/anglicko/"
run mobil-aktualne "http://127.0.0.1:8135/aktualne/"
run mobil-en-domov "http://127.0.0.1:8136/"
run mobil-championship "http://127.0.0.1:8135/futbal/kluby/europa/anglicko/championship/"
run desktop-domov "http://127.0.0.1:8135/" "--preset=desktop"
echo VSETKO_HOTOVO
