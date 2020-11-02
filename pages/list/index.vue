<template>
	<view class="box">
		<view :class="{ 'box-list': show }">
			<checkbox-group @change="checkboxChange">
				<view class="list" v-for="(item, index) in listData" :key="index">
					<view class="uni-flex uni-row">
						<view class="text check" v-if="show"><checkbox :value="item.id" /></view>
						<view class="text img"><image src="../../static/img/msg.png" /></view>
						<view class="text contain" style="-webkit-flex: 1;flex: 1;" @click="listHandle(item)">
							<view class="uni-flex uni-row" style="-webkit-justify-content: space-between;justify-content: space-between;">
								<view class="text title">
									{{ item.delegateUnit }}
									<text class="dot"></text>
								</view>
								<view class="text time">{{ item.createTime }}</view>
							</view>
							<view class="contain-info">{{ item.msgContent }}</view>
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
			listData: [],
			avatarList: [],
			show: false
		};
	},
	mounted() {
		this.delegateNoticeList();
	},
	methods: {
		delegateNoticeList() {
			this.$Request.post(this.$api.delegateNoticeList).then(res => {
				console.log(res);
				if (res.code == 0) {
					this.listData = res.data;
				}
			});
		},
		listHandle(item) {
			this.$Request.get(this.$api.updateDelegateNotice, item.id).then(res => {
				console.log(res);
			});
			uni.navigateTo({
				url: './detail?item=' + JSON.stringify(item)
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
