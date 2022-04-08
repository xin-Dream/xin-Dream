---
title: 配置CLion开发stm32
date: 2021-06-14 13:00:35
tags: 
    [stm32,Jetbrains] 
categories: 
    [STM32]
typora-root-url: ..\..
---

参考链接：[配置CLion用于STM32开发【优雅の嵌入式开发】](https://zhuanlan.zhihu.com/p/145801160)

# 1. 相关工具下载

   1. [STM32CubeMX](https://www.st.com/zh/development-tools/stm32-software-development-tools.html)
   2. [OpenOCD](https://gnutoolchains.com/arm-eabi/openocd/)（下载好后解压到指定目录后不要动了）
   3. [MinGW-w64](https://sourceforge.net/projects/mingw-w64/files/Toolchains%20targetting%20Win64/Personal%20Builds/mingw-builds/8.1.0/threads-posix/sjlj/x86_64-8.1.0-release-posix-sjlj-rt_v6-rev0.7z/download?use_mirror=udomain)（下载好后解压到指定目录后不要动了）
   4. [gcc-arm-none-eabi](https://developer.arm.com/tools-and-software/open-source-software/developer-tools/gnu-toolchain/gnu-rm/downloads)（下载好后解压到指定目录后不要动了）
   5. [Clion](https://www.jetbrains.com/clion/)（这个可以到Jetbrain申请教育账号，就可以使用专业版了，应该需要一年验证一次）

# 2. 添加环境变量

   + 将上一步下载的MinGW-w64、gcc-arm-none-eabi、OpenOCD的bin目录添加到环境变量
   + **D:\052-MinGW\bin**、**D:\053-gcc-arm-none-eabi\bin**、**D:\053-gcc-arm-none-eabi\bin**
   + 添加过以上环境变量后重启电脑即可生效
   + 可在命令行使用"gcc -v"、"arm-none-eabi-gcc -v"、"openocd -v"验证

# 3. Clion配置

   + ![01](/images/配置CLion开发stm32/01.png)
   + ![02](/images/配置CLion开发stm32/02.png)
   + ![03](/images/配置CLion开发stm32/03.png)

# 4. 新建stm32项目
   + ![04](/images/配置CLion开发stm32/04.png)
   + 新建项目后，编辑区会出现Open with STM32CubeMX，即可使用CubeMX配置程序
   + 配置完成后注意CubeMX中路径要与刚才路径一致
   + 后期若移动位置，需在新位置打开CubeMX的ioc文档并修改
   + **在CubeMX中代码的IDE要选择SW4STM32**

# 5. 编译工程
   + 回到Clion可以看到代码已经更新，在Clion中编译测试

# 6. 下载工程
   + 首先编写下载的cfg文件，这个我习惯在工作区建一个文件夹config，然后新建F4-stlink.cfg文件
   + 以下代码为F407使用stlink下载器的设置，粘贴到新建的文件夹即可
   + 然后在Clion的下载选项中选择这个文件，如下图
   + ![05](/images/配置CLion开发stm32/05.png)
   + ![06](/images/配置CLion开发stm32/06.png)
   + 配置完成后使用运行按钮即可下载
```bash
# This is for using the onboard STLINK/V2

source [find interface/stlink.cfg]

transport select hla_swd

# 0x10000 = 64K Flash Size
set WORKAREASIZE 0x20000

source [find target/stm32f4x.cfg] 
```

# 7. 无线下载器

[STM32仿真器无线下载AMR单片机远程调试烧录编程STLINK DAPLINK](https://detail.tmall.com/item.htm?id=623728332784&spm=a1z09.2.0.0.46df2e8ddFg2g1&_u=o2ph6ufjfa55)

按上一步添加cfg文件

```bash
# This is for using the onboard STLINK/V2
adapter driver cmsis-dap

transport select swd

# 0x10000 = 64K Flash Size
set FLASH_SIZE 0x160000

source [find target/stm32f4x.cfg]

adapter speed 2000
```

# 8. 注意事项

   + 在Clion中选择文件时按下图配置，这样在CMakeLists中会是单独一行，如果删除文件后还有残留可以自己查到删除![07](/images/配置CLion开发stm32/07.png)![08](/images/配置CLion开发stm32/08.png)
      <br> 
   + 在使用FreeRTOS时，编译会报错。默认情况下，硬件浮点运算是关闭的，~~需要在CMakeLists里设置一下~~需要在CMakeLists_template.txt和CMakeLists.txt中修改，否则重新生成stm32程序时CMakeLists.txt会再次取消浮点运算![09](/images/配置CLion开发stm32/09.png)<br><br>  **取消框选内容的注释就好了。** <br><br>

    <br>![10](/images/配置CLion开发stm32/10.png) 
    <br>
   + CubeMX不生成CMakeList
       + CMakeList不是CubeMX生成的，是CLion生成的 
       + 当项目名中含“.”时，不生成CMakeList
   + **待更新+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++**