const CACHE_NAME = "quiztituzione";
const appFiles = [
    "manifest.json",
    "Quiztituzione/codice/Home.html",
    "Quiztituzione/codice/Script.js",
    "Quiztituzione/codice/home.css",
    "Quiztituzione/codice/Immagini/assistenza.webp",
    "Quiztituzione/codice/Immagini/bandieraItalia.webp",
    "Quiztituzione/codice/Immagini/bandieraRM.png",
    "Quiztituzione/codice/Immagini/collegamento.webp",
    "Quiztituzione/codice/Immagini/Emblem_of_Italy.png",
    "Quiztituzione/codice/Immagini/home.webp",
    "Quiztituzione/codice/Immagini/iconWebApp.png",
    "Quiztituzione/codice/Immagini/impostazioni.webp",
    "Quiztituzione/codice/Immagini/indietro.png",
    "Quiztituzione/codice/Immagini/italia.png",
    "Quiztituzione/codice/Immagini/libro.png",
    "Quiztituzione/codice/Immagini/logoCrema.png",
    "Quiztituzione/codice/Immagini/logogalilei.png",
    "Quiztituzione/codice/Immagini/logolungo.jpg",
    "Quiztituzione/codice/Immagini/logoRM.png",
    "Quiztituzione/codice/Immagini/logoSenzaScritte.webp",
    "Quiztituzione/codice/Immagini/lunRM.png",
    "Quiztituzione/codice/Immagini/mailRM.png",
    "Quiztituzione/codice/Immagini/nome_articoliInGioco.png",
    "Quiztituzione/codice/Immagini/nome_Quiztituzionr.png",
    "Quiztituzione/codice/Immagini/nome_quiztituzione_capslock.png",
    "Quiztituzione/codice/Immagini/profilo.webp",
    "Quiztituzione/codice/Immagini/tellRM.png",
    "Quiztituzione/codice/Immagini/tema.webp",
    "Quiztituzione/codice/Immagini/utenteRM.png",
    "Quiztituzione/codice/FJson/articoli.json",
    "Quiztituzione/codice/FJson/camere.json",
    "Quiztituzione/codice/FJson/cittadinanza.json",
    "Quiztituzione/codice/FJson/cittadinanza.json",
    "Quiztituzione/codice/FJson/domandeCostituzione.json",
    "Quiztituzione/codice/FJson/domandeCultura.json",
    "Quiztituzione/codice/FJson/elezioni.json",
    "Quiztituzione/codice/FJson/grammatica.json",
    "Quiztituzione/codice/FJson/letteratura.json",
    "Quiztituzione/codice/FJson/storia.json",
    "Quiztituzione/codice/certificato/certificato.pdf",
    "Quiztituzione/codice/Font/TitilliumWeb-Regular.ttf",
    "Quiztituzione/codice/Font/TitilliumWeb-Bold.ttf",
    "Quiztituzione/codice/Font/TitilliumWeb-ExtraLight.ttf",
    "Quiztituzione/codice/Font/TitilliumWeb-Light.ttf",
    "Quiztituzione/codice/Font/TitilliumWeb-LightItalic.ttf",
    "Quiztituzione/codice/Font/TitilliumWeb-SemiBold.ttf"
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
