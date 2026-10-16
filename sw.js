// App code and its built-in sound are cached for offline use.
// Microphone audio is never posted, cached, or written to disk by this app.
const CACHE = 'mimi-me-v1';
const APP_FILES = ['./','./index.html','./six-seven.mp3','./icon-192.png','./icon-512.png','./manifest.webmanifest'];
self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(APP_FILES)).then(()=>self.skipWaiting()));
});
self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));
});
self.addEventListener('fetch', event => {
  if(event.request.method!=='GET'||new URL(event.request.url).origin!==self.location.origin) return;
  event.respondWith(caches.match(event.request).then(found=>found||fetch(event.request)));
});
