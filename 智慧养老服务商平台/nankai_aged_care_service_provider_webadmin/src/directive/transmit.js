import Vue from 'vue'
import adapter from './module/adapter'

// 使用 Event 事件传输
const transmit = new Vue()

Vue.directive('adapter', adapter)
export default transmit
