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


## 1.get 请求传送的参数包含中文字符
常用的解决方式：
1.当客户端使用的UTF-8编码 将中文参数传送过来时,tomcat 默认采用iso8859-1解码
'''
String name = request.getParameter("name");
name = new String(name.getBytes("iso8859-1"),"utf-8");
'''


2.在tomcat中找到server.xml文件 增加字段 URIEncoding useBodyEncodingForURI
'''
<Connector connectionTimeout="20000" port="8080" protocol="HTTP/1.1" redirectPort="8443" URIEncoding="UTF-8" useBodyEncodingForURI="true"/>

'''

date:       2018-08-12 16:00:00
author:     "Gao Fei"


