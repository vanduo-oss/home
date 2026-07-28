## MODIFIED Requirements

### Requirement: visual parity with prior static page
The landing page MUST match committed Playwright visual baselines for desktop
(1280×800) and mobile (390×844) viewports, in both light and dark themes,
before and after toggling the theme control. Baselines reflect the current
tagline ("vanduo open source software") and are refreshed when visible copy
or layout changes.

#### Scenario: desktop light theme matches baseline
- **GIVEN** baselines committed under `tests/visual/baselines/`
- **WHEN** the SSG build is served locally and a screenshot is taken at
  1280×800 with light theme
- **THEN** the screenshot matches the baseline within the configured diff
  threshold

#### Scenario: mobile dark theme after toggle matches baseline
- **GIVEN** baselines committed under `tests/visual/baselines/`
- **WHEN** the SSG build is served locally at 390×844, dark theme is
  toggled, and a screenshot is taken
- **THEN** the screenshot matches the baseline within the configured diff
  threshold

### Requirement: SEO head preservation
The prerendered `dist/index.html` MUST contain title, description, canonical,
theme-color pair, Open Graph tags, Twitter card tags, JSON-LD structured
data, and a static favicon link. Document and social titles MUST read
"Vanduo — vanduo open source software".

#### Scenario: prerendered head includes updated titles and favicon
- **GIVEN** a successful `pnpm run build`
- **WHEN** `dist/index.html` is inspected
- **THEN** `<title>`, Open Graph title, Twitter title, and og:image:alt
  contain "Vanduo — vanduo open source software"
- **AND** `<link rel="icon" href="/favicon.svg">` is present

#### Scenario: story prose is crawlable without JavaScript
- **GIVEN** the prerendered `dist/index.html`
- **WHEN** the HTML is fetched without executing JavaScript
- **THEN** the full "About Vanduo" story section prose is present in the
  document body

### Requirement: vd3 dogfooding
The site MUST consume the published `@vanduo-oss/vd3` npm package: import
`@vanduo-oss/vd3/css/core`, register `VanduoVue` with
`themeDefaults.THEME: "system"`, and use `var(--vd-*)` token references for
page colors. The theme toggle MUST use `useThemePreference()` and persist to
`vanduo-theme-preference` in localStorage. When no explicit preference is
stored, the effective theme MUST follow the OS via `prefers-color-scheme`.

#### Scenario: default theme follows OS when no preference is stored
- **GIVEN** `vanduo-theme-preference` is absent or set to `"system"`
- **WHEN** the page loads with OS dark mode
- **THEN** dark theme colors apply without `data-theme` on `<html>`

#### Scenario: theme preference persists across reload
- **GIVEN** a visitor toggles the theme to dark on vanduo.dev
- **WHEN** they reload the page
- **THEN** dark theme is applied before first paint and after hydration

#### Scenario: theme preference round-trips with vd3-docs
- **GIVEN** a visitor sets dark theme on vanduo.dev
- **WHEN** they navigate to vanduo-oss.github.io/vd3-docs
- **THEN** dark theme is applied (same localStorage key)

## ADDED Requirements

### Requirement: static favicon
The site MUST serve a static SVG favicon at `/favicon.svg` containing the
Vanduo bot mark only (no animation, no wordmark).

#### Scenario: favicon is present in deploy artifact
- **GIVEN** a successful `pnpm run build`
- **WHEN** `dist/` is inspected
- **THEN** `favicon.svg` exists and is linked from `index.html`

### Requirement: landing tagline copy
The visible `<h1>` tagline MUST read "vanduo open source software".

#### Scenario: tagline is crawlable in prerendered HTML
- **GIVEN** the prerendered `dist/index.html`
- **WHEN** the HTML is fetched without executing JavaScript
- **THEN** an `<h1>` contains "vanduo open source software"
