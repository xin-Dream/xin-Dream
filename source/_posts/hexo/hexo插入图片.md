---
title: hexo插入图片
date: 2021-04-22 21:31:36
tags: hexo
categories: [hexo]
---
# 1. 配置

首先应在博客的`_config.yaml`中设置下列选项为 **True**

```bash
post_asset_folder: true
```

# 2. 生成

之后在新创建文章时，会生成与文章同名的文件夹，将图片文件放入该文件夹即可。

# 3. 引用

在文章中使用以下代码即可引用
```
{% asset_img 01.png This is an image %}
```

