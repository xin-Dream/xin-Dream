---
title: 在Clion上开始LeetCode
date: 2021-06-13 22:35:31
tags: 
    [Jetbrains,LeetCode] 
categories: 
    [程序设计,LeetCode]
typora-root-url: ..\..
---

1. 在github上新建Repository后clone到本地，在clion中打开文件夹

2. 在clion中安装插件（plugin）
   1. LeetCode editor
   2. C/C++ Single File Execution

3. 安装好插件后，在侧边栏找到LeetCode插件，在LeetCode的菜单栏找到设置

![01](/images/在Clion上开始LeetCode/01.png)

4. 设置界面信息
   1. 填写LeetCode的邮箱（LoginName）和密码（Password）
   2. 选定TempFilePath为第一步clone下的文件夹
   3. 选中Custome Template然后设置模板，这样后面可以直接生成程序框架

```C
CodeFileName: $!{question.frontendQuestionId}-${question.titleSlug}
CodeTemplate:   //${question.title}
                //${question.titleSlug}
                //$!velocityTool.date()

                ${question.code}

                \#include "stdio.h"

                int main(){
                    //printf("${question.frontendQuestionId},${question.title}";
                }   
```

5. 在LeetCode菜单栏第一个按钮即是登录按钮，登录后即可根据难度或顺序选择题目，双击后即可在文件夹中生成程序，右键还可选择题目等。

6. 在程序文件中，右键“Add executable for single c/cpp file”，即可在CMakeLists.txt中添加编译路径。在文本框上面可以选择autoreload，下次添加后就不用reload CMakeLists文件了