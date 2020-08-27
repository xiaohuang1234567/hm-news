import Vue from 'vue'
import App from './App.vue'
import router from './router'
// 导入通用的样式
import './styles/base.less'
import './styles/iconfont.css'
// 导入vant
import { Button } from 'vant'
// 导入amfe-flexble库
import 'amfe-flexible'
import HmHeader from './components/hm-Header.vue'
// 全局注册组件
Vue.component('hm-header', HmHeader)

// 导入全局组件
Vue.use(Button)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
