/* Offline-friendly files. Never caches or intercepts microphone recordings. */
const CACHE='mimi-magic-playhouse-v5-0';
const ASSETS=['./','./index.html','./style.css?v=5.0','./app.js?v=5.0','./six-seven.wav','./icon-192.png','./icon-512.png','./manifest.webmanifest'];
self.addEventListener('install', event=>{event.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',event=>{event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('mimi-magic-playhouse-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',event=>{
  const req=event.request;
  if(req.method!=='GET'||new URL(req.url).origin!==self.location.origin)return;
  if(req.mode==='navigate'){
    event.respondWith(fetch(req).catch(()=>caches.match('./index.html')));return;
  }
  event.respondWith(caches.match(req).then(cached=>cached||fetch(req)));
});
