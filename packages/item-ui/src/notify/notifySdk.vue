<template>
  <!-- 消息通知API层SDK封装 -->
  <i-notify
    ref="notifyRef"
    trigger="hover"
    :notifyList="notifyList"
    v-bind="$attrs"
  >
    <template #detail="{ currentNotify }">
      <slot name="detail" :currentNotify="currentNotify"></slot>
    </template>
  </i-notify>
</template>
<script lang="ts" setup>
import { ref, onBeforeMount } from "vue";

import INotify from "./index.vue";

const props = defineProps({
  userSystemNotificationSearchApi: {
    type: Function,
    required: true,
    default: new Promise(() => {}),
  },
  intervalTime: {
    type: Number,
    default: 15000,
  },
});

const notifyRef = ref();

let interval = ref();

const notifyList = ref([]);
// 获取消息列表
const getNotifyList = () => {
  props.userSystemNotificationSearchApi().then((res: any) => {
    notifyList.value = res || [];
  });
};

// 初始化获取未读消息列表
onBeforeMount(() => {
  getNotifyList();
  // 15s轮询一次查询最新消息
  interval.value = setInterval(() => {
    getNotifyList();
  }, props.intervalTime);
});

defineExpose({
  interval,
});
</script>

<style lang="scss" scoped></style>
