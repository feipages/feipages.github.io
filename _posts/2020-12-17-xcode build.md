---
layout:     post
title:      "ios 自动打包脚本"
subtitle:   "工具"
date:       2020-12-17 14:00:00
author:     "Gao Fei"
header-img: "img/post-bg-ios9-web.jpg"
tags:
    - tool
    


---

## ios 自动打包脚本

### 1. 配置导出plist文件
在项目工程相同的目录下创建 ExportOptions_UAT.plist 文件，文件的内容如下：


``` 
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
	<key>compileBitcode</key>
	<false/>
	<key>destination</key>
	<string>export</string>
	<key>method</key>
	<!-- 企业证书打包 -->
	<string>enterprise</string>
	<key>provisioningProfiles</key>
	<dict>
		<!-- bundle id -->
		<key>com.xxx.xxxx.xxxx.uat</key>
		<!-- 描述文件的名称 -->
		<string>DemoUAT_Distribution</string>
	</dict>
	<key>signingCertificate</key>
	<string>iPhone Distribution</string>
	<key>signingStyle</key>
	<string>manual</string>
	<key>stripSwiftSymbols</key>
	<true/>
	<key>teamID</key>
	<string>P*******3X</string>
</dict>
</plist>
``` 

### 1. 配置shell脚本

在项目工程相同的目录下创建 uat_shell.sh 文件，文件的内容如下：

``` 
#使用方法

if [ ! -d ./IPADir ];
then
mkdir -p IPADir;
fi

#工程绝对路径
project_path=$(cd `dirname $0`; pwd)

#工程名 将XXX替换成自己的工程名，比如 Demo
project_name=XXX

#scheme名 将XXX替换成自己的工程的sheme名, 为 target name，比如 Demo_Uat
scheme_name=XXX

#打包模式 Debug/Release
development_mode=Release

#build文件夹路径
build_path=${project_path}/build

#plist文件所在路径
exportOptionsPlistPath=${project_path}/ExportOptions_UAT.plist

#导出.ipa文件所在路径
exportIpaPath=${project_path}/IPADir/${development_mode}


echo "Place enter the number you want to export ? [ 1:app-store 2:enterprise] "

##
read number
while([[ $number != 1 ]] && [[ $number != 2 ]])
do
echo "Error! Should enter 1 or 2"
echo "Place enter the number you want to export ? [ 1:app-store 2:enterprise] "
read number
done

if [ $number == 1 ];then
development_mode=Release
exportOptionsPlistPath=${project_path}/exportAppstore.plist
else
development_mode=Release
exportOptionsPlistPath=${project_path}/ExportOptions_UAT.plist
fi


echo '///-----------'
echo '/// 正在清理工程'
echo '///-----------'
xcodebuild \
clean -configuration ${development_mode} -quiet  || exit


echo '///--------'
echo '/// 清理完成'
echo '///--------'
echo ''

echo '///-----------'
echo '/// 正在编译工程:'${development_mode}
echo '///-----------'
xcodebuild \
archive -workspace ${project_path}/${project_name}.xcworkspace \
-scheme ${scheme_name} \
-configuration ${development_mode} \
-archivePath ${build_path}/${project_name}.xcarchive  -quiet  || exit

echo '///--------'
echo '/// 编译完成'
echo '///--------'
echo ''

echo '///----------'
echo '/// 开始ipa打包'
echo '///----------'
xcodebuild -exportArchive -archivePath ${build_path}/${project_name}.xcarchive \
-configuration ${development_mode} \
-exportPath ${exportIpaPath} \
-exportOptionsPlist ${exportOptionsPlistPath} \
-quiet || exit

if [ -e $exportIpaPath/$scheme_name.ipa ]; then
echo '///----------'
echo '/// ipa包已导出'
echo '///----------'
open $exportIpaPath
else
echo '///-------------'
echo '/// ipa包导出失败 '
echo '///-------------'
fi
echo '///------------'
echo '/// 打包ipa完成  '
echo '///-----------='
echo ''

echo '///-------------'
echo '/// 开始发布ipa包 '
echo '///-------------'

if [ $number == 1 ];then

#验证并上传到App Store
# 将-u 后面的XXX替换成自己的AppleID的账号，-p后面的XXX替换成自己的密码
altoolPath="/Applications/Xcode.app/Contents/Applications/Application Loader.app/Contents/Frameworks/ITunesSoftwareService.framework/Versions/A/Support/altool"
"$altoolPath" --validate-app -f ${exportIpaPath}/${scheme_name}.ipa -u XXX -p XXX -t ios --output-format xml
"$altoolPath" --upload-app -f ${exportIpaPath}/${scheme_name}.ipa -u  XXX -p XXX -t ios --output-format xml
else

#上传到Fir
# 将XXX替换成自己的Fir平台的token
fir login -T XXX
fir publish $exportIpaPath/$scheme_name.ipa

fi

exit 0


``` 


 



