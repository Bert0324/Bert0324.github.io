# WebSocket

WebSocket和Http协议一样，都是在tcp协议上的应用层协议。而和Http协议不一样的是，WebSocket可以在**单条**tcp连接上进行**全双工**通信。

## Features

- [全双工](https://zh.wikipedia.org/wiki/%E9%9B%99%E5%B7%A5#%E5%85%A8%E9%9B%99%E5%B7%A5)

这意味这要实现ws协议，必须要允许两台设备**同时**进行双向数据传输。客户端可以发送data payload给服务端，服务端同时也可以发送data payload给客户端。

- 单条请求

在Http/1.1中，已经有`keep-alive`请求头，多个http请求可以使用同一条tcp连接。但是这种情况下每条http请求还是必须要带上自己的请求头，而在ws协议中，只有一开始的握手需要传输请求头。

## 帧

在握手成功后，传输的就是数据帧(frame)了，由1个或多个帧组成一条完整的消息(message)。

发送端将消息切割成多个帧，并发送给服务端，接收端接收消息帧，并将关联的帧重新组装成完整的消息。

ws数据帧的[统一格式](https://tools.ietf.org/html/rfc6455#section-5.2)如下：

```text
  0                   1                   2                   3
  0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1
 +-+-+-+-+-------+-+-------------+-------------------------------+
 |F|R|R|R| opcode|M| Payload len |    Extended payload length    |
 |I|S|S|S|  (4)  |A|     (7)     |             (16/64)           |
 |N|V|V|V|       |S|             |   (if payload len==126/127)   |
 | |1|2|3|       |K|             |                               |
 +-+-+-+-+-------+-+-------------+ - - - - - - - - - - - - - - - +
 |     Extended payload length continued, if payload len == 127  |
 + - - - - - - - - - - - - - - - +-------------------------------+
 |                               |Masking-key, if MASK set to 1  |
 +-------------------------------+-------------------------------+
 | Masking-key (continued)       |          Payload Data         |
 +-------------------------------- - - - - - - - - - - - - - - - +
 :                     Payload Data continued ...                :
 + - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - +
 |                     Payload Data continued ...                |
 +---------------------------------------------------------------+
```

如果FIN是1，这是message的最后一个分片，如果是0，则不是。

opcode来区分操作的类型。比如0x8表示断开连接，0x0-0x2表示数据交互。

个人的一个问题：关于帧和流的区别，为什么ws使用帧而不是流？[stackoverflow](https://stackoverflow.com/questions/48842357/frame-based-and-stream-based-protocols)有一个回答，但我觉得不是很清晰也没看懂。

## 心跳

WebSocket 为了保持客户端、服务端的实时双向通信，需要确保客户端、服务端之间的 TCP 通道保持连接没有断开。然而，对于长时间没有数据往来的连接，如果依旧长时间保持着，可能会浪费包括的连接资源。

但不排除有些场景，客户端、服务端虽然长时间没有数据往来，但仍需要保持连接。这个时候，可以采用心跳来实现。

发送方 -> 接收方：ping
接收方 -> 发送方：pong
ping、pong 的操作，对应的是 WebSocket 的两个控制帧，opcode分别是0x9、0xA。

有一点，心跳的间隔如果超过了60s，需要额外设置Nginx的两个[`proxy_read_timeout`](https://nginx.org/en/docs/http/ngx_http_proxy_module.html#proxy_read_timeout), [`proxy_send_timeout`](https://nginx.org/en/docs/http/ngx_http_proxy_module.html#proxy_send_timeout)，默认都是60s自动断开连接，需要大于心跳的间隔。

## 请求头

- Connection: Upgrade：表示要升级协议
- Upgrade: websocket：表示要升级到 websocket 协议
- Sec-WebSocket-Version: 13：表示 websocket 的版本。如果服务端不支持该版本，需要返回一个Sec-WebSocket-Versionheader，里面包含服务端支持的版本号。
- Sec-WebSocket-Key：与后面服务端响应首部的Sec-WebSocket-Accept是配套的，提供基本的防护，比如恶意的连接，或者无意的连接

这里要注意一下, 两个和升级有关的请求头`Connection`和`Upgrade`, 都是hop-by-hop headers, 所以在nginx转发的时候都要额外再次`proxy_set_header`。

其他的大部分请求头Websocket和Http是一样的。

生产的请求头如下：

<img src="../assets/ws_headers.png" width="800" />

## NestJs对ws的接入

类似于[Http Adapter](https://docs.nestjs.com/faq/http-adapter#http-adapter), NestJs也可以用[Adapter](https://docs.nestjs.com/websockets/adapter)来使用不同的基础ws服务端框架，比如`ws`和`socket.io`。

在事件的处理上，用[Gateways](https://docs.nestjs.com/websockets/gateways)去分派不同的事件。

## 部署

因为在生产环境中，ws服务会被部署在多台设备或者进程中，和Http不同，ws是有状态的，而且一个进程中的广播事件需要被所有进程同时也广播，这带来了一些问题。

### 保持粘性会话

因为ws是有状态的单条连接，如果经过nginx转发，转发到了不是其handshake的进程，会导致当前连接到的进程无法处理，因为根本没有handshake。

第三方库都有自己实现关于粘性会话的检查，而不是直接400，比如在`socket.io`中，会根据handshake的内容，计算其hash作为session id(`sid`)，作为其唯一的client id，如果错误会返回`sid not found`。

现有的解决方式是设置slb的负载均衡策略为`ip_hash`, 根据用户的ip转发到固定的服务，一台ecs只通过pm2起一个进程。

### 多进程广播事件

一个进程中的一次emit事件，必须要同时通知到其他进程，让他们一起广播，不然就会发生只有某一些用户收到了消息的情况。

现有的解决方式是用redis的发布订阅功能, 基于一个第三方库`socket.io-redis`, 来完成不同进程间的同时广播。

<div style="display: flex; flex-direction: row;">
    <img src="../assets/redis_sub.png" width="400" />
    <img src="../assets/redis_pub.png" width="400" />
</div>

基于`node-redis`的发布订阅demo：

```ts
const redis = require("redis");

const subscriber = redis.createClient();
const publisher = redis.createClient();

let messageCount = 0;

subscriber.on("subscribe", function(channel, count) {
  publisher.publish("a channel", "a message");
  publisher.publish("a channel", "another message");
});

subscriber.on("message", function(channel, message) {
  messageCount += 1;

  console.log("Subscriber received message in channel '" + channel + "': " + message);

  if (messageCount === 2) {
    subscriber.unsubscribe();
    subscriber.quit();
    publisher.quit();
  }
});

subscriber.subscribe("a channel");
```

## Reference

- <https://zh.wikipedia.org/wiki/WebSocket>
- <https://redis.io/topics/pubsub>
- <https://socket.io/docs/using-multiple-nodes/>
- <https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API/Writing_WebSocket_servers>