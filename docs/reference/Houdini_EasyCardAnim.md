---
title: 探索 CSS Houdini：轻松构建酷炫的 3D 卡片翻转动画
tags:
 - 前端开发
 - CSS
categories:
 - CSS Houdini
date: 2024-10-10
hideComments: false
---
> 在本文中，我将通过构建一个`3D`翻卡动画来探索`Houdini`的功能。这将帮助你了解`Houdini`的核心概念，并引导你完成实际的代码实现。你不仅能够掌握 `Houdini` 的核心概念，还可以跟随实际的代码实现，逐步完成这个动画效果。

我们将深入探讨如何利用 `CSS Houdini` 优化开发流程，打造更为灵活、前沿的 `CSS` 动画效果，赋予你在动画设计中的更大控制权。

传统的 `CSS` 动画虽然功能强大，但往往局限于一套预设的工具和效果，限制了开发人员的发挥。而 `Houdini` 则是一组实验性的浏览器 `API`，它打破了这些桎梏[**zhì gù**]，赋予开发者直接控制浏览器渲染引擎的能力。通过 `Houdini`，开发者可以实现以前难以实现的自定义视觉效果，进一步拓展网页设计的可能性，推动前端设计迈向新的高度。

### 如何使用 `Houdini` 的三大核心

[`CSS Houdini`](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Houdini) 是一组浏览器 `API`，赋予开发人员扩展和增强浏览器渲染引擎能力的权利。通过 `Houdini`，开发人员可以创建自定义动画、效果和样式，突破网页设计的边界。

在接下来的部分中，我们将深入讲解三大主要 `API`，揭示它们的潜力，并了解它们如何提升您的网页设计和开发能力。

### `Worklets`（工作线程）

`Houdini` 的 `worklets` 是在浏览器渲染引擎内运行的 `JavaScript` 模块，允许开发人员定义自定义的绘制、布局和动画行为，从而扩展 `CSS` 的功能。通过使用 `worklets`，您可以实现以下功能：

- **创建动态动画**：例如，基于用户交互动态调整路径的描边宽度，或根据滚动位置动态控制动画速度。这些都是使用 `Houdini` `worklets` 可以实现的可能性。

- **制作交互效果**：创建自定义效果，例如粒子系统、涟漪动画，甚至是交互式的文本操作，这些都可以通过 `worklet` 的逻辑来实现。

- **扩展视觉样式**：基于复杂算法在 `worklet` 环境中生成自定义渐变、图案，甚至纹理。

- **与 JavaScript 无缝衔接**：通过 `worklet` 的通信渠道，将现有的 `JavaScript` 库和功能无缝集成到 `CSS` 样式中。

**开始使用 `Worklets`**

正如前面提到的，`worklets` 使开发人员能够在实际应用中创建更复杂和可定制的效果。为了进一步说明这一点，我们将使用 `Houdini worklets` 构建一个星空效果：

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<link rel="stylesheet" href="styles.css">
<title>Starry Night Sky</title>
</head>
<body>
<section id="night-sky">
</section>

<script>
CSS.paintWorklet.addModule('./app.js');
</script>
</body>
</html>
```

在上面的代码片段中，我们在 `HTML` 中准备了一个专门的区域，以便在实现 `worklet` 效果时使用：

```javascript
<script>
    CSS.paintWorklet.addModule('./app.js');
</script>
```

这行代码 `CSS.paintWorklet.addModule('./app.js')` 告诉浏览器获取定义我们绘制 `worklet` 的 `JavaScript` 代码。

```css
body {
margin: 0;
background-color: #000; /* 夜空的深色背景 */
}

#night-sky {
width: 100vw;
height: 100vh;
background-image: paint(starrySky);
}
```

在上面的 `CSS` 代码中，`background-image: paint(starrySky)` 告诉 `#night-sky` 元素使用我们注册的名为 `starrySky` 的绘制 `worklet` 来生成背景，而不是使用图片。

下面的 `JavaScript` 代码直接使用标准循环和 `canvas` 绘图技术，生成一个带有可自定义颜色、大小和随机星星位置的多变星空效果：

```javascript
class Star {
paint(ctx, geom, properties) {
const numStars = 100; // 调整此项以改变星星的数量
const starColors = properties.get('--star-colors') || ['white', 'grey', 'darkorange'];
const sizeRange = properties.get('--star-size-range') || '2,3'; // 浏览器默认将单位解释为像素

for (let i = 0; i < numStars; i++) {
 const randomColor = starColors[Math.floor(Math.random() * starColors.length)];
 const minSize = parseFloat(sizeRange.split(',')[0]);
 const maxSize = parseFloat(sizeRange.split(',')[1]);
 const starSize = Math.random() * (maxSize - minSize) + minSize;
 const x = Math.random() * geom.width;
 const y = Math.random() * geom.height;
 ctx.fillStyle = randomColor;
 ctx.beginPath();
 ctx.arc(x, y, starSize, 0, 2 * Math.PI);
 ctx.fill();
 ctx.closePath();
}
}
}

registerPaint('starrySky', Star);
```

以下是上面代码中的一些注意事项：

- `class Star`：这是定义我们的绘制 `worklet`，用来绘制单颗星星的蓝图。
- `paint(ctx, geom, properties)`：这是 `worklet` 的核心部分。`ctx` 提供绘图工具，`geom` 提供元素尺寸的信息，`properties` 访问我们自定义的 `CSS` 属性，用于设置星星的颜色和大小。
- 循环和随机性：我们在循环中绘制多颗星星，随机选择它们的位置和颜色，以达到自然的星空效果。
- `registerPaint('starrySky', Star)`：将我们的 `Star` 类注册为一个名为 `starrySky` 的绘制 `worklet`，使其可以从 `CSS` 中调用。

![starry night](https://uploads.sitepoint.com/wp-content/uploads/2024/02/17078737272.png)

### `CSS Houdini` 自定义属性

`CSS Houdini` 中的自定义属性是高级变量，提供了更强大的网页开发控制功能。它们超越了传统的 `CSS` 变量，提供了诸如类型检查、语法定义以及用于动态样式的自定义逻辑等功能。

**带有自定义渲染的圆形进度条**

让我们深入了解一个实际示例，展示如何使用绘制 `worklets` 创建视觉上引人注目的进度条，以下是一个简单的示例。

下面的简单 `HTML` 结构为我们的进度条奠定了基础。一个带有 `progress` 类的 `<div>` 元素作为画布，而 `data-progress` 属性动态存储当前的进度值：

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Moving Circular Progress Bar</title>
<link rel="stylesheet" href="styles.css">
</head>
<body>
<div class="progress" data-progress="0"></div>

<script src="app.js"></script>
</body>
```

下面的 `CSS` 代码片段使用 `Houdini` 的自定义属性来制作一个圆形进度条。`@property` 规则引入了带有 `<percentage>` 语法的 `--progress`，初始值为 0%，并确保不继承。接着，`.progress` 类为圆形容器设置样式，使用锥形渐变动态显示进度。这段简洁的代码利用了 `Houdini` 自定义属性的灵活性，用于在网页开发中创建视觉上引人注目的圆形进度元素：

```css
@property --progress {
 syntax: '<percentage>';
 inherits: false;
 initial-value: 0%;
}

.progress {
 --progress: 0%;
 width: 200px;
 height: 200px;
 border-radius: 50%;
 background: conic-gradient(rgb(255, 58, 255) 0%, rgb(255, 58, 255) var(--progress), transparent var(--progress), transparent 100%);
 position: relative;
 overflow: hidden;
}

.progress::before {
 content: attr(data-progress);
 position: absolute;
 top: 50%;
 left: 50%;
 transform: translate(-50%, -50%);
 font-size: 24px;
 font-weight: bolder;
 color: purple;
 text-align: center;
}
```

接下来是自定义属性的定义（`@property` 规则）：

```css
@property --progress {
 syntax: '<percentage>';
 inherits: false;
 initial-value: 0%;
}
```

以上代码中的一些注意事项：

- `@property` 规则是 `Houdini CSS Typed OM` 规范的一部分。
- 它定义了一个名为 `--progress` 的自定义 `CSS` 属性，语法为 `<percentage>`。
- `inherits: false;` 指定自定义属性不会从父元素继承其值。
- `initial-value: 0%;` 将自定义属性的初始值设置为 0%。

接下来，让我们为圆形进度条设置样式：

```css
.progress {
 --progress: 0%;
 width: 200px;
 height: 200px;
 border-radius: 50%;
 background: conic-gradient(#ccc 0%, #ccc var(--progress), transparent var(--progress), transparent 100%);
 position: relative;
 overflow: hidden;
}
```

以上代码中的一些注意事项：

- `--progress: 0%;` 初始化自定义属性为 0%。
- `.progress` 类为圆形进度条设置样式。
- `width` 和 `height` 设置圆形容器的尺寸。
- `border-radius: 50%;` 创建一个完美的圆形。
- `background` 使用锥形渐变来创建圆形进度效果，进度由 `--progress` 属性决定。
- `position: relative;` 和 `overflow: hidden;` 用于定位和溢出管理。

接下来，我们将创建我们的绘制 `worklet`。

我们的圆形进度条通过 `CSS Houdini` 和 `JavaScript` 的动态协作而生动呈现。借助 `CSS Houdini`，我们定义了自定义属性 `--progress`，而绘制 worklet 负责自定义绘制。这种协作使我们的进度条能够根据自定义属性的变化值进行实时更新。这种合作不仅增强了灵活性，还为创建独特的渲染效果提供了强大的途径，从而为我们的 `Web` 应用程序带来了引人入胜、视觉上吸引人的圆形进度条。

```javascript
class PaintWorklet {
 paint(ctx, { width, height, progress }) {
 ctx.clearRect(0, 0, width, height);
 ctx.beginPath();
 ctx.arc(width / 2, height / 2, width / 2, 0, (Math.PI * 2 * progress) / 100);
 ctx.fillStyle = '#42f445';
 ctx.fill();
 }
}
```

以下是上面代码中的一些注意事项：

- `class PaintWorklet` 是一个 `JavaScript` 类，表示一个绘制 `worklet`，属于 `Houdini Paint API` 的一部分。
- `paint` 方法定义了圆形进度条的自定义绘制逻辑。
- `ctx` 是 `2D` 渲染上下文，用于绘制圆形进度条。

接下来，我们将注册绘制 `worklet` 和自定义属性：

```javascript
CSS.paintWorklet.addModule('paint-worklet.js');
const progressElements = document.querySelectorAll('.progress');
progressElements.forEach(element => {
 const paintWorklet = new PaintWorklet();
 CSS.registerProperty({
 name: '--progress',
 syntax: '<percentage>',
 inherits: false,
 initialValue: '0%',
 paint: (ctx, geometry, properties) => {
 paintWorklet.paint(ctx, {
 width: geometry.width,
 height: geometry.height,
 progress: parseFloat(properties.get('--progress').toString()),
 });
 },
 });
});
```

上面代码中的一些注意事项：

- `CSS.paintWorklet.addModule('paint-worklet.js');` 加载绘制 worklet 模块。
- `CSS.registerProperty` 注册自定义属性 `--progress` 并将其与绘制 worklet 关联。
- `paint` 方法根据 `--progress` 的当前值提供自定义绘制逻辑。

现在让我们设置随时间变化的进度：

```javascript
let currentProgress = 0;
function updateProgress() {
 currentProgress += 0.1; // 增量控制旋转速度
 if (currentProgress > 100) {
 currentProgress = 0;
 }
 progressElements.forEach(element => {
 element.dataset.progress = currentProgress.toFixed(2);
 element.style.setProperty('--progress', `${currentProgress.toFixed(2)}%`);
 });

 requestAnimationFrame(updateProgress);
}

updateProgress();
```

上面代码中的一些注意事项：

- `currentProgress` 随时间递增以模拟进度。
- `element.dataset.progress` 和 `element.style.setProperty` 更新 `DOM` 和自定义属性以反映进度。
- `requestAnimationFrame` 通过请求下一帧来确保动画的流畅性。

![circular progress bar](https://uploads.sitepoint.com/wp-content/uploads/2024/02/17078737303.gif)

### `Paint API`（绘制 `API`）

[`Paint API`](https://developer.mozilla.org/en-US/docs/Web/API/CSS_Painting_API) 是 `CSS Houdini` 的核心，它通过支持动态和自定义的视觉样式革新了网页绘制。它使开发人员能够使用用户定义的自定义属性即时创建设计，探索其秘密即可释放无与伦比的潜力。

**简化基础**

以下是一些 `Paint API` 的功能：

- **绘制 `worklet`**：一个 `JavaScript` 函数，像您的艺术精灵，根据您的指令创造视觉效果。
- **自定义属性**：使用 `CSS` 的 `var()` 语法定义的变量，保存可以动态引用和操作的值。
- **paint() 函数**：调用绘制 `worklet` 的魔法棒，将视觉魔法编织到元素上。

**使用代码绘制：一个实用示例**

为了展示“使用代码绘制”的实际应用，让我们深入到一个展示 `CSS Paint API` 强大功能的实际示例中。

下面的代码片段展示了开发人员如何创建动态和可自定义的图案，打破静态图像的限制，为网页体验注入活力：

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<link rel="stylesheet" href="styles.css">
<title>Paint API Demo</title>
</head>
<body>
<section id="screen">
</section>

<script>
CSS.paintWorklet.addModule('./app.js');
</script>
</body>
</html>
```

**链接绘制 `worklet`**

`CSS.paintWorklet.addModule('./app.js')` 注册了在 `app.js` 中定义的自定义绘制 `worklet`，从而可以在 `CSS` 中使用它。

下面提供的 `CSS` 代码片段展示了在 `CSS Houdini` 中使用 `Paint API` 的方法。`background-image: paint(awesomePattern)` 属性集成了 `awesomePattern` 绘制 `worklet`，展示了动态生成视觉效果的强大与简洁：

```css
body {
  margin: 0px;
  padding: 0px;
}

#screen {
  box-sizing: border-box;
  margin: 10px;
  padding: 0px;
  width: calc(100vw - 20px);
  height: calc(100vh - 20px);
  background-color: #111;
  background-image: paint(awesomePattern);
}
```

**应用绘制 `worklet`**

`background-image: paint(awesomePattern)` 将已注册的绘制 `worklet` 应用于 `#screen` 元素的背景图片，展示了 `CSS Houdini` 在创建动态视觉效果方面的能力。

`CSS` 属性可以控制图案的外观：

- `--numShapes`: 圆形的数量
- `--shapeSize`: 圆形的大小
- `--colors`: 调色板

在下面的 `JavaScript` 代码中，`Shape` 类成为核心。它的 `paint` 方法由用户定义的属性（如 `--numShapes`、`--shapeSize` 和 `--colors`）驱动，生成一个充满随机形状的画布。`awesomePattern` 绘制 `worklet` 的注册巩固了 `CSS` 和 `JavaScript` 的集成，实现了动态视觉元素的无缝协作：

```javascript
class Shape {
paint(ctx, geom, properties) {
  // 访问输入属性以进行自定义
  const numShapes = properties.get('--numShapes') || 30;
  const shapeSize = properties.get('--shapeSize') || 50;
  const colors = properties.get('--colors') || ['#F28500', '#00FFFF', 'limegreen'];
  // 优化随机颜色选择
  const getRandomColor = () => colors[Math.floor(Math.random() * colors.length)];
  for (let i = 0; i < numShapes; i++) {
    const x = Math.random() * geom.width;
    const y = Math.random() * geom.height;
    const radius = Math.random() * shapeSize;
    const color = getRandomColor();
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.fill();
    ctx.closePath();
    }
  }
}

registerPaint('awesomePattern', Shape);
```

**定义绘制 `worklet`**

- `class Shape { ... }` 定义了一个带有 `paint()` 方法的类，这是 `Paint API` 的核心部分。
- `properties.get()` 从 `CSS` 中获取自定义选项，展示了 `Houdini` 与 `CSS` 属性的集成。
- `paint()` 方法使用类似 `canvas` 的绘图命令来创建动态的圆形图案，强调了 `Houdini` 扩展 `CSS` 自定义渲染功能的能力。
- `registerPaint('awesomePattern', Shape)` 将 `Shape` 类注册为绘制 `worklet`，使其可以在 `CSS` 中使用。

![large dots](https://uploads.sitepoint.com/wp-content/uploads/2024/02/17078737324.png)

### 使用 `CSS Houdini` 制作交互式 `3D` 动画

这是我们使用 `CSS Houdini`、`worklets`、`Paint API` 和自定义 `Houdini` 属性构建引人入胜的 `3D` 卡片翻转动画的过程。`CSS Houdini` 允许创建自定义绘制 `worklet`，从而提供更灵活和动态的样式处理方式。该动画由悬停事件触发，展示了 `Houdini` 在无缝结合网页开发的视觉和交互方面的强大功能。

在下面的代码中，您将看到完整的代码，并附有对 `CSS Houdini` 元素的简明解释：

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<link rel="stylesheet" href="styles.css">
<script type="module" src="app.js" defer></script>
</head>
<body>
<div class="card" id="flip-card">
<div class="card-inner" id="flip-card-inner">
<div class="card-front">卡片前面内容</div>
<div class="card-back">卡片后面内容</div>
</div>
</div>
</body>
</html>
```

下面的 `CSS` 代码为网页项目中的卡片元素建立了基础结构。通过 `Flexbox` 属性使布局居中于视口，卡片本身具有特定的尺寸和三维透视效果。

值得注意的是，`Houdini` 特性 `paint: card-flip;` 应用于 `.card-inner` 元素，引入了一个动态的翻转效果，在悬停时触发。翻转动画由 `transform` 属性控制，平滑地实现180度旋转。样式细节包括鲜艳的背景颜色、字体属性，以及 `border-radius`，使正反两面都呈现精致的外观。该代码实现了一个视觉吸引且具有交互性的卡片设计：

```css
body {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  margin: 0;
  background-color: #f0f0f0;
}

.card {
  width: 200px;
  height: 300px;
  perspective: 1000px;
}

.card-inner {
  --card-rotation: 0deg;
  paint: card-flip;
  paint-order: normal;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  transition: transform 0.6s;
  transform: rotateY(var(--card-rotation));
}

.card:hover .card-inner {
  --card-rotation: 180deg;
}

.card-front,
.card-back {
  width: 100%;
  height: 100%;
  position: absolute;
  backface-visibility: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  color: white;
  border-radius: 10px;
}

.card-front {
  background-color: #3498db;
}

.card-back {
  background-color: #e74c3c;
  transform: rotateY(180deg);
}
```

在下面的 `JavaScript` 代码中（来自 `app.js`），脚本检查浏览器是否支持 `paintWorklet` 功能，如果支持，则添加一个名为 `paintWorklet.js` 的绘制 `worklet` 模块。此外，还为 ID 为 `flip-card` 的元素附加了一个事件监听器，在点击事件时切换 `flipped` 类：

```javascript
if ('paintWorklet' in CSS) {
  CSS.paintWorklet.addModule('paintWorklet.js')
  .catch(error => console.error('paint worklet 注册失败:', error));
}

document.getElementById('flip-card').addEventListener('click', function () {
  this.classList.toggle('flipped');
});
```

`paintWorklet.js` 文件通过注册一个名为 `card-flip` 的自定义绘制 `worklet` 来扩展 `JavaScript` 功能。这个 `worklet` 与现有代码无缝集成，使用 `canvas` 操作动态绘制卡片元素的翻转动画。

`--card-rotation` 属性控制旋转角度。结合交互式点击事件监听器，这种模块化的方法增强了整个网页项目的视觉吸引力。

`paintWorklet.js` 文件：

```javascript
class CardFlipPainter {
  static get inputProperties() {
    return ['--card-rotation'];
  }

  paint(ctx, geom, properties) {
    const rotation = properties.get('--card-rotation').toString();
    ctx.clearRect(0, 0, geom.width, geom.height);
    ctx.fillStyle = '#3498db';
    ctx.fillRect(0, 0, geom.width, geom.height);
    ctx.fillStyle = '#e74c3c';
    ctx.save();
    ctx.translate(geom.width / 2, geom.height / 2);
    ctx.rotate((parseFloat(rotation) || 0) * (Math.PI / 180));
    ctx.fillRect(-geom.width / 2, -geom.height / 2, geom.width, geom.height);
    ctx.restore();
  }
}

registerPaint('card-flip', CardFlipPainter);
```

`class CardFlipPainter { ... }` 定义了自定义绘制 `worklet`。 
`static get inputProperties() { ... }` 接受 `--card-rotation` 属性。 
`paint(ctx, geom, properties) { ... }` 使用 `canvas` 操作执行自定义绘制逻辑。
`registerPaint('card-flip', CardFlipPainter);` 将 `worklet` 注册到 `CSS` 中。

![card flip](https://raw.githubusercontent.com/chnjames/cloudImg/main/Images202409181003768.gif)

### 扩展卡片翻转效果

以下是如何将使用 `Houdini` 创建的卡片翻转效果集成到公司网站中的方法。让我为您展示一个实际项目场景：

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<link rel="stylesheet" href="styles.css">
<script type="module" src="app.js" defer></script> 
</head>
<body>
<div class="flex-container">
<div class="card" id="flip-card"> 
<div class="card-inner" id="flip-card-inner">
<div class="card-front">
<div class="image"></div>
</div>
<div class="card-back">
<div class="content">
<p>一点一木</p>
<p>前端开发</p>
</div>
</div>
</div>
</div>

<div class="card" id="flip-card">
<div class="card-inner" id="flip-card-inner">
<div class="card-front">
<div class="image"></div>
</div>
<div class="card-back">
<div class="content">
<p>稀土掘金</p>
<p>综合类技术社区</p>
</div>
</div>
</div>
</div>

<div class="card" id="flip-card">
<div class="card-inner" id="flip-card-inner">
<div class="card-front">
<div class="image"></div>
</div>
<div class="card-back">
<div class="content">
<p>Vue.js</p>
<p>渐进式的 JavaScript 框架</p>
</div>
</div>
</div>
</div>
</div>
</body>
</html>
```

我为网站设计了一个员工展示部分，使用卡片翻转效果在正面显示员工的照片，反面则展示他们的职位和姓名。

**让我们来看一下我对代码进行的一些更改。**

将所有卡片排列在一个 `flex` 容器中：

```html
<div class="flex-container">
</div>
```

在卡片正面部分，我添加了一个 `image` `div`，您可以通过在 `CSS` 中使用背景图片，轻松集成任何您选择的图片。

```html
<div class="card-front">
  <div class="image">
  </div>
</div>
```

在卡片背面部分，您会看到一个包含员工姓名（如“一点一木”）和职位（如“前端开发”）的 `content` `div`。这些元素被赋予了 `content` 类，以便于进行 `CSS` 样式设计。您可以根据自己的内容需求自由地个性化这些信息。

```html
<div class="card-back">
  <div class="content">
    <p>一点一木</p>
    <p>前端开发</p>
  </div> 
</div>
```

即将展示的 `CSS` 代码片段展示了实际更改，以演示 `CSS` 卡片翻转效果在真实网页项目中的应用。您可以根据自己的喜好调整这些样式：

```css
body {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  margin: 0;
  background-color: #f0f0f0;
}

.card {
  width: 200px;
  height: 300px;
  perspective: 1000px;
}

.card-inner {
  --card-rotation: 0deg;
  paint: card-flip;
  paint-order: normal;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  transition: transform 0.6s;
  transform: rotateY(var(--card-rotation));
}

.card:hover .card-inner {
  --card-rotation: 180deg;
}

.card-front,
.card-back {
  width: 100%;
  height: 100%;
  position: absolute;
  backface-visibility: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  color: white;
  border-radius: 10px;
}

.card-front {
  background-color: #3498db;
}

.card-back {
  background-color: #e74c3c;
  transform: rotateY(180deg);
}

.flex-container {
  display: flex;
  gap: 2rem;
} 

.content {
  text-align: center;
}

.image {
  height: 120px;
  width: 120px;
  border-radius: 50%;
  background-color: #fff;
  /* background-image: url(); */
}
```

在包含所有卡片的容器中，`CSS` 代码使用了 `flex` 布局，并将卡片之间的间距设置为 `2 rem`。您可以根据设计偏好调整间距的数值。

```css
.flex-container { 
  display: flex;
  gap: 2rem;
}
```

`content` 类的 `CSS` 代码将文本居中对齐在指定元素内。您可以根据需要进行调整，以达到所需的内容对齐效果：

```css
.content {
  text-align: center;
}
```

`image` 类在卡片正面内容中的 `CSS` 代码设置了一个高度和宽度为 `120px` 的圆形图片，`border-radius` 为 `50%`，背景颜色为白色。此外，还有一行注释掉的背景图片代码，您可以取消注释并提供相应的图片 `URL`。您可以根据设计需求调整尺寸和背景属性。

```css
.image { 
  height: 120px; 
  width: 120px; 
  border-radius: 50%; 
  background-color: #fff; 
  /* background-image: url(); */ 
}
```

![3d card flip staff section](https://raw.githubusercontent.com/chnjames/cloudImg/main/Images202409181018927.gif)

### 结论

总而言之，本文探讨了 `Houdini` 的变革性功能，重点介绍了 3D 卡片翻转动画。它突出了 `worklets` 在动态动画、交互效果和扩展视觉样式方面的强大功能。自定义属性和 `Paint API` 提供了额外的灵活性和创造性可能性。

通过实际示例，包括圆形进度条和 `3D` 卡片翻转在公司网站中的集成，展示了 `Houdini` 在现实世界中的应用。本文鼓励您拥抱 `Houdini` 的无限潜力，提供了重新定义网页设计和激发创造性开发的工具。