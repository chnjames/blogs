---
title: GitHub Copilot
---
# GitHub Copilot（AI编码辅助工具）

## 简介

![GitHub-Copilot](https://raw.githubusercontent.com/chnjames/cloudImg/main/blog/202206161040308.png)

`GitHub Copilot`是由`GitHub`和`OpenAI`创造的AI工具。该工具通过自动代码补全来帮助程序员们编写代码。它通过大量公共代码库对AI模型训练后构建成`Copilot`服务，服务接收来自`Copilot`插件返回的提要编码，并提供代码建议，插件又将来自程序员对建议的采纳性回传到`Copilot`服务，如此反复强化AI模型。在很多情况下，只需要有注释或者函数名称，`Copilot`就可以实例完整的代码。

#### 工作原理

![image-20220616103124883](https://raw.githubusercontent.com/chnjames/cloudImg/main/blog/202206161031085.png)

## 安装

目前`Copilot`还没有全量开放，需要申请开通权限。访问它的[官方网站](https://copilot.github.com/)，点击`Sign up`按钮即可申请开通。（申请需要`GitHub`账号）当获得开通权限后，会有邮件通知。然后就可以在`IDE`安装`GitHub Copilot`插件。

目前支持IDE：`Neovim`、`JetBrains` 和 `Visual Studio Code` 。

安装成功后会提示要求登录`GitHub`，按提示操作登录即可。

## 使用

正常使用时，当 `Copilot` 给出建议时，会在光标位置的后方出现建议的代码，并灰色字显示。如果不希望使用提示，则继续输入代码即可，如果希望使用提示的代码，按下 Tab 键即可。

在`Visual Studio Code`和其他`IDE`中，`Copilot` 有一个图标，需要确认状态是打开的。当它的样子与其它图标类似，没有背景颜色时，表示是开启的，此时当你编辑代码文件的时候，`Copilot`会自动提示代码建议。当它有背景颜色（红色、深黄色等）时，表示是关闭的。如果要切换状态只要点击它，然后选择全局（Globally）即可。

## 快捷键

- 接受建议：`Tab`

- 拒绝建议：`Esc`

- 打开`Copilot`：`Ctrl + Enter`（会打开一个单独的面板，展示10条建议）

- 下一条建议：`Alt / Option + ]`
- 上一条建议：`Alt / Option + [`
- 触发行内`Copilot`：`Alt / Option + \`（`Copilot`还没有给出建议或者建议被拒绝了，希望手动触发建议）