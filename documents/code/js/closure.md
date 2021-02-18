# Closure

## JS action scope

Compared to other language, in JS, lower action scope can directly visit higher action scope's variables.
For example:

```js
let a = 1;
(function (){
  console.log(a);   //1
})();

(function (){
    let a = 2;
    //define the same name variables won't impact higher action scope
  console.log(a);   //2
})();

console.log(a);     //1
```

### Temporal dead zone

In addition, in ES6, for `let`, there is a new feature named temporal dead zone, which means we can't use variables before we have declared it. In last example, we can change to:

```js
let a = 1;
(function (){
  console.log(a);   //throw Error: a is not defined
  let a = 2;
})();
```

## Access Data in Closure

As we can see, in last example, lower action scope is able to visit higher action scope's variables, but how can higher action scope visit lower action scope?

In JS, once function finished and GC found its variables were not refer in other places， reference count equaled 0, the variable's memory address would be recycled, so user cannot get this variables' value any more.

Therefore, closure offers a way to keep temporary variables, an example as below:

```js
let closure = (function (){
    let a = 1;  
    let keep = function(){
        console.log(a);
    };
    a = 2;
    return keep;
})();
closure();  //2
```

Now we can visit the variable's memory address in the higher action scope.
