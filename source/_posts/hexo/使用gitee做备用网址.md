---
layout: post
title: 使用gitee做备用网址
date: 2021-12-19 10:31:11
author: ZGX
tags:
  - hexo
categories:
  - hexo
top: 
typora-root-url: ../..
---

# 前言

本来计划将部署在Github中的博客迁移到Gitee，可以加快访问速度。没想到Gitee的Page只有基础版免费，连域名都不能绑定。Pages Pro只有三个高级功能：自定义域名、+https、发布仓库中的某个目录，这个人用户还不能购买。。。

就把Gitee当作备用吧，好在同步还方便。

# 1 迁移Github仓库

![导入仓库地址](/images/使用gitee做备用网址/image-20211219160637338.png)

![导入仓库界面](/images/使用gitee做备用网址/image-20211219160757335.png)

# 2 开启Page服务

导入仓库后，按下图进入Gitee Pages的设置，这里需要实名认证、身份证正反面照片和有人像的手持身份证照片，一个工作日可审核结束

![Gitee Pages](/images/使用gitee做备用网址/image-20211219160934109.png)

审核结束后再次进入Gitee Pages，就能选择要部署的仓库分支，如下：

![部署分支](/images/使用gitee做备用网址/image-20211219161218698.png)

# 3 与Github保持同步

在Github中上传代码或使用hexo d部署博客后，可直接一键同步

![image-20211219161318746](/images/使用gitee做备用网址/image-20211219161318746.png)
