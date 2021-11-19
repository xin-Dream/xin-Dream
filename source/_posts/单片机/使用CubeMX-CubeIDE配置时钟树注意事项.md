---
title: 使用CubeMX/CubeIDE配置时钟树注意事项
date: 2021-08-20 12:42:49
tags: 
    [CubeMX] 
categories: 
    [单片机,STM32]
typora-root-url: ..\..
---


一直在用CubeMX配置stm32程序，特别是时钟配置格外方便，没想到一直没注意的时钟树一旦出错，花了我两天时间才找到问题。
</br>
</br>
> 问题描述：
> 在使用stm32的USB做虚拟串口时，无论是windows还是在Ubuntu上都显示设备不能识别，连端口号都不显示。
</br>

使用CubeMX时一般我习惯直接修改HCLK为168MHz，软件会自动匹配其余时钟。

其实软件设定的只是每个芯片的可匹配的频率，对不同的开发板，我们用的最多的外部晶振其实是不一样的，如果设定与实际频率不同，就会出大问题。

</br>
</br>![01](/images/使用CubeMX-CubeIDE配置时钟树注意事项/01.png)

</br>
</br>
查看开发板中是8MHz的晶振，所以软件中的设定要与之匹配。

![02](/images/使用CubeMX-CubeIDE配置时钟树注意事项/02.png)

