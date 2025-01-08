# unisc-item-ui

这是一个基于vue3的UI框架 
https://me7.cn/item-ui

## 安装

```shell
pnpm i unisc-item-ui
```

## 使用

### 全局加载

```ts
import itemUI from 'unisc-item-ui'
import 'unisc-item-ui/dist/index.css'

import { createApp } from 'vue'
import App from './App.vue'
const app = createApp(App)

app.use(itemUI)  

app.mount('#app')
```

### 按需引用

```vue
<script lang="ts" setup>
import { Button } from 'unsic-item-ui'
import 'unisc-item-ui/es/button/style/index.css'
</script>

<template>
  <Button>按钮</Button>
</template>
```

## 开发

本项目分为内外2层，外层主要是docs vitepress，和插件、color样式的配置，核心Core打包的是packages/item-ui，开发也需要在item-ui里执行install命令，内层外层都要安装响应的依赖。然后到最外层启动项目，要打包时，直接运行npm run publish:lib，这个命令会启动build脚本，在脚本下面有打包、发布npm、发布github仓库，如果你不需要发布github把相关函数注释即可
```shell
# 安装依赖 
pnpm install

# 启动项目
pnpm docs:dev

# 开启单元测试
pnpm test

# 单元测试覆盖率测试
pnpm coverage
```
