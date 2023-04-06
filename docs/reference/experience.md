# 项目实践问题

## Vue页面禁止选择、右键、复制、F12页面审查元素

```javascript
created(){
    this.$nextTick(() => {
      // 禁用右键
      document.oncontextmenu = new Function('event.returnValue=false')
      // 禁用选择
      document.onselectstart = new Function('event.returnValue=false')
      //禁止f12
      document.οnkeydοwn = new Function('event.returnValue=false')
    })
 
    // 上面的禁止f12那段代码没有生效，但是加了下面这段就能生效。
    document.onkeydown = function (e) {
      if (e && e.keyCode === 123) {
        e.returnValue = false
        // e.keyCode = 0   //去掉也可以的，倘若要写，则需要setter 以及 getter配合使用，不配合，会报错
        return false
      }
    }
  }
```



> 如果想让所有页面禁用，就在app.vue设置。
>
> 以上代码只针对PC页面端，手机端访问页面还是可以选择、复制。

## `vue2`使用`swiper`

### 安装依赖

```shell
npm i swiper@5.4.5
npm i vue-awesome-swiper@4.1.1
```

### 引入组件，开始使用

> Loop轮播偏移等问题，可以使用 `v-if`对后端返回数据进行判断：
>
> `v-if="list.length > 1"`

```vue
<template>
  <div class="swiper">
    <swiper v-if="list.length > 1" ref="swiperRef" :options="swiperOption">
      <swiper-slide>Slide 1</swiper-slide>
      <swiper-slide>Slide 2</swiper-slide>
      <swiper-slide>Slide 3</swiper-slide>
      <swiper-slide>Slide 4</swiper-slide>
      <div class="pagination" slot="pagination"></div>
    </swiper>
  </div>
</template>

<script>
  import {Swiper, SwiperSlide} from 'vue-awesome-swiper'
  import 'swiper/css/swiper.css'
  export default {
    components: {
      Swiper,
      SwiperSlide
    },
    data() {
      return {
        list: [], // 存放返回数据列表
		swiperOption: {
          effect: 'coverflow',
          centeredSlides: true,
          slidesPerView: 'auto',
          coverflowEffect: {
            rotate: 0,
            stretch: -50,
            depth: 200,
            modifier: 0.5,
            slideShadows: false
          },
          pagination: {
            el: '.pagination',
            clickable: true
          },
          loop: true,
            on: {
              // this.realIndex 当前滑块索引
              click: function () { // 监听点击滑块事件
              	console.log('this.realIndex', this.realIndex)
              },
              slideChange: function () {
                console.log('this.realIndex', this.realIndex)
              }
          }
        }
      }
    }
  }
</script>
<style lang='less' scoped>
.swiper-container {
  overflow: visible !important;
  margin-top: 20px;
  width: 100%;
  height: 220px;
  text-align: center;
}
.swiper-slide {
  width: 340px;
  overflow: hidden;
  transition: 300ms;
  border-radius: 10px;
  background-color: #FEFEFE;
  position: relative;
  box-shadow: 0 0 7px 0 rgba(0, 0, 0, .2);
  padding: 15px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.pagination {
  position: absolute;
  left: 0;
  width: 100%;
  text-align: center;
  bottom: -25px;
}
/deep/ .swiper-pagination-bullet {
  display: inline-block;
  width: 3px;
  height: 3px;
  border-radius: 3px;
  cursor: pointer;
  transition: 300ms;
  position: relative;
  background: #5B4D32;
}
/deep/ .swiper-pagination-bullet-active {
  width: 23px;
  height: 3px;
  background-color: #8A633F;
}
</style>
```

## `CSS3`中`calc`、`constant`和`env`函数的使用

### `calc()`函数

> 运算符前后都需要保留一个空格，例如：`width: calc(100% - 10px)`
>
> 任何长度值都可以使用`calc()`函数进行计算
>
> `calc()`函数支持‘+’、‘-’、‘*’、‘/’运算
>
> `calc()`函数使用标准的数学运算优先级规则
>
> 在`less`预编译语言中，写法：`width: calc(~"100% - 10px")`

### `canstant()`函数和`env()`函数

用于设定安全区域与边界的距离，有4个预定义变量：

- `safe-area-inset-left`：安全区域距离左边边界的距离
- `safe-area-inset-right`：安全区域距离右边边界的距离
- `safe-area-inset-top`：安全区域距离上边边界的距离
- `safe-area-inset-bottom`：安全区域距离下边边界的距离

`env()`和`constant()`函数有两个必要的使用前提，H5网页设置`viewport-fit=cover`的时候才生效，小程序里的`viewport-fit`默认是`cover`，可以直接使用。

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
```

#### 使用方法：先`constant`再`env`

```css
body {
    padding-bottom: constant(safe-area-inset-bottom); /* 兼容 iOS < 11.2 */
    padding-bottom: env(safe-area-inset-bottom); /* 兼容 iOS >= 11.2 */
}
```

#### 配合`calc()`函数使用

```css
// 普通 css 中的使用
body {
    margin-bottom: calc(52px + constant(safe-area-inset-bottom));
  	margin-bottom: calc(52px + env(safe-area-inset-bottom));
}
// less 中的使用要特别注意
body {
    margin-bottom: calc(~"52px + constant(safe-area-inset-bottom)");
  	margin-bottom: calc(~"52px + env(safe-area-inset-bottom)");
}
// 或
body {
    margin-bottom: ~"calc(52px + constant(safe-area-inset-bottom))";
  	margin-bottom: ~"calc(52px + env(safe-area-inset-bottom))";
}
```
