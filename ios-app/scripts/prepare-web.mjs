import { cp, mkdir, readdir, rm, stat, readFile, writeFile } from 'node:fs/promises';
import { bundleAudio } from './bundle-audio.mjs';
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
const html = await readFile(join(dest, 'index.html'), 'utf8');
if (!html.includes('id="tiles"')) throw new Error('Expected the full game source, not the public coming-soon page.');
let bundled = bundleAudio(html, await readdir(dest));
// Test instrumentation never enters a signed release or production bundle.
if (process.env.CIELA_AUDIO_TEST === '1') {
  const diagnostics = await readFile(join(appDir, 'release/audio-playback-probe.js'), 'utf8');
  bundled = bundled.replace('<script>', '<script>' + diagnostics + '</script>\n<script>');
}
await writeFile(join(dest, 'index.html'), bundled);
console.log('Bundled game and media files locally for iOS.');
