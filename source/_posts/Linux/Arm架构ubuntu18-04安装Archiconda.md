---
title: Arm架构ubuntu18.04安装Archiconda & conda命令
date: 2021-04-22 20:41:13
tags: 
    [ubuntu18.04,JetsonTX2,Archiconda] 
categories: 
    [Linux,ubuntu]
---

# 前言

在ubuntu中的学习过程，希望有一些单独的隔离环境使用Python，避免互相产生干扰。
由于JetsonTX2属于ARM架构，所以不能使用Anaconda。
**Archiconda**是将conda移植到aarch64平台中的工具，操作和Anaconda类似。

# 一、安装
## 1. 下载
选择适当的版本下载 [Archiconda下载地址](https://github.com/Archiconda/build-tools/releases)

## 2. 安装
在终端中输入
```bash
bash ~/Downloads/Archiconda3-0.2.3-Linux-aarch64.sh
```
过程中按问题选择即可，以下为安装成功截图

![01](../../images/Arm架构ubuntu18-04安装Archiconda/01.jpg)

## 3. 测试

```bash
conda --version
```

# 二、使用
1. 环境操作

```bash
#创建环境
conda create --name env_name python=2.7
conda create --name env_name python=3
conda create --name env_name python=3.5

conda create --name your_env_name python=3.5 numpy scipy

#列举环境
conda env list

#进入环境
activate your_env_name

#退出环境
deactivate

#删除环境
conda remove --name your_env_name --all

#复制环境
conda create --name new_env_name --clone old_env_name 
```

2. 环境中的包

```bash
conda list
#列举某一个环境中的包
conda list -n your_env_name

#为某一个环境安装包
conda install -n env_name package_name
```









