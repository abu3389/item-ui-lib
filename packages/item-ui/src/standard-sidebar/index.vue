<template>
	<div class="unis-sidebar" :class="[isCollapse ? 'unis-sidebar__collapse' : null,cls]">
		<div class="unis-sidebar-head"
			:class="[isCollapse ? 'unis-sidebar-head__collapse' : null, isMore ? 'unis-sidebar-head__more' : null]">
			<div class="logo-top" v-if="!isMore">
				<slot v-if="!isCollapse" name="logo"></slot>
				<slot v-else name="mini-logo"></slot>
			</div>
			<div class="unis-sidebar-head-action" :class="[isCollapse ? 'unis-sidebar-head-action__collapse' : null]">
				<template v-if="!isMore">
					<div class="action-more">
						<div class="icon more" @click="handleMore">
							<moreIcon></moreIcon>
						</div>
						<div class="icon collapse" @click="handleCollapse">
							<collapseIcon></collapseIcon>
						</div>
					</div>
				</template>
				<template v-else>
					<div @click="handleBack" class="icon action-back" :class="[isMore ? 'unis-sidebar-action__more' : null]">
						<backIcon></backIcon>
					</div>
				</template>
			</div>
		</div>
		<el-scrollbar class="unis-sidebar-scrollbar" :class="[isCollapse ? 'unis-sidebar-scrollbar__collapse' : null, isMore ? 'unis-sidebar-scrollbar__more' : null]">
			<el-menu v-if="!isMore" :collapse="isCollapse" collapse-transition="false" router :default-active="active" unique-opened mode="vertical" v-bind="$attrs">
				<menu-item v-for="(route, index) in navigation" :key="index" :route="route" />
			</el-menu>

			<div v-else :class="c('application')">
        <template v-if="applications.length">
          <div :class="c('application', ce('card'))" v-for="(item, index) in applications">
            <div :class="c('application', ce('item'))">
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
<script setup lang="ts">
import { computed, ref, provide } from 'vue';
import { useVModel  } from "@vueuse/core";
import { useClassname } from '../utils/use-classname'
import moreIcon from "./assets/more.svg";
import collapseIcon from "./assets/collapse.svg";
import backIcon from "./assets/back.svg";
import MenuItem from './menu-item.vue';

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
			code: 'path',
			title: 'meta.title',
			icon: 'meta.icon',
			children: 'children'
		})
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
	defaultApplicationActive: {
		type: String,
		default: '1'
	},
	collapse: {
		type: Boolean,
		default: false
	},
	width: {
		type: String,
		default: '360px'
	},
	defaultActive:{
		type: String,
		default: ''
	},
})
const isMore = ref(false)
const isCollapse = ref(false);
const applications = ref(props.application)
const emit = defineEmits(['collapse', 'more','update:defaultActive']);
const { cx, c, ce, cm } = useClassname('sidebar')
const cls = cx(() => {
  return {
    [c()]: true,
  }
})

const active = useVModel(props,'defaultActive',emit)
async function handleMore() {
	isMore.value = !isMore.value
	isCollapse.value = false
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

const handleCollapse = () => {
	isCollapse.value = !isCollapse.value;
	emit('collapse', isCollapse.value);
};

function handleBack() {
	isMore.value = false
	isCollapse.value = false
}

function menuItemClick(route,type){
	console.log('index:',route)
	console.log('index:',type)
	console.log(active.value)
	active.value = route.path
	console.log(active.value)
}
provide('context',{
	click:menuItemClick
})

const getNestedValue = (obj: any, path: string) => {
	return path.split('.').reduce((prev, curr) => {
		return prev ? prev[curr] : null;
	}, obj);
};
const processNavigation = (items: any[], options: any): any[] => {
	return items.map(item => {
		const processedItem: any = {
			path: item[options.code],
			meta: {
				title: getNestedValue(item, options.title),
				icon: getNestedValue(item, options.icon),
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

const navigation = computed(() => {
	return processNavigation(props.data, props.dataOption);
})

</script>

<style lang="less" scoped>
// .unis-sidebar {
// 	transition-property: all;
// 	transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
// 	transition-duration: 150ms;
// 	display: flex;
// 	flex-direction: column;
// 	flex-shrink: 0;
// 	height: 100%;
// 	background-color: #fff;
// 	padding-top: 32px;
// 	padding-bottom: 32px;
// 	width: 360px;

// 	&-head {
// 		display: flex;
// 		align-items: center;
// 		justify-content: space-between;
// 		padding-left: 24px;
// 		padding-right: 24px;

// 		&__collapse {
// 			flex-direction: column;
// 		}

// 		&__more {
// 			display: flex;
// 			justify-content: end;
// 		}

// 		&-action {
// 			display: flex;

// 			.action-more {
// 				display: flex;
// 				gap: 8px;
// 			}

// 			.icon {
// 				width: 32px;
// 				height: 32px;
// 				display: flex;
// 				align-items: center;
// 				justify-content: center;
// 				background-color: #2B2F3B;
// 				cursor: pointer;
// 				border-radius: 8px;
// 				color: #fff;
// 			}

// 			&__collapse {
// 				flex-direction: column;
// 				padding-left: 16px;
// 				padding-right: 16px;
// 				margin-top: 40px;

// 				.action-more {
// 					display: flex;
// 					flex-direction: column;
// 				}
// 			}

// 			.action-back {}
// 		}
// 	}

// 	&-scrollbar {
// 		flex: 1 1 auto;
// 		margin-top: 28px;
// 		padding-left: 24px;
// 		padding-right: 24px;

// 		&__collapse {
// 			padding-left: 16px;
// 			padding-right: 16px;
// 		}
// 	}

// 	&__collapse {
// 		width: 80px;
// 	}
// }

// .dark {
// 	.unis-sidebar {
// 		background-color: #21232b;
// 	}
// }
</style>
