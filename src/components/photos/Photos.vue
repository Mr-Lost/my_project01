<template>
  <div id="photos">
    <Navbar title="图文分享"/>
    <div class="photo-wrapper">
      <ul id="plist" class="photo-list">
        <li v-for="(cat, index) in catList" :key="index">
          <a :class="{acctive:index===currentCat}" :to="{name: 'photos', params: {cid: cat.id}}"  @click="categoryHandler(cat.id, index)">
            {{cat.catname}}
          </a>
        </li>
      </ul>
      <ul class="photo-items">
        <li v-for="(photo, index) in photoList" :key="index" class="photo-item">
          <router-link :to="{name: 'photo_detail', params: {pid: photo.id}}">
            <img v-lazy="photo.src" alt="">
            <p>{{photo.description}}</p>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
    export default {
      name: "Photos",
      props: ['title'],
      data(){
        return{
          catList: '',
          photoList: '',
          currentCat: 0
        }
      },
      methods: {
        load_categories(){
          this.$axios.get('/api/photos_category')
          .then(res=>{
            this.catList = res.data
            this.catList.unshift({'id': 0, 'catname': '推荐'})
          })
          .catch(err=>{
            console.log('图文列表获取失败', err)
          })
        },
        load_photos(id){
          this.$axios.post('/api/photos_list', {id: id})
          .then(res=>{
            this.photoList = res.data
          })
          .catch(err=>{
            console.log('图文详情获取失败', err)
          })
        },
        // 路由切换
        categoryHandler(id, index){
          this.$router.push({name:'photos', params:{cid: id}})
          this.currentCat = index
        }
      },
      // 动态路由跳转时更新数据，重新渲染页面
      beforeRouteUpdate(to, from, next){
        this.load_photos(to.params.cid)
        console.log('beforeRouteUpdate')
        next()
      },
      created() {
        this.currentCat = this.$route.params.cid
        this.$axios.all([this.load_categories(), this.load_photos(this.currentCat)])
        console.log('created')
      },
      updated() {
        this.currentCat = this.$route.params.cid
        let temp = document.querySelectorAll('#plist>li>a')
        console.log('updated', this.currentCat, this.photoList.length)
        for(let i=0; i<temp.length; i++){
          temp[i].classList.remove('active')
        }
        temp[this.currentCat].classList.add('active')
      }
    }
</script>

<style scoped lang="scss">
  image[lazy=loading]{
    width: 50%;
    height: 150px;
    margin: auto;
  }
  .active{
    pointer-events: none;
  }
  .photo-wrapper{
    padding-top: 40px;
    .photo-list{
      height: 30px;
      overflow-x: scroll;
      display: -webkit-box;
      li{
        padding: 5px 10px;
        .active{
          color: rgb(186, 92, 92);
        }
      }
    }
    .photo-items{
      .photo-item{
        position: relative;
        img{
          width: 100%;
          height: 300px;
          background-size: cover;
        }
        p{
          position: absolute;
          bottom: 0;
          padding: 10px;
          width: 100%;
          background: rgba(255,255,255,0.5);
        }
      }
    }
  }
</style>
