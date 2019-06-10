import VueImgMagnifier from './components/vue-magnifier-min.vue';


const install = function(Vue) {
  Vue.component(VueImgMagnifier.name, VueImgMagnifier);
}

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export default {
  version: process.env.VERSION,
  install,
  VueImgMagnifier,
}