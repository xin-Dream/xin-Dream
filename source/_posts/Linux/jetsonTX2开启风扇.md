---
layout: post
title: jetsonTX2开启风扇
date: 2021-11-01 22:36:52
tags: 
    [ubuntu18.04,JetsonTX2] 
categories: 
    [Linux,ubuntu]
---

# 开启风扇模式

```
sudo /usr/bin/jetson_clocks
```

# 调整风扇转速


```
sudo vim /sys/devices/pwm-fan/target_pwm
```
