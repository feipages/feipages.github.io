import{_ as s,c as n,o as e,ag as t}from"./chunks/framework.BHpayLOB.js";const h=JSON.parse('{"title":"iOS 网络状态检测","description":"","frontmatter":{},"headers":[],"relativePath":"frontend/ios/network-share.md","filePath":"frontend/ios/network-share.md"}'),l={name:"frontend/ios/network-share.md"};function p(i,a,r,o,c,d){return e(),n("div",null,a[0]||(a[0]=[t(`<h1 id="ios-网络状态检测" tabindex="-1">iOS 网络状态检测 <a class="header-anchor" href="#ios-网络状态检测" aria-label="Permalink to &quot;iOS 网络状态检测&quot;">​</a></h1><p>导入CoreTelephony.framework框架</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>CTCellularData *cellularData = [[CTCellularData alloc]init];</span></span>
<span class="line"><span>    cellularData.cellularDataRestrictionDidUpdateNotifier =  ^(CTCellularDataRestrictedState state){</span></span>
<span class="line"><span>        //状态改变时进行相关操作</span></span>
<span class="line"><span>    };</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>    CTCellularData *cellularData = [[CTCellularData alloc]init];</span></span>
<span class="line"><span>    CTCellularDataRestrictedState state = cellularData.restrictedState;</span></span>
<span class="line"><span>    switch (state) {</span></span>
<span class="line"><span>        case kCTCellularDataRestricted:</span></span>
<span class="line"><span>            NSLog(@&quot;Restricrted&quot;);</span></span>
<span class="line"><span>            break;</span></span>
<span class="line"><span>        case kCTCellularDataNotRestricted:</span></span>
<span class="line"><span>            NSLog(@&quot;Not Restricted&quot;);</span></span>
<span class="line"><span>            break;</span></span>
<span class="line"><span>        case kCTCellularDataRestrictedStateUnknown:</span></span>
<span class="line"><span>            NSLog(@&quot;Unknown&quot;);</span></span>
<span class="line"><span>            break;</span></span>
<span class="line"><span>        default:</span></span>
<span class="line"><span>            break;</span></span>
<span class="line"><span>    }</span></span></code></pre></div><p>date: 2017-07-16 16:00:00 author: &quot;Gao Fei&quot;</p>`,5)]))}const C=s(l,[["render",p]]);export{h as __pageData,C as default};
