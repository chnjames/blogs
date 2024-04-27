---
title: JavaScript：轻松创建二维数组的多种方法
date: 2024-04-27
hideComments: false
tags:
 - JavaScript
 - 前端开发
categories:
 - 前端开发
 - JavaScript
publish: true
---

当我在面试中问到：“你能用JavaScript生成一个二维数组吗？”时，这个问题可能看起来很简单，但实际上它揭示了面试者对JavaScript的熟练程度。就像实现同样目标有各种方法一样，生成二维数组也有各种方法。今天，让我们探讨一下这个问题的答案，揭示生成二维数组的秘密。

了解不同的方法不仅使我们能够更熟练地处理不同的情况，而且在面试中展示了我们对JavaScript的深刻理解。毕竟，在编程的世界里，适应能力往往比死记硬背更重要。

我建议在阅读本文时，尝试在查看解决方案之前考虑如何自己实现每种方法。这种方法会带来更多的见解。

#### **创建一维数组**

在我们着手处理二维数组之前，让我们学习如何创建一维数组。有几种方法可以实现这个目标；以下是一些常见的方法：

**1.数组字面量**

这是创建数组的最简单方式，只需使用方括号 []。

```javascript
let arr = [1, 2, 3];
```

**2.使用`Array`构造函数**

上述数组也可以使用数组构造函数创建。

```javascript
let arr = new Array(1, 2, 3);
```

然而，当使用`Array`构造函数时，重要的是要注意，如果只传递一个参数，那么它表示数组的长度。除了上述方法，为了创建一个只有一个元素的数组，你也可以使用 `Array.of()` 方法。当有多个参数时，`Array.of` 和数组构造函数的效果是相同的。

```javascript
let arr = Array.of(2);
console.log(arr); // [2]
```

你可以使用此`Array`构造函数来创建一个指定长度的数组。但需要注意的是，通过这种方式创建的数组元素是空插槽，而不是 `undefined`。

```javascript
let arr = new Array(3);
console.log(arr); // [empty × 3]
```

为了避免空插槽的问题，你可以将这个方法与 `Array.fill()` 方法结合起来填充数组：

```javascript
let arr = new Array(3).fill(0);
console.log(arr); // [0, 0, 0]
```

**3.使用 `Array.from()`**

`Array.from()` 方法可以从类数组或可迭代对象创建一个新的数组实例。它还可以接受一个`map`函数作为第二个参数来初始化数组元素。

```javascript
let arr = Array.from({ length: 3 }, () => 0);
console.log(arr); // [0, 0, 0]
```

**4. 使用`展开运算符`和 `Array()`**

你可以将`展开运算符 (...)` 与 `Array()` 构造函数结合使用来创建和初始化一个数组。

```javascript
let arr = [...Array(3)].map(() => 0);
console.log(arr); // [0, 0, 0]
```

掌握这些创建一维数组的方法可以帮助我们更灵活地处理各种编程场景。在接下来的部分中，我们将探讨如何扩展这些方法来创建二维数组。



#### 二维数组介绍

二维数组，顾名思义，是一个数组的数组。在 JavaScript 中，它可以用来表示矩阵、网格或任何需要行和列的数据结构。想象一下象棋棋盘，其中每一行都是一个数组，整个棋盘就是一个二维数组。

在编程面试中，二维数组经常出现，特别是在处理与矩阵相关的问题时。例如：

1. 矩阵相关问题：给定一个 n x n 的二维矩阵，将其就地顺时针旋转 90 度。
2. 岛屿计数：给定一个由 '1'（陆地）和 '0'（水）组成的二维网格，计算岛屿的数量。
3. 动态规划：求解最大子数组求和问题。

掌握对二维数组进行操作对于解决这些问题至关重要，因此理解如何在 `JavaScript` 中有效地生成和操作二维数组非常有用。

生成二维数组的方法有很多种，今天我们将探讨以下方法，并分析它们的优缺点：

**1.使用嵌套循环**

这是最直接的方法。首先创建一个外部数组，然后在每个位置创建一个内部数组。

```javascript
function create2DArray(m, n) {
  let arr = new Array(m);
  for (let i = 0; i < m; i++) {
    arr[i] = new Array(n);
    for (let j = 0; j < n; j++) {
      arr[i][j] = 0; // 或其他初始值
    }
  }
  return arr;
}
```

优点：直观易懂。

缺点：代码有些冗长。

**2.使用 `Array.from()`**

`Array.from()` 可以基于给定的参数创建一个新数组，而 `map()` 可以处理数组的每个元素。

```javascript
// 写法一：
function create2DArray(m, n) {
  return Array.from({ length: m }, () => Array.from({ length: n }, () => 0));
}
// 写法二：
function create2DArray(m, n) {
  return Array.from({ length: m }, () => Array(n).fill(0));
}
```

优点：代码更简洁。

缺点：对于初学者来说，可能需要一些时间来理解这种语法。

**3.使用 `Array.fill()` 和 `map()`**

与之前的方法类似，但使用 `Array.fill()` 来创建初始数组。

```javascript
function create2DArray(m, n) {
  return Array(m).fill().map(() => Array(n).fill(0));
}
```

优点：非常简洁。

缺点：与之前的方法类似，对初学者来说可能有些挑战。

**4.使用`展开运算符`和 `map()`**

`展开运算符 (...)` 可以用于展开数组，结合 `map()` 来创建一个二维数组。

```javascript
function create2DArray(m, n) {
  return [...Array(m)].map(() => Array(n).fill(0));
}
```

优点：代码简洁易懂。

缺点：性能可能略逊于其他方法。



#### 结论

每种方法都有其优缺点，你选择哪种方法取决于你的具体需求和个人偏好。如果你重视代码简洁性，那么使用 `Array.from()` 可能是一个不错的选择。如果你更喜欢易于理解和维护的代码，那么使用嵌套循环可能更适合你。

掌握生成二维数组的各种方法是每个 `JavaScript` 开发者的基本技能。通过这些方法，我们可以灵活处理各种数据结构和算法挑战。希望本文能帮助你更好地理解和运用这些技术。下次面试中遇到这个问题时，你将能够自信地提供答案。



#### 我的推荐方法

在所有方法中，我个人更喜欢使用 `Array.from()` 方法，因为它非常强大。当然，`Array.fill` 方法也很棒，它具有语义化和更易读的优点。

```javascript
function create2DArray(m, n) {
  return Array.from({ length: m }, () => Array.from({ length: n }, () => 0));
}
function create2DArray(m, n) {
  return Array(m).fill().map(() => Array(n).fill(0));
}
```



感谢阅读本文！掌握 `JavaScript` 中生成二维数组的多种方法可以帮助我们更轻松地处理不同的编程挑战。每种方法都有其独特的特点，你最喜欢哪一种呢？欢迎在评论区分享你的想法和经验，让我们一起进步！