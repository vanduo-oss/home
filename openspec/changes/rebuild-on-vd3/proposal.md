## Why

vanduo.dev is the public face of the Vanduo design system, yet its landing
page deliberately avoided depending on `@vanduo-oss/vd3` — hand-copying five
color literals and reimplementing the theme contract in plain HTML. The
page should dogfood the product it represents: install the published npm
package, import its core CSS and tokens, and drive the theme toggle through
vd3's `useThemePreference()` so preference persists across vanduo.dev and
vd3-docs.

## What Changes

- Replace the single static `index.html` with a Vue 3 + vite-ssg app that
  prerenders `/` to static HTML (SEO surface preserved).
- Install `@vanduo-oss/vd3@^1.1.0`; import `@vanduo-oss/vd3/css/core` and
  `app.use(VanduoVue)`; swap hand-copied color literals for `var(--vd-*)`
  token references; wire the theme toggle to `useThemePreference()`.
- Move static assets (`CNAME`, `.nojekyll`, `og-image.png`, fonts, SVG,
  `robots.txt`, `sitemap.xml`) into `public/`.
- Add CI (`ci.yml`) and GitHub Pages deploy (`deploy.yml`) mirroring
  vd3-docs conventions (pnpm 10.28.2, Node 24, pinned action SHAs).
- Add Playwright visual-parity tests against baselines captured from live
  vanduo.dev before the rebuild.

Pages/routes: one route `/` — same content as today, rebuilt as a Vue SSG
page. No new routes added or removed.

## Non-goals

- **No visual redesign** — the page MUST look pixel-identical to the current
  static page at every viewport and theme.
- **No Vd* component adoption** — markup stays bespoke; vd3 is consumed for
  tokens, CSS, plugin, and theme engine only.
- **No new content** — prose, links, JSON-LD, OG tags unchanged.
- **No vd3-cbun** — the landing page does not use canvas/editor components.
- **No link: sibling consumption** — npm-published `@vanduo-oss/vd3` only.
- **No package publish** — `@vanduo-oss/home` stays private.

## Capabilities

### New Capabilities

- `landing-page`: vanduo.dev landing page rebuilt on @vanduo-oss/vd3 with
  visual parity, SEO preservation, theme continuity, and CI/deploy pipeline.

### Modified Capabilities

_None — no specs exist before this change._

## Impact

- `home/` gains a full build toolchain (package.json, vite, vite-ssg, CI).
- Root `index.html` and `fonts/` are replaced by `src/` + `public/`.
- GitHub Pages source switches from legacy branch deploy to Actions workflow
  deploy after merge (one-time `build_type=workflow` flip).
- Bundle size increases (~Vue runtime + vd3 core CSS) — accepted trade-off
  for dogfooding.
