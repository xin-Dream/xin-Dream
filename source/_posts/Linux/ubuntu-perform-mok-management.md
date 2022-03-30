---
layout: post
title: 'ubuntu:perform_mok_management'
date: 2022-03-14 15:59:54
tags: 
    [ubuntu] 
categories: 
    [Linux,ubuntu]
typora-root-url: ..\..
---

ubuntu20.04在安装了显卡之后，会出现设置密码用于secure boot，在重启时会出现perform MOK management，这是用于重新加载驱动。

1. 当进入蓝色背景的界面perform mok management 后，选择 enroll mok
2. 进入enroll mok 界面，选择 continue
3. 进入enroll the key 界面，选择 yes
4. 接下来输入你在安装驱动时输入的密码
5. 之后会跳到蓝色背景的界面perform mok management 选择第一个 reboot