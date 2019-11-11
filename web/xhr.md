# XMLHttpRequest

## Basic example

## Interceptor

## Cancel fetch

## Set POST data in XHR

When posting data, in inspector, we can see their content is different:

<img src="../assets/post_form.png" width="300">

<img src="../assets/post_payload.png" width="300">

The different is their format, the Form Data is like:

```text
a=1&b=2
```

the Payload is Json:

```json
{ "a": 1, "b": 2 }
```

Moreover, seeting Http header `Content-Type` to let server know POST data format:

```js
const xhr = new XMLHttpRequest();
xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded"); // Form Data
xhr.setRequestHeader("Content-type", "application/json"); // Payload
```
