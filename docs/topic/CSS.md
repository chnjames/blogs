# CSS

## 盒模型

页面渲染时，DOM元素所采用的的**布局模型**。

`content-box`（W3C标准盒模型）

`border-box`（IE盒模型）

## BFC（块级格式化上下文）

**BFC就是页面上一个独立的容器，容器里面的子元素不会影响到外面的元素。**

### BFC触发方式

1. 根元素，即HTML标签
2. 浮动元素：float值为`left`、`right`
3. `overflow`值不为`visible`，为`auto`、`scroll`、`hidden`
4. `display`值为`inline-block`、`table-cell`、`table-caption`、`table`、`inline-table`、`flex`、`inline-flex`、`grid`、`inline-grid`
5. 定位元素：`position`值为`absolute`、`fixed`

### 规则

1. 内部的Box会在垂直方向上一个接一个的放置。
2. 内部的Box垂直方向上的距离由margin决定。（属于同一个BFC的两个相邻Box的margin会发生重叠，不同BFC不会发生重叠。）
3. 每个元素的左外边距与包含块的左边界相接触（从左向右），即使浮动元素也是如此。（说明BFC中子元素不会超出它的包含块，而position为absolute的元素可以超出它的包含块边界。）
4. BFC的区域不会与float的元素区域重叠。
5. 计算BFC的高度时，浮动子元素也参与计算。

### 应用

- 阻止元素被浮动元素覆盖
- 可以包含浮动元素-清除内部浮动
- 阻止相邻元素的margin重叠

### 创建BFC的新方式

`display: flow-root`

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>BFC</title>
    <style>
        .wrapper {
            display: flow-root;
        }
        .outer {
            border: 5px dashed #a1a1a1;
            padding: 10px;
            width: 350px;
            margin: 50px;
        }
        .float {
            float: left;
            width: 150px;
            border: 4px solid yellow;
            padding: 10px;
            margin-right: 10px;
        }
    </style>
</head>
<body>
    <div class="outer">
        <div class="float">I am a floated element.</div>
        <div style="display: flow-root;">I am text inside the outer div.I am text inside the outer div.I am text inside the outer div.</div>
    </div>
    <div class="wrapper">
        <div class="outer">
            <div class="float">I am a floated element.</div>
            I am text inside the outer div.I am text inside the outer div.I am text inside the outer div.
        </div>
    </div>
</body>
</html>
```



## 居中布局

- 水平居中

  行内元素：`text-align: center`

  块级元素：`margin: 0 auto`

  `absolute + transform`

  `flex + justify-centent: center`

- 垂直居中

  `line-height: height`

  `absolute + transform`

  `flex + align-items: center`

  `table`

- 水平垂直居中

  `absolute + transform`

  `flex + justify-content + align-items`

<iframe height="300" style="width: 100%;" scrolling="no" title="borderRadius实现充电动画" src="https://codepen.io/chnjames/embed/NWYGKZm?default-tab=css" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/chnjames/pen/NWYGKZm">
  borderRadius实现充电动画</a> by 一点一木 (<a href="https://codepen.io/chnjames">@chnjames</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>
