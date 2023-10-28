---
title: 🛠️ JavaScript数组操作指南：20个精通必备技巧🚀
sticky: 1
tags:
 - 前端开发
 - JavaScript
categories:
 - 前端开发
 - JavaScript
date: 2023-10-28
hideComments: false
---

`splice`、 `slice`、 `pop` 和 `shift`。数组的排序方法是稳定且非原地算法的吗？要记住所有 JavaScript 数组方法以及它们之间的区别并不容易。它们的名称相似，就好像直接从同义词词典中提取一样。

这个数组速查表列出了 JavaScript 中通常需要的所有数组方法，以及不需要的方法都不包含在内。就是这么简单！为了让您更容易理解，我基于常见用例制作了这个速查表。

在我们开始之前，关于不可变性（[`Immutability`](https://developer.mozilla.org/zh-CN/docs/Glossary/Immutable)）有一点需要注意。本文中使用的所有函数都是不可变的，简而言之，这意味着在使用这些方法时，您永远不会改变原始数组。不可变性在现代 JavaScript 中非常重要。

> [`Stack Overflow`](https://stackoverflow.com/questions/34385243/why-is-immutability-so-important-or-needed-in-javascript) 中对 `Immutability` 的理解。

尽管这些方法在各自的操作中都是不可变的，但您仍然不能完全确保不可变性。如果在不可变数组中包含可变数据类型（数组、对象、函数），您仍然可以修改数组内部的可变数据。我们将这种数组称为浅不可变数组，与深不可变数组相对，后者仅包含不可变项。

1. **在数组的开头添加元素**

   要将一个项目添加到数组的开头，使用数组扩展（array spreading）。不要使用 `unshift` 方法，因为它会修改原始数组。

   ```javascript
   const arr = [1, 2, 3];
   const result = [0, ...arr];
   console.log(result);
   // [0, 1, 2, 3]
   ```

   

2. **在数组的末尾添加元素**

   要在数组的末尾追加一个项目，使用数组展开（array spreading）。不要使用 `push` 方法，因为它会修改原始数组。

   ```javascript
   const arr = [1, 2, 3];
   const result = [...arr, 4];
   console.log(result);
   // [1, 2, 3, 4]
   ```

   

3. **从数组的开头移除一个元素**

   要移除数组中的第一个项目，使用 `slice` 方法。不要使用 `shift` 或 `splice` 方法，因为它们会修改原始数组。

   ```javascript
   const arr = [1, 2, 3];
   // 保留索引1及其之后的所有元素
   const result = arr.slice(1);
   console.log(result);
   // [2, 3]
   ```

   

4. **从数组的末尾移除一个元素**

   要移除数组中的最后一个项目，使用 `slice` 方法。不要使用 `pop` 或 `splice` 方法，因为它们会修改原始数组。

   ```javascript
   const arr = [1, 2, 3];
   // 保留索引0及其之后的所有元素，除了数组中的一个元素。
   const result = arr.slice(0, -1);
   console.log(result);
   // [1, 2]
   ```

   

5. **在数组中的特定索引位置插入元素**

   要在数组的特定索引位置添加一个元素，可以使用 `toSpliced` 方法。不要使用 `splice` 方法，因为它会修改原始数组。

   ```javascript
   const arr = [1, 2, 3];
   // 保留索引1，删除0个元素，在索引1插入元素 "one point five"，并保留其后的所有元素。
   const result = arr.toSpliced(1, 0, "one point five");
   console.log(result);
   // [1, "one point five", 2, 3]
   ```

   

6. **在数组中替换特定索引位置的元素**

   要在数组中替换特定索引位置的元素，可以使用 `toSpliced` 或 `with` 方法。不要使用 `splice` 方法，因为它会修改原始数组。

   ```javascript
   const arr = [1, 2, 3];
   
   // 使用 toSpliced。
   // 保留索引1，删除1个元素，在索引1插入元素 "two"，并保留其后的所有元素。
   const result1 = arr.toSpliced(1, 1, "two");
   console.log(result1);
   // [1, "two", 3]
   
   // 使用 with。
   // 复制旧数组 arr，将索引1替换为 "two"。
   const result2 = arr.with(1, "two");
   console.log(result2);
   // [1, "two", 3]
   ```

   

7. **从数组中删除特定索引位置的元素**

   要从数组中移除一个项，可以使用 `toSpliced` 方法。不要使用 `splice` 方法，因为它会修改原始数组。

   ```javascript
   const arr = [1, 2, 3];
   
   // 在索引1处删除1个元素。
   const result = arr.toSpliced(1, 1);
   console.log(result);
   // [1, 3]
   ```

   

8. **从数组中根据值移除一个元素**

   要从数组中删除特定的值，可以使用 `filter` 方法。不要将 `indexOf` 与 `splice` 方法一起使用，因为它会修改原始数组。

   ```javascript
   const arr = [1, 2, 3];
   const result = arr.filter((element) => element !== 2);
   console.log(result);
   // [1, 3]
   ```

   

9. **从数组中根据属性移除对象**

   要从数组中删除具有特定属性的对象，可以使用 `filter` 方法。不要将 `findIndex` 与 `splice` 方法一起使用，因为它会修改原始数组。

   ```javascript
   const arr = [{ num: 1 }, { num: 2 }, { num: 3 }];
   const result = arr.filter((obj) => obj.num !== 2);
   console.log(result);
   // [{ num: 1 }, { num: 3 }]
   ```

   

10. **检查数组是否包含一个元素**

    要检查数组是否包含一个值，可以使用 `includes` 方法。

    ```javascript
    const arr = [1, 2, 3];
    const result = arr.includes(2);
    console.log(result);
    // true
    ```

    

11. **检查数组是否包含具有特定属性的对象**

    要检查数组是否包含具有特定属性的对象，可以使用 `some` 方法。

    ```javascript
    const arr = [{ num: 1 }, { num: 2 }, { num: 3 }];
    const result = arr.some((obj) => obj.num === 2);
    console.log(result);
    // true
    ```

    

12. **检查数组中的所有对象是否都具有特定属性**

    要检查数组中的每个对象是否都具有特定属性，可以使用 `every` 方法。

    ```javascript
    const arr1 = [{ num: 1 }, { num: 2 }, { num: 3 }];
    const result1 = arr1.every((obj) => obj.num === 2);
    console.log(result1);
    // false
    
    const arr2 = [{ num: 2 }, { num: 2 }, { num: 2 }];
    const result2 = arr2.every((obj) => obj.num === 2);
    console.log(result2);
    // true
    ```

    

13. **将数组转换为对象**

    要将数组转换为自定义对象，可以使用 `reduce` 方法。

    ```javascript
    // 将键映射到值的函数。
    const arr1 = [1, 2, 3];
    const result1 = arr1.reduce((acc, cur, index) => {
      acc[`attr${index}`] = cur;
      return acc;
    }, {});
    console.log(result1);
    // { attr0: 1, attr1: 2, attr2: 3 }
    
    // 一个计算出现次数的函数可能如下所示。
    const arr2 = ["a", "b", "c", "c"];
    const result2 = arr2.reduce((acc, cur) => {
      if (acc[cur]) {
        acc[cur] += 1;
      } else {
        acc[cur] = 1;
      }
      return acc;
    }, {});
    console.log(result2);
    // { a: 1, b: 1, c: 2 })
    
    // 将数组元素映射到布尔值的函数可以如下所示。
    // 即，将数组转换为对象键。
    const arr3 = ["a", "b", "c"];
    const truthValues = ["b", "c"];
    const result3 = arr3.reduce((acc, cur) => {
      acc[cur] = truthValues.includes(cur);
      return acc;
    }, {});
    console.log(result3);
    // { a: false, b: true, c: true }
    ```

    

14. **将对象数组转换为对象**

    要将对象数组转换为对象，可以使用 `Object.assign` 方法和数组扩展语法。

    ```javascript
    const arr = [{ attr1: 1 }, { attr2: 2 }, { attr3: 3 }];
    const result = Object.assign({}, ...arr);
    console.log(result);
    // { attr1: 1, attr2: 2, attr3: 3 }
    ```

    

15. **将对象转换为数组**

    要从对象创建一个数组，可以使用 `Object.keys`、`Object.values` 或 `Object.entries` 方法，可能与 `map` 方法一起使用。

    ```javascript
    const obj = { a: 1, b: 2, c: 3 };
    
    // 键的数组。
    const result1 = Object.keys(obj);
    console.log(result1);
    // ["a", "b", "c"]
    
    // 值的数组。
    const result2 = Object.values(obj);
    console.log(result2);
    // [1, 2, 3]
    
    // 键值对象的数组。
    const result3 = Object.entries(obj).map(([key, value]) => ({ key, value }));
    console.log(result3);
    // [{ key: "a", value: 1 }, { key: "b", value: 2 }, { key: "c", value: 3 }]
    ```

    在某些情况下，可以链式使用一些 `map` 和 `filter` 方法来修改和筛选值。

    ```javascript
    const obj = { a: 1, b: 2, c: 3 };
    
    // 具有平方值大于3的值的数组。
    const result1 = Object.values(obj)
      .map((value) => value * value)
      .filter((value) => value > 3);
    console.log(result1);
    // [4, 9]
    
    // 具有值大于1的键值对象的数组。
    const result2 = Object.entries(obj)
      .map(([key, value]) => ({ key, value }))
      .filter((keyValueObj) => keyValueObj.value > 1);
    console.log(result2);
    // [{ key: "b", value: 2 }, { key: "c", value: 3 }]
    ```

    

16. **合并两个数组**

    要合并两个 JavaScript 数组，可以使用 `concat` 方法或数组的扩展语法。不要使用 `push` 方法，因为它会修改原始数组。

    ```javascript
    const arr1 = [1, 2, 3];
    const arr2 = [4, 5, 6];
    
    // 使用 concat 方法更快。
    const combinedArray1 = arr1.concat(arr2);
    console.log(combinedArray1);
    // [1, 2, 3, 4, 5, 6]
    
    // 使用扩展语法可能更可读。
    const combinedArray2 = [...arr1, ...arr2];
    console.log(combinedArray2);
    // [1, 2, 3, 4, 5, 6]
    ```

    

17. **对数组进行排序**

    如果要按值对数组进行排序，可以使用 `toStorted` 方法。`toStorted` 方法是稳定的，这意味着它会保持相互相等的元素的顺序不变。而且，该方法是非原地的，通常这是一件好事，因为它不会修改现有的数组。不要使用 `sort` 方法，因为它会进行原地排序，从而修改原始数组。

    ```javascript
    // 对字符串进行排序。
    let arr1 = ["b", "c", "a"];
    const result1 = arr1.toSorted();
    console.log(result1);
    // ["a", "b", "c"]
    
    // 注意：数字是按其 toString 值进行排序的，而不是按其数值进行排序的！
    const arr2 = [10, 1, 5];
    const result2 = arr2.toSorted();
    console.log(result2);
    // [1, 10, 5]
    
    // 若要对数字进行排序，可以使用比较器。
    const arr3 = [10, 1, 5];
    const result3 = arr3.toSorted((a, b) => a - b);
    console.log(result3);
    // [1, 5, 10]
    ```

    

18. **对对象数组进行排序**

    要按值对数组进行排序，请使用具有比较函数的 `toStorted` 方法。比较函数用于确定两个值中哪个应该首先排序。`toStorted` 方法是稳定的，这意味着它会保持相互相等的元素的顺序不变。此方法不会原地排序，通常这是一件好事，因为它不会修改现有的数组。不要使用 `sort` 方法，因为它会修改原始数组。

    ```javascript
    const arr = [{ num: 3 }, { num: 1 }, { num: 2 }];
    
    // 如果比较函数返回正值，objA 将在 objB 之前排序。
    const byNumberAttribute = (objA, objB) => objA.num - objB.num;
    const result1 = arr.toSorted(byNumberAttribute);
    console.log(result1);
    // [{ num: 1 }, { num: 2 }, { num: 3 }]
    
    // 更通用的比较函数。
    const byAttribute = (attr) => (objA, objB) => objA[attr] - objB[attr];
    const result2 = arr.toSorted(byAttribute("num"));
    console.log(result2);
    // [{ num: 1 }, { num: 2 }, { num: 3 }]
    
    // 注意：比较函数必须返回整数值。
    // 如果需要对其他数据类型进行排序，可以返回 1、0 或 -1。
    const arr3 = [{ letter: "c" }, { letter: "a" }, { letter: "b" }];
    const alphabetically = (objA, objB) => {
      if (objA.letter < objB.letter) {
        return -1;
      }
    
      if (objA.letter > objB.letter) {
        return 1;
      }
    
      // objA === objB
      return 0;
    };
    const result3 = arr3.toSorted(alphabetically);
    console.log(result3);
    // [{ letter: 'a' }, { letter: 'b' }, { letter: 'c' }]
    ```

    

19. **反转数组**

    要反转数组中的所有值，请使用 `toReversed` 方法。

    ```javascript
    const arr = [1, 2, 3];
    const result = arr.toReversed(2);
    console.log(result);
    // [3, 2, 1]
    ```

    

20. **从数组中移除重复项**

    要从数组中移除重复的元素，可以使用 `filter` 方法或使用集合（`Set`）。

    ```javascript
    const arr = [1, 2, 3, 2, 1];
    
    // 使用 filter 方法。
    const result1 = arr.filter((item, index) => arr.indexOf(item) === index);
    console.log(result1);
    // [1, 2, 3]
    
    // 使用 Set。
    const result2 = [...new Set(arr)];
    console.log(result2);
    // [1, 2, 3]
    ```

    

在这篇博客中，我们深入研究了`JavaScript`数组的20个必备高效技巧，旨在帮助您更智能、更高效地处理数组数据。我们从数组的基础操作开始，逐步引导您掌握更高级的技能。

我们学到了如何在数组的开头和末尾添加、移除元素，以及如何在特定索引位置插入、替换和删除元素，而不会影响原始数组。我们了解了如何检查数组中是否包含特定元素，以及如何将数组转换为对象或对象数组转换为对象或数组。我们还探讨了如何合并两个数组，对数组进行排序，包括对象数组，以及如何反转数组和去除重复项。

这些技巧不仅仅是一堆代码示例，它们代表了更深刻的概念，涉及到`JavaScript`中数组操作的核心原则。通过掌握这些技巧，您将能够：

- 编写更整洁、可读和高效的代码。
- 更智能地处理数组数据，无论是在前端还是后端开发中。
- 解决各种常见问题，从数据过滤到数据转换和排序。
- 提高您的编码技能，使您成为`JavaScript`数组操作的专家。

不管您是新手还是经验丰富的开发者，这些技巧都将成为您工具箱中的宝贵资产。`JavaScript`数组是开发中不可或缺的一部分，精通数组操作将使您的项目更具竞争力。

如果您想更深入地了解这些技巧，我鼓励您动手实践。尝试在自己的项目中应用它们，以加深理解。最重要的是，保持好奇心，不断学习和探索，因为`JavaScript`的世界充满了无限的可能性。

感谢您阅读这篇博客，希望它为您提供了有价值的知识，帮助您在`JavaScript`数组操作中取得更大的成功。如果您有任何问题或反馈，请随时与我联系。愿您的编码之路充满挑战和成就！ 🚀