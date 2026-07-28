# Tasks

## 1. OpenSpec bootstrap

- [x] 1.1 Create `openspec/config.yaml` for @vanduo-oss/home.
- [x] 1.2 Author `rebuild-on-vd3` change: proposal, design, specs, tasks.
- [ ] 1.3 `openspec validate rebuild-on-vd3 --strict` passes.

## 2. Visual baselines (before markup change)

- [ ] 2.1 Add Playwright config and `tests/visual/capture-baseline.spec.ts`.
- [ ] 2.2 Capture baselines from live https://vanduo.dev/ (desktop/mobile ×
      light/dark × default/after-toggle).
- [ ] 2.3 Commit baselines under `tests/visual/baselines/`.

## 3. Scaffold

- [ ] 3.1 Add `package.json`, `.npmrc`, `pnpm-workspace.yaml`, vite-ssg patch.
- [ ] 3.2 Add `vite.config.ts`, `tsconfig.json`, `env.d.ts`, lint/format configs.
- [ ] 3.3 Add `.gitignore`.

## 4. App port

- [ ] 4.1 Create `index.html` template (head verbatim + pre-paint script).
- [ ] 4.2 Create `src/main.ts`, `src/App.vue`, `src/views/Home.vue`.
- [ ] 4.3 Create `src/styles/home.css` with var(--vd-*) token swap.
- [ ] 4.4 Move static assets to `public/`; delete old root index.html and fonts/.

## 5. Verification

- [ ] 5.1 `pnpm install --frozen-lockfile`.
- [ ] 5.2 `pnpm run typecheck && pnpm lint && pnpm run stylelint && pnpm run format:check`.
- [ ] 5.3 `pnpm run build` prerenders `/` cleanly.
- [ ] 5.4 Playwright visual parity suite passes at zero diff.

## 6. CI and deploy

- [ ] 6.1 Add `.github/workflows/ci.yml`.
- [ ] 6.2 Add `.github/workflows/deploy.yml`.

## 7. Release

- [ ] 7.1 Push branch `rebuild-on-vd3`, open PR to main (do not merge).
- [ ] 7.2 After merge: flip Pages `build_type` to workflow, verify deploy,
      archive OpenSpec change, sweep branch.
