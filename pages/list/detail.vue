<template>
	<view class="detail">
		<view class="title">{{listDetail.delegateUnit}}</view>
		<view class="contain">{{listDetail.msgContent}}</view>
		<view class="time">{{listDetail.createTime}}</view>
	</view>
</template>

<script>
export default {
	components: {},
	data() {
		return {
			listDetail: ''
		};
	},
	onLoad(option) {
		this.listDetail = JSON.parse(option.item);
	}
};
</script>

<style lang="less" scoped>
.detail {
	padding: 20px;

	.title {
		font-size: 20px;
		font-weight: 600;
	}
	.contain {
		font-size: 18px;
		padding: 15px 0;
	}
	.time {
		display: flex;
		flex-direction: row-reverse;
		padding-right: 25px;
	}
}
</style>
