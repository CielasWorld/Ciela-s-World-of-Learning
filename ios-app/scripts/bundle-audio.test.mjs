import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import { readFile, readdir } from 'node:fs/promises';
import { bundleAudio } from './bundle-audio.mjs';

const root = new URL('../../', import.meta.url);
const source = await readFile(new URL('index.html', root), 'utf8');
const files = await readdir(root);

test('iOS resolves existing voice and music without HTTP probes', () => {
  const bundled = bundleAudio(source, files);
  const start = bundled.indexOf('  function candidates(stem)');
  const end = bundled.indexOf('  /* Clips are found', start);
  const context = vm.createContext({audioReport: [], fetch(){ throw new Error('Offline: no HTTP discovery'); }});
  vm.runInContext(bundled.slice(start, end), context);
  const resolve = stem => { let result; context.findFile(stem, name => {result = name;}); return result; };
  assert.equal(resolve('theme'), 'theme.mp3');
  assert.equal(resolve('title-theme'), 'title-theme.mp3');
  assert.equal(resolve('find-1'), 'audiofind-1.mp3');
  assert.equal(resolve('calm-in'), 'calm-in.wav');
  assert.equal(resolve('missing-clip'), null);
  const audio = files.filter(name => /\.(wav|mp3|ogg|m4a)$/i.test(name));
  for (const name of audio) {
    // Verify every bundled file is resolvable with the original preference order.
    const stem = name.replace(/\.(wav|mp3|ogg|m4a)$/i, '');
    const expected = [stem+'.wav', stem+'.mp3', 'audio'+stem+'.mp3'].find(candidate=>files.includes(candidate));
    if (expected) assert.equal(resolve(stem), expected);
  }
  assert.ok(audio.length > 100);
  assert.ok(!bundled.slice(start,end).includes('fetch('));
});

test('missing required narration fails packaging instead of silently shipping', () => {
  assert.throws(()=>bundleAudio(source,files.filter(name=>name !== 'audiofind-1.mp3')), /Required bundled audio missing/);
});
