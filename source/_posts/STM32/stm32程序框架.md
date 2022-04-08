---
title: stm32程序框架
date: 2021-09-06 15:32:35
tags: 
    [stm32] 
categories: 
    [STM32]
---

使用HAL最大的便利就是图形化配置界面后可以自动生成代码，其实使用标准库的话，自己有自己顺手的模板也是一样用的。

重点在macro.h中的结构体和位带操作的实现，能更方便的实现程序移植

以下为我常用的程序框架，加粗文件为CubeMX生成之外自己添加的，这里以OLED显示为例

├── 002-Arena.ioc
├── 002-Arena.xml
├── cmake-build-debug-stm32
├── CMakeLists_template.txt
├── CMakeLists.txt
├── Core
│   ├── Inc
│   │   ├── FreeRTOSConfig.h
│   │   ├── **macro.h**
│   │   ├── main.h
│   │   ├── **oledfont.h**
│   │   ├── **oled.h**
│   │   ├── stm32f4xx_hal_conf.h
│   │   └── stm32f4xx_it.h
│   └── Src
│       ├── freertos.c
│       ├── **macro.c**
│       ├── main.c
│       ├── **oled.c**
│       ├── stm32f4xx_hal_msp.c
│       ├── stm32f4xx_hal_timebase_tim.c
│       ├── stm32f4xx_it.c
│       ├── syscalls.c
│       └── system_stm32f4xx.c
├── Drivers
├── Middlewares
├── README.md
├── startup
│   └── startup_stm32f407xx.s
└── STM32F407VGTx_FLASH.ld



# macro.c

 在这个文件中，主要定义一些小函数和结构体，结构体内放的是用到较多的全局变量。

```c
#include "macro.h"

/*
 * --自定义的结构体-----------------------------------------------------------------
 */
Sensor_TypeDef sensors;
// 这个结构体在下个文件macro.h中定义

/*
 * --外部定义-----------------------------------------------------------------
 */
extern UARTParams_TypeDef uart1_params;

/*
 * --函数定义-----------------------------------------------------------------
 */
// 例如程序开始时需要配置的函数
void ParamsInit() {
    OLED_Init();
    HAL_ADC_Start_DMA(&hadc1, sensors.ADC_Buff, 10);
    
    HAL_TIM_PWM_Start(&htim3, TIM_CHANNEL_1);
    HAL_TIM_PWM_Start(&htim3, TIM_CHANNEL_2);
    
    structParams();
}
// 对结构体数据的初始化
void structParams() {
    motor.speed = 30;
    motor.turn_coff = 0.023;
}

```

# macro.h

这是最重要的一个文件，联系各个文件。

```c
//包含需要用的或自定义的头文件，这样在其他文件中可以直接调用macro.h
/*
 * --头文件---------------------------------------------------------------------------
 */
#include "main.h"
#include "oled.h"
#include "string.h"
#include "stdio.h"

//上一文件 macro.c中定义的函数
/*
 * --函数------------------------------------------------------------------------------
 */
void ParamsInit();

void OLED_Show();

void structParams();


/*
 * --定义结构体与宏定义-------------------------------------------------------------------------
 */
#define ADC_CHANNEL_NUMBER  10

typedef struct {

    uint16_t PITCH;
    uint16_t ROLL;
    uint16_t YAW;
    short Angle[3];
    short T;

    uint32_t ADC_Buff[ADC_CHANNEL_NUMBER];
    uint32_t Range_around[4];
    uint32_t Range_forward[2];
    uint32_t Range_below[2];
    uint32_t Gray[3];

    int motion_flag;
} Sensor_TypeDef;

/**
  * @brief PID Params Init structure definition
  */
typedef struct {
    __IO int32_t SetPoint;        //设定目标 Desired Value
    __IO float SumError;        //误差累计
    __IO float Proportion;    //比例常数 Proportional Const
    __IO float Integral;        //积分常数 Integral Const
    __IO float Derivative;    //微分常数 Derivative Const
    __IO int LastError;        //Error[-1]
    __IO int PrevError;        //Error[-2]

} PID_TypeDef;


/*
 * --宏定义实现位带操作----------------------------------------------------------------
 */
//这一部分能更方便的实现程序移植，很多人习惯使用PAout等等

//具体实现思想,参考<<CM3权威指南>>第五章(87页~92页).M4同M3类似,只是寄存器地址变了.
//IO口操作宏定义
#define BITBAND(addr, bitnum) ((addr & 0xF0000000)+0x2000000+((addr &0xFFFFF)<<5)+(bitnum<<2))
#define MEM_ADDR(addr)  *((volatile unsigned long  *)(addr))
#define BIT_ADDR(addr, bitnum)   MEM_ADDR(BITBAND(addr, bitnum))
//IO口地址映射
#define GPIOA_ODR_Addr    (GPIOA_BASE+20) //0x40020014
#define GPIOB_ODR_Addr    (GPIOB_BASE+20) //0x40020414
#define GPIOC_ODR_Addr    (GPIOC_BASE+20) //0x40020814
#define GPIOD_ODR_Addr    (GPIOD_BASE+20) //0x40020C14
#define GPIOE_ODR_Addr    (GPIOE_BASE+20) //0x40021014
#define GPIOF_ODR_Addr    (GPIOF_BASE+20) //0x40021414
#define GPIOG_ODR_Addr    (GPIOG_BASE+20) //0x40021814
#define GPIOH_ODR_Addr    (GPIOH_BASE+20) //0x40021C14
#define GPIOI_ODR_Addr    (GPIOI_BASE+20) //0x40022014

#define GPIOA_IDR_Addr    (GPIOA_BASE+16) //0x40020010
#define GPIOB_IDR_Addr    (GPIOB_BASE+16) //0x40020410
#define GPIOC_IDR_Addr    (GPIOC_BASE+16) //0x40020810
#define GPIOD_IDR_Addr    (GPIOD_BASE+16) //0x40020C10
#define GPIOE_IDR_Addr    (GPIOE_BASE+16) //0x40021010
#define GPIOF_IDR_Addr    (GPIOF_BASE+16) //0x40021410
#define GPIOG_IDR_Addr    (GPIOG_BASE+16) //0x40021810
#define GPIOH_IDR_Addr    (GPIOH_BASE+16) //0x40021C10
#define GPIOI_IDR_Addr    (GPIOI_BASE+16) //0x40022010

//IO口操作,只对单一的IO口!
//确保n的值小于16!
#define PAout(n)   BIT_ADDR(GPIOA_ODR_Addr,n)  //输出
#define PAin(n)    BIT_ADDR(GPIOA_IDR_Addr,n)  //输入

#define PBout(n)   BIT_ADDR(GPIOB_ODR_Addr,n)  //输出
#define PBin(n)    BIT_ADDR(GPIOB_IDR_Addr,n)  //输入

#define PCout(n)   BIT_ADDR(GPIOC_ODR_Addr,n)  //输出
#define PCin(n)    BIT_ADDR(GPIOC_IDR_Addr,n)  //输入

#define PDout(n)   BIT_ADDR(GPIOD_ODR_Addr,n)  //输出
#define PDin(n)    BIT_ADDR(GPIOD_IDR_Addr,n)  //输入

#define PEout(n)   BIT_ADDR(GPIOE_ODR_Addr,n)  //输出
#define PEin(n)    BIT_ADDR(GPIOE_IDR_Addr,n)  //输入

#define PFout(n)   BIT_ADDR(GPIOF_ODR_Addr,n)  //输出
#define PFin(n)    BIT_ADDR(GPIOF_IDR_Addr,n)  //输入

#define PGout(n)   BIT_ADDR(GPIOG_ODR_Addr,n)  //输出
#define PGin(n)    BIT_ADDR(GPIOG_IDR_Addr,n)  //输入

#define PHout(n)   BIT_ADDR(GPIOH_ODR_Addr,n)  //输出
#define PHin(n)    BIT_ADDR(GPIOH_IDR_Addr,n)  //输入

#define PIout(n)   BIT_ADDR(GPIOI_ODR_Addr,n)  //输出
#define PIin(n)    BIT_ADDR(GPIOI_IDR_Addr,n)  //输入
```



