---
layout: post
title: Pycharm/Clion远程开发要注意的问题
date: 2021-11-14 21:15:30
tags: [远程开发]
categories: [杂项]
typora-root-url: ..\..
---

# 1 换行符

windows下的换行符为CRLF，Linux下为LF。当远程Linux时一定注意修改换行符。对单个文件可以在下方修改，全局修改在settings->Code Style->General->Line separator->Unix and macOS

# 2 编码格式

在文件开头添加编码声明

```python
# coding: utf -8	
```

# 3 指定解释器

这个并非只在远程时有用，在Linux中特别是ROS环境下，Python的版本比较复杂，对不同的文件，最好指定各自的解释器

```python
#!/usr/bin/python	
```

# 4 与远程文件同步

正常情况下，在设置了自动同步后，软件会自动完成文件上传，有时候有些编译生成的还会有些问题，在Tools->Deployment->sync with....中可以对比文件不同的细节

![image-20211115134520961](/images/Pycharm-Clion远程开发要注意的问题/image-20211115134520961.png)

# 5 在远程运行程序

一般的程序指定解释器后即可运行远程程序，但Jetbrains系列软件不能远程运行ROS程序。
