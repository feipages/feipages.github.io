---
layout:     post
title:      "react 入门"
subtitle:   "基础"
date:       2020-03-8 14:00:00
author:     "Gao Fei"
header-img: "/img/post-bg-ios9-web.jpg"
tags:
    - git
    


---

## React 入门

### 1. 通过npm搭建开发环境
``` 
$ npm install babel -g
$ npm install webpack -g
$ npm install webpack-dev-server -g

如果使用以上命令报错
可以更换如下
# 增加了访问本地目录的权限
$ sudo npm install webpack -g --unsafe-perm=true --allow-root
$ sudo npm install webpack-cli -g --unsafe-perm=true --allow-root
$ sudo npm install webpack-dev-server -g --unsafe-perm=true --allow-root
# 切换到工程目录下
$ npm install @babel/preset-env --save-dev

``` 
### 2. 初始化项目
```
# npm 6 以上的版本
$ npm init react-app my-app
#低版本的npm
$ npx create-react-app my-app
$ cd my-app
$ yarn start
$ npm start

```
### 3.JSX 语法
使用jsx 来替代常规的js语法
javascript + XML语法(HTML)
#### 组件
#### 声明
函数组件

```
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}
```

class 组件

```
class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}

```
调用赋值

```
<Welcome name="Sara" />
```

#### props 属性
通过props 属性 添加

#### 事件处理
this
向事件传递参数
#### state

#### 生命周期函数

组件的生命周期可分成三个状态:

* Mounting：已插入真实 DOM;
* Updating：正在被重新渲染;
* Unmounting：已移出真实 DOM.

生命周期的方法有：

* componentWillMount 在渲染前调用,在客户端也在服务端。
* componentDidMount : 在第一次渲染后调用，只在客户端。之后组件已经生成了对应的DOM结构，可以通过this.getDOMNode()来进行访问。 如果你想和其他JavaScript框架一起使用，可以在这个方法中调用setTimeout, setInterval或者发送AJAX请求等操作(防止异步操作阻塞UI)。
* componentWillReceiveProps 在组件接收到一个新的 prop (更新后)时被调用。这个方法在初始化render时不会被调用。
* shouldComponentUpdate 返回一个布尔值。在组件接收到新的props或者state时被调用。在初始化时或者使用forceUpdate时不被调用。 
可以在你确认不需要更新组件时使用。
* componentWillUpdate在组件接收到新的props或者state但还没有render时被调用。在初始化时不会被调用。
* componentDidUpdate 在组件完成更新后立即调用。在初始化时不会被调用。
* componentWillUnmount在组件从 DOM 中移除之前立刻被调用

子传父 传值
父传子 传值

#### setState 更新时同步还是异步
1. setState 会引起视图的重绘
2. 组件

#### 条件渲染

#### 列表 & key

#### 导入 antd

#### Fetch 
get/post
跨域的问题 package 配置

#### Router
安装

```
$ npm install react-router-dom --save
```
路由的作用
单页面 应用（SPA）,路由的作用为切换视图、删除视图

#### Redux



