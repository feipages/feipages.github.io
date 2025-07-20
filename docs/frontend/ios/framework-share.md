#    Cocoa Touch Framework


###打包framework(Cocoa Touch Framework)

xcode打包需要配置

1.检查基本的配置
<!-- ![WechatIMG54](/img/in-post/media/15111440909345/WechatIMG54.jpeg) -->

<!-- ![WechatIMG53](/img/in-post/media/15111440909345/WechatIMG53.jpeg) -->

2.选择支持的最低版本
<!-- ![WechatIMG4161](/img/in-post/media/15111440909345/WechatIMG4161.jpeg) -->

3. 改为静态打包(对于ios8以上的系统，可以使用动态库(Dynamic Library))
<!-- ![WechatIMG4162](/img/in-post/media/15111440909345/WechatIMG4162.jpeg) -->

4. 导入工程中.m与 .h文件
<!-- ![WechatIMG4163](/img/in-post/media/15111440909345/WechatIMG4163.jpeg) -->


合并模拟器与真机版本

<!-- ![WechatIMG55](/img/in-post/media/15111440909345/WechatIMG55.jpeg) -->

<!-- ![WechatIMG56](/img/in-post/media/15111440909345/WechatIMG56.jpeg) -->

<!-- ![WechatIMG57](/img/in-post/media/15111440909345/WechatIMG57.jpeg) -->


在终端输入

`lipo -create 【模拟器打包path】 【真机打包path】 -output 【导出兼容版本path】
`
如下：
`lipo -create /Users/awei/Library/Developer/Xcode/DerivedData/FSTools-dpccvvatsquaxidgmdutjxwkmggy/Build/Products/Release-iphonesimulator/FSNetworkAccesser.framework/FSNetworkAccesser /Users/awei/Library/Developer/Xcode/DerivedData/FSTools-dpccvvatsquaxidgmdutjxwkmggy/Build/Products/Release-iphoneos/FSNetworkAccesser.framework/FSNetworkAccesser -output /Users/awei/Library/Developer/Xcode/DerivedData/FSTools-dpccvvatsquaxidgmdutjxwkmggy/Build/Products/FSNetworkAccesser`

对于打包到Bundle中的文件，在其他地方使用[NSBundle mainBundle]不能访问库文件中bundle的资源文件

静态库(Cocoa Touch Static Library)

date:       2017-09-18 16:00:00
author:     "Gao Fei"
