import { VitePWA } from 'vite-plugin-pwa';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      includeAssets: [
        'index.html',
        'offline.html',
        'pitang_with_brids.jpg',
        'favicon.svg',
        'favicon.ico',
        'robots.txt',
        'apple-touch-icon.png',
      ],
      manifest: {
        theme_color: '#ffffff',
        background_color: '#4a90e2',
        display: 'standalone',
        scope: '/',
        start_url: '/',
        short_name: '\u305f\u3066\u30c4\u30a4\u30fc\u30c8',
        description:
          '\u7e26\u66f8\u304d\u30c4\u30a4\u30fc\u30c8\u3092\u3059\u308b\u305f\u3081\u306e\u30c4\u30fc\u30eb\u3002',
        name: '\u305f\u3066\u30c4\u30a4\u30fc\u30c8',
        icons: [
          {
            src: 'icon-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'icon-256x256.png',
            sizes: '256x256',
            type: 'image/png',
          },
          {
            src: 'icon-384x384.png',
            sizes: '384x384',
            type: 'image/png',
          },
          {
            src: 'icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: 'icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable',
          },
        ],
      },
    }),
  ],
});
