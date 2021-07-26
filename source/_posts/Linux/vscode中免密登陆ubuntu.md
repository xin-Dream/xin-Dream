---
title: vscode中免密登陆ubuntu
date: 2021-07-26 10:37:57
tags: 
    [vscode] 
categories: 
    [Linux,ubuntu]
---

> 对ssh 的公钥私钥怎么使用建议弄清楚，不一定要在windows中生成。

# 1. 在windows中生成ssh秘钥

在cmd中运行以下代码

```BASH
ssh-keygen -t rsa

# 注意在回车后第一步要确定生成位置和名称，如果ssh秘钥过多的话最好是自己定义清楚名称
# 记住选择的生成路径，后面要用，一般默认路径，修改名称就可以
# 比如我设置为id_rsa_windows
```

# 2. 在ubuntu中添加公钥

在ubuntu中`~/.ssh`下添加文件id_rsa_windows.pub，将windows中同名文件内容复制进去
然后将pub文件内容写入authorized_keys
`cat ~/.ssh/id_rsa_windows.pub >> ~/.ssh/authorized_keys`

也可以直接将内容复制到authorized_keys中，但是不建议这样做，当对多台服务器使用时，可能会很混乱

# 3. 为公钥添加权限

有关权限的解释可以看这篇文章{% post_link Linux/ubuntu中权限的说明  ubuntu中权限的说明%}

```BASH
chmod 600 ~/.ssh/authorized_key
```


# 4. 在vscode中设置

在vscode中的远程config文件中，按下列格式添加远程服务器
```BASH

Host ASUS
  HostName 192.168.137.211
  User dream
  IdentityFile C:\Users\dream\.ssh\id_rsa_ASUS  # 注意这里的id_rsa_ASUS为私钥

```



