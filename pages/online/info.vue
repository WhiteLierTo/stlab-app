<template>
	<view class="box">
		<view class="info">
			<view class="info-top">
				<view class="uni-flex uni-row" style="-webkit-justify-content: space-between;justify-content: space-between;">
					<view class="info-btn"><button class="mini-btn btn" type="primary" size="mini" @click="addHandle">新增检材</button></view>
					<view class="info-del">删除</view>
				</view>
			</view>
			<view class="info-content">
				<view class="uni-flex uni-row">
					<view
						class="text1 uni-flex"
						style="-webkit-flex: 1;flex: 1;height: 200rpx;-webkit-justify-content: center;justify-content: center;-webkit-align-items: flex-start;align-items: flex-start;"
					>
						检材1
					</view>
					<view
						class="text1 uni-flex"
						style="-webkit-flex: 1;flex: 1;height: 200rpx;-webkit-justify-content: center;justify-content: center;-webkit-align-items: flex-start;align-items: flex-start;"
					>
						检材1
					</view>
					<view
						class="text1 uni-flex"
						style="-webkit-flex: 1;flex: 1;height: 200rpx;-webkit-justify-content: center;justify-content: center;-webkit-align-items: flex-start;align-items: flex-start;"
					>
						检材1
					</view>
				</view>
			</view>
		</view>
		<view class="info-bottom">
			<view class="pre">上一步</view>
			<view class="next">上一步</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {};
	},
	methods: {
		addHandle() {
			console.log('点击');
			uni.navigateTo({
				url: './info-detail'
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
				padding: 6px 8px;
				border-radius: 50%;
			}
		}
		.info-content {
			.text1 {
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
