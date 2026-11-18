/* Give every published asset revision a new version, including audio or rule changes. */
const cachePrefix = 'likely-english-offline-';
const cacheName = cachePrefix + '20261118-1';
const scope = new URL(self.registration.scope);

importScripts('./voices.js');

const shellFiles = [
  'index.html', 'styles.css', 'app.js', 'cards.js', 'rules.js', 'voices.js',
  'app.webmanifest', 'station.webp', 'install-qr.png',
  'icons/icon-192.png', 'icons/icon-512.png', 'icons/apple-180.png'
];
const audioFiles = new Set(Object.values(self.VOICES));
const assetUrl = path => new URL(path, scope).href;

self.addEventListener('install', event => {
  event.waitUntil((async () => {
    const cache = await caches.open(cacheName);
    const requests = [...shellFiles, ...audioFiles].map(path =>
      new Request(assetUrl(path), { cache: 'reload' })
    );
    // addAll commits the whole set together. A failed download prevents activation.
    await cache.addAll(requests);
  })());
});

self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    // A new worker waits for old tabs to close, preserving ongoing practice.
    const names = await caches.keys();
    await Promise.all(names
      .filter(name => name.startsWith(cachePrefix) && name !== cacheName)
      .map(name => caches.delete(name)));
    await self.clients.claim();
  })());
});

async function audioRange(response, range) {
  const match = /^bytes=(\d*)-(\d*)$/i.exec(range.trim());
  if (!match || (!match[1] && !match[2])) return response;

  const audio = await response.blob();
  const size = audio.size;
  const suffix = !match[1];
  const start = suffix ? Math.max(0, size - Number(match[2])) : Number(match[1]);
  const end = suffix || !match[2] ? size - 1 : Math.min(Number(match[2]), size - 1);
  if (start >= size || start > end) {
    return new Response(null, { status: 416, headers: {
      'Accept-Ranges': 'bytes',
      'Content-Range': 'bytes */' + size
    } });
  }

  const type = response.headers.get('content-type') || 'audio/mpeg';
  return new Response(audio.slice(start, end + 1, type), {
    status: 206,
    headers: {
      'Content-Type': type,
      'Content-Range': 'bytes ' + start + '-' + end + '/' + size,
      'Content-Length': String(end - start + 1),
      'Accept-Ranges': 'bytes'
    }
  });
}

self.addEventListener('fetch', event => {
  const request = event.request;
  const url = new URL(request.url);
  if (request.method !== 'GET' || url.origin !== scope.origin ||
      !url.pathname.startsWith(scope.pathname)) return;

  event.respondWith((async () => {
    const cache = await caches.open(cacheName);
    const path = url.pathname.slice(scope.pathname.length);
    const key = !path && request.mode === 'navigate' ? assetUrl('index.html') : url.href;
    // Look up the full response by URL so Safari's Range header never affects the cache key.
    const cached = await cache.match(key, { ignoreSearch: true });
    if (!cached) return fetch(request);
    const range = request.headers.get('range');
    return range && audioFiles.has(path) ? audioRange(cached, range) : cached;
  })());
});
