---
title: '==和equal的区别'
date: 2021-08-01 21:53:00
tags: 
    [Android,Jetbrains] 
categories: 
    [程序设计,Android]
typora-root-url: ..\..
---
![image-20211118215254000](/images/和equal的区别/image-20211118215254000.png)
文中比较两字符串，发现==和equal的区别

# ==

1. 基本数据类型比较的是值
2. 引用数据类型比较的是地址
# equals()
1. equals()是Object类的方法，所有的类都继承自Object
2. Object类型定义equals()方法比较的是两个引用所指向的地址，所以如果一个类没有重写equals()方法，使用equals()方法的就是比较两个引用所指向的对象的地址。
3. 如果要比较两个对象中的属性是否相同，就需要重写equals（），比如我们知道的String就是已经重写了该方法