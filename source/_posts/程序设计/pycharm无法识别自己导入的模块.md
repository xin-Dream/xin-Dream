---
title: PyCharm无法识别自己导入的模块
date: 2021-05-28 22:28:41
tags: 
    [PyCharm] 
categories: 
    [程序设计,Python]
---
解决：同级目录中自己写的文件，在其他文件中不能调用

1. File->settings->Build,Excution,Deployment->Console->Python Console
2. 勾选

```
Add content roots to PYTHONPATH
Add source roots to PYTHONPATH
```

3. 在项目上右键->Mark Diectory as ->source roots