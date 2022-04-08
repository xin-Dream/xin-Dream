---
title: ubuntu18.04使用RealSenseD435i
date: 2021-09-04 20:58:23
tags:
    [opencv]
categories:
    [AI,opencv]
---

[官方安装教程](https://github.com/IntelRealSense/librealsense/blob/master/doc/distribution_linux.md)

# 安装Intel RealSense SDK2.0

1. 添加公钥
```bash
sudo apt-key adv --keyserver keyserver.ubuntu.com --recv-key F6E65AC044F831AC80A06380C8B3A55A6F3EFCDE || sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv-key F6E65AC044F831AC80A06380C8B3A55A6F3EFCDE 
```

2. 添加服务器
```bash
sudo add-apt-repository "deb https://librealsense.intel.com/Debian/apt-repo $(lsb_release -cs) main" -u 
```

3. 安装依赖
```bash
sudo apt-get install librealsense2-dkms
sudo apt-get install librealsense2-utils
```

4. 验证
    连接相机，终端运行`realsense-viewer`