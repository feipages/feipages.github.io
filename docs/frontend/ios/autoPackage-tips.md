
#自动打包测试流程
1、将AutoPackageShell文件夹放到项目根目录下
2、打开autoPackageShell.sh文件，修改下列项目参数成你要打包的项目：

```
# 是否编译工作空间 (例:若是用Cocopods管理的.xcworkspace项目,赋值true;用Xcode默认创建的.xcodeproj,赋值false)
is_workspace="false"
#scheme名（一般是Target名)
scheme_name="MobileAssistant_SIT"
#指定项目名称
project_name="MobileAssistant"
# 指定要打包编译的方式 : Release,Debug...
build_configuration="Release"
```

3、打开exportOptionsPlist.plist文件，把teamID改成打包证书的teamID

4、打开终端，cd到AutoPackageShell文件夹，输入命令 sh autoPackageShell.sh  回车

备注：Xcode 安装了多个版本之后，可以将目标打包的Xcode名称(eg:Xcode8.2.app)改为Xcode.app
teamID可以在xxx.xcodeproj包文件中==project.pbxproj==，找到==DEVELOPMENT_TEAM==的值 

<!-- ![AutoPackageShell.zip](/img/in-post/zip/AutoPackageShell_2017.zip) -->


date:       2017-06-01 16:00:00
author:     "Gao Fei"