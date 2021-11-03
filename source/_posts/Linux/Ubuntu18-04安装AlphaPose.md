---
layout: post
title: Ubuntu18.04安装AlphaPose
date: 2021-11-03 14:44:58
tags: 
    [AlphaPose] 
categories: 
    [Linux,ubuntu]
---

# 前言

[AlphaPose README](https://github.com/MVIG-SJTU/AlphaPose/blob/master/docs/INSTALL.md)

# 1 AlphaPose环境说明

    + CUDA
    + Python3.5+
    + Cython
    + PyTorch 1.1+
    + torchvision 0.3.0+
    + numpy

## 1.1 Ubuntu18.04、GTX1050

{% post_link Linux/ubuntu18-04安装pytorch  ubuntu18-04安装pytorch %}

## 1.2 JetsonTX2

{% post_link Linux/jetsonTX2安装Pytorch  jetsonTX2安装Pytorch %}

# 2 AlphaPose安装

```bash
# Get AlphaPose
git clone https://github.com/MVIG-SJTU/AlphaPose.git
# git pull origin pull/592/head if you use PyTorch>=1.5
cd AlphaPose


# install
export PATH=/usr/local/cuda/bin/:$PATH
export LD_LIBRARY_PATH=/usr/local/cuda/lib64/:$LD_LIBRARY_PATH

python -m pip install cython
sudo apt-get install libyaml-dev

################Only For Ubuntu 18.04#################
locale-gen C.UTF-8
# if locale-gen not found
sudo apt-get install locales
export LANG=C.UTF-8

######################################################
python setup.py build develop

# 这里有可能出现Beginning with Matplotlib 3.4, Python 3.7 or above is required.
# 使用升级pip的指令是无效的，可以试一下
sudo -H pip install --upgrade pip

# 我选择更换python版本，在安装pytorch环境的文章中说过，更换python命令如下
conda install python=3.7
# 需要注意一下更换的比较重要的包，比如pytorch、torchvision等。
```

