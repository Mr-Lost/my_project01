<template>
<div class="news">
  <div class="newList">
    <ul>
      <li v-for="(news,index) in newsList" :key="index">
        <router-link :to="news.router">
          <div class="new_img">
            <img :src="news.src" alt="">
          </div>
          <div class="content">
            <p class="title">{{news.title}}</p>
            <div class="news-desc">
              <p class="summary">{{news.summary}}</p>
              <p>
                <span class="praise">点赞数：{{news.praise}}</span>
                <span class="time">发表时间：{{news.time}}</span>
              </p>
            </div>
          </div>
        </router-link>
      </li>
    </ul>
  </div>
</div>
</template>

<script>
    import src1 from '../../assets/news/news.jpg'
    export default {
        name: "NewsList",
        data(){
          return {
            newsList: [
              {title: '我爱你中国', src: src1, summary: '我的摘要信息', praise: '23456', time: '2021-12-23', router: {name: 'news_detail'}},
              {title: '我爱你中国', src: src1, summary: '我的摘要信息', praise: '23456', time: '2021-12-23', router: {name: 'news_detail'}},
              {title: '我爱你中国', src: src1, summary: '我的摘要信息', praise: '23456', time: '2021-12-23', router: {name: 'news_detail'}},
              {title: '我爱你中国', src: src1, summary: '我的摘要信息', praise: '23456', time: '2021-12-23', router: {name: 'news_detail'}},
              {title: '我爱你中国', src: src1, summary: '我的摘要信息', praise: '23456', time: '2021-12-23', router: {name: 'news_detail'}},
              {title: '我爱你中国', src: src1, summary: '我的摘要信息', praise: '23456', time: '2021-12-23', router: {name: 'news_detail'}}
            ]
          }
        }
    }
</script>

<style lang="scss" scoped>
  .newList{
    width: 100%;
    border-bottom: 1px solid #cccccc;
    font-size: 12px;
    ul li{
      height: 100px;
      position: relative;
      background-color: gray;
      margin-bottom: 5px;
      :last-child{
        margin-bottom: 0;
      }
      a{
        display: block;
        width: 100%;
        height: 100%;
      }
    }
  }
  .new_img{
    height: 100%;
    width: 150px;
    background-color: red;
    float: left;
  }
  .content .title{
    font-size: 15px;
    display: inline-block;
    color: #131f3c;
    letter-spacing: 0;
    padding-bottom: 7px;
    margin-top: 10px;
  }
  .content .news-desc{
    color: #ff6700;
  }
  .summary{
    padding: 5px 0;
  }
  .time{
    margin-left: 30px;
  }
</style>
