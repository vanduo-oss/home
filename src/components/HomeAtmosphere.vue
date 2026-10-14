<script setup lang="ts">
/**
 * Decorative site-wide liquid gradient atmosphere.
 *
 * Inspired by Cameron Knight — “Interactive Liquid Gradient using Three.js”
 * https://codepen.io/cameronknight/pen/ogxWmBP
 * (vanilla WebGL reimplementation; theme-bound primary + neutral mix.)
 */
import { onBeforeUnmount, onMounted, ref, watch } from "vue";
import {
  createHomeAtmosphere,
  type HomeAtmosphereEngine,
} from "@/home-atmosphere";

const props = withDefaults(
  defineProps<{
    /** When false, animation pauses and the layer is hidden. */
    active?: boolean;
  }>(),
  {
    active: true,
  },
);

const canvasRef = ref<HTMLCanvasElement | null>(null);
const unsupported = ref(false);

let engine: HomeAtmosphereEngine | null = null;
let themeObserver: MutationObserver | null = null;
let motionQuery: MediaQueryList | null = null;
let schemeQuery: MediaQueryList | null = null;

function prefersReducedMotion(): boolean {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

function bindPointer(): void {
  window.addEventListener("pointermove", onPointerMove, { passive: true });
}

function unbindPointer(): void {
  window.removeEventListener("pointermove", onPointerMove);
}

function onPointerMove(ev: PointerEvent): void {
  if (!props.active || !engine) return;
  engine.onPointer(ev.clientX, ev.clientY);
}

function onResize(): void {
  engine?.resize();
}

function syncActive(): void {
  if (!engine) return;
  if (props.active) {
    engine.syncThemeColors();
    engine.start();
    bindPointer();
  } else {
    unbindPointer();
    engine.stop();
  }
}

function onThemeSync(): void {
  if (!props.active || !engine) return;
  engine.syncThemeColors();
}

function observeTheme(): void {
  themeObserver = new MutationObserver(onThemeSync);
  themeObserver.observe(document.documentElement, {
    attributes: true,
    attributeFilter: [
      "data-theme",
      "data-primary",
      "data-palette",
      "data-neutral",
      "style",
      "class",
    ],
  });
  schemeQuery = window.matchMedia("(prefers-color-scheme: dark)");
  schemeQuery.addEventListener?.("change", onThemeSync);
}

onMounted(() => {
  const canvas = canvasRef.value;
  if (!canvas) return;

  engine = createHomeAtmosphere(canvas, {
    reducedMotion: prefersReducedMotion(),
    styleRoot: canvas.parentElement,
  });
  if (!engine) {
    unsupported.value = true;
    return;
  }

  observeTheme();
  window.addEventListener("resize", onResize, { passive: true });
  motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  motionQuery.addEventListener?.("change", onMotionChange);
  syncActive();
});

function onMotionChange(): void {
  const canvas = canvasRef.value;
  if (!canvas) return;
  engine?.destroy();
  engine = createHomeAtmosphere(canvas, {
    reducedMotion: prefersReducedMotion(),
    styleRoot: canvas.parentElement,
  });
  if (!engine) {
    unsupported.value = true;
    return;
  }
  unsupported.value = false;
  syncActive();
}

watch(
  () => props.active,
  () => {
    syncActive();
  },
);

onBeforeUnmount(() => {
  unbindPointer();
  window.removeEventListener("resize", onResize);
  motionQuery?.removeEventListener?.("change", onMotionChange);
  schemeQuery?.removeEventListener?.("change", onThemeSync);
  themeObserver?.disconnect();
  themeObserver = null;
  engine?.destroy();
  engine = null;
});
</script>

<template>
  <!--
    Inspired by Cameron Knight — Interactive Liquid Gradient using Three.js
    https://codepen.io/cameronknight/pen/ogxWmBP
  -->
  <div
    class="home-atmosphere"
    :class="{ 'home-atmosphere-active': active && !unsupported }"
    aria-hidden="true"
  >
    <canvas ref="canvasRef" class="home-atmosphere-canvas"></canvas>
  </div>
</template>
