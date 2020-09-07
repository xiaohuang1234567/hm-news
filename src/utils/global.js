/**
 * 全局注册组件
 */
import Vue from 'vue'
import HmHeader from '../components/hm-Header.vue'
import HmLogo from '../components/hm-Logo.vue'
import HmNavBar from '../components/hm-NavBar.vue'
import HmPost from '../components/hm-post.vue'
import HmComment from '../components/HmComment.vue'
import HmFollow from '../components/hm-Follow.vue'

// 全局注册组件
Vue.component('hm-header', HmHeader)
Vue.component('hm-logo', HmLogo)
Vue.component('hm-navbar', HmNavBar)
Vue.component('hm-post', HmPost)
Vue.component('hm-comment', HmComment)
Vue.component('hm-follow', HmFollow)
