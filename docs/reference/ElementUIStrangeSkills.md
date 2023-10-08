---
title: ElementUI中的奇技淫巧
sticky: 1
tags:
 - ElementUI
 - 前端开发
categories:
 - 前端开发
date: 2023-09-20
hideComments: false
---

#### `el-scrollbar`滚动条

| 参数        | 说明                                                         | 类型      | 可选值 |
| ----------- | ------------------------------------------------------------ | --------- | ------ |
| `native`    | *是否采用原生滚动。即只是隐藏原生滚动条，但并没有使用自定义的滚动条）* | `Boolean` | -      |
| `wrapStyle` | *容器样式*                                                   | `Object`  | -      |
| `wrapClass` | *容器样式名*                                                 | `Object`  | -      |
| `viewClass` | *展示视图的样式名*                                           | `Object`  | -      |
| `viewStyle` | *展示视图的样式*                                             | `Object`  | -      |
| `noresize`  | *容器大小是否不可变。如果 `container` 尺寸不会发生变化，最好设置它可以优化性能* | `Boolean` | -      |
| `tag`       | *渲染容器的标签*。*`view`容器用那种标签渲染，默认为`div`*    | `String`  | -      |

**自定义滚动条的原理**

![scrollbar](https://raw.githubusercontent.com/chnjames/cloudImg/main/blog/202309081552892.png)

**`warp`**：滚动的可显示区域，滚动内容就是在这个区域中滚动；

**`view`**：实际的滚动内容，超出`warp`可显示区域的内容将被隐藏；

**`track`**：滚动条的滚动滑块；

**`thumb`**：上下滚动的轨迹。

```vue
<el-scrollbar>
    <li v-for="user in userList" :key="user.id">{{user.name}}</li>
</el-scrollbar>
```



#### 管理弹出层的`z-index`：`PopupManager`

`ElementUI`的弹出层在元素定位上，都有两种实现方式，分别是：

- `append-to-body`：此模式下，弹出层会被放在`<body>`元素上，通过`position: fixed`定位，配合动态的`top`和`left`属性，完成弹出元素的定位。
- 非`append-to-body`：此模式下，弹出层通过`position: absolute`定位，配合其父元素`position: relative`来完成弹出元素的定位。

在大多数情况下，`ElementUI`都是默认使用`append-to-body`，因为非`append-to-body`存在严重副作用，只有迫不得已的情况下才需要使用。

具体有什么副作用，可以把你们的理解打在评论区。

> `ElementUI`弹出层的核心实现机制：
> 只要让新出现的弹出层，永远比之前所有弹出层的层级要高，就不会有**新弹层**被**旧弹层**遮盖的事情发生。
>
> `PopupManager`：为弹出层提供获取实例、注册、注销等各种能力，但其最重要的能力，是提供了`z-index`的层级管理能力。
>
> `ElementUI`为其内置了一个弹出层`z-index`基数（`2000`），但可以进行修改。
>
> ```javascript
> // 修改弹出层的`z-index`从3000开始递增
> Vue.use(Element, {zIndex: 3000})
> ```
>
> 

```vue
<template>
  <div class="container">
    <el-button @click="onClick">增加</el-button>
    z-index: {{ value }} 
  </div>
</template>
<script>
import { PopupManager } from 'element-ui/src/utils/popup'
export default {
  data() {
    return {
      value: 0
    }
  },
  methods: {
    onClick() {
      // 使用
      this.value = PopupManager.nextZIndex()
    }
  }
}
</script>
```



**实战：一个更灵活的全屏组件**

> 众所周知，浏览器是有官方的全屏`API`的：`Element.requestFullscreen()`，它可以让一个元素立刻铺满视窗，并且置于所有元素之上。官方全屏是设定层级高于一切，那些`append-to-body`的弹窗，无论`z-index`多高，也绝对不会被显示出来。而那些非`append-to-body`模式的弹出层，确实会在某些业务场景不符合要求。

**符合`ElementUI`层级标准的全屏组件**

> 和浏览器官方`API`实现全屏的思路基本一致，但不同的地方在于：
>
> - 官方全屏会默认置顶，`z-index`无限大；
> - 封装的全屏组件，`z-index`符合`PopupManager`管家的规范。

**简易`Demo`**

```vue
<template>
    <div :class="{ 'custom-full-screen': isFullScreen }" :style="{zIndex: currentZIndex}">
      <slot></slot>
    </div>
    </template>
<script>
import { PopupManager } from 'element-ui/src/utils/popup'

export default {
  data() {
    return {
      isFullScreen: false,
      currentZIndex: null
    }
  },
  methods: {
    request() {
      this.isFullScreen = true
      this.currentZIndex = PopupManager.nextZIndex()
    }
  }
}
</script>
<style>
.custom-full-screen {
  position: fixed !important;
  top: 0 !important;
  left: 0 !important;
  right: 0 !important;
  bottom: 0 !important;
  width: 100% !important;
  height: 100% !important;
}
</style>
```



#### 万能弹出组件：`vue-popper`

> `ElementUI`中的大部分弹出层都是基于`vue-popper`组件来实现的。比如`select`、`data-picker`、`cascader`、`dropdown`、`popver`、`tooltip`等。

如何使用`vue-popper`

通常来说，它的主要用法是`混入（mixins）`。

> 可以[参考](https://github.com/ElemeFE/element/blob/dev/packages/select/src/select-dropdown.vue)`ElementUI select-dropdown`中对它的具体使用。

**实战：完全自定义的弹出层**

1. 引入`vue-popper`，在模板中引入该组件，并定义一个弹出层元素，一个定位元素。

   ```vue
   <template>
     <!-- 定位元素 -->
     <div class="custom-picker">
       <!-- vue-popper组件 -->
       <Popper ref="popper" v-model="showPopper"></Popper>
       <!-- 弹出组件 -->
       <div ref="fly-piece" v-show="showPopper" class="custom-picker__popper">弹出内容</div>
     </div>
   </template>
   <script>
   // 引入vue-popper组件
   import Popper from 'element-ui/src/utils/vue-popper';
   
   export default {
     components: {
       Popper
     },
     data() {
       return {
         // 双向绑定，控制弹出层是否弹出
         showPopper: false
       },
     },
   }
   </script>
   ```

   

2. 给`vue-popper`实例指定**弹出层**和**定位层**。

   ```vue
   mounted() {
     this.$refs.popper.popperElm = this.$refs['fly-piece'];
     this.$refs.popper.referenceElm = this.$el;
   }
   ```

   

3. 通过控制`vue-popper`的`props.value`来控制是否弹出。

   ```vue
   this.showPopper = !this.showPopper
   ```

   

通过掌握这些高级技巧和窍门，你可以更好地定制和优化`ElementUI`应用程序，提供更出色的用户体验和更灵活的界面交互。还有没有发现`ElementUI`中更好玩的内容，发出来大家学习学习。