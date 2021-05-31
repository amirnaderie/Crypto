const CACHE_NAME = "version-1";
const urlsToCache = ["/", "/static/js/bundle.js", "/static/media/2.c1102a94.jpg"
, "/static/media/fontawesome-webfont.af7ae505.woff2"
,"/favicon.ico"
,"/index.html"
,"/login"
];

const self = this;

// Install SW and Get all assets added in urlsToCache and save them in cashe
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.warn("caching assets");
      return cache.addAll(urlsToCache);
    })
  );
});

// Listen for any request browser made to fetch assets from server
//and might pick cashed asstes insead of fetching them from server
self.addEventListener("fetch", (event) => {
 // if (!navigator.online) {
    event.respondWith(
      caches.match(event.request).then(() => {
        return fetch(event.request).catch(() => caches.match("offline.html"));
      })
    );
 // }
});
