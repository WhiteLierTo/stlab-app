<template>
	<view class="detail">
		<view class="title">检材1</view>
		<view class="form1">
			<form @submit="formSubmit" @reset="formReset">
				<view class="uni-form-item uni-column">
					<view class="tp">检材类型</view>
					<input class="uni-input" name="nickname" placeholder="请输入检材类型" />
				</view>
				<view class="uni-form-item uni-column">
					<view class="tp">检材名称</view>
					<input class="uni-input" name="nickname" placeholder="请输入检材名称" />
				</view>
				<view class="uni-form-item uni-column">
					<view class="tp">检材编号</view>
					<input class="uni-input" name="nickname" placeholder="请输入检材编号" />
				</view>
				<view class="uni-form-item uni-column">
					<view class="tp">检材来源</view>
					<picker @change="bindPickerChange" :value="index" :range="array" range-key="name" style="width: 100%;">
						<input class="uni-input jigou" placeholder="请选择检材来源" name="institutions" v-model="array[index].name" />
					</picker>
				</view>
				<view class="uni-form-item uni-column">
					<view class="tp">持有人姓名</view>
					<input class="uni-input" name="nickname" placeholder="请输入持有人姓名" />
				</view>
				<view class="uni-form-item uni-column">
					<view class="tp">持有人身份证</view>
					<input class="uni-input" name="nickname" placeholder="请输入持有人身份证" />
				</view>
				<view class="uni-form-item uni-column">
					<view class="tp">品牌</view>
					<input class="uni-input" name="nickname" placeholder="请输入品牌" />
				</view>
				<view class="uni-form-item uni-column">
					<view class="tp">型号</view>
					<input class="uni-input" name="nickname" placeholder="请输入型号" />
				</view>
				<view class="uni-form-item uni-column">
					<view class="tp">颜色</view>
					<input class="uni-input" name="nickname" placeholder="请输入颜色" />
				</view>
				<view class="uni-form-item uni-column">
					<view class="tp">特征</view>
					<input class="uni-input" name="nickname" placeholder="请输入特征" />
				</view>
				<view class="uni-form-item uni-column">
					<view class="tp">唯一特征</view>
					<input class="uni-input" name="nickname" placeholder="请输入唯一特征" />
				</view>
			</form>
		</view>
		<view class="finish">完成</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			array: [{ name: '扣押' }, { name: '受害人提供' }, { name: '其他' }],
			index: 0
		};
	},
	onLoad() {
		uni.setNavigationBarTitle({
			title: '检材2'
		});
	},
	methods: {
		bindPickerChange: function(e) {
			this.index = e.detail.value;
		},
		formSubmit() {},
		formReset() {}
	}
};
</script>

<style lang="less" scoped>
.uni-input {
	border: 1px solid #eee;
}

.detail {
	.title {
		font-size: 18px;
		color: #1a8fff;
		border-bottom: 1px solid #eee;
		padding: 10px;
	}
	.form1 {
		padding: 10px;
		.tp {
			padding-bottom: 10px;
		}
	}
	.finish {
		width: 100%;
		height: 50px;
		line-height: 50px;
		text-align: center;
		color: #fff;
		background-color: #178fff;
		margin-top: 25px;
	}
}
</style>
