import Vue from 'vue'
import App from './App.vue'
import router from './router'
// 导入通用的样式
import './styles/base.less'
import './styles/iconfont.css'

// 全局注册组件
import './utils/global'
// 全局配置axios的发送请求
import './utils/request.js'
// 全局注册过滤器
import './utils/filters'
// 全局导入vant
import './utils/vant'
// 导入amfe-flexble库
import 'amfe-flexible'

Vue.config.productionTip = false

// 创建bus
const bus = new Vue()
// 把bus挂载到Vue原型
Vue.prototype.$bus = bus
bus.$on('reply', function() {
  console.log('bus的reply')
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
