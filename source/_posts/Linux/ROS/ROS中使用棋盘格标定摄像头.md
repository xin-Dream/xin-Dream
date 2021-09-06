---
title: ROS中使用棋盘格标定摄像头
date: 2021-09-05 17:24:09
tags: 
    [ROS] 
categories: 
    [Linux,ROS]
---

# 1. 打开摄像头

在robot_vision功能包中新建usb_cam.launch

```launch
<launch>
    <node name="usb_cam" pkg="usb_cam" type="usb_cam_node" output="screen">

        <param name="video_device" value="/dev/video0"/>
        <param name="image_width" value="640"/>
        <param name="image_height" value="480"/>
        <param name="pixel_format" value="yuyv"/>
        <param name="camera_frame_id" value="usb_cam"/>
        <param name="io_method" value="mmap"/>

    </node>
</launch>
```

# 2. 安装标定功能包

```bash
sudo apt-get install ros-melodic-camera-calibration
```



# 3. 开启标定界面

```bahs
roslaunch robot_vision usb_cam.launch

rosrun camera_calibration cameracalibrator.py --size 6x4 --square 0.025 image:=/usb_cam/image_raw camera:=/usb_cam
```

第二个命令中：

​	size : 表示棋盘格内角点数量

​	square：实际每个黑色方块的尺寸，单位是米

# 4. 标定过程与棋盘格说明

棋盘格如下图所示，对棋盘格的要求：

	+ 正方形；
	+ 行数和列数不严格要求，可以在命令中设置；
	+ 最外面一圈一定要是黑色方块；
	+ 上一步中说的size，即是图中被圈出的点，四行六列

界面中

	+ X和Y表示棋盘格在视野内上下和左右的运动；
	+ size表示大小，即棋盘格距离摄像头的远近；
	+ skew表示翻转，注意是翻转而不是旋转

标定过程应该让图中彩色的横条尽量变为绿色。

{% asset_img 01.png This is an image %}



等到calibrate变为深色，表示数据采集足够。点击calibrate后会停顿一段时间，等save和commit变为深色后，即可点击save后commit。

至此摄像头标定过程完成，下次打开摄像头会自动找到数据。

