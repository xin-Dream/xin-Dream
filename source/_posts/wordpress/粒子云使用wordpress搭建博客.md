---
layout: post
title: 粒子云使用wordpress搭建博客
date: 2022-01-02 15:26:41
author: ZGX
tags:
  - wordpress
categories:
  - wordpress
top: 
typora-root-url: ../..
---

# 1. 粒子云中wordpress的设置

一开始进去后要进行初始化设置

> 数据库名可以使用默认，他会默认在数据库创建wordpress数据库
> 用户名：root
> 密码：123456
> 其余默认

这里如果创建失败，可以进入数据库自己创建wordpress。

后面的设置就没什么要注意的了。

# 2. 取消设置wordpress更新时的ftp

在wordpress根目录中修改如下文件：wp-config.php

wordpress的根目录已经移动到了硬盘的wwwroot中。

```
# 在文件最后添加

define("FS_METHOD","direct");

define("FS_CHMOD_DIR", 0777);

define("FS_CHMOD_FILE", 0777);
```