import{_ as s,c as a,o as p,ag as e}from"./chunks/framework.BHpayLOB.js";const g=JSON.parse('{"title":"WebScoket Introduction","description":"","frontmatter":{},"headers":[],"relativePath":"frontend/ios/webScoket.md","filePath":"frontend/ios/webScoket.md"}'),l={name:"frontend/ios/webScoket.md"};function t(i,n,c,o,r,d){return p(),a("div",null,n[0]||(n[0]=[e(`<h1 id="webscoket-introduction" tabindex="-1">WebScoket Introduction <a class="header-anchor" href="#webscoket-introduction" aria-label="Permalink to &quot;WebScoket Introduction&quot;">​</a></h1><h2 id="webscoket" tabindex="-1">WebScoket <a class="header-anchor" href="#webscoket" aria-label="Permalink to &quot;WebScoket&quot;">​</a></h2><p>ios示例:</p><p>SocketManager.h 文件</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>#import &lt;Foundation/Foundation.h&gt;</span></span>
<span class="line"><span>// 替换为自己的IP地址</span></span>
<span class="line"><span>static NSString *kHost = @&quot;192.168.2.22&quot;;</span></span>
<span class="line"><span>static NSInteger kPort = 8080;</span></span>
<span class="line"><span>static NSString *kAdress = @&quot;/websocket/message&quot;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>typedef enum : NSUInteger {</span></span>
<span class="line"><span>    disConnectByUser ,</span></span>
<span class="line"><span>    disConnectByServer,</span></span>
<span class="line"><span>} DisConnectType;</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>@interface SocketManager : NSObject</span></span>
<span class="line"><span></span></span>
<span class="line"><span>+ (instancetype)shared;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>- (void)connect;</span></span>
<span class="line"><span>- (void)disConnect;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>- (void)sendMessage:(NSString *)message;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>- (void)receiveMessage:(void(^)(NSString *str))measge;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>- (void)ping;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>@end</span></span></code></pre></div><p>SocketManager.m 文件</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>#import &quot;SocketManager.h&quot;</span></span>
<span class="line"><span>#import &lt;SocketRocket/SocketRocket.h&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>#define dispatch_main_async_safe(block)\\</span></span>
<span class="line"><span>        if ([NSThread isMainThread]) {\\</span></span>
<span class="line"><span>        block();\\</span></span>
<span class="line"><span>        }else{\\</span></span>
<span class="line"><span>            dispatch_async(dispatch_get_main_queue(), block);\\</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>@interface SocketManager()&lt;SRWebSocketDelegate&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>@property(nonatomic,strong)SRWebSocket *webSocket;</span></span>
<span class="line"><span>@property(nonatomic,strong)NSTimer *heartBeat;</span></span>
<span class="line"><span>@property(nonatomic,assign)NSTimeInterval reConnectTime;</span></span>
<span class="line"><span>@property(nonatomic,copy)void(^receiveMsg)(NSString *str);</span></span>
<span class="line"><span>@end</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>@implementation SocketManager</span></span>
<span class="line"><span></span></span>
<span class="line"><span>+(instancetype)shared</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>    static SocketManager *instance = nil;</span></span>
<span class="line"><span>    static dispatch_once_t onceToken;</span></span>
<span class="line"><span>    dispatch_once(&amp;onceToken, ^{</span></span>
<span class="line"><span>        instance = [[self alloc] init];</span></span>
<span class="line"><span>        </span></span>
<span class="line"><span>    });</span></span>
<span class="line"><span>    return instance;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>- (void)initSocket</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>    if (self.webSocket) {</span></span>
<span class="line"><span>        return;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    self.webSocket = [[SRWebSocket alloc] initWithURL:[NSURL URLWithString:[NSString stringWithFormat:@&quot;ws://%@:%ld%@&quot;,kHost,(long)kPort,kAdress]]];</span></span>
<span class="line"><span>    self.webSocket.delegate = self;</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    NSOperationQueue *queue = [[NSOperationQueue alloc] init];</span></span>
<span class="line"><span>    queue.maxConcurrentOperationCount = 1;</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    [self.webSocket setDelegateOperationQueue:queue];</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    [_webSocket open];</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>- (void)initHeartBeat</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>    dispatch_main_async_safe(^{</span></span>
<span class="line"><span>        [self destoryHeartBeat];</span></span>
<span class="line"><span>        </span></span>
<span class="line"><span>        self.heartBeat = [NSTimer scheduledTimerWithTimeInterval:3*60 target:self selector:@selector(sendHeartMessage) userInfo:nil repeats:YES];</span></span>
<span class="line"><span>        [[NSRunLoop currentRunLoop] addTimer:self.heartBeat forMode:NSRunLoopCommonModes];</span></span>
<span class="line"><span>    })</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>- (void)sendHeartMessage</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>//    [self sendMessage:@&quot;heart&quot;];</span></span>
<span class="line"><span>    [self ping];</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>- (void)destoryHeartBeat</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>    dispatch_main_async_safe(^{</span></span>
<span class="line"><span>        if (self.heartBeat) {</span></span>
<span class="line"><span>            [self.heartBeat invalidate];</span></span>
<span class="line"><span>            self.heartBeat = nil;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    })</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 建立连接</span></span>
<span class="line"><span>- (void)connect</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>    [self initSocket];</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    self.reConnectTime = 0;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>//重连机制</span></span>
<span class="line"><span>- (void)reConnect</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>    [self disConnect];</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    if (_reConnectTime &gt;64) {</span></span>
<span class="line"><span>        return;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(self.reConnectTime * NSEC_PER_SEC)), dispatch_get_main_queue(), ^{</span></span>
<span class="line"><span>        self.webSocket = nil;</span></span>
<span class="line"><span>        [self initSocket];</span></span>
<span class="line"><span>    });</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    if (_reConnectTime == 0) {</span></span>
<span class="line"><span>        _reConnectTime = 2;</span></span>
<span class="line"><span>    }else</span></span>
<span class="line"><span>    {</span></span>
<span class="line"><span>        _reConnectTime *= 2;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>- (void)disConnect</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>    if (self.webSocket) {</span></span>
<span class="line"><span>        [self.webSocket close];</span></span>
<span class="line"><span>        _webSocket = nil;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>- (void)sendMessage:(NSString *)message</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    NSLog(@&quot;readyState=%ld&quot;,(long)self.webSocket.readyState);</span></span>
<span class="line"><span>    // 发送文本数据</span></span>
<span class="line"><span>    [self.webSocket send:message];</span></span>
<span class="line"><span>    // 发送二进制数据</span></span>
<span class="line"><span>//    [self.webSocket send:[message dataUsingEncoding:NSUTF8StringEncoding]];</span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>- (void)ping</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>    NSError *error = nil;</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    [self.webSocket sendPing:nil];</span></span>
<span class="line"><span>    NSLog(@&quot;sendpingError=%@&quot;,error);</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>- (void)receiveMessage:(void (^)(NSString *))measge</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>    self.receiveMsg = measge;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>#pragma mark - SRWebSocketDelegate</span></span>
<span class="line"><span>- (void)webSocket:(SRWebSocket *)webSocket didReceiveMessage:(id)message</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>    NSLog(@&quot;服务器返回收到消息:%@&quot;,message);</span></span>
<span class="line"><span>    dispatch_main_async_safe(^{</span></span>
<span class="line"><span>        if (message) {</span></span>
<span class="line"><span>            self.receiveMsg(message);</span></span>
<span class="line"><span>//            [self receiveMessage:(message)];</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span> </span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    )</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>- (void)webSocketDidOpen:(SRWebSocket *)webSocket</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>    NSLog(@&quot;连接成功&quot;);</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    //连接成功了开始发送心跳</span></span>
<span class="line"><span>    [self initHeartBeat];</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>//open失败的时候调用</span></span>
<span class="line"><span>-(void)webSocket:(SRWebSocket *)webSocket didFailWithError:(NSError *)error</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>    NSLog(@&quot;连接失败.....\\n%@&quot;,error);</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    //失败了就去重连</span></span>
<span class="line"><span>    [self reConnect];</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>//网络连接中断被调用</span></span>
<span class="line"><span>- (void)webSocket:(SRWebSocket *)webSocket didCloseWithCode:(NSInteger)code reason:(NSString *)reason wasClean:(BOOL)wasClean</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>    NSLog(@&quot;被关闭连接，code:%ld,reason:%@,wasClean:%d&quot;,code,reason,wasClean);</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    //如果是被用户自己中断的那么直接断开连接，否则开始重连</span></span>
<span class="line"><span>    if (code == disConnectByUser) {</span></span>
<span class="line"><span>        [self disConnect];</span></span>
<span class="line"><span>    }else{</span></span>
<span class="line"><span>        </span></span>
<span class="line"><span>        [self reConnect];</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    //断开连接时销毁心跳</span></span>
<span class="line"><span>    [self destoryHeartBeat];</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>//sendPing的时候，如果网络通的话，则会收到回调，但是必须保证ScoketOpen，否则会crash</span></span>
<span class="line"><span>- (void)webSocket:(SRWebSocket *)webSocket didReceivePong:(NSData *)pongPayload</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>    NSLog(@&quot;收到pong回调&quot;);</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>@end</span></span></code></pre></div><p>本例使用Tomcat7作为服务器容器 java 服务端示例</p><p>创建Message类来接受客户端发来的websocket请求</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>import java.io.IOException;</span></span>
<span class="line"><span>import java.io.InputStream;</span></span>
<span class="line"><span>import java.io.Reader;</span></span>
<span class="line"><span>import java.nio.ByteBuffer;</span></span>
<span class="line"><span>import java.nio.CharBuffer;</span></span>
<span class="line"><span>import java.nio.charset.CharacterCodingException;</span></span>
<span class="line"><span>import java.nio.charset.Charset;</span></span>
<span class="line"><span>import java.nio.charset.CharsetDecoder;</span></span>
<span class="line"><span>import java.util.Set;</span></span>
<span class="line"><span>import java.util.concurrent.CopyOnWriteArraySet;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>import javax.websocket.OnClose;</span></span>
<span class="line"><span>import javax.websocket.OnError;</span></span>
<span class="line"><span>import javax.websocket.OnMessage;</span></span>
<span class="line"><span>import javax.websocket.OnOpen;</span></span>
<span class="line"><span>import javax.websocket.PongMessage;</span></span>
<span class="line"><span>import javax.websocket.Session;</span></span>
<span class="line"><span>import javax.websocket.server.ServerEndpoint;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>@ServerEndpoint(&quot;/message&quot;)</span></span>
<span class="line"><span>public class Message {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	</span></span>
<span class="line"><span>	private static Set&lt;Client&gt; clientSet = new CopyOnWriteArraySet&lt;&gt;();</span></span>
<span class="line"><span>	</span></span>
<span class="line"><span>	</span></span>
<span class="line"><span>	@OnOpen</span></span>
<span class="line"><span>	public void onOpen(Session session) {</span></span>
<span class="line"><span>		String id = session.getId();</span></span>
<span class="line"><span>		System.out.println(&quot;onOpen,id:&quot;+session.getId());</span></span>
<span class="line"><span>		Client client = new Client(session, id);</span></span>
<span class="line"><span>		clientSet.add(client);</span></span>
<span class="line"><span>		</span></span>
<span class="line"><span>		System.out.println(clientSet);</span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span>	</span></span>
<span class="line"><span>	@OnClose</span></span>
<span class="line"><span>	public void onClose(Session session) {</span></span>
<span class="line"><span>		System.out.println(&quot;onClose,id:&quot;+session.getId());</span></span>
<span class="line"><span>		for(Client client:clientSet) {</span></span>
<span class="line"><span>			if(client.getSession().equals(session))</span></span>
<span class="line"><span>			{</span></span>
<span class="line"><span>				clientSet.remove(client);</span></span>
<span class="line"><span>				break;</span></span>
<span class="line"><span>			}</span></span>
<span class="line"><span>		}</span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span>	// 文本消息 String 类型</span></span>
<span class="line"><span>	@OnMessage</span></span>
<span class="line"><span>	public void onMessage(Session session, String msg,boolean last) {</span></span>
<span class="line"><span>		System.out.println(&quot;onMessage,id=&quot;+session.getId()+&quot;,msg=&quot;+msg);</span></span>
<span class="line"><span>		</span></span>
<span class="line"><span>		try {</span></span>
<span class="line"><span>			if(session.isOpen()) {</span></span>
<span class="line"><span>				broadcast(session, msg);</span></span>
<span class="line"><span>			}</span></span>
<span class="line"><span>		} catch (Exception e) {</span></span>
<span class="line"><span>			// TODO: handle exception</span></span>
<span class="line"><span>			e.printStackTrace();</span></span>
<span class="line"><span>		}</span></span>
<span class="line"><span>		</span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span>	// 对于二进制数据 使用byte[]或ByteBuffer</span></span>
<span class="line"><span>	@OnMessage</span></span>
<span class="line"><span>	public void onMesasge(Session session,byte[] data,boolean isLast) {</span></span>
<span class="line"><span>//	public void onMesasge(Session session,ByteBuffer buf,boolean isLast) {</span></span>
<span class="line"><span>		</span></span>
<span class="line"><span>		String msg = new String(data);</span></span>
<span class="line"><span>		System.out.println(&quot;dataOnMessage,id=&quot;+session.getId()+&quot;,msg=&quot;+msg);</span></span>
<span class="line"><span>		try {</span></span>
<span class="line"><span>			if(session.isOpen()) {</span></span>
<span class="line"><span>				broadcast(session, msg);</span></span>
<span class="line"><span>			}</span></span>
<span class="line"><span>		} catch (Exception e) {</span></span>
<span class="line"><span>			// TODO: handle exception</span></span>
<span class="line"><span>			e.printStackTrace();</span></span>
<span class="line"><span>		}</span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	// 使用PongMessage接受pong消息</span></span>
<span class="line"><span>	@OnMessage</span></span>
<span class="line"><span>	public void onMessage(Session session,PongMessage pong) {</span></span>
<span class="line"><span>		System.out.println(&quot;pong:&quot;+pong.toString());</span></span>
<span class="line"><span>		ByteBuffer buf = pong.getApplicationData();</span></span>
<span class="line"><span>		Charset charset = Charset.forName(&quot;UTF-8&quot;);</span></span>
<span class="line"><span>		CharsetDecoder decoder = charset.newDecoder();</span></span>
<span class="line"><span>		try {</span></span>
<span class="line"><span>			CharBuffer charBuffer = decoder.decode(buf.asReadOnlyBuffer());</span></span>
<span class="line"><span>			String pon = charBuffer.toString();</span></span>
<span class="line"><span>			System.out.println(&quot;pong:&quot;+pon);</span></span>
<span class="line"><span>		} catch (CharacterCodingException e) {</span></span>
<span class="line"><span>			// TODO Auto-generated catch block</span></span>
<span class="line"><span>			e.printStackTrace();</span></span>
<span class="line"><span>		}</span></span>
<span class="line"><span>		</span></span>
<span class="line"><span>		</span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span>//	</span></span>
<span class="line"><span>	@OnError</span></span>
<span class="line"><span>	public void onError(Throwable t) throws Throwable</span></span>
<span class="line"><span>    {</span></span>
<span class="line"><span>        System.out.println(&quot;WebSocket 服务端错误&quot; + t);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>	</span></span>
<span class="line"><span>	private static void broadcast(Session currentSession,String msg) {</span></span>
<span class="line"><span>		for(Client client:clientSet) {</span></span>
<span class="line"><span>			if(client.getSession().equals(currentSession)) {</span></span>
<span class="line"><span>				continue;</span></span>
<span class="line"><span>			}</span></span>
<span class="line"><span>			</span></span>
<span class="line"><span>			try {</span></span>
<span class="line"><span>				synchronized (client) {</span></span>
<span class="line"><span>					client.getSession().getBasicRemote().sendText(msg);</span></span>
<span class="line"><span>					</span></span>
<span class="line"><span>				}</span></span>
<span class="line"><span>			} catch (Exception e) {</span></span>
<span class="line"><span>				// TODO: handle exception</span></span>
<span class="line"><span>				System.out.println(&quot;向客户端&quot;+client.getClientID()+&quot;发送消息错误&quot;);</span></span>
<span class="line"><span>				clientSet.remove(client);</span></span>
<span class="line"><span>				try {</span></span>
<span class="line"><span>					client.getSession().close();</span></span>
<span class="line"><span>				} catch (IOException e1) {</span></span>
<span class="line"><span>					// TODO Auto-generated catch block</span></span>
<span class="line"><span>					e1.printStackTrace();</span></span>
<span class="line"><span>					</span></span>
<span class="line"><span>				}</span></span>
<span class="line"><span>			}</span></span>
<span class="line"><span>		}</span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>}</span></span></code></pre></div><p>使用浏览器模拟客户端的文件如下: jsp 文件</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&lt;%@ page language=&quot;java&quot; contentType=&quot;text/html; charset=UTF-8&quot;</span></span>
<span class="line"><span>    pageEncoding=&quot;UTF-8&quot;%&gt;</span></span>
<span class="line"><span>&lt;!DOCTYPE html PUBLIC &quot;-//W3C//DTD HTML 4.01 Transitional//EN&quot; &quot;http://www.w3.org/TR/html4/loose.dtd&quot;&gt;</span></span>
<span class="line"><span>&lt;html&gt;</span></span>
<span class="line"><span>&lt;head&gt;</span></span>
<span class="line"><span>&lt;meta http-equiv=&quot;Content-Type&quot; content=&quot;text/html; charset=UTF-8&quot;&gt;</span></span>
<span class="line"><span>&lt;title&gt;Insert title here&lt;/title&gt;</span></span>
<span class="line"><span>&lt;/head&gt;</span></span>
<span class="line"><span>&lt;body&gt;</span></span>
<span class="line"><span>服务器返回的信息：  </span></span>
<span class="line"><span>&lt;input type=&quot;text&quot; id=&quot;show&quot;/&gt;  </span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>浏览器发送的信息：  </span></span>
<span class="line"><span>&lt;input type=&quot;text&quot; id=&quot;msg&quot;/&gt;  </span></span>
<span class="line"><span>&lt;input type=&quot;button&quot; value=&quot;send&quot; id=&quot;send&quot; onclick=&quot;q()&quot;/&gt;  </span></span>
<span class="line"><span></span></span>
<span class="line"><span>&lt;script&gt;  </span></span>
<span class="line"><span>    var ws = null ;  </span></span>
<span class="line"><span>    // 替换为自己的IP地址</span></span>
<span class="line"><span>    var target=&quot;ws://192.168.2.22:8080/websocket/message&quot;;  </span></span>
<span class="line"><span>    if (&#39;WebSocket&#39; in window) {  </span></span>
<span class="line"><span>        ws = new WebSocket(target);  </span></span>
<span class="line"><span>    } else if (&#39;MozWebSocket&#39; in window) {  </span></span>
<span class="line"><span>        ws = new MozWebSocket(target);  </span></span>
<span class="line"><span>    } else {  </span></span>
<span class="line"><span>        alert(&#39;WebSocket is not supported by this browser.&#39;);  </span></span>
<span class="line"><span>    }  </span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>    ws.onopen = function(obj){  </span></span>
<span class="line"><span>        console.info(&#39;open&#39;) ;  </span></span>
<span class="line"><span>        console.info(obj) ;  </span></span>
<span class="line"><span>    } ;  </span></span>
<span class="line"><span>      </span></span>
<span class="line"><span>    ws.onclose = function (obj) {  </span></span>
<span class="line"><span>        console.info(&#39;close&#39;) ;  </span></span>
<span class="line"><span>        console.info(obj) ;  </span></span>
<span class="line"><span>    } ;  </span></span>
<span class="line"><span>    ws.onmessage = function(obj){  </span></span>
<span class="line"><span>        console.info(obj) ;  </span></span>
<span class="line"><span>        document.getElementById(&#39;show&#39;).value=obj.data;  </span></span>
<span class="line"><span>    } ;  </span></span>
<span class="line"><span>    function q(){  </span></span>
<span class="line"><span>        ws.send(document.getElementById(&#39;msg&#39;).value);  </span></span>
<span class="line"><span>    }  </span></span>
<span class="line"><span>&lt;/script&gt;  </span></span>
<span class="line"><span>&lt;/body&gt;</span></span>
<span class="line"><span>&lt;/html&gt;</span></span></code></pre></div><p>date: 2017-11-27 16:00:00 author: &quot;Gao Fei&quot;</p>`,13)]))}const S=s(l,[["render",t]]);export{g as __pageData,S as default};
