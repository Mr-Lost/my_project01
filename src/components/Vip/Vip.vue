<template>
  <div @click="clickk" class="temp">
    {{text}}
  </div>
</template>

<script>
export default {
  name: 'Vip',
  data(){
    return{
      text: '我是vip'
    }
  },
  methods: {
    clickk(){
      this.text = '我不是vip了'
      this.$nextTick(()=>{console.log('second: ', document.getElementsByClassName('temp')[0].innerText)})
      console.log('first: ', document.getElementsByClassName('temp')[0].innerText)
    }
  }
}
</script>
