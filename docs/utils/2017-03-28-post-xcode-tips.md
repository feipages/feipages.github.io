---
layout:     post
title:      "Xcode Tips"
subtitle:   "How to use Xcode"
date:       2017-03-28 16:00:00
author:     "Gao Fei"
header-img: "../../../public/img/post-bg-e2e-ux.jpg"
tags:
    - Xcode
    
---

# Xcode IDE

## Xcode: symbol(s) not found for architecture armv7

 log : Undefined symbols for architecture armv7:"_OBJC_CLASS_$_ViewController", referenced from:objc-class-ref in AppDelegate.o
 
 ld: symbol(s) not found for architecture armv7
 
 clang: error: linker command failed with exit code 1 (use -v to see invocation)

Check if your Compile Sources section within the Build Phases of your project shows ViewController.m

`
参考: http://stackoverflow.com/questions/12522571/xcode-symbols-not-found-for-architecture-armv7
`


## How to trap on UIViewAlertForUnsatisfiableConstraints?

 I added UIViewAlertForUnsatisfiableConstraints symbolic breakpoint with suggested action:
Obj-C project

> po [[UIWindow keyWindow] _autolayoutTrace]

Swift project

> expr -l objc++ -O -- [[UIWindow keyWindow] _autolayoutTrace]

`
参考：http://stackoverflow.com/questions/26389273/how-to-trap-on-uiviewalertforunsatisfiableconstraints
`


## How to define Preprocessor Macros in Xcode

1. Find TARGETS -> Build Settings , search Preprocessor Macros , By default we have tow:Debug and Release, Notice that the Dubug configuration already has a Macro defined - it's called DEBUG=1. therefore out of the box you can already check in your code if it has been complied with the Debug or Release configuration.
2. To define your own Macro, click the little plus sign next Debug (and Release) and add something specific. I’m using IS_PRO=1, but you can choose anything you like really. I don’t know if you can set values other than boolean. Make sure you set your Macro in BOTH configurations, otherwise you’ll find different results when you submit your app
3. Now that our Macro is defined, you can check if it’s present in your code like so:

```
#ifdef IS_PRO
    NSLog(@&quot;It&#039;s the PRO version&quot;);
#else
    NSLog(@&quot;Must be the LITE version&quot;);
#endif
```






2017-04-20 高飞


