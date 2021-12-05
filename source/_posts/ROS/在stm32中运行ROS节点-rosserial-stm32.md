---
title: 在STM32F407中运行ROS节点-rosserial_stm32
date: 2021-08-18 20:50:01
tags: 
    [ROS] 
categories: 
    [Linux,ROS]
---

# 前言

环境说明：
Ubuntu18.04、ROS-melodic、STM32F407VGT6
Clion、Stm32CubeMX

**这个方法只适用于stm32F3、F4和F7的开发板**

# 1 创建工作空间

```bash
mkdir -p workspace/src
cd workspace
catkin_make

# 这里的工作空间有必要说明一下，在工作空间中的src目录下不止可以放置ROS程序，还可以放置单片机的程序，只要自己管理好src中不同功能包就好
# 所以对一个项目来说，我们把上位机程序、ROS程序、单片机程序放入一个工作空间中
# 将创建的stm32项目整体放入src目录下
```

# 2  创建stm32项目

在使用USB-TTL时，遇见过几次不稳定情况，另外需要再加模块，有些复杂，所以使用USB转虚拟串口(VCP)。

参考另一篇文章：{% post_link 单片机/stm32使用USB虚拟串口  stm32使用USB虚拟串口 %}

上面这篇只涉及虚拟串口的配置，至于其他，如FreeRTOS的使用并不影响，看自己情况。

设置时钟时要注意：{% post_link 单片机/使用CubeMX-CubeIDE配置时钟树注意事项  使用CubeMX/CubeIDE配置时钟树注意事项 %}。如果时钟频率不匹配，会出现端口无法识别。

# 3 在github中下载rosserial_stm32

[rosserial_stm32](https://github.com/yoneken/rosserial_stm32)
不管使用git clone下载，还是使用zip下载，将其也放入workspace中的src目录下。

**如果整个工作空间是github中的repository，在clone下rosserial_stm32后要先删除`.git`和`.gitignore`。否则将工作空间进行push的时候会将下层文件夹当作是子模块。**

# 4 使用rosserial_stm32编译生成头文件

首先回顾下前两步完成后当下工作空间的结构

```bash
# 请注意其中Inc目录位置

├─ workspace
│  ├─ build
│  ├─ devel
│  ├─ src
│  │  ├─ stm32_project
│  │  │     ├─ Core
│  │  │     │   ├─ Inc
│  │  │     │   └─ Src
│  │  │     └─ stm32_project.ioc
│  │  ├─ rosserial_stm32
│  │  │     ├─ Src
│  │  │     │  ├─ ros_lib
│  │  │     │  │   ├─ examples
│  │  │     │  │   │    ├─ chatter
│  │  │     │  │   │    ├─ imu
│  │  │     │  │   │    ├─ led
│  │  │     │  │   │    ├─ pressure_sensor
│  │  │     │  │   │    └─ thermocamera
│  │  │     │  │   ├─ ros.h
│  │  │     │  │   └─ STM32Hardware.h
│  │  │     │  └─ rosserial_stm32
│  │  │     │  │   └─ make_libraries.py
│  │  │     ├─ CMakeLists.txt
│  │  │     ├─ docker-compose.yml
│  │  │     ├─ Dockerfile
│  │  │     ├─ LICENSE
│  │  │     ├─ package.xml
│  │  │     ├─ README.md
│  │  │     └─ Vagrantfile

```
+ 在STM32Hardware.h中根据开发板修改宏定义
    ```c
    #define STM32F4xx  // Change for your device
    #ifdef STM32F3xx
    #include "stm32f3xx_hal.h"
    #include "stm32f3xx_hal_uart.h"
    #endif /* STM32F3xx */
    #ifdef STM32F4xx
    #include "stm32f4xx_hal.h"
    #include "stm32f4xx_hal_uart.h"
    #endif /* STM32F4xx */
    #ifdef STM32F7xx
    #include "stm32f7xx_hal.h"
    #include "stm32f7xx_hal_uart.h"
    ```

+ catkin_make编译工作空间
+ 为make_libraries.py添加可执行权限，另外在这个文件里有两个print函数需要添加括号。
+ 生成头文件
  ```BASH
  # 编译工作空间后执行
  rosrun rosserial_stm32 make_libraries.py /workspace/src/stm32_project/Core
  # 需要安装rosserial：sudo apt-get install ros-melodic-r
  #注意这里后面的路径，最好用绝对路径，最后落到32程序的Core文件夹，里面包括Inc和Src文件夹即可
  ```

# 5  生成后stm32中文件夹目录

<details>
    <summary>Core中文件夹目录，内容较长，点击展开</summary>
        <li>
        ```code
        ├─ Core
        │  ├─ Inc
        │  │  ├─ actionlib
        │  │  │  ├─ TestAction.h
        │  │  │  ├─ TestActionFeedback.h
        │  │  │  ├─ TestActionGoal.h
        │  │  │  ├─ TestActionResult.h
        │  │  │  ├─ TestFeedback.h
        │  │  │  ├─ TestGoal.h
        │  │  │  ├─ TestRequestAction.h
        │  │  │  ├─ TestRequestActionFeedback.h
        │  │  │  ├─ TestRequestActionGoal.h
        │  │  │  ├─ TestRequestActionResult.h
        │  │  │  ├─ TestRequestFeedback.h
        │  │  │  ├─ TestRequestGoal.h
        │  │  │  ├─ TestRequestResult.h
        │  │  │  ├─ TestResult.h
        │  │  │  ├─ TwoIntsAction.h
        │  │  │  ├─ TwoIntsActionFeedback.h
        │  │  │  ├─ TwoIntsActionGoal.h
        │  │  │  ├─ TwoIntsActionResult.h
        │  │  │  ├─ TwoIntsFeedback.h
        │  │  │  ├─ TwoIntsGoal.h
        │  │  │  └─ TwoIntsResult.h
        │  │  ├─ actionlib_msgs
        │  │  │  ├─ GoalID.h
        │  │  │  ├─ GoalStatus.h
        │  │  │  └─ GoalStatusArray.h
        │  │  ├─ actionlib_tutorials
        │  │  │  ├─ AveragingAction.h
        │  │  │  ├─ AveragingActionFeedback.h
        │  │  │  ├─ AveragingActionGoal.h
        │  │  │  ├─ AveragingActionResult.h
        │  │  │  ├─ AveragingFeedback.h
        │  │  │  ├─ AveragingGoal.h
        │  │  │  ├─ AveragingResult.h
        │  │  │  ├─ FibonacciAction.h
        │  │  │  ├─ FibonacciActionFeedback.h
        │  │  │  ├─ FibonacciActionGoal.h
        │  │  │  ├─ FibonacciActionResult.h
        │  │  │  ├─ FibonacciFeedback.h
        │  │  │  ├─ FibonacciGoal.h
        │  │  │  └─ FibonacciResult.h
        │  │  ├─ arbotix_msgs
        │  │  │  ├─ Analog.h
        │  │  │  ├─ Digital.h
        │  │  │  ├─ Enable.h
        │  │  │  ├─ Relax.h
        │  │  │  ├─ SetSpeed.h
        │  │  │  └─ SetupChannel.h
        │  │  ├─ base_local_planner
        │  │  │  └─ Position2DInt.h
        │  │  ├─ bond
        │  │  │  ├─ Constants.h
        │  │  │  └─ Status.h
        │  │  ├─ cartographer_ros_msgs
        │  │  │  ├─ FinishTrajectory.h
        │  │  │  ├─ LandmarkEntry.h
        │  │  │  ├─ LandmarkList.h
        │  │  │  ├─ SensorTopics.h
        │  │  │  ├─ StartTrajectory.h
        │  │  │  ├─ StatusCode.h
        │  │  │  ├─ StatusResponse.h
        │  │  │  ├─ SubmapEntry.h
        │  │  │  ├─ SubmapList.h
        │  │  │  ├─ SubmapQuery.h
        │  │  │  ├─ SubmapTexture.h
        │  │  │  ├─ TrajectoryOptions.h
        │  │  │  └─ WriteState.h
        │  │  ├─ controller_manager_msgs
        │  │  │  ├─ ControllersStatistics.h
        │  │  │  ├─ ControllerState.h
        │  │  │  ├─ ControllerStatistics.h
        │  │  │  ├─ HardwareInterfaceResources.h
        │  │  │  ├─ ListControllers.h
        │  │  │  ├─ ListControllerTypes.h
        │  │  │  ├─ LoadController.h
        │  │  │  ├─ ReloadControllerLibraries.h
        │  │  │  ├─ SwitchController.h
        │  │  │  └─ UnloadController.h
        │  │  ├─ control_msgs
        │  │  │  ├─ FollowJointTrajectoryAction.h
        │  │  │  ├─ FollowJointTrajectoryActionFeedback.h
        │  │  │  ├─ FollowJointTrajectoryActionGoal.h
        │  │  │  ├─ FollowJointTrajectoryActionResult.h
        │  │  │  ├─ FollowJointTrajectoryFeedback.h
        │  │  │  ├─ FollowJointTrajectoryGoal.h
        │  │  │  ├─ FollowJointTrajectoryResult.h
        │  │  │  ├─ GripperCommand.h
        │  │  │  ├─ GripperCommandAction.h
        │  │  │  ├─ GripperCommandActionFeedback.h
        │  │  │  ├─ GripperCommandActionGoal.h
        │  │  │  ├─ GripperCommandActionResult.h
        │  │  │  ├─ GripperCommandFeedback.h
        │  │  │  ├─ GripperCommandGoal.h
        │  │  │  ├─ GripperCommandResult.h
        │  │  │  ├─ JointControllerState.h
        │  │  │  ├─ JointJog.h
        │  │  │  ├─ JointTolerance.h
        │  │  │  ├─ JointTrajectoryAction.h
        │  │  │  ├─ JointTrajectoryActionFeedback.h
        │  │  │  ├─ JointTrajectoryActionGoal.h
        │  │  │  ├─ JointTrajectoryActionResult.h
        │  │  │  ├─ JointTrajectoryControllerState.h
        │  │  │  ├─ JointTrajectoryFeedback.h
        │  │  │  ├─ JointTrajectoryGoal.h
        │  │  │  ├─ JointTrajectoryResult.h
        │  │  │  ├─ PidState.h
        │  │  │  ├─ PointHeadAction.h
        │  │  │  ├─ PointHeadActionFeedback.h
        │  │  │  ├─ PointHeadActionGoal.h
        │  │  │  ├─ PointHeadActionResult.h
        │  │  │  ├─ PointHeadFeedback.h
        │  │  │  ├─ PointHeadGoal.h
        │  │  │  ├─ PointHeadResult.h
        │  │  │  ├─ QueryCalibrationState.h
        │  │  │  ├─ QueryTrajectoryState.h
        │  │  │  ├─ SingleJointPositionAction.h
        │  │  │  ├─ SingleJointPositionActionFeedback.h
        │  │  │  ├─ SingleJointPositionActionGoal.h
        │  │  │  ├─ SingleJointPositionActionResult.h
        │  │  │  ├─ SingleJointPositionFeedback.h
        │  │  │  ├─ SingleJointPositionGoal.h
        │  │  │  └─ SingleJointPositionResult.h
        │  │  ├─ control_toolbox
        │  │  │  └─ SetPidGains.h
        │  │  ├─ costmap_2d
        │  │  │  └─ VoxelGrid.h
        │  │  ├─ diagnostic_msgs
        │  │  │  ├─ AddDiagnostics.h
        │  │  │  ├─ DiagnosticArray.h
        │  │  │  ├─ DiagnosticStatus.h
        │  │  │  ├─ KeyValue.h
        │  │  │  └─ SelfTest.h
        │  │  ├─ duration.cpp
        │  │  ├─ dynamic_reconfigure
        │  │  │  ├─ BoolParameter.h
        │  │  │  ├─ Config.h
        │  │  │  ├─ ConfigDescription.h
        │  │  │  ├─ DoubleParameter.h
        │  │  │  ├─ Group.h
        │  │  │  ├─ GroupState.h
        │  │  │  ├─ IntParameter.h
        │  │  │  ├─ ParamDescription.h
        │  │  │  ├─ Reconfigure.h
        │  │  │  ├─ SensorLevels.h
        │  │  │  └─ StrParameter.h
        │  │  ├─ gazebo_msgs
        │  │  │  ├─ ApplyBodyWrench.h
        │  │  │  ├─ ApplyJointEffort.h
        │  │  │  ├─ BodyRequest.h
        │  │  │  ├─ ContactsState.h
        │  │  │  ├─ ContactState.h
        │  │  │  ├─ DeleteLight.h
        │  │  │  ├─ DeleteModel.h
        │  │  │  ├─ GetJointProperties.h
        │  │  │  ├─ GetLightProperties.h
        │  │  │  ├─ GetLinkProperties.h
        │  │  │  ├─ GetLinkState.h
        │  │  │  ├─ GetModelProperties.h
        │  │  │  ├─ GetModelState.h
        │  │  │  ├─ GetPhysicsProperties.h
        │  │  │  ├─ GetWorldProperties.h
        │  │  │  ├─ JointRequest.h
        │  │  │  ├─ LinkState.h
        │  │  │  ├─ LinkStates.h
        │  │  │  ├─ ModelState.h
        │  │  │  ├─ ModelStates.h
        │  │  │  ├─ ODEJointProperties.h
        │  │  │  ├─ ODEPhysics.h
        │  │  │  ├─ SetJointProperties.h
        │  │  │  ├─ SetJointTrajectory.h
        │  │  │  ├─ SetLightProperties.h
        │  │  │  ├─ SetLinkProperties.h
        │  │  │  ├─ SetLinkState.h
        │  │  │  ├─ SetModelConfiguration.h
        │  │  │  ├─ SetModelState.h
        │  │  │  ├─ SetPhysicsProperties.h
        │  │  │  ├─ SpawnModel.h
        │  │  │  └─ WorldState.h
        │  │  ├─ geometry_msgs
        │  │  │  ├─ Accel.h
        │  │  │  ├─ AccelStamped.h
        │  │  │  ├─ AccelWithCovariance.h
        │  │  │  ├─ AccelWithCovarianceStamped.h
        │  │  │  ├─ Inertia.h
        │  │  │  ├─ InertiaStamped.h
        │  │  │  ├─ Point.h
        │  │  │  ├─ Point32.h
        │  │  │  ├─ PointStamped.h
        │  │  │  ├─ Polygon.h
        │  │  │  ├─ PolygonStamped.h
        │  │  │  ├─ Pose.h
        │  │  │  ├─ Pose2D.h
        │  │  │  ├─ PoseArray.h
        │  │  │  ├─ PoseStamped.h
        │  │  │  ├─ PoseWithCovariance.h
        │  │  │  ├─ PoseWithCovarianceStamped.h
        │  │  │  ├─ Quaternion.h
        │  │  │  ├─ QuaternionStamped.h
        │  │  │  ├─ Transform.h
        │  │  │  ├─ TransformStamped.h
        │  │  │  ├─ Twist.h
        │  │  │  ├─ TwistStamped.h
        │  │  │  ├─ TwistWithCovariance.h
        │  │  │  ├─ TwistWithCovarianceStamped.h
        │  │  │  ├─ Vector3.h
        │  │  │  ├─ Vector3Stamped.h
        │  │  │  ├─ Wrench.h
        │  │  │  └─ WrenchStamped.h
        │  │  ├─ laser_assembler
        │  │  │  ├─ AssembleScans.h
        │  │  │  └─ AssembleScans2.h
        │  │  ├─ main.h
        │  │  ├─ map_msgs
        │  │  │  ├─ GetMapROI.h
        │  │  │  ├─ GetPointMap.h
        │  │  │  ├─ GetPointMapROI.h
        │  │  │  ├─ OccupancyGridUpdate.h
        │  │  │  ├─ PointCloud2Update.h
        │  │  │  ├─ ProjectedMap.h
        │  │  │  ├─ ProjectedMapInfo.h
        │  │  │  ├─ ProjectedMapsInfo.h
        │  │  │  ├─ SaveMap.h
        │  │  │  └─ SetMapProjections.h
        │  │  ├─ move_base_msgs
        │  │  │  ├─ MoveBaseAction.h
        │  │  │  ├─ MoveBaseActionFeedback.h
        │  │  │  ├─ MoveBaseActionGoal.h
        │  │  │  ├─ MoveBaseActionResult.h
        │  │  │  ├─ MoveBaseFeedback.h
        │  │  │  ├─ MoveBaseGoal.h
        │  │  │  ├─ MoveBaseResult.h
        │  │  │  └─ RecoveryStatus.h
        │  │  ├─ navfn
        │  │  │  ├─ MakeNavPlan.h
        │  │  │  └─ SetCostmap.h
        │  │  ├─ nav_msgs
        │  │  │  ├─ GetMap.h
        │  │  │  ├─ GetMapAction.h
        │  │  │  ├─ GetMapActionFeedback.h
        │  │  │  ├─ GetMapActionGoal.h
        │  │  │  ├─ GetMapActionResult.h
        │  │  │  ├─ GetMapFeedback.h
        │  │  │  ├─ GetMapGoal.h
        │  │  │  ├─ GetMapResult.h
        │  │  │  ├─ GetPlan.h
        │  │  │  ├─ GridCells.h
        │  │  │  ├─ LoadMap.h
        │  │  │  ├─ MapMetaData.h
        │  │  │  ├─ OccupancyGrid.h
        │  │  │  ├─ Odometry.h
        │  │  │  ├─ Path.h
        │  │  │  └─ SetMap.h
        │  │  ├─ nodelet
        │  │  │  ├─ NodeletList.h
        │  │  │  ├─ NodeletLoad.h
        │  │  │  └─ NodeletUnload.h
        │  │  ├─ pcl_msgs
        │  │  │  ├─ ModelCoefficients.h
        │  │  │  ├─ PointIndices.h
        │  │  │  ├─ PolygonMesh.h
        │  │  │  └─ Vertices.h
        │  │  ├─ polled_camera
        │  │  │  └─ GetPolledImage.h
        │  │  ├─ ros
        │  │  │  ├─ duration.h
        │  │  │  ├─ msg.h
        │  │  │  ├─ node_handle.h
        │  │  │  ├─ publisher.h
        │  │  │  ├─ service_client.h
        │  │  │  ├─ service_server.h
        │  │  │  ├─ subscriber.h
        │  │  │  └─ time.h
        │  │  ├─ ros.h
        │  │  ├─ roscpp
        │  │  │  ├─ Empty.h
        │  │  │  ├─ GetLoggers.h
        │  │  │  ├─ Logger.h
        │  │  │  └─ SetLoggerLevel.h
        │  │  ├─ roscpp_tutorials
        │  │  │  └─ TwoInts.h
        │  │  ├─ rosgraph_msgs
        │  │  │  ├─ Clock.h
        │  │  │  ├─ Log.h
        │  │  │  └─ TopicStatistics.h
        │  │  ├─ rospy_tutorials
        │  │  │  ├─ AddTwoInts.h
        │  │  │  ├─ BadTwoInts.h
        │  │  │  ├─ Floats.h
        │  │  │  └─ HeaderString.h
        │  │  ├─ rosserial_msgs
        │  │  │  ├─ Log.h
        │  │  │  ├─ RequestMessageInfo.h
        │  │  │  ├─ RequestParam.h
        │  │  │  ├─ RequestServiceInfo.h
        │  │  │  └─ TopicInfo.h
        │  │  ├─ sensor_msgs
        │  │  │  ├─ BatteryState.h
        │  │  │  ├─ CameraInfo.h
        │  │  │  ├─ ChannelFloat32.h
        │  │  │  ├─ CompressedImage.h
        │  │  │  ├─ FluidPressure.h
        │  │  │  ├─ Illuminance.h
        │  │  │  ├─ Image.h
        │  │  │  ├─ Imu.h
        │  │  │  ├─ JointState.h
        │  │  │  ├─ Joy.h
        │  │  │  ├─ JoyFeedback.h
        │  │  │  ├─ JoyFeedbackArray.h
        │  │  │  ├─ LaserEcho.h
        │  │  │  ├─ LaserScan.h
        │  │  │  ├─ MagneticField.h
        │  │  │  ├─ MultiDOFJointState.h
        │  │  │  ├─ MultiEchoLaserScan.h
        │  │  │  ├─ NavSatFix.h
        │  │  │  ├─ NavSatStatus.h
        │  │  │  ├─ PointCloud.h
        │  │  │  ├─ PointCloud2.h
        │  │  │  ├─ PointField.h
        │  │  │  ├─ Range.h
        │  │  │  ├─ RegionOfInterest.h
        │  │  │  ├─ RelativeHumidity.h
        │  │  │  ├─ SetCameraInfo.h
        │  │  │  ├─ Temperature.h
        │  │  │  └─ TimeReference.h
        │  │  ├─ shape_msgs
        │  │  │  ├─ Mesh.h
        │  │  │  ├─ MeshTriangle.h
        │  │  │  ├─ Plane.h
        │  │  │  └─ SolidPrimitive.h
        │  │  ├─ smach_msgs
        │  │  │  ├─ SmachContainerInitialStatusCmd.h
        │  │  │  ├─ SmachContainerStatus.h
        │  │  │  └─ SmachContainerStructure.h
        │  │  ├─ std_msgs
        │  │  │  ├─ Bool.h
        │  │  │  ├─ Byte.h
        │  │  │  ├─ ByteMultiArray.h
        │  │  │  ├─ Char.h
        │  │  │  ├─ ColorRGBA.h
        │  │  │  ├─ Duration.h
        │  │  │  ├─ Empty.h
        │  │  │  ├─ Float32.h
        │  │  │  ├─ Float32MultiArray.h
        │  │  │  ├─ Float64.h
        │  │  │  ├─ Float64MultiArray.h
        │  │  │  ├─ Header.h
        │  │  │  ├─ Int16.h
        │  │  │  ├─ Int16MultiArray.h
        │  │  │  ├─ Int32.h
        │  │  │  ├─ Int32MultiArray.h
        │  │  │  ├─ Int64.h
        │  │  │  ├─ Int64MultiArray.h
        │  │  │  ├─ Int8.h
        │  │  │  ├─ Int8MultiArray.h
        │  │  │  ├─ MultiArrayDimension.h
        │  │  │  ├─ MultiArrayLayout.h
        │  │  │  ├─ String.h
        │  │  │  ├─ Time.h
        │  │  │  ├─ UInt16.h
        │  │  │  ├─ UInt16MultiArray.h
        │  │  │  ├─ UInt32.h
        │  │  │  ├─ UInt32MultiArray.h
        │  │  │  ├─ UInt64.h
        │  │  │  ├─ UInt64MultiArray.h
        │  │  │  ├─ UInt8.h
        │  │  │  └─ UInt8MultiArray.h
        │  │  ├─ std_srvs
        │  │  │  ├─ Empty.h
        │  │  │  ├─ SetBool.h
        │  │  │  └─ Trigger.h
        │  │  ├─ stereo_msgs
        │  │  │  └─ DisparityImage.h
        │  │  ├─ stm32f4xx_hal_conf.h
        │  │  ├─ stm32f4xx_it.h
        │  │  ├─ STM32Hardware.h
        │  │  ├─ tf
        │  │  │  ├─ tf.h
        │  │  │  └─ transform_broadcaster.h
        │  │  ├─ tf2_msgs
        │  │  │  ├─ FrameGraph.h
        │  │  │  ├─ LookupTransformAction.h
        │  │  │  ├─ LookupTransformActionFeedback.h
        │  │  │  ├─ LookupTransformActionGoal.h
        │  │  │  ├─ LookupTransformActionResult.h
        │  │  │  ├─ LookupTransformFeedback.h
        │  │  │  ├─ LookupTransformGoal.h
        │  │  │  ├─ LookupTransformResult.h
        │  │  │  ├─ TF2Error.h
        │  │  │  └─ TFMessage.h
        │  │  ├─ theora_image_transport
        │  │  │  └─ Packet.h
        │  │  ├─ time.cpp
        │  │  ├─ topic_tools
        │  │  │  ├─ DemuxAdd.h
        │  │  │  ├─ DemuxDelete.h
        │  │  │  ├─ DemuxList.h
        │  │  │  ├─ DemuxSelect.h
        │  │  │  ├─ MuxAdd.h
        │  │  │  ├─ MuxDelete.h
        │  │  │  ├─ MuxList.h
        │  │  │  └─ MuxSelect.h
        │  │  ├─ trajectory_msgs
        │  │  │  ├─ JointTrajectory.h
        │  │  │  ├─ JointTrajectoryPoint.h
        │  │  │  ├─ MultiDOFJointTrajectory.h
        │  │  │  └─ MultiDOFJointTrajectoryPoint.h
        │  │  ├─ turtlesim
        │  │  │  ├─ Color.h
        │  │  │  ├─ Kill.h
        │  │  │  ├─ Pose.h
        │  │  │  ├─ SetPen.h
        │  │  │  ├─ Spawn.h
        │  │  │  ├─ TeleportAbsolute.h
        │  │  │  └─ TeleportRelative.h
        │  │  ├─ turtle_actionlib
        │  │  │  ├─ ShapeAction.h
        │  │  │  ├─ ShapeActionFeedback.h
        │  │  │  ├─ ShapeActionGoal.h
        │  │  │  ├─ ShapeActionResult.h
        │  │  │  ├─ ShapeFeedback.h
        │  │  │  ├─ ShapeGoal.h
        │  │  │  ├─ ShapeResult.h
        │  │  │  └─ Velocity.h
        │  │  └─ visualization_msgs
        │  │     ├─ ImageMarker.h
        │  │     ├─ InteractiveMarker.h
        │  │     ├─ InteractiveMarkerControl.h
        │  │     ├─ InteractiveMarkerFeedback.h
        │  │     ├─ InteractiveMarkerInit.h
        │  │     ├─ InteractiveMarkerPose.h
        │  │     ├─ InteractiveMarkerUpdate.h
        │  │     ├─ Marker.h
        │  │     ├─ MarkerArray.h
        │  │     └─ MenuEntry.h
        │  └─ Src
        │     ├─ main.c
        │     ├─ stm32f4xx_hal_msp.c
        │     ├─ stm32f4xx_it.c
        │     ├─ syscalls.c
        │     └─ system_stm32f4xx.c
        ```
        </li>   
  <!-- <pre><code>title，value，callBack可以缺省</code></pre> -->
</details>
# 6 实现下位机发布、上位机订阅

## 6.1  下位机程序编写

ROS中的程序使用C++编写，所以在stm32中使用C和C++混合编译。

这里可以简单说一下单片机中程序的工作流程。在ros.h中调用了STM32Hardware.h中定义的STMHardware类。在STMHardware类中定义了几个基本的函数：read、write、flush等。也就是说，经过rosserial_stm32编译后，单片机中的程序增加的头文件定义了ros中需要使用的绝大部分数据协议，如tf、costmap_2d、map_msgs等,这样在上位机的程序中就能很方便的解析数据了。

注意修改程序时，内容要放在HAL库注释中间。

1. 在stm32工程中新建CPP文件

   在Src中新建robot.cpp，在Inc中新建robot.h。新建文件的过程参考（{% post_link 单片机/配置CLion开发stm32  配置CLion开发stm32 %}）中注意事项。

   ```C++
   // robot.cpp
   
   #include "robot.h"
   #include <ros.h>
   #include <std_msgs/String.h>
   
   ros::NodeHandle nh;
   std_msgs::String str_msg;
   ros::Publisher chatter("chatter", &str_msg);
   
   char hello[] = "Hello world!";
   
   void setup(void) {
       nh.initNode();
       nh.advertise(chatter);
   }
   
   void loop(void) {
       HAL_GPIO_TogglePin(LED_GPIO_Port, LED_Pin);
   
       str_msg.data = hello;
       chatter.publish(&str_msg);
       nh.spinOnce();
   
       HAL_Delay(1000);
   }	
   ```

   ```c++
   //robot.h
   
   #ifdef __cplusplus
   extern "C" {
   #endif
   
   void loop(void);
   void setup(void);
   
   #ifdef __cplusplus
   }
   #endif
   ```

   

2. 修改usbd_cdc_if文件

   ```c++
   //需要修改以下四个地方
   
   //============================================================================
   /* USER CODE BEGIN INCLUDE */
   
   #include "string.h"
   #include "stdarg.h"
   #include "stdio.h"
   
   /* USER CODE END INCLUDE */
   
   //============================================================================
   
   /* USER CODE BEGIN PRIVATE_VARIABLES */
   
   uint8_t usb_rxBuffer[USB_RX_DATA_SIZE];
   uint32_t usb_rxBufPtrIn = 0;
   uint32_t usb_rxBufPtrOut = 0;
   
   /* USER CODE END PRIVATE_VARIABLES */
   
   //============================================================================
   
   static int8_t CDC_Receive_FS(uint8_t *Buf, uint32_t *Len) {
       /* USER CODE BEGIN 6 */
   
       uint32_t i;
       uint16_t in;
   
       for (i = 0; i < *Len; ++i) {
   
           in = (usb_rxBufPtrIn + 1) % USB_RX_DATA_SIZE;
           if (in != usb_rxBufPtrIn) {
               usb_rxBuffer[usb_rxBufPtrIn] = Buf[i];
               usb_rxBufPtrIn = in;
           }
   
       }
       USBD_CDC_SetRxBuffer(&hUsbDeviceFS, &Buf[0]);
       USBD_CDC_ReceivePacket(&hUsbDeviceFS);
       return (USBD_OK);
       /* USER CODE END 6 */
   }
   
   //============================================================================
   /* USER CODE BEGIN PRIVATE_FUNCTIONS_IMPLEMENTATION */
   
   int vcp_available(void) {
       return ((uint32_t) (USB_RX_DATA_SIZE + usb_rxBufPtrIn - usb_rxBufPtrOut)) % USB_RX_DATA_SIZE;
   }
   
   int vcp_read(void) {
       // if the head isn't ahead of the tail, we don't have any characters
       if (usb_rxBufPtrIn == usb_rxBufPtrOut) {
           return -1;
       } else {
           unsigned char ch = usb_rxBuffer[usb_rxBufPtrOut];
           usb_rxBufPtrOut = (uint16_t) (usb_rxBufPtrOut + 1) % USB_RX_DATA_SIZE;
           return ch;
       }
   }
   
   void vcp_write(uint8_t *Buf, uint16_t Len) {
       while (CDC_Transmit_FS(Buf, Len) != HAL_OK);
   }
   
   void vcp_printf(const char *fmt, ...) {
   
       va_list arg;
       va_start (arg, fmt);
       int32_t len;
       static char print_buffer[255];
   
       len = vsnprintf(print_buffer, 255, fmt, arg);
       va_end (arg);
           /*ret = */vcp_write((uint8_t *) print_buffer, len);
   
       //return ret;
   }
   
   /* USER CODE END PRIVATE_FUNCTIONS_IMPLEMENTATION */
   ```

   ```C++
   
   // usbd_cdc_if.h
   
   //============================================================================
   
   /* USER CODE BEGIN EXPORTED_DEFINES */
   /* Define size for the receive and transmit buffer over CDC */
   /* It's up to user to redefine and/or remove those define */
   #define APP_RX_DATA_SIZE  2048
   #define APP_TX_DATA_SIZE  2048
   
   #define USB_RX_DATA_SIZE  2048
   /* USER CODE END EXPORTED_DEFINES */
   
   //============================================================================
   /* USER CODE BEGIN EXPORTED_FUNCTIONS */
   
   int vcp_available(void);
   
   int vcp_read(void);
   
   void vcp_write(uint8_t *Buf, uint16_t Len);
   
   void vcp_printf(const char *fmt, ...);
   
   /* USER CODE END EXPORTED_FUNCTIONS */
   ```

   

3. 修改STM32Hardware.h

   ```
   int read() {
       if (vcp_available()) {
           return vcp_read();
       } else {
           return -1;
       }
   }
   
   void write(uint8_t *data, int length) {
       vcp_write(data, length);
   }
   ```

4. 在主程序中调用loop函数

   这里我用的是FreeRTOS，把setup和loop放在了其中一个任务中，如果是一般的程序，可以放在main函数中，注意loop函数放在while(1)中即可。

   ```C++
   /* USER CODE END Header_DataProcessTask */
   void DataProcessTask(void const *argument) {
       /* USER CODE BEGIN DataProcessTask */
   
       setup();
   
       /* Infinite loop */
       for (;;) {
   
           loop();
   
           osDelay(200);
       }
       /* USER CODE END DataProcessTask */
   }
   ```

   

## 6.2 上位机查看数据

1. 启动节点

   ~~~bash
   使用一根USB线连接单片机和ROS主机
   
   ```BASH
   # 安装rosserial_python包
   sudo apt-get install ros-melodic-rosserial-python
   
   # 查看串口
   lsusb
   ls /dev/tty*
   # 这里会显示有ttyACM0。
   # 注意一点，使用USB-TTL时会显示ttyUSB*，使用虚拟串口会显示ttyACM*
   
   # 赋给串口权限，这里是用于测试，后期项目中需要绑定串口
   sudo chmod 777 /dev/ttyACM0
   
   # 借助rosserial_python显示ros节点信息
   roscore
   rosrun rosserial_python serial_node.py _port:=/dev/ttyACM0 _baud=57600
   
   # 当显示以下内容说明连接正常
   [INFO] [1629459555.223735]: ROS Serial Python Node
   [INFO] [1629459555.234876]: Connecting to /dev/ttyACM0 at 57600 baud
   [INFO] [1629459557.343339]: Requesting topics...
   [INFO] [1629459558.233538]: Note: publish buffer size is 512 bytes
   [INFO] [1629459558.236526]: Setup publisher on chatter [std_msgs/String]
   ~~~

   

2. 查看内容

   ~~~bash
   # 查看单片机话题内容
   rostopic list
   # 会显示有chatter、diagnostics、rosout、rosout_agg四个话题
   # 其中chatter是单片机中的话题，diagnostics是serial_node话题
   
   rostopic echo /chatter
   ``
   ~~~

# 7 实现上位机发布、下位机订阅

1. 上位机发布消息就不多赘述了，注意话题名称一致即可
2. 下位机订阅实现：

​      

```c++
// robot.cpp
#include <std_msgs/UInt8.h>
#include <ros.h>

ros::Subscriber<std_msgs::UInt8> oled_sub("oled_show", &oled_set);

void setup(void) {
    nh.initNode();
    nh.subscribe(oled_sub);
}

void loop(void) {

    nh.spinOnce();

    HAL_Delay(100);
}

int a = 0;

void oled_set(const std_msgs::UInt8 &msg) {
    uint8_t number = msg.data;
    a++;

    HAL_GPIO_TogglePin(LED_GPIO_Port, LED_Pin);

    OLED_ShowNum(20, 12, a, 6, 12);
    OLED_Refresh_Gram();
}
```

