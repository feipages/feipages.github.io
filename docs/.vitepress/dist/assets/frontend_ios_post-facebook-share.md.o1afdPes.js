import{_ as a,c as s,o as p,ag as t}from"./chunks/framework.BHpayLOB.js";const h=JSON.parse('{"title":"Facebook 分享","description":"","frontmatter":{},"headers":[],"relativePath":"frontend/ios/post-facebook-share.md","filePath":"frontend/ios/post-facebook-share.md"}'),e={name:"frontend/ios/post-facebook-share.md"};function i(l,n,o,c,r,g){return p(),s("div",null,n[0]||(n[0]=[t(`<h1 id="facebook-分享" tabindex="-1">Facebook 分享 <a class="header-anchor" href="#facebook-分享" aria-label="Permalink to &quot;Facebook 分享&quot;">​</a></h1><blockquote><p>官方文档： <a href="https://developers.facebook.com/docs/sharing/overview" target="_blank" rel="noreferrer">https://developers.facebook.com/docs/sharing/overview</a></p></blockquote><h2 id="在移动平台上分享-—-分步指南" tabindex="-1">在移动平台上分享 — 分步指南 <a class="header-anchor" href="#在移动平台上分享-—-分步指南" aria-label="Permalink to &quot;在移动平台上分享 — 分步指南&quot;">​</a></h2><ul><li><p>“分享”按钮：显示的时候没有分享计数器。用户轻触“分享”按钮将打开一个新窗口（也称为快速应用切换）。</p></li><li><p>分享对话框：窗口将显示帖子编辑器，其中包含分享链接的预览。如果用户安装了 iOS 版 Facebook 应用，分享对话框将由 Facebook 应用提供，否则将由 Safari 浏览器提供。轻触“分享”按钮即表示用户确认分享，然后系统将切换回您的应用。</p></li><li><p>现在，SDK 将自动检查设备上是否安装了原生 Facebook 应用。如果未安装，SDK 会将用户切换到默认浏览器并打开动态发布对话框。如果用户想要分享开放图谱动态，SDK 会打开网页分享对话框。</p></li><li><p>如果安装了原生 Facebook 应用，4.0-4.4 版的 SDK 会切换到原生 iOS 版 Facebook 应用，并在发布帖子后将控制权交还您的应用。如果使用 4.5+ 版 SDK，除非分享内容是开放图谱动态，否则用户会看到 iOS 分享表，而不会切换到原生 iOS 版 Facebook 应用。 说明： 目前下载的最新SDK版本为4.21.0，想要使用跳转到Facebook应用分享，需要申请public-action权限，才能使用图谱，否则只能使用web显示分享，目前还没申请下来该权限，只能做到web分享</p></li></ul><h3 id="第一步-info-plist-文件配置" tabindex="-1">第一步：info.plist 文件配置 <a class="header-anchor" href="#第一步-info-plist-文件配置" aria-label="Permalink to &quot;第一步：info.plist 文件配置&quot;">​</a></h3><p>将以下 XML 代码片段插入文件正文，位于最后的 ==&lt;/dict&gt;== 元素前</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&lt;key&gt;CFBundleURLTypes&lt;/key&gt;</span></span>
<span class="line"><span>&lt;array&gt;</span></span>
<span class="line"><span>  &lt;dict&gt;</span></span>
<span class="line"><span>    &lt;key&gt;CFBundleURLSchemes&lt;/key&gt;</span></span>
<span class="line"><span>    &lt;array&gt;</span></span>
<span class="line"><span>      &lt;string&gt;fb{your-app-id}&lt;/string&gt;</span></span>
<span class="line"><span>    &lt;/array&gt;</span></span>
<span class="line"><span>  &lt;/dict&gt;</span></span>
<span class="line"><span>&lt;/array&gt;</span></span>
<span class="line"><span>&lt;key&gt;FacebookAppID&lt;/key&gt;</span></span>
<span class="line"><span>&lt;string&gt;{your-app-id}&lt;/string&gt;</span></span>
<span class="line"><span>&lt;key&gt;FacebookDisplayName&lt;/key&gt;</span></span>
<span class="line"><span>&lt;string&gt;{your-app-name}&lt;/string&gt;</span></span>
<span class="line"><span>&lt;!-- URL Scheme , 返回应用--&gt;</span></span>
<span class="line"><span>&lt;key&gt;LSApplicationQueriesSchemes&lt;/key&gt;</span></span>
<span class="line"><span>	&lt;array&gt;</span></span>
<span class="line"><span>        &lt;!--Facebook URL Scheme--&gt;</span></span>
<span class="line"><span>		&lt;string&gt;fbapi&lt;/string&gt;</span></span>
<span class="line"><span>		&lt;string&gt;fb-messenger-api&lt;/string&gt;</span></span>
<span class="line"><span>		&lt;string&gt;fbauth2&lt;/string&gt;</span></span>
<span class="line"><span>		&lt;string&gt;fbshareextension&lt;/string&gt;</span></span>
<span class="line"><span>        &lt;!-- whatsapp URL Scheme 白名单--&gt;</span></span>
<span class="line"><span>		&lt;string&gt;whatsapp&lt;/string&gt;</span></span>
<span class="line"><span>        &lt;!-- instagram URL Scheme 白名单--&gt;</span></span>
<span class="line"><span>		&lt;string&gt;instagram&lt;/string&gt;</span></span>
<span class="line"><span>        &lt;!-- wechat URL Scheme 白名单--&gt;</span></span>
<span class="line"><span>		&lt;string&gt;wechat&lt;/string&gt;</span></span>
<span class="line"><span>		&lt;string&gt;weixin&lt;/string&gt;</span></span>
<span class="line"><span>	&lt;/array&gt;</span></span>
<span class="line"><span>&lt;key&gt;NSPhotoLibraryUsageDescription&lt;/key&gt;</span></span>
<span class="line"><span>  &lt;string&gt;{human-readable reason for photo access}&lt;/string&gt;</span></span></code></pre></div><p>info.plist 配置说明 （1）将 ==fb{your-app-id}== 替换为 Facebook 应用编号，加上前缀 ==fb==。例如，==fb1767503776894317==。您可以通过 Facebook 应用面板找到应用编号。 （2）使用应用编号替换 =={your-app-id}==。 （3）使用您在应用面板中指定的显示名称替换 =={your-app-name}==。 （4）将 =={human-readable reason for photo access}== 替换为您的应用需要获取照片访问权限的理由</p><h3 id="第二步-注册facebook" tabindex="-1">第二步：注册Facebook <a class="header-anchor" href="#第二步-注册facebook" aria-label="Permalink to &quot;第二步：注册Facebook&quot;">​</a></h3><p>AppDelegate.m 文件的实现 #import &lt;FBSDKCoreKit/FBSDKCoreKit.h&gt;</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    [[FBSDKApplicationDelegate sharedInstance] application:application didFinishLaunchingWithOptions:launchOptions];</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    return YES;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>// 仅支持iOS9以上系统，iOS8及以下系统不会回调</span></span>
<span class="line"><span>-(BOOL)application:(UIApplication *)app openURL:(NSURL *)url options:(NSDictionary&lt;UIApplicationOpenURLOptionsKey,id&gt; *)options{</span></span>
<span class="line"><span>    NSLog(@&quot;%s,load app options = %@&quot;, __func__, options);</span></span>
<span class="line"><span>    BOOL result = [[FBSDKApplicationDelegate sharedInstance] application:app openURL:url options:options];</span></span>
<span class="line"><span>    return result;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 所有平台,但ios9以后不推荐使用</span></span>
<span class="line"><span>- (BOOL)application:(UIApplication *)application</span></span>
<span class="line"><span>            openURL:(NSURL *)url</span></span>
<span class="line"><span>  sourceApplication:(NSString *)sourceApplication</span></span>
<span class="line"><span>         annotation:(id)annotation {</span></span>
<span class="line"><span>    NSLog(@&quot;%s,load app sourceApplication = %@&quot;,__func__,sourceApplication);</span></span>
<span class="line"><span>    BOOL isSuccess = [[FBSDKApplicationDelegate sharedInstance] application:application</span></span>
<span class="line"><span>                                                          openURL:url</span></span>
<span class="line"><span>                                                sourceApplication:sourceApplication</span></span>
<span class="line"><span>                                                       annotation:annotation];</span></span>
<span class="line"><span>    return isSuccess;</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="第三步-实现分享功能" tabindex="-1">第三步：实现分享功能 <a class="header-anchor" href="#第三步-实现分享功能" aria-label="Permalink to &quot;第三步：实现分享功能&quot;">​</a></h3><p>3.1 使用SDK中的分享按钮FBSDKShareButton 需要==public_profile==，默认已通过 创建如下：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>FBSDKShareButton *shareButton = [[FBSDKShareButton alloc] init];</span></span>
<span class="line"><span>shareButton.shareContent = content;  </span></span>
<span class="line"><span>shareButton.center = self.view.center;</span></span>
<span class="line"><span>  [self.view addSubview:shareButton];</span></span></code></pre></div><p>3.2 对于分享的内容content 可以使用分为</p><ul><li><p>FBSDKShareLinkContent 链接：大部分内容为引用 HTML 页面的网址。要提供最相关的信息，您应使用 Facebook 特定元标签标记您的页面</p></li><li><p>FBSDKSharePhotoContent<br> 照片：直接上传一张或多张由用户拍摄的照片</p></li><li><p>FBSDKShareVideoContent<br> 视频：直接上传由用户拍摄的视频</p></li><li><p>FBSDKShareMediaContent 多媒体：直接上传同时包含照片和视频的内容</p></li></ul><p>创建方式：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>FBSDKShareLinkContent *content = [[FBSDKShareLinkContent alloc] init];</span></span>
<span class="line"><span>content.contentURL = [NSURL URLWithString:@&quot;https://developers.facebook.com&quot;];</span></span></code></pre></div><p>SDK中定义的分享按钮如下图：</p><p>3.3 使用自定义的分享按钮</p><p>要使用专属分享界面，您需要：</p><ul><li>构建发布到图谱 API 端点 ==/me/feed== 的自定义界面</li><li>将 Facebook 登录功能添加至您的应用</li><li>请求 ==publish_actions== 权限，需要申请</li></ul><p>对自定义的分享按钮的样式的说明：</p><p>申请权限需要注意的事项：</p><p>上传视频的注意事项如图所示：</p><p>3.4 自定义分享内容</p><ul><li>使用开放图谱标签。</li><li>调整 FBSDKShareLinkContent 选择器</li></ul><p>图谱示例</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>if ([[FBSDKAccessToken currentAccessToken] hasGranted:@&quot;publish_actions&quot;]) {</span></span>
<span class="line"><span>        [[[FBSDKGraphRequest alloc]initWithGraphPath:@&quot;me/feed&quot; parameters:@{@&quot;message&quot;:@&quot;hello world!&quot;} HTTPMethod:@&quot;POST&quot;] startWithCompletionHandler:^(FBSDKGraphRequestConnection *connection, id result, NSError *error) {</span></span>
<span class="line"><span>            NSLog(@&quot;result=%@&quot;,result);</span></span>
<span class="line"><span>        }];</span></span>
<span class="line"><span>    }else{</span></span>
<span class="line"><span>        NSLog(@&quot;did not have publish_actions&quot;);</span></span>
<span class="line"><span>    }</span></span></code></pre></div><p>FBSDKShareLinkContent 示例</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>NSURL *contentURL = [[NSURL alloc] initWithString:</span></span>
<span class="line"><span>  @&quot;http://en.wikipedia.org/wiki/Facebook&quot;];</span></span>
<span class="line"><span></span></span>
<span class="line"><span>NSURL *imageURL = </span></span>
<span class="line"><span>  [NSURL URLWithString:@&quot;http://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Facebook_Headquarters_Menlo_Park.jpg/2880px-Facebook_Headquarters_Menlo_Park.jpg&quot;];</span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>button.shareContent = [[FBSDKShareLinkContent alloc]</span></span>
<span class="line"><span>  initWithContentURL: contentURL</span></span>
<span class="line"><span>  contentTitle: @&quot;My Share Title&quot;</span></span>
<span class="line"><span>  contentDescription: @&quot;Lorem ipsum dolor sit amet.&quot;</span></span>
<span class="line"><span>  imageURL: imageURL</span></span>
<span class="line"><span>  peopleIDs: @[@&quot;1561082740838259&quot;]</span></span>
<span class="line"><span>  placeID: @&quot;166793820034304&quot;</span></span>
<span class="line"><span>  ref: @&quot;myRefId&quot;</span></span>
<span class="line"><span>];</span></span></code></pre></div><p>3.5 分享对话框</p><ul><li>在移动平台上，当用户使用分享对话框分享内容时，对话框会执行快速应用切换操作，切换到设备上的 Facebook 应用。我们还提供网页对话框作为回退选项，以防用户未安装原生 Facebook 应用</li><li>使用原生 Facebook 对话框时，无需添加 Facebook 登录即可启用分享</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>- (void)facebookShareWithMessage:(NSDictionary *)dictionary {</span></span>
<span class="line"><span>    NSString *contentUrlString = dictionary[@&quot;content_url&quot;];</span></span>
<span class="line"><span>    NSString *imageUrlString = dictionary[@&quot;image_url&quot;];</span></span>
<span class="line"><span>    NSString *description = dictionary[@&quot;description&quot;];</span></span>
<span class="line"><span>    NSString *title = dictionary[@&quot;title&quot;];</span></span>
<span class="line"><span>    NSString *quote = dictionary[@&quot;quote&quot;];</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    FBSDKShareLinkContent *content = [[FBSDKShareLinkContent alloc] init];</span></span>
<span class="line"><span>    content.contentURL = [NSURL URLWithString:contentUrlString];</span></span>
<span class="line"><span>    content.imageURL = [NSURL URLWithString:imageUrlString];</span></span>
<span class="line"><span>    content.contentDescription = description;</span></span>
<span class="line"><span>    content.contentTitle = title;</span></span>
<span class="line"><span>    content.quote = quote;</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    FBSDKShareDialog *dialog = [[FBSDKShareDialog alloc] init];</span></span>
<span class="line"><span>    dialog.shareContent = content;</span></span>
<span class="line"><span>    dialog.fromViewController = self;</span></span>
<span class="line"><span>    dialog.delegate = self;</span></span>
<span class="line"><span>    dialog.mode = FBSDKShareDialogModeBrowser;</span></span>
<span class="line"><span>    [dialog show];</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>3.6 自定义分享界面 可以使用自定义按钮和调用图谱 API 的自定义对话框</p><pre><code>                                    2017-04-19 高飞
</code></pre>`,36)]))}const d=a(e,[["render",i]]);export{h as __pageData,d as default};
