import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'icons/*.png'],
      manifest: {
        name: 'Camino a la Primera Comunión',
        short_name: 'Mi Primera Comunión',
        description:
          'Acompaña a tu hijo o hija en el camino hacia su Primera Comunión: lecciones, juegos, oraciones y guía para padres.',
        theme_color: '#FDF6E9',
        background_color: '#FDF6E9',
        display: 'standalone',
        orientation: 'portrait',
        lang: 'es',
        dir: 'ltr',
        start_url: '/',
        scope: '/',
        categories: ['education', 'kids'],
        icons: [
          {
            src: 'icons/icon-192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'icons/icon-512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: 'icons/maskable-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },
      workbox: {
        // El shell de la app queda precacheado (offline-first para la navegación).
        // Los MP3 de narración (public/audio) también: el niño escucha sin conexión.
        globPatterns: ['**/*.{js,css,html,png,svg,ico,woff2,mp3}'],
        navigateFallback: '/index.html',
        navigateFallbackDenylist: [/^\/api\//],
        runtimeCaching: [
          {
            // Assets estáticos versionados: revalidar en segundo plano.
            urlPattern: ({ request }) =>
              ['style', 'script', 'worker'].includes(request.destination),
            handler: 'StaleWhileRevalidate',
            options: { cacheName: 'static-assets' },
          },
          {
            // Imágenes de contenido: cache-first con caducidad.
            urlPattern: ({ request }) => request.destination === 'image',
            handler: 'CacheFirst',
            options: {
              cacheName: 'images',
              expiration: { maxEntries: 200, maxAgeSeconds: 30 * 24 * 3600 },
            },
          },
        ],
      },
    }),
  ],
  test: {
    environment: 'jsdom',
    include: ['src/**/*.{test,spec}.{ts,tsx}'],
  },
})
