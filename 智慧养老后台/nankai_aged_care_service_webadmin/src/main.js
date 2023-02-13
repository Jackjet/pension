import 'core-js/stable';
import 'regenerator-runtime/runtime';
// import 'babel-polyfill'

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import Element from 'element-ui'
import VueCookie from 'vue-cookies'
import util from 'js/common'
import http from 'static/index'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import './assets/iconfont/iconfont.css'
import errorImg from '@/assets/image/error.png'
import 'swiper/css/swiper.css'
import 'base/global.scss'

import 'core-js/stable'
import 'regenerator-runtime/runtime'

import VueJsonp from 'vue-jsonp'
Vue.use(VueJsonp)

Vue.config.productionTip = false

/**
 * 钩子函数 判断路由是否通过登录页面.
 * @param route 即将进入的路由对象.
 * @param routeFrom 当前导航即将离开的路由.
 * @param routeNext 终止导航.
 */

router.beforeEach((route, routeFrom, routeNext) => {
  if (route.matched.length === 0) {
    routeNext('/404')
    return false
  }
  if (route.matched.some(record => record.meta.requireAuth)) {
    // 抓取登录状态如果未登录返回登录页面
    if (!util.session('currentUser')) {
      routeNext('/login')
    } else {
      routeNext()
    }
  } else {
    routeNext()
  }
  if (window.__axiosPromiseArr) {
    window.__axiosPromiseArr.forEach((ele, index) => {
      ele.cancel()
      delete window.__axiosPromiseArr[index]
    })
  }
})

axios.interceptors.request.use(
  function (config) {
    config.cancelToken = new axios.CancelToken(
      cancel => {
        if (!window.__axiosPromiseArr) {
          window.__axiosPromiseArr = []
        }
        window.__axiosPromiseArr.push({ cancel })
      }
    )
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)



Vue.use(Element)
Vue.use(VueAwesomeSwiper, /* { default options with global component } */)

Vue.prototype.$axios = axios
Vue.prototype.api = http.port
Vue.prototype.request = http.request
Vue.prototype.common = util
Vue.prototype.errorImg = errorImg
Vue.prototype.cookies = VueCookie

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
