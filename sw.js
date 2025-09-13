const CACHE_NAME = 'portfolio-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/css/style.css',
  '/js/script.js',
  '/manifest.json',
  'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700&display=swap',
  'https://github.com/rohitkusharma.png' // GitHub profile picture for favicon/icons
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});

self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});