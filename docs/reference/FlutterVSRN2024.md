---
title: Flutter 与 React Native - 详细深入对比分析（2024 年）
sticky: 1
tags:
 - Flutter
 - ReactNative
categories:
 - 前端
date: 2024-10-15
hideComments: false
---

> 超长内容预警，建议收藏后阅。

`Flutter` 和 `React Native` 是跨平台应用程序开发的两个领先工具。了解它们的差异以及各自的最佳用例。

![cover](https://raw.githubusercontent.com/chnjames/cloudImg/main/Images202410151713898.png)

## 什么是`Flutter`？

`Flutter` 是 `Google` 于 2018 年发布的用户界面 (`UI`) 软件开发套件。`Flutter` 可让您为多种平台和操作系统构建跨平台应用程序。

## 什么是 `React Native`？

`React Native` 是 `Facebook` 创建并于 2015 年发布的移动开发框架。您可以使用 `React Native` 开发移动、`Web` 和桌面应用程序。

## `React Native` 和 `Flutter` 最大的区别

`Flutter` 在自己的画布上渲染所有组件。

`React Native` 将 `JavaScript` 组件转换为原生组件。

因此，[组件更新](https://blog.prototypr.io/new-in-ios-15-for-product-designers-design-engineers-aa504e3374f8)（例如，`iOS 16`）对 `Flutter` 应用程序没有任何影响，但对 `React Native` 应用程序有影响。

根据不同的立场，这可能是一件好事或坏事。例如，如果你希望你的组件保持原样，`Flutter`的方法将满足你的需求。但是如果你希望你的应用程序能够跟上最新的本地组件设计，那么`React Native`就是最好的选择——在`React Native`中，这种更新会自动进行且免费。此外，如果你不想让`React Native`应用程序中的组件遵循新的`iOS`设计（因为你想保留风格），你可以关闭自动组件更新。

但是要在`Flutter`中包含最新的本地组件，你必须手动更新应用程序。

## `Flutter` 会继续超越 `React Native` 吗？[2024更新]

在2023年版的 `Stack Overflow` 调查中，`Flutter` 在开发者（所有受访者）中仍然高于 `React Native`。

![FVSRN2023](https://raw.githubusercontent.com/chnjames/cloudImg/main/Images202410151713208.png)

*[2023年Stack Overflow调查](https://survey.stackoverflow.co/2023/#most-popular-technologies-misc-tech)中“其他框架和库”类别的最受欢迎技术，Flutter 领先于 React Native。*

2022年年度 `Stack Overflow` 调查结果显示，使用这些技术进行商业项目及其他用途的开发者在 `Flutter` 与 `React Native` 的争论中竞争激烈。

![FVSRN2022](https://raw.githubusercontent.com/chnjames/cloudImg/main/Images202410151713781.png)

从 `Google Trends` 的结果来看，这两者之间的激烈竞争依然持续。

在对 `React Native` 进行两年的追赶后，`Flutter` 在2020年4月成为全球更常被搜索的查询，并在2024年继续保持这一趋势。

![worldwide](https://raw.githubusercontent.com/chnjames/cloudImg/main/Images202410151713086.png)
*全球 Flutter（红色）和 React Native（蓝色）流行趋势（2018-2024）。资料来源： [Google Trends](https://trends.google.com/trends/explore?date=2018-01-01%202024-10-01&q=%2Fg%2F11h03gfxy9,%2Fg%2F11f03_rzbg)*

然而，在美国，这场争夺战依然激烈，火药味十足，尤其是从2021年1月开始的趋势曲线来看。目前，`Flutter` 在一定程度上领先于`React Native`。

![America](https://raw.githubusercontent.com/chnjames/cloudImg/main/Images202410151713586.png)
*美国 Flutter（红色）和 React Native（蓝色）流行趋势（2018-2024）。资料来源： [Google Trends](https://trends.google.com/trends/explore?date=2018-01-01%202024-10-01&geo=US&q=%2Fg%2F11h03gfxy9,%2Fg%2F11f03_rzbg)*

![china](https://raw.githubusercontent.com/chnjames/cloudImg/main/Images202410151716934.png)

*中国 Flutter（红色）和 React Native（蓝色）流行趋势（2018-2024）。资料来源： [Google Trends](https://trends.google.com/trends/explore?date=2018-01-01%202024-10-01&geo=CN&q=%2Fg%2F11h03gfxy9,%2Fg%2F11f03_rzbg)*

`Statista` 的最新研究将`Flutter` 列为 2023 年领先的跨平台移动开发框架。`Flutter` 超过 `React Native` 11%（`Flutter` 为 46%，`React Native` 为 35%）。尽管如此，可以公平地说这两种技术几乎同样受欢迎。

![Statista19-23](https://raw.githubusercontent.com/chnjames/cloudImg/main/Images202410151713379.png)
*2019 年至 2023 年间全球开发者对跨平台移动框架的受欢迎程度。来源： [Statista](https://www.statista.com/statistics/869224/worldwide-software-developer-working-hours/)*

然而，其他来源对 `Flutter` 和 `React Native` 的整体受欢迎程度提供了略有不同的看法。以下是使用特定引擎的免费移动应用和游戏的百分比展示。显然，当考虑到游戏时，`Flutter` 和 `React Native` 的排名较低也就不足为奇，因为它们并不是构建游戏的最优引擎。

![Statista](https://raw.githubusercontent.com/chnjames/cloudImg/main/Images202410151717806.png)

*全球移动应用和游戏开发者使用的主要引擎（2022年7月）。来源：[Statista](https://www.statista.com/statistics/1326121/top-app-dev-engines-worldwide/)*

> 由于某些原因，最新的数据暂时无法获取，因此此处提供的数据并非最新信息。

是什么让这两种技术如此受欢迎呢？让我们来看看。

## `Flutter` 与 `React Native`：比较

### 学习曲线

`React Native` 相较于 `Flutter` 的优势在于它使用 `JavaScript` ——全球最受欢迎的编程语言。

然而，`JavaScript` 不一定是最简单和最令人兴奋的编程语言。就像木匠喜欢使用高质量的工具一样，开发者也喜欢使用有趣且方便的编程语言——这使得工作更加愉快和高效。

那么，`Flutter` 和 `React Native` 哪个更容易学习呢？

从开发者的角度来看，`Flutter` 比 `React Native` 更容易学习。

正如我们之前提到的，`JavaScript` 远不是最友好的编程语言。它包含类中的类和各种其他怪癖，有时让开发者难以理解 `JavaScript` 的工作原理，这无谓地增加了编码的复杂性。

然后还有 `React Native` 框架本身。这并不是说 `React Native` 是一个糟糕的框架——实际上，[很多优秀的应用](https://reactnative.dev/showcase)都在使用它。不过，如果对一些细微差别不熟悉，您可能会花费大量时间尝试解决配置开发环境时出现的问题。

`Flutter` 比 `React Native` 更友好于开发者。`Dart` 作为编程语言，比 `JavaScript` 更易于使用和理解。`Dart` 在范式和用法上也更接近于用于原生移动应用开发的编程语言。

因此，`Flutter` 框架在2022年 `Stack Overflow` 调查的“最受欢迎技术 — 其他框架和库”类别中几乎名列前茅。

![StackOverflow2022](https://raw.githubusercontent.com/chnjames/cloudImg/main/Images202410151717025.png)
*[2022年Stack Overflow调查](https://survey.stackoverflow.co/2022/#most-loved-dreaded-and-wanted-misc-tech-love-dread)中“最受欢迎技术 — 其他框架和库”类别的结果。右侧的紫色部分表示那些认为某项技术是“最令人畏惧”的受访者。*

### 命令行界面 (`CLI`)

`Flutter` 还提供了一个命令行界面（`CLI`），其中包含如 `Flutter Doctor` 等工具，帮助设置所选的 `IDE` 以及 `iOS` 或 `Android` 开发环境。`Flutter Doctor` 会检查本地机器上已安装的工具及其配置。`Flutter CLI` 与 `Flutter Doctor` 结合使用，使得为新的 `Flutter` 移动应用准备环境变得更加顺畅。

设置 `React Native` 需要更多的经验。`React Native` 的入门指南没有提供足够的细节和帮助来启动项目。不过，`React Native` 有 `Expo`。[`Expo`](https://expo.io/) 是一套工具，可以大大简化构建 `React Native` 应用的过程。

使用 `Expo` 客户端，您可以在构建应用时直接在手机上查看它们（无需通过 `Android Studio` 或 `Xcode`）。`Expo CLI` 通过提供开发、日志、部署、迭代、编译等工具，简化了新 `React Native` 应用的创建过程。

### `Flutter` 与 `React Native` 性能比较

`React Native` 的架构需要一个 `JavaScript` 桥接，以便在 `JavaScript` 和原生用户界面组件以及设备特定元素（如蓝牙、传感器、相机等）之间进行交互。因此，由于基于桥接的通信，`React Native` 的性能稍逊于 `Flutter`。不过，当这两者都在熟练的开发者手中使用时，都能产生高性能的应用程序。

2023 年 12 月更新：

#### `JSI (React Native)`

`React Native` 现在拥有一个新的桥接模块 [`JSI`](https://reactnative.dev/docs/the-new-architecture/landing-page#fast-javascriptnative-interfacing)（`JavaScript` 接口），使其在组件通信方面更快。`JSI` 作为 `JavaScript` 和原生层之间更高效的桥接，允许更快速的同步和更流畅的性能。这一架构改进使 `React Native` 在应用开发速度和用户界面的响应性上得到了提升，从而巩固了其在跨平台移动应用开发市场中的地位。

#### `Impeller (Flutter)`

`Flutter` 不再依赖桥接。直到2023年中，`Flutter` 的核心图形引擎 `Skia` 负责在用户与应用互动时将 `UI` 编译为原生代码。自那时起，`Flutter` 已转向 `Impeller`。与 `Skia` 不同，`Impeller` 的设计旨在优化 `GPU` 的使用，提升 `UI` 的性能和效率。这个新的渲染引擎利用了 `Metal` 和 `Vulkan` 等先进的 `GPU API`，提供了更高效的渲染、更低的能耗和更好的帧率。这一举措表明 `Flutter` 致力于利用现代硬件来提升应用体验。

### 调试

在 `React Native` 中，调试可能会存在问题，尤其是当特定的异常或错误来源于应用程序的原生部分时。例如，错误可能出现在 `JavaScript` 方面：在 `React Native` 或应用代码中。在原生方面，错误也可能来自 `React Native` 以及第三方库。

不过，`React Native` 有一个不错的调试工具——[`Flipper`](https://fbflipper.com/)。

![Flipper](https://raw.githubusercontent.com/chnjames/cloudImg/main/Images202410151717576.png)

*`Flipper` 是一个用于调试移动应用的平台。`Flipper` 提供了与`React Native`、`JavaScript` 代码和原生代码的开箱即用的集成。来源：[Flipper](https://fbflipper.com/)*

在 `Flutter` 中，借助支持 `Android Studio` 和 `Visual Studio` 的工具，调试变得更加容易。`DevTools`（源自 `Chrome` 浏览器）和 `OEM Debugger` 帮助开发者捕获和理解错误。此外，还有 [`Inspector`](https://docs.flutter.dev/tools/devtools/inspector) 工具，允许开发者检查应用的视觉层以及其外观的原因。

![devtoolsflutter](https://raw.githubusercontent.com/chnjames/cloudImg/main/Images202410151717191.png)

*Flutter Inspector用于调试视觉层。来源：[Flutter](https://docs.flutter.dev/tools/devtools/inspector)*

### 包和库

`React Native` 的生态系统非常庞大，远超过 `Flutter`。这主要得益于 `Node` 包管理器（[`npm`](https://www.npmjs.com/)），这是一个包的存储库。`npm` 上托管着超过200万个包。

`npm` 已经存在很久了。尽管它主要面向 `Web` 开发（它是 `JavaScript` 的王国），但许多库可以很容易地适配到 `React Native` 应用中。

但是 `npm` 有一个警告——许多可用的 `JavaScript` 库质量较低，几乎无法在生产环境中使用，因此在选择应用程序库时必须小心。

`Flutter/Dart` 的 [`pub-dev`](https://pub.dev/) 存储库是一个动态增长的存储库，但仍然较年轻，现成的解决方案数量相对较少。

然而，当我们在 `GitHub` 上查找存储库时，快速搜索显示这两种技术的生态系统在规模上相似。

截至 2024 年 10 月，`Flutter` 有 [751,000+](https://github.com/search?q=Flutter&type=repositories) 个存储库结果，`React Native` 库有 [516,000+](https://github.com/search?q=React+Native&type=repositories) 个。对于 `Flutter` 来说，这个数字几乎翻了两番，因为在2022年，`Flutter` 只有241,632个包，而 `React Native` 有232,168个包。不过，这两个生态系统在动画、状态管理和网络等方面都有丰富的包可供使用。

### 成熟度

技术的成熟度通常体现在广泛的积极采用和长期支持上。`React Native` 拥有大量高质量的第三方库，并已被许多知名品牌的技术栈所采用。

不过，`Flutter` 正在迅速赶上，我们可以说这两种技术都已成熟到足以安全投入生产使用。

### 文档

尽管 `React Native` 存在的时间比 `Flutter` 长得多，但 `Flutter` 的文档比 `React Native` 更完善、更深入，并且更易于浏览。

例如，`Flutter` 的文档中为不同技术背景和经验水平的开发者提供了“入门”部分。

![flutter-learn](https://raw.githubusercontent.com/chnjames/cloudImg/main/Images202410151717419.png)
*Flutter 的“入门”部分。资料来源：* [*Flutter*](https://flutter.dev/docs/get-started/install)

因此，想要开始使用 `Flutter` 和 `React Native`开发者或希望学习如何在移动应用中排列组件的 `Web` 开发者可以轻松找到他们需要的信息。

`React Native` 的文档在主题组织和深度上不如 `Flutter` 的文档。

![react-native-learn](https://raw.githubusercontent.com/chnjames/cloudImg/main/Images202410151717528.png)
*React Native 的“基础知识”部分。来源：* [*React Native*](https://reactnative.dev/docs/getting-started)

然而，在 `Stack Overflow` 和 `Reddit` 上有大量主题，开发者们在这里互相帮助解决许多复杂问题。

### 开发者社区

`Flutter`和`React Native`都有蓬勃发展的社区，每年都会举办大量的会议、黑客马拉松和活动。

社区的规模以及与专家交流和获取帮助解决开发问题的渠道的重要性不容忽视。这两个框架都有相当强大的社区支持渠道，大多数问题，包括复杂问题，都会得到解答。

以下是对每个工具最受欢迎的沟通渠道的更详细比较：

**2023 年 2 月的数据：**

![scope](https://raw.githubusercontent.com/chnjames/cloudImg/main/Images202410151717653.png)
*2023 年 2 月 Flutter 和 React Native 的沟通渠道和社区规模比较。*

如您所见，`Flutter`的社区在`GitHub`上关闭的问题数量远超过`React Native`。这一点很重要，因为错误可能会显著降低应用的用户体验，而当问题长时间未解决时，错误将持续存在。

### 集成开发环境（`IDE`）

您可以选择在简单的记事本中编写移动应用代码，但在专用的集成开发环境（`IDE`）中开发会更加愉快和高效，这些`IDE`通常配备内置调试器、代码编辑器、构建自动化工具、编译器以及其他实用的开发工具。

`Flutter`允许开发者选择他们的`IDE`，例如`Android Studio`或`Visual Studio`。在`React Native`中，开发者可以使用`Visual Studio`或`WebStorm`等工具。

对于有一些原生`Android`开发经验的开发者来说，使用`Flutter`可能会更容易，因为他们对`Android Studio`会比较熟悉，而`Android Studio`非常友好于开发者。

### 跨平台能力

`React Native`允许开发者为`iOS`和`Android`以及通过`React`构建`Web`应用。最近，微软推出了一个出色的项目，允许使用`React Native`编写桌面应用（适用于`macOS`和`Windows`）。

在`React Native 0.71`版本中（最初遇到了一些问题），团队专注于通过默认使用`TypeScript`、架构更新以及通过`Flexbox Gap`进行布局管理来改善跨平台开发者体验。此次发布还引入了受`Web`启发的样式和可访问性属性，以使`React Native`的`API`在各个平台上保持一致。得益于与众多插件和第三方库的兼容性，`React Native`简化了跨平台应用的开发，使开发者能够快速集成不同的功能。

使用`Flutter`，您可以开发适用于`Web`、`macOS`、`Windows`、`Linux`、`Android`、`iOS`以及嵌入式系统（例如，汽车中的信息娱乐系统）的应用。

`Flutter 3`带来了真正的跨平台开发能力，`SDK`允许开发者在所有兼容平台之间共享代码。事实上，`Flutter 4`将专注于桌面应用的开发。另一方面，`Flutter`的最新版本`Flutter 3.7`通过在`iOS`上引入新的渲染引擎和背景处理改进等更新，提高了性能，并增强了开发工具、国际化和`Material 3`的支持。

### 热重载

热重载是一个极为方便的功能，允许开发者重新加载应用并查看`UI`中的更改。

`React Native`的热重载对应功能是快速刷新（`Fast Refresh`），其基本功能与`Flutter`的热重载相同。

这两种版本的热重载功能的缺点是，代码中的高级更改（例如，将无状态组件更改为有状态组件）无法进行热重载。复杂的更改需要重新编译应用。

### 编程语言

`Dart` 编程语言与 `Java/Kotlin (Android)` 非常相似，这使得来自原生移动开发的开发人员更容易学习。`JavaScript` 不太直观，因此更难掌握。

### `Material Design`

`Flutter`内置对`Material Design`的支持。它直接集成在框架中，提供了一套丰富的`Material Design`组件。这意味着开发者可以轻松地在应用中实现`Material Design`的原则和组件，几乎不需要额外的努力。`Flutter`的`Material`组件设计上严格遵循`Google`的`Material Design`指南，使得在各个平台上创建外观一致、功能丰富的视觉吸引力应用变得非常简单。

`React Native`并不内置`Material Design`组件，但可以通过第三方库来使用`Material Design`。其中一个流行的库是`react-native-paper`，它提供了与`React Native`兼容的多种`Material Design`组件。使用这些库，开发者可以在`React Native`应用中实现`Material Design`，但这需要额外的步骤来集成和维护这些外部依赖。

## 谁在使用`Flutter`？

`Flutter` 存在于公司的技术栈中，例如：

-   `Alibaba`
-   `BMW`
-   `eBay`
-   `Square`
-   `Groupon`
-   `CapitalOne`

## 谁在使用 `React Native`？

`React Native`为许多全球知名品牌提供支持：

-   `Uber Eats`
-   `Skype`
-   `Tesla`
-   `Coinbase`
-   `Instagram`
-   `Salesforce`

## 使用`Flutter`和`React Native`相对于原生开发的优势：

对于不需要最新原生功能的应用，快速原型开发极为重要。使用`Swift（Apple iOS）`或`Kotlin（Android）`进行原生开发的时间较长且成本较高（需要为每个平台各组建一个团队）。`React Native`和`Flutter`能够支持初创公司快速构建原型和最小可行产品（`MVP`）。

热重载功能包含在`React Native`和`Flutter`中，能够让开发者快速反馈布局的变化——每当您进行更改时，可以在应用中查看更改后的效果，而无需重新编译应用。这大大加快了开发过程。

*注意*：原生`Android`和`iOS`也支持热重载，但其功能相比`React Native`和`Flutter`的热重载要有限。

## 使用 `React Native` 或 `Flutter` 与原生应用程序开发的缺点

尽管`React Native`和`Flutter`都是快速构建移动应用的优秀工具，但调整跨平台应用程序以适应操作系统更新时会有一定的开销（无论是`iOS`还是`Android`），而本地应用程序则会自动更新。

使用本地应用程序开发，实现出色的应用程序性能更加容易。尽管在`Flutter`或`React Native`中构建的`iOS`和`Android`应用程序的性能差异越来越不明显。

此外，在本地应用程序中实现完美的像素级设计更加简单。然而，这要求您分别为两个平台进行实现，从而增加了开发时间和成本。

另一方面，`Flutter`的组件（例如按钮或文本框）高度可配置，使您可以微调设计并实现完美的像素级别。

一些新功能在本地`iOS`和`Android`上可用，更容易在本地应用程序中实现。

## 结论：`React Native` 比 `Flutter` 好吗？

长期以来，`CTO`们一直在问`React Native`比`Flutter`好在哪里，但这个问题的参数已经在一段时间内发生了转变。在熟练的开发者手中，`React Native`和`Flutter`都可以用来构建具有接近本地性能和外观的优秀应用程序。然而，`Flutter`在商业和专业开发者中的使用越来越多，这一趋势在全球范围内持续发展。

但是，选择任何一种技术时，你必须从更广泛的角度来看待它，而不仅仅是流行度或技术优缺点。

例如，在外包开发之后，你能否招到完整的`Flutter`开发团队来维护和发展你的应用程序？

`Flutter`的温和学习曲线是一项宝贵的资产，当你需要开发者快速跳入项目时，`Flutter`的文档配合相对较容易的`Dart`肯定会有所帮助。

但是不要忘记，与`React Native`中极受欢迎的`JavaScript`相比，`Dart`不是非常流行的编程语言。因此，难以招募到熟练的`Flutter`开发人员。

此外，还有生态系统本身的问题。在`Flutter`中，您可以使用许多由`Google`官方开发的`SDK`（例如，移动端的`Google Ads SDK`）。

## `Flutter`和`React Native`项目的开发者可用性

`React Native`的需求与供应同样高，但`Flutter`的情况则不尽相同。选择`Flutter`的公司面临招聘问题，他们在寻找和留住能够为应用开发高质量代码的人才方面遇到了困难。

![recruitment](https://raw.githubusercontent.com/chnjames/cloudImg/main/Images202410151717335.png)

*查看2022年6月的Flutter和React Native开发者招聘信息（包括远程选项）*

## `Flutter`和`React Native`的最佳使用场景

`React Native`和`Flutter`非常适合快速原型制作和简单的移动应用。然而，在构建企业级移动应用时，如果对像素完美的设计、一流的性能和即时实现原生功能有关键要求，那么原生开发可能是更好的选择。

这并不是说`Flutter`或`React Native`不能成功用于大型和复杂的应用程序。但您需要意识到，长期来看，这两种技术可能会产生一定的开销。

例如，在2019年，`Airbnb`由于`React Native`生态系统的不稳定、重现错误的困难以及需要为特定平台功能编写桥接代码，选择从`React Native`迁移到原生开发。

始终从广泛和长期的角度看待您想要纳入技术栈中的技术，充分分析权衡和收益。

## 何时使用`Flutter`

`Flutter` 在以下情况下会很好地工作：

-   您的预算较少（无需两个团队进行原生 `Android` 和 `iOS` 开发）
-   您需要快速发布产品（期限短）
-   您希望拥有像素完美的设计和组件来创建出色的 `UI`
-   您需要为您的用户（桌面、移动、汽车信息娱乐）构建跨平台体验

## 何时使用 `React Native`

在以下情况下使用 `React Native`：

-   您有一个桌面应用或网站，可以重用组件用于移动应用（使用单一技术栈）
-   您有一支熟悉现有资源的`JavaScript`团队，可以使用庞大的`npm`库中的插件、模块和组件。
-   您需要尽快找到一支`React Native`开发者团队（目前`Flutter`开发者更难找到）。

## 常见问题解答

### `Flutter`是否比`React Native`更快？

随着`React Native`架构（`JSI`）的变化，`React Native`在性能上逐渐接近`Flutter`。但`Flutter`应用仍然可能比`React Native`应用稍快（当然，这不一定是个问题，具体还要看您的产品类型和功能需求）。

### `Flutter`是否比`React Native`更好？

`Flutter`在`React Native`与`Flutter`的受欢迎程度竞争中逐渐领先，这主要是因为它被认为更易于使用。此外，`Flutter`的`GitHub`上报告的问题有更多的解决方案，而`React Native`则相对较少。然而，市场上`Flutter`开发者的稀缺是一个显著的缺点。因此，虽然`Flutter`相对于`React Native`有许多优势，但很难确定哪种技术更适合开发接近原生的移动应用。

### `Flutter`在2024年是否已经准备好投入生产？

`Flutter`早已准备好投入生产。实际上，该工具允许开发者从单一代码库构建桌面、移动和`Web`应用。

### `Flutter`是原生还是混合框架？

`Flutter`是一个用于开发具有原生`UI`组件的混合或跨平台移动应用的`SDK`。

### `Flutter`是否支持`AI`？

是的，`Flutter`支持 `AI`，可以帮助开发者引入实时响应用户查询的自定义功能。实际上，有一个开源的`Mistral AI API`客户端为`Flutter`提供支持。此外，还有一份全面的逐步指南，展示了如何在移动应用中实现四种不同的人工智能使用案例。