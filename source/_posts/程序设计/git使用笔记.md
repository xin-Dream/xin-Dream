---
title: git使用笔记
date: 2021-01-28 22:15:31
tags: 
    [Git] 
categories: 
    [程序设计,git]
---
# git基本操作
## 下载与配置
windows中可以去官网下载git：[下载地址](https://git-scm.com/downloads)
ubuntu中可以直接终端下载，比较方便

```bash
sudo apt-get install git
```
设置用户名和邮箱地址

```bash
git config --global user.name "你的github名字"
git config --global user.email "你的邮箱地址"
```

## 基本使用
我比较习惯在先在github上创建仓库，然后git clone到本地，修改之后在提交（如果是在vscode中操作会更简单），操作过程如下：

 1. clone远程仓库
```bash
git clone "在github上创建仓库的地址"
```
2. add
以添加index.py为例
```bash
git add index.py
```
3. commit

```bash
git commit -m "add a new file"
```
4. push将提交的信息推送到仓库

```bash
git push
```
5. pull，获取并整合另外的版本库或一个本地分支

```bash
git pull
```
6. checkout，检出一个分支或路径到工作区

```bash
checkout index.py
```

# git 高级操作
分支操作：



# ubuntu ssh连接git

 1. 创建SSH key , 没有特殊的指定文件可以直接回车

 

```bash
ssh-keygen -t rsa -C "你的email地址"
```
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200602165441521.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQ1MTcyMTU2,size_16,color_FFFFFF,t_70)

 2. 在github上添加sshkey
 
登陆GitHub，打开“Account settings”，“SSH Keys”页面，然后，点“Add SSH Key”，填上任意Title，在Key文本框里粘贴id_rsa.pub文件的内容。

## win10 ssh 连接github
和ubuntu中操作差不多，但是执行命令要在git bash中执行

```bash
ssh-keygen -t rsa -C "1812752073@qq.com"
```
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200602185729683.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQ1MTcyMTU2,size_16,color_FFFFFF,t_70)
# 参考
[git和github在ubuntu上的使用](https://blog.csdn.net/u012526120/article/details/49401871)