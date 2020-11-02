import Vue from 'vue'
import App from './App'
import httpApi from './common/httpApi'
import HttpRequest from './common/httpRequest'
import HttpCache from './common/cache'
import toast from './common/toast.js'
import utils from './common/utils.js'

Vue.config.productionTip = false
Vue.prototype.$api = httpApi
Vue.prototype.$Request = HttpRequest
Vue.prototype.$toast = toast
Vue.prototype.$SysCache = HttpCache
Vue.prototype.$utils = utils

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
