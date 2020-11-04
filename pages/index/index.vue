<template>
	<view class="warp">
		<image src="../../static/img/banner.png" class="banner"></image>
		<view class="example-body">
			<uni-grid :column="3" :highlight="true">
				<uni-grid-item v-for="(item, index) in list" :index="index" :key="index">
					<view class="grid-item-box" @click="tabToHandle(item.path)">
						<image class="image" :src="item.url" mode="aspectFill" />
						<text class="text">{{ item.text }}</text>
						<view v-if="item.badge" class="grid-dot"><uni-badge :text="item.badge" :type="item.type" v-if="show" /></view>
					</view>
				</uni-grid-item>
			</uni-grid>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			list: [
				{
					url: '../../static/img/online.png',
					text: '在线委托',
					path: '../online/index'
				},
				{
					url: '../../static/img/msg.png',
					text: '消息通知',
					badge: ' ',
					type: 'error',
					path: '../list/index'
				},
				{
					url: '../../static/img/msg.png',
					text: '我的待办'
				},
				{
					url: '../../static/img/online.png',
					text: '我的已办'
				},
				{
					url: '../../static/img/msg.png',
					text: '我的委托'
				},
				{
					url: '../../static/img/msg.png',
					text: '在线报告'
				},
				{
					url: '../../static/img/msg.png',
					text: '学习园地'
				},
				{
					url: '../../static/img/msg.png',
					text: '智能柜管理'
				}
			],
			show: false
		};
	},
	mounted() {
		this.delegateNoticeList();
	},
	methods: {
		tabToHandle(path) {
			uni.navigateTo({
				url: path
			});
		},
		delegateNoticeList() {
			this.$Request.post(this.$api.delegateNoticeList).then(res => {
				if (res.code == 0) {
					this.listData = res.data;
					this.show = this.listData.every(item => item.isRead == 0);
					console.log(this.show);
				}
			});
		}
	}
};
</script>

<style>
@charset "UTF-8";
.banner {
	width: 100%;
	/* height: 180px; */
}
.uni-badge--error {
	width: 15px !important;
	height: 15px;
}
.grid-dot {
	top: 17px !important;
	right: 30px !important;
}
/* 头条小程序组件内不能引入字体 */
/* #ifdef MP-TOUTIAO */
@font-face {
	font-family: uniicons;
	font-weight: normal;
	font-style: normal;
	src: url('~@/static/uni.ttf') format('truetype');
}

/* #endif */
/* #ifndef APP-NVUE */
page {
	display: flex;
	flex-direction: column;
	box-sizing: border-box;
	background-color: #efeff4;
	min-height: 100%;
	height: auto;
}

view {
	font-size: 14px;
	line-height: inherit;
}

.example {
	padding: 0 15px 15px;
}

.example-info {
	padding: 15px;
	color: #3b4144;
	background: #ffffff;
}

.example-body {
	/* #ifndef APP-NVUE */
	display: flex;
	/* #endif */
	flex-direction: row;
	flex-wrap: wrap;
	justify-content: center;
	padding: 0;
	font-size: 14px;
	background-color: #ffffff;
}

/* #endif */
.example {
	padding: 0 15px;
}

.example-info {
	/* #ifndef APP-NVUE */
	display: block;
	/* #endif */
	padding: 15px;
	color: #3b4144;
	background-color: #ffffff;
	font-size: 14px;
	line-height: 20px;
}

.example-info-text {
	font-size: 14px;
	line-height: 20px;
	color: #3b4144;
}

.example-body {
	flex-direction: column;
	padding: 15px;
	background-color: #ffffff;
}

.word-btn-white {
	font-size: 18px;
	color: #ffffff;
}

.word-btn {
	/* #ifndef APP-NVUE */
	display: flex;
	/* #endif */
	flex-direction: row;
	align-items: center;
	justify-content: center;
	border-radius: 6px;
	height: 48px;
	margin: 15px;
	background-color: #007aff;
}

.word-btn--hover {
	background-color: #4ca2ff;
}

.image {
	width: 40px;
	height: 40px;
}

.text {
	font-size: 26rpx;
	margin-top: 10rpx;
}

.example-body {
	/* #ifndef APP-NVUE */
	display: block;
	/* #endif */
}

.grid-dynamic-box {
	margin-bottom: 15px;
}

.grid-item-box {
	flex: 1;
	/* #ifndef APP-NVUE */
	display: flex;
	/* #endif */
	flex-direction: column;
	align-items: center;
	justify-content: center;
	padding: 15px 0;
}

.grid-dot {
	position: absolute;
	top: 5px;
	right: 15px;
}

.swiper {
	height: 420px;
}
</style>
