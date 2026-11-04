// Native test bundle only. Verify the real WKWebView media clock advances,
// rather than merely checking file existence or a successful play() call.
(function(){
  var original = HTMLMediaElement.prototype.play;
  HTMLMediaElement.prototype.play = function(){
    var media = this;
    if (!media.dataset.audioProbe) {
      media.dataset.audioProbe = '1';
      media.addEventListener('timeupdate', function(){
        if (media.paused || media.currentTime < 0.15) return;
        var name = new URL(media.currentSrc || media.src, location.href).pathname.split('/').pop();
        var id = 'audio-probe-' + name;
        if (!document.getElementById(id)) {
          var result = document.createElement('p');
          result.id = id;
          result.textContent = 'Audio verified: ' + name;
          result.style.cssText = 'position:fixed;top:' + (40 + document.querySelectorAll('[id^="audio-probe-"]').length * 18) + 'px;left:0;z-index:99999;background:white;color:black;font:12px sans-serif;pointer-events:none';
          document.body.appendChild(result);
        }
      });
    }
    return original.apply(media, arguments);
  };
})();
