/* eslint-disable */
// @ts-nocheck
import { defineConfig } from "vite";
import path from "node:path";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import dts from "vite-plugin-dts";
import { tsxAutoProps } from "vite-plugin-tsx-auto-props";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import ElementPlus from "unplugin-element-plus/vite";
import svgLoader from "vite-svg-loader";
import {
  createStyleImportPlugin,
  ElementPlusResolve,
} from "vite-plugin-style-import";

export default defineConfig({
  resolve: {
    alias: [
      {
        find: 'element-plus',
        replacement: path.resolve(__dirname, 'node_modules/element-plus'),
      }
    ],
  },
  define: {
    // 关闭 Vue Options API 的警告
    __VUE_OPTIONS_API__: false,
    // 关闭生产环境中的 Vue devtools
    __VUE_PROD_DEVTOOLS__: false
  },
  plugins: [
    AutoImport({
      imports: ["vue"],
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
    ElementPlus({
      useSource: false,
    }),
    dts({
      entryRoot: "src",
      outDir: ["lib", "es"],
      exclude: ["**/tests/**"],
    }),
    vue(),
    vueJsx(),
    tsxAutoProps(),
    svgLoader(),
  ],
  build: {
    emptyOutDir: true,
    target: "es2015",
    rollupOptions: {
      external: [
        "@floating-ui/vue",
        "vue",
        "@vueuse/core",
        "element-plus",
        "@element-plus/icons-vue",
      ],
      output: [
        {
          preserveModules: true,
          preserveModulesRoot: "src",
          entryFileNames: "[name].js",
          format: "esm",
          dir: "es",
        },
        // UMD 配置
        {
          entryFileNames: "index.js",
          format: "umd",
          name: "itemUI", // UMD 模块名称
          exports: "named", // 使用命名导出
          globals: {
            vue: "Vue",
            "element-plus": "ElementPlus",
            "@vueuse/core": "VueUse",
            "@floating-ui/vue": "FloatingUIVue",
            "@element-plus/icons-vue": "ElementPlusIconsVue",
          },
          dir: "dist",
        },
      ],
    },
    lib: {
      entry: "src/index.ts",
    },
  },
});
