---
layout: post
title: jetsonTX2安装Pytorch
date: 2021-11-01 22:36:17
tags: 
    [pytorch,JetsonTX2] 
categories: 
    [AI,pytorch]
---

# 前言

起初以为在Ubuntu安装pytorch需要用几个小时像正常的源码编译安装，在pytorch的github中发现，NVIDIA有为jetson套件专门生成了二进制文件，但是需要在jetpack4.5以上、python3.6上。

在NVIDIA论坛中看到的[Pytorch for Jetson](https://forums.developer.nvidia.com/t/pytorch-for-jetson-version-1-10-now-available/72048)，网站有时打不开，这里简述下安装过程。

# 安装Pytorch

1. Pytorch v1.10.0
   + JetPack4.4/JetPack4.4.1/JetPack4.5/JetPack4.5.1/JetPack4.6
   + python3.6
   + [torch-1.10.0-cp36-cp36m-linux_aarch64.whl](https://nvidia.box.com/shared/static/fjtbno0vpo676a25cgvuqc1wty0fkkg6.whl)
2. 安装依赖
    ```bash
    sudo apt-get install python3-pip libopenblas-base libopenmpi-dev
    pip3 install Cython
    ```
3. 安装torch

    ```bash
    pip3 install numpy torch-1.10.0-cp36-cp36m-linux_aarch64.whl
    ```

# 安装torchvision

1. 安装依赖
   ```bash
   sudo apt-get install libjpeg-dev zlib1g-dev libpython3-dev libavcodec-dev libavformat-dev libswscale-dev
   git clone --branch v0.11.1 https://github.com/pytorch/vision torchvision 

   # 注意这里的v0.11.1是和tourch有对应关系的
   
    # PyTorch v1.0 - torchvision v0.2.2
    # PyTorch v1.1 - torchvision v0.3.0
    # PyTorch v1.2 - torchvision v0.4.0
    # PyTorch v1.3 - torchvision v0.4.2
    # PyTorch v1.4 - torchvision v0.5.0
    # PyTorch v1.5 - torchvision v0.6.0
    # PyTorch v1.6 - torchvision v0.7.0
    # PyTorch v1.7 - torchvision v0.8.1
    # PyTorch v1.8 - torchvision v0.9.0
    # PyTorch v1.9 - torchvision v0.10.0
    # PyTorch v1.10 - torchvision v0.11.1

    cd torchvision
    export BUILD_VERSION=0.11.1
    # 这里的版本与上面对应

    python3 setup.py install --user
   ```

# 验证
```python

import torch
import torchvision

print(torch.__version__)
print('CUDA available: ' + str(torch.cuda.is_available()))
print('cuDNN version: ' + str(torch.backends.cudnn.version()))
a = torch.cuda.FloatTensor(2).zero_()
print('Tensor a = ' + str(a))
b = torch.randn(2).cuda()
print('Tensor b = ' + str(b))
c = a + b
print('Tensor c = ' + str(c))

print(torchvision.__version__)

```


