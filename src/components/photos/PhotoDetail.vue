<template>
  <div class="p-d">
    <Navbar title="图文详情"/>
    <div v-if="photoDetail" class="pd-wrapper">
      <h3>{{photoDetail.title}}</h3>
      <div class="pt-vice">
        <span>更新日期：{{photoDetail.updated|convertTime('YYYY-MM-DD')}}</span>
        <span>{{photoDetail.clicked}}次浏览</span>
        <span>分类：{{photoDetail.category}}</span>
      </div>
      <vue-preview :slides="photoImgs"></vue-preview>
      <div v-html="photoDetail.content"></div>
    </div>
    <div v-else class="pd-wrapper">
      当前页面正在开发中......
    </div>
    <Comment />
  </div>
</template>

<script>
    export default {
      name: "PhotoDetail",
      props: ['title'],
      data(){
        return{
          photoDetail: '',
          photoImgs: []
        }
      },
      created() {
        const idd = this.$route.path.split('/').pop()
        // 普通函数的this会指向函数本身，则获取不到$axios
        let getPhotoDetail = ()=>{
          return this.$axios.get('/api/photo_detail', {params: {id: idd}})
        }
        let getPhotoImgs = ()=>{
          return this.$axios.get('/api/photo_images', {params: {pid: idd}})
        }
        this.$axios.all([getPhotoDetail(), getPhotoImgs()])
        .then(this.$axios.spread((acct, perms)=>{
          this.photoDetail = acct.data[0]
          this.photoImgs = perms.data
          this.photoImgs.forEach((item, index)=>{
            item.src = item.bigpic
            item.msrc = item.smallpic
            // 大图的宽高
            item.w = 450
            item.h = 360
          })
        }))
      }
    }
</script>

<style scoped lang="scss">
  .pd-wrapper{
    padding-top: 40px;
  }
  .pt-vice{
    display: flex;
    justify-content: space-around;
    margin: 10px 0;
  }
</style>
<style lang="css">
  .my-gallery figure img{
    width: 150px;
    height: 120px;
  }
  .my-gallery{
    padding: 10px;
    display: grid;
    grid-template-columns: repeat(3, 150px);
    grid-gap: 15px;
  }
</style>
