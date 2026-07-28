## Stack

Vue 3 + Vite 8 + vite-ssg 28 + vue-router 5. Single route `/`, prerendered
to static HTML. Base path always `/` (apex domain vanduo.dev — no
`VITE_BASE` dual-build unlike vd3-docs).

## vd3 consumption

```ts
import { VanduoVue } from "@vanduo-oss/vd3";
import "@vanduo-oss/vd3/css/core";
import "./styles/home.css";

app.use(VanduoVue); // no themeDefaults override — generic baseline
```

No `Vd*` components. Theme toggle via `useThemePreference().setTheme()`.

## Token mapping

Page-local aliases map to vd3 core tokens (values unchanged):

| Alias | Light | Dark |
|-------|-------|------|
| `--bg` | `var(--vd-bg-primary)` | `var(--vd-oc-charcoal-9)` |
| `--fg` | `var(--vd-color-gray-900)` | `var(--vd-oc-gray-1)` |
| `--muted` | `var(--vd-oc-gray-6)` | `var(--vd-fib-slate-5)` |
| `--rule` | `var(--vd-fib-slate-1)` | `var(--vd-oc-gray-9)` |
| `--accent` | `var(--vd-oc-blue-6)` | `var(--vd-oc-blue-4)` |

CSS import order: `@layer vd3, home` via [src/styles/index.css](src/styles/index.css)
— vd3 core in `layer(vd3)`, page rules in `layer(home)`.

Visual parity gate: Playwright snapshots captured from live vanduo.dev before
the rebuild; parity tests allow `maxDiffPixelRatio: 0.04` because static HTML
vs SSG hydration produces ~3.4% subpixel antialiasing fringe deltas only (verified:
diff pairs are white↔muted-gray glyph edges, not layout or color blocks).

## Theme contract continuity

1. Pre-paint inline script in `index.html` (verbatim from prior page): reads
   `localStorage.getItem('vanduo-theme-preference')`, sets `data-theme` on
   `<html>` before first paint.
2. After hydration, `useThemePreference()` owns the attribute and toggle.
3. Sun/moon icon swap stays pure CSS via `:root[data-theme=...]` selectors.

Cross-site continuity with vd3-docs is preserved (same localStorage key and
value vocabulary).

## Pages deploy switch

Current: `build_type: legacy` (branch deploy from `main` root).

After merge:
```bash
gh api -X PUT repos/vanduo-oss/home/pages -F build_type=workflow
```

Then `deploy.yml` on push to `main` publishes `dist/` via
`actions/deploy-pages`. `public/CNAME` ships `vanduo.dev` in the artifact.

## vite-ssg patch

Copy `patches/vite-ssg@28.3.0.patch` from vd3-docs — fixes vue-router v5
`next()` deprecation in vite-ssg's internal guard.
