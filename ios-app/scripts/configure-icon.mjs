import { execFileSync } from 'node:child_process';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const source = fileURLToPath(new URL('../branding/ciela-chispa-icon.jpg', import.meta.url));
const catalog = new URL('../ios/App/App/Assets.xcassets/AppIcon.appiconset/', import.meta.url);
const contents = JSON.parse(await readFile(new URL('Contents.json', catalog), 'utf8'));
const image = contents.images.find(entry => entry.size === '1024x1024' && entry.idiom === 'universal');
if (!image?.filename || image.filename.includes('/') || image.filename.includes('..')) {
  throw new Error('App icon catalog changed; review before building.');
}
const target = fileURLToPath(new URL(image.filename, catalog));
execFileSync('sips', ['-s', 'format', 'png', source, '--out', target], { stdio: 'pipe' });
const png = await readFile(target);
if (png.toString('hex', 0, 8) !== '89504e470d0a1a0a' ||
    png.readUInt32BE(16) !== 1024 || png.readUInt32BE(20) !== 1024 ||
    ![0, 2].includes(png[25])) {
  throw new Error('App icon must be an opaque 1024x1024 PNG.');
}
console.log('Installed Ciela and Chispa app icon: opaque 1024x1024 PNG.');
