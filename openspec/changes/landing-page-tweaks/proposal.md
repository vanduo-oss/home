## Why

Three small post-rebuild fixes: first-time visitors should follow the OS color
scheme by default, the tab icon should render reliably in browsers, and the
visible tagline plus SEO/OG/Twitter titles should read "vanduo open source
software" instead of the Vue-3-design-system framing.

## What Changes

- Pin vd3 `themeDefaults.THEME` to `"system"`; tighten the theme toggle to
  read vd3 state; add Playwright coverage for system + emulated OS scheme.
- Add static `public/favicon.svg` (bot-only mark); point `<link rel="icon">` at
  it instead of the animated hero SVG.
- Update `<h1>`, `<title>`, Open Graph, and Twitter titles to the new copy.
- Refresh visual baselines to match the new tagline.

Pages/routes: `/` only — copy, favicon, and theme-default behavior change;
layout and prose otherwise unchanged.

## Non-goals

- Toggle 3-way cycle (system / light / dark) — click still locks to explicit
  light or dark.
- Rewriting `<meta description>`, JSON-LD, or og-image alt beyond title strings.
- Package releases or vd3 API changes.

## Capabilities

- `landing-page` — amended requirements for OS default theme, favicon, titles,
  and updated visual baselines.
