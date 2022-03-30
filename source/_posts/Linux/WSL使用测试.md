---
layout: post
title: WSL使用测试
date: 2022-03-13 19:34:43
tags: 
    [WSL] 
categories: 
    [Linux,ubuntu]
typora-root-url: ..\..
---

# 1. 升级到WSL2

![WSL版本](/images/WSL使用测试/image-20220313193707500.png)

升级后使用速度是比WSL更快，但是WSL2占用Windows资源更多，主机CPU占用容易升高。

# 2. 设置WSL2开机启动

在Win11中使用WSL时，可以将子系统中的应用图标直接放到桌面，但windows开机后不会自动开启WSL服务，Ubuntu中的应用也不能直接打开。所以配置开机自动启动WSL中的服务。

## 2.1 设置方法

1. 在Linux中创建脚本
   ```bash
    #! /bin/sh
    /etc/init.d/ssh start
   ```
   
2. 在windows中创建脚本
   在开机启动文件夹下新建文件：linux-start.vbs，输入以下内容。
   
   ```bash
   set ws = WScript.CreateObject("WScript.Shell")
   ws.run "wsl -d ubuntu -u root /etc/init.wsl"
   ```


## 2.2 实际体验

开机时通过脚本启动WSL中的服务，可以直接打开WSL中的应用，但WSL程序运行会导致CPU占用明显增高，详见2.6 对WSL2使用总结

# 3 WSL2调用GPU

## 3.1 调用方法

这里使用的GPU是使用虚拟GPU，对不同的GPU有不同的是用与WSL的GPU驱动程序。[CUDA on Windows Subsystem for Linux （WSL）](https://developer.nvidia.com/cuda/wsl)

1. 使用GUI应用
   安装了vGPU驱动程序后，可以在Windows中安装Linux的GUI程序，可以将Ubuntu中的应用程序像在windows中一样启动、切换、复制粘贴等。如图2所示，在开始菜单中显示的应用列表。如图3所示，在Windows运行的的任务管理器和在Linux中运行的terminator、文件管理器、cutecom三个应用。
   ![Windows开始菜单中的Linux应用](/images/WSL使用测试/image-20220313194336731.png)
   ![在windows中打开Linux GUI应用](/images/WSL使用测试/image-20220313194346532.png)

    在启用Rviz这类GUI程序时，需要借用Xserver开启远程显示，流程如下：
      + 在windows中开启Xserver:可以使用单独的Xserver应用，我使用的是MobaXterm，集SSH、Sftp、Telnet等一体的应用，如图.    
   
   ​	![MobaXterm中开启X server](/images/WSL使用测试/image-20220313194720102.png)
      + 在Ubuntu的.bashrc中设置远程显示
   
        ```bash
        export DISPLAY=192.168.2.100:0.0
        ```
   
        

2. 使用vGPU加速机器学习训练
    在微软的WindowsAI文档中的直接机器学习（DirectML）中包括WSL中的GPU加速ML训练。在WSL中的具体使用可见：[GPU accelerated ML training](https://docs.microsoft.com/zh-cn/windows/ai/directml/gpu-accelerated-training)。
    在WSL中使用CUDA可见NVIDA的文档：[NVIDIA GPU Accelerated Computing on WSL 2](https://docs.nvidia.com/cuda/wsl-user-guide/index.html#getting-started-with-cuda-on-wsl)
    
    ![vGPU工作架构](/images/WSL使用测试/image-20220313195105827.png)

3.2 使用体验

在使用Linux中安装的应用时的速度通过借助vGPU确实有明显提高，但使用Gazebo、Rviz时仍然大量占用CPU资源，见图6。

![使用Gazebo时的CPU占用](/images/WSL使用测试/image-20220313195153340.png)

# 4. WSL2使用USB

## 4.1 使用方法

WSL不能连接USB设备，需要借助usbipd-win项目才能连接windows主机上的USB设备。

1.	下载并安装usbipd-win_x.msi：[下载地址](https://github.com/dorssel/usbipd-win/releases)

2. 安装用户空间工具和USB硬件标识符数据库

   ```bash
   sudo apt install linux-tools-5.4.0-77-generic hwdata
   sudo update-alternatives –install /usr/local/bin/usbip usbip /usr/lib/linux-tools/5.4.0-77-generic/usbip 20
   ```

3. 在Windows中使用管理员模式打开PowerShell，列出Windows相连的USB设备

   ![Windows相连的USB设备](/images/WSL使用测试/image-20220313195435420.png)

4. 通过以下命令选择要挂载的设备，并在Ubuntu中查看

   ![挂载后分别在Windows和WSL中查看USB设备](/images/WSL使用测试/image-20220313195511453.png)

5. 通过以下命令可以断开USB设备的连接

   ```bash
   usbipd wsl detach –busid <busid>
   ```

## 4.2 使用体验

从官方文档和上述操作来看，WSL已经正常挂载了USB设备，但是在实际使用中还有些问题。
将雷达连接到Windows中时，可以看到图中在Ubuntu中已经显示成功挂载了CP210x UART Bridge设备，但是它并不能在/dev/中显示，这是因为Ubuntu中缺少CP210x驱动。
经过几次尝试之后发现：在WSL中无法安装CP210x驱动。
安装CP210x驱动需要在官网下载驱动，并通过make编译安装，但WSL中缺少对应规则，无法安装。下图为Darling文档和作者在Github对相关问题的回复。

![Darling作者在Github对相关问题的回复](/images/WSL使用测试/image-20220313195738914.png)

![Darling Docs](/images/WSL使用测试/image-20220313195842034.png)

虽然WSL中不能安装CP210x驱动，影响了激光雷达的使用，但是并不影响stm32的使用。无法安装USB转串口驱动，stm32和Ubuntu通信时可以使用VCP虚拟串口。由图11可见，stm32连接到COM5后挂载到Ubuntu，在Ubuntu的/dev目录下可以看到ttyACM0，可以在usb设备列表中看到STMcroelectronics Virtual COM Port.

![stm32使用VCP虚拟串口连接到WSL](/images/WSL使用测试/image-20220313195906088.png)

# 5	Vmmem占用

使用WSL时经常出现Vmmem占用过高，这会大量占用CPU资源，影响Windows资源管理器运行，导致windows系统卡顿，频闪。如下图所示。

![Vmmem占用过高](/images/WSL使用测试/image-20220313200014905.png)

这个问题查看文章：[vmmem 进程占用CPU资源的解决办法](https://blog.csdn.net/vandavidchou/article/details/117143614) 后有明显改善。

# 6 WSL使用总结

经过一段时间的测试，在解决了vmmem占用CPU资源过多后，WSL2在使用过程中并没有明显卡顿，windows也使用正常，但以下两个问题无法解决。

1. Gazebo等无法借助GPU；
2. 无法编译安装USB转串口驱动。
