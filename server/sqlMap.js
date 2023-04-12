'use strict'
var sqlMap = {
  carousel: {
    top: 'select id, url from carousel'
  },
  news: {
    list: 'select id, title, description, clicked, published, avatar from news order by clicked desc',
    detail: 'select id, title, liked, published, category, content, author from news where id=?'
  },
  photos: {
    category: 'select id, catname from photos_category',
    list: 'select id, category, src, description from photos where category=?',
    hot: 'select id, src, description, updated from photos order by updated desc limit ?,?'
  },
  photo: {
    images: 'select pid, bigpic, smallpic from photo_pictures where pid=?',
    detail: 'select id, title, updated, content, clicked, category from photo_detail where id=?'
  },
  comments: {
    list: 'select objid, user, text, updated from comments where objid=? order by updated desc limit ?,?',
    publish: 'insert into comments (objid, user, text, updated) values (?,?,?,?)'
  },
  goods: {
    list: 'select id, title, img, price, amount from goods order by amount desc limit ?,?',
    detail_imgs: 'select gid, rank, img from goods_detail_imgs where gid=? order by rank',
    detail: 'select id, title, price from goods where id=?'
  },
  cart: {
    all: 'select id, title, img, price from goods where id in (?)'
  }
}
module.exports = sqlMap

// const express = require('express')
// let route = express.Router()
// const apiCtrl = require('./apiController')
//
// route.get('/api/getcarousel', apiCtrl.getcarousel)
// route.get('/api/getnew/:newid', apiCtrl.getnew)
//
// route.post('/api/post', (req, res) => {
//   var obj = {message: 'post请求ok'}
//   res.end(JSON.stringify(obj))
// })
// route.all('/api/jsonp', (req, res) => {
//   var callbackFn = req.query.callback
//   var obj = {message: 'jsonp请求ok'}
//   var jsonStr = JSON.stringify(obj)
//   res.end("${callbackFn}('${jsonStr}')")
// })
//
// module.exports = route
