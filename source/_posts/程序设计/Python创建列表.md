---
title: Python创建列表
date: 2021-05-13 21:16:17
tags: 
    [Python] 
categories: 
    [程序设计,Python]
---

```python
list1=[None]*5
```
使用这种方式创建一个普通的一维列表是没问题的
可以检测一下

```python
list1=[None]*5
list1[3]=1
print(list1)

[None, None, None, 1, None]
```
但是，当用这种方式创建一个多维列表时，就会出现以下问题

```python
list2=[[None]*5]*5\
list2[2][3] = 1
print(list2)

[[None, None, None, 1, None], [None, None, None, 1, None],
 [None, None, None, 1, None], [None, None, None, 1, None],
 [None, None, None, 1, None]]
```
这样创建出的多维列表，修改其中一个子列表中元素时，所有子列表的相应元素都会改变。
查阅官方文档发现，这种创建的列表只是对一个子列表的引用，所以子列表改变，其余子列表也都会改变

解决办法就是换一种创建方法，下列几种方案：

```python
list1=[[0,0,0],[0,0,0]]
#数据量少的时候这个办法还可以,而且不会出错

list2=[[None for i in range(4)] for i in range(3)]
#使用for循环创建一个列表，原理上和上一种是一样的
#可以验证一下
lis2[0][1]=1
print(list2)

[[None, 1, None, None], [None, None, None, None],
 [None, None, None, None]]

#再就是用numpy数组，这个在深度学习中经常用
list3=np.zeros((3,4))
```
