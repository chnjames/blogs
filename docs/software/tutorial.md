# 使用教程

## Typora+PicGo+Github搭建图床

### 简介

PicGo下载地址：https://github.com/Molunerfinn/PicGo

Typora下载地址：https://typora.io

**一个用于快速上传图片并获取图片 URL 链接的工具**

PicGo 本体支持如下图床：

`GitHub`、`七牛图床`、`腾讯云 COS v4\v5 版本`、`又拍云`、`SM.MS V2`、`阿里云 OSS`、`Imgur`等。

### GIthub操作

1. **新建Public Github仓库**
   1. 创建Repository
   2. 点击"New repository"按钮，仓库名字随意
2. **新生成一个Personal access tokens**
   1. 生成一个Token用于操作GitHub repository
      `Settings --> Developer Settings --> Personal access tokens`
   2. 勾选repo权限,填写描述然后点击"Generate token"按钮
   3. 生成Token

### PicGo配置

![PicGo-Server配置](https://raw.githubusercontent.com/chnjames/cloudImg/main/image-20210224104844303.png)

1. 配置Github图床

   1. ![PicGo配置](https://raw.githubusercontent.com/chnjames/cloudImg/main/20210224103532.png)

      填写说明：

      - 第一行设定仓库名按照“账户名/仓库名的格式填写”，比如我的是：`chnjames/cloudImg`
      - 第二行分支名统一填写`main`
      - 第三行将之前的`Token`粘贴在这里
      - 第四行留空
      - 第五行自定义域名的作用是在上传图片后成功后，`PicGo`会将“自定义域名+上传的图片名”生成的访问链接，放到剪切板上，自定义域名需要按照这样去填写：`https://raw.githubusercontent.com/账户名/仓库名/main`

### Typora配置PicGo

![Typora配置](https://raw.githubusercontent.com/chnjames/cloudImg/main/image-20210224105132603.png)

### 错误排查
##### 错误零：PicGo相册看不到照片

`解决办法`：修改hosts     C:\Windows\System32\drivers\etc\hosts

在文件末尾添加：

`151.101.184.133    raw.githubusercontent.com`

这个地址也会有所变动，需要自己查找最新的IP地址，

查询网站：https://tool.chinaz.com/nslookup

![站长工具](https://raw.githubusercontent.com/chnjames/cloudImg/main/20210224111200.png)

##### 错误一：Failed to fetch

![错误一](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9naXRlZS5jb20vbGVvbkc3L2Jsb2dJbWFnZS9yYXcvbWFzdGVyL2ltZy8yMDIwMDMxODE0NDc0NC5wbmc?x-oss-process=image/format,png)

**端口设置错误**造成

`解决方法`：打开picgo设置，点击设置Server选项，**将端口改为36677端口**，这是picgo推荐的默认端口号，然后保存，成功

##### 错误二：Failed to fetch：端口冲突，**picgo自动帮你把36677端口改为366771端口**，导致错误

`解决方法`：**先把picgo中的端口设置改回36677，然后退出所有picgo程序**，再使用typora上传功能（会自动启动picgo程序）

##### 错误三：{“success”,false}

![错误三](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9naXRlZS5jb20vbGVvbkc3L2Jsb2dJbWFnZS9yYXcvbWFzdGVyL2ltZy8yMDIwMDMxODE0MjYyMy5wbmc?x-oss-process=image/format,png)

原因：**文件名冲突**

`解决办法`：打开picgo设置，将**【时间戳重命名】打开**



## XMind破解教程

XMind破解方法：

- 在电脑系统属性中，环境变量-->系统变量
- 新建变量名为：VANA_LICENSE_TO，内容为任意，即可变成激活版

![XMind](https://user-images.githubusercontent.com/44110547/134835262-f256e19c-1334-412e-8236-e31bb3a68b89.png)

## NVM：使用nvm安装管理node版本

1. 下载NVM，下载完成后直接安装

   下载地址：https://github.com/coreybutler/nvm-windows/releases/download/1.1.9/nvm-setup.exe

2. 安装成功后，执行该命令，查看安装版本

   ```shell
   nvm v
   // 或
   nvm version 
   ```

   

   ![image-20220609100338028](https://raw.githubusercontent.com/chnjames/cloudImg/main/blog/202206091003956.png)

3. 常用命令

   - nvm ls 查看已经安装的所有nodejs版本
   - nvm install 版本号，可安装指定版本的nodejs
   - nvm use 版本号，即可切换到指定版本
   - nvm uninstall 版本号，卸载指定版本

4. node安装

   ```shell
   // 安装最新版本
   nvm install node
   // 安装指定版本(推荐)
   nvm install 14.18.0
   // 安装指定版本，指定操作系统位数(32/64),不指定使用系统默认
   nvm install 14.18.0 64
   ```

   

5. 查看已安装node版本

   ```shell
   nvm ls
   // 或
   nvm list
   ```

   

6. 使用指定版本node

   ```shell
   // 14.18.0 是版本号
   nvm use 14.18.0
   
   // 指定操作系统位数(32/64)，不指定使用系统默认
   nvm use 14.18.0 64
   ```
