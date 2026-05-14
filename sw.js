const CACHE_NAME = 'lernapp-v3'; // Neue Version fuer ES-Modul-Struktur

// Kern-Assets, die immer gecacht werden
const CORE_ASSETS = [
    'index.html',
    'app.js',
    'manifest.json'
];

self.addEventListener('install', e => {
    self.skipWaiting();
    e.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            return cache.addAll(CORE_ASSETS);
        })
    );
});

self.addEventListener('activate', e => {
    e.waitUntil(
        caches.keys().then(keys => {
            return Promise.all(
                keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
            );
        })
    );
});

self.addEventListener('fetch', e => {
    const url = new URL(e.request.url);

    // Dynamisches Caching fuer alle Subject-Dateien (Runtime Cache-First)
    if (url.pathname.includes('/subjects/')) {
        e.respondWith(
            caches.match(e.request).then(cached => {
                const fetchPromise = fetch(e.request).then(response => {
                    if (response.ok) {
                        const clone = response.clone();
                        caches.open(CACHE_NAME).then(cache => cache.put(e.request, clone));
                    }
                    return response;
                });
                return cached || fetchPromise;
            })
        );
        return;
    }

    // Standard: Cache-First fuer alle anderen Requests
    e.respondWith(
        caches.match(e.request).then(response => {
            return response || fetch(e.request);
        })
    );
});
