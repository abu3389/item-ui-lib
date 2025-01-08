<template>
	<el-sub-menu v-if="hasChildren" :index="route.path">
		<template #title>
			<el-icon size="24" v-if="route?.meta?.icon">
				<component :is="route?.meta?.icon"></component>
			</el-icon>
			<span>{{ route.meta.title }}</span>
		</template>
		<menu-item v-for="(child, index) in route.children" :key="index" :isChild="true" :route="child" />
	</el-sub-menu>
	<el-menu-item v-else-if="!route.meta?.hidden" :index="route.path">
		<el-icon size="24" v-if="route?.meta?.icon">
			<component :is="route?.meta?.icon"></component>
		</el-icon>
		<div v-if="isChild" class="menu-item-child">
			<span class="title" @click.stop="handleClick(route,'default')">{{ route.meta.title }}</span>
			<span @click.stop="handleClick(route,'collect')" class="collect">
				<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
					<path d="M18.3333 8.11671L12.3416 7.60004L9.99996 2.08337L7.65829 7.60837L1.66663 8.11671L6.21663 12.0584L4.84996 17.9167L9.99996 14.8084L15.15 17.9167L13.7916 12.0584L18.3333 8.11671ZM9.99996 13.25L6.86663 15.1417L7.69996 11.575L4.93329 9.17504L8.58329 8.85837L9.99996 5.50004L11.425 8.86671L15.075 9.18337L12.3083 11.5834L13.1416 15.15L9.99996 13.25Z" fill="white"/>
				</svg>
			</span>	
		</div>
		<span v-else>{{ route.meta.title }}</span>
	</el-menu-item>
</template>

<script setup>
import { computed,inject } from 'vue';

const props = defineProps({
	route: {
		type: Object,
		required: true,
	},
	isChild: {
		type: Boolean,
		default: false,
	}
});

const hasChildren = computed(() => {
	return props.route?.children?.length > 0;
});

const context = inject('context');

function handleClick(route,type) {
	context.click(route,type)
}
</script>

<style lang="less" scoped>
// .menu-item-child{
// 	width: 100%;
// 	display: flex;
// 	justify-content: space-between;
// 	align-items: center;
// 	.title{
// 		min-width: 200px;
// 	}
// }
</style>