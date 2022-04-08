---
title: JetsonTX2远程连接方案
date: 2021-04-23 20:44:08
tags: 
    [JetsonTX2] 
categories: 
    [Linux,ubuntu]
    
---

# 参考文章
[设置主从网络和远程开发环境](https://zhuanlan.zhihu.com/p/52005221)
# 一、VNC远程连接
在JetsonTX2刷机后，系统中有README-vnc.txt文件，有详细的说明，本文在此总结
## 1.安装VNC Server

```bash
sudo apt update
sudo apt install vino
```
## 2.配置VNC Server

```bash
#设置自启动
mkdir -p ~/.config/autostart
cp /usr/share/applications/vino-server.desktop ~/.config/autostart

#配置VNC Server
gsettings set org.gnome.Vino prompt-enabled false
gsettings set org.gnome.Vino require-encryption false

#设置VNC密码 thepassword即为密码
gsettings set org.gnome.Vino authentication-methods "['vnc']"
gsettings set org.gnome.Vino vnc-password $(echo -n 'thepassword'|base64)

#重启
sudo reboot

#重启后即可在Windows中用vnc viewer连接
```

# 二、ssh连接
ssh连接本来计划是在Windows中通过xshell实现，但是最近看到一篇文章，发现可以在两个ubuntu系统中通过ROS组网实现互相布置工作空间（大概了解，后续将继续学习）。所以计划使用虚拟机中的ubuntu实现ssh连接。
在ubuntu中可以直接在终端执行，而不必找类似Xshell的工具。
我还比较好奇Windows中的WSL能否实现ROS组网，后续将继续学习。

言归正传。
## 1.连接同一局域网
使用ssh连接时，需保证两机器在同一局域网中，所以应先保证虚拟机连接到外部局域网。在本文中写这个过程难免有些冗杂，如果是使用Linux主机或双系统的根本用不到。
虚拟机连接局域网可看这篇文章

## 2.配置SSH公钥
在连入同一局域网后，我们可以先用密码测试一下

```bash
#在虚拟机或PC的ubuntu中执行
ssh 主机名@主机地址
#后面会输入密码，若成功则表示不缺少组件，否则请根据提示安装相关组件
#一般缺少openssh-server
sudo apt install openssh-server
```

```bash
#在虚拟机或PC的ubuntu中执行
ssh-keygen
#一路回车，结束后会在~/.ssh目录中生成id_rsa.pub文件
#通过局域网将密钥分发到JetsonTX2中
scp ~/.ssh/id_rsa.pub dream@192.168.43.143:/home/dream
#文中dream为JetsonTX2的主机名，查看主机名可直接在命令行输入hostname
```

```bash
#在JetsonTX2中运行，此时可以在虚拟机终端通过ssh连接TX2即可
ssh dream@192.168.43.143
cat id_rsa.pub >> ~/.ssh/authorized_keys
chmod 600 ~/.ssh/authorized_keys

#配置完成后即可实现ssh免密码登陆TX2
```
