---
layout:     post
title:      "杂记"
subtitle:   "琐碎的记录"
date:       2017-08-11 16:00:00
author:     "Gao Fei"
header-img: "img/post-bg-2015.jpg"
tags:
    - Lock
    - Cache

---

## 数据存储方式对比
 
1. plist文件
 可以存储的数据类型：Number(interger,real)，String，Boolean(false,true),Date,Data,Array,Dictionary
 
2. NSUserDefaults
 数据类型 NSString, NSData, NSNumber(NSInteger,float,double), NSDate, NSArray, NSDictionary and NSURL
 
3. NSKeyedArchiver / NSKeyedUnarchiver
 数据类型 NSData
 
 4. Sqlite
 5. CoreData
 



## 关于锁：
OSSpinLock 自旋锁，性能最高的锁。原理很简单，就是一直 do while 忙等。它的缺点是当等待时会消耗大量 CPU 资源，所以它不适用于较长时间的任务。对于内存缓存的存取来说，它非常合适。
NSDictionary + OSSpinLock 实现高性能缓存

dispatch_semaphore 是信号量，但当信号总量设为 1 时也可以当作锁来。在没有等待情况出现时，它的性能比 pthread_mutex 还要高，但一旦有等待情况出现时，性能就会下降许多。相对于 OSSpinLock 来说，它的优势在于等待时不会消耗 CPU 资源。对磁盘缓存来说，它比较合适。
    
## 磁盘缓存

1 基于文件读写
SDWebImage、 TMDiskCache、 PINDiskCache 等缓存，都是基于文件系统的，即一个 Value 对应一个文件，通过文件读写来缓存数据。他们的实现都比较简单，性能也都相近，缺点：不方便扩展、没有元数据、难以实现较好的淘汰算法、数据统计缓慢。

2 基于 mmap 文件内存映射
FastImageCache 采用的是 mmap 将文件映射到内存。mmap 性能非常高, 缺点：热数据的文件不要超过物理内存大小，不然 mmap 会导致内存交换严重降低性能（MongoDB也有同样的问题）；另外内存中的数据是定时 flush 到文件的，如果数据还未同步时程序挂掉，就会导致数据错误。

3 基于数据库
NSURLCache、YYDiskCache、FBDiskCache 都是基于 SQLite 数据库的。基于数据库的缓存可以很好的支持元数据、扩展方便、数据统计速度快，也很容易实现 LRU 或其他淘汰算法，当单条数据小于 20K 时，数据越小 SQLite 读取性能越高；单条数据大于 20K 时，直接写为文件速度会更快一些，直接从官网下载最新的 SQLite 源码编译，会比 iOS 系统自带的 sqlite3.dylib 性能要高很多 
磁盘缓存最好是把 SQLite 和文件存储结合起来：key-value 元数据保存在 SQLite 中，而 value 数据则根据大小不同选择 SQLite 或文件存储。NSURLCache 选定的数据大小的阈值是 16K；FBDiskCache 则把所有 value 数据都保存成了文件。

##常用的文件头编码
JPEG(jpg) 文件头：FFD8FFE1
PNG(png) 文件头：89504E47
GIF(gif) 文件头：47494638
Windows Bitmap(bmp) 文件头：424D
WebP : 524946462A73010057454250


Adobe Photoshop (psd)，文件头：38425053 
Rich Text Format (rtf)，文件头：7B5C727466 
XML (xml)，文件头：3C3F786D6C 
HTML (html)，文件头：68746D6C3E 
Adobe Acrobat (pdf)，文件头：255044462D312E
ZIP Archive (zip)，文件头：504B0304
RAR Archive (rar)，文件头：52617221 

Wave (wav)，文件头：57415645 
Quicktime (mov)，文件头：6D6F6F76
AVI (avi)，文件头：41564920
Real Audio (ram)，文件头：2E7261FD
Real Media (rm)，文件头：2E524D46 
MPEG (mpg)，文件头：000001BA 
MPEG (mpg)，文件头：000001B3





