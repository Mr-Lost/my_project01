import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home/Home'
import Cart from '@/components/Cart/Cart'
import Vip from '@/components/Vip/Vip'
import Search from '@/components/Search/Search'

// 使用vue-router插件 Vue.prototype.$router = Router;
Vue.use(Router)

export default new Router({
  // 匹配的路由规则
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/cart',
      name: 'cart',
      component: Cart
    },
    {
      path: '/vip',
      name: 'vip',
      component: Vip
    },
    {
      path: '/search',
      name: 'search',
      component: Search
    }
  ]
})
