<template>
  <div
    ref="printProgressRef"
    v-show="isProgressVisible"
    :class="cls"
    :style="style"
    style="position: fixed"
  >
    <!-- header -->
    <div :class="c(ce('header'))">
      <div :class="c(ce('header-title'))">{{ props.title }}</div>
      <div :class="c(ce('header-icon'))">
        <el-icon v-if="!isExpand" @click="expand">
          <ArrowDownBold />
        </el-icon>
        <el-icon v-else @click="expand">
          <ArrowUpBold />
        </el-icon>
      </div>
    </div>
    <!-- progress -->
    <div :class="c(ce('progress'))">
      <div :class="c(ce('progress-text'))" v-if="isExpand">
        {{ props.description }}
      </div>
      <el-progress
        :percentage="progress.percentage"
        status="success"
        :show-text="false"
      />
      <div :class="c(ce('progress-subtest'))">{{ props.leftTime }}</div>
    </div>
    <!-- button handle -->
    <div :class="c(ce('footer'))" v-if="isExpand">
      <span :class="c(ce('footer-text'))" @click="abortAll">
        {{ props.abortPrintBtnText }}
      </span>
      <span :class="c(ce('footer-text'))" @click="openPrintProgressTable">
        {{ props.viewProgressBtnText }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, inject } from "vue";
import { useDraggable } from "@vueuse/core";
import { useClassname } from "../utils/use-classname";
import { ElIcon } from "element-plus";
import { ArrowDownBold, ArrowUpBold } from "@element-plus/icons-vue";
import { useExpaned, useProgress, useProgressData } from "./compoables";

// 使用 useClassname 钩子
const { cx, c, ce, cm } = useClassname("print-progress");

// 使用 useExpaned 钩子管理 expand 状态
const { isExpand, expand } = useExpaned();

// 注入 props 和 emits
const props = inject("props");
const emits = inject("emits");

// 使用 useProgressData 钩子获取进度数据和操作方法
const { progress, printProgressInfo, action } = useProgressData(props, emits);

// 计算类名
const cls = cx(() => {
  return {
    [c()]: true,
    [c(cm("expanded"))]: isExpand.value,
  };
});

const printProgressRef = ref(null);

// 使用 useDraggable 钩子管理拖拽相关逻辑
const { style } = useDraggable(printProgressRef, {
  initialValue: {
    ...props.position,
  },
});

// 使用 useProgress 钩子管理进度相关逻辑
const {
  openPrintProgressTable,
  abortAll,
  openPrintProgress: open,
  isProgressVisible,
} = useProgress({
  emits,
  props,
});

defineExpose({
  open,
  reset: action.reset,
  start: action.start,
  stop: action.stop,
});
</script>

<style scoped>
.draggable-box {
  width: 100px;
  height: 100px;
  background-color: lightblue;
  cursor: grab;
  position: absolute; /* 必须是 absolute 或 fixed 来实现自由移动 */
}
</style>
