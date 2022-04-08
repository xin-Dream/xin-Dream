---
title: Ubuntu18.04配置Clion开发stm32
date: 2021-08-27 11:43:06
tags: 
    [stm32,Jetbrains] 
categories: 
    [STM32]
typora-root-url: ..\..
---

> 参考windows中的配置过程
> {% post_link 单片机/配置Clion开发stm32  配置Clion开发stm32 %}


# 一、 环境准备

1. gcc-arm-none-eabi

[下载地址](https://developer.arm.com/tools-and-software/open-source-software/developer-tools/gnu-toolchain/gnu-rm/downloads)
下载后解压到合适位置，并再etc/profile中添加path
```bash
sudo vim /etc/profile

export PATH=$PATH:/home/dream/gcc-arm-none-eabi-10.3-2021.07/bin
```
注意安装完成后要source一下

使用`sudo apt install gcc-arm-none-eabi`也可以，但是后面需要设置他的路径，这个路径不好找。

2. openocd

```bash
sudo apt install openocd
```
3. Clion
4. STM32CubeMX

# 二、 Clion设置

1. Toolchains

File -> Build,Execution,Deployment -> Toolchains
新建一个设置，参考下图
![01](/images/Ubuntu18-04配置Clion开发stm32/01.png)

2. CMake

File -> Build,Execution,Deployment -> CMake
配置参考下图

![02](/images/Ubuntu18-04配置Clion开发stm32/02.png)

3. 下载器
   + 自己找个位置新建config文件夹，用于存放不同下载器得cfg文件，新建一个daplink.cfg（这里我用cmsis_dap调试器）
   + 在daplink.cfg文件中添加内容
    ```bash
    source [find interface/cmsis-dap.cfg]
    transport select swd
   
    # 0x10000 = 64K Flash Size
    set FLASH_SIZE=0x160000
   
    source [find target/stm32f4x.cfg]
    ```

   + 在下载选项中选择Edit configuration,参考下图设置![03](/images/Ubuntu18-04配置Clion开发stm32/03.png)

4. 编译、下载测试



