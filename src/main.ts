import { ViteSSG } from "vite-ssg";
import { VanduoVue } from "@vanduo-oss/vd3";
import App from "./App.vue";
import Home from "./views/Home.vue";
import "./styles/index.css";

export const createApp = ViteSSG(
  App,
  {
    routes: [{ path: "/", component: Home }],
    base: import.meta.env.BASE_URL,
  },
  ({ app }) => {
    app.use(VanduoVue, {
      themeDefaults: { THEME: "system", FONT: "system" },
    });
  },
);
