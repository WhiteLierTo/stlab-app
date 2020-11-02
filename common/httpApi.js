/**
 * API接口配置文件
 */

module.exports = {
	// miniLogin: (mini, programId) => {
	// 	return 'mini/login/' + mini + '/' + programId
	// },
	// login: 'login', // 用户登录
	delegateInfo: 'delegateInfo', // 委托人信息，委托单位和案件类型
	upload: 'upload', // 证件照上传
	step1: 'step1', //委托登记第一步保存
	addSample: 'addSample', //添加检材
	selectSampleList: 'selectSampleList', //检材列表
	delSample: 'delSample', //删除检材
	step2: 'step2', //第二个下一步
	nasUpload:'nasUpload',//立案决定书、受案登记表、扣押清单、其他材料图片上传
	submitDelegate: 'submitDelegate', //提交委托
	delegateNoticeList: 'delegateNoticeList', //消息通知
	updateDelegateNotice:'updateDelegateNotice',//修改消息通知为已读
}
