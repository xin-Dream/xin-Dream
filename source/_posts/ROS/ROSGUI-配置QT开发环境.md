---
layout: post
title: ROSGUI-配置QT开发环境
date: 2022-03-16 20:05:41
tags: 
    [ROS,GUI] 
categories: 
    [Linux,ROS]
typora-root-url: ..\..
---

# 参考教程

[蒋程杨：ROS Qt5 librviz人机交互界面开发](https://blog.csdn.net/qq_38441692/article/details/105158790)

# 1. Qt安装

1. 下载安装包：[下载地址](https://download.qt.io/archive/qt/)
2. 安装
   ```bash
   sudo chmod a+x qt-opensource-linux-x64-5.9.9.run
   sudo ./qt-opensource-linux-x64-5.9.9.run
   ```
   在选择Qt组件时，选择Desktop gcc 64-bit。

3. 添加环境变量
   ```bash
   sudo vim /usr/bin/qtcreator
   ```
   ```
    #!/bin/sh 
    export QT_HOME=/opt/Qt5.9.9/Tools/QtCreator/bin 
    $QT_HOME/qtcreator $*
   ```
4. 为qtcreator添加权限
   ```
   sudo chmod a+x /usr/bin/qtcreator
   ```

# 2. 安装ROS-Qt-pkg

    ```
    sudo apt-get install ros-melodic-qt-create
    sudo apt-get install ros-melodic-qt-build
    ```
    
    创建功能包
    ```
    catkin_create_qt_pkg qt_ros_test
    ```

# 3. 编译功能包
   编译之前需要在功能包中修改以下内容：

1. CMakeList.txt
   ```bash
   
   project(ros_qt_test)
   
   # 增加一行
   set(CMAKE_INCLUDE_CURRENT_DIR ON)
   
   ```
   ```bash
    find_package(catkin REQUIRED COMPONENTS qt_build roscpp)
    include_directories(${catkin_INCLUDE_DIRS})
   
    # 增加以下两行
    find_package(Qt5 REQUIRED Core Widgets)
    set(QT_LIBRARIES Qt5::Widgets)
   ```
   ```bash
   # 注释以下一行
   #rosbuild_prepare_qt4(QtCore QtGui) # Add the appropriate components to the component list here
   ```
   ```bash
    # 相似内容将4改为5
    QT5_ADD_RESOURCES(QT_RESOURCES_CPP ${QT_RESOURCES})
    QT5_WRAP_UI(QT_FORMS_HPP ${QT_FORMS})
    QT5_WRAP_CPP(QT_MOC_HPP ${QT_MOC})
   ```
2. main_window.hpp
   ```cpp
   // 路径: src/ros_qt_test/include/ros_qt_test/main_window.hpp
   
    #include <QtGui/QMainWindow>
    //修改为
    #include <QtWidgets/QMainWindow>
   ```
3. 可以使用catkin_make编译项目
   
# 4. Qtcreator打开项目

   使用qtcreator打开工作空间的src里的CMakeLists.txt即可打开工程,注意打开的时候只能**在命令行中使用qtcreator打开**。

# 5. 运行结果

![image-20220316211312651](/images/ROSGUI-配置QT开发环境/image-20220316211312651.png)

