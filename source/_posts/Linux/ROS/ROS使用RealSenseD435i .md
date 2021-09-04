---
title: ROS学习笔记（一）
date: 2021-01-28 22:09:02
tags:
[ROS,ubuntu18.04,笔记]
categories:
[Linux,ROS]
---

```bash
cd catkin_ws/src
git clone  https://github.com/IntelRealSense/realsense-ros.git

# 若缺少功能包
git clone https://github.com/pal-robotics/ddynamic_reconfigure.git

cd ..
catkin_make
source ./devel/setup.bash

roslaunch realsense2_camera rs_camera.launch
# 在Rviz中添加深度相机订阅即可
```