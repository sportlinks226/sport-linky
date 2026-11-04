// D-gzip-server.js — lokálna náhrada GitHub Pages: gzip pre text, Cache-Control: max-age=600, ETag/Last-Modified + 304, 404.html so stavom 404
const http=require('http'),fs=require('fs'),path=require('path'),zlib=require('zlib'),crypto=require('crypto');
const [root, port] = [process.argv[2], +process.argv[3]];
const MIME={'.html':'text/html; charset=utf-8','.json':'application/json; charset=utf-8','.txt':'text/plain; charset=utf-8','.png':'image/png','.ico':'image/x-icon','.svg':'image/svg+xml','.xml':'application/xml','.js':'text/javascript','.css':'text/css'};
const cache=new Map();
function load(f){ if(cache.has(f)) return cache.get(f); const b=fs.readFileSync(f); const st=fs.statSync(f); const ext=path.extname(f); const text=/\.(html|json|txt|svg|xml|js|css)$/.test(ext);
  const o={raw:b, gz:text?zlib.gzipSync(b,{level:6}):null, etag:'"'+crypto.createHash('md5').update(b).digest('hex').slice(0,16)+'"', mtime:st.mtime.toUTCString(), type:MIME[ext]||'application/octet-stream'}; cache.set(f,o); return o; }
http.createServer((req,res)=>{
  let p=decodeURIComponent(req.url.split('?')[0]); if(p.endsWith('/')) p+='index.html';
  let f=path.join(root,p); let status=200;
  if(!fs.existsSync(f)||fs.statSync(f).isDirectory()){ if(fs.existsSync(f)&&fs.statSync(f).isDirectory()){ res.writeHead(301,{Location:p+'/'}); res.end(); return; } f=path.join(root,'404.html'); status=404; }
  const o=load(f);
  const h={'Content-Type':o.type,'Cache-Control':'max-age=600','ETag':o.etag,'Last-Modified':o.mtime,'Vary':'Accept-Encoding','Accept-Ranges':'bytes','Server':'GitHub.com (napodobnenina)'};
  if(status===200 && (req.headers['if-none-match']===o.etag || req.headers['if-modified-since']===o.mtime)){ res.writeHead(304,h); res.end(); return; }
  const gz=o.gz && /gzip/.test(req.headers['accept-encoding']||'');
  if(gz) h['Content-Encoding']='gzip';
  const body=gz?o.gz:o.raw; h['Content-Length']=body.length; res.writeHead(status,h); res.end(req.method==='HEAD'?undefined:body);
}).listen(port,'127.0.0.1',()=>console.log('gzip server',root,'na',port));
