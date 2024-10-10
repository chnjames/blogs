---
title: Vue 3 数组变更详解：哪些操作会修改原数组？| 笔记
tags:
 - 前端开发
 - Vue
categories:
 - Vue
date: 2024-10-10
hideComments: false
---
`Vue 3` 使用 `Proxy` 来侦测响应式对象的变化，数组作为常用数据类型，自然也被 `Vue 3` 自动侦测和管理。在处理数组时，了解哪些操作会修改原数组，哪些操作不会修改原数组，对高效编写 `Vue` 应用程序至关重要。

本文将详细介绍 `Vue 3` 中的常见数组操作，并按照是否会修改原数组进行分类说明。

------

### 一、会修改原数组的方法

这些方法会直接改变原数组的内容，因此 `Vue 3` 的响应式系统能检测到这些变更，并自动触发相关的视图更新。

#### 1. `push()`

- **功能**：向数组末尾添加一个或多个元素。

- **返回值**：新数组的长度。

- 示例：

  ```javascript
  const arr = reactive([1, 2, 3]);
  arr.push(4); // 数组变为 [1, 2, 3, 4]
  ```

#### 2. `pop()`

- **功能**：移除数组末尾的一个元素。

- **返回值**：被移除的元素。

- 示例：

  ```javascript
  const arr = reactive([1, 2, 3]);
  arr.pop(); // 数组变为 [1, 2]
  ```

#### 3. `shift()`

- **功能**：移除数组开头的一个元素。

- **返回值**：被移除的元素。

- 示例：

  ```javascript
  const arr = reactive([1, 2, 3]);
  arr.shift(); // 数组变为 [2, 3]
  ```

#### 4. `unshift()`

- **功能**：在数组开头添加一个或多个元素。

- **返回值**：新数组的长度。

- 示例：

  ```javascript
  const arr = reactive([1, 2, 3]);
  arr.unshift(0); // 数组变为 [0, 1, 2, 3]
  ```

#### 5. `splice()`

- **功能**：在数组中添加、删除或替换元素。

- **返回值**：被删除的元素（如果有）。

- 示例：

  ```javascript
  const arr = reactive([1, 2, 3, 4]);
  arr.splice(1, 2); // 删除索引 1 开始的两个元素，数组变为 [1, 4]
  ```

#### 6. `sort()`

- **功能**：对数组元素进行原地排序。

- **返回值**：排序后的数组。

- 示例：

  ```javascript
  const arr = reactive([3, 1, 4, 2]);
  arr.sort(); // 数组排序后为 [1, 2, 3, 4]
  ```

#### 7. `reverse()`

- **功能**：颠倒数组元素的顺序。

- **返回值**：颠倒后的数组。

- 示例：

  ```javascript
  const arr = reactive([1, 2, 3]);
  arr.reverse(); // 数组变为 [3, 2, 1]
  ```

------

### 二、不会修改原数组的方法

这些方法不会直接修改原数组，而是返回一个新的数组或值。因此，`Vue 3` 响应式系统不会通过这些方法本身侦测到数组的变化，但如果将它们的返回值重新赋值给响应式对象，`Vue` 仍然能侦测到变更并更新视图。

#### 1. `concat()`

- **功能**：合并两个或多个数组，返回一个新数组。

- **返回值**：合并后的新数组。

- 示例：

  ```javascript
  const arr = reactive([1, 2]);
  const newArr = arr.concat([3, 4]); // 新数组为 [1, 2, 3, 4]
  ```

#### 2. `slice()`

- **功能**：返回数组中指定范围的浅拷贝片段，不修改原数组。

- **返回值**：新数组。

- 示例：

  ```javascript
  const arr = reactive([1, 2, 3, 4]);
  const slicedArr = arr.slice(1, 3); // 新数组为 [2, 3]
  ```

#### 3. `map()`

- **功能**：对数组中的每个元素执行回调函数，返回一个新数组。

- **返回值**：经过回调函数处理后的新数组。

- 示例：

  ```javascript
  const arr = reactive([1, 2, 3]);
  const mappedArr = arr.map(x => x * 2); // 新数组为 [2, 4, 6]
  ```

#### 4. `filter()`

- **功能**：返回满足条件的元素组成的新数组。

- **返回值**：筛选后的新数组。

- 示例：

  ```javascript
  const arr = reactive([1, 2, 3, 4]);
  const filteredArr = arr.filter(x => x > 2); // 新数组为 [3, 4]
  ```

#### 5. `reduce()` 和 `reduceRight()`

- **功能**：对数组中的每个元素执行回调函数，最终返回一个累积结果。

- **返回值**：累积结果。

- 示例：

  ```javascript
  const arr = reactive([1, 2, 3]);
  const sum = arr.reduce((acc, x) => acc + x, 0); // 返回累积值 6
  ```

#### 6. `flat()` 和 `flatMap()`

- **功能**：返回一个扁平化后的新数组。

- **返回值**：新数组。

- 示例：

  ```javascript
  const arr = reactive([1, [2, 3], [4]]);
  const flattenedArr = arr.flat(); // 新数组为 [1, 2, 3, 4]
  ```

#### 7. `find()` 和 `findIndex()`

- **功能**：`find()` 返回第一个满足条件的元素，`findIndex()` 返回满足条件元素的索引。

- **返回值**：`find()` 返回元素，`findIndex()` 返回索引。

- 示例：

  ```javascript
  const arr = reactive([1, 2, 3, 4]);
  const foundItem = arr.find(x => x > 2); // 返回 3
  ```

------

### 三、Vue 3 数组侦测的注意事项

1. **自动侦测修改**：对于会修改原数组的方法（如 `push()`、`splice()` 等），`Vue 3` 能够自动侦测到这些操作并触发视图更新。

2. **不会修改原数组的操作**：虽然这些方法不会修改原数组，但如果你将它们的返回值重新赋值给响应式对象，`Vue` 依然会检测到变化并更新视图。例如：

   ```javascript
   const arr = reactive([1, 2, 3]);
   arr = arr.concat([4, 5]); // Vue 会检测到重新赋值并触发更新
   ```

3. **对象属性变化侦测**：如果数组中包含对象，`Vue 3` 也能侦测到对象属性的变化。例如：

   ```javascript
   const arr = reactive([{ name: 'Alice' }, { name: 'Bob' }]);
   arr[0].name = 'Eve'; // Vue 会侦测到对象属性的变化
   ```

------

### 四、总结

- **会修改原数组的方法**：`push()`，`pop()`，`shift()`，`unshift()`，`splice()`，`sort()`，`reverse()`。
- **不会修改原数组的方法**：`concat()`，`slice()`，`map()`，`filter()`，`reduce()`，`flat()`，`find()` 等。

通过区分这些数组操作，你可以更好地控制 `Vue 3` 的响应式系统行为，确保数据变更时视图能够正确更新。如果需要保留原数组不变，可以选择不会修改原数组的方法，并将返回的新数组赋值回响应式对象。