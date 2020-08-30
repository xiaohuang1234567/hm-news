import Vue from 'vue'
import VueRouter from 'vue-router'
// 导入组件
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import User from '../views/User.vue'

Vue.use(VueRouter)

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
const routes = [
  // 指定的每一个路由规则都可以提供一个name属性
  { path: '/login', component: Login, name: 'login' },
  {
    path: '/register',
    component: Register,
    name: 'register'
    // beforeEnter(to, from, next) {

    // }
  },
  { path: '/user', component: User, name: 'user' }
]

const router = new VueRouter({
  routes
})
// 配置全局的导航守卫
// to 到哪里去
// from 从哪里来
// next 函数 代表是否放行
// 判断 to的path是否/user 判断用户是否去个人中心
// 1. 如果不是去个人中心 next() 放行
// 2. 如果是去个人中心 判断是否有token
// 如果有 放行 如果没有 跳转到登录
router.beforeEach(function(to, from, next) {
  // 只要路由发送跳转 跳转之前这个函数就要执行
  // console.log('to', to)
  // console.log('from', from)
  // if (to.name === 'user') {
  //   if (token) {
  //     next()
  //   } else {
  //     router.push('/login')
  //   }
  // } else {
  //   next()
  // }
  const token = localStorage.getItem('token')
  if (to.name !== 'user' || token) {
    next()
  } else {
    router.push('/login').catch(err => err)
  }
})

// router.afterEach()

export default router
