<template>
    <div class="comment">
      <div class="c-head">
        <span>我要评论</span>
        <span>返回</span>
      </div>
      <textarea class="c-area" v-model="content" cols="50" rows="10"></textarea>
      <mt-button type="primary" size="large" @click="publishComment">发表评论</mt-button>
      <div class="c-head">
        <span>评论列表</span>
        <span>{{commentList.length}}条评论</span>
      </div>
      <ul class="cl-body">
        <li v-for="(comment, index) in commentList" :key="index">
          {{comment.user}}：{{comment.text}} {{comment.updated|relativeTime}}
        </li>
      </ul>
      <mt-button v-if="moreComment" type="danger" size="large" @click="loadComment">加载更多</mt-button>
      <div v-else class="no-more">~评论到底了~</div>
    </div>
</template>

<script>
    export default {
      name: "Comment",
      data() {
        return{
          commentList: '',
          idd: this.$route.path.split('/').pop(),
          moreComment: true,
          content: '',
          page: 1
        }
      },
      methods: {
        loadComment() {
          this.$axios.get('/api/comments', {params: {id : this.idd, page: this.page}})
          .then(res=>{
            if (res.data.length === 0) {
              // 没有数据了则隐藏加载更多按钮
              this.moreComment = false
            } else {
              if (this.page<2) {
                this.commentList = res.data
              } else {
                this.commentList = this.commentList.concat(res.data)
              }
              this.page++
            }
          })
          .catch(err=>{
            console.log('评论获取失败', err)
          })
        },
        publishComment() {
          this.$axios.post('/api/comments', {id: this.idd, user: '匿名用户', updated: this.getTime(), text: this.content})
          .then(res=>{
            this.content = ''
            this.moreComment = true
            this.page = 1
            this.loadComment()
          })
          .catch(err=>{
            console.log('发表评论失败', err)
          })
        }
      },
      created() {
        this.loadComment()
      }
    }
</script>

<style scoped lang="scss">
  .comment{
    .c-head{
      margin-top: 20px;
      width: 100%;
      padding: 0 5px;
      display: flex;
      justify-content: space-between;
    }
    .c-area{
      width: 100%;
    }
    .cl-body li{
      padding: 5px;
      border-bottom: 1px solid rgba(1,1,1,.2);
      &:last-of-type{
        border: none;
      }
    }
    .no-more{
      text-align: center;
      padding: 5px;
      color: grey;
    }
  }
</style>
