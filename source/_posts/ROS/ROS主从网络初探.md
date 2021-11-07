---
title: ROS主从网络初探
date: 2021-04-23 20:50:32
tags: 
    [ROS,主从网络] 
categories: 
    [Linux,ROS]
---

# 前言
在配置Jetson远程连接时看见了[设置ROS主从网络和远程开发环境](https://zhuanlan.zhihu.com/p/52005221)，决定跟随大佬的脚步尝试一下。
由于我对此了解并不深入，所以大部分参照大佬的教程，文章的目的是为了记录自己的学习过程，并在以后重新配置的时候还可以参考

# 配置简介
win10、VMware15pro、ubuntu18.04（虚拟机）、JetsonTX2（ubuntu18.04）

## 1. 网络设置
首先应将虚拟机与JetsonTX2连接到同一局域网，请参考[虚拟机中连接外部无线网络](https://blog.csdn.net/qq_45172156/article/details/114766376)

## 2.JetsonTX2与虚拟机时间同步
以下代码需在虚拟机与JetsonTX2中分别执行
```bash
sudo apt-get install chrony
sudo apt-get install ntpdate
#同步时间 
sudo ntpdate ntp.ubuntu.com
#验证时间
date
```
## 3.配置网络
为方便使用，应将JetsonTX2设为主机，虚拟机中的ubuntu设为从机

```bash
# 查看各自IP与用户名，下文皆以本段中IP与用户名为例
JetsonTX2：
	IP：		192.168.43.143
	Hostname：	nvidia
ubuntu：
	IP：		192.168.43.26
	Hostname：	dream
```
在JetsonTX2中

```bash
sudo vim ~/.bashrc
#添加如下两行
export ROS_MASTER_URI=http://192.168.43.143:11311
export ROS_HOSTNAME=192.168.43.143

sudo vim /etc/hosts
#增加如下两行
#注意IP与hostname间应用Tab键
192.168.43.143	nvidia
192.168.43.26	dream
```

在虚拟机中配置：

```bash
sudo vim ~/.bashrc
#添加如下两行
export ROS_MASTER_URI=http://192.168.43.143:11311
export ROS_HOSTNAME=192.168.43.26

sudo vim /etc/hosts
#增加如下两行
#注意IP与hostname间应用Tab键
192.168.43.143	nvidia
192.168.43.26	dream
```
重启JetsonTX2与虚拟机后即可生效
## 4.测试
可以看到虚拟机中运行的roscore，在JetsonTX2中也可以查看到

{% asset_img 主从网络.png This is an image %}



