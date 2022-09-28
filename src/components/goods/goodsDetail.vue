<template>
    <div class="goods-detail">
      <Navbar title="商品详情"/>
      <mt-swipe :auto="4000" class="swiper">
        <mt-swipe-item v-for="(item, index) in imgs" :key="index">
          <img :src="item.img" alt="">
        </mt-swipe-item>
      </mt-swipe>
      <div class="gd-main">
        <h3>{{details.title}}</h3>
        <span class="price">￥{{details.price}}</span>
        <div class="goods-counter">
          <div class="opa-icon" @click="goodsSub">-</div>
          <div class="count-num">{{count}}</div>
          <div class="opa-icon" @click="goodsAdd">+</div>
        </div>
        <mt-button type="primary" size="small">立即购买</mt-button>
        <mt-button type="danger" size="small" @click="ballHandler">
          加入购物车
          <transition name="ball" @after-enter="afterEnter">
            <div class="ball" v-if="isShow"></div>
          </transition>
        </mt-button> 
      </div>
      <div class="gd-detail">
        <div style="height: 500px">商品介绍</div>
        <div>买家评论</div>
      </div>
    </div>
</template>

<script>
  import myGoods from "../../goodsTool";
    export default {
      name: "goodsDetail",
      props: ['title'],
      data(){
        return{
          imgs: '',
          details: '',
          count: 1,
          isShow: false
        }
      },
      methods: {
        goodsSub(){
          if(this.count>1){
            this.count--
          }
        },
        goodsAdd(){
          this.count++
        },
        afterEnter(){
          this.isShow = false
          // this.$bus.$emit('addToCart', this.count)
          this.$store.commit('addCartNum', this.count)
          myGoods.add({id: this.details.id, num: this.count})
        },
        ballHandler(){
          this.isShow = true
        }
      },
      created() {
        const idd = this.$route.params.gid
        window.scroll(0, 0)
        this.$axios.get('/api/goods/detail_imgs', {params: {id: idd}})
        .then(res=>{
          this.imgs = res.data
        })
        .catch(err=>{
          console.log('商品详情图片获取失败', err)
        })
        this.$axios.get('/api/goods/detail', {params: {id: idd}})
        .then(res=>{
          this.details = res.data[0]
        })
        .catch(err=>{
          console.log('商品详情获取失败', err)
        })
      }
    }
</script>

<style scoped lang="scss">
  .goods-detail{
    .swiper {
      height: 440px;
      padding-top: 40px;
      img {
        width: 100%;
        height: 400px;
      }
    }
    .ball-enter-active{
      animation: adding 0.8s ease-out;
    }
    .ball-leave{
      opacity: 0;
    }
    @keyframes adding {
      50%{
        transform: rotate(-150deg) translate(90px, 0);
      }
      100%{
        transform: translate(-80px, 1000px);
      }
    }
    .ball{
      position: absolute;
      z-index: 20;
      margin-top: -20px;
      margin-left: 25px;
      width: 20px;
      height: 20px;
      background: pink;
      border-radius: 50%;
    }
    .gd-main{
      margin: 20px 0;
      .mint-button{
        overflow: visible;
      }
      h3{
        padding: 5px;
      }
      .price{
        color: red;
        font-size: 25px;
      }
      .goods-counter{
        display: inline-block;
        font-size: 20px;
        margin: 0 20px;
        div{
          display: inline-block;
          text-align: center;
        }
        .opa-icon{
          width: 30px;
          height: 30px;
          background: rgba(191, 159, 62, 0.3);
        }
        .count-num{
          width: 60px;
          height: 32px;
          border: 1px solid grey;
        }
      }
    }
  }
  

</style>
