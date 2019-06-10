import Vue from 'vue'
import App from './App.vue'
// 测试
// import VueMagnifierMin from './index';
// Vue.use(VueMagnifierMin);

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
