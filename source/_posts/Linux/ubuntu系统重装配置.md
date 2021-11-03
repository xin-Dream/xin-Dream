---
title: ubuntu系统重装配置
date: 2021-04-29 23:58:55
tags: 
    [ubuntu] 
categories: 
    [Linux,ubuntu]
---
# 1. 安装WIFI
可以在 software&updates -> Additional Drivers里选择合适的显卡驱动和WIFI驱动
若没有WIFI驱动，可以先换源或update

# 2. 修改启动时系统选择等待时间
```bash
sudo vi /etc/default/grub

# 修改GRUB_TIMEOUT后的数值

# 更新启动菜单
sudo update-grub2
```

# 3. 设置sudo免密码

```bash
sudo vim /etc/sudoers

# 修改%sudo ALL=(ALL:ALL) ALL为
%sudo ALL=(ALL) NOPASSWD:ALL
```

# 4. 常用软件安装
{% post_link Linux/ubuntu中常用软件安装 %}

# 5. 双系统时间不统一
参考[写给工程师的ubuntu20.04的最佳配置指南](https://juejin.im/post/5eb3a1556fb9a0434b73545c#heading-31)
1. 原因如下：

 - UTC(Coordinated Universal Time)，协调世界时（世界统一时间)；
 - GMT(Greenwich Mean Time)，格林威治标准时间。
 - Windows 把计算机硬件时间当作本地时间(local time)，所以在 Windows 系统中显示的时间跟 BIOS 中显示的时间是一样的。
 - 类 Unix 系统把计算机硬件时间当作 UTC， 所以系统启动后会在该时间的基础上，加上电脑设置的时区数(比中国就加8)，因此 Ubuntu 中显示的时间总是比 Windows 中显示的时间快 8 小时。
2. 解决方案：
禁用ubuntu中的UTC

```bash
timedatectl set-local-rtc 1 --adjust-system-clock
```

# 6. 安装pip
```bash
sudo apt install python3-pip
```

# 7. 设置终端走代理

```
sudo vim ~/.bashrc

export http_proxy=127.0.0.1:1080
export https_proxy=127.0.0.1:1080
export socks_proxy=127.0.0.1:1080
```

