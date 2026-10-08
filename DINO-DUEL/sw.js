/*
 * DINO DUEL の前の公開場所の「オフライン用の係」を片づける係。
 * ホーム画面に追加していた人の端末では、前の係がゲームをしまったまま動き続けるので、
 * この係に入れかわって、しまっていたものを消し、自分も止まり、開いている画面を読み直す
 * （読み直すと、新しい場所への案内のページが開く）。
 */
self.addEventListener('install', function () { self.skipWaiting(); });
self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys()
      .then(function (keys) { return Promise.all(keys.filter(function (k) { return k.indexOf('dino-duel') === 0; }).map(function (k) { return caches.delete(k); })); })
      .then(function () { return self.registration.unregister(); })
      .then(function () { return self.clients.matchAll({ type: 'window' }); })
      .then(function (list) { list.forEach(function (c) { c.navigate(c.url); }); })
  );
});
