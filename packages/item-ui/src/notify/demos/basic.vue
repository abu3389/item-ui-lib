<template>
  <div>
    <p>
      不使用插槽，会根据notificationType类型匹配预制模板（目前支持的notificationType模板类型：RELEASE_NOTE，后续会新增）
    </p>
    <i-notify
      ref="notifyRef"
      :tabList="tabList"
      :notifyList="notifyList"
      :footerBtnList="footerBtnList"
      @clickNotify="clickNotify"
    />
    <br />
    <p>使用插槽，可自定义每条消息的消息描述：</p>
    <i-notify
      ref="notifyRef"
      :tabList="tabList"
      :notifyList="notifyList"
      :footerBtnList="footerBtnList"
      @clickNotify="clickNotify"
    >
      <template
        #detail="{ currentNotify }"
      >
        <el-button type="primary">这是自定义消息描述</el-button>:
        {{ currentNotify }}
      </template>
    </i-notify>
    <br />
    <p>
      添加i18n映射字段由外部传入翻译后的文字，格式为 i18n: {'i18n-[field]':
      'i18nFieldName'}
    </p>
    <i-notify
      ref="notifyRef"
      :tabList="tabList"
      :notifyList="notifyList"
      :footerBtnList="footerBtnList"
      :i18n="{
        'i18n-featureNote': `What’s New?(这里可以传入$t翻译的值)`,
        'i18n-optimizeNote': `Optimization(这里可以传入$t翻译的值)`,
        'i18n-bugFixNote': `Bug Fixed(这里可以传入$t翻译的值)`,
      }"
      @clickNotify="clickNotify"
    />
    <br />
    <p>
      使用 i-notify-sdk 组件由外部系统直接传入api在组件内部轮询获取 notifyList
    </p>
    <br />
    <p>
      （一种实验性测试，由于传入的Promise对象response返回的数据格式每个系统设计的不一致，比如：res/res.data,组件内部无法保证能够正常的取到需要的数据，不推荐使用）
    </p>
    <br />
    <p>
      1.该实验为了验证在组件内部传入接口调用方法，用于被组件直接调用，会造成心智负担和困惑
    </p>
    <p>
      2.还有一种假设是api地址直接传入（文档未演示），在组件内部直接fetch,但是接口依赖系统用户体系，需要使用者传入实时token，也会造成心智负担
    </p>
    <br />
    <p>
      综上，在组件内部直接调用api不是一种合理的方式，组件应该只关注数据源格式是否正确，而不处理接口逻辑，也更方便后续各个系统做定制化拓展
    </p>
    <i-notify-sdk
      ref="notifySdkRef"
      :tabList="tabList"
      :footerBtnList="footerBtnList"
      :userSystemNotificationSearchApi="userSystemNotificationSearchApi"
      :intervalTime="15000"
      @clickNotify="clickNotify"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const notifyRef = ref({});

const notifySdkRef = ref({});

const tabList = ref([
  {
    label: "Notification",
    key: "other",
  },
  {
    label: "Alert",
    key: "SYSTEM_ALERT",
  },
  {
    label: "To-do",
    key: "TODO",
  },
  {
    label: "To-do",
    key: "TODO",
  },
]);

const notifyList = ref([
  {
    id: "66b5c82c632a312fe1adc807",
    state: true,
    systemNotificationId: "66b5c726632a312fe1adbc71",
    userId: "25584",
    createWhen: "2024-08-09T00:41:32.731",
    createName: "M Ch",
    createBy: "m.central@disbox.net",
    systemNotificationView: {
      id: "66b5c726632a312fe1adbc71",
      version: "1.0",
      title: "test1",
      notificationType: "RELEASE_NOTE",
      type: 1,
      releaseDate: "2024-08-05T22:10:22",
      createBy: "m.central@disbox.net",
      createName: "M Ch",
      createWhen: "2024-08-09T00:37:10.494",
      application: "Item Ship",
      phase: "phase 2",
      featureNote: "aaaaa",
      bugFixNote: "bbbbbb",
      optimizeNote: "vvvvvvvvvv",
      platform: "11",
    },
  },
  {
    id: "66b5c82c632aassfe1adc807",
    state: false,
    systemNotificationId: "66b5c726632a3ssse1adbc71",
    userId: "25584",
    createWhen: "2024-07-29T00:41:32.731",
    createName: "M Ch",
    createBy: "m.central@disbox.net",
    systemNotificationView: {
      id: "66b5c726632a3ssse1adbc71",
      version: "1.0",
      title: "test2",
      notificationType: "SYSTEM_ALERT",
      type: 1,
      releaseDate: "2024-08-05T22:10:22",
      createBy: "m.central@disbox.net",
      createName: "M Ch",
      createWhen: "2024-08-09T00:37:10.494",
      application: "Item Ship",
      phase: "phase 2",
      featureNote: "1",
      bugFixNote: "1",
      optimizeNote: "1",
      platform: "11",
    },
  },
  {
    id: "66b5c82c632adddfe1adc807",
    state: false,
    systemNotificationId: "66b5c726632a3fffe1adbc71",
    userId: "25584",
    createWhen: "2024-07-29T00:41:32.731",
    createName: "M Ch",
    createBy: "m.central@disbox.net",
    systemNotificationView: {
      id: "66b5c726632a3fffe1adbc71",
      version: "1.0",
      title: "test3",
      notificationType: "TODO",
      type: 1,
      releaseDate: "2024-08-05T22:10:22",
      createBy: "m.central@disbox.net",
      createName: "M Ch",
      createWhen: "2024-08-09T00:37:10.494",
      application: "Item Ship",
      phase: "phase 2",
      featureNote: "1",
      bugFixNote: "1",
      optimizeNote: "1",
      platform: "11",
    },
  },
  {
    id: "66b5c82c632adddfaaadc807",
    state: false,
    systemNotificationId: "66b5c726632a3faae1adbc71",
    userId: "25584",
    createWhen: "2024-07-29T00:41:32.731",
    createName: "M Ch",
    createBy: "m.central@disbox.net",
    systemNotificationView: {
      id: "66b5c726632a3faae1adbc71",
      version: "1.0",
      title: "test3",
      notificationType: "TODO",
      type: 1,
      releaseDate: "2024-08-05T22:10:22",
      createBy: "m.central@disbox.net",
      createName: "M Ch",
      createWhen: "2024-08-09T00:37:10.494",
      application: "Item Ship",
      phase: "phase 2",
      featureNote: "1",
      bugFixNote: "1",
      optimizeNote: "1",
      platform: "11",
    },
  },
  {
    id: "66b5c82c632adddfssadc807",
    state: false,
    systemNotificationId: "66b5c726632a3ssfaae1adbc71",
    userId: "25584",
    createWhen: "2024-07-29T00:41:32.731",
    createName: "M Ch",
    createBy: "m.central@disbox.net",
    systemNotificationView: {
      id: "66b5c726632a3ssfaae1adbc71",
      version: "1.0",
      title: "test3",
      notificationType: "TODO",
      type: 1,
      releaseDate: "2024-08-05T22:10:22",
      createBy: "m.central@disbox.net",
      createName: "M Ch",
      createWhen: "2024-08-09T00:37:10.494",
      application: "Item Ship",
      phase: "phase 2",
      featureNote: "1",
      bugFixNote: "1",
      optimizeNote: "1",
      platform: "11",
    },
  },
  {
    id: "66b5c82c632asddddfssadc807",
    state: false,
    systemNotificationId: "66b5c726632a3sdssfaae1adbc71",
    userId: "25584",
    createWhen: "2024-07-29T00:41:32.731",
    createName: "M Ch",
    createBy: "m.central@disbox.net",
    systemNotificationView: {
      id: "66b5c726632a3sdssfaae1adbc71",
      version: "1.0",
      title: "test3",
      notificationType: "TODO",
      type: 1,
      releaseDate: "2024-08-05T22:10:22",
      createBy: "m.central@disbox.net",
      createName: "M Ch",
      createWhen: "2024-08-09T00:37:10.494",
      application: "Item Ship",
      phase: "phase 2",
      featureNote: "1",
      bugFixNote: "1",
      optimizeNote: "1",
      platform: "11",
    },
  },
]);

const footerBtnList = ref([
  {
    name: "Mark all as read",
    onClick: function () {
      console.log("Mark all as read", notifyRef.value.currentNotifyList);
      const ids = notifyRef.value.currentNotifyList.map((item: any) => {
        return item.id;
      });
      console.log("ids", ids);
    },
  },
  {
    name: "View inbox",
    onClick: function () {
      console.log("View inbox");
    },
  },
]);

const clickNotify = (item: any) => {
  console.log("clickNotify", item);
};

const userSystemNotificationSearchApi = () => {
  // 模拟接口
  const apiFunc = (params) => {
    // 需要判断是否已经登录，如果不存在token，则不请求数据（否则退出登录定时器还在接口会报错）
    // if (!getItem("token")) {
    // const interval = notifySdkRef.value?.interval;
    // interval && clearInterval(interval);
    //   return;
    // }
    console.log("userSystemNotificationSearchApi被请求了");

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(notifyList.value);
      }, 1000);
    });
  };

  // 模拟接口请求
  let userInfo = { idmUserId: "1" };
  // 请求参数
  const sendData = {
    state: false, //查询未读状态的通知
    userId: userInfo.idmUserId, //用户id
    platform: "Web", //平台
    application: "pass", //applictionCode
    sortingFields: ["createWhen"], //根据时间倒叙排列
  };

  return apiFunc(sendData);
};
</script>
