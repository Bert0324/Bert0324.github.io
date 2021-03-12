# Cross Original Resource Sharing

For security reasons, browsers restrict cross-origin HTTP requests initiated from scripts.

So only in the browser, we have to consider about cors.

## Allow CORS

### Some HTML tags

Such as `<img>` or `<script>`, they will not be restricted by browsers' cross-domain policy. But the problem is that it can't process response.

### JSONP

If we want to get data from other site, and the server has designed JSONP API for us, we can use it. For example:

Client side:

```JavaScript
function jsonp(url, callback) {
    window.callback = callback;
    let script = document.createElement('script');
    script.setAttribute("type","text/javascript");
    script.src = url;
    document.body.insertBefore(script, document.body.lastChild);
}

jsonp("http://localhost:9093/jsonp", data => {
    //do something to the data got from the server
});
```

Server side (Node.js):

```JavaScript
res.writeHead(200, {"Content-Type":"application/javascript"};
res.end(`window.callback(${JSON.stringify({a:1,b:2};)})`);
```

### `Access-Control-Allow-Methods`

If response headers include `Access-Control-Allow-Methods`, the browser know the server allow CORS. Such as below:

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

## Credentials

Sending request to third party domain with cookies. in `fetch`, set `credentials` to `include`, `mode` to `cors`.

The server response headers must include `Access-Control-Allow-Credentials: true`, if not, the client will be not allowed to access the response content.

> Notice: When making credentialed requests to a different domain, third-party cookie policies will still apply. The policy is always enforced independent of any setup on the server and the client, as described in this chapter.

## Headers

When cors, the client can not access all http response headers, except it's [CORS-safelisted response header](https://developer.mozilla.org/en-US/docs/Glossary/CORS-safelisted_response_header).

For example, if want to redirect and append `location` to response headers, we should append `Access-Control-Expose-Headers: location` first.

## Reference

- <https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS>
