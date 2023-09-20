---
title: 微信小程序：自定义关注公众号组件样式
sticky: 1
tags:
 - 微信小程序
 - 前端开发
categories:
 - 前端开发
date: 2023-09-20
hideComments: false
---

#### 概述

`official-account`关注公众号组件本身样式是固定的，也不支持修改样式。尽管关注公众号组件的样式固定且不可修改，但产品经理的需求却需要个性化的定制。在这种情况下，我们需要寻找解决方案，以满足这些特殊需求，尽管这可能有点棘手。

#### 背景

`official-account`：公众号关注组件。当用户扫`小程序码`打开小程序时，开发者可在小程序内配置公众号关注组件，方便用户快捷关注公众号，可嵌套在原生组件内。[更多配置及使用方法请前往微信官方文档](https://developers.weixin.qq.com/miniprogram/dev/component/official-account.html)。

基础库 `2.18.1` 起，公众号关注组件显示场景值变更如下：

小程序场景值命中以下值时，可展示关注公众号组件：

1. 1011 扫描二维码
2. 1017 前往小程序体验版的入口页
3. 1025 扫描一维码
4. 1047 扫描小程序码
5. 1124 扫“一物一码”打开小程序

小程序热启动场景值命中以下值时，冷启动场景值在【1011、1017、1025、1047、1124】中，可展示关注公众号组件：

1. 1001 发现栏小程序主入口，「最近使用」列表
2. 1038 从另一个小程序返回
3. 1041 从插件小程序返回小程序
4. 1089 微信聊天主界面下拉，「最近使用」栏
5. 1090 长按小程序右上角菜单唤出最近使用历史
6. 1104 微信聊天主界面下拉，「我的小程序」栏
7. 1131 浮窗
8. 1187 新版浮窗，微信8.0起

> **Tips**
>
> 1. 使用组件前，需前往小程序后台，在*设置* -> *关注公众号*中设置要展示的公众号。注：设置的公众号需与小程序为同主体或关联主体。
> 2. 在一个小程序的生命周期内，只有从以下场景进入小程序，才具有展示引导关注公众号组件的能力：
>    1. 当小程序从扫小程序码场景（场景值1047，场景值1124）打开时。
>    2. 当小程序从聊天顶部场景（场景值1089）中的「最近使用」内打开时，若小程序之前未被销毁，则该组件保持上一次打开小程序时的状态。
>    3. 当从其他小程序返回小程序（场景值1038）时，若小程序之前未被销毁，则该组件保持上一次打开小程序时的状态。
> 3. 为便于开发者调试，基础库 `2.7.3` 版本起开发版小程序增加以下场景展示公众号组件：
>    1. 开发版小程序从扫二维码（场景值 1011）打开 — 体验版小程序打开
> 4. 组件限定最小宽度为`300px`，高度为定值`84px`。
> 5. 每个页面只能配置一个该组件。

#### 效果图对比

**官方**

![Snipaste_2023-09-11_17-00-09](https://raw.githubusercontent.com/chnjames/cloudImg/main/blog/202309111703470.png)

**自定义**

![Snipaste_2023-09-11_17-11-00](https://raw.githubusercontent.com/chnjames/cloudImg/main/blog/202309111711557.png)

#### 实现示例（微信小程序原生）

- 在`components`文件夹中自定义组件：`wx-official-account`

  ```javascript
  <!--wxml-->
  <view class="wx-official-account" wx:if="{{show}}" style="bottom:{{bottom}};opacity:{{opacity}}">
    <view class="background">
      <view class="left">
        <image class="img" src="{{icon}}"></image>
        <view class="left-cont">
          <view class="title">{{name}}</view>
          <view class="desc">{{desc}}</view>
        </view>
      </view>
      <view class="btn">{{isConcern ? '查看': '关注'}}<official-account class="official-account" id="official_account"></official-account></view>
    </view>
    <image class="icon-close" src="https://acup.oss-cn-hangzhou.aliyuncs.com/video/webapp/images/edu_weapp/icon3-close-g.png" catchtap="close"></image>
  </view>
  <!--js-->
  Component({
    options: {
      addGlobalClass: true
    },
    properties: {
  	icon: {
  	  type: String,
        value: '' // 公众号ICON链接
      },
      name: {
        type: String,
        value: '' // 公众号名称
      },
      desc: {
        type: String,
        value: '' // 公众号简介
      },
      bottom: {
        type: [String, Number],
        value: 'calc(env(safe-area-inset-bottom))' // 关注公众号组件bottom
      },
      isConcern: {
        type: Boolean,
        value: false // 是否关注公众号
      },
      max: {
        type: [String, Number],
        value: 3 // 最大关闭次数
      }
    },
    lifetimes: {
      attached: function () {
        setTimeout(() => {
          this.init()
        }, 800)
      }
    },
    data: {
      show: true,
      opacity: 0
    },
    methods: {
      // 这里是一个自定义方法
      init() {
        let that = this
        const query = wx.createSelectorQuery().in(this)
        query.select('#official_account').boundingClientRect(res => {
          if (res.width && res.height) {
            that.check();
          } else {
            that.setData({show: false})
          }
        }).exec()
      },
      async check() {
        try {
          const num = wx.getStorageSync('CLOSE_OFFICIAL_ACCOUNT');
          const {max, isConcern} = this.data;
          if (+num >= max) {
            this.setData({show: false})
            return false;
          }
          this.setData({show: !isConcern})
          const {show} = this.data;
          if (show) this.setData({opacity: 1})
        } catch (e) {
          this.setData({show: false})
        }
      },
      close() {
        this.setData({show: false})
        const storageAccount = wx.getStorageSync('CLOSE_OFFICIAL_ACCOUNT');
        const num = storageAccount ? +storageAccount + 1 : 1;
        wx.setStorageSync('CLOSE_OFFICIAL_ACCOUNT', num);
      }
    }
  });
  <!--wxss-->
  .wx-official-account {
    background: url("https://acup.oss-cn-hangzhou.aliyuncs.com/video/webapp/images/edu_weapp/img3-official-account.png") no-repeat;
    background-size: 100% 100%;
    position: fixed;
    z-index: 1000;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 84rpx 28rpx 28rpx;
    border-radius: 12rpx;
    font-weight: 400;
  }
  .wx-official-account .img {
    width: 80rpx;
    height: 80rpx;
    display: block;
  }
  .wx-official-account .title {
    font-size: 32rpx;
    color: #0A0A0A;
  }
  .wx-official-account .desc {
    font-size: 22rpx;
    color: #ABAFB3;
  }
  .wx-official-account .btn {
    position: relative;
    width: 104rpx;
    height: 56rpx;
    line-height: 56rpx;
    padding: 0;
    border-radius: 4rpx;
    overflow: hidden;
    text-align: center;
    font-size: 32rpx;
    color: #711920;
    border: 2rpx solid #711920;
  }
  .wx-official-account .btn .official-account {
    position: absolute;
    z-index: 1001;
    right: 0;
    top: 0;
    opacity: 0;
    max-width: 616rpx;
    max-height: 56rpx;
  }
  .wx-official-account .icon-close {
    position: absolute;
    z-index: 1001;
    right: 28rpx;
    top: 32rpx;
    width: 28rpx;
    height: 28rpx;
  }
  .background {
    width: 616rpx;
    height: 120rpx;
    background: #FFFFFF;
    border-radius: 8rpx;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 16rpx;
  }
  .background .left {
    display: flex;
    align-items: center;
  }
  .left-cont {
    margin-left: 20rpx;
  }
  .left-cont .title {
    font-weight: 400;
    font-size: 32rpx;
    color: #0A0A0A;
    margin-bottom: 2rpx;
  }
  .left-cont .desc {
    max-width: 370rpx;
    font-weight: 400;
    font-size: 22rpx;
    color: #ABAFB3;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  ```

- 组件调用

  - 在`xxx.json`中引入该组件

  ```json
  {
    "usingComponents": {
      "custom-official-account": "/components/wx-official-account/index"
    }
  }
  ```

  - 在`xxx.wxml`中使用改组件

  ```html
  <custom-official-account isConcern="{{isWxLook}}"></custom-official-account>
  ```

  - 在`xxx.js`中定义参数

  ```javascript
  Page({
    data: {
    	isWxLook: false // 是否微信关注
    },
    onLoad(options) {
      // 请求接口判断是否关注公众号，如果已关注，则不再显示此组件
      getSubscribe({userId}).then(res => {
        if (res.code === 0) {
          this.setData({
            isWxLook: res.data === 1
          })
        }
      })
    }
  })
  ```

#### 总结

主要思路是通过一系列操作来实现自定义的关注按钮，覆盖在官方的关注公众号组件上，以实现一种特定的界面效果。以下是文章的主要内容总结：

**1. 显示组件并设置透明度为0：** 首先，通过某种方式让自定义组件显示在页面上，但将其透明度设置为0，使其在页面上不可见。

**2. 判断组件的宽高：** 接着检测自定义组件的宽度和高度。这一步的目的是确认页面上是否有足够的空间来容纳自定义组件，以免它会影响页面布局。

**3. 判断是否已关注公众号：** 接下来，会检查用户是否已经关注了官方的公众号。这一检查可以通过`API`调用或其他方式来实现。

**4. 控制组件的显示：** 基于用户是否已经关注公众号的结果，决定是否显示自定义组件。如果用户已关注，自定义组件保持不可见；如果用户未关注，自定义组件会变得可见。

**5. 实现自定义关注按钮：** 自定义组件被放置在官方的关注按钮上层，透明度设置为0，以实现自定义的关注按钮效果。用户在界面上看到的是自定义按钮，但实际上点击的是位于它下面的官方组件的按钮。

通过这一系列操作，成功地实现了一个覆盖在官方关注按钮上的自定义关注按钮，提供了一种创造性的用户界面效果。这篇博客主要总结了实现这一效果的主要思路和步骤，对于想要定制用户界面的开发者和设计师来说，可能会提供有用的参考和灵感。

如果有更好的实现思路或者方法，请留言☞评论区，欢迎大家讨论。