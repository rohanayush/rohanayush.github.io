import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  integrations: [react()],
  // Set `site` + `base` if you deploy under a GitHub Pages subpath, e.g.:
  // site: 'https://yourname.github.io',
  // base: '/release-on-my-mind-note-app',
});
