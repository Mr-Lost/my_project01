<template>
  <div class="news-detail">
    <Navbar title="新闻详情"/>
    <div class="news-wrapper">
      <div class="news-head">
        <h3>{{news.title}}</h3>
        <div class="news-vt">
          <span>点赞数:{{news.liked}}</span>
          <span>发布时间:{{news.published|convertTime('YYYY-MM-DD hh:mm')}}</span>
          <span>分类:{{news.category}}</span>
          <span>来源:{{news.author}}</span>
        </div>
      </div>
      <div class="news-body" v-html="news.content"></div>
    </div>
  </div>
</template>

<script>
    export default {
      name: "NewsDetail",
      props: ['title'],
      data(){
        return{
          news: '',
          nid: this.$route.path.split('/').pop(),
        }
      },
      created() {
        this.$axios.post('/api/news_detail', {id: this.nid})
        .then(res=>{
          this.news = res.data[0]
        })
        .catch(err=>{
          console.log('新闻详情获取失败', err)
        })
      },
      watch: {
        news(){
          this.$nextTick(()=>{
            let imgs = document.getElementsByTagName('img')
            for(let i=0; i<imgs.length; i++){
              imgs[i].style.maxWidth = '500px'
            }
          })
        }
      }
    }
</script>

<style scoped lang="scss">
  .news-wrapper{
    padding-top: 40px;
    margin: 5px;
    overflow: hidden;
    .news-head{
      h3{
        width: 100%;
        text-align: center;
        margin: 10px 0;
      }
      .news-vt{
        display: flex;
        justify-content: space-around;
        margin: 10px 0;
        font-size: 13px;
      }
    }
  }
</style>
