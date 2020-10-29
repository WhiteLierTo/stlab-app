<template>
	<view class="box">
		<view :class="{ 'box-list': show }">
			<checkbox-group @change="checkboxChange">
				<view class="list" v-for="(item, index) in listData" :key="index">
					<view class="uni-flex uni-row">
						<view class="text check" v-if="show"><checkbox :value="item.id" /></view>
						<view class="text img"><image :src="item.cover" /></view>
						<view class="text contain" style="-webkit-flex: 1;flex: 1;" @click="listHandle(item)">
							<view class="uni-flex uni-row" style="-webkit-justify-content: space-between;justify-content: space-between;">
								<view class="text title">
									{{ item.author_name }}
									<text class="dot"></text>
								</view>
								<view class="text time">{{ item.published_at }}</view>
							</view>
							<view class="contain-info">{{ item.title }}</view>
						</view>
					</view>
				</view>
			</checkbox-group>
		</view>
		<view class="bottom" v-if="show">
			<view class="cancel" @click="cancelHandle">取消</view>
			<view class="sure" @click="sureHandle">确定</view>
		</view>
		<uni-popup id="popupDialog" ref="popupDialog" type="dialog">
			<uni-popup-dialog type="error" title="通知" content="是否删除当前消息通知!" :before-close="true" @confirm="dialogConfirm" @close="dialogClose"></uni-popup-dialog>
		</uni-popup>
	</view>
</template>

<script>
import uniPopupDialog from '@/components/uni-popup/uni-popup-dialog.vue';

export default {
	components: { uniPopupDialog },
	data() {
		return {
			UNITS: {
				年: 31557600000,
				月: 2629800000,
				天: 86400000,
				小时: 3600000,
				分钟: 60000,
				秒: 1000
			},
			listData: [
				{
					id: '1',
					author_name: '响水网安',
					cover: '../../static/img/msg.png',
					title: '案件编号：JS1815849449,委托编号：公（网）委字【2020】第23号，案件名：202013诈骗案，提交委托成功，请尽快送检',
					published_at: '2020-10-26'
				},
				{
					id: '2',
					author_name: '大丰网安',
					cover: '../../static/img/msg.png',
					title: '案件编号：JS1815849449,委托编号：公（网）委字【2020】第23号，案件名：202013诈骗案，提交委托成功，请尽快送检',
					published_at: '2020-10-26'
				},
				{
					id: '3',
					author_name: '盐都网安',
					cover: '../../static/img/msg.png',
					title: '案件编号：JS1815849449,委托编号：公（网）委字【2020】第23号，案件名：202013诈骗案，提交委托成功，请尽快送检',
					published_at: '2020-10-26'
				},
				{
					id: '4',
					author_name: '东台网安',
					cover: '../../static/img/msg.png',
					title: '案件编号：JS1815849449,委托编号：公（网）委字【2020】第23号，案件名：202013诈骗案，提交委托成功，请尽快送检',
					published_at: '2020-10-26'
				},
				{
					id: '5',
					author_name: '东台网安',
					cover: '../../static/img/msg.png',
					title: '案件编号：JS1815849449,委托编号：公（网）委字【2020】第23号，案件名：202013诈骗案，提交委托成功，请尽快送检',
					published_at: '2020-10-26'
				},
				{
					id: '6',
					author_name: '东台网安',
					cover: '../../static/img/msg.png',
					title: '案件编号：JS1815849449,委托编号：公（网）委字【2020】第23号，案件名：202013诈骗案，提交委托成功，请尽快送检',
					published_at: '2020-10-26'
				},
				{
					id: '7',
					author_name: '东台网安',
					cover: '../../static/img/msg.png',
					title: '案件编号：JS1815849449,委托编号：公（网）委字【2020】第23号，案件名：202013诈骗案，提交委托成功，请尽快送检',
					published_at: '2020-10-26'
				},
				{
					id: '8',
					author_name: '东台网安',
					cover: '../../static/img/msg.png',
					title: '案件编号：JS1815849449,委托编号：公（网）委字【2020】第23号，案件名：202013诈骗案，提交委托成功，请尽快送检',
					published_at: '2020-10-26'
				},
				{
					id: '9',
					author_name: '东台网安',
					cover: '../../static/img/msg.png',
					title: '案件编号：JS1815849449,委托编号：公（网）委字【2020】第23号，案件名：202013诈骗案，提交委托成功，请尽快送检',
					published_at: '2020-10-26'
				},
				{
					id: '10',
					author_name: '东台网安2',
					cover: '../../static/img/msg.png',
					title: '案件编号：JS1815849449,委托编号：公（网）委字【2020】第23号，案件名：202013诈骗案，提交委托成功，请尽快送检',
					published_at: '2020-10-26'
				},
				{
					id: '11',
					author_name: '东台网安1',
					cover: '../../static/img/msg.png',
					title: '案件编号：JS1815849449,委托编号：公（网）委字【2020】第23号，案件名：202013诈骗案，提交委托成功，请尽快送检',
					published_at: '2020-10-26'
				}
			],
			avatarList: [],
			show: false
		};
	},
	onLoad() {},
	methods: {
		listHandle(item) {
			uni.navigateTo({
				url: './detail?id=' + item.id
			});
		},
		onNavigationBarButtonTap(e) {
			if (e.index == 0) {
				console.log('点击');
				this.show = !this.show;
			}
		},
		checkboxChange: function(e) {
			console.log(e.detail.value);
		},
		cancelHandle() {
			this.show = false;
		},
		sureHandle() {
			this.$refs.popupDialog.open();
		},
		dialogConfirm(done) {
			this.$refs.popupDialog.open();
			console.log('点击确认');
			this.show = false;
			// 需要执行 done 才能关闭对话框
			done();
		},
		/**
		 * 对话框取消按钮
		 */
		dialogClose(done) {
			this.$refs.popupDialog.open();
			this.show = false;
			// 需要执行 done 才能关闭对话框
			done();
		}
	}
};
</script>

<style lang="less" scoped>
uni-view {
	line-height: 1.5;
}
.box {
	.box-list {
		margin-bottom: 60px;
		z-index: -999;
	}
	.list {
		border-bottom: 1px solid #eee;
		padding-bottom: 10px;
		.check {
			display: flex;
			justify-content: center;
			align-items: center;
			padding-left: 10px;
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
				color: #666;
			}
		}
	}
	.list:nth-last-child(1) {
		border-bottom: none;
	}
	.bottom {
		width: 100%;
		height: 45px;
		line-height: 45px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		position: fixed;
		bottom: 0;
		font-size: 18px;
		z-index: 999;
		border-top: 1px solid #eee;
		background-color: #fff;
		.cancel {
			margin-left: 25px;
		}
		.sure {
			margin-right: 25px;
			color: #1890ff;
		}
	}
}
</style>
