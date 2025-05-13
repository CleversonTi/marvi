// Utilities
import { defineConfig } from 'vite'
// vite.config.js
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'https://waysuplementos.bisws.com.br/rest/all/V1',
        changeOrigin: true,
        secure: false,
        rewrite: path => path.replace(/^\/api/, ''),
      }
    }
  }
});