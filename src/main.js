// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Axios from "axios"

Vue.config.productionTip = false

// 使用Mint-UI 引入全部组件
import Mint from 'mint-ui'
Vue.use(Mint)
import 'mint-ui/lib/style.min.css'
import '../static/css/main.css'

// 配置公共的URL
// Axios.defaults.baseURL = 'http://www.sinya.online/api/';
Vue.prototype.$axios = Axios;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
