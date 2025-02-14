const CACHE_NAME = "quiztituzione";
const urlsToCache = [
    "/codice/Home.html",
    "/codice/Script.js",
    "/codice/home.css",
    "/Immagini/",
];

// Installazione del Service Worker e caching delle risorse
self.addEventListener("install", event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            console.log("Caching delle risorse");
            return cache.addAll(urlsToCache);
        })
    );
});

// Intercettazione delle richieste di rete
self.addEventListener("fetch", event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request);
        })
    );
});

// Aggiornamento del Service Worker
self.addEventListener("activate", event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if (cache !== CACHE_NAME) {
                        console.log("Eliminazione vecchia cache", cache);
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
});
