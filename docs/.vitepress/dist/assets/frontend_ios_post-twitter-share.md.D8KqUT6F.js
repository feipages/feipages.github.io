import{_ as a,c as n,o as e,ag as p}from"./chunks/framework.BHpayLOB.js";const u=JSON.parse('{"title":"\\"Twitter share\\"","description":"","frontmatter":{},"headers":[],"relativePath":"frontend/ios/post-twitter-share.md","filePath":"frontend/ios/post-twitter-share.md"}'),t={name:"frontend/ios/post-twitter-share.md"};function i(o,s,l,r,c,d){return e(),n("div",null,s[0]||(s[0]=[p(`<h1 id="twitter-share" tabindex="-1">&quot;Twitter share&quot; <a class="header-anchor" href="#twitter-share" aria-label="Permalink to &quot;&quot;Twitter share&quot;&quot;">​</a></h1><h1 id="twitter-分享" tabindex="-1">Twitter 分享 <a class="header-anchor" href="#twitter-分享" aria-label="Permalink to &quot;Twitter 分享&quot;">​</a></h1><p>参考文档：<a href="https://fabric.io/kits/ios/twitterkit/install" target="_blank" rel="noreferrer">https://fabric.io/kits/ios/twitterkit/install</a><a href="https://fabric.io/kits/ios/twitterkit/manual-install" target="_blank" rel="noreferrer">https://fabric.io/kits/ios/twitterkit/manual-install</a></p><h2 id="_1-开发者账号申请注意事项" tabindex="-1">1 开发者账号申请注意事项： <a class="header-anchor" href="#_1-开发者账号申请注意事项" aria-label="Permalink to &quot;1 开发者账号申请注意事项：&quot;">​</a></h2><p>![]/img/in-post/media/14925836417059/14925860141113.jpg)</p><h2 id="_2-安装步骤" tabindex="-1">2 安装步骤： <a class="header-anchor" href="#_2-安装步骤" aria-label="Permalink to &quot;2 安装步骤：&quot;">​</a></h2><p>2.1 Download, unzip, and drag 下载，解压，拖拽到工程文件 2.2 Add a Run Script Build Phase</p><p>2.3 Add API Key to Info.plist</p><p>2.4 Initialize Twitter and Run</p><h2 id="_3-重要注解" tabindex="-1">3 重要注解： <a class="header-anchor" href="#_3-重要注解" aria-label="Permalink to &quot;3 重要注解：&quot;">​</a></h2><h2 id="_4-twitter-分享文档" tabindex="-1">4 twitter 分享文档： <a class="header-anchor" href="#_4-twitter-分享文档" aria-label="Permalink to &quot;4 twitter 分享文档：&quot;">​</a></h2><p><a href="https://docs.fabric.io/apple/twitter/compose-tweets.html" target="_blank" rel="noreferrer">https://docs.fabric.io/apple/twitter/compose-tweets.html</a> 分享参考：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>- (void)showTwitterCompose{</span></span>
<span class="line"><span>    TWTRComposer *composer = [[TWTRComposer alloc] init];</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    [composer setText:@&quot;I am big big man&quot;];</span></span>
<span class="line"><span>    [composer setURL:[NSURL URLWithString:@&quot;https//:www.baidu.com&quot;]];</span></span>
<span class="line"><span>    if (composer) {</span></span>
<span class="line"><span>        NSLog(@&quot;composer = %@&quot;,composer);</span></span>
<span class="line"><span>        [composer showFromViewController:self completion:^(TWTRComposerResult result) {</span></span>
<span class="line"><span>            if (result == TWTRComposerResultDone) {</span></span>
<span class="line"><span>                NSLog(@&quot;twitter share done&quot;);</span></span>
<span class="line"><span>            }else if (result == TWTRComposerResultCancelled){</span></span>
<span class="line"><span>                NSLog(@&quot;twitter share cancell&quot;);</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>        }];</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>- (void)showTwitterSessionShare{</span></span>
<span class="line"><span>    // Objective-C</span></span>
<span class="line"><span>    // Users must be logged-in to compose Tweets</span></span>
<span class="line"><span>    TWTRSession *session = [Twitter sharedInstance].sessionStore.session;</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    // User generated image</span></span>
<span class="line"><span>    UIImage *image = [UIImage imageNamed:@&quot;XXXXX&quot;];</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    // Create the card and composer</span></span>
<span class="line"><span>    TWTRCardConfiguration *card = [TWTRCardConfiguration appCardConfigurationWithPromoImage:image iPhoneAppID:nil iPadAppID:nil googlePlayAppID:nil];</span></span>
<span class="line"><span>    TWTRComposerViewController *composer = [[TWTRComposerViewController alloc] initWithUserID:session.userID cardConfiguration:card];</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    // Optionally set yourself as the delegate</span></span>
<span class="line"><span>    composer.delegate = self;</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    // Show the view controller</span></span>
<span class="line"><span>    [self presentViewController:composer animated:YES completion:nil];</span></span>
<span class="line"><span>}</span></span></code></pre></div><h2 id="_5-问题" tabindex="-1">5 问题： <a class="header-anchor" href="#_5-问题" aria-label="Permalink to &quot;5 问题：&quot;">​</a></h2><p>在ios 9.2.1 上测试，如果用户没登录Twitter账号，点击Twitter分享会崩溃。 出现的错误日志如下：</p><div class="language-*** vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">***</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>*** First throw call stack:</span></span>
<span class="line"><span>(0x239ab91b 0x23146e17 0x28294ab1 0x28296d25 0x28296f91 0x2801ddb9 0x1928b5 0x906e5 0x9057b 0x27f5c755 0x27f5c6e1 0x27f446d3 0x27f5c005 0x27f5bc7f 0x27f5468f 0x27f25125 0x27f236d3 0x2396ddff 0x2396d9ed 0x2396bd5b 0x238bb229 0x238bb015 0x24eabac9 0x27f8d189 0x92def 0x23563873)</span></span>
<span class="line"><span>libc++abi.dylib: terminating with uncaught exception of type NSException</span></span></code></pre></div><p>暂时的解决方式：</p><ol><li>申请访问Account权限（ios 10，要添加到info.plist中）；</li><li>访问Account的实现代码：</li></ol><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// ios 10 在info.plist添加访问权限</span></span>
<span class="line"><span>    ACAccountStore *store = [[ACAccountStore alloc]init];</span></span>
<span class="line"><span>    ACAccountType *twitterType = [store accountTypeWithAccountTypeIdentifier:ACAccountTypeIdentifierTwitter];</span></span>
<span class="line"><span>    [store requestAccessToAccountsWithType:twitterType options:nil completion:^(BOOL granted, NSError *error) {</span></span>
<span class="line"><span>        if (granted){</span></span>
<span class="line"><span>         NSArray *array =   [store accountsWithAccountType:twitterType];</span></span>
<span class="line"><span>            NSLog(@&quot;accounts = %@&quot;,array);</span></span>
<span class="line"><span>            if (array.count &gt; 0) {// 显示Twitter分享功能</span></span>
<span class="line"><span>                [self showTwitterCompose];</span></span>
<span class="line"><span>            }else{</span></span>
<span class="line"><span>                // 提示用户添加账号信息</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>        }else{</span></span>
<span class="line"><span>            NSLog(@&quot;----no----&quot;);</span></span>
<span class="line"><span>        </span></span>
<span class="line"><span>            // 提示用户允许访问账号信息</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }];</span></span></code></pre></div><p>2017-04-20 高飞</p>`,20)]))}const m=a(t,[["render",i]]);export{u as __pageData,m as default};
