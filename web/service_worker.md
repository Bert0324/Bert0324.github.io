# Service Worker

## Permission

Compared to Web Worker, Service Worker has higher permission.

<table>
    <thead>
    <tr>
        <th>operation</th>
        <th>Web Worker</th>
        <th>Service Worker</th>
    </tr>
    </thead>
    <tbody>
    <tr>
        <td>close current tag</td>
        <td>close process</td>
        <td>keep process</td>
    </tr>
    <tr>
        <td>agent solicitation</td>
        <td>accessible</td>
        <td>unaccessible</td>
    </tr>
    <tr>
        <td>Cache Storage</td>
        <td>unaccessible</td>
        <td>accessible</td>
    </tr>
    <tr>
        <td>backgroud push</td>
        <td>no</td>
        <td>yes</td>
    </tr>
    <tr>
        <td>background sync</td>
        <td>no</td>
        <td>yes</td>
    </tr>
    <tr>
        <td>security requirement</td>
        <td>none</td>
        <td>must be https or localhost</td>
    </tr>
    </tbody>
</table>

## basic use

First of all, regist this Service Worker in main thread.

Next, in Service Worker script, in `install` event, define the files that needs to be save in caches, which is a read-only property returns the CacheStorage object associated with the service worker.

Then, in `fetch` event, get caches to load instead requesting to server.

```js
//main thread regist
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js').then(function(registration) {
    // Registration was successful
    console.log('ServiceWorker registration successful with scope: ',    registration.scope);
  }).catch(function(err) {
    // registration failed :(
    console.log('ServiceWorker registration failed: ', err);
  });
}
//sw.js
const cacheName = 'v1';
var assetsToCache = [   //the path of files that needs to be saved in caches
  '/styles/main.css',
  '/script/main.js'
];
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.addAll(assetsToCache);   //request files resource and save in caches
    }).then(function() {
      return self.skipWaiting();
    });
});
//intercept GET and check in caches  
self.addEventListener('fetch', function(event) {
  var requestUrl = new URL(event.request.url);
  if (requestUrl.origin === location.origin) {
      if (requestUrl.pathname === '/') {
      event.respondWith(
        caches.open(cacheName).then(function(cache) {
          return fetch(event.request).then(function(networkResponse) {
            cache.put(event.request, networkResponse.clone());
            return networkResponse;
          }).catch(function() {
            return cache.match(event.request);
          });
        })
      );
    }
  }
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});
```

About `caches` API, see [here](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/caches).

## Some tips

1. only `GET` request can be saved

2. Service Worker can receive fetch events in same path. For example, if the Service Worker file is in 
`/sub`, it can't get fetch event in path `/`.

3. caches size has limit. check [here](https://developers.google.com/web/fundamentals/instant-and-offline/web-storage/offline-for-pwa?).

4. By default, Service Work will update the file each 24 hours.

## workbox

Via Google's workbox, we don't need to write lots of Service Worker code to save caches and update files' version.
In create-react-app, it will be installed automatically. [workbox](https://developers.google.com/web/tools/workbox/).

If you use it to create React project, there is a file named `service-worker.js` and `precache-manifest.[hash].js` in the `build`, 
As below:

```js
//import workbox script
importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");
//import precache-manifest
importScripts(
  "/precache-manifest.2cd68ada852c92872b4d0460d6667f6f.js"
);

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

workbox.core.clientsClaim();

self.__precacheManifest = [].concat(self.__precacheManifest || []);
//declare the file that needs to be saved in caches
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

workbox.routing.registerNavigationRoute(workbox.precaching.getCacheKeyForURL("/index.html"), {
  
  blacklist: [/^\/_/,/\/[^\/]+\.[^\/]+$/],
});
```

And in precache-manifest we can see:

```json
self.__precacheManifest = (self.__precacheManifest || []).concat([
  {
    "revision": "1a3b75ef22b2e98cc7c9ebaba56d802b",
    "url": "/index.html"
  },
  {
    "revision": "7558c4b96fbf38782a1f",
    "url": "/static/css/main.237a1b42.chunk.css"
  },
  {
    "revision": "59d8ab21f38e8a1d3f64",
    "url": "/static/js/0.079d22b2.chunk.js"
  },
  {
    "revision": "01ad347310a4099197cb",
    "url": "/static/js/1.5cc2483c.chunk.js"
  },
  {
    "revision": "a1c05097c251637a6568",
    "url": "/static/js/4.3d58efea.chunk.js"
  },
  {
    "revision": "7558c4b96fbf38782a1f",
    "url": "/static/js/main.d8fc5b5b.chunk.js"
  },
  {
    "revision": "5ad2e17ec9d2caecd451",
    "url": "/static/js/runtime~main.3ac4b0b3.js"
  }
]);
```

The `url` is files' path, and the `revision` is the files' content hash value, which will be changed if files is changed.
In this way, workbox can know whether the file is updated.

## End

With the development of PWA, I believe Web App is able to be closed to Native App in many respects.

If there is some wrongs, welcome to leave a message.
