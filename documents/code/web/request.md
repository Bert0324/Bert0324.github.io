# Http Request

## `XMLHttpRequest` Basic Usage

```js
const request = new XMLHttpRequest();
request.addEventListener("load", () => console.log(request.responseText));
request.open("GET", "https://www.google.com");
request.send();
```

## `fetch` Basic Usage

get `ReadableStream`:

```ts
const data = await (await fetch('https://www.google.com')).text();
```

post data:

```ts
const postData = (url, data, encodeType) => fetch(url, {
	body: JSON.stringify(data),
	cache: 'no-cache',
	credentials: 'same-origin',
	headers: {
		'content-type': encodeType
	},
	method: 'POST',
	mode: 'cors',
	redirect: 'follow',
	referrer: 'no-referrer',
});
```

## Abort Request

Aborting request by `AbortController` with `signal`.

```ts
const { signal, abort } = new AbortController();

const request = async (url: string, callback: Function) => {
    const res = await fetch(url, { signal });
    callback(res);
};

request();
abort();    // request is aborted
```

## 4 POST data encoded ways

We can set post data format method by `Content-Type` in http request headers, or change `<form>`'s `enctype` attribute. 

1. application/x-www-form-urlencoded

As the name suggests, it encoded data like url: 

```text
a=1&b=2
```

This is `<form>`'s default encode type.

2. application/json

It will serialize contents as JSON:

```json
{ "a": 1, "b": 2 }
```

3. multipart/form-data

It will generate a boundary in http message started by `------`, end by `\n`, contents are recorded as key-value. Moreover, in the boundary `Content-Type` can be set as `image/png` to save images or files.

Like as below:

<img src="../assets/multipart_encode.png" width="600px"/>

4. text/xml

It will send plain content as text, such as using XML to transfer data.

## Set Max Number of Concurrency

### 固定任务

```ts
/**
 * @param {Function[]} functions
 * @param {number} n
 * @return {Function}
 */
var promisePool = async function (functions, n) {
  let count = 0;
  const map = new Map();
  const handler = async () => {
    if (count < n && functions.length) {
      const task = functions.shift();
      count += 1;
      const res = await task();
      count -= 1;
      const rs = map.get(task);
      map.delete(task);
      rs(res);
      handler();
    }
  };
  const promises = functions.map(task => {
    return new Promise(resolve => {
      map.set(task, resolve);
    });
  });
  let i = 0;
  while (i < n) {
    handler();
    i++;
  }
  return Promise.all(promises);
};

/**
 * const sleep = (t) => new Promise(res => setTimeout(res, t));
 * promisePool([() => sleep(500), () => sleep(400)], 1)
 *   .then(console.log) // After 900ms
 */

```

### 动态任务

```js
class Scheduler {
  constructor(size) {
    this.size = size;
    this.count = 0;
    this.queue = [];
    this.rs = new Map();
  }

  async handler() {
    if (this.count < this.size && this.queue.length) {
      const task = this.queue.shift();
      this.count += 1;
      const res = await task();
      this.count -= 1;
      const resolve = this.rs.get(task);
      resolve(res);
      this.rs.delete(task);
      this.handler();
    }
  }

  add(task) {
    this.queue.push(task);
    return new Promise(resolve => {
      this.rs.set(task, resolve);
      this.handler();
    });
  }
}

const timeout = time =>
  new Promise(resolve => {
    setTimeout(() => resolve(time), time);
  });

const scheduler = new Scheduler(2);
const addTask = (time, order) => {
  scheduler.add(() => timeout(time)).then(res => console.log(order, res));
};

addTask(1000, '1');
addTask(500, '2');
addTask(300, '3');
addTask(400, '4'); // output: 2 3 1 4
```

## Reference

- <https://imququ.com/post/four-ways-to-post-data-in-http.html>
- <https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch>
- <https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement/enctype>
