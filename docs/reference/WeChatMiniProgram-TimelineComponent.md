---
title: 微信小程序：轻松实现时间轴组件
tags:
 - JavaScript
 - 前端开发
 - 微信小程序
categories:
 - 前端开发
date: 2024-08-07
hideComments: false
---
### 效果图

![https://raw.githubusercontent.com/chnjames/cloudImg/main/Images202408191517565.png](https://raw.githubusercontent.com/chnjames/cloudImg/main/Images202408191517565.png)

### 引言

> **老板:** “我们公司是做基金的，用户都在买买买，可他们的钱去了哪里？没有时间轴，用户会不会觉得自己的钱瞬移了？”
>
> **你:** “哈哈，确实！时间轴就像用户的投资地图，不然他们可能觉得钱被外星人劫走了。”
>
> **老板:** “没错！我们得在时间轴上标清‘资金到账’、‘收益结算’这些节点，这样用户就不会担心他们的钱去买彩票了。”
>
> **你:** “放心吧，老板，我马上设计一个时间轴，让用户一看就明白他们的钱在干什么，还能时不时地笑一笑！”
>
> **老板:** “好，赶紧行动，不然用户要开始给我们寄失踪报告了！”

废话不多说，我们直接开始吧！！！

### 组件定义

以下代码为时间轴组件的实现，详细注释在代码中。如果有任何疑问，欢迎在评论区留言讨论，或者联系我获取完整案例。

**组件的 `.js` 文件：**

```javascript
/*可视化地呈现时间流信息*/
Component({
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  properties: {
    activities: { // 时间轴列表
      type: Array,
      value: []
    },
    shape: { // 时间轴形状
      type: String,
      value: 'circle' // circle | square
    },
    ordinal: { // 是否显示序号
      type: Boolean,
      value: true
    },
    reverse: { // 是否倒序排列
      type: Boolean,
      value: false
    }
  },
  lifetimes: {
    attached() {
      // 是否倒序排列操作数据
      const {reverse, activities} = this.data
      if (!reverse) return
      this.setData({
        activities: activities.reverse()
      })
    }
  }
})
```

组件的`.wxml`文件：

```html
<view class="container">
  <view class="item" wx:for="{{activities}}" wx:key="item">
    <view class="item-tail"></view>
    <view class="item-node {{shape}} {{item.status}}">
      <block wx:if="{{ordinal}}">{{index + 1}}</block>
    </view>
    <view class="item-wrapper">
      <view class="item-news">
        <view class="item-timestamp">{{item.date}}</view>
        <view class="item-mark">收益结算</view>
      </view>
      <view class="item-content">
        <view>{{item.content}}</view>
        <!--动态slot的实现方式-->
        <slot name="operate{{index}}"></slot>
      </view>
    </view>
  </view>
</view>
```



### 组件使用

要使用该组件，首先需要在 `app.json` 或 `index.json` 中引用组件：

```json
"usingComponents": {
	"eod-timeline": "/components/Timeline/Timeline"
}
```

然后你可以通过以下方式进行基本使用：

```html
<eod-timeline activities="{{dataList}}" ordinal="{{true}}"></eod-timeline>
```

如果需要结合插槽动态显示操作记录，可以这样实现：

```html
<eod-timeline activities="{{dataList}}" ordinal="{{true}}">
    <!--动态slot的实现方式-->
    <view wx:for="{{dataList}}" wx:for-index="idx" wx:key="idx" slot="operate{{idx}}">
      <view class="row-operate">
        <view>操作记录</view>
        <view>收益记录</view>
        <view>动账记录</view>
      </view>
    </view>
</eod-timeline>
```

### 数据结构与属性说明

`dataList` 数据结构示例如下：

```javascript
dataList:[
  {date: '2023-05-26 12:04:14', status: 'info', content: '内容一'},
  {date: '2023-05-25 12:04:14', status: 'success', content: '内容二'},
  {date: '2023-05-24 12:04:14', status: 'success', content: '内容三'},
  {date: '2023-05-23 12:04:14', status: 'error', content: '内容四'},
  {date: '2023-05-22 12:04:14', status: 'warning', content: '内容五'}
]
```

组件的属性配置如下表所示：

| 参数       | 说明         | 可选值          | 类型      | 默认值 |
| ---------- | ------------ | --------------- | --------- | ------ |
| activities | 显示的数据   | —               | `array`   | —      |
| shape      | 时间轴点形状 | circle / square | `string`  | circle |
| ordinal    | 是否显示序号 | —               | `boolean` | true   |
| reverse    | 是否倒序排列 | —               | `boolean` | false  |

### 总结

这个时间轴组件提供了一个简单易用的方式来展示事件的时间顺序。组件支持定制形状、序号显示以及正序或倒序排列，同时允许通过插槽自定义内容，增强了组件的灵活性。代码中有详细注释，方便理解和修改。如果需要更详细的案例或有任何疑问，请在评论区留言。希望这篇文章对你有所帮助！

### 拓展阅读

**关于动态 `Slot` 实现：**

由于动态 `slot` 目前仅可用于 `glass-easel` 组件框架，而该框架仅可用于 `Skyline` 渲染引擎，因此这些特性也同样受此限制。如果需要在非 `glass-easel` 组件框架中实现动态 `slot`，请参考上文标记了 `<!--动态slot的实现方式-->` 的代码段。

如需了解更多关于 `glass-easel` 组件框架的信息，请参阅[微信小程序官方开发指南](https://developers.weixin.qq.com/miniprogram/dev/framework/custom-component/glass-easel/dynamic-slots.html)。

