'use strict'
const models = require('./db')
const express = require('express')
const router = express.Router()
const mysql = require('mysql')
const $sql = require('./sqlMap')

const conn = mysql.createConnection(models.mysql)
conn.connect()

const jsonWrite = function (req, res) {
  if (typeof res === 'undefined') {
    req.json({
      code: '1',
      msg: '操作失败'
    })
  } else {
    req.json(res)
  }
}

router.get('/carousel', (req, res) => {
  const sql = $sql.carousel.top
  conn.query(sql, [], function (err, result) {
    if (err) {
      console.log('轮播图异常', err)
    }
    if (result) {
      jsonWrite(res, result)
    }
  })
})
router.get('/news_list', (req, res) => {
  const sql = $sql.news.list
  conn.query(sql, [], function (err, result) {
    if (err) {
      console.log('新闻列表页异常', err)
    }
    if (result) {
      jsonWrite(res, result)
    }
  })
})
router.post('/news_detail', (req, res) => {
  const sql = $sql.news.detail
  const params = req.body
  conn.query(sql, [params.id], function (err, result) {
    if (err) {
      console.log('新闻详情页异常', err)
    }
    if (result) {
      jsonWrite(res, result)
    }
  })
})
router.get('/photos_category', (req, res) => {
  const sql = $sql.photos.category
  conn.query(sql, [], function (err, result) {
    if (err) {
      console.log('图文分类异常', err)
    }
    if (result) {
      jsonWrite(res, result)
    }
  })
})
router.post('/photos_list', (req, res) => {
  const params = req.body.id
  if (params === 0) {
    const sql0 = $sql.photos.hot
    conn.query(sql0, function (err, result) {
      if (err) {
        console.log('图文详情异常', err)
      }
      if (result) {
        jsonWrite(res, result)
      }
    })
  } else {
    const sql1 = $sql.photos.list
    conn.query(sql1, [params], function (err, result) {
      if (err) {
        console.log('图文详情异常', err)
      }
      if (result) {
        jsonWrite(res, result)
      }
    })
  }
})
router.get('/photo_detail', (req, res)=>{
  const sql = $sql.photo.detail
  const params = req.query
  conn.query(sql, [params.id], function (err, result) {
    if (err) {
      console.log('图文内容异常', err)
    }
    if (result) {
      jsonWrite(res, result)
    }
  })
})
router.get('/photo_images', (req, res)=>{
  const sql = $sql.photo.images
  const params = req.query
  conn.query(sql, [params.pid], function (err, result) {
    if (err) {
      console.log('图片展示内容异常', err)
    }
    if (result) {
      jsonWrite(res, result)
    }
  })
})
router.get('/comments', (req, res)=>{
  const sql = $sql.comments.list
  const params = req.query
  conn.query(sql, [params.id, 4*(params.page-1), 4], function (err, result) {
    if (err) {
      console.log('评论获取异常', err)
    }
    if (result) {
      jsonWrite(res, result)
    }
  })
})
router.post('/comments', (req, res)=>{
  const sql = $sql.comments.publish
  const params = req.body
  conn.query(sql, [params.id, params.user, params.text, params.updated], function (err, result) {
    if (err) {
      console.log('发表评论异常', err)
    }
    if (result) {
      jsonWrite(res, result)
    }
  })
})
router.get('/goods', (req, res)=>{
  const sql = $sql.goods.list
  const params = req.query
  conn.query(sql, [6*(params.page-1), 6], function (err, result) {
    if (err) {
      console.log('商品获取异常', err)
    }
    if (result) {
      jsonWrite(res, result)
    }
  })
})
router.get('/goods/detail_imgs', (req, res)=>{
  const sql = $sql.goods.detail_imgs
  const params = req.query
  conn.query(sql, [params.id], function (err, result) {
    if (err) {
      console.log('商品详情图片异常', err)
    }
    if (result) {
      jsonWrite(res, result)
    }
  })
})
router.get('/goods/detail', (req, res)=>{
  const sql = $sql.goods.detail
  const params = req.query
  conn.query(sql, [params.id], function (err, result) {
    if (err) {
      console.log('商品详情异常', err)
    }
    if (result) {
      jsonWrite(res, result)
    }
  })
})
router.get('/cart', (req, res)=>{
  const sql = $sql.cart.all
  const params = req.query
  conn.query(sql, [params.goods], function (err, result) {
    if (err) {
      console.log('购物车详情异常', err)
    }
    if (result) {
      jsonWrite(res, result)
    }
  })
})

module.exports = router
