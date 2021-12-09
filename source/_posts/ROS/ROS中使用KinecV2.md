---
layout: post
title: ROS-noetic中使用KinecV2
date: 2021-12-05 16:28:06
tags: 
    [ROS,KinectV2] 
categories: 
    [Linux,ROS]

---

# 前言

在前面的文章中实现了Ubuntu中安装了KinectV2的驱动，要在ROS中使用还需要借助iai_kinect2

{% post_link Linux/Ubuntu配置KinectV2  Ubuntu配置KinectV2 %}



本文参考：

+ [Kinect V2 在ros-noetic使用（ubuntu20.04）](https://blog.csdn.net/qq_34935373/article/details/121424754)
+ [IAI Kinect2](https://github.com/code-iai/iai_kinect2/tree/master)
+ [run "rosdep install -r --from-paths ." error when I install iai_kinect2](https://answers.ros.org/question/237451/run-rosdep-install-r-from-paths-error-when-i-install-iai_kinect2/)
+ [ROS下kinect2驱动安装流程记录和遇到的问题解决心得](https://itpcb.com/a/1824181)
+ 

​	

# 1 下载并编译IAI Kinect2

```bash
cd ~/catkin_ws/src/
git clone https://github.com/code-iai/iai_kinect2.git
cd iai_kinect2 
rosdep install -r --from-paths . --ignore-src -r

cd ~/catkin_ws
catkin_make -DCMAKE_BUILD_TYPE="Release"
```


# 2 编译时遇到的问题

1. 在上一篇文章{% post_link Linux/Ubuntu配置KinectV2  Ubuntu配置KinectV2 %}的第四步中，有一个指定的路径`cmake .. -DCMAKE_INSTALL_PREFIX=$HOME/freenect2`。如果这个freenect2不是在HOME下，需要使用以下命令编译。DIR后是上篇文章中freenect2的位置

   ```bash
   catkin_make -Dfreenect2_DIR=/home/dream/02-software/007-libfreenect2/lib/cmake/freenect2 -DCMAKE_BUILD_TYPE="Release"
   ```

2. `error: #error PCL requires C++14 or above`

   仔细看以下这个错误对应的哪一个功能包，在对应的功能包的CMakeLists.txt中加入

   ```bash
     ADD_COMPILE_OPTIONS(-std=c++11 )
     ADD_COMPILE_OPTIONS(-std=c++14 )
     set( CMAKE_CXX_FLAGS "-std=c++11 -O3" )
   ```

3. `error: CV_IMWRITE_JPEG_QUALITY was not declared in this scope`

   在对应文件内，找到报错的那一行代码，进行如下规则的替换。注意没报错的不要改，报错的先看下是不是下面的两条，不是的话再修改

   ```C++
   CV_IMWRITE_JPEG_QUALITY
   // 更改为
   cv::IMWRITE_JPEG_QUALITY
   ```

   

4. `error: CV_BGR2GRAY was not declared in this scope`

   在对应文件内添加头文件。这个应该是在kinect2_bridge/src/kinect2_bridge.cpp。

   ```C++
   #include <opencv2/imgproc/types_c.h> 
   ```

5. `error: CV_AA was not declared in this scope`

   在对应的文件内添加头文件。这个应该是在kinect2_viewer/src/viewer.cpp。

   ```C++
   #include<opencv2/imgproc/imgproc_c.h>
   ```

6. 编译到100%后还会有两个错误，目前还没解决，但对后面使用不影响，只是kinect2_viewer不能使用

# 3 运行程序验证

```bash
roslaunch kinect2_bridge kinect2_bridge.launch

rosrun image_view image_view image:=/kinect2/qhd/image_color
```

