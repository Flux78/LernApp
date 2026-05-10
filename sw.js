const CACHE_NAME = 'lernapp-v1';
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

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS)));
});

self.addEventListener('fetch', e => {
  e.respondWith(caches.match(e.request).then(response => response || fetch(e.request)));
});