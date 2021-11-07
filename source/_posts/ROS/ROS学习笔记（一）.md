---
title: ROS学习笔记（一）
date: 2021-01-28 22:09:02
tags: 
    [ROS,ubuntu18.04,笔记] 
categories: 
    [Linux,ROS]
---
# 环境说明
系统环境：ubuntu18.04LTS
ROS版本：ROS Melodic Morenia
参考教程：古月·ROS入门21讲
# ROS简介
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200604213717411.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQ1MTcyMTU2,size_16,color_FFFFFF,t_70)
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200604213758661.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQ1MTcyMTU2,size_16,color_FFFFFF,t_70)
# 概念

 1. 节点（执行单元）
		- Node
 		- 执行具体的进程，独立运行的可执行文件

 2. 节点管理器（控制中心）
		- ROS Master
 3. 话题通信（异步通信）
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200604214710524.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQ1MTcyMTU2,size_16,color_FFFFFF,t_70)
	- 话题（topic）
		- 发布/订阅模型
		- 同一个话题的订阅或发布者可以不唯一，一般来说发布者是一个，订阅者是多个
		- 实时性弱
		- 适用于数据传输
	- 消息（message）
		- 话题数据
		- 有定的类型和数据结构
		- .msg文件定义
 4. 服务通信（同步通信）
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200604214830998.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQ1MTcyMTU2,size_16,color_FFFFFF,t_70)
	- 客户端/服务器 模型
	- .srv文件定义请求和应答数据结构
	- 实时性强
	- 适用于逻辑处理

 5. 参数（全局共享字典）

 6. 文件系统
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200604215056964.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQ1MTcyMTU2,size_16,color_FFFFFF,t_70)
	- 功能包（Package）
	- 功能包清单
	- 元功能包
# 命令行工具
	

 

```bash
#启动小海龟，需在三个终端运行
roscore								#启动ROS Master
rosrun turtlesim turtlesim_node		#启动小海龟仿真器
rosrun turtlesim turtle_teleop_key	#启动控制节点

#查看话题列表
rosnode list

#发布话题消息,注意使用tab提示
rostopic pub -r 10 /turtle1/cmd_vel geometry_msgs/Twist "linear:
x:0.0
y:0.0
z:0.0
angular:
x:0.0
y:0.0
z:0.0"


#发布服务请求，再生成一个小海龟
rosservice call/spawn "x:0.0
y:0.0
theta:0.0
name:'turtle2'"

#话题记录
rosbag record -a -O cmd_record
#话题复现
rosbag play cmd_record.bag
```
# 创建工作空间与功能包
1. 工作空间![在这里插入图片描述](https://img-blog.csdnimg.cn/20200604220211187.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQ1MTcyMTU2,size_16,color_FFFFFF,t_70)
2. 创建工作空间

```bash
#创建工作空间
mkdir -p ~/workspace/src
cd ~/workspace/src
catkin_init_workspace

#编译工作空间
cd ~/workspace/
catkin_make

#设置环境变量
source devel/setup.bash
#检查环境变量
echo $ROS_PACKAGE_PATH
```
3. 功能包
同一个工作空间，不能有同名功能包

```bash
#创建
cd ~/workspace/src
catkin_create_pkg test_pkg std_msgs rospy roscpp

#编译
cd ~/workspace
catkin_make
source ~/workspace/devel/setup.bash
```
# 参考
[古月·ROS入门21讲](https://github.com/guyuehome/ros_21_tutorials)