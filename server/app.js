'use strict'
const express = require('express')
let app = express()

const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

// 初始化orm
// const orm = require('orm')
// app.use(orm.express('mysql://root@127.0.0.1:3306/cms_pro', {
//   define: function (db, models, next) {
//     next()
//   }
// }))
// 将所有api请求响应content-type设置为application/json
app.all('/api/*', (req, res, next) => {
  // 设置允许跨域响应报文头
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "X-Requested-With, Origin, Content-Type, Accept, Authorization")
  res.header("Access-Control-Allow-Methods", "*")
  res.header("X-Powered-By", "3.2.1")
  res.header('Content-Type', 'application/json;charset=utf-8')
  next()
})

// 设置路由规则
const apiRoute = require('./apiController')
app.use('/api', apiRoute)

app.listen(8899, '127.0.0.1', () => {
  console.log('api服务成功启动：8899')
})
