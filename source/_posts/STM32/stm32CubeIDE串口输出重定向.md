---
title: stm32CubeIDE串口输出重定向
date: 2021-01-28 21:49:38
tags: 
    [stm32] 
categories: 
    [STM32]
---

# 重定向函数
在配置好串口之后需要在相关文件中添加以下函数以实现printf函数的重定向

```c
//注意添加头文件
#include "stdio.h"

#ifdef __GNUC__
#define PUTCHAR_PROTOTYPE int __io_putchar(int ch)
#else
#define PUTCHAR_PROTOTYPE int fputc(int ch, FILE *f)
#endif

PUTCHAR_PROTOTYPE
{
	HAL_UART_Transmit(&huart1, (uint8_t*) &ch, 1, 0xffff);
	return ch;
}
```


# 属性设置
在添加了重定向函数后需要在工程属性上进行相关设置才能正常进行输出
右键工程-->属性
1.勾选框中两个选项，保证可以输出浮点数
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200826232630501.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQ1MTcyMTU2,size_16,color_FFFFFF,t_70#pic_center)
2.
在Other flags中添加标志

```c
-u_printf
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200826232753698.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQ1MTcyMTU2,size_16,color_FFFFFF,t_70#pic_center)
