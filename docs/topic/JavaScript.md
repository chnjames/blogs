# JavaScript

## 原型、构造函数、实例

- 原型（`prototype`）：一个简单的对象，用于实现对象的属性继承。
- 构造函数：可以通过`new`来新建一个对象的函数。
- 实例：通过构造函数和`new`创建出来的对象，便是实例。实例通过`__proto__`指向原型，通过`constructor`指向构造函数。

```javascript
// 实例
const instance = new Object()

// instance(实例).__proto__ === Object.prototype(原型)

// Object.prototype(原型).constructor === Object(构造函数)

// Object(构造函数).prototype === Object.prototype(原型)
```

![Snipaste_2022-06-20_19-56-55](https://raw.githubusercontent.com/chnjames/cloudImg/main/blog/202206201957517.png)

## 原型链

原型链是由原型对象组成，每个对象都有`__proto__`属性，指向了创建该对象的构造函数的原型，`__proto__`将对象连接起来组成了原型链。是一个用来实现继承和共享属性的有限的对象链。

- 属性查找机制：当查找对象的属性时，如果实例对象自身不存在该属性，则沿着原型链往上一级查找，找到时则输出，不存在时，则继续沿着原型链往上一级查找，直至最顶级的原型对象`Object.prototype`，如还是没找到，则输出`undefined`；
- 属性修改机制：只会修改实例对象本身的属性，如果不存在，则进行添加改属性，如果需要修改原型的属性时，则可以用：`b.prototype.x = 2`；但是这样会造成所有继承于该对象的实例的属性发生改变。

## `Class`基本语法和继承

### 简介

```javascript
class Point {
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}
	toString() {
		return `(${this.x},${this.y})`
	}
}
```

#### `constructor` 方法

`constructor()` 方法是类的默认方法，通过`new` 命令生成对象实例时，自动调用该方法。一个类必须有`constructor()`方法，如果没有显示定义，一个空的`constructor()`方法会被默认添加。`constructor()`方法默认返回实例对象（即`this`），完全可以指定返回另外一个对象。

类必须使用`new` 调用，否则会报错。

#### 注意点

- 严格模式

  类和模块的内部，默认就是严格模式。只要你写的代码在类或模块之中，就是严格模式。

- 不存在提升

  类不存在变量提升。

- `name`属性

  由于本质上，`ES6`的类只是`ES5`的构造函数的一层包装，所以函数的需要特性都被`class`继承，包括`name`属性。

- `Generator`方法

  如果某个方法之前加上星号（`*`），就表示该方法是一个`Generator`函数。

- `this`的指向

  类的方法内部如果含有`this`，他默认指向类的实例。

### 静态方法

类相当于实例的原型，所有在类中定义的方法，都会被实例继承。如果在一个方法前，加上`static`关键字，就表示该方法不会被实例继承，而是直接通过类来调用。

父类的静态方法，可以被子类继承。

静态方法也是可以从`super`对象上调用的。

```javascript
class Foo {
  static classMethod() {
    return 'hello';
  }
}
class Bar extends Foo {
  static classMethod() {
    return super.classMethod() + ', too';
  }
}
Bar.classMethod() // "hello, too"
```

### 实例属性的新写法

实例属性除了定义在`constructor()`方法里面的`this`上面，也可以定义在类的最顶层。此时，不需要再实例属性前面加上`this`。

```javascript
class IncreasingCounter {
  _count = 0;
  increment() {
    this._count++;
  }
}
```

### `Class`的继承

`Class`可以通过`extends`关键字实现继承，让子类继承父类的属性和方法。

```javascript
class Point {
}

class ColorPoint extends Point {
  constructor(x, y, color) {
    super(x, y); // 调用父类的constructor(x, y)
    this.color = color;
  }
}
```

`ES6`规定，子类必须在`constructor()`方法中调用`super()`。因为子类自己的`this`对象，必须先通过父类的构造函数完成塑造，得到与父类同样的实例属性和方法，然后再对其进行加工，添加子类自己的实例属性和方法。如果不调用`super()`方法，子类就得不到自己的`this`对象。

## 对象的拷贝

- 浅拷贝：以赋值的形式拷贝引用对象，仍指向同一个地址，修改时原对象也会受到影响
  - `Object.assign`
  - 展开运算符（`...`）
- 深拷贝：完全拷贝一个新对象，修改时原对象不再受到任何影响
  - `JSON.parse(JSON.stringify(obj))`：性能最快
    - 具有循环引用的对象时，报错
    - 当值为函数、`undefined`或`Symbol`时，无法拷贝
  - 递归进行逐一赋值

## `new`运算符的执行过程

- 新生成一个对象
- 链接到原型：`obj.__proto__ = Con.prototype`
- 绑定`this`：`apply`
- 返回新对象（如果构造函数有自己的return时，则返回该值）

## `Promise` 对象

### 含义

异步编程的一种解决方案。简单来说，就是一个容器，里面保存着某个未来才会结束的事件（通常是一个异步操作）的结果。

从语法上来说，`Promise` 是一个对象，从它可以获取异步操作的消息。

`Promise` 对象有以下两个特点：

- 对象的状态不受外界影响。`Promise` 对象代表一个异步操作，有三种状态：`pending`进行中、`fulfilled`已完成和`rejected`已失败。只有异步操作的结果，可以决定当前是哪一种状态，任何其他操作都无法改变这个状态。
- 一旦状态改变，就不会再变，任何时候都可以得到折耳结果。`Promise`对象的状态改变，只有两种可能：从`pending`变为`fulfilled`和从`pending`变为`rejected`。

有了`Promise`对象，就可以将异步操作以同步操作的流程表达出来，避免了层层嵌套的回调函数。

### 基本用法

ES6规定，`Promise`对象是一个构造函数，用来生成`Promise`实例。

```javascript
const promise = new Promise((resolve, reject) => {
	// ... some code
    if (/* 异步操作成功 */) {
        resolve(value);
    } else {
        reject(error);
    }
})
```

### `Promise.prototype.then()`

`Promise` 实例具有 `then`方法，也就是说，`then`方法是定义在原型对象 `Promose.prototype`上的。它的作用是为`Promise`实例添加状态改变时的回调函数。

### `Promise.prototype.catch()`

`Promise.prototype.catch()`方法是`.then(null, rejection)`或`.then(undefined, rejection)`的别名，用于指定发生错误时的回调函数。

### `Promise.prototype.finally()`

`finally()`方法用于指定不管`Promise`对象最后的状态如何，都会执行的操作。

```javascript
promise
.then(result => {...})
.catch(error => {...})
.finally(() => {...})
```

### `Promise.all()`

```
const p = Promise.all([p1, p2, p3])
```

总结：全部子实例成功才成功，一个子实例失败就失败。

### `Promise.race()`

```javascript
const p = Promise.all([p1, p2, p3])
```

总结：`race`是赛跑机制，看最先子实例是成功还是失败。

### `Promise.allSettled()`

```javascript
const p = Promise.all([p1, p2, p3])
```

总结：所有子实例执行完成，无论成功或失败。

### `Promise.any()`

```javascript
const p = Promise.all([p1, p2, p3])
```

总结：有一个子实例成功就成功，全部子实例失败才失败。

## `JavaScript`执行机制

### 关于`JavaScript`

`JavaScript`是一门**单线程**语言，在最新的HTML5中提出了`web-Worker`，但`JavaScript`是单线程这一核心仍未改变。

### `JavaScript`事件循环

![image-20220621110631637](https://raw.githubusercontent.com/chnjames/cloudImg/main/blog/202206211106951.png)

- 同步任务和异步任务分别进入不同的执行“场所”。同步的进入主线程，异步的进入`Event Table`并注册函数。
- 当指定的事情完成时，`Event Table`会将这个函数移入`Event Queue`。
- 主线程内的任务执行完毕为空，会去`Event Queue`读取对应的函数，进入主线程执行。
- 上述过程会不断重复，也就是常说的`Event Loop`（事件循环）。

除了广义的同步任务和异步任务，我们对任务有更精细的定义：

- `macro-task(宏任务)`：包括整体代码`script`、`setTimeout`、`setInterval`
- `micro-task(微任务)`：`Promise`、`process.nextTick`、`Ajax`

不同类型的任务会进入对应的`Event Queue`，比如`setTimeout`和`setInterval`会进入相同的`Event Queue`。

**事件循环、宏任务、微任务的关系：**

![image-20220621165533617](https://raw.githubusercontent.com/chnjames/cloudImg/main/blog/202206211655498.png)

## `Array`

- `map`：遍历数组，返回回调返回值组成的新数组
- `forEach`：无法`break`，可以用`try / catch`中`throw new Error`来停止
- `filter`：过滤
- `some`：有一项返回`true`，则整体为`true`
- `every`：有一项返回`false`，则整体为`false`
- `join`：通过指定连接符生成字符串
- `push / pop`：末尾推入和弹出，改变原数组，`push`返回数组长度，`pop`返回原数组最后一项；
- `unshift / shift`：头部推入和弹出，改变原数组，`unshift`返回数组长度，`shift`返回原数组第一项；
- `sort(fn) / reverse`：排序与反转，改变原数组
- `concat`：连接数组，不影响原数组，浅拷贝
- `slice(start, end)`：返回截取后的新数组，不改变原数组
- `splice(start, number, value...)`：返回删除元素组成的数组，value为插入项，改变原数组
- `indexOf / lastIndexOf(value, fromIndex)`：查找数组项，返回对应的下标
- `reduce / reduceRight(fn(prev, cur), defaultPrev)`：两两执行，`prev`为上次化简函数的`return`值，`cur`为当前值
  - 当传入`defaultPrev`时，从第一项开始
  - 当未传入时，则为第二项

## `script`标签中`defer`和`async`的区别

- `script`：会阻碍`HTML`解析，只有下载好并执行完脚本才会继续解析`HTML`。

  ![script](https://raw.githubusercontent.com/chnjames/cloudImg/main/blog/202206251639337.svg)

- `script async`：解析`HTML`过程中进行脚本的异步下载，下载成功立马执行，有可能会阻断`HTML`的解析。

  ![script-async](https://raw.githubusercontent.com/chnjames/cloudImg/main/blog/202206251643291.svg)

- `script defer`：完全不会阻碍`HTML`的解析，解析完成之后再按照顺序执行脚本。

  ![script-defer](https://raw.githubusercontent.com/chnjames/cloudImg/main/blog/202206251644746.svg)

> `defer`和`async`特性仅适用于外部脚本。
>
> 如果`<script>`脚本没有`src`，则会忽略`defer`和`async`特性。

### 总结

`async`和`defer`共同点：加载脚本都不会阻塞页面的渲染。

区别：

|         | 顺序                                                         | `DOMContentLoaded`                                           |
| ------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| `async` | **加载优先顺序**。脚本在文档中的顺序不重要---先加载完成的先执行 | 不相关。可能在文档加载完成前加载并执行完毕。如果脚本很小或来自于缓存，同时文档足够长，就会发生这种情况。 |
| `defer` | **文档顺序**（它们在文档中的顺序）                           | 在文档加载和解析完成之后（如果需要，则会等待），即在`DOMContentLoaded`之前执行。 |

在实际开发中，`defer`用于需要整个`DOM`的脚本和脚本的相对执行顺序很重要的时候。`async`用于独立脚本，例如计数器或广告，这些脚本的相对执行顺序无关紧要。

> 如果你使用的是`defer`或`async`，那么用户将在脚本加载完成之前先看到页面。在这种情况下，某些图形组件可能尚未初始化完成。因此，请记得添加一个“正在加载”的提示，并禁用尚不可用的按钮。以让用户可以清楚地看到，他现在可以在页面上做什么，以及还有什么是正在准备中的。

## 从输入URL到页面展现的过程

- `DNS`解析：将域名解析成`IP`地址
- `TCP`连接：`TCP`三次握手
- 发送`HTTP`请求
- 服务器处理请求并返回`HTTP`报文
- 浏览器解析渲染页面
- 断开连接：`TCP`四次挥手

### `URL`

统一资源定位符，用于定位互联网资源，俗称网址。

`scheme://host.domain.port/path/filename?abc=123#456`

> `scheme`：定义因特网服务的类型。常见的协议有 `http`、`https`、`ftp`、`file`。其中最常见的类型是`http`，而`https`则是进行加密的网络传输。
>
> `host`：定义域主机（`http`的默认主机是`www`）
>
> `domain`：定义因特网域名，比如`baidu.com`
>
> `port`：定义主机上的端口号（`http`的默认端口号是80）
>
> `path`：定义服务器上的路径（若省略，则文档必须位于网站的根目录中）
>
> `filename`：定义文档/资源的名称
>
> `query`：即查询参数
>
> `fragment`：即`#`后的`hash`值，一般用来定位到某个位置

### `DNS`域名解析

