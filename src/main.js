import Vue from 'vue'
import App from './App.vue'
import router from './router'
// 导入通用的样式
import './styles/base.less'
import './styles/iconfont.css'

import HmHeader from './components/hm-Header.vue'
import HmLogo from './components/hm-Logo.vue'
import HmNavBar from './components/hm-NavBar.vue'
import axios from 'axios'
import moment from 'moment'

// 导入vant
import Vant, { Toast } from 'vant'
import 'vant/lib/index.css'
// 导入amfe-flexble库
import 'amfe-flexible'

// 把axios 挂载到vue原型
Vue.prototype.$axios = axios
// 给axios配置默认的baseURL 基准地址
axios.defaults.baseURL = 'http://localhost:3000'
// 给axios配置请求拦截器
axios.interceptors.request.use(function(config) {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = token
  }
  // config指的是请求的配置信息
  return config
})
// 配置响应拦截器
axios.interceptors.response.use(function(response) {
  const { statusCode, message } = response.data
  if (statusCode === 401 && message === '用户信息验证失败') {
    // 1. 跳转到登录页面
    router.push('/login')
    // 2. 清除失效的信息
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
    // 3. 给提示 用户验证失败
    Toast.fail('登录信息失效')
  }
  return response
})

// 定义全局过滤器
Vue.filter('time', input => {
  return moment(input).format('YYYY-MM-DD')
})

// 全局注册组件
Vue.component('hm-header', HmHeader)
Vue.component('hm-logo', HmLogo)
Vue.component('hm-navbar', HmNavBar)

// 导入全局组件
Vue.use(Vant)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
