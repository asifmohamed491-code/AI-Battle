const CACHE_NAME = "campus-wayfinder-shell-v1";

self.addEventListener("install", (event) => {
  event.waitUntil(self.skipWaiting());
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) =>
        Promise.all(
          cacheNames
            .filter(
              (cacheName) =>
                cacheName.startsWith("campus-wayfinder-shell-") &&
                cacheName !== CACHE_NAME,
            )
            .map((cacheName) => caches.delete(cacheName)),
        ),
      )
      .then(() => self.clients.claim()),
  );
});

self.addEventListener("fetch", (event) => {
  const request = event.request;
  const url = new URL(request.url);

  if (
    request.method !== "GET" ||
    request.mode !== "navigate" ||
    url.origin !== self.location.origin ||
    url.pathname !== "/"
  ) {
    return;
  }

  event.respondWith(
    fetch(request)
      .then((response) => {
        if (response.ok && response.type === "basic") {
          return caches
            .open(CACHE_NAME)
            .then((cache) => cache.put("/", response.clone()))
            .then(() => response)
            .catch((error) => {
              console.error("Campus Wayfinder shell could not be cached.", error);
              return response;
            });
        }
        return response;
      })
      .catch(async (error) => {
        const cache = await caches.open(CACHE_NAME);
        const cachedShell = await cache.match("/");
        if (cachedShell) return cachedShell;
        throw error;
      }),
  );
});
