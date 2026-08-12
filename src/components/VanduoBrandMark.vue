<script setup lang="ts">
import { computed, useId } from "vue";

/**
 * Static Vanduo spheres mark for chrome (navbar). Mirrors the hero/favicon
 * three-circle geometry — no animation.
 */
const props = withDefaults(
  defineProps<{
    size?: string;
    decorative?: boolean;
  }>(),
  {
    size: "2rem",
    decorative: true,
  },
);

const uid = useId().replace(/:/g, "");
const blueGlowId = computed(() => `vanduo-mark-blue-${uid}`);
const greyNodeId = computed(() => `vanduo-mark-grey-${uid}`);
const shadowId = computed(() => `vanduo-mark-shadow-${uid}`);

const markStyle = computed(() => ({
  width: props.size,
  height: props.size,
}));
</script>

<template>
  <span class="vanduo-brand-mark" style="overflow: visible; line-height: 0">
    <svg
      class="vanduo-mark"
      :style="markStyle"
      viewBox="28 24 144 144"
      overflow="visible"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      :aria-hidden="decorative ? 'true' : undefined"
      :aria-label="decorative ? undefined : 'Vanduo'"
    >
      <defs>
        <radialGradient :id="blueGlowId" cx="30%" cy="30%" r="70%">
          <stop offset="0%" stop-color="#9ebbf8" />
          <stop offset="35%" stop-color="#4a85e8" />
          <stop offset="80%" stop-color="#1b458b" />
          <stop offset="100%" stop-color="#0c1f44" />
        </radialGradient>
        <radialGradient :id="greyNodeId" cx="30%" cy="30%" r="70%">
          <stop offset="0%" stop-color="#f8fafc" />
          <stop offset="50%" stop-color="#94a3b8" />
          <stop offset="100%" stop-color="#1e293b" />
        </radialGradient>
        <filter :id="shadowId" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow
            dx="0"
            dy="2"
            stdDeviation="3"
            flood-color="#000000"
            flood-opacity="0.45"
          />
        </filter>
      </defs>
      <g :filter="`url(#${shadowId})`">
        <circle cx="65" cy="130" r="22" :fill="`url(#${greyNodeId})`" />
        <circle cx="135" cy="130" r="22" :fill="`url(#${greyNodeId})`" />
        <circle cx="100" cy="90" r="58" :fill="`url(#${blueGlowId})`" />
      </g>
    </svg>
  </span>
</template>
