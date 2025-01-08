<template>
  <div :class="cls">
    <div v-if="type === 'RELEASE_NOTE'" :class="c('realse-note-detail')">
      <span v-if="data?.systemNotificationView?.featureNote">
        <span :class="c('realse-note-detail', ce('label'))">
          | {{ i18n?.["i18n-" + "featureNote"] || "What’s New?" }} |
        </span>
        <span>{{ data?.systemNotificationView?.featureNote || "-" }}</span>
      </span>
      <span v-if="data?.systemNotificationView?.optimizeNote">
        <span :class="c('realse-note-detail', ce('label'))">
          | {{ i18n?.["i18n-" + "optimizeNote"] || "Optimization" }} |
        </span>
        <span>{{ data?.systemNotificationView?.optimizeNote || "-" }}</span>
      </span>
      <span v-if="data?.systemNotificationView?.bugFixNote">
        <span :class="c('realse-note-detail', ce('label'))">
          | {{ i18n?.["i18n-" + "bugFixNote"] || "Bug Fixed" }} |
        </span>
        <span>{{ data?.systemNotificationView?.bugFixNote || "-" }}</span>
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useClassname } from "../utils/use-classname";

const props = defineProps({
  type: {
    type: String,
  },
  data: {
    type: Object,
    default: () => ({}),
  },
  i18n: {
    type: Object,
    default: () => ({}),
  },
});

const { cx, c, ce, cm } = useClassname("notify-template");
const cls = cx(() => {
  return {
    [c()]: true,
  };
});
</script>
