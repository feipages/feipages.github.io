---
layout:     post
title:      "whatsApp share"
subtitle:   "Dispatch Group"
date:       2017-04-22 16:00:00
author:     "Gao Fei"
header-img: "img/post-bg-2015.jpg"
tags:
    - Share
    - whatsApp
    - Thrid SDK
---

# WhatsApp 分享

没有开发者平台，分享通过系统自带的

1 添加URL Scheme 白名单

```
<key>LSApplicationQueriesSchemes</key>
	<array>
		<string>whatsapp</string>
	</array>

```

2 分享文字：使用open URL Scheme

```
- (void)shareToWhatsAppWithTxt:(NSString *)txt{
   
    if ([[UIApplication sharedApplication] canOpenURL:[NSURL URLWithString:@"whatsapp://"]]) {
        NSString *str = [NSString stringWithFormat:@"whatsapp://send?text=%@",[txt stringByAddingPercentEncodingWithAllowedCharacters:[NSCharacterSet URLHostAllowedCharacterSet]]];
        NSURL *msgUrl = [NSURL URLWithString:str];
        [[UIApplication sharedApplication] openURL:msgUrl];
    }else{
        NSLog(@"no whatsapp install");
        [self showAlterWithStr:@"no whatsapp install"];
    }
}

```

3 分享照片与视频 使用UIDocumentInteractionController

```
- (void)shareToWhatsAppWithImg:(UIImage *)img{
    if ([[UIApplication sharedApplication] canOpenURL:[NSURL URLWithString:@"whatsapp://app"]]) {
        
        dispatch_async(dispatch_get_global_queue(0, 0), ^{
            
            NSString *name = [NSString stringWithFormat:@"%f%u.png",[NSDate timeIntervalSinceReferenceDate],arc4random_uniform(1000)];
            NSString *savePath = [NSSearchPathForDirectoriesInDomains(NSCachesDirectory, NSUserDomainMask, YES).firstObject stringByAppendingPathComponent:name];
            BOOL result = [UIImagePNGRepresentation(img) writeToFile:savePath atomically:YES];
            if (result) {
                dispatch_async(dispatch_get_main_queue(), ^{
                    UIDocumentInteractionController *intent = [UIDocumentInteractionController interactionControllerWithURL:[NSURL fileURLWithPath:savePath]];
                    intent.UTI = @"net.whatsapp.image";
                    intent.delegate = self;
                    [intent presentOpenInMenuFromRect:CGRectZero inView:self.view animated:YES];
                });
            }else{
                dispatch_async(dispatch_get_main_queue(), ^{
                    [self showAlterWithStr:@"error"];
                
                });
            }
            
            
        });
   
    }else{
        [self showAlterWithStr:@"no whatsapp install"];
    }
}

```

```
- (void)showAlterWithStr:(NSString *)str{
    UIAlertController *alertController = [UIAlertController alertControllerWithTitle:nil message:str preferredStyle:UIAlertControllerStyleAlert];
    UIAlertAction *cancelAction = [UIAlertAction actionWithTitle:@"OK" style:UIAlertActionStyleCancel handler:nil];
    [alertController addAction:cancelAction];
    
    [self presentViewController:alertController animated:YES completion:nil];
}
```
2017-04-20 高飞


