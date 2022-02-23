# Generator

## Basic usage

Compared to normal Function, generator function must has a `*`, and has its special 
property: `next`. 

Like in Python, `yield` means to relinquish the control. It makes the function is possible to 
stop, and restart by the controller.

There is a simple example:

```js
function* gen(arr) {
  for (let i of arr){
      yield i;
  }
}

var it = gen([1,2,3]);
it.next();  //value: 1, done: false
it.next();  //value: 2, done: false
it.next();  //value: 3, done: false
it.next();  //value: undefined, done: true
```

In addition, in `next`, it can put a new parameter like as below:

```js
function* gen(arr) {
  for (let i of arr){
      var result = yield i;
      console.log(result);
  }
}
var it = gen([1,2,3]);
it.next(1);  //
it.next(2);  //2
it.next(3);  //3
it.next(4);  //4
```

As we can see, the first `it.next(1)` did not log anything. The reason is that in generator, the `next` will only execute to 
`yield`, so in the first `next`, the variable `result` is not assigned. To prove it:

```js
function* gen(arr) {
    var container ={};
    Object.defineProperty(container, 'result', {
        set:function () {
            console.log('result is defined');
        }
    });
    for (let i of arr){
        container.result = yield i;
        console.log(container.result);
    }
}
var it = gen([1,2,3]);
it.next(1);  //
it.next(2);  //result is defined
it.next(3);  //result is defined
it.next(4);  //result is defined
```



## async and await

Firstly, let's see how typescript to transfer it, see in [here](https://www.typescriptlang.org/play?target=2#code/MYewdgzgLgBATgVzDAvDAhhAnmYMAUAlKgHwwDeAsAFAwYDu6AlrAOTTpxSsDcNdoSLHSoGzNgDMmYJhAAWAUwAmvfvAVQEcZOj7UAvkA) which is based on ES5:

```js
//origin
const run = async () => {
  await 'start';
  const a = await 'finished';
  return a;
}

// transfer. remove some irrelevant codes
var __awaiter = function (generator) {
  function adopt(value) {
    return value instanceof Promise
      ? value
      : new Promise(function (resolve) {
          resolve(value);
        });
  }
  return new Promise(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done
        ? resolve(result.value)
        : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator()).next());
  });
};
const run = () =>
  __awaiter(function* () {
    yield "start";
    const a = yield "finished";
    return a;
  });
```

As we can see, babel use generator + `Promise` to transfer `aysnc` + `await`,
as `yield` can wait until the `Promise` finished.

There is a more simple function, but the principle is the same:

```js
function* gen(task, pages) {
    for (let page of pages){
        yield task(page);
    }
}

var it = gen(task, [1,2]);

while (true){
    let result = it.next();
    result.value.then(data=>{
        console.log(data);
    });
    if (result.done){
        break;
    }
}
```

In Addition, if we want to transfer async/await to compatible with ES3, the compiler will add a `generator` help function.

See a demo:

```js
async function test() {
  return new Promise((r) => {
    console.log(0);
    r();
  });
}

async function run() {
  await test();
  console.log(1);
}

run();
new Promise((r) => {
  r();
}).then(() => {
  console.log(2);
}).then(() => {
  console.log(3);
}).then(() => {
  console.log(4);
})

// 0 2 3 1 4
```

There will be two promises when `await test()`!.
