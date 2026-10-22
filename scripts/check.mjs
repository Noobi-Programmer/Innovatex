import { access, readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const required = [
  'index.html',
  'demo.html',
  'research.html',
  'about.html',
  'src/app.js',
  'src/demo.js',
  'src/research.js',
  'src/styles.css',
  'src/lib/jaltrace-engine.mjs',
  'tests/jaltrace-domain.test.mjs',
];

for (const relativePath of required) {
  await access(join(root, relativePath));
}

const packageText = await readFile(join(root, 'package.json'), 'utf8');
JSON.parse(packageText);
console.log(`Checked ${required.length} required application files and package.json.`);
