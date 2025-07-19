---
layout:     post
title:      "Get Current ViewController"
subtitle:   "Get the current view controller from the app delegate"
date:       2017-04-07 16:00:00
author:     "Gao Fei"
header-img: "../../../public/img/post-bg-2015.jpg"
tags:
    - iOS
    - ViewController

---

## 1.Get the current view controller from the app delegate

`
参考：http://stackoverflow.com/questions/24825123/get-the-current-view-controller-from-the-app-delegate%EF%BC%89
`

扩展一个方法：

UIViewController+Utils.h

```
#import <UIKit/UIKit.h>

@interface UIViewController (Utils)

+(UIViewController*) currentViewController;

@end
```

UIViewController+Utils.m

```#import "UIViewController+Utils.h"

@implementation UIViewController (Utils)

+(UIViewController*) findBestViewController:(UIViewController*)vc {

    if (vc.presentedViewController) {

        // Return presented view controller
        return [UIViewController findBestViewController:vc.presentedViewController];

    } else if ([vc isKindOfClass:[UISplitViewController class]]) {

        // Return right hand side
        UISplitViewController* svc = (UISplitViewController*) vc;
        if (svc.viewControllers.count > 0)
            return [UIViewController findBestViewController:svc.viewControllers.lastObject];
        else
            return vc;

    } else if ([vc isKindOfClass:[UINavigationController class]]) {

        // Return top view
        UINavigationController* svc = (UINavigationController*) vc;
        if (svc.viewControllers.count > 0)
            return [UIViewController findBestViewController:svc.topViewController];
        else
            return vc;

    } else if ([vc isKindOfClass:[UITabBarController class]]) {

        // Return visible view
        UITabBarController* svc = (UITabBarController*) vc;
        if (svc.viewControllers.count > 0)
            return [UIViewController findBestViewController:svc.selectedViewController];
        else
            return vc;

    } else {

        // Unknown view controller type, return last child view controller
        return vc;

    }

}

+(UIViewController*) currentViewController {

    // Find best view controller
    UIViewController* viewController = [UIApplication sharedApplication].keyWindow.rootViewController;
    return [UIViewController findBestViewController:viewController];

}

@end
```





