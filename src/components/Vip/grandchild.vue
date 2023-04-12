<template>
  <div class="gs">孙子里的是 {{gmsg}} 和 {{gcm}} 和 {{this.$parent.$parent.num}}
    <slot name="named1"></slot>
    <slot></slot>
    <slot name="named2"></slot>
  </div>
</template>

<script>
  export default {
    name: 'grandChild',
    data(){
      return {
        num: this.$parent.$parent.num,
        gcm: '我是孙子'
      }
    },
    props: {
      gmsg: {
        type: String,
        default: ''
      }
    },
    mounted() {
      console.log(this.$parent.$el)
    }
  }
</script>
