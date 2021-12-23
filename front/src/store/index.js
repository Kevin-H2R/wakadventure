import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null
  },
  mutations: {
    setUser: (state, user) => {
      state.user = user
    },
    setUsername: (state, username) => {
      state.user.username = username
    }
  },
  actions: {
  },
  getters: {
    user: state => state.user
  },
  modules: {
  }
})
