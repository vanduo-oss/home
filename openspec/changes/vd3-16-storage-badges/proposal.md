## Why

vanduo.dev dogfoods `@vanduo-oss/vd3` 1.6.0. vd3's default localStorage keys
(`vanduo-theme-preference`, `vanduo-palette`, …) collide with other Vanduo
sites that share the same origin family in a browser profile. Isolating this
site under `vanduo-oss-` prevents accidental theme/token bleed. The AI line
also needs the same status treatment ICONS already has: `experimental` and
`unstable` badges.

## What Changes

- Pass vd3's public `storagePrefix: "vanduo-oss-"` on `VanduoVue` install,
  sourced from a single constant so the prefix survives future lib updates.
- Keep the pre-paint theme script in `index.html` on the same prefixed key
  via Vite `transformIndexHtml` (no duplicated string).
- Add `experimental` and `unstable` badges on the AI product line.
- Add a small Playwright functional spec and refresh visual baselines.

Pages/routes: `/` only — storage namespace and AI-line badges. Copy and
layout otherwise unchanged.

## Non-goals

- Migrating existing `vanduo-*` values to the new prefix (vd3 does not
  auto-migrate).
- Sharing theme preference with vd3-docs or other vanduo.dev subdomains.
- Package releases or vd3 API changes.
- Rewriting story prose, SEO, or navbar chrome.

## Capabilities

- `landing-page` — isolate vd3 localStorage under `vanduo-oss-`; AI line
  shows experimental and unstable badges.
