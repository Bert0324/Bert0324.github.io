# For Loop

## for-in VS Object.keys

for-in can access whole properties' enumerable name, including prototype.

Object.keys can only access object itself properties' enumerable name, not including prototype.

```ts
const obj = { a:1 };
const obj2 = Object.create(obj);
obj2.b = 2;

for (let i in obj2){
    console.log(i)  //b, a
}

console.log(Object.keys(obj2)); //["b"]
```

## for-in VS for-of

for a key-value object, for-in will get its key, while key-of can get its value. For example, traverse an
array:

```ts
const arr = [1,2,3];
for (let i in arr){
    console.log(i); //0,1,2
}
for (let item of arr){
    console.log(item);  //1,2,3
}
```

In fact, if it don't need to change the element of the array, `forEach` is better a choice. If it needs to change the element, `map` is better. `forEach` and `map`'s second parameter `thisArg` can change `this` point in the `callback`.

## let in for loop

In any for loop, use `let` to define the variable is always better than `var`. There is a typical example:

```ts
for (var i=0;i<5;i++){
    setTimeout(()=>{
        console.log(i); //5,5,5,5,5
    });
}
for (let i=0;i<5;i++){
    setTimeout(()=>{
        console.log(i); //0,1,2,3,4
    });
}
```

## the performance impact of Nested sequence

```ts
var t1 = new Date().getTime()
for (let i = 0; i < 100; i++) {
  for (let j = 0; j < 1000; j++) {
    for (let k = 0; k < 10000; k++) {
    }
  }
}
var t2 = new Date().getTime()
console.log('first time', t2 - t1)

for (let i = 0; i < 10000; i++) {
  for (let j = 0; j < 1000; j++) {
    for (let k = 0; k < 100; k++) {

    }
  }
}
var t3 = new Date().getTime()
console.log('two time', t3 - t2)
```

Their loop times is the same, but their execution time is different.

The reason is that they have different variable initialization times:

- first loop:

    j: 100
    k: 1000

- second loop:

    j: 10000
    k: 10000 * 1000

Normally, larger surrounding loop, poorer performance.
