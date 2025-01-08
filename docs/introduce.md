---
title: 快速上手
---

# 快速上手

## 使用之前

您应该在一定程度上了解 [Vue](https://cn.vuejs.org/) 和 [Element](https://element-plus.org/zh-CN/) 的相关概念、基础知识，这样在使用本框架的时候会更顺利。

## 安装
```cmd
npm install "unisc-item-ui@latest" --save
```

## 全局引用

在项目的入口文件（一般是 `main.js`）中配置：

```js
import { createApp } from 'vue';
import App from './App.vue';

const app = createApp(App);

//全局引入
import uniscItemUI from 'unisc-item-ui'
import 'unisc-item-ui/dist/index.css'

app.use(uniscItemUI)
```

以上代码便完成了 uniscItemUI 的引入。需要注意的是，样式文件需要单独引入。

## 按需引用(推荐)

我们可以单独引入需要的组件，以达到减小项目体积的目的。

如您只希望单独引入 INotify 那么单独需要在项目文件中写入：

```js
//在项目按需引入
import { Notify as INotify } from 'unisc-item-ui';
import 'unisc-item-ui/es/notify/style/index.css'
```

至此，一个基于 Vue 和 uniscItemUI 的开发环境已经搭建完毕，现在就可以编写代码了。 :tada: :tada:

各个组件的使用方法请参阅它们各自的文档。
