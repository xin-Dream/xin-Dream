---
layout: post
title: 使用自定义消息实现ROS与stm32通讯
date: 2021-11-16 12:21:41
tags: 
    [ROS,stm32] 
categories: 
    [Linux,ROS]
typora-root-url: ..\..
---

# 前言

> 之前可能需要自定义单片机与ROS的通讯内容，在之前的博客中实现了在stm32中运行ROS节点，所以如果我们可以同步ROS工作空间中自定义的消息格式，那么只要在单片机中完成消息内容赋值后，就可以使用publish或service直接实现消息的发送

# 1 在ROS工作空间内自定义消息

1. 创建工作空间

   ```bash
   mkdir -p robot_ws/src
   cd robot_ws
   catkin_make
   ```

2. clone rosserial_stm32

   ```bash
   cd robot_ws/src
   git clone <https://github.com/yoneken/rosserial_stm32.git>
   cd ..
   catkin_make
   ```

3. 创建自定义消息

   ```bash
   cd robot_ws/src
   catkin_create ros_stm32_bridge rospy roscpp std_msgs
   cd ..
   catkin_make
   
   # 在上一步创建的功能包 ros_stm32_bridge中创建msg目录，在msg文件夹内创建消息文件
   robot_ws
   	ros_stm32_bridge
   		msg
   			stm32_motor.msg
   ```

4. 添加依赖

   ```bash
   # package.xml
   <build_depend>message_generation</build_depend>
   <exec_depend>message_runtime</exec_depend>
   
   # CMakeLists.txt
   find_package(catkin REQUIRED COMPONENTS
     roscpp
     rospy
     std_msgs
     message_generation
   )
   
   add_message_files(
     FILES
     Person.msg
   )
   
   generate_messages(
     DEPENDENCIES
     std_msgs
   )
   
   catkin_package(
   #  INCLUDE_DIRS include
   #  LIBRARIES demo02_talker_listener
     CATKIN_DEPENDS roscpp rospy std_msgs message_runtime
   #  DEPENDS system_lib
   )
   ```

5. 将自定义消息添加到rospack

   ```bash
   rospack profile
   
   # 查看rospack
   rospack list
   ```

   ![image-20211118212916258](/images/使用自定义消息实现ROS与stm32通讯/image-20211118212916258.png)

   使用rospack list查看，发现了如下路径，说明ros_stm32_bridge已经被添加进去了

   ![image-20211118212929773](/images/使用自定义消息实现ROS与stm32通讯/image-20211118212929773.png)

# 2 使用Rosserial_stm32编译生成头文件

```bash
rosrun rosserial_stm32 make_libraries.py stm32_project/Core
# 请注意这里最后指向的目录，要指向Inc目录的上一级
# 完成后可以进入到Inc目录下查看生成的文件
```

![image-20211118212942241](/images/使用自定义消息实现ROS与stm32通讯/image-20211118212942241.png)

接下来就可以去stm32中创建节点发布消息了

# 3 ROS与stm32通信验证

TODO
