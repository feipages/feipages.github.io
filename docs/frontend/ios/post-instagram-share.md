
# Instagram 分享

大概流程如下：
![](../../../public/img/in-post/media/14926785184639/14926786938908.jpg)

分享：无需获取权限，通过Custom URL Scheme或者Document Interaction
分享出去后停留在Instagram，无回调（返回值）。

另外：通过授权（账号和密码）的方式，可以获取用户的公开内容。

登陆权限有如下几种：
 ![](../../../public/img/in-post/media/14926785184639/14926788159747.jpg)

获取较高权限，比如：public_content可以拿到用户发布的图片和视频内容。
备注：

客服端申请权限，目前只申请下来basic权限，public_content权限没申请下来，没能继续测试是否能拿到用户发布的内容，但是理论上是可以的，且看下面的介绍）
 ![](../../../public/img/in-post/media/14926785184639/14926813444655.jpg)

根据官方文档的介绍：
第一步：授权，获取access_token;
![](../../../public/img/in-post/media/14926785184639/14926788445548.jpg)
 
第二步：get用户最新发布的media。
 ![](../../../public/img/in-post/media/14926785184639/14926788538614.jpg)

请求的url及参数如上图所示，返回的结果如下图所示。
 ![](../../../public/img/in-post/media/14926785184639/14926788643833.jpg)


结论：可以先请求用户授权，然后分享照片，最后获取最新发布的信息。

分享文档：https://www.instagram.com/developer/mobile-sharing/iphone-hooks/

通过 URL Scheme 分享，截图如下：
![](../../../public/img/in-post/media/14926785184639/14926792525999.jpg)

```
-(void)loadInstagram{
    NSURL *url = [NSURL URLWithString:@"instagram://app"];
    if ([[UIApplication sharedApplication] canOpenURL:url]) {
        [[UIApplication sharedApplication] openURL:url];
    }else{
        NSLog(@"did not install instagram");
        [self showAlterWithStr:@"did not install instagram"];
    }
    
}

```

通过UIDocumentInteractionController,原文档说明如下：
![](../../../public/img/in-post/media/14926785184639/14926791330965.jpg)
示例代码：

```
-(void)shareToInstagramByDocumentImage:(NSString *)imageStr{
    
    NSURL *instagramURL = [NSURL URLWithString:@"instagram://app"];
    
    if ([[UIApplication sharedApplication] canOpenURL:instagramURL]){
        
        dispatch_async(dispatch_get_global_queue(0, 0), ^{
            
            UIImage *image = [UIImage imageNamed:imageStr];
            NSString *name = [NSString stringWithFormat:@"%f%u.igo",[NSDate timeIntervalSinceReferenceDate],arc4random_uniform(1000)];
            NSString *savePath = [NSSearchPathForDirectoriesInDomains(NSCachesDirectory, NSUserDomainMask, YES).firstObject stringByAppendingPathComponent:name];
            
            [UIImagePNGRepresentation(image) writeToFile:savePath atomically:YES];
            dispatch_async(dispatch_get_main_queue(), ^{
                self.documentInteractionController = [UIDocumentInteractionController interactionControllerWithURL:[NSURL fileURLWithPath:savePath]];
                self.documentInteractionController.UTI = @"com.instagram.exclusivegram";
                self.documentInteractionController.delegate = self;
                [self.documentInteractionController presentOpenInMenuFromRect:CGRectZero inView:self.view animated:YES];
            });
        });

    }else{
        NSLog(@"did not install instagram");
        [self showAlterWithStr:@"did not install instagram"];
    }
}

```


```
-(void)shareToInstagramByImage:(NSString *)imageStr{
    
    NSURL *instagramURL = [NSURL URLWithString:@"instagram://app"];
    
    if ([[UIApplication sharedApplication] canOpenURL:instagramURL]){
        
        dispatch_async(dispatch_get_global_queue(0, 0), ^{
            
            UIImage *image = [UIImage imageNamed:imageStr];
            NSString *name = [NSString stringWithFormat:@"%f%u.ig",[NSDate timeIntervalSinceReferenceDate],arc4random_uniform(1000)];
            NSString *savePath = [NSSearchPathForDirectoriesInDomains(NSCachesDirectory, NSUserDomainMask, YES).firstObject stringByAppendingPathComponent:name];
            
            [UIImagePNGRepresentation(image) writeToFile:savePath atomically:YES];
            dispatch_async(dispatch_get_main_queue(), ^{
                self.documentInteractionController = [UIDocumentInteractionController interactionControllerWithURL:[NSURL fileURLWithPath:savePath]];
                self.documentInteractionController.UTI = @"com.instagram.photo";
                self.documentInteractionController.delegate = self;
                [self.documentInteractionController presentOpenInMenuFromRect:CGRectZero inView:self.view animated:YES];
            });
        });
        
    }else{
        NSLog(@"did not install instagram");
        [self showAlterWithStr:@"did not install instagram"];
    }
}

```

```
-(void)shareToInstagramByDocumentnNameWith:(NSString *)imageName{
    
    NSURL *instagramUrl = [NSURL URLWithString:@"instagram://app"];
    
    
    if ([[UIApplication sharedApplication] canOpenURL:instagramUrl]){
        
        NSString  *jpgPath = [[NSBundle mainBundle] pathForResource:imageName ofType:nil];
        NSURL *imageUrl = [[NSURL alloc] initWithString:[[NSString alloc] initWithFormat:@"file://%@", jpgPath]];
        
        self.documentInteractionController = [UIDocumentInteractionController interactionControllerWithURL:imageUrl];
        self.documentInteractionController.UTI = @"com.instagram.photo";
        self.documentInteractionController.delegate = self;
        
        [self.documentInteractionController presentOpenInMenuFromRect:CGRectZero inView:self.view animated:YES];
    }else{
        NSLog(@"did not install instagram");
        [self showAlterWithStr:@"did not install instagram"];
    }
}

```

date:       2017-04-20 16:00:00
author:     "Gao Fei"
