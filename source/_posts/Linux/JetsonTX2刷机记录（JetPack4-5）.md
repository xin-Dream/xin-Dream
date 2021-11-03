---
title: JetsonTX2刷机记录（JetPack4.5）
date: 2021-02-08 16:49:44
tags: 
    [ubuntu18.04,JetsonTX2] 
categories: 
    [Linux,ubuntu]
---

# 写在前面
+ 配置介绍
JetsonTX2、win10系统、VMware15.0中的ubuntu18.04、安装JetPack4.5
+ 注意事项
1. 本文用于记录JetsonTX2的刷机过程，如果想参考本文刷机，请先阅读完整篇文章注意着重标注的步骤再开始刷机
2. 本文仅记录刷机过程，至于具体功能与配置请参考其他文章
3. 本文主要参考YouTube上的视频教程，文末有相关链接
***
# 安装过程
## 1. 硬件准备 
首先准备好JetsonTX2、原装MicroUSB数据线及其相关供电装置，等文中有相关说明后再对板子供电
## 2. Linux系统准备 
在VMware中安装下图配置的ubuntu18.04系统![在这里插入图片描述](https://img-blog.csdnimg.cn/20210207192256738.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQ1MTcyMTU2,size_2,color_FFFFFF,t_70)

主要注意硬盘大小和网络连接模式就可以了，其他的就正常安装就好。这里多说一点硬盘大小：
刷机过程会在虚拟机中下载相当一部分的资料，一开始我设置的只有20G，过程中提示内存不足，扩展到40G后仍然提示不足，所以才扩展到80G。其实50G左右就够了，可以参考我安装完成的内存使用截图：![在这里插入图片描述](https://img-blog.csdnimg.cn/20210207192541659.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQ1MTcyMTU2,size_2,color_FFFFFF,t_70)

## 3. 在虚拟机内下载Jetpack

+ 下载时需要注册NVIDIA账号，后面也要继续用
+ 下载地址：[jetpack](https://developer.nvidia.com/embedded/jetpack)
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210207221321206.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQ1MTcyMTU2,size_16,color_FFFFFF,t_70)

## 4. 安装并运行SDKmanager

```bash
sudo apt install ./sdkmanager_1.4.0-7363_amd64.deb
#安装完成后运行
sdkmanager
```

## 5. 选择型号与位置初选

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210208003221540.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQ1MTcyMTU2,size_16,color_FFFFFF,t_70)
自己选择一个安装位置
**安装选项中选择接受协议，但是不要选稍后安装**。因为我是安装完成后截的图，所以提示的大小有些差别。
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210208003642651.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQ1MTcyMTU2,size_16,color_FFFFFF,t_70)

## 6. 自主安装过程
在上一步选择继续后，输入ubuntu系统的密码就可以开始下载并安装了，注意先不要给TX2上电。
在进度到45%左右时会有个对话框“==SDK Manager is about to flash your Jetson TX2==”
这里先选择 ==Manual Setup==
然后点击Flash

## 7. TX2的硬件连接准备
+ 为TX2使用HDMI连接显示屏（最好不要用转VGA的线，直接接高清线）
+ 连接鼠标和键盘
+ ~~将TX2与电脑使用网线连接到同一个路由器~~在使用USB线连接后，自动设置为USB网络共享
+ 使用MicroUSB线连接TX2与电脑，并将电脑设置为将USB连接至虚拟机
## 8.TX2进入恢复模式
1. 为TX2供电，并完成硬件连接
2. 按下开机键（POWER BTN），按下后马上松开
3. 长按恢复键（REC）
4. 保持按住恢复键，按一下重置键（RST）
5. 按完重置键后即可松开恢复键
## 9. TX2中系统的设置
+ TX进入恢复模式后即可等待自动安装
+ 当连接TX的显示屏中显示系统的初始设置时，电脑的虚拟机中会显示“==Install SDK components on your TX2==”
+ 这时我们先在TX中进行设置，虚拟机中暂时不管
+ 虚拟机中就是正常安装ubuntu的过程，安装完成后，返回虚拟机中的安装页面
+ 输入TX的ubuntu中设置好的用户名与密码
+ 然后就可以等待最后的安装了
## 10.完成安装
虚拟机中点击Finish后即完成安装，至于是否安装成功可以找一些运行TX2中示例的教程
***
# 总结 
+ 安装过程中如果有内存不足的情况，可按下列参考链接扩展磁盘
+ 安装过程如有偏差欢迎大家互相讨论
+ 后面有一部分忘记截图了，大家可以参考视频中的画面

** *
# 参考教程
[JetPack4.2详细刷机视频](https://www.bilibili.com/video/BV1CT4y1E7Yw?t=485)
[VMware中ubuntu磁盘扩展](/2021/02/08/VMware中ubuntu的磁盘扩展/)