import { cp, mkdir, readdir, rm, stat } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, resolve, join } from 'node:path';
const appDir = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const root = resolve(appDir, '..');
const dest = join(appDir, 'www');
await rm(dest, { recursive: true, force: true });
await mkdir(dest, { recursive: true });
const allowed = /\.(html|css|js|json|png|jpe?g|webp|svg|ico|mp3|wav|ogg|m4a|woff2?|ttf)$/i;
for (const entry of await readdir(root, { withFileTypes: true })) {
  if (entry.isFile() && allowed.test(entry.name)) {
    await cp(join(root, entry.name), join(dest, entry.name));
  }
}
await stat(join(dest, 'index.html'));
const { readFile } = await import('node:fs/promises');
const html = await readFile(join(dest, 'index.html'), 'utf8');
if (!html.includes('id="tiles"')) throw new Error('Expected the full game source, not the public coming-soon page.');
console.log('Bundled game and media files locally for iOS.');
