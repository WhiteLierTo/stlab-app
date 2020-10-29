<template>
	<view>
		<view class="uni-padding-wrap uni-common-mt">
			<uni-segmented-control :current="current" :values="items" :style-type="styleType" :active-color="activeColor" @clickItem="onClickItem" />
		</view>
		<view class="content">
			<view v-if="current === 0"><Entrust @changeCurrent="changeCurrent" /></view>
			<view v-if="current === 1">
				<view class="content-text"><Info @changeCurrent="changeCurrent" /></view>
			</view>
			<view v-if="current === 2">
				<view class="content-text"><Attachment @changeCurrent="changeCurrent" /></view>
			</view>
		</view>
	</view>
</template>

<script>
import Info from './info.vue';
import Attachment from './attachment.vue';
import Entrust from './entrust.vue';

export default {
	components: {
		Info,
		Attachment,
		Entrust
	},
	data() {
		return {
			items: ['1.委托信息', '2.检材信息', '3.委托附件'],
			current: 0,
			activeColor: '#007aff',
			styleType: 'text'
		};
	},
	methods: {
		onClickItem(e) {
			if (this.current !== e.currentIndex) {
				// this.current = e.currentIndex;
				uni.showToast({
					title: '请完成当前步骤！',
					icon: 'none'
				});
			}
		},
		// 根据子组件传值修改父组件
		changeCurrent(value) {
			this.current = value;
		}
	}
};
</script>

<style lang="less">
.uni-common-mt {
	border-bottom: 1px solid #eee;
}
</style>
