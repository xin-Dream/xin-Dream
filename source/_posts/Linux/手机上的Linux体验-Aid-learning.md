---
title: 手机上的Linux体验----Aid learning
date: 2021-01-28 22:24:48
tags: 
    [软件] 
categories: 
    [Linux]
---
> # termux
termux作为Android的高级终端模拟器可以单独使用，也可以在termux上安装其他Linux系统；安装完成后和手机系统完全不影响，出了问题完全可以直接卸载termux。
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200502170724984.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQ1MTcyMTU2,size_16,color_FFFFFF,t_70)

安装系统最简单的办法就是使用Anlinux的指令安装，简单易操作。另外借助Anlinux还可以安装系统桌面。安装完成后可以使用VNC Viewer实现可视化操作。使用VNC连接就可以实现在同一局域网下的电脑，手机，平板等多平台操作。
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200502170744843.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQ1MTcyMTU2,size_16,color_FFFFFF,t_70)

安装完系统之后就和正常的Linux操作一样了。
总结termux就是：操作简单，可开发度高，能实现什么样的功能完全取决于你自己；但是很多东西需要你自己去安装，过程还是比较复杂。

附上一份   [termux教程](https://www.sqlsec.com/2018/05/termux.html#toc-heading-218)

> # Aid learning
Aid learning是我最近刚刚了解到的一款APP，AidLearning是一个运行在移动端（Android）上的支持图形化界面的Linux虚拟机。相对于termux，Aid learning可以实现的基本功能是一样的，只不过Aid learning是一个纯净的Linux模拟器，对于AI开发远远比termux简单便捷，这里有  [具体介绍](https://blog.csdn.net/weixin_42055532/article/details/103944207)

![手机端的图形界面](https://img-blog.csdnimg.cn/20200502171558259.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQ1MTcyMTU2,size_16,color_FFFFFF,t_70)
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200502182620936.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQ1MTcyMTU2,size_16,color_FFFFFF,t_70)

> ## 优势 
当然，我更推荐Aid learning的原因并不是因为自带图形化界面，对于我个人来说，Aid learning优势如下：（排名不分先后）
### 方便与电脑连接
如果都是在操作手机上的Linux系统的话，电脑上可以实现的操作，手机上都可以实现。但是从效率和使用上看，显然更大的屏幕和实体键盘会更方便。

虽然termux不能配置图形界面，但termux可以使用ssh和电脑连接，但是对于我这种初学者来说显然不如图形界面来的方便。termux中的子系统就可以通过VNC Viewer在电脑或其他设备上显示了。但是既然我想把手机作为一个便携式的移动应急设备使用，当然是越方便越好。急用的时候总不能要求借一个安装好VNCViewer的电脑吧（虽然安装很简单）。
Aid learning在这方面就比termux要方便一点。在Cloud_IP中可以看到
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200502173414614.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQ1MTcyMTU2,size_16,color_FFFFFF,t_70)

一个IP地址，这样你可以在其他电脑，平板，手机等访问你手机上的这个系统。termux中的子系统或许也可以实现这个功能，但是我还不会。
**注意：这不是简单的投屏！**
如果是VNCViewer的话，在多个设备上连接同一个系统的时候，各种动作是同步的。但是Aid learning的各个访问是独立的。
**另外你还可以通过不同的端口访问系统里不同的应用**，这也是我喜欢这个APP的一个地方
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200502173317987.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQ1MTcyMTU2,size_16,color_FFFFFF,t_70)
以下是电脑访问界面：

![桌面](https://img-blog.csdnimg.cn/20200502173543308.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQ1MTcyMTU2,size_16,color_FFFFFF,t_70)
![vscode](https://img-blog.csdnimg.cn/20200502173655835.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQ1MTcyMTU2,size_16,color_FFFFFF,t_70)
![jupyter](https://img-blog.csdnimg.cn/20200502173731886.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQ1MTcyMTU2,size_16,color_FFFFFF,t_70)
平板的访问暂时没有截图。
### 可以让旧的平板重新化身生产力
家里有个以前的荣耀平板，RAM只有1G，对现在的APP来说，买后爱奇艺的水平都达不到，但是我可以网页访问手机Linux系统，作为一个显示屏用，也不算浪费。题外话，其实平板还可以安装Microsoft的Remote Client，在同一局域网下访问windows。在学校里连上校园网，躺在宿舍的床上就可以使用在实验室的电脑，也不用因为某些原因苦苦的等到凌晨再回宿舍。

### 自带vscode和jupyter
之前我在termux的Ubuntu中尝试过安装我最喜欢的vscode，但是过程复杂，没能安装成功，最后只能放弃。有我最喜欢的vscode才是我转向Aid learning的最重要的原因吧，哈哈。
我在电脑上将vscode的扩展，设置等完全备份到了github，这样手机上的vscode可以毫不费力的达到我想要的样子。在不方便带电脑，又不想浪费时间的情况下，vscode配合github，这就是趋近完美的远程解决方案。这又是我喜欢vscode的一个原因，轻松将项目推送到github。有了vscode，C/C++，JS，html都变得简单了起来。termux不知道能不能配置这些环境，对于我这样的新手还是这个容易操作。
再说jupyter Notebook，也是因为老师发布的作业，示例都通过jupyter Notebook才接触到。简单说，它是以网页形式打开，可以在网页上编写代码并运行的，结果也是直接显示在网页上，相关的说明也可以写在上面。这样，我就可以在手机上查看作业和示例了，显然比之前复制发送到手机方便的多。![手机端jupyter](https://img-blog.csdnimg.cn/20200502180101103.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQ1MTcyMTU2,size_16,color_FFFFFF,t_70)
### 自带案例
这个就是termux里没有的了，有一些打开手机摄像头，人脸识别，人脸关键点识别，人体姿态识别等等。这里有一些我还看不懂，就不方便评论了，各位下载后自己体验吧。
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200502180839474.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQ1MTcyMTU2,size_16,color_FFFFFF,t_70)
![面容ID](https://img-blog.csdnimg.cn/20200502180844530.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQ1MTcyMTU2,size_16,color_FFFFFF,t_70)
### APP生成器
在ApkBuild中可以将python文件生成apk。我的程序还没到转换成Apk的地步，尝试了几个小程序，失败了，希望以后能用到。
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200502181244583.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQ1MTcyMTU2,size_16,color_FFFFFF,t_70)
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200502181249770.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQ1MTcyMTU2,size_16,color_FFFFFF,t_70)
### 支持AI框架丰富

### 图形界面开发包cvs
之前在termux和termux里的Ubuntu尝试安装opencv，失败告终。除了termux的不了解，可能是由于Ubuntu受termux的影响有些地方配置不一样。cvs继承了cv2和python的gui库的大部分功能，大部分使用是和cv2一样的。
### 其他
另外，Aid learning里还支持图形化编程，可以转化成python，PHP等，不知道和那些所谓的少儿编程是不是一样，感觉上这样写程序还不如直接写程序，不过也算是个优势吧，等我有时间学一下再评论。![在这里插入图片描述](https://img-blog.csdnimg.cn/20200502183000210.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQ1MTcyMTU2,size_16,color_FFFFFF,t_70)
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200502183005968.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQ1MTcyMTU2,size_16,color_FFFFFF,t_70)

> ## 缺点
世事无绝对，Aid learning的缺点还是很明显的。
**对手机性能要求高**
内存大概需要6G（不包括下载的资料），RAM大概200M，Android6及以上

# 总结
当然，这篇文章并不是说termux就完全不如Aid learning，只不过Aid learning对现在的我来说更合适，初学AI和Linux，就可以把大部分时间放到具体实现上，而不会因为跨平台总是奔波在调整配置上，毕竟手机只是个便携工具，我就是日常浏览，应急使用，真正的学习还是要在电脑上。

写这篇文章的目的是记录对手机上Linux的体验。既然是记录，这种完全可以共享的文章就放在CSDN上了，我就抛砖引玉，希望能有感兴趣的人共同讨论。更大一部分是关于Aid learning的学习记录，这个在适当的时间出现在我视线里的APP让我感觉十分惊艳；另外我觉得对一个产品的评判并不是一时间就能完全确定的，记录下我现在的感受，等以后有需要再写上。


附：
Aidlearning的系列教程：[Aidlearning的博客](https://blog.csdn.net/weixin_42055532)
