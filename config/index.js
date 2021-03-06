'use strict'
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')

module.exports = {
  dev: {

    // Paths
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
      // '/baidu': {
      //   target:'https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy',//请求域名
      //   //secure: false, // 如果是https接口，需要配置这个参数
      //   changeOrigin: true,//如果是跨域访问，需要配置这个参数
      //   pathRewrite:{  //替换原则
      //     '^/baidu': ''
      //   }
      // },
      // '/weather': {
      //   target:'http://t.weather.sojson.com/api/weather',//请求域名
      //   //secure: false, // 如果是https接口，需要配置这个参数
      //   changeOrigin: true,//如果是跨域访问，需要配置这个参数
      //   pathRewrite:{  //替换原则
      //     '^/weather': ''
      //   },
      //   }
      // node 修改
      '/': {
        target: 'http://localhost:3000',   // target表示代理的服务器url
        changeOrigin:true,
        pathRewrite: {     // pathRewrite表示路径重写，key表示一个正则，value表示别名 
          '^/api': '/api'   // 即用 '/api'表示'http://localhost:3000/api'
        }
      }

    },

    // Various Dev Server settings
    host: 'localhost', // can be overwritten by process.env.HOST
    port: 8080, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    autoOpenBrowser: false,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-

    
    /**
     * Source Maps
     */

    // https://webpack.js.org/configuration/devtool/#development
    devtool: 'cheap-module-eval-source-map',

    // If you have problems debugging vue-files in devtools,
    // set this to false - it *may* help
    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    cacheBusting: true,

    cssSourceMap: true
  },

  build: {
    // Template for index.html
    index: path.resolve(__dirname, '../dist/index.html'),

    // Paths
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/blog/',

    /**
     * Source Maps
     */

    productionSourceMap: true,
    // https://webpack.js.org/configuration/devtool/#production
    devtool: '#source-map',

    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: true
  }
}
