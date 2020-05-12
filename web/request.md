# Http Request

## XMLHttpRequest and Fetch

## Interceptor

## Abort Request

Aborting request by `AbortController` with `signal`.

```ts
const { signal, abort } = new AbortController();

const request = async (url: string, callback: Function) => {
    const res = await fetch(url, { signal });
    callback(res);
}

request();
abort();    // request is aborted
```

## 4 POST data encoded ways

We can set post data format method by `Content-Type` in http request headers. There are 4 ways to encode data contents:

1. application/x-www-form-urlencoded

As the name suggests, it encoded data like url: 

```text
a=1&b=2
```

2. application/json

It will serialize contents as JSON:

```json
{ "a": 1, "b": 2 }
```

3. multipart/form-data

It will generate a boundary in http message started by `------`, end by `\n`, contents are recorded as key-value. Moreover, in the boundary `Content-Type` can be set as `image/png` to save images or files.

4. text/xml

It will send plain content as text.

## Set Max Number of Concurrency

```ts
const request = async (urls: string[], maxNumber: number, callback: Function) => {
    const data = {
        queue: [...urls],
        count: 0,
    };
    const handler = async () => {
        switch (true) {
            case data.queue.length === 0:
                callback();
                break;
            case data.count < maxNumber:
                data.count++;
                await fetch(data.queue.shift());
                data.count--;
                break;
            default:
                handler();
        }
    };
    await handler();
};
```
