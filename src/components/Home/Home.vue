<template>
  <div id="home">
    <!-- 轮播图 -->
    <mt-swipe :auto="4000" class="swiper">
      <mt-swipe-item v-for="(item, index) in imgs" :key="index">
        <img :src="item.url" alt="">
      </mt-swipe-item>
    </mt-swipe>
    <div class="list">
      <ul>
        <li v-for="(grid,index) in grids" :key="index">
          <router-link :to="grid.router">
<!--            <img :src="grid.src" alt="">-->
            <svg class="icon" aria-hidden="true">
              <use :xlink:href="grid.attrs"></use>
            </svg>
          </router-link>
          <p>{{grid.title}}</p>
        </li>
      </ul>
    </div>
  </div>
</template>


<script>
import li1 from '../../assets/list/list1.png'
import li2 from '../../assets/list/list2.png'
import li3 from '../../assets/list/list3.png'
import li4 from '../../assets/list/list4.png'
import li5 from '../../assets/list/list5.png'
import li6 from '../../assets/list/list6.png'

export default {
  name: 'Home',
  data(){
    return{
      imgs: '',
      grids: [
          {id:0, attrs: '#icon-xinwendongtai', src: li1, title: '新闻资讯', router: {name: 'news_list'}},
          {id:1, attrs: '#icon-Story', src: li2, title: '图文分享', router: {name: 'photos', params: {cid: 0}}},
          {id:2, attrs: '#icon-taobao', src: li3, title: '商品展示', router: {name: 'goods'}},
          {id:3, attrs: '#icon-luntanzixun', src: li4, title: '资讯', router: {name: 'news_list'}},
          {id:4, attrs: '#icon-bangzhuyufankui', src: li5, title: '留言反馈', router: {name: 'news_list'}},
          {id:5, attrs: '#icon-lianxiwomen', src: li6, title: '联系我们', router: {name: 'news_list'}}
        ]
    }
  },
  created() {
    this.$axios.get('/api/carousel')
    .then(res=>{
      this.imgs = res.data;
    })
    .catch(err=>{
      console.log('轮播图异常', err);
    })
  },
}
</script>

<style lang="scss" scoped>
  .swiper{
    width: 100%;
    height: 20vh;
    min-height: 210px;
    text-align: center;
  }
  .swiper .mint-swipe-items-wrap .mint-swipe-item img{
    width: 100vw;
    height: 210px;
    max-width: 444px;
  }
  .list ul{
    display: flex;
    flex-wrap: wrap;
    margin-top: 10px;
    li{
      height: 150px;
      width: 33%;
      text-align: center;
      img{
        width: 100px;
        height: 100px;
      }
    }
  }
  .icon {
    width: 4em;
    height: 4em;
  }
</style>
