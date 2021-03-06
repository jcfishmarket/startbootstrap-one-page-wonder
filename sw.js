var cacheName = 'hello-world-page';
var filesToCache = [
  '/',
  '/index.html',
  '/css/one-page-wonder.css',
  '/vendor/bootstrap/css/bootstrap.min.css',
  '/vendor/jquery/jquery.min.js',
  '/vendor/bootstrap/js/bootstrap.bundle.min.js',
  '/img/slide1.jpg',
  '/img/slide2.jpg',
  '/img/slide3.jpg',
  '/img/header-bg.jpg',
  'https://fonts.googleapis.com/css?family=Catamaran:100,200,300,400,500,600,700,800,900',
  'https://fonts.googleapis.com/css?family=Lato:100,100i,300,300i,400,400i,700,700i,900,900i'
  
];
self.addEventListener('install', function(e) {
  console.log('[ServiceWorker] Install');
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      console.log('[ServiceWorker] Caching app shell');
      return cache.addAll(filesToCache);
    })
  );
});
self.addEventListener('activate',  event => {
  event.waitUntil(self.clients.claim());
});
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request, {ignoreSearch:true}).then(response => {
      return response || fetch(event.request);
    })
  );
});
