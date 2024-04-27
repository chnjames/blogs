import{_ as n,p as s,q as a,Y as t}from"./framework-c56ab46b.js";const p={},e=t(`<p>一个优雅展示树形结构数据的 Vue 组件，递归渲染每个节点及其子节点，支持自定义颜色、文本和布局。通过独特的样式巧妙处理不同层级，为用户打造丰富的视觉盛宴。</p><h4 id="核心功能" tabindex="-1"><a class="header-anchor" href="#核心功能" aria-hidden="true">#</a> <strong>核心功能</strong></h4><p>- <strong>递归渲染</strong>：组件可以递归地渲染每个节点及其子节点，形成树形结构； - <strong>自定义样式</strong>：支持通过传入的节点数据自定义节点颜色和文本； - <strong>动态布局</strong>：可以根据传入的属性决定节点是左布局、右布局还是左右布局； - <strong>层级颜色</strong>：根据节点的层级显示不同的颜色。</p><p>废话不多说，我们直接开始！</p><p><strong>效果图：</strong></p><p><img src="https://raw.githubusercontent.com/chnjames/cloudImg/main/blog/202402011744029.png" alt="Snipaste_2024-02-01_17-43-36"></p><p>首先，我们在<code>components</code>文件夹下新建一个组件<code>PathoNode.vue</code>，该组件将负责渲染每个节点及其子节点。</p><p>其中，<code>LEVEL_COLORS</code> 为不同层级节点定义了颜色，<code>isLeaf</code> 计算属性用于判断当前节点是否为叶子节点。</p><p>代码如下：</p><div class="language-vue line-numbers-mode" data-ext="vue"><pre class="language-vue"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>node-item<span class="token punctuation">&quot;</span></span> <span class="token attr-name">:class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>{left: isLeft}<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>node-item_not-leaf<span class="token punctuation">&quot;</span></span> <span class="token attr-name">v-if</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>!isLeaf<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>node-name<span class="token punctuation">&quot;</span></span> <span class="token attr-name">:style</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>{background: node.color || LEVEL_COLORS[node.level] || LEVEL_COLORS[3]}<span class="token punctuation">&quot;</span></span> <span class="token attr-name">:class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>{&#39;round&#39;: node.level === 2}<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>{{node.text}}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>node-children<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>patho-node</span> <span class="token attr-name">v-for</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>(childNode, i) in node.children<span class="token punctuation">&quot;</span></span> <span class="token attr-name">:key</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span><span class="token punctuation">&#39;</span>childNode&#39; + i<span class="token punctuation">&quot;</span></span> <span class="token attr-name">:node</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>childNode<span class="token punctuation">&quot;</span></span> <span class="token attr-name">:isLeft</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>isLeft<span class="token punctuation">&quot;</span></span><span class="token punctuation">/&gt;</span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>node-item_leaf<span class="token punctuation">&quot;</span></span> <span class="token attr-name">v-else</span><span class="token punctuation">&gt;</span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>node-name<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>{{node.text}}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">&gt;</span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript">
<span class="token keyword">const</span> <span class="token constant">LEVEL_COLORS</span> <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token number">1</span><span class="token operator">:</span> <span class="token string">&#39;#1A4843&#39;</span><span class="token punctuation">,</span>
  <span class="token number">2</span><span class="token operator">:</span> <span class="token string">&#39;#464885&#39;</span><span class="token punctuation">,</span>
  <span class="token number">3</span><span class="token operator">:</span> <span class="token string">&#39;#46857E&#39;</span><span class="token punctuation">,</span>
  <span class="token number">4</span><span class="token operator">:</span> <span class="token string">&#39;#857146&#39;</span><span class="token punctuation">,</span>
  <span class="token number">5</span><span class="token operator">:</span> <span class="token string">&#39;#6A8546&#39;</span><span class="token punctuation">,</span>
  <span class="token number">6</span><span class="token operator">:</span> <span class="token string">&#39;#854646&#39;</span><span class="token punctuation">,</span>
  <span class="token number">7</span><span class="token operator">:</span> <span class="token string">&#39;#818076&#39;</span><span class="token punctuation">,</span>
  <span class="token number">8</span><span class="token operator">:</span> <span class="token string">&#39;#979B33&#39;</span><span class="token punctuation">,</span>
  <span class="token number">9</span><span class="token operator">:</span> <span class="token string">&#39;#336E9B&#39;</span><span class="token punctuation">,</span>
  <span class="token number">10</span><span class="token operator">:</span> <span class="token string">&#39;#854683&#39;</span>
<span class="token punctuation">}</span>
<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;PathoNode&#39;</span><span class="token punctuation">,</span>
  <span class="token literal-property property">props</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">node</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">type</span><span class="token operator">:</span> Object<span class="token punctuation">,</span>
      <span class="token keyword">default</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token literal-property property">isLeft</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">type</span><span class="token operator">:</span> Boolean<span class="token punctuation">,</span>
      <span class="token keyword">default</span><span class="token operator">:</span> <span class="token boolean">false</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token function">data</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token punctuation">{</span>
      <span class="token constant">LEVEL_COLORS</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token literal-property property">computed</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token function">isLeaf</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> <span class="token operator">!</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>node<span class="token punctuation">.</span>children <span class="token operator">&amp;&amp;</span> <span class="token keyword">this</span><span class="token punctuation">.</span>node<span class="token punctuation">.</span>children<span class="token punctuation">.</span>length <span class="token operator">&gt;</span> <span class="token number">0</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token literal-property property">methods</span><span class="token operator">:</span> <span class="token punctuation">{</span>

  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>style</span> <span class="token attr-name">lang</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>scss<span class="token punctuation">&quot;</span></span> <span class="token attr-name">scoped</span><span class="token punctuation">&gt;</span></span><span class="token style"><span class="token language-css">
$<span class="token property">border-color-primary</span><span class="token punctuation">:</span> #B5BDC4<span class="token punctuation">;</span>
$<span class="token property">text-color-primary</span><span class="token punctuation">:</span> #b4babf<span class="token punctuation">;</span>
$<span class="token property">color-black</span><span class="token punctuation">:</span> #000000<span class="token punctuation">;</span>
<span class="token atrule"><span class="token rule">@mixin</span> firstNode</span> <span class="token punctuation">{</span>
  <span class="token property">position</span><span class="token punctuation">:</span> relative<span class="token punctuation">;</span>
  <span class="token property">border</span><span class="token punctuation">:</span> none<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token atrule"><span class="token rule">@mixin</span> rightNode</span> <span class="token punctuation">{</span>
  <span class="token property">position</span><span class="token punctuation">:</span> relative<span class="token punctuation">;</span>
  <span class="token property">padding-left</span><span class="token punctuation">:</span> 10px<span class="token punctuation">;</span>
  <span class="token property">border-left</span><span class="token punctuation">:</span> 1px solid $border-color-primary<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token atrule"><span class="token rule">@mixin</span> leftNode</span> <span class="token punctuation">{</span>
  <span class="token property">position</span><span class="token punctuation">:</span> relative<span class="token punctuation">;</span>
  <span class="token property">padding</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
  <span class="token property">padding-right</span><span class="token punctuation">:</span> 10px<span class="token punctuation">;</span>
  <span class="token property">border</span><span class="token punctuation">:</span> none<span class="token punctuation">;</span>
  <span class="token property">border-right</span><span class="token punctuation">:</span> 1px solid $border-color-primary<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token atrule"><span class="token rule">@mixin</span> rightHorizonLine</span> <span class="token punctuation">{</span>
  <span class="token property">content</span><span class="token punctuation">:</span> <span class="token string">&#39;&#39;</span><span class="token punctuation">;</span>
  <span class="token property">position</span><span class="token punctuation">:</span> absolute<span class="token punctuation">;</span>
  <span class="token property">top</span><span class="token punctuation">:</span> 50%<span class="token punctuation">;</span>
  <span class="token property">left</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
  <span class="token property">width</span><span class="token punctuation">:</span> 10px<span class="token punctuation">;</span>
  <span class="token property">border-top</span><span class="token punctuation">:</span> 1px solid $border-color-primary<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token atrule"><span class="token rule">@mixin</span> leftHorizonLine</span> <span class="token punctuation">{</span>
  <span class="token atrule"><span class="token rule">@include</span> rightHorizonLine<span class="token punctuation">;</span></span>
  <span class="token property">left</span><span class="token punctuation">:</span> auto<span class="token punctuation">;</span>
  <span class="token property">right</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token atrule"><span class="token rule">@mixin</span> beforeRightFirstChild</span> <span class="token punctuation">{</span>
  <span class="token property">bottom</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
  <span class="token property">border-radius</span><span class="token punctuation">:</span> 4px 0 0 0<span class="token punctuation">;</span>
  <span class="token property">border-left</span><span class="token punctuation">:</span> 1px solid $border-color-primary<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token atrule"><span class="token rule">@mixin</span> beforeRightLastChild</span> <span class="token punctuation">{</span>
  <span class="token property">left</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
  <span class="token property">top</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
  <span class="token property">bottom</span><span class="token punctuation">:</span> 50%<span class="token punctuation">;</span>
  <span class="token property">border-radius</span><span class="token punctuation">:</span> 0 0 0 4px<span class="token punctuation">;</span>
  <span class="token property">border</span><span class="token punctuation">:</span> none<span class="token punctuation">;</span>
  <span class="token property">border-left</span><span class="token punctuation">:</span> 1px solid $border-color-primary<span class="token punctuation">;</span>
  <span class="token property">border-bottom</span><span class="token punctuation">:</span> 1px solid $border-color-primary<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
// 左边第一个child
<span class="token atrule"><span class="token rule">@mixin</span> beforeLeftFirstChild</span> <span class="token punctuation">{</span>
  <span class="token atrule"><span class="token rule">@include</span> beforeRightFirstChild<span class="token punctuation">;</span></span>
  <span class="token property">border</span><span class="token punctuation">:</span> none<span class="token punctuation">;</span>
  <span class="token property">border-radius</span><span class="token punctuation">:</span> 0 4px 0 0<span class="token punctuation">;</span>
  <span class="token property">border-top</span><span class="token punctuation">:</span> 1px solid $border-color-primary<span class="token punctuation">;</span>
  <span class="token property">border-right</span><span class="token punctuation">:</span> 1px solid $border-color-primary<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
// 左边最后一个child
<span class="token atrule"><span class="token rule">@mixin</span> beforeLeftLastChild</span> <span class="token punctuation">{</span>
  <span class="token atrule"><span class="token rule">@include</span> beforeRightLastChild<span class="token punctuation">;</span></span>
  <span class="token property">border-radius</span><span class="token punctuation">:</span> 0 0 4px 0<span class="token punctuation">;</span>
  <span class="token property">border</span><span class="token punctuation">:</span> none<span class="token punctuation">;</span>
  <span class="token property">border-right</span><span class="token punctuation">:</span> 1px solid $border-color-primary<span class="token punctuation">;</span>
  <span class="token property">border-bottom</span><span class="token punctuation">:</span> 1px solid $border-color-primary<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token atrule"><span class="token rule">@mixin</span> beforeRightOnlyOneChild</span> <span class="token punctuation">{</span>
  <span class="token property">left</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
  <span class="token property">top</span><span class="token punctuation">:</span> 50%<span class="token punctuation">;</span>
  <span class="token property">bottom</span><span class="token punctuation">:</span> auto<span class="token punctuation">;</span>
  <span class="token property">border</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
  <span class="token property">border-radius</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
  <span class="token property">border-top</span><span class="token punctuation">:</span> 1px solid $border-color-primary<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token atrule"><span class="token rule">@mixin</span> beforeLeftOnlyOneChild</span> <span class="token punctuation">{</span>
  <span class="token atrule"><span class="token rule">@include</span> beforeRightOnlyOneChild<span class="token punctuation">;</span></span>
  <span class="token property">left</span><span class="token punctuation">:</span> auto<span class="token punctuation">;</span>
  <span class="token property">right</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.node-item</span> <span class="token punctuation">{</span>
  <span class="token property">display</span><span class="token punctuation">:</span> flex<span class="token punctuation">;</span>
  <span class="token property">position</span><span class="token punctuation">:</span> relative<span class="token punctuation">;</span>
  <span class="token property">flex-direction</span><span class="token punctuation">:</span> row<span class="token punctuation">;</span>
  <span class="token property">justify-content</span><span class="token punctuation">:</span> flex-start<span class="token punctuation">;</span>
  <span class="token atrule"><span class="token rule">@include</span> rightNode<span class="token punctuation">;</span></span>
  <span class="token selector">&amp;::before</span><span class="token punctuation">{</span>
    <span class="token atrule"><span class="token rule">@include</span> rightHorizonLine<span class="token punctuation">;</span></span>
  <span class="token punctuation">}</span>
  <span class="token selector">&amp;:first-child</span><span class="token punctuation">{</span>
   <span class="token atrule"><span class="token rule">@include</span> firstNode<span class="token punctuation">;</span></span>
    <span class="token selector">&amp;::before</span><span class="token punctuation">{</span>
      <span class="token atrule"><span class="token rule">@include</span> beforeRightFirstChild<span class="token punctuation">;</span></span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
  <span class="token selector">&amp;:last-child</span><span class="token punctuation">{</span>
    <span class="token property">border-left</span><span class="token punctuation">:</span> none<span class="token punctuation">;</span>
    <span class="token selector">&amp;::before</span><span class="token punctuation">{</span>
      <span class="token atrule"><span class="token rule">@include</span> beforeRightLastChild<span class="token punctuation">;</span></span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
  <span class="token selector">&amp;:first-child:last-child</span><span class="token punctuation">{</span>
    <span class="token property">border-left</span><span class="token punctuation">:</span> none<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token selector">&amp;:first-child:last-child::before</span><span class="token punctuation">{</span>
    <span class="token atrule"><span class="token rule">@include</span> beforeRightOnlyOneChild<span class="token punctuation">;</span></span>
  <span class="token punctuation">}</span>
  <span class="token selector">.node-name</span><span class="token punctuation">{</span>
    <span class="token property">flex-shrink</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
    <span class="token property">display</span><span class="token punctuation">:</span> inline-block<span class="token punctuation">;</span>
    <span class="token property">font-size</span><span class="token punctuation">:</span> 14px<span class="token punctuation">;</span>
    <span class="token property">border-radius</span><span class="token punctuation">:</span> 1px<span class="token punctuation">;</span>
    <span class="token property">margin</span><span class="token punctuation">:</span> 10px 0<span class="token punctuation">;</span>
    <span class="token property">padding</span><span class="token punctuation">:</span> 5px 20px<span class="token punctuation">;</span>
    <span class="token property">width</span><span class="token punctuation">:</span> auto<span class="token punctuation">;</span>
    <span class="token property">line-height</span><span class="token punctuation">:</span> 20px<span class="token punctuation">;</span>
    <span class="token property">font-weight</span><span class="token punctuation">:</span> 600<span class="token punctuation">;</span>
    <span class="token property">height</span><span class="token punctuation">:</span> auto<span class="token punctuation">;</span>
    <span class="token property">border-radius</span><span class="token punctuation">:</span> 3px<span class="token punctuation">;</span>
    <span class="token property">color</span><span class="token punctuation">:</span> $color-black<span class="token punctuation">;</span>
    <span class="token selector">&amp;.round</span><span class="token punctuation">{</span>
      <span class="token property">width</span><span class="token punctuation">:</span> 64px<span class="token punctuation">;</span>
      <span class="token property">height</span><span class="token punctuation">:</span> 64px<span class="token punctuation">;</span>
      <span class="token property">padding</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
      <span class="token property">border-radius</span><span class="token punctuation">:</span> 50%<span class="token punctuation">;</span>
      <span class="token property">line-height</span><span class="token punctuation">:</span> 64px<span class="token punctuation">;</span>
      <span class="token property">text-align</span><span class="token punctuation">:</span> center<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
  <span class="token selector">.node-children</span><span class="token punctuation">{</span>
    <span class="token atrule"><span class="token rule">@include</span> rightNode<span class="token punctuation">;</span></span>
    <span class="token property">border-left</span><span class="token punctuation">:</span> none<span class="token punctuation">;</span>
    <span class="token selector">&amp;::before</span><span class="token punctuation">{</span>
      <span class="token atrule"><span class="token rule">@include</span> rightHorizonLine<span class="token punctuation">;</span></span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
  <span class="token selector">.node-item_not-leaf</span><span class="token punctuation">{</span>
    <span class="token property">display</span><span class="token punctuation">:</span> flex<span class="token punctuation">;</span>
    <span class="token property">flex-direction</span><span class="token punctuation">:</span> row<span class="token punctuation">;</span>
    <span class="token property">justify-content</span><span class="token punctuation">:</span> flex-start<span class="token punctuation">;</span>
    <span class="token property">align-items</span><span class="token punctuation">:</span> center<span class="token punctuation">;</span>
    <span class="token selector">&amp;::before</span><span class="token punctuation">{</span>
      <span class="token property">border-left</span><span class="token punctuation">:</span> 1px solid $border-color-primary<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
  <span class="token selector">.node-item_leaf</span><span class="token punctuation">{</span>
    <span class="token selector">.node-name</span><span class="token punctuation">{</span>
      <span class="token property">background</span><span class="token punctuation">:</span> $color-black<span class="token punctuation">;</span>
      <span class="token property">color</span><span class="token punctuation">:</span> $text-color-primary<span class="token punctuation">;</span>
      <span class="token property">border</span><span class="token punctuation">:</span> 1px solid $text-color-primary<span class="token punctuation">;</span>
      <span class="token property">margin-right</span><span class="token punctuation">:</span> 20px<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
  <span class="token selector">&amp;.left</span><span class="token punctuation">{</span>
    <span class="token atrule"><span class="token rule">@include</span> leftNode<span class="token punctuation">;</span></span>
    <span class="token selector">&amp;::before</span><span class="token punctuation">{</span>
      <span class="token atrule"><span class="token rule">@include</span> leftHorizonLine<span class="token punctuation">;</span></span>
    <span class="token punctuation">}</span>
    <span class="token selector">&amp;:first-child</span><span class="token punctuation">{</span>
      <span class="token atrule"><span class="token rule">@include</span> firstNode<span class="token punctuation">;</span></span>
    <span class="token punctuation">}</span>
    <span class="token selector">&amp;:first-child::before</span><span class="token punctuation">{</span>
      <span class="token atrule"><span class="token rule">@include</span> beforeLeftFirstChild<span class="token punctuation">;</span></span>
    <span class="token punctuation">}</span>
    <span class="token selector">&amp;:last-child</span><span class="token punctuation">{</span>
      <span class="token property">border</span><span class="token punctuation">:</span> none<span class="token punctuation">;</span>
      <span class="token selector">&amp;::before</span><span class="token punctuation">{</span>
        <span class="token atrule"><span class="token rule">@include</span> beforeLeftLastChild<span class="token punctuation">;</span></span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token selector">&amp;:first-child:last-child</span><span class="token punctuation">{</span>
      <span class="token property">border-right</span><span class="token punctuation">:</span> none<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token selector">&amp;:first-child:last-child::before</span><span class="token punctuation">{</span>
      <span class="token atrule"><span class="token rule">@include</span> beforeLeftOnlyOneChild<span class="token punctuation">;</span></span>
    <span class="token punctuation">}</span>
    <span class="token selector">.node-item_not-leaf</span><span class="token punctuation">{</span>
      <span class="token selector">&amp;::before</span><span class="token punctuation">{</span>
        <span class="token property">border</span><span class="token punctuation">:</span> none<span class="token punctuation">;</span>
        <span class="token property">border-right</span><span class="token punctuation">:</span> 1px solid $border-color-primary<span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token selector">.node-name</span><span class="token punctuation">{</span>
      <span class="token selector">&amp;::after</span><span class="token punctuation">{</span>
        <span class="token property">content</span><span class="token punctuation">:</span> <span class="token string">&#39;\\200E&#39;</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token selector">.node-children</span><span class="token punctuation">{</span>
      <span class="token atrule"><span class="token rule">@include</span> leftNode<span class="token punctuation">;</span></span>
      <span class="token property">border-right</span><span class="token punctuation">:</span> none<span class="token punctuation">;</span>
      <span class="token selector">&amp;::before</span><span class="token punctuation">{</span>
        <span class="token atrule"><span class="token rule">@include</span> leftHorizonLine<span class="token punctuation">;</span></span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token selector">.node-item_leaf</span><span class="token punctuation">{</span>
      <span class="token selector">.node-name</span><span class="token punctuation">{</span>
        <span class="token property">margin-right</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
        <span class="token property">margin-left</span><span class="token punctuation">:</span> 20px<span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
  <span class="token selector">// transition
  .node-fade-enter-acitve, .node-fade-leave-active</span> <span class="token punctuation">{</span>
    <span class="token property">transition</span><span class="token punctuation">:</span> all .5s<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token selector">.node-fade-enter, .node-fade-leave-to</span><span class="token punctuation">{</span>
    <span class="token property">opacity</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token selector">.node-fade-enter-to, .node-fade-leave</span> <span class="token punctuation">{</span>
    <span class="token property">opacity</span><span class="token punctuation">:</span> 1<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>style</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>节点组件部分负责定义单个节点的渲染结构，并通过递归调用<code>&lt;patho-node&gt;</code>组件处理子节点。当然，根据具体业务需求，你也可以进一步封装此文件成为专用的业务组件。</p><div class="language-vue line-numbers-mode" data-ext="vue"><pre class="language-vue"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>patho-tab<span class="token punctuation">&quot;</span></span> <span class="token attr-name">ref</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>pathoChartContainer<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>patho-tab__zoom<span class="token punctuation">&quot;</span></span> <span class="token attr-name">@click</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>clickHandler<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>el-scrollbar</span> <span class="token special-attr"><span class="token attr-name">style</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span><span class="token value css language-css"><span class="token property">height</span><span class="token punctuation">:</span>100%<span class="token punctuation">;</span> <span class="token property">width</span><span class="token punctuation">:</span>100%<span class="token punctuation">;</span></span><span class="token punctuation">&quot;</span></span></span><span class="token punctuation">&gt;</span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>transition</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>patho-chart<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
          <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>patho-chart<span class="token punctuation">&quot;</span></span> <span class="token attr-name">:style</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>{ transform: \`scale(\${scaleRatio}) translate(\${translateX}px, \${translateY}px)\` }<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>patho-chart__section patho-chart__section_left<span class="token punctuation">&quot;</span></span> <span class="token attr-name">v-if</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>leftDatas.length &gt; 0<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
              <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>patho-node</span> <span class="token attr-name">v-for</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>(node, i) in leftDatas<span class="token punctuation">&quot;</span></span> <span class="token attr-name">:key</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span><span class="token punctuation">&#39;</span>node&#39; + i<span class="token punctuation">&quot;</span></span> <span class="token attr-name">:node</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>node<span class="token punctuation">&quot;</span></span> <span class="token attr-name">:isLeft</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>true<span class="token punctuation">&quot;</span></span> <span class="token punctuation">/&gt;</span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>patho-chart__section patho-chart__section_center root-node<span class="token punctuation">&quot;</span></span> <span class="token attr-name">v-if</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>nodeData<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>{{ nodeData.text }}
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>patho-chart__section patho-chart__section_right <span class="token punctuation">&quot;</span></span> <span class="token attr-name">v-if</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>rightDatas.length &gt; 0<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
              <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>patho-node</span> <span class="token attr-name">v-for</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>(node, i) in rightDatas<span class="token punctuation">&quot;</span></span> <span class="token attr-name">:key</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span><span class="token punctuation">&#39;</span>node&#39; + i<span class="token punctuation">&quot;</span></span> <span class="token attr-name">:node</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>node<span class="token punctuation">&quot;</span></span> <span class="token attr-name">:isLeft</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>false<span class="token punctuation">&quot;</span></span> <span class="token punctuation">/&gt;</span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
          <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>transition</span><span class="token punctuation">&gt;</span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>el-scrollbar</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript">
<span class="token keyword">import</span> pathoNode <span class="token keyword">from</span> <span class="token string">&#39;@/components/PathoNode.vue&#39;</span>
<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">components</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    pathoNode
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token function">data</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">scaleRatio</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
      <span class="token literal-property property">translateX</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
      <span class="token literal-property property">translateY</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
      <span class="token comment">// 组织结构图数据</span>
      <span class="token literal-property property">nodeData</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token string-property property">&quot;text&quot;</span><span class="token operator">:</span> <span class="token string">&quot;综合分析&quot;</span><span class="token punctuation">,</span>
        <span class="token string-property property">&quot;color&quot;</span><span class="token operator">:</span> <span class="token keyword">null</span><span class="token punctuation">,</span>
        <span class="token string-property property">&quot;level&quot;</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
        <span class="token string-property property">&quot;children&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
          <span class="token punctuation">{</span>
            <span class="token string-property property">&quot;text&quot;</span><span class="token operator">:</span> <span class="token string">&quot;血&quot;</span><span class="token punctuation">,</span>
            <span class="token string-property property">&quot;color&quot;</span><span class="token operator">:</span> <span class="token string">&quot;#9BBA5B&quot;</span><span class="token punctuation">,</span>
            <span class="token string-property property">&quot;level&quot;</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
            <span class="token string-property property">&quot;children&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
              <span class="token punctuation">{</span>
                <span class="token string-property property">&quot;text&quot;</span><span class="token operator">:</span> <span class="token string">&quot;活血化瘀&quot;</span><span class="token punctuation">,</span>
                <span class="token string-property property">&quot;color&quot;</span><span class="token operator">:</span> <span class="token keyword">null</span><span class="token punctuation">,</span>
                <span class="token string-property property">&quot;level&quot;</span><span class="token operator">:</span> <span class="token number">3</span><span class="token punctuation">,</span>
                <span class="token string-property property">&quot;children&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
                  <span class="token punctuation">{</span>
                    <span class="token string-property property">&quot;text&quot;</span><span class="token operator">:</span> <span class="token string">&quot;岷归&quot;</span><span class="token punctuation">,</span>
                    <span class="token string-property property">&quot;color&quot;</span><span class="token operator">:</span> <span class="token keyword">null</span><span class="token punctuation">,</span>
                    <span class="token string-property property">&quot;level&quot;</span><span class="token operator">:</span> <span class="token number">4</span><span class="token punctuation">,</span>
                    <span class="token string-property property">&quot;children&quot;</span><span class="token operator">:</span> <span class="token keyword">null</span>
                  <span class="token punctuation">}</span>
                <span class="token punctuation">]</span>
              <span class="token punctuation">}</span>
            <span class="token punctuation">]</span>
          <span class="token punctuation">}</span><span class="token punctuation">,</span>
          <span class="token punctuation">{</span>
            <span class="token string-property property">&quot;text&quot;</span><span class="token operator">:</span> <span class="token string">&quot;汗&quot;</span><span class="token punctuation">,</span>
            <span class="token string-property property">&quot;color&quot;</span><span class="token operator">:</span> <span class="token string">&quot;#C58080&quot;</span><span class="token punctuation">,</span>
            <span class="token string-property property">&quot;level&quot;</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
            <span class="token string-property property">&quot;children&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
              <span class="token punctuation">{</span>
                <span class="token string-property property">&quot;text&quot;</span><span class="token operator">:</span> <span class="token string">&quot;固涩_止汗&quot;</span><span class="token punctuation">,</span>
                <span class="token string-property property">&quot;color&quot;</span><span class="token operator">:</span> <span class="token keyword">null</span><span class="token punctuation">,</span>
                <span class="token string-property property">&quot;level&quot;</span><span class="token operator">:</span> <span class="token number">3</span><span class="token punctuation">,</span>
                <span class="token string-property property">&quot;children&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
                  <span class="token punctuation">{</span>
                    <span class="token string-property property">&quot;text&quot;</span><span class="token operator">:</span> <span class="token string">&quot;白芍&quot;</span><span class="token punctuation">,</span>
                    <span class="token string-property property">&quot;color&quot;</span><span class="token operator">:</span> <span class="token keyword">null</span><span class="token punctuation">,</span>
                    <span class="token string-property property">&quot;level&quot;</span><span class="token operator">:</span> <span class="token number">4</span><span class="token punctuation">,</span>
                    <span class="token string-property property">&quot;children&quot;</span><span class="token operator">:</span> <span class="token keyword">null</span>
                  <span class="token punctuation">}</span><span class="token punctuation">,</span>
                  <span class="token punctuation">{</span>
                    <span class="token string-property property">&quot;text&quot;</span><span class="token operator">:</span> <span class="token string">&quot;于朮&quot;</span><span class="token punctuation">,</span>
                    <span class="token string-property property">&quot;color&quot;</span><span class="token operator">:</span> <span class="token keyword">null</span><span class="token punctuation">,</span>
                    <span class="token string-property property">&quot;level&quot;</span><span class="token operator">:</span> <span class="token number">4</span><span class="token punctuation">,</span>
                    <span class="token string-property property">&quot;children&quot;</span><span class="token operator">:</span> <span class="token keyword">null</span>
                  <span class="token punctuation">}</span>
                <span class="token punctuation">]</span>
              <span class="token punctuation">}</span>
            <span class="token punctuation">]</span>
          <span class="token punctuation">}</span>
          <span class="token comment">// ...</span>
        <span class="token punctuation">]</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token literal-property property">computed</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token function">leftDatas</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">const</span> children <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>nodeData<span class="token punctuation">.</span>children <span class="token operator">||</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
      <span class="token keyword">const</span> len <span class="token operator">=</span> children<span class="token punctuation">.</span>length
      <span class="token keyword">return</span> children<span class="token punctuation">.</span><span class="token function">slice</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> Math<span class="token punctuation">.</span><span class="token function">floor</span><span class="token punctuation">(</span>len <span class="token operator">/</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token function">rightDatas</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">const</span> children <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>nodeData<span class="token punctuation">.</span>children <span class="token operator">||</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
      <span class="token keyword">const</span> len <span class="token operator">=</span> children<span class="token punctuation">.</span>length
      <span class="token keyword">return</span> children<span class="token punctuation">.</span><span class="token function">slice</span><span class="token punctuation">(</span>len <span class="token operator">/</span> <span class="token number">2</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token literal-property property">methods</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token function">clickHandler</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>scaleRatio <span class="token operator">===</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>scaleRatio <span class="token operator">=</span> <span class="token number">1.2</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>scaleRatio <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>style</span> <span class="token attr-name">lang</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>scss<span class="token punctuation">&quot;</span></span> <span class="token attr-name">scoped</span><span class="token punctuation">&gt;</span></span><span class="token style"><span class="token language-css">
$<span class="token property">border-color-primary</span><span class="token punctuation">:</span> #B5BDC4<span class="token punctuation">;</span>
$<span class="token property">color-primary</span><span class="token punctuation">:</span> #49B8A3<span class="token punctuation">;</span>
$<span class="token property">color-black</span><span class="token punctuation">:</span> #000000<span class="token punctuation">;</span>

<span class="token atrule"><span class="token rule">@mixin</span> rightHorizonLine</span> <span class="token punctuation">{</span>
  <span class="token property">content</span><span class="token punctuation">:</span> <span class="token string">&#39;&#39;</span><span class="token punctuation">;</span>
  <span class="token property">position</span><span class="token punctuation">:</span> absolute<span class="token punctuation">;</span>
  <span class="token property">top</span><span class="token punctuation">:</span> 50%<span class="token punctuation">;</span>
  <span class="token property">left</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
  <span class="token property">width</span><span class="token punctuation">:</span> 10px<span class="token punctuation">;</span>
  <span class="token property">border-top</span><span class="token punctuation">:</span> 1px solid $border-color-primary<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token atrule"><span class="token rule">@mixin</span> leftHorizonLine</span> <span class="token punctuation">{</span>
  <span class="token atrule"><span class="token rule">@include</span> rightHorizonLine<span class="token punctuation">;</span></span>
  <span class="token property">left</span><span class="token punctuation">:</span> auto<span class="token punctuation">;</span>
  <span class="token property">right</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token selector">.patho-tab</span> <span class="token punctuation">{</span>
  <span class="token property">display</span><span class="token punctuation">:</span> flex<span class="token punctuation">;</span>
  <span class="token property">flex-direction</span><span class="token punctuation">:</span> column<span class="token punctuation">;</span>
  <span class="token property">height</span><span class="token punctuation">:</span> 100%<span class="token punctuation">;</span>
  <span class="token property">position</span><span class="token punctuation">:</span> relative<span class="token punctuation">;</span>

  <span class="token selector">&amp;__body</span> <span class="token punctuation">{</span>
    <span class="token property">user-select</span><span class="token punctuation">:</span> none<span class="token punctuation">;</span>
    <span class="token property">overflow</span><span class="token punctuation">:</span> hidden<span class="token punctuation">;</span>
    <span class="token property">flex-grow</span><span class="token punctuation">:</span> 1<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token selector">.patho-chart</span> <span class="token punctuation">{</span>
    <span class="token property">position</span><span class="token punctuation">:</span> relative<span class="token punctuation">;</span>
    <span class="token property">display</span><span class="token punctuation">:</span> flex<span class="token punctuation">;</span>
    <span class="token property">flex-direction</span><span class="token punctuation">:</span> row<span class="token punctuation">;</span>
    <span class="token property">justify-content</span><span class="token punctuation">:</span> center<span class="token punctuation">;</span>
    <span class="token property">align-items</span><span class="token punctuation">:</span> center<span class="token punctuation">;</span>
    <span class="token property">margin</span><span class="token punctuation">:</span> 0 auto<span class="token punctuation">;</span>
    <span class="token property">padding</span><span class="token punctuation">:</span> 2em 0<span class="token punctuation">;</span>
    <span class="token property">width</span><span class="token punctuation">:</span> max-content<span class="token punctuation">;</span>
    <span class="token property">cursor</span><span class="token punctuation">:</span> pointer<span class="token punctuation">;</span>

    <span class="token selector">.patho-chart__section</span> <span class="token punctuation">{</span>
      <span class="token property">display</span><span class="token punctuation">:</span> flex<span class="token punctuation">;</span>
      <span class="token property">flex-direction</span><span class="token punctuation">:</span> column<span class="token punctuation">;</span>
      <span class="token property">flex-shrink</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
      <span class="token property">flex-basis</span><span class="token punctuation">:</span> auto<span class="token punctuation">;</span>

      <span class="token selector">&amp;.patho-chart__section_right</span> <span class="token punctuation">{</span>
        <span class="token property">position</span><span class="token punctuation">:</span> relative<span class="token punctuation">;</span>
        <span class="token property">padding</span><span class="token punctuation">:</span> 0 0 0 10px<span class="token punctuation">;</span>

        <span class="token selector">&amp;::before</span> <span class="token punctuation">{</span>
          <span class="token atrule"><span class="token rule">@include</span> rightHorizonLine
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>

      &amp;.patho-chart__section_left</span> <span class="token punctuation">{</span>
        <span class="token property">position</span><span class="token punctuation">:</span> relative<span class="token punctuation">;</span>
        <span class="token property">direction</span><span class="token punctuation">:</span> rtl<span class="token punctuation">;</span>
        <span class="token property">text-align</span><span class="token punctuation">:</span> left<span class="token punctuation">;</span>
        <span class="token property">justify-content</span><span class="token punctuation">:</span> flex-end<span class="token punctuation">;</span>
        <span class="token property">padding</span><span class="token punctuation">:</span> 0 10px 0 0<span class="token punctuation">;</span>

        <span class="token selector">&amp;::before</span> <span class="token punctuation">{</span>
          <span class="token atrule"><span class="token rule">@include</span> leftHorizonLine<span class="token punctuation">;</span></span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token selector">.root-node</span> <span class="token punctuation">{</span>
      <span class="token property">width</span><span class="token punctuation">:</span> 90px<span class="token punctuation">;</span>
      <span class="token property">height</span><span class="token punctuation">:</span> 90px<span class="token punctuation">;</span>
      <span class="token property">border-radius</span><span class="token punctuation">:</span> 50%<span class="token punctuation">;</span>
      <span class="token property">background</span><span class="token punctuation">:</span> #1A4843<span class="token punctuation">;</span>
      <span class="token property">color</span><span class="token punctuation">:</span> $color-black<span class="token punctuation">;</span>
      <span class="token property">font-size</span><span class="token punctuation">:</span> 16px<span class="token punctuation">;</span>
      <span class="token property">font-weight</span><span class="token punctuation">:</span> 600<span class="token punctuation">;</span>
      <span class="token property">color</span><span class="token punctuation">:</span> $color-primary<span class="token punctuation">;</span>
      <span class="token property">text-align</span><span class="token punctuation">:</span> center<span class="token punctuation">;</span>
      <span class="token property">line-height</span><span class="token punctuation">:</span> 90px<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token selector">/deep/ .el-scrollbar__view</span> <span class="token punctuation">{</span>
  <span class="token property">min-height</span><span class="token punctuation">:</span> 100%<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token selector">.patho-tab__zoom</span> <span class="token punctuation">{</span>
  <span class="token property">position</span><span class="token punctuation">:</span> fixed<span class="token punctuation">;</span>
  <span class="token property">left</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
  <span class="token property">bottom</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
  <span class="token property">width</span><span class="token punctuation">:</span> 100vw<span class="token punctuation">;</span>
  <span class="token property">height</span><span class="token punctuation">:</span> 100vh<span class="token punctuation">;</span>
  <span class="token property">background</span><span class="token punctuation">:</span> <span class="token function">rgba</span><span class="token punctuation">(</span>0<span class="token punctuation">,</span> 0<span class="token punctuation">,</span> 0<span class="token punctuation">,</span> 0.8<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token property">user-select</span><span class="token punctuation">:</span> none<span class="token punctuation">;</span>
  <span class="token property">z-index</span><span class="token punctuation">:</span> 100<span class="token punctuation">;</span>

  <span class="token selector">.patho-chart</span> <span class="token punctuation">{</span>
    <span class="token property">margin</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
    <span class="token property">transform-origin</span><span class="token punctuation">:</span> 0 0<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token selector">.patho-tab__no-datas</span> <span class="token punctuation">{</span>
  <span class="token property">margin-top</span><span class="token punctuation">:</span> 20%<span class="token punctuation">;</span>
  <span class="token property">text-align</span><span class="token punctuation">:</span> center<span class="token punctuation">;</span>

  <span class="token selector">&amp;_icon</span> <span class="token punctuation">{</span>
    <span class="token property">width</span><span class="token punctuation">:</span> 200px<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token selector">&amp;_text</span> <span class="token punctuation">{</span>
    <span class="token atrule"><span class="token rule">@include</span> noDatas<span class="token punctuation">;</span></span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token selector">.patho-chart-enter-active,
.patho-chart-leave-active</span> <span class="token punctuation">{</span>
  <span class="token property">transition</span><span class="token punctuation">:</span> opacity .5s<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token selector">.patho-chart-enter,
.patho-chart-leave-to</span> <span class="token punctuation">{</span>
  <span class="token property">opacity</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token selector">.patho-chart-enter-to,
.patho-chart-leave</span> <span class="token punctuation">{</span>
  <span class="token property">opacity</span><span class="token punctuation">:</span> 1<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>style</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>通过以上设计，我们成功打造了一个多功能的树形结构组件，具备丰富的自定义选项，涵盖节点颜色、文本和布局等方面。这样的组件不仅能够实现功能性的树形结构展示，同时为用户提供了生动多彩的视觉体验。</p>`,13),o=[e];function c(l,i){return s(),a("div",null,o)}const r=n(p,[["render",c],["__file","BuildColorfulTreeComponents.html.vue"]]);export{r as default};
