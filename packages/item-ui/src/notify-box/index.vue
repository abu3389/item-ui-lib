<template>
  <div :class="[cls, c('div')]">
    <div :class="c('left-content')">
      <div :class="c('left-content-header')" ref="leftHeaderRef">
        <div :class="c('left-content-header', ce('filter'))">
          <span :class="c('left-content-header', ce('title'))">
            {{ title }}
          </span>
          <!-- <el-dropdown trigger="click" :popper-class="cls">
            <span :class="c('left-content-header', ce('dropdown-text'))">
              {{ currentFilter.label }}
              <span>
                <downIcon />
              </span>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item
                  v-for="(item, index) in filterList"
                  :key="index"
                  :class="
                    currentFilter.key === item.key
                      ? c('left-content-header', ce('dropdown'), cm('active'))
                      : ''
                  "
                  @click="changeFilter(item)"
                >
                  {{ item.label }}
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown> -->
        </div>
        <div :class="c('left-content-header', ce('tab'))">
          <div :class="c('left-content-header', ce('tab-div'))">
            <span
              v-for="(item, index) in filterList"
              :key="index"
              :class="[
                c('left-content-header', ce('tab-item')),
                currentFilter.key === item.key
                  ? c('left-content-header', ce('tab-item'), cm('active'))
                  : '',
              ]"
              @click="changeFilter(item)"
            >
              {{ item.label }}
            </span>
          </div>
        </div>
      </div>
      <el-scrollbar :style="`height: calc(100% - ${leftHeadeHeight}px)`">
        <div :class="c('left-content-list')">
          <div
            v-for="(item, index) in notifyList"
            :key="index"
            @click="handleClickNotify(item)"
            :class="[
              c('left-content-list', ce('item')),
              currentNotify.id === item.id
                ? c('left-content-list', ce('item'), cm('active'))
                : '',
            ]"
          >
            <div :class="c('left-content-list', ce('item-head'))">
              <div :class="c('left-content-list', ce('item-head-name'))">
                {{ item.createName || "-" }}
              </div>
              <div :class="c('left-content-list', ce('item-head-time'))">
                {{ dayjs(item.createWhen).format("M/D/YYYY HH:mm:ss") || "-" }}
              </div>
            </div>
            <div :class="c('left-content-list', ce('item-content'))">
              <div :class="c('left-content-list', ce('item-content-title'))">
                {{ item?.systemNotificationView?.title || "-" }}
              </div>
              <div
                :class="c('left-content-list', ce('item-content-new'))"
                v-if="!item.state"
              >
                {{ tagName }}
              </div>
            </div>
          </div>
          <div
            v-if="!notifyList.length"
            :class="c('left-content-list', ce('empty'))"
          >
            {{ emptyName }}
          </div>
        </div>
      </el-scrollbar>
    </div>
    <div :class="c('right-content')">
      <div v-if="currentNotify.id" style="height: 100%">
        <div :class="c('right-content-header')"  ref="rightHeaderRef">
          <div :class="c('right-content-header', ce('info'))">
            <span :class="c('right-content-header', ce('info-creator-logo'))">
              {{ getFname(currentNotify.createName) || "-" }}
            </span>
            <div :class="c('right-content-header', ce('info-creator-detail'))">
              <span
                :class="
                  c('right-content-header', ce('info-creator-detail-name'))
                "
              >
                {{ currentNotify.createName || "-" }}
              </span>
              <span
                :class="
                  c('right-content-header', ce('info-creator-detail-email'))
                "
              >
                {{ currentNotify.createBy || "-" }}
              </span>
            </div>
          </div>
          <div :class="c('right-content-header', ce('time'))">
            {{
              currentNotify.createWhen
                ? dayjs(currentNotify.createWhen).format("M/D/YYYY HH:mm:ss")
                : "-"
            }}
          </div>
        </div>
        <el-scrollbar :style="`height: calc(100% - ${rightHeadeHeight + 20 }px)`">
          <div :class="c('right-content-detail')">
            <template
              v-if="
                slots.detail &&
                !['RELEASE_NOTE'].includes(
                  currentNotify.systemNotificationView.notificationType
                )
              "
            >
              <slot name="detail" :currentNotify="currentNotify"></slot>
            </template>
            <template v-else>
              <notifyTemplate
                :type="currentNotify?.systemNotificationView?.notificationType"
                :data="currentNotify"
                :i18n="i18n"
              />
            </template>
          </div>
        </el-scrollbar>
      </div>
      <div :class="c('right-content', ce('empty'))" v-else>{{ emptyName }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useVModel } from "@vueuse/core";
import { ref, useSlots, computed } from "vue";
import dayjs from "dayjs";
import { useClassname } from "../utils/use-classname";

import downIcon from "./assets/down.svg";
import notifyTemplate from "./notifyTemplate.vue";

const slots = useSlots();

// console.log(slots); // 打印 $slots 内容到控制台

const props = defineProps({
  title: {
    type: String,
    default: "Inbox",
  },
  tagName: {
    type: String,
    default: "NEW",
  },
  emptyName: {
    type: String,
    default: "No Data",
  },
  currentFilter: {
    type: Object,
    default: () => ({}),
  },
  currentNotify: {
    type: Object,
    default: () => ({}),
  },
  filterList: {
    type: Array,
    default: () => [],
  },
  notifyList: {
    type: Array,
    default: () => [],
  },
  i18n: {
    type: Object,
    default: () => ({}),
  },
});

const emits = defineEmits([
  "changeFilter",
  "clickNotify",
  "update:currentNotify",
  "update:currentFilter",
]);

const currentFilter = useVModel(props, "currentFilter", emits);
const currentNotify = useVModel(props, "currentNotify", emits);

const { cx, c, ce, cm } = useClassname("notify-box");
const cls = cx(() => {
  return {
    [c()]: true,
  };
});

const leftHeaderRef = ref();
const rightHeaderRef = ref();

const leftHeadeHeight = computed(() => {
  return leftHeaderRef.value?.offsetHeight || 0;
});

const rightHeadeHeight = computed(() => {
  return rightHeaderRef.value?.offsetHeight || 0;
});

const changeFilter = (item: any) => {
  currentFilter.value = item;
  emits("changeFilter", item);
};

const handleClickNotify = (item: any) => {
  currentNotify.value = item;
  emits("clickNotify", item);
};

const getFname = (name: any) => {
  if (!name) return;
  const userView = {
    firstName: name.split(" ")[0] || "",
    lastName: name.split(" ")[1] || "",
  };

  let fname = "";
  if (userView.firstName) {
    fname += userView.firstName.charAt(0).toUpperCase();
  }
  if (userView.lastName) {
    fname += userView.lastName.charAt(0).toUpperCase();
  }
  return fname;
};
</script>
