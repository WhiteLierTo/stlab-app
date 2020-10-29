<template>
	<view class="box">
		<view class="uni-padding-wrap uni-common-mt">
			<form @submit="formSubmit">
				<view class="uni-form-item uni-column">
					<view class="title">
						<text class="star">*</text>
						委托单位
					</view>
					<input class="uni-input" name="nickname" placeholder="请输入委托单位" />
				</view>
				<view class="uni-form-item uni-column">
					<view class="title">
						<text class="star">*</text>
						委托日期
					</view>
					<picker mode="date" :value="date" :start="startDate" :end="endDate" @change="bindDateChange" name="date">
						<view class="uni-input">{{ date }}</view>
					</picker>
				</view>
				<view class="uni-form-item uni-column">
					<view class="title">
						<text class="star">*</text>
						委托时间
					</view>
					<picker mode="time" :value="time" start="00:00" end="23:59" @change="bindTimeChange" name="time">
						<view class="uni-input">{{ time }}</view>
					</picker>
				</view>
				<view class="uni-form-item uni-column">
					<view class="title">
						<text class="star">*</text>
						取证机构
					</view>
					<view class="input">
						<picker @change="bindPickerChange" :value="index" :range="array" range-key="name" style="width: 100%;">
							<view class="uni-flex uni-row">
								<view class="text" style="-webkit-flex: 1;flex: 1;">
									<input class="uni-input jigou" placeholder="请选择取证机构" name="institutions" v-model="array[index].name" />
								</view>
								<!-- <view class="text" style="width: 100rpx;"><button class="mini-btn btn" type="primary" size="mini">选择</button></view> -->
							</view>
						</picker>
					</view>
				</view>

				<!-- 			<view class="uni-form-item uni-column">
					<view class="title">大平台案件编号</view>
					<view class="input">
						<input class="uni-input jigou" name="nickname" placeholder="请输入大平台案件编号" />
						<button class="mini-btn btn-info" type="primary" size="mini">获取案件信息</button>
					</view>
				</view> -->
				<view class="uni-form-item uni-column">
					<view class="title">
						<text class="star">*</text>
						案件名称
					</view>
					<input class="uni-input" placeholder="请输入案件名称" name="case" />
				</view>
				<view class="uni-form-item uni-column">
					<view class="title">
						<text class="star">*</text>
						案件类型
					</view>
					<picker @change="bindPickerChange" :value="index" :range="array" range-key="name">
						<view class="uni-input">{{ array[index].name }}</view>
					</picker>
				</view>
				<view class="uni-form-item uni-column">
					<view class="title">案件简要</view>
					<textarea placeholder="请输入案件简要" name="intro" />
				</view>
				<view class="uni-form-item uni-column switch">
					<view class="title">
						<text class="star">*</text>
						是否出具文书
					</view>
					<switch :checked="checked" @change="switch1Change" />
				</view>
				<view class="uni-form-item uni-column">
					<view class="title">
						<text class="star">*</text>
						委托人
					</view>
					<input class="uni-input" placeholder="请输入委托人" name="principal" />
				</view>
				<view class="uni-form-item uni-column">
					<view class="title">
						<text class="star">*</text>
						单位
					</view>
					<input class="uni-input" name="unit" placeholder="请输入单位" />
				</view>
				<view class="uni-form-item uni-column">
					<view class="title">
						<text class="star">*</text>
						警号
					</view>
					<input class="uni-input" name="num" placeholder="请输入警号" />
				</view>
				<view class="uni-form-item uni-column">
					<view class="title">
						<text class="star">*</text>
						手机号
					</view>
					<input class="uni-input" name="phone" placeholder="请输入手机号" />
				</view>
				<view class="uni-form-item uni-column">
					<view class="title">证件照</view>
					<view class="uni-uploader-body">
						<view class="uni-uploader__files">
							<block v-for="(image, index) in imageList" :key="index">
								<view class="uni-uploader__file"><image class="uni-uploader__img" :src="image" :data-src="image" @tap="previewImage"></image></view>
							</block>
							<view class="uni-uploader__input-box"><view class="uni-uploader__input" @tap="chooseImage(1)"></view></view>
						</view>
					</view>
				</view>
				<view class="uni-form-item uni-column">
					<view class="title">委托人2</view>
					<input class="uni-input" name="principal1" placeholder="请输入委托人" />
				</view>
				<view class="uni-form-item uni-column">
					<view class="title">单位</view>
					<input class="uni-input" name="unit1" placeholder="请输入单位" />
				</view>
				<view class="uni-form-item uni-column">
					<view class="title">警号</view>
					<input class="uni-input" name="num1" placeholder="请输入警号" />
				</view>
				<view class="uni-form-item uni-column">
					<view class="title">手机号</view>
					<input class="uni-input" name="phone1" placeholder="请输入手机号" />
				</view>
				<view class="uni-form-item uni-column">
					<view class="title">证件照</view>
					<view class="uni-uploader-body">
						<view class="uni-uploader__files">
							<block v-for="(image, index) in imageList1" :key="index">
								<view class="uni-uploader__file"><image class="uni-uploader__img" :src="image" :data-src="image" @tap="previewImage1"></image></view>
							</block>
							<view class="uni-uploader__input-box"><view class="uni-uploader__input" @tap="chooseImage(2)"></view></view>
						</view>
					</view>
				</view>
				<view class="uni-btn-v "><button form-type="submit" class="step">下一步</button></view>
			</form>
		</view>
	</view>
</template>

<script>
var graceChecker = require('../../common/graceChecker.js');
import permision from '../../common/permission.js';

function getDate(type) {
	const date = new Date();

	let year = date.getFullYear();
	let month = date.getMonth() + 1;
	let day = date.getDate();

	if (type === 'start') {
		year = year - 60;
	} else if (type === 'end') {
		year = year + 2;
	}
	month = month > 9 ? month : '0' + month;
	day = day > 9 ? day : '0' + day;

	return `${year}-${month}-${day}`;
}
export default {
	data() {
		return {
			array: [{ name: '中国' }, { name: '美国' }, { name: '巴西' }, { name: '日本' }],
			date: '',
			// date: getDate({
			// 	format: true
			// }),
			startDate: getDate('start'),
			endDate: getDate('end'),
			time: '',
			index: 0,
			checked: false,
			imageList: [],
			imageList1: []
		};
	},
	onUnload() {
		this.imageList = [];
		this.imageList1 = [];
	},
	methods: {
		bindDateChange: function(e) {
			this.date = e.detail.value;
		},
		bindTimeChange: function(e) {
			this.time = e.detail.value;
		},
		bindPickerChange: function(e) {
			this.index = e.detail.value;
		},
		//是否出具文书
		switch1Change: function(e) {
			console.log('switch1 发生 change 事件，携带值为', e.detail.value);
		},
		formSubmit: function(e) {
			//定义表单规则
			var rule = [
				{ name: 'nickname', checkType: 'notnull', checkRule: '', errorMsg: '请输入委托单位' },
				{ name: 'date', checkType: 'notnull', checkRule: '', errorMsg: '请选择委托日期' },
				{ name: 'time', checkType: 'notnull', checkRule: '', errorMsg: '请选择委托时间' },
				{ name: 'case', checkType: 'notnull', checkRule: '', errorMsg: '请输入案件名称' },
				{ name: 'principal', checkType: 'notnull', checkRule: '', errorMsg: '请输入委托人' },
				{ name: 'unit', checkType: 'notnull', checkRule: '', errorMsg: '请输入单位' },
				{ name: 'num', checkType: 'notnull', checkRule: '', errorMsg: '请输入警号' },
				{ name: 'phone', checkType: 'notnull', checkRule: '', errorMsg: '请输入手机号' }
			];
			//进行表单检查
			var formData = e.detail.value;
			var checkRes = graceChecker.check(formData, rule);
			if (checkRes) {
				this.$emit('changeCurrent', 1);
			} else {
				uni.showToast({ title: graceChecker.error, icon: 'none' });
			}
		},
		chooseImage: async function(item) {
			uni.chooseImage({
				success: res => {
					if (item == 1) {
						this.imageList = this.imageList.concat(res.tempFilePaths);
					} else if (item == 2) {
						this.imageList1 = this.imageList1.concat(res.tempFilePaths);
					}
				}
			});
		},
		previewImage: function(e) {
			var current = e.target.dataset.src;
			uni.previewImage({
				current: current,
				urls: this.imageList
			});
		},
		previewImage1: function(e) {
			var current = e.target.dataset.src;
			uni.previewImage({
				current: current,
				urls: this.imageList1
			});
		}
	}
};
</script>

<style lang="less" scoped>
.uni-form-item .title {
	padding: 20rpx 0;
}
.uni-input {
	border: 1px solid #eee;
}

uni-textarea {
	width: 100% !important;
}
uni-button {
	border-radius: inherit !important;
}
.uni-uploader__input-box {
	width: 100%;
	border: 1px dashed #97c4ee;
}
.uni-uploader__input-box:before {
	background-color: #97c4ee;
}
.uni-uploader__input-box:after {
	background-color: #97c4ee;
}
.box {
	.input {
		display: flex;
		line-height: 45px;
		.jigou {
			flex: 1;
		}
		.btn {
			width: 80px;
			line-height: 41px;
		}
		.btn-info {
			width: 120px;
			line-height: 45px;
		}
	}
	.switch {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
	}
	.star {
		color: #f00;
	}
	.step {
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
