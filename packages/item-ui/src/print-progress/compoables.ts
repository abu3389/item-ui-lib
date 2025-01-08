/* eslint-disable */
// @ts-nocheck
import { reactive, watch, ref, isRef, readonly, onUnmounted } from "vue";

let printProgressInfo = ref({});
const isProgressVisible = ref(false);
const isProgressTableVisible = ref(false);
const isExpand = ref(false);

export function useExpaned() {
  const expand = () => {
    isExpand.value = !isExpand.value;
  };

  onUnmounted(() => {
    isExpand.value = null;
  });
  return { isExpand, expand };
}

let progress = reactive({});

export function useProgressData(props, emits) {
  const fetchPrintStatus = async (once = false) => {
    // 用于控制停止轮询
    if (!once && progress.stop) {
      return;
    }

    // 设置打印状态
    progress.fetchPrintStatusLoading = true;

    // 调用更新进度接口（由外部处理printProgressInfo传入组件）
    const newOrderDetails = (await props.fetchPrintStatus()) || {};
    printProgressInfo.value = newOrderDetails;

    // 拿printProgressInfo计算打印进度
    progress.percentage =
      (Number(printProgressInfo.value?.currentDoneOrderNumber) /
        Number(printProgressInfo.value?.orderNumber)) *
      100;

    // 存储一些关键进度信息给外部
    progress.costTime = printProgressInfo.value?.costTime || 0;
    progress.leftTime = printProgressInfo.value?.leftTime || 0;
    progress.currentDoneOrderNumber =
      printProgressInfo.value?.currentDoneOrderNumber || 0;
    progress.orderNumber = printProgressInfo.value?.orderNumber || 0;
    progress.batchId = printProgressInfo.value?.batchId || "";
    progress.printStatus = printProgressInfo.value?.printStatus || "";

    // 进度百分百直接停止轮询
    if (progress.percentage >= 100) {
      reset();
      emits("printSuccess");
      return;
    }

    // 根据使用者设置的时间延迟轮询
    !once &&
      setTimeout(() => {
        fetchPrintStatus();
      }, props.duration);
  };

  function load() {
    reset();
    start();
  }

  function start() {
    isProgressVisible.value = true;
    progress.stop = false;
    !progress.fetchPrintStatusLoading && fetchPrintStatus();
  }

  function stop() {
    progress.stop = true;
    progress.fetchPrintStatusLoading = false;
  }

  function reset() {
    stop();
    init();
  }

  function init() {
    // 隐藏进度条
    isProgressVisible.value = false;
    // 折叠进度条
    isExpand.value = false;
    // 初始化进度
    progress = Object.assign(progress, {
      percentage: 0,
      costTime: 0,
      leftTime: 0,
      currentDoneOrderNumber: 0,
      orderNumber: 0,
      batchId: "",
      printStatus: "",
      stop: true,
      fetchPrintStatusLoading: false,
      isProgressVisible,
      isProgressTableVisible,
    });
  }

  onUnmounted(() => {
    reset();
  });

  return {
    progress,
    printProgressInfo,
    isProgressVisible,
    isProgressTableVisible,
    action: {
      load,
      start,
      stop,
      reset,
    },
  };
}

export function useProgress({ emits, props, selection = [] }) {
  const { isExpand, expand } = useExpaned();
  const { progress, action } = useProgressData(props, emits);

  // 打开进度条弹窗
  function openPrintProgress(isOpen) {
    action.load();
    return readonly(progress);
  }

  // 打开进度列表弹窗
  function openPrintProgressTable() {
    expand();
    isProgressTableVisible.value = true;
    return readonly(progress);
  }

  // 停止打印所有
  function abortAll() {
    emits("abortAll", printProgressInfo.value?.batchId || "");
  }

  // 停止打印部分（需要获取接口更新状态）
  function abortPart() {
    emits("abortPart", {
      batchId: printProgressInfo.value?.batchId || "",
      selection: selection.value || [],
    });
  }

  return {
    progress,
    printProgressInfo,
    isProgressVisible,
    isProgressTableVisible,
    openPrintProgressTable,
    openPrintProgress,
    abortAll,
    abortPart,
  };
}
