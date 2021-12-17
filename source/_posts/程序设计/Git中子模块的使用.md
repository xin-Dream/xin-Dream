---
layout: draft
title: Git中子模块的使用
author: ZGX
tags:
  - Git
categories:
  - 程序设计
  - git
date: 2021-12-14 21:24:00
---
# 参考

[Git中submodule的使用](https://zhuanlan.zhihu.com/p/87053283)

# 使用

上面的文章讲原理讲的很清楚了，后面只写一下使用的流程。

## 1. 添加

```bash
我的GitHub中有一个项目：Autobot
Arena的GitHub地址为：https://github.com/xin-dream/Arena.git

我在Autobot中可能会clone一个Arena
Autobot
	|
   |-Arena
   
git submodule add https://github.com/xin-dream/Arena.git ./Autobot/Arena
```
然后可以在根目录生成的 .gitmodules文件内查看子模块的关系

## 2. clone

当我在另一台电脑clone时，会发现Autobot的Arena文件夹内并没有内容。以下命令即可下载子模块内容。

```bash
git submodule init
git submodule update
```