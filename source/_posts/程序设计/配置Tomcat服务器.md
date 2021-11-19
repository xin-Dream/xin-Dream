---
title: 配置Tomcat服务器
date: 2021-08-02 17:11:59
tags: 
    [Tomcat] 
categories: 
    [程序设计,Android]
---
# windows
## 下载Tomcat
[下载地址](https://tomcat.apache.org/download-80.cgi)

下载后无需安装，将其解压到安装位置

## 配置环境变量

1. 配置JAVA环境，参考另一篇文章

{% post_link windows/windows配置JAVA环境 windows配置JAVA环境 %}

2. 配置Tomcat环境

```BASH
# 在环境变量中新建系统变量
CATALINA_HOME  D:\078-Tomcat\apache-tomcat-8.5.69

# 在Path中新建
%CATALINA_HOME%\lib
%CATALINA_HOME%\bin

```

## 安装、启动与停止

以管理员模式打开命令行，进入Tomcat文件夹中的bin目录

```BASH
service.bat install

net start Tomcat8
net stop Tomcat8
```
## 验证

在浏览器地址栏输入`localhost:8080`
