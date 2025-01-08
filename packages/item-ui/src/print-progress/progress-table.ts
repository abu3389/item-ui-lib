/* eslint-disable */
// @ts-nocheck
import { reactive, ref, nextTick } from "vue";

export default function useTable(tableRef, props) {
  const columns = reactive([
    {
      dataIndex: "dataChannel",
      title: props.i18n["i18n-dataChannel"] || "CHANNEL",
      width: 150,
    },
    {
      dataIndex: "channelName",
      title: props.i18n["i18n-channelName"] || "CHANNEL NAME",
      width: 170,
    },
    {
      dataIndex: "orderNo",
      title: props.i18n["i18n-orderNo"] || "ORDER NO",
      width: 150,
    },
    {
      dataIndex: "channelSalesOrderNumber",
      title: props.i18n["i18n-channelSalesOrderNumber"] || "CHANNEL SALES ORDER NO",
      width: 250,
    },
    {
      dataIndex: "orderPrintStatus",
      width: 173,
      title: props.i18n["i18n-orderPrintStatus"] || "STATUS",
    },
    {
      dataIndex: "message",
      width: 250,
      title: props.i18n["i18n-message"] || "MESSAGE",
    },
    {
      dataIndex: "shipToAddress.name",
      title: props.i18n["i18n-shipToAddressName"] || "RECIPIENT",
      width: 180,
    },
    {
      dataIndex: "shipToAddress.country",
      title: props.i18n["i18n-shipToAddressCountry"] || "COUNTRY",
      width: 180,
    },
    {
      dataIndex: "purchaseOrderNo",
      title: props.i18n["i18n-purchaseOrderNo"] || "PO NO",
      width: 173,
    },
    {
      dataIndex: "referenceNo",
      title: props.i18n["i18n-referenceNo"] || "REFERENCE",
      width: 173,
    },
    {
      dataIndex: "carrier.name",
      title: props.i18n["i18n-carrierName"] || "CARRIER",
      width: 180,
    },
    {
      dataIndex: "orderDate",
      title: props.i18n["i18n-orderDate"] || "ORDER DATE",
      width: 170,
    },
    {
      dataIndex: "totalAmount",
      title: props.i18n["i18n-totalAmount"] || "TOTAL",
      width: 170,
    },
    {
      dataIndex: "shipDate",
      title: props.i18n["i18n-shipDate"] || "SHIPDATE",
      width: 180,
    },
    {
      dataIndex: "itemSku",
      title: props.i18n["i18n-itemSku"] || "PRODUCT",
      width: 180,
    },
  ]);

  const selection = ref<any[]>([]);

  function selectionChange(val: any[]) {
    selection.value = val;
  }

  return {
    columns,
    selectionChange,
    selection,
  };
}
