<template>
  <div id="cart">
    <ul>
      <li class="mg-item">
        购物车({{goods.length}})
      </li>
      <li class="mg-item" v-for="(good, index) in goods" :key="index">
        <input type="checkbox" v-model="good.isSelected">
        <img :src="good.img" alt="" class="mg-pic">
        <div class="mg-content">
          <div class="mg-title">{{good.title}}</div>
          <span class="mg-price">￥{{good.price}}</span>
          <div class="mg-counter">
            <span @click="mgSub(good)">-</span>
            <span>{{good.num}}</span>
            <span @click="mgAdd(good)">+</span>
          </div>
          <div class="mg-del" @click="mgDel(good, index)">移除</div>
        </div>
      </li>
    </ul>
    <div class="mg-count">
      <div>
        <input type="checkbox" id="all">
        <label for="all">全选</label>
      </div>
      <div class="mg-total">
        <span>共{{ myBill.num }}件商品  合计:</span>
        <span>￥{{ myBill.bill }}</span>
        <span>结算</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Cart',
  data(){
    return{
      goods: ''
    }
  },
  beforeRouteLeave (to, from, next) {
    this.$messageBox.confirm('确定离开并保存所有更改？', '提示')
    .then(res => {
      if (res) {
        let obj = {}
        this.goods.forEach((good)=>{
          obj[good.id] = good.num
        })
        this.$myGoods.saveGoods(obj)
        next()
      } else {
        next(false)
      }
    });
  },
  methods: {
    mgSub (good) {
      if (good.num > 1){
        good.num --
        this.$store.commit('subCartNum', 1)
      }
    },
    mgAdd (good) {
      good.num ++
      this.$store.commit('addCartNum', 1)
    },
    mgDel (good, index) {
      this.goods.splice(index, 1)
      this.$myGoods.del({id: good})
      this.$store.commit('subCartNum', good.num)
    }
  },
  computed: {
    myBill () {
      let num = 0
      let bill = 0
      if(this.goods.length){
        this.goods.forEach((good)=>{
          if (good.isSelected) {
            num += good.num
            bill += good.num * good.price
          }
        })
      }
      return {
        num, bill
      }
    }
  },
  created() {
    const goodsList = JSON.parse(window.localStorage.getItem('goodsList'))
    const goods = Object.keys(goodsList)
    this.$axios.get('/api/cart', {params: {goods: goods}})
    .then(res=>{
      this.goods = res.data
      for(let i=0; i<this.goods.length; i++){
        let good = this.goods[i]
        // 手动通知VUE进行新添加数据的监听
        this.$set(good, 'num', goodsList[good.id])
        this.$set(good, 'isSelected', true)
        // good.num = goodsList[good.id]
      }
    })
    .catch(err=>{
      console.log('购物车获取失败', err)
    })
  }
}
</script>

<style lang="scss" scoped>
  .mg-item{
    display: flex;
    border-radius: 10px;
    background: lightblue;
    margin: 10px 0;
    padding: 10px;
    .mg-pic{
      width: 150px;
      height: 150px;
      border-radius: 15px;
      margin: 0 5px;
    }
    .mg-content{
      position: relative;
      .mg-price{
        color: red;
        font-size: 20px;
        position: absolute;
        bottom: 0;
        left: 0;
      }
      .mg-counter{
        position: absolute;
        bottom: 0;
        right: 40px;
        font-size: 20px;
        border: 1px solid grey;
        border-radius: 5px;
        span{
          display: inline-block;
          width: 20px;
          text-align: center;
          &:nth-child(2){
            width: 50px;
            border-left: 1px solid grey;
            border-right: 1px solid grey;
          }
        }
      }
      .mg-del{
        position: absolute;
        bottom: 5px;
        right: 0;
        font-size: smaller;
        color: rgba(232, 43, 43, 0.8);
      }
    }
    /*input[type='checkbox']{*/
    /*  -webkit-appearance: none;*/
    /*  outline: 0;*/
    /*  border-radius: 50%;*/
    /*  text-align: center;*/
    /*  margin: auto;*/
    /*  height: 0;*/
    /*  padding: 7px;*/
    /*  border: 3px solid grey;*/
    /*  color: #66aa55;*/
    /*  font-size: 20px;*/
    /*  &:-internal-autofill-previewed{*/
    /*    color: green;*/
    /*  }*/
    /*}*/
  }
  .mg-count{
    position: fixed;
    bottom: 55px;
    width: 100%;
    padding: 10px;
    display: flex;
    justify-content: space-between;
    .mg-total{
      span{
        &:nth-child(2){
          color: red;
        }
        &:nth-child(3){
          display: inline-block;
          color: white;
          font-weight: bold;
          padding: 8px 30px;
          background: linear-gradient(to right, #db8752, #e8480b);
          border-radius: 20px;
        }
      }
    }
  }
</style>
