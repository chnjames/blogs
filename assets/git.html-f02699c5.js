import{_ as e,p as i,q as d,Z as c}from"./framework-1749bed7.js";const o={},t=c('<h1 id="git操作手册" tabindex="-1"><a class="header-anchor" href="#git操作手册" aria-hidden="true">#</a> <code>Git</code>操作手册</h1><h2 id="基本操作流程" tabindex="-1"><a class="header-anchor" href="#基本操作流程" aria-hidden="true">#</a> 基本操作流程</h2><ul><li><p><code>git status</code>：查看本次的修改、新建、删除等信息</p><ul><li><code>new file</code>：新建文件</li><li><code>modified</code>：修改文件</li><li><code>deleted</code>：删除文件</li></ul></li><li><p><code>git pull</code>：拉取代码</p></li><li><p><code>git add .</code>：添加所有即将提交的文件</p></li><li><p><code>git add fileNamePath</code>：添加某个文件</p></li><li><p><code>git commit - &#39;提交的日志&#39;</code>：提交到本地</p></li><li><p><code>git push</code>：提交到<code>git</code>服务器</p></li><li><p><code>git commit -a -m &#39;提交的日志&#39;</code>：添加所有即将提交的文件并提交到本地</p><p><code>git commit -a -m</code>相当于<code>git add .</code>和<code>git commit -&#39;&#39;</code>命令的集合</p></li></ul><h2 id="git暂存" tabindex="-1"><a class="header-anchor" href="#git暂存" aria-hidden="true">#</a> <code>git</code>暂存</h2><ul><li><code>git stash</code>：暂存（存储到本地，并将项目本次操作还原）</li><li><code>git stash pop</code>：使用上一次暂存，并将这个暂存删除，使用该命令后，如果有冲突，终端会显示，如果有冲突需要先解决冲突（这就避免了冲突提交到服务器，将冲突留在本地，然后解决）</li><li><code>git stash list</code>：查看所有的暂存</li><li><code>git stash clear</code>：清空所有的暂存</li><li><code>git stash drop [-q|--quiet] [&lt;stash&gt;]</code>：删除某一个暂存，在中括号里面放置需要删除的暂存ID</li><li><code>git stash apply</code>：使用某个暂存，但是不会删除这个暂存</li></ul><h2 id="暂存代码找回" tabindex="-1"><a class="header-anchor" href="#暂存代码找回" aria-hidden="true">#</a> 暂存代码找回</h2><p><code>git fsck --lost-found</code>命令找出刚才删除的分支里面的提交对象。</p><p>然后使用<code>git show</code>命令查看是否正确，如果正确使用<code>git merge</code>命令找回。</p>',8),l=[t];function a(s,h){return i(),d("div",null,l)}const p=e(o,[["render",a],["__file","git.html.vue"]]);export{p as default};