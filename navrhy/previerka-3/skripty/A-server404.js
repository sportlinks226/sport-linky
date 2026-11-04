// Statický server, ktorý sa správa ako GitHub Pages: chýbajúca cesta → 404.html so stavom 404,
// adresár bez lomky → 301 s lomkou. Lokálny python http.server to nevie.
const http = require('http');
const fs = require('fs');
const path = require('path');
const zlib = require('zlib');
const GZ = /\.(html|json|js|css|svg|txt|xml)$/;
const root = process.argv[2];
const port = +process.argv[3] || 8125;
const types = { '.html': 'text/html; charset=utf-8', '.json': 'application/json', '.png': 'image/png', '.svg': 'image/svg+xml', '.txt': 'text/plain', '.xml': 'application/xml', '.ico': 'image/x-icon' };
http.createServer((req, res) => {
  let u = decodeURIComponent(req.url.split('?')[0].split('#')[0]);
  let fp = path.join(root, u);
  if (!fp.startsWith(root)) { res.writeHead(403); return res.end(); }
  if (fs.existsSync(fp) && fs.statSync(fp).isDirectory()) {
    if (!u.endsWith('/')) { res.writeHead(301, { Location: u + '/' }); return res.end(); }
    fp = path.join(fp, 'index.html');
  }
  if (fs.existsSync(fp) && fs.statSync(fp).isFile()) {
    const gz = GZ.test(fp) && /gzip/.test(req.headers['accept-encoding'] || '');
    res.writeHead(200, { 'Content-Type': types[path.extname(fp)] || 'application/octet-stream', 'Cache-Control': 'no-cache', ...(gz ? { 'Content-Encoding': 'gzip' } : {}) });
    return gz ? fs.createReadStream(fp).pipe(zlib.createGzip({ level: 6 })).pipe(res) : fs.createReadStream(fp).pipe(res);
  }
  res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
  fs.createReadStream(path.join(root, '404.html')).pipe(res);
}).listen(port, '127.0.0.1', () => console.log('404-server on', port, root));
