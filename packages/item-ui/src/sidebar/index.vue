<template>
  <div :class="[cls, c('container'),isCollapse && c(ce('collapse'))]">
    <div id="item-sidebar-header" :class="c('header')" :style="isMore ? { display: 'flex', justifyContent: 'flex-end' } : null">
      <div :class="c('header-logo')" v-if="!isMore">
        <slot v-if="!isCollapse" name="logo"></slot>
        <slot v-else name="logo2"></slot>
      </div>
      <div :class="c('header-action')" v-if="!isCollapse">
        <template v-if="!isMore">
          <div v-if="showIcons.more" @click="handleMore" :class="[c('header-action-icon'), c('header-action-icon', ce('more'))]">
            <moreIcon></moreIcon>
          </div>
          <div v-if="showIcons.collapse" @click="handleCollapse" :class="[c('header-action-icon'), c('header-action-icon', ce('collapse'))]">
            <collapseIcon></collapseIcon>
          </div>
        </template>
        <template v-else>
          <div @click="handleBack" :class="c('header-action-icon')">
            <backIcon></backIcon>
          </div>
        </template>
      </div>
      <template v-else>
        <div :style="{'margin-top':(!showIcons.more && !showIcons.collapse) ? '40px': '0px'}"></div>
        <div :class="c('header-action')" v-if="showIcons.more || showIcons.collapse">
          <div v-if="showIcons.more" @click="handleMore" :class="[c('header-action-icon'), c('header-action-icon', ce('more'))]">
            <moreIcon></moreIcon>
          </div>
          <div v-if="showIcons.collapse" @click="handleCollapse" :class="[c('header-action-icon'), c('header-action-icon', ce('collapse'))]">
            <collapseIcon></collapseIcon>
          </div>
        </div>
      </template>
    </div>
    <el-scrollbar :class="c('scrollbar')" :style="scrollbarStyle">
      <el-menu v-if="!isMore" :class="c('menu')" 	:collapse="isCollapse" v-bind="$attrs">
        <div :class="c('menu', ce('top'))">
          <SubMenuItem v-for="routes in topNav" :menuOption="dataOption" :collapse="isCollapse" :item="routes">
          </SubMenuItem>
        </div>
        <div :class="c('menu', ce('bottom'))">
          <SubMenuItem v-for="routes in bottomNav" :menuOption="dataOption" :collapse="isCollapse" :item="routes">
          </SubMenuItem>
        </div>
      </el-menu>
      <div v-else :class="c('application')" v-loading="loading">
        <template v-if="applications.length">
          <div :class="c('application', ce('card'))" v-for="(item, index) in applications">
            <div :class="c('application', ce('item'))" @click="handleAppClick(item)">
              <div :class="c('application', ce('item-logo'))">
                <img :src="item.logoFileId" class="logo" />

                <div class="description">
                  {{ item.description }}
                </div>
              </div>

              <div v-if="item.code === defaultApplicationActive">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M8.99984 0.379761C4.39984 0.379761 0.666504 4.11309 0.666504 8.71309C0.666504 13.3131 4.39984 17.0464 8.99984 17.0464C13.5998 17.0464 17.3332 13.3131 17.3332 8.71309C17.3332 4.11309 13.5998 0.379761 8.99984 0.379761ZM7.33317 12.8798L3.1665 8.71309L4.3415 7.53809L7.33317 10.5214L13.6582 4.19643L14.8332 5.37976L7.33317 12.8798Z"
                    fill="#34A145" />
                </svg>
              </div>
            </div>
            <el-divider :class="c('application',ce('divider'))" v-if="index !== application.length - 1" />
          </div>
        </template>
        <template v-else>
          <div class="empty">
            {{ emptyName }}
          </div>
        </template>
      </div>
    </el-scrollbar>
  </div>
</template>

<script lang="ts" setup>
import { useClassname } from '../utils/use-classname'
import { onMounted, ref,provide,computed,watch, onUnmounted } from "vue"
import moreIcon from "./assets/more.svg";
import collapseIcon from "./assets/collapse.svg";
import backIcon from "./assets/back.svg";
import SubMenuItem from "./SubMenuItem.vue"

const props = defineProps({
  data: {
    type: Array,
    default: () => [],
  },
  emptyName: {
    type: String,
    default: "No Data"
  },
  dataOption: {
    type: Object,
    default: () => ({
      code: 'index',
      title: 'meta.title',
      icon: 'meta.icon',
      children: 'children',
      active:'meta.active',
      position:'meta.position'
    })
  },
  defaultApplicationActive: {
    type: String,
    default: '1'
  },
  application: {
    type: Array,
    default: () => [],
  },
  applicationApi: {
    type: Function,
    default: () => null
  },
  applicationApiOption: {
    type: Object,
    default: () => ({
      'data': null
    })
  },
  dataCallback: {
    type: Function,
    default: () => { }
  },
  collect:{
    type: Function,
    default: () => { }
  },
  select:{
    type:Function,
    default:()=>{}
  },
  collapse: {
    type: Function,
    default: () => { }
  },
  showIcons:{
    type:Object,
    default:()=>({
      more:true,
      collapse:true,
      back:true
    })
  },
  isCollapsed:{
    type: Boolean,
    default: false
  },
  width: {
    type: String,
    default: '360px'
  }
})
const { cx, c, ce, cm } = useClassname('sidebar')
const cls = cx(() => {
  return {
    [c()]: true,
  }
})

provide('subMenu',{
  collect:props.collect,
})

const applications = ref(props.application)
const topNav = ref([])
const bottomNav = ref([])

// const emit = defineEmits(['update:collapse'])
// const isCollapse = useVModel(props, 'collapse', emit)

const emit = defineEmits(['collapse', 'more','app-click'])
const isCollapse = ref(props.isCollapsed)
const isMore = ref(false)

watch(()=>props.isCollapsed,(v)=>{
  isCollapse.value = v
  isMore.value = false
},{
  immediate:true,
})

const scrollbarStyle = computed(()=>{
  if (isCollapse.value) {
    if (!props.showIcons.more && !props.showIcons.collapse && !props.showIcons.back) {
      return {
        height: 'calc(100vh - 72px - 64px)',
      }
    }else{
      return {
        height: 'calc(100vh - 192px - 64px)',
      }
    }
  }
  return {
    height: 'calc(100vh - 72px - 64px)', 
  }
})

function handleCollapse() {
  isCollapse.value = !isCollapse.value
  isMore.value = false
  // initTopHeight()
  emit('collapse', isCollapse.value)
}
const loading =ref(false)
async function handleMore() {
  isMore.value = !isMore.value
  isCollapse.value = false
  loading.value = true
  setTimeout(() => {
    loading.value = false
  }, 1000)
  emit('more', isMore.value)
  if (props.application.length) {
    applications.value = props.application
    return
  }
  try {
    const result = await props.applicationApi()
    props.dataCallback(result)
    if (result) {
      const key = props.applicationApiOption.data
      if (key === null) {
        applications.value = result
      } else {
        applications.value = result[key]
      }
    } else {
      applications.value = []
    }
  } catch (error) {
    applications.value = []
  } finally {

  }
}
function handleBack() {
  isMore.value = false
  isCollapse.value = false
}
function handleAppClick(item:any){
  emit('app-click',item)
}
function initMenu(data){
  bottomNav.value=[]
  topNav.value=[]
  const newMenu = processNavigation(data, props.dataOption)
  newMenu.forEach(item => {
    if (getNestedValue(item,props.dataOption.position) === 'bottom') {
      bottomNav.value.push(item);
    } else {
      topNav.value.push(item);
    }
  });
}
const getNestedValue = (obj: any, path: string) => {
	return path.split('.').reduce((prev, curr) => {
		return prev ? prev[curr] : null;
	}, obj);
};
const processNavigation = (items: any[], options: any): any[] => {
	return items.map(item => {
		const processedItem: any = {
			path: item[options.code],
      ...item,
			meta: {
        title: getNestedValue(item, options.title),
				icon: getNestedValue(item, options.icon),
        position:getNestedValue(item,options.position),
        ...item.meta
			},
		};

		if (options.position && item[options.position]) {
			processedItem.position = item[options.position];
		}

		if (item[options.children] && Array.isArray(item[options.children])) {
			processedItem.children = processNavigation(item[options.children], options);
		}

		return processedItem;
	});
};

watch(()=>props.data,(v)=>{ 
  initMenu(v)
},{
  immediate:true,
  deep:true,
})
</script>

<style lang="scss" scoped></style>
