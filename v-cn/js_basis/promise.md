Compared to other programming language, in JS, it is so convenient to use the asynchronize callback function, but the problem is the callback hell, making code ugly and difficult to read. So Promise, it is a beautiful solution for callback hell. Especially in Node.JS, it is better to use promise to deal with database operations.

## macrotask and microtask

There is a code as below:

```javaScript
const process = require('process');
console.log(1);
setTimeout(()=>{
    console.log(2);
});
Promise.resolve(3).then(data=>{
    console.log(data);
}).then(()=>{
    console.log(4);
});
process.nextTick(()=>{
    console.log(5);
});
console.log(6);  
```
The result is 1, 6, 5, 3, 4, 2. `process.nextTick` will be operated in the first of event loop. The reason is that in JS, at each time processing event loop, there will only one task (macrotask) to be processed, but microtasks will be kept processed, and its its priority is higher than tasks. To prove it, there is a code:

```javaScript
console.log(1);
setTimeout(()=>{
    console.log(2);
});
Promise.resolve(3).then(data=>{
    console.log(data);
}).then(()=>{
    console.log(4);
});
process.nextTick(()=>{
    console.log(5)
});
(function iter_process(){
    process.nextTick(()=>{
        iter_process();
    })
})();
console.log(6);
```

We can see the result is 1, 6, 5. So microtasks will be kept push in event loop until they are finished. In addition, it will block I/O.

```javaScript
console.log(1);
setTimeout(()=>{
    console.log(2);
});
Promise.resolve(3).then(data=>{
    console.log(data);
}).then(()=>{
    console.log(4);
});
process.nextTick(()=>{
    console.log(5)
});
(function iter_setTime(){
    setTimeout(()=>{
        iter_setTime();
    })
})();
console.log(6);
```

This code's result is the same as the first one. So every time, when a macrotask and all microtasks are finished, next macrotask can be operated.

> macrotasks including: setTimeout, setInterval, setImmediate, I/O, UI rendering

> microtasks including: process.nextTick, Promises, MutationObserver

There is a nice [article](https://jakearchibald.com/2015/tasks-microtasks-queues-and-schedules/) about it.

## Promise all vs race

About all() and race(), I know a really vivid and interesting metaphor: The all() is a horse race that ends when all horses reach the terminal point, the race() is a horse race that ends when the first horse reaches the terminal point. 

In other word, the all() will return results of all callback tasks, the race() will return the callback result of the first finished task. 


## Promise parallel

Promise does't provide a parallel function. There is my thinking:

```javaScript
const request = require('request');

let get = function (url) {
    return new Promise((resolve, reject) => {
        request(url, (err, res, body)=>{
            if (!err && res.statusCode === 200){
                resolve(body);
            } else {
                reject(err);
            }
        })
    })
};

let task1 = {
    req: ()=>get('https://www.npmjs.com'),
    callback: (data)=>{
        console.log(1);
    }
};

let task2 = {
    req: ()=>get('https://www.github.com'),
    callback: (data)=>{
        console.log(2);
    }
};

let task3 = {
    req: ()=>get('https://www.google.com'),
    callback: (data)=>{
        console.log(3);
    }
};

function parallelPromise(tasks){
    const iter = ()=>{
        if (tasks.length > 0){
            let task = tasks.shift();
            task.req().then(data=>{
                task.callback(data);
                iter();
            }).catch(err=>{
                console.log(err);
            })
        }
    };
    iter(tasks);
}

parallelPromise([task1, task2, task3])
```

## build Promise from scratch

For me, the key point to understand Promise's then and catch is the event-loop. Because the main thread 
task will be operated to the end first. So the `thenList` and `onCatch` must be ready when the first callback starts.

There is a simple example I wrote:

```js
class MyPromise{
    constructor(action){
        this.statusList = {
            pending:Symbol('pending'),
            resolved:Symbol('resolved'),
            rejected:Symbol('rejected')
        };
        this.status = this.statusList.pending;  //status
        this.value = void 0;                    //the container for transferring return value
        this.thenList = [];                     //the container saving the callback in then functions
        this.onCatch = void 0;                  //the container saving the catch function
        this.then = function(callback){
            this.thenList.push(callback);
            return this;
        };
        this.catch = function(callback){
            this.onCatch = callback;
            return this;
        };
        action(this.resolve.bind(this), this.reject.bind(this));    //start filling thenList and onCatch
    }

    resolve(value){
        this.status = this.statusList.resolved;
        this.value = value;
        this.thenList.forEach(callback=>{
            this.status = this.statusList.pending;
            try{
                this.value = callback(this.value);
                this.status = this.statusList.resolved;
            } catch (e) {
                if (this.onCatch){
                    this.onCatch(e);
                    this.status = this.statusList.rejected;
                } else {
                    throw new Error(e.toString());
                }
            }
        }, this);
    }

    reject(value){
        this.status = this.statusList.rejected;
        this.value = value;
        if (this.onCatch){
            this.onCatch(this.value);
        } else {
            throw new Error(this.value.toString());
        }
    }
};

new MyPromise((resolve, reject) => {
    require('request')("http://www.npmjs.com", (err, res, body)=>{
        if (!err && res.statusCode === 200){
            resolve(res.statusCode);
        } else {
            reject(err);
        }
    })
}).then(data=>{
    console.log(data);
    return 1;
})
    .then(data=>{
        console.log(data);
    })
    .catch(err=>{
    console.log(err);
});
```

But, if in `then` return a new `Promise` object, it can't be resolved in the next `then`, so the 
code needs update:

```js
    resolve(value){
        this.status = this.statusList.resolved;
        this.value = value;
        for (let i=0;i<this.thenList.length;i++){
            this.status = this.statusList.pending;
            try{
                this.value = this.thenList[i](this.value);
                this.status = this.statusList.resolved;
                if (this.value instanceof MyPromise){               //if it's new Promise, change the target Promise
                    this.value.thenList = this.thenList.splice(i+1);
                    break;
                }
            } catch (e) {
                if (this.onCatch){
                    this.onCatch(e);
                    this.status = this.statusList.rejected;
                } else {
                    throw new Error(e.toString());
                }
            }
        }
    }
```










