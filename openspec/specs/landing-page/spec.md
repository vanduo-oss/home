# landing-page Specification

## Purpose
TBD - created by archiving change rebuild-on-vd3. Update Purpose after archive.
## Requirements
### Requirement: visual parity with prior static page
The rebuilt landing page MUST render pixel-identically to the prior static
page at vanduo.dev for desktop (1280×800) and mobile (390×844) viewports,
in both light and dark themes, before and after toggling the theme control.

#### Scenario: desktop light theme matches baseline
- **GIVEN** baselines captured from live vanduo.dev before the rebuild
- **WHEN** the SSG build is served locally and a screenshot is taken at
  1280×800 with light theme
- **THEN** the screenshot matches the baseline with zero pixel diff

#### Scenario: mobile dark theme after toggle matches baseline
- **GIVEN** baselines captured from live vanduo.dev before the rebuild
- **WHEN** the SSG build is served locally at 390×844, dark theme is
  toggled, and a screenshot is taken
- **THEN** the screenshot matches the baseline with zero pixel diff

### Requirement: SEO head preservation
The prerendered `dist/index.html` MUST contain the same `<head>` content as
the prior static page: title, description, canonical, theme-color pair,
Open Graph tags, Twitter card tags, and JSON-LD structured data graph.

#### Scenario: prerendered head matches prior page
- **GIVEN** the prior static `index.html` head block
- **WHEN** `pnpm run build` completes and `dist/index.html` is inspected
- **THEN** all meta tags, link tags, and JSON-LD are present and identical
  in content to the prior page

#### Scenario: story prose is crawlable without JavaScript
- **GIVEN** the prerendered `dist/index.html`
- **WHEN** the HTML is fetched without executing JavaScript
- **THEN** the full "About Vanduo" story section prose is present in the
  document body

### Requirement: vd3 dogfooding
The site MUST consume the published `@vanduo-oss/vd3` npm package: import
`@vanduo-oss/vd3/css/core`, register `VanduoVue`, and use `var(--vd-*)`
token references for page colors. The theme toggle MUST use
`useThemePreference()` and persist to `vanduo-theme-preference` in
localStorage.

#### Scenario: theme preference persists across reload
- **GIVEN** a visitor toggles the theme to dark on vanduo.dev
- **WHEN** they reload the page
- **THEN** dark theme is applied before first paint and after hydration

#### Scenario: theme preference round-trips with vd3-docs
- **GIVEN** a visitor sets dark theme on vanduo.dev
- **WHEN** they navigate to vanduo-oss.github.io/vd3-docs
- **THEN** dark theme is applied (same localStorage key)

### Requirement: CI and deploy pipeline
The repository MUST provide `ci.yml` (typecheck, lint, stylelint,
format:check, build, visual parity on PRs and push to main) and
`deploy.yml` (build + publish to GitHub Pages on push to main).

#### Scenario: CI gates pass on the rebuild branch
- **GIVEN** the `rebuild-on-vd3` branch with all changes applied
- **WHEN** `pnpm install --frozen-lockfile` and all CI scripts run locally
- **THEN** typecheck, lint, stylelint, format:check, build, and visual
  parity all exit 0

#### Scenario: deploy artifact includes CNAME and static assets
- **GIVEN** a successful `pnpm run build`
- **WHEN** `dist/` is inspected
- **THEN** `CNAME` contains `vanduo.dev`, `.nojekyll` exists, and
  `og-image.png`, fonts, and the animated SVG are present

