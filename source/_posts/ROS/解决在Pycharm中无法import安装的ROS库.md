---
title: 解决在Pycharm中无法import安装的ROS库
date: 2021-09-05 19:48:06
tags: 
    [ROS] 
categories: 
    [Linux,ROS]
---

> 环境说明
>
> Ubuntu18.04 \ ROS-melodic \  Pycharm2021



# 问题描述

在Pycharm中`import rospy`时，报错



# 解决

File -> Settings -> Project -> Python Interpreter

在上面一栏选择Python Interpreter的后面有个小齿轮，点击小齿轮，选择Show ALL

在弹出界面中，上方第五个按钮`show paths for the selected Interpreter`

点击加号，添加ROS中的dist-packages目录

`/opt/ros/melodic/lib/python2.7/dist-packages/`

