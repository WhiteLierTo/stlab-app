<template>
	<view>
		<view class="uni-common-mt">
			<form>
				<view class="uni-form-item uni-column">
					<view class="title">立案委托书</view>
					<view class="uni-uploader">
						<view class="uni-uploader-body">
							<view class="uni-uploader__files">
								<block v-for="(image, index) in imageList" :key="index">
									<view class="uni-uploader__file"><image class="uni-uploader__img" :src="image" :data-src="image" @tap="previewImage"></image></view>
								</block>
								<view class="uni-uploader__input-box"><view class="uni-uploader__input" @tap="chooseImage(1)"></view></view>
							</view>
						</view>
					</view>
				</view>
				<view class="uni-form-item uni-column">
					<view class="title">受案登记表</view>
					<view class="uni-uploader">
						<view class="uni-uploader-body">
							<view class="uni-uploader__files">
								<block v-for="(image, index) in imageList1" :key="index">
									<view class="uni-uploader__file"><image class="uni-uploader__img" :src="image" :data-src="image" @tap="previewImage1"></image></view>
								</block>
								<view class="uni-uploader__input-box"><view class="uni-uploader__input" @tap="chooseImage(2)"></view></view>
							</view>
						</view>
					</view>
				</view>
				<view class="uni-form-item uni-column">
					<view class="title">扣押清单</view>
					<view class="uni-uploader">
						<view class="uni-uploader-body">
							<view class="uni-uploader__files">
								<block v-for="(image, index) in imageList2" :key="index">
									<view class="uni-uploader__file"><image class="uni-uploader__img" :src="image" :data-src="image" @tap="previewImage2"></image></view>
								</block>
								<view class="uni-uploader__input-box"><view class="uni-uploader__input" @tap="chooseImage(3)"></view></view>
							</view>
						</view>
					</view>
				</view>
				<view class="uni-form-item uni-column">
					<view class="title">其他材料</view>
					<view class="uni-uploader">
						<view class="uni-uploader-body">
							<view class="uni-uploader__files">
								<block v-for="(image, index) in imageList3" :key="index">
									<view class="uni-uploader__file"><image class="uni-uploader__img" :src="image" :data-src="image" @tap="previewImage3"></image></view>
								</block>
								<view class="uni-uploader__input-box"><view class="uni-uploader__input" @tap="chooseImage(4)"></view></view>
							</view>
						</view>
					</view>
				</view>
			</form>
		</view>
		<view class="info-bottom">
			<view class="pre" @click="preHandle">上一步</view>
			<view class="next" @click="nextHandle">提交</view>
		</view>
	</view>
</template>
<script>
import permision from '@/common/permission.js';
var sourceType = [['camera'], ['album'], ['camera', 'album']];

export default {
	props: ['lawcaseId', 'delegateId'],
	data() {
		return {
			imageList: [],
			imageList1: [],
			imageList2: [],
			imageList3: [],
			imgUrl1: '',
			imgUrl2: '',
			imgUrl3: '',
			imgUrl4: '',
			arr: [],
			arr1: [],
			arr2: [],
			arr3: []
		};
	},
	onUnload() {
		this.imageList = [];
		this.imageList1 = [];
		this.imageList2 = [];
		this.imageList3 = [];
	},
	onLoad() {
		console.log(this.delegateId);
	},
	methods: {
		chooseImage: async function(item) {
			uni.chooseImage({
				count: 9, //图片数量
				success: res => {
					if (item == 1) {
						this.imageList = this.imageList.concat(res.tempFilePaths);
						let imgFiles = res.tempFilePaths[0];

						this.$Request.uploadFile({
							filePath: imgFiles,
							url: 'nasUpload',
							formData: {
								resType: 1,
								oprType: 1,
								lawcaseId: this.lawcaseId,
								delegateId: this.delegateId
							},
							name: 'file',
							success: res => {
								this.arr.push(JSON.parse(res.data).data);
								this.imgUrl1 = this.arr.toString();
							}
						});
					} else if (item == 2) {
						this.imageList1 = this.imageList1.concat(res.tempFilePaths);
						let imgFiles = res.tempFilePaths[0];
						// 上传图片
						this.$Request.uploadFile({
							filePath: imgFiles,
							url: 'nasUpload',
							formData: {
								resType: 2,
								oprType: 1,
								lawcaseId: this.lawcaseId,
								delegateId: this.delegateId
							},
							name: 'file',
							success: res => {
								this.arr1.push(JSON.parse(res.data).data);
								this.imgUrl2 = this.arr1.toString();
							}
						});
					} else if (item == 3) {
						this.imageList2 = this.imageList2.concat(res.tempFilePaths);
						let imgFiles = res.tempFilePaths[0];
						// 上传图片
						this.$Request.uploadFile({
							filePath: imgFiles,
							url: 'nasUpload',
							formData: {
								resType: 3,
								oprType: 1,
								lawcaseId: this.lawcaseId,
								delegateId: this.delegateId
							},
							name: 'file',
							success: res => {
								this.arr2.push(JSON.parse(res.data).data);
								this.imgUrl3 = this.arr2.toString();
							}
						});
					} else if (item == 4) {
						this.imageList3 = this.imageList3.concat(res.tempFilePaths);
						let imgFiles = res.tempFilePaths[0];
						// 上传图片
						this.$Request.uploadFile({
							filePath: imgFiles,
							url: 'nasUpload',
							formData: {
								resType: 4,
								oprType: 1,
								lawcaseId: this.lawcaseId,
								delegateId: this.delegateId
							},
							name: 'file',
							success: res => {
								this.arr3.push(JSON.parse(res.data).data);
								this.imgUrl4 = this.arr3.toString();
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
		previewImage2: function(e) {
			var current = e.target.dataset.src;
			uni.previewImage({
				current: current,
				urls: this.imageList2
			});
		},
		previewImage3: function(e) {
			var current = e.target.dataset.src;
			uni.previewImage({
				current: current,
				urls: this.imageList3
			});
		},
		preHandle() {
			const params = {
				code: 1,
				value: {}
			};
			this.$emit('changeCurrent', params);
		},
		nextHandle() {
			const params = {
				lawcaseId: this.lawcaseId,
				delegateId: this.delegateId,
				lawcaseFiling: this.imgUrl1,
				lawcaseRegister: this.imgUrl2,
				hubLawcaseList: this.imgUrl3,
				lawcaseOther: this.imgUrl4,
				oprFlag: 0,
				registerOrEditSign: 0
			};
			this.$Request.post(this.$api.submitDelegate, params).then(res => {
				if (res.code == 0) {
					uni.showToast({
						title: '提交成功',
						icon: 'none'
					});
				}
			});
		}
	}
};
</script>

<style lang="less">
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
.uni-common-mt {
	margin-bottom: 50px;
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
</style>
