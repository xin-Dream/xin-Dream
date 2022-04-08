---
title: windows配置JAVA环境
date: 2021-04-14 17:58:57
tags: 
    [windows,软件] 
categories: 
    [windows]
---
# 配置java环境

 1. 安装jdk

 记住安装目录即可，安装完完成后，测试jdk
 

```bash
java -version
```
出现下图表示配置正常
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200601113041422.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQ1MTcyMTU2,size_16,color_FFFFFF,t_70)
	  2.  添加环境变量
	  （1）新建系统变量
	  

```bash
变量名：JAVA_HOME
变量值(第一步的安装目录)：D:\jdk
```
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200601113525797.png)
（2）新建系统变量

```bash
变量名：CLASSPATH
变量值：.;%JAVA_HOME%\lib\dt.jar;%JAVA_HOME%\lib\tools.jar;
```
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200601113638352.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQ1MTcyMTU2,size_16,color_FFFFFF,t_70)
（3）添加path

```bash
%JAVA_HOME%\bin
%JAVA_HOME%\jre\bin
```
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200601113742269.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQ1MTcyMTU2,size_16,color_FFFFFF,t_70)
3. 测试

```bash
java -version
java
javac
```
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200601113855514.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQ1MTcyMTU2,size_16,color_FFFFFF,t_70)
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200601113908251.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQ1MTcyMTU2,size_16,color_FFFFFF,t_70)


