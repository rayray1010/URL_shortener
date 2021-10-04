const express = require('express')
const router = express.Router()
const URL = require('../../models/URL')
const axios = require('axios')
const randomChar = require('../../randomChar')
//首頁
router.get('/', (req, res) => {
  res.render('index')
})

// 把縮網址重新導向至目標網址
router.get('/:url', (req, res) => {
  const outputURL = 'http://localhost:3000/' + req.params.url
  URL.find({ outputURL: outputURL })
    .lean()
    .then((data) => {
      res.redirect(data[0].inputURL)
    })
    .catch((err) => console.log(err))
})

//post 網址
router.post('/', async (req, res) => {
  const inputURL = req.body.inputURL
  let connectionStatus = Number()

  //驗證網站是否有效
  await axios
    .get(inputURL)
    .then((response) => {
      connectionStatus = response.status
    })
    .catch((error) => {
      console.log(error.response)
      connectionStatus = 404
    })

  //網站有效，執行縮短網址任務
  if (connectionStatus < 400) {
    //找找看資料庫有沒有已存在網址
    URL.find({ inputURL })
      .lean()
      .then((data) => {
        res.render('index', {
          data: data[0].outputURL,
          inputURL,
          success: true,
        })
      })
      //若沒有，新建一個
      .catch((err) => {
        URL.create({
          inputURL,
          outputURL: 'http://localhost:3000/' + randomChar(5),
        }).then((data) =>
          res.render('index', { data: data.outputURL, inputURL, success: true })
        )
      })
  } else {
    //無效網址進入此區
    res.render('index', { data: 'invalid URL', warring: 'warring' })
  }
})

module.exports = router
