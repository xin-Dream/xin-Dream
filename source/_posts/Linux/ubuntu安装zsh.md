---
title: ubuntu安装zsh
date: 2021-05-03 16:34:21
tags: 
    [zsh] 
categories: 
    [Linux,ubuntu]
---

> [参考](https://github.com/ohmyzsh/ohmyzsh)

## 1. 安装

```bash
sudo apt-get install zsh

# 安装Oh my zsh，以下为三种方式
sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"

sh -c "$(wget -O- https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"

sh -c "$(fetch -o - https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"

# 若以上方式都不好用，可以在网页打开网址,新建一个install.sh，将网页内容复制进去，然后执行

#或者可以在我GitHub上找到Ubuntu_files的zsh里有配置文件

sh install.sh
```
## 2. 配置与插件安装
1. 命令行提示

```bash
# git clone加速技巧，将github.com改为github.com.cnpmjs.org

git clone https://github.com.cnpmjs.org/zsh-users/zsh-autosuggestions ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions
```
2. 语法高亮

```bash
 git clone https://github.com.cnpmjs.org/zsh-users/zsh-syntax-highlighting.git ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting
```

3. 跳转目录

```bash
sudo apt-get install autojump
```
4. 下载主题
```BASH
git clone https://github.com.cnpmjs.org/bhilburn/powerlevel9k.git ~/.oh-my-zsh/custom/themes/powerlevel9k
```



5. 修改配置文件

```bash
# 设置字体模式以及配置命令行的主题，语句顺序不能颠倒
# POWERLEVEL9K_MODE='nerdfont-complete'
# ZSH_THEME="powerlevel9k/powerlevel9k"

# 以下内容去掉注释即可生效：
# 启动错误命令自动更正
ENABLE_CORRECTION="true"

# 在命令执行的过程中，使用小红点进行提示
COMPLETION_WAITING_DOTS="true"

# 启用已安装的插件
plugins=(
  git extract zsh-autosuggestions zsh-syntax-highlighting autojump
)
```

## 3. 安装zsh后ros命令失效问题

```bash
sudo vim ~/.zshrc
#将source /opt/ros/noetoc/setup.zsh加入其中即可
source /opt/ros/noetoc/setup.zsh
#在bash中的形式是source /opt/ros/noetoc/setup.bash
```

## 4. 设置zsh为默认shell

```bash
chsh -s /bin/zsh

# 查看已安装的shell
cat /etc/shells
```
