---
title: C/C++混合编译要注意的问题
date: 2021-09-08 12:46:22
tags: 
    [C/C++] 
categories: 
    [程序设计,C/C++]
---

# 1. undefined reference to

C++代码调用C语言库的时候，应在调用头文件的时候添加声明，如下
```cpp
extern "C"{
    #include "test.h"
}
```
