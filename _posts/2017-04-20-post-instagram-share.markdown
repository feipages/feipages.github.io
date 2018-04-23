---
layout:     post
title:      "Instagram share"
subtitle:   "Instagram share"
date:       2017-04-20 16:00:00
author:     "Gao Fei"
header-img: "img/post-bg-2015.jpg"
tags:
    - Share
    - Instagram
    - Thrid SDK
---



# Instagram 分享

大概流程如下：
![](/img/in-post/media/14926785184639/14926786938908.jpg)

分享：无需获取权限，通过Custom URL Scheme或者Document Interaction


 ![](/img/in-post/media/14926785184639/14926813444655.jpg)

 



分享文档：https://www.instagram.com/developer/mobile-sharing/iphone-hooks/

通过 URL Scheme 分享，截图如下：
![](/img/in-post/media/14926785184639/14926792525999.jpg)

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
![](/img/in-post/media/14926785184639/14926791330965.jpg)
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

