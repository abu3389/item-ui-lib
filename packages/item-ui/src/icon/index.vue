<template>
     <!-- 如果保持basis-1/12 的话，在收缩左侧侧边栏后会导致图标过小，鉴于只有侧边栏使用到icon，直接删除了basis-1/12 属性 -->
    <component :is="icon" class="w-[24px] h-[25px]" />
</template>

<script setup>
import { defineComponent } from 'vue'
import * as heroIcons from '@heroicons/vue/24/outline'

let props = defineProps({
    name: {
        type: String,
        required: true
    }
})
let name = ''

props.name && props.name.split('-').forEach(v => {
    name += v[0].toUpperCase() + v.substr(1)
})

const icon = heroIcons[name + 'Icon']
</script>