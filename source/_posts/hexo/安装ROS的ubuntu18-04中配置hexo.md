---
title: 安装ROS的ubuntu18.04中配置hexo
date: 2021-09-05 15:23:46
tags: hexo
categories: [hexo]
---

> 前言：
>
> 环境介绍：Ubuntu18.04  ROS-melodic
>
> 在把ubuntu主机当作工作主力后，希望把尽可能多的程序类工作移植到ubuntu主机中。由于安装了ROS，与npm有依赖冲突，所以一直不能安装npm。可以说是今天使ROS和npm在ubuntu18.04中共存了。
>
> 还有一个问题，类似于多台设备写代码，博客在ubuntu和windows中也需要同步




# 1.  安装npm

直接使用`sudo apt-get install npm`会由于依赖的问题，与ROS冲突。而仓库里的版本好像也很低，所以在nodejs中下载压缩包。

在下面链接中下载LTS安装包，将其保存到`/usr/local/share`目录下并解压。这个包是编译好的，所以解压后就不会再动了。

[nodejs下载地址](https://nodejs.org/en/)

为npm创建软链接，这里要注意，**创建软链接的路径一定要是完整路径**。

```bash
sudo ln -s /home/dream/002-software/006-node-v14.17.6/bin/npm /usr/local/bin/npm
sudo ln -s /home/dream/002-software/006-node-v14.17.6/bin/npx /usr/local/bin/npx
sudo ln -s /home/dream/002-software/006-node-v14.17.6/bin/node /usr/local/bin/node 
```

# 2. 安装hexo

这里如果是第一次使用hexo的话，可以参考我的另一篇博客{% post_link hexo/hexo配置记录  hexo配置记录 %}

```bash
# 使用国内镜像
npm install -gd express --registry=http://registry.npm.taobao.org

# 永久设置镜像地址
npm config set registry http://registry.npm.taobao.org

#安装hexo
npm install hexo-cli
```



# 3. clone博客仓库

我的博客仓库里有两个分支，main和gh-pages，gh-pages是hexo生成的html文件，main中是源格式代码。这里需要注意，如果想要上传源格式代码中，由于有些文件夹内包含git文件，add时可能不会被添加，可以使用`git add -f ×`。这样在另一台设备中直接clone即可同步主题等。



clone之后的操作就可以正常操作hexo了，注意每次`hexo -d`后使用`git`提交一遍源格式，这样临时换设备就要先`git pull`

