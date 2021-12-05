---
layout: post
title: PyQt5开发ROS界面2-使用滑条发布Twist消息
date: 2021-11-20 19:48:58
tags: 
    [ROS,PyQt5] 
categories: 
    [Linux,ROS]
typora-root-url: ..\..

---

# 1 UI界面设计

与上文一致，使用QtDesigner配置界面

# 2 程序实现

```python
def __init__(self, parent=None):
	self.Linear_Slider.valueChanged.connect(lambda : self.SliderPub())
	self.Angula_Slider.valueChanged.connect(lambda : self.SliderPub())

def SliderPub(self):
        linear = self.Linear_Slider.value()
        angular = self.Angula_Slider.value()

        twist = Twist()
        twist.linear.x = float(linear)
        twist.angular.z = float(angular)
        self.publisher.publish(twist)
```


![Untitled](/images/PyQt5开发ROS界面-使用滑条发布Twist消息/Untitled-16386757581782.png)
