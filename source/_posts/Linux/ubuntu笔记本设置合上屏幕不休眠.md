---
title: ubuntu笔记本设置合上屏幕不休眠
date: 2021-07-22 11:53:28
tags: 
    [ubuntu]
categories: 
    [Linux,ubuntu]
---

```BASH
sudo vim /etc/systemd/login.conf
```
添加  HandleLidSwitch=ignore

```BASH
 #  This file is part of systemd.
 #
 #  systemd is free software; you can redistribute it and/or modify it
 #  under the terms of the GNU Lesser General Public License as published by
 #  the Free Software Foundation; either version 2.1 of the License, or
 #  (at your option) any later version.
 #
 # Entries in this file show the compile time defaults.
 # You can change settings by editing this file.
 # Defaults can be restored by simply deleting this file.
 #
 # See logind.conf(5) for details.
 [Login]
 #NAutoVTs=6
 #ReserveVT=6
 #KillUserProcesses=no
 #KillOnlyUsers=
 #KillExcludeUsers=root
 #InhibitDelayMaxSec=5
 #HandlePowerKey=poweroff
 #HandleSuspendKey=suspend
 #HandleHibernateKey=hibernate
 #HandleLidSwitch=suspend
 #HandleLidSwitchDocked=ignore
  HandleLidSwitch=ignore
 #PowerKeyIgnoreInhibited=no
 #SuspendKeyIgnoreInhibited=no
 #HibernateKeyIgnoreInhibited=no
 #LidSwitchIgnoreInhibited=yes
 #HoldoffTimeoutSec=30s
 #IdleAction=ignore
 #IdleActionSec=30min
 #RuntimeDirectorySize=10%
 #RemoveIPC=yes
 #InhibitorsMax=8192
 #SessionsMax=8192
 #UserTasksMax=33%
```

然后重启服务或重启电脑
`service systemd-logind restart`
