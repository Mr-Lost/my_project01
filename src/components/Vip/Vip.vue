<template>
  <div class="temp">
    {{text}}
    {{num}}
    <div @click="clickk">父点击</div>
    $child数据是{{obj}}<hr>ref数据是{{ojb}}<hr>孙子数据是{{aa}}
    <child @handle="metho" ref="chi" :msg="text"/>
  </div>
</template>

<script>
import Child from "./child";
export default {
  name: 'Vip',
  components: {Child},
  data(){
    return{
      text: '我是vip',
      num: 10,
      obj: '',
      ojb: '',
      aa: ''
    }
  },
  methods: {
    clickk(){
      this.text = '我不是vip了'
      this.$children[0].cc = '我被改了'
      this.$refs.chi.rr = 'ref被改了'
      this.$children[0].$children[0].gcm = '孙子被改了'
      this.obj = this.$children[0].cc
      this.ojb = this.$refs.chi.rr
      this.aa = this.$children[0].$children[0].gcm
      console.log(this.obj, this.ojb)
      console.log(this.$children[0].cc, this.$refs.chi.rr)
      // this.$nextTick(()=>{console.log('second: ', document.getElementsByClassName('temp')[0].innerText)})
      // console.log('first: ', document.getElementsByClassName('temp')[0].innerText)
    },
    metho(){
      this.$on('handle', val=>{this.text = val})
      console.log('metho之后 ', this.text)
      // this.text = val
    }
  },
  mounted() {
    this.obj = this.$children[0].cc
    this.ojb = this.$refs.chi.rr
    this.aa = this.$children[0].$children[0].gcm
  }
}
</script>
