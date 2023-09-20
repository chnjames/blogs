import{_ as e,p as o,q as d,Y as c}from"./framework-c56ab46b.js";const p={},i=c(`<blockquote><p>不适用于所有小程序，请自知。</p></blockquote><p>为了学习微信小程序开发、看看大厂的前端大神如何规避小程序的各种奇葩的坑，于是就想到获取小程序的源文件，然后再对其进行反编译还原为源代码，来作为学习参考。</p><h3 id="了解" tabindex="-1"><a class="header-anchor" href="#了解" aria-hidden="true">#</a> 了解</h3><ul><li><p><code>_xxxx.wxapkg</code>是什么？</p><ul><li>微信小程序的源文件，存放在微信的服务器上。当我们使用一个微信小程序的时候，其实是微信将它从服务器上下载到手机上，然后再来运行的，所以按照这个逻辑，我们是可以从<code>手机本地存储</code>找到这个已经下载过的小程序源文件。</li><li><code>.wxapkg</code>是一个二进制文件，有其自己的一套结构。</li></ul></li><li><p>小程序的源文件在哪里？</p><p>以安卓手机为例：</p><p>具体目录位置：</p><p><code>/data/data/com.tencent.mm/MicroMsg/{16进制字符}/appbrand/pkg/</code></p><p>在这个目录下，会有一些<code>_xxxx.wxapkg</code>类型的文件，这些就是微信小程序的包。但是这个目录，用手机自带的文件管理器肯定是不行的，<code>安卓</code>或<code>iPhone</code>都要使用第三方的文件管理器。</p><p>推荐：<code>RE文件管理器</code>。</p><p><strong>微信小程序的格式：<code>.wxapkg</code></strong></p><blockquote><p>重要说明：虽然微信小程序的包后缀是<code>.wxapkg</code>，但有一些包的依赖后缀也是<code>.wxapkg</code>，所以真正的小程序包大小为<code>1M</code>左右，而依赖包大小<code>2、3M</code>甚至更多。</p><p>报错：<code>Error: This Package is unrecognizable, please decrypted every type of file by hand.</code>可能就是这个没找对包的问题。</p></blockquote></li></ul><h3 id="准备" tabindex="-1"><a class="header-anchor" href="#准备" aria-hidden="true">#</a> 准备</h3><ul><li><p><code>Node.js</code>运行环境（安装）</p><p>地址：https://nodejs.org/zh-cn/</p></li><li><p>反编译脚本（下载）</p><p>地址：https://github.com/chnjames/wxappUnpacker</p><p><em>下载路径最好不要使用中文路径，否则会引起一些<code>BUG</code></em></p></li><li><p>安卓模拟器（要求自带<code>root</code>权限、下载）</p><p><code>夜神模拟器</code>：https://www.yeshen.com/</p></li><li><p>安卓 RE管理器（下载）</p><p>地址：https://www.ghxi.com/rootexplorer.html?btwaf=64176763</p></li></ul><h3 id="详细步骤-使用安卓模拟器获取-wxapkg文件" tabindex="-1"><a class="header-anchor" href="#详细步骤-使用安卓模拟器获取-wxapkg文件" aria-hidden="true">#</a> 详细步骤（使用安卓模拟器获取<code>.wxapkg</code>文件）</h3><ol><li><p>打开安装好的安卓模拟器，并在模拟器中安装<code>微信</code>、<code>RE管理器</code>。</p></li><li><p>设置模拟器：</p><p><em>设置 =&gt; 超级用户 =&gt; 超级用户设置 =&gt; 自动响应：选择允许</em></p><p>操作目的：为了能让<code>RE管理器</code>顺利获取到<code>ROOT</code>权限。</p><p><img src="https://raw.githubusercontent.com/chnjames/cloudImg/main/blog/202309081710986.png" alt="设置模拟器"></p></li><li><p>在模拟器中打开微信，然后在微信中运行想要获取的小程序（为了将小程序的源文件包微信服务器下载到本地）。</p></li><li><p>在<code>RE管理器</code>中找到需要的源文件包，长按文件，然后点击右上角选项选择压缩所选文件，再将压缩文件通过<code>微信</code>或其他方式发送到你使用的这台电脑<code>我的电脑</code>中。</p></li><li><p>解压文件，这样就在此电脑中拿到了小程序的源文件。</p></li><li><p>打开<code>Node.js</code>命令窗口或者本地<code>CMD</code>命令窗口，用<code>cd</code>命令进入到刚才下载的<strong>反编译脚本目录</strong>下，运行命令安装依赖：<code>npm install</code>。</p></li><li><p>然后运行命令，进行反编译<code>.wxapkg</code>文件：</p><div class="language-cmd line-numbers-mode" data-ext="cmd"><pre class="language-cmd"><code>node wuWxapkg.js [-d] &lt;files&gt;

# 举个栗子
node .\\wuWxapkg.js D:\\_xxxx.wxapkg
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>回车运行，反编译脚本会将<code>.wxapkg</code>文件还原为微信开发者工具能够运行的源文件，目录地址和反编译的文件地址一致。</p></li><li><p>到这一步，如果运行顺利的话，就结束了。</p></li></ol><h3 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h3><p>小程序作为微信生态内的新生力量，备受官方、开发者和内容创业者的期望。但在考虑代码安全性的情况下，我们必须谨慎思考它的获取方式，因为未来这些方式可能会受到限制。小程序源代码的容易获取问题确实存在一些潜在的安全隐患。然而，现在的小程序开发框架采用像 Babel 这样的打包工具，将 JavaScript 逻辑代码混合在一个文件中并进行转编译，使其变得难以理解。这意味着即使源码被获取，也很难分辨出其内部细节。</p>`,10),a=[i];function l(n,t){return o(),d("div",null,a)}const s=e(p,[["render",l],["__file","MiniProgramDecompilation.html.vue"]]);export{s as default};
