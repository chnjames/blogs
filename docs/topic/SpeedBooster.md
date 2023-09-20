---
title: 前端性能优化
sticky: 1
tags:
 - 前端开发
 - 性能优化
categories:
 - 性能优化
date: 2023-09-06
hideComments: false
---
### 目标

缩短白屏时间，用户能够更快的看到页面。**性能优化的最终目的是提升用户体验。**

### 方向

- 减少资源的体积，从而缩短请求时间；
- 减少资源请求个数，从而缩短等待时间。

### 打包体积

打包构建的时候，使用`--report`命令：

```shell
vue-cli-service build --report
```

### 打包速度

通过`--progress`查看打包耗时，或者使用`ProgressBarPlugin`插件来解决。

```javascript
config.plugins.push(new ProgressBarPlugin())
```

### 开始

- **删除没用的代码**

  在`webpack`里加入下面插件，每次`serve`的时候，会生成一个`JSON`文件，里面会显示你没用到的文件。

  ```javascript
  config.plugin('uselessFile')
  .use(new UselessFile({
  	root: path.resolve(__dirname, './src'),
      out: './fileList.json',
      clean: false,
      exclude: /node_modules/
  }))
  ```

- **按需引入**

  `lodash`

  ```javascript
  // 全量引入
  import lodash from 'loash'
  // 按需引入
  import find from 'lodash/find'
  ```

- **引入库最小资源**

  ```json
  a.js => a.min.js
  ```

- **替换更小的库**

  替换类似的体积更小的库：`moment` => `dayjs`

- **开启Gzip**

  > `Gzip`需要服务器支持，设置`static`开启，否则服务器压缩会耗时。

  ```javascript
  const productionGzipExtensions = ['js', 'css']
  const gzipCompressPlugin = new CompressWebpackPlugin({
  	filename: '[path].gz[query]',
      algorithm: 'gzip',
      test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
      threshold: 10240,
      minRatio: 0.8
  })
  config.plugins.push(gzipCompressPlugin)
  ```

- **生产环境删除`console`等**

  > 安装`terser-webpack-plugin`要注意与`webpack`版本匹配。

  ```javascript
  let terserOption = new TerserPlugin({
  	terserOptions: {
  		test: /\.js(\?.*)?$/i,
          exclude: /\/node_modules/,
          warnings: false,
          mangle: true,
          compress: {
              drop_console: true,
              drop_debugger: true,
              pure_funcs: ['console.log']
          }
  	}
  })
  config.plugins.push(terserOption)
  ```

- **生产关闭`sourcemap`**

  > 生产环境最好不要关闭`sourcemap`，出错了容易定位问题，宁愿牺牲一些打包速度对于生产环境问题不大；
  >
  > `sourcemap`也会用在前端监控工具上。

  ```javascript
  productionSourceMap: false
  ```

- **删除`prefetch`**

  > `prefetch`：（链接预取）是一种浏览器机制，其利用浏览器空闲时间来下载或预取用户在不久的将来可能访问的文档。网页向浏览器提供一组预取提示，并在浏览器完成当前页面的加载后开始静默地拉取指定的文档并将其存储在缓存中。当用户访问其中一个预取文档时，便可以快速的从浏览器缓存中得到。

  ```javascript
  config.plugins.delete('prefetch')
  ```

  