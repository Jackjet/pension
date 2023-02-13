import Vue from 'vue'
import Vuex from 'vuex'
import theme from './module/theme'

import '@babel/polyfill'
Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    theme
  }
})

export default store
