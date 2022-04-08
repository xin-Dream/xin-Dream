---
layout: post
title: NUCLEO使用
date: 2022-03-29 13:33:30
tags: 
    [stm32,NUCLEO] 
categories: 
    [STM32]
typora-root-url: ..\..
---
# 前言

NUCLEO作为ST官方的开发板，它的设计和说明文档都比较仔细，本文中主要记录使用时发现的设计细节。

本次使用开发板型号为：NUCLEO-F767ZI

![NUCLEO-F767ZI](/images/NUCLEO设计点/image-20220329140820456.png)

# 1. 文档下载

可以在链接：[STM32 Nucleo 板](https://www.st.com/zh/evaluation-tools/stm32-nucleo-boards.html)中找到自己使用的型号，在用户手册中可以找到板子的详细说明。在CAD资源中可以下载板子的原理图和PCB文件，可以从正规的设计样例中学习布线和原理，使用的是四层板，隐藏铺铜后是这样。可以从原理图中选择特定网络查看对应PCB。

![image-20220329162808033](/images/NUCLEO使用/image-20220329162808033.png)

# 2. OpenOCD下载使用的cfg文件

```
# STMicroelectronics STM32F7 Nucleo development board
# Known boards: NUCLEO-F746ZG and NUCLEO-F767ZI

source [find interface/stlink.cfg]

transport select hla_swd

source [find target/stm32f7x.cfg]
```

# 3. 自带ST-Link下载器

![Top layout](/images/NUCLEO使用/image-20220329151418610.png)

可以看到上面的CN1为USB接口连接的ST-Link,CN4为ST-Link选择跳线。在嵌入式ST-Link一节中有关于CN4跳线的选择。在下表中可以看到，CN4都打开的时候，ST-Link使用的是板上编程；CN4都关闭的时候，ST-Link使能外部连接。

![CN4 states of the jumpers](/images/NUCLEO使用/image-20220329152102119.png)

![Connecting the STM32 Nucleo-144 board to program the on-board STM32](/images/NUCLEO使用/image-20220329164148239.png)

如果使用外部下载的话，在文档的6.3.4节中也有说明：

![Debug connector CN6 (SWD)](/images/NUCLEO使用/image-20220329164439626.png)

# 4. 铺铜的分区

NUCLEO是一个六层板，主要分Top、GND、Signal、PWR、GND、Bottom六层，每一层的铺铜都很规则，这里我就选出了比较简单的PWR层，这一层主要是电源。如图8中所示，高亮的为三个不同区域，左上角为3.3V，右上角为U5V，左下角为VDD，其他部分还有很多小的分区对应不同网络。

![PWR铺铜分区](/images/NUCLEO使用/image-20220402160839952.png)

#  5. 跳线帽与0Ω电阻

在NUCLEO板中有很多处使用跳线或0Ω电阻作为复用端口选择的地方，如下图中的JP3，可以通过跳线选择供电方式，图10中的LED通过0Ω电阻联通LED2与LED3

![image-20220402160944621](/images/NUCLEO使用/image-20220402160944621.png)
![image-20220402160949214](/images/NUCLEO使用/image-20220402160949214.png)
![image-20220402160958312](/images/NUCLEO使用/image-20220402160958312.png)
![image-20220402161003734](/images/NUCLEO使用/image-20220402161003734.png)
![image-20220402161008324](/images/NUCLEO使用/image-20220402161008324.png)

