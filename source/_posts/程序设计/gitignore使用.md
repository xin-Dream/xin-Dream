---
layout: post
title: gitignore使用
date: 2022-01-01 19:39:57
tauthor: ZGX
tags:
  - Git
categories:
  - 程序设计
    - git
top: 
typora-root-url: ../..
---

根目录下的.gitignore用于管理不上传git的文件
</br>
</br>

```
# 这是注释内容

# 所有jpg格式文件
*.jpg

# 不忽略a.jpg
!main.jpg

# 忽略所有build目录下内容
build/

# 忽略根目录下的main.jpg
/main.jpg

# 忽略images/main.jpg
images/main.jpg

```