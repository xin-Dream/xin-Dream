---
title: git问题解决
date: 2021-05-29 16:24:50
tags: 
    [Git] 
categories: 
    [程序设计,Git]
typora-root-url: ..\..
---

1. fatal: Could not read from remote repository.Please make sure you have the correct access rights


![1](/images/git问题解决/1.png)

重新配置用户信息，删除C:\Users\dream\.ssh中的known_hosts
```
git config --global user.name "xin-Dream"
git config --global user.email "1812752073@qq.com"
```

