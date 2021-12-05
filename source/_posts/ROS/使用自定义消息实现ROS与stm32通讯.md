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

## 3.1 功能包说明

在一个机器人的设计中，上位机与下位机间通讯的内容可能包含很多类，所以需要自定义的消息也会有多类，所以将自定义的msg和srv单独放到一个功能包内，应该会更方便些。

经过上面的文章已经可以生成自定义消息了，我们重新整理下功能包中的结构：

```bash
src
    ├── custom_msg                 # 自定义消息的功能包
    │   ├── CMakeLists.txt
    │   ├── include
    │   │   └── custom_msg
    │   ├── msg
    │   │   └── IMU.msg           # 自定义的消息文件
    │   ├── package.xml
    │   └── src
    └── ros_stm32_bridge           # 与stm32通讯的功能包
        ├── CMakeLists.txt
        ├── include
        │   └── ros_stm32_bridge
        ├── launch
        │   └── ros_talk_stm32.launch
        ├── package.xml
        ├── scripts
        │   └── 01_data_transform.py   # 调用自定义消息的python文件
        └── src
            ├── data_pub.cpp
            └── data_sub.cpp
```

## 3.2 stm32中发送自定义消息

当我们使用前面的步骤生成头文件后，将头文件复制到stm32的Inc文件夹内，即可编译运行，在之前的文章中有说明。具体如何在stm32中运行ROS节点，参考上一篇文章。

```cpp
// robot.cpp
#include <robot.h>
#include <ros.h>
#include <custom_msg/IMU.h>

ros::NodeHandle nh;

// 发布IMU消息
custom_msg::IMU imu_msg;
ros::Publisher Arena_imu("Arena_imu",&imu_msg);

void setup(void) {
    nh.initNode();

    nh.advertise(Arena_imu);
}

void loop(void) {

    imu_msg.PITCH=(float) sensors.PITCH/ 32768 * 180;
    imu_msg.ROLL=(float) sensors.ROLL/ 32768 * 180;
    imu_msg.YAW=(float) sensors.YAW/ 32768 * 180;

    Arena_imu.publish(&imu_msg);

    nh.spinOnce();

    HAL_Delay(100);
}
```

## 3.3 上位机中接收自定义消息

1. 功能包设置

   要在功能包ros_stm32_bridge中订阅到custom_msg功能包中自定义的消息，需要修改一下ros_stm32_bridge中的两个配置文件，如下：

   ```bash
   # CMakeLists.txt
   
   find_package(catkin REQUIRED COMPONENTS
     roscpp
     rospy
     std_msgs
     custom_msg                     # 添加我们自定义的功能包名称
   )
   
   ## Specify additional locations of header files
   ## Your package locations should be listed before other locations
   include_directories(
     include
     ${catkin_INCLUDE_DIRS}
   )
   ```

   ```bash
   # package.xml
   
   # 添加如下两项
   <build_depend>custom_msg</build_depend>
   <exec_depend>custom_msg</exec_depend>
   ```

2. 订阅者

   这里我通过订阅IMU的消息，将两个角度信息转化为速度发布给仿真环境下的机器人

   ```python
   import rospy
   from custom_msg.msg import IMU
   from geometry_msgs.msg import Twist
   
   def doIMU(IMU):
       pitch=IMU.PITCH
       roll=IMU.ROLL
       yaw=IMU.YAW
       twist = Twist()
   
       Arena_pub=rospy.Publisher("/cmd_vel",Twist,queue_size=10)
   
       if pitch>180:
           pitch=pitch-360
       if roll>180:
           roll=roll-360
   
       pitch2linear=pitch/20
       roll2angular=roll/20
   
       if pitch<10 and pitch>350:
           pitch2linear = 0
   
       if roll<10 and roll>350.0:
           roll2angular = 0
   
       twist.linear.x = pitch2linear
       twist.angular.z = roll2angular
   
       Arena_pub.publish(twist)
   
   if __name__ == '__main__':
       rospy.init_node("transformer")
   
       sub=rospy.Subscriber("Arena_imu",IMU,doIMU,queue_size=20)
       rospy.spin()
       
   ```

   # 实现效果

   ![mmexport1638451113780](/images/使用自定义消息实现ROS与stm32通讯/mmexport1638451113780.gif)
