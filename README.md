# vue-magnifier-min
vue图片放大镜组件，支持图片旋转放大功能

## [Demo](http://www.thinkmix.info/mylib/vue-magnifier-min/index.html)

## Installation
```bash
npm install -D vue-magnifier-min
```
or
```bash
yarn add -D vue-magnifier-min
```

## Import
```javascript
import ImgMagnifier from 'vue-magnifier-min'

export default {
  ...
  components: {
    ImgMagnifier,
  },
  ...
}
```

## Usage
```html
<template>
  <div id="app">
    <ImgMagnifier :configs="configs" :img="img" />
  </div>
</template>
<script>
import ImgMagnifier from 'vue-magnifier-min'

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
    ImgMagnifier
  },
  mounted(){

  },
}
</script>
```

## Options
|Directive|Type||
|:--|:--|:--|
|configs|Object|配置|
|configs -> mainWidth|Number|放大器容器宽度|
|configs -> mainHeight|Number|放大器容器高度|
|configs -> isRotate|Boolean|是否支持图片旋转|
|img|Object|图片|
|img -> src|String|图片地址|
|img -> name|String|图片名称|