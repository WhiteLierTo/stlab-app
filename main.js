import Vue from 'vue'
import App from './App'
import httpApi from './common/httpApi'
import HttpRequest from './common/httpRequest'
import HttpCache from './common/cache'
import toast from './common/toast.js'

Vue.config.productionTip = false
Vue.prototype.$api = httpApi
Vue.prototype.$Request = HttpRequest
Vue.prototype.$toast = toast
Vue.prototype.$SysCache = HttpCache

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
