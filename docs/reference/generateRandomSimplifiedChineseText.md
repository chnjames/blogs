---
title: 「前端秘籍」中文内容随机生成妙技
sticky: 1
tags:
 - JavaScript
 - 前端开发
categories:
 - 前端开发
date: 2023-09-20
hideComments: false
---
#### **背景**

在前端开发中，有时需要生成随机的中文字符用于测试或其他用途。为了满足这种需求，我们可以使用`Unicode码`和`GBK2312`编码来生成随机的中文字符。`Unicode码`包含了大量的汉字字符，而`GBK2312`编码则包含了常用的汉字字符，这两种编码方式都能够满足不同的需求。



#### `Unicode码`

在`unicode`码中，汉字的范围是`(0x4E00, 9FBF)`。

`unicode`码中收录了2万多个汉字，包含很多生僻的繁体字。

**示例一**

```javascript
/**
 * 生成随机长度的中文文本 Unicode码
 * @param {number} minLength - 生成文本的最小长度
 * @param {number} maxLength - 生成文本的最大长度
 * @returns {string} - 生成的中文文本
 */
generateRandomSimplifiedChineseText(minLength, maxLength) {
  const simplifiedChineseStart = 0x4e00;
  const simplifiedChineseEnd = 0x9fbf;
  const textLength = Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength;
  let generatedText = '';

  for (let i = 0; i < textLength; i++) {
    const randomUnicode = Math.floor(Math.random() * (simplifiedChineseEnd - simplifiedChineseStart + 1)) + simplifiedChineseStart;
    generatedText += String.fromCharCode(randomUnicode);
  }
  return generatedText;
},
```



**示例二**

```javascript
/**
 * 生成指定长度范围内的随机中文字符 Unicode码
 * @param {number} minLength - 生成字符的最小长度
 * @param {number} maxLength - 生成字符的最大长度
 * @returns {string} - 生成的随机中文字符串
 */
randomlyGeneratedChineseCharacters(minLength, maxLength) {
  let arr = [];
  const chineseStart = 19968;
  const chineseEnd = 40869;
  const textLength = Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength;
  for (let i = 0; i < textLength; i++) {
    let str;
    // 生成随机的简体中文字符的Unicode码点，范围为 chineseStart 到 chineseEnd
    str = '\\u' + (Math.floor(Math.random() * (chineseEnd - chineseStart + 1)) + chineseStart).toString(16);
    // 对Unicode编码进行解码，将其转换为字符
    str = unescape(str.replace(/\\u/g, "%u"));
    arr.push(str);
  }
  let chinese = arr.join("");
  return chinese;
},
```



### `GBK2312`

`GBK2312`对字符的编码采用两个字节相组合，第一字节范围是`0xB0-0xF7`, 第二字节范围是`0xA1-0xFE`，`GBK2312`共收录了6千多常用汉字。

<u>注意：对于55区，`D7FA-D7FE`的5个是没有编码的，需要在两个字节范围中剔除。</u>

对于`GBK2312`的更多内容请参考：[`GBK2312`](http://tools.jb51.net/table/gb2312)

**示例**

```javascript
/**
 * 生成指定长度范围内的随机中文字符，使用 GBK2312 编码
 * @param {number} minLength - 生成字符的最小长度
 * @param {number} maxLength - 生成字符的最大长度
 * @returns {string} - 生成的随机中文字符串
 */
generateSimplifiedChineseGBK2312(minLength, maxLength) {
  const textLength = Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength;
  let generatedText = '';
  for (let i = 0; i < textLength; i++) {
    // 在 GBK2312 字符范围内生成随机的头部（head）和主体（body）值
    const head = Math.floor(Math.random() * (0xF7 - 0xB0 + 1)) + 0xB0;
    const body = Math.floor(Math.random() * (0xF9 - 0xA1 + 1)) + 0xA1;
    // 使用头部和主体值创建一个字符字符串
    const char = String.fromCharCode(head, body);
    // 创建一个 TextEncoder 实例以将字符编码为字节
    const encoder = new TextEncoder();
    // 使用 'gb2312' 编码创建一个 TextDecoder 实例以解码字节
    const decoder = new TextDecoder('gb2312');
    // 将字符编码为字节，然后解码为字符串
    const valBuffer = encoder.encode(char);
    const str = decoder.decode(valBuffer);
    generatedText += str;
  }
  return generatedText;
}
```



#### 简繁体转换方法

如果需要在生成的文本中进行简繁体转换，可以使用第三方库`chinese-s2t`。这个库提供了简体到繁体和繁体到简体的转换功能，方便在不同场景下使用不同的文本。

```cmd
npm install chinese-s2t
```

**引用示例**

```javascript
const Chinese = require('chinese-s2t')

// 简体转繁体
Chinese.s2t('简体转繁体')

// 繁体转简体
Chinese.t2s('繁体转简体')

const simplifiedText = '简体字' // Input: ‘简体字’

const traditionalText = Chinese.s2t(simplifiedText)

console.log(traditionalText) // Output: '繁體字'
```

#### 总结

在前端开发中，生成随机中文字符是一项常见的需求。通过使用`Unicode码`和`GBK2312`编码，我们可以满足不同的需求，并生成符合特定编码方式的中文文本。同时，简繁体转换也可以帮助我们在不同的场景中使用生成的文本。通过这些技巧，前端开发人员可以更轻松地处理中文文本生成的任务。