const CACHE_NAME = 'lernapp-v2'; // Version erhöht

self.addEventListener('install', e => {
  self.skipWaiting();
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      const ASSETS = [
        'index.html',
        'app.js',
        'manifest.json',
        'subjects/english_6r.js',
        'subjects/math_6r.js',
        'subjects/german_6r.js',
        'subjects/history_6r.js',
        'subjects/geography_6r.js',
        'subjects/minecraft_6r.js',
        'subjects/phys_8g.js',
        'subjects/eng_8g.js',
        'subjects/math_8g.js',
        'subjects/bio_8g.js',
        'subjects/lat_8g.js'
      ];
      return cache.addAll(ASSETS);
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
  e.respondWith(
    caches.match(e.request).then(response => {
      return response || fetch(e.request);
    })
  );
});
