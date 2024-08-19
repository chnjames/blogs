import{_ as l,p as c,q as a,s as e,t as d,R as n,Y as t,n as s}from"./framework-c56ab46b.js";const r={},o={href:"https://github.com/facebook/react",target:"_blank",rel:"noopener noreferrer"},u=e("code",null,"React",-1),v=e("code",null,"React 19",-1),m=e("code",null,"React",-1),p=t(`<p><code>React 19 Beta</code> 官方文档：https://19.react.dev/</p><ul><li><h4 id="react-编译器-重新渲染的自动优化" tabindex="-1"><a class="header-anchor" href="#react-编译器-重新渲染的自动优化" aria-hidden="true">#</a> React 编译器：重新渲染的自动优化</h4><p><u>当前的问题</u>：使用 <code>useMemo</code>、<code>useCallback</code> 和 <code>memo API</code> 手动优化重新渲染可能很麻烦且容易出错。</p><p><u>解决</u>：新的 <code>React</code> 编译器自动优化重新渲染，从而生成更干净、更高效的代码。该功能已在 <code>Instagram</code> 中使用，展示了其在生产环境中的有效性。</p><p><u>好处</u>：</p><ul><li><strong>自动优化</strong>：<code>React</code> 编译器自动处理重新渲染，减少手动干预的需要。</li><li><strong>更简洁的代码</strong>：开发人员可以编写更简单、更具可读性的代码，而无需担心性能优化。</li><li><strong>在生产中得到验证</strong>：已在 <code>Instagram</code> 中使用，确保其可靠性和性能优势。</li></ul><p><u>例子</u>：</p><p>在 <code>React 19</code> 之前：</p><div class="language-react line-numbers-mode" data-ext="react"><pre class="language-react"><code>import React, { useMemo, useCallback } from &#39;react&#39;;

function ExpensiveComponent({ data, onItemClick }) {
  const processedData = useMemo(() =&gt; {
    // Expensive computation
    return data.map(item =&gt; item * 2);
  }, [data]);

  const handleClick = useCallback((item) =&gt; {
    onItemClick(item);
  }, [onItemClick]);

  return (
    &lt;ul&gt;
      {processedData.map(item =&gt; (
        &lt;li key={item} onClick={() =&gt; handleClick(item)}&gt;{item}&lt;/li&gt;
      ))}
    &lt;/ul&gt;
  );
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>使用 <code>React 19</code>：</p><div class="language-react line-numbers-mode" data-ext="react"><pre class="language-react"><code>import React from &#39;react&#39;;

function ExpensiveComponent({ data, onItemClick }) {
  const processedData = data.map(item =&gt; item * 2);

  return (
    &lt;ul&gt;
      {processedData.map(item =&gt; (
        &lt;li key={item} onClick={() =&gt; onItemClick(item)}&gt;{item}&lt;/li&gt;
      ))}
    &lt;/ul&gt;
  );
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在此示例中，<code>React 19</code> 编译器将自动优化重新渲染，从而无需手动使用 <code>useMemo</code> 和 <code>useCallback</code>。</p></li><li><h4 id="服务器组件-增强-seo-和初始加载速度" tabindex="-1"><a class="header-anchor" href="#服务器组件-增强-seo-和初始加载速度" aria-hidden="true">#</a> 服务器组件：增强 <code>SEO</code> 和初始加载速度</h4><p><u>当前的问题</u>：客户端组件可能会限制 <code>SEO</code> 效果并增加初始加载时间。</p><p><u>解决</u>：借助服务器组件，<code>React</code> 现在可以在服务器端运行组件，从而加快初始页面加载速度并改进 <code>SEO</code>。</p><p><u>好处</u>：</p><ul><li><strong>更快的初始加载</strong>：通过在服务器上渲染组件，初始加载时间显着缩短。</li><li><strong>改进的 <code>SEO</code></strong>：服务器端渲染通过向搜索引擎提供完全渲染的 HTML 来增强 <code>SEO</code>。</li><li><strong>无缝执行</strong>：服务器端和客户端渲染之间的过渡是无缝的，提供流畅的用户体验。</li></ul><p><u>例子</u>：</p><div class="language-react line-numbers-mode" data-ext="react"><pre class="language-react"><code>// UserProfile.server.js
import { db } from &#39;./database&#39;;

async function UserProfile({ userId }) {
  const user = await db.user.findUnique({ where: { id: userId } });

  return (
    &lt;div&gt;
      &lt;h1&gt;{user.name}&lt;/h1&gt;
      &lt;p&gt;Email: {user.email}&lt;/p&gt;
      &lt;p&gt;Member since: {user.createdAt}&lt;/p&gt;
    &lt;/div&gt;
  );
}

export default UserProfile;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在此示例中，<code>UserProfile</code> 组件是一个服务器组件。它直接从服务器上的数据库获取用户数据，呈现 <code>HTML</code>，并将其发送到客户端。这可以缩短初始加载时间和提高 <code>SEO</code>，因为内容可立即在 <code>HTML</code> 中获取。</p></li><li><h4 id="actions-简化表单处理" tabindex="-1"><a class="header-anchor" href="#actions-简化表单处理" aria-hidden="true">#</a> <code>Actions</code>：简化表单处理</h4><p><u>当前的问题</u>：表单提交仅限于客户端事件，这可能会使同步和异步操作的处理变得复杂。</p><p><u>解决</u>：<code>Actions</code> 取代了 <code>onSubmit</code> 事件，允许在服务器端执行表单处理。这种简化可以实现更稳健、更高效的数据提交管理。</p><p><u>好处</u>：</p><ul><li><strong>服务器端执行</strong>：现在可以在服务器端处理表单，从而更轻松地管理数据提交。</li><li><strong>简化管理</strong>：<code>Actions</code> 简化了表单处理，降低了与客户端表单提交相关的复杂性。</li><li><strong>支持异步操作</strong>：轻松处理表单内的同步和异步操作。</li></ul><p><u>例子</u>：</p><div class="language-react line-numbers-mode" data-ext="react"><pre class="language-react"><code>// LoginForm.js
import { useFormState } from &#39;react-dom&#39;;

function LoginForm() {
  const [state, formAction] = useFormState(loginAction, { error: null });

  return (
    &lt;form action={formAction}&gt;
      &lt;input type=&quot;email&quot; name=&quot;email&quot; required /&gt;
      &lt;input type=&quot;password&quot; name=&quot;password&quot; required /&gt;
      &lt;button type=&quot;submit&quot;&gt;Log in&lt;/button&gt;
      {state.error &amp;&amp; &lt;p&gt;{state.error}&lt;/p&gt;}
    &lt;/form&gt;
  );
}

// loginAction.js
async function loginAction(prevState, formData) {
  const email = formData.get(&#39;email&#39;);
  const password = formData.get(&#39;password&#39;);

  try {
    await authenticateUser(email, password);
    return { error: null };
  } catch (error) {
    return { error: &#39;Invalid credentials&#39; };
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在此示例中，<code>loginAction</code> 在服务器上执行，处理身份验证过程并返回结果以更新表单状态。</p></li><li><h4 id="web-组件-更轻松地集成到-react-中" tabindex="-1"><a class="header-anchor" href="#web-组件-更轻松地集成到-react-中" aria-hidden="true">#</a> <code>Web</code> 组件：更轻松地集成到 <code>React</code> 中</h4><p><u>当前的问题</u>：将 <code>Web</code> 组件集成到 <code>React</code> 中非常复杂，通常需要额外的包和代码转换。</p><p><u>解决</u>：<code>React 19</code> 简化了 <code>Web</code> 组件的合并，无需额外的包即可无缝集成。</p><p><u>好处</u>：</p><ul><li><strong>无缝集成</strong>：轻松将 <code>Web</code> 组件集成到 <code>React</code> 项目中，无需额外开销。</li><li><strong>无需额外的软件包</strong>：无需额外的软件包或复杂的代码转换。</li><li><strong>利用现有组件</strong>：开发人员可以轻松地在其 <code>React</code> 应用程序中使用现有的 <code>Web</code> 组件。</li></ul><p><u>例子</u>：</p><div class="language-react line-numbers-mode" data-ext="react"><pre class="language-react"><code>import React from &#39;react&#39;;

function App() {
  return (
    &lt;div&gt;
      &lt;h1&gt;My App&lt;/h1&gt;
      &lt;my-custom-element&gt;
        This is a web component in React
      &lt;/my-custom-element&gt;
    &lt;/div&gt;
  );
}

export default App;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在此示例中， <code>&lt;my-custom-element&gt;</code> 是一个 <code>Web</code> 组件，现在可以直接在 <code>React</code> 组件中使用，无需任何额外的包装器或库。</p></li><li><h4 id="文档元数据-react-组件中的直接管理" tabindex="-1"><a class="header-anchor" href="#文档元数据-react-组件中的直接管理" aria-hidden="true">#</a> 文档元数据：React 组件中的直接管理</h4><p><u>当前的问题</u>：管理标题和元标签等元数据通常需要额外的库，从而增加了项目的复杂性。</p><p><u>解决</u>：<code>React 19</code> 允许开发人员直接在 <code>React</code> 组件中管理文档元数据，从而简化流程并增强 <code>SEO</code> 和可访问性。</p><p><u>好处</u>：</p><ul><li><strong>简化元数据管理</strong>：直接管理 React 组件内的元数据，无需依赖外部库。</li><li><strong>增强的 <code>SEO</code></strong>：改进元数据管理有助于更好的 <code>SEO</code>。</li><li><strong>更好的可访问性</strong>：直接管理文档元数据可以增强应用程序的可访问性。</li></ul><p><u>例子</u>：</p><div class="language-react line-numbers-mode" data-ext="react"><pre class="language-react"><code>import React from &#39;react&#39;;
import { Metadata } from &#39;react&#39;;

function ProductPage({ product }) {
  return (
    &lt;&gt;
      &lt;Metadata&gt;
        &lt;title&gt;{product.name} | My Store&lt;/title&gt;
        &lt;meta name=&quot;description&quot; content={product.description} /&gt;
        &lt;meta property=&quot;og:title&quot; content={product.name} /&gt;
        &lt;meta property=&quot;og:description&quot; content={product.description} /&gt;
        &lt;meta property=&quot;og:image&quot; content={product.imageUrl} /&gt;
      &lt;/Metadata&gt;
      &lt;h1&gt;{product.name}&lt;/h1&gt;
      &lt;p&gt;{product.description}&lt;/p&gt;
      &lt;img src={product.imageUrl} alt={product.name} /&gt;
    &lt;/&gt;
  );
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在此示例中，元数据组件允许直接管理 <code>React</code> 组件内的文档元数据，从而改进 <code>SEO</code> 和可访问性，而无需外部库。</p></li></ul>`,2),b={href:"https://react.dev/blog/2024/04/25/react-19#whats-new-in-react-19",target:"_blank",rel:"noopener noreferrer"},g=e("h3",{id:"如何升级",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#如何升级","aria-hidden":"true"},"#"),n(" 如何升级")],-1),h={href:"https://zh-hans.react.dev/blog/2024/04/25/react-19-upgrade-guide",target:"_blank",rel:"noopener noreferrer"},f=e("code",null,"React 19",-1),_=e("code",null,"React 19",-1),R=t('<h3 id="结论" tabindex="-1"><a class="header-anchor" href="#结论" aria-hidden="true">#</a> 结论</h3><p><code>React 19</code> 引入了一系列新功能，旨在简化开发并提高应用程序的性能。从使用新 <code>React</code> 编译器进行自动重新渲染优化，到无缝集成 <code>Web</code> 组件以及使用 <code>Actions</code> 改进表单处理，这些功能将改变我们使用 <code>React</code> 构建的方式。通过解决当前的挑战并提供强大的解决方案，<code>React 19</code> 可确保您的项目高效、可扩展且可维护。</p><p>请继续关注正式版本并开始探索这些新功能，将您的 <code>React</code> 开发提升到新的水平！</p>',3);function x(k,q){const i=s("ExternalLinkIcon");return c(),a("div",null,[e("p",null,[e("a",o,[u,d(i)]),n(" 不断发展，为开发人员提供强大的工具来构建动态高效的 Web 应用程序。随着 "),v,n(" 正式版即将发布，一些突破性的功能将彻底改变我们使用 "),m,n(" 进行开发的方式。在这篇文章中，我们将探讨这些新功能，重点介绍它们的优势以及它们如何应对现有挑战，并通过示例来说明每个概念。")]),p,e("p",null,[n("➡️有关更多信息和示例，请参阅"),e("a",b,[n("官方文档"),d(i)]),n("。")]),g,e("p",null,[n("请查看 "),e("a",h,[f,n(" 升级指南"),d(i)]),n(" 以获取逐步指导您完成升级到 "),_,n(" 的步骤。")]),R])}const y=l(r,[["render",x],["__file","React19MajorUpdatesGuide.html.vue"]]);export{y as default};
