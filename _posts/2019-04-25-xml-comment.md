---
layout:     post
title:      "XML 常见转义字符"
subtitle:   "备用技能"
date:       2019-04-25 10:00:00
author:     "Gao Fei"
header-img: "img/post-bg-ios9-web.jpg"
tags:
    - xml
    - hmtl
    


---

## XML常见用转义字符

### html 转义字符
|字符|转义字符|描述|
|----|----|----|
|&|\&amp;|和|
|<|\&lt;|小于号|
|>|\&gt;|大于号|
|"|\&quot;|双引号|
|'|\&apos;|单引号|
| |\&nbsp;|空格|
|©|\&copy;|版权符|
|®|\&reg;|注册符|

在iOS 开发中，如遇到native与js交互的时候，使用js向web传值的时候就会遇到js报错。使用转义字符转义后的字符串就可以正常的传递。

