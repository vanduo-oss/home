# Tasks

## 1. OpenSpec

- [ ] 1.1 Author `landing-page-tweaks` change: proposal, spec delta, tasks.
- [ ] 1.2 `openspec validate landing-page-tweaks --strict` passes.

## 2. Implementation

- [ ] 2.1 Pin `THEME: "system"` in `src/main.ts`; update toggle in `Home.vue`.
- [ ] 2.2 Add `public/favicon.svg`; update favicon link in `index.html`.
- [ ] 2.3 Update h1 and SEO/OG/Twitter titles in `index.html` + `Home.vue`.
- [ ] 2.4 Add system-mode Playwright cases in `tests/visual/parity.spec.ts`.

## 3. Verification

- [ ] 3.1 `pnpm run typecheck && pnpm lint && pnpm run stylelint && pnpm run format:check`.
- [ ] 3.2 `pnpm run build`.
- [ ] 3.3 Refresh visual baselines; Playwright parity suite passes.
- [ ] 3.4 Archive change after merge.
