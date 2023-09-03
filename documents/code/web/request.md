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

```ts
const request = async (tasks: (() => Promise<any>)[], maxNumber: number) => {
  const ret = [...tasks];
  const _tasks = [...tasks];
  const handler = async () => {
    if (_tasks.length) {
      const task = _tasks.shift();
      const res = await task!();
      const i = ret.findIndex(v => v === task);
      ret[i] = res;
      await handler();
    }
  };
  await Promise.all(Array(maxNumber).fill(handler).map(h => h()));
  return ret;
};
```

## Reference

- <https://imququ.com/post/four-ways-to-post-data-in-http.html>
- <https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch>
- <https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement/enctype>
