const CACHE_NAME = 'deliveryapp-v1';
const STATIC_CACHE = 'deliveryapp-static-v1';
const DYNAMIC_CACHE = 'deliveryapp-dynamic-v1';

// Archivos estáticos para cachear
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png'
];

// URLs de API para cachear dinámicamente
const API_URLS = [
  '/api/products',
  '/api/categories'
];

// Instalar Service Worker
self.addEventListener('install', (event) => {
  console.log('Service Worker: Installing...');
  
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => {
        console.log('Service Worker: Caching static assets');
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => {
        console.log('Service Worker: Static assets cached');
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error('Service Worker: Error caching static assets', error);
      })
  );
});

// Activar Service Worker
self.addEventListener('activate', (event) => {
  console.log('Service Worker: Activating...');
  
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
              console.log('Service Worker: Deleting old cache', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log('Service Worker: Activated');
        return self.clients.claim();
      })
  );
});

// Interceptar requests
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Estrategia Cache First para assets estáticos
  if (STATIC_ASSETS.some(asset => url.pathname === asset)) {
    event.respondWith(
      caches.match(request)
        .then((cachedResponse) => {
          return cachedResponse || fetch(request);
        })
    );
    return;
  }

  // Estrategia Network First para API calls
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          // Clonar la respuesta para poder usarla
          const responseClone = response.clone();
          
          // Cachear respuesta exitosa
          if (response.status === 200) {
            caches.open(DYNAMIC_CACHE)
              .then((cache) => {
                cache.put(request, responseClone);
              });
          }
          
          return response;
        })
        .catch(() => {
          // Si falla la red, intentar desde cache
          return caches.match(request)
            .then((cachedResponse) => {
              if (cachedResponse) {
                return cachedResponse;
              }
              
              // Respuesta offline por defecto
              return new Response(
                JSON.stringify({
                  error: 'Contenido no disponible offline',
                  offline: true
                }),
                {
                  status: 503,
                  statusText: 'Service Unavailable',
                  headers: {
                    'Content-Type': 'application/json'
                  }
                }
              );
            });
        })
    );
    return;
  }

  // Estrategia Stale While Revalidate para páginas
  event.respondWith(
    caches.open(DYNAMIC_CACHE)
      .then((cache) => {
        return cache.match(request)
          .then((cachedResponse) => {
            const fetchPromise = fetch(request)
              .then((networkResponse) => {
                // Actualizar cache con nueva respuesta
                if (networkResponse.status === 200) {
                  cache.put(request, networkResponse.clone());
                }
                return networkResponse;
              })
              .catch(() => {
                // Si no hay cache y falla la red, mostrar página offline
                if (!cachedResponse && request.destination === 'document') {
                  return caches.match('/offline.html') || 
                    new Response(
                      `<!DOCTYPE html>
                      <html>
                        <head>
                          <title>Sin conexión - DeliveryApp</title>
                          <meta name="viewport" content="width=device-width, initial-scale=1">
                          <style>
                            body { 
                              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                              text-align: center; 
                              padding: 50px; 
                              background: #f3f4f6;
                            }
                            .container {
                              max-width: 400px;
                              margin: 0 auto;
                              background: white;
                              padding: 40px;
                              border-radius: 12px;
                              box-shadow: 0 4px 6px rgba(0,0,0,0.1);
                            }
                            h1 { color: #2563eb; margin-bottom: 20px; }
                            p { color: #6b7280; line-height: 1.6; }
                            button {
                              background: #2563eb;
                              color: white;
                              border: none;
                              padding: 12px 24px;
                              border-radius: 8px;
                              cursor: pointer;
                              margin-top: 20px;
                            }
                          </style>
                        </head>
                        <body>
                          <div class="container">
                            <h1>📱 Sin conexión</h1>
                            <p>No tienes conexión a internet. Algunas funciones pueden no estar disponibles.</p>
                            <button onclick="window.location.reload()">Intentar de nuevo</button>
                          </div>
                        </body>
                      </html>`,
                      {
                        headers: { 'Content-Type': 'text/html' }
                      }
                    );
                }
                return cachedResponse;
              });

            // Devolver cache inmediatamente si existe, sino esperar por la red
            return cachedResponse || fetchPromise;
          });
      })
  );
});

// Manejar notificaciones push
self.addEventListener('push', (event) => {
  console.log('Service Worker: Push received');
  
  const options = {
    body: event.data ? event.data.text() : 'Nueva notificación de DeliveryApp',
    icon: '/icons/icon-192x192.png',
    badge: '/icons/icon-72x72.png',
    vibrate: [200, 100, 200],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore',
        title: 'Ver productos',
        icon: '/icons/icon-96x96.png'
      },
      {
        action: 'close',
        title: 'Cerrar',
        icon: '/icons/icon-96x96.png'
      }
    ]
  };

  event.waitUntil(
    self.registration.showNotification('DeliveryApp', options)
  );
});

// Manejar clicks en notificaciones
self.addEventListener('notificationclick', (event) => {
  console.log('Service Worker: Notification clicked');
  
  event.notification.close();

  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/products')
    );
  } else if (event.action === 'close') {
    // Solo cerrar la notificación
  } else {
    // Click en la notificación principal
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});

// Sincronización en background
self.addEventListener('sync', (event) => {
  console.log('Service Worker: Background sync', event.tag);
  
  if (event.tag === 'background-sync') {
    event.waitUntil(
      // Aquí puedes implementar lógica de sincronización
      console.log('Ejecutando sincronización en background')
    );
  }
});