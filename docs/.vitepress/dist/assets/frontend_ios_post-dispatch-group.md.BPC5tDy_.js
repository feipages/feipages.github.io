import{_ as a,c as n,o as p,ag as e}from"./chunks/framework.BHpayLOB.js";const g=JSON.parse('{"title":"\\"Dispatch Group\\"","description":"","frontmatter":{},"headers":[],"relativePath":"frontend/ios/post-dispatch-group.md","filePath":"frontend/ios/post-dispatch-group.md"}'),t={name:"frontend/ios/post-dispatch-group.md"};function l(i,s,o,c,r,u){return p(),n("div",null,s[0]||(s[0]=[e(`<h1 id="dispatch-group" tabindex="-1">&quot;Dispatch Group&quot; <a class="header-anchor" href="#dispatch-group" aria-label="Permalink to &quot;&quot;Dispatch Group&quot;&quot;">​</a></h1><h1 id="dispatch-group-日常使用" tabindex="-1">dispatch_group 日常使用 <a class="header-anchor" href="#dispatch-group-日常使用" aria-label="Permalink to &quot;dispatch_group 日常使用&quot;">​</a></h1><p><strong>#1.常见书写方式</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>dispatch_group_t group = dispatch_group_create();   </span></span>
<span class="line"><span>dispatch_queue_t queue = dispatch_queue_create(&quot;com.formssi.get_product_detail&quot;, NULL);</span></span>
<span class="line"><span>dispatch_group_async(group,queue, ^{</span></span>
<span class="line"><span>         &lt;!--do work--&gt;</span></span>
<span class="line"><span>    });</span></span>
<span class="line"><span>dispatch_group_async(group,queue, ^{</span></span>
<span class="line"><span>         &lt;!--do work--&gt;</span></span>
<span class="line"><span>    });</span></span>
<span class="line"><span>    dispatch_group_notify(group, dispatch_get_main_queue(), ^{</span></span>
<span class="line"><span>     &lt;!--main thread--&gt;</span></span>
<span class="line"><span>     &lt;!--do work--&gt;</span></span>
<span class="line"><span>      </span></span>
<span class="line"><span>    });</span></span></code></pre></div><p><strong>#2.如果做的事包含block任务，就需要给没个block任务添加入组与出组的操作</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>dispatch_group_t group = dispatch_group_create();   </span></span>
<span class="line"><span>dispatch_queue_t queue = dispatch_queue_create(&quot;com.baidu.detail&quot;, NULL);</span></span>
<span class="line"><span>dispatch_group_enter(group);</span></span>
<span class="line"><span>dispatch_group_async(group,queue, ^{</span></span>
<span class="line"><span>         &lt;!--do block work--&gt;</span></span>
<span class="line"><span>        dispatch_group_leave(group);</span></span>
<span class="line"><span>    });</span></span>
<span class="line"><span>    dispatch_group_enter(group);</span></span>
<span class="line"><span>dispatch_group_async(group,queue, ^{</span></span>
<span class="line"><span>         &lt;!--do block work--&gt;</span></span>
<span class="line"><span>        dispatch_group_leave(group);</span></span>
<span class="line"><span>    });</span></span>
<span class="line"><span>    dispatch_group_notify(group, dispatch_get_main_queue(), ^{</span></span>
<span class="line"><span>      &lt;!--main thread--&gt;</span></span>
<span class="line"><span>      &lt;!--do work--&gt;</span></span>
<span class="line"><span>    });</span></span></code></pre></div><p><strong>#3.当我们使用其他的三方库做网络请求或则图片下载时，而请求的任务包含多个，需要 等待这些任务都执行完成之后，再返回结果</strong>，如下列子：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>dispatch_group_t group = dispatch_group_create();</span></span>
<span class="line"><span>    __block BOOL isSuccess = NO;</span></span>
<span class="line"><span>    for (CellModel *cellModel in modelArray) {</span></span>
<span class="line"><span>         &lt;!--异步下载图片--&gt;</span></span>
<span class="line"><span>        dispatch_group_enter(group);</span></span>
<span class="line"><span>        [[SDWebImageManager sharedManager] downloadImageWithURL:cellModel.url options:SDWebImageRetryFailed | SDWebImageLowPriority progress:nil completed:^(UIImage *image, NSError *error, SDImageCacheType cacheType, BOOL finished, NSURL *imageURL) {</span></span>
<span class="line"><span>            NSLog(@&quot;downloadError = %@-%@&quot;,error,[NSThread currentThread]);</span></span>
<span class="line"><span>            if (error) {</span></span>
<span class="line"><span>                isSuccess = NO;</span></span>
<span class="line"><span>            }else{</span></span>
<span class="line"><span>                isSuccess = YES;</span></span>
<span class="line"><span>                &lt;!-- 获取图片大小--&gt;</span></span>
<span class="line"><span>                cellModel.cellHeight = WidthOfWindow * image.size.height / image.size.width;</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>            dispatch_group_leave(group);</span></span>
<span class="line"><span>        }];</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span></span></span>
<span class="line"><span>dispatch_group_notify(group, dispatch_get_main_queue(), ^{</span></span>
<span class="line"><span>         &lt;!-- more --&gt;</span></span>
<span class="line"><span>        if (isSuccess) {</span></span>
<span class="line"><span>            completion(NetWorkingResultTypeSuccess,@&quot;success&quot;);</span></span>
<span class="line"><span>        }else{</span></span>
<span class="line"><span>            completion(NetWorkingResultTypeNoData, @&quot;error&quot;);</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        </span></span>
<span class="line"><span>    });</span></span></code></pre></div><p>date: 2017-03-17 16:00:00 author: &quot;Gao Fei&quot;</p>`,9)]))}const h=a(t,[["render",l]]);export{g as __pageData,h as default};
