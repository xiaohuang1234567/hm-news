import Vue from 'vue'
import App from './App.vue'
import router from './router'
// 导入通用的样式
import './styles/base.less'
import './styles/iconfont.css'

// 导入amfe-flexble库
import 'amfe-flexible'
import HmHeader from './components/hm-Header.vue'
import HmLogo from './components/hm-Logo.vue'
import axios from 'axios'

// 导入vant
import Vant from 'vant'
import 'vant/lib/index.css'

// 把axios 挂载到vue原型
Vue.prototype.$axios = axios
// 给axios配置默认的baseURL 基准地址
axios.defaults.baseURL = 'http://localhost:3000'

// 全局注册组件
Vue.component('hm-header', HmHeader)
Vue.component('hm-logo', HmLogo)

// 导入全局组件
Vue.use(Vant)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
