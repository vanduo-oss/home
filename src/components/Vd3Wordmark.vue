<script setup lang="ts">
withDefaults(
  defineProps<{
    markOnly?: boolean;
    width?: number;
    height?: number;
    alt?: string;
  }>(),
  {
    markOnly: false,
    width: 340,
    height: 130,
    alt: "VD3 UI",
  },
);
</script>

<template>
  <div class="pv-vd3-brand" :class="{ 'pv-vd3-brand-mark': markOnly }">
    <img
      :src="
        markOnly
          ? '/brand/vd3-ui/vd3-ui-mark-dark.svg'
          : '/brand/vd3-ui/vd3-ui-lockup-dark.svg'
      "
      :alt="alt"
      :width="width"
      :height="height"
      class="vd3-logo-dark"
    />
    <img
      :src="
        markOnly
          ? '/brand/vd3-ui/vd3-ui-mark-light.svg'
          : '/brand/vd3-ui/vd3-ui-lockup-light.svg'
      "
      :alt="alt"
      :width="width"
      :height="height"
      class="vd3-logo-light"
    />
  </div>
</template>
