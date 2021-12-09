---
layout: post
title: Ubuntu配置KinectV2
date: 2021-12-05 11:00:39
tags:
    [ubuntu,KinectV2]
categories:
    [Linux,ubuntu]
typora-root-url: ..\..

---


# 前言

[libfreenect2](https://github.com/OpenKinect/libfreenect2/blob/master/README.md#linux)



# 1 下载libfreenect2资源

```bash
git clone https://github.com/OpenKinect/libfreenect2.git
```

# 2 安装opencv

{% post_link 机器视觉/Ubuntu20-04编译安装opencv  Ubuntu20-04编译安装opencv %}

# 3 安装Kinect依赖

```bash
sudo apt-get install build-essential cmake pkg-config libturbojpeg libjpeg-turbo8-dev mesa-common-de libxrandr-dev libxi-dev 
sudo apt-get install libglfw3-dev

# lisbusb
sudo apt-get install libusb-1.0-0-dev

# TurboJPEG
sudo apt-get install libturbojpeg0-dev

# OpenGL
sudo apt-get install libgl1-mesa-dev
sudo apt-get install libglu1-mesa-dev
sudo apt-get install freeglut3-dev
sudo apt-get install libglew1.8 libglew-dev
sudo apt-get install libgl1-mesa-glx
sudo apt-get install libxmu-dev

# OpenCl
sudo apt-get install opencl-headers
```


# 4 编译安装

```bash
cd libfreenect2
mkdir build
cd build
cmake .. -DCMAKE_INSTALL_PREFIX=$HOME/freenect2
make
sudo make install
```


# 5 添加USB文件

```bash
sudo cp libfreenect2/platform/linux/udev/90-kinect2.rules /etc/udev/rules.d/
```

这个文件里表示的是kinect的串口号


# 6 安装OpenNI2

1. 下载

   [OpenNI2 SDK 下载地址](https://structure.io/openni)

2. 添加变量

   1. 在解压目录下执行install.sh

      ```bash
      sudo ./install.sh
      ```

   2. 将OpenNIDevEnvironment添加到终端

      ```bash
      cat OpenNIDevEnvironment >> ~/.zshrc
      ```

3. 安装

   ```bash
   cd /OpenNI-Linux-x64-2.2.0.33/OpenNI-Linux-x64-2.2
   sudo cp -r ./Include /usr/include/openni2
   cd Redist/
   sudo cp libOpenNI2.jni.so /usr/lib/
   sudo cp libOpenNI2.so /usr/lib/
   ```

4. 检测

   ```bash
   pkg-config --modversion libopenni2
   ```



# 7 运行

进入下载的libfreenect2里的build文件夹内，分别运行下述命令，可以分别测试各项能否运行。

```
# openGL
./bin/Protonect pl

# OpenCL
./bin/Protonect cl

# CPU
./bin/Protonect cpu

./bin/Protonect
```

