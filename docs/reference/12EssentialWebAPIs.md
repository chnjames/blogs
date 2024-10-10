---
title: 12种最基本Web API：开发者的必学清单⭐
tags:
 - 前端开发
 - Web API
categories:
 - 前端开发
date: 2024-10-10
hideComments: false
---
掌握各种`Web API` 能够显著提升网络应用程序的功能和用户体验。这些 `API` 为开发者提供了与浏览器交互的强大工具，而这种能力在过去是难以实现的。本文将探讨12种基本的 `Web API`，详细解释它们的功能，并提供代码示例，帮助您在项目中轻松实现这些 `API`。

![What-is-an-API](https://raw.githubusercontent.com/chnjames/cloudImg/main/Images202409271643600.png)

1. #### [`Storage API`](https://developer.mozilla.org/zh-CN/docs/Web/API/Web_Storage_API)

   `Storage API`（存储 `API`）（包括 `localStorage` 和 `sessionStorage`）允许开发者在用户的浏览器中以键值对的形式存储数据。这些数据可以用于保存用户的偏好设置、会话信息或其他需要持久化的数据。`localStorage` 提供长期存储，而 `sessionStorage` 则在浏览器会话结束后清除数据。存储 `API` 使得在客户端轻松管理数据变得更加方便，有助于提升用户体验。

   ```javascript
   // 将数据保存到localStorage
   localStorage.setItem('userName', '一点一木');
   
   // 从localStorage中检索数据
   const user = localStorage.getItem('userName');
   
   // 清除localStorage中的数据
   localStorage.removeItem('userName');
   
   ```

2. #### [`DOM API`](https://developer.mozilla.org/zh-CN/docs/Web/API/Document_Object_Model)

   `DOM API`（文档对象模型 `API`）允许开发者操作网页的结构、样式和内容。它提供了一组方法和属性，使得可以动态访问和修改`HTML`文档中的元素，响应用户交互，实现动画效果等。通过`DOM API`，开发者能够创建、删除和更新网页内容，从而提升用户体验并实现复杂的功能。

   ```javascript
   // 选择并更新元素
   const element = document.querySelector('#myElement');
   element.textContent = 'Hello, World!';
   ```

3. #### [`Canvas API`](https://developer.mozilla.org/zh-CN/docs/Web/API/Canvas_API)

   `Canvas API` 允许开发者在网页上绘制图形和动画，利用 `<canvas>` 元素实现丰富的视觉效果。它提供了一个灵活的`2D`或`3D`绘图上下文，使得创建游戏、数据可视化和其他动态图形变得简单。`Canvas API` 的强大功能使得开发者可以控制每个像素，创造出高度自定义的视觉内容。

   ```javascript
   const canvas = document.getElementById('myCanvas');
   const context = canvas.getContext('2d');
   context.fillStyle = 'blue';
   context.fillRect(10, 10, 150, 100);
   ```

4. #### [`History API`](https://developer.mozilla.org/zh-CN/docs/Web/API/History_API)

   `History API` 允许开发者与浏览器的会话历史记录进行交互，提供了一种方法来操作历史记录栈。通过使用 `pushState` 和 `replaceState` 方法，开发者可以在不重新加载页面的情况下更新URL和状态，从而实现更流畅的单页应用体验。`History API` 使得浏览器的导航行为更加灵活，用户可以在应用中自由前后导航。

   ```javascript
   history.pushState({ page: 1 }, 'title', '/page1');
   history.replaceState({ page: 2 }, 'title', '/page2');
   ```

5. #### [`Clipboard API`](https://developer.mozilla.org/zh-CN/docs/Web/API/Clipboard_API)

   `Clipboard API` （剪贴板 `API`）允许开发者访问和操作用户的剪贴板内容，使得实现复制、粘贴等功能变得更加简单。它提供了一种安全的方式来读取和写入剪贴板数据，支持文本、图像等多种格式。这使得在网页应用中实现用户友好的交互体验更加高效和灵活。

   ```javascript
   navigator.clipboard.writeText('Hello, Clipboard!').then(() => {
     console.log('文本已复制到剪贴板');
   }).catch(err => {
     console.error('复制文本失败:', err);
   });
   ```

6. #### [`Fullscreen API`](https://developer.mozilla.org/zh-CN/docs/Web/API/Fullscreen_API)

    `Fullscreen API` （全屏 `API`）允许开发者将特定元素或整个网页以全屏模式呈现，从而提供更沉浸式的用户体验。它常用于视频播放、游戏和其他需要占用整个屏幕的应用。用户可以通过简单的调用请求全屏，并且可以轻松切换回窗口模式，增强了互动性和可视性。

   ```javascript
   document.getElementById('myElement').requestFullscreen().catch(err => {
     console.error(`启用全屏模式时发生错误: ${err.message}`);
   });
   ```

7. #### [`FormData API`](https://developer.mozilla.org/zh-CN/docs/Web/API/FormData)

   `FormData API` 用于轻松构建和操作表示表单数据的键值对，特别适合用于通过 `AJAX` 提交表单。它允许开发者收集用户输入，包括文本字段、文件上传等，并以合适的格式发送到服务器。`FormData API` 使得处理复杂表单数据变得更加简单高效。

   ```javascript
   const form = document.querySelector('form');
   const formData = new FormData(form);
   
   fetch('/submit', { method: 'POST', body: formData }).then(response => {
     if (response.ok) {
       console.log('表单提交成功！');
     }
   });
   ```

8. #### [`Fetch API`](https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API)

   `Fetch API` 提供了一种现代化且灵活的方式来进行异步网络请求，作为 `XMLHttpRequest` 的更简单、基于 `Promise` 的替代方案。它允许开发者轻松发送 `HTTP` 请求，处理响应，并进行更复杂的网络交互，如上传文件或处理 `JSON` 数据。`Fetch API` 使得网络请求的代码更加清晰和易于维护。

   ```javascript
   fetch('https://api.example.com/data')
     .then(response => response.json())
     .then(data => console.log(data))
     .catch(error => console.error('获取数据时发生错误:', error));
   ```

9. #### [`Drag and Drop API`](https://developer.mozilla.org/zh-CN/docs/Web/API/HTML_Drag_and_Drop_API)

   `Drag and Drop API` （拖放 `API`）允许开发者在网页应用中实现拖放功能，增强用户交互体验。它提供了一组接口，使得用户可以通过拖动元素来移动、复制或删除内容，常用于实现文件上传、排序列表等功能。通过拖放 `API`，创建直观的用户界面变得更加简单。

   ```javascript
   const item = document.getElementById('item');
   item.addEventListener('dragstart', (e) => {
     e.dataTransfer.setData('text/plain', item.id);
   });
   ```

10. #### [`Payment Request API`](https://developer.mozilla.org/zh-CN/docs/Web/API/Payment_Request_API)

    `Payment Request API` （支付请求 `API`）用于简化网页上的支付流程，提供一致的用户体验，支持多种支付方式。它允许开发者以用户友好的方式收集支付信息，从而提高在线购物的便利性和安全性。通过该 `API`，用户可以快速选择支付方式并完成交易。

    ```javascript
    if (window.PaymentRequest) {
      const payment = new PaymentRequest([{
        supportedMethods: 'https://example.com/pay'
      }], {
        total: { label: '总金额', amount: { currency: 'CNY', value: '10.00' } }
      });
    
      payment.show().then(result => {
        // 处理支付结果
        console.log(result);
      }).catch(error => {
        console.error('支付失败:', error);
      });
    }
    ```

11. #### `HTML Sanitizer API`

    > `HTML Sanitizer API`是一个**提议中**的新浏览器 `API`，旨在为网页平台提供一种安全且易于使用的 `HTML` 清理能力。

    `HTML Sanitizer API` （`HTML` 清理器 `API`）用于安全地清理不可信的 `HTML` 内容，以防止安全风险，如跨站脚本（`XSS`）攻击。它提供了一种简单的方法来处理和过滤用户输入的 `HTML`，确保只允许安全的内容在网页中显示，从而保护用户和网站的安全。

    ```javascript
    const dirtyHTML = '<img src="javascript:alert(1)">';
    const cleanHTML = sanitizer.sanitize(dirtyHTML);
    console.log(cleanHTML); // 安全的HTML输出
    ```

12. #### [`Geolocation API`](https://developer.mozilla.org/zh-CN/docs/Web/API/Geolocation_API)

    `Geolocation API` （地理位置`API`）允许开发者访问用户设备的地理位置信息，以便实现基于位置的服务和功能。它能够获取用户的当前位置信息（如经度和纬度），并在应用中应用于地图、定位服务或个性化内容。该 `API` 需要用户授权以确保隐私和安全。

    > `Geolocation API` 需要在 `HTTPS` 环境下运行，因此确保您的网站使用 `SSL` 证书。
    >
    > **在项目开发过程中测试的方法**：
    >
    > - **使用浏览器开发者工具模拟位置**：在 `Chrome` 中，打开开发者工具，选择“更多工具” > “传感器”，然后您可以选择模拟的地理位置进行测试。

    ```javascript
    navigator.geolocation.getCurrentPosition((position) => {
      console.log(`纬度: ${position.coords.latitude}, 经度: ${position.coords.longitude}`);
    }, (error) => {
      console.error(`获取位置时发生错误: ${error.message}`);
    });
    ```

#### 总结

这些`Web API` 为创建高度互动和用户友好的网页应用开辟了无限可能。从存储和支付到地理位置和图形，掌握这些 `API` 可以提升您的 `Web` 开发技能。  

通过有效地在项目中实现这些 `API`，您可以显著增强功能性和用户体验。