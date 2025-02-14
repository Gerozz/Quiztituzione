const CACHE_NAME = "quiztituzione";
const appFiles = [
    "manifest.json",
    "Quiztituzione/codice/Home.html",
    "Quiztituzione/codice/Script.js",
    "Quiztituzione/codice/home.css",
    "Quiztituzione/Immagini/assistenza.webp",
    "Quiztituzione/Immagini/bandieraItalia.webp",
    "Quiztituzione/Immagini/bandieraRM.png",
    "Quiztituzione/Immagini/collegamento.webp",
    "Quiztituzione/Immagini/Emblem_of_Italy.png",
    "Quiztituzione/Immagini/home.webp",
    "Quiztituzione/Immagini/iconWebApp.png",
    "Quiztituzione/Immagini/impostazioni.webp",
    "Quiztituzione/Immagini/indietro.png",
    "Quiztituzione/Immagini/italia.png",
    "Quiztituzione/Immagini/libro.png",
    "Quiztituzione/Immagini/logoCrema.png",
    "Quiztituzione/Immagini/logogalilei.png",
    "Quiztituzione/Immagini/logolungo.jpg",
    "Quiztituzione/Immagini/logoRM.png",
    "Quiztituzione/Immagini/logoSenzaScritte.webp",
    "Quiztituzione/Immagini/lunRM.png",
    "Quiztituzione/Immagini/mailRM.png",
    "Quiztituzione/Immagini/nome_articoliInGioco.png",
    "Quiztituzione/Immagini/nome_Quiztituzionr.png",
    "Quiztituzione/Immagini/nome_quiztituzione_capslock.png",
    "Quiztituzione/Immagini/profilo.webp",
    "Quiztituzione/Immagini/tellRM.png",
    "Quiztituzione/Immagini/tema.webp",
    "Quiztituzione/Immagini/utenteRM.png",
    "Quiztituzione/FJson/articoli.json",
    "Quiztituzione/FJson/camere.json",
    "Quiztituzione/FJson/cittadinanza.json",
    "Quiztituzione/FJson/cittadinanza.json",
    "Quiztituzione/FJson/domandeCostituzione.json",
    "Quiztituzione/FJson/domandeCultura.json",
    "Quiztituzione/FJson/elezioni.json",
    "Quiztituzione/FJson/grammatica.json",
    "Quiztituzione/FJson/letteratura.json",
    "Quiztituzione/FJson/storia.json",
    "Quiztituzione/certificato/certificato.pdf",
    "Quiztituzione/Font/TitilliumWeb-Regular.ttf",
    "Quiztituzione/Font/TitilliumWeb-Bold.ttf",
    "Quiztituzione/Font/TitilliumWeb-ExtraLight.ttf",
    "Quiztituzione/Font/TitilliumWeb-Light.ttf",
    "Quiztituzione/Font/TitilliumWeb-LightItalic.ttf",
    "Quiztituzione/Font/TitilliumWeb-SemiBold.ttf",
];

self.addEventListener("install", event => {
    console.log('[serviceWorker] Install');
    const filesUpdate = cache =>{
        const stack=[];
        appFiles.forEach(file=>stack.push(
            cache.add(file).catch(_=>console.error("can't load ${file} to cache"))
        ));
        return Promise.all(stack);
    };
    e.waitUntil(caches.open(CACHE_NAME).then(filesUpdate));
});

self.addEventListener("fetch", (e) => {
    e.respondWith(
        (async()=>{
            const r=await caches.match(e.request);
            console.log(`[serviceWorker] Fetching resource: ${e.request.url}`);
            if(r){
                return r;
            }
            const response=await fetch(e.request);
            const cache=await caches.open(CACHE_NAME);
            console.log(`[serviceWorker] Caching new resource: ${e.request.url}`);
            cache.put(e.request,response.clone());
            return response;
        })()
    );
});

self.addEventListener("activate", event => {
    console.log('[serviceWorker] Activate');
});
