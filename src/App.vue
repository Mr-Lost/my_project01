<template>
  <div id="app">
    <!--顶部导航栏-->
    <mt-header fixed title="标题过长会隐藏后面的内容啊哈哈哈哈">
      <template v-if="this.$route.path.split('/').length>2">
        <mt-button icon="back" @click="goBack" slot="left"></mt-button>
        <mt-button slot="left" id="go-home" @click="goHome">首页</mt-button>
      </template>
      <mt-button id="go-top" slot="right" @click="goTop">顶部</mt-button>
      <mt-button icon="more" slot="right"></mt-button>
    </mt-header>

    <!--路由组件出口-->
    <transition name="fade" mode="out-in">
          <router-view />
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
      if (this.selected !== this.$route.path.split('/')[1]) {
        this.$router.push({name:this.selected});
      }
    }
  },
  computed: {
    cartNum(){
      return this.$store.getters.getCartNum
    }
  },
  methods: {
    goBack(){
      this.$router.go(-1)
    },
    goHome(){
      this.$router.push({name: 'home'})
    },
    goTop(){
      window.scrollTo({top: 0, behavior: "smooth"})
    }
  },
  created() {
    this.selected = this.$route.path.split('/')[1]
    this.$store.commit('changeCartNum', this.$myGoods.getTotal())
    // this.$bus.$on('addToCart', (data)=>{
    //   this.cartNum += data
    // })
  },
  mounted() {
    // 刚进入或刚退回或刷新页面时，判断回顶部按钮是否显示
    if(scrollY < innerHeight){
      document.getElementById('go-top').style.display = 'none'
    }
    // 监听垂直方向上的滚动距离，判断回顶部按钮是否显示
    window.addEventListener('scroll', function () {
      if(scrollY > innerHeight){
        document.getElementById('go-top').style.display = 'inline-block'
      } else {
        document.getElementById('go-top').style.display = 'none'
      }
    })
  },
  updated() {
    this.selected = this.$route.path.split('/')[1]
  }
}
</script>

<style scoped lang="scss">
  body{
    animation: .5s;
  }
  #go-home{
    margin-left: 10px;
  }
  #go-top{
    margin-right: 10px;
  }
  .mint-tab-item{
    position: relative;
  }
  .mint-badge{
    position: absolute;
    left: calc(50% - 30px);
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
