# 打印进度组件 IPrintProgress

## 介绍

用于打印Order时显示打印进度


## 代码演示


<demo src="./demos/basic.vue"></demo>

> 注意：组件库暂时没有支持多语言，进度列表中若存在需要i18n翻译的字段，需要添加i18n映射字段由外部传入翻译后的文字，格式为 `i18n: {'i18n-[field]': 'i18nFieldName'}`


## 属性

| 属性     | 说明             | 类型                             | 默认值    |
| -------- | ---------------- | -------------------------------- | --------- |
| title | 进度条顶部标题 | `String` | `Print Task Progress` |
| description | 进度条/列表提示文字 | `String` | `The printing is in progress and is expected to take approximately 600 seconds.` |
| abortPrintBtnText | 进度条停止打印的按钮名称 | `String` | `Abort Print` |
| viewProgressBtnText |进度条查看进度列表的按钮名称 | `String` | `View Progress` |
| abortAllBtnText | 进度列表右上角停止所有打印的按钮名称 | `String` | `Abort All` |
| abortAllBtnloading | 进度列表右上角停止所有打印的按钮Loading状态 | `Boolean` | `false` |
| AbortBtnText | 进度列表右上角停止部分打印的名称 | `String` | `Abort` |
| abortPartBtnloading | 进度列表右上角停止部分打印的按钮Loading状态 | `Boolean` | `false` |
| tableEmptyText | 表格缺省名称 | `String` | `No Data` |
| leftTime | 剩余时间提示文字 | `String` | `500 seconds left` |
| position | 进度条浮窗展示的位置 | `Object` | `{ x: '100%', y: 60 }` |
| duration | 进度条轮询打印的间隔时间(秒) | `Number` | `1000` |
| fetchPrintStatus | 进度条轮询打印调用的方法 | `Promise` | `{}` |
| i18n | i18n映射字段由外部传入翻译后的文字，格式为 `i18n: {'i18n-[field]': 'i18nFieldName'}` | `Object`  | `{}` |

## 事件

| 事件名     | 说明             | 类型                            |  默认值  |
| -------- | ---------------- | -------------------------------- | --------- |
| printSuccess | 打印完成触发的回调 | `Function`| `() => void` |
| abortAll | 点击停止全部打印触发的回调 | `Function`| `(batchId: string) => void` |
| abortPart | 点击停止部分打印触发的回调 | `Function`| `({batchId: string, selection: array}) => void` |


## 方法

| 方法名     | 说明             | 类型                            |  默认值  |
| -------- | ---------------- | -------------------------------- | --------- |
| open | 打开进度条浮窗(调用后会返回响应式的progress进度信息对象) | `Function`| `() => return progress` |
| reset | 重置打印进度条(会初始化打印状态并停止轮询) | `Function`| `() => void` |
| stop | 暂停打印(会暂停轮询,可通过start再次开启) | `Function`| `() => void` |
| start | 继续打印(会开始轮询,可通过stop暂停轮询) | `Function`| `() => void` |

