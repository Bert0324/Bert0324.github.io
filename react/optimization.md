# Optimization

## Don't use anonymous function in JSX

if writing anonymous function in JSX, every time React rerender, it will re-execute the anonymous function.

Because React uses `===` to compare `props`:

```js
(() => {}) === (() => {}); // false
```

`Function` object in JS is reference type, in this way, even the same anonymous function will be treated as different object to trigger re-execute.

