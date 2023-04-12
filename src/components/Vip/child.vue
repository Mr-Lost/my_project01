<template>
  <div v-test="123">
    孩子里的是 {{msg}} <div @click="clickk">子点击</div>
    孩子里数据是 {{cc}} 和 {{rr}} 和 {{xx}} he {{zz}}
    <grandChild :gmsg="msg"/>
    <grand-child>
      我是匿名插槽
      <template #named1>
        <p>我是具名插槽1</p>
      </template>
      <template #named2>
        我是具名插槽2
      </template>
    </grand-child>
  </div>
</template>

<script>
  import GrandChild from "./grandchild";
  export default {
    name: 'child',
    components: {GrandChild},
    data () {
      this.zz = 'last'
      return {
        cc: '我是child的数据',
        rr: '我是child的ref数据',
        pp: '我是修改的prop数据',
        xx: [1,2,3],
        yy: 'abc'
      }
    },
    props: {
      msg: {
        type: String,
        default: ''
      }
    },
    methods: {
      clickk(){
        this.$parent.num = 20
        this.$emit('handle', this.pp)
        // this.xx = [2,2,2]
        // this.$set(this.xx, 0, 'zzz')
        this.zz = [1,1,1]
        console.log(this.zz)
        // console.log('xx is ', this.xx)
        // console.log(this.$data, this.$children, this.$parent)
      }
    },
    mounted() {
      console.log('created时获取el ', this.$el)
    }
  }
</script>
