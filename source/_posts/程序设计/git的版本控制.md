---
layout: post
title: git的版本控制
date: 2021-12-19 10:36:11
author: ZGX
tags:
  - Git
categories:
  - 程序设计
  - git
top: 
typora-root-url: ../..
---



# 前言

原理去看[文档](https://git-scm.com/book/zh/v2/起步-关于版本控制)

详细说明看：[Git恢复之前版本的两种方法reset、revert（图文详解）](https://blog.csdn.net/yxlshk/article/details/79944535)

# 1. 查看以往版本

```bash
git log		
```

![查看版本号](/images/git的版本控制/image-20211219163015002.png)

# 2. 回复到某个版本（撤销到某次提交）

注意：**恢复后，恢复到的版本之后提交的就都没了**

```bash
git reset --hard 版本号
# 版本号为上图红框标注部分
```

# 3. 回复某个版本（撤销某次提交）

```
git revert -n 版本号

git commit -m ""
```



# 3. 强制push

```bash
git push -f
```

