for-in can access whole properties' enumerable name, including prototype.

Object.keys can only access object itself properties' enumerable name, not including prototype.

```js

let obj = {a:1};
let obj2 = Object.create(obj);
obj2.b = 2;


for (let i in obj2){
    console.log(i)  //b, a
}


console.log(Object.keys(obj2)); //["b"]
```