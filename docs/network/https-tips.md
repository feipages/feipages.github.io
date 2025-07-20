# HTTPS网站访问过程

相对于普通HTTP网络请求，访问HTTPS时，浏览器会帮我们做很多影藏的工作。
1. 发起请求
首先当输入完https网址 点击enter之后，浏览器首先向服务器发送一个访问的请求，这个请求中包含浏览器SSL协议的版本号，加密算法的种类，产生的随机数，以及其他 服务器与客户端之间通讯所需要的各种信息;
2. 服务器端返回证书
服务器向客户端传送SSL协议的版本号，加密算法的种类，随机数以及其他信息，同时服务器还将向客服端传送自己的证书，这些信息被保存在客户端称作‘保护空间’的地方，这里最关键的就是证书信息;
3. 浏览器验证证书信息
浏览器利用服务器传递过来的信息验证服务器的合法性，服务器的合法性包括：证书是否过期，发行服务器的证书的CA是否可靠，发行者证书的公钥能否正确解开服务器证书的“发行者的数字签名”，服务器证书上的域名是否和服务器的实际域名相匹配。
如果合法验证没有通过，通讯将断开，如果合法验证通过，将继续进行第四步。
4. 客服端向服务器发送“预主密码”
浏览器随机产生一个用于后面通讯的“对称密码”，然后用服务器的公钥（服务器的公钥从步骤2中的服务器的证书中获得）对其加密，然后将加密后的“预主密码”传给服务器;
4.1 如果服务器要求客户的身份认证（在握手过程中可选），用户不光要给服务器“预主密码”，还需要建立一个随机数然后对其进行数据签名，将设个含有签名的随机数和客户自己的证书也传给服务器。
4.2 如果不需要，则只将“预主密码”传递给服务器，直接进行第6步。
5. 服务器身份验证（需要才进行）;
6. 浏览器、服务器各自生成通话密码
服务器将自己的私钥解开加密的“预主密码”,然后执行一系列步骤来产生主通讯密码（客服端也将通过同样的方法产生相同的主通讯密码）;
7. 约定通话密码
服务器和客服端用相同的主通讯密码即“通话密码”，一个对称密钥用于SSL协议的安全数据通讯的加解密通讯，同时在SSL通讯过程中还要完成数据通讯的完整性，防止数据通讯中的任何变化。
8. 浏览器通知服务器已经准备就绪
9. 服务器通知浏览器已经准备就绪
10. 开始数据通信
SSL的握手部分结束，SSL安全通道建立，开始进行数据通讯


# NSURLSession 模拟HTTPS证书认证

当我们进行访问一个HTTPS网站时，当走到步骤2时（服务器返回证书时），需要我们在本地完成证书信任的过程,如果使用session创建的task进行网络访问，会进入到代理方法`- URLSession:didReceiveChallenge:completionHandler:`完成步骤3。
其中 challenge 是一个包含授权请求的对象（NSURLAuthenticationChalleng）,代表进行HTTPS请求时，服务器发过来的质询，当收到质询之后就要开始进行客服端验证了，
challenge 有几个重要的属性：
protectionSpace它代表着对需要验证的受保护空间的验证，是一个NSURLProtectionSpace类型的对象，NSURLProtectionSpace对象包含请求的主机host、端口号port、代理类型proxyType、使用的协议protocol、服务端要求客户端对其验证的方法authenticationMethod等重要的信息，还有代表着服务器SSL传输状态的SecTrustRef类型的属性serverTrust，不过当且仅当authenticationMethod为NSURLAuthenticationMethodServerTrust这个属性值才不为Nil.

常见服务端指定的验证方法的类型

```
NSURLAuthenticationMethodHTTPBasic 
NSURLAuthenticationMethodHTTPDigest
NSURLAuthenticationMethodNTLM
NSURLAuthenticationMethodClientCertificate
NSURLAuthenticationMethodServerTrust
```
其中HTTP Basic、HTTP Digest与NTLM认证都是基于用户名/密码的认证，ClientCertificate(客户端证书)认证要求从客户端上传证书。客户端需要按照服务端指定的认证方法进行认证，否则可能会按照错误处理。例如使用HTTP Basic方式，客户端需要将用户名和密码信息放到凭据中，然后传递给服务端;如果使用的是ServerTrust方式，那么客户端就要将信任的凭据发给服务端。
一般在HTTPS访问的第3步过程中，服务端要求的认证方法几乎总是ServerTrust方式。有遇到过一些网络代理工具使用HTTP Digest的验证方式，在浏览器端进行访问的时候就弹出一个要求输入账号和密码的弹窗.

对于completionHandler参数是一个最终处理凭据的回调，要求在创建好包含验证信息的凭据之后必须调用，这样才会将验证的信息发送给服务端，也就意味着第3步的完成，开始进行第4步


```
typedef NS_ENUM(NSInteger, NSURLSessionAuthChallengeDisposition) {
    NSURLSessionAuthChallengeUseCredential = 0,   // 使用服务器发回的凭据,不过可能为空     
    NSURLSessionAuthChallengePerformDefaultHandling = 1,  // 默认的处理方法，凭据参数会被忽略
    NSURLSessionAuthChallengeCancelAuthenticationChallenge = 2,  //取消整个请求，忽略凭据参数 
    NSURLSessionAuthChallengeRejectProtectionSpace = 3, // 这次质询被拒绝，下次再试 ,凭据参数被忽略
} NS_ENUM_AVAILABLE(NSURLSESSION_AVAILABLE, 7_0);
```


参考：[http://www.cnblogs.com/Mike-zh/p/5174238.html](HTTPS访问控制)



date:       2017-04-22 16:00:00
author:     "Gao Fei"

