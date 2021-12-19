---
layout: post
title: hexo添加mermaid流程图
date: 2021-12-19 11:42:57
author: ZGX
tags:
  - hexo
categories:
  - hexo
top: 
typora-root-url: ../..

---


# 前言

上次在博客中添加了思维导图后，又想加点流程图，这样可以直接在markdown写毕业论文了，虽然能加，还有点不完美，有时间再改吧

# 1. 安装插件

```bash
npm install hexo-filter-mermaid-diagrams
```



# 2. 修改配置文件

这里修改的是主题的配置文件，如果用的不是我这个主题可能会有些不一样，可以看下[其他办法](https://wangxiaoyu-go.github.io/2018/11/23/hexo-filter-mermaid-diagrams/)。

```xml
mermaid:
  enable: true
  cdn: https://cdn.jsdelivr.net/npm/mermaid@8.9.2/dist/mermaid.min.js
  # cdn: ../../mermaid.js
  version: "8.9.2"
  theme: forest
```



# 3. 使用

使用时要将其当作代码块使用，如下：

~~~bash

` ` `mermaid
graph TD;
    A-->B;
    A-->C;
    B-->D;
    C-->D;
` ` `
```sequence
    Alice->John: Hello John, how are you?
    loop every minute
        John-->Alice: Great!
    end
```
~~~

# 4. [更多样式](https://mermaid-js.github.io/mermaid/#/)









