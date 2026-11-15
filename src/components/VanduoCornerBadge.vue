<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, useId } from "vue";

withDefaults(
  defineProps<{
    corner?: "bottom-left" | "bottom-right";
    variant?: "signature" | "pill" | "telemetry";
  }>(),
  {
    corner: "bottom-left",
    variant: "signature",
  },
);

const uid = useId().replace(/[^a-zA-Z0-9_-]/g, "");
const popoverId = `vanduo-about-${uid}`;
const blueGradId = `vanduo-orb-blue-${uid}`;
const greyGradId = `vanduo-orb-grey-${uid}`;
const shadowId = `vanduo-orb-shadow-${uid}`;

const supportsPopover = ref(true);
const fallbackOpen = ref(false);

function onToggleClick(): void {
  if (supportsPopover.value) return;
  fallbackOpen.value = !fallbackOpen.value;
}

function onEscape(event: KeyboardEvent): void {
  if (!supportsPopover.value && fallbackOpen.value && event.key === "Escape") {
    fallbackOpen.value = false;
  }
}

onMounted(() => {
  supportsPopover.value =
    typeof HTMLElement !== "undefined" &&
    Object.hasOwn(HTMLElement.prototype, "popover");
  window.addEventListener("keydown", onEscape);
});

onBeforeUnmount(() => {
  window.removeEventListener("keydown", onEscape);
});
</script>

<template>
  <aside
    class="pv-corner"
    :class="[`pv-corner-${corner}`, `pv-corner-${variant}`]"
    aria-label="Vanduo Open Source attribution"
  >
    <div class="pv-corner-bar">
      <a
        href="https://github.com/vanduo-oss"
        rel="noopener"
        class="pv-corner-brand"
        title="vanduo-oss on GitHub"
      >
        <svg
          class="pv-corner-orb"
          viewBox="35 35 130 130"
          width="22"
          height="22"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <radialGradient :id="blueGradId" cx="30%" cy="30%" r="70%">
              <stop offset="0%" stop-color="#9ebbf8" />
              <stop offset="35%" stop-color="#4a85e8" />
              <stop offset="80%" stop-color="#1b458b" />
              <stop offset="100%" stop-color="#0c1f44" />
            </radialGradient>
            <radialGradient :id="greyGradId" cx="30%" cy="30%" r="70%">
              <stop offset="0%" stop-color="#f8fafc" />
              <stop offset="50%" stop-color="#94a3b8" />
              <stop offset="100%" stop-color="#1e293b" />
            </radialGradient>
            <filter :id="shadowId" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow
                dx="0"
                dy="3"
                stdDeviation="4"
                flood-color="#000000"
                flood-opacity="0.45"
              />
            </filter>
          </defs>
          <g class="pv-corner-orb-group" :filter="`url(#${shadowId})`">
            <circle cx="65" cy="130" r="22" :fill="`url(#${greyGradId})`" />
            <circle cx="135" cy="130" r="22" :fill="`url(#${greyGradId})`" />
            <circle cx="100" cy="90" r="58" :fill="`url(#${blueGradId})`" />
          </g>
        </svg>
        <span class="pv-corner-wordmark">
          {{ variant === "telemetry" ? "vanduo-oss // oss" : "vanduo-oss" }}
        </span>
      </a>

      <span class="pv-corner-sep" aria-hidden="true">·</span>

      <nav class="pv-corner-links" aria-label="Vanduo OSS links">
        <a href="https://github.com/vanduo-oss" rel="noopener">GitHub</a>
        <a href="https://www.npmjs.com/org/vanduo-oss" rel="noopener">npm</a>
        <button
          type="button"
          class="pv-corner-about-btn"
          :popovertarget="supportsPopover ? popoverId : undefined"
          :aria-expanded="!supportsPopover ? fallbackOpen : undefined"
          :aria-controls="popoverId"
          @click="onToggleClick"
        >
          About
        </button>
      </nav>
    </div>

    <div
      :id="popoverId"
      :popover="supportsPopover ? 'auto' : undefined"
      class="pv-corner-popover"
      :class="{ 'pv-corner-popover-fallback-open': fallbackOpen }"
      role="region"
      aria-label="About Vanduo Open Source Software"
    >
      <div class="pv-corner-popover-head">
        <span class="pv-corner-popover-title">vanduo open source software</span>
        <button
          type="button"
          class="pv-corner-popover-close"
          :popovertarget="supportsPopover ? popoverId : undefined"
          :popovertargetaction="supportsPopover ? 'hide' : undefined"
          aria-label="Close About Vanduo"
          @click="fallbackOpen = false"
        >
          ×
        </button>
      </div>
      <p class="pv-corner-popover-copy">
        <strong>Vanduo</strong> builds open-source software under the
        <a href="https://www.npmjs.com/org/vanduo-oss" rel="noopener"
          >@vanduo-oss</a
        >
        npm scope and
        <a href="https://github.com/vanduo-oss" rel="noopener"
          >github.com/vanduo-oss</a
        >. Its flagship line is <strong>VD3 UI</strong>, a typed Vue&nbsp;3
        design system with CSS tokens, charts, and flowchart tooling.
      </p>
      <div class="pv-corner-popover-meta">
        <span>MIT licensed</span>
        <span>·</span>
        <a href="https://vd3.vanduo.dev/" rel="noopener">vd3.vanduo.dev ↗</a>
      </div>
    </div>
  </aside>
</template>
