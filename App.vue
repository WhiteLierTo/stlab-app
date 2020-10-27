<script>
export default {
	onLaunch: function() {
		console.log('App Launch');
	},
	onShow: function() {
		console.log('App Show');
	},
	onHide: function() {
		console.log('App Hide');
	}
};
</script>

<style>
/*每个页面公共css */
@import './common/uni.css';

uni-page-body {
	background-color: #fff !important;
}
.uni-textarea-textarea {
	border: 1px solid #eee;
}
</style>
