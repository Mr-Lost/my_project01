let myGoods = {}

myGoods.saveGoods = function (goodsList) {
  window.localStorage.setItem('goodsList', JSON.stringify(goodsList))
}

myGoods.getGoodsList = function () {
  return JSON.parse(window.localStorage.getItem('goodsList') || '{}')
}

myGoods.add = function (goods) {
  let goodsList = this.getGoodsList()
  if (goodsList[goods.id]) {
    goodsList[goods.id] += goods.num
  } else {
    goodsList[goods.id] = goods.num
  }
  this.saveGoods(goodsList)
}

myGoods.del = function (goods) {
  let goodsList = this.getGoodsList()
  delete goodsList[goods.id]
  this.saveGoods(goodsList)
}

myGoods.getTotal = function () {
  let goodsList = this.getGoodsList()
  let values = Object.values(goodsList)
  let sum = 0
  values.forEach(val=>sum+=val)
  return sum
}

export default myGoods
