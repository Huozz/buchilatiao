const express = require('express')
const fs = require('fs')
const path = require('path')
const bodyParse = require('body-parser')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const router = require('./server/api/router')
const app = express()

const resolve = file => path.resolve(__dirname, file)

app.use('/dist', express.static(resolve('./dist')))
app.use(bodyParse.json())
app.use(bodyParse.urlencoded({ extended: true }))
app.use(router)

// session
app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'blog',
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: true,
    maxAge: 2592000000
  },
  store: new MongoStore({
    url: 'mongodb://localhost:27017/blog'
  })
}))

app.get('*', function (req, res) {
  res.header("Access-Control-Allow-Origin", "*"); //设置允许跨域的域名，*代表允许任意域名跨域
  res.header("Access-Control-Allow-Headers", "content-type"); //允许的header类型
  res.header("Access-Control-Allow-Methods", "DELETE,PUT,POST,GET,OPTIONS"); //跨域允许的请求方式
  let html = fs.readFileSync(resolve('./dist' + '/index.html'), 'utf-8')
  res.send(html)
})

app.listen(3000, function () {
  console.log('访问地址为 localhost:3000')
})