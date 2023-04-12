<template>
  <div id="news">
<!--    <Navbar title="新闻列表"/>-->
    <ul id="news-list">
      <li class="active">推荐</li>
      <li>热榜</li>
      <li>国际</li>
      <li>国内</li>
      <li>经济</li>
      <li>民生</li>
      <li>视频</li>
      <li>小说</li>
      <li>小说</li>
      <li>小说</li>
    </ul>
    <ul class="news-list">
      <li v-for="(news,index) in newsList" :key="index">
        <router-link :to="{name: 'news_detail', params: {nid: news.id}}">
          <img class="new_img" :src="news.avatar" alt="">
          <div class="content">
            <h4>{{news.title}}</h4>
            <div class="news-desc">
              <p class="summary dot3">{{news.description}}</p>
              <p class="news-vice">
                <span class="praise">点击量:{{news.clicked | convertNum}}</span>
                <span class="time">{{news.published | convertTime('YYYY.MM.DD')}}</span>
              </p>
            </div>
          </div>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
    export default {
      name: "NewsList",
      data(){
        return {
          newsList: ''
        }
      },
      created() {
        this.$axios.get('/api/news_list')
        .then(res=>{
          this.newsList = res.data
        })
        .catch(err=>{
          console.log('新闻列表获取失败', err)
        })
      }
    }
</script>

<style lang="scss" scoped>
  #news-list{
    height: 1.875rem;
    overflow-x: scroll;
    display: -webkit-box;
    position: fixed;
    background: white;
    z-index: 10;
    li{
      /*display: inline-block;*/
      padding-top: 2px;
      margin: 0 5px;
      &.active{
        border-bottom: 2px solid #26a2ff;
        color: #26a2ff;
      }
    }
  }
  .news-list{
    padding-top: 1.875rem;
    li{
      width: 100%;
      padding: 5px;
      height: 10rem;
      border-radius: 10px;
      background-color: rgba(51, 98, 180, 0.1);
      margin-bottom: 5px;
      &:last-child{
        margin-bottom: 0;
      }
      a{
        width: 100%;
        height: 100%;
        display: flex;
        img{
          width: 7.25rem;
          height: 7rem;
          margin: auto;
          background-size: cover;
        }
        .content{
          width: 70%;
          margin: 10px;
          position: relative;
          display: flex;
          flex-direction: column;
          h4{
            color: black;
          }
          .news-desc{
            color: rgba(85, 83, 83, 0.8);
            font-size: 0.875rem;
            .summary{
              -webkit-line-clamp: 2;
            }
            .news-vice{
              position: absolute;
              width: 100%;
              bottom: 0;
              display: flex;
              justify-content: space-between;
              span{
                transform: scale(0.8);
              }
            }
          }
        }
      }
    }
  }
</style>
