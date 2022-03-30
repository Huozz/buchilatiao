// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import utils from './utils/utils'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import 'mavon-editor/dist/markdown/github-markdown.min.css'
import {VueJsonp} from 'vue-jsonp'
import VueResource from 'vue-resource'


Vue.use(ElementUI)
Vue.use(mavonEditor)
Vue.use(VueJsonp)
Vue.use(VueResource)

Vue.config.productionTip = false
Vue.prototype.$util = utils
Vue.prototype.$markdown = function (value) {
  return mavonEditor.markdownIt.render(value)
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  store
})

