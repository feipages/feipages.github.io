---
layout:     post
title:      "Network"
subtitle:   "与网络相关的处理"
date:       2017-07-16 16:00:00
author:     "Gao Fei"
header-img: "img/post-bg-2015.jpg"
tags:
    - Network
    - HTTP

---

#iOS 网络状态检测

导入CoreTelephony.framework框架
    
```    
CTCellularData *cellularData = [[CTCellularData alloc]init];
    cellularData.cellularDataRestrictionDidUpdateNotifier =  ^(CTCellularDataRestrictedState state){
        //状态改变时进行相关操作
    };
    
```

```    
    CTCellularData *cellularData = [[CTCellularData alloc]init];
    CTCellularDataRestrictedState state = cellularData.restrictedState;
    switch (state) {
        case kCTCellularDataRestricted:
            NSLog(@"Restricrted");
            break;
        case kCTCellularDataNotRestricted:
            NSLog(@"Not Restricted");
            break;
        case kCTCellularDataRestrictedStateUnknown:
            NSLog(@"Unknown");
            break;
        default:
            break;
    }
```





