## MODIFIED Requirements

### Requirement: vd3 dogfooding
The site MUST consume the published `@vanduo-oss/vd3` npm package: import
`@vanduo-oss/vd3/css` (full tree, including navbar glass/float chrome),
register `VanduoVue` with `storagePrefix: "vanduo-oss-"` and
`themeDefaults.THEME: "system"`, and use `var(--vd-*)` token references for
page colors. The theme toggle MUST use `useThemePreference()` and persist to
`vanduo-oss-theme-preference` in localStorage. The pre-paint script in
`index.html` MUST read the same prefixed key. When no explicit preference is
stored, the effective theme MUST follow the OS via `prefers-color-scheme`.
The top chrome MUST use the vd3 floating glass navbar pattern
(`.vd-navbar-float` + `.vd-navbar-glass`). The prefix MUST come from a
single source-of-truth constant passed to `VanduoVue` so later vd3 updates
keep the same isolation.

#### Scenario: default theme follows OS when no preference is stored
- **GIVEN** `vanduo-oss-theme-preference` is absent or set to `"system"`
- **WHEN** the page loads with OS dark mode
- **THEN** dark theme colors apply without `data-theme` on `<html>`

#### Scenario: theme preference persists across reload
- **GIVEN** a visitor toggles the theme to dark on vanduo.dev
- **WHEN** they reload the page
- **THEN** dark theme is applied before first paint and after hydration

#### Scenario: theme preference stays under the oss prefix
- **GIVEN** a visitor toggles the theme on vanduo.dev
- **WHEN** localStorage is inspected
- **THEN** `vanduo-oss-theme-preference` is present
- **AND** `vanduo-theme-preference` is absent

#### Scenario: theme preference round-trips with vd3-docs
- **GIVEN** a visitor sets dark theme on vanduo.dev
- **WHEN** they navigate to vd3.vanduo.dev
- **THEN** this site's `vanduo-oss-*` keys do not apply there
- **AND** vd3-docs continues to use its own `vanduo-*` keys

## ADDED Requirements

### Requirement: AI line status badges
The AI product line MUST show two badges — `experimental` and `unstable` —
using the same badge treatment as the ICONS line.

#### Scenario: AI line exposes both badges
- **GIVEN** the landing page is rendered
- **WHEN** the AI line (`https://labs.vanduo.dev`) is inspected
- **THEN** it contains a badge with text `experimental`
- **AND** it contains a badge with text `unstable`
