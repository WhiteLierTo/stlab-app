<template>
	<view class="box">
		<view class="uni-padding-wrap uni-common-mt">
			<uni-segmented-control :current="current" :values="items" :style-type="styleType" :active-color="activeColor" @clickItem="onClickItem" />
		</view>
		<view class="content">
			<view v-if="current === 0">
				<view class="uni-padding-wrap uni-common-mt">
					<form @submit="formSubmit" @reset="formReset">
						<view class="uni-form-item uni-column">
							<view class="title">委托单位</view>
							<input class="uni-input" name="nickname" placeholder="请输入委托单位" />
						</view>
						<view class="uni-form-item uni-column">
							<view class="title">委托编号</view>
							<input class="uni-input" name="nickname" placeholder="请输入委托编号" />
						</view>
						<view class="uni-form-item uni-column">
							<view class="title">委托日期</view>
							<picker mode="date" :value="date" :start="startDate" :end="endDate" @change="bindDateChange">
								<view class="uni-input">{{ date }}</view>
							</picker>
						</view>
						<view class="uni-form-item uni-column">
							<view class="title">委托时间</view>
							<picker mode="time" :value="time" start="00:00" end="23:59" @change="bindTimeChange">
								<view class="uni-input">{{ time }}</view>
							</picker>
						</view>
						<view class="uni-form-item uni-column">
							<view class="title">取证机构</view>
							<view class="input">
								<input class="uni-input jigou" name="nickname" placeholder="请输入取证机构" />
								<button class="mini-btn btn" type="primary" size="mini">选择</button>
							</view>
						</view>
						<view class="uni-form-item uni-column">
							<view class="title">案件名称</view>
							<input class="uni-input" name="nickname" placeholder="请输入案件名称" />
						</view>
						<view class="uni-form-item uni-column">
							<view class="title">大平台案件编号</view>
							<view class="input">
								<input class="uni-input jigou" name="nickname" placeholder="请输入大平台案件编号" />
								<button class="mini-btn btn-info" type="primary" size="mini">获取案件信息</button>
							</view>
						</view>
						<view class="uni-form-item uni-column">
							<view class="title">案件类型</view>
							<picker @change="bindPickerChange" :value="index" :range="array" range-key="name">
								<view class="uni-input">{{ array[index].name }}</view>
							</picker>
						</view>
						<view class="uni-form-item uni-column">
							<view class="title">案件简要</view>
							<textarea placeholder="请输入案件简要" />
						</view>
						<view class="uni-form-item uni-column">
							<view class="title">委托人</view>
							<input class="uni-input" name="nickname" placeholder="请输入委托人" />
						</view>
						<view class="uni-form-item uni-column">
							<view class="title">单位</view>
							<input class="uni-input" name="nickname" placeholder="请输入单位" />
						</view>
						<view class="uni-form-item uni-column">
							<view class="title">警号</view>
							<input class="uni-input" name="nickname" placeholder="请输入警号" />
						</view>
						<view class="uni-form-item uni-column">
							<view class="title">手机号</view>
							<input class="uni-input" name="nickname" placeholder="请输入手机号" />
						</view>
						<view class="uni-form-item uni-column">
							<view class="title">证件照</view>
							<view class="uni-uploader-body">
								<view class="uni-uploader__files">
									<block v-for="(image, index) in imageList" :key="index">
										<view class="uni-uploader__file"><image class="uni-uploader__img" :src="image" :data-src="image" @tap="previewImage"></image></view>
									</block>
									<view class="uni-uploader__input-box"><view class="uni-uploader__input" @tap="chooseImage"></view></view>
								</view>
							</view>
						</view>
						<view class="uni-form-item uni-column">
							<view class="title">委托人2</view>
							<input class="uni-input" name="nickname" placeholder="请输入委托人" />
						</view>
						<view class="uni-form-item uni-column">
							<view class="title">单位</view>
							<input class="uni-input" name="nickname" placeholder="请输入单位" />
						</view>
						<view class="uni-form-item uni-column">
							<view class="title">警号</view>
							<input class="uni-input" name="nickname" placeholder="请输入警号" />
						</view>
						<view class="uni-form-item uni-column">
							<view class="title">手机号</view>
							<input class="uni-input" name="nickname" placeholder="请输入手机号" />
						</view>
						<view class="uni-form-item uni-column">
							<view class="title">证件照</view>
							<view class="uni-uploader-body">
								<view class="uni-uploader__files">
									<block v-for="(image, index) in imageList" :key="index">
										<view class="uni-uploader__file"><image class="uni-uploader__img" :src="image" :data-src="image" @tap="previewImage"></image></view>
									</block>
									<view class="uni-uploader__input-box"><view class="uni-uploader__input" @tap="chooseImage"></view></view>
								</view>
							</view>
						</view>
					</form>
				</view>
				<view class="step">下一步</view>
			</view>
			<view v-if="current === 1">
				<text class="content-text"><Info /></text>
			</view>
			<view v-if="current === 2"><text class="content-text">选项卡3的内容</text></view>
		</view>
	</view>
</template>

<script>
var graceChecker = require('../../common/graceChecker.js');
import permision from '../../common/permission.js';
import Info from './info.vue';

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
var sourceType = [['camera'], ['album'], ['camera', 'album']];
export default {
	components: {
		Info
	},
	data() {
		return {
			items: ['1.委托信息', '2.检材信息', '3.委托附件'],
			array: [{ name: '中国' }, { name: '美国' }, { name: '巴西' }, { name: '日本' }],
			current: 0,
			index: 0,
			activeColor: '#007aff',
			styleType: 'text',
			date: getDate({
				format: true
			}),
			startDate: getDate('start'),
			endDate: getDate('end'),
			time: '12:01',
			imageList: [],
			sourceType: ['拍照', '相册', '拍照或相册'],
			sizeType: ['压缩', '原图', '压缩或原图']
		};
	},
	onUnload() {
		this.imageList = [];
		this.sourceType = ['拍照', '相册', '拍照或相册'];
	},
	methods: {
		onClickItem(e) {
			if (this.current !== e.currentIndex) {
				this.current = e.currentIndex;
			}
		},
		bindDateChange: function(e) {
			this.date = e.detail.value;
		},
		bindTimeChange: function(e) {
			this.time = e.detail.value;
		},
		bindPickerChange: function(e) {
			console.log('picker发送选择改变，携带值为：' + e.detail.value);
			this.index = e.detail.value;
		},
		formSubmit: function(e) {
			console.log('form发生了submit事件，携带数据为：' + JSON.stringify(e.detail.value));
			//定义表单规则
			var rule = [
				{ name: 'nickname', checkType: 'string', checkRule: '1,3', errorMsg: '姓名应为1-3个字符' },
				{ name: 'gender', checkType: 'in', checkRule: '男,女', errorMsg: '请选择性别' },
				{ name: 'loves', checkType: 'notnull', checkRule: '', errorMsg: '请选择爱好' }
			];
			//进行表单检查
			var formData = e.detail.value;
			var checkRes = graceChecker.check(formData, rule);
			if (checkRes) {
				uni.showToast({ title: '验证通过!', icon: 'none' });
			} else {
				uni.showToast({ title: graceChecker.error, icon: 'none' });
			}
		},
		formReset: function(e) {
			console.log('清空数据');
		},
		chooseImage: async function() {
			// #ifdef APP-PLUS
			// TODO 选择相机或相册时 需要弹出actionsheet，目前无法获得是相机还是相册，在失败回调中处理
			if (this.sourceTypeIndex !== 2) {
				let status = await this.checkPermission();
				if (status !== 1) {
					return;
				}
			}
			// #endif

			if (this.imageList.length === 9) {
				let isContinue = await this.isFullImg();
				console.log('是否继续?', isContinue);
				if (!isContinue) {
					return;
				}
			}
			uni.chooseImage({
				sourceType: sourceType[this.sourceTypeIndex],
				// sizeType: this.sizeType[2],
				count: this.imageList.length + this.count[this.countIndex] > 9 ? 9 - this.imageList.length : this.count[this.countIndex],
				success: res => {
					this.imageList = this.imageList.concat(res.tempFilePaths);
				},
				fail: err => {
					// #ifdef APP-PLUS
					if (err['code'] && err.code !== 0 && this.sourceTypeIndex === 2) {
						this.checkPermission(err.code);
					}
					// #endif
					// #ifdef MP
					uni.getSetting({
						success: res => {
							let authStatus = false;
							switch (this.sourceTypeIndex) {
								case 0:
									authStatus = res.authSetting['scope.camera'];
									break;
								case 1:
									authStatus = res.authSetting['scope.album'];
									break;
								case 2:
									authStatus = res.authSetting['scope.album'] && res.authSetting['scope.camera'];
									break;
								default:
									break;
							}
							if (!authStatus) {
								uni.showModal({
									title: '授权失败',
									content: 'Hello uni-app需要从您的相机或相册获取图片，请在设置界面打开相关权限',
									success: res => {
										if (res.confirm) {
											uni.openSetting();
										}
									}
								});
							}
						}
					});
					// #endif
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
		async checkPermission(code) {
			let type = code ? code - 1 : this.sourceTypeIndex;
			let status = permision.isIOS
				? await permision.requestIOS(sourceType[type][0])
				: await permision.requestAndroid(type === 0 ? 'android.permission.CAMERA' : 'android.permission.READ_EXTERNAL_STORAGE');

			if (status === null || status === 1) {
				status = 1;
			} else {
				uni.showModal({
					content: '没有开启权限',
					confirmText: '设置',
					success: function(res) {
						if (res.confirm) {
							permision.gotoAppSetting();
						}
					}
				});
			}

			return status;
		}
	}
};
</script>

<style lang="less">
.uni-form-item .title {
	padding: 20rpx 0;
}
.uni-input {
	border: 1px solid #eee;
}

uni-textarea {
	width: 100% !important;
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
			line-height: 45px;
		}
		.btn-info {
			width: 120px;
			line-height: 45px;
		}
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
