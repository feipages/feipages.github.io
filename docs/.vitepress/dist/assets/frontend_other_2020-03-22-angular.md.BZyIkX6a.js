import{_ as s,c as n,o as p,ag as e}from"./chunks/framework.BHpayLOB.js";const g=JSON.parse('{"title":"angular 入门","description":"","frontmatter":{"layout":"post","title":"angular 入门","subtitle":"基础","date":"2020-03-12T14:00:00.000Z","author":"Gao Fei","header-img":"/img/post-bg-ios9-web.jpg","tags":["git"]},"headers":[],"relativePath":"frontend/other/2020-03-22-angular.md","filePath":"frontend/other/2020-03-22-angular.md"}'),l={name:"frontend/other/2020-03-22-angular.md"};function i(t,a,o,c,r,d){return p(),n("div",null,a[0]||(a[0]=[e(`<h2 id="angular-入门" tabindex="-1">angular 入门 <a class="header-anchor" href="#angular-入门" aria-label="Permalink to &quot;angular 入门&quot;">​</a></h2><h3 id="_1-angular" tabindex="-1">1. angular <a class="header-anchor" href="#_1-angular" aria-label="Permalink to &quot;1. angular&quot;">​</a></h3><p>特点</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span># 安装ionic 命令行工具</span></span>
<span class="line"><span>$ sudo npm install -g @angular/cli</span></span></code></pre></div><h3 id="_2-初始化项目" tabindex="-1">2. 初始化项目 <a class="header-anchor" href="#_2-初始化项目" aria-label="Permalink to &quot;2. 初始化项目&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>cd 到需要创建项目的目录下</span></span>
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
<span class="line"><span>$ ng g component components/home</span></span></code></pre></div><h4 id="_2-1-安装插件" tabindex="-1">2.1 安装插件 <a class="header-anchor" href="#_2-1-安装插件" aria-label="Permalink to &quot;2.1 安装插件&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>cd 到需要创建项目的目录下</span></span>
<span class="line"><span>配置在生产环境</span></span>
<span class="line"><span>$ cnpm install xxx --save</span></span>
<span class="line"><span>配置在开发环境</span></span>
<span class="line"><span>$ cnpm install xxx --save-dev</span></span></code></pre></div><h3 id="_3-组件" tabindex="-1">3. 组件 <a class="header-anchor" href="#_3-组件" aria-label="Permalink to &quot;3. 组件&quot;">​</a></h3><h4 id="_3-1-插值语法和表达式" tabindex="-1">3.1 插值语法和表达式 <a class="header-anchor" href="#_3-1-插值语法和表达式" aria-label="Permalink to &quot;3.1 插值语法和表达式&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span># 1. 绑定数据</span></span>
<span class="line"><span>{{xxx}}</span></span>
<span class="line"><span>本地图片数据</span></span>
<span class="line"><span>src = &#39;assets/images/xx.png&#39;</span></span></code></pre></div><h4 id="_3-2-绑定" tabindex="-1">3.2 绑定 <a class="header-anchor" href="#_3-2-绑定" aria-label="Permalink to &quot;3.2 绑定&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>值绑定 []，</span></span>
<span class="line"><span>事件绑定 ()，</span></span>
<span class="line"><span>双向绑定[()]</span></span>
<span class="line"><span></span></span>
<span class="line"><span>值绑定</span></span>
<span class="line"><span>[innerHTML]= &quot;xxxxx&quot;</span></span>
<span class="line"><span>[src]=&quot;属性&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>事件绑定</span></span>
<span class="line"><span> (click)=&quot;action()&quot;</span></span>
<span class="line"><span> (keydown)=&quot;action($event)&quot;</span></span>
<span class="line"><span> </span></span>
<span class="line"><span> 双向绑定,用于表单元素</span></span>
<span class="line"><span> import { FormsModule} from &#39;@angular/forms&#39;;</span></span>
<span class="line"><span> imports: [</span></span>
<span class="line"><span>    FormsModule</span></span>
<span class="line"><span>  ],</span></span>
<span class="line"><span>  [(ngModel)]=&quot;binding&quot;</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>action(e){</span></span>
<span class="line"><span>console.log(e.target.value)</span></span>
<span class="line"><span>}</span></span></code></pre></div><h4 id="_3-3-内置结构型指令用法" tabindex="-1">3.3 内置结构型指令用法 <a class="header-anchor" href="#_3-3-内置结构型指令用法" aria-label="Permalink to &quot;3.3 内置结构型指令用法&quot;">​</a></h4><p>循环数据</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>*ngFor =&quot;let item of list&quot;</span></span></code></pre></div><p>条件判断</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>*ngIf =&quot;flag&quot;</span></span></code></pre></div><p>选择</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>*ngSwitch</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&lt;div [ngSwitch]=&quot;conditionExpression&quot;&gt;</span></span>
<span class="line"><span>    &lt;div *ngSwitchCase=&quot;expression&quot;&gt;output&lt;/div&gt;</span></span>
<span class="line"><span>    &lt;div *ngSwitchDefault&gt;output2&lt;/div&gt;</span></span>
<span class="line"><span>&lt;/div&gt;</span></span></code></pre></div><h4 id="_3-3-内置属性型指令用法" tabindex="-1">3.3 内置属性型指令用法 <a class="header-anchor" href="#_3-3-内置属性型指令用法" aria-label="Permalink to &quot;3.3 内置属性型指令用法&quot;">​</a></h4><p>ngCalss,ngStyle,ngModel</p><p>管道 使用 |</p><p>安全取值 使用 ？</p><h3 id="_4-组件间通讯" tabindex="-1">4. 组件间通讯 <a class="header-anchor" href="#_4-组件间通讯" aria-label="Permalink to &quot;4. 组件间通讯&quot;">​</a></h3><p>父子组件之间的交互 @Input/@Output/模板变量/@ViewChild</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>@ViewChild</span></span>
<span class="line"><span>1.在dom中命名</span></span>
<span class="line"><span></span></span>
<span class="line"><span>2. 在业务逻辑里面引入ViewChild</span></span>
<span class="line"><span>3. 写在类里面</span></span>
<span class="line"><span>4. ngAfterViewInit生命周期函数里面获取dom</span></span>
<span class="line"><span>5.</span></span></code></pre></div><p>非父子组件之间的交互 service/localStorage</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>1. ng g service services/storge</span></span>
<span class="line"><span>2. app.modules.ts 中引入刚才创建的服务</span></span>
<span class="line"><span>	import {StorgeService} from &#39;./services/storge.service&#39;;</span></span>
<span class="line"><span>	providers: [StorgeService],</span></span>
<span class="line"><span>3. 在使用的组件中导入</span></span>
<span class="line"><span>	// 引入服务</span></span>
<span class="line"><span>	import {StorgeService} from &#39;../../services/storge.service&#39;;</span></span>
<span class="line"><span>	// 初始化方法中申明</span></span>
<span class="line"><span>	constructor( public storge:StorgeService) { </span></span>
<span class="line"><span>    this.storge.get();</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  }</span></span></code></pre></div><p>利用session、路由参数来进行通讯</p><p>生命周期函数</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>ngOninit()</span></span>
<span class="line"><span>在angular</span></span>
<span class="line"><span>ngAfterviewInit()</span></span>
<span class="line"><span>ngOnDestroy()</span></span></code></pre></div><p>常见异步编程 回调函数 事件监听/发布订阅 Promise Rxjs 一种针对异步编程工具，或者叫响应式扩展编程</p><p>UI libraries PrimeNG :最完善的开源库 NG-Zorro: 阿里云开源库 Jigsaw: 中兴通讯 Clarity 来自vmware ionic: 移动端组件库</p><p>ng2-admin JHipster 基于springMVC</p><p>vs code debug angular</p><p>font awesome</p><p>插值语法和表达式</p><h3 id="_5-路由" tabindex="-1">5. 路由 <a class="header-anchor" href="#_5-路由" aria-label="Permalink to &quot;5. 路由&quot;">​</a></h3>`,40)]))}const u=s(l,[["render",i]]);export{g as __pageData,u as default};
