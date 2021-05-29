---
title: ubuntu18.04LTS安装ROS
date: 2021-01-28 22:07:44
tags: 
    [ROS,ubuntu18.04] 
categories: 
    [Linux,ROS]
---
# 环境简介
ubuntu18.04LTS 、ROS Melodic Morenia 
参考：[古月居ROS入门21讲](https://www.bilibili.com/video/BV1zt411G7Vn/?p=5)
	[官方安装教程](http://wiki.ros.org/melodic/Installation/Ubuntu)
	
# 安装
在安装之前，一定保证可从互联网下载中选中以下四个选项。因为后面要添加ros的源
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200601191100505.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQ1MTcyMTU2,size_16,color_FFFFFF,t_70)
## 添加ros软件源

```bash
sudo sh -c 'echo "deb http://packages.ros.org/ros/ubuntu $(lsb_release -sc) main " > /etc/apt/sources.list.d/ros-latest.list'
```
## 添加秘钥

```bash
sudo apt-key adv --keyserver 'hkp://keyserver.ubuntu.com:80' --recv-key C1CF6E31E6BADE8868B172B4F42ED6FBAB17C654
```
## 安装ROS

```bash
sudo apt update
sudo apt install ros-melodic-desktop-full
```
这里第二步可能会出现错误，再更新一次执行就好了

### 【2020-12-03】
第二步安装时可能会有缺少依赖
使用`sudo aptitude install ros-melodic-desktop-full `
可能第一个方案并不好用，可以换个方案


## 初始化rosdep

```bash
sudo rosdep init
```
这里出了问题

一开始有找不到rosdep的错误

```bash
sudo apt-get install python-rosdep
```
安装完成后，又出现了新错误，如下
### ERROR: cannot download default sources list from:
https://raw.githubusercontent.com/ros/rosdistro/master/rosdep/sources.list.d/20-default.list
Website may be down.
解决这个问题，找了一些办法，我的解决顺序如下

 1. 

```bash
sudo apt-get install python-wstool ros-melodic-ros 
```
并不成功
2. 

```bash
sudo -E rosdep init
```
还是不成功
3.

```bash
#打开host文件
sudo gedit /etc/hosts
#在文件末尾添加
151.101.84.133 raw.githubusercontent.com
```
终于成功了,参考连接[解决办法](https://community.bwbot.org/topic/811/rosdep-init-%E6%88%96%E8%80%85rosdep-update-%E8%BF%9E%E6%8E%A5%E9%94%99%E8%AF%AF%E7%9A%84%E8%A7%A3%E5%86%B3%E5%8A%9E%E6%B3%95)
### 可用ip发生变化2020-12-03

```bash
#当前可用ip 2020-06-05
151.101.76.133  raw.githubusercontent.com
140.82.113.4        github.com
185.199.111.153     assets-cdn.github.com
199.232.69.194      github.global.ssl.fastly.net
#可以先ping一下地址测试
```

接下来继续安装过程

```bash
rosdep update
```
### 【2020-12-03】
这里如果出错可能是网络问题，可以试一下手机热点
## 设置环境变量

```bash
echo "source /opt/ros/melodic/setup.bash" >> ~/.bashrc
source ~/.bashrc
```
可以输入ros，按tab键检查是否成功
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200601193246731.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQ1MTcyMTU2,size_16,color_FFFFFF,t_70)

## 安装rosinstall

```bash
sudo apt install python-rosinstall pyton-rosinstall-generator python-wstool build-essential
```

# 测试
接下来我们就跑一下小乌龟试试
以下三个命令要在三个终端中执行

```bash
roscore
rosrun turtlesim turtlesim_node
rosrun turtlesim turtle_teleop_key
```
可以看到小乌龟已经跑起来了，安装结束
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200601193831268.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQ1MTcyMTU2,size_16,color_FFFFFF,t_70)
