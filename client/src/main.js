// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from './axios'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/iconfont/iconfont.css'

Vue.config.productionTip = false
Vue.prototype.$http = axios;

// import VueVideoPlayer from 'vue-video-player'
// import 'video.js/dist/video-js.css'
// Vue.use(VueVideoPlayer);


// 第一个是videoJs的样式，后一个是vue-video-player的样式，因为考虑到我其他业务组件可能也会用到视频播放，所以就放在了main.js内
require('video.js/dist/video-js.css')
require('vue-video-player/src/custom-theme.css')
import VideoPlayer from 'vue-video-player'
Vue.use(VideoPlayer);


Vue.use(ElementUI);


Vue.directive('focus', {
  // 当被绑定的元素插入到 DOM 中时……
  inserted: function (el) {
    // 聚焦元素
    el.focus()
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
