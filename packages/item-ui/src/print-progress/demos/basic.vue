<docs>
---
title: 基本使用
---

这是一个`print-progress`基本的使用例子
</docs>

<template>
  <div>
    <div>{{ progress }}</div>
    <div>
      <el-button
        type="primary"
        @click="open"
        :disabled="progress?.isProgressVisible === true"
      >
        打开print progress进度框
      </el-button>
      <el-button style="margin-left: 10px" type="warning" @click="reset">
        reset
      </el-button>
      <el-button style="margin-left: 10px" type="success" @click="start">
        start
      </el-button>
      <el-button style="margin-left: 10px" type="danger" @click="stop">
        stop
      </el-button>
      <i-print-progress
        :fetchPrintStatus="fetchPrintStatus"
        :abortAllBtnloading="abortAllBtnloading"
        :abortPartBtnloading="abortPartBtnloading"
        @printSuccess="printSuccess"
        @abortAll="abortAll"
        @abortPart="abortPart"
        ref="printRef"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";

const printRef: any = ref(null);

const progress: any = ref(null);

const abortAllBtnloading = ref(false);
const abortPartBtnloading = ref(false);

let currentDoneOrderNumber = 0;
let orderNumber = 20;

// 打开打印进度条
function open() {
  progress.value = printRef.value.open();
  console.log(progress.value);
}

// 重置打印进度条
function reset() {
  currentDoneOrderNumber = 0;
  printRef.value.reset();
}

// 停止打印
function stop() {
  printRef.value.stop();
}

// 继续打印
function start() {
  printRef.value.start();
}

// 打印进度条打印完成回调
function printSuccess() {
  currentDoneOrderNumber = 0;
}

// 点击停止生成lable回调
function abortAll(batchId: string) {
  // 调用接口
  console.log("batchId", batchId);
  // 模拟请求
  abortAllBtnloading.value = true;
  setTimeout(() => {
    abortAllBtnloading.value = false;
  }, 3000);
}

// 点击停止部分生成label回调
function abortPart({
  batchId,
  selection,
}: {
  batchId: string;
  selection: Array<any>;
}) {
  // 调用接口
  console.log("batchId", batchId, "selection", selection);
  // 模拟请求
  abortPartBtnloading.value = true;
  setTimeout(() => {
    abortPartBtnloading.value = false;
  }, 3000);
}

function fetchPrintStatus() {
  return new Promise((resolve, reject) => {
    // 模拟每次获取状态列表更新的数据
    currentDoneOrderNumber++;
    resolve({
      batchId: "816880bb-48e9-443f-a767-b0e47c0ab875",
      printStatus: "PRINTING",
      orderDetails: [
        {
          id: null,
          orderNo: "SO100081925",
          accountId: null,
          merchantId: "1810590020273848322",
          cartId: null,
          dataChannel: "",
          status: "PRINTED",
          orderDate: "1720546192000",
          requiredShippingDate: null,
          source: "Created",
          sourceId: null,
          originalReferenceId: null,
          originalPurchaseOrderNumber: null,
          originalCustomerOrderNumber: null,
          originalShippingService: null,
          warehouseStatus: null,
          warehouseId: null,
          orderType: null,
          shipMethod: "",
          carrier: {
            name: "ENDI",
            scac: "ENDI",
          },
          deliveryService: "",
          shippingService: "ECON",
          shipToAddress: {
            id: null,
            firstName: null,
            lastName: null,
            name: null,
            company: null,
            address1: "Calaveras",
            address2: "",
            address3: "",
            email: "",
            phone: "1111111111",
            city: "Altaville",
            state: "CA",
            zipCode: "95221",
            country: "US",
            addressType: null,
          },
          billToAddress: {
            id: null,
            firstName: null,
            lastName: null,
            name: null,
            company: null,
            address1: "Alachua",
            address2: "",
            address3: "",
            email: "test@test.com",
            phone: "1111111111",
            city: "Gainesville",
            state: "CA",
            zipCode: "91744",
            country: "US",
            addressType: null,
          },
          shipFromAddress: {
            id: null,
            firstName: "Cubework",
            lastName: "CA test0402",
            company: "US",
            address1: "Los Angeles",
            address2: null,
            email: "",
            phone: "(800) 858-9889",
            city: "La Puente",
            state: "CA",
            zipCode: "91744",
            country: "US",
            isDefault: null,
            isSaveToAccount: null,
            appendString: null,
            defaultAccountId: null,
            departmentId: null,
            department: null,
          },
          itemLines: [
            {
              itemId: null,
              itemSequence: null,
              itemName: null,
              itemSku: "banana",
              itemDescription: "banana",
              poLineNo: "",
              uom: "",
              qty: 1,
              price: 0,
              discountAmount: 0,
              totalAmount: 0,
              length: 3,
              width: 3,
              height: 3,
              linearUom: "cm",
              weight: 3,
              weightUom: "lb",
            },
          ],
          totalAmount: 0,
          subtotalAmount: 0,
          discountAmount: 0,
          salesTaxAmount: null,
          shippingAmount: null,
          buyerFirstName: "",
          buyerLastName: "",
          note: null,
          createUser: null,
          createDate: null,
          updateUser: null,
          updateDate: null,
          orderLoadDate: null,
          orderSendToWarehouseDate: null,
          dataChannelText: null,
          cartName: null,
          linkerOrderStatus: null,
          rate: {
            success: null,
            message: null,
            carrier: "ENDI",
            serviceType: "GRNDADV",
            shipperAccount: "2552760",
            insurancePrice: 0,
            premium: null,
            accountId: null,
            billingCost: 7.32,
            totalPrice: null,
            markup: 0.2,
            providerPrice: 6.1,
            serviceDescription: "Ground Advantage",
            deliveryService: null,
            unisDeliveryService: "GRNDADV",
          },
          warehouseType: null,
          warehouse: null,
          warehouseName: null,
          merchantName: null,
          postdate: null,
          orderShipDate: null,
          trackingOrProNumber: null,
          shipments: null,
          shipmentPostDate: null,
          errorMessage: null,
          orderPrintStatus: "PRINTED",
          message:
            "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
        },
        {
          id: null,
          orderNo: "SO100081924",
          accountId: null,
          merchantId: "1810590020273848322",
          cartId: null,
          dataChannel: "",
          status: "New",
          orderDate: "1720546191000",
          requiredShippingDate: null,
          source: "Created",
          sourceId: null,
          originalReferenceId: null,
          originalPurchaseOrderNumber: null,
          originalCustomerOrderNumber: null,
          originalShippingService: null,
          warehouseStatus: null,
          warehouseId: null,
          orderType: null,
          shipMethod: "",
          carrier: {
            name: "ENDI",
            scac: "ENDI",
          },
          deliveryService: "",
          shippingService: "ECON",
          shipToAddress: {
            id: null,
            firstName: null,
            lastName: null,
            name: null,
            company: null,
            address1: "Calaveras",
            address2: "",
            address3: "",
            email: "",
            phone: "1111111111",
            city: "Altaville",
            state: "CA",
            zipCode: "95221",
            country: "US",
            addressType: null,
          },
          billToAddress: {
            id: null,
            firstName: null,
            lastName: null,
            name: null,
            company: null,
            address1: "Alachua",
            address2: "",
            address3: "",
            email: "test@test.com",
            phone: "1111111111",
            city: "Gainesville",
            state: "CA",
            zipCode: "91744",
            country: "US",
            addressType: null,
          },
          shipFromAddress: {
            id: null,
            firstName: "Cubework",
            lastName: "CA test0402",
            company: "US",
            address1: "Los Angeles",
            address2: null,
            email: "",
            phone: "(800) 858-9889",
            city: "La Puente",
            state: "CA",
            zipCode: "91744",
            country: "US",
            isDefault: null,
            isSaveToAccount: null,
            appendString: null,
            defaultAccountId: null,
            departmentId: null,
            department: null,
          },
          itemLines: [
            {
              itemId: null,
              itemSequence: null,
              itemName: null,
              itemSku: "banana",
              itemDescription: "banana",
              poLineNo: "",
              uom: "",
              qty: 1,
              price: 0,
              discountAmount: 0,
              totalAmount: 0,
              length: 3,
              width: 3,
              height: 3,
              linearUom: "cm",
              weight: 3,
              weightUom: "lb",
            },
          ],
          totalAmount: 0,
          subtotalAmount: 0,
          discountAmount: 0,
          salesTaxAmount: null,
          shippingAmount: null,
          buyerFirstName: "",
          buyerLastName: "",
          note: null,
          createUser: null,
          createDate: null,
          updateUser: null,
          updateDate: null,
          orderLoadDate: null,
          orderSendToWarehouseDate: null,
          dataChannelText: null,
          cartName: null,
          linkerOrderStatus: null,
          rate: {
            success: null,
            message: null,
            carrier: "ENDI",
            serviceType: "GRNDADV",
            shipperAccount: "2552760",
            insurancePrice: 0,
            premium: null,
            accountId: null,
            billingCost: 7.32,
            totalPrice: null,
            markup: 0.2,
            providerPrice: 6.1,
            serviceDescription: "Ground Advantage",
            deliveryService: null,
            unisDeliveryService: "GRNDADV",
          },
          warehouseType: null,
          warehouse: null,
          warehouseName: null,
          merchantName: null,
          postdate: null,
          orderShipDate: null,
          trackingOrProNumber: null,
          shipments: null,
          shipmentPostDate: null,
          errorMessage: null,
          orderPrintStatus: "PRINTED",
          message:
            "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
        },
      ],
      orderNumber: orderNumber,
      currentDoneOrderNumber: currentDoneOrderNumber,
      costTime: 6,
      leftTime: 2,
    });
  });
}

onMounted(() => {
  open();
});
</script>
