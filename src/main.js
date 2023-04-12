// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Axios from "axios"
import Moment from 'moment'

Vue.config.productionTip = false

// 使用Mint-UI 引入全部组件
import Mint from 'mint-ui'
Vue.use(Mint)
import 'mint-ui/lib/style.min.css'
import './assets/css/main.css'

// 图片懒加载
import { Lazyload } from 'mint-ui'
Vue.use(Lazyload)

// 图片查看器
import VuePreview from 'vue-preview'
Vue.use(VuePreview)

import { MessageBox } from "mint-ui"
Vue.prototype.$messageBox = MessageBox

// 上拉下拉加载更多
// import { Loadmore } from 'mint-ui'
// Vue.component(Loadmore.name, Loadmore)

// 请求拦截器
Axios.interceptors.request.use(function (config) {
  // 发送请求前加载提示框
  Mint.Indicator.open('加载中...')
  return config
}, function (error) {
  return Promise.reject(error)
})
// 响应拦截器
Axios.interceptors.response.use(function (response) {
  Mint.Indicator.close()
  return response
}, function (error) {
  return Promise.reject(error)
})

// 配置公共的URL
Axios.defaults.baseURL = 'http://127.0.0.1:8899';
Vue.prototype.$axios = Axios;

Vue.prototype.getTime = function () {
  const n = new Date()
  return n.toLocaleDateString().replace(/\//g, '-')+' '+n.toTimeString().substr(0, 8)
}

// 注册全局组件
import Navbar from "./components/Common/Navbar"
Vue.component(Navbar.name, Navbar)
import Comment from './components/Common/Comment'
Vue.component(Comment.name, Comment)

// 自定义全局过滤器
Moment.locale('zh-cn')
Vue.filter('convertTime', function (data, formatStr) {
  return Moment(data).format(formatStr)
})
Vue.filter('relativeTime', function (data) {
  return Moment(data).fromNow()
})
Vue.filter('convertNum', function (data) {
  let temp
  if(data>=10**9){
    temp = data/(10**9)
    return temp.toFixed(1) + '亿'
  }
  if(data>=10**5){
    temp = data/(10**5)
    return temp.toFixed(1) + '万'
  }
  else{
    return data + ''
  }
})

import eventBus from "./eventBus";
Vue.prototype.$bus = eventBus

import myGoods from "./goodsTool";
Vue.prototype.$myGoods = myGoods

import store from "./store";

Vue.directive('test', {
  inserted: function(a, b, c){
    console.log(a, b, c)
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
