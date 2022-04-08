---
title: termux架设手机server
date: 2021-01-28 22:20:30
tags: 
    
categories: 
    [Linux]
---
# 步骤
## termux中获取访问手机存储的权限

```bash
#在termux中运行
termux-setup-storage
```
手机会提示termux获取访问手机存储的权限，同意后，termux目录下会生成一个storage文件夹

## 使用Python架设HTTP server
可以用node.js搭建，也可以用Python。

```bash
python -m http.server 8080
```
配置结束后就可以在其他设备访问手机服务器访问手机文件，termux中也会有显示访问记录。
访问格式

```bash
http://(手机ip地址):8080
```
termux退出服务器

```bash
ctrl+C
```