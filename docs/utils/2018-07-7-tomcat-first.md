---
layout:     post
title:      "Tomcat Introduction"
subtitle:   "The record related to Tomcat"
date:       2018-7-22 14:00:00
author:     "Gao Fei"
header-img: "../../../public/img/post-bg-ios9-web.jpg"
tags:
    - Tomcat
    - TCP/UDP


---


# Tomcat 介绍

Tomcat用户密码
修改conf-> tomcat-users.xml 文件，添加角色、用户、密码

```
<tomcat-users>
<!--
  NOTE:  By default, no user is included in the "manager-gui" role required
  to operate the "/manager/html" web application.  If you wish to use this app,
  you must define such a user - the username and password are arbitrary. It is
  strongly recommended that you do NOT use one of the users in the commented out
  section below since they are intended for use with the examples web
  application.
-->

<role rolename="manager-gui"/>
<role rolename="manager-script"/>
<user username="tomcat" password="123456" roles="manager-gui,manager-script"/>

</tomcat-users>
```

注意：使用Linux 开发过程 需要修改tomcat的访问权限




