---
layout: post
title: hexo博客使用emoji表情
date: 2021-11-06 20:42:45
tags: hexo
categories: [hexo]
typora-root-url: ..\..
---

# 安装插件

```
npm install hexo-filter-github-emojis --save
```

# 启用插件

```bash
# 在根目录的config.yml文件下添加

githubEmojis:
  enable: true
  className: github-emoji
  unicode: true
  styles:
    display: inline
    vertical-align: middle # Freemind适用
  localEmojis:
```

