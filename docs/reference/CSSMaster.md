---
title: CSS大师必知的实用技巧和窍门-持续更新中！
date: 2023-10-08
hideComments: false
tags:
 - CSS
categories:
 - 前端
publish: true
---
当涉足前端开发时，精通`CSS`是成为一名真正的大师所必不可少的技能之一。`CSS`不仅仅是网页样式的设计工具，更是用户体验的关键驱动力。本文将带您进入`CSS`的奇妙世界，分享一系列实用的技巧和窍门，让您在前端开发领域脱颖而出。更令人兴奋的是，这个技巧库还在不断更新中，为您提供不竭的灵感和学习资源，助您成为`CSS`大师！让我们一起开始这场探索之旅吧！



1. **文档布局**

   创建仅包含两行 `CSS` 的响应式文档样式布局。

   ```css
   .parent{
     display: grid;
     grid-template-columns: minmax(150px, 25%) 1fr;
   }
   ```

   ![ojs8nvly2ugashxwqif8](https://raw.githubusercontent.com/chnjames/cloudImg/main/blog/202310071403516.png)

2. **自定义光标**

   ```css
   html {
     cursor:url('no.png'), auto;
   }
   ```

   ![ba8kist57vp6l9spw8w2](https://raw.githubusercontent.com/chnjames/cloudImg/main/blog/202310071414361.gif)

3. **用图像填充文本**

   > 使用此方法时，请指定`background-color`，如果由于某种原因导致图片未加载，这将用作回退值。

   ```css
   h1 {
     background-image: url('flower.jpg');
     background-clip: text;
     color: transparent;
     background-color: white;
   }
   ```

   ![0a7my28raxr80upv77k1](https://raw.githubusercontent.com/chnjames/cloudImg/main/blog/202310071418782.png)

4. **向文本添加描边**

   使用`text-stroke`属性使文本更清晰可见，它会向文本添加笔触或轮廓。

   ```css
   h1 {
     -webkit-text-stroke: 5px crimson;
     text-stroke: 5px crimson;
   }
   ```

   ![h9xcwsh18vxqw1uaj5h3](https://raw.githubusercontent.com/chnjames/cloudImg/main/blog/202310071421852.png)

5. **暂停的伪类**

   使用 `:paused` 选择器在处于暂停状态时设置媒体元素的样式，同样也有 `:playing` 。

   ```css
   video:paused {
     opacity: 0.6;
   }
   ```

   ![dq1za9uri1a37kqyh1y1](https://raw.githubusercontent.com/chnjames/cloudImg/main/blog/202310071424509.gif)

6. **强调文本**

   使用 `text-emphasis` 属性将强调标记应用于文本元素。您可以指定任何字符串（包括表情符号）作为其值。

   ```css
   h1 {
     text-emphasis: "⏰";
   }
   ```

   ![6l1oifo8erkkblsk7ilt](https://raw.githubusercontent.com/chnjames/cloudImg/main/blog/202310071504045.png)

7. **样式首字下沉**

   避免不必要的跨度，改用伪元素来设置内容的样式，同样 `first-letter` 伪元素，我们也有 `first-line` 伪元素。

   ```css
    h1::first-letter {
     font-size: 2rem;
     color:#ff8A00;
   }
   ```

   ![a1jtvgnx1y1xqf0sd9b7](https://raw.githubusercontent.com/chnjames/cloudImg/main/blog/202310071507831.png)

8. **变量的回退值**

   ```css
   :root {
     --orange: orange;
     --coral: coral;
   }
   
   h1 {
     color: var(--black, crimson);
   }
   ```

   ![r2477mnixnrwtwn5mqun](https://raw.githubusercontent.com/chnjames/cloudImg/main/blog/202310071508976.png)

9. **更改写入模式**

   您可以使用写入模式属性来指定文本在网站上的布局方式，即垂直或水平布局。

   ```css
   h1 {
     writing-mode: sideways-lr;
   }
   ```

   ![ozqs02sh7edl70cd609a](https://raw.githubusercontent.com/chnjames/cloudImg/main/blog/202310071510849.png)

10. **彩虹动画**

    为元素创建连续循环的颜色动画以吸引用户的注意力，可以使用 `prefer-reduced-motion` 媒体功能。

    ```css
    button{
      animation: rainbow-animation 200ms linear infinite;
    }
    
    @keyframes rainbow-animation {
      to{
        filter: hue-rotate(0deg);
      }
     from{
        filter: hue-rotate(360deg);
      }
    }
    ```

    ![60jgrr09vgsckx9h2irl](https://raw.githubusercontent.com/chnjames/cloudImg/main/blog/202310071512264.gif)

11. **悬停时缩放**

    ```css
    .img-container {
      height: 250px;
      width: 250px;
      overflow: hidden;
     }
    
    .img-container img {
      height: 100%;
      width: 100%;
      object-fit: cover; 
      transition: transform 200m ease-in;
     }
    
     img:hover{
      transform: scale(1.2);
     }
    ```

    ![cxy8ymu937e0kf14wwbc](https://raw.githubusercontent.com/chnjames/cloudImg/main/blog/202310071515494.gif)

12. **属性选择器**

    使用属性选择器根据属性选择 `HTML` 元素。

    ```css
    a[href] {
      color: crimson;
    }
    ```

    ![1sq2rhs58a01ayfqzexk](https://raw.githubusercontent.com/chnjames/cloudImg/main/blog/202310071520206.png)

13. **剪裁元素**

    使用 `clip-path` 属性创建有趣的视觉效果，例如将元素剪裁为自定义形状（如三角形或六边形）。

    ```css
    div {
      height: 150px;
      width: 150px;
      background-color: crimson;
      clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
    }
    ```

    ![u9eqxif34ndhq33xvlpb](https://raw.githubusercontent.com/chnjames/cloudImg/main/blog/202310071521575.png)

14. **检测属性支持**

    使用 `CSS` `@support rule` 直接在 `CSS` 中检测对 `CSS` 功能的支持。

    ```css
    @supports (accent-color: #74992e) {
      blockquote {
        color: crimson;
      }
    }
    ```

    ![8ekr2fmhl4ori47xqgyf](https://raw.githubusercontent.com/chnjames/cloudImg/main/blog/202310071535665.png)

15. **`CSS` 嵌套**

    `CSS`工作组一直在研究如何将嵌套添加到`CSS`中。通过嵌套，您将能够编写更直观、更有条理、更高效的 `CSS`。

    ```css
    .header{
      background-color: salmon;
      .text{
        font-size: 18px;
      }
    }
    ```

16. **钳位功能**

    使用 `clamp()` 函数进行响应式和流畅的排版。

    ```css
    /* 语法: clamp(最小值, 首选值, 最大值) */
    h1{
      font-size: clamp(2.25rem, 6vw, 4rem);
    }
    ```

    ![upaf9jdlfapezzmufyaa](https://raw.githubusercontent.com/chnjames/cloudImg/main/blog/202310071546062.gif)

17. **设置可选字段样式**

    可以使用 `:optional` 伪类设置表单字段（如输入、选择和文本区域）的样式，这些字段上没有必需的属性：`required`。

    ```css
    *:optional{
      background-color: green;
    }
    ```

18. **字间距属性**

    使用 `word-spacing` 属性指定单词之间的空格长度。

    ```css
    p {
      word-spacing: 1.245rem;
    }
    ```

19. **创建渐变阴影**

    这就是创建渐变阴影以获得独家用户体验的方法。

    ```css
    :root{
      --gradient: linear-gradient(to bottom right, crimson, coral);
    }
    
    .gradient {
      height: 200px;
      width: 200px;
      background-image: var(--gradient);
      border-radius: 1rem;
      position: relative;
    }
    
    .gradient::after {
      content: "";
      position: absolute;
      inset: 0;
      background-image: var(--gradient);
      border-radius: inherit;
      filter: blur(25px) brightness(1.5);
      transform: translateY(15%) scale(0.95);
      z-index: -1;
    }
    ```

    ![7korhhx7zaj350nfzmyb](https://raw.githubusercontent.com/chnjames/cloudImg/main/blog/202310071610793.jpg)

20. **更改标题位置**

    使用 `caption-side` 属性将表标题（表标题）放在表的指定一侧。

    ![7t44rugi8gx3ksndq560](https://raw.githubusercontent.com/chnjames/cloudImg/main/blog/202310071615653.gif)

21. **创建文本列**

    使用列属性为文本元素制作漂亮的列布局。

    ```css
    p{
      column-count: 3;
      column-gap: 4.45rem;          
      column-rule: 2px dotted crimson;
    }
    ```

    ![y1ryft9s27y56el3ljx4](https://raw.githubusercontent.com/chnjames/cloudImg/main/blog/202310071619052.png)

本文从`CSS`出发，提供了一系列实用的技巧，这些技巧不仅适用于新手，也对经验丰富的开发者有所裨益。通过运用这些技巧，您可以提高工作效率，同时改善用户体验，使您的前端开发水平更上一层楼。不断学习和应用这些`CSS`技巧，让您的项目脱颖而出，为用户提供更优秀的网页体验。



> 🚨🚨 注意：本文中分享的技巧来自`GitHub`仓库"[`css tips tricks`](https://github.com/devsyedmohsin/css-tips-tricks)"的一部分。这是一个由开发者手工制作的专业`CSS`技巧和诀窍的集合。如果您觉得有用的话，请务必查看该仓库并给它点个星星 🌟。



