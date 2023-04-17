---
hideComments: false
---
# `Git`操作手册

## 基本操作流程

- `git status`：查看本次的修改、新建、删除等信息

  - `new file`：新建文件
  - `modified`：修改文件
  - `deleted`：删除文件

- `git pull`：拉取代码

- `git add .`：添加所有即将提交的文件

- `git add fileNamePath`：添加某个文件

- `git commit - '提交的日志'`：提交到本地

- `git push`：提交到`git`服务器

- `git commit -a -m '提交的日志'`：添加所有即将提交的文件并提交到本地

  `git commit -a -m`相当于`git add .`和`git commit -''`命令的集合

## `git`暂存

- `git stash`：暂存（存储到本地，并将项目本次操作还原）
- `git stash pop`：使用上一次暂存，并将这个暂存删除，使用该命令后，如果有冲突，终端会显示，如果有冲突需要先解决冲突（这就避免了冲突提交到服务器，将冲突留在本地，然后解决）
- `git stash list`：查看所有的暂存
- `git stash clear`：清空所有的暂存
- `git stash drop [-q|--quiet] [<stash>]`：删除某一个暂存，在中括号里面放置需要删除的暂存ID
- `git stash apply`：使用某个暂存，但是不会删除这个暂存

## 暂存代码找回

`git fsck --lost-found`命令找出刚才删除的分支里面的提交对象。

然后使用`git show`命令查看是否正确，如果正确使用`git merge`命令找回。