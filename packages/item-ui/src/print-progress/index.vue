<template>
  <div>
    <print-progress ref="printRef"></print-progress>
    <print-progress-table ref="tableRef"></print-progress-table>
  </div>
</template>

<script setup lang="ts">
import { provide, ref } from "vue";

import PrintProgress from "./print-progress.vue";
import PrintProgressTable from "./print-progress-table.vue";

const props = defineProps({
  title: {
    type: String,
    default: "Print Task Progress",
  },
  description: {
    type: String,
    default:
      "The printing is in progress and is expected to take approximately 600 seconds.",
  },
  abortPrintBtnText: {
    type: String,
    default: "Abort Print",
  },
  viewProgressBtnText: {
    type: String,
    default: "View Progress",
  },
  abortAllBtnText: {
    type: String,
    default: "Abort All",
  },
  abortAllBtnloading: {
    type: Boolean,
    default: false,
  },
  abortPartBtnloading: {
    type: Boolean,
    default: false,
  },
  AbortBtnText: {
    type: String,
    default: "Abort",
  },
  tableEmptyText: {
    type: String,
    default: "No Data",
  },
  leftTime: {
    type: String,
    default: "500 seconds left",
  },
  position: {
    type: Object,
    default: () => ({
      x: '100%',
      y: 60,
    }),
  },
  duration: {
    type: Number,
    default: 1000,
  },
  fetchPrintStatus: {
    type: Function,
    default: () => ({}),
  },
  i18n: {
    type: Object,
    default: () => ({}),
  },
});

const emits = defineEmits(["printSuccess", "abortAll", "abortPart"]);

provide("props", props);
provide("emits", emits);

const tableRef: any = ref<typeof PrintProgressTable>();
const printRef: any = ref<typeof PrintProgress>();

function open(isOpen: boolean) {
  return printRef.value.open(isOpen);
}

function reset() {
  printRef.value.reset();
}

function start() {
  printRef.value.start();
}

function stop() {
  printRef.value.stop();
}

defineExpose({
  open,
  reset,
  start,
  stop,
});
</script>
