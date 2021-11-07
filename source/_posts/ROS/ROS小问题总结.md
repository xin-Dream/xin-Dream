---
title: ROS小问题总结
date: 2021-04-30 15:08:57
tags: 
    [ROS,ubuntu18.04] 
categories: 
    [Linux,ROS]
---

# 1. 串口权限设置

当执行测试程序出错时注意先给串口权限

# 2. Submaps

要在rviz中显示cartographer的地图需安装
```
sudo apt-get install ros-melodic-cartographer-rviz
```
**注：ros-noetic目前不能安装（2021-05-11）**

