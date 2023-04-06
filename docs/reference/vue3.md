# Vue3 新特性及使用经验总结

## Composition API

### setup

`setup`函数是`Composition API（组合API）`的入口。

`setup`执行时机是在`beforeCreate`之前执行。

在`setup`函数中定义的变量和方法最后都是需要`return`出去的，不然无法在模板中使用。

在`setup`里面是不会用到`this`的。

`setup`中接收的`props`是响应式的，当传入新的`props`时，会及时被更新。由于是响应式的，所以`不可以使用ES6解构`，解构会消除它的响应式的。`setup`接收的`context`中提供了最常用的四个属性：`attrs`、`slot`和`emit`，分别对应`Vue@2.x`中的`$attr`属性、`slot`插槽、`$emit`发射事件和`expose`暴露标记。并且这四个属性都是自动同步最新的值，所以我们每次使用拿到的都是最新值。

> `expose`：在传统的写法中，可以在父组件中，通过`ref`实例的方式去访问子组件的内容，但在`<script setup>`中，`setup`相当于一个闭包，除了内部的`template`模板，都无法访问内部的数据和方法。如果需要对外暴露`setup`中的数据和方法，需要使用此属性。

```vue
<template>
   <h1>App</h1>
   <h2>{{ age }}</h2>
</template>
<script>
import { defineComponent, ref } from "vue"
export default defineComponent({
  name: 'App',
  props: {
    name: String
  },
  setup(props, context) {
    let age = ref(18)
    function say() {
      console.log(`我${age.value}`)
    }
    //返回一个对象
    return {
      age,
      say
    }
  }
})
</script>
```



如果上面这种`return`的写法不喜欢的话，可以用新的语法糖`<script setup>`，`<script setup>`就相当于在编译运行时把代码放到`setup`函数中运行，然后把导出的变量定义到上下文中，并包含在返回的对象中。

在`<script setup>`中，引入的组件可以直接使用，无需再通过`components`进行注册，并且无法指定当前组件的名字，它会自动以文件名为主，也就无需再写`name`属性。

#### 使用`props`

通过`defineProps`指定当前`props`类型，获得上下文的`props`对象。

#### 使用`emits`

使用`defineEmits`定义当前组件含有的事件，并通过返回的上下文去执行`emit`。

#### 使用`slots`和`attrs`

在`<script setup>`中使用`slots`和`attrs`，分别使用`useSlots`和`useAttrs`帮助函数。

#### 使用`expose`

使用`defineExpose`暴露需要对外的数据和方法。

```vue
<template>
   <Child />
</template>
<script setup>
import Child from './Child.vue'
import { ref, defineEmits, defineExpose, defineProps, useSlots, useAttrs } from 'vue'
    
let age = ref(18)
const props = defineProps({
  name: String
})
const emits = defineEmits(['add', 'delete')
const slots = useSlots()
const attrs = useAttrs()
defineExpose({
    age,
    say
})
const say = () => {
  console.log(`我${age.value}`)
}
</script>
```

> 从`Vue@2.6.x`开始，Vue 为具名和范围插槽引入了一个全新的语法，即`v-slot` 指令。目的就是想统一 `slot` 和 `scope-slot` 语法，使代码更加规范和清晰。在 `vue@3.x`中，只能使用`v-slot`。

### `reactive`、`ref`、`toRefs`和`toRef`

在`vue@3.x`使用`reactive`和`ref`来进行响应式数据定义。

#### `ref`

使用`ref`定义的变量变成了对象，并且还是`RefImpl`的实例对象。所以在修改的时候要用`.value`去修改，因为内部是按照`get`和`set`去修改页面的。但是在`template`中就不用自己手动添加`.value`，因为`vue@3.x`在检测到是`ref`对象，就自动添加了`.value`。如果用`ref`定义对象，则不再是`RefImpl`实例对象，变成了`Proxy`实例对象，因为在`vue@3.x`底层，如果是对象，就变成`Proxy`实例对象，对于基本数据类型就按照`Object.defineProperty`里面的`get`和`set`进行数据劫持然后进行响应式，但是如果是对象类型的话，是用`Proxy`，就相当于，`ref`中是对象，自动会调用`reactive`。

#### `reactive`

`reactive`只能定义对象类型的响应式数据，把`Object`转换为`Proxy`，进行一个深层次的响应式，也可以进行数组的响应式。

#### `ref`与`reactive`的区别

- `ref`用来定义`基本数据类型`，也可以定义对象或数组，知识内部自动调用了`reactive`来转换。
- `ref`通过`Object.defineProperty()`的`get`与`set`来实现响应式（数据劫持）。
- `ref`定义的数据：操作数据需要`.value`，读取数据时模板中直接读取不需要`.value`。
- `reactive`用来定义：`对象或数组类型数据`。
- `reactive`通过使用`Proxy`来实现响应式（数据代理），并通过`Reflect`操作源代码内部的数据。
- `reactive`定义的数据：操作和读取数据均不需要`.value`。

#### `toRefs`

`toRefs`用于将一个`reactive`对象转化为属性全部为`ref`对象的普通对象。

#### `toRef`

`ToRef`用于将一个`reactive`对象里面的单个属性转化为`ref`对象的普通对象。而且它既保留了响应式，也保留了引用，也就是说从`reactive`复制过来的属性进行修改后，除了视图会更新，原有`reactive`里面对应的值也会跟着更新。

> `template`访问`toRefs`的值，需要带上`.value`，如果不带，就会出现双引号。
>
> `template`访问`toRef`的值，不需要带上`.value`。

```vue
<template>
  <p>第 {{ year }} 年</p>
  <p>姓名： {{ nickname }}</p>
  <p>姓名修改：{{ refsUser.nickname.value }}</p>
  <p>年龄： {{ age }}</p>
  <p>姓名修改：{{toRefNickName}}</p>
  <div>----------------------------</div>
  <p>人名：{{ personName }}</p>
  <p>人性别：{{ personGender }}</p>
</template>

<script setup>
import { reactive, ref, toRefs, toRef } from "vue"
const year = ref(0)
/**
 * reactive、ref定义和修改对象的区别
 */
// 使用reactive定义对象
const user = reactive({
  nickname: "xiaofan",
  age: 26,
  gender: "女"
})
const {nickname, age} = toRefs(user)
const refsUser = toRefs(user)
const toRefNickName = toRef(user, 'nickname')
setTimeout(() => {
  user.gender = "男"
  refsUser.nickname.value = '小明'
  // toRefNickName.value = 'Janna'
}, 1000)
// 使用ref定义对象
const person = ref({
  personName: "James",
  personAge: 27,
  personGender: "男"
})
const {personName, personGender} = toRefs(person.value)
setTimeout(() => {
  person.value.personGender = "女"
}, 1000)

</script>
```



### `watch`、`watchEffect`和`computed`

#### `watch`

`watch`函数用来侦听特定的数据源，并执行回调函数。默认情况下是惰性的，也就是说仅在侦听的源数据变更时才执行回调。

> `watch(source, callback, [options])`
>
> 参数说明：
>
> - `source`：可以支持`String`、`Object`、`Function`和`Array`，用于指定要侦听的响应式变量。
> - `callback`：执行的回调函数。
> - `options`：支持`deep`、`immediate`和`flush`选项。

```vue
<template>
  <p>姓名： {{ nickname }}</p>
  <p>世纪：{{ year }}</p>
</template>

<script setup>
import { reactive, toRefs, watch, ref } from "vue"
const year = ref(1000)
const user = reactive({
  nickname: "xiaofan",
  age: 26,
  gender: "女"
})
const { nickname } = toRefs(user)
setTimeout(() => {
  nickname.value = "James"
  year.value = 2022
}, 1000)
// 侦听reactive定义的数据
watch(nickname, (newVal, oldVal) => {
  console.log('newVal:', newVal, 'oldVal', oldVal)
})
watch(() => user.nickname, (newVal, oldVal) => {
  console.log('newVal:', newVal, 'oldVal', oldVal)
})
// 侦听ref定义的数据
watch(year, (newVal, oldVal) => {
  console.log('newVal:', newVal, 'oldVal', oldVal)
})
// 侦听多个数据
watch([year, () => user.nickname], ([yearNewVal, nickNewVal], [yearOldVal, nickOldVal]) => {
  console.log('yearNewVal:', yearNewVal, 'nickNewVal', nickNewVal)
  console.log('yearOldVal:', yearOldVal, 'nickOldVal', nickOldVal)
})
// 侦听复杂的嵌套对象
/**
 * 第三个参数：
 *  deep: true，表示深度侦听
 *  immediate: true，表示立即触发一次侦听
 */
const room = reactive({
  id: 100,
  attrs: {
    size: "140平方米",
    type: "三室两厅"
  },
})
setTimeout(() => {
  room.attrs.size = "200平方米"
}, 2000)
watch(() => room.attrs, (newVal, oldVal) => {
  console.log('侦听复杂的嵌套对象', 'newVal:', newVal, 'oldVal', oldVal)
}, {
  deep: true
})

</script>
```



> 在监听`reactive`定义的响应式数据时，`oldVal`无法正确获取，并且强制开启深度监听（`deep: true`），并且无法关闭。

##### `stop`停止监听

在组件中创建的`watch`监听，会在组件被销毁时自动停止。如果在组件销毁之前想要停止某个监听，可以调用`watch()`函数的返回值。

```vue
<template>
  <p>姓名： {{ nickname }}</p>
</template>

<script setup>
import { reactive, toRefs, watch } from "vue"
const user = reactive({
  nickname: "xiaofan",
  age: 26,
  gender: "女"
})
const { nickname } = toRefs(user)
setInterval(() => {
  nickname.value += "James"
}, 2000)
const stopWatchNick = watch(nickname, (newVal, oldVal) => {
  console.log('newVal:', newVal, 'oldVal', oldVal)
})
// stop停止监听
setTimeout(() => {
  stopWatchNick()
}, 7000)

</script>
```



#### `watchEffect`

`watchEffect`是`vue@3.x`的新函数，它会自动收集依赖，只要指定一个回调函数。在组件初始化时，会先执行一次来收集依赖，然后当收集到的依赖中数据发生变化时，就会再次执行回调函数。

- `watchEffect`不需要手动传入依赖
- `watchEffect`会先执行一次用来自动收集依赖（自动默认开启：`immediate: true`）
- `watchEffect`无法获取到变化前的值，只能获取到变化后的值

```vue
<template>
  <h3>{{name}}</h3>
  <h3>{{year}}</h3>
</template>
<script setup>
import { watchEffect, reactive, toRefs, ref } from 'vue';
const year = ref(2022)
const obj = reactive({
  name: 'James',
  age: 18
})
setInterval(() => {
  obj.name = 'James' + Math.random();
  year.value = 2020 + Math.random() * 10;
}, 1000)
watchEffect(() => {
  console.log(obj.name);
})
const {name} = toRefs(obj)
</script>
```



#### `computed`

```vue
<template>
 <input type="text" placeholder="请输入姓" v-model="user.familyName" />
 <input type="text" placeholder="请输入名" v-model="user.lastName" />
 <h3>姓名：{{fullName}}</h3>
</template>
<script setup>
import { reactive, computed } from 'vue';
const user = reactive({
  familyName: '',
  lastName: ''
})
const fullName = computed(() => {
  return `${user.familyName} ${user.lastName}`
})
</script>
```



## 自定义`Hooks`

`vue@3.x`中的自定义`Hooks`函数相当于`vue@2.x`中的`mixin`，不同的是`hooks`是函数；它可以帮助我们提高代码的复用性，让我们能在不同的组件中都利用`hooks`函数。一般约定自定义`Hooks`以`use`作为前缀，和普通函数加以区分。

```javascript
import { computed, ref } from "vue"
const useCount = (initValue = 1) => {
    const count = ref(initValue)
    const multiple = computed(() => count.value * 2)
    const increase = () => count.value++
    const decrease = () => count.value--
    return {
        count,
        multiple,
        increase,
        decrease
    }
}
export default useCount
```



```vue
<template>
  <h3>{{count}}</h3>
  <h3>{{multiple}}</h3>
  <button @click="increase">加</button>
  <button @click="decrease">减</button>
</template>
<script setup>
import useCount from '@/hooks/useCount';
const { count, multiple, increase, decrease } = useCount(100);
</script>
```



## `vue@2.x`与`vue@3.x`响应式对比

`vue@3.x`：`Proxy` --- `vue@2.x`：`Object.defineProperty`

- `Object.defineProperty`只能劫持对象的属性，而`Proxy`是直接代理对象。

  由于`Object.defineProperty`只能劫持对象属性，需要遍历对象的每一个属性，如果属性值也是对象，就需要递归进行深度遍历。但是`Proxy`直接代理对象，不需要遍历操作。

- `Object.defineProperty`对新增属性需要手动进行`Observe`。

  因为`Object.defineProperty`劫持的是对象的属性，所以新增属性时，需要重新遍历对象，对其新增属性再次使用`Object.defineProperty`进行劫持。也就是`vue@2.x`中给数组和对象新增属性时，需要使用`$set`才能保证新增的属性也是响应式的，`$set`内部也是通过调用`Object.defineProperty`去处理的。

## 生命周期钩子

![vue3生命周期](https://raw.githubusercontent.com/chnjames/cloudImg/main/blog/202206171610524.svg)

![vue2与vue3生命周期对比](https://raw.githubusercontent.com/chnjames/cloudImg/main/blog/202206171613257.png)

在某个组件被`<keep-alive>`标签包裹时，第一次显示该组件，会触发`setup()`和`onActivated`。在第二次显示该组件时，由于从缓存中调取的，所以不会再次触发`setup()`，只会触发`onActivated`。

在切换为其他组件时由于`<keep-alive>`包裹缓存，所以不会触发`onBeforeUnmount`和`onUnmounted`而触发了`onDeactivated`。

`onRenderTracked`它会跟踪页面上所有响应式变量和方法的状态。只要页面由`update`的情况，它就会跟踪，然后生成一个`event`对象，我们通过`event`对象来查找程序的问题所在。

`inRenderTriggered`他不会跟踪每一个值，而是给你变量值的信息，并且信值和旧值都会给你明确的展示出来。生成的`event`对象其中包含`key`（哪边变量发生了变化）、`newValue`（更新后变量的值）、`oldValue`（更新前变量的值）和`target`（目前页面中的响应变量和函数）。

`onErrorCaptured`它会捕获子孙组件的异常报错，可以在这个函数中自定义处理错误信息。如果`onErrorCaptured`钩子自身抛出了一个错误，那么这个新的错误和原本捕获到的错误都会发送给全局的`config.errorHandle`。

## Fragment（碎片、片段）

作为`Vue@3.x`的新特性之一，它的意思就相当于创建页面时，自动创建个虚拟根标签`VNode`，所以可以不要根标签，也就是说允许一个`Vue`组件可以有多个根节点。好处就是**减少标签层级，减小内存占用**。

```vue
<!-- Layout.vue -->
<template>
  <header>...</header>
  <main v-bind="$attrs">...</main>
  <footer>...</footer>
</template>
```



## Teleport

**即希望继续在组件内部使用，又希望渲染的DOM结构不嵌套在组件的DOM中。**

可以定义`teleport`在任意标签里进行定位等（常见操作为模态框），除了`body`，还可以写`css`选择器（`id`，`class`）。

`to`属性与需要绑定的选择器保持一致。

```vue
<template>
  <teleport to="#app">
    <div class="dialog">
      直接定位在顶级#app选择器上
    </div>
  </teleport>
</template>
<script setup>
import { ref } from 'vue';
const title = ref('标题');
</script>
```

## Suspense

`Suspense`是一个特殊组件，它会有两个`template slot`，刚开始会渲染`feedback`内容，知道`达到某个条件以后`，才会渲染正式的内容，也就是`default`的内容。如果使用`Suspense`，要返回一个`promise`而不是一个对象。
