---
title: Anaconda配置tensorflow环境
date: 2021-09-21 11:15:29
tags: 
    [opencv] 
categories: 
    [机器视觉,tensorflow]
---

# 1. Anaconda安装

    + [下载地址](https://www.anaconda.com/)
    + 注意如果出现AnacondaNavigater打不开，并且命令行也出错，有可能因为开了代理或VPN
    + 新建环境，Python的版本根据后面一步，tensorflow的软件包确定

# 2. tensorflow安装

    + [软件包位置](https://www.tensorflow.org/install/pip#system-install)
    + 在Anaconda Prompt中切换到新创建的环境后执行`pip install --ignore-installed --upgrade https://storage.googleapis.com/tensorflow/windows/cpu/tensorflow_cpu-2.5.0-cp38-cp38-win_amd64.whl`

# 3. 验证

Pycharm设置使用conda新建环境中的python，packages中已经显示了安装包。也可以使用下述程序验证

```python
import tensorflow as tf

if __name__ == '__main__':
    tf.compat.v1.disable_eager_execution()
    hello = tf.constant("hello tensorflow")
    sess = tf.compat.v1.Session()
    print(sess.run(hello))

```
