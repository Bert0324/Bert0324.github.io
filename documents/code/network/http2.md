# Http2

## Main New Features

1. header compression

In Http1.1, the header is plain text, of course, it is more easy for people to read, but it will cost lots of space when the header is large. Even more, SSL will change the header as binary, which means it is actually necessary to show as plain text. So in Http2, the header becomes index with a static table. It will make each request smaller.

2. multiplexing

In Http1.1, the transmission is parallel, therefore next file has to wait to be transferred until the last transmission is finished, which obviously waste current bandwidth. In Http2, it will transfer multiple files mixed in one connection. Each frame has its id, so the client is able to joint it to a full message.

3. server push

Traditionally, when the client request index.html, server can only send index.html. But in Http2, the server knows if the client load index.html, some resources, such as css or JS file will be requested, server can initiatively send these. For example, in Nginx:

```nginx
location / {
    root   /usr/share/nginx/html;
    index  index.html index.htm;
    http2_push /style.css;
    http2_push /app.js;
}
```

## use Wireshark to capture package

