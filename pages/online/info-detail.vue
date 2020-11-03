<template>
	<view class="detail">
		<view class="title">检材1</view>
		<view class="form1">
			<form @submit="formSubmit" @reset="formReset">
				<view class="uni-form-item uni-column">
					<view class="tp">检材类型</view>
					<picker @change="samplePickerChange" :value="sampIndex" :range="sampleList" range-key="name" style="width: 100%;">
						<view class="uni-flex uni-row">
							<view class="text" style="-webkit-flex: 1;flex: 1;">
								<input class="uni-input jigou" placeholder="请选择检材类型" name="sampleType" v-model="form.sampleTypeName" />
							</view>
						</view>
					</picker>
				</view>
				<view class="uni-form-item uni-column">
					<view class="tp">检材名称</view>
					<input class="uni-input" name="sampleName" placeholder="请输入检材名称" v-model="form.sampleName" />
				</view>
				<view class="uni-form-item uni-column">
					<view class="tp">检材来源</view>
					<picker @change="sourceBindPickerChange" :value="sourceIndex" :range="sourceList" range-key="name" style="width: 100%;">
						<input class="uni-input jigou" placeholder="请选择检材来源" name="sampleSource" v-model="form.sampleSource" />
					</picker>
				</view>
				<view class="uni-form-item uni-column">
					<view class="tp">持有人姓名</view>
					<input class="uni-input" name="sampleOwner" placeholder="请输入持有人姓名" v-model="form.sampleOwner" />
				</view>
				<view class="uni-form-item uni-column">
					<view class="tp">持有者证件类型</view>
					<picker @change="cardBindPickerChange" :value="icardIndex" :range="icardTypeList" range-key="sampleOwnerCardName" style="width: 100%;">
						<input class="uni-input jigou" placeholder="请选择证件类型" name="sampleOwnerCardType" v-model="form.sampleOwnerCardName" />
					</picker>
				</view>
				<view class="uni-form-item uni-column">
					<view class="tp">持有者证件编号</view>
					<input class="uni-input" name="sampleOwnerCardNo" placeholder="请输入持有者证件编号" v-model="form.sampleOwnerCardNo" />
				</view>
				<view class="uni-form-item uni-column">
					<view class="tp">品牌</view>
					<input class="uni-input" name="sampleBrand" placeholder="请输入品牌" v-model="form.sampleBrand" />
				</view>
				<view class="uni-form-item uni-column">
					<view class="tp">型号</view>
					<input class="uni-input" name="sampleModel" placeholder="请输入型号" v-model="form.sampleModel" />
				</view>
				<view class="uni-form-item uni-column">
					<view class="tp">颜色</view>
					<input class="uni-input" name="sampleColor" placeholder="请输入颜色" v-model="form.sampleColor" />
				</view>
				<view class="uni-form-item uni-column">
					<view class="tp">密码类型</view>
					<picker @change="pwdBindPickerChange" :value="pwdIndex" :range="pwdTypeList" range-key="passwordName" style="width: 100%;">
						<input class="uni-input jigou" placeholder="请选择检材来源" name="passwordType" v-model="form.passwordName" />
					</picker>
				</view>
				<view class="uni-form-item uni-column">
					<view class="tp">密码</view>
					<input class="uni-input" name="samplePassword" placeholder="请输入密码" v-model="form.samplePassword" />
				</view>
				<view class="uni-form-item uni-column">
					<view class="tp">备注</view>
					<textarea placeholder="请输入备注" name="remark" v-model="form.remark" />
				</view>
				<view class="uni-form-item uni-column">
					<view class="tp">委托编号</view>
					<input class="uni-input" name="delegateId" placeholder="请输入委托编号" v-model="form.delegateId" />
				</view>
				<view class="uni-form-item uni-column">
					<view class="tp">案件编号</view>
					<input class="uni-input" name="lawcaseId" placeholder="请输入案件编号" v-model="form.lawcaseId" />
				</view>
				<view class="uni-form-item uni-column">
					<view class="tp">创建人编号</view>
					<input class="uni-input" name="createUid" placeholder="请输入创建人编号" v-model="form.createUid" />
				</view>
				<view class="uni-btn-v "><button form-type="submit" class="step">完成</button></view>
			</form>
		</view>
	</view>
</template>

<script>
import { mapState } from 'vuex';

export default {
	data() {
		return {
			form: {
				sampleType: '',
				sampleTypeName: '',
				sampleName: '',
				sampleSource: '',
				sampleOwnerCardNo: '',
				sampleOwnerCardName: '',
				sampleOwnerCardType: '',
				sampleBrand: '',
				sampleModel: '',
				sampleColor: '',
				passwordType: '',
				passwordName: '',
				samplePassword: '',
				remark: '',
				delegateId: '',
				lawcaseId: '',
				createUid: ''
			},
			sourceList: [{ name: '扣押' }, { name: '受害人提供' }, { name: '其他' }],
			icardTypeList: [
				{
					sampleOwnerCardType: 1,
					sampleOwnerCardName: '身份证'
				},
				{
					sampleOwnerCardType: 2,
					sampleOwnerCardName: '警官证'
				}
			],
			pwdTypeList: [
				{
					passwordType: '1',
					passwordName: '九宫格'
				},
				{
					passwordType: '2',
					passwordName: '普通密码'
				},
				{
					passwordType: '3',
					passwordName: '未设密码'
				},
				{
					passwordType: '4',
					passwordName: '有密未知'
				}
			],
			sourceIndex: -1,
			icardIndex: -1,
			pwdIndex: -1,
			index: -1,
			sampIndex: -1,
			sampleList: [],
			title: ''
		};
	},
	computed: {
		...mapState(['entrustInfo'])
	},
	onLoad(option) {
		console.log(this.entrustInfo)
		const { delegateId, lawcaseId, createUid, sampleType } = this.entrustInfo;
		this.sampleList = Object.values(sampleType);
		this.form.delegateId = delegateId;
		this.form.lawcaseId = lawcaseId;
		this.form.createUid = createUid;

		const info = JSON.parse(option.item);
		console.log(JSON.stringify(info))
		if (info.sampleId) {
			// this.form = info;
			
			this.title = info.sampleName;
			uni.setNavigationBarTitle({
				title: this.title
			});
		}
	},
	methods: {
		sourceBindPickerChange(e) {
			this.sourceIndex = e.detail.value;
			this.form.sampleSource = this.sourceList[this.sourceIndex].name;
		},
		samplePickerChange(e) {
			this.sampIndex = e.detail.value;
			this.form.sampleTypeName = this.sampleList[this.sampIndex];
			const currentKey = this.$utils.findKey(this.entrustInfo.sampleType, this.sampleList[this.sampIndex]);
			this.form.sampleType = currentKey;
		},
		pwdBindPickerChange: function(e) {
			this.pwdIndex = e.detail.value;
			this.form.passwordName = this.pwdTypeList[this.pwdIndex].passwordName;
			this.form.passwordType = this.pwdTypeList[this.pwdIndex].passwordType;
		},
		cardBindPickerChange: function(e) {
			this.icardIndex = e.detail.value;
			this.form.sampleOwnerCardName = this.icardTypeList[this.icardIndex].sampleOwnerCardName;
			this.form.sampleOwnerCardType = this.icardTypeList[this.icardIndex].sampleOwnerCardType;
		},
		formSubmit() {
			const {
				sampleType,
				sampleName,
				sampleSource,
				sampleOwner,
				sampleOwnerCardType,
				sampleOwnerCardNo,
				sampleBrand,
				sampleModel,
				sampleColor,
				passwordType,
				samplePassword,
				remark,
				delegateId,
				lawcaseId,
				createUid
			} = this.form;

			const params = {
				sampleType,
				sampleName,
				sampleSource,
				sampleOwner,
				sampleOwnerCardType,
				sampleOwnerCardNo,
				sampleBrand,
				sampleModel,
				sampleColor,
				passwordType,
				samplePassword,
				remark,
				delegateId,
				lawcaseId,
				createUid
			};
			console.log('参数' + JSON.stringify(params));
			this.$Request.post(this.$api.addSample, params).then(res => {
				console.log('成功');
				uni.showToast({
					title: '新增成功！',
					icon: 'none'
				});
				uni.$emit('globleEvent', { type: 1 });
				uni.navigateBack({
					delta: 1
				});
			});
		},
		formReset() {}
	}
};
</script>

<style lang="less" scoped>
.uni-input {
	border: 1px solid #eee;
}
uni-textarea {
	width: 100% !important;
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
