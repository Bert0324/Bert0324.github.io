When a web client want to request resources from a cross-domain server, there are 3 ways.

1. HTML tags

such as `<img src=''><link href=''><script src=''> `, these tags will not restricted by browsers' cross-domain policy. From my experience, it is very useful when you need an external server's API to record hit in our own website, and some of parameters can be saved in the attribute's URL.

2. JSONP

If we want to get data from other site, and the server has designed JSONP API for us, we can use it. The principle is that `<script>` is not limited by cross-domain policy, so the server can write data in the script and send it to client. For example:

Client side:
```JavaScript
function jsonp(url, callback) {
    window.callback = callback;
    let script = document.createElement('script');
    script.setAttribute("type","text/javascript");
    script.src = url;
    document.body.insertBefore(script, document.body.lastChild);
}

jsonp("http://localhost:9093/jsonp", function (data) {
    //do something to the data got from the server

});
```

Server side (Node.js):
```JavaScript
let data = {a:1,b:2};   //this data will be sent to the client
res.writeHead(200, {"Content-Type":"application/javascript"};
res.end(`window.callback(${JSON.stringify(data)})`);
```

3. the server enables cross-domain request (Node.js):

```JavaScript
res.setHeader("Access-Control-Allow-Origin", "*");
res.setHeader("Access-Control-Allow-Headers",
    "Access-Control-Allow-Headers, " +
    "Origin,Accept, " +
    "X-Requested-With, " +
    "Content-Type, " +
    "Access-Control-Request-Method, " +
    "Access-Control-Request-Headers");
res.setHeader("Access-Control-Allow-Methods","POST,GET,OPTIONS");
```


