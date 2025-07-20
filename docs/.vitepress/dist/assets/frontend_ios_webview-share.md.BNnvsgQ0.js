import{_ as n,c as a,o as e,ag as p}from"./chunks/framework.BHpayLOB.js";const b=JSON.parse('{"title":"\\"WebView\\"","description":"","frontmatter":{},"headers":[],"relativePath":"frontend/ios/webview-share.md","filePath":"frontend/ios/webview-share.md"}'),t={name:"frontend/ios/webview-share.md"};function i(l,s,o,r,c,u){return e(),a("div",null,s[0]||(s[0]=[p(`<h1 id="webview" tabindex="-1">&quot;WebView&quot; <a class="header-anchor" href="#webview" aria-label="Permalink to &quot;&quot;WebView&quot;&quot;">​</a></h1><h2 id="wkwebview-发送post请求" tabindex="-1">WKWebView 发送Post请求 <a class="header-anchor" href="#wkwebview-发送post请求" aria-label="Permalink to &quot;WKWebView 发送Post请求&quot;">​</a></h2><p>在ios8中 使用如下代码 设置请求体仅在UIWebView中好使，在WKWebView中设置的Content-Length始终为0；也就是发送请求的时候，请求体的内容并没携带一起发送给服务器。 备注：在UIWebView中Content-Length与Content-Type默认会自动创建出来</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>NSMutableURLRequest *request = [NSMutableURLRequest requestWithURL:[NSURL URLWithString:url]];</span></span>
<span class="line"><span>    NSData *bodyData = [bodyStr dataUsingEncoding:NSUTF8StringEncoding];</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    [request setHTTPMethod:@&quot;POST&quot;];</span></span>
<span class="line"><span>    [request setValue:[NSString stringWithFormat:@&quot;%ld&quot;,bodyData.length] forHTTPHeaderField:@&quot;Content-Length&quot;];</span></span>
<span class="line"><span>    [request setValue:@&quot;application/x-www-form-urlencoded&quot; forHTTPHeaderField:@&quot;Content-Type&quot;];</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    [request setHTTPBody:bodyData];</span></span></code></pre></div><p>在WKWebView中需要换种方式处理，即使用js发送post请求，而当webView已经创建的时候，即可执行js。 所以在viewDidLoad方法中调用执行js的方法</p><p>js的宏定义如下：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>#define POST_JS @&quot;function postWebRequest(path, params) {\\</span></span>
<span class="line"><span>var method = \\&quot;POST\\&quot;;\\</span></span>
<span class="line"><span>var form = document.createElement(\\&quot;form\\&quot;);\\</span></span>
<span class="line"><span>form.setAttribute(\\&quot;method\\&quot;, method);\\</span></span>
<span class="line"><span>form.setAttribute(\\&quot;action\\&quot;, path);\\</span></span>
<span class="line"><span>for(var key in params){\\</span></span>
<span class="line"><span>if (params.hasOwnProperty(key)) {\\</span></span>
<span class="line"><span>var hiddenFild = document.createElement(\\&quot;input\\&quot;);\\</span></span>
<span class="line"><span>hiddenFild.setAttribute(\\&quot;type\\&quot;, \\&quot;hidden\\&quot;);\\</span></span>
<span class="line"><span>hiddenFild.setAttribute(\\&quot;name\\&quot;, key);\\</span></span>
<span class="line"><span>hiddenFild.setAttribute(\\&quot;value\\&quot;, params[key]);\\</span></span>
<span class="line"><span>}\\</span></span>
<span class="line"><span>form.appendChild(hiddenFild);\\</span></span>
<span class="line"><span>}\\</span></span>
<span class="line"><span>document.body.appendChild(form);\\</span></span>
<span class="line"><span>form.submit();\\</span></span>
<span class="line"><span>}&quot;</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>- (WKWebView *)wkWebView</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>    if (!_wkWebView){</span></span>
<span class="line"><span>        WKWebViewConfiguration *config = [[WKWebViewConfiguration alloc] init];</span></span>
<span class="line"><span>        WKWebView *webView = [[WKWebView alloc] initWithFrame:self.view.bounds configuration:config];</span></span>
<span class="line"><span>        webView.navigationDelegate = self;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        [self.view addSubview:webView];</span></span>
<span class="line"><span>        </span></span>
<span class="line"><span>        _wkWebView = webView;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    return _wkWebView;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>- (void)makeWKWebViewPostRequestWithUrl:(NSString *)url param:(NSString *)bodyStr</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    NSString *js = [NSString stringWithFormat:@&quot;%@postWebRequest(&#39;%@&#39;,%@)&quot;,POST_JS,url,bodyStr];</span></span>
<span class="line"><span>    [self.wkWebView evaluateJavaScript:js completionHandler:^(id _Nullable msg, NSError * _Nullable error) {</span></span>
<span class="line"><span>        DLog(@&quot;JavaScriptError=%@&quot;,error);</span></span>
<span class="line"><span>        </span></span>
<span class="line"><span>    }];</span></span>
<span class="line"><span>}</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>- (void)viewDidLoad {</span></span>
<span class="line"><span>    [super viewDidLoad];</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    NSString *url = @&quot;http://www.xxx.com&quot;;</span></span>
<span class="line"><span>    NSString *bodyStr = [NSString stringWithFormat:@&quot;{&#39;username&#39;:&#39;%@&#39;,&#39;password&#39;:&#39;%@&#39;}&quot;,@&quot;zhangsan&quot;,@&quot;12345678&quot;];</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>   [self makeWKWebViewPostRequestWithUrl:url param:bodyStr];</span></span>
<span class="line"><span>}</span></span></code></pre></div>`,9)]))}const h=n(t,[["render",i]]);export{b as __pageData,h as default};
