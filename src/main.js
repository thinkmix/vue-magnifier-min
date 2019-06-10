import Vue from 'vue'
import App from './App.vue'
// 测试
// import ImgMagnifier from '../dist/vue-magnifier-min.min.js';
// console.log(ImgMagnifier)
// Vue.use(ImgMagnifier);

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
