---
title: ROS学习笔记（二）
date: 2021-01-28 22:09:56
tags: 
    [ROS,ubuntu18.04,笔记] 
categories: 
    [Linux,ROS]
---
# publisher
![在这里插入图片描述](https://img-blog.csdnimg.cn/2020061116595687.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQ1MTcyMTU2,size_16,color_FFFFFF,t_70)
代码结构
 1. 初始化节点
 2. 向ROS Master注册节点信息，包括发布的话题名和话题中的消息类型
 3. 创建消息数据
 4. 按照一定的频率循环发布消息

**设置编译规则**
在CMakeLists.txt中添加

```bash
add_executable(velocity_publisher src/velocity_publisher.cpp)
target_link_libraries(velocity_publisher ${catkin_LIBRARIES})
```

# subscriber
代码结构

 1. 初始化ROS节点
 2. 订阅需要的话题
 3. 循环等待话题，接收到之后进入回调函数
 4. 在回调函数中完成消息处理

 **设置编译规则**
在CMakeLists.txt中添加

```bash
add_executable(pose_subscriber src/pose_subscriber.cpp)
target_link_libraries(pose_subscriber ${catkin_LIBRARIES})
```

# 话题消息

 1. 定义.msg文件，一些宏定义

```cpp
string name
uint8 sex
uint8 age
uint8 unknown=0
uint8 male=1
uint8 female=2
```
2. 在package.xml中添加功能包依赖

```bash
#添加在相应build和exec后面
<build_depend>message_generation</build_depend>
<exec_depend>messade_runtime</exec_depend>
```
3. 在CMakeLists.txt中添加编译选项

```bash
find_package{
	...
	message_generation
}

#添加在Declare ROS messages，services or actions中
add_message_files(FILES Person.msg)
generate_messages(DEPENDENCIES std_msgs)

#使能对应依赖
catkin_package{
	...
	message_runtime
}
```

4. 代码结构
		发布者与订阅者的代码与以上两个类似

5. 配置CMakeLists.txt中的编译规则

```bash
#发布者
add_executable(person_publisher src/person_publisher.cpp)
target_link_libraries(person_publisher ${catkin_LIBRARIES})
add_dependencies(person_publisher ${PROJECT_NAME}_generate_messages_cpp)

add_executable(person_subscriber src/person_subscriber.cpp)
target_link_libraries(person_subscriber ${catkin_LIBRARIES})
add_dependencies(person_subscriber ${PROJECT_NAME}_generate_messages_cpp)

```

# client
# server
# 参数
# 参考
[古月 ROS21讲](https://github.com/guyuehome/ros_21_tutorials)