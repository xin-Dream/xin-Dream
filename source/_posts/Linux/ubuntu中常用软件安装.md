---
title: ubuntu中常用软件安装
date: 2021-01-28 22:04:42
tags: 
    [ubuntu] 
categories: 
    [Linux,ubuntu]
---

# 参考
[ubuntu新系统一次性配置](https://blog.csdn.net/bornfree5511/article/details/106470875)
[写给工程师的ubuntu20.04最佳配置指南](https://juejin.im/post/5eb3a1556fb9a0434b73545c#heading-31)

# 1. 分屏终端

```bash
sudo apt-get install terminator
```
安装完成后要运行一下才能用

```bash
terminator
```

## 软件配置
配置文件已上传至github，按以下步骤下载并替换即可
[配置文件下载](https://github.com/xin-Dream/ubuntu_files)


# 2. 网易云音乐
首先下载网易云音乐安装包

```bash
wget http://d1.music.126.net/dmusic/netease-cloud-music_1.1.0_amd64_ubuntu.deb
```
开始安装

```bash
sudo dpkg -i netease-cloud-music_1.1.0_amd64_ubuntu.deb
#如果有错误
sudo apt-get -f install
```
新版软件一切正常
~~安装完成后启动时发现打不开~~
终端输入

```bash
netease-cloud-music
```
如果是出现

```bash
Failed to load module "canberra-gtk-module"

#解决
sudo apt-get install libcanberra-gtk
```
~~再次打开，可能还不行，只能后台打开，我也不知道为什么~~

```bash
sudo netease-cloud-music 
```

# 3. vscode
官网下载deb包

```bash
https://code.visualstudio.com/docs/?dv=linux64_deb

sudo dpkg -i code_1.45.1-1589445302_amd64.deb
```

# 4. QQ/微信/TIM
~~[Linux版QQ下载地址](https://im.qq.com/linuxqq/download.html)
下载完成后~~ 
```bash
#sudo dpkg -i linuxqq_1.0.1-b1-100_armhf.deb
```
以上方式安装的qq太老了，最后决定先安装wine，在安装qq

安装deepin-wine-for-ubuntu
```bash
git clone https://gitee.com/wszqkzqk/deepin-wine-for-ubuntu.git
cd deepin-wine-for-ubuntu
sudo ./install.sh
```
下载地址：
[微信](https://mirrors.aliyun.com/deepin/pool/non-free/d/deepin.com.wechat/)
[TIM](https://packages.deepin.com/deepin/pool/non-free/d/deepin.com.qq.office/)

### 微信安装完成的问题
微信成功登录以后，中间会有一个小黑方块，据说是由于表情包弹窗引起的，没找到永久消除的办法
在任意一个聊天框输入一个表情，就可以消除黑方块

# 5. 安装Microsoft Edge浏览器

[官方链接](https://www.microsoftedgeinsider.com/zh-cn/download/?platform=linux)

```bash
## Setup
curl https://packages.microsoft.com/keys/microsoft.asc | gpg --dearmor > microsoft.gpg
sudo install -o root -g root -m 644 microsoft.gpg /etc/apt/trusted.gpg.d/
sudo sh -c 'echo "deb [arch=amd64] https://packages.microsoft.com/repos/edge stable main" > /etc/apt/sources.list.d/microsoft-edge-dev.list'
sudo rm microsoft.gpg
## Install
sudo apt update
sudo apt install microsoft-edge-dev
```

# 6. Barrier

{% post_link windows/多机共享键鼠软件Barrier %}

# 7. zsh & Oh my zsh

{% post_link Linux/ubuntu安装zsh  ubuntu安装zsh %}


# 8. clash
```bash
 cd Downloads
 mkdir clash
 cd clash

 #下载并解压linux-amd64
 https://github.com/Dreamacro/clash/releases

 #重命名为clash
 chmod +x clash

 # 先执行一次
 ./clash -d .
 # 注意这里一定执行-d ，否则不能成功，权限不够加sudo

 # 在官网获取配置文件config.yml

 cp ~/Downloads/clash/config.yml ~/.config/clash
 cd ~/.config/clash
 mv config.yml config.yaml

 # 重新运行 ./clash -d . 即可
```

# 9. 输入法安装

## 1. 谷歌拼音
```bash
sudo apt-get install fcitx-googlepinyin

#安装完成后，在区域与语言中添加googlepinyin即可
```



---
安装WiFi还是需要百度的，所以先安装搜狗输入法
首先安装Fcitx输入框架

```bash
sudo apt install fcitx
```

[搜狗输入法Linux](https://pinyin.sogou.com/linux/?r=pinyin)

安装完成后就是对输入法的设置

 设置-->区域和语言-->管理已安装的语言-->键盘输入法系统
 选择刚才安装的Fcitx框架-->应用到整个系统

 然后要重启一下
再打开右上角有个小键盘，里面有配置当前输入法，~~将搜狗输入法上移到第一位，就可以了~~ 

这里有点问题，如果搜狗输入法在第一位，中英文切换的时候，输入法里会有一些乱码。所以这里将键盘-汉语移到最上面，如图
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200602130238639.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQ1MTcyMTU2,size_16,color_FFFFFF,t_70)

# [10.Jetbrains系列](https://www.jetbrains.com/products/#type=ide)

# [11. 百度网盘](https://pan.baidu.com/download)

# [12. 全球学术快报](http://cajviewer.cnki.net/download.html)

# 13. 串口调试软件

cutecom：`sudo apt-get install cutecom`

# [14. STM32CubeMX](https://www.st.com/en/development-tools/stm32cubemx.html)
