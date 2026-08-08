import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  integrations: [react()],
  // Deployed to GitHub Pages as the user site (repo: rohanayush.github.io),
  // so it is served from the root rather than a project subpath.
  site: 'https://rohanayush.github.io',
  base: '/',
  vite: {
    // The dev server could otherwise hand framer-motion its own copy of React,
    // which nulls the hook dispatcher and blanks the hydrated islands (the
    // Download cards). Production bundling never had the problem; this keeps
    // dev honest too.
    resolve: { dedupe: ['react', 'react-dom'] },
    optimizeDeps: { include: ['react', 'react-dom', 'react-dom/client', 'framer-motion'] },
  },
});
