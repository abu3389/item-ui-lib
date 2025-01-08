# 通知栏组件 INotify

## 介绍
这是一个用于显示通知栏浮窗提示的组件。


## 代码演示

<demo src="./demos/basic.vue"></demo>

> 注意：若tabList中存在key为`other`的项，tabList根据`notificationType`匹配不到类型的数据会被归纳到该分类下

> 注意：组件库暂时没有支持多语言，预制模板中若存在需要i18n翻译的字段，需要添加i18n映射字段由外部传入翻译后的文字，格式为 `i18n: {'i18n-[field]': 'i18nFieldName'}`


## 属性（INotify / INotifySdk）

| 属性     | 说明             | 类型                             | 默认值    |
| -------- | ---------------- | -------------------------------- | --------- |
| showHoverBellLine | 鼠标hover是否显示底部下划线 | `Boolean` | `true` |
| bellLineSpace | 铃铛和底部下划线的间距（可配合el-porver自带的属性`offset` 调整浮窗跟下划线的距离） | `String` | `10px` |
| notifyListMaxHeight | 消息列的最大高度（超出滚动） | `String` | `300px` |
| tabList | 选项卡的配置(数据格式见示例) | `Array` | `[]` |
| notifyList | 消息列表(数据格式见示例) | `Array` | `[]` |
| footerBtnList | 消息底部按钮的配置(数据格式见示例) | `Array` | `[]` |
| emptyName | 无数据的文字信息 | `String` | `No Data` |
| i18n | i18n映射字段由外部传入翻译后的文字，格式为 `i18n: {'i18n-[field]': 'i18nFieldName'}` | `Object`  | `{}` |
| 继承element-plus属性 | 该组件继承el-popover的所有属性，可移步[el-popover](https://element-plus.org/zh-CN/component/popover.html)直接使用里面的属性 | - | - |


## 属性（INotifySdk）
| 属性     | 说明             | 类型                             | 默认值    |
| -------- | ---------------- | -------------------------------- | --------- |
| userSystemNotificationSearchApi |  | `Promise` | `new Promise(() => {})` |
| intervalTime | 获取最新消息的轮询时间（毫秒） | `Number` | `15000` |


## 事件（INotify / INotifySdk）

| 事件名     | 说明             | 类型                            |  默认值  |
| -------- | ---------------- | -------------------------------- | --------- |
| clickNotify | 点击某条消息触发的回调 | `Function`| `(item: Object) => void` |
| changeTab | 点击某条消息触发的回调 | `Function`| `(item: Object) => void` |
| 继承element-plus事件 | 该组件继承el-popover的所有事件，可，可移步[el-popover](https://element-plus.org/zh-CN/component/popover.html)直接使用里面的事件 | - | - |


## 方法（INotify）

| 方法名     | 说明             | 类型                            |  默认值  |
| -------- | ---------------- | -------------------------------- | --------- |
| changeTab | 改变tab选中的项 | `Function`| `(item: Object) => void` |
| notifyListGroup | 可直接获取到消息列表分组后的数据 | `Object` |  `{}` |
| currentNotifyList | 可直接获取到当前选中tab消息的列表数据 | `Array` |  `[]` |

## 方法（INotifySdk）

| 方法名     | 说明             | 类型                            |  默认值  |
| -------- | ---------------- | -------------------------------- | --------- |
| interval | 定时器对象 | `Function`| `(item: Object) => void` |


## 插槽（INotify / INotifySdk）

| 插槽名     | 说明             |
| -------- | ---------------- |
| detail | 用于自定义每一项消息中的消息描述展示 |
