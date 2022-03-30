---
layout: post
title: pyinstaller使用
date: 2022-01-01 16:28:59
author: ZGX
tags:
  - python
categories:
  - 程序设计
  - python
top: 
typora-root-url: ../..
---

# 1. 安装

```bash
pip install pyinstaller
```

# 2. 使用

以文件main.py为例

```bash
pyinstaller main.py

pyinstaller -F main.py
# 产生单个可执行文件

pyinstaller -F -w main.py
# 产生单个可执行文件，并且没有控制台窗口
# 如果是想打包成windows中的软件需要用-w

pyinstaller -D main.py
# 产生一个目录作为可执行程序

pyinstaller -i ./logo.ico main.py
# 指定图标

```

# 3. 注意

1. 在Ubuntu系统中生成的是可执行文件，windows中生成的是.exe文件
2. 打包时尽量减轻环境，否则打包文件很大，可以使用虚拟环境或conda新建一个环境