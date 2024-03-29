# `this`

In most cases, the value of `this` is determined by how a function is called (runtime binding). It can't be set by assignment during execution, and it may be different each time the function is called.

## Runtime binding

There is a demo:

```ts
function bike() {
  console.log(this.name);
}

var name = "Ninja";
var obj1 = { name: "Pulsar", bike: bike };
var obj2 = { name: "Gixxer", bike: bike };

bike();           // "Ninja"
obj1.bike();      // "Pulsar"
obj2.bike();      // "Gixxer"
```

## `apply`, `call` and `bind`

These three functions are able to change `this` value in a function when it calls them.

1. `bind` will change `this` but not run the function. A function can only be bind once.
2. `call` will change `this` and run it.
3. `apply` will change `this`, and params will be passed as an array.

```ts
function fn(a, b) {
    console.log(this, a, b);
}

const bindFn = fn.bind({});
fn.call({}, 1, 2);
fn.apply({}, [1, 2]);
```

## `new` a `Class` in JS

The new keyword in front of any function turns the function call into constructor call and below things occurred when new keyword put in front of function:

1. A brand new empty object gets created
2. new empty object gets linked to prototype property of that function
3. same new empty object gets bound as this keyword for execution context of that function call
4. if that function does not return anything then it implicit returns this object.

The code is as below:

```js
function _new(obj, ...rest){
  // 1 and 2
  const newObj = Object.create(obj.prototype);
  // 3
  const result = obj.apply(newObj, rest);
  // 4
  return typeof result === 'object' ? result : newObj;
}
```

## Write a `bind`

```js
Function.prototype.myBind = function(...args) {
	const thisObj = args.shift();
	const self = this;
	return () => self.apply(thisObj, args);
}
```

## Precedence of `this` keyword bindings

1. First it checks whether the function is called with new keyword.
2. Second it checks whether the function is called with call() or apply() method means explicit binding.
3. Third it checks if the function called via context object (implicit binding).
4. Default global object (undefined in case of strict mode).

## Strict mode

under `use strict;`, global `this` won't point to `window`, instead, it points to `undefined`.

```js
(function() {
    'use strict';
    console.log(this); // undefined
})();

(function() {
    console.log(this); // window
})();
```

And strict mode not allows global variable mistypeVariable exists.

```js
(function() {
    'use strict';
    a = 1; // Uncaught ReferenceError: a is not defined
})();

(function() {
    a = 1; // window.a = 1;
})();
```

## Reference

- <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this>
- <https://codeburst.io/all-about-this-and-new-keywords-in-javascript-38039f71780c>
- MDN Strict mode: <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode>
