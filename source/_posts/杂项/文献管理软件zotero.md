---
layout: post
title: 文献管理软件zotero
date: 2021-10-29 02:53:41
tags: [Zotero]
categories: [杂项]
typora-root-url: ..\..
---

# 视频演示

<iframe src="//player.bilibili.com/player.html?aid=764323062&bvid=BV1Br4y1k7j7&cid=445025775&page=1" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true" height=400 width=800> </iframe>

> 视频中展示的为最终的使用流程：
>
> 下载的PDF直接拖入Zotero，在Zotero中会自动生成摘要和论文中的关键字；在Zotero中设置好快捷键后可以复制论文链接和论文名，复制后以超链接的形式粘贴到Typora做的笔记中。这样在Typora中点击超链接即可自动打开Zotero并定位到该论文。

> 论文阅读每个人都有自己的习惯，虽然Zotero中可以为论文添加单独的笔记，但是我想能逐行逐句精读的文章并不太多，有些文章可能只有一部分比较好，或者在做某些事情的时候需要查一些论文，这样把论文的超链接放到笔记中，记下要点，需要详细看的时候点进去看就好。

>这是电脑端，大部分是用来略读或看某一部分，如果是一些英文的或较长需要详细看的就用ipad中的papership写写画画的详细看。papership是ipad中可以和zotero同步的一个软件，在设置好网盘同步后，需要看哪篇文章就在papership中下载哪一篇就可以了。

# 1 软件与插件

1. windows软件：[Zotero软件](https://www.zotero.org/)
2. ipad软件：papership
3. zotero中的插件
   + [zotfile](http://zotfile.com/)：自动将PDF（或其他文件）重命名，移动和附加到Zotero项目，将PDF从Zotero库同步到您的（移动）PDF阅读器（例如iPad，Android平板电脑等）。 ）并从PDF文件中提取注释。
   + [Jasminum](https://github.com/l0o0/jasminum/releases)：对中文文献友好，抓取知网元数据。
   + [DOI Manager](https://github.com/bwiernik/zotero-shortdoi/releases)：获取文献DOI。
   + [zutilo](https://github.com/wshanks/Zutilo)：可自定义设置很多快捷键，自定义太多反而不知道设置什么好，我只用了其中一项功能。

# 2 文献同步设置

> zotero自己带有一部分存储空间，但是比较小，所以使用WebDAV同步文献，如果觉得文献只在自己电脑上看，不需要同步，也可以不设置
>
> 这里选用TeraCLOUD，支持web DAV的网盘，初始空间是10+5G

## 2.1 注册与设置网盘

1. [TeraCloud](https://teracloud.jp/en/)
2. 在My Page界面，找到Apps Connection，如下图，使用Reissue即可生成密码。这个URL和密码要在zotero中用到。![01-16373103641981](/images/文献管理软件zotero/01-16373103641981.png)
3. 在Zotero中找到：编辑->首选项->同步->文件同步，在使用的下拉框中选择WebDAV。
4. 在WebDAV中填入上图中的URL、用户名（ID）、密码，然后选择验证服务器

> 这里有个问题，在papership中有可能会验证不对，这时候在网盘的zotero中新建文件夹，命名为：lastsync.txt  切记要有".txt"，一定要在网盘中创建，不能上传。

## 2.2 Zotero中的路径设置

> 这里的根目录之类的，我按照网上的一些教程设置根目录，发现即使同步，也不能在papership中下载。可能是使用绝对路径后，文件本身在根目录，在zotero中存储的是链接。

1. 编辑->首选项->高级->文件和文件夹

   ![02-16373103802062-16373104210553](/images/文献管理软件zotero/02-16373103802062-16373104210553.png)

2. 工具->ZotFile Preference

   ![03](/images/文献管理软件zotero/03-163724446952915.png)

3. 这两个页面的设置，一定要按上图设置，否则在papership中不能打开pdf文件

4. 这样设置完成后，将PDF拖入Zotero后，pdf会自动重命名存储到E:\007-zoterodata\storage

# 3 复制超链接的快捷键设置

1. 复制文章名称

   这个zotero已经实现了，下图中的复制引文就是 Ctrll+Shift+A

   ![image-20211119160534530](/images/文献管理软件zotero/image-20211119160534530.png)

2. 复制超链接

   + 在工具->zutilo首选项中按照下图设置
   + ![image-20211119160749580](/images/文献管理软件zotero/image-20211119160749580.png)

到这里就设置完成超链接了，选中一篇文章(这里不要点PDF，点zotero自动生成的小帽子或文本图标那个)，连续使用Ctrl+Shift+A、Ctrl+Shift+X就复制到了论文名与链接，打开Typora，使用Ctrl+K，就自动生成了超链接，在剪切板中选中论文名称，就可以了。

# 待更新......

