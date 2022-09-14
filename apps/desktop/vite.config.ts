import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import tsconfigPaths from 'vite-tsconfig-paths';
import icons from 'unplugin-icons/vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    icons({
			compiler: 'svelte',
		}),
    svelte(), 
    tsconfigPaths()
  ],
  clearScreen: false,
  server: {
    strictPort: true,
  },
  envPrefix: ['VITE_', 'TAURI_'],
  build: {
    target: ['es2021', 'chrome100', 'safari13'],
    minify: process.env.TAURI_DEBUG ? 'esbuild' : false,
    sourcemap: !!process.env.TAURI_DEBUG,
  },
  base: './',
  
});
