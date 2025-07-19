---
layout:     post
title:      "Url Coding"
subtitle:   "与url相关的处理"
date:       2017-07-06 16:00:00
author:     "Gao Fei"
header-img: "../../../public/img/post-bg-2015.jpg"
tags:
    - URL
    - HTTP

---

#Encoding and Decoding URL Data

To percent-encode part of a URL string, use the ==NSString== method ==stringByAddingPercentEncodingWithAllowedCharacters==:, passing the appropriate character set for the URL component or subcomponent:
	•	User: ==URLUserAllowedCharacterSet==
	•	Password: ==URLPasswordAllowedCharacterSet==
	•	Host: ==URLHostAllowedCharacterSet==
	•	Path: ==URLPathAllowedCharacterSet==
	•	Fragment: ==URLFragmentAllowedCharacterSet==
	•	Query: ==URLQueryAllowedCharacterSet==


`
Important: Don’t use stringByAddingPercentEncodingWithAllowedCharacters: to encode an entire URL string, because each URL component or subcomponent has different rules for what characters are valid.
`

For example, to percent-encode a UTF-8 string for inclusion in a URL path, you do the following:
```
  NSString *str = @"http://192.168.2.123:80/u=142020185,2790987080&fm=26&gp=0的副本.jpg";
    NSString *urlStr = [str stringByAddingPercentEscapesUsingEncoding:NSUTF8StringEncoding];
    [str stringByAddingPercentEncodingWithAllowedCharacters:[NSCharacterSet URLPathAllowedCharacterSet]];
    NSURL *url = [NSURL URLWithString:urlStr];
```


If you want to decode a percent-encoded URL component, use NSURLComponents to split the URL into its constituent parts and access the corresponding property.
For example, to get the UTF-8 string value for a percent-encoded URL path, you do the following:

```
NSString *encodeStr = @"http://192.168.2.123:80/u=142020185,2790987080&fm=26&gp=0%E7%9A%84%E5%89%AF%E6%9C%AC.jpg";

//   NSURL *url2 = [NSURL URLWithString:encodeStr];
//    NSURLComponents *component = [NSURLComponents componentsWithURL:url2 resolvingAgainstBaseURL:NO];
    NSURLComponents *component = [NSURLComponents componentsWithString:encodeStr];
    NSString *path = component.path;
    NSLog(@"path=%@",path);
```

The user component of a URL is an optional component that precedes the host component, and ends at either a colon (if a password is specified) or an @ sign (if no password is specified). For example, in the URL http://username:password@www.example.com/index.html#jumpLocation, 
the user component is username
the pass component is password
the host component is www.example.com
the path component is /index.html
the fragment is jumpLocation



