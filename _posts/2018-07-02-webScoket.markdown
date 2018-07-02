---
layout:     post
title:      "WebScoket Introduction"
subtitle:   "The record related to WebView"
date:       2017-11-27 16:00:00
author:     "Gao Fei"
header-img: "img/post-bg-ios9-web.jpg"
tags:
    - IM
    - TCP/UDP


---



## WebScoket

ios示例:

SocketManager.h 文件
```
#import <Foundation/Foundation.h>
// 替换为自己的IP地址
static NSString *kHost = @"192.168.2.22";
static NSInteger kPort = 8080;
static NSString *kAdress = @"/websocket/message";

typedef enum : NSUInteger {
    disConnectByUser ,
    disConnectByServer,
} DisConnectType;


@interface SocketManager : NSObject

+ (instancetype)shared;

- (void)connect;
- (void)disConnect;

- (void)sendMessage:(NSString *)message;

- (void)receiveMessage:(void(^)(NSString *str))measge;

- (void)ping;

@end
```


SocketManager.m 文件
```
#import "SocketManager.h"
#import <SocketRocket/SocketRocket.h>


#define dispatch_main_async_safe(block)\
        if ([NSThread isMainThread]) {\
        block();\
        }else{\
            dispatch_async(dispatch_get_main_queue(), block);\
        }


@interface SocketManager()<SRWebSocketDelegate>

@property(nonatomic,strong)SRWebSocket *webSocket;
@property(nonatomic,strong)NSTimer *heartBeat;
@property(nonatomic,assign)NSTimeInterval reConnectTime;
@property(nonatomic,copy)void(^receiveMsg)(NSString *str);
@end


@implementation SocketManager

+(instancetype)shared
{
    static SocketManager *instance = nil;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        instance = [[self alloc] init];
        
    });
    return instance;
}

- (void)initSocket
{
    if (self.webSocket) {
        return;
    }
    
    self.webSocket = [[SRWebSocket alloc] initWithURL:[NSURL URLWithString:[NSString stringWithFormat:@"ws://%@:%ld%@",kHost,(long)kPort,kAdress]]];
    self.webSocket.delegate = self;
    
    NSOperationQueue *queue = [[NSOperationQueue alloc] init];
    queue.maxConcurrentOperationCount = 1;
    
    [self.webSocket setDelegateOperationQueue:queue];
    
    [_webSocket open];
    
    
    
}


- (void)initHeartBeat
{
    dispatch_main_async_safe(^{
        [self destoryHeartBeat];
        
        self.heartBeat = [NSTimer scheduledTimerWithTimeInterval:3*60 target:self selector:@selector(sendHeartMessage) userInfo:nil repeats:YES];
        [[NSRunLoop currentRunLoop] addTimer:self.heartBeat forMode:NSRunLoopCommonModes];
    })
}

- (void)sendHeartMessage
{
//    [self sendMessage:@"heart"];
    [self ping];
}


- (void)destoryHeartBeat
{
    dispatch_main_async_safe(^{
        if (self.heartBeat) {
            [self.heartBeat invalidate];
            self.heartBeat = nil;
        }
    })
}

// 建立连接
- (void)connect
{
    [self initSocket];
    
    self.reConnectTime = 0;
}

//重连机制
- (void)reConnect
{
    [self disConnect];
    
    if (_reConnectTime >64) {
        return;
    }
    dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(self.reConnectTime * NSEC_PER_SEC)), dispatch_get_main_queue(), ^{
        self.webSocket = nil;
        [self initSocket];
    });
    
    if (_reConnectTime == 0) {
        _reConnectTime = 2;
    }else
    {
        _reConnectTime *= 2;
    }
    
    
}

- (void)disConnect
{
    if (self.webSocket) {
        [self.webSocket close];
        _webSocket = nil;
    }
}

- (void)sendMessage:(NSString *)message
{
    
    NSLog(@"readyState=%ld",(long)self.webSocket.readyState);
    // 发送文本数据
    [self.webSocket send:message];
    // 发送二进制数据
//    [self.webSocket send:[message dataUsingEncoding:NSUTF8StringEncoding]];
  
}

- (void)ping
{
    NSError *error = nil;
    
    [self.webSocket sendPing:nil];
    NSLog(@"sendpingError=%@",error);
}

- (void)receiveMessage:(void (^)(NSString *))measge
{
    self.receiveMsg = measge;
}

#pragma mark - SRWebSocketDelegate
- (void)webSocket:(SRWebSocket *)webSocket didReceiveMessage:(id)message
{
    NSLog(@"服务器返回收到消息:%@",message);
    dispatch_main_async_safe(^{
        if (message) {
            self.receiveMsg(message);
//            [self receiveMessage:(message)];
        }
 
    }
    )
    
}

- (void)webSocketDidOpen:(SRWebSocket *)webSocket
{
    NSLog(@"连接成功");
    
    //连接成功了开始发送心跳
    [self initHeartBeat];
}

//open失败的时候调用
-(void)webSocket:(SRWebSocket *)webSocket didFailWithError:(NSError *)error
{
    NSLog(@"连接失败.....\n%@",error);
    
    //失败了就去重连
    [self reConnect];
}

//网络连接中断被调用
- (void)webSocket:(SRWebSocket *)webSocket didCloseWithCode:(NSInteger)code reason:(NSString *)reason wasClean:(BOOL)wasClean
{
    NSLog(@"被关闭连接，code:%ld,reason:%@,wasClean:%d",code,reason,wasClean);
    
    //如果是被用户自己中断的那么直接断开连接，否则开始重连
    if (code == disConnectByUser) {
        [self disConnect];
    }else{
        
        [self reConnect];
    }
    //断开连接时销毁心跳
    [self destoryHeartBeat];
    
}

//sendPing的时候，如果网络通的话，则会收到回调，但是必须保证ScoketOpen，否则会crash
- (void)webSocket:(SRWebSocket *)webSocket didReceivePong:(NSData *)pongPayload
{
    NSLog(@"收到pong回调");
    
}


@end
```

本例使用Tomcat7作为服务器容器
java 服务端示例

创建Message类来接受客户端发来的websocket请求

```
import java.io.IOException;
import java.io.InputStream;
import java.io.Reader;
import java.nio.ByteBuffer;
import java.nio.CharBuffer;
import java.nio.charset.CharacterCodingException;
import java.nio.charset.Charset;
import java.nio.charset.CharsetDecoder;
import java.util.Set;
import java.util.concurrent.CopyOnWriteArraySet;

import javax.websocket.OnClose;
import javax.websocket.OnError;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.PongMessage;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;

@ServerEndpoint("/message")
public class Message {

	
	private static Set<Client> clientSet = new CopyOnWriteArraySet<>();
	
	
	@OnOpen
	public void onOpen(Session session) {
		String id = session.getId();
		System.out.println("onOpen,id:"+session.getId());
		Client client = new Client(session, id);
		clientSet.add(client);
		
		System.out.println(clientSet);
	}
	
	@OnClose
	public void onClose(Session session) {
		System.out.println("onClose,id:"+session.getId());
		for(Client client:clientSet) {
			if(client.getSession().equals(session))
			{
				clientSet.remove(client);
				break;
			}
		}
	}
	// 文本消息 String 类型
	@OnMessage
	public void onMessage(Session session, String msg,boolean last) {
		System.out.println("onMessage,id="+session.getId()+",msg="+msg);
		
		try {
			if(session.isOpen()) {
				broadcast(session, msg);
			}
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
		}
		
	}
	// 对于二进制数据 使用byte[]或ByteBuffer
	@OnMessage
	public void onMesasge(Session session,byte[] data,boolean isLast) {
//	public void onMesasge(Session session,ByteBuffer buf,boolean isLast) {
		
		String msg = new String(data);
		System.out.println("dataOnMessage,id="+session.getId()+",msg="+msg);
		try {
			if(session.isOpen()) {
				broadcast(session, msg);
			}
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
		}
	}

	// 使用PongMessage接受pong消息
	@OnMessage
	public void onMessage(Session session,PongMessage pong) {
		System.out.println("pong:"+pong.toString());
		ByteBuffer buf = pong.getApplicationData();
		Charset charset = Charset.forName("UTF-8");
		CharsetDecoder decoder = charset.newDecoder();
		try {
			CharBuffer charBuffer = decoder.decode(buf.asReadOnlyBuffer());
			String pon = charBuffer.toString();
			System.out.println("pong:"+pon);
		} catch (CharacterCodingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		
	}
//	
	@OnError
	public void onError(Throwable t) throws Throwable
    {
        System.out.println("WebSocket 服务端错误" + t);
    }
	
	private static void broadcast(Session currentSession,String msg) {
		for(Client client:clientSet) {
			if(client.getSession().equals(currentSession)) {
				continue;
			}
			
			try {
				synchronized (client) {
					client.getSession().getBasicRemote().sendText(msg);
					
				}
			} catch (Exception e) {
				// TODO: handle exception
				System.out.println("向客户端"+client.getClientID()+"发送消息错误");
				clientSet.remove(client);
				try {
					client.getSession().close();
				} catch (IOException e1) {
					// TODO Auto-generated catch block
					e1.printStackTrace();
					
				}
			}
		}
	}

}
```
使用浏览器模拟客户端的文件如下:
jsp 文件

```
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>
</head>
<body>
服务器返回的信息：  
<input type="text" id="show"/>  
  
浏览器发送的信息：  
<input type="text" id="msg"/>  
<input type="button" value="send" id="send" onclick="q()"/>  

<script>  
    var ws = null ;  
    // 替换为自己的IP地址
    var target="ws://192.168.2.22:8080/websocket/message";  
    if ('WebSocket' in window) {  
        ws = new WebSocket(target);  
    } else if ('MozWebSocket' in window) {  
        ws = new MozWebSocket(target);  
    } else {  
        alert('WebSocket is not supported by this browser.');  
    }  
  
    ws.onopen = function(obj){  
        console.info('open') ;  
        console.info(obj) ;  
    } ;  
      
    ws.onclose = function (obj) {  
        console.info('close') ;  
        console.info(obj) ;  
    } ;  
    ws.onmessage = function(obj){  
        console.info(obj) ;  
        document.getElementById('show').value=obj.data;  
    } ;  
    function q(){  
        ws.send(document.getElementById('msg').value);  
    }  
</script>  
</body>
</html>

```

