// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'

// 导入antd的主题风格的demo
import { AntdTheme } from 'vite-plugin-vitepress-demo/theme'

// 导入样式
import 'item-ui/styles.ts'
import './style.css'

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
    })
  },
  enhanceApp({ app }) {
    // 注册我们的demo
    app.component('demo', AntdTheme)
    // app.use(item)
  },
} satisfies Theme
