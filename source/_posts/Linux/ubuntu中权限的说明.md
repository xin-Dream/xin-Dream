---
title: ubuntu中权限的说明
date: 2021-07-26 10:37:06
tags: 
     
categories: 
    [Linux,ubuntu]
---

> 在ubuntu中可以修改串口、文件等权限自定义使用。在ROS中读取串口信息等也需要修改权限，本文主要介绍权限数字的含义。


# 1. chmod
chmod命令我们常用的是**chmod +x**、**chmod 666 a.py**等等。

```BASH
chmod +x 666

    +/-/= : 增加权限 / 取消权限 / 唯一设定权限

    x/w/r : 可执行   / 可写入   / 可读取 

```
# 2. 数字含义

## 1. 一个数字的含义
按照ubuntu中的定义，为不同权限赋值

```BASH
r(可读取) = 4
w(可写入) = 2
x(可执行) = 1

所以根据以上定义，可以将rwx自由组合，每种组合有一个唯一的数字和

rw  = 6
rx  = 5
wx  = 3
rwx = 7
```
## 2. 三个数字的含义

一个文件可能有不同的拥有者，一个串口对不同的使用者也有不同的权限，ubuntu中将使用者分为三类。
```BASH
u : User
g : Group
o : Other
```
所以三位数字分别代表ugo

# 3. 总结
```BASH
chmod +x a.py  # 为a.py增加可执行权限

chmod 666 a.py 
# -user-group-other
# -rw---rw----rw--
```


