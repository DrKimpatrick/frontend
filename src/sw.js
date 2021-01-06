importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.4.1/workbox-sw.js');

if (workbox) {
    console.log(`Yay! Workbox is loaded 🎉`);
  } else {
    console.log(`Boo! Workbox didn't load 😬`);
  }


workbox.skipWaiting();
workbox.clientsClaim();
/* eslint-disable-next-line no-restricted-globals */
workbox.precaching.precacheAndRoute(self.__precacheManifest || []);

workbox.routing.registerRoute(
    new RegExp('http:.*\.(js|css|html|jpg|jpeg|ico|json)'),
    workbox.strategies.staleWhileRevalidate()
)



//SKIP_PREFLIGHT_CHECK=true
