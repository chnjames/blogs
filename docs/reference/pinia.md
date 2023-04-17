---
hideComments: false
---
# `Pinia`的使用

## 介绍

`Pinia`是一个全新的Vue状态管理库，是`Vuex`的替代品。

- `Vue2`和`Vue3`都能支持
- 抛弃传统的`Mutation`，只有`state`、`getter`和`action`，简化状态管理库
- 不需要嵌套模块，符合`Vue3`的`Composition API`，让代码扁平化；因为在`Pinia`中每个`store`都是独立的，互相不影响
- `TypeScript`支持
- 代码简洁，很好的代码自动分割
- `Pinia`中的`action`支持同步和异步
- `Pinia`支持插件来扩展自身功能
- 支持服务端渲染

## 基本使用

**初始化项目**：`npm create vite@latest`

**安装`Pinia`**：`npm i pinia`

### 挂载`Pinia`

```javascript
// src/main.js
import { createPinia } from 'pinia'

const pinia = createPinia()
app.use(pinia)
```



## `Store`

### 创建`store`

一个`Store`是一个实体，它持有未绑定到您的组件树的状态和业务逻辑。它托管全局状态。`Store`是使用`defineStore()`定义的，并且它需要一个唯一名称，作为第一个参数传递：

- `name`：也称为`id`，必传项，该`store`的唯一`id`
- `options`：一个对象，`store`的配置项，比如配置`store`内的数据，修改数据的方法等

```javascript
import { defineStore } from 'pinia'

export const useMainStore = defineStore('main', {
    state: () => {
        return {
            msg: 'Hello World!',
            count: 1
        }
    },
    getters: {},
    actions: {}
})
```



### 使用`store`

```vue
<script setup>
    import { useMainStore } from '../store/index'
    const store = useMainStore()
</script>
<template>
	<h2>{{ store.msg }}</h2>
</template>
```



### 解构`store`

`store`是一个用`reactive`包裹的对象，这意味着不需要在`getter`之后写`.value`，但是，就像`setup`中的`props`一样，不能对其进行解构。为了从`store`中提取属性同时保持其响应式，需要使用`storeToRefs()`。它将为任何响应式属性创建`refs`。

```vue
<script setup>
	import { useMainStore } from '../store/index'
    import { storeToRefs } from 'pinia'
    const store = useMainStore()
    const { count } = storeToRefs(store)
</script>
<template>
	<h2>{{ store.msg }}</h2>
	<h3>Count is: {{ count }}</h3>
</template>
```



### 重置状态

可以通过调用`store`上的`$reset()`方法将状态重置到其初始值。

```javascript
const store = useMainStore()
store.$reset()
```



### `Pinia`修改数据状态

#### 简单数据类型

简单数据直接通过在方法中操作`store.xxx`来修改

```javascript
const store = useMainStore()
store.count++
```



#### 多条数据修改

在进行多条数据修改的时候，推荐使用`$patch`方法，它可以接受两个类型的参数，函数 和 对象

- `$patch` + 对象
- `$patch` + 函数：通过函数方式去使用的时候，函数接受一个`state`的参数，`state`就是`store`仓库中的`state`

```vue
<script setup>
	import { useMainStore } from '../store/index'
    const store = useMainStore()
    
    // $patch + 对象
    const onObjClick = () => {
        store.$patch({
            count: store.count + 2,
            msg: '对象修改之后的内容'
    	})
    }
    // $patch + 函数
    const onFunClick = () => {
        store.$patch(state => {
            state.count += 2
            state.msg = '函数修改之后的内容'
        })
    }
</script>
<template>
	<h2>store.count：{{ store.count }}</h2>
	<h2>store.msg：{{ store.msg }}</h2>
	<button @click="onObjClick">修改状态（$patch + 对象）</button>
	<button @click="onFunClick">修改状态（$patch + 函数）</button>
</template>
```



### 替换`state`

可以通过将其`$state`属性设置为新对象来替换`store`的整个状态，这种场景比较少见。

```javascript
store.$state = {
    count: 0,
    msg: '替换之后的内容'
}
```



## `Getters`

`Getter`完全等同于`Store`状态的计算属性。接收`state`作为第一个参数的箭头函数使用。`getter`中的值有缓存特性，如果值没有改变，多次使用也只会调用一次。大多数情况下，`getter`只会依赖`state`，但是，他们也可能需要使用其他`getter`，所以我们可以在定义常规函数是通过`this`访问到整个`store`的实例，但是需要定义返回类型（在`TypeScript`中）。这是由于`TypeScript`中的一个已知限制，并且不会影响使用箭头函数定义的`getter`，也不会影响不使用`this`的`getter`。

```typescript
export const useMainStore = defineStore('main', {
    state: () => {
        count: 0
    },
    getters: {
        // 自动判断返回类型
        doubleCount(state) {
            console.log('getter被调用')
            return `state.count的值：${state.count * 2}`
        },
        // 返回类型必须明确设置
        doublePlusOne(): number {
            return this.count * 2 + 1
        }
    }
})
```



#### `getter`传递参数

`Getters`只是`computed`的幕后场景，因此无法向它们传递任何参数。但是可以从`getter`返回一个函数用于接收任何参数。

```javascript
// src/store/index.js
export const useMainStore = defineStore('main', {
    getters: {
        getUserById: state => {
            return userId => {
                state.users.find(user => user.id === userId)
            }
        }
    }
})
```



在组件中使用

```vue
<script setup>
	import {useMainStore} from '../store/index'
    cosnt store = userMainStore()
</script>
<template>
	<h2>User 2: {{ store.getUserById(1) }}</h2>
</template>
```



再执行此操作时，`getter`不再缓存，它们只是调用函数。但是可以在`getter`本身内部缓存一些结果，这并不常见，但应该性能会提高。

```javascript
// src/store/index.js
export const useMainStore = defineStore('main', {
    getters: {
        getActiveUserById: state => {
            const activeUsers = state.users.filter((user) => user.active)
      		return userId => activeUsers.find((user) => user.id === userId)
        }
    }
})
```



#### 访问其他`store`的`getter`

在`Pinia`中，可以在一个`store`中`import`另外一个`store`，然后通过调用引入`store`方法的形式，获取引入`store`的状态。

```javascript
// src/store/other.js
export const useOtherStore = defineStore('other', {
    state: () => {
        return {
            otherList: ['other1', 'other2', 'other3']
        }
    }
})
```



在原`store`中引入`useOtherStore`

```javascript
import {defineStore} from 'pinia'
import {useOtherStore} from './other'

export const useMainStore = defineStore('main', {
    state: () => {
        return {
            count: 0,
    		msg: 'hello'
        }
    },
    getters: {
        getOtherStoreList() {
            const otherStore = useOtherStore()
            return otherStore.otherList
        }
    }
})
```



## `Actions`

`actions`相当于组件中`methods`，他们可以使用`defineStore()`中的`actions`属性定义，且非常适合定义业务逻辑。

```javascript
export const useMainStore = defineStore('main', {
    state: () => {
        return {
            counter: 0,
            userData: null
        }
    },
    actions: {
        // 同步操作
        increment() {
            this.counter++
        },
        randomizeCounter() {
            this.counter = Math.round(100 * Math.random())
        },
        // 异步操作
        async registerUser(login, password) {
          try {
            this.userData = await api.post({ login, password })
            showTooltip(`Welcome back ${this.userData.name}!`)
          } catch (error) {
            showTooltip(error)
            // 让表单组件显示错误
            return error
          }
        }
    }
})
```



#### 访问其他`store`操作

```javascript
import { useAuthStore } from './auth-store'

export const useSettingsStore = defineStore('settings', {
  state: () => ({
    // ...
  }),
  actions: {
    async fetchUserPreferences(preferences) {
      const auth = useAuthStore()
      if (auth.isAuthenticated) {
        this.preferences = await fetchPreferences()
      } else {
        throw new Error('User must be authenticated')
      }
    }
  }
})
```

