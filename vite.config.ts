import viteReact from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

import eslint from 'vite-plugin-eslint';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [viteReact(), eslint()],
  server: {
    port: 3000,
    proxy: {
      // '/api': 'http://localhost:3000',
    },
  },
  // base: '/',
  // build: {
  //   outDir: 'dist',
  //   assetsDir: 'assets',
  //   emptyOutDir: true,
  // },
  // resolve: {
  //   extensions: ['.js', '.mjs', '.ts', '.jsx', '.tsx', '.json'],
  // },
});
