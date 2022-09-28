<template>
  <div id="app">
    <!--顶部导航栏-->
    <mt-header fixed title="标题过长会隐藏后面的内容啊哈哈哈哈">
      <router-link v-if="this.selected!=='home'" to="/" slot="left">
        <mt-button icon="back">首页</mt-button>
      </router-link>
      <mt-button icon="more" slot="right"></mt-button>
    </mt-header>

    <!--路由组件出口-->
    <transition name="fade" mode="out-in">
          <router-view/>
    </transition>

    <!--底部栏-->
    <mt-tabbar fixed v-model="selected">
      <mt-tab-item v-for="(tab,index) in tabs" :key="index" v-bind:id="tab.name">
<!--        <img slot="icon" :src="tab.src" alt="">-->
        <svg class="icon" aria-hidden="true">
          <use :xlink:href="tab.attrs"></use>
        </svg>
        <mt-badge size="small" color="#FC0107" v-if="index===2">{{cartNum}}</mt-badge>
        <p>{{tab.title}}</p>
      </mt-tab-item>
    </mt-tabbar>
  </div>
</template>

<script>
export default {
  name: 'App',
  data(){
    return{
      selected: '',
      tabs: [
        {id:1, title: '导航', attrs:'#icon-shouye', src: 'static/main/index.png', name: 'home'},
        {id:2, title: '会员', attrs:'#icon-huiyuan', src: 'static/main/vip.png', name: 'vip'},
        {id:3, title: '购物车', attrs:'#icon-gouwuche', src: 'static/main/shopcart.png', name: 'cart'},
        {id:4, title: '搜索', attrs:'#icon-sousuo', src: 'static/main/search.png', name: 'search'}
      ],
      // cartNum: this.$myGoods.getTotal()
    }
  },
  watch: {
    selected: function () {
      if (this.selected !== this.$route.path.split('/').pop()) {
        this.$router.push({name:this.selected});
      }
    }
  },
  computed: {
    cartNum(){
      return this.$store.getters.getCartNum
    }
  },
  created() {
    this.selected = this.$route.path.split('/').pop()
    this.$store.commit('changeCartNum', this.$myGoods.getTotal())
    // this.$bus.$on('addToCart', (data)=>{
    //   this.cartNum += data
    // })
  },
  updated() {
    this.selected = this.$route.path.split('/').pop()
  }
}
</script>
<style scoped lang="scss">
  .mint-badge{
    position: absolute;
    right: 160px;
    top: 2px;
  }
  .fade-enter-active, .fade-leave-active{
    transition: opacity 0.5s;
  }
  .fade-enter, .fade-leave-to{
    opacity: 0;
  }
  .icon {
    height: 2.5em;
    width: 2.5em;
  }
</style>
