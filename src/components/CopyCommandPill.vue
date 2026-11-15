<script setup lang="ts">
import { onBeforeUnmount, ref } from "vue";

const props = withDefaults(
  defineProps<{
    command?: string;
    label?: string;
  }>(),
  {
    command: "pnpm add @vanduo-oss/vd3",
    label: "Copy install command",
  },
);

const status = ref<"idle" | "copied" | "failed">("idle");
const statusMessage = ref("");
const buttonEl = ref<HTMLButtonElement | null>(null);

let resetTimer: ReturnType<typeof setTimeout> | undefined;
let lastAnnouncement = "";

function announce(ok: boolean): void {
  if (resetTimer) clearTimeout(resetTimer);
  status.value = "idle";
  statusMessage.value = "";

  let nextMsg = ok ? "Copied" : "Copy failed";
  if (nextMsg === lastAnnouncement) {
    nextMsg += "\u00A0";
  }
  lastAnnouncement = nextMsg;

  // Trigger clean animation restart
  void buttonEl.value?.offsetWidth;
  status.value = ok ? "copied" : "failed";

  if (typeof window !== "undefined") {
    window.requestAnimationFrame(() => {
      statusMessage.value = nextMsg;
    });
  } else {
    statusMessage.value = nextMsg;
  }

  resetTimer = setTimeout(() => {
    status.value = "idle";
    statusMessage.value = "";
  }, 2000);
}

async function onCopy(): Promise<void> {
  if (!props.command.trim()) return;
  try {
    await navigator.clipboard.writeText(props.command.trim());
    announce(true);
  } catch {
    announce(false);
  }
}

onBeforeUnmount(() => {
  if (resetTimer) clearTimeout(resetTimer);
});
</script>

<template>
  <div class="pv-install-pill">
    <span class="pv-install-prompt" aria-hidden="true">$</span>
    <code class="pv-install-code">{{ command }}</code>
    <span class="pv-copy-wrap">
      <button
        ref="buttonEl"
        type="button"
        class="pv-copy-btn"
        :aria-label="label"
        :data-copied="status === 'copied' ? '' : undefined"
        :data-failed="status === 'failed' ? '' : undefined"
        @click="onCopy"
      >
        <svg
          v-if="status !== 'copied'"
          width="15"
          height="15"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.8"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        >
          <rect x="9" y="9" width="13" height="13" rx="2" />
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
        </svg>
        <svg
          v-else
          width="15"
          height="15"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        >
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </button>
      <span
        class="pv-copy-tip"
        :class="{ 'pv-copy-tip-visible': status !== 'idle' }"
        role="status"
      >
        {{ statusMessage }}
      </span>
    </span>
  </div>
</template>
