import { createServer } from 'node:http';
import { createReadStream } from 'node:fs';
import { stat } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('.', import.meta.url));
const port = Number(process.env.PORT || 4173);
const routes = {
  '/': '/index.html',
  '/demo': '/demo.html',
  '/research': '/research.html',
  '/about': '/about.html',
};
const contentTypes = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
};

const safePath = (requestUrl) => {
  const requestPath = new URL(requestUrl, `http://localhost:${port}`).pathname;
  const routed = routes[requestPath] || requestPath;
  const clean = normalize(routed).replace(/^([.]{2}[\\/])+/, '');
  return join(root, clean);
};

const server = createServer(async (request, response) => {
  try {
    const filePath = safePath(request.url || '/');
    const info = await stat(filePath);
    if (!info.isFile()) throw new Error('Not a file');
    response.writeHead(200, {
      'Content-Type': contentTypes[extname(filePath)] || 'application/octet-stream',
      'Cache-Control': 'no-cache',
    });
    createReadStream(filePath).pipe(response);
  } catch {
    response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    response.end('JalTrace route not found. Try /, /demo, /research or /about.');
  }
});

server.listen(port, '127.0.0.1', () => {
  console.log(`JalTrace running at http://localhost:${port}`);
});
