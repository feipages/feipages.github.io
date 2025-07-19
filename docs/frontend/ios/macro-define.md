#     Macro Define
>常用的宏定义


# 1. DEBUG Log


```
#ifdef DEBUG
#define LLog(fmt, ...) NSLog((@"%s [Line %d] " fmt), __PRETTY_FUNCTION__, __LINE__, ##__VA_ARGS__);
#else
#define LLog(fmt, ...) while(0){}
#endif
```

ios开发中难免会遇到一些oc与c混编的时候，当使用了pch文件时，c文件是不会识别上面的条件编译和#import等指令的，这时候应该使用另外一个条件编译来避免出现问题：

```
#ifdef __OBJC__
    #import <UIKit/UIKit.h>
    #import <Foundation/Foundation.h>
#endif
```

# 2. ios版本兼容
## 编译设置

 Base SDK 当前编译所使用的SDK版本
 Deployment Target 运行APP所需要的最低的操作系统版本
 Base SDK 可以设置为Xcode默认的设置,比如Latest iOS(iOS10.2），Deployment Target设置为iOS 8.0，目前大多数APP都支持到该版本
## iOS宏定义
### 静态检查

在编译阶段就检查当前SDK编译与构建应用是否能使用某个API
编译常量
__IPHONE_OS_VERSION_MIN_REQUIRED 系统最低版本（也就是iOS Deployment Target选择的版本）
__IPHONE_OS_VERSION_MAX_ALLOWED 系统最高版本（当前手机系统允许使用的SDK的最高版本）


```
#if __IPHONE_OS_VERSION_MAX_ALLOWED >= __IPHONE_9_0
    // 系统版本在iOS9.0及以上则编译此部分代码
#else
    // 如果低于iOS9.0则编译此部分代码
#endif
```

```
#if __IPHONE_OS_VERSION_MIN_REQUIRED >= __IPHONE_8_0
// 如果选择(iOS Deployment Target)的最低支持版本在iOS8.0及以上才可以使用
#endif
```
### 动态检查

#### CoreFoudation/NSFoundation版本宏

定义的宏如下，可以看出某些系统版本的值是一样的，而且没有对ios 10.0以上版本进行定义，需要自己定义

```
#define kCFCoreFoundationVersionNumber_iOS_8_0 1140.1
#define kCFCoreFoundationVersionNumber_iOS_8_1 1141.14
#define kCFCoreFoundationVersionNumber_iOS_8_2 1142.16
#define kCFCoreFoundationVersionNumber_iOS_8_3 1144.17
#define kCFCoreFoundationVersionNumber_iOS_8_4 1145.15
#define kCFCoreFoundationVersionNumber_iOS_8_x_Max 1199
#define kCFCoreFoundationVersionNumber_iOS_9_0 1240.1
#define kCFCoreFoundationVersionNumber_iOS_9_1 1241.11
#define kCFCoreFoundationVersionNumber_iOS_9_2 1242.13
#define kCFCoreFoundationVersionNumber_iOS_9_3 1242.13
#define kCFCoreFoundationVersionNumber_iOS_9_4 1280.38
#define kCFCoreFoundationVersionNumber_iOS_9_x_Max 1299
```
使用方式
```
if (kCFCoreFoundationVersionNumber <kCFCoreFoundationVersionNumber_iOS_9_0) {
        //系统版本低于iOS9.0
    }
```
综合而论，不推荐使用

#### 检查运行的iOS系统版本

转换为基本数据类型比较

```
if ([[ [UIDevice currentDevice] systemVersion] floatValue] >= 10.0) {
        
    }
```
使用systemVersion方法获取到的值为8.1 ,如比较8.1.1和8.1.2，就很困难了

字符串比较

```
#define SYSTEM_VERSION_EQUAL_TO(v)                  ([[[UIDevice currentDevice] systemVersion] compare:v options:NSNumericSearch] == NSOrderedSame)
#define SYSTEM_VERSION_GREATER_THAN(v)              ([[[UIDevice currentDevice] systemVersion] compare:v options:NSNumericSearch] == NSOrderedDescending)
#define SYSTEM_VERSION_GREATER_THAN_OR_EQUAL_TO(v)  ([[[UIDevice currentDevice] systemVersion] compare:v options:NSNumericSearch] != NSOrderedAscending)
#define SYSTEM_VERSION_LESS_THAN(v)                 ([[[UIDevice currentDevice] systemVersion] compare:v options:NSNumericSearch] == NSOrderedAscending)
#define SYSTEM_VERSION_LESS_THAN_OR_EQUAL_TO(v)     ([[[UIDevice currentDevice] systemVersion] compare:v options:NSNumericSearch] != NSOrderedDescending)
```
使用字符串的比较
存在的问题 比如8.1 相对于8.1.0 结果为NSOrderedAscending， 即8.1 < 8.1.0

使用NSOperatingSystemVersion(iOS 8.0)

NSOperatingSystemVersion 为结构体,如下所示
```
typedef struct {
    NSInteger majorVersion;
    NSInteger minorVersion;
    NSInteger patchVersion;
} NSOperatingSystemVersion;
```

```
NSOperatingSystemVersion version = (NSOperatingSystemVersion){8,2,0};
    if ([[NSProcessInfo processInfo] isOperatingSystemAtLeastVersion:version]) {
        // 高于该版本
    }else {
        // 低于该版本
    }
```

date:       2017-04-22 16:00:00
author:     "Gao Fei"





