The problem is from the [link](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/39).

There is a multi-level layers array:

```JavaScript
var arr = [ [1, 2, 2], [3, 4, 5, 5], [6, 7, 8, 9, [11, 12, [12, 13, [14] ] ] ], 10];
```

How can I get a plain array and sort it without repetition? My thinking is as below:

```JavaScript
function flatten(source){
    if (Object.prototype.toString.call(source) !== '[object Array]'){
        return [source];
    }
    let target = [];
    for (let i in source){
        target = target.concat(flatten(source[i]));
    }
    return target;
}
let result = Array.from(new Set(flatten(arr))).sort((a,b)=>a-b);
console.log(result);
```

There is a more clear way I found:
```JavaScript
Array.from(new Set(arr.flat(Number.POSITIVE_INFINITY))).sort((a,b)=>a-b);
```

If you have some better way to solve this question, welcome to write it!

 