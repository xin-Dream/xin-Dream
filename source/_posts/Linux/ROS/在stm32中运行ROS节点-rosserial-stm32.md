---
title: 在STM32F407中运行ROS节点-rosserial_stm32
date: 2021-08-18 20:50:01
tags: 
    [ROS] 
categories: 
    [Linux,ROS]
---

> 环境说明：
> Ubuntu18.04、ROS-melodic、STM32F407VGT6

这个方法只适用于stm32F3、F4和F7的开发板

# 1. 创建工作空间
```bash
mkdir -p workspace/src
cd workspace
catkin_make

# 这里的工作空间有必要说明一下，在工作空间中的src目录下不止可以放置ROS程序，还可以放置单片机的程序，只要自己管理好src中不同功能包就好
# 所以对一个项目来说，我们把上位机程序、ROS程序、单片机程序放入一个工作空间中
# 将创建的stm32项目整体放入src目录下
```

# 2. 在github中下载rosserial_stm32

[rosserial_stm32](https://github.com/yoneken/rosserial_stm32)
不管使用git clone下载，还是使用zip下载，将其也放入workspace中的src目录下。

**如果整个工作空间是github中的repository，在clone下rosserial_stm32后要先删除`.git`和`.gitignore`。否则将工作空间进行push的时候会将下层文件夹当作是子模块。**

# 3. 使用rosserial_stm32编译生成头文件

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
  #注意这里后面的路径，最好用绝对路径，最后落到32程序的Core文件夹，里面包括Inc和Src文件夹即可
  ```

# 4. 生成后stm32中文件夹目录
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

  

