---
layout: post
title: 使用Typora写hexo博客
date: 2021-11-06 16:40:02
tags: hexo
categories: [hexo]
typora-root-url: ..\..
---



# 前言

> 之前一直使用VScode作为hexo博客的编辑器，写的文档多了之后，特别是在我最近经常写综述性文章，在文章内需要引用很多其他位置文章、图片。所以看博客原文看都要看累了，更不要提有时候一两天写不完，每次重新打开，都要想半天在哪。所以需要找一个所见即所得的markdown编辑器。
>
> 看到使用Typora写博客时插入图片还挺方便，至于引用其他文章如何还要再试试。
>
> 有关Typeroa的使用技巧也会一起写在本文内。



# 1 Typora下载与使用技巧

## 1.1 Typora

[Typora官网](https://typora.io/)

## 1.2 主题更换

1. [Typora主题下载](https://theme.typora.io/)
2. 下载主题的CSS文件，将其放到Typora的主题文件夹内即可。
3. 打开主题文件夹：文件->偏好设置->外观->打开主题文件夹

![主题文件夹位置](/images/使用Typora写hexo博客/image-20211106170404957-16361894463612.png)

# 1.3 插入超链接

首先复制好要插入的超链接地址，在Typora中使用Ctrl+K即可编辑超链接显示的文字

## 1.4 插入表情

:cake: 锦上添花！在Typora中使用英文冒号后输入单词，即可自动提示表情，还支持预览。

[表情一览表](https://blog.csdn.net/weixin_42395140/article/details/111642339)

~~比较遗憾的是，在hexo博客中不能显示。待解决.......~~

{% post_link hexo/hexo博客使用emoji表情  hexo博客使用emoji表情 %}

# 2 便捷的插入图片

> 重点！
>
> 以前写文章一直懒得放图片，太麻烦了，使用Typora后可能再写文章就能多放些图片了。

1. 首先按照下图设置根目录。对于hexo博客的层级结构大家应该都清楚，文章在posts文件夹中，这里我把根目录设置为posts的上一级：source

   ![设置根目录](/images/使用Typora写hexo博客/image-20211106173513240.png)

2. 设置粘贴图像时的动作。

   + 这里我在source文件夹下新建了一个images文件夹；
   + 在Typora中按下图设置后，只要往Typora中粘贴图片，就会自动在images中创建以文件名创建的文件夹，图片也会复制到指定目录
   + 因为我写文章是在posts下新建了文件夹，所以路径可能稍有出入，设置时可以自己适当调整。

   ![路径设置](/images/使用Typora写hexo博客/image-20211106172939065-16361909809501.png)

3. 博客中的设置

   修改scaffolds中的post模板。这样下次新建文档就会自动添加根目录。

   ```bash
   ---
   title: {{ title }}
   date: {{ date }}
   tags:
   categories:
   typora-root-url: ..\..
   ---
   
   ```

   