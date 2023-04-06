---
pageClass: docs-base
date: 2021-03-17
hideComments: false
---
# `Canvas`

## 简介

`<canvas>`是`HTML5`新增的，一个可以使用脚本（通常为`JavaScript`）在其中绘制图像的`HTML`元素。`<canvas>`有两个可选属性，分别为`width`和`height`，`Canvas`的默认`width`为300，`height`为150，单位都是`px`。

## 基本用法

> `Canvas`标签中的文字是在不支持`Canvas`标签的浏览器中使用的，因为支持`Canvas`标签的浏览器会忽略容器中包含的内容正常渲染`Canvas`标签，而不支持`Canvas`标签的浏览器则相反，浏览器会忽略容器而显示其中的内容。

`Canvas`标签提供一个方法：`getContext()`，通过它我们可以获得渲染上下文和绘画功能。此方法接收一个参数，它是绘图上下文的类型，参数有：

- `2d`：建立一个二维渲染上下文。可以用`CanvasRenderingContext2D()`来替换`getContext('2d')`；
- `webgl`、`webgl2`、`bitmaprenderer`（不在本节范围内）。

```vue
<template>
    <canvas ref="canvas" width="500" height="500">
        当前浏览器不支持canvas元素,请升级或更换浏览器!
    </canvas>
</template>
<script setup>
import { ref, onMounted } from 'vue';

const canvas = ref(null)
onMounted(() => {
    if (canvas.value.getContext) {
        // 获取绘图上下文
        let ctx = canvas.value.getContext('2d')
    }
})
</script>
<style>
canvas {
    box-shadow: 0px 0px 5px #ccc;
    border-radius: 8px;
}
</style>
```

## 绘制形状

### 直线、三角形

`moveTo(x, y)`：设置初始位置，参数为初始位置x和y的坐标点

`lineTo(x, y)`：绘制一条从初始位置到指定位置的直线，参数为指定位置x和y的坐标点

- `stroke()`：通过线条来绘制图形轮廓

- `fill()`：通过填充路径的内部区域生成实心的图形

### 矩形

- `strokeRect(x, y, width, height)`：绘制一个矩形边框
  - x、y：矩形的起点坐标
  - width、height：矩形的宽高
- `fillRect(x, y, width, height)`：绘制一个填充的矩形
  - x、y：矩形的起点坐标
  - width、height：矩形的宽高
- `clearRect(x, y, width, height)`：清除指定矩形区域，让清除部分完全透明
  - x、y：矩形的起点坐标
  - width、height：矩形的宽高

### 圆弧和圆

`arc(x, y, radius, startAngle, endAngle, anticlockise)`：x和y是圆心的坐标，radius为半径，startAngle为圆弧或圆的开始位置，endAngle为圆弧或圆的结束位置，anticlockise是绘制的方向（不写默认为false，从顺时针方向）。此函数中的角的单位是弧度不是角度。角度换算为弧度的表达式为：`弧度=(Math.PI/180)*角度`，所以一个圆的弧度为：`Math.PI*2`。

> 每次新建路径需要开启和闭合路径，这样不同路径之间才不会相互干扰。
>
> `beginPath`：新建一条路径，生成之后，图形绘制命令被指向到路径上。
>
> `closePath`：闭合路径之后图形绘制命令又重新指向到上下文中。闭合路径其实并不是必须的，对于新路径其实每次都开启新路径就行。

### 椭圆

`ellipse(x, y, radiusX, radiusY, rotation, startAngle, endAngle, anticlockwise)`：添加椭圆路径

- x、y：椭圆的圆心位置
- radiusX、radiusY：x轴和y轴的半径
- rotation：椭圆的旋转角度，以弧度表示
- startAngle：开始绘制点
- endAngle：结束绘制点
- anticlockwise：绘制的方向（默认顺时针），可选参数

### 贝赛尔曲线

在线工具：https://cubic-bezier.com

贝赛尔曲线一般用来绘制复杂有规律的图形

`quadraticCurveTo(cp1x, cp1y, x, y)`：二次贝塞尔曲线，由一个起点、终点和结束点来控制的。

- cp1x、cp1y：一个控制点
- x、y：结束点

`bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y)`：三次贝塞尔曲线，有两个控制点。

- cp1x、cp1y：一个控制点
- cp2x、cp2y：第二个控制点
- x、y：结束点

```vue
<template>
    <canvas ref="canvas" width="500" height="500">
        当前浏览器不支持canvas元素,请升级或更换浏览器!
    </canvas>
</template>
<script setup>
import { ref, onMounted } from 'vue'

const canvas = ref(null)
onMounted(() => {
    if (canvas.value.getContext) {
        // 获取绘图上下文
        let ctx = canvas.value.getContext('2d')
        // 开始绘制
        ctx.beginPath()
        // 绘制一条直线
        ctx.moveTo(100, 100)
        ctx.lineTo(200, 200)
        // 线条绘制方式
        ctx.stroke()
        // 绘制一个三角形
        ctx.beginPath()
        ctx.moveTo(200, 200)
        ctx.lineTo(400, 200)
        ctx.lineTo(300, 100)
        // 填充绘制方式
        ctx.fill()
        // 绘制一个填充矩形
        ctx.beginPath()
        ctx.fillRect(200, 200, 200, 200)
        // 清除指定矩形区域
        ctx.beginPath()
        ctx.clearRect(300, 250, 50, 50)
        // 绘制一个矩形边框
        ctx.beginPath()
        ctx.strokeRect(400, 350, 25, 50)
        // 绘制一个圆弧
        ctx.beginPath()
        const r = Math.sqrt(Math.pow(50, 2) + Math.pow(50, 2)) // 勾股定理计算半径
        ctx.arc(150, 150, r, (Math.PI / 180) * 45,  (Math.PI / 180) * 225, false)
        ctx.stroke()
        // 绘制一个圆
        ctx.beginPath()
        ctx.arc(300, 80, 20, 0, Math.PI * 2, false)
        ctx.stroke()
        // 绘制一个椭圆
        ctx.beginPath()
        ctx.ellipse(100, 100, 50, 100, (Math.PI / 180) * 45, Math.PI * 2, false)
        ctx.stroke()
        // 绘制一个二次贝塞尔曲线
        ctx.beginPath()
        ctx.moveTo(100, 100)
        ctx.quadraticCurveTo(200, 200, 300, 100)
        ctx.stroke()
        // 绘制一个三次贝塞尔曲线
        ctx.beginPath()
        ctx.moveTo(100, 100)
        ctx.bezierCurveTo(100, 100, 200, 100, 300, 50)
        ctx.fill()
    }
})
</script>
<style>
canvas {
    box-shadow: 0px 0px 5px #ccc;
    border-radius: 8px;
}
</style>
```

## 绘制样式

### 线条的样式

- `lineWidth`：设置当前绘线的粗细。属性值必须为正数。默认值为1.0。
- `lineCap`：设置线段端点的样式。可选值为：`butt`、`round`和`square`。默认为`butt`。
  - `lineJoin`：设置两线段连接处显示的样式。可选值为：`round`、`bevel`和`miter`。默认值为`miter`。
- `miterLimit`：限制当两条线相交时交接处最大长度；所谓交接处长度（斜接长度）是指线条交接处内角顶点到外角顶点的长度。线段之间夹角比较大时，交点不会太远，但随着夹角变小，交点距离会呈指数增大。如果交点距离大于`miterLimit`值，连接效果会变成`lineJoin = bevel`的效果。
- `setLineDash`：设置当前虚线样式。
- `getLineDash`：返回当前虚线设置的样式，长度为非负偶数的数组。如果传参个数为奇数，则会复制一份数组补全为偶数。
- `lineDashOffset`：设置虚线样式的起始偏移量。

```vue
<template>
    <canvas ref="canvas" width="500" height="500">
        当前浏览器不支持canvas元素,请升级或更换浏览器!
    </canvas>
</template>
<script setup>
import { ref, onMounted } from 'vue'

const canvas = ref(null)
onMounted(() => {
    if (canvas.value.getContext) {
        // 获取绘图上下文
        let ctx = canvas.value.getContext('2d')
        // 绘制粗细为10px的线
        ctx.beginPath()
        ctx.lineWidth = 10
        ctx.moveTo(10, 10)
        ctx.lineTo(50, 50)
        ctx.stroke()
        // 绘制粗细为5px的线
        ctx.beginPath()
        ctx.lineWidth = 5
        ctx.moveTo(60, 60)
        ctx.lineTo(100, 100)
        ctx.stroke()
        // 绘制端点为butt的线，默认为butt
        ctx.beginPath()
        ctx.lineWidth = 10 // 粗线方便观察端点样式
        ctx.lineCap = 'butt'
        ctx.moveTo(120, 120)
        ctx.lineTo(170, 170)
        ctx.stroke()
        // 绘制端点为round的线
        ctx.beginPath()
        ctx.lineWidth = 10
        ctx.lineCap = 'round'
        ctx.moveTo(200, 200)
        ctx.lineTo(260, 260)
        ctx.stroke()
        // 绘制端点为square的线
        ctx.beginPath()
        ctx.lineWidth = 10
        ctx.lineCap = 'square'
        ctx.moveTo(280, 280)
        ctx.lineTo(340, 340)
        ctx.stroke()
        // 绘制线条连接处的样式为miter的线，默认为miter
        ctx.beginPath()
        ctx.lineWidth = 10
        ctx.lineJoin = 'miter'
        ctx.moveTo(200, 50)
        ctx.lineTo(270, 120)
        ctx.lineTo(340, 50)
        ctx.stroke()
        // 绘制线条连接处的样式为round的线
        ctx.beginPath()
        ctx.lineWidth = 10
        ctx.lineJoin = 'round'
        ctx.moveTo(200, 150)
        ctx.lineTo(270, 220)
        ctx.lineTo(340, 150)
        ctx.stroke()
        // 绘制线条连接处的样式为bevel的线
        ctx.beginPath()
        ctx.lineWidth = 10
        ctx.lineJoin = 'bevel'
        ctx.moveTo(200, 250)
        ctx.lineTo(270, 320)
        ctx.lineTo(340, 250)
        ctx.stroke()
        // 限制当两条线相交时交接处最大长度
        ctx.beginPath()
        ctx.lineWidth = 10
        ctx.miterLimit = 2
        ctx.moveTo(200, 350)
        ctx.lineTo(220, 420)
        ctx.lineTo(240, 350)
        ctx.stroke()
        // 绘制一条虚线
        ctx.beginPath()
        // 绘制一条虚线
        ctx.lineWidth = 1
        ctx.setLineDash([5, 10, 20]);
        console.log(ctx.getLineDash());
        ctx.beginPath();
        ctx.moveTo(0, 100);
        ctx.lineTo(500, 100);
        ctx.stroke();
        // 设置虚线的起始偏移量
        ctx.beginPath()
        ctx.lineWidth = 1
        ctx.setLineDash([5, 10, 20]);
        ctx.lineDashOffset = 15;
        ctx.beginPath();
        ctx.moveTo(0, 120);
        ctx.lineTo(500, 120);
        ctx.stroke();
    }
})
</script>
<style>
canvas {
    box-shadow: 0px 0px 5px #ccc;
    border-radius: 8px;
}
</style>
```



### 透明度

除了绘制实色的图形，还可以绘制有透明度的图形。通过设置`globalAlpha`属性、使用有透明度的样式作为轮廓或填充都可以实现。

```vue
<template>
    <canvas ref="canvas" width="500" height="500">
        当前浏览器不支持canvas元素,请升级或更换浏览器!
    </canvas>
</template>
<script setup>
import { ref, onMounted } from 'vue'

const canvas = ref(null)
onMounted(() => {
    if (canvas.value.getContext) {
        // 获取绘图上下文
        let ctx = canvas.value.getContext('2d')
        // 指定透明度的填充样式
        ctx.beginPath()
        ctx.fillStyle = 'rgba(0, 255, 0, 0.2)'
        ctx.fillRect(200, 200, 200, 100)
        // 指定透明度的线条样式
        ctx.beginPath()
        ctx.lineWidth = 5
        ctx.strokeStyle = 'rgba(0, 255, 0, 0.2)'
        ctx.strokeRect(310, 310, 80, 80)
        // 指定透明度的圆
        ctx.beginPath()
        ctx.arc(200, 200, 100, 0, Math.PI * 2, true)
        ctx.globalAlpha = 0.5
        ctx.fill()
    }
})
</script>
<style>
canvas {
    box-shadow: 0px 0px 5px #ccc;
    border-radius: 8px;
}
</style>
```

### 渐变

- `createLinearGradient(x1, y1, x2, y2)`：线性渐变。

  - x1、y1：起点坐标
  - x2、y2：终点坐标

  在渐变的设置中需要一个方法来添加渐变的颜色，语法为：`gradient.addColorStop(offset, color)`，其中`color`为颜色，`offset`为颜色的偏移值（0~1之间的数）。

- `createRadialGradient(x0, y0, r0, x1, y1, r1)`：径向渐变。

  - x0、y0、r0：开始圆的坐标和半径
  - x1、y1、r1：结束圆的坐标和半径

```vue
<template>
    <canvas ref="canvas" width="500" height="500">
        当前浏览器不支持canvas元素,请升级或更换浏览器!
    </canvas>
</template>
<script setup>
import { ref, onMounted } from 'vue'

const canvas = ref(null)
onMounted(() => {
    if (canvas.value.getContext) {
        // 获取绘图上下文
        let ctx = canvas.value.getContext('2d')
        // 线性渐变
        ctx.beginPath()
        // 创建渐变
        let gradient = ctx.createLinearGradient(0, 0, 500, 200)
        gradient.addColorStop(0, 'red')
        gradient.addColorStop(1, 'blue')
        ctx.fillStyle = gradient
        ctx.fillRect(0, 0, 500, 200)
        ctx.beginPath()
        let gradientHalf = ctx.createLinearGradient(0, 200, 500, 400)
        gradientHalf.addColorStop(0.5, 'red')
        gradientHalf.addColorStop(1, 'blue')
        ctx.fillStyle = gradientHalf
        ctx.fillRect(0, 200, 500, 200)
        // 径向渐变
        ctx.beginPath()
        let gradientRadial = ctx.createRadialGradient(250, 250, 0, 250, 250, 500)
        gradientRadial.addColorStop(0, 'red')
        gradientRadial.addColorStop(1, 'blue')
        ctx.fillStyle = gradientRadial
        ctx.fillRect(0, 0, 500, 500)
    }
})
</script>
<style>
canvas {
    box-shadow: 0px 0px 5px #ccc;
    border-radius: 8px;
}
</style>
```

### 图案样式

`createPattern(Image, Type)`：绘制图案效果。

- `Image`：一个`Image`对象或者`Canvas`对象
- `Type`：图案绘制的类型，分别有：`repeat`、`repeat-x`、`repeat-y`和`no-repeat`

```vue
<template>
    <canvas ref="canvas" width="500" height="500">
        当前浏览器不支持canvas元素,请升级或更换浏览器!
    </canvas>
</template>
<script setup>
import { ref, onMounted } from 'vue'

const canvas = ref(null)
onMounted(() => {
    if (canvas.value.getContext) {
        // 获取绘图上下文
        let ctx = canvas.value.getContext('2d')
        // 图案样式
        // 创建一个Image对象
        let img = new Image()
        img.src='./image.png'
        img.width = 35
        img.height = 35
        // 图片加载完成后执行
        img.onload = () => {
            // 创建图案
            let pattern = ctx.createPattern(img, 'repeat')
            // 设置图案样式
            ctx.fillStyle = pattern
            // 绘制图案
            ctx.fillRect(0, 0, 500, 500)
        }
        
    }
})
</script>
<style>
canvas {
    box-shadow: 0px 0px 5px #ccc;
    border-radius: 8px;
}
</style>
```

## 绘制文本

### `strokeText(描边)`

`strokeText(text, x, y, maxWidth)`：

- text：绘制的文案
- x、y：文本的起始位置
- maxWidth：可选参数，最大宽度。（当文案大于最大宽度时不是裁剪或换行，而是缩小字体）

### `fillText(填充)`

`fillText(text, x, y, maxWidth)`：`参数同上`

### 文本样式

- `font`：用于绘制文本的样式。默认字体为：`10px sans-serif`

- `textAlign`：文本对齐方式。可选值：left、right、center、start和end。默认为start。

- `direction`：文本的方向。可选值为：ltr（文本方向从左向右）、rtl（文本方向从右向左）、inherit（根据情况继承 Canvas元素或者 Document 。）。默认值是 inherit。

  > 注意： direction 属性会对 textAlign 属性产生影响。如果 direction 属性设置为 ltr，则textAlign属性的 left 和 start 的效果相同，right 和 end 的效果相同，如果 direction 属性设置为 rtl，则 textAlign属性的 left 和 end 的效果相同，right 和 start 的效果相同。

- `textBaseline`：基线对齐选项，决定文字垂直方向的对齐方式。可选值为：top、hanging、middle、alphabetic、ideographic和bottom。默认值是 alphabetic。

- `measureText`：测量文本，返回一个 TextMetrics对象。返回的TextMetrics对象不受最大宽度等外界因素所影响。

### 阴影

- `shadowOffsetX、shadowOffsetY`：设置阴影在X和Y轴的延伸距离，他们是不受变换矩阵所影响的。负值表示阴影会往上或左延伸，正值则表示会往上或右延伸，默认值都是0。
- `shadowBlur`：用于设定阴影的模糊程度，其数值并不跟像素数量挂钩，也不受变换矩阵的影响，默认为0。
- `shadowColor`：标准的CSS颜色值，用于设定阴影颜色效果，默认为全透明的黑色。

```vue
<template>
    <canvas ref="canvas" width="500" height="500">
        当前浏览器不支持canvas元素,请升级或更换浏览器!
    </canvas>
</template>
<script setup>
import { ref, onMounted } from 'vue'

const canvas = ref(null)
onMounted(() => {
    if (canvas.value.getContext) {
        // 获取绘图上下文
        let ctx = canvas.value.getContext('2d')
        ctx.beginPath()
        ctx.font = '50px Arial'
        ctx.direction = 'rtl'
        ctx.textBaseline = 'top'
        ctx.strokeText('获取绘图上下文!', 250, 50)
        ctx.beginPath()
        ctx.font = '50px Arial'
        ctx.direction = 'ltr'
        ctx.textBaseline = 'alphabetic'
        ctx.fillText('获取绘图上下文!', 250, 100)
        ctx.beginPath()
        const text = ctx.measureText('获取绘图上下文!')
        console.log(text);
        ctx.beginPath()
        ctx.font = '50px Arial'
        ctx.shadowOffsetX = 10
        ctx.shadowOffsetY = 10
        ctx.shadowBlur = 3
        ctx.shadowColor = '#cccccc'
        ctx.fillText('获取绘图上下文!', 250, 150)
    }
})
</script>
<style>
canvas {
    box-shadow: 0px 0px 5px #ccc;
    border-radius: 8px;
}
</style>
```

## 绘制图片

### `drawImage`：

- image：绘制到上下文的元素
- sx、sy：裁剪框的左上角X轴坐标和Y轴坐标
- sWidth、sHeight：裁剪框的宽度和高度
- dx、dy：绘制到上下文的元素，在上下文中左上角的X轴坐标和Y轴坐标
- dWidth、dHeight：会知道上下文的元素，在上下文中绘制的宽度和高度。若不说明，在绘制时image宽度和高度不会缩放

#### 绘制

`drawImage(image, dx, dy)`：只有单纯的绘制功能，可以绘制图片、视频和别的Canvas对象等。

#### 缩放

`drawImage(image, dx, dy, dWidth, dHeight)`：在绘制的基础上增加两个参数，能控制绘制元素的大小，整体实现一个缩放的效果。dWidth和dHeight两个参数需要同时设置。

#### 裁剪

`drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)`：在缩放的基础上增加四个参数，整体也是在缩放的基础上增加了裁剪的功能。

```vue
<template>
    <canvas ref="canvas" width="500" height="500">
        当前浏览器不支持canvas元素,请升级或更换浏览器!
    </canvas>
</template>
<script setup>
import { ref, onMounted } from 'vue'

const canvas = ref(null)
onMounted(() => {
    if (canvas.value.getContext) {
        // 获取绘图上下文
        let ctx = canvas.value.getContext('2d')
        ctx.beginPath()
        const img = new Image()
        img.src = 'https://vuejs.bootcss.com/images/logo.png'
        img.onload = () => {
            // ctx.drawImage(img, 0, 0) // 绘制
            // ctx.drawImage(img, 0, 0, 500, 500) // 缩放
            // 在图片的(100, 100)位置裁剪一个300*300的内容，然后缩放到500*500绘制到Canvas中(0, 0)的地方
            ctx.drawImage(img, 100, 100, 200, 200, 0, 0, 500, 500) // 裁剪
        }
    }
})
</script>
<style>
canvas {
    box-shadow: 0px 0px 5px #ccc;
    border-radius: 8px;
}
</style>
```

## 变形

变形是一种更强大的方法，可以将原点移动到另一点，还能对网格进行旋转和缩放。

### 状态的保存和恢复

`save()`和`restore()`方法是用来保存和恢复Canvas状态的，方法不需要参数。可以理解为对Canvas状态的快照进行保存和恢复。

Canvas的状态是存储在栈中的，每次调用`save()`方法后，当前的状态都会被推送到栈中保存起来。

保存和恢复可以多次调用，需要注意的是每一次调用`restore()`方法，上一个保存的状态就从栈中弹出，所有设定都恢复。

```vue
<template>
    <canvas ref="canvas" width="500" height="500">
        当前浏览器不支持canvas元素,请升级或更换浏览器!
    </canvas>
</template>
<script setup>
import { ref, onMounted } from 'vue'

const canvas = ref(null)
onMounted(() => {
    if (canvas.value.getContext) {
        // 获取绘图上下文
        let ctx = canvas.value.getContext('2d')
        ctx.beginPath()
        ctx.fillStyle = '#cccccc'
        ctx.save() // 保存当前状态
        ctx.fillRect(10, 10, 300, 50)
        ctx.fillStyle = '#41b883'
        ctx.fillRect(10, 70, 300, 50)
        ctx.restore() // 恢复之前保存的状态
        ctx.fillRect(10, 130, 300, 50)
    }
})
</script>
<style>
canvas {
    box-shadow: 0px 0px 5px #ccc;
    border-radius: 8px;
}
</style>
```

### 移动、旋转和缩放

- 移动：`translate(x, y)`：x是左右偏移量，y是上下偏移量
- 旋转：`rotate(angle)`：angle是旋转角度，是顺时针旋转，以弧度为单位的值
- 缩放：`scale(x, y)`：x为水平缩放的值，y为垂直缩放的值。x和y的值小于1则为缩小，大于1则为放大。默认值为1

> `save()`保存的状态是可以多次保存的，同时保存在栈中的元素遵循的是后进先出的顺序；
>
> 旋转的中心点始终是Canvas的原点；
>
> 缩放如果是负值的话，则是一个镜像的效果。

```vue
<template>
    <canvas ref="canvas" width="500" height="500">
        当前浏览器不支持canvas元素,请升级或更换浏览器!
    </canvas>
</template>
<script setup>
import { ref, onMounted } from 'vue'

const canvas = ref(null)
onMounted(() => {
    if (canvas.value.getContext) {
        // 获取绘图上下文
        let ctx = canvas.value.getContext('2d')
        ctx.beginPath()
        ctx.fillStyle = '#41b883'
        ctx.save()
        ctx.save()
        ctx.translate(100, 100) // 移动
        ctx.fillRect(10, 10, 100, 100)
        ctx.restore()
        ctx.rotate(Math.PI / 4) // 旋转45度，Math.PI=180度
        ctx.fillRect(10, 10, 100, 100)
        ctx.restore()
         ctx.scale(2, 1) // 缩放
        ctx.fillRect(55, 250, 100, 100)
    }
})
</script>
<style>
canvas {
    box-shadow: 0px 0px 5px #ccc;
    border-radius: 8px;
}
</style>
```

### `transform`、`setTransform`、`resetTransform`

- `transform(a, b, c, d, e, f)`：将当前的变形矩阵乘上一个基于自身参数的矩阵
- `setTransform(a, b, c, d, e, f)`：将当前变形矩阵重置为单位矩阵，然后用相同的参数调用`transform`方法
- `resetTransform()`：重置当前变形为单位矩阵。效果等同于调用`setTransform(1, 0, 0, 1, 0, 0)`

> 当使用`transform`方法和`setTransform`方法中如果任意一个参数是`infinity`，那么变形矩阵也必须被标记为无效大，否则会抛出异常。

参数说明：

- a：水平方向的缩放
- b：竖直方向的倾斜偏移
- c：水平方向的倾斜偏移
- d：竖直方向的缩放
- e：水平方向的移动
- f：竖直方向的移动

```vue
<template>
    <canvas ref="canvas" width="500" height="500">
        当前浏览器不支持canvas元素,请升级或更换浏览器!
    </canvas>
</template>
<script setup>
import { ref, onMounted } from 'vue'

const canvas = ref(null)
onMounted(() => {
    if (canvas.value.getContext) {
        // 获取绘图上下文
        let ctx = canvas.value.getContext('2d')
        const sin = Math.sin(Math.PI / 6);
        const cos = Math.cos(Math.PI / 6);
        console.log("🚀 ~ cos, sin", cos, sin)
        ctx.translate(250, 250);
        let c = 0;
        for (let i = 0; i <= 12; i++) {
            c = Math.floor(255 / 15 * i);
            ctx.fillStyle = `rgba(${c}, ${c}, ${c})`;
            ctx.fillRect(0, 0, 200, 50);
            ctx.transform(cos, sin, -sin, cos, 0, 0);
        }
        ctx.resetTransform()
        // 绘制一个矩形
        ctx.fillStyle = "rgba(255, 128, 255, 0.5)";
        ctx.fillRect(0, 50, 100, 100);
        // 上面绘制的矩形不是我们想要的没因为它带上了上面transform的属性
        // 所以需要重置当前变形为单位矩阵
        // ctx.resetTransform()
        // ctx.fillStyle = "rgba(255, 128, 255, 0.5)";
        // ctx.fillRect(0, 50, 100, 100);
    }
})
</script>
<style>
canvas {
    box-shadow: 0px 0px 5px #ccc;
    border-radius: 8px;
}
</style>
```

## 合成和裁剪

### 合成

合成的图形受限于绘制的顺序。可以利用`globalCompositeOperation`属性来改变。

- `globalCompositeOperation = [type]`，`type`为合成的类型。

  参数说明：

  - `source-over`：默认值，在现有画布上下文之上绘制新图形
  - `source-in`：新图形只在新图形和目标画布重叠的地方绘制，其他的都是透明的
  - `source-out`：在不与现有画布内容重叠的地方绘制新图形
  - `source-atop`：新图形只在现有画布内容重叠的地方绘制
  - `destination-over`：在现有的画布内容后面绘制新的图形
  - `destination-in`：现有的画布内容保持在新图形和现有画布内容重叠的位置，其他的都是透明的
  - `destination-out`：现有内容保持在新图形不重叠的地方
  - `destination-atop`：现有的画布只保留在新图形重叠的部分，新的图形是在画布内容后面绘制的
  - `lighter`：两个重叠图形的颜色是通过颜色值相加来确定的
  - `copy`：只显示新图形
  - `xor`：图像中，那些重叠和正常绘制之外的其他地方是透明的
  - `multiply`：将顶层像素与底层相应像素相乘，结果是一副更黑暗的图片
  - `screen`：像素被倒转、相乘、再倒转，结果是一副更明亮的图片
  - `overlay`：`multiply`和`screen`的结合，原本暗的地方更暗，原本亮的地方更亮
  - `darken`：保留两个图层中最暗的像素
  - `lighten`：保留两个图层中最亮的像素
  - `color-dodge`：将底层除以顶层的反置
  - `color-burn`：将反置的底层除以顶层，然后将结果反过来
  - `hard-light`：屏幕相乘类似于叠加，但上下图层互换
  - `soft-light`：用顶层减去底层或者相反来得到一个正值
  - `difference`：一个柔和版本的强光，纯黑或纯白不会导致纯黑或纯白
  - `exclusion`：和`difference`相似，单对比度较低
  - `hue`：保留了底层的亮度和色度，同时采用了顶层的色调
  - `saturation`：保留底层的亮度和色调，同时采用顶层的色度
  - `color`：保留了底层的亮度，同时采用了顶层的色调和色度
  - `luminosity`：保持底层的色调和色度，同时采用顶层的亮度

### 裁剪

裁剪的作用是遮罩，用来隐藏不需要的部分，所有在路径以外的部分都不会在Canvas上绘制出来。裁剪的效果和 globalCompositeOperation 属性的 source-in 和 source-atop差不多，但也有区别，最重要的区别是裁剪路径不会在 canvas 上绘制东西，而且它永远不受新图形的影响。这些特性使得它在特定区域里绘制图形时特别好用。默认情况下，canvas 有一个与它自身一样大的裁剪路径（也就是没有裁剪效果）。现在可以通过`clip()`来创建一个裁剪路径

- `clip(path, fillRule)`：
  - `path`：需要剪切的`Path2D`路径
  - `fillRule`：判断是在路径内还是路径外，允许的值有：
    - `nonzero(默认值)`：非零环绕原则
    - `evenodd`：奇偶环绕原则