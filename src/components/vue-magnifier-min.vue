<!--**
  *@info 图片放大镜组件，支持图片旋转
  *@author: thinkmix
  *@date 2019-05-16
* *-->
<template>
  <div class="_m-magnifier" ref="mainDom" :style="mainStyle">
    <div class="_m-mf-img">
      <!--图片名称-->
      <div class="title f-tas">
        <div class="f-s-13">{{ imgItem.name }}</div>
        <div class="u-iconrotate" v-if="isRotate" @click="rotateHandle()"></div>
      </div>
      <!--图片盒子-->
      <div v-if="imgItem.src" class="img-box" :style="imgBoxStyle">
        <div class="inner" :style="imgItem.innerStyle">
          <img :src="imgItem.src"
            :width="imgItem.img_w"
            :height="imgItem.img_h"
            @mouseover="mouseOverHandle" @mousemove="mouseMoveHandle" @mouseout="mouseOutHandle" />
          <!--遮罩-->
          <div class="mask" :style="maskStyle"></div>
        </div>
      </div>
      <div v-else class="no-img"></div>
    </div>
    <!--放大盒子-->
    <div class="magnify" :style="magnifyStyle"></div>
  </div>
</template>
<script>
export default {
  name: 'vue-magnifier-min',
  props: {
    configs: {
      type: Object,
      default() {
        return {
          mainWidth:200,//主盒子宽
          mainHeight:200,//主盒子高
          isRotate: true,//是否旋转
        }
      }
    },
    img:{
      type: Object,
      default() {
        return {
          src: '',//图片地址
          name: '',//图片标题
        }
      }
    },
  },
  data() {
    return {
      mainStyle:{},//主盒子样式
      imgBoxStyle:{},//图片盒子样式
      maskStyle:{},//当前遮罩的样式
      magnifyStyle:{//放大器样式
        width: 400 + 'px',
        height: 400 + 'px',
      },
      imgItem:{},//图片对象
    }
  },
  watch:{
    'configs'(){
      this.init();
    }
  },
  computed:{
    isRotate(){
      return this.configs.isRotate && this.imgItem.src;
    }
  },
  mounted(){
    this.init();
  },
  methods: {
    init(){
      const vm = this;

      let main_w = this.configs.mainWidth,
          main_h = this.configs.mainHeight;

      this.mainStyle = {
        width: main_w + 'px',
        height: main_h + 'px'
      }
      //图片盒子宽高
      let imgBox_w = main_w,
          imgBox_h = main_h - 25;//减去title的样式

      this.imgBoxStyle = {
        width: imgBox_w + 'px',
        height: imgBox_h + 'px'
      }

      //图片加载
      let imgObj = new Image(), imgItem = Object.assign({
        rotate: 0,
        innerStyle: {}//控制图片旋转
      }, this.img);
      imgObj.src = this.img.src;

      if(imgObj.complete){//图片已加载
        imgItem.real_w = imgObj.width;
        imgItem.real_h = imgObj.height;

        vm.mathImg(imgItem);
      }else{
        imgObj.onload = function(){
          imgItem.real_w = imgObj.width;
          imgItem.real_h = imgObj.height;

          vm.mathImg(imgItem);
        }
      }
    },
    mathImg(item){//图片数据计算
      let real_w = item.real_w,
          real_h= item.real_h,//图片真实宽高
          ratio = real_w / real_h,//宽高比
          img_w, img_h,//图片在盒子中的宽高
          imgBox_w = parseInt(this.imgBoxStyle.width),
          imgBox_h = parseInt(this.imgBoxStyle.height);//盒子宽高

      if(Math.abs(item.rotate) / 90 % 2){//奇数旋转，盒子宽高，互换
        let temp = imgBox_w;
        imgBox_w = imgBox_h;
        imgBox_h = temp;
      }
      
      if(ratio >= 1){//横向图
        if(imgBox_w > real_w){//真实图片小于图片盒子宽度
          img_w = real_w;
        }else{
          img_w = imgBox_w;
        }

        img_h = real_h / real_w * img_w;

        if(img_h > imgBox_h){//通过宽度计算的高度比盒子高度大,
          img_h = imgBox_h;
          img_w = ratio * img_h;
        }
      }else{//竖向图
        if(imgBox_h > real_h){//真实图片小于图片盒子
          img_h = real_h;
        }else{
          img_h = imgBox_h;
        }
        img_w =  ratio * img_h;

        if(img_w > imgBox_w){//通过高度计算的宽度比盒子宽度大,
          img_w = imgBox_w;
          img_h = real_h / real_w * img_w;
        }
      }

      //盒子中真实宽高
      item.real_w = real_w;
      item.real_h = real_h;
      //盒子中图片宽高
      item.img_w = Math.floor(img_w * 100) / 100;
      item.img_h = Math.floor(img_h * 100) / 100;
      //真实高度和在盒子宽高度比例
      item.scale = Math.floor(real_w / img_w * 100) / 100;
      // item.box_left = (imgBox_w - img_w) / 2,//图片相对盒子的左距离
      // item.box_top = (imgBox_h - img_h) / 2,//图片相对盒子的上距离

      this.imgItem = item;
    },
    mouseOverHandle(e) {
      let mainDomRect = this.$refs.mainDom.getBoundingClientRect(),
          imgBoxRect = e.target.getBoundingClientRect();

      //放大器框宽高
      let magnify_w = parseInt(this.magnifyStyle.width),
          magnify_h = parseInt(this.magnifyStyle.height);

      let imgItem = this.imgItem;
      this.imgItem = Object.assign({}, imgItem, {
        page_left: imgBoxRect.left,//图片相对页面的左距离
        page_top: imgBoxRect.top,//图片相对页面的上距离
      })

      //设置放大器
      let window_h = document.documentElement.clientHeight,
          magnify_left = mainDomRect.left,
          magnify_top = mainDomRect.top,
          main_w = this.configs.mainWidth,
          main_h = this.configs.mainHeight;

      if(magnify_left < magnify_w){//左侧位置不足,放在右侧
        magnify_left += main_w;
      }else{
        magnify_left -= magnify_w;
      }

      if(window_h - magnify_top < magnify_h){//上侧位置不足,放在下侧
        magnify_top  = mainDomRect.bottom - magnify_h;
      }

      this.magnifyStyle = Object.assign({}, this.magnifyStyle, {
        backgroundImage: `url(${ imgItem.src })`,
        top: magnify_top + 'px',
        left: magnify_left + 'px',
        visibility: 'visible',
        transform: imgItem.innerStyle.transform || ''
      })

      //设置遮罩
      this.maskStyle = Object.assign({}, this.maskStyle, {
        width: (imgItem.scale <= 1 ? imgItem.img_w : magnify_w / imgItem.scale) + 'px',
        height: (imgItem.scale <= 1 ? imgItem.img_h : magnify_h / imgItem.scale) + 'px',
        visibility: 'visible'
      })

      //设置滚动条
      this.scrollTop = document.documentElement.scrollTop;
    },
    mouseMoveHandle(e) {
      //遮罩宽高
      let mask_w = parseInt(this.maskStyle.width),
          mask_h = parseInt(this.maskStyle.height);

      let imgItem = this.imgItem;

      //鼠标相对图片的位置
      let mousePoint_x = e.clientX - imgItem.page_left,
          mousePoint_y = e.clientY - imgItem.page_top;
      //-----------遮罩计算

      //遮罩相对图片的位置
      let mask_x = mousePoint_x - (mask_w / 2),
          mask_y = mousePoint_y - (mask_h / 2);

      let rotateDirect = Math.abs(imgItem.rotate) / 90, temp_x = mask_x;
      if(rotateDirect == 1){//逆时针90,右->上,下->右
        mask_x = imgItem.img_w - mask_w - mask_y;
        mask_y = temp_x;
      }else if(rotateDirect == 2){//逆时针180,右->左,下->上
        mask_x = imgItem.img_w - mask_w - mask_x;
        mask_y = imgItem.img_h - mask_h - mask_y;
      }else if(rotateDirect == 3){//逆时针270,右->下,下->左
        mask_x = mask_y;
        mask_y = imgItem.img_h - mask_h - temp_x;
      }

      if(mask_x <= 0){//保持最左侧
        mask_x = 0;
      }else if(mask_x + mask_w >= imgItem.img_w){//保持最右侧
        mask_x = imgItem.img_w - mask_w;
      }

      if(mask_y <= 0){//保持最上侧
        mask_y = 0;
      }else if(mask_y + mask_h >= imgItem.img_h){//保持最下侧
        mask_y = imgItem.img_h - mask_h;
      }

      //设置遮罩位置
      this.maskStyle = Object.assign({},this.maskStyle, {
        transform: `translate3d(${ parseInt(mask_x) }px,${ parseInt(mask_y) }px,0)`,
      });

      //-----------放大器计算

      let bg_x = mask_x * imgItem.scale,
          bg_y = mask_y * imgItem.scale;

      //判断背景图是否小于预览框

      this.magnifyStyle = Object.assign({}, this.magnifyStyle, {
        backgroundPositionX: `-${ parseInt(bg_x) }px `,
        backgroundPositionY: `-${ parseInt(bg_y) }px `,
      })
    },
    mouseOutHandle(e) {
      this.maskStyle.visibility = 'hidden';
      this.magnifyStyle.visibility = 'hidden';
    },
    rotateHandle(){//旋转操作
      let item = JSON.parse(JSON.stringify(this.imgItem)),
          rotate = item.rotate;

      rotate -= 90;
      if(rotate == -360)rotate = 0;
      item.innerStyle.transform = `rotate(${ rotate }deg)`;
      item.rotate = rotate;

      this.mathImg(item);
    }
  }
}
</script>

<style lang="scss" scoped>
*{
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
.clr:after {
  content: '';
  display: table;
  clear: both;
}
.fl {
  float: left;
}
.f-s-13{
  font-size: 13px;
}
._m-magnifier{
  position: relative;
  overflow: hidden;
  user-select: none;
  >.magnify{
    position: fixed;
    z-index: 9999;
    background-color: #f8f8f9;
    background-repeat: no-repeat;
    visibility: hidden;
    border:1px solid #ddd;
    // box-shadow: 2px 5px 15px rgba(0,0,0,0.1)
  }
}
._m-mf-img{
  overflow: hidden;
  position: relative;
  height: 100%;
  >.title{
    display: flex;
    align-items: center;
    justify-content: center;
    height: 20px;
    margin-bottom: 5px;
    text-overflow: ellipsis;
    white-space: nowrap;
    >.u-iconrotate{
      width: 20px;
      height: 20px;
      background-image: url(../assets/images/rotate.png);
      background-position: center;
      background-repeat: no-repeat;
      background-size: 100%;
      cursor: pointer;
      margin-left: 5px;
    }
  }
  >.img-box{
    background-color: #f8f8f9;
    display: flex;
    align-items: center;
    justify-content: center;
    >.inner{
      position: relative;
      >img{
        cursor: move;
        display: block;
      }
      >.mask{
        position: absolute;
        top:0;
        left:0;
        z-index: 10;
        pointer-events:none;
        width: 100px;
        height: 100px;
        background-color: #FEDE4F;
        opacity: 0.5;
        visibility: hidden;
        transform: translate3d(0,0,0)
      }
    }
  }
  >.no-img{
    position: absolute;
    top:0;
    left:0;
    width: 100%;
    height: 100%;
    z-index: 9;
    background-image: url(../assets/images/no-data.png);
    background-position: center;
    background-repeat: no-repeat;
    background-color: #f8f8f9;
  }
}
</style>
