import { defineConfig, type Plugin } from "vite";
import vue from "@vitejs/plugin-vue";
import { fileURLToPath, URL } from "node:url";
import { VD3_THEME_PREFERENCE_KEY } from "./src/constants/vd3-storage.ts";

function injectThemePreferenceKey(): Plugin {
  return {
    name: "inject-vd3-theme-preference-key",
    transformIndexHtml(html) {
      return html.replaceAll(
        "<!--VD3_THEME_PREFERENCE_KEY-->",
        VD3_THEME_PREFERENCE_KEY,
      );
    },
  };
}

export default defineConfig({
  base: "/",
  plugins: [vue(), injectThemePreferenceKey()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  ssr: {
    noExternal: ["@vanduo-oss/vd3"],
  },
  build: {
    target: "es2020",
    cssCodeSplit: true,
  },
});
