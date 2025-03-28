# 【版本控制】Git快速上手

> 作者：[观止.](https://blog.csdn.net/m0_66570338)，[编程导航星球](https://wx.zsxq.com/dweb2/index/group/51122858222824) 编号 6872

## 一.引入

### (1) 作用

  Git 是一个分布式版本控制系统，主要是用于管理开发过程中的源代码文件（Java类，xml文件，html页面等）。可用于**代码回溯，版本切换，多人协作开发，远程备份**等场景。

### (2) 整体工作流程

  文件通过Git仓库来储存和管理，Git仓库分为两种：

- 本地仓库：开发人员自己电脑上的Git仓库
- 远程仓库：远程服务器上的Git仓库

整体工作流程如下：

![img](https://pic.yupi.icu/5563/202312201922520.png) 各个命令作用如下：

![img](https://pic.yupi.icu/5563/202312201922501.png)

### (3) 代码托管服务

  我们可以直接借助互联网上的一些代码托管服务来搭建远程仓库，例如gitee，github等，由于gitee服务器在国内，访问速度较快，此处建议使用gitee作为远程仓库。

## 二.初始化

### (1) 全局设置

  当安装Git后首先要做的事情是设置用户名称和email地址，因为每次Git提交都会使用该用户的信息。
在Git命令行中执行下面命令：

- 设置用户信息

```GIt
 git config --global user.name "guanzhi"
 git config --global user.email "guanzhi"
```

- 查看配置信息

```lua
git config --list
```

### (2) 获取Git仓库

  要使用Git对我们的代码进行版本控制，首先需要获得Git仓库。获取Git仓库通常有两种方式:

1. 在本地初始化一个Git仓库（
2. 从远程仓库克隆

### (2.1) 本地创建

要使用Git对我们的代码进行版本控制，首先需要获得本地仓库

1. 在电脑的任意位置创建一个空目录（例如test）作为我们的本地Git仓库
2. 进入这个目录中，点击右键打开Git bash窗口
3. 在窗口执行命令git init
4. 如果创建成功后可在文件夹下看到隐藏的.git目录。

![img](https://pic.yupi.icu/5563/202312201922538.png)

### (2.2) 远程克隆

```sh
git clone 远程仓库url
```

### (3) 相关概念

- 版本库：.git隐藏文件夹就是版本库，版本库中存储了很多配置信息，日志信息和文件版本信息等
- 工作区： 包含.git文件夹的目录就是工作区，也称为工作目录，主要用于存放开发的代码
- 暂存区： .git文件夹中有很多文件，其中一个index文件就是缓存区，也可以叫做stage。暂存区是一个临时保存修改文件的地方。

Git工作区中的文件存在两种状态

1. untracked 未跟踪 （未被纳入版本控制）
2. trackend 已跟踪（被纳入版本控制）
   - Unmodified 未修改状态
   - Modified 已修改状态
   - Staged 已暂存状态

注意：这些文件的状态会随着我们执行Git的命令发生变化。

![img](https://pic.yupi.icu/5563/202312201922603.png)

## 三.常用命令

### (1) 本地仓库操作

### (1.1) 查看修改的状态

作用：查看的修改的状态（暂存区、工作区）
命令形式：

```git
git status
```

### (1.2) 添加工作区到暂存区

作用：添加工作区一个或多个文件的修改到暂存区
命令形式：

```routeros
git add 单个文件名
```

- 将所有修改加入暂存区：

```routeros
git add .
或
git add *
```

### (1.3) 提交暂存区到本地仓库

作用：提交暂存区内容到本地仓库的当前分支
命令形式：

```nginx
git commit -m '注释内容'
```

### (1.4) 查看提交日志

作用:查看提交记录 命令形式：

```1c
git log
```

### (1.5) 版本回退

作用：版本切换，当前所有的代码都会回滚到切换到的版本所处状态 命令形式：

```pgsql
git reset --hard commitID
```

commitID可以使用git log指令查看

![img](https://pic.yupi.icu/5563/202312201922709.png) git reflog 这个指令可以看到已经删除的提交记录

### (2) 远程仓库操作

### (2.1) 添加远程仓库

  此操作需先初始化本地库，然后与已创建的远程库进行对接。
命令：

```routeros
git remote add 远端名称 仓库路径  
```

远端名称:默认是origin，取决于远端服务器设置
仓库路径:从远端服务器获取此URL

![img](https://pic.yupi.icu/5563/202312201922674.png)

### (2.2) 查看远程仓库

命令：

```sh
git remote 
或
git remote -v
```

![img](https://pic.yupi.icu/5563/202312201922881.png)

### (1.3) 克隆远程仓库到本地

  如果你想获得一份已经存在了的Git远程仓库的拷贝，git可以克隆该Git仓库服务器上的几乎所有数据（包括日志信息，历史记录等）。
克隆仓库的命令格式是：

```crmsh
git clone 仓库路径
```

### (1.4) 推送至远程仓库

需要先将文件commit给本地仓库管理，然后推送远程 命令：

```arcade
git push 远端名称 远端分支名称
```

  首次push到远程仓库可能需要进行身份验证，这是只需要输入注册托管平台的账号密码即可。

![img](https://pic.yupi.icu/5563/202312201922836.png)

### (1.5) 从远程仓库拉去

  git pull命令的作用是从远程仓库获取最新版本并合并到本地仓库。
命令格式:

```nginx
git pull 远端名称 远端分支名称
```

注意：如果当前本地仓库不是从远程仓库克隆，而是本地创建的仓库，并且仓库中存有文件，此时再从远程仓库拉去文件的时候会报错。（fatal:refusing to merge unrelated histories）
解决只需在命令后加入参数即可：

```ada
git pull 远端名称 远端分支名称 --allow-unrelate-histories 
```

### (3) 分支操作

### (3.1) 作用

  使用分支意味着你可以把你的工作从开发主线上分离开来，以免影响开发主线。同一个仓库可以有多个分支，各个分支相互独立，互不干扰。
我对此的理解是：主号开了个分身去练级，如果提高了可以融合回本体，如果bug了可以舍弃，完全不影响本体。
通过git init命令创建本地仓库时默认会创建一个master分支。

### (3.2) 查看分支

- 列出所有本地分支

```ebnf
git branch
```

- 列出所有远程分支

```ebnf
git branch -r
```

注：如果本地仓库是通过git init获得而不是克隆则无法查看到远程分支名称。输入如下指令后再查看即可：

```applescript
git remote update origin --prune   
# 更新远程主机origin 整理分支
```

- 列出所有本地分支和远程分支

```css
git branch -a
```

### (3.3) 创建分支

命令：

```mipsasm
git branch 分支名称
```

### (3.4) 切换分支

命令：

```nginx
git checkout 分支名称
```

![img](https://pic.yupi.icu/5563/202312201922859.png)

### (3.5) 推送至远程仓库分支

命令：

```arcade
git push 远端名称 分支名称
```

![img](https://pic.yupi.icu/5563/202312201922914.png)

### (3.6) 分支合并

命令：

```livecodeserver
git merge 被融合分支名称
# 首先checkout到一个分支。
# 然后选择将哪个分支融合于此。
```

- 解决冲突： 当两个分支上对文件的修改可能会存在冲突，例如同时修改了同一个文件的同一行，这时就需要手动解决冲突，解决冲突步骤如下：
  1.手动处理文件中冲突的地方，改成我们想要的样子
  2.将解决完冲突的文件加入暂存区(add)
  3.提交到仓库(commit)
  冲突部分的内容处理如下所示：

![img](https://pic.yupi.icu/5563/202312201922977.png)

### (3.7) 删除分支

- 删除分支时，可能需要做各种检查

```mipsasm
git branch -d 分支名称
```

- 不做任何检查，强制删除

```mathematica
git branch -D 分支名称
```

### (4) 标签操作

### (4.1) 作用

  Git中的标签，指的是某个分支某个特定时间点的状态。通过标签很方便的切换到标记时的状态（类似拍的一张照片，已经定格）。比较有代表的是人们会使用这个功能来标记发布结点（v1.0,v1.2等）。

![img](https://pic.yupi.icu/5563/202312201922920.png)

### (4.2) 查看已有标签

命令：

```crmsh
git tag
```

### (4.3) 创建标签

命令：

```crmsh
git tag 标签名称
```

### (4.4) 将标签推送至远程仓库

命令：

```arcade
git push 远端名称 标签名称
```

### (4.5) 检出标签

作用：将标签当时状态下载下来，获取当时状态下的代码。
命令：

```armasm
git checkout -b 创建新分支名称 当时状态标签名称
```

![img](https://pic.yupi.icu/5563/202312201922556.png)

## 四.在IDEA中操作Git

### (1) 在IDEA中配置Git

![img](https://pic.yupi.icu/5563/202312201922707.png)

### (2) 获取Git仓库

在IDEA中使用Git获取仓库有两种方式：

1. 本地初始化仓库

![img](https://pic.yupi.icu/5563/202312201922679.png)

![img](https://pic.yupi.icu/5563/202312201922893.png)

1. 从远程仓库克隆

![img](https://pic.yupi.icu/5563/202312201922880.png) 或者在初始界面：

![img](https://pic.yupi.icu/5563/202312201922973.png)

### (3) gitignore文件的作用

  告诉git项目中的哪些文件不需要git管理，例如.idea .iml target等等。

### (4) 本地仓库操作

### (4.1) 将文件加入暂存区

![img](https://pic.yupi.icu/5563/202312201922615.png)

### (4.2) 将暂存区的文件提交到到版本库

![img](https://pic.yupi.icu/5563/202312201922676.png) 常用：

![img](https://pic.yupi.icu/5563/202312201922596.png)

### (4.3) 查看日志

![img](https://pic.yupi.icu/5563/202312201922637.png)

![img](https://pic.yupi.icu/5563/202312201922783.png)

### (5) 远程仓库操作

### (5.1) 查看远程仓库&添加远程仓库

![img](https://pic.yupi.icu/5563/202312201922932.png)

### (5.2) 推送至远程仓库

![img](https://pic.yupi.icu/5563/202312201922510.png) 常用：

![img](https://pic.yupi.icu/5563/202312201922505.png)

### (5.3) 从远程仓库拉取

![img](https://pic.yupi.icu/5563/202312201922652.png) 常用：

![img](https://pic.yupi.icu/5563/202312201922558.png)

### (6) 分支操作

### (6.1) 查看分支

![img](https://pic.yupi.icu/5563/202312201922750.png) 常用：（在屏幕右下角）

![img](https://pic.yupi.icu/5563/202312201922769.png)

### (6.2) 创建分支

![img](https://pic.yupi.icu/5563/202312201922271.png)

### (6.3) 切换分支

![img](https://pic.yupi.icu/5563/202312201922265.png)

### (6.4) 将分支推送至远程仓库

![img](https://pic.yupi.icu/5563/202312201922370.png)

### (6.5) 合并分支

![img](https://pic.yupi.icu/5563/202312201922468.png)