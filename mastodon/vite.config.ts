import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite';
import type { UserConfig  } from 'vitest/config';

// https://vite.dev/config/
// export default defineConfig({
//   plugins: [react(), tailwindcss()],
//   test: {
//     environment: 'jsdom',
//     globals: true,
//     setupFiles: './src/setupTests.ts'
//   },
// })


const config: UserConfig = {
  plugins: [react(),tailwindcss()],
  test: {
    environment: 'jsdom', // For testing React components
    globals: true,
  },
};

export default defineConfig(config);