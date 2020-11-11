<template>
	<view class="warp">
		<image src="../../static/img/bg.png" class="banner"></image>
		<view class="info">
			<view class="opt">
				<ul>
					<li>
						<dl>
							<dt>2</dt>
							<dd>消息</dd>
						</dl>
					</li>
					<li>
						<dl>
							<dt>11</dt>
							<dd>我的待办</dd>
						</dl>
					</li>
					<li>
						<dl>
							<dt>2</dt>
							<dd>我的已办</dd>
						</dl>
					</li>

					<li>
						<dl>
							<dt>2</dt>
							<dd>归档</dd>
						</dl>
					</li>
				</ul>
			</view>
			<view style="width: 92%;margin: 38px auto 0;">
				<uni-notice-bar scrollable="true" single="true" text="[单行] 这是 NoticeBar 通告栏，这是 NoticeBar 通告栏，这是 NoticeBar 通告栏"></uni-notice-bar>
			</view>
			<view class="example">
				<view class="example-body">
					<view class="example-title">
						<view class="iconfont icon-shouyex" style="color:#63b9f2;padding-right: 4px;font-size: 16px;"></view>应用管理
					</view>
					<uni-grid :column="4" :show-border="false">
						<uni-grid-item v-for="(item, index) in list" :index="index" :key="index">
							<view class="grid-item-box" @click="tabToHandle(item.path)">
								<image class="image" :src="item.url" />
								<text class="text">{{ item.text }}</text>
								<view v-if="item.badge" class="grid-dot">
									<uni-badge :text="item.badge" :type="item.type" v-if="show" />
								</view>
							</view>
						</uni-grid-item>
					</uni-grid>
				</view>
			</view>

			<view class="example1">
				<view class="example-body">
					<view class="example-title">
						<view class="iconfont icon-shuxian" style="color:#63b9f2;padding-right: 4px;font-size: 16px;"></view>
						我的待办
					</view>
					<view class="list">
						<view class="uni-flex uni-row xian">
							<view class="text img">
								<view class="iconfont icon-xinxi" style="color:#63b9f2;padding-right: 4px;font-size: 30px;"></view>
							</view>
							<view class="text contain" style="-webkit-flex: 1;flex: 1;">
								<view class="uni-flex uni-row" style="-webkit-justify-content: space-between;justify-content: space-between;">
									<view class="text title">
										福州铁路运输检察院审结一起涉疫诈骗案
									</view>
									<view class="text time" style="color: #36C626;">已领取</view>
								</view>
								<view class="contain-info">2020-11-05</view>
							</view>
						</view>
					</view>
					<view class="list">
						<view class="uni-flex uni-row xian">
							<view class="text img">
								<!-- <image src="../../static/img/msg.png" /> -->
								<view class="iconfont icon-xinxi" style="color:#63b9f2;padding-right: 4px;font-size: 30px;"></view>
							</view>
							<view class="text contain" style="-webkit-flex: 1;flex: 1;">
								<view class="uni-flex uni-row" style="-webkit-justify-content: space-between;justify-content: space-between;">
									<view class="text title">
										盐城市经济技术开发区人民检察院依法对被告人周某某、许某某等人提起公诉
									</view>
									<view class="text time" style="color: #722ED1;">待预检</view>
								</view>
								<view class="contain-info">2020-11-05</view>
							</view>
						</view>
					</view>
					<view class="list">
						<view class="uni-flex uni-row xian">
							<view class="text img">
								<view class="iconfont icon-xinxi" style="color:#63b9f2;padding-right: 4px;font-size: 30px;"></view>
							</view>
							<view class="text contain" style="-webkit-flex: 1;flex: 1;">
								<view class="uni-flex uni-row" style="-webkit-justify-content: space-between;justify-content: space-between;">
									<view class="text title">
										张德宝、吴丰强涉嫌非法制造枪支案
									</view>
									<view class="text time" style="color: #FF6E00;">取证中</view>
								</view>
								<view class="contain-info">2020-11-05</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uniNoticeBar from '@/components/uni-notice-bar/uni-notice-bar.vue'

	export default {
		components: {
			uniNoticeBar
		},
		data() {
			return {
				list: [{
						url: '../../static/img/icon2.png',
						text: '通知公告',
						badge: ' ',
						type: 'error',
						path: '../list/index'
					}, {
						url: '../../static/img/icon1.png',
						text: '在线委托',
						path: '../online/index'
					},

					{
						url: '../../static/img/icon3.png',
						text: '我的待办'
					},
					{
						url: '../../static/img/icon4.png',
						text: '我的已办'
					},
					{
						url: '../../static/img/icon5.png',
						text: '案件检材'
					},
					{
						url: '../../static/img/icon6.png',
						text: '台账管理'
					},
					{
						url: '../../static/img/icon7.png',
						text: '学习园地'
					},
					{
						url: '../../static/img/icon8.png',
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

<style lang="less" scoped>
	.warp {
		.info {
			.opt {
				width: 92%;
				height: 85px;
				background-color: #fff;
				// border-radius: 5px;
				position: absolute;
				top: 200px;
				left: 4%;
				border-top-right-radius: 5px;
				border-top-left-radius: 5px;
				border-bottom: 1px solid #f2f2f2;
				// box-shadow: 1px 1px 1px #eeeeee;

				ul {
					list-style-type: none;
					display: flex;
					justify-content: space-around;
					margin-top: 10px;
					margin-left: -40px;

					li {
						line-height: 30px;
						text-align: center;

						dt {
							color: #f45842;
							font-size: 20px;
						}

						dd {
							font-size: 16px;
						}
					}
				}
			}

			.example {
				width: 92%;
				margin: 0px auto 0;
				border-radius: 10px;

				.example-body {
					border-radius: 5px;
					padding-bottom: 20px;

					.example-title {
						display: flex;
						height: 35px;
						line-height: 35px;
						font-weight: 600;
						border-bottom: 1px solid #F2F2F2;
						padding-left: 15px;
					}
				}
			}

			.example1 {
				width: 92%;
				margin: 10px auto 15px;
				border-radius: 10px;

				.example-body {
					border-radius: 5px;
					padding-bottom: 20px;

					.example-title {
						display: flex;
						height: 35px;
						line-height: 35px;
						font-weight: 600;
						border-bottom: 1px solid #F2F2F2;
						padding-left: 15px;
					}

					.list {
						padding-bottom: 10px;

						.xian {
							border-bottom: 1px solid #eee;
						}

						.img {
							display: flex;
							justify-content: center;
							align-items: center;
							padding: 0 10px;

							image {
								width: 50px;
								height: 50px;
							}
						}

						.contain {
							padding: 8px;

							.title {
								font-size: 16px;
								font-weight: 600;

								.dot {
									display: inline-block;
									width: 10px;
									height: 10px;
									background-color: #f00;
									border-radius: 50%;
									margin-left: 10px;
								}
							}

							.time {
								width: 120px;
								display: flex;
								flex-direction: row-reverse;
							}

							.contain-info {
								color: #BEBEBE;
								padding-top: 10px;
							}
						}

					}
				}
			}
		}
	}
</style>

<style>
	@charset "UTF-8";

	.uni-noticebar {
		background-color: #fff !important;
		border-radius: 3px;
		padding-top: 12px;
	}

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
		/* padding: 15px; */
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
		border-radius: 50%;
	}

	.text {
		font-size: 26rpx;
		margin-top: 10rpx;
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
		/* padding: 15px 0; */
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
