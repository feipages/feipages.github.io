## Flutter 入门

### 1. Flutter 介绍
- 三重缓存
- Skia 渲染引擎
- Dart 语言学习
- Flutter 学习

1. 下载 flutter SDK

2. 配置环境变量, 在~/.bash_profile 下增加如下内容:

``` 
# flutter
#国内用户需要设置
export PUB_HOSTED_URL=https://pub.flutter-io.cn
export FLUTTER_STORAGE_BASE_URL=https://storage.flutter-io.cn
# flutter bin
export FLUTTER_HOME=/Users/gaofei/development/flutter/bin
# dart bin
export DART_HOME=$FLUTTER_HOME/cache/dart-sdk/bin
export PATH=$FLUTTER_HOME:$PATH
export PATH="${DART_HOME}:${PATH}"

``` 
在环境配置完毕后，一般是重新电脑才会生效，如果想要立即生效，执行以下指令

```
source <相应文件配置文件>

#示例
source ~/.bash_profile
```

注意: 如果你使用的是zsh，终端启动时 ~/.bash_profile 将不会被加载，解决办法就是修改 ~/.zshrc ，在其中添加与 ~/.bash_profile 内相同的环境

```
vi ~/.zshrc
# 输入环境后保存，然后再启动
source ~/.zshrc

```


### 2. Flutter
添加的仓库包括
http://apt.saurik.com


```


```
### 3. Dart
3.1 变量
var const final dynamic
定义字符串，可以是 单引号，双引号，三引号
${} 替换变量
集合
接口与抽象类
函数的返回值
函数的可选参数 - 位置可选参数[]，命名可选参数{}
函数只有可选参数 有默认值
没有的函数的重载
函数是一等公民，函数A可以作为另外一个B的参数，也可以作为函数B的返回值。
匿名函数，箭头函数（函数体只有1行）;

赋值运算符
？？= 当原来的变量有值时，就不执行
？？ 前面的数据有值，那么就使用？？前面的数据,相当于三目运算符的简写
级联运算符

面向对象
类

 



