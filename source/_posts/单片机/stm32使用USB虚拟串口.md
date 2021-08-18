---
title: stm32使用USB虚拟串口
date: 2021-08-18 16:59:50
tags: 
    [stm32,USB] 
categories: 
    [单片机,STM32]
---

> 环境说明
> stm32CubeMX、Clion、Windows10、Ubuntu18.04

# 一、在clion中新建stm32项目

此处参考另一篇文章{% post_link 单片机/配置CLion开发stm32  配置CLion开发stm32 %}

# 二、stm32CubeMX中的配置

1. 基础配置
   + SystemCore -> RCC -> HSE -> Crystal/Ceramic Resonator
   + SYS -> Debug -> Serial Wire
   + 在Clock Configuration中设置需要的频率

2. USB设置
   (1) Connectivity -> USB_OTG_FS -> Mode -> Device_Only
   (2) Middleware -> USE_DEVICE -> Class For FS IP -> Communication Device Class(Virtual Port Com)

3. 设置完成后生成代码

    GENERATE CODE

# 三、程序中测试

回到Clion中修改程序，注意自己添加的内容要放在每个BEGIN和END中，这样在CubeMX中再次生成代码后自己修改的内容不会被覆盖掉。

```C
// 在main.c中修改修改代码

// 在以下标志中间添加头文件
/* USER CODE BEGIN Includes */

//测试用的CDC函数在下列函数中有定义
#include "usbd_cdc_if.h"

/* USER CODE END Includes */


// 在main函数中添加以下程序测试
unsigned char buff[4] = {"hello"};

while (1)
{
/* USER CODE END WHILE */    

HAL_Delay(1000);
CDC_Transmit_FS(buff,4);

/* USER CODE BEGIN 3 */
}

```

在前面生成代码后会生成一个USB_DEVICE文件夹，在usbd_cdc_id.c中定义的是CDC信息处理的函数，CDC_Receive_FS、CDC_Transmit_FS、CDC_TransmitCplt_FS等，这都是可自定义的函数代码，需要时可以自己修改。

# 四、在Ubuntu/windows中使用串口测试
1. Ubuntu

```bash
# 使用USB线连接stm32与Ubuntu后在终端输入命令
lsusb
# 若连接成功，会显示USB的ID号和名称。这里的名称是我们在CubeMX中可以设置的
# 这些信息我们在以后串口绑定时会用到

# 一个不错的有界面的串口调试工具
sudo apt install cutecom

# 在cutecom中可以方便的操作，类似于windows中的XCOM，正常情况下可以显示程序中输出的字符串 
```

2. Windows

    使用XCOM查看
