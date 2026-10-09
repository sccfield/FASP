const C='fasp-v6',P=new URL(self.location).searchParams.get('page')||'./';
self.addEventListener('install',e=>e.waitUntil(caches.open(C).then(c=>Promise.all(['./',P,'manifest.webmanifest','icon-192.png','icon-512.png'].map(u=>c.add(u).catch(()=>{})))).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;e.respondWith(caches.match(e.request).then(h=>{const n=fetch(e.request).then(r=>{if(r.ok||r.type==='opaque')caches.open(C).then(c=>c.put(e.request,r.clone()));return r}).catch(()=>h);return h||n}))});
