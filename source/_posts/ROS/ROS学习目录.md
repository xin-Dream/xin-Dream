---
layout: post
title: ROS学习目录
date: 2022-01-21 21:32:30
tags: ROS
categories:
  - ROS
top: '0'
typora-root-url: ../..
---
# 前言

想了一段时间关于ROS学习的方式，如果是罗列出知识点，就跟网上很多现有的教程是重复的。最后我想列出一篇一个完整的ROS机器人设计任务，跟我的毕业设计说明书互相配合，类似习题册和答案的组合。本文在任务间会写出参考教程。

本文主要从一个机器人的三大方面开始，各个方面看上去是独立的，但是在机器人的整体设计时是互相联系的，这一点参考下面的设计说明书。

设计说明书：{% post_link ROS/Autobot-毕业设计 Autobot-毕业设计 %}

# 1. 结构

结构部分主要指机械结构，这是决定机器人的工作场景和工作方式。我目前主要集中在轮式机器人，机械臂部分在涉及到后会更新。

## 1.1 轮式机器人

对轮式机器人来说，比较重要的结构部分就是底盘。所以这一章需要广泛了解各类轮式机器人底盘，掌握不同底盘结构的特点和工作场景。

1. 了解有哪些常用的机器人底盘？其各有何特点？

    > 参考{% post_link ROS/Autobot-毕业设计 Autobot-毕业设计 %}：1.1.1 底盘结构设计

2. 选其中一种对其进行建模与分析

    > 参考{% post_link ROS/Autobot-毕业设计 Autobot-毕业设计 %}：1.1.2 差速模型分析

3. 了解轮式机器人中常用的电机类型并分别列举其特点

    > 参考{% post_link ROS/Autobot-毕业设计 Autobot-毕业设计 %}：1.2 电机选型

## 1.2 机械臂

# 2 硬件

## 2.1 单片机

1. 什么是单片机？单片机的分类？

    > 自己查资料，列举要点
    > 经常有人说先学51再学32,这一点是错的，他们之间没有必然联系。几年前是那样，是因为32参考资料较少，学起来不如51方便，但现在资料已经足够了，而且32的开发生态更加丰富。没有说32在任何情况下都比51好，但我们平时用的就是32方便。

2. stm32单片机的分类？不同类的特点

    > 主要针对stm32单片机的性能分类，了解之后可以确定后面从哪一款入手学习。


### 2.1.1 stm32单片机的基础部分

> 基础部分内容是逃不开的，无论什么形式，都要花时间才能理解，所以这一部分是比较耗时的。
> 
> 参考教程：
> 
> 1. [正点原子手把手教你学STM32单片机教学视频](https://www.bilibili.com/video/BV1Lx411Z7Qa?from=search&seid=17651868647906041339) :第1讲～第28讲外部中断实验+第31、32讲
> 2. [基于HAL库的STM32F407视频教程（硬石STM32）](https://www.bilibili.com/video/BV1yp411f7gs?from=search&seid=5970723847933395781&spm_id_from=333.337.0.0)：第1章～第13章
> 3. [硬石STM32F103入门开发板视频](https://www.bilibili.com/video/BV1sJ411w7WY?from=search&seid=5970723847933395781&spm_id_from=333.337.0.0)：第1章～第8章
> 参考教程各色各样，不同的人喜欢不同的风格，上面的教程是指讲的相似内容即为基础部分内容，后面的高级部分，用到了再去学就可以。可以不同的视频都看一点，看看哪个老师讲的更合自己的胃口，也可以串着看。在看教程时考虑以下几个问题

1. 什么是HAL库？什么是标准库？什么是寄存器？

2. 如何搭建一套自己的工程模板？

3. 有哪些更好用的编程工具？

    > 了解stm32CubeMX、CubeIDE、CLion、stm32CubeMonitor

### 2.1.2 stm32单片机的高级应用

### 2.1.3 FreeRTOS

### 2.1.4 LWIP

## 2.2 传感器

### 2.2.1 测距模块

### 2.2.2 雷达

### 2.2.3 编码器

## 2.3 电机驱动

## 2.4 电源

# 3 软件

## 3.1 ROS

首先学的是一个框架：机器人操作系统ROS。ROS很重要，但不是非他不可，一定注意ROS并不是决定性因素，算法才是重点，ROS只是工具。ROS是运行在Linux操作系统之上的元操作系统，所以在学习ROS的过程中就遇到了Linux应该怎么用，所以就不单独去学Linux了。

> 参考教程：
> 
> 1. [【奥特学园】ROS机器人入门课程《ROS理论与实践》零基础教程](https://www.bilibili.com/video/BV1Ci4y1L7ZZ?from=search&seid=16102907305809806828&spm_id_from=333.337.0.0)
> 2. [黑马ROS无人车](https://www.bilibili.com/video/BV1qh41197TZ?from=search&seid=2135245634157025536&spm_id_from=333.337.0.0)
> 3. [ROS零基础入门教程百日谈合集](https://www.bilibili.com/video/BV1Av411A7hJ?from=search&seid=15670591582687422571&spm_id_from=333.337.0.0)
> 4. [智学无人小车](https://robot.czxy.com/car/bk/hardware/)
> 上面的教程都比较不错，一开始可以从奥特学园的教程开始看，老师讲的比较生动，而且都对应实际操作，完全可以跟着操作。后面的黑马无人车是比较全面的教程，涉及范围比较广。ROS零基础入门教程百日谈合集也很不错，他从实体出发，也都有实际操作。最后的智学无人小车平台是一个文档教程，跟黑马的视频应该是对应的。
> 看视频的教程可能对需要掌握哪些内容不够清楚，可以参考下面的问题

### 3.1.1 基础部分

1. ROS安装

这一部分的视频我推荐参考奥特学园的教程，特别是零基础。
入门学习时不必纠结使用Ubuntu18.04还是20.04,先学。
文档教程：{% post_link ROS/ubuntu18-04LTS安装ROS ubuntu18-04LTS安装ROS %}

2. 话题通信

这部分可以直接看奥特学园教程，按照他的思路分别使用C++和Python 实现通信

3. 通过ROS话题通信实现电脑和单片机间通信

参考教程：{% post_link ROS/在stm32中运行ROS节点-rosserial-stm32 在stm32中运行ROS节点-rosserial-stm32 %}

4. 使用自定义消息实现电脑和单片机间的通信

参考教程：{% post_link ROS/使用自定义消息实现ROS与stm32通讯 使用自定义消息实现ROS与stm32通讯 %}

### 3.1.2 仿真环境

1. URDF是什么？使用URDF创建简单模型并在Rviz和Gazebo中显示

    > 学会URDF基本语法会调用即可，后面很少自己写很多代码

2. 使用Solidworks创建一个机器人模型，使用sw2urdf转换为urdf并在Rviz中显示

    > 参考教程：{% post_link ROS/Solidworks模型导出urdf Solidworks模型导出urdf %}

3. 将urdf模型转换为xacro格式

    > 参考教程：{% post_link ROS/控制sw2urdf导出模型在Rviz和Gazebo中运动 控制sw2urdf导出模型在Gazebo中运动并在Rviz中同步显示数据 %}

4. 将solidworks创建的机器人模型转换为xacro文件，并在Rviz和Gazebo中显示

    > 参考教程：{% post_link ROS/控制sw2urdf导出模型在Rviz和Gazebo中运动 控制sw2urdf导出模型在Gazebo中运动并在Rviz中同步显示数据 %}

5. 键盘控制模型在Rviz中运动

    > 参考教程：{% post_link ROS/控制sw2urdf导出模型在Rviz和Gazebo中运动 控制sw2urdf导出模型在Gazebo中运动并在Rviz中同步显示数据 %}

6. 键盘控制模型在Gazebo中运动

    > 参考教程：{% post_link ROS/控制sw2urdf导出模型在Rviz和Gazebo中运动 控制sw2urdf导出模型在Gazebo中运动并在Rviz中同步显示数据 %}

### 3.1.3 高级部分

1. ROS_Android
2. ROS_Web
3. ROS_QT

### 3.1.4 SLAM相关

1. Gmapping
2. move_base
3. AMCL
4. Cartographer
