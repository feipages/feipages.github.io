import{_ as a,c as s,o as p,ag as e}from"./chunks/framework.BHpayLOB.js";const t="/img/in-post/media/14926785184639/14926786938908.jpg",i="/img/in-post/media/14926785184639/14926788159747.jpg",l="/img/in-post/media/14926785184639/14926813444655.jpg",o="/img/in-post/media/14926785184639/14926788445548.jpg",r="/img/in-post/media/14926785184639/14926788538614.jpg",c="/img/in-post/media/14926785184639/14926788643833.jpg",m="/img/in-post/media/14926785184639/14926792525999.jpg",g="/img/in-post/media/14926785184639/14926791330965.jpg",N=JSON.parse('{"title":"Instagram 分享","description":"","frontmatter":{},"headers":[],"relativePath":"frontend/ios/post-instagram-share.md","filePath":"frontend/ios/post-instagram-share.md"}'),d={name:"frontend/ios/post-instagram-share.md"};function u(h,n,S,I,_,U){return p(),s("div",null,n[0]||(n[0]=[e('<h1 id="instagram-分享" tabindex="-1">Instagram 分享 <a class="header-anchor" href="#instagram-分享" aria-label="Permalink to &quot;Instagram 分享&quot;">​</a></h1><p>大概流程如下： <img src="'+t+'" alt=""></p><p>分享：无需获取权限，通过Custom URL Scheme或者Document Interaction 分享出去后停留在Instagram，无回调（返回值）。</p><p>另外：通过授权（账号和密码）的方式，可以获取用户的公开内容。</p><p>登陆权限有如下几种： <img src="'+i+'" alt=""></p><p>获取较高权限，比如：public_content可以拿到用户发布的图片和视频内容。 备注：</p><p>客服端申请权限，目前只申请下来basic权限，public_content权限没申请下来，没能继续测试是否能拿到用户发布的内容，但是理论上是可以的，且看下面的介绍） <img src="'+l+'" alt=""></p><p>根据官方文档的介绍： 第一步：授权，获取access_token; <img src="'+o+'" alt=""></p><p>第二步：get用户最新发布的media。 <img src="'+r+'" alt=""></p><p>请求的url及参数如上图所示，返回的结果如下图所示。 <img src="'+c+'" alt=""></p><p>结论：可以先请求用户授权，然后分享照片，最后获取最新发布的信息。</p><p>分享文档：<a href="https://www.instagram.com/developer/mobile-sharing/iphone-hooks/" target="_blank" rel="noreferrer">https://www.instagram.com/developer/mobile-sharing/iphone-hooks/</a></p><p>通过 URL Scheme 分享，截图如下： <img src="'+m+`" alt=""></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>-(void)loadInstagram{</span></span>
<span class="line"><span>    NSURL *url = [NSURL URLWithString:@&quot;instagram://app&quot;];</span></span>
<span class="line"><span>    if ([[UIApplication sharedApplication] canOpenURL:url]) {</span></span>
<span class="line"><span>        [[UIApplication sharedApplication] openURL:url];</span></span>
<span class="line"><span>    }else{</span></span>
<span class="line"><span>        NSLog(@&quot;did not install instagram&quot;);</span></span>
<span class="line"><span>        [self showAlterWithStr:@&quot;did not install instagram&quot;];</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>}</span></span></code></pre></div><p>通过UIDocumentInteractionController,原文档说明如下： <img src="`+g+`" alt=""> 示例代码：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>-(void)shareToInstagramByDocumentImage:(NSString *)imageStr{</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    NSURL *instagramURL = [NSURL URLWithString:@&quot;instagram://app&quot;];</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    if ([[UIApplication sharedApplication] canOpenURL:instagramURL]){</span></span>
<span class="line"><span>        </span></span>
<span class="line"><span>        dispatch_async(dispatch_get_global_queue(0, 0), ^{</span></span>
<span class="line"><span>            </span></span>
<span class="line"><span>            UIImage *image = [UIImage imageNamed:imageStr];</span></span>
<span class="line"><span>            NSString *name = [NSString stringWithFormat:@&quot;%f%u.igo&quot;,[NSDate timeIntervalSinceReferenceDate],arc4random_uniform(1000)];</span></span>
<span class="line"><span>            NSString *savePath = [NSSearchPathForDirectoriesInDomains(NSCachesDirectory, NSUserDomainMask, YES).firstObject stringByAppendingPathComponent:name];</span></span>
<span class="line"><span>            </span></span>
<span class="line"><span>            [UIImagePNGRepresentation(image) writeToFile:savePath atomically:YES];</span></span>
<span class="line"><span>            dispatch_async(dispatch_get_main_queue(), ^{</span></span>
<span class="line"><span>                self.documentInteractionController = [UIDocumentInteractionController interactionControllerWithURL:[NSURL fileURLWithPath:savePath]];</span></span>
<span class="line"><span>                self.documentInteractionController.UTI = @&quot;com.instagram.exclusivegram&quot;;</span></span>
<span class="line"><span>                self.documentInteractionController.delegate = self;</span></span>
<span class="line"><span>                [self.documentInteractionController presentOpenInMenuFromRect:CGRectZero inView:self.view animated:YES];</span></span>
<span class="line"><span>            });</span></span>
<span class="line"><span>        });</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    }else{</span></span>
<span class="line"><span>        NSLog(@&quot;did not install instagram&quot;);</span></span>
<span class="line"><span>        [self showAlterWithStr:@&quot;did not install instagram&quot;];</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>-(void)shareToInstagramByImage:(NSString *)imageStr{</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    NSURL *instagramURL = [NSURL URLWithString:@&quot;instagram://app&quot;];</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    if ([[UIApplication sharedApplication] canOpenURL:instagramURL]){</span></span>
<span class="line"><span>        </span></span>
<span class="line"><span>        dispatch_async(dispatch_get_global_queue(0, 0), ^{</span></span>
<span class="line"><span>            </span></span>
<span class="line"><span>            UIImage *image = [UIImage imageNamed:imageStr];</span></span>
<span class="line"><span>            NSString *name = [NSString stringWithFormat:@&quot;%f%u.ig&quot;,[NSDate timeIntervalSinceReferenceDate],arc4random_uniform(1000)];</span></span>
<span class="line"><span>            NSString *savePath = [NSSearchPathForDirectoriesInDomains(NSCachesDirectory, NSUserDomainMask, YES).firstObject stringByAppendingPathComponent:name];</span></span>
<span class="line"><span>            </span></span>
<span class="line"><span>            [UIImagePNGRepresentation(image) writeToFile:savePath atomically:YES];</span></span>
<span class="line"><span>            dispatch_async(dispatch_get_main_queue(), ^{</span></span>
<span class="line"><span>                self.documentInteractionController = [UIDocumentInteractionController interactionControllerWithURL:[NSURL fileURLWithPath:savePath]];</span></span>
<span class="line"><span>                self.documentInteractionController.UTI = @&quot;com.instagram.photo&quot;;</span></span>
<span class="line"><span>                self.documentInteractionController.delegate = self;</span></span>
<span class="line"><span>                [self.documentInteractionController presentOpenInMenuFromRect:CGRectZero inView:self.view animated:YES];</span></span>
<span class="line"><span>            });</span></span>
<span class="line"><span>        });</span></span>
<span class="line"><span>        </span></span>
<span class="line"><span>    }else{</span></span>
<span class="line"><span>        NSLog(@&quot;did not install instagram&quot;);</span></span>
<span class="line"><span>        [self showAlterWithStr:@&quot;did not install instagram&quot;];</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>-(void)shareToInstagramByDocumentnNameWith:(NSString *)imageName{</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    NSURL *instagramUrl = [NSURL URLWithString:@&quot;instagram://app&quot;];</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    if ([[UIApplication sharedApplication] canOpenURL:instagramUrl]){</span></span>
<span class="line"><span>        </span></span>
<span class="line"><span>        NSString  *jpgPath = [[NSBundle mainBundle] pathForResource:imageName ofType:nil];</span></span>
<span class="line"><span>        NSURL *imageUrl = [[NSURL alloc] initWithString:[[NSString alloc] initWithFormat:@&quot;file://%@&quot;, jpgPath]];</span></span>
<span class="line"><span>        </span></span>
<span class="line"><span>        self.documentInteractionController = [UIDocumentInteractionController interactionControllerWithURL:imageUrl];</span></span>
<span class="line"><span>        self.documentInteractionController.UTI = @&quot;com.instagram.photo&quot;;</span></span>
<span class="line"><span>        self.documentInteractionController.delegate = self;</span></span>
<span class="line"><span>        </span></span>
<span class="line"><span>        [self.documentInteractionController presentOpenInMenuFromRect:CGRectZero inView:self.view animated:YES];</span></span>
<span class="line"><span>    }else{</span></span>
<span class="line"><span>        NSLog(@&quot;did not install instagram&quot;);</span></span>
<span class="line"><span>        [self showAlterWithStr:@&quot;did not install instagram&quot;];</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>date: 2017-04-20 16:00:00 author: &quot;Gao Fei&quot;</p>`,19)]))}const q=a(d,[["render",u]]);export{N as __pageData,q as default};
