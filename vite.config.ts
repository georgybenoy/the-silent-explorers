import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/three') || id.includes('@react-three')) {
            return 'three-vendor';
          }
          if (id.includes('node_modules/gsap') || id.includes('@gsap/react')) {
            return 'animation-vendor';
          }
          if (
            id.includes('node_modules/lucide-react') ||
            id.includes('node_modules/clsx') ||
            id.includes('node_modules/tailwind-merge')
          ) {
            return 'ui-vendor';
          }
        },
      },
    },
    target: 'es2022',
  },
});
