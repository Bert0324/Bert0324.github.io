Caching is one of the most important way to improve the response speed of Web Applications. 
Traditionally, Http caching is the one way to do it. Besides, SW is newer and more powerful.

Their order is as below:

<img src="../assets/cache_order.png" width="400"/>

## Http caching

There is no way to directly control Browser Cache from JavaScript. In my understanding, Http caching is to 
use Http headers to control it. There are some steps how browsers to do it:

### search in Browser cache

First, the browser will find in its cache by the file's name and cache mark. If found, browser will directly return
the file, if not, browser send a request to the server.

For example, Chrome will get the cache from the memory or disk like below:

<img src="../assets/http_cache_chrome.png" width="400"/>

There are some headers can be cache mark:

#### Expires

From Http/1.0.

The Expires header contains the date/time after which the response is considered stale.

Invalid dates, like the value 0, represent a date in the past and mean that the resource is already expired.

If there is a Cache-Control header with the "max-age" or "s-max-age" directive in the response, the Expires header is ignored.

#### Cache-Control

From Http/1.1.

The Cache-Control general-header field is used to specify directives for caching mechanisms in both requests and responses. Caching directives are unidirectional, meaning that a given directive in a request is not implying that the same directive is to be given in the response.

There are some common value:

* public: Indicates that the response may be cached by any cache. (both the client and the server proxy)
* private: only the single user can use it.
* no-cache: Forces caches to submit the request to the origin server for validation before releasing a cached copy.
* max-age=<seconds>: Specifies the maximum amount of time a resource will be considered fresh. Contrary to Expires, this directive is relative to the time of the request.

### check cache with server

If the browser cannot find the resource's name, of course it will send request to the server. 

But, if the browser can find the file, but its cache mark shows it has already expired, the browser will send a request with the cache information of the resource.
The server will make the decision whether to use cached resource. 

In this way, server should make the logical judgement to whether the cache is expired.

If this cache is expired, the server will response 200 and with new resource. If it is not modified, the server will response 304.

There is a Http header to help us to conditionally use cache:

#### ETag

Entity Tag's abbreviation. Actually, in Http/1.1 does not regulate how to create ETag's value. 

But, Etag must relative to files' content, such as content hash, or relative to its modified time.

## SW caching

SW can proxy whole requests to check whether needs to update, which is more flexible and powerful, 
see more in my blog [Service Worker](https://github.com/Bert0324/js-playground/blob/master/web/service_worker.md).

## CDN

The full name is Content Delivery Network. It can disperse traffic from the source server and optimize network load.

There are its steps: 

1. First, keep statistics of the access logs of the original domain name to get the addresses of frequently-accessed 
images , and hand over the addresses to the CDN service provider. 

2. Let the CDN service provider capture the resources of the 200,000 addresses as a warm-up. 

3. After the warm-up, we replace original ip address to CDN server address, and conduct CNAME resolution 
to the provided domain name address of the CDN server. 

4. Test whether the images under CDN server which can be cached by the CDN using the wgettool. 

5. If the cache is okay through testing, we then switch part of the traffic to CDN server.

<img src="../assets/cdn_steps.jpg" width="600"/>









