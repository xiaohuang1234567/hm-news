/**
 * 全局注册组件
 */
import Vue from 'vue'
import HmHeader from '../components/hm-Header.vue'
import HmLogo from '../components/hm-Logo.vue'
import HmNavBar from '../components/hm-NavBar.vue'

// 全局注册组件
Vue.component('hm-header', HmHeader)
Vue.component('hm-logo', HmLogo)
Vue.component('hm-navbar', HmNavBar)
