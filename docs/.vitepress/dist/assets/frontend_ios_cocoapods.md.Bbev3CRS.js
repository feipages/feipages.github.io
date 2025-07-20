import{_ as a,c as n,o as p,ag as e}from"./chunks/framework.BHpayLOB.js";const u=JSON.parse('{"title":"cocoapods 入门","description":"","frontmatter":{},"headers":[],"relativePath":"frontend/ios/cocoapods.md","filePath":"frontend/ios/cocoapods.md"}'),o={name:"frontend/ios/cocoapods.md"};function c(l,s,t,i,d,r){return p(),n("div",null,s[0]||(s[0]=[e(`<h1 id="cocoapods-入门" tabindex="-1">cocoapods 入门 <a class="header-anchor" href="#cocoapods-入门" aria-label="Permalink to &quot;cocoapods 入门&quot;">​</a></h1><h2 id="cocoapods-入门-1" tabindex="-1">COCOAPODS 入门 <a class="header-anchor" href="#cocoapods-入门-1" aria-label="Permalink to &quot;COCOAPODS 入门&quot;">​</a></h2><h3 id="_1-cocoapods" tabindex="-1">1. cocoapods <a class="header-anchor" href="#_1-cocoapods" aria-label="Permalink to &quot;1. cocoapods&quot;">​</a></h3><p>特点</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span># 查看gem源地址，如果显示为默认源 https://rubygems.org/，需要考虑替换</span></span>
<span class="line"><span>$ $gem sources -l</span></span>
<span class="line"><span># 移除系统 ruby 默认源</span></span>
<span class="line"><span>$gem sources --remove https://rubygems.org/</span></span>
<span class="line"><span># 使用新的源</span></span>
<span class="line"><span>$gem source -a https://gems.ruby-china.com</span></span>
<span class="line"><span># 验证是否安装成功</span></span>
<span class="line"><span>$gem sources -l</span></span>
<span class="line"><span># 安装最新版本</span></span>
<span class="line"><span>$sudo gem install -n /usr/local/bin cocoapods</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 安装指定版本</span></span>
<span class="line"><span>$sudo gem install -n /usr/local/bin cocoapods -v 1.0.0</span></span>
<span class="line"><span># 安装</span></span>
<span class="line"><span>$pod setup</span></span></code></pre></div><h3 id="_2-初始化项目" tabindex="-1">2. 初始化项目 <a class="header-anchor" href="#_2-初始化项目" aria-label="Permalink to &quot;2. 初始化项目&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>cd 到需要创建项目的目录下</span></span>
<span class="line"><span>$ ng new &lt;projectname&gt;</span></span>
<span class="line"><span># 1. 先创建，再安装</span></span>
<span class="line"><span>$ ng new &lt;projectname&gt; --skip-install</span></span>
<span class="line"><span>$ cd &lt;projectname&gt;</span></span>
<span class="line"><span>$ cnpm install</span></span>
<span class="line"><span></span></span>
<span class="line"><span>#运行</span></span>
<span class="line"><span>$ ng serve --open</span></span>
<span class="line"><span></span></span>
<span class="line"><span>#创建组件,在app目录下，创建components目录并创建home组件</span></span>
<span class="line"><span>$ ng g component components/home</span></span></code></pre></div><p>date: 2020-03-24 14:00:00 author: &quot;Gao Fei&quot;</p>`,8)]))}const m=a(o,[["render",c]]);export{u as __pageData,m as default};
