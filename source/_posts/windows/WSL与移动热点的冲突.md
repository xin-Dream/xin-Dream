---
title: WSL与移动热点的冲突
date: 2021-07-22 09:27:43
tags: 
    [WSL] 
categories: 
    [windows]
---

# 前言

当下网络环境如下图

{% asset_image 01.png This is an image %}

# 解决思路

三种思路

## 修改整体的网络拓扑，引入路由器。
## 从windows本身入手，网络热点的网络地址与WSL分离
## 抛弃笔记本电脑ubuntu的界面使用

在windows主机中，由于配置好了Xface，所以ssh连接笔记本后，可以显示窗口。所以只在windows主机中使用。

在WSL中使用终归还是问题太多，与学习ROS反而有些冲突，不如直接使用笔记本电脑学习。

当下未解决其他问题，故先试用这一方案