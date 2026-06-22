# on my mind — release & landing site

The showcase + release site for **on my mind**, *the note app that actually sticks* —
fully dynamic markdown notes that float on top of every app. Built with
[Astro](https://astro.build), React islands and framer-motion, and designed to grow
into a full portfolio.

- **Products** — live (the `on my mind` landing page + downloads).
- **About / Contact** — intentionally **disabled** (placeholders) until the portfolio phase.

## What the page shows

- A hero with real app screenshots and at-a-glance feature slabs
- A "why it's different" pitch (all-in-one, picture-in-picture, pin-to-spot, themeable)
- The headline feature — **live, in-place markdown** — in a colorful callout
- The home-manager screenshot and use-case notes (medicine / botany / biology) with
  original hand-drawn SVG illustrations

## Develop

```bash
npm install
npm run dev        # http://localhost:4321
```

## Images

Screenshots live in `public/images/` as **WebP**. Drop new `.png` files in there and run:

```bash
node scripts/to-webp.mjs   # converts PNG -> WebP (and caps home.png width)
```

The hand-drawn botanical illustrations (`art-*.svg`) are original inline SVG — no
external assets, crisp at any size.

## Publish the app binaries onto the site

The download buttons serve files from `public/downloads/`. To build the app and copy the
installer + portable + MSI there (with an auto-generated `manifest.json`):

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
