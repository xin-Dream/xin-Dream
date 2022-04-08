---
layout: post
title: git上传大文件
date: 2022-01-01 17:04:20
author: ZGX
tags:
  - Git
categories:
  - 程序设计
  - Git
top: 
typora-root-url: ../..
---

# 1. 下载并安装git-lfs
[下载地址](https://git-lfs.github.com/)

# 2. 添加管理文件

首先要完成这一步才能add 大文件

```bash
git lfs track "01-program/main"
# 01-program/main 表示相对于根目录，大文件的地址，main表示大文件

git add .gitattributes
git commit -m "add huge doc"
git push
```

# 3. 上传大文件

```bash
git add 01-program/main
git commit -m "push"
git push
```

# 4. 查看可用容量

git-lfs限制应该是1G，注意查看空间大小。

Settings -> Billing&plans -> Git LFS Data

