import VueMagnifierMin from './components/vue-magnifier-min.vue';


const install = function(Vue) {
  Vue.component(VueMagnifierMin.name, VueMagnifierMin);
}

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}
export { VueMagnifierMin }

export default {
  version: process.env.VERSION,
  install,
  VueMagnifierMin,
  vueMagnifierMin: VueMagnifierMin
}