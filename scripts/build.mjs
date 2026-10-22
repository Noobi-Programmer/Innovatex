import { cp, mkdir, rm, stat } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const dist = join(root, 'dist');

await rm(dist, { recursive: true, force: true });
await mkdir(dist, { recursive: true });

for (const entry of ['index.html', 'demo.html', 'research.html', 'about.html', 'src']) {
  await cp(join(root, entry), join(dist, entry), { recursive: true });
}

const built = await stat(join(dist, 'index.html'));
if (!built.isFile() || built.size === 0) throw new Error('Build output index.html is empty.');
console.log(`Built local JalTrace presentation to ${dist}`);
