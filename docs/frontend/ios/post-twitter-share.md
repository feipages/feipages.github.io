#    "Twitter share"

# Twitter 分享
参考文档：https://fabric.io/kits/ios/twitterkit/install
https://fabric.io/kits/ios/twitterkit/manual-install
## 1 开发者账号申请注意事项：

![]/img/in-post/media/14925836417059/14925860141113.jpg)


## 2 安装步骤：

2.1 Download, unzip, and drag
  下载，解压，拖拽到工程文件
2.2  Add a Run Script Build Phase
![](/img/in-post/media/14925836417059/14925879419077.jpg)
![](/img/in-post/media/14925836417059/14925882391902.jpg)
![](/img/in-post/media/14925836417059/14925945787875.jpg)

![](/img/in-post/media/14925836417059/14925891251063.jpg)

  2.3 Add API Key to Info.plist

  ![](/img/in-post/media/14925836417059/14925893095808.jpg)

![](/img/in-post/media/14925836417059/14925894119822.jpg)

  
  2.4 Initialize Twitter and Run

![](/img/in-post/media/14925836417059/14925896301467.jpg)

## 3 重要注解：
![](/img/in-post/media/14925836417059/14926599993618.jpg)


## 4 twitter 分享文档：
https://docs.fabric.io/apple/twitter/compose-tweets.html
分享参考：

```
- (void)showTwitterCompose{
    TWTRComposer *composer = [[TWTRComposer alloc] init];
    
    [composer setText:@"I am big big man"];
    [composer setURL:[NSURL URLWithString:@"https//:www.baidu.com"]];
    if (composer) {
        NSLog(@"composer = %@",composer);
        [composer showFromViewController:self completion:^(TWTRComposerResult result) {
            if (result == TWTRComposerResultDone) {
                NSLog(@"twitter share done");
            }else if (result == TWTRComposerResultCancelled){
                NSLog(@"twitter share cancell");
            }
        }];
    }

}

- (void)showTwitterSessionShare{
    // Objective-C
    // Users must be logged-in to compose Tweets
    TWTRSession *session = [Twitter sharedInstance].sessionStore.session;
    
    // User generated image
    UIImage *image = [UIImage imageNamed:@"XXXXX"];
    
    // Create the card and composer
    TWTRCardConfiguration *card = [TWTRCardConfiguration appCardConfigurationWithPromoImage:image iPhoneAppID:nil iPadAppID:nil googlePlayAppID:nil];
    TWTRComposerViewController *composer = [[TWTRComposerViewController alloc] initWithUserID:session.userID cardConfiguration:card];
    
    // Optionally set yourself as the delegate
    composer.delegate = self;
    
    // Show the view controller
    [self presentViewController:composer animated:YES completion:nil];
}

```



## 5 问题：
在ios 9.2.1 上测试，如果用户没登录Twitter账号，点击Twitter分享会崩溃。
出现的错误日志如下：

```*** Terminating app due to uncaught exception 'NSInvalidArgumentException', reason: 'Application tried to present a nil modal view controller on target <ViewController: 0x14e43d60>.'
*** First throw call stack:
(0x239ab91b 0x23146e17 0x28294ab1 0x28296d25 0x28296f91 0x2801ddb9 0x1928b5 0x906e5 0x9057b 0x27f5c755 0x27f5c6e1 0x27f446d3 0x27f5c005 0x27f5bc7f 0x27f5468f 0x27f25125 0x27f236d3 0x2396ddff 0x2396d9ed 0x2396bd5b 0x238bb229 0x238bb015 0x24eabac9 0x27f8d189 0x92def 0x23563873)
libc++abi.dylib: terminating with uncaught exception of type NSException
```

暂时的解决方式：
1. 申请访问Account权限（ios 10，要添加到info.plist中）；
2. 访问Account的实现代码：

```
// ios 10 在info.plist添加访问权限
    ACAccountStore *store = [[ACAccountStore alloc]init];
    ACAccountType *twitterType = [store accountTypeWithAccountTypeIdentifier:ACAccountTypeIdentifierTwitter];
    [store requestAccessToAccountsWithType:twitterType options:nil completion:^(BOOL granted, NSError *error) {
        if (granted){
         NSArray *array =   [store accountsWithAccountType:twitterType];
            NSLog(@"accounts = %@",array);
            if (array.count > 0) {// 显示Twitter分享功能
                [self showTwitterCompose];
            }else{
                // 提示用户添加账号信息
            }
        }else{
            NSLog(@"----no----");
        
            // 提示用户允许访问账号信息
        }
    }];
```

2017-04-20 高飞

