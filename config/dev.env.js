'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  // BASE_API: '"/weather"' // 2022.2.19修改，为了实现BASE_URL的跨域匹配
    // 添加下面这行代码: 表示在开发环境下请求的服务器端接口  
    API_ROOT: ' "http://localhost:3000/" ' 
})
