import{_ as s,c as a,o as e,ag as p}from"./chunks/framework.BHpayLOB.js";const C=JSON.parse('{"title":"Get Current ViewController","description":"","frontmatter":{},"headers":[],"relativePath":"frontend/ios/post-current-controller.md","filePath":"frontend/ios/post-current-controller.md"}'),l={name:"frontend/ios/post-current-controller.md"};function t(r,n,i,o,c,d){return e(),a("div",null,n[0]||(n[0]=[p(`<h1 id="get-current-viewcontroller" tabindex="-1">Get Current ViewController <a class="header-anchor" href="#get-current-viewcontroller" aria-label="Permalink to &quot;Get Current ViewController&quot;">​</a></h1><blockquote><p>&quot;Get the current view controller from the app delegate&quot;</p></blockquote><h2 id="_1-get-the-current-view-controller-from-the-app-delegate" tabindex="-1">1.Get the current view controller from the app delegate <a class="header-anchor" href="#_1-get-the-current-view-controller-from-the-app-delegate" aria-label="Permalink to &quot;1.Get the current view controller from the app delegate&quot;">​</a></h2><p><code>参考：http://stackoverflow.com/questions/24825123/get-the-current-view-controller-from-the-app-delegate%EF%BC%89</code></p><p>扩展一个方法：</p><p>UIViewController+Utils.h</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>#import &lt;UIKit/UIKit.h&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>@interface UIViewController (Utils)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>+(UIViewController*) currentViewController;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>@end</span></span></code></pre></div><p>UIViewController+Utils.m</p><div class="language-#import vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">#import</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span></span></span>
<span class="line"><span>@implementation UIViewController (Utils)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>+(UIViewController*) findBestViewController:(UIViewController*)vc {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    if (vc.presentedViewController) {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        // Return presented view controller</span></span>
<span class="line"><span>        return [UIViewController findBestViewController:vc.presentedViewController];</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    } else if ([vc isKindOfClass:[UISplitViewController class]]) {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        // Return right hand side</span></span>
<span class="line"><span>        UISplitViewController* svc = (UISplitViewController*) vc;</span></span>
<span class="line"><span>        if (svc.viewControllers.count &gt; 0)</span></span>
<span class="line"><span>            return [UIViewController findBestViewController:svc.viewControllers.lastObject];</span></span>
<span class="line"><span>        else</span></span>
<span class="line"><span>            return vc;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    } else if ([vc isKindOfClass:[UINavigationController class]]) {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        // Return top view</span></span>
<span class="line"><span>        UINavigationController* svc = (UINavigationController*) vc;</span></span>
<span class="line"><span>        if (svc.viewControllers.count &gt; 0)</span></span>
<span class="line"><span>            return [UIViewController findBestViewController:svc.topViewController];</span></span>
<span class="line"><span>        else</span></span>
<span class="line"><span>            return vc;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    } else if ([vc isKindOfClass:[UITabBarController class]]) {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        // Return visible view</span></span>
<span class="line"><span>        UITabBarController* svc = (UITabBarController*) vc;</span></span>
<span class="line"><span>        if (svc.viewControllers.count &gt; 0)</span></span>
<span class="line"><span>            return [UIViewController findBestViewController:svc.selectedViewController];</span></span>
<span class="line"><span>        else</span></span>
<span class="line"><span>            return vc;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    } else {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        // Unknown view controller type, return last child view controller</span></span>
<span class="line"><span>        return vc;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>+(UIViewController*) currentViewController {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // Find best view controller</span></span>
<span class="line"><span>    UIViewController* viewController = [UIApplication sharedApplication].keyWindow.rootViewController;</span></span>
<span class="line"><span>    return [UIViewController findBestViewController:viewController];</span></span>
<span class="line"><span></span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>@end</span></span></code></pre></div><p>date: 2017-04-07 author: &quot;Gao Fei&quot;</p>`,10)]))}const v=s(l,[["render",t]]);export{C as __pageData,v as default};
