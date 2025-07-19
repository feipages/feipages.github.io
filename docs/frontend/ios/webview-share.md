#    "WebView"

## WKWebView 发送Post请求

在ios8中 使用如下代码 设置请求体仅在UIWebView中好使，在WKWebView中设置的Content-Length始终为0；也就是发送请求的时候，请求体的内容并没携带一起发送给服务器。
备注：在UIWebView中Content-Length与Content-Type默认会自动创建出来

```
NSMutableURLRequest *request = [NSMutableURLRequest requestWithURL:[NSURL URLWithString:url]];
    NSData *bodyData = [bodyStr dataUsingEncoding:NSUTF8StringEncoding];
    
    [request setHTTPMethod:@"POST"];
    [request setValue:[NSString stringWithFormat:@"%ld",bodyData.length] forHTTPHeaderField:@"Content-Length"];
    [request setValue:@"application/x-www-form-urlencoded" forHTTPHeaderField:@"Content-Type"];
    
    [request setHTTPBody:bodyData];
```

在WKWebView中需要换种方式处理，即使用js发送post请求，而当webView已经创建的时候，即可执行js。
所以在viewDidLoad方法中调用执行js的方法

js的宏定义如下：

```
#define POST_JS @"function postWebRequest(path, params) {\
var method = \"POST\";\
var form = document.createElement(\"form\");\
form.setAttribute(\"method\", method);\
form.setAttribute(\"action\", path);\
for(var key in params){\
if (params.hasOwnProperty(key)) {\
var hiddenFild = document.createElement(\"input\");\
hiddenFild.setAttribute(\"type\", \"hidden\");\
hiddenFild.setAttribute(\"name\", key);\
hiddenFild.setAttribute(\"value\", params[key]);\
}\
form.appendChild(hiddenFild);\
}\
document.body.appendChild(form);\
form.submit();\
}"

```
```
- (WKWebView *)wkWebView
{
    if (!_wkWebView){
        WKWebViewConfiguration *config = [[WKWebViewConfiguration alloc] init];
        WKWebView *webView = [[WKWebView alloc] initWithFrame:self.view.bounds configuration:config];
        webView.navigationDelegate = self;

        [self.view addSubview:webView];
        
        _wkWebView = webView;
    }
    return _wkWebView;
}

- (void)makeWKWebViewPostRequestWithUrl:(NSString *)url param:(NSString *)bodyStr
{

    
    NSString *js = [NSString stringWithFormat:@"%@postWebRequest('%@',%@)",POST_JS,url,bodyStr];
    [self.wkWebView evaluateJavaScript:js completionHandler:^(id _Nullable msg, NSError * _Nullable error) {
        DLog(@"JavaScriptError=%@",error);
        
    }];
}

```



```
- (void)viewDidLoad {
    [super viewDidLoad];
    
    NSString *url = @"http://www.xxx.com";
    NSString *bodyStr = [NSString stringWithFormat:@"{'username':'%@','password':'%@'}",@"zhangsan",@"12345678"];
    
   [self makeWKWebViewPostRequestWithUrl:url param:bodyStr];
}

```


