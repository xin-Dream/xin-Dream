---
title: DMA读取ADC数据
date: 2021-09-06 15:04:54
tags: 
    [stm32] 
categories: 
    [STM32]
---

> 以下内容不涉及基础教程，主要是在CubeMX中设置完成后，程序中的代码
>
> 有关程序框架的问题参考{% post_link 单片机/stm32程序框架  stm32程序框架  %}

在CubeMX中选定ADC通道后，设置DMA选项

# 1. CubeMX中设置



+ 在ADC中的DMA Settings中设置Mode 为 Circular



# 2. 数据结构体定义

在macro.h中定义

```c
#define ADC_CHANNEL_NUMBER  10

typedef struct {
    
    uint32_t ADC_Buff[ADC_CHANNEL_NUMBER];

} Sensor_TypeDef;
```

# 3. 结构体定义

在macro.c中

```c
Sensor_TypeDef sensors;
```



# 4. 程序初始化

在main.c中

```c
extern Sensor_TypeDef sensors;

HAL_ADC_Start_DMA(&hadc1, sensors.ADC_Buff, ADC_CHANNEL_NUMBER);
//注意开启DMA要在定义函数之后
```

