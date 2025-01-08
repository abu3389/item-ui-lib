<template>
  <div :class="cls">
    <el-popover
      :popper-class="cls"
      placement="bottom-end"
      :show-arrow="false"
      :width="508"
      trigger="hover"
      :offset="16"
      v-bind="$attrs"
    >
      <template #reference>
        <span :class="[c('bell'), c('bell', cm('hover'))]">
          <span
            :style="{
              display: 'flex',
              justifyContent: 'center',
              marginBottom: bellLineSpace,
            }"
          >
            <span
              v-show="notifyList.length"
              :class="c('bell', ce('badge'))"
            ></span>
            <notifyIcon :class="c('bell', ce('icon'))" />
          </span>
        </span>
      </template>
      <!-- 切换 -->
      <div :class="c('tab')">
        <span
          v-for="(item, index) in tabList"
          :key="index"
          @click="changeTab(item)"
          :class="[
            c('tab', ce('item')),
            currentTab.key == item.key
              ? c('tab', ce('item'), cm('active'))
              : '',
          ]"
        >
          <span :class="c('tab', ce('item-label'))">{{ item.label }}</span>
          <span
            :class="c('tab', ce('item-badge'))"
            v-if="notifyListGroup[item.key].length"
          >
            <span>{{
              notifyListGroup[item.key].length > 99
                ? "99+"
                : notifyListGroup[item.key].length
            }}</span>
          </span>
        </span>
      </div>
      <!-- 通知内容 -->
      <el-scrollbar>
        <div
          :class="c('content')"
          :style="{
            maxHeight: notifyListMaxHeight,
          }"
        >
          <div
            v-for="(item, index) in currentNotifyList"
            :key="index"
            :class="c('content', ce('item'))"
            @click="handleClickNotify(item)"
          >
            <span :class="c('content', ce('item-badge'))"></span>
            <div :class="c('content', ce('item-content'))">
              <span :class="c('content', ce('item-creator-logo'))">
                {{ getFname(item.createName) || "-" }}
              </span>
              <div :class="c('content', ce('item-detail'))">
                <div :class="c('content', ce('item-detail-div'))">
                  <span :class="c('content', ce('item-detail-title'))">
                    {{ item?.systemNotificationView?.title || "-" }}
                  </span>
                  <span :class="c('content', ce('item-detail-time'))">
                    {{ formatCustomDate(item.createWhen) || "-" }}
                  </span>
                </div>
                <div :class="c('content', ce('item-detail-info'))">
                  <template
                    v-if="
                      slots.detail &&
                      !['RELEASE_NOTE'].includes(
                        item.systemNotificationView.notificationType
                      )
                    "
                  >
                    <slot name="detail" :currentNotify="item"></slot>
                  </template>
                  <template v-else>
                    <notifyTemplate
                      :type="item?.systemNotificationView?.notificationType"
                      :data="item"
                      :i18n="i18n"
                    />
                  </template>
                </div>
              </div>
            </div>
          </div>
          <div
            v-if="!currentNotifyList.length"
            :class="c('content', ce('empty'))"
          >
            {{ emptyName }}
          </div>
        </div>
      </el-scrollbar>
      <!-- 操作按钮 -->
      <div :class="c('footer')">
        <div
          :class="c('footer', ce('item'))"
          v-for="(item, index) in footerBtnList"
          :key="index"
        >
          <span @click="item.onClick" :class="c('footer', ce('item-name'))">
            {{ item.name }}
          </span>
        </div>
      </div>
    </el-popover>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, useSlots } from "vue";
import dayjs from "dayjs";
import { useClassname } from "../utils/use-classname";
import notifyIcon from "./assets/notify.svg";

import notifyTemplate from "./notifyTemplate.vue";

const slots = useSlots();

const props = defineProps({
  showHoverBellLine: {
    type: Boolean,
    default: true,
  },
  bellLineSpace: {
    type: String,
    default: "10px",
  },
  notifyListMaxHeight: {
    type: String,
    default: "300px",
  },
  tabList: {
    type: Array,
    default: () => [],
  },
  notifyList: {
    type: Array,
    default: () => [],
  },
  footerBtnList: {
    type: Array,
    default: () => [],
  },
  emptyName: {
    type: String,
    default: "No Data",
  },
  i18n: {
    type: Object,
    default: () => ({}),
  },
});

const emits = defineEmits(["clickNotify", "changeTab"]);

const { cx, c, ce, cm } = useClassname("notify");
const cls = cx(() => {
  return {
    [c()]: true,
  };
});

let currentTab = ref(props.tabList[0] || {});
let notifyListGroup: any = ref({});
let currentNotifyList: any = ref([]);

// 消息分类
const groupNotifyList = () => {
  const obj: any = {};
  props.tabList.forEach((item: any) => {
    obj[item.key] = obj[item.key] || [];
    props.notifyList.forEach((subItem: any) => {
      const hasInTab =
        props.tabList.find(
          (tab) => tab.key === subItem?.systemNotificationView?.notificationType
        ) || false;

      // 符合tab类型的消息放到对应tab
      if (item.key === subItem?.systemNotificationView?.notificationType) {
        obj[item.key].push(subItem);
      } else if (item.key === "other" && !hasInTab) {
        obj["other"].push(subItem);
      }
    });
  });

  // console.log("obj", obj);

  notifyListGroup.value = obj;
};

const changeTab = (tabInfo: any) => {
  currentTab.value = tabInfo;
  // 根据选择的tab，过滤出对应的通知列表
  currentNotifyList.value = notifyListGroup.value[tabInfo.key];

  emits("changeTab", tabInfo);
};

// 监听notifyList传入触发一次过滤
watch(
  () => props.notifyList,
  () => {
    // 对数据进行分类整理
    groupNotifyList();
    // 手动触发选项卡切换数据
    changeTab(currentTab.value);
  },
  { immediate: true }
);

const handleClickNotify = (item: any) => {
  emits("clickNotify", item);
};

const formatCustomDate = (dateString: string) => {
  if (!dateString) return "";
  // 自定义月份映射
  const monthMap: any = {
    "01": "January",
    "02": "February",
    "03": "March",
    "04": "Apiri", // April 的自定义名称
    "05": "May",
    "06": "June",
    "07": "July",
    "08": "August",
    "09": "September",
    "10": "October",
    "11": "November",
    "12": "December",
  };
  const date = dayjs(dateString);

  const today = dayjs();
  const yesterday = today.subtract(1, "day");

  if (date.isSame(today, "day")) {
    return "Today";
  }

  if (date.isSame(yesterday, "day")) {
    return "Yesterday";
  }

  const day = date.format("D");
  const month = monthMap[date.format("MM")];
  const year = date.format("YYYY");

  return `${day} ${month} ${year}`;
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

defineExpose({
  changeTab,
  notifyListGroup,
  currentNotifyList,
});
</script>
