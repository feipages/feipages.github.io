import{_ as s,c as a,o as p,ag as t}from"./chunks/framework.BHpayLOB.js";const g=JSON.parse('{"title":"WhatsApp 分享","description":"","frontmatter":{},"headers":[],"relativePath":"frontend/ios/post-whatsapp-share.md","filePath":"frontend/ios/post-whatsapp-share.md"}'),e={name:"frontend/ios/post-whatsapp-share.md"};function l(i,n,o,r,c,h){return p(),a("div",null,n[0]||(n[0]=[t(`<h1 id="whatsapp-分享" tabindex="-1">WhatsApp 分享 <a class="header-anchor" href="#whatsapp-分享" aria-label="Permalink to &quot;WhatsApp 分享&quot;">​</a></h1><p>没有开发者平台，分享通过系统自带的</p><p>1 添加URL Scheme 白名单</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&lt;key&gt;LSApplicationQueriesSchemes&lt;/key&gt;</span></span>
<span class="line"><span>	&lt;array&gt;</span></span>
<span class="line"><span>		&lt;string&gt;whatsapp&lt;/string&gt;</span></span>
<span class="line"><span>	&lt;/array&gt;</span></span></code></pre></div><p>2 分享文字：使用open URL Scheme</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>- (void)shareToWhatsAppWithTxt:(NSString *)txt{</span></span>
<span class="line"><span>   </span></span>
<span class="line"><span>    if ([[UIApplication sharedApplication] canOpenURL:[NSURL URLWithString:@&quot;whatsapp://&quot;]]) {</span></span>
<span class="line"><span>        NSString *str = [NSString stringWithFormat:@&quot;whatsapp://send?text=%@&quot;,[txt stringByAddingPercentEncodingWithAllowedCharacters:[NSCharacterSet URLHostAllowedCharacterSet]]];</span></span>
<span class="line"><span>        NSURL *msgUrl = [NSURL URLWithString:str];</span></span>
<span class="line"><span>        [[UIApplication sharedApplication] openURL:msgUrl];</span></span>
<span class="line"><span>    }else{</span></span>
<span class="line"><span>        NSLog(@&quot;no whatsapp install&quot;);</span></span>
<span class="line"><span>        [self showAlterWithStr:@&quot;no whatsapp install&quot;];</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>3 分享照片与视频 使用UIDocumentInteractionController</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>- (void)shareToWhatsAppWithImg:(UIImage *)img{</span></span>
<span class="line"><span>    if ([[UIApplication sharedApplication] canOpenURL:[NSURL URLWithString:@&quot;whatsapp://app&quot;]]) {</span></span>
<span class="line"><span>        </span></span>
<span class="line"><span>        dispatch_async(dispatch_get_global_queue(0, 0), ^{</span></span>
<span class="line"><span>            </span></span>
<span class="line"><span>            NSString *name = [NSString stringWithFormat:@&quot;%f%u.png&quot;,[NSDate timeIntervalSinceReferenceDate],arc4random_uniform(1000)];</span></span>
<span class="line"><span>            NSString *savePath = [NSSearchPathForDirectoriesInDomains(NSCachesDirectory, NSUserDomainMask, YES).firstObject stringByAppendingPathComponent:name];</span></span>
<span class="line"><span>            BOOL result = [UIImagePNGRepresentation(img) writeToFile:savePath atomically:YES];</span></span>
<span class="line"><span>            if (result) {</span></span>
<span class="line"><span>                dispatch_async(dispatch_get_main_queue(), ^{</span></span>
<span class="line"><span>                    UIDocumentInteractionController *intent = [UIDocumentInteractionController interactionControllerWithURL:[NSURL fileURLWithPath:savePath]];</span></span>
<span class="line"><span>                    intent.UTI = @&quot;net.whatsapp.image&quot;;</span></span>
<span class="line"><span>                    intent.delegate = self;</span></span>
<span class="line"><span>                    [intent presentOpenInMenuFromRect:CGRectZero inView:self.view animated:YES];</span></span>
<span class="line"><span>                });</span></span>
<span class="line"><span>            }else{</span></span>
<span class="line"><span>                dispatch_async(dispatch_get_main_queue(), ^{</span></span>
<span class="line"><span>                    [self showAlterWithStr:@&quot;error&quot;];</span></span>
<span class="line"><span>                </span></span>
<span class="line"><span>                });</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>            </span></span>
<span class="line"><span>            </span></span>
<span class="line"><span>        });</span></span>
<span class="line"><span>   </span></span>
<span class="line"><span>    }else{</span></span>
<span class="line"><span>        [self showAlterWithStr:@&quot;no whatsapp install&quot;];</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>- (void)showAlterWithStr:(NSString *)str{</span></span>
<span class="line"><span>    UIAlertController *alertController = [UIAlertController alertControllerWithTitle:nil message:str preferredStyle:UIAlertControllerStyleAlert];</span></span>
<span class="line"><span>    UIAlertAction *cancelAction = [UIAlertAction actionWithTitle:@&quot;OK&quot; style:UIAlertActionStyleCancel handler:nil];</span></span>
<span class="line"><span>    [alertController addAction:cancelAction];</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    [self presentViewController:alertController animated:YES completion:nil];</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>2017-04-20 高飞</p>`,10)]))}const u=s(e,[["render",l]]);export{g as __pageData,u as default};
