const CACHE_NAME = "quiztituzione";
const appFiles = [
    "manifest.json",
    "index.html",
    "Script.js",
    "Home.css",
    "Immagini/assistenza.webp",
    "Immagini/bandieraItalia.webp",
    "Immagini/bandieraRM.png",
    "Immagini/collegamento.webp",
    "Immagini/Emblem_of_Italy.png",
    "Immagini/home.webp",
    "Immagini/iconWebApp.png",
    "Immagini/impostazioni.webp",
    "Immagini/indietro.png",
    "Immagini/italia.png",
    "Immagini/libro.png",
    "Immagini/logoCrema.png",
    "Immagini/logogalilei.png",
    "Immagini/logolungo.jpg",
    "Immagini/logoRM.png",
    "Immagini/logoSenzaScritte.webp",
    "Immagini/lunRM.png",
    "Immagini/mailRM.png",
    "Immagini/nome_articoliInGioco.png",
    "Immagini/nome_Quiztituzionr.png",
    "Immagini/nome_quiztituzione_capslock.png",
    "Immagini/profilo.webp",
    "Immagini/tellRM.png",
    "Immagini/tema.webp",
    "Immagini/utenteRM.png",
    "FJson/articoli.json",
    "FJson/camere.json",
    "FJson/cittadinanza.json",
    "FJson/cittadinanza.json",
    "FJson/domandeCostituzione.json",
    "FJson/domandeCultura.json",
    "FJson/elezioni.json",
    "FJson/grammatica.json",
    "FJson/letteratura.json",
    "FJson/storia.json",
    "certificato/certificato.pdf",
    "Font/TitilliumWeb-Regular.ttf",
    "Font/TitilliumWeb-Bold.ttf",
    "Font/TitilliumWeb-ExtraLight.ttf",
    "Font/TitilliumWeb-Light.ttf",
    "Font/TitilliumWeb-LightItalic.ttf",
    "Font/TitilliumWeb-SemiBold.ttf"
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
