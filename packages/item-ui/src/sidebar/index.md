# 侧边栏 ISidebar

## 介绍
item ship风格 基于element-plus el-menu二次封装

## 何时使用
按需加载
```ts
import {Sidebar as ISidebar} from "unisc-item-ui"
import "unisc-item-ui/es/sidebar/style/index.css"
```
全量加载
```ts
import itemUi from "unisc-item-ui"
import "unisc-item-ui/dist/index.css"

const app = createApp(App)
app.use(itemUi)
```

## 代码演示


<demo src="./demos/basic.vue"></demo>


## 属性


| 属性       | 说明                         | 类型     | 默认值  | 
| ---------- | ---------------------------- | -------- | ------- |
| * data      | 菜单数据，必须为响应对象，Reactive or Ref                  | `Array<MenuItem>` | `[]` |
| * application    | Application数据                  | `Array` | `[]`   |
| * defaultApplicationActive | 默认激活哪一个application | `String`  | `1` |
| isCollapsed | 是否展开折叠     | `Boolean`  | `false` |
| collect |  收藏菜单事件，回调参数是一个响应对象     | `Function`  | `(item:Observable)=>{  item.meta.active = true }` |
| width | sidebar宽度 | `String`  | `360px` |

## MenuItem
 
- icon : Component 
- index : String 菜单唯一id

```js
{
		index: '6',
		id: 'step7',
		path: '/shipments',
		meta:{
			icon:shipments,
      title: 'Fulfillments',
		},
    children: [
			{
				index: '6-1',
				path: `/${dir}/shipments/fulfillments`,
				meta:{
					collect:true,
          active: false,
				  title: 'Fulfillments',
				}
			},
    ]
}

```

## 事件
| 事件名       | 说明                   | 类型       | 默认值                   |
| ------------ | ---------------------- | ---------- | ------------------------ |
| open | 点击sub-menu触发     | `Function` | `(index,indexPath,item,routerResult) => void` |
| select | 点击菜单项触发     | `Function` | `(index,indexPath,item,routerResult) => void` |
| more | 点击Application触发的回调     | `Function` | `(value: Boolean) => void` |
| collapse  | 点击折叠按钮触发的回调 | `Function` | `(value: Boolean) => void` |
| app-click  | 点击application触发得事件 | `Function` | `(app: Applicatiob) => void` |

## 参考
更多参考 [element-plus](https://element-plus.org/zh-CN/component/menu.html)

## 代码案例
```vue
<template>
  	<div class="flex w-full">
      <div :class="isOpen ? 'absolute w-[100%] h-[100%] z-[1000] left-absolute' : ''">
          <i-sidebar router :data="menuList" :isCollapsed="collapsed" :collect="handleCollect" :key="refreshKey"
            :application="applicationList" @collapse="collapse" @more="handleMore" defaultApplicationActive="item_ship"
            @app-click="gotoSubSys" @open="open" @select="select">
            <template #logo>
              <ItemShipLogo></ItemShipLogo>
            </template>
            <template #logo2>
              <ItemShipLogo2></ItemShipLogo2>
            </template>
          </i-sidebar>
        </div>
        <div id="layout-right" class="bg-black-400">
          xxx
        </div>
    </div>
</template>

<script setup lang="ts">
const menuList = ref([])
const isOpen = ref(false)
const collapsed = ref(false)
const isMore = ref(false)

function handleMenuItems(menuItems) {
	return (menuItems || []).map((item) => {
		item.meta = {
			id: item.id,
			title: item.title,
			icon: item.icon,
			...item.meta,
		}
		if (item.children) {
			item.children = handleMenuItems(item.children);
		}
		return item;
	});
}
// 权限再此没有用，需要外部处理外部得业务逻辑，过滤权限，渲染菜单
const menuList1 = [
{
		index: '1',
		title: 'Dashboard',
		path: `/${dir}/dashboard`,
		icon: 'iconfont ship-dashboard',
		permissions: 'item_ship::web::dashboard::dashboard_read',
		meta:{
			icon:dashboard,
			collect:true,
		},
	},
	{
		index: '2',
		title: 'Channels',
		id: 'step2',
		path: `/${dir}/channels`,
		icon: 'iconfont ship-channels',
		permissions: 'item_ship::web::channels::channels_read',
		meta:{
			icon:channels,
			collect:true,
			scrollY:true,
		},
	},
]
const refreshKey = ref(Date.now());
function initMenu() {
	menuList.value = handleMenuItems(menuList1)
	refreshKey.value = Date.now();
}

// Pad端需要z-index和蒙层
function changeMenuOpen(current) {
	if (isMore.value) {
		isMore.value = false;
	}
	if (current === 9) {
		isMore.value = true;
		handleMore(true);
	}
}

const checkWindowSize = () => {
	const width = document.body.clientWidth
	if (width < 1024) {
		collapsed.value = true
	} else {
		collapsed.value = false
		isOpen.value = false
	}
};
function collapse(val) {
	if (collapsed.value && !val) {
		isOpen.value = true
	}
	if (val) {
		isOpen.value = false
	}
}
function handleMore(value: boolean) {
	isMore.value = value
	// getApplication();  // 自己掉application接口
	// if (getItem('userInfo').isWatched) {
		if (collapsed.value) {
			isOpen.value = true
		}
	// }
}

function select(...args){
	console.log(args)
	// menuList.find(item => item.path === args[0])
	// maybe you useRouter().push or repalce
}
function open(...args){
	console.log(args)
}


onMounted(async () => {
	initMenu();
	checkWindowSize();
	window.addEventListener('resize', checkWindowSize);
});

onUnmounted(() => {
	window.removeEventListener('resize', checkWindowSize);
});
</script>

<style lang="scss">
.el-menu-item,
.el-sub-menu__title {
	font-family: 'Helvetica', sans-serif !important;
}
</style>

<style lang="scss"  scoped>
// 看你们需不需要
::-webkit-scrollbar {
	width: 1px;
}

// 这个是必须的
@media screen and (max-width: 1024px) {
	.left-absolute {
		width: 100%;
		position: absolute;
		z-index: 100000;
		background-color: rgba(0, 0, 0, 0.5);
		height: 100%;
	}
}
</style>
···