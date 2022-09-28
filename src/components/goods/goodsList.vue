<template>
  <div class="goods-wrapper">
    <Navbar title="商品展示"/>
    <ul class="goods-list">
      <li v-for="(good, index) in this.goods" :key="index" class="goods-item">
        <router-link :to="{name: 'goods_detail', params: {gid: good.id}}">
          <img :src="good.img" alt="">
          <h5>{{good.title}}</h5>
          <span>￥{{good.price}}</span>
          <span>{{good.amount}}人付款</span>
        </router-link>
      </li>
    </ul>
    <div v-show="loaded" class="loaded">~没有更多了~</div>
  </div>
</template>

<script>
    export default {
      name: "goodsList",
      data(){
          return{
            goods: '',
            loaded: false,
            page: 1
          }
      },
      methods:{
        loadGoods(){
          this.$axios.get('/api/goods', {params: {page: this.page}})
          .then(res=>{
            if (this.page<2) {
              this.goods = res.data
            } else {
              this.goods = this.goods.concat(res.data)
              if (res.data.length<6) {
                this.loaded = true
                window.removeEventListener('scroll', this.dynamicLoading)
              }
            }
            this.page++
          })
          .catch(err=>{
            console.log('商品获取失败', err)
          })
        },
        dynamicLoading(){
          // scrollTop已滚动高度 scrollHeight整体可滚动高度 clientHeight视窗高度
          const sTop = document.documentElement.scrollTop
          const sHeight = document.documentElement.scrollHeight
          const cHeight = document.documentElement.clientHeight
          // 距离底部200px时发起请求
          if (sTop+cHeight+200>sHeight) {
            this.loadGoods()
          }
        }
      },
      created() {
        this.loadGoods()
      },
      mounted() {
        window.addEventListener('scroll', this.dynamicLoading)
      },
      destroyed() {
        window.removeEventListener('scroll', this.dynamicLoading)
      }
    }
</script>

<style scoped lang="scss">
  .goods-wrapper{
    background: rgba(1,1,1,.1);
  }
  .goods-list{
    width: 100%;
    padding-top: 40px;
    .goods-item{
      width: 240px;
      margin: 3px;
      border-radius: 10px;
      overflow: hidden;
      display: inline-block;
      background: lightblue;
      img{
        width: 100%;
      }
      h5{
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
      }
      span{
        &:first-of-type{
          color: red;
        }
        &:last-of-type{
          font-size: 13px;
        }
      }
    }
  }
  .loaded{
    width: 100%;
    color: grey;
    height: 50px;
    line-height: 50px;
    text-align: center;
  }

</style>
