---
title: 微信H5获取微信发票抬头列表
date: 2024-01-30
hideComments: false
tags:
 - 微信H5
 - 前端开发
categories:
 - 前端开发
 - 微信公众号
publish: true
---
```javascript
import wx from 'weixin-js-sdk'
wx.config({
  beta: true,
  debug: false,
  appId,
  timestamp,
  nonceStr,
  signature,
  jsApiList: [
    'chooseInvoiceTitle'
  ]
})
export function wxChooseInvoice () {
  return new Promise((resolve, reject) => {
    wx.invoke('chooseInvoiceTitle', {
      scene: 1
    }, function (res) {
      resolve(res)
    })
  })
}
// 调用微信发票接口
wxChooseInvoice().then(res => {
  const info = res.choose_invoice_title_info
  // type 0：单位，1：个人
  if (info) {
    const {type, title, taxNumber, companyAddress, telephone, bankName, bankAccount} = JSON.parse(info)
    console.log()
  }
})
```