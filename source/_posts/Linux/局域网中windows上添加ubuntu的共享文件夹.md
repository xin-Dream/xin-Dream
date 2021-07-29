---
title: 局域网中windows上添加ubuntu的共享文件夹
date: 2021-07-27 22:18:31
tags: 
    [ubuntu] 
categories: 
    [Linux,ubuntu]
---


# 1. 安装samba

```BASH
sudo apt-get install samba
sudo apt-get install samba-common
```

# 2. 创建共享文件夹

```BASH
sudo mkdir ~/share

sudo chmod 777 ~/share
```

# 3. 配置samba

```BASH
sudo vim /etc/samba/smb.conf

# 在文中最后添加以下内容

[share]
comment = share folder
browseable = yes
path = /home/dream/Share
create mask = 0755
directory mask = 0755
valid users = dream     # 注意这里的用户，应为ubuntu账户之一
force user = dream
force group = dream
public = yes
available = yes
writable = yes
```

# 4. 添加samba用户

```BASH
sudo smbpasswd -a dream  # 这里要和上一步设置的用户一致

# 按照要求设置密码
```

# 5. 重启samba服务

```BASH
sudo /etc/init.d/smbd restart
```

# 6. 在windows中添加网络文件夹

在此电脑中右键--添加一个网络位置
设置地址为
```BASH
# 这里的网络地址应为与windows位于同一局域网的地址
\\192.168.0.101\share
```





