<template>
	<view class="box">
		<view class="info">
			<view class="info-top">
				<view class="uni-flex uni-row" style="-webkit-justify-content: space-between;justify-content: space-between;">
					<view class="info-btn"><button class="mini-btn btn" type="primary" size="mini" @click="addHandle">新增检材</button></view>
					<view class="info-del" @click="delHandle"><uni-icons type="trash" color="#ffffff" size="15" /></view>
				</view>
			</view>
			<view class="info-content">
				<view class="uni-flex uni-row" style="-webkit-flex-wrap: wrap;flex-wrap: wrap;">
					<view class="text1" style="width: 185rpx;" @click="checkoutDetail(item)" v-for="(item, index) in sampleList" :key="index">
						<view class="del" v-show="show" @click="removeHandle(item)"><uni-icons type="minus-filled" color="#f00" size="20" /></view>
						{{ item.sampleName }}
					</view>
				</view>
			</view>
		</view>
		<!-- #ifdef APP-NVUE -->

		<!-- #endif -->
		<view class="info-bottom">
			<view class="pre" @click="preHandle">上一步</view>
			<view class="next" @click="nextHandle">下一步</view>
		</view>
		<uni-popup id="popupDialog" ref="popupDialog" type="dialog" @change="change">
			<uni-popup-dialog type="error" title="通知" content="是否删除当前检材!" :before-close="true" @confirm="dialogConfirm" @close="dialogClose"></uni-popup-dialog>
		</uni-popup>
	</view>
</template>

<script>
import uniPopupDialog from '@/components/uni-popup/uni-popup-dialog.vue';

export default {
	components: { uniPopupDialog },
	props: ['lawcaseId', 'delegateId'],
	data() {
		return {
			show: false,
			sampleList: [],
			sampleId: ''
		};
	},
	mounted() {
		this.getSelectSampleList();
		console.log('hjjvhh ' + this.lawcaseId);
	},
	methods: {
		addHandle() {
			uni.navigateTo({
				url: './info-detail'
			});
		},
		delHandle() {
			this.show = !this.show;
		},
		removeHandle(item) {
			this.$refs.popupDialog.open();
			this.sampleId = item.sampleId;
		},
		checkoutDetail() {
			uni.navigateTo({
				url: './info-detail'
			});
		},
		/**
		 * popup 状态发生变化触发
		 * @param {Object} e
		 */
		change(e) {
			console.log('popup ' + e.type + ' 状态', e.show);
		},
		dialogConfirm(done) {
			this.$refs.popupDialog.open();
			console.log('点击确认');
			this.$Request.get(this.$api.delegateInfo, this.sampleId).then(res => {
				if (res.code == 0) {
					uni.showToast({
						title: '删除成功！',
						icon: 'none'
					});
					this.getSelectSampleList();
				}
			});

			// 需要执行 done 才能关闭对话框
			done();
		},
		/**
		 * 对话框取消按钮
		 */
		dialogClose(done) {
			this.$refs.popupDialog.open();
			// 需要执行 done 才能关闭对话框
			done();
		},
		preHandle() {
			const params = {
				code: 0,
				value: {}
			};
			this.$emit('changeCurrent', params);
		},
		nextHandle() {
			const params = {
				code: 2,
				value: {}
			};
			this.$emit('changeCurrent', params);
		},
		getSelectSampleList() {
			const params = {
				lawcaseId:Number(this.lawcaseId),
				delegateId: Number(this.delegateId)
			};
			this.$Request.get(this.$api.selectSampleList, params).then(res => {
				if (res.code == 0) {
					this.sampleList = res.data;
				}
			});
		}
	}
};
</script>

<style lang="less" scoped>
uni-button[size='mini'] {
	padding: 5px 1.34em;
}

.box {
	.info {
		padding: 25px;
		.info-top {
			margin-bottom: 25px;
			.info-btn {
				width: 120px;
				height: 45px;
			}
			.info-del {
				text-align: center;
				background-color: #178fff;
				color: #fff;
				width: 30px;
				height: 30px;
				border-radius: 50%;
			}
		}
		.info-content {
			.text1 {
				position: relative;
				display: flex;
				justify-content: center;
				list-style: none;
				width: 90px;
				height: 90px;
				line-height: 90px;
				text-align: center;
				background-color: #e1ecf5;
				border-radius: 5px;
				border: 1px solid #1890ff;
				margin: 2%;
				.del {
					position: absolute;
					right: -10px;
					top: -20px;
				}
			}
		}
	}
	.info-bottom {
		display: flex;
		flex-direction: row;
		width: 100%;
		text-align: center;
		color: #fff;
		position: fixed;
		bottom: 0;
		left: 0;
		.pre {
			width: 50%;
			background-color: #79bffd;
			height: 50px;
			line-height: 50px;
		}
		.next {
			width: 50%;
			background-color: #1890ff;
			height: 50px;
			line-height: 50px;
		}
	}
}
</style>
