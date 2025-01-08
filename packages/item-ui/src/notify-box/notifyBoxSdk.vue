<template>
  <i-notify-box
    ref="notifyBoxRef"
    v-model:currentNotify="currentNotify"
    v-model:currentFilter="currentFilter"
    :notifyList="notifyList"
    @changeFilter="changeFilter"
    @clickNotify="clickNotify"
    v-bind="$attrs"
  />
</template>
<script lang="ts" setup>
import { ref, onBeforeMount, onUnmounted, useAttrs } from "vue";
import INotifyBox from "./index.vue";

const attrs: any = useAttrs();

const props = defineProps({
  userSystemNotificationSearchApi: {
    type: Function,
    required: true,
    default: new Promise(() => {}),
  },
  updateUserNotificationReadStateApi: {
    type: Function,
    required: true,
    default: new Promise(() => {}),
  },
  intervalTime: {
    type: Number,
    default: 15000,
  },
});

const notifyBoxRef = ref();

let notifyList = ref([]);
let currentNotify = ref({});
let currentFilter = ref(attrs?.filterList[0] || {});

let interval = ref();

// 消息类型筛选条件点击切换的事件
const changeFilter = (item: any) => {
  console.log("changeFilter", item);
  // 根据消息类型查询消息
  getNotifyList({
    notificationType: item.key,
    needSetDefaultCurrentNotify: true,
  });
};

// 点击消息触发的事件
const clickNotify = (item: any) => {
  console.log("clickNotify", item);
  // 点击消息后将消息置为已读
  setHasRead();
};

// 将当前消息置为已读
const setHasRead = () => {
  // 点击消息后将消息置为已读, 成功后手动设置消息为已读
  !currentNotify.value.state &&
    props.updateUserNotificationReadStateApi().then((res) => {
      notifyList.value.forEach((item) => {
        if (item.id === id) {
          item.state = true; //设置状态为已读
        }
      });
    });
};

// 获取消息列表
const getNotifyList = (params: {
  excludeNotificationTypes: Array<string>; //需要排除的通知类型
  notificationType: string; //需要查询的通知类型
  needSetDefaultCurrentNotify: boolean; //获取后是否需要设置当前默认展示详情的消息（默认取列表第一个）
}) => {
  // 请求消息数据
  props.userSystemNotificationSearchApi(sendData).then((res: any) => {
    notifyList.value = res || [];
    // 若查询不到列表，当前详细置空
    if (!notifyList.value.length) {
      currentNotify.value = {};
    }
    //判断是否需要设置当前默认展示详情的消息
    if (params?.needSetDefaultCurrentNotify && notifyList.value.length) {
      currentNotify.value = res[0];
      // 将当前消息标记为已读
      setHasRead();
    }
  });
};

// 获取筛选项第一个配置的消息列表
const initData = () => {
  // 如果存在缓存，说明是顶部铃铛点击消息跳转过来的
  const info = getItem("currentNotify");
  removeItem("currentNotify");

  if (info?.id) {
    // 设置当前详情展示的消息
    currentNotify.value = info;
    // 设置当前消息对应的筛选条件
    currentFilter.value =
      filterList.value.find(
        (item) => item.key === info.systemNotificationView.notificationType
      ) || filterList.value[0];
    // 将当前消息标记为已读
    setHasRead();
    // 获取消息列表
    getNotifyList();
  } else {
    // 默认初始化进来选择第一条
    getNotifyList({ needSetDefaultCurrentNotify: true });
  }

  // 15s轮询一次查询最新消息
  interval.value = setInterval(() => {
    getNotifyList();
  }, 15000);
};

// 初始化
onBeforeMount(() => {
  initData();
});

// 页面卸载需要清除定时器
onUnmounted(() => {
  interval.value && clearInterval(interval.value);
});

defineExpose({
  interval,
});
</script>

<style lang="scss" scoped></style>
