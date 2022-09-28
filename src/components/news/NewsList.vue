<template>
  <div id="news">
    <Navbar title="新闻列表"/>
    <ul class="newList">
      <li v-for="(news,index) in newsList" :key="index">
        <router-link :to="{name: 'news_detail', params: {nid: news.id}}">
          <img class="new_img" :src="news.avatar" alt="">
          <div class="content">
            <h4>{{news.title}}</h4>
            <div class="news-desc">
              <p class="summary">{{news.description}}</p>
              <p class="news-vice">
                <span class="praise">点击量：{{news.clicked}}</span>
                <span class="time">发表时间：{{news.published | convertTime('YYYY.MM.DD')}}</span>
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
  .newList{
    padding-top: 40px;
    li{
      width: 100%;
      padding: 5px;
      height: 150px;
      background-color: rgba(1,1,1,0.2);
      margin-bottom: 10px;
      &:last-child{
        margin-bottom: 0;
      }
      a{
        width: 100%;
        height: 100%;
        display: flex;
        img{
          width: 30%;
          height: 80%;
          margin: auto;
          background-size: cover;
        }
        .content{
          width: 70%;
          padding: 10px;
          position: relative;
          h4{
            color: black;
          }
          .news-desc{
            color: rgba(205, 29, 29, 0.8);
            font-size: 14px;
            .summary{
              padding-top: 10px;
            }
            .news-vice{
              position: absolute;
              width: 90%;
              bottom: 10px;
              display: flex;
              justify-content: space-between;
            }
          }
        }
      }
    }
  }
</style>
