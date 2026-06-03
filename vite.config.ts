import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: true,
    open: true,
  },
  build: {
    rollupOptions: {
      input: {
        // portfolio (/) and the standalone storybook game (/journey.html)
        main: 'index.html',
        journey: 'journey.html',
      },
    },
  },
});
