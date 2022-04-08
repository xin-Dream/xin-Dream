---
layout: post
title: 控制sw2urdf导出模型在Gazebo中运动并在Rviz中同步显示数据
date: 2021-11-20 19:22:24
tags: 
    [ROS,Solidworks] 
categories: 
    [ROS]
typora-root-url: ..\..

---

# 前言

在之前的文章中，实现了solidworks模型在Rviz和Gazebo中的显示，但是在实现其在Rviz或Gazebo中的运动时还有些需要修改的地方。

{% post_link ROS/Solidworks模型导出urdf Solidworks模型导出urdf %}

# 1 Solidworks中模型设置

在之前的文章中说明了为轮子设置旋转轴，当时的坐标系是由软件自动生成的，虽然方便，但在运动时就会出现群魔乱舞的情况。**所以在设置Link时一定要指定自己的坐标系。**

1. ROS中坐标系的说明

   + ROS中坐标系为右手坐标系。如果我们食指向上，那么食指指向为Z轴，中指指向X轴，拇指指向Y轴。

   + 多说一句，在URDF文件中，xyz很简单，就是指三轴指向。rpy分别表示roll、pitch、yaw，这里是分别指绕x轴、y轴、z轴旋转的弧度。

   + 在我们使用cmd_vel控制机器人运动时，使用rostopic可以查看到是使用Twist消息控制运动的。Twist包括linear（float64 x、float64 y、float64 z）和angular（float64 x、float64 y、float64 z）。

   + 在地面移动机器人的运动中，使用twist.linear.x表示其线速度，twist.angular.y表示其旋转时的角速度。所以要想让机器人的指向与建模方向移植，那机器人的头部要指向X轴正向。

2. sw模型中的坐标系建立

   + 对于机器人的不同配件，建议为各自配件都设定自己的坐标系，比如摄像头，测距传感器等，其正方向都设定为X轴正向。

   + 下图为机器人俯视图，四个轮子和机器人的X方向统一指向为机器人运动方向。
   + ![image-20211124204238435](/images/控制sw2urdf导出模型在Rviz和Gazebo中运动/image-20211124204238435.png)

3. 建模装配时要注意的事

   + 想要在仿真中方便，在装配时一定按照要仿真的Link分成子装配体。比如在上述轮式机器人中，固定部分的base_Link包括车体、电机、IMU、传感器固定支架等，其他Link包括，车轮、传感器等，所以按类分成子装配体，如下图。
   + ![image-20211124204256062](/images/控制sw2urdf导出模型在Rviz和Gazebo中运动/image-20211124204256062.png)

4. 导出URDF要注意的事

   + 如果遇到这个问题，可以参考我在GitHub中的回答。[Reference sketch does not exist](https://github.com/ros/solidworks_urdf_exporter/issues/113)

# 2 URDF文件转XACRO

URDF文件需要在 同一文件中修改大量代码，而我们的模型可能还会遇到改动，因为我个人的习惯，我比较喜欢生成的代码进行尽量少的变化，实现尽可能的模块化设计。在把URDF文件转化为xacro文件后能尽量减少修改代码量。

1. 首先我们看下workspace的src里面的功能包结构

   ```bash
   ├── arena_model                                 # sw2urdf生成的文件夹，这里面的文件都不要动
   │   ├── CMakeLists.txt
   │   ├── config
   │   │   └── joint_names_arena_model.yaml
   │   ├── export.log
   │   ├── launch
   │   │   ├── display.launch
   │   │   └── gazebo.launch
   │   ├── meshes
   │   │   ├── base_link.STL
   │   │   ├── camera_link.STL
   │   │   ├── LB_range_link.STL
   │   │   ├── LB_wheel_link.STL
   │   │   ├── LF_range_link.STL
   │   │   ├── LF_wheel_link.STL
   │   │   ├── L_range_link.STL
   │   │   ├── RB_range_link.STL
   │   │   ├── RB_wheel_link.STL
   │   │   ├── RF_range_link.STL
   │   │   ├── RF_wheel_link.STL
   │   │   └── R_range_link.STL
   │   ├── package.xml
   │   ├── textures
   │   └── urdf
   │       ├── arena_model.csv
   │       └── arena_model.urdf
   ├── arena_simulation                              # 创建新的功能包，在这里面编写xacro文件
   │   ├── CMakeLists.txt
   │   ├── config
   │   │   └── arbotix_config.yaml
   │   ├── launch
   │   │   ├── arena2rviz.launch
   │   │   └── arena2gazebo.launch
   │   ├── package.xml
   │   └── urdf
   │       └── xacro
   │           ├── arena_model.urdf.xacro
   │           ├── arena_move.urdf.xacro
   │           └── arena.urdf.xacro
   ```

2. 将sw2urdf文件生成的arena_model文件夹移动至workspace后，新建一个package，这个package的依赖包要包含：urdf、xacro、gazebo_ros、gazebo_ros_control、gazebo_plugins

3. 复制arena_model文件夹中的urdf文件到新功能包内，并重新命名为arena_model.urdf.xacro。在arena_model.urdf.xacro文件内的robot标签下做如下修改：

   ```xml
   <robot name="arena_model" xmlns:xacro="http://wiki.ros.org/xacro">
   ```

4. 在arena_simulation文件夹内新建gazebo_ros的xacro文件：arena_move.urdf.xacro

   这里有几个问题要强调一下 

   1. 这里使用的是四轮滑移底盘，也就是四轮差速。所以gazebo的plugin里面使用的是“skid_steer_drive_controller”和“libgazebo_ros_skid_steer_drive”。 
   2. 对joint进行transmission初始化的时候，一定注意joint_name和在sw2urdf中配置的joint名称一致，也就是和arena_model.urdf文件中的joint_name一致。 
   3. robotNamesoace这里如果填写的话，那么在启动launch文件后，使用rostopic查看话题，就会显示/arena/cmd_vel。

   ```xml
   <robot name="arena_move" xmlns:xacro="http://wiki.ros.org/xacro">
   
       <xacro:macro name="joint_trans" params="joint_name">
           <transmission name="${joint_name}_trans">
               <type>transmission_interface/SimpleTransmission</type>
               <joint name="${joint_name}">
                   <!--说明哪些硬件接口可以接入-->
                   <hardwareInterface>hardware_interface/VelocityJointInterface</hardwareInterface>
               </joint>
               <actuator name="${joint_name}_motor">
                   <hardwareInterface>hardware_interface/VelocityJointInterface</hardwareInterface>
                   <mechanicalReduction>1</mechanicalReduction>
               </actuator>
           </transmission>
       </xacro:macro>
   
       <xacro:joint_trans joint_name="LB_wheel_joint"/>
       <xacro:joint_trans joint_name="LF_wheel_joint"/>
       <xacro:joint_trans joint_name="RF_wheel_joint"/>
       <xacro:joint_trans joint_name="RB_wheel_joint"/>
   
       <gazebo>
           <plugin name="skid_steer_drive_controller" filename="libgazebo_ros_skid_steer_drive.so">
   
               <updateRate>100.0</updateRate>
               <robotNamespace>/arena</robotNamespace>
   
               <leftFrontJoint>LF_wheel_joint</leftFrontJoint> <!-- 左前轮 -->
               <leftRearJoint>LB_wheel_joint</leftRearJoint> <!-- 左后轮 -->
               <rightFrontJoint>RF_wheel_joint</rightFrontJoint> <!-- 右前轮 -->
               <rightRearJoint>RB_wheel_joint</rightRearJoint> <!-- 右后轮 -->
   
               <wheelSeparation>0.2</wheelSeparation> <!-- 车轮间距 -->
               <wheelDiameter>0.16</wheelDiameter> <!-- 车轮直径 -->
   
               <commandTopic>cmd_vel</commandTopic> <!-- 运动控制话题 -->
               <odometryFrame>odom</odometryFrame>
               <odometryTopic>odom</odometryTopic> <!-- 里程计话题 -->
               <robotBaseFrame>base_link</robotBaseFrame> <!-- 根坐标系 -->
   
               <torque>1</torque><!--转矩-->
               <broadcastTF>0</broadcastTF>
   
   						<rosDebugLevel>Debug</rosDebugLevel>
               <publishWheelTF>true</publishWheelTF>
               <publishTf>1</publishTf>
               <publishWheelJointState>true</publishWheelJointState>
   						<publishOdomTF>false</publishOdomTF>
   						<odometrySource>world</odometrySource> <!-- 'encoder' instead of 'world' is also possible -->
           </plugin>
       </gazebo>
   </robot>
   ```

5. 新建arena.urdf.xacro文件，作为最终机器人的描述文件集成。后面添加了摄像头、雷达等单独的xacro文件，只要这这个文件内添加就好了.

   ```xml
   <robot name="arena" xmlns:xacro="http://wiki.ros.org/xacro">
   
       <xacro:include filename="arena_move.urdf.xacro"/>
       <xacro:include filename="arena_model.urdf.xacro"/>
   
   </robot>
   ```

6. 创建launch文件

   可以看到，我们创建了arena_simulation，launch文件内也只包含了arena.urdf.xacro，所以后面添加或删除一部分配件后，launch文件也不用再修改

   ```xml
   <launch>
   
       <!-- 将 Urdf 文件的内容加载到参数服务器 -->
       <param name="robot_description" command="$(find xacro)/xacro $(find arena_simulation)/urdf/xacro/arena.urdf.xacro" />
       <!-- 启动 gazebo -->
       <include
       file="$(find gazebo_ros)/launch/empty_world.launch" />
   
       <!-- 在 gazebo 中显示机器人模型 -->
       <node pkg="gazebo_ros" type="spawn_model" name="model" args="-urdf -model arena -param robot_description"  />
   </launch>
   ```

7. 启动以上launch文件后，即可使用rostopic话题查看到/arena/cmd_vel话题，就能看到模型在Gazebo中的运动。

   > 如果发现模型在运动时与理论不一致，修改一下arena_model.urdf.xacro文件内joint的旋转轴即可。

# 3 Rviz中同步机器人在Gazebo中的运动

我们使用ros_control之后，就已经完成了对模型的控制，Rviz中订阅节点就能显示传感器与运动信息了。

可以新建运行Rviz的launch文件，如下：

```xml
<launch>

    <node name="rviz" pkg="rviz" type="rviz" args="-d $(find arena_simulation)/config/arena.rviz"/>

    <node name="joint_state_publisher" pkg="joint_state_publisher" type="joint_state_publisher"/>
    <node name="robot_state_publisher" pkg="robot_state_publisher" type="robot_state_publisher"/>

    <node pkg="tf2_ros" type="static_transform_publisher" name="base_frame_2_odom_link"
          args="0 0 0 0 0 0 /odom /base_link"/>
</launch>
```

这里的TF坐标变换需要添加，因为我们在gazebo插件中生成的odom，而odom和车的模型之间没有任何关系，所以为了映射模型和odom的运动，需要将odom和模型的base_link通过坐标变换联系起来。

 **tf2_ros static_transform_publisher x偏移量 y偏移量 z偏移量 z偏航角度 y俯仰角度 x翻滚角度 父级坐标系 子级坐标系**

![image-20211125114338877](/images/控制sw2urdf导出模型在Rviz和Gazebo中运动/image-20211125114338877.png)
