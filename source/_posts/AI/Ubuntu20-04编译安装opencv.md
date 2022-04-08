---
layout: post
title: Ubuntu20.04编译安装opencv
date: 2021-12-05 11:10:43
tags: 
    [opencv] 
categories: 
    [AI,opencv]
typora-root-url: ..\..

---


# 1 下载OpenCV

[opencv下载地址](https://opencv.org/releases/)

# 2 安装opencv依赖

```bash
sudo apt-get install build-essential libgtk2.0-dev libavcodec-dev libavformat-dev libjpeg-dev libswscale-dev libtiff5-dev
sudo apt-get install libgtk2.0-dev
sudo apt-get install pkg-config
```


# 3 编译安装

在下载的opencv文件夹内新建build文件夹

```bash
cd build
cmake -D CMAKE_BUILD_TYPE=Release -D CMAKE_INSTALL_PREFIX=/usr/local ..
sudo make -j4
sudo make install	
```


# 4 环境配置

```bash
sudo vim /etc/ld.so.conf
# 在文件内添加如下一行
include /usr/local/lib

sudo vim /etc/bash.bashrc 
# 文件最后添加如下两行
PKG_CONFIG_PATH=$PKG_CONFIG_PATH:/usr/local/lib/pkgconfig
export PKG_CONFIG_PATH
```


# 5 验证

```bash
pkg-config opencv --modversion

# 或者可以运行opencv中的例程
cd opencv/sample/cpp/example_cmake

cmake .
make 
./opencv_examp
```

