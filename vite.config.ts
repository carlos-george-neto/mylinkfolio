import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import config from './src/config';

export default defineConfig({
  plugins: [react()],
  base: config.meta.basePath ?? '/',
  test: {
    environment: 'jsdom',
    globals: true,
  },
});
