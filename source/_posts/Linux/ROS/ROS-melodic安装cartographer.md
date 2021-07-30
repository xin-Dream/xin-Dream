---
title: ROS-melodic安装cartographer
date: 2021-05-08 15:09:04
tags: 
    [ROS,cartographer] 
categories: 
    [Linux,ROS]
---
# 1. 安装编译工具

```bash

sudo apt-get update
sudo apt-get install -y python-wstool python-rosdep ninja-build
```
# 2. 初始化工作空间

```bash
mkdir cartographer_ws
cd cartographer_ws
wstool init src
```

```bash
wstool merge -t src https://raw.githubusercontent.com/googlecartographer/cartographer_ros/master/cartographer_ros.rosinstall

#注：需修改

sudo vim cartographer_ws/src/.rosinstall

# 修改为以下内容

-git: {local-name: cartographer, uri: 'https://github.com/cartographer-project/cartographer.git', version: 'master'}
- git: {local-name: cartographer_ros, uri: 'https://github.com/cartographer-project/cartographer_ros.git', version: 'master'}
- git: {local-name: ceres-solver, uri: 'https://github.com/ceres-solver/ceres-solver.git', version: '1.13.0'}

```

```bash
wstool update -t src
```

# 3. 安装依赖项
```bash
cd cartographer_ws/src/cartographer/scripts/install_proto3.sh
sudo rosdep init
rosdep update

rosdep install --from-paths src --ignore-src --rosdistro=${ROS_DISTRO} -y
```

# 4. 编译
```bash
# 注：以后文件有改动，都应执行编译

catkin_make_isolated --install --use-ninja
```

# 5. 错误修正

编译过程中可能会遇到以下错误

```bash
Could not find a package configuration file provided by "absl" with any of
  the following names:
    abslConfig.cmake
    absl-config.cmake
```

```bash
sudo apt-get install stow

cd cartographer/scripts/install.abseil.sh
```
