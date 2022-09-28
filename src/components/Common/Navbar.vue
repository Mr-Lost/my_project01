<template>
    <div id="navbar">
      <span class="back" @click="goBack"><</span>
      <h3>{{ this.title }}</h3>
    </div>
</template>

<script>
    export default {
      name: "Navbar",
      props: ['title'],
      methods: {
          goBack () {
            this.$router.go(-1)
          }
      }
    }
</script>

<style scoped>
  #navbar{
    padding: 5px 10px;
    height: 40px;
    width: 100%;
    position: fixed;
    z-index: 2;
    background: rgb(234, 37, 67);
  }
  .back{
    position: absolute;
    left: 0;
    top: 0;
    height: 40px;
    font-size: 20px;
    line-height: 20px;
    padding: 10px;
  }
  h3{
    display: inline-block;
    width: 100%;
    text-align: center;
    height: 30px;
    line-height: 30px;
  }
</style>
