import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home/Home'
import Cart from '@/components/Cart/Cart';
import Vip from '@/components/Vip/Vip';
import Search from '@/components/Search/Search';
import NewsList from "@/components/news/NewsList"
import NewsDetail from "../components/news/NewsDetail";
import Photos from "../components/photos/Photos";
import PhotoDetail from "../components/photos/PhotoDetail";
import goodsList from "../components/goods/goodsList";
import goodsDetail from "../components/goods/goodsDetail";

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
    },
    {
      path: '/home/news/list',
      name: 'news_list',
      component: NewsList
    },
    {
      path: '/home/news/detail/:nid',
      name: 'news_detail',
      component: NewsDetail
    },
    {
      path: '/home/photos/:cid',
      name: 'photos',
      component: Photos,
    },
    {
      path: '/home/photos/detail/:pid',
      name: 'photo_detail',
      component: PhotoDetail
    },
    {
      path: '/home/goods',
      name: 'goods',
      component: goodsList
    },
    {
      path: '/home/goods/detail/:gid',
      name: 'goods_detail',
      component: goodsDetail
    }
  ]
})
