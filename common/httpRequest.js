import configdata from './config'
import cache from './cache'

module.exports = {
	config: function(name) {
		var info = null;
		if (name) {
			var name2 = name.split("."); //字符分割
			if (name2.length > 1) {
				info = configdata[name2[0]][name2[1]] || null;
			} else {
				info = configdata[name] || null;
			}
			if (info == null) {
				let web_config = cache.get("web_config");
				if (web_config) {
					if (name2.length > 1) {
						info = web_config[name2[0]][name2[1]] || null;
					} else {
						info = web_config[name] || null;
					}
				}
			}
		}
		return info;
	},
	post: function(url, data, headerType) {
		headerType = headerType || "application/json";
		var header = {
			"content-type": headerType,
		}
		// const token = cache.get("token")
		const token = '3796c87f-1b2a-473e-bc34-f7a2e9e03e74'
		if (token) {
			header.Authorization = "Bearer " + token
		}
		url = this.config("APIHOST") + url;

		return new Promise((succ, error) => {
			uni.request({
				url: url,
				data: data,
				method: "POST",
				header: header,
				success: function(result) {
					if (result.data.code == 401) {
						uni.reLaunch({
							url: "/pages/login/login"
						})
						return
					}
					succ.call(self, result.data)
				},
				fail: function(e) {
					error.call(self, e)
				}
			})
		})
	},
	get: function(url, data, headerType) {
		headerType = headerType || "application/x-www-form-urlencoded";
		var header = {
			"content-type": headerType
		}
		// const token = cache.get("token")
		const token = '3796c87f-1b2a-473e-bc34-f7a2e9e03e74'
		if (token) {
			header.Authorization = "Bearer " + token
		}
		// let tempUrl = url.slice(0, 10);
		// if (tempUrl === 'mini/login') {
		// 	header.Authorization = ''
		// }
		url = this.config("APIHOST") + url;
		return new Promise((succ, error) => {
			uni.request({
				url: url,
				data: data,
				method: "GET",
				header: header,
				success: function(result) {
					if (result.data.code == 401) {
						uni.reLaunch({
							url: "/pages/login/login"
						})
						return
					}
					succ.call(self, result.data)
				},
				fail: function(e) {
					error.call(self, e)
				}
			})
		})
	},
	// 上传图片封装
	uploadFile: function(obj) {
		let url = obj.url;
		let filePath = obj.filePath; //要上传文件资源的路径。
		let formData = obj.formData || {};
		let success = obj.success;
		let name = obj.name || 'filePath'; //文件对应的 key 
		let header = {};
		// const token = cache.get("token")
		const token = '3796c87f-1b2a-473e-bc34-f7a2e9e03e74'
		if (token) {
			header.Authorization = "Bearer " + token
		}
		let url1 = this.config("APIHOST") + url;
		uni.uploadFile({
			url: url1,
			filePath: filePath,
			name: name,
			formData: formData,
			header: header,
			success: function(res) {
				success(res)
			},
			fail: function(res) {},
			complete: function(res) {},
		})
	}
}
