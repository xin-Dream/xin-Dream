---
title: ubuntu18.04server开机连接WIFI
date: 2021-08-06 15:59:41
tags: 
    [ROS,raspberry] 
categories: 
    [Linux,ROS]
---

# 树莓派安装ubuntu18.04server

## 开机连接WIFI
读取树莓派内存卡，在system-boot中找到network-config文件，按以下内容修改
其中`Dream`是我的热点名称，`12345678`是热点的密码。
</br>
```BASH
wifis:
  wlan0:
    dhcp4: true
    optional: true
    access-points:
      "Dream":
        password: "12345678"
```
如果失败的话，开机后按以下步骤修改
sudo vim /etc/netplan/50-cloud-init.yaml 

```BASH
network:
    ethernets:
        eth0:
            dhcp4: true
            optional: true
    version: 2
    wifis:
        wlan0:
            access-points:
                RoboCenter_2.4:
                        password: "12345678"
            dhcp4: true
            optional: true

```


# Raspberry3B+
{% post_link Linux/ROS/ubuntu18-04LTS安装ROS ubuntu18-04LTS安装ROS %}

# Raspberry4B

{% post_link Linux/ROS/ubuntu18-04LTS安装ROS ubuntu18-04LTS安装ROS %}