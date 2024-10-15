import{_ as a,p as n,q as s,Y as t}from"./framework-c56ab46b.js";const e={},p=t(`<p>在 <code>Vue.js</code> 开发中，<code>v-for</code> 是我们用来遍历数组、对象或其他数据结构的核心指令。然而，很多开发者可能忽略了其中的一个细微差别：<code>in</code> 和 <code>of</code>。这两个关键字看似相似，但却有各自不同的使用场景和适用数据类型。理解它们的区别，可以帮助我们编写更简洁、高效的代码。</p><p>本文将详细探讨 <code>v-for</code> 中的 <code>in</code> 和 <code>of</code>，并讲解它们各自的适用场景，帮助你在 <code>Vue.js</code> 项目中做出最佳选择。</p><hr><h3 id="什么是-v-for" tabindex="-1"><a class="header-anchor" href="#什么是-v-for" aria-hidden="true">#</a> 什么是 <code>v-for</code>？</h3><p><code>v-for</code> 是 <code>Vue.js</code> 提供的用于遍历数据的指令，它可以帮助你快速渲染列表、表格等动态生成的内容。在使用 <code>v-for</code> 时，我们通常需要遍历一个数据集合，并将每一项绑定到 <code>DOM</code> 元素上。</p><h3 id="in-和-of-的概念" tabindex="-1"><a class="header-anchor" href="#in-和-of-的概念" aria-hidden="true">#</a> <code>in</code> 和 <code>of</code> 的概念</h3><p><code>v-for</code> 中的 <code>in</code> 和 <code>of</code> 是遍历数据时的两个常用关键字，它们的主要区别在于：<strong><code>in</code> 更通用，可以遍历数组、对象和整数范围；而 <code>of</code> 专注于遍历可迭代对象（如数组、字符串、<code>Set</code>、<code>Map</code> 等）</strong>。</p><p>接下来，我们深入探讨它们的具体用法及差异。</p><hr><h3 id="_1-in-适用于数组、对象、整数范围" tabindex="-1"><a class="header-anchor" href="#_1-in-适用于数组、对象、整数范围" aria-hidden="true">#</a> 1. <code>in</code>：适用于数组、对象、整数范围</h3><h4 id="_1-1-遍历数组" tabindex="-1"><a class="header-anchor" href="#_1-1-遍历数组" aria-hidden="true">#</a> 1.1 遍历数组</h4><p><code>in</code> 是 <code>Vue.js</code> 中默认推荐的方式，用于遍历数组中的元素。你可以轻松地用 <code>in</code> 处理数组中的每个值。</p><div class="language-vue line-numbers-mode" data-ext="vue"><pre class="language-vue"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>ul</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>li</span> <span class="token attr-name">v-for</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>item in items<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>{{ item }}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>li</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>ul</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>假设 <code>items = [&#39;apple&#39;, &#39;banana&#39;, &#39;cherry&#39;]</code>，输出结果为：</p><div class="language-html line-numbers-mode" data-ext="html"><pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>li</span><span class="token punctuation">&gt;</span></span>apple<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>li</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>li</span><span class="token punctuation">&gt;</span></span>banana<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>li</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>li</span><span class="token punctuation">&gt;</span></span>cherry<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>li</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_1-2-遍历对象" tabindex="-1"><a class="header-anchor" href="#_1-2-遍历对象" aria-hidden="true">#</a> 1.2 遍历对象</h4><p>当你需要遍历对象的键和值时，<code>in</code> 也非常方便。通过 <code>(value, key)</code> 语法，你可以轻松获取对象的键和值。</p><div class="language-vue line-numbers-mode" data-ext="vue"><pre class="language-vue"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>ul</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>li</span> <span class="token attr-name">v-for</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>(value, key) in myObject<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>{{ key }}: {{ value }}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>li</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>ul</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>假设 <code>myObject = { name: &#39;John&#39;, age: 30 }</code>，输出结果为：</p><div class="language-html line-numbers-mode" data-ext="html"><pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>li</span><span class="token punctuation">&gt;</span></span>name: John<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>li</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>li</span><span class="token punctuation">&gt;</span></span>age: 30<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>li</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_1-3-遍历整数范围" tabindex="-1"><a class="header-anchor" href="#_1-3-遍历整数范围" aria-hidden="true">#</a> 1.3 遍历整数范围</h4><p><code>in</code> 还可以用来遍历一个指定的整数范围，特别适用于需要循环渲染某些元素的场景。</p><div class="language-vue line-numbers-mode" data-ext="vue"><pre class="language-vue"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">v-for</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>n in 5<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>{{ n }}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这段代码会渲染从 1 到 5 的数字：</p><div class="language-html line-numbers-mode" data-ext="html"><pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">&gt;</span></span>1<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">&gt;</span></span>2<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">&gt;</span></span>3<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">&gt;</span></span>4<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">&gt;</span></span>5<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="总结-in-的适用场景" tabindex="-1"><a class="header-anchor" href="#总结-in-的适用场景" aria-hidden="true">#</a> 总结 <code>in</code> 的适用场景：</h4><ul><li><strong>数组</strong>：遍历数组的元素。</li><li><strong>对象</strong>：遍历对象的键值对。</li><li><strong>整数范围</strong>：生成指定范围的数字序列。</li></ul><h3 id="_2-of-用于可迭代对象的遍历" tabindex="-1"><a class="header-anchor" href="#_2-of-用于可迭代对象的遍历" aria-hidden="true">#</a> 2. <code>of</code>：用于可迭代对象的遍历</h3><h4 id="_2-1-of-的用法概述" tabindex="-1"><a class="header-anchor" href="#_2-1-of-的用法概述" aria-hidden="true">#</a> 2.1 <code>of</code> 的用法概述</h4><p>在 <code>JavaScript</code> 中，<code>for...of</code> 是遍历可迭代对象的标准语法。类似地，在 <code>Vue.js</code> 中，<code>v-for</code> 结合 <code>of</code> 可以遍历一切可迭代对象，如数组、字符串、<code>Set</code>、<code>Map</code> 等。</p><p>尽管 <code>of</code> 并没有广泛应用于 <code>Vue.js</code> 文档中的例子，但它在处理特定数据结构时非常有效。</p><h4 id="_2-2-遍历数组" tabindex="-1"><a class="header-anchor" href="#_2-2-遍历数组" aria-hidden="true">#</a> 2.2 遍历数组</h4><p><code>of</code> 和 <code>in</code> 都可以用于遍历数组。它们的效果相同，但 <code>of</code> 更偏向于遵循 <code>JavaScript</code> 的迭代标准。</p><div class="language-vue line-numbers-mode" data-ext="vue"><pre class="language-vue"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>ul</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>li</span> <span class="token attr-name">v-for</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>item of items<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>{{ item }}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>li</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>ul</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出与 <code>in</code> 相同：</p><div class="language-html line-numbers-mode" data-ext="html"><pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>li</span><span class="token punctuation">&gt;</span></span>apple<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>li</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>li</span><span class="token punctuation">&gt;</span></span>banana<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>li</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>li</span><span class="token punctuation">&gt;</span></span>cherry<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>li</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_2-3-遍历字符串" tabindex="-1"><a class="header-anchor" href="#_2-3-遍历字符串" aria-hidden="true">#</a> 2.3 遍历字符串</h4><p><code>of</code> 非常适合用于遍历字符串中的每个字符。</p><div class="language-vue line-numbers-mode" data-ext="vue"><pre class="language-vue"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>span</span> <span class="token attr-name">v-for</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>char of &#39;hello&#39;<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>{{ char }}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>span</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>输出结果为：</p><div class="language-html line-numbers-mode" data-ext="html"><pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>span</span><span class="token punctuation">&gt;</span></span>h<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>span</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>span</span><span class="token punctuation">&gt;</span></span>e<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>span</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>span</span><span class="token punctuation">&gt;</span></span>l<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>span</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>span</span><span class="token punctuation">&gt;</span></span>l<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>span</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>span</span><span class="token punctuation">&gt;</span></span>o<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>span</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_2-4-遍历-set-和-map" tabindex="-1"><a class="header-anchor" href="#_2-4-遍历-set-和-map" aria-hidden="true">#</a> 2.4 遍历 <code>Set</code> 和 <code>Map</code></h4><p>与 <code>JavaScript</code> 的原生 <code>for...of</code> 类似，<code>v-for</code> 中的 <code>of</code> 也可以轻松遍历 <code>Set</code> 和 <code>Map</code> 等复杂数据结构。</p><div class="language-vue line-numbers-mode" data-ext="vue"><pre class="language-vue"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>ul</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>li</span> <span class="token attr-name">v-for</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>item of new Set([1, 2, 3])<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>{{ item }}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>li</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>ul</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出为：</p><div class="language-html line-numbers-mode" data-ext="html"><pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>li</span><span class="token punctuation">&gt;</span></span>1<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>li</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>li</span><span class="token punctuation">&gt;</span></span>2<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>li</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>li</span><span class="token punctuation">&gt;</span></span>3<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>li</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="总结-of-的适用场景" tabindex="-1"><a class="header-anchor" href="#总结-of-的适用场景" aria-hidden="true">#</a> 总结 <code>of</code> 的适用场景：</h4><ul><li><strong>数组</strong>：与 <code>in</code> 类似，遍历数组的元素。</li><li><strong>字符串</strong>：遍历字符串中的每个字符。</li><li><strong><code>Set</code> 和 <code>Map</code></strong>：遍历复杂的可迭代数据结构。</li></ul><hr><h3 id="in-和-of-的区别" tabindex="-1"><a class="header-anchor" href="#in-和-of-的区别" aria-hidden="true">#</a> <code>in</code> 和 <code>of</code> 的区别</h3><h4 id="_1-适用范围" tabindex="-1"><a class="header-anchor" href="#_1-适用范围" aria-hidden="true">#</a> 1. 适用范围</h4><ul><li><strong><code>in</code></strong>：可以遍历数组、对象和整数范围。</li><li><strong><code>of</code></strong>：主要用于遍历可迭代对象，如数组、字符串、<code>Set</code>、<code>Map</code>。</li></ul><h4 id="_2-对象的遍历" tabindex="-1"><a class="header-anchor" href="#_2-对象的遍历" aria-hidden="true">#</a> 2. 对象的遍历</h4><ul><li><strong><code>in</code></strong>：可以遍历对象的键和值，非常适合处理对象。</li><li><strong><code>of</code></strong>：不能直接用于对象，因为对象并不是可迭代的。</li></ul><h4 id="_3-数据类型的适配" tabindex="-1"><a class="header-anchor" href="#_3-数据类型的适配" aria-hidden="true">#</a> 3. 数据类型的适配</h4><ul><li><strong><code>in</code></strong>：更通用，适用于大多数场景。</li><li><strong><code>of</code></strong>：专门用于处理可迭代对象，更加符合 <code>JavaScript</code> 的迭代标准。</li></ul><hr><h3 id="选择-in-还是-of" tabindex="-1"><a class="header-anchor" href="#选择-in-还是-of" aria-hidden="true">#</a> 选择 <code>in</code> 还是 <code>of</code>？</h3><ul><li><strong>当处理数组、对象、整数范围时</strong>，<code>in</code> 是 <code>Vue.js</code> 中的默认选择，提供了更广泛的兼容性。</li><li><strong>当处理可迭代对象时</strong>，如字符串、<code>Set</code> 或 <code>Map</code>，使用 <code>of</code> 会更加符合标准的 <code>JavaScript</code> 迭代行为。</li></ul><h3 id="结语" tabindex="-1"><a class="header-anchor" href="#结语" aria-hidden="true">#</a> 结语</h3><p><code>v-for</code> 是 <code>Vue.js</code> 中非常强大和常用的指令，而理解 <code>in</code> 和 <code>of</code> 的差异能够帮助你更灵活地处理不同的数据结构。无论是遍历数组、对象，还是其他复杂数据结构，正确选择 <code>in</code> 或 <code>of</code> 都能让代码更加高效、易读。</p><p>在你下次需要使用 <code>v-for</code> 时，记住本文的要点，你将能够轻松做出最佳的选择！</p><hr><p>希望本文为你带来了对 <code>v-for</code> 中 <code>in</code> 与 <code>of</code> 的深入理解，如果你在开发过程中有任何问题，欢迎留言讨论！</p>`,64),o=[p];function c(l,i){return n(),s("div",null,o)}const u=a(e,[["render",c],["__file","v-for_in_of_Guide.html.vue"]]);export{u as default};