const channel4Broadcast = new BroadcastChannel('channel4');
const CACHE_NAME = "version-1";
 const urlsToCache =[];
  // ["/static/js/bundle.js"
// , "/static/media/WorldMap.2586dc1b.svg"
// , "/static/media/fontawesome-webfont.af7ae505.woff2"
// , "/static/media/Yekan.05727d32.woff"
// ,"/favicon.ico"
// ,"/index.html"
// ,"/login"
// ,"/rental"
// ,"/images/flowers32.png"
// ,"/images/flowers64.png"
// ,"/images/flowers512.png"
// ];



const self = this;

// Install SW and Get all assets added in urlsToCache and save them in cashe
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      // Static Cache
      //return cache.addAll(urlsToCache);
       return null;      
    })
  );
});



// addEventListener('fetch', event => {
//   // Prevent the default, and handle the request ourselves.
//   event.respondWith(async function() {
//     // Try to get the response from a cache.
//     const cachedResponse = await caches.match(event.request);
//     // Return it if we found one.
//     if (cachedResponse) return cachedResponse;
//     // If we didn't find a match in the cache, use the network.
//     return fetch(event.request);
//   }());
// });


// self.addEventListener('fetch', event=> {
//   event.respondWith(
//       fetch(event.request).catch(function() {
//           return caches.match(event.request)
//       })
//   )
// })

self.addEventListener('fetch', (e) => {
  if (!(e.request.url.indexOf('http') === 0) 
  || (e.request.url.indexOf('sockjs-node') !== -1)
  || (e.request.url.indexOf('hot-update') !== -1)
  || (e.request.method === "POST")
  )
   return;
  e.waitUntil(
  e.respondWith((async () => {
    try {
      // First Of All Get Assets And Data From Network And Cache Them
      const response = await fetch(e.request);
      const cache = await caches.open(CACHE_NAME);
      cache.put(e.request, response.clone());
      //localStorage.removeItem('onlineStatus');
      return response;  
    } catch (error) {
      // If You Are Offline Then Get Assets And Data From Cache
      const r = await caches.match(e.request,{ignoreVary:true}); // {ignoreVary:true} is added just for accessing cached data of backend  
      //localStorage.setItem('onlineStatus', 'Offline');
      channel4Broadcast.postMessage({offline: true});
      if (r) { return r; }  
    }
    
  })())
  );
});

// Activate the SW
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [];
  cacheWhitelist.push(CACHE_NAME);

  event.waitUntil(
      caches.keys().then((cacheNames) => Promise.all(
          cacheNames.map((cacheName) => {
              if(!cacheWhitelist.includes(cacheName)) {
                  return caches.delete(cacheName);
              }
          })
      ))
          
  )
});



// const OFFLINE_VERSION = 1;
// const CACHE_NAME = 'offline';
// // Customize this with a different URL if needed.
// const OFFLINE_URL = ["/", "/static/js/bundle.js", "/static/media/2.c1102a94.jpg"
// , "/static/media/fontawesome-webfont.af7ae505.woff2"
// ,"/favicon.ico"
// ,"/index.html"
// ,"/login"
// ,"/rental"
// ];

// self.addEventListener('install', (event) => {
//   event.waitUntil((async () => {
//     const cache = await caches.open(CACHE_NAME);
//     // Setting {cache: 'reload'} in the new request will ensure that the response
//     // isn't fulfilled from the HTTP cache; i.e., it will be from the network.
//     await cache.addAll(OFFLINE_URL);
//   })());
// });

// self.addEventListener('activate', (event) => {
//   event.waitUntil((async () => {
//     // Enable navigation preload if it's supported.
//     // See https://developers.google.com/web/updates/2017/02/navigation-preload
//     if ('navigationPreload' in self.registration) {
//       await self.registration.navigationPreload.enable();
//     }
//   })());

//   // Tell the active service worker to take control of the page immediately.
//   self.clients.claim();
// });

// self.addEventListener('fetch', (event) => {
//   // We only want to call event.respondWith() if this is a navigation request
//   // for an HTML page.
//   if (event.request.mode === 'navigate') {
//     event.respondWith((async () => {
//       try {
//         // First, try to use the navigation preload response if it's supported.
//         const preloadResponse = await event.preloadResponse;
//         if (preloadResponse) {
//           return preloadResponse;
//         }

//         const networkResponse = await fetch(event.request);
//         return networkResponse;
//       } catch (error) {
//         // catch is only triggered if an exception is thrown, which is likely
//         // due to a network error.
//         // If fetch() returns a valid HTTP response with a response code in
//         // the 4xx or 5xx range, the catch() will NOT be called.
//         console.log('Fetch failed; returning offline page instead.', error);

//         const cache = await caches.open(CACHE_NAME);
//         const cachedResponse = await cache.matchAll(OFFLINE_URL);
//         return cachedResponse;
//       }
//     })());
//   }

//   // If our if() condition is false, then this fetch handler won't intercept the
//   // request. If there are any other fetch handlers registered, they will get a
//   // chance to call event.respondWith(). If no fetch handlers call
//   // event.respondWith(), the request will be handled by the browser as if there
//   // were no service worker involvement.
// });