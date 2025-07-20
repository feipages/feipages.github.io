import{_ as n,c as a,o as p,ag as e}from"./chunks/framework.BHpayLOB.js";const u=JSON.parse('{"title":"ios 自动打包脚本","description":"","frontmatter":{},"headers":[],"relativePath":"frontend/ios/xcode build.md","filePath":"frontend/ios/xcode build.md"}'),l={name:"frontend/ios/xcode build.md"};function t(i,s,c,o,r,h){return p(),a("div",null,s[0]||(s[0]=[e(`<h1 id="ios-自动打包脚本" tabindex="-1">ios 自动打包脚本 <a class="header-anchor" href="#ios-自动打包脚本" aria-label="Permalink to &quot;ios 自动打包脚本&quot;">​</a></h1><h3 id="_1-配置导出plist文件" tabindex="-1">1. 配置导出plist文件 <a class="header-anchor" href="#_1-配置导出plist文件" aria-label="Permalink to &quot;1. 配置导出plist文件&quot;">​</a></h3><p>在项目工程相同的目录下创建 ExportOptions_UAT.plist 文件，文件的内容如下：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&lt;?xml version=&quot;1.0&quot; encoding=&quot;UTF-8&quot;?&gt;</span></span>
<span class="line"><span>&lt;!DOCTYPE plist PUBLIC &quot;-//Apple//DTD PLIST 1.0//EN&quot; &quot;http://www.apple.com/DTDs/PropertyList-1.0.dtd&quot;&gt;</span></span>
<span class="line"><span>&lt;plist version=&quot;1.0&quot;&gt;</span></span>
<span class="line"><span>&lt;dict&gt;</span></span>
<span class="line"><span>	&lt;key&gt;compileBitcode&lt;/key&gt;</span></span>
<span class="line"><span>	&lt;false/&gt;</span></span>
<span class="line"><span>	&lt;key&gt;destination&lt;/key&gt;</span></span>
<span class="line"><span>	&lt;string&gt;export&lt;/string&gt;</span></span>
<span class="line"><span>	&lt;key&gt;method&lt;/key&gt;</span></span>
<span class="line"><span>	&lt;!-- 企业证书打包 --&gt;</span></span>
<span class="line"><span>	&lt;string&gt;enterprise&lt;/string&gt;</span></span>
<span class="line"><span>	&lt;key&gt;provisioningProfiles&lt;/key&gt;</span></span>
<span class="line"><span>	&lt;dict&gt;</span></span>
<span class="line"><span>		&lt;!-- bundle id --&gt;</span></span>
<span class="line"><span>		&lt;key&gt;com.xxx.xxxx.xxxx.uat&lt;/key&gt;</span></span>
<span class="line"><span>		&lt;!-- 描述文件的名称 --&gt;</span></span>
<span class="line"><span>		&lt;string&gt;DemoUAT_Distribution&lt;/string&gt;</span></span>
<span class="line"><span>	&lt;/dict&gt;</span></span>
<span class="line"><span>	&lt;key&gt;signingCertificate&lt;/key&gt;</span></span>
<span class="line"><span>	&lt;string&gt;iPhone Distribution&lt;/string&gt;</span></span>
<span class="line"><span>	&lt;key&gt;signingStyle&lt;/key&gt;</span></span>
<span class="line"><span>	&lt;string&gt;manual&lt;/string&gt;</span></span>
<span class="line"><span>	&lt;key&gt;stripSwiftSymbols&lt;/key&gt;</span></span>
<span class="line"><span>	&lt;true/&gt;</span></span>
<span class="line"><span>	&lt;key&gt;teamID&lt;/key&gt;</span></span>
<span class="line"><span>	&lt;string&gt;P*******3X&lt;/string&gt;</span></span>
<span class="line"><span>&lt;/dict&gt;</span></span>
<span class="line"><span>&lt;/plist&gt;</span></span></code></pre></div><h3 id="_1-配置shell脚本" tabindex="-1">1. 配置shell脚本 <a class="header-anchor" href="#_1-配置shell脚本" aria-label="Permalink to &quot;1. 配置shell脚本&quot;">​</a></h3><p>在项目工程相同的目录下创建 uat_shell.sh 文件，文件的内容如下：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>#使用方法</span></span>
<span class="line"><span></span></span>
<span class="line"><span>if [ ! -d ./IPADir ];</span></span>
<span class="line"><span>then</span></span>
<span class="line"><span>mkdir -p IPADir;</span></span>
<span class="line"><span>fi</span></span>
<span class="line"><span></span></span>
<span class="line"><span>#工程绝对路径</span></span>
<span class="line"><span>project_path=$(cd \`dirname $0\`; pwd)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>#工程名 将XXX替换成自己的工程名，比如 Demo</span></span>
<span class="line"><span>project_name=XXX</span></span>
<span class="line"><span></span></span>
<span class="line"><span>#scheme名 将XXX替换成自己的工程的sheme名, 为 target name，比如 Demo_Uat</span></span>
<span class="line"><span>scheme_name=XXX</span></span>
<span class="line"><span></span></span>
<span class="line"><span>#打包模式 Debug/Release</span></span>
<span class="line"><span>development_mode=Release</span></span>
<span class="line"><span></span></span>
<span class="line"><span>#build文件夹路径</span></span>
<span class="line"><span>build_path=\${project_path}/build</span></span>
<span class="line"><span></span></span>
<span class="line"><span>#plist文件所在路径</span></span>
<span class="line"><span>exportOptionsPlistPath=\${project_path}/ExportOptions_UAT.plist</span></span>
<span class="line"><span></span></span>
<span class="line"><span>#导出.ipa文件所在路径</span></span>
<span class="line"><span>exportIpaPath=\${project_path}/IPADir/\${development_mode}</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>echo &quot;Place enter the number you want to export ? [ 1:app-store 2:enterprise] &quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>##</span></span>
<span class="line"><span>read number</span></span>
<span class="line"><span>while([[ $number != 1 ]] &amp;&amp; [[ $number != 2 ]])</span></span>
<span class="line"><span>do</span></span>
<span class="line"><span>echo &quot;Error! Should enter 1 or 2&quot;</span></span>
<span class="line"><span>echo &quot;Place enter the number you want to export ? [ 1:app-store 2:enterprise] &quot;</span></span>
<span class="line"><span>read number</span></span>
<span class="line"><span>done</span></span>
<span class="line"><span></span></span>
<span class="line"><span>if [ $number == 1 ];then</span></span>
<span class="line"><span>development_mode=Release</span></span>
<span class="line"><span>exportOptionsPlistPath=\${project_path}/exportAppstore.plist</span></span>
<span class="line"><span>else</span></span>
<span class="line"><span>development_mode=Release</span></span>
<span class="line"><span>exportOptionsPlistPath=\${project_path}/ExportOptions_UAT.plist</span></span>
<span class="line"><span>fi</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>echo &#39;///-----------&#39;</span></span>
<span class="line"><span>echo &#39;/// 正在清理工程&#39;</span></span>
<span class="line"><span>echo &#39;///-----------&#39;</span></span>
<span class="line"><span>xcodebuild \\</span></span>
<span class="line"><span>clean -configuration \${development_mode} -quiet  || exit</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>echo &#39;///--------&#39;</span></span>
<span class="line"><span>echo &#39;/// 清理完成&#39;</span></span>
<span class="line"><span>echo &#39;///--------&#39;</span></span>
<span class="line"><span>echo &#39;&#39;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>echo &#39;///-----------&#39;</span></span>
<span class="line"><span>echo &#39;/// 正在编译工程:&#39;\${development_mode}</span></span>
<span class="line"><span>echo &#39;///-----------&#39;</span></span>
<span class="line"><span>xcodebuild \\</span></span>
<span class="line"><span>archive -workspace \${project_path}/\${project_name}.xcworkspace \\</span></span>
<span class="line"><span>-scheme \${scheme_name} \\</span></span>
<span class="line"><span>-configuration \${development_mode} \\</span></span>
<span class="line"><span>-archivePath \${build_path}/\${project_name}.xcarchive  -quiet  || exit</span></span>
<span class="line"><span></span></span>
<span class="line"><span>echo &#39;///--------&#39;</span></span>
<span class="line"><span>echo &#39;/// 编译完成&#39;</span></span>
<span class="line"><span>echo &#39;///--------&#39;</span></span>
<span class="line"><span>echo &#39;&#39;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>echo &#39;///----------&#39;</span></span>
<span class="line"><span>echo &#39;/// 开始ipa打包&#39;</span></span>
<span class="line"><span>echo &#39;///----------&#39;</span></span>
<span class="line"><span>xcodebuild -exportArchive -archivePath \${build_path}/\${project_name}.xcarchive \\</span></span>
<span class="line"><span>-configuration \${development_mode} \\</span></span>
<span class="line"><span>-exportPath \${exportIpaPath} \\</span></span>
<span class="line"><span>-exportOptionsPlist \${exportOptionsPlistPath} \\</span></span>
<span class="line"><span>-quiet || exit</span></span>
<span class="line"><span></span></span>
<span class="line"><span>if [ -e $exportIpaPath/$scheme_name.ipa ]; then</span></span>
<span class="line"><span>echo &#39;///----------&#39;</span></span>
<span class="line"><span>echo &#39;/// ipa包已导出&#39;</span></span>
<span class="line"><span>echo &#39;///----------&#39;</span></span>
<span class="line"><span>open $exportIpaPath</span></span>
<span class="line"><span>else</span></span>
<span class="line"><span>echo &#39;///-------------&#39;</span></span>
<span class="line"><span>echo &#39;/// ipa包导出失败 &#39;</span></span>
<span class="line"><span>echo &#39;///-------------&#39;</span></span>
<span class="line"><span>fi</span></span>
<span class="line"><span>echo &#39;///------------&#39;</span></span>
<span class="line"><span>echo &#39;/// 打包ipa完成  &#39;</span></span>
<span class="line"><span>echo &#39;///-----------=&#39;</span></span>
<span class="line"><span>echo &#39;&#39;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>echo &#39;///-------------&#39;</span></span>
<span class="line"><span>echo &#39;/// 开始发布ipa包 &#39;</span></span>
<span class="line"><span>echo &#39;///-------------&#39;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>if [ $number == 1 ];then</span></span>
<span class="line"><span></span></span>
<span class="line"><span>#验证并上传到App Store</span></span>
<span class="line"><span># 将-u 后面的XXX替换成自己的AppleID的账号，-p后面的XXX替换成自己的密码</span></span>
<span class="line"><span>altoolPath=&quot;/Applications/Xcode.app/Contents/Applications/Application Loader.app/Contents/Frameworks/ITunesSoftwareService.framework/Versions/A/Support/altool&quot;</span></span>
<span class="line"><span>&quot;$altoolPath&quot; --validate-app -f \${exportIpaPath}/\${scheme_name}.ipa -u XXX -p XXX -t ios --output-format xml</span></span>
<span class="line"><span>&quot;$altoolPath&quot; --upload-app -f \${exportIpaPath}/\${scheme_name}.ipa -u  XXX -p XXX -t ios --output-format xml</span></span>
<span class="line"><span>else</span></span>
<span class="line"><span></span></span>
<span class="line"><span>#上传到Fir</span></span>
<span class="line"><span># 将XXX替换成自己的Fir平台的token</span></span>
<span class="line"><span>fir login -T XXX</span></span>
<span class="line"><span>fir publish $exportIpaPath/$scheme_name.ipa</span></span>
<span class="line"><span></span></span>
<span class="line"><span>fi</span></span>
<span class="line"><span></span></span>
<span class="line"><span>exit 0</span></span></code></pre></div><p>date: 2020-12-17 14:00:00 author: &quot;Gao Fei&quot;</p>`,8)]))}const g=n(l,[["render",t]]);export{u as __pageData,g as default};
