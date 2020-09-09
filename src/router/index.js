import Vue from 'vue'
import VueRouter from 'vue-router'
// 导入组件
import Login from '../views/user/Login.vue'
import Register from '../views/user/Register.vue'
import User from '../views/user/User.vue'
import UserEdit from '../views/user/UserEdit.vue'
import MyFollow from '../views/user/MyFollow.vue'
import MyComment from '../views/user/MyComment.vue'
import MyStar from '../views/user/MyStar.vue'
import Index from '../views/news/Index.vue'
import Manage from '../views/news/Manage.vue'
import PostDetail from '../views/news/PostDetail.vue'
import Search from '../views/news/Search.vue'

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
  { path: '/user', component: User, name: 'user' },
  {
    path: '/user-edit',
    component: UserEdit,
    name: 'user-edit'
  },
  {
    path: '/myfollow',
    component: MyFollow,
    name: 'myfollow'
  },
  {
    path: '/mycomment',
    component: MyComment,
    name: 'mycomment'
  },
  {
    path: '/mystar',
    component: MyStar,
    name: 'mystar'
  },
  {
    path: '/',
    component: Index,
    name: 'index'
  },
  {
    path: '/manage',
    component: Manage,
    name: 'manage'
  },
  {
    path: '/post-detail/:id',
    component: PostDetail,
    name: 'post-detail'
  },
  {
    path: '/search',
    component: Search,
    name: 'search'
  }
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
  // 需要拦截的所有的页面
  const authUrls = ['/user', '/user-edit', '/myfollow', '/mycomment', '/mystar']
  if (!authUrls.includes(to.path) || token) {
    next()
  } else {
    router.push('/login').catch(err => err)
  }
})

// router.afterEach()

export default router
