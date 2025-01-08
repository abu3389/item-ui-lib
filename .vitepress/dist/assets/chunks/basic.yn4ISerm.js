import{b as _,E as T}from"./index.DQ72aMia.js";import{d as v,s as r,o as x,c as F,j as t,I as d,k as s,a5 as n,w as N,a as b,t as C}from"./framework.C1DFsOn5.js";const g=t("p",null," 不使用插槽，会根据notificationType类型匹配预制模板（目前支持的notificationType模板类型：`RELEASE_NOTE`，后续会新增, 也可以自己通过插槽拓展） ",-1),I=t("br",null,null,-1),w={style:{"overflow-x":"scroll","overflow-y":"hidden"}},L={style:{width:"1440px",height:"500px"}},B=t("br",null,null,-1),k=t("p",null,"使用插槽，可自定义模板标签及变量：",-1),E=t("br",null,null,-1),D={style:{"overflow-x":"scroll","overflow-y":"hidden"}},M={style:{width:"1440px",height:"500px"}},O=t("br",null,null,-1),S=t("p",null," 添加i18n映射字段由外部传入翻译后的文字，格式为 i18n: {'i18n-[field]': 'i18nFieldName'} ",-1),W=t("br",null,null,-1),R={style:{"overflow-x":"scroll","overflow-y":"hidden"}},V={style:{width:"1440px",height:"500px"}},Y=v({__name:"basic",setup(z){const p=r({}),c=r([{label:"All",key:""},{label:"Notification",key:"other"},{label:"Alert",key:"SYSTEM_ALERT"},{label:"To-do",key:"TODO"}]),l=r([{id:"66b5c82c632a312fe1adc807",state:!0,systemNotificationId:"66b5c726632a312fe1adbc71",userId:"25584",createWhen:"2024-08-09T00:00:00",createName:"M Ch",createBy:"m.central@disbox.net",systemNotificationView:{id:"66b5c726632a312fe1adbc71",version:"1.0",title:"test1",notificationType:"RELEASE_NOTE",type:1,releaseDate:"2024-08-05T22:10:22",createBy:"m.central@disbox.net",createName:"M Ch",createWhen:"2024-08-09T00:37:10.494",application:"Item Ship",phase:"phase 2",featureNote:`aaaaaaaaaaaaaaaaaaaaaa
aaaaa`,bugFixNote:"bbbbbb",optimizeNote:"vvvvvvvvvv",platform:"11"}},{id:"66b5c82c632aassfe1adc807",state:!1,systemNotificationId:"66b5c726632a3ssse1adbc71",userId:"25584",createWhen:"2024-07-29T00:41:32.731",createName:"M Ch",createBy:"m.central@disbox.net",systemNotificationView:{id:"66b5c726632a3ssse1adbc71",version:"1.0",title:"test2",notificationType:"SYSTEM_ALERT",type:1,releaseDate:"2024-08-05T22:10:22",createBy:"m.central@disbox.net",createName:"M Ch",createWhen:"2024-08-09T00:37:10.494",application:"Item Ship",phase:"phase 2",featureNote:"1",bugFixNote:"1",optimizeNote:"1",platform:"11"}},{id:"66b5c82c632adddfe1adc807",state:!1,systemNotificationId:"66b5c726632a3fffe1adbc71",userId:"25584",createWhen:"2024-07-29T00:41:32.731",createName:"M Ch",createBy:"m.central@disbox.net",systemNotificationView:{id:"66b5c726632a3fffe1adbc71",version:"1.0",title:"test3",notificationType:"TODO",type:1,releaseDate:"2024-08-05T22:10:22",createBy:"m.central@disbox.net",createName:"M Ch",createWhen:"2024-08-09T00:37:10.494",application:"Item Ship",phase:"phase 2",featureNote:"1",bugFixNote:"1",optimizeNote:"1",platform:"11"}},{id:"66b5c82c632addsse1adc807",state:!1,systemNotificationId:"66b5c7266ss2a3fffe1adbc71",userId:"25584",createWhen:"2024-07-29T00:41:32.731",createName:"M Ch",createBy:"m.central@disbox.net",systemNotificationView:{id:"66b5c7266ss2a3fffe1adbc71",version:"1.0",title:"test4",notificationType:"TODO",type:1,releaseDate:"2024-08-05T22:10:22",createBy:"m.central@disbox.net",createName:"M Ch",createWhen:"2024-08-09T00:37:10.494",application:"Item Ship",phase:"phase 2",featureNote:"1",bugFixNote:"1",optimizeNote:"1",platform:"11"}},{id:"66b5c82c632add55sse1adc807",state:!1,systemNotificationId:"66b5c7266ss2a44fffe1adbc71",userId:"25584",createWhen:"2024-07-29T00:41:32.731",createName:"M Ch",createBy:"m.central@disbox.net",systemNotificationView:{id:"66b5c7266ss2a44fffe1adbc71",version:"1.0",title:"test6",notificationType:"TODO",type:1,releaseDate:"2024-08-05T22:10:22",createBy:"m.central@disbox.net",createName:"M Ch",createWhen:"2024-08-09T00:37:10.494",application:"Item Ship",phase:"phase 2",featureNote:"1",bugFixNote:"1",optimizeNote:"1",platform:"11"}},{id:"66b5c82c632add55sse1a55807",state:!1,systemNotificationId:"66b5c7266ss2744fffe1adbc71",userId:"25584",createWhen:"2024-07-29T00:41:32.731",createName:"M Ch",createBy:"m.central@disbox.net",systemNotificationView:{id:"66b5c7266ss2744fffe1adbc71",version:"1.0",title:"test7",notificationType:"TODO",type:1,releaseDate:"2024-08-05T22:10:22",createBy:"m.central@disbox.net",createName:"M Ch",createWhen:"2024-08-09T00:37:10.494",application:"Item Ship",phase:"phase 2",featureNote:"1",bugFixNote:"1",optimizeNote:"1",platform:"11"}}]);let i=r(c.value[0]||{}),a=r(l.value[0]||{});const y=f=>{console.log("changeFilter",f)},u=f=>{console.log("clickNotify",f)};return(f,o)=>{const m=_,h=T;return x(),F("div",null,[g,I,t("div",w,[t("div",L,[d(m,{ref_key:"notifyRef",ref:p,currentFilter:s(i),"onUpdate:currentFilter":o[0]||(o[0]=e=>n(i)?i.value=e:i=e),currentNotify:s(a),"onUpdate:currentNotify":o[1]||(o[1]=e=>n(a)?a.value=e:a=e),filterList:c.value,notifyList:l.value,onChangeFilter:y,onClickNotify:u},null,8,["currentFilter","currentNotify","filterList","notifyList"])])]),B,k,E,t("div",D,[t("div",M,[d(m,{ref_key:"notifyRef",ref:p,currentFilter:s(i),"onUpdate:currentFilter":o[2]||(o[2]=e=>n(i)?i.value=e:i=e),currentNotify:s(a),"onUpdate:currentNotify":o[3]||(o[3]=e=>n(a)?a.value=e:a=e),filterList:c.value,notifyList:l.value,onChangeFilter:y,onClickNotify:u},{detail:N(({currentNotify:e})=>[d(h,{type:"primary"},{default:N(()=>[b("这是自定义消息描述")]),_:1}),b(": "+C(e),1)]),_:1},8,["currentFilter","currentNotify","filterList","notifyList"])])]),O,S,W,t("div",R,[t("div",V,[d(m,{ref_key:"notifyRef",ref:p,currentFilter:s(i),"onUpdate:currentFilter":o[4]||(o[4]=e=>n(i)?i.value=e:i=e),currentNotify:s(a),"onUpdate:currentNotify":o[5]||(o[5]=e=>n(a)?a.value=e:a=e),filterList:c.value,notifyList:l.value,i18n:{"i18n-version":"Released Version(这里可以传入$t翻译的值)","i18n-releaseDate":"Released Date(这里可以传入$t翻译的值)","i18n-featureNote":"What’s New?(这里可以传入$t翻译的值)","i18n-optimizeNote":"Optimization(这里可以传入$t翻译的值)","i18n-bugFixNote":"Bug Fixed(这里可以传入$t翻译的值)"},onChangeFilter:y,onClickNotify:u},null,8,["currentFilter","currentNotify","filterList","notifyList","i18n"])])])])}}});export{Y as default};
