---
title: Vue 组件设计：构建生动多彩的树形结构组件
date: 2024-04-27
hideComments: false
tags:
 - Element
 - 前端开发
categories:
 - 前端开发
publish: true
---
一个优雅展示树形结构数据的 Vue 组件，递归渲染每个节点及其子节点，支持自定义颜色、文本和布局。通过独特的样式巧妙处理不同层级，为用户打造丰富的视觉盛宴。

#### **核心功能**

\- **递归渲染**：组件可以递归地渲染每个节点及其子节点，形成树形结构；
\- **自定义样式**：支持通过传入的节点数据自定义节点颜色和文本；
\- **动态布局**：可以根据传入的属性决定节点是左布局、右布局还是左右布局；
\- **层级颜色**：根据节点的层级显示不同的颜色。

废话不多说，我们直接开始！

**效果图：**

![Snipaste_2024-02-01_17-43-36](https://raw.githubusercontent.com/chnjames/cloudImg/main/blog/202402011744029.png)

首先，我们在`components`文件夹下新建一个组件`PathoNode.vue`，该组件将负责渲染每个节点及其子节点。

其中，`LEVEL_COLORS` 为不同层级节点定义了颜色，`isLeaf` 计算属性用于判断当前节点是否为叶子节点。

代码如下：

```vue
<template>
  <div class="node-item" :class="{left: isLeft}">
    <div class="node-item_not-leaf" v-if="!isLeaf">
      <div class="node-name" :style="{background: node.color || LEVEL_COLORS[node.level] || LEVEL_COLORS[3]}" :class="{'round': node.level === 2}">{{node.text}}</div>
      <div class="node-children">
        <patho-node v-for="(childNode, i) in node.children" :key="'childNode' + i" :node="childNode" :isLeft="isLeft"/>
      </div>
    </div>
    <div class="node-item_leaf" v-else>
      <div class="node-name">{{node.text}}</div>
    </div>
  </div>
</template>

<script>
const LEVEL_COLORS = {
  1: '#1A4843',
  2: '#464885',
  3: '#46857E',
  4: '#857146',
  5: '#6A8546',
  6: '#854646',
  7: '#818076',
  8: '#979B33',
  9: '#336E9B',
  10: '#854683'
}
export default {
  name: 'PathoNode',
  props: {
    node: {
      type: Object,
      default () {
        return {}
      }
    },
    isLeft: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      LEVEL_COLORS
    }
  },
  computed: {
    isLeaf () {
      return !(this.node.children && this.node.children.length > 0)
    }
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
$border-color-primary: #B5BDC4;
$text-color-primary: #b4babf;
$color-black: #000000;
@mixin firstNode {
  position: relative;
  border: none;
}
@mixin rightNode {
  position: relative;
  padding-left: 10px;
  border-left: 1px solid $border-color-primary;
}
@mixin leftNode {
  position: relative;
  padding: 0;
  padding-right: 10px;
  border: none;
  border-right: 1px solid $border-color-primary;
}
@mixin rightHorizonLine {
  content: '';
  position: absolute;
  top: 50%;
  left: 0;
  width: 10px;
  border-top: 1px solid $border-color-primary;
}
@mixin leftHorizonLine {
  @include rightHorizonLine;
  left: auto;
  right: 0;
}
@mixin beforeRightFirstChild {
  bottom: 0;
  border-radius: 4px 0 0 0;
  border-left: 1px solid $border-color-primary;
}
@mixin beforeRightLastChild {
  left: 0;
  top: 0;
  bottom: 50%;
  border-radius: 0 0 0 4px;
  border: none;
  border-left: 1px solid $border-color-primary;
  border-bottom: 1px solid $border-color-primary;
}
// 左边第一个child
@mixin beforeLeftFirstChild {
  @include beforeRightFirstChild;
  border: none;
  border-radius: 0 4px 0 0;
  border-top: 1px solid $border-color-primary;
  border-right: 1px solid $border-color-primary;
}
// 左边最后一个child
@mixin beforeLeftLastChild {
  @include beforeRightLastChild;
  border-radius: 0 0 4px 0;
  border: none;
  border-right: 1px solid $border-color-primary;
  border-bottom: 1px solid $border-color-primary;
}
@mixin beforeRightOnlyOneChild {
  left: 0;
  top: 50%;
  bottom: auto;
  border: 0;
  border-radius: 0;
  border-top: 1px solid $border-color-primary;
}
@mixin beforeLeftOnlyOneChild {
  @include beforeRightOnlyOneChild;
  left: auto;
  right: 0;
}
.node-item {
  display: flex;
  position: relative;
  flex-direction: row;
  justify-content: flex-start;
  @include rightNode;
  &::before{
    @include rightHorizonLine;
  }
  &:first-child{
   @include firstNode;
    &::before{
      @include beforeRightFirstChild;
    }
  }
  &:last-child{
    border-left: none;
    &::before{
      @include beforeRightLastChild;
    }
  }
  &:first-child:last-child{
    border-left: none;
  }
  &:first-child:last-child::before{
    @include beforeRightOnlyOneChild;
  }
  .node-name{
    flex-shrink: 0;
    display: inline-block;
    font-size: 14px;
    border-radius: 1px;
    margin: 10px 0;
    padding: 5px 20px;
    width: auto;
    line-height: 20px;
    font-weight: 600;
    height: auto;
    border-radius: 3px;
    color: $color-black;
    &.round{
      width: 64px;
      height: 64px;
      padding: 0;
      border-radius: 50%;
      line-height: 64px;
      text-align: center;
    }
  }
  .node-children{
    @include rightNode;
    border-left: none;
    &::before{
      @include rightHorizonLine;
    }
  }
  .node-item_not-leaf{
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    &::before{
      border-left: 1px solid $border-color-primary;
    }
  }
  .node-item_leaf{
    .node-name{
      background: $color-black;
      color: $text-color-primary;
      border: 1px solid $text-color-primary;
      margin-right: 20px;
    }
  }
  &.left{
    @include leftNode;
    &::before{
      @include leftHorizonLine;
    }
    &:first-child{
      @include firstNode;
    }
    &:first-child::before{
      @include beforeLeftFirstChild;
    }
    &:last-child{
      border: none;
      &::before{
        @include beforeLeftLastChild;
      }
    }
    &:first-child:last-child{
      border-right: none;
    }
    &:first-child:last-child::before{
      @include beforeLeftOnlyOneChild;
    }
    .node-item_not-leaf{
      &::before{
        border: none;
        border-right: 1px solid $border-color-primary;
      }
    }
    .node-name{
      &::after{
        content: '\200E';
      }
    }
    .node-children{
      @include leftNode;
      border-right: none;
      &::before{
        @include leftHorizonLine;
      }
    }
    .node-item_leaf{
      .node-name{
        margin-right: 0;
        margin-left: 20px;
      }
    }
  }
  // transition
  .node-fade-enter-acitve, .node-fade-leave-active {
    transition: all .5s;
  }
  .node-fade-enter, .node-fade-leave-to{
    opacity: 0;
  }
  .node-fade-enter-to, .node-fade-leave {
    opacity: 1;
  }
}
</style>
```



节点组件部分负责定义单个节点的渲染结构，并通过递归调用`<patho-node>`组件处理子节点。当然，根据具体业务需求，你也可以进一步封装此文件成为专用的业务组件。

```vue
<template>
  <div class="patho-tab" ref="pathoChartContainer">
    <div class="patho-tab__zoom" @click="clickHandler">
      <el-scrollbar style="height:100%; width:100%;">
        <transition name="patho-chart">
          <div class="patho-chart" :style="{ transform: `scale(${scaleRatio}) translate(${translateX}px, ${translateY}px)` }">
            <div class="patho-chart__section patho-chart__section_left" v-if="leftDatas.length > 0">
              <patho-node v-for="(node, i) in leftDatas" :key="'node' + i" :node="node" :isLeft="true" />
            </div>
            <div class="patho-chart__section patho-chart__section_center root-node" v-if="nodeData">{{ nodeData.text }}
            </div>
            <div class="patho-chart__section patho-chart__section_right " v-if="rightDatas.length > 0">
              <patho-node v-for="(node, i) in rightDatas" :key="'node' + i" :node="node" :isLeft="false" />
            </div>
          </div>
        </transition>
      </el-scrollbar>
    </div>
  </div>
</template>
<script>
import pathoNode from '@/components/PathoNode.vue'
export default {
  components: {
    pathoNode
  },
  data() {
    return {
      scaleRatio: 1,
      translateX: 0,
      translateY: 0,
      // 组织结构图数据
      nodeData: {
        "text": "综合分析",
        "color": null,
        "level": 1,
        "children": [
          {
            "text": "血",
            "color": "#9BBA5B",
            "level": 2,
            "children": [
              {
                "text": "活血化瘀",
                "color": null,
                "level": 3,
                "children": [
                  {
                    "text": "岷归",
                    "color": null,
                    "level": 4,
                    "children": null
                  }
                ]
              }
            ]
          },
          {
            "text": "汗",
            "color": "#C58080",
            "level": 2,
            "children": [
              {
                "text": "固涩_止汗",
                "color": null,
                "level": 3,
                "children": [
                  {
                    "text": "白芍",
                    "color": null,
                    "level": 4,
                    "children": null
                  },
                  {
                    "text": "于朮",
                    "color": null,
                    "level": 4,
                    "children": null
                  }
                ]
              }
            ]
          }
          // ...
        ]
      }
    }
  },
  computed: {
    leftDatas() {
      const children = this.nodeData.children || []
      const len = children.length
      return children.slice(0, Math.floor(len / 2))
    },
    rightDatas() {
      const children = this.nodeData.children || []
      const len = children.length
      return children.slice(len / 2)
    }
  },
  methods: {
    clickHandler() {
      if (this.scaleRatio === 1) {
        this.scaleRatio = 1.2;
      } else {
        this.scaleRatio = 1;
      }
    }
  }
}
</script>
<style lang="scss" scoped>
$border-color-primary: #B5BDC4;
$color-primary: #49B8A3;
$color-black: #000000;

@mixin rightHorizonLine {
  content: '';
  position: absolute;
  top: 50%;
  left: 0;
  width: 10px;
  border-top: 1px solid $border-color-primary;
}

@mixin leftHorizonLine {
  @include rightHorizonLine;
  left: auto;
  right: 0;
}

.patho-tab {
  display: flex;
  flex-direction: column;
  height: 100%;
  position: relative;

  &__body {
    user-select: none;
    overflow: hidden;
    flex-grow: 1;
  }

  .patho-chart {
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    padding: 2em 0;
    width: max-content;
    cursor: pointer;

    .patho-chart__section {
      display: flex;
      flex-direction: column;
      flex-shrink: 0;
      flex-basis: auto;

      &.patho-chart__section_right {
        position: relative;
        padding: 0 0 0 10px;

        &::before {
          @include rightHorizonLine
        }
      }

      &.patho-chart__section_left {
        position: relative;
        direction: rtl;
        text-align: left;
        justify-content: flex-end;
        padding: 0 10px 0 0;

        &::before {
          @include leftHorizonLine;
        }
      }
    }

    .root-node {
      width: 90px;
      height: 90px;
      border-radius: 50%;
      background: #1A4843;
      color: $color-black;
      font-size: 16px;
      font-weight: 600;
      color: $color-primary;
      text-align: center;
      line-height: 90px;
    }
  }
}

/deep/ .el-scrollbar__view {
  min-height: 100%;
}

.patho-tab__zoom {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.8);
  user-select: none;
  z-index: 100;

  .patho-chart {
    margin: 0;
    transform-origin: 0 0;
  }
}

.patho-tab__no-datas {
  margin-top: 20%;
  text-align: center;

  &_icon {
    width: 200px;
  }

  &_text {
    @include noDatas;
  }
}

.patho-chart-enter-active,
.patho-chart-leave-active {
  transition: opacity .5s;
}

.patho-chart-enter,
.patho-chart-leave-to {
  opacity: 0;
}

.patho-chart-enter-to,
.patho-chart-leave {
  opacity: 1;
}
</style>
```



通过以上设计，我们成功打造了一个多功能的树形结构组件，具备丰富的自定义选项，涵盖节点颜色、文本和布局等方面。这样的组件不仅能够实现功能性的树形结构展示，同时为用户提供了生动多彩的视觉体验。

