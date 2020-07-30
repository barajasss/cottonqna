self.addEventListener('install', function (e) {
	console.log('service worker installed')
	e.waitUntil(
		caches.open('cottonqna-cache').then(cache => {
			return cache.addAll([
				'/index.html',
				'/cotton mcb.png',
				'/google icon.png',
				'/logo.png',
				'https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css',
				'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.14.0/css/all.min.css',
				'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.14.0/js/all.min.js',
				'https://code.jquery.com/jquery-3.5.1.min.js',
				'https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js',
			])
		})
	)
})


self.addEventListener('fetch', function (e) {
	e.respondWith(
		caches.match(e.request).then(res => {
			if (res) {
				return res
			}
			return fetch(e.request)
		})
	)
})
