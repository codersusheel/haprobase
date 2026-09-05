// const CACHE_NAME = 'haproID-cache-v4';   // bump version when you change assets
// const OFFLINE_URL = '/offline.html';
// const NOT_FOUND_URL = '/404.html';
// const FORBIDDEN_URL = '/403.html';

// const STATIC_ASSETS = [
//   '/',
//   '/index.html',
//   '/404.html',
//   '/403.html',
//   '/offline.html'
// ];

// /* ================= INSTALL ================= */
// self.addEventListener('install', (event) => {
//   event.waitUntil(
//     caches.open(CACHE_NAME)
//       .then(cache => cache.addAll(STATIC_ASSETS))
//       .then(() => self.skipWaiting())
//   );
// });

// /* ================= ACTIVATE ================= */
// self.addEventListener('activate', (event) => {
//   event.waitUntil(
//     caches.keys().then(keys =>
//       Promise.all(
//         keys
//           .filter(key => key !== CACHE_NAME)
//           .map(key => caches.delete(key))
//       )
//     ).then(() => self.clients.claim())
//   );
// });

// /* ================= FETCH ================= */
// self.addEventListener('fetch', (event) => {
//   const { request } = event;

//   // Only handle GET requests
//   if (request.method !== 'GET') return;

//   // ===== HTML Navigation (Network First) =====
//   if (request.mode === 'navigate') {
//     event.respondWith(
//       fetch(request)
//         .then(response => {
//           // Cache the successful response
//           if (response.ok) {
//             const clone = response.clone();
//             caches.open(CACHE_NAME).then(cache => cache.put(request, clone));
//           }

//           // Handle 404
//           if (response.status === 404) {
//             return caches.match(NOT_FOUND_URL);
//           }

//           // Handle 403
//           if (response.status === 403) {
//             return caches.match(FORBIDDEN_URL);
//           }

//           return response;
//         })
//         .catch(async () => {
//           // Offline → try cached page, then offline.html
//           const cached = await caches.match(request);
//           return cached || caches.match(OFFLINE_URL);
//         })
//     );
//     return;
//   }

//   // ===== CSS / JS / Images / Fonts (Stale-While-Revalidate) =====
//   event.respondWith(
//     caches.match(request).then(cachedResponse => {
//       const networkFetch = fetch(request)
//         .then(networkResponse => {
//           // Only cache successful responses
//           if (networkResponse && networkResponse.ok) {
//             const clone = networkResponse.clone();
//             caches.open(CACHE_NAME).then(cache => cache.put(request, clone));
//           }
//           return networkResponse;
//         })
//         .catch(() => cachedResponse); // network failed → use cache

//       // Return cache immediately if available, otherwise wait for network
//       return cachedResponse || networkFetch;
//     })
//   );
// });







































const CACHE_NAME = 'haproven-cache-v5'; // Update version on asset changes

const OFFLINE_URL = '/offline.html';
const NOT_FOUND_URL = '/404.html';
const FORBIDDEN_URL = '/403.html';

const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/404.html',
  '/403.html',
  '/offline.html',
  // Yahan apni main CSS aur JS files ka relative path bhi daal sakte hain:
  // '/css/style.css',
  // '/js/app.js'
];

/* ================= INSTALL ================= */
// Pre-cache static critical assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      // force request mode to reload to avoid stale HTTP cache on install
      return cache.addAll(STATIC_ASSETS.map(url => new Request(url, { cache: 'reload' })));
    }).then(() => self.skipWaiting())
  );
});

/* ================= ACTIVATE ================= */
// Clean up old caches immediately
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

/* ================= FETCH ================= */
self.addEventListener('fetch', (event) => {
  const { request } = event;

  // Ignore non-GET and non-HTTP(S) requests (e.g., chrome-extension://)
  if (request.method !== 'GET' || !request.url.startsWith('http')) return;

  // 1. ===== HTML Navigation (Network-First with Dynamic Error Pages) =====
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then(async (response) => {
          // Handle HTTP Error status codes
          if (response.status === 404) {
            const notFoundPage = await caches.match(NOT_FOUND_URL);
            return notFoundPage || response;
          }
          if (response.status === 403) {
            const forbiddenPage = await caches.match(FORBIDDEN_URL);
            return forbiddenPage || response;
          }

          // Cache successful navigation responses
          if (response.ok) {
            const clone = response.clone();
            const cache = await caches.open(CACHE_NAME);
            cache.put(request, clone);
          }

          return response;
        })
        .catch(async () => {
          // Offline fallback
          const cachedResponse = await caches.match(request);
          if (cachedResponse) return cachedResponse;

          const offlinePage = await caches.match(OFFLINE_URL);
          return offlinePage || new Response('You are offline', {
            status: 503,
            statusText: 'Service Unavailable',
            headers: new Headers({ 'Content-Type': 'text/plain' })
          });
        })
    );
    return;
  }

  // 2. ===== Static Assets: CSS, JS, Images, Fonts (Stale-While-Revalidate) =====
  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      // Background fetch to update cache for next time
      const fetchPromise = fetch(request)
        .then(async (networkResponse) => {
          if (networkResponse && networkResponse.ok && networkResponse.type === 'basic') {
            const cache = await caches.open(CACHE_NAME);
            cache.put(request, networkResponse.clone());
          }
          return networkResponse;
        })
        .catch(() => {
          // Fail silently in background if network is unavailable
        });

      // Serve instantly from cache if available, otherwise wait for network
      return cachedResponse || fetchPromise;
    })
  );
});