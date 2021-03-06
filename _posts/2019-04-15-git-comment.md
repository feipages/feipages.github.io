---
layout:     post
title:      "git 使用汇总"
subtitle:   "备用技能"
date:       2019-04-15 14:00:00
author:     "Gao Fei"
header-img: "img/post-bg-ios9-web.jpg"
tags:
    - git
    


---

## Git配置多个SSH-Key

当有多个git账号时，比如：

a. 一个gitlab，用于公司内部的工作开发;

b. 一个github，用于自己进行一些开发活动;

### 解决方法
(1) 生成一个公司用的SSH-Key

``` 
# 在~/.ssh/目录会生成gitlab_id-rsa和gitlab_id-rsa.pub私钥和公钥。我们将gitlab_id-rsa.pub中的内容粘帖到公司GitLab服务器的SSH-key的配置中
$ ssh-keygen -t rsa -C 'xxxxx@company.com' -f ~/.ssh/gitlab_id_rsa
``` 

(2) 生成一个github用的SSH-Key

``` 
ssh-keygen -t rsa -C 'xxxxx@qq.com' -f ~/.ssh/github_id_rsa
``` 

(3) 在 ~/.ssh 目录下新建一个config文件，添加如下内容（其中Host和HostName填写git服务器的域名，IdentityFile指定私钥的路径）

``` 
# 添加config配置文件
# vi ~/.ssh/config
# 或者
# touch ~/.ssh/config

# 文件内容如下
# gitlab
Host gitlab.com
HostName gitlab.com
PreferredAuthentications publickey
IdentityFile ~/.ssh/gitlab_id_rsa
# github
Host github.com
HostName github.com
PreferredAuthentications publickey
IdentityFile ~/.ssh/github_id_rsa
``` 
(4) 用ssh命令分别测试

``` 
$ ssh -T git@gitlab.com
$ ssh -T git@github.com
``` 

## 常见的git命令

### 新建代码库
``` 
# 在当前目录新建一个Git代码库
$ git init

# 新建一个目录，将其初始化为Git代码库
$ git init [project-name]

# 下载一个项目和它的整个代码历史
$ git clone [url]
``` 
### 配置
```
# 显示当前的Git配置
$ git config --list

# 编辑Git配置文件
$ git config -e [--global]

# 设置提交代码时的用户信息
$ git config [--global] user.name "[name]"
$ git config [--global] user.email "[email address]"
```

### 增加/删除文件
``` 
# 添加指定文件到暂存区
$ git add [file1] [file2] ...

# 添加指定目录到暂存区，包括子目录
$ git add [dir]

# 添加当前目录的所有文件到暂存区
$ git add .

# 添加每个变化前，都会要求确认
# 对于同一个文件的多处变化，可以实现分次提交
$ git add -p

# 删除工作区文件，并且将这次删除放入暂存区
$ git rm [file1] [file2] ...

# 停止追踪指定文件，但该文件会保留在工作区
$ git rm --cached [file]

# 改名文件，并且将这个改名放入暂存区
$ git mv [file-original] [file-renamed]
```
### 代码提交
```
# 提交暂存区到仓库区
$ git commit -m [message]

# 提交暂存区的指定文件到仓库区
$ git commit [file1] [file2] ... -m [message]

# 提交工作区自上次commit之后的变化，直接到仓库区
$ git commit -a

# 提交时显示所有diff信息
$ git commit -v

# 使用一次新的commit，替代上一次提交
# 如果代码没有任何新变化，则用来改写上一次commit的提交信息
$ git commit --amend -m [message]

# 重做上一次commit，并包括指定文件的新变化
$ git commit --amend [file1] [file2] ...
```
### 分支
```
# 列出所有本地分支
$ git branch

# 列出所有远程分支
$ git branch -r

# 列出所有本地分支和远程分支
$ git branch -a

# 新建一个分支，但依然停留在当前分支
$ git branch [branch-name]

# 新建一个分支，并切换到该分支
$ git checkout -b [branch]

# 新建一个分支，指向指定commit
$ git branch [branch] [commit]

# 新建一个分支，与指定的远程分支建立追踪关系
$ git branch --track [branch] [remote-branch]

# 切换到指定分支，并更新工作区
$ git checkout [branch-name]

# 切换到上一个分支
$ git checkout -

# 建立追踪关系，在现有分支与指定的远程分支之间
$ git branch --set-upstream [branch] [remote-branch]

# 合并指定分支到当前分支
$ git merge [branch]

# 选择一个commit，合并进当前分支
$ git cherry-pick [commit]

# 删除分支
$ git branch -d [branch-name]

# 删除远程分支
$ git push origin --delete [branch-name]
$ git branch -dr [remote/branch]
```

### 标签
```
# 列出所有tag
$ git tag

# 新建一个tag在当前commit
$ git tag [tag]

# 新建一个tag在指定commit
$ git tag [tag] [commit]

# 删除本地tag
$ git tag -d [tag]

# 删除远程tag
$ git push origin :refs/tags/[tagName]

# 查看tag信息
$ git show [tag]

# 提交指定tag
$ git push [remote] [tag]

# 提交所有tag
$ git push [remote] --tags

# 新建一个分支，指向某个tag
$ git checkout -b [branch] [tag]

# 切换为由远程创建的分支
$ git checkout -b [branch] [remote/branch]
```
####  查看信息
```
# 显示有变更的文件
$ git status

# 显示当前分支的版本历史
$ git log
```

####  远程同步
```
# 下载远程仓库的所有变动
$ git fetch [remote]

# 显示所有远程仓库
$ git remote -v

# 显示某个远程仓库的信息
$ git remote show [remote]

# 增加一个新的远程仓库，并命名
$ git remote add [shortname] [url]

# 更新远程仓库地址
$ git remote set-url [shortname] [url]
$ git remote set-url origin http://originproject.git

# 修改远程仓库名
$ git remote rename [current-shortname] [new-shortname]

# 取回远程仓库的变化，并与本地分支合并，
$ git pull [remote] [branch]

# 上传本地指定分支到远程仓库，默认提交到与本地分支对应的远程分支上
$ git push [remote] [branch]

上传本地指定分支到远程仓库，创建与到与本地分支对应的远程分支上
$  git push --set-upstream [remote] [branch]

# 强行推送当前分支到远程仓库，即使有冲突
$ git push [remote] --force

# 推送所有分支到远程仓库
$ git push [remote] --all

# 推送某一个commit 到远程仓库
$ git push [remote name] [commit hash]:[remote branch name]

# 推送所有tag到远程仓库
$ git push [remote] --tags


```
####  回滚
```
# 回退到上个版本
$ git reset --hard HEAD^
# 回退到前3次提交之前，以此类推，回退到n次提交之前  
$ git reset --hard HEAD~3
# 退到/进到 指定commit的sha码        
$ git reset --hard [commit_id] 
# 强制推到远程
$ git push origin HEAD --force    

```


