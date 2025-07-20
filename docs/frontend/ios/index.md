# iOS App 程序启动过程

在main函数中进行的设置UIApplication对象的代理。
App容易受到干扰。正在玩游戏，一个电话打过来了。
* 应用程序的生命周期事件(如程序启动和关闭)
* 系统事件(如来电)
* 内存警告
* … …
** 处理这些干扰事件，就要用到AppDelegate代理对象了。 
** 总结: AppDelegate的主要作用就是处理(监听)应用程序本身的各种事件:
* 应用程序启动完毕 
* 应用程序进入后台
* 应用程序进入前台 
* 内存警告 
* 等等, 都是应用程序自身的一些事件 
** 要想成为UIApplication的代理对象, 必须遵守:UIApplicationDelegate协议。
** 代理中的若干方法介绍:
1. - (BOOL)application: didFinishLaunchingWithOptions:
// app第一次启动完毕后就会调用(当程序启动后会显示一张启动图片, 当这个图片显示完毕, 消失后, 就开始调用这个方法) 
2. - (void)applicationDidEnterBackground:(UIApplication *)application
// 当程序进入后台时, 调用该方法。（比如：按了Home键, 或者一个电话打过来了, 当前程序都会进入后台。）
// 在这个方法中可以做一些保存当前程序数据, 暂停程序的操作。
3. - (void)applicationWillEnterForeground:(UIApplication *)application
// 当程序再次进入前台的时候调用。 
4. - (void)applicationDidReceiveMemoryWarning:(UIApplication *)application
// 当发生内存警告时触发该事件。
程序启动后：
didFinishLaunchingWithOptions-->applicationDidBecomeActive
按home键使程序进入后台：applicationWillResignActive--->applicationDidEnterBackground
让程序会到主界面：applicationWillEnterForeground--->applicationDidBecomeActive
在主界面时让程序退出：applicationDidEnterBackground--->applicationWillTerminate
在后台时退出：applicationWillTerminate



date:       2017-04-22 16:00:00
author:     "Gao Fei"


