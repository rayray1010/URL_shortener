const express = require('express')
const app = express()
const exhbs = require('express-handlebars')
const routs = require('./routes')
require('./config/mongoose')
app.engine('hbs', exhbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')
app.use(express.urlencoded({ extended: true }))
app.use(routs)

app.listen(3000, () => {
  console.log('server is activated!')
})
