# release-on-my-mind-note-app

Showcase + release site for **StickyNote**, built with [Astro](https://astro.build) and
framer-motion. Designed to grow into a full portfolio.

- **Products** — live (StickyNote landing + downloads).
- **About / Contact** — intentionally **disabled** (placeholders) until the portfolio phase.

## Develop

```bash
npm install
npm run dev        # http://localhost:4321
```

## Publish the app binaries onto the site

The download buttons serve files from `public/downloads/`. To build StickyNote and
copy the installer + portable + MSI there (with an auto-generated `manifest.json`):

```bash
npm run publish:artifacts   # builds the Tauri app, then copies + writes manifest
# or, if you already built the app:
pwsh scripts/publish-artifacts.ps1 -SkipBuild
```

It expects the app repo at `../on-my-mind-note`. The script reads the real version and
file sizes from the build output, so the site updates itself each release.

## Build the static site

```bash
npm run build      # -> dist/  (deploy to GitHub Pages, Netlify, Cloudflare Pages...)
npm run release    # publish:artifacts + build, in one go
```

> The `.exe`/`.msi` are git-ignored (too large for a repo). For real distribution,
> host them on **GitHub Releases** and point the manifest `file` values at those URLs —
> the Download component already supports absolute URLs.

## When it becomes a portfolio

Re-enable the nav links in `src/components/Nav.astro` and flesh out
`src/pages/about.astro` and `src/pages/contact.astro`.
