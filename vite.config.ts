import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import legacy from '@vitejs/plugin-legacy';
import { fileURLToPath, URL } from 'node:url'
import type { Plugin } from 'vite'

/**
 * Plugin para eliminar el atributo `crossorigin` del HTML generado.
 * Algunos navegadores de TV (webOS/Tizen) fallan con CORS al cargar
 * scripts locales con `crossorigin` desde el protocolo file://.
 */
function removeCrossOrigin(): Plugin {
  return {
    name: 'remove-crossorigin',
    transformIndexHtml(html) {
      return html
        .replace(/ crossorigin="[^"]*"/g, '')
        .replace(/ crossorigin(?=[^=]|$)/g, '');
    },
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    legacy({
      targets: ['Chrome >= 26', 'Safari >= 9'],
      additionalLegacyPolyfills: ['regenerator-runtime/runtime', 'whatwg-fetch', 'abortcontroller-polyfill/dist/abortcontroller-polyfill-only'],
      renderLegacyChunks: true,
      modernPolyfills: true,
    }),
    removeCrossOrigin(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  base: './',
  build: {
    target: 'es2015',
    minify: 'terser',
    cssMinify: false, // Preserve double declarations for webOS 1-3 (Chrome < 49 doesn't support var())
    outDir: 'dist',
    rollupOptions: {
      output: {
        entryFileNames: `assets/[name].js`,
        chunkFileNames: `assets/[name].js`,
        assetFileNames: `assets/[name].[ext]`
      }
    }
  }
});