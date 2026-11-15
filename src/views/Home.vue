<script setup lang="ts">
import { VdCard, VdThemeSwitcher } from "@vanduo-oss/vd3";
import CopyCommandPill from "@/components/CopyCommandPill.vue";
import HomeAtmosphere from "@/components/HomeAtmosphere.vue";
import VanduoCornerBadge from "@/components/VanduoCornerBadge.vue";
import Vd3Wordmark from "@/components/Vd3Wordmark.vue";

const swatches = [
  { name: "--vd-oc-teal-4", varName: "var(--vd-oc-teal-4)" },
  { name: "--vd-oc-cyan-4", varName: "var(--vd-oc-cyan-4)" },
  { name: "--vd-oc-blue-4", varName: "var(--vd-oc-blue-4)" },
  { name: "--vd-bg-primary", varName: "var(--vd-bg-primary)" },
] as const;

const ecosystem = [
  { label: "@vanduo-oss/vd3", href: "https://vd3.vanduo.dev/" },
  {
    label: "vd3-charts",
    href: "https://github.com/vanduo-oss/vd3-charts",
  },
  {
    label: "vd3-flowchart",
    href: "https://github.com/vanduo-oss/vd3-flowchart",
  },
] as const;
</script>

<template>
  <div class="pv-shell pv-shell-split">
    <HomeAtmosphere :active="true" palette="vd3-teal" />
    <div class="pv-horizon-lines" aria-hidden="true"></div>

    <VdThemeSwitcher
      class="vd-fab vd-fab-glass vd-fab-sm vd-fab-top-right"
      :menu="false"
    />

    <main class="pv-split-grid">
      <section class="pv-split-left" aria-labelledby="split-heading">
        <Vd3Wordmark :width="300" :height="115" class="pv-split-lockup" />

        <h1 id="split-heading" class="pv-split-title">
          <span class="sr-only">VD3 UI — </span>vue 3 design system
        </h1>

        <p class="pv-split-copy">
          <strong>Tokens, glass, and Vue&nbsp;3 primitives.</strong> Typed
          <code>Vd*</code> components, composables, and <code>--vd-*</code> CSS
          tokens — with <code>vue</code> as its sole peer dependency.
        </p>

        <div class="pv-actions">
          <a
            class="pv-cta-primary"
            href="https://vd3.vanduo.dev/"
            rel="noopener"
          >
            <span>VD3 UI Documentation</span>
            <span class="pv-cta-arrow" aria-hidden="true">↗</span>
          </a>
          <a
            class="pv-cta-secondary"
            href="https://github.com/vanduo-oss/vd3"
            rel="noopener"
          >
            Source on GitHub
          </a>
        </div>
      </section>

      <section class="pv-split-right" aria-label="VD3 UI quick specification">
        <VdCard glass class="pv-spec-deck">
          <template #header>
            <div class="pv-console-head">
              <span class="pv-console-label">SPEC DECK // VUE 3</span>
              <span class="pv-spec-tag">PEER: vue</span>
            </div>
          </template>

          <div class="pv-spec-body">
            <div class="pv-spec-block">
              <span class="pv-spec-kicker">Install Core</span>
              <CopyCommandPill command="pnpm add @vanduo-oss/vd3" />
            </div>

            <div class="pv-spec-block">
              <span class="pv-spec-kicker">Theme Tokens (--vd-*)</span>
              <div class="pv-swatch-row">
                <div
                  v-for="swatch in swatches"
                  :key="swatch.name"
                  class="pv-swatch"
                >
                  <span
                    class="pv-swatch-dot"
                    :style="{ background: swatch.varName }"
                    aria-hidden="true"
                  ></span>
                  <code class="pv-swatch-name">{{ swatch.name }}</code>
                </div>
              </div>
            </div>

            <div class="pv-spec-block">
              <span class="pv-spec-kicker">Lineup</span>
              <div class="pv-lineup-links">
                <a
                  v-for="pkg in ecosystem"
                  :key="pkg.label"
                  :href="pkg.href"
                  rel="noopener"
                  class="pv-lineup-chip"
                >
                  <span>{{ pkg.label }}</span>
                  <span aria-hidden="true">↗</span>
                </a>
              </div>
            </div>
          </div>
        </VdCard>
      </section>
    </main>

    <VanduoCornerBadge corner="bottom-right" variant="pill" />
  </div>
</template>
