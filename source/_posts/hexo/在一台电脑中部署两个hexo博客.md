---
title: 在一台电脑中部署两个hexo博客
date: 2021-10-04 16:01:37
tags: hexo
categories: [hexo]
---

> 环境简介：
> 现有两个Github账号，比如分别为xinDream、robotcenter
> 在.ssh文件夹下有两份密钥文件，如：id_xindream_rsa、id_robotcenter_rsa

# 1. 修改config文件
在.ssh文件夹内的config文件内添加如下内容：

```bash
Host github.com
	HostName github.com
	User git
	IdentityFile ~/.ssh/id_xindream_rsa
	
Host robotcenter.github.com
	HostName github.com
	User git
	IdentityFile ~/.ssh/id_robotcenter_rsa
```

# 2. 密钥添加ssh agent
使用git bash在.ssh文件夹打开后，执行以下命令
```bash
ssh-agent bash
ssh-add -D
ssh-add id_xindream_rsa
ssh-add id_robotcenter_rsa
```
验证配置：
```bash
ssh -T git@robotcenter.github.com
ssh -T git@github.com
```
若出现以下内容，则表示配置正常
```
Hi xin-Dream! You've successfully authenticated, but GitHub does not provide shell access.
```

# 3. 设置git的局部设置

首先取消git的全局设置

```bash
git config --global --unset user.name
git config --global --unset user.email
```

然后在每个项目文件夹中进行局部设置(有.git文件夹中)

```bash
git config user.name ""
git config user.email ""
```
# 4. 在hexo博客的config文件中设置

在hexo博客中的_config.yml里的最后设置deploy路径，注意，这不是主题中的config文件
```bash
deploy:
  type: git
  repository: git@robotcenter.github.com:robotcenter.github.io.git
  branch: master
```

# 注意

为了方便hexo博客的设备移植，我将hexo博客整体上传到了github的repository。这里需要注意.git的设置。主要有以下两点：
### 1. 删除主题中的.git或其他相关文件
这是因为下载的主题本就是个repository，重复嵌套上传到Github后可能会出问题，当然上传为链接文件也没啥问题，主要是我不想移植后再去改动。

### 2. 若将整体上传到respository，需要进行两次局部设置
1. 在hexo的整体架构中，在.deploy_git文件夹中的内容是要发送到第四步中设置的branch中的，所以这里也会有.git文件，也要对其进行局部设置。

2. 上传整体后，在hexo文件夹内有一个上传源文件的.git文件夹，要对这个进行一次局部设置。




