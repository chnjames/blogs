---
title: 微信H5支付--微信JS-SDK支付--点金计划
date: 2024-01-11
hideComments: false
tags:
 - 微信支付
 - 点金计划
categories:
 - 前端开发
 - 微信支付
publish: true
---
### 微信`H5`支付

`微信H5支付` ：`H5`支付是指商户在微信客户端外的移动端网页展示商品或服务，用户在前述页面确认使用微信支付时，商户发起本服务呼起微信客户端进行支付（`简而言之：从外部浏览器唤起微信进行支付`）

[产品介绍-`H5`支付 | 微信支付商户平台文档中心](https://pay.weixin.qq.com/wiki/doc/apiv3/open/pay/chapter2_6_0.shtml)

相关配置参考：[`H5`支付开始指引](https://pay.weixin.qq.com/wiki/doc/apiv3/open/pay/chapter2_6_2.shtml)

**`重点：微信内置浏览器无法使用微信H5支付（需要进行区分环境：微信内置浏览器环境 | 非微信环境）；`**
**`重点：H5支付不建议在APP端使用(app内嵌，使用app支付)；`**
**`重点：IOS 某些浏览器唤起微信支付进行成功后，会重新开 safari任务 导致token失效（代码已处理）`**

### `H5`支付配置

- 登录 [微信支付商户平台](https://pay.weixin.qq.com/)

  ![image-20240111093642691](https://raw.githubusercontent.com/chnjames/cloudImg/main/blog/202401110944803.png)

- 登录 [微信支付商户平台](https://pay.weixin.qq.com/) —> 产品中心 —> `H5`支付 —> 申请开通

  ![2.PNG](https://raw.githubusercontent.com/chnjames/cloudImg/main/blog/202401110946879.webp)

- 进行`H5`支付域名配置

  ![3.PNG](https://raw.githubusercontent.com/chnjames/cloudImg/main/blog/202401110948718.webp)

  **`注意：域名必须通过 ICP 备案；`**
  **`注意：域名填写格式不包含http://或https://`**

### `H5`支付开发

**微信官网推荐`H5`支付：**

```javascript
// payParam 后端返回h5支付链接: https://wx.tenpay.com/cgi-bin/mmpayweb-bin/checkmweb?prepay_id=*****************&package=*****************
// redirect_url 支付成功、支付失败回调地址（包含参数） 需要urlencode编码
location.href = `${payParam}&redirect_url=${encodeURIComponent(redirect_url)}`;
```

**微信官方推荐存在的问题：**

- `浏览器需要跳转到微信安全页面环境（**存在空白页面**），然后在这个页面打开微信支付；`
- `部分手机支付完成后，浏览器会回退 会回退到微信安全页面(空白，再次拉起微信支付); `微信官方推荐方法会跳转一个空白页面（微信支付安全页面），个人感觉体验感非常不好， 因此针对微信支付(`H5`支付)，做了一下规避处理；

**针对微信支付安全校验处理（规避以上微信官方存在的问题）：**

微信为保证支付安全：`H5`支付需要网站跳转[微信安全页面](https://wx.tenpay.com/cgi-bin/mmpayweb-bin/checkmweb)：后端返回`H5`支付链接）页面进行唤起微信`app`支付；

代码如下：

```html
<!DOCTYPE html>
<html>
  <head lang="en">
    <meta http-equiv="Content-Type" content="text/html;charset=utf-8" />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
    />
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-status-bar-style" content="black" />
    <meta name="format-detection" content="telephone=no" />
    <title>weixin</title>
    <style>
      .f10 {
        font-size: 10px;
      }
      .f11 {
        font-size: 11px;
      }
      .f12 {
        font-size: 12px;
      }
      .f13 {
        font-size: 13px;
      }
      .f14 {
        font-size: 14px;
      }
      .f15 {
        font-size: 15px;
      }
      .f16 {
        font-size: 16px;
      }
      .f17 {
        font-size: 17px;
      }
      .f18 {
        font-size: 18px;
      }
      .f19 {
        font-size: 19px;
      }
      .f20 {
        font-size: 20px;
      }
      body {
        font-size: 14px;
      }
      h1,
      h2,
      h3,
      h4,
      h5 {
        font-weight: 400;
        font-style: normal;
      }
      h1,
      .h1 {
        font-size: 20px;
      }
      h2,
      .h2 {
        font-size: 18px;
      }
      h3,
      .h3 {
        font-size: 16px;
      }
      h4,
      .h4 {
        font-size: 14px;
      }
      h5,
      .h5 {
        font-size: 12px;
      }
      a,
      a:visited {
        color: #007aff;
      }
      .text_color {
        color: #888;
      }
      .title_color {
        color: #000;
      }
      .desc {
        color: #b2b2b2;
      }
      .warn {
        color: #b71414;
      }
      .nickname {
        color: #576b95;
      }
      .tips {
        font-size: 13px;
        color: #b2b2b2;
      }
      body {
        background-color: #fff;
      }
      body.msg_dark {
        background-color: #2e3132;
        color: #fff;
      }
      .page_msg {
        padding: 75px 15px 0;
        text-align: center;
      }
      .icon_area {
        margin-bottom: 19px;
      }
      .text_area {
        margin-bottom: 25px;
      }
      .text_area .title {
        margin-bottom: 12px;
      }
      .opr_area {
        margin-bottom: 25px;
      }
      .extra_area {
        margin-bottom: 20px;
      }
      @media screen and (min-height: 416px) {
        .extra_area {
          position: fixed;
          left: 0;
          bottom: 0;
          width: 100%;
        }
      }
      .btn {
        display: block;
        margin-left: auto;
        margin-right: auto;
        padding-left: 14px;
        padding-right: 14px;
        font-size: 16px;
        text-align: center;
        text-decoration: none;
        overflow: visible;
        height: 40px;
        border-radius: 5px;
        -moz-border-radius: 5px;
        -webkit-border-radius: 5px;
        box-sizing: border-box;
        -moz-box-sizing: border-box;
        -webkit-box-sizing: border-box;
        color: #fff;
        line-height: 40px;
        -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
      }
      .btn.btn_inline {
        display: inline-block;
      }
      .btn_default {
        background-color: #d1d1d1;
      }
      .btn_default:not(.btn_disabled):visited {
        color: #fff;
      }
      .btn_default:not(.btn_disabled):active {
        color: rgba(255, 255, 255, 0.4);
        background-color: #a7a7a7;
      }
      .btn_primary {
        background-color: #04be02;
      }
      .btn_primary:not(.btn_disabled):visited {
        color: #fff;
      }
      .btn_primary:not(.btn_disabled):active {
        color: rgba(255, 255, 255, 0.4);
        background-color: #039702;
      }
      .btn_warn {
        background-color: #ef4f4f;
      }
      .btn_warn:not(.btn_disabled):visited {
        color: #fff;
      }
      .btn_warn:not(.btn_disabled):active {
        color: rgba(255, 255, 255, 0.4);
        background-color: #c13e3e;
      }
      .btn.btn_mini {
        height: 25px;
        line-height: 25px;
        font-size: 14px;
      }
      button.btn,
      input.btn {
        width: 100%;
        border: 0;
        outline: 0;
        appearance: none;
        -webkit-appearance: none;
      }
      button.btn:focus,
      input.btn:focus {
        outline: 0;
      }
      button.btn_inline,
      input.btn_inline {
        width: auto;
      }
      .btn_disabled {
        color: rgba(255, 255, 255, 0.6);
      }
      .btn + .btn {
        margin-top: 10px;
      }
      .btn.btn_inline + .btn.btn_inline {
        margin-top: auto;
        margin-left: 10px;
      }
      .btn_area {
        margin-left: -5px;
        margin-right: -5px;
        font-size: 0;
      }
      .btn_area.btn_area_inline {
        margin-left: auto;
        margin-right: auto;
        display: -webkit-box;
        display: -webkit-flex;
        display: -moz-box;
        display: -ms-flexbox;
        display: flex;
      }
      .btn_area.btn_area_inline .btn {
        margin-top: auto;
        margin-right: 10px;
        width: 100%;
        -webkit-box-flex: 1;
        -webkit-flex: 1;
        -moz-box-flex: 1;
        -ms-flex: 1;
        box-flex: 1;
        flex: 1;
        display: inline-block \9;
        width: 48% \9;
        margin-left: 1% \9;
        margin-right: 1% \9;
      }
      .btn_area.btn_area_inline .btn:last-child {
        margin-right: 0;
      }
      span.btn button {
        display: block;
        width: 100%;
        height: 100%;
        background-color: transparent;
        border: 0;
        outline: 0;
        color: #fff;
      }
      span.btn button:active {
        color: rgba(255, 255, 255, 0.4);
      }
      span.btn.btn_loading button,
      span.btn.btn_disabled button {
        color: #fff;
      }
      .icon_msg {
        width: 100px;
        height: 100px;
        vertical-align: middle;
        display: inline-block;
        border-radius: 50%;
        -moz-border-radius: 50%;
        -webkit-border-radius: 50%;
      }
      .icon_msg.warn {
        background-color: #f86161;
        color: #fff;
        font-size: 60px;
        font-style: normal;
      }
      html {
        -ms-text-size-adjust: 100%;
        -webkit-text-size-adjust: 100%;
      }
      body {
        font: 14px/1.5em "Helvetica Neue", Helvetica, Arial, sans-serif;
        background-color: #efeff4;
        line-height: 1.6;
      }
      body,
      h1,
      h2,
      h3,
      h4,
      h5,
      p,
      ul,
      ol,
      dl,
      dd,
      fieldset,
      textarea {
        margin: 0;
      }
      fieldset,
      legend,
      textarea,
      input,
      button {
        padding: 0;
      }
      button,
      input,
      select,
      textarea {
        font-family: inherit;
        font-size: 100%;
        margin: 0;
        font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
      }
      ul,
      ol {
        padding-left: 0;
        list-style-type: none;
      }
      a img,
      fieldset {
        border: 0;
      }
      a {
        text-decoration: none;
      }
    </style>
  </head>
  <body>
    <div class="body">
      <div id="errpage" class="page_msg">
        <div class="icon_area"><i class="icon_msg warn">!</i></div>
        <div class="text_area">
          <h2 id="111" class="title">支付请求已失效，请重新发起支付</h2>
        </div>
      </div>
    </div>
    <script type="text/javascript">
      var is_postmsg = "";
      if (1 !== 0 && is_postmsg == "1") {
        parent.postMessage(
          JSON.stringify({
            action: "send_deeplink_fail",
            data: {
              deeplink: "", // 成功 会有值：
            },
            error: {
              error_code: "1",
              error_msg: "支付请求已失效，请重新发起支付",
            },
          }),
          ""
        );
      }
      if (1 === 0) {
        window.onload = function () {
          {
            var is_postmsg = "";
            if (is_postmsg == "1") {
              parent.postMessage(
                JSON.stringify({
                  action: "send_deeplink",
                  data: {
                    deeplink: "", // 成功 会有值：
                  },
                }),
                ""
              );
            } else {
              var url = "";
              var redirect_url = "";
              top.location.href = url;

              if (redirect_url) {
                setTimeout(function () {
                  top.location.href = redirect_url;
                }, 5000);
              } else {
                setTimeout(function () {
                  window.history.back();
                }, 5000);
              }
            }
          }
          // );
        };
      }
    </script>
  </body>
</html>
```

**以上代码解析：**

**`deeplink`** **：** 为深链接（ URL Scheme），可以通过`window.open('deepink')` 或者 `location.href = 'deepink'`打开`app`；
**`redirect_url`** **：** 为回调地址（支付成功 | 支付失败）， `5S`默认跳转`redirect_url`地址； 没有配`redirect_url` 则返回上一级页面；

可以将 `https://wx.tenpay.com/cgi-bin/mmpayweb-bin/checkmweb` 微信安全支付页面当做一个(Doc)接口来处理；

以下代码，由以微信安全支付页面代码解析得来：

**`nginx` 配置转发服务：**

```nginx
 location /cgi-bin/ {
    # https://wx.tenpay.com/cgi-bin/ 微信支付域名（禁止跨域）
    proxy_pass https://wx.tenpay.com/cgi-bin/;
    # Referer 微信商户安全支付域名（根据自己商户进行配置）
    proxy_set_header Referer "https://payh5-test.dab.tech";
}
```

**接口请求：**

```javascript
import axios from 'axios'; // axios 
/**TODO: 微信支付(绕过微信安全校验，跳转url) */
export const wxPay = (url) => {
  return axios({
    method: 'GET',
    url,
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
    },
  });
};
```

**支付代码：**

```javascript
/**
 * @name isAndroid Is the environment 安卓
 * @return {boolean} True if value is an Android, otherwise false
 */
 const isAndroid = () => {
  const u = navigator.userAgent;
  return u.indexOf('Android') > -1 || u.indexOf('Adr') > -1;
};
/**深度链接正则 */
const deepLinkRule = /deeplink\s*:\s*"([^"]+)"/;
const iframeId = 'iframe-pay';
// 绕过微信安全校验失败
const WxApiError = (res, path) => {
    if (isAndroid()) {
      const iframe = document.createElement('iframe');
      document.body.appendChild(iframe);
      iframe.style.position = 'absolute';
      iframe.style.left = '-9999px';
      iframe.allow = 'payment';
      iframe.setAttribute('sandbox', 'allow-top-navigation allow-scripts');
      iframe.id = iframeId;
      iframe.src = `${res.payParam}&redirect_url=${encodeURIComponent(path)}`;
    } else {
      // ios 禁止iframe 顶层操作
      location.replace(`${res.payParam}&redirect_url=${encodeURIComponent(path)}`);
    }
};

// 支付
const { origin } = window.location;
// TODO: safari浏览器时支付完成后会新开一个页面(token不存在), 因此需要在url上设置token，保证系统运行
// TODO: orderSn: 订单号；请根据业务需求
// TODO: token：系统登录token；请根据业务需求
const token = '*!@&#26duefsdyki$&*!';
const path = `${origin}/#/order-detail?orderSn=${params.orderNo}&token=${token}`;
try {
    wxPay(`cgi-bin/${res.payParam.split('cgi-bin/')[1]}`)
    .then((response) => {
      const match = response.data.match(deepLinkRule);
      if (match && match.length > 1) {
        const deepLinkValue = match[1];
        location.href = deepLinkValue;
        setTimeout(function () {
          window.top!.location.href = path;
        }, 5000);
      } else {
        console.log('未找到deepLinkValue的值');
        WxApiError(res, path);
      }
    })
    .catch(() => WxApiError(res, path));
} catch (_) {
    WxApiError(res, path);
}
```

### `H5`支付常见异常问题：

**`1. 商家参数格式有误，请联系商家解决：一般referer转发为空导致的；请参考上面：nginx服务转发配置;`**
**`2. 商家存在未配置的参数，请联系商家解决： 一般是因为支付域名配置原因导致；请登录微信支付商户端获取H5支付域名，并进行配置；`**
**`3. 支付请求已失效，请重新发起支付： 支付url有效期为5min，重新调用接口即可；`**



### 微信`JS-SDK`支付

**`JSAPI`** 支付是指商户通过调用微信支付提供的`JSAPI`接口，在支付场景中调起微信支付模块完成收款(为了满足微信内置浏览器唤起微信支付)；

[`JSAPI`支付产品介绍 | 微信支付商户平台文档中心](https://pay.weixin.qq.com/wiki/doc/apiv3/open/pay/chapter1_1_1.shtml)

**相关配置参考：**[`JSAPI`支付开发指引](https://pay.weixin.qq.com/wiki/doc/apiv3/open/pay/chapter2_3.shtml) 

**`注：需要提前申请微信公众号; 特约商户支付成功回调微信已收回，需要配置点金计划（参考下文）；`**

### 微信`JS-SDK`支付配置

- 登录 [微信公众平台](https://mp.weixin.qq.com/)![4.png](https://raw.githubusercontent.com/chnjames/cloudImg/main/blog/202401111352392.webp)

- 登录 [微信公众平台](https://mp.weixin.qq.com/) —> 公众号设置（申请认证）![5.png](https://raw.githubusercontent.com/chnjames/cloudImg/main/blog/202401111353065.webp)

- 登录 [微信公众平台](https://mp.weixin.qq.com/) —> 基本配置（生成`AppSecret`， 服务端使用）![6.png](https://raw.githubusercontent.com/chnjames/cloudImg/main/blog/202401111353859.webp)

- 登录 [微信公众平台](https://mp.weixin.qq.com/) —> 基本配置（配置`ip`白名单， 服务端使用）

  ![w.jpg](https://raw.githubusercontent.com/chnjames/cloudImg/main/blog/202401111355373.webp)

- 登录 [微信公众平台](https://mp.weixin.qq.com/) —> 公众号设置 —> 功能设置 （配置`js`接口域名安全， 提供后端服务调用）

  ![w3.jpg](https://raw.githubusercontent.com/chnjames/cloudImg/main/blog/202401111356248.webp)

- 登录 [微信公众平台](https://mp.weixin.qq.com/) —> 公众号设置 —> 功能设置 （网页授权域名，提供前端微信公众号授权登录）

  ![w2.jpg](https://raw.githubusercontent.com/chnjames/cloudImg/main/blog/202401111357380.webp)

- 登录 [微信公众平台](https://mp.weixin.qq.com/) —> 公众号设置 —> 功能设置 —> 网页授权域名 —> 设置 （下载文件，放置服务器根目录）

  ![w1.jpg](https://raw.githubusercontent.com/chnjames/cloudImg/main/blog/202401111357921.webp)

- 登录 [微信支付商户平台](https://pay.weixin.qq.com/)

  ![image-20240111093642691](https://raw.githubusercontent.com/chnjames/cloudImg/main/blog/202401110944803.png)

- 登录【 [微信支付商户平台](https://pay.weixin.qq.com/) —>产品中心—>开发配置】，配置；设置后一般5分钟内生效；

- 进行`JSAPI`支付域名 ；

  ![img](https://raw.githubusercontent.com/chnjames/cloudImg/main/blog/202401111401794.webp)

### 微信`JSAPI`（`JS-SDK`）支付开发

**微信公众号网页授权请参考： [网页授权 | 微信开放文档](https://developers.weixin.qq.com/doc/offiaccount/OA_Web_Apps/Wechat_webpage_authorization.html)
`JS-SDK`请参考：[概述 | 微信开放文档](https://developers.weixin.qq.com/doc/offiaccount/OA_Web_Apps/JS-SDK.html)
`JS-SDK`支付请参考：[微信支付-开发者文档](https://pay.weixin.qq.com/wiki/doc/apiv3/apis/chapter3_1_4.shtml)**

#### `Plan A`（微信前期写法）

微信授权登录（公众号授权，`js-sdk`注入用于支付）：

```javascript
// 微信公众号授权登录参考：https://developers.weixin.qq.com/doc/offiaccount/OA_Web_Apps/Wechat_webpage_authorization.html
const State = 'state' // 需要带参数 请自定义
const ScopeEnum =  {
  /**不弹出授权页面，直接跳转，只能获取用户openid */
  BASE = 'snsapi_base',
  /**弹出授权页面，可通过openid拿到昵称、性别：强制 0、所在地：强制 ""。并且， 即使在未关注的情况下，只要用户授权，也能获取其信息 */
  USERINFO = 'snsapi_userinfo',
}
const oauth = ({
    redirectUri = location.href, // 授权成功后重定向地址(需要进行编码)
    scope = ScopeEnum.USERINFO, // 应用授权作用域
    state = State, // 重定向后会带上state参数（最多128字节）
}) => {
    const url =  encodeURIComponent(redirectUri);
    window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx2421b1c4370ec43b&redirect_uri=${url}&scope=${scope}&response_type=code&state=${state}#wechat_redirect`;
};
```

**注**：**`微信公众号授权snsapi_userinfo获取返回值有所变化；变化如下`**

![img_v2_db6936b8-7967-4657-b955-4b0f72fae93g.jpg](https://raw.githubusercontent.com/chnjames/cloudImg/main/blog/202401111405769.webp)

**`重点： 授权地址不可以有端口号；`**
**`重点：授权成功后重定向地址带上code参数；`**
**`重点： hash路由会导致code参数再地址拼接异常（例如：https://baidu.com/#/order?id=123123 授权后会变成 https://baidu.com/?code=123123123123#/order?id=123123 需要特殊处理，才能获得code）；`**

支付代码：

```javascript
 // 微信支付
wx.chooseWXPay({
    "appId": "wx2421b1c4370ec43b // 公众号ID，由商户传入 (需要与公众号授权登录的appId保持一致) 
    "timestamp": "1395712654",  // 时间戳，自1970年以来的秒数  （timestamp 's' 是小写的 服务端返回的是一般大写的）   
    "nonceStr": "e61463f8efa94090b1f366cccfbbb444",      // 随机字符串     
    "package": "prepay_id=wx21201855730335ac86f8c43d1889123400",
    "signType": "RSA",     //微信签名方式：     
    "paySign": "oR9d8PuhnIc+YZ8cBHFCwfgpaK9gd7vaRvkYD7rthRAZ/X+QBhcCYL21N7cHCTUxbQ+EAt6Uy+lwSN22f5YZvI45MLko8Pfso0jm46v5hqcVwrk6uddkGuT+Cdvu4WBqDzaDjnNa5UK3GfE1Wfl2gHxIIY5lLdUgWFts17D4WuolLLkiFZV+JSHMvH7eaLdT9N5GBovBwu5yYKUR7skR8Fu+LozcSqQixnlEZUfyE55feLOQTUYzLmR9pNtPbPsu6WVhbNHMS3Ss2+AehHvz+n64GDmXxbX++IOBvm2olHu3PsOUGRwhudhVf7UcGcunXt8cqNjKNqZLhLw4jq/xDg==" //微信签名 
 })
```

**`重点：微信支付---1方式 需要微信授权登录，并且需要js-sdk的注入（SPA程序 最好在router处理）；`**
**`重点：timestamp： 是小写的，后端一般返回的是驼峰命名的；需要注意；`**
**`重点：微信支付---1方式 特约商户需要保证js-sdk授权注入的appid与商户授权的appid保持一致（如果不一致，请使用微信支付---2方法）`**

#### `Plan B`（微信目前推荐使用）

支付代码：

```javascript
// 微信官方js-sdk支付请求示例
function onBridgeReady() {
      WeixinJSBridge.invoke('getBrandWCPayRequest',{
          "appId": "wx2421b1c4370ec43b", //公众号ID，由商户传入
          "timeStamp": "1395712654", //时间戳，自1970年以来的秒数
          "nonceStr": "e61463f8efa94090b1f366cccfbbb444", //随机串
          "package": "prepay_id=up_wx21201855730335ac86f8c43d1889123400",
          "signType": "RSA", //微信签名方式：
          "paySign": "oR9d8PuhnIc+YZ8cBHFCwfgpaK9gd7vaRvkYD7rthRAZ/X+QBhcCYL21N7cHCTUxbQ+EAt6Uy+lwSN22f5YZvI45MLko8Pfso0jm46v5hqcVwrk6uddkGuT+Cdvu4WBqDzaDjnNa5UK3GfE1Wfl2gHxIIY5lLdUgWFts17D4WuolLLkiFZV+JSHMvH7eaLdT9N5GBovBwu5yYKUR7skR8Fu+LozcSqQixnlEZUfyE55feLOQTUYzLmR9pNtPbPsu6WVhbNHMS3Ss2+AehHvz+n64GDmXxbX++IOBvm2olHu3PsOUGRwhudhVf7UcGcunXt8cqNjKNqZLhLw4jq/xDg==" //微信签名 
        },
        function(res) {
            // TODO：特约商户已被微信收回支付成功回调 ；
            // 商户配置了点金计划，支付成功后直接跳转点金计划；关闭了点金计划，直接关闭程序
            if (res.err_msg == "get_brand_wcpay_request:ok") {
                // 使用以上方式判断前端返回,微信团队郑重提示：
                // res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
            }
          });
      }
      if (typeof WeixinJSBridge == "undefined") {
        if (document.addEventListener) {
          document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
        } else if (document.attachEvent) {
          document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
          document.attachEvent('onWeixinJSBridgeReady', onBridgeReady); }
      } else {
        onBridgeReady();
      }
```

**`重点：微信支付---1方式 timeStamp 是驼峰命名规则；`**
**`重点：特约商户支付成功后不会执行 ·res.err_msg == "get_brand_wcpay_request:ok"· 方法；会默认跳转 点金计划 或 退出 微信浏览器`**

### `JSAPI`（`JS-SDK`）支付常见异常问题：

**签名错误：**

**`1. 使用wx.chooseWXPay 中 timestamp是小写， 可能采用了驼峰大写S`**
**`2. 使用JSAPI支付 config注入得appid 与 wx.chooseWXPay 传输的appid不一致；`**
**`3. 后端签名生成错误；请后端进行签名校验；`**



### 点金计划

`点金计划`，就是微信支付官方提供的支付（`JS-SDK`）后回调能力的升级计划（被一些商户乱用导致的😑）, 支付平台提供支付后页面模板(使用`iframe`进行嵌套的)，支持账单展示、服务性内容展示、流量位推广（广告推广无孔不入呀）等功能。

### 点金计划配置

自定义开发`点金计划`中商家小票页面（支付成功界面）

- 需要去【[登录微信支付服务商平台](https://pay.weixin.qq.com/) → 服务商功能 → 点金计划】，进行开通配置：

  ![image-20240111093642691](https://raw.githubusercontent.com/chnjames/cloudImg/main/blog/202401110944803.png)

- 【[微信支付服务商平台](https://pay.weixin.qq.com/) → 服务商功能 → 点金计划】：

  ![image.png](https://raw.githubusercontent.com/chnjames/cloudImg/main/blog/202401111410182.webp)

- 【[微信支付服务商平台](https://pay.weixin.qq.com/) → 服务商功能 → 点金计划 → 点金计划开通确认】：

  ![image.png](https://raw.githubusercontent.com/chnjames/cloudImg/main/blog/202401111411869.webp)

- 【[微信支付服务商平台](https://pay.weixin.qq.com/) → 服务商功能 → 点金计划 → 特约商户管理】

  ![image.png](https://raw.githubusercontent.com/chnjames/cloudImg/main/blog/202401111413505.webp)

- 【[微信支付服务商平台](https://pay.weixin.qq.com/) → 服务商功能 → 点金计划 → 特约商户管理】：配置商家小票

  ![image.png](https://raw.githubusercontent.com/chnjames/cloudImg/main/blog/202401111414867.webp)

- 配置商家小票连接之前需要下载配置文件到服务器里（同上文微信授权一致）

  ![b6365015c4d349fbaae446efbc73aae9.png](https://raw.githubusercontent.com/chnjames/cloudImg/main/blog/202401111414528.webp)

特约商户开发的`JS-SDK`微信支付会默认加入点金计划（微信支付完成后会进入官方小票界面，`res.err_msg == "get_brand_wcpay_request:ok"`逻辑将不再继续执行， 支付失败的逻辑会继续执行），如果关闭了点金计划，则在支付完成后直接关闭窗口😒！！！)
默认会是这个样子：

![image.png](https://raw.githubusercontent.com/chnjames/cloudImg/main/blog/202401111415083.webp)

### 点金计划开发

尝试着写一个自定义`点金计划`小票页面（支付成功后会跳转微信商户平台提供的：[`payapp.weixin.qq.com`](https://payapp.weixin.qq.com) ， 开发页面以`iframe`的形式被嵌套）；

**那这个时候是不是就很好奇了，怎么去 开发呢？？？**
首先要明确`点金计划`提供了哪些功能，`api`让我们去操作；

`点金计划`请参考： [微信支付点金计划产品文档](https://wx.gtimg.com/pay/download/goldplan/goldplan_product_description_v2.pdf)

从《微信支付点金计划产品文档》中可以知晓：`点金计划`页面上方为商家小票提供了一个 `Iframe` 框架，服务商在点金计划管理页面配置“商家小票链 接”后，商家小票链接会嵌入该` Iframe` 框架内，同时，点金计划页面会与服务商交互订单信息；

点金计划页面会提供与服务商交互订单的三个信息：`特约商户号（sub_mch_id）`、`商户订单号（out_trade_no）`、`md5 校验码 （check_code）`三个字段的信息；

例如：

```html
<!-- src: 商家小票（支付成功）页面路径；  -->
<iframe src="https://example.org?sub_mch_id=2039471652&out_trade_no=T123444303844372&check_code=55304935873921" >
</iframe>
```

**注：由于是`iframe`实现内嵌商家小票页面；所以不建议商家小票界面使用缓存数据；建议走后端接口**

其中：`src` '[example.org](https://link.juejin.cn/?target=https%3A%2F%2Fexample.org)' 为支付商家小票界面（支付成功界面）；
'`sub_mch_id=2039471652&out_trade_no=T123444303844372&check_code=55304935873921`'为微信支付点金计划产品提供的订单信息；可以根据这三个信息去与后端进行交互；

为了商户更灵活的操作`点金计划`，《微信支付点金计划产品》提供提供了`点金计划页面JSAPI`：

以下介绍两个`API`：
**`onIframeReady`**： 按订单确认是否展示商家小票、调整 `Iframe` 框架高度（以宽度 `640px` 为基准，商家小票高度最小 `600px`，最大 `960px`。若服务商通过 `jsapi` 传入高度小 于 `600px`，页面会展示 `600px`，传入大于 `960px`，页面仅展示 `960px`）

![image.png](https://raw.githubusercontent.com/chnjames/cloudImg/main/blog/202401111419360.webp)

**重点：** **从加载商家小票到响应 `onIframeReady` 事件之间的用时不可超过 `3s`，因此需要考虑前端框架设计（多数使用`html`进行设计）**
**重点：** **所有订单必须响应 `onIframeReady` 事件，否则无法正常进行商家小票的展示**
**重点：** **通信方式：`iframe` `postMessage` 事件通知 数据格式：`json` 字符串**

示例：（展示商家小票）

```javascript
/** 点金计划路径 */
var GOIDPLAN_URL = "https://payapp.weixin.qq.com";
/** 点金计划事件列表： 通信方式：iframe postMessage 事件通知 */
var ACTION_LIST = {
  /**渲染小票：从加载商家小票到响应 onIframeReady 事件之间的用时不可超过 3s */
  onIframeReady: "onIframeReady",
  /**外跳：商家页面有外跳需求，且用户主动点击时（此处不可模拟用户点击自动外跳，否则相关能力会被处罚） */
  jumpOut: "jumpOut",
};
/** 点金计划需展示的页面 */
var DISPLAY_STYLE = {
  商家小票: "SHOW_CUSTOM_PAGE",
  官方小票: "SHOW_OFFICIAL_PAGE",
};

/** onIframeReady 事件配置 */
var onIframeReady = JSON.stringify({
  action: ACTION_LIST.onIframeReady,
  displayStyle: DISPLAY_STYLE.商家小票,
});
parent.postMessage(onIframeReady, GOIDPLAN_URL);
```

其中`parent`为 `window.parent`，是当前窗口的父窗口对象

**`jumpOut`**： 外跳新页面（支持从点金计划页面上方的商家小票区域，点击外跳到商家的完 整页面（此处不可模拟用户点击自动外跳，否则相关能力会被处罚））

![image.png](https://raw.githubusercontent.com/chnjames/cloudImg/main/blog/202401111420647.webp)

**重点：** **通信方式：`iframe postMessage` 事件通知 数据格式：`json` 字符串**
**重点：** **触发时机：商家页面有外跳需求，且用户主动点击时（此处不可模拟用户点击自动外跳，否则相关 能力会被处罚）**

示例：（实现外跳）

```html
<button class="button" id="viewDetail" @click="handleJump">
    点击查看订单详情
</button>
```

```javascript
 /** 点金计划路径 */
var GOIDPLAN_URL = "https://payapp.weixin.qq.com";
/** 点金计划事件列表： 通信方式：iframe postMessage 事件通知 */
var ACTION_LIST = {
  /**渲染小票：从加载商家小票到响应 onIframeReady 事件之间的用时不可超过 3s */
  onIframeReady: "onIframeReady",
  /**外跳：商家页面有外跳需求，且用户主动点击时（此处不可模拟用户点击自动外跳，否则相关能力会被处罚） */
  jumpOut: "jumpOut",
};
/** 点金计划需展示的页面 */
var DISPLAY_STYLE = {
  商家小票: "SHOW_CUSTOM_PAGE",
  官方小票: "SHOW_OFFICIAL_PAGE",
};
//获取返回页面参数
function getQueryString(name) {
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split("=");
    if (pair[0] == name) {
      return pair[1];
    }
  }
  return null;
}

/**商户订单号*/
var out_trade_no = getQueryString("out_trade_no");
 /**查看订单详情*/
btnEl.addEventListener("click", () => {
 var jumpOutUrl = `${location.origin}/#/order-detail?orderSn=${orderNoEl.innerText}`;
  var mchData = JSON.stringify({
    action: ACTION_LIST.jumpOut,
    jumpOutUrl: jumpOutUrl,
  });
  console.log("jumpOutUrl==>", jumpOutUrl);
  parent.postMessage(mchData, GOIDPLAN_URL);
});
```

以下为完整代码（以下代码没有做`md5`校验，如有需要自行添加）示例：

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>支付完成</title>
    <script
      type="text/javascript"
      charset="UTF-8"
      src="https://wx.gtimg.com/pay_h5/goldplan/js/jgoldplan-1.0.0.js"
    ></script>
    <script src="https://cdn.bootcdn.net/ajax/libs/vConsole/3.15.0/vconsole.min.js"></script>
    <style>
      body {
        margin: 0;
      }
      .pay-result {
        padding: 8.53333vw;
        text-align: center;
      }
      .order-info {
        padding-top: 8vw;
        padding-bottom: 7.73333vw;
        font-size: 3.73333vw;
        color: #595959;
      }
      .order-info .item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 6.4vw;
      }
      .button {
        width: 100%;
        height: 11.73333vw;
        font-size: 4.26667vw;
        background: #2c68ff;
        line-height: 11.73333vw;
        color: #ffffff;
        border-radius: 50px;
        border: none;
      }
    </style>
  </head>
  <body>
    <section class="pay-result">
      <div class="order-info">
        <div class="item">
          <span class="label">订单号</span>
          <span class="value" id="orderNo"></span>
        </div>
        <div class="item">
          <span class="label">订单金额</span>
          <span class="value" id="payPrice"></span>
        </div>
      </div>
      <button class="button" id="viewDetail" @click="handleJump">
       点击查看订单详情
      </button>
    </section>
  </body>
  <script>
    /** 点金计划路径 */
    var GOIDPLAN_URL = "https://payapp.weixin.qq.com";
    /** 点金计划事件列表： 通信方式：iframe postMessage 事件通知 */
    var ACTION_LIST = {
      /**渲染小票：从加载商家小票到响应 onIframeReady 事件之间的用时不可超过 3s */
      onIframeReady: "onIframeReady",
      /**外跳：商家页面有外跳需求，且用户主动点击时（此处不可模拟用户点击自动外跳，否则相关能力会被处罚） */
      jumpOut: "jumpOut",
    };
    /** 点金计划需展示的页面 */
    var DISPLAY_STYLE = {
      商家小票: "SHOW_CUSTOM_PAGE",
      官方小票: "SHOW_OFFICIAL_PAGE",
    };

    /** onIframeReady 事件配置 */
    var onIframeReady = JSON.stringify({
      action: ACTION_LIST.onIframeReady,
      displayStyle: DISPLAY_STYLE.商家小票,
    });
    // 接口地址
    var api = "/api/circ/order/queryOrderSn";

    /**添加调试工具vConsole*/
    new window.VConsole({
      theme: "dark",
      maxLogNumber: 100,
    });

    //获取返回页面参数
    function getQueryString(name) {
      var query = window.location.search.substring(1);
      var vars = query.split("&");
      for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == name) {
          return pair[1];
        }
      }
      return null;
    }

    /**商户订单号*/
    var out_trade_no = getQueryString("out_trade_no");
    /**button*/
    var btnEl = document.getElementById("viewDetail");
    /**订单金额El*/
    var payPriceEl = document.getElementById("payPrice");
    /**订单号El*/
    var orderNoEl = document.getElementById("orderNo");
    parent.postMessage(onIframeReady, GOIDPLAN_URL);

    console.log("out_trade_no====>", out_trade_no);
    if (out_trade_no) {
      // 此处为接口请求
      fetch(api, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          clientCode: "CONSUMER",
        },
        body: JSON.stringify({ payTradeNo: out_trade_no }),
      })
        .then((response) => {
          response.json().then((res = {}) => {
            console.log("res====>", res);
            if (res.code !== 0) {
              parent.alert(res.msg);
              return;
            }
            var data = res.data ? res.data : {};
            console.log("data====>", data);
            orderNoEl.innerText = data.orderNo;
            payPriceEl.innerText = data.payPrice + "元";
          });
        })
        .catch((err) => console.error(err));
    }

    /**查看订单详情*/
    // TODO: location.origin 因为点金计划和项目在同一个域名下；
     btnEl.addEventListener("click", () => {
         var jumpOutUrl = `${location.origin}/#/order-detail?orderSn=${orderNoEl.innerText}`;
          var mchData = JSON.stringify({
            action: ACTION_LIST.jumpOut,
            jumpOutUrl: jumpOutUrl,
          });
          console.log("jumpOutUrl==>", jumpOutUrl);
          parent.postMessage(mchData, GOIDPLAN_URL);
    });
  </script>
</html>
```

### 点金计划常见问题

- **支付成功后，跳转的是无法获取订单信息:**

  `1. 商户未配置点金计划商家小票连接；`
  `2. 商户小票页面加载缓慢，超过3s未调用nIframeReady事件；`
  `3. IOS无法加载商家小票，使用https；`
  `4. 点金计划配置文件(xxx.txt)未放置在服务器中;`

虽然微信提供了`点金计划页面JSAPI`，但是还是有`不如意`的地方：

- `不如意一`：无法返回上一页，只能是关闭当前页面(商家小票页面属于新开窗口....)
- `不如意二`：点金计划无法配置多个地址 同一个项目无法针对不环境配置不同小票路径
- `不如意三`：商家小票页面`jumpOut`事件触发后出现的弹窗会显示商户名称