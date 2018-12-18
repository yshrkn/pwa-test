// キャッシュ名とキャッシュファイルの指定
var CACHE_NAME = 'pwa-sample-caches';
var urlsToCache = [
	'./index.html',
	'./pages/a.html',
	'./pages/b.html',
	'./pages/c.html',
	'./css/style.css',
	'./images/a.jpg',
	'./images/b.jpg',
	'./images/c.jpg',
];

// インストール処理
self.addEventListener('install', function(event) {
	event.waitUntil(
		caches
			.open(CACHE_NAME)
			.then(function(cache) {
				return cache.addAll(urlsToCache);
			})
	);
});

// リソースフェッチ時のキャッシュロード処理
self.addEventListener('fetch', function(event) {
	event.respondWith(
		caches
			.match(event.request)
			.then(function(response) {
				return response ? response : fetch(event.request);
			})
	);
});
