// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// SITE is set by the GitHub Actions workflow (https://<user>.github.io).
export default defineConfig({
  site: process.env.SITE ?? 'http://localhost:4321',
  base: '/dance-challenge',
  vite: {
    plugins: [tailwindcss()],
  },
});
