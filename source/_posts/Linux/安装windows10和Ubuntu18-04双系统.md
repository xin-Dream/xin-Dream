---
title: 安装windows10和Ubuntu18.04双系统
date: 2021-01-28 22:03:54
tags: 
    [ubuntu] 
categories: 
    [Linux,ubuntu]
---
# 我的配置
华硕飞行堡垒五代，i5+256G固态+1T机械硬盘，ubuntu18.04LTS

# 制作双系统启动U盘

## 需要工具
微PE工具箱，win10镜像，Ubuntu18.04的ISO镜像，32GU盘（这个制作完成后还会有很大一部分空余，可以用于日常使用，只用于启动盘的话，ubuntu和win10 8G的U盘大概能够）

## 制作过程
1. 用微PE工具箱为U盘制作PE系统，这个是用于安装和维护win10系统的
可以参考软件安装管家的[PE系统安装教程](https://mp.weixin.qq.com/s?__biz=MzIwMjE1MjMyMw==&mid=502719825&idx=1&sn=9104261c8b121d6aaae0b11124e90645&chksm=0ee145bd3996ccab948300376dc86d18305ed1f981ba361cee53850ed001f24552addcb63c63&scene=20&xtrack=1&key=550718b070ec51af153ef2fa7f6561bd89e049c0c95440110b1f4cc8ae1503ab88e011c74375991716f9151ed7adc503eef74aa0bf681d120c2dd4a5426d5a35a6fc4af420d6971699c29501b2681215&ascene=1&uin=MTYxNTIyMDEzOQ==&devicetype=Windows%2010%20x64&version=62090072&lang=zh_CN&exportkey=A74S%2b18fXHhNvj3ZK2y3NdI=&pass_ticket=lXTBjZUUl17jl5VJK2C%2bemLrJWEDoeji%2bS9sM0ESR4E5qBCCcxZJ2xptM6sFbNQT)
2. 制作好之后会有两个分区，其中EFI中是PE系统的分区，另一个是正常的分区，然后我们将这个正常分区分成三个，ubuntu（3G），Win（6G），Data（其余空间-300MB）
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200531002825803.png)
3. ubuntu
   	只需要解压ubuntu18.04的ISO镜像就可以得到ubuntu的主要文件![在这里插入图片描述](https://img-blog.csdnimg.cn/20200531003203907.png)![在这里插入图片描述](https://img-blog.csdnimg.cn/20200531003219937.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQ1MTcyMTU2,size_16,color_FFFFFF,t_70)
   	然后将解压后文件夹内的所有内容复制到刚才U盘分区的ubuntu分区下就可以了
4. windows
	win10的安装我们借助PE系统中的windows安装工具就可以了，所以我们复制win10镜像、激活工具和解压软件到刚才的Win分区

至此，ubuntu+winPE的系统启动盘就制作好了，可以在电脑的bios里查看一下



# 双系统的安装
## windows
windows的安装过程比较简单，就不赘述了，可以参考软件安装管家里的安装教程
## Ubuntu

1. 设置BIOS
 插入U盘，开机，按F2进入BIOS
  将BIOS中的fastboot选项设置成disable，这样下次重新启动的时候会有Ubuntu、ubuntu高级选项和windows的选择，而不是直接打开系统。然后还要把U盘中ubuntu的启动分区放到第一位，F10保存退出。

2. 断网
 这里的断网是指拔掉网线，否则会在安装过程中更新。其实这并没有什么问题，只不过安装过程本就是个不大稳定的过程，所以我希望他时间越短越好，等都稳定了再更新不迟

 3.  修改安装启动选项
这时再开机，就会有install ubuntu这个选项，不要着急点进去，我的电脑直接进是会闪退的
光标选在install ubuntu上，按e键，在界面的倒数第二行找到 “quiet splash---” ，删除“---”，在后面空格输入“$vt_handoff acpi_osi-linux nomodeset"，再F10，然后正式进入安装界面
 4. 设置
 前面的语言设置逐步选择需要的选项就可以，注意在 “准备安装” 菜单中不要选择“为图形和无线硬件，以及MP3和媒体安装第三方软件”
  在“安装类型”菜单选项里选择“其它选项”，自己配置分区

 5. 分区和挂载点
 这个查了很多资料，找到一个比较先进的办法

		swap交换空间：
		- 大小：与物理内存一致
		- 新分区类型：主分区
		- 新分区的位置：空间起始位置
		- 用于：交换空间
		
		EFI系统分区：
		- 大小：512MB（放一些系统的引导文件，这里我给了1G，地方大没办法）
		- 新分区类型：逻辑分区
		- 新分区位置：空间起始位置
		- 用于：EFI系统分区
		
		/:
		- 大小：剩余全部空间
		- 新分区类型：主分区
		- 新分区的位置：空间起始位置
		- 用于：Ext4日志文件系统
		- 挂载点：/

 这里简单说一下这么分的原因
 /home 目录是默认工作目录，是我们平时存储的主战场，/usr 是软件的默认安装目录，对这两个目录我们都希望它尽可能的大。而这两个目录和“efi系统分区”都是挂载在“/”目录下的，这样home和usr目录都可以用“/”下的所有空间，这样就可以避免出现home或usr出现存储空间不足的问题。所以其实efi是可以不用管的，但是我还是把它分出来了，可能以后会用到

 6. 安装和等待
 设置完这些就可以点击继续安装了。这时你可能会发现，没有这个选项。这是因为分辨率太低，窗口显示不全
  按住ALT+F7，然后移动鼠标就可以拖动窗口了
  剩下的就是等待，安装完成后会显示现在重启
 7. 重启设置
 点了现在重启之后，可能可以进去系统，但是很大概率是进不去的，这时就要像一开始安装时一样设置启动项。
 光标选中“ubuntu”，按e ，进入文字界面，找到“quie splash”，让后面的内容和第三步后面的内容一样就行了。然后按F10，等待开机

# ubuntu开机后的配置
我的电脑安装好之后显示没有WiFi适配器，所以只能先插上网线，设置好分辨率在去改WiFi
## 安装显卡驱动
进入系统后可以先更新一下，这个过程可能会比较长

```bash
sudo apt-get update
sudo apt-get upgrade
```
更新完成后，安装驱动

```bash
sudo ubuntu-drivers autoinstall
#安装完成后，重启
sudo reboot
```
重启后可以发现，分辨率已经正常了


## WiFi驱动
这些设置完就要开始安装WiFi驱动了
没有想到，WiFi修改过程简单又刺激

 在软件与更新-->附加驱动，下面有个开源WiFi驱动，选中，更新，重启
 重启之后刺激的是，屏幕一直闪烁，强制关机后再打开就正常了....
 这个办法可能不适用于所有人
 可以参考[ubuntu18.04系统安装完成后显示未发现WiFi适配器](https://blog.csdn.net/github_33678609/article/details/86502916)


# 参考文章：
 [WiFi](https://blog.csdn.net/github_33678609/article/details/86502916)
 [安装搜狗输入法](https://blog.csdn.net/bornfree5511/article/details/103915552)
 [分区方案](https://blog.csdn.net/weixin_39867394/article/details/80368314)
[双系统安装教程](https://blog.csdn.net/qq_37221466/article/details/81265579)