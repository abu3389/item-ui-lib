<script setup lang="ts">
import icon from "../icon/index.vue";
import {inject} from "vue"
import Plus from "./assets/plus.svg";
import Minus from "./assets/minus.svg";
import Collect from "./assets/collect.svg";
import Collected from "./assets/collected.svg";
import { useClassname } from '../utils/use-classname'

const props = defineProps({
  item: {
    type: Object,
    default: () => ({}),
  },
  menuOption: {
    type: Object,
    default: () => ({
      code: 'index',
      title: 'title',
      icon: 'icon',
      children: 'children',
      active:'active'
    })
  },
  collapse: {
    type: Boolean,
    default: false
  }, 
});

const { cx, c } = useClassname('sidebar')
const cls = cx(() => {
  return {
    [c()]: true,
  }
})


const context = inject('subMenu')
function onCollect(item){
  context.collect(item)
}
</script>

<template>
  <el-menu-item v-if="!item.children" :index="item.index" v-bind="$attrs" :id="item.meta.id">
    <el-icon size="24">
      <component v-if="item.meta.icon" :is="item.meta.icon"></component>
      <icon
        v-else="item?.meta?.class"
        :name="item.meta.class"
      ></icon>
    </el-icon>
    <span class="text-content">{{ item.meta.title }}</span>
    <template v-if="item.meta.collect">
      <collect class="collect" v-if="!item.meta.active && !collapse"  @click.stop="onCollect(item)"></collect>
      <collected  class="collect" v-else @click.stop="onCollect(item)"></collected>
    </template>
  </el-menu-item>
  <el-sub-menu v-else teleported :class="[item.meta.scrollY && 'scrollY']" :expand-close-icon="Plus" :expand-open-icon="Minus" :popper-class="[cls,'sidebar-sub-menu',item.meta.scrollY && 'scrollY']"
    :index="item.index" v-bind="$attrs" :id="item.meta.id">
    <template #title>
      <el-icon size="24">
        <component v-if="item.meta.icon" :is="item.meta.icon"></component>
        <icon
          v-else="item?.meta?.class"
          :name="item.meta.class"
        ></icon>
      </el-icon>
      <div class="text-content">{{ item.meta.title }}</div>
    </template>
    <sub-menu-item v-for="child in item.children"  :menuOption="menuOption"
      :item="child" />
  </el-sub-menu>
</template>
