#    Image
>The record related to Image

## iPhone拍照的部分图片在windows上显示被旋转的问题


```/**
 旋转图片

 解决在window 系统中 不能识别UIImageOrientationRight时的方向值，
 会出现逆时针90，所以
 
 @param image 原图
 @return 新图
 */
+ (UIImage *)rotateImage:(UIImage *) image
{
   
    @autoreleasepool {
        CGImageRef imgRef = image.CGImage;
        
        CGFloat width = CGImageGetWidth(imgRef);
        CGFloat height = CGImageGetHeight(imgRef);
        
        
        CGAffineTransform transform = CGAffineTransformIdentity;
        CGRect bounds = CGRectMake(0, 0, width, height);

        CGFloat scaleRatio = bounds.size.width / width;
        CGSize imageSize = CGSizeMake(CGImageGetWidth(imgRef), CGImageGetHeight(imgRef));
        CGFloat boundHeight;
        UIImageOrientation orient = image.imageOrientation;
        switch(orient) {
                
            case UIImageOrientationUp: //EXIF = 1
                transform = CGAffineTransformIdentity;
                break;
                
            case UIImageOrientationUpMirrored: //EXIF = 2
                transform = CGAffineTransformMakeTranslation(imageSize.width, 0.0);
                transform = CGAffineTransformScale(transform, -1.0, 1.0);
                break;
                
            case UIImageOrientationDown: //EXIF = 3
                transform = CGAffineTransformMakeTranslation(imageSize.width, imageSize.height);
                transform = CGAffineTransformRotate(transform, M_PI);
                break;
                
            case UIImageOrientationDownMirrored: //EXIF = 4
                transform = CGAffineTransformMakeTranslation(0.0, imageSize.height);
                transform = CGAffineTransformScale(transform, 1.0, -1.0);
                break;
                
            case UIImageOrientationLeftMirrored: //EXIF = 5
                boundHeight = bounds.size.height;
                bounds.size.height = bounds.size.width;
                bounds.size.width = boundHeight;
                transform = CGAffineTransformMakeTranslation(imageSize.height, imageSize.width);
                transform = CGAffineTransformScale(transform, -1.0, 1.0);
                transform = CGAffineTransformRotate(transform, 3.0 * M_PI / 2.0);
                break;
                
            case UIImageOrientationLeft: //EXIF = 8
                boundHeight = bounds.size.height;
                bounds.size.height = bounds.size.width;
                bounds.size.width = boundHeight;
                transform = CGAffineTransformMakeTranslation(0.0, imageSize.width);
                transform = CGAffineTransformRotate(transform, 3.0 * M_PI / 2.0);
                break;
                
            case UIImageOrientationRightMirrored: //EXIF = 7
                boundHeight = bounds.size.height;
                bounds.size.height = bounds.size.width;
                bounds.size.width = boundHeight;
                transform = CGAffineTransformMakeScale(-1.0, 1.0);
                transform = CGAffineTransformRotate(transform, M_PI / 2.0);
                break;
                
            case UIImageOrientationRight: //EXIF = 6
                boundHeight = bounds.size.height;
                bounds.size.height = bounds.size.width;
                bounds.size.width = boundHeight;
                transform = CGAffineTransformMakeTranslation(imageSize.height, 0.0);
                transform = CGAffineTransformRotate(transform, M_PI / 2.0);
                break;
                
            default:
                [NSException raise:NSInternalInconsistencyException format:@"Invalid image orientation"];
                
        }
        
        UIGraphicsBeginImageContext(bounds.size);
        
        CGContextRef context = UIGraphicsGetCurrentContext();
        
        if (orient == UIImageOrientationRight || orient == UIImageOrientationLeft) {
            CGContextScaleCTM(context, -scaleRatio, scaleRatio);
            CGContextTranslateCTM(context, -height, 0);
        }
        else {
            CGContextScaleCTM(context, scaleRatio, -scaleRatio);
            CGContextTranslateCTM(context, 0, -height);
        }
        
        CGContextConcatCTM(context, transform);
        
        CGContextDrawImage(UIGraphicsGetCurrentContext(), CGRectMake(0, 0, width, height), imgRef);
        UIImage *imageCopy = UIGraphicsGetImageFromCurrentImageContext();
        UIGraphicsEndImageContext();
        
        return imageCopy;

    }
}

```


date:       2017-11-27 16:00:00
author:     "Gao Fei"
