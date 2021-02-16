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

Firstly, let's see how babel to transfer it, see in [here](https://babeljs.io/repl#?babili=false&browsers=&build=&builtIns=false&spec=false&loose=false&code_lz=G4QwTgBALiDODWEC8EAUAHEBzApgSiQD4BvAKAgojBygFcwA7CBnAdwgAUwB7AWwEtYOVCOqxuAG2A4ANFRwArHAGMoeZIQhlKOiBJoQAHgAtIKFuwAaAWQAyACShR0AJRwBHWjlhRUeANzkuhQmYAB03Og4DKgA5ADiAKIAKrFyAAbGTuiwAFwA9PnU7mJh_Az5IOj8-bRCYLAA_Ji4SAAkxC04AL7pclBgXgFBwaERDNQgACYAnj4gUCrGIAy4yBAAZrQMqvzcMXjawbr8G2hjk7MAyjCLyEgoACyHI8fBp-emYfN0sPcoACYAAxAl5vcGUAYzI4Q2HycRSYQAKSuAHkAHJhTANYQXbzofZCZI4QxqYZwt7dCDKBbKYxofBaV4U47UJSqVD4ZksiDdbkQqk4CRCJk83RslS-MY_Op4fngvlwxXHbqBN7S6JTVAMWgSCTkyjdPDDVWkM1wGY7TbbXb7aBweCwPyiyj6KDw3VQACM6xArBA_HdMAQqC9Boobo9EigAN9_sD9pDAPD1MJkhwYQk3CwqDEnrDasoyjT-kz2dz3k9ycCfKAA&debug=false&forceAllTransforms=false&shippedProposals=false&circleciRepo=&evaluate=false&fileSize=false&timeTravel=false&sourceType=module&lineWrap=true&presets=es2017%2Creact%2Cstage-2&prettier=false&targets=&version=7.5.5&externalPlugins=):

```js
//origin
var task = (page)=>{
    return new Promise(((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', `https://reqres.in/api/users?page=${page}`, true);
        xhr.onreadystatechange = function(){
            if (xhr.readyState === 4){
                if (xhr.status === 200){
                    try{
                        resolve(JSON.parse(xhr.responseText));
                    } catch (e) {
                        reject(e)
                    }
                } else {
                    reject(xhr.status)
                }
            }
        };
        xhr.send(null);
    }));
};


async function tasks() {
    let result1 = await task(1);
    let result2 = await task(2);
    console.log(result1);
    console.log(result2);
}


//babel transfer
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
    try { 
        var info = gen[key](arg); 
        var value = info.value; 
    } catch (error) { 
        reject(error); 
        return; 
    } 
    if (info.done) { 
        resolve(value); 
    } else { 
        Promise.resolve(value).then(_next, _throw); 
    } 
}

function _asyncToGenerator(fn) { 
    return function () {
        var self = this, 
            args = arguments; 
        return new Promise(function (resolve, reject) { 
            var gen = fn.apply(self, args); 
            function _next(value) { 
                asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); 
            } 
            function _throw(err) { 
                asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); 
            } 
            _next(undefined); 
        });
    }; 
}

var task = page => {
  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', `https://reqres.in/api/users?page=${page}`, true);
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          try {
            resolve(JSON.parse(xhr.responseText));
          } catch (e) {
            reject(e);
          }
        } else {
          reject(xhr.status);
        }
      }
    };

    xhr.send(null);
  });
};

function tasks() {
  return _tasks.apply(this, arguments);
}

function _tasks() {
  _tasks = _asyncToGenerator(function* () {
    let result1 = yield task(1);
    let result2 = yield task(2);
    console.log(result1);
    console.log(result2);
  });
  return _tasks.apply(this, arguments);
}
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

