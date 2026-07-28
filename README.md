# home

Landing page for [vanduo.dev](https://vanduo.dev/) — a Vue 3 + vite-ssg site that dogfoods [`@vanduo-oss/vd3`](https://www.npmjs.com/package/@vanduo-oss/vd3).

## Stack

- Vue 3 + Vite 8 + vite-ssg (prerendered `/`)
- `@vanduo-oss/vd3` — plugin, core CSS, design tokens, `useThemePreference()`
- GitHub Pages at apex `vanduo.dev` (base `/`)

## Commands

```sh
pnpm install
pnpm dev          # local dev server
pnpm build        # prerender to dist/
pnpm preview      # serve dist/ on :8787
pnpm run typecheck
pnpm lint && pnpm run stylelint && pnpm run format:check
pnpm run test:e2e # visual parity vs live-site baselines
```

Requires Node ≥ 24 and pnpm 10.28.2 (`corepack enable`).

## Deploy

Push to `main` runs `.github/workflows/deploy.yml` (GitHub Actions → Pages). The repo must use **GitHub Actions** as the Pages source (`build_type=workflow`), not branch deploy.

## OpenSpec

Site changes are governed under `openspec/`. Active change: `rebuild-on-vd3`.
