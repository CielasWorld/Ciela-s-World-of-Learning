// Capacitor serves media using URLResponse, not HTTPURLResponse. A HEAD
// fetch therefore cannot use Response.ok to discover local audio files.
export function bundleAudio(html, files) {
  const audio = files.filter(name => /\.(wav|mp3|ogg|m4a)$/i.test(name)).sort();
  for (const name of ['theme.mp3', 'title-theme.mp3', 'audiofind-1.mp3']) {
    if (!audio.includes(name)) throw new Error(`Required bundled audio missing: ${name}`);
  }
  const start = html.indexOf('  function findFile(stem, done){');
  const end = html.indexOf('\n  /* Clips are found', start);
  if (start < 0 || end < 0) throw new Error('Audio resolver changed; review iOS bundling patch.');
  const resolver = `  var bundledAudioFiles = new Set(${JSON.stringify(audio)});
  function findFile(stem, done){
    var name = candidates(stem).find(function(candidate){
      return bundledAudioFiles.has(candidate);
    }) || null;
    audioReport.push(stem + (name ? ' -> ' + name : ': -'));
    done(name);
  }
`;
  return html.slice(0, start) + resolver + html.slice(end);
}
