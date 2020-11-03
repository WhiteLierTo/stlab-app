//uni-app已经内置了vuex，所以只要正确引入就好了

import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		entrustInfo: {}
	},
	mutations: {
		changeEntrustInfo(state, entrustInfo) {
			state.entrustInfo = entrustInfo
		}
	},
	actions: {
		updateEntrust({
			commit
		}, payload) {
			commit('changeEntrustInfo', payload)
		}
	}
})


export default store
