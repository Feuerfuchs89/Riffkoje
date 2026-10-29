/* Service Worker: App-Hülle offline, Bibliotheken (Tone, OSMD, PDF.js, Schriften) nach dem ersten Laden aus dem Cache. */
const V = 'musikkoje-v9';
const SHELL = ['./', 'index.html', 'geigenpult.html', 'riffkoje.html', 'theorie.html', 'akkorde.html', 'tabs.html', 'whistle.html', 'einstellungen.html', 'shared.js', 'manifest.webmanifest', 'icon-192.png', 'icon-512.png', 'icon-maskable-512.png', 'apple-touch-icon.png', 'icon.svg'];
const CDN = ['cdnjs.cloudflare.com', 'cdn.jsdelivr.net', 'unpkg.com', 'fonts.googleapis.com', 'fonts.gstatic.com'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(V).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== V).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin === location.origin) {
    // eigene Dateien: erst Netz (damit Updates ankommen), sonst Cache
    e.respondWith(fetch(req).then(r => {
      if (r.ok) { const copy = r.clone(); caches.open(V).then(c => c.put(req, copy)); }
      return r;
    }).catch(() => caches.match(req).then(r => r || caches.match('index.html'))));
  } else if (CDN.includes(url.hostname)) {
    // Bibliotheken: erst Cache, sonst Netz und merken
    e.respondWith(caches.match(req).then(hit => hit || fetch(req).then(r => {
      if (r.ok || r.type === 'opaque') { const copy = r.clone(); caches.open(V).then(c => c.put(req, copy)); }
      return r;
    })));
  }
});
