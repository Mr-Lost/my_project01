<template>
  <div id="home" class="main">
<!--    轮播图-->
    <mt-swipe :auto="4000" class="swiper">
      <mt-swipe-item v-for="(item,index) in imgs" :key="index">
        <img :src="item.img" alt=""><p>{{index}}</p>
      </mt-swipe-item>
      <mt-swipe-item><img src="/static/lunbo/lunbo3.jpg" alt=""></mt-swipe-item>
    </mt-swipe>
    <div class="list">
      <ul>
        <li v-for="(grid,index) in grids" :key="index">
          <router-link :to="grid.router">
            <img :src="grid.src" alt="">
          </router-link>
          <p>{{grid.title}}</p>
        </li>
        <li v-for="(grid,index) in grids" :key="index">
          <router-link :to="grid.router">
            <img :src="grid.src" alt="">
          </router-link>
          <p>{{grid.title}}</p>
        </li>
        <li v-for="(grid,index) in grids" :key="index">
          <router-link :to="grid.router">
            <img :src="grid.src" alt="">
          </router-link>
          <p>{{grid.title}}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import src1 from '../../assets/lunbo/lunbo1.jpg'
import src2 from '../../assets/lunbo/lunbo2.jpg'

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
      imgs: [{img: src1}, {img: src2}],
      grids: [
          {id:0, src: li1, title: '新闻资讯', router: {name: 'news_list'}},
          {id:1, src: li2, title: '图文分享', router: {name: 'news_list'}},
          {id:2, src: li3, title: '商品展示', router: {name: 'news_list'}},
          {id:3, src: li4, title: '资讯', router: {name: 'news_list'}},
          {id:4, src: li5, title: '留言反馈', router: {name: 'news_list'}},
          {id:5, src: li6, title: '联系我们', router: {name: 'news_list'}},
        ]
    }
  },
  created() {
    this.$axios.get('getlunbo')
    .then(res=>{
      console.log(res.data.message);
      this.imgs = res.data.message;
    })
    .catch(err=>{
      console.log('轮播图异常', err);
    })
  },
}
</script>

<style lang="css" scoped>
  .swiper{
    width: 100%;
    height: 250px;
    background: gray;
  }
  .list ul{
    display: flex;
    flex-wrap: wrap;
    margin-top: 10px;
  }
  .list ul li{
    height: 150px;
    width: 33%;
  }
  .list ul li img{
    width: 100px;
    height: 100px
  }
</style>
