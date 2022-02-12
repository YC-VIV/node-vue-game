import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'

import http from '../src/http'
// 挂载到vue的原型中，以便实例能通过this调用axios内部的方法
Vue.prototype.$http = http

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
