# 更新 App store 发布证书
## 分三步去更新
1. 首先找到已过期的APP ID;
2. 根据APP ID重新生成Certifictes;
3. 更新Provisioning Profiles.

## 示例
### 1.确定已过期的 APP ID
1.1 找到已过期或者即将过期的 APP ID(Xcode 中为bundle id),位于图图1-1中3所在位置。将该 APP ID （以下简称id）记录下来。
![图1-1](img/apple/1-1.png) 
### 2.根据APP ID重新生成Certifictes

2.1 点击 Certificates 中的 Production可以看到所有的生产环境的证书，同时也可以看到是否过期。选择右上角的新建+，如下图所示。
![](img/apple/2-1-0.png)

选择证书的适用的场景,
（1）Development 对应 xcode 中的debug环境，开发调试的使用，包含了推送与非推送版本。
（2）Production 对应 xcode 中的 release 环境，也即是上线 app store 的环境, 常用的是有不带推送的、带推送的、带apple pay的证书。
示例就以生产中带推送的做参考，选择 Apple Push Notification, 点击Continue。
![](img/apple/2-1-1.png)
![](img/apple/2-1-2.png)
选择需要更新的APP ID, 点击Continue
![](img/apple/2-1-3.png)
出现创建CSR文件的界面，里面说明了创建的步骤。下面我们按照步骤创建CSR。
![](img/apple/2-1-4.png)
在mac应用程序中找到 “钥匙串访问”,打开“钥匙串访问”app, 
![](img/apple/2-2-1.png)
在导航栏中点击“钥匙串访问”-> "证书助理" -> "从证书颁发机构请求证书",
![](img/apple/2-2-2.png)
输入邮箱地址,常用名称,选择存储到磁盘,点击“继续”.其中常用名称可以采用公司名称+app名称+环境名
![](img/apple/2-2-3.png)
输入名称名称, 选择存储位置, 点击"存储". 将请求下来的的CSR证书保存在桌面上。
![](img/apple/2-2-4.png)
回到创建证书的页面，点击"Continu"
![](img/apple/2-1-4.png)
出现选择证书的页面，点击"Choose File..."
![](img/apple/2-3-0.png)
找到之前创建的CSR文件，点击"选取"
![](img/apple/2-3-1.png)
上传CSR文件, 点击“Continue”
![](img/apple/2-3-2.png)
上传完成之后,证书就生成完毕, 点击"Download",下载到本地磁盘。
![](img/apple/2-3-3.png)
下载完毕后会得到一个aps.cer证书, 但是不能直接发给别人使用, 需要双击cer文件，安装到钥匙串中，然后导出为.p12文件.
![](img/apple/2-3-4.png)

<!--![](img/apple/2-3-5.png)-->
接下来说明一下导出P12文件给服务器使用。
在钥匙串中找到对应id的证书（可以通过id+证书名称确定）
![](img/apple/2-4-1.png)
选择导出“Apple Push Service: xxxxx”
![](img/apple/2-4-2.png)
弹出保存框, 输入存储名称，选择存储位置，点击"存储"。存储名称建议使用公司名称+app名称+环境+apns的形式,方便以管理。
![](img/apple/2-4-3.png)
输入导出的密码, 此密码用于其他人员读取P12文件时使用。
![](img/apple/2-4-4.png)
输入电脑登录用户的密码,点击“允许”。此处成功导出P12推送证书。备注：有的服务器只识别pem格式的文件，需要将P12格式转换为pem格式的。
![](img/apple/2-4-5.png)
再次回到apple deleloper 页面,找到已过期的的描述文件（Provisioning Profiles）,点击“Edit”,
![](img/apple/3-1-1.png)
选择对应的App ID 以及 Certificates, 点击 “Generate”
![](img/apple/3-1-2.png)
到此新的Provisioning Profiles 已生成，点击"Download"
![](img/apple/3-1-3.png)
刚才已过期的 Provisioning Profiles 的 Status has changed to Active
![](img/apple/3-1-4.png)
按照同样的方式，更新development 下的Certificates & Provisioning Profiles
一共产生了5个文件，如下图所示
![](img/apple/3-2.png)

|序列|示例|名称|说明|
|----|----|----|----|
|1|BOCI\_appName\_development\_apns.p12|Apple Push Development Certificate|xcode debug app|
|2|BOCI\_appName\_distribution\_apns.p12|Apple Push Production Certificate|xcode release app/backend push server|
|3|BOCI\_appName\_distribution\_apns.mobileprovision|Production Provisioning Profiles|xcode release app|
|4|BOCI\_appName\_development\_apns.mobileprovision|Development Provisioning Profiles|xcode debug app|
|5|BOCI\_appName\_distribution\_apns.certSigningRequest|CSR|自己保留|

将1-4的文件发送给开发人员,开发人员根据新的证书重新打包ipa,上线发布app就可以了。