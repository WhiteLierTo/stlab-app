<template>
	<view class="box">
		<view class="uni-padding-wrap uni-common-mt">
			<form @submit="formSubmit">
				<view class="uni-form-item uni-column">
					<view class="title">
						<text class="star">*</text>
						委托单位
					</view>
					<input class="uni-input" name="delegateUnit" placeholder="请输入委托单位" v-model="form.delegateUnit" />
				</view>
				<view class="uni-form-item uni-column">
					<view class="title">
						<text class="star">*</text>
						委托时间
					</view>
					<input class="uni-input jigou" name="delegateDate" placeholder="请选择委托时间" @click="onShowDatePicker('datetime')" v-model="form.delegateDate" />
				</view>
				<view class="uni-form-item uni-column">
					<view class="title">
						<text class="star">*</text>
						取证机构
					</view>
					<view class="input">
						<picker @change="orgPickerChange" :value="orgIndex" :range="organizationList" range-key="name" style="width: 100%;">
							<view class="uni-flex uni-row">
								<view class="text" style="-webkit-flex: 1;flex: 1;">
									<input class="uni-input jigou" placeholder="请选择取证机构" name="acceptanceUnit" v-model="form.acceptanceUnit" />
								</view>
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
					<input class="uni-input" placeholder="请输入案件名称" name="lawcaseName" v-model="form.lawcaseName" />
				</view>
				<view class="uni-form-item uni-column">
					<view class="title">
						<text class="star">*</text>
						案件类型
					</view>
					<picker @change="lawPickerChange" :value="lawIndex" :range="lawList" range-key="name">
						<view class="text" style="-webkit-flex: 1;flex: 1;">
							<input class="uni-input jigou" placeholder="请选择案件类型" name="lawcaseType" v-model="form.lawcaseTypeName" />
						</view>
					</picker>
				</view>
				<view class="uni-form-item uni-column">
					<view class="title">案件简要</view>
					<textarea placeholder="请输入案件简要" name="lawcaseDesc" v-model="form.lawcaseDesc" />
				</view>
				<view class="uni-form-item uni-column switch">
					<view class="title">
						<text class="star">*</text>
						是否出具文书
					</view>
					<switch :checked="form.isDoc" @change="switch1Change" />
				</view>
				<view class="uni-form-item uni-column">
					<view class="title">取证需求</view>
					<textarea placeholder="请输入取证需求" name="delegateItem" v-model="form.delegateItem" />
				</view>
				<view class="uni-form-item uni-column">
					<view class="title">
						<text class="star">*</text>
						委托人
					</view>
					<input class="uni-input" placeholder="请输入委托人" name="userName" v-model="form.userName" />
				</view>
				<view class="uni-form-item uni-column">
					<view class="title">
						<text class="star">*</text>
						单位
					</view>
					<input class="uni-input" name="unit" placeholder="请输入单位" v-model="form.unit" />
				</view>
				<view class="uni-form-item uni-column">
					<view class="title">
						<text class="star">*</text>
						警号
					</view>
					<input class="uni-input" name="userNo" placeholder="请输入警号" v-model="form.userNo" />
				</view>
				<view class="uni-form-item uni-column">
					<view class="title">
						<text class="star">*</text>
						手机号
					</view>
					<input class="uni-input" name="mobile" placeholder="请输入手机号" v-model="form.mobile" />
				</view>
				<view class="uni-form-item uni-column">
					<view class="title">证件照{{ imgfile1 }}</view>
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
					<input class="uni-input" name="userName1" placeholder="请输入委托人" v-model="form.userName1" />
				</view>
				<view class="uni-form-item uni-column">
					<view class="title">单位</view>
					<input class="uni-input" name="unit1" placeholder="请输入单位" v-model="form.unit1" />
				</view>
				<view class="uni-form-item uni-column">
					<view class="title">警号</view>
					<input class="uni-input" name="userNo1" placeholder="请输入警号" v-model="form.userNo1" />
				</view>
				<view class="uni-form-item uni-column">
					<view class="title">手机号</view>
					<input class="uni-input" name="mobile1" placeholder="请输入手机号" v-model="form.mobile1" />
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
		<mx-date-picker :show="showPicker" :type="type" :value="value" :show-tips="true" :show-seconds="true" @confirm="onSelected" @cancel="onSelected" />
	</view>
</template>

<script>
var graceChecker = require('../../common/graceChecker.js');
import permision from '../../common/permission.js';
import MxDatePicker from '@/components/mx-datepicker/mx-datepicker.vue';
import utils from '../../common/utils.js';
export default {
	props: ['delegateId'],
	components: {
		MxDatePicker
	},
	data() {
		return {
			form: {
				delegateUnit: '',
				delegateDate: '',
				acceptanceUnit: '',
				acceptanceUnitCode: '',
				lawcaseName: '',
				lawcaseType: '',
				lawcaseTypeName: '',
				lawcaseDesc: '',
				isDoc: true,
				delegateItem: '',
				userName: '',
				unit: '',
				mobile: '',
				userNo: '',
				userName1: '',
				mobile1: '',
				unit1: '',
				userNo1: ''
			},
			lawList: [],
			organizationList: [],
			lawObj: {},
			orgObj: {},
			lawIndex: -1,
			orgIndex: -1,
			imageList: [],
			imageList1: [],
			showPicker: false,
			type: 'rangetime',
			value: '',
			imgfile1: '',
			imgfile2: ''
		};
	},
	onUnload() {
		this.imageList = [];
		this.imageList1 = [];
	},
	methods: {
		onShowDatePicker(type) {
			//显示
			this.type = type;
			this.showPicker = true;
			this.value = this[type];
		},
		onSelected(e) {
			//选择
			this.showPicker = false;
			if (e) {
				this[this.type] = e.value;
				this.form.delegateDate = this.$utils.dateFormat('YYYY-mm-dd HH:MM:SS', e.date);
			}
		},
		//案件
		lawPickerChange: function(e) {
			this.lawIndex = e.detail.value;
			this.form.lawcaseTypeName = this.lawList[this.lawIndex];
			const currentKey = this.$utils.findKey(this.lawObj, this.lawList[this.lawIndex]);
			this.form.lawcaseType = currentKey;
		},
		//机构
		orgPickerChange: function(e) {
			this.orgIndex = e.detail.value;
			this.form.acceptanceUnit = this.organizationList[this.orgIndex];
			const currentKey = this.$utils.findKey(this.orgObj, this.organizationList[this.orgIndex]);
			this.form.acceptanceUnitCode = currentKey;
		},
		//是否出具文书
		switch1Change: function(e) {
			if (e.detail.value) {
				this.form.isDoc = 1;
			} else {
				this.form.isDoc = 0;
			}
		},
		chooseImage: async function(item) {
			uni.chooseImage({
				success: res => {
					if (item == 1) {
						if (this.imageList.length > 0) {
							uni.showToast({
								title: '上传单张即可',
								icon: 'none'
							});
							return;
						}
						this.imageList = this.imageList.concat(res.tempFilePaths);
						let imgFiles = this.imageList[0];
						// 上传图片
						this.$Request.uploadFile({
							filePath: imgFiles,
							name: 'file',
							url: 'upload',
							success: res => {
								this.imgfile1 = JSON.parse(res.data).data;
							}
						});
					} else if (item == 2) {
						if (this.imageList1.length > 0) {
							uni.showToast({
								title: '上传单张即可',
								icon: 'none'
							});
							return;
						}
						this.imageList1 = this.imageList1.concat(res.tempFilePaths);
						let imgFiles = this.imageList1[0];
						// 上传图片
						this.$Request.uploadFile({
							filePath: imgFiles,
							name: 'file',
							url: 'upload',
							success: res => {
								this.imgfile2 = JSON.parse(res.data).data;
							}
						});
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
		},
		formSubmit: function(e) {
			//定义表单规则
			var rule = [
				{ name: 'delegateUnit', checkType: 'notnull', checkRule: '', errorMsg: '请输入委托单位' },
				{ name: 'delegateDate', checkType: 'notnull', checkRule: '', errorMsg: '请选择委托时间' },
				{ name: 'acceptanceUnit', checkType: 'notnull', checkRule: '', errorMsg: '请选择取证机构' },
				{ name: 'lawcaseName', checkType: 'notnull', checkRule: '', errorMsg: '请输入案件名称' },
				{ name: 'lawcaseType', checkType: 'notnull', checkRule: '', errorMsg: '请输入案件类型' },
				{ name: 'userName', checkType: 'notnull', checkRule: '', errorMsg: '请输入委托人' },
				{ name: 'unit', checkType: 'notnull', checkRule: '', errorMsg: '请输入单位' },
				{ name: 'userNo', checkType: 'notnull', checkRule: '', errorMsg: '请输入警号' },
				{ name: 'mobile', checkType: 'notnull', checkRule: '', errorMsg: '请输入手机号' }
			];
			//进行表单检查
			var formData = e.detail.value;
			var checkRes = graceChecker.check(formData, rule);
			if (checkRes) {
				const {
					delegateUnit,
					delegateDate,
					acceptanceUnit,
					acceptanceUnitCode,
					lawcaseName,
					lawcaseType,
					lawcaseDesc,
					isDoc,
					delegateItem,
					userName,
					unit,
					mobile,
					userName1,
					unit1,
					mobile1,
					userNo,
					userNo1
				} = this.form;
				const params = {
					delegateId: this.delegateId || '',
					delegateUnit,
					delegateDate,
					acceptanceUnit,
					acceptanceUnitCode,
					lawcaseName,
					lawcaseType,
					lawcaseDesc,
					isDoc: isDoc ? 1 : 0,
					delegateItem,
					delegateUserList: [
						{
							userName,
							unit,
							mobile,
							lawcaseCards: this.imgfile1,
							userNo,
							primaryFlag: 1
						},
						{
							userName: userName1,
							unit: unit1,
							mobile: mobile1,
							lawcaseCards: this.imgfile2,
							userNo: userNo1,
							primaryFlag: 0
						}
					]
				};
				this.$Request.post(this.$api.step1, params).then(res => {
					if (res.code === 0) {
						uni.showToast({
							title: '提交成功',
							icon: 'none'
						});
						const params = {
							code: 1,
							value: {
								delegateId: res.data.delegateId,
								lawcaseId: res.data.lawcaseId,
								createUid: res.data.createUid,
								sampleType: res.data.sampleType
							}
						};
						this.$emit('changeCurrent', params);
					} else {
						uni.showToast({
							title: '提交失败',
							icon: 'none'
						});
					}
				});
			} else {
				uni.showToast({ title: graceChecker.error, icon: 'none' });
			}
		},

		// 委托单位和案件类型
		getDelegateInfo() {
			this.$Request.get(this.$api.delegateInfo).then(res => {
				if (res) {
					this.lawObj = res.lawcaseType;
					this.orgObj = res.sysOrgList;

					const { mobile, unit, userName, userNo } = res.delegateClient;
					this.form.mobile = mobile;
					this.form.unit = unit;
					this.form.userName = userName;
					this.form.userNo = userNo;

					this.lawList = Object.values(res.lawcaseType);
					this.organizationList = Object.values(res.sysOrgList);
				}
			});
		}
	},
	mounted() {
		this.getDelegateInfo();
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
