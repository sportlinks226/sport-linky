// D-velkosti.js — nezbalená / gzip-9 / brotli veľkosť kľúčových súborov buildu
const fs=require('fs'),zlib=require('zlib'),path=require('path');
const root=process.argv[2];
const files=['index.html','404.html','futbal/kluby/europa/anglicko/index.html','futbal/kluby/europa/anglicko/championship/index.html','aktualne/index.html','futbal/index.html','data.json','data-full.json','aktualne.json','version.txt','favicon.ico','favicon.svg','apple-touch-icon.png','og-image.png','vlajky/24x18/gb-eng.png','vlajky/48x36/gb-eng.png','ikony/www.arsenal.com.png'];
console.log('| Súbor | nezbalené B | gzip -9 B | brotli B |');console.log('|---|---:|---:|---:|');
for(const f of files){const p=path.join(root,f);if(!fs.existsSync(p)){console.log('|'+f+'| chýba |||');continue;}
const b=fs.readFileSync(p);const g=zlib.gzipSync(b,{level:9}).length;const br=zlib.brotliCompressSync(b,{params:{[zlib.constants.BROTLI_PARAM_QUALITY]:11}}).length;
console.log(`| ${f} | ${b.length} | ${g} | ${br} |`);}
