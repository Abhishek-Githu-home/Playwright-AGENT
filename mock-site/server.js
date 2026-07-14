/**
 * Minimal zero-dependency static file server used to serve the local
 * "Amazon-style" demo storefront that the Playwright/Cucumber suite drives.
 *
 * Real amazon.in / flipkart.com are not reachable from this sandbox's
 * network policy, so this local storefront stands in for it. Point
 * BASE_URL at the real site (from an environment with internet access)
 * to run the same POM/step-definitions against production instead.
 */
const http = require('http');
const fs = require('fs');
const path = require('path');

const PUBLIC_DIR = path.join(__dirname, 'public');

const MIME_TYPES = {
  '.html': 'text/html; charset=UTF-8',
  '.js': 'text/javascript; charset=UTF-8',
  '.css': 'text/css; charset=UTF-8',
  '.json': 'application/json; charset=UTF-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
};

function requestListener(req, res) {
  let urlPath = decodeURIComponent(req.url.split('?')[0]);
  if (urlPath === '/') urlPath = '/index.html';

  const filePath = path.join(PUBLIC_DIR, urlPath);

  if (!filePath.startsWith(PUBLIC_DIR)) {
    res.writeHead(403);
    res.end('Forbidden');
    return;
  }

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Not found');
      return;
    }
    const ext = path.extname(filePath);
    res.writeHead(200, { 'Content-Type': MIME_TYPES[ext] || 'application/octet-stream' });
    res.end(data);
  });
}

function startServer(port = 0) {
  return new Promise((resolve) => {
    const server = http.createServer(requestListener);
    server.listen(port, '127.0.0.1', () => {
      const { port: boundPort } = server.address();
      resolve({ server, port: boundPort, url: `http://127.0.0.1:${boundPort}` });
    });
  });
}

module.exports = { startServer };

if (require.main === module) {
  const port = Number(process.env.PORT) || 4173;
  startServer(port).then(({ url }) => {
    console.log(`Amazon-style demo storefront running at ${url}`);
  });
}
