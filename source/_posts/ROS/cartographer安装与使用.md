---
layout: post
title: cartographer安装与使用
date: 2021-12-12 21:47:24
tags: [cartographer]
typora-root-url: ..\..
---

# 写在前面

准备写一下cartographer专栏，原理部分能学多少写多少吧，毕竟不是课题组的主要方向，怕是时间不大充裕。以下为系列文章专栏：

{% post_link ROS/cartographer安装与使用  1. cartographer安装与使用 %}

# 1. 安装

安装cartographer确实有点复杂，之前写过一篇文章，{% post_link ROS/ROS-melodic安装cartographer   ROS-melodic安装cartographer %}。文章里是不开代理的流程，有点复杂。

建议还是开个代理，按照官网教程，一步一步的安装，十分流畅，五分钟就能安装完。

[Cartographer_ROS](https://google-cartographer-ros.readthedocs.io/en/latest/compilation.html)

# 2. 使用

## 1. 文件结构

```bash
.
├── abseil-cpp
├── build_isolated
├── devel_isolated
├── install_isolated						# 编译安装后主要使用的文件夹，执行的文件都在share文件夹内
│   ├── bin
│   ├── env.sh
│   ├── include
│   ├── lib
│   ├── local_setup.bash
│   ├── local_setup.sh
│   ├── local_setup.zsh
│   ├── setup.bash
│   ├── setup.sh
│   ├── _setup_util.py
│   ├── setup.zsh
│   └── share
│       ├── autobot_gui
│       ├── autobot_simulation
│       ├── cartographer                # cartographer的主要实现
│       ├── cartographer_ros			# cartographer与ROS的接口，也是我们主要调用的文件夹
│       │   ├── cmake
│       │   ├── configuration_files		# 有lua的配置文件夹
│       │   ├── launch					# 可执行的launch文件，我们可以参考上面和这个这两个文件夹写自己的文件
│       │   ├── package.xml
│       │   └── urdf
│       ├── cartographer_ros_msgs
│       ├── cartographer_rviz
│       ├── gennodejs
│       ├── lidar_slam
│       └── roseus
└── src
    ├── autobot_gui				# 除了cartographer的，都是自己创建的功能包
    ├── autobot_simulation
    ├── cartographer
    ├── cartographer_ros
    ├── CMakeLists.txt -> /opt/ros/noetic/share/catkin/cmake/toplevel.cmake
    └── lidar_slam
```

## 2. 使用catkin_make_isolated

以往对于工作空间的编译都是使用catkin_make,在安装有cartographer的工作空间内使用以下命令编译安装。这个命令会把每一个安装包单独编译安装，不会要求每个变量名都是唯一的，对于跨功能包的msg还能不能继续使用，还有待验证。

```bash
catkin_make_isolated --install --use-ninja
```

在使用这个命令编译安装后，要source的目录是'./install_isolated'。在source后会发现，之前的功能包运行launch文件时会找不到目标文件，这里需要修改一下以前功能包的CMakeLists.txt。

```bash
# 在自己创建功能包的CMakeLists.txt文件内，添加以下内容
# 下面表示，对功能包内的config、launch、meshes、urdf文件夹内的内容进行安装。注意修改称自己功能包下的文件夹目录。

foreach(dir config launch meshes urdf)
	install(DIRECTORY ${dir}/
		DESTINATION ${CATKIN_PACKAGE_SHARE_DESTINATION}/${dir})
endforeach(dir)
```

## 3. 仿真运行

在上面完成了创建功能包的运行，所以自己的仿真环境可以运行了，接下来就给仿真环境添加cartographer的配置文件。

1. 添加配置文件

   这个配置文件可以复制revo_lds.lua修改

   ```lua
   include "map_builder.lua"
   include "trajectory_builder.lua"
   
   options = {
     map_builder = MAP_BUILDER,
     trajectory_builder = TRAJECTORY_BUILDER,
     map_frame = "map",
     -- tracking_frame更改为我们机器人的基坐标tf，一般是base_link
     tracking_frame = "base_link",
       
     -- map连接到哪个坐标系
     published_frame = "odom",
     odom_frame = "odom",
   
     -- 开关参数
     provide_odom_frame = false,
     publish_frame_projected_to_2d = false,
     use_pose_extrapolator = true,
     use_odometry = false,
     use_nav_sat = false,
     use_landmarks = false,
     -- 激光雷达数量
     num_laser_scans = 1,
     num_multi_echo_laser_scans = 0,
     num_subdivisions_per_laser_scan = 1,
     num_point_clouds = 0,
     lookup_transform_timeout_sec = 0.2,
     submap_publish_period_sec = 0.3,
     pose_publish_period_sec = 5e-3,
     trajectory_publish_period_sec = 30e-3,
     rangefinder_sampling_ratio = 1.,
     odometry_sampling_ratio = 1.,
     fixed_frame_pose_sampling_ratio = 1.,
     imu_sampling_ratio = 1.,
     landmarks_sampling_ratio = 1.,
   }
   
   MAP_BUILDER.use_trajectory_builder_2d = true
   
   TRAJECTORY_BUILDER_2D.submaps.num_range_data = 35
   TRAJECTORY_BUILDER_2D.min_range = 0.3
   TRAJECTORY_BUILDER_2D.max_range = 8.
   TRAJECTORY_BUILDER_2D.missing_data_ray_length = 1.
   TRAJECTORY_BUILDER_2D.use_imu_data = false
   TRAJECTORY_BUILDER_2D.use_online_correlative_scan_matching = true
   TRAJECTORY_BUILDER_2D.real_time_correlative_scan_matcher.linear_search_window = 0.1
   TRAJECTORY_BUILDER_2D.real_time_correlative_scan_matcher.translation_delta_cost_weight = 10.
   TRAJECTORY_BUILDER_2D.real_time_correlative_scan_matcher.rotation_delta_cost_weight = 1e-1
   
   POSE_GRAPH.optimization_problem.huber_scale = 1e2
   POSE_GRAPH.optimize_every_n_nodes = 35
   POSE_GRAPH.constraint_builder.min_score = 0.65
   
   return options
   ```

   

2. 添加launch文件

   可以复制demo_revo_lds..launch的修改

   ```xml
   <launch>
     <param name="/use_sim_time" value="true" />
   
     <node name="cartographer_node" pkg="cartographer_ros"
         type="cartographer_node" args="
             -configuration_directory $(find lidar_slam)/configuration_files
             -configuration_basename autobot_cartographer.lua"
         output="screen">
         
       <remap from="scan" to="/scan" />
       <remap from="odom" to="/odom" />
     </node>
   
     <node name="cartographer_occupancy_grid_node" pkg="cartographer_ros"
         type="cartographer_occupancy_grid_node" args="-resolution 0.05" />
   
   </launch>
   
   ```

3. 运行

   在启动仿真环境后，再运行上面的launch文件，再RVIZ中添加cartographer插件即可

![2021-12-12-15-22-42](/images/cartographer安装与使用/2021-12-12-15-22-42.png)

