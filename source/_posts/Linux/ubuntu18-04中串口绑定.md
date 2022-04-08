---
title: ubuntu18.04中串口绑定
date: 2021-04-23 09:40:30
tags: 
    [ubuntu] 
categories: 
    [Linux,ubuntu]
    
---
# 前言
> 设置串口绑定可以有效的模块化设计程序。我们在下位机、雷达等程序中可以为串口命名为arduino、lidar等，在移植程序时，只需保证下位机等在上位机串口中的的串口名称一致即可。

# 1. 查看设备ID号
```bash
lsusb

#例如查询到的为1a86:7523
#第三步参考用
```

# 2. 查看USB号
```bash
# 在插入USB设备前后运行以下命令，查看变化的ttyUSB序号，即为新插入的USB号
ls /dev/ttyUSB*

#例为ttyUSB1
```

# 3. 编写rules文件

```bash
sudo vim /etc/udev/rules.d

#在文件中写入
KERNEL=="ttyUSB1", ATTRS{idVendor}=="1a86", ATTRS{idProduct}=="7523", MODE:="0666", SYMLINK+="arduino"
```

# 4. 激活

保存以上文件后，需运行以下命令使命令生效。
**注：在JetsonTX2中遇到过绑定串口失效的情况，在rules文件不变的前提下，运行一遍以下命令即可**
```
sudo udevadm trigger
```