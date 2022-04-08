---
title: 树莓派配置opencv环境
date: 2021-01-28 22:23:23
tags: 
    [opencv] 
categories: 
    [AI,opencv]
---
# 树莓派摄像头测试
这里我用的是USB接口的摄像头。在命令行输入

```c
lsusb
```

端口显示会有摄像头的ID。

接下来就是打开摄像头检测
对于USB的摄像头需要下载驱动软件

```c
sudo apt-get install fswebcam
```

下载完驱动后，在终端输入

```bash
fswebcam --no-banner -r 640*480 camera.jpg
```
在/home/pi目录下生成摄像头拍摄的照片

# 在python2上安装opencv
## 安装

```c
sudo apt-get install libopencv-dev
sudo apt-get install python-opencv
```

~~第一条代码在我的树莓派上运行会因为有一些依赖包不能安装失败，第二条代码正常~~ 
### 2020.05.05修改：
配置完环境后发现有些地方缺少依赖是不行的，有重新安装了一遍依赖包，后面也一样。
有一些在安装过程中出现错误

```c
//无法修正错误，因为您要求某些软件包保持现状，就是它们破坏了软件包间的依赖关系

//这种情况可以用aptitude解决，如果没有的话需要安装aptitude
sudo apt-get install aptitude
//安装过程中可能还会出现错误，这可能是源的问题
//请注意源的版本
//我的树莓派是buster版本，一开始换成了stretch版本，会出现这样的错误

//然后可以用aptitude重新安装依赖包试一下
sudo aptitude install libopencv-python
```
在用aptitude时，会自动给出解决方案，里面有Y/N/q/?几个选项，方案不合适可以选N，0更改方案，找到合适解决方案（对依赖包升级或降级）后进行依赖包的安装
## 测试

```c
//在python环境下运行，即可可以查看opencv的版本号
import cv2
cv2.__version__
```

# 在python3环境下安装opencv
以下安装过程花费时间最长，大概六个小时左右，一定要保证树莓派供电充足。
## 扩展目录
如果是正常安装的树莓派系统，需要将根目录扩展到SD卡。由于我是用NOOBS安装的系统，在安装过程中就自动扩展了目录。
扩展办法：

```c
sudo raspi-config
//在Advanced Options中选择Expand Filesystem
//完成后重启计算机
```

## 安装opencv所需的库
以下内容有一部分我运行并不成功，有些因为依赖包导致的安装失败，目前来说并不影响，后面出现的错误也有修正

```c
sudo apt-get install build-essential git cmake pkg-config -y
sudo apt-get install libjpeg8-dev -y
sudo apt-get install libtiff5-dev -y
sudo apt-get install libjasper-dev -y
sudo apt-get install libpng12-dev -y
sudo apt-get install libavcodec-dev libavformat-dev  libswscale-dev libv4l-dev -y

sudo apt-get install libgtk2.0-dev -y
sudo apt-get install libatlas-base-dev gfortran -y
```
### 2020.05.05修改
在之前的安装过程中，前六项安装正常，libgtk2.0-dev安装失败
这时候需要再检查以下源是否正确，下面是我用的清华源地址，buster版本

```bash
# 编辑 `/etc/apt/sources.list` 文件：
deb http://mirrors.tuna.tsinghua.edu.cn/raspbian/raspbian/ buster main non-free contrib rpi
deb-src http://mirrors.tuna.tsinghua.edu.cn/raspbian/raspbian/ buster main non-free contrib rpi

# 编辑 `/etc/apt/sources.list.d/raspi.list` 文件
deb http://mirrors.tuna.tsinghua.edu.cn/raspberrypi/ buster main ui
```

## 下载opencv
可以进入到/home/pi/Downloads目录，下载以下两个压缩包

### 2020.05.05修改
后来的配置过程中，换了一个4.1.0版本，步骤大概都一样

```c
cd /home/pi/Downloads

3.4.0版本

//wget https://github.com/Itseez/opencv/archive/3.4.0.zip
//wget https://github.com/Itseez/opencv_contrib/archive/3.4.0.zip 

4.1.0版本
git clone -b 4.1.0 --recursive https://github.com/opencv/opencv.git
git clone -b 4.1.0 --recursive https://github.com/opencv/opencv_contrib.git

//这里下载完成后是名为3.4.0.zip和3.4.0.zip.1的两个压缩包
//为了配合教程后面的编译路径，我把它们分别重新命名为opencv-3.4.0.zip和opencv_contrib-3.4.0.zip切记顺序不能错
//然后就是解压
unzip opencv-3.4.0.zip
unzip opencv_contrib-3.4.0.zip
```

## 编译
创建路径

```c
cd /home/pi/Downloads/opencv-3.4.0
mkdir build
cd build
```

设置cmake参数

```c
cmake -D CMAKE_BUILD_TYPE=RELEASE -D CMAKE_INSTALL_PREFIX=/usr/local
 -D INSTALL_C_EXAMPLES=ON 
 -D INSTALL_PYTHON_EXAMPLES=ON 
 -D OPENCV_EXTRA_MODULES_PATH=/home/pi/Downloads/opencv_contrib-3.4.0/modules 
 //-D OPENCV_EXTRA_MODULES_PATH=/home/pi/Downloads/opencv_contrib-4.3.0/modules 
 -D BUILD_EXAMPLES=ON 
 -D WITH_LIBV4L=ON PYTHON3_EXECUTABLE=/usr/bin/python3.7  
 PYTHON_INCLUDE_DIR=/usr/include/python3.7 
 PYTHON_LIBRARY=/usr/lib/arm-linux-gnueabihf/libpython3.7m.so 
 PYTHON3_NUMPY_INCLUDE_DIRS=/home/pi/.local/lib/python3.7/site-packages/numpy/core/include ..
```

配置完成后，在文章最后会显示

```c
Configuring done
Generating doone
Build files have been written to: /home/pi/Downloads/opencv-3.4.0/build
```

设置完成后编译，这是时间最长的一步，需要几个小时，而且过程中还会出很多错误，以下是按我遇到的顺序列出的错误和找到的解决方案

```c
cd /home/pi/Downloads/opencv-3.4.0/build
make
#之后编译开始
```
### 2020.05.06备注
**在安装4.3.0时，编译过程没有出现一个错误。仔细研究3.4.0过程中的错误发现，大多数错误应该是由于路径不匹配，内容有缺失，而且较新的版本对以前hpp文件中的路径等问题已经做了修改，所以安装opencv最好选较新版本安装，并且保持路径和cmake参数一致，安装时根据实际情况修改。**

### 安装3.4.0的错误列表
#### fatal error:boostdesc_bgm.i:没有那个文件或目录
解决：下载对应文件移动到下列目录；实际上并不只缺少boostdesc_bgm.i一个文件，可以直接移动这十一个文件到以下目录
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200503222713162.png)
文件[下载链接](https://download.csdn.net/download/ninwji/11739702)
```bash
/home/pi/Downloads/opencv_contrib-3.4.0/modules/xfeatures2d/src
```
#### fatal error: opencv2/xfeatures2d/cuda.hpp: 没有那个文件或目录
这是路径错误，需要在两个文件内修改cuda.cpp为绝对路径

```c
vim /home/pi/Downloads/opencv-3.4.0/modules/stitching/include/opencv2/stitching/detail/matchers.hpp
//替换#include "opencv2/xfeatures2d/cuda.hpp"
#include "/home/pi/Downloads/opencv_contrib-3.4.3/modules/xfeatures2d/include/opencv2/xfeatures2d/cuda.hpp"

//在第二个文件内修改
vim /home/pi/Folder/opencv-3.4.3/modules/stitching/src/precomp.hpp
//同样替换上述内容
#include "/home/pi/Downloads/opencv_contrib-3.4.3/modules/xfeatures2d/include/opencv2/xfeatures2d/cuda.hpp"
```
#### fatal error: opencv2/xfeatures2d/nonfree.hpp: 没有那个文件或目录
同样是路径错误

```c
vim /home/pi/Downloads/opencv_contrib-3.4.3/modules/xfeatures2d/include/opencv2/xfeatures2d.hpp
//替换内容
#include "/home/pi/Downloads/opencv_contrib-3.4.3/modules/xfeatures2d/include/opencv2/xfeatures2d/nonfree.hpp"
```
#### fatal error: opencv2/xfeatures2d.hpp: 没有那个文件或目录
```c
vim /home/pi/Downloads/opencv-3.4.3/modules/stitching/src/matchers.cpp
//替换内容
#include "/home/pi/Downloads/opencv_contrib-3.4.3/modules/xfeatures2d/include/opencv2/xfeatures2d.hpp"
```
#### 编译在97%的时候，make错误

```c
vim /home/pi/Downloads/opencv-3.4.0/modules/python/src2/cv2.cpp
//在大概第886行左右的地方，修改char* str = PyString AsString(obj); 为
const char*str = PyString AsString(obj);
```
在安装过程中我就遇到以上五个错误
## 测试
make 命令执行完成后，先执行以下命令

```c
sudo make install
```
测试内容和python2中大概相似，只不过这次是在python3中执行

```bash
import cv2
cv2.__version__
```
# 总结

整个安装过程大概花费了六个小时时间，包括运行和查资料的时间，找到的教程有些是错误总结，有些是全教程，查找比较浪费时间。本文记录了这次安装过程，以后用到的时候方便查看。

# 参考教程
本文的主要参考：[子豪兄教你在树莓派上安装OpenCV](https://zhuanlan.zhihu.com/p/46032511)
错误总结参考：1.[树莓派安装opencv错误大全](https://blog.csdn.net/I_LOVE_MCU/article/details/103908671)
   				--------------------2.[树莓派搭建opencv错误记录](https://blog.csdn.net/accepted_ac/article/details/103719959)
缺失文件下载链接 ： [boostdesc vgg_generated.zip](https://download.csdn.net/download/ninwji/11739702)
