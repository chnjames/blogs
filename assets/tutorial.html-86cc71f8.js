import{_ as e,p as n,q as a,Y as s}from"./framework-c56ab46b.js";const i={},o=s(`<h1 id="使用教程" tabindex="-1"><a class="header-anchor" href="#使用教程" aria-hidden="true">#</a> 使用教程</h1><h2 id="typora-picgo-github搭建图床" tabindex="-1"><a class="header-anchor" href="#typora-picgo-github搭建图床" aria-hidden="true">#</a> Typora+PicGo+Github搭建图床</h2><h3 id="简介" tabindex="-1"><a class="header-anchor" href="#简介" aria-hidden="true">#</a> 简介</h3><p>PicGo下载地址：https://github.com/Molunerfinn/PicGo</p><p>Typora下载地址：https://typora.io</p><p><strong>一个用于快速上传图片并获取图片 URL 链接的工具</strong></p><p>PicGo 本体支持如下图床：</p><p><code>GitHub</code>、<code>七牛图床</code>、<code>腾讯云 COS v4\\v5 版本</code>、<code>又拍云</code>、<code>SM.MS V2</code>、<code>阿里云 OSS</code>、<code>Imgur</code>等。</p><h3 id="github操作" tabindex="-1"><a class="header-anchor" href="#github操作" aria-hidden="true">#</a> GIthub操作</h3><ol><li><strong>新建Public Github仓库</strong><ol><li>创建Repository</li><li>点击&quot;New repository&quot;按钮，仓库名字随意</li></ol></li><li><strong>新生成一个Personal access tokens</strong><ol><li>生成一个Token用于操作GitHub repository <code>Settings --&gt; Developer Settings --&gt; Personal access tokens</code></li><li>勾选repo权限,填写描述然后点击&quot;Generate token&quot;按钮</li><li>生成Token</li></ol></li></ol><h3 id="picgo配置" tabindex="-1"><a class="header-anchor" href="#picgo配置" aria-hidden="true">#</a> PicGo配置</h3><p><img src="https://raw.githubusercontent.com/chnjames/cloudImg/main/image-20210224104844303.png" alt="PicGo-Server配置"></p><ol><li><p>配置Github图床</p><ol><li><p><img src="https://raw.githubusercontent.com/chnjames/cloudImg/main/20210224103532.png" alt="PicGo配置"></p><p>填写说明：</p><ul><li>第一行设定仓库名按照“账户名/仓库名的格式填写”，比如我的是：<code>chnjames/cloudImg</code></li><li>第二行分支名统一填写<code>main</code></li><li>第三行将之前的<code>Token</code>粘贴在这里</li><li>第四行留空</li><li>第五行自定义域名的作用是在上传图片后成功后，<code>PicGo</code>会将“自定义域名+上传的图片名”生成的访问链接，放到剪切板上，自定义域名需要按照这样去填写：<code>https://raw.githubusercontent.com/账户名/仓库名/main</code></li></ul></li></ol></li></ol><h3 id="typora配置picgo" tabindex="-1"><a class="header-anchor" href="#typora配置picgo" aria-hidden="true">#</a> Typora配置PicGo</h3><p><img src="https://raw.githubusercontent.com/chnjames/cloudImg/main/image-20210224105132603.png" alt="Typora配置"></p><h3 id="错误排查" tabindex="-1"><a class="header-anchor" href="#错误排查" aria-hidden="true">#</a> 错误排查</h3><h5 id="错误零-picgo相册看不到照片" tabindex="-1"><a class="header-anchor" href="#错误零-picgo相册看不到照片" aria-hidden="true">#</a> 错误零：PicGo相册看不到照片</h5><p><code>解决办法</code>：修改hosts C:\\Windows\\System32\\drivers\\etc\\hosts</p><p>在文件末尾添加：</p><p><code>151.101.184.133 raw.githubusercontent.com</code></p><p>这个地址也会有所变动，需要自己查找最新的IP地址，</p><p>查询网站：https://tool.chinaz.com/nslookup</p><p><img src="https://raw.githubusercontent.com/chnjames/cloudImg/main/20210224111200.png" alt="站长工具"></p><h5 id="错误一-failed-to-fetch" tabindex="-1"><a class="header-anchor" href="#错误一-failed-to-fetch" aria-hidden="true">#</a> 错误一：Failed to fetch</h5><p><img src="https://imgconvert.csdnimg.cn/aHR0cHM6Ly9naXRlZS5jb20vbGVvbkc3L2Jsb2dJbWFnZS9yYXcvbWFzdGVyL2ltZy8yMDIwMDMxODE0NDc0NC5wbmc?x-oss-process=image/format,png" alt="错误一"></p><p><strong>端口设置错误</strong>造成</p><p><code>解决方法</code>：打开picgo设置，点击设置Server选项，<strong>将端口改为36677端口</strong>，这是picgo推荐的默认端口号，然后保存，成功</p><h5 id="错误二-failed-to-fetch-端口冲突-picgo自动帮你把36677端口改为366771端口-导致错误" tabindex="-1"><a class="header-anchor" href="#错误二-failed-to-fetch-端口冲突-picgo自动帮你把36677端口改为366771端口-导致错误" aria-hidden="true">#</a> 错误二：Failed to fetch：端口冲突，<strong>picgo自动帮你把36677端口改为366771端口</strong>，导致错误</h5><p><code>解决方法</code>：<strong>先把picgo中的端口设置改回36677，然后退出所有picgo程序</strong>，再使用typora上传功能（会自动启动picgo程序）</p><h5 id="错误三-success-false" tabindex="-1"><a class="header-anchor" href="#错误三-success-false" aria-hidden="true">#</a> 错误三：{“success”,false}</h5><p><img src="https://imgconvert.csdnimg.cn/aHR0cHM6Ly9naXRlZS5jb20vbGVvbkc3L2Jsb2dJbWFnZS9yYXcvbWFzdGVyL2ltZy8yMDIwMDMxODE0MjYyMy5wbmc?x-oss-process=image/format,png" alt="错误三"></p><p>原因：<strong>文件名冲突</strong></p><p><code>解决办法</code>：打开picgo设置，将**【时间戳重命名】打开**</p><h2 id="xmind破解教程" tabindex="-1"><a class="header-anchor" href="#xmind破解教程" aria-hidden="true">#</a> XMind破解教程</h2><p>XMind破解方法：</p><ul><li>在电脑系统属性中，环境变量--&gt;系统变量</li><li>新建变量名为：VANA_LICENSE_TO，内容为任意，即可变成激活版</li></ul><p><img src="https://user-images.githubusercontent.com/44110547/134835262-f256e19c-1334-412e-8236-e31bb3a68b89.png" alt="XMind"></p><h2 id="nvm-使用nvm安装管理node版本" tabindex="-1"><a class="header-anchor" href="#nvm-使用nvm安装管理node版本" aria-hidden="true">#</a> NVM：使用nvm安装管理node版本</h2><ol><li><p>下载NVM，下载完成后直接安装</p><p>下载地址：https://github.com/coreybutler/nvm-windows/releases/download/1.1.9/nvm-setup.exe</p></li><li><p>安装成功后，执行该命令，查看安装版本</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>nvm <span class="token function">v</span>
// 或
nvm version 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://raw.githubusercontent.com/chnjames/cloudImg/main/blog/202206091003956.png" alt="image-20220609100338028"></p></li><li><p>常用命令</p><ul><li>nvm ls 查看已经安装的所有nodejs版本</li><li>nvm install 版本号，可安装指定版本的nodejs</li><li>nvm use 版本号，即可切换到指定版本</li><li>nvm uninstall 版本号，卸载指定版本</li></ul></li><li><p>node安装</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>// 安装最新版本
nvm <span class="token function">install</span> <span class="token function">node</span>
// 安装指定版本<span class="token punctuation">(</span>推荐<span class="token punctuation">)</span>
nvm <span class="token function">install</span> <span class="token number">14.18</span>.0
// 安装指定版本，指定操作系统位数<span class="token punctuation">(</span><span class="token number">32</span>/64<span class="token punctuation">)</span>,不指定使用系统默认
nvm <span class="token function">install</span> <span class="token number">14.18</span>.0 <span class="token number">64</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>查看已安装node版本</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>nvm <span class="token function">ls</span>
// 或
nvm list
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>使用指定版本node</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>// <span class="token number">14.18</span>.0 是版本号
nvm use <span class="token number">14.18</span>.0

// 指定操作系统位数<span class="token punctuation">(</span><span class="token number">32</span>/64<span class="token punctuation">)</span>，不指定使用系统默认
nvm use <span class="token number">14.18</span>.0 <span class="token number">64</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ol>`,39),c=[o];function t(l,d){return n(),a("div",null,c)}const p=e(i,[["render",t],["__file","tutorial.html.vue"]]);export{p as default};