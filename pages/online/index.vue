<template>
	<view>
		<view class="uni-padding-wrap uni-common-mt">
			<uni-segmented-control :current="current" :values="items" :style-type="styleType" :active-color="activeColor" @clickItem="onClickItem" />
		</view>
		<view class="content">
			<view v-if="current === 0"><Entrust @changeCurrent="changeCurrent" /></view>
			<view v-if="current === 1">
				<view class="content-text">
					<Info @changeCurrent="changeCurrent" :delegateId="delegateId" :lawcaseId="lawcaseId" :createUid="createUid" :sampleType="sampleType" />
				</view>
			</view>
			<view v-if="current === 2">
				<view class="content-text"><Attachment @changeCurrent="changeCurrent" :delegateId="delegateId" :lawcaseId="lawcaseId" /></view>
			</view>
		</view>
		{{ delegateId }}{{ lawcaseId }}
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
			styleType: 'text',
			delegateId: '',
			lawcaseId: '',
			createUid: '',
			sampleType: {}
		};
	},
	methods: {
		onClickItem(e) {
			// this.current = e.currentIndex
			if (this.current !== e.currentIndex) {
				uni.showToast({
					title: '请完成当前步骤！',
					icon: 'none'
				});
			}
		},
		// 根据子组件传值修改父组件
		changeCurrent(e) {
			this.current = e.code;
			if (e.value) {
				const { delegateId, lawcaseId, createUid, sampleType } = e.value;
				this.delegateId = delegateId;
				this.lawcaseId = lawcaseId;
				this.createUid = createUid;
				this.sampleType = sampleType;
				this.$store.dispatch('updateEntrust', e.value);
			}
			console.log(e.value);
		}
	}
};
</script>

<style lang="less">
.uni-common-mt {
	border-bottom: 1px solid #eee;
}
</style>
