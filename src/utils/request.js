/**
 * 处理axios的发送请求
 */
import Vue from 'vue'
import axios from 'axios'
import router from '../router'
import { Toast } from 'vant'

// 把axios 挂载到vue原型
Vue.prototype.$axios = axios
// 给axios配置默认的baseURL 基准地址
const URL = 'http://localhost:3000'
axios.defaults.baseURL = '/api'
Vue.prototype.$base = URL
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
Vue.prototype.$url = function(url) {
  if (url.startsWith('http')) {
    // 网络图片
    return url
  } else {
    return URL + url
  }
}
