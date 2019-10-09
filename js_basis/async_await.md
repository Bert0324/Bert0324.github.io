Today, I am facing a problem: when using `async` and `await`, which kind of differences between `throw err` and `Promise.reject`?

For example:

```JavaScript
const axios = require('axios');

const instance = axios.create({
    baseURL: `http://www.google.com`,
    timeout: 3000
});
instance.interceptors.response.use(res=>{
}, err => {
    // throw err;
    return Promise.reject({
        msg: err,
        from: 'response'
    })
})
```

Before recognizing their differences, the first thing I need to understand is how `async` and `await` works.

## What is async function

Actually, `async function` will return an `AsyncFunction` object, which can be created as below (notice: it is not a global variable):

```JavaScript
Object.getPrototypeOf(async function(){}).constructor
```

## always return Promise

It will always return a Promise object, even if we return other things:

```JavaScript
async function task() {
    return 1;
}
console.log(task())     // Promise { 1 }
```

## await can only get Promise.resolve

The `await` operator is used to wait for a `Promise`. It can only be used inside an `async function`. But it can only receive `Promise.resolve`. For example:

```JavaScript
(async function () {
    const result = await Promise.resolve('success');
    console.log(result);
})();   // success

(async function () {
    const result = await Promise.reject('success');
    console.log(result);
})()    // UnhandledPromiseRejectionWarning: success
```
