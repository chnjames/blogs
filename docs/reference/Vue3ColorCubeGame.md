---
title: 💻揭秘！如何用 Vue 3 实现酷炫的色彩魔方游戏✨
tags:
 - 游戏
 - JavaScript
 - 前端开发
categories:
 - 前端开发
date: 2024-08-14
hideComments: false
---
### 引言

作为一名前端开发者，你是否曾有过这样的经历：一天傍晚，你坐在电脑前，盯着屏幕上跳动的代码行，忽然间，灵感如闪电般劈过。你想到一个有趣的小项目——一个小游戏，简单但不失挑战性，可以让玩家在闲暇时光中轻松一笑。于是，你拿起咖啡杯，开始了这段开发之旅。

我也是在这样一个偶然的灵感闪现中，开始了“色彩魔方挑战”的开发。这个小游戏看似简单，但其中却蕴含着丰富的逻辑和细节。从最初的构思，到代码实现，再到最终的视觉效果，每一步都充满了乐趣和挑战。在这篇博客中，我将带你深入了解这个小游戏的开发过程，分享我的经验和代码实现。无论你是想了解开发过程，还是希望从中获取灵感，这篇文章都会有所帮助。

### 项目概述

“色彩魔方挑战”是一款基于 Canvas 的小游戏，玩家需要在两幅画布之间找出随机生成的颜色变化点。这款游戏不仅测试玩家的观察力，还能锻炼他们的耐心。接下来，我将详细讲解游戏的核心功能实现，包括颜色矩阵的生成、点的闪烁效果、以及画布的设置等方面。

### 功能概述

- **生成随机色彩矩阵**：创建一个充满随机颜色的矩阵，为游戏提供基础。

- **自定义矩阵阶数**：自由设置矩阵的阶数，范围从`2 x 2` 到`500 x 500`，挑战难度完全由你决定。

- **多样配色方案**：提供多种配色方案，包括经典、荧光、清新、单色、自然、高对比和潮流配色，让玩家体验不同的视觉风格。

- **一键生成**：通过简单点击，即可随机生成一个新的色彩矩阵，立即开始挑战。

- **帮助模式**：若无法找到不同的颜色，点击“帮助”按钮，系统会提供一个闪烁的提示，帮助你轻松找到目标。

- **随机颜色变化**：在矩阵中随机选择一个点并改变其颜色，增加游戏的趣味性。

- **找出不同点**：玩家需在两幅矩阵中识别出颜色不同的点，测试观察力。

- **倒计时功能**：设定时间限制，挑战超时即为失败。[待开发：视玩家反馈而定]

- **点击次数限制**：限制玩家的点击次数，在规定次数内找到不同点，提升挑战性。[待开发：视玩家反馈而定]

### 技术实现

这个程序是基于`Vue 3`和`TypeScript`开发的，使用了`Element Plus`组件库来提供`UI`元素的支持。色彩矩阵的生成和绘制主要依赖于`HTML5`的`Canvas`技术，通过`JavaScript`动态生成和绘制每一个颜色块。

### 核心代码展示

**定义颜色和矩阵设置**

首先，定义了不同的配色方案，并设置了用于绘制矩阵的基本参数：

```typescript
import { reactive, ref, computed } from 'vue'

const dimension = ref(10) // 设置魔方阶数
const matchColor = ref('classic') // 初始配色方案为经典配色

// 定义配色方案
const matchColorsOptions: any = reactive({
  classic: ['#FFFFFF', '#FFFF00', '#FF0000', '#FFA500', '#0000FF', '#008000'],
  glow: ['#FF6EC7', '#FF4500', '#FFFF33', '#39FF14', '#1B03A3', '#9400D3'],
  gradient: ['#ADD8E6', '#90EE90', '#FFB6C1', '#FFFFE0', '#FFDAB9', '#E6E6FA'],
  single: ['#F5F5F5', '#D3D3D3', '#A9A9A9', '#696969', '#36454F', '#000000'],
  nature: ['#87CEEB', '#7CFC00', '#F4A460', '#4682B4', '#808080', '#FF4500'],
  contrast: ['#000000', '#FFFFFF', '#FFD700', '#00FF00', '#FFA500', '#1E90FF'],
  trend: ['#98FF98', '#FF7F50', '#FAFAD2', '#E6E6FA', '#AFEEEE', '#FFB7C5']
})

// 获取当前选择的配色方案
const currentColorScheme = computed(() => matchColorsOptions[matchColor.value])
```

**生成矩阵**

游戏的核心是生成一个随机颜色的矩阵，其中包括一个不同颜色的点。通过以下代码生成矩阵：

```typescript
// 生成颜色矩阵
const generateMatrix = (): string[][] => {
  const n = dimension.value
  const colorCount = currentColorScheme.value.length
  return Array.from({ length: n }, () =>
    Array.from({ length: n }, () =>
      currentColorScheme.value[Math.floor(Math.random() * colorCount)]
    )
  )
}
```

**绘制矩阵**

生成矩阵后，需要在画布上绘制它。这里使用了`HTML5`的`Canvas`技术来实现：

```typescript
// 绘制单个点的函数
const drawPoint = (ctx: CanvasRenderingContext2D, x: number, y: number, color: string) => {
  ctx.fillStyle = color
  ctx.fillRect(x * cellWidth, y * cellWidth, cellWidth, cellWidth)
  ctx.lineWidth = 0.5
  ctx.strokeRect(x * cellWidth, y * cellWidth, cellWidth, cellWidth)
}

// 绘制整个矩阵的函数
const drawMatrix = (ctx: CanvasRenderingContext2D, matrix: string[][]) => {
  const n = dimension.value
  for (let x = 0; x < n; x++) {
    for (let y = 0; y < n; y++) {
      drawPoint(ctx, x, y, matrix[x][y])
    }
  }
  ctx.strokeRect(0, 0, canvasWidth, canvasWidth)
}
```

**生成不同颜色的点**

为了增加游戏的挑战性，在矩阵中随机生成一个不同颜色的点：

```typescript
// 生成随机点
const randomPoint = () => ({
  x: parseInt(String(Math.random() * dimension.value)),
  y: parseInt(String(Math.random() * dimension.value))
})

// 生成随机颜色
const randomColor = (oldColor: string): string => {
  let newColor
  do {
    newColor = currentColorScheme.value[Math.floor(Math.random() * currentColorScheme.value.length)]
  } while (newColor === oldColor)
  return newColor
}

// 生成新的魔方图案
const bindGenerate = () => {
  if (!setupCanvas()) return

  const leftCtx = LeftRefCanvas.value!.getContext('2d')!
  const rightCtx = RightRefCanvas.value!.getContext('2d')!

  matrix = generateMatrix()
  drawMatrix(leftCtx, matrix)

  point = randomPoint()
  const { x, y } = point
  matrix[x][y] = randomColor(matrix[x][y])

  drawMatrix(rightCtx, matrix)
}
```

**帮助功能：闪烁提示**

为了帮助玩家找到不同颜色的点，加入了闪烁提示功能：

```typescript
const bindHelp = () => {
  if (!RightRefCanvas.value) return

  const rightCtx = RightRefCanvas.value.getContext('2d')!
  const { x, y } = point
  const color = matrix[x][y]

  let isBlack = true
  const blinkEffect = () => {
    drawPoint(rightCtx, x, y, isBlack ? 'black' : color)
    isBlack = !isBlack
  }

  blinkEffect()
  timerId = setInterval(blinkEffect, 300)
}
```

### 结语

色彩魔方挑战不仅仅是一款游戏，更是对你视觉敏锐度的极致考验。通过不断的挑战，你会发现自己对色彩的感知能力逐渐增强。在闲暇时光里，来一局色彩魔方挑战，享受视觉与智力的双重愉悦吧！

**立即开始挑战！**

https://code.juejin.cn/pen/7402551912140111923

欢迎在评论区分享你对这款游戏的看法和高分经验，期待听到你的反馈！