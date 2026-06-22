import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  integrations: [react()],
  // Deployed to GitHub Pages under a project subpath.
  site: 'https://rohanayush.github.io',
  base: '/release-on-my-mind-note/',
});
