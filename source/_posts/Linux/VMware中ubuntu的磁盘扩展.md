---
title: VMware中ubuntu的磁盘扩展
date: 2021-02-08 16:53:40
tags: 
    [ubuntu,虚拟机] 
categories: 
    [Linux,ubuntu]
---
# 前言
由于第一次使用虚拟机安装jetpack对磁盘容量估计不足，中途用到磁盘扩展，现记录如下。

# 扩展流程
1. 将虚拟机关机，在编辑虚拟机设置中扩展硬盘容量
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210207004515420.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQ1MTcyMTU2,size_16,color_FFFFFF,t_70)
2. 由上一步扩展后需要在虚拟机中重新进行磁盘的分区设置

```bash
# 安装gparted工具
sudo apt-get install gparted

# 运行gparted工具
sudo gparted
#在打开的界面中进行分区的设置与管理
```
3. 磁盘信息验证

```bash
sudo df
#查看当前磁盘使用情况
```
