---
layout:     post
title:      "React Native 入门"
subtitle:   "基础"
date:       2020-06-12 14:00:00
author:     "Gao Fei"
header-img: "../../../public/img/post-bg-ios9-web.jpg"
tags:
    - swift
    


---

## React Native 入门

### 1. 配置环境
特点
#### 1.1 切换淘宝镜像

``` 
# 如果安装下载速度过慢，可以设置使用国内淘宝提供的镜像
$ npm config set registry https://registry.npm.taobao.org --global
$ npm config set disturl https://npm.taobao.org/dist --global

# Yarn是 Facebook 提供的替代 npm 的工具，可以加速 node 模块的下载
$ sudo npm install -g yarn

``` 

``` 
#官方提供了一键生成项目初始结构的脚手架react-native-cli
$ sudo npm install -g react-native-cli

# 安装指定版本的 react native
$ sudo npm install -save react-native@0.60
``` 
#### 1.2 CocoaPods 镜像使用帮助
若果cocoapods 安装太慢，可以尝试切换到清华站点

下面示例的创建 本地名为 tuna 的仓库

```
$ pod repo add tuna https://mirrors.tuna.tsinghua.edu.cn/git/CocoaPods/Specs.git
$ pod repo update tuna
``` 

最后进入自己的工程，在自己工程的podFile第一行加上：

``` 
source 'https://mirrors.tuna.tsinghua.edu.cn/git/CocoaPods/Specs.git'
``` 

### 2. 初始化项目

```
cd 到需要创建项目的目录下
$ react-native init demo
$ cd demo
#运行
$ react-native run-ios
# 如果运行失败，直接找到 iOS 文件夹，使用xcode 直接编译工程，如果发现第三方库没有安装，则先使用pod install
$ pod install
```
### 3.使用
```
导入定时器
#在项目文件夹 安装定时器
$  npm i react-timer-mixin --save


```



