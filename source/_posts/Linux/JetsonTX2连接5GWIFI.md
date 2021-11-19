---
title: JetsonTX2连接windows热点
date: 2021-07-21 21:16:45
tags: 
    [JetsonTX2] 
categories: 
    [Linux,ubuntu]
typora-root-url: ..\..
---

# 前言

windows主机刚换了AX200网卡，设置无线模式连接5GHz频段后，网速终于赶上了校园网中的前列。
这里发现个新问题，**windows连接5GHz的无线网，开启的热点也是5GHz。**
在使用JetsonTX2的时候，发现找不到5GHz的热点。

# JetsonTX2网卡

一开始以为JetsonTX2不支持5GHz的无线网，好奇的是这么高端的开发板会不支持5G？
</br>
</br>
查了下技术手册，发现JetsonTX2支持连接到802.11acWi-Fi，也就是透过5GHz频带提供高通量的无线局域网（WLAN），**俗称5G WiFi （5th Generation of Wi-Fi）**。理论上它能够提供最少1Gbps带宽进行多站式无线局域网通信，或是最少500Mbps的单一连线传输带宽。

# 查看JetsonTX2可用信道

可以看到，可用信道为36、40、44、48、52、56、60、64


![01](/images/JetsonTX2连接5GWIFI/01.png)


# 查看当前网络信道

可以看到，在5.8GHz下有windows热点的信号，正好与JetsonTX2的可用信道避开。
也就是说，如果在JetsonTX2上设置可以连接149信道，就能使用windows的热点了。

![02](/images/JetsonTX2连接5GWIFI/02.jpg)

# 修改JetsonTX2的信道

修改WIFI国家码为支持149以上信道的国家
![03](/images/JetsonTX2连接5GWIFI/03.png)

```bash
sudo iw reg set CN
```

# 经过以上修改，理论上应该出现149及以上信道，但JetsonTX2中并未出现
# 设置windows热点频段

原来AX200的网卡可设置双频带，这种模式下可以选择热点的频段。
在设备管理器中选中网卡属性，设置无线模式为双频带

![04](/images/JetsonTX2连接5GWIFI/04.png)

![05](/images/JetsonTX2连接5GWIFI/05.png)

![06](/images/JetsonTX2连接5GWIFI/06.png)
