import{_ as e,C as s,c as o,o as p,ag as r,G as i,j as n}from"./chunks/framework.BHpayLOB.js";const _=JSON.parse('{"title":"Tomcat 介绍","description":"","frontmatter":{},"headers":[],"relativePath":"backend/container/tomcat.md","filePath":"backend/container/tomcat.md"}'),l={name:"backend/container/tomcat.md"};function c(u,a,m,d,g,h){const t=s("Connector");return p(),o("div",null,[a[0]||(a[0]=r(`<h1 id="tomcat-介绍" tabindex="-1">Tomcat 介绍 <a class="header-anchor" href="#tomcat-介绍" aria-label="Permalink to &quot;Tomcat 介绍&quot;">​</a></h1><p>Tomcat用户密码 修改conf-&gt; tomcat-users.xml 文件，添加角色、用户、密码</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&lt;tomcat-users&gt;</span></span>
<span class="line"><span>&lt;!--</span></span>
<span class="line"><span>  NOTE:  By default, no user is included in the &quot;manager-gui&quot; role required</span></span>
<span class="line"><span>  to operate the &quot;/manager/html&quot; web application.  If you wish to use this app,</span></span>
<span class="line"><span>  you must define such a user - the username and password are arbitrary. It is</span></span>
<span class="line"><span>  strongly recommended that you do NOT use one of the users in the commented out</span></span>
<span class="line"><span>  section below since they are intended for use with the examples web</span></span>
<span class="line"><span>  application.</span></span>
<span class="line"><span>--&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&lt;role rolename=&quot;manager-gui&quot;/&gt;</span></span>
<span class="line"><span>&lt;role rolename=&quot;manager-script&quot;/&gt;</span></span>
<span class="line"><span>&lt;user username=&quot;tomcat&quot; password=&quot;123456&quot; roles=&quot;manager-gui,manager-script&quot;/&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&lt;/tomcat-users&gt;</span></span></code></pre></div><p>注意：使用Linux 开发过程 需要修改tomcat的访问权限</p><h2 id="_1-get-请求传送的参数包含中文字符" tabindex="-1">1.get 请求传送的参数包含中文字符 <a class="header-anchor" href="#_1-get-请求传送的参数包含中文字符" aria-label="Permalink to &quot;1.get 请求传送的参数包含中文字符&quot;">​</a></h2><p>常用的解决方式： 1.当客户端使用的UTF-8编码 将中文参数传送过来时,tomcat 默认采用iso8859-1解码 &#39;&#39;&#39; String name = request.getParameter(&quot;name&quot;); name = new String(name.getBytes(&quot;iso8859-1&quot;),&quot;utf-8&quot;); &#39;&#39;&#39;</p><p>2.在tomcat中找到server.xml文件 增加字段 URIEncoding useBodyEncodingForURI &#39;&#39;&#39;</p>`,7)),i(t,{connectionTimeout:"20000",port:"8080",protocol:"HTTP/1.1",redirectPort:"8443",URIEncoding:"UTF-8",useBodyEncodingForURI:"true"}),a[1]||(a[1]=n("p",null,"'''",-1)),a[2]||(a[2]=n("p",null,'date: 2018-08-12 16:00:00 author: "Gao Fei"',-1))])}const f=e(l,[["render",c]]);export{_ as __pageData,f as default};
