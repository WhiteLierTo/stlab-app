<template>
	<view class="detail">
		<view class="title">南京网安</view>
		<view class="contain">案件编号：JS1815849449,委托编号：公（网）委字【2020】第23号，案件名：202013诈骗案，提交委托成功，请尽快送检。</view>
		<view class="time">2020-10-26</view>
	</view>
</template>

<script>
export default {
	components: {},
	data() {
		return {};
	},
	onLoad(option) {
		console.log(option.id);
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
