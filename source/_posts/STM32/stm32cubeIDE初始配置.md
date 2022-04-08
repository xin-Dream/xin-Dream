---
title: stm32cubeIDE初始配置
date: 2021-01-28 21:57:00
tags: 
    [stm32] 
categories: 
    [STM32]
---
# 写在前面
1.在设置代码提示的过程中，如果安装插件版本不一样可能会导致文件不一致
2.在安装插件过程中如果有长时间无响应的，最好换个网络试一下
3.stm32CubeIDE是基于eclipse的，所以以下操作对于eclipse基本是同样适用的
# 汉化
安装完成后，Help-->Install newsoftware
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200824224017732.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQ1MTcyMTU2,size_16,color_FFFFFF,t_70#pic_center)
图片中location：

```c
http://mirrors.ustc.edu.cn/eclipse/technology/babel/update-site/R0.17.1/2019-12/

# 新地址
http://mirrors.ustc.edu.cn/eclipse/technology/babel/update-site/R0.18.3/2021-03/

#当地址失效时，网页打开查看最新文件即可
```

加载完成后选择下图选项，next安装
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200824224152619.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQ1MTcyMTU2,size_16,color_FFFFFF,t_70#pic_center)
安装完成后重启即实现汉化

# git
可能需要安装插件才能实现
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200825001943430.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQ1MTcyMTU2,size_16,color_FFFFFF,t_70#pic_center)
安装完成后即可实现直接推送到github或gitee，有两种实现方式，先从github上新建仓库，clone到本地，然后按以下步骤选择本地仓库，即可在IDE上实现推送；第二种就是新建本地仓库，这个方法没有试过，个人比较喜欢第一种方式。

在项目上右键-->Team-->分享，选择好本地仓库；再次push时在Team里就可以找到对应操作

# 代码提示（CDT插件修改安装）
如果安装不同版本的插件可能会导致修改失败！
如果修改Eclipse Marketplace中的CDT插件，最好找其他教程，版本不同，方法不同

## 1. 安装插件

像汉化一样安装CDT和Plug-in两个插件，安装内容如下
（1）CDT

```bash
https://download.eclipse.org/tools/cdt/releases/9.11

# 新地址
https://download.eclipse.org/tools/cdt/releases/10.2

#当地址失效时，网页打开查看最新文件即可
```
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200824225930786.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQ1MTcyMTU2,size_16,color_FFFFFF,t_70#pic_center)
(2)Plug-in

```bash
http://download.eclipse.org/releases/photon
```
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200824231351446.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQ1MTcyMTU2,size_16,color_FFFFFF,t_70#pic_center)
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200824231409659.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQ1MTcyMTU2,size_16,color_FFFFFF,t_70#pic_center)
## 2. 导入工程
窗口-->显示视图-->（其他）插件
找到下图插件
![在这里插入图片描述](https://img-blog.csdnimg.cn/2020082423330418.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQ1MTcyMTU2,size_16,color_FFFFFF,t_70#pic_center)
右键，导入方式-->源项目
导入后，在左侧workspace中就会有这个项目，接下来就是修改项目中的代码，重新生成插件
## 3. 修改插件代码
按下图顺序找到标注序号的两个文件
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200824233509769.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQ1MTcyMTU2,size_16,color_FFFFFF,t_70#pic_center)
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200824233721967.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQ1MTcyMTU2,size_16,color_FFFFFF,t_70#pic_center)
（1）在序号1文件中按截图添加如下内容

```java
default:
		return activationChar >= 97 && activationChar <= 122?true:activationChar >= 65 && activationChar <= 90; 
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200824234001365.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQ1MTcyMTU2,size_16,color_FFFFFF,t_70#pic_center)
（2）在序号2文件中按截图修改如下代码

```java
public void setCompletionProposalAutoActivationCharacters(char[] activationSet) {
//		fCompletionAutoActivationCharacters = activationSet;
		 String test = ".ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
	        char[] triggers = test.toCharArray();
	        fCompletionAutoActivationCharacters = triggers;
	}
```
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200824234247208.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQ1MTcyMTU2,size_16,color_FFFFFF,t_70#pic_center)
## 4. 导出插件并替换
按上述操作修改完代码并保存后，开始导出插件
在第二步导入的工程上，右键，导出
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200824234627453.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQ1MTcyMTU2,size_16,color_FFFFFF,t_70#pic_center)
选择一个地址用于保存导出的插件
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200824234655844.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQ1MTcyMTU2,size_16,color_FFFFFF,t_70#pic_center)
导出成功后替换安装位置plugins里的同名文件。
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200825182000540.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQ1MTcyMTU2,size_16,color_FFFFFF,t_70#pic_center)

然后退出CubeIDE，重新启动，即完成了自动提示代码的配置


# 参考
[1.【插件】STM32cubeIDE(eclipse)自动补全无需快捷键，cdt插件修改](https://blog.csdn.net/na2wo4/article/details/105631236)
[2. Eclipse CDT 插件修改自动补全](https://www.cnblogs.com/luyl/p/12057762.html)
