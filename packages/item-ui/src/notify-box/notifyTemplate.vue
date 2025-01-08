<template>
  <div :class="cls">
    <!-- 版本发布消息模板 -->
    <div v-if="type === 'RELEASE_NOTE'" :class="c('realse-note-content')">
      <div :class="c('realse-note-content', ce('title'))">
        {{ data?.systemNotificationView?.title || "-" }}
      </div>
      <div :class="c('realse-note-content', ce('realse-info'))">
        <div style="margin-bottom: 16px">
          {{ i18n?.["i18n-" + "version"] || `Released Version` }}:
          {{ data?.systemNotificationView?.version }} 
        </div>
        <div>
          {{ i18n?.["i18n-" + "releaseDate"] || `Released Date` }}:
          {{
            dayjs(data?.systemNotificationView?.releaseDate).format(
              "MM/DD/YYYY"
            )
          }}
        </div>
      </div>
      <div :class="c('realse-note-content', ce('title'))">
        {{ i18n?.["i18n-" + "featureNote"] || "What’s New?" }}
      </div>
      <div
        :class="c('realse-note-content', ce('realse-detail'))"
        v-html="
          data?.systemNotificationView?.featureNote?.replace(/\n/g, '<br>') ||
          'N/A'
        "
      ></div>
      <div :class="c('realse-note-content', ce('title'))">
        {{
          i18n?.["i18n-" + "optimizeNote"] || "Optimization"
        }}
      </div>
      <div
        :class="c('realse-note-content', ce('realse-detail'))"
        v-html="
          data?.systemNotificationView?.optimizeNote?.replace(/\n/g, '<br>') ||
          'N/A'
        "
      ></div>
      <div :class="c('realse-note-content', ce('title'))">
        {{ i18n?.["i18n-" + "bugFixNote"] || "Bug Fixed" }}
      </div>
      <div
        :class="c('realse-note-content', ce('realse-detail'))"
        v-html="
          data?.systemNotificationView?.bugFixNote?.replace(/\n/g, '<br>') ||
          'N/A'
        "
      ></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import dayjs from "dayjs";
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

const { cx, c, ce, cm } = useClassname("notify-box-template");
const cls = cx(() => {
  return {
    [c()]: true,
  };
});
</script>
