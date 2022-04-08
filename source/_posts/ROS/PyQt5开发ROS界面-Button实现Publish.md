---
layout: post
title: PyQt5开发ROS界面1--Button实现Publish
date: 2021-11-14 21:14:59
tags: 
    [ROS,GUI] 
categories: 
    [ROS]
typora-root-url: ..\..
---

# 前言

> 由于长期使用命令行，加上显示数据信息不方便，应该将GUI的计划往前提一下，同步进行ROS开发。PyQt5的使用还是比较简单的，加上有Android和Web的基础，大同小异，在实现界面设计的基础上实现一些类似回调函数的功能即可。
>
> 第一步先通过文本输入框和按钮实现publish功能，控制小乌龟的运动。



# 1 界面制作

> 界面制作类似Dreamweaver和Android Studio的流程，为尽量减少代码量，使用QtDesigner设计好UI文件后转化为py文件

## 1.1 QtDesigner下载安装

如果是在Windows开发的话，可能在配置环境时会安装好这个软件，由于我是在JetsonTX2上远程开发，windows没必要配置环境。所以windows中单独安装QtDesigner。

[QtDesigner下载地址](https://build-system.fman.io/qt-designer-download)

## 1.2 QtDesigner的使用

这里不详细展开，后面在这里补充要注意的问题。

1. 界面设计使用Layout时由小极大，先规划小部分，再实现大部分；
2. 修改元件名称的位置在右侧的objectName；
3. 待更新

## 1.3 UI文件转Python文件

这个需要在安装有pyqt5的环境中实现

1. 命令行使用

    ```bash
    pyuic5 -o myMainWin.py myMainWin.ui	
    ```
    
2. Pycharm转换

# 2 程序实现

```python
import os

import rospy
from PyQt5.QtWidgets import *

# 这是使用QtDesigner设计后转化的python文件
from firstMainWin import *

#这里使用的Twist要使用rostopic查询turtle的话题
from geometry_msgs.msg import Twist

class MyMainWindow(QMainWindow, Ui_MainWindow):
    def __init__(self, parent=None):
        super(MyMainWindow, self).__init__(parent)
        self.setupUi(self)

        self.setWindowTitle("小乌龟控制")
        self.resize(1000, 700)

        topic_name = "/turtle1/cmd_vel"
        self.publisher = rospy.Publisher(topic_name, Twist, queue_size=100)

        self.send_btn.clicked.connect(lambda: self.click_send())

    def click_send(self):
        linear = self.Linear.text()
        angular = self.Angula.text()

        twist = Twist()
        twist.linear.x = float(linear)
        twist.angular.z = float(angular)
        self.publisher.publish(twist)
        

if __name__ == '__main__':
    rospy.init_node("tutrle_ctrl_node")

    # QT UI
    app = QApplication(sys.argv)

    window = MyMainWindow()
    window.show()

    sys.exit(app.exec_())
```



# 3 运行验证

> 这里的环境要说明一下，由于我在JetsonTX2的workspace中写的程序，所以是在启动roscore后使用rosrun运行。由于catkin_make需要，要在CMakelist文件中添加定义。
>
> 使用MobaXterm运行时需要在bashrc或zshrc中设置远程显示，这样在JetsonTX2中运行显示的窗口会在windows中显示，但是会稍有卡顿。后面希望改进为在windows中运行，可能会需要wsl环境。

![image-20211114171013209](/images/PyQt5开发ROS界面-Button实现Publish/image-20211114171013209.png)

























