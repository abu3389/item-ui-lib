<template>
  <div>
    <p>
      不使用插槽，会根据notificationType类型匹配预制模板（目前支持的notificationType模板类型：`RELEASE_NOTE`，后续会新增,
      也可以自己通过插槽拓展）
    </p>
    <br />
    <div style="overflow-x: scroll; overflow-y: hidden">
      <div style="width: 1440px; height: 500px">
        <!-- 实际组件，直接取用，外层div只是为了模拟有滚动条的页面 -->
        <i-notify-box
          ref="notifyRef"
          v-model:currentFilter="currentFilter"
          v-model:currentNotify="currentNotify"
          :filterList="filterList"
          :notifyList="notifyList"
          @changeFilter="changeFilter"
          @clickNotify="clickNotify"
        />
      </div>
    </div>
    <br />
    <p>使用插槽，可自定义模板标签及变量：</p>
    <br />
    <div style="overflow-x: scroll; overflow-y: hidden">
      <div style="width: 1440px; height: 500px">
        <!-- 实际组件，直接取用，外层div只是为了模拟有滚动条的页面 -->
        <i-notify-box
          ref="notifyRef"
          v-model:currentFilter="currentFilter"
          v-model:currentNotify="currentNotify"
          :filterList="filterList"
          :notifyList="notifyList"
          @changeFilter="changeFilter"
          @clickNotify="clickNotify"
        >
          <template #detail="{ currentNotify }">
            <el-button type="primary">这是自定义消息描述</el-button>:
            {{ currentNotify }}
          </template>
        </i-notify-box>
      </div>
    </div>
    <br />
    <p>
      添加i18n映射字段由外部传入翻译后的文字，格式为 i18n: {'i18n-[field]':
      'i18nFieldName'}
    </p>
    <br />
    <div style="overflow-x: scroll; overflow-y: hidden">
      <div style="width: 1440px; height: 500px">
        <!-- 实际组件，直接取用，外层div只是为了模拟有滚动条的页面 -->
        <i-notify-box
          ref="notifyRef"
          v-model:currentFilter="currentFilter"
          v-model:currentNotify="currentNotify"
          :filterList="filterList"
          :notifyList="notifyList"
          :i18n="{
            'i18n-version': `Released Version(这里可以传入$t翻译的值)`,
            'i18n-releaseDate': `Released Date(这里可以传入$t翻译的值)`,
            'i18n-featureNote': `What’s New?(这里可以传入$t翻译的值)`,
            'i18n-optimizeNote': `Optimization(这里可以传入$t翻译的值)`,
            'i18n-bugFixNote': `Bug Fixed(这里可以传入$t翻译的值)`,
          }"
          @changeFilter="changeFilter"
          @clickNotify="clickNotify"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const notifyRef = ref({});

const filterList = ref([
  {
    label: "All",
    key: "",
  },
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
    label: "aaaaa",
    key: "aaaaa",
  },
]);

const notifyList = ref([
  {
    id: "66b5c82c632a312fe1adc807",
    state: true,
    systemNotificationId: "66b5c726632a312fe1adbc71",
    userId: "25584",
    createWhen: "2024-08-09T00:00:00",
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
      featureNote: "aaaaaaaaaaaaaaaaaaaaaa\naaaaa",
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
    id: "66b5c82c632addsse1adc807",
    state: false,
    systemNotificationId: "66b5c7266ss2a3fffe1adbc71",
    userId: "25584",
    createWhen: "2024-07-29T00:41:32.731",
    createName: "M Ch",
    createBy: "m.central@disbox.net",
    systemNotificationView: {
      id: "66b5c7266ss2a3fffe1adbc71",
      version: "1.0",
      title: "test4",
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
    id: "66b5c82c632add55sse1adc807",
    state: false,
    systemNotificationId: "66b5c7266ss2a44fffe1adbc71",
    userId: "25584",
    createWhen: "2024-07-29T00:41:32.731",
    createName: "M Ch",
    createBy: "m.central@disbox.net",
    systemNotificationView: {
      id: "66b5c7266ss2a44fffe1adbc71",
      version: "1.0",
      title: "test6",
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
    id: "66b5c82c632add55sse1a55807",
    state: false,
    systemNotificationId: "66b5c7266ss2744fffe1adbc71",
    userId: "25584",
    createWhen: "2024-07-29T00:41:32.731",
    createName: "M Ch",
    createBy: "m.central@disbox.net",
    systemNotificationView: {
      id: "66b5c7266ss2744fffe1adbc71",
      version: "1.0",
      title: "test7",
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

let currentFilter: any = ref(filterList.value[0] || {});
let currentNotify: any = ref(notifyList.value[0] || {});

const changeFilter = (item: any) => {
  console.log("changeFilter", item);
};

const clickNotify = (item: any) => {
  console.log("clickNotify", item);
};
</script>
