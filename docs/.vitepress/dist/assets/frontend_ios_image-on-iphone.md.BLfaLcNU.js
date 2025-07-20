import{_ as s,c as a,o as p,ag as e}from"./chunks/framework.BHpayLOB.js";const h=JSON.parse('{"title":"Image","description":"","frontmatter":{},"headers":[],"relativePath":"frontend/ios/image-on-iphone.md","filePath":"frontend/ios/image-on-iphone.md"}'),i={name:"frontend/ios/image-on-iphone.md"};function l(t,n,o,r,c,m){return p(),a("div",null,n[0]||(n[0]=[e(`<h1 id="image" tabindex="-1">Image <a class="header-anchor" href="#image" aria-label="Permalink to &quot;Image&quot;">​</a></h1><blockquote><p>The record related to Image</p></blockquote><h2 id="iphone拍照的部分图片在windows上显示被旋转的问题" tabindex="-1">iPhone拍照的部分图片在windows上显示被旋转的问题 <a class="header-anchor" href="#iphone拍照的部分图片在windows上显示被旋转的问题" aria-label="Permalink to &quot;iPhone拍照的部分图片在windows上显示被旋转的问题&quot;">​</a></h2><div class="language-/** vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">/**</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span> 旋转图片</span></span>
<span class="line"><span></span></span>
<span class="line"><span> 解决在window 系统中 不能识别UIImageOrientationRight时的方向值，</span></span>
<span class="line"><span> 会出现逆时针90，所以</span></span>
<span class="line"><span> </span></span>
<span class="line"><span> @param image 原图</span></span>
<span class="line"><span> @return 新图</span></span>
<span class="line"><span> */</span></span>
<span class="line"><span>+ (UIImage *)rotateImage:(UIImage *) image</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>   </span></span>
<span class="line"><span>    @autoreleasepool {</span></span>
<span class="line"><span>        CGImageRef imgRef = image.CGImage;</span></span>
<span class="line"><span>        </span></span>
<span class="line"><span>        CGFloat width = CGImageGetWidth(imgRef);</span></span>
<span class="line"><span>        CGFloat height = CGImageGetHeight(imgRef);</span></span>
<span class="line"><span>        </span></span>
<span class="line"><span>        </span></span>
<span class="line"><span>        CGAffineTransform transform = CGAffineTransformIdentity;</span></span>
<span class="line"><span>        CGRect bounds = CGRectMake(0, 0, width, height);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        CGFloat scaleRatio = bounds.size.width / width;</span></span>
<span class="line"><span>        CGSize imageSize = CGSizeMake(CGImageGetWidth(imgRef), CGImageGetHeight(imgRef));</span></span>
<span class="line"><span>        CGFloat boundHeight;</span></span>
<span class="line"><span>        UIImageOrientation orient = image.imageOrientation;</span></span>
<span class="line"><span>        switch(orient) {</span></span>
<span class="line"><span>                </span></span>
<span class="line"><span>            case UIImageOrientationUp: //EXIF = 1</span></span>
<span class="line"><span>                transform = CGAffineTransformIdentity;</span></span>
<span class="line"><span>                break;</span></span>
<span class="line"><span>                </span></span>
<span class="line"><span>            case UIImageOrientationUpMirrored: //EXIF = 2</span></span>
<span class="line"><span>                transform = CGAffineTransformMakeTranslation(imageSize.width, 0.0);</span></span>
<span class="line"><span>                transform = CGAffineTransformScale(transform, -1.0, 1.0);</span></span>
<span class="line"><span>                break;</span></span>
<span class="line"><span>                </span></span>
<span class="line"><span>            case UIImageOrientationDown: //EXIF = 3</span></span>
<span class="line"><span>                transform = CGAffineTransformMakeTranslation(imageSize.width, imageSize.height);</span></span>
<span class="line"><span>                transform = CGAffineTransformRotate(transform, M_PI);</span></span>
<span class="line"><span>                break;</span></span>
<span class="line"><span>                </span></span>
<span class="line"><span>            case UIImageOrientationDownMirrored: //EXIF = 4</span></span>
<span class="line"><span>                transform = CGAffineTransformMakeTranslation(0.0, imageSize.height);</span></span>
<span class="line"><span>                transform = CGAffineTransformScale(transform, 1.0, -1.0);</span></span>
<span class="line"><span>                break;</span></span>
<span class="line"><span>                </span></span>
<span class="line"><span>            case UIImageOrientationLeftMirrored: //EXIF = 5</span></span>
<span class="line"><span>                boundHeight = bounds.size.height;</span></span>
<span class="line"><span>                bounds.size.height = bounds.size.width;</span></span>
<span class="line"><span>                bounds.size.width = boundHeight;</span></span>
<span class="line"><span>                transform = CGAffineTransformMakeTranslation(imageSize.height, imageSize.width);</span></span>
<span class="line"><span>                transform = CGAffineTransformScale(transform, -1.0, 1.0);</span></span>
<span class="line"><span>                transform = CGAffineTransformRotate(transform, 3.0 * M_PI / 2.0);</span></span>
<span class="line"><span>                break;</span></span>
<span class="line"><span>                </span></span>
<span class="line"><span>            case UIImageOrientationLeft: //EXIF = 8</span></span>
<span class="line"><span>                boundHeight = bounds.size.height;</span></span>
<span class="line"><span>                bounds.size.height = bounds.size.width;</span></span>
<span class="line"><span>                bounds.size.width = boundHeight;</span></span>
<span class="line"><span>                transform = CGAffineTransformMakeTranslation(0.0, imageSize.width);</span></span>
<span class="line"><span>                transform = CGAffineTransformRotate(transform, 3.0 * M_PI / 2.0);</span></span>
<span class="line"><span>                break;</span></span>
<span class="line"><span>                </span></span>
<span class="line"><span>            case UIImageOrientationRightMirrored: //EXIF = 7</span></span>
<span class="line"><span>                boundHeight = bounds.size.height;</span></span>
<span class="line"><span>                bounds.size.height = bounds.size.width;</span></span>
<span class="line"><span>                bounds.size.width = boundHeight;</span></span>
<span class="line"><span>                transform = CGAffineTransformMakeScale(-1.0, 1.0);</span></span>
<span class="line"><span>                transform = CGAffineTransformRotate(transform, M_PI / 2.0);</span></span>
<span class="line"><span>                break;</span></span>
<span class="line"><span>                </span></span>
<span class="line"><span>            case UIImageOrientationRight: //EXIF = 6</span></span>
<span class="line"><span>                boundHeight = bounds.size.height;</span></span>
<span class="line"><span>                bounds.size.height = bounds.size.width;</span></span>
<span class="line"><span>                bounds.size.width = boundHeight;</span></span>
<span class="line"><span>                transform = CGAffineTransformMakeTranslation(imageSize.height, 0.0);</span></span>
<span class="line"><span>                transform = CGAffineTransformRotate(transform, M_PI / 2.0);</span></span>
<span class="line"><span>                break;</span></span>
<span class="line"><span>                </span></span>
<span class="line"><span>            default:</span></span>
<span class="line"><span>                [NSException raise:NSInternalInconsistencyException format:@&quot;Invalid image orientation&quot;];</span></span>
<span class="line"><span>                </span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        </span></span>
<span class="line"><span>        UIGraphicsBeginImageContext(bounds.size);</span></span>
<span class="line"><span>        </span></span>
<span class="line"><span>        CGContextRef context = UIGraphicsGetCurrentContext();</span></span>
<span class="line"><span>        </span></span>
<span class="line"><span>        if (orient == UIImageOrientationRight || orient == UIImageOrientationLeft) {</span></span>
<span class="line"><span>            CGContextScaleCTM(context, -scaleRatio, scaleRatio);</span></span>
<span class="line"><span>            CGContextTranslateCTM(context, -height, 0);</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        else {</span></span>
<span class="line"><span>            CGContextScaleCTM(context, scaleRatio, -scaleRatio);</span></span>
<span class="line"><span>            CGContextTranslateCTM(context, 0, -height);</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        </span></span>
<span class="line"><span>        CGContextConcatCTM(context, transform);</span></span>
<span class="line"><span>        </span></span>
<span class="line"><span>        CGContextDrawImage(UIGraphicsGetCurrentContext(), CGRectMake(0, 0, width, height), imgRef);</span></span>
<span class="line"><span>        UIImage *imageCopy = UIGraphicsGetImageFromCurrentImageContext();</span></span>
<span class="line"><span>        UIGraphicsEndImageContext();</span></span>
<span class="line"><span>        </span></span>
<span class="line"><span>        return imageCopy;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>date: 2017-11-27 16:00:00 author: &quot;Gao Fei&quot;</p>`,5)]))}const g=s(i,[["render",l]]);export{h as __pageData,g as default};
