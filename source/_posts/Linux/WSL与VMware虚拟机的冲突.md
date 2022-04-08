---
title: WSL与VMware虚拟机的冲突
date: 2021-04-23 20:24:03
tags: 
    [WSL] 
categories: 
    [Linux]
---

# 1. 分别单独运行
```bash
#以下两个命令运行后并重启，分别可以运行WLS或VMware中的一个

bcdedit /set HyperVisorLaunchType OFF
bcdedit /set HyperVisorLaunchType auto
```

# 2. 共存

[参考连接](https://blog.csdn.net/Kukmoon/article/details/107438371?utm_medium=distribute.pc_relevant.none-task-blog-baidujs_title-1&spm=1001.2101.3001.4242)