# Tasks

## 1. OpenSpec

- [x] 1.1 Author `vd3-16-storage-badges` change: proposal, spec delta, tasks.
- [x] 1.2 `openspec validate vd3-16-storage-badges --strict` passes.

## 2. Implementation

- [x] 2.1 Add `src/constants/vd3-storage.ts`; pass `storagePrefix` in `src/main.ts`.
- [x] 2.2 Inject `VD3_THEME_PREFERENCE_KEY` into `index.html` via Vite `transformIndexHtml`.
- [x] 2.3 Add AI `experimental` + `unstable` badges; share `.badges` wrapper with ICONS.
- [x] 2.4 Add `tests/functional/storage-and-badges.spec.ts`; update visual specs to the prefixed key.

## 3. Verification

- [x] 3.1 `pnpm run typecheck && pnpm lint && pnpm run stylelint && pnpm run format:check`.
- [x] 3.2 `pnpm run build`.
- [x] 3.3 Refresh visual baselines; Playwright e2e suite passes.
