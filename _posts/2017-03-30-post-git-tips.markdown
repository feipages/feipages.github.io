---
layout:     post
title:      "Git Tips"
subtitle:   "How to use git"
date:       2017-03-30 16:00:00
author:     "Gao Fei"
header-img: "img/post-bg-2015.jpg"
tags:
    - Git

---

## pull request 操作流程

<!--远程代码-->
$ git remote -v

`origin	http://58.250.71.52:8081/gaofei/FSMobileAssistant.git (fetch)
origin	http://58.250.71.52:8081/gaofei/FSMobileAssistant.git (push)`

$ git remote add http://58.250.71.52:8081/iOS_Group/FSMobileAssistant.git

usage: git remote add [<options>] <name> <url>

   
`-f, --fetch           fetch the remote branches
    --tags                import all tags and associated objects when fetching
                          or do not fetch any tag at all (--no-tags)
    -t, --track <branch>  branch(es) to track
    -m, --master <branch>
                          master branch
    --mirror[=<push|fetch>]
                          set up remote as a mirror to push to or fetch from`
                          
$ git remote add upstream http://58.250.71.52:8081/iOS_Group/FSMobileAssistant.git

$ git remote -v

origin	http://58`.250.71.52:8081/gaofei/FSMobileAssistant.git (fetch)
origin	http://58.250.71.52:8081/gaofei/FSMobileAssistant.git (push)
upstream	http://58.250.71.52:8081/iOS_Group/FSMobileAssistant.git (fetch)
upstream	http://58.250.71.52:8081/iOS_Group/FSMobileAssistant.git (push)`
bogon:FSMobileAssistant awei$ git fetch --all

`Fetching origin
Fetching upstream
remote: Counting objects: 166, done.
remote: Compressing objects: 100% (98/98), done.
remote: Total 166 (delta 124), reused 99 (delta 66)
Receiving objects: 100% (166/166), 69.78 KiB | 0 bytes/s, done.
Resolving deltas: 100% (124/124), completed with 48 local objects.
From http://58.250.71.52:8081/iOS_Group/FSMobileAssistant
 * [new branch]      master     -> upstream/master
 * [new branch]      mvvm       -> upstream/mvvm`
$ git merge upstream/master origin/master
`Auto-merging MobileAssistant/Vendors/XHDatePicker/XHDatePickerView.m
Auto-merging MobileAssistant/Vendors/FSAlertTools/FSAlertTools.m
Auto-merging MobileAssistant/Vendors/FSAlertTools/FSAlertTools.h
CONFLICT (modify/delete): MobileAssistant/Util/AlertUtil.m deleted in upstream/master and modified in HEAD. Version HEAD of MobileAssistant/Util/AlertUtil.m left in tree.
CONFLICT (modify/delete): MobileAssistant/Util/AlertUtil.h deleted in upstream/master and modified in HEAD. Version HEAD of MobileAssistant/Util/AlertUtil.h left in tree.
Auto-merging MobileAssistant/Sections/Personal Center/ViewController/AboutVC.m
Auto-merging MobileAssistant/Sections/Personal Center/TouchIDUtil/TouchIDUtil.m
Auto-merging MobileAssistant/Sections/Personal Center/TouchIDUtil/KeyChainManager.m
Auto-merging MobileAssistant/Sections/Personal Center/LoginAndRegister/ViewController/SetNewPwdVC.m
Auto-merging MobileAssistant/Sections/Personal Center/LoginAndRegister/ViewController/RegisterVC.m
Auto-merging MobileAssistant/Sections/Personal Center/LoginAndRegister/ViewController/PwdInputVC.m
Auto-merging MobileAssistant/Sections/Personal Center/LoginAndRegister/ViewController/ForgetPwdVC.m
Auto-merging MobileAssistant/Sections/Main/CompanyInfo/Controller/FSCompanyInfoController.m
Auto-merging MobileAssistant/Sections/Approval/CustomerUI/DetailView/ADetailReasonCell.m
Auto-merging MobileAssistant/Sections/Approval/CustomerUI/DetailView/ADetailNameCell.m
Auto-merging MobileAssistant/Sections/Approval/CustomerUI/DetailView/ADetailDescriptionCell.m
Automatic merge failed; fix conflicts and then commit the result.`

`整体流程如下：
第一步：
bogon:FSMobileAssistant awei$ git add .
第二步：
bogon:FSMobileAssistant awei$ git commit -m "sure delete AlertUtil"
[master b989627] sure delete AlertUtil
第三步：
bogon:FSMobileAssistant awei$ git fetch --all
Fetching origin
Fetching upstream
第四步：
bogon:FSMobileAssistant awei$ git merge upstream/master origin/master
Already up-to-date.
第五步：
bogon:FSMobileAssistant awei$ git push`
`Counting objects: 209, done.
Delta compression using up to 4 threads.
Compressing objects: 100% (84/84), done.
Writing objects: 100% (209/209), 171.21 KiB | 0 bytes/s, done.
Total 209 (delta 153), reused 162 (delta 123)
To http://58.250.71.52:8081/gaofei/FSMobileAssistant.git
   1e7ae50..b989627  master -> master
bogon:FSMobileAssistant awei$`


## 一. 在合并远程代码的时候，或许会出现以下问题：

I'm in the process of learning github on mac (command-line) and whenever I do git pull origin master i get this

```# Please enter a commit message to explain why this merge is necessary,
# especially if it merges an updated upstream into a topic branch.
#
# Lines starting with '#' will be ignored, and an empty message aborts
# the commit.
~                                                                               
~                                                                               
~                                                                               
~                                                                               
~                                                                               
~                                                                               
~                                                                               
~                                                                               
~                                                                               
~                                                                               
~                                                                               
~                                                                               
~                                                                               
~                                                                               
~                                                                               
~                                                                               
".git/MERGE_MSG" 7L, 293C
```
两种解决方式：
方式一：You're in the text editor, vim! It's a modal text editor, so you would need to:
	1.	Press ==i== to enter insert mode.
	2.	Now you can type your message, as if you were in a normal (non-modal) text editor.
	3.	Press ==esc== to go back to command mode.
	4.	Then type *:w* followed by ==enter== to save.
	5.	Finally *:q* followed by ==enter== to quit.
	6. 
方式二：
Make it simple.
Type *:wq* and ==enter==

2017-04-20 高飞


