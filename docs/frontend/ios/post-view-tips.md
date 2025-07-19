#     View Tips

## 将视图显示在最前方
```
[self.view addSubview:view];
[self.view bringSubviewToFront:view];
```
## 下拉取消回弹效果

```
- (void)scrollViewDidScroll:(UIScrollView *)scrollView{
    
    //限制下拉没有回弹效果
    if (scrollView.contentOffset.y <= 0){
        
        CGPoint point = scrollView.contentOffset;
        point.y = 0;
        [scrollView setContentOffset:point];
    }
}
```

## 检测某个API是否可用

1.使用respondsToSelector:方法检测是否有某个方法;

```respondsToSelector:@selector(method)```

2. 使用<objc/runtime.h>检测是否有某个属性;
```
    if (class_getProperty([ClassName class], "propertyName")) {
        // it has that property!
    }
```


date:       2017-03-28 
author:     "Gao Fei"