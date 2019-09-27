Firstly, the definition of these 3 functions:

> slice(begin[, end])
> substr(start[, length])
> substring(from[, to])
> 

Next, try a code.

```JavaScript
let str = "012345";
console.log(`slice:${str.slice(1, 3)}`)
console.log(`substring:${str.substring(1, 3)}`)
console.log(`substr:${str.substr(1, 3)}`)
```
the result is:
```
slice:12
substring:12
substr:123
```

We can see both slice and substring is to return a string from parameter1 (start index) to parameter2 (end index), but notice, it will include start index's char, but not include the end index's char.

For substr, it is to return a string whose length is parameter2 from parameter1 (start index).

## about minus, there are some differences. 

try a code which is trying to extract the final char:

```JavaScript
let str = "012345";
console.log(`slice:${str.slice(-1)}`)
console.log(`substring:${str.substring(-1)}`)
console.log(`substr:${str.substr(-1, 1)}`)
```
the result is:
```
slice:5
substring:012345
substr:5
```
As we can see, both of slice and substr can accept minus as parameter, but substring will transfer any minus parameter as 0.

## for slice and substring, if second parameter is larger than first parameter, what happen?

try a code:
```JavaScript
let str = "012345";
console.log(`slice:${str.slice(4, 2)}`)
console.log(`substring:${str.substring(4, 2)}`)
```
the result is:
```
slice:
substring:23
```
So, we can see, slice will return an empty string, while substring will automatically change their positions to str.substring(2, 4).

That's all, if anyone have some additional remarks or want to right a wrong, welcome to leave a message.







