---
layout: post
title: ROS与Anaconda共存
date: 2021-12-05 11:43:41
tags: 
    [ROS,Anaconda] 
categories: 
    [Linux,ROS]

---

# 参考教程

[详细教程](https://www.guyuehome.com/35918)

# 1. 安装anaconda

[anaconda下载地址](https://www.anaconda.com/)

下载后按正常流程安装，最后一步提示在bashrc添加init时输入NO。

# 2. 添加alias

在.bashrc中添加以下内容
```bash
alias setconda='. /home/name/software/amaconda3/bin/activate'
```

# 3. 使用
需要用到anaconda的时候，使用setconda即可打开conda环境