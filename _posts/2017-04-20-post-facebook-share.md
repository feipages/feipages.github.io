---
layout:     post
title:      "Facebook share"
subtitle:   "Facebook share"
date:       2017-04-20 12:00:00
author:     "Gao Fei"
header-img: "img/post-bg-2015.jpg"
tags:
    - Share
    - Facebook
    - Thrid SDK
---


# Facebook 分享

> 官方文档： https://developers.facebook.com/docs/sharing/overview

##在移动平台上分享 — 分步指南

* “分享”按钮：显示的时候没有分享计数器。用户轻触“分享”按钮将打开一个新窗口（也称为快速应用切换）。
* 分享对话框：窗口将显示帖子编辑器，其中包含分享链接的预览。如果用户安装了 iOS 版 Facebook 应用，分享对话框将由 Facebook 应用提供，否则将由 Safari 浏览器提供。轻触“分享”按钮即表示用户确认分享，然后系统将切换回您的应用。
* 现在，SDK 将自动检查设备上是否安装了原生 Facebook 应用。如果未安装，SDK 会将用户切换到默认浏览器并打开动态发布对话框。如果用户想要分享开放图谱动态，SDK 会打开网页分享对话框。

* 如果安装了原生 Facebook 应用，4.0-4.4 版的 SDK 会切换到原生 iOS 版 Facebook 应用，并在发布帖子后将控制权交还您的应用。如果使用 4.5+ 版 SDK，除非分享内容是开放图谱动态，否则用户会看到 iOS 分享表，而不会切换到原生 iOS 版 Facebook 应用。
说明：
目前下载的最新SDK版本为4.21.0，想要使用跳转到Facebook应用分享，需要申请public-action权限，才能使用图谱，否则只能使用web显示分享，目前还没申请下来该权限，只能做到web分享

###第一步：info.plist 文件配置
将以下 XML 代码片段插入文件正文，位于最后的 ==\</dict>== 元素前


```
<key>CFBundleURLTypes</key>
<array>
  <dict>
    <key>CFBundleURLSchemes</key>
    <array>
      <string>fb{your-app-id}</string>
    </array>
  </dict>
</array>
<key>FacebookAppID</key>
<string>{your-app-id}</string>
<key>FacebookDisplayName</key>
<string>{your-app-name}</string>
<!-- URL Scheme , 返回应用-->
<key>LSApplicationQueriesSchemes</key>
	<array>
        <!--Facebook URL Scheme-->
		<string>fbapi</string>
		<string>fb-messenger-api</string>
		<string>fbauth2</string>
		<string>fbshareextension</string>
        <!-- whatsapp URL Scheme 白名单-->
		<string>whatsapp</string>
        <!-- instagram URL Scheme 白名单-->
		<string>instagram</string>
        <!-- wechat URL Scheme 白名单-->
		<string>wechat</string>
		<string>weixin</string>
	</array>
<key>NSPhotoLibraryUsageDescription</key>
  <string>{human-readable reason for photo access}</string>
```
info.plist 配置说明
（1）将 ==fb{your-app-id}== 替换为 Facebook 应用编号，加上前缀 ==fb==。例如，==fb1767503776894317==。您可以通过 Facebook 应用面板找到应用编号。
（2）使用应用编号替换 =={your-app-id}==。
（3）使用您在应用面板中指定的显示名称替换 =={your-app-name}==。
（4）将 =={human-readable reason for photo access}== 替换为您的应用需要获取照片访问权限的理由
###第二步：注册Facebook
AppDelegate.m 文件的实现
\#import \<FBSDKCoreKit/FBSDKCoreKit.h>


```
- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {
    
    [[FBSDKApplicationDelegate sharedInstance] application:application didFinishLaunchingWithOptions:launchOptions];
    
    return YES;
}
// 仅支持iOS9以上系统，iOS8及以下系统不会回调
-(BOOL)application:(UIApplication *)app openURL:(NSURL *)url options:(NSDictionary<UIApplicationOpenURLOptionsKey,id> *)options{
    NSLog(@"%s,load app options = %@", __func__, options);
    BOOL result = [[FBSDKApplicationDelegate sharedInstance] application:app openURL:url options:options];
    return result;
}

// 所有平台,但ios9以后不推荐使用
- (BOOL)application:(UIApplication *)application
            openURL:(NSURL *)url
  sourceApplication:(NSString *)sourceApplication
         annotation:(id)annotation {
    NSLog(@"%s,load app sourceApplication = %@",__func__,sourceApplication);
    BOOL isSuccess = [[FBSDKApplicationDelegate sharedInstance] application:application
                                                          openURL:url
                                                sourceApplication:sourceApplication
                                                       annotation:annotation];
    return isSuccess;
}

```


###第三步：实现分享功能

3.1 使用SDK中的分享按钮FBSDKShareButton
需要==public_profile==，默认已通过
创建如下：

```
FBSDKShareButton *shareButton = [[FBSDKShareButton alloc] init];
shareButton.shareContent = content;  
shareButton.center = self.view.center;
  [self.view addSubview:shareButton];

```
3.2 对于分享的内容content 可以使用分为

* FBSDKShareLinkContent 
链接：大部分内容为引用 HTML 页面的网址。要提供最相关的信息，您应使用 Facebook 特定元标签标记您的页面
 
* FBSDKSharePhotoContent  
照片：直接上传一张或多张由用户拍摄的照片 

* FBSDKShareVideoContent  
视频：直接上传由用户拍摄的视频  

* FBSDKShareMediaContent
多媒体：直接上传同时包含照片和视频的内容

创建方式：

```
FBSDKShareLinkContent *content = [[FBSDKShareLinkContent alloc] init];
content.contentURL = [NSURL URLWithString:@"https://developers.facebook.com"];
```

SDK中定义的分享按钮如下图：
![](media/14925152141994/14925202210363.jpg)



3.3 使用自定义的分享按钮

要使用专属分享界面，您需要：

* 构建发布到图谱 API 端点 ==/me/feed== 的自定义界面
* 将 Facebook 登录功能添加至您的应用
* 请求 ==publish_actions== 权限，需要申请

对自定义的分享按钮的样式的说明：
![](media/14925152141994/14925198369392.jpg)
申请权限需要注意的事项：

上传视频的注意事项如图所示：
![](media/14925152141994/14925722696364.jpg)


3.4 自定义分享内容

* 使用开放图谱标签。
* 调整 FBSDKShareLinkContent 选择器

图谱示例


```
if ([[FBSDKAccessToken currentAccessToken] hasGranted:@"publish_actions"]) {
        [[[FBSDKGraphRequest alloc]initWithGraphPath:@"me/feed" parameters:@{@"message":@"hello world!"} HTTPMethod:@"POST"] startWithCompletionHandler:^(FBSDKGraphRequestConnection *connection, id result, NSError *error) {
            NSLog(@"result=%@",result);
        }];
    }else{
        NSLog(@"did not have publish_actions");
    }
```



FBSDKShareLinkContent 示例

```
NSURL *contentURL = [[NSURL alloc] initWithString:
  @"http://en.wikipedia.org/wiki/Facebook"];

NSURL *imageURL = 
  [NSURL URLWithString:@"http://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Facebook_Headquarters_Menlo_Park.jpg/2880px-Facebook_Headquarters_Menlo_Park.jpg"];
  
button.shareContent = [[FBSDKShareLinkContent alloc]
  initWithContentURL: contentURL
  contentTitle: @"My Share Title"
  contentDescription: @"Lorem ipsum dolor sit amet."
  imageURL: imageURL
  peopleIDs: @[@"1561082740838259"]
  placeID: @"166793820034304"
  ref: @"myRefId"
];

```
3.5 分享对话框

* 在移动平台上，当用户使用分享对话框分享内容时，对话框会执行快速应用切换操作，切换到设备上的 Facebook 应用。我们还提供网页对话框作为回退选项，以防用户未安装原生 Facebook 应用
* 使用原生 Facebook 对话框时，无需添加 Facebook 登录即可启用分享

```
- (void)facebookShareWithMessage:(NSDictionary *)dictionary {
    NSString *contentUrlString = dictionary[@"content_url"];
    NSString *imageUrlString = dictionary[@"image_url"];
    NSString *description = dictionary[@"description"];
    NSString *title = dictionary[@"title"];
    NSString *quote = dictionary[@"quote"];
    
    FBSDKShareLinkContent *content = [[FBSDKShareLinkContent alloc] init];
    content.contentURL = [NSURL URLWithString:contentUrlString];
    content.imageURL = [NSURL URLWithString:imageUrlString];
    content.contentDescription = description;
    content.contentTitle = title;
    content.quote = quote;
    
    FBSDKShareDialog *dialog = [[FBSDKShareDialog alloc] init];
    dialog.shareContent = content;
    dialog.fromViewController = self;
    dialog.delegate = self;
    dialog.mode = FBSDKShareDialogModeBrowser;
    [dialog show];
}
```

3.6 自定义分享界面
可以使用自定义按钮和调用图谱 API 的自定义对话框



                                        2017-04-19 高飞


