# Vue
## 谈谈你对MVVM的理解

`MVVM`是`Model-View-ViewModel`的缩写，它是一种基于前端开发的架构模式。由`Model`、`View`、`ViewModel`三部分组成。其核心的提供对`View`和`ViewModel`的双向数据绑定，这使得`ViewModel`的状态改变可以自动传递给`View`，即所谓的数据双向绑定。`ViewModel`是核心，负责连接`View`和`Model`，保证视图和数据一致性，这种轻量级的架构让前端开发更加高效、便捷。

- `Model`代表数据模型，也可以在`Model`中定义数据修改和业务逻辑；
- `View`代表 UI 组件，他负责将数据模型转化成 UI 展现出来；
- `ViewModel`是一个同步`View`和`Model`的对象。

`Vue.js`是`MVVM`架构的最佳实践，但并没有完全遵循`MVVM`，专注于`MVVM`中的`ViewModel`，不仅做到了数据双向绑定，而且还是较轻量级的JS库。

## Vue双向绑定原理

Vue数据双向绑定主要是指：数据变化更新视图，视图变化更新数据。

![image-20220622142138245](https://raw.githubusercontent.com/chnjames/cloudImg/main/blog/202206221421927.png)

`Observer`：数据监听器，能够对数据对象的所有属性进行监听，如有变动可拿到最新值并通知订阅者，内部采用`Object.defineProperty`的`getter`和`setter`来实现。

`Compile`：指令解析器，他的作用对每个元素节点的指令进行扫描和解析，根据指令模板替换数据，以及绑定相应的更新函数。

`Watcher`：订阅者，作为连接`Observer`和`Compile`的桥梁，能够订阅并收到每个属性变动的通知，执行指令绑定的相应回调函数。

`Dep`：消息订阅器，内部维护了一个数组，用来收集订阅者（`Watcher`），数据变动触发`notify`函数，再调用订阅者的`update`方法。

从图中可以看出，**当执行 new Vue() 时，Vue 就进入了初始化阶段，一方面 Vue 会遍历 data 选项中的属性，并用 Object.defineProperty 将它们转为 getter / setter，实现数据变化监听功能；另一方面，Vue 的指令编译器 Compile 对元素节点的指令进行扫描和解析，初始化视图，并订阅 Watcher 来更新视图，此时 Watcher 会将自己添加到消息订阅器中（Dep），初始化完毕。 **

**当数据发生变化时，Observer 中的 setter 方法被触发，setter 会立即调用 Dep.notify()，Dep开始遍历所有的订阅者，并调用订阅者的 update 方法，订阅者收到通知后对视图进行相应的更新。**

## `package.json`与`package-lock.json`的关系

> `pageage.json`用来描述项目及项目所依赖的模块信息。

### 语义版本控制

版本号：

组成：`major.minor.patch`，即主版本号.次版本号.修补版本号。

### 安装依赖包的版本

安装依赖包的时候，版本号前面都会带有`^`或`~`的符号：

`~`会匹配最近的小版本依赖包，比如`~1.2.3`会匹配所有`1.2.x`版本，但是不包括`1.3.0`

`^`会匹配最新的大版本依赖包，比如`^1.2.3`会匹配所有`1.x.x`的包，包括`1.3.0`，但是不包括`2.0.0`

`*`安装最新版本的依赖包，比如`*1.2.3`会匹配`x.x.x`