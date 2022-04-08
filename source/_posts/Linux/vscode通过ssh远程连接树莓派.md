---
title: vscode通过ssh远程连接树莓派
date: 2021-01-28 22:21:39
tags: 
    [raspberry] 
categories: 
    [Linux]
---
# windows设置
所有设置--应用--可选功能--安装OpenSSH服务器和OpenSSH客户端
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200513000425414.png)
# vscode安装插件
## Remote-SSH
vscode中安装Remote-SSH就会附带安装其他插件
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200513000237919.png)
# 问题解决--过程试图写入的管道不存在
## ssh冲突
### 修改环境变量
如果电脑安装了Git，那么Git的ssh可能会和vscode中的ssh通道冲突。可以在环境变量中删除

```bash
#原变量
%SYSTEMROOT%\System32\OpenSSH

#替换成电脑安装git的目录
D:\Git\usr\bin
```
### 修改vscode设置
或者可以在vscode中修改ssh的路径
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200513000939286.png)
## 修改known_hosts文件
如果以上步骤后仍然出现 “ 过程试图写入管道不存在 ”，可能是由于Linux主机发生了变化，这时可以在konwn_hosts中删除关于Linux主机的记录内容

```bash
#文件路径
C:\User\"用户名"\.ssh

```
在known_hosts文件中，如果是记事本打开的话，每一行代表一个主机的连接信息，只需要删掉出问题的主机内容，然后在vscode中重新ssh连接就可以了