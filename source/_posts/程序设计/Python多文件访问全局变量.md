---
title: Python多文件访问全局变量
date: 2021-06-13 22:24:20
tags: 
    [Python] 
categories: 
    [程序设计,Python]
---

在Python文件中不能像C语言文件一样包含头文件，所以多文件中的全局变量比较复杂
 
1. 单独建立一个变量管理的文件--variable_manage.py

```Python
#这里不能创建对象，创建对象的话还是做不到数据的共享，每个文件还要单独创建各自的对象
def init():
    global time1

    time1 = 20

# 创建time1变量的get方法和set方法
def time1_getter():
    global time2
    return time2

def time1_setter(num):
    global time2
    time2 = num
    return 1
 
```
2. 在程序开始时初始化变量

```Python
import variable_manage as val

val.init()

```

3. 在其他文件中使用方法

```python
import variable_manage as val

time1_getter()

time1_setter(30)
```