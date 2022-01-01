<template>
  <div id="app">
    <!--顶部导航栏-->
    <mt-header fixed title="标题过长会隐藏后面的内容啊哈哈哈哈">
      <router-link to="/" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
      <mt-button icon="more" slot="right"></mt-button>
    </mt-header>

    <!--路由组件出口-->
    <router-view/>

    <mt-tabbar fixed v-model="selected">
      <mt-tab-item v-for="(tab,index) in tabs" :key="index" :id="tab.name">
        <img slot="icon" :src="tab.src" alt="">
        <p>{{tab.title}}</p>
      </mt-tab-item>
    </mt-tabbar>
    <!--底部栏-->
<!--    <mt-tabbar fixed v-model="selected">-->
<!--      <mt-tab-item id="home">-->
<!--        <img slot="icon" src="./assets/index.png" alt="">-->
<!--        首页-->
<!--      </mt-tab-item>-->
<!--      <mt-tab-item id="vip">-->
<!--        <img slot="icon" src="./assets/vip.png" alt="">-->
<!--        会员-->
<!--      </mt-tab-item>-->
<!--      <mt-tab-item id="cart">-->
<!--        <img slot="icon" src="./assets/shopcart.png" alt="">-->
<!--        购物车-->
<!--      </mt-tab-item>-->
<!--      <mt-tab-item id="search">-->
<!--        <img slot="icon" src="./assets/search.png" alt="">-->
<!--        搜索-->
<!--      </mt-tab-item>-->
<!--    </mt-tabbar>-->
  </div>
</template>

<script>
import tab1 from './assets/index.png'
import tab2 from './assets/vip.png'
import tab3 from './assets/shopcart.png'
import tab4 from './assets/search.png'
export default {
  name: 'App',
  data(){
    return{
      selected: '',
      tabs: [
        {id:1, title: '首页', src: tab1, name: 'home'},
        {id:2, title: '会员', src: tab2, name: 'vip'},
        {id:3, title: '购物车', src: tab3, name: 'cart'},
        {id:4, title: '搜索', src: tab4, name: 'search'}
      ]
    }
  },
  watch:{
    selected: function () {
      this.$router.push({name:this.selected});
    }
  }
}
</script>
