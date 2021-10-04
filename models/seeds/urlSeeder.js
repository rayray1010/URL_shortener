const db = require('../../config/mongoose')
const URL = require('../URL')
const generateRandomChar = require('../../randomURL')

db.once('open', () => {
  URL.create([
    {
      inputURL: 'https://www.google.com',
      outputURL: 'http://localhost:3000/' + generateRandomChar(5),
    },
    {
      inputURL: 'https://www.reddit.com/',
      outputURL: 'http://localhost:3000/' + generateRandomChar(5),
    },
  ])
})
