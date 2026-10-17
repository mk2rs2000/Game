/* Mimi V6.3 offline shell. Microphone audio is never intercepted or saved. */
const CACHE='mimi-magic-playhouse-v8-0';
const ASSETS=['./','./index.html','./style.css?v=8.0','./app.js?v=8.0','./six-seven.wav','./icon-192.png','./icon-512.png','./manifest.webmanifest',...['dance','bedroom','garden','kitchen','gem','art'].map(id=>`./rooms/${id}.svg`)];
self.addEventListener('install',event=>event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(ASSETS)).then(()=>self.skipWaiting())));
self.addEventListener('activate',event=>event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key.startsWith('mimi-magic-playhouse-')&&key!==CACHE).map(key=>caches.delete(key)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',event=>{
 const req=event.request,url=new URL(req.url);
 if(req.method!=='GET'||url.origin!==self.location.origin)return;
 const isAppFile=req.mode==='navigate'||/\/(?:index\.html|style\.css|app\.js)$/.test(url.pathname);
 if(isAppFile){event.respondWith(fetch(req).then(resp=>{if(resp.ok){const copy=resp.clone();caches.open(CACHE).then(c=>c.put(req,copy)).catch(()=>{});}return resp;}).catch(()=>caches.match(req).then(r=>r||(req.mode==='navigate'?caches.match('./index.html'):undefined))));}
 else{event.respondWith(caches.match(req).then(r=>r||fetch(req)));}
});
