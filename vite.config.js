// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
// import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),        // <-- TW4
    // VitePWA({
    //   registerType: 'autoUpdate',
    //   manifest: {
    //     name: 'Gym Manager',
    //     short_name: 'GymApp',
    //     theme_color: '#10b981',
    //     background_color: '#111827',
    //     display: 'standalone',
    //     icons: [
    //       { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
    //       { src: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    //     ],
    //   },
    // }),
  ],
});