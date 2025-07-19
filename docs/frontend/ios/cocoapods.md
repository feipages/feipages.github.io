#     cocoapods 入门

## COCOAPODS 入门

### 1. cocoapods
特点

``` 
# 查看gem源地址，如果显示为默认源 https://rubygems.org/，需要考虑替换
$ $gem sources -l
# 移除系统 ruby 默认源
$gem sources --remove https://rubygems.org/
# 使用新的源
$gem source -a https://gems.ruby-china.com
# 验证是否安装成功
$gem sources -l
# 安装最新版本
$sudo gem install -n /usr/local/bin cocoapods

# 安装指定版本
$sudo gem install -n /usr/local/bin cocoapods -v 1.0.0
# 安装
$pod setup

``` 
### 2. 初始化项目
```
cd 到需要创建项目的目录下
$ ng new <projectname>
# 1. 先创建，再安装
$ ng new <projectname> --skip-install
$ cd <projectname>
$ cnpm install

#运行
$ ng serve --open

#创建组件,在app目录下，创建components目录并创建home组件
$ ng g component components/home

```


date:       2020-03-24 14:00:00
author:     "Gao Fei"



