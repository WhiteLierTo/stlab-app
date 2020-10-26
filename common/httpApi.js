/**
 * API接口配置文件
 */

module.exports = {
	miniLogin: (mini, programId) => {
		return 'mini/login/' + mini + '/' + programId
	},
	login: 'login', // 用户登录
}
