---
layout: post
title: ubuntu18.04安装CUDA-pytorch
date: 2021-11-02 19:56:35
tags: 
    [pytorch] 
categories: 
    [AI,pytorch]
---

# 前言

> 由于要使用AlphaPose，所以安装的Pytorch版本要与AlphaPose对应。根据AlphaPose的要求，这里我选择安装Pytorch==1.1.0、CUDA==10.2
> 配置简介：华硕飞行堡垒五、GTX1050、Ubuntu18.04系统（非虚拟机）

# 1 检查显卡驱动

这一步在安装电脑系统的时候已经配置过了，所以只需要检查一下是不是nvidia驱动就可以了，不是的话可以在Software & Updates中的Additional Dirvers

```bash
sudo nvidia-smi
```

可以看到这里有个CUDA Version：11.2，这里应该是可支持的最高版本，而不是一定要装的对应版本。Driver Version需要注意一下，要比安装的CUDA要求版本大。

[CUDA版本对应关系查看链接](https://docs.nvidia.com/cuda/cuda-toolkit-release-notes/index.html)

# 2 使用conda安装

在AlphaPose的README中有详细的说明版本，本来以为需要自己选择安装CUDA，但是我再使用conda安装时直接装完了所有。

在conda中创建一个alphapose的环境，激活后开始安装
```bash

conda create -n alphapose python=3.7 -y
# 这里跟AlphaPose的要求有所出入，是因为在AlphaPose的后续安装中要求python>3.7，也可以选择python=3.6，后面需要的话再升级，我会在AlphaPose的安装中再说一下
conda acticate alphapose

conda install pytorch==1.1.0 torchvision==0.3.0

# 可以看到，安装时会自动安装cudatoolkit、cudnn
```

# 3 验证

## 3.1 验证CUDA

```bash

cd /local/cuda/samples/1_Utilities/deviceQuery

sudo make

./deviceQuery
```

## 3.2 验证Pytorch

```python
# 在激活的alphapose环境中运行python3
import torch
import torchvision

print(torch.__version)
print(torch.__version)

```


