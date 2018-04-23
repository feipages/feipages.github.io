---
layout:     post
title:      "Version"
subtitle:   "The record related to Version"
date:       2017-09-18 16:00:00
author:     "Gao Fei"
header-img: "img/post-bg-ios9-web.jpg"
tags:
    - URL


---


### 下载问题
- (void)URLSession:(NSURLSession *)session
      downloadTask:(NSURLSessionDownloadTask *)downloadTask didFinishDownloadingToURL:(NSURL *)location;
      使用该方法的时候，注意事项：
      1. location 为一个零时的目录，在当前线程中出了{}，就会立即清除。
      2. 如果下载的delegate队列为 [NSOperationQueue mainQueue]，在该方法中使用异步队列复制或移动下载的零时文件（CFNetworkDownload_OCZZDW.tmp）时，会提示找不到location目录(该零时文件)。
      3. 如果下载的队列为[[NSOperationQueue alloc] init],该方法已经在异步队列中，记得在主队列中返回数据
			
			
```
			// NSOperation
			[[NSOperationQueue mainQueue] addOperationWithBlock:^{
       		 // 需要回调的结果
    		}];
    		
```
    		
```
			// GCD
			dispatch_barrier_async(dispatch_get_main_queue(), ^{
        		// 需要回调的结果
    		});
```

### NSOperation 的使用
load...



