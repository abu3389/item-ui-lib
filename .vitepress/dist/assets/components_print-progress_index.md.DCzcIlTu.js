import{_ as e,D as o,c as r,I as c,a9 as t,o as a}from"./chunks/framework.C1DFsOn5.js";const P=JSON.parse('{"title":"打印进度组件 IPrintProgress","description":"","frontmatter":{},"headers":[],"relativePath":"components/print-progress/index.md","filePath":"packages/item-ui/src/print-progress/index.md"}'),n={name:"components/print-progress/index.md"},i=t('<h1 id="打印进度组件-iprintprogress" tabindex="-1">打印进度组件 IPrintProgress <a class="header-anchor" href="#打印进度组件-iprintprogress" aria-label="Permalink to &quot;打印进度组件 IPrintProgress&quot;">​</a></h1><h2 id="介绍" tabindex="-1">介绍 <a class="header-anchor" href="#介绍" aria-label="Permalink to &quot;介绍&quot;">​</a></h2><p>用于打印Order时显示打印进度</p><h2 id="代码演示" tabindex="-1">代码演示 <a class="header-anchor" href="#代码演示" aria-label="Permalink to &quot;代码演示&quot;">​</a></h2>',4),s=t('<blockquote><p>注意：组件库暂时没有支持多语言，进度列表中若存在需要i18n翻译的字段，需要添加i18n映射字段由外部传入翻译后的文字，格式为 <code>i18n: {&#39;i18n-[field]&#39;: &#39;i18nFieldName&#39;}</code></p></blockquote><h2 id="属性" tabindex="-1">属性 <a class="header-anchor" href="#属性" aria-label="Permalink to &quot;属性&quot;">​</a></h2><table tabindex="0"><thead><tr><th>属性</th><th>说明</th><th>类型</th><th>默认值</th></tr></thead><tbody><tr><td>title</td><td>进度条顶部标题</td><td><code>String</code></td><td><code>Print Task Progress</code></td></tr><tr><td>description</td><td>进度条/列表提示文字</td><td><code>String</code></td><td><code>The printing is in progress and is expected to take approximately 600 seconds.</code></td></tr><tr><td>abortPrintBtnText</td><td>进度条停止打印的按钮名称</td><td><code>String</code></td><td><code>Abort Print</code></td></tr><tr><td>viewProgressBtnText</td><td>进度条查看进度列表的按钮名称</td><td><code>String</code></td><td><code>View Progress</code></td></tr><tr><td>abortAllBtnText</td><td>进度列表右上角停止所有打印的按钮名称</td><td><code>String</code></td><td><code>Abort All</code></td></tr><tr><td>abortAllBtnloading</td><td>进度列表右上角停止所有打印的按钮Loading状态</td><td><code>Boolean</code></td><td><code>false</code></td></tr><tr><td>AbortBtnText</td><td>进度列表右上角停止部分打印的名称</td><td><code>String</code></td><td><code>Abort</code></td></tr><tr><td>abortPartBtnloading</td><td>进度列表右上角停止部分打印的按钮Loading状态</td><td><code>Boolean</code></td><td><code>false</code></td></tr><tr><td>tableEmptyText</td><td>表格缺省名称</td><td><code>String</code></td><td><code>No Data</code></td></tr><tr><td>leftTime</td><td>剩余时间提示文字</td><td><code>String</code></td><td><code>500 seconds left</code></td></tr><tr><td>position</td><td>进度条浮窗展示的位置</td><td><code>Object</code></td><td><code>{ x: &#39;100%&#39;, y: 60 }</code></td></tr><tr><td>duration</td><td>进度条轮询打印的间隔时间(秒)</td><td><code>Number</code></td><td><code>1000</code></td></tr><tr><td>fetchPrintStatus</td><td>进度条轮询打印调用的方法</td><td><code>Promise</code></td><td><code>{}</code></td></tr><tr><td>i18n</td><td>i18n映射字段由外部传入翻译后的文字，格式为 <code>i18n: {&#39;i18n-[field]&#39;: &#39;i18nFieldName&#39;}</code></td><td><code>Object</code></td><td><code>{}</code></td></tr></tbody></table><h2 id="事件" tabindex="-1">事件 <a class="header-anchor" href="#事件" aria-label="Permalink to &quot;事件&quot;">​</a></h2><table tabindex="0"><thead><tr><th>事件名</th><th>说明</th><th>类型</th><th>默认值</th></tr></thead><tbody><tr><td>printSuccess</td><td>打印完成触发的回调</td><td><code>Function</code></td><td><code>() =&gt; void</code></td></tr><tr><td>abortAll</td><td>点击停止全部打印触发的回调</td><td><code>Function</code></td><td><code>(batchId: string) =&gt; void</code></td></tr><tr><td>abortPart</td><td>点击停止部分打印触发的回调</td><td><code>Function</code></td><td><code>({batchId: string, selection: array}) =&gt; void</code></td></tr></tbody></table><h2 id="方法" tabindex="-1">方法 <a class="header-anchor" href="#方法" aria-label="Permalink to &quot;方法&quot;">​</a></h2><table tabindex="0"><thead><tr><th>方法名</th><th>说明</th><th>类型</th><th>默认值</th></tr></thead><tbody><tr><td>open</td><td>打开进度条浮窗(调用后会返回响应式的progress进度信息对象)</td><td><code>Function</code></td><td><code>() =&gt; return progress</code></td></tr><tr><td>reset</td><td>重置打印进度条(会初始化打印状态并停止轮询)</td><td><code>Function</code></td><td><code>() =&gt; void</code></td></tr><tr><td>stop</td><td>暂停打印(会暂停轮询,可通过start再次开启)</td><td><code>Function</code></td><td><code>() =&gt; void</code></td></tr><tr><td>start</td><td>继续打印(会开始轮询,可通过stop暂停轮询)</td><td><code>Function</code></td><td><code>() =&gt; void</code></td></tr></tbody></table>',7);function h(l,p,b,_,g,u){const d=o("demo");return a(),r("div",null,[i,c(d,{src:"packages/item-ui/src/print-progress/demos/basic.vue"}),s])}const x=e(n,[["render",h]]);export{P as __pageData,x as default};