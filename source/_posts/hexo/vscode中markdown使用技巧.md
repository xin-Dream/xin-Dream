---
title: vscode中markdown使用技巧
date: 2021-06-20 22:03:20
tags: hexo
categories: [hexo]
---

# Markdown语法：
## 1. 缩进
+ 输入 `&ensp;`

## 2. 添加代码段

```bash

> ```语言格式
> ```

注意这里是反单引号，通常是Esc的副功能

```

## 3. 带选择框的TODO

```
- [ ]
- [x]
```

## 4. 点击展开内容 & html格式带选择框的TODO

```html


<details>
    <summary>设计结构框架：点击查看详细内容</summary>
        <li><input disabled="" type="checkbox"> 结构设计
            <ul>
                <li><input checked="" disabled="" type="checkbox"> 钣金结构设计</li>
              
            </ul>
        </li>
        <li><input disabled="" type="checkbox"> 电路设计
            <ul>
                <li><input checked="" disabled="" type="checkbox"> 24V、12V、5V、3.3V稳压电路</li>
            </ul>
        </li>
       
  <!-- <pre><code>title，value，callBack可以缺省</code></pre> -->
</details>

```


# vscode技巧

## 1. 写文章时类似代码提示

写文章时，vscode会自动提示，但是提示内容是在本文中或当前打开的其他文件中。
还是有点用的，比如某些固定的格式或hexo文章中的categories,tags等。





