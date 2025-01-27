/* eslint-disable */
// @ts-nocheck
import { fileURLToPath } from "node:url";
import path from "node:path";
import { defineConfig } from "vite";
// 导入demo插件
import { vitepressDemo } from "vite-plugin-vitepress-demo";
import vueJsx from "@vitejs/plugin-vue-jsx";
import { tsxAutoProps } from "vite-plugin-tsx-auto-props";
import Components from "unplugin-vue-components/vite";
import { itemUIResolver } from "./scripts/item-ui-resolver";
import AutoImport from "unplugin-auto-import/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import ElementPlus from "unplugin-element-plus/vite";
import svgLoader from "vite-svg-loader";

const baseUrl = fileURLToPath(new URL(".", import.meta.url));
// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 9090, // 设置端口号为 9090
  },
  base: "",
  plugins: [
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [itemUIResolver(), ElementPlusResolver()],
    }),
    ElementPlus({
      importStyle: "sass",
      useSource: true,
    }),
    tsxAutoProps(),
    vitepressDemo({
      glob: ["**/demos/*.vue"],
    }),
    vueJsx(),
    svgLoader(),
  ],
  resolve: {
    alias: [
      {
        find: /^item-ui/,
        replacement: path.resolve(baseUrl, "packages/item-ui/src"),
      },
    ],
  },
});
