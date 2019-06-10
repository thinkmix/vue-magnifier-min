<template>
  <div id="app">
    <div style="position:fixed; top:200px;left:220px;">
      <vue-magnifier-min :configs="configs" :img="img" />
    </div>
  </div>
</template>

<script>
import { VueMagnifierMin } from './index'
// import { VueMagnifierMin } from 'vue-magnifier-min';

export default {
  name: 'app',
  data(){
    return {
      configs:{
        mainWidth: 200,
        mainHeight: 200,
        isRotate: true
      },
      img: {
        src: 'http://www.thinkmix.info/statics/img/mateBook14_1.png',
        name: 'MateBook14_俯视'
      },
    }
  },
  components: {
    'vue-magnifier-min': VueMagnifierMin
  },
  mounted(){
    // imgList: [{
    //     src: 'http://www.thinkmix.info/statics/img/mateBook14_1.png',
    //     name: 'MateBook14_俯视'
    //   },{
    //     src: 'http://www.thinkmix.info/statics/img/mateBook14_2.png',
    //     name: 'MateBook14_直视'
    //   },{
    //     src: 'http://www.thinkmix.info/statics/img/mateBook14_3.png',
    //     name: 'MateBook14_闭屏'
    //   },{
    //     src: 'http://www.thinkmix.info/statics/img/mateBook14_4.png',
    //     name: 'MateBook14_仰视'
    //   },{
    //     src: 'http://www.thinkmix.info/statics/img/mateBook14_5.png',
    //     name: 'MateBook14_侧面'
    //   }],
  },
}
</script>

<style lang="scss">
*{
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
</style>
