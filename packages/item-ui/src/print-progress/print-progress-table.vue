<template>
  <el-dialog
    :class="cls"
    v-model="isProgressTableVisible"
    :title="props.title"
    width="50%"
    :before-close="beforeClose"
  >
    <div :class="c(ce('row'))">
      <span :class="c(ce('row-description'))">
        {{ props.description }}
        {{ `(${progress.currentDoneOrderNumber}/${progress.orderNumber})` }}
      </span>
      <div>
        <el-button
          size="small"
          :class="c(ce('row-orange'))"
          @click="abortAll"
          :loading="props.abortAllBtnloading"
        >
          {{ props.abortAllBtnText }}
        </el-button>
        <el-button
          size="small"
          :class="c(ce('row-orange'))"
          @click="abortPart"
          :loading="props.abortPartBtnloading"
        >
          {{ props.AbortBtnText }}
        </el-button>
      </div>
    </div>
    <el-table
      ref="tableRef"
      @selection-change="selectionChange"
      :data="printProgressInfo.orderDetails"
      style="width: 100%"
      row-key="orderNo"
      max-height="450"
      :empty-text="props.tableEmptyText"
    >
      <el-table-column type="selection" width="55" reserve-selection />
      <template v-for="column in columns" :key="column.dataIndex">
        <el-table-column
          :prop="column.dataIndex"
          :width="column.width"
          :label="column.title"
          show-overflow-tooltip
          sortable
          :sort-method="(a, b) => customSort(a, b, column.dataIndex)"
        >
          <template
            #default="{ row }"
            v-if="column.dataIndex === 'orderPrintStatus'"
          >
            <span v-if="row.orderPrintStatus === 'PRINTED'">
              <successIcon />
            </span>
            <span v-else>{{ row.orderPrintStatus }}</span>
          </template>
        </el-table-column>
      </template>
    </el-table>
  </el-dialog>
</template>

<script lang="ts" setup>
/* eslint-disable */
// @ts-nocheck
import { inject, ref } from "vue";
import _ from "lodash";
import { useExpaned, useProgressData, useProgress } from "./compoables";
import { useClassname } from "../utils/use-classname";
import useTable from "./progress-table.ts";

import successIcon from "./assets/success.svg";

const props = inject("props");
const emits = inject("emits");

const { cx, c, ce, cm } = useClassname("print-progress-table");
const cls = cx(() => {
  return {
    [c()]: true,
  };
});

const { isExpand, expand } = useExpaned();

const tableRef = ref({});
const { columns, selection, selectionChange } = useTable(tableRef, props);

const { progress, printProgressInfo, isProgressTableVisible, action } =
  useProgressData(props, emits);

// 使用 useProgress 钩子管理进度相关逻辑
const { abortAll, abortPart } = useProgress({ emits, props, selection });

function beforeClose(done) {
  expand();
  done();
}

function customSort(a, b, key) {
  let valA = _.get(a, key) || "";
  let valB = _.get(b, key) || "";

  if (valA < valB) return -1;
  if (valA > valB) return 1;
  return 0;
}
</script>
