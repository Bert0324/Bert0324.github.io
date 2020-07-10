# Promise

`Promise` is a powerful alternative way to replace callback in JS. Compared to callback, `Promise` provides a better way to write coherent codes.

## How to use

First of all, let's see its definition:

```ts
/**
 * Represents the completion of an asynchronous operation
 */
interface Promise<T> {
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;

    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
}
```

The first function in then is resolve function, the second function is reject function which can on catch the error from `reject`, not from `throw`.

The functions `resolve` and `reject` is to change the status of `Promise`.

There is a demo:

```ts
const resolveTask = () => new Promise((resolve, reject) => resolve(1))
.then(res => {
    console.log('resolve', res);
    throw Error('throw error')
}, err => {
    console.log('reject', err);
})
.catch(err => console.log('catch', err));

const rejectTask = () => new Promise((resolve, reject) => reject(1))
.then(res => {
    console.log('resolve', res);
    throw Error('throw error')
}, err => {
    console.log('reject', err);
})
.catch(err => console.log('catch', err));

// resolve 1
// catch Error: throw error
resolveTask();
// reject 1
rejectTask();
```

## Promise.all and Promise.race

About `all` and `race`, I know a really vivid and interesting metaphor: The `all` is a horse race that ends when all horses reach the terminal point, the `race` is a horse race that ends when the first horse reaches the terminal point.

In other word, the `all` will return results of all callback tasks, the `race` will return the callback result of the first finished task.

Notice, `race` and `all` both will run the whole asynchronize task, the only different is the final returned value.

Their implements are as below:

```ts
const race = (tasks: Promise<unknown>[]) => new Promise((resolve, reject) => {
    tasks.forEach(async task => {
        try {
            const res = await task;
            // a Promise can be resolved once
            resolve(res);
        } catch (e) {
            reject(e);
        }
    });
});


const all = (tasks: Promise<unknown>[]) => new Promise((resolve, reject) => {
    const res = [];
    tasks.forEach(async task => {
        try {
            const data = await task;
            res.push(data);
            if (res.length === tasks.length) resolve(res);
        } catch (e) {
            reject(e);
        }
    });
});

Promise.prototype.myFinally = function(cb) {
    return this.then(
        v => this.constructor.resolve(cb()).then(() => v),
        e => this.constructor.resolve(cb()).then(() => { throw e })
    )
};

```

## Promise parallel

Promise doesn't provide a parallel function. There is an inofficial implementation:

```ts
const parallelByFor = tasks => new Promise((resolve, reject) => {
    const res = [];
    for (const task of tasks) {
        task.then(data => {
            res.push(data);
        }).catch(reject);
    }
    resolve(res);
});

const parallelByRecursion = tasks => new Promise((resolve, reject) => {
    const res = [];
    const iter = async () => {
        if (tasks.length > 0) {
            const task = tasks.shift();
            const data = await task;
            res.push(data);
            iter();
        }
    };
    try {
        await iter();
        resolve(res);
    } catch (e) {
        reject(e);
    }
});
```

## Promise implementation

For me, the key point to understand Promise's then and catch is the event-loop. Because the main thread task will be operated to the end first. So the `thenList` and `onCatch` must be ready when the first callback starts.

There is a simple example I wrote:

```ts
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

But, if in `then` return a new `Promise` object, it can't be resolved in the next `then`, so the code needs update:

```ts
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

## async & await

`async` and `await` it a better solution to replace `then`. Writing asynchronize codes with synchronize sequence.

### What is async function

Actually, `async function` will return an `AsyncFunction` object, which can be created as below (notice: it is not a global variable):

```ts
Object.getPrototypeOf(async function(){}).constructor
```

### always return Promise

It will always return a Promise object, even if we return other things:

```ts
async function task() {
    return 1;
}
console.log(task())     // Promise { 1 }
```

### await can only get Promise.resolve

The `await` operator is used to wait for a `Promise`. It can only be used inside an `async function`. But it can only receive `Promise.resolve`. For example:

If the `Promise` is rejected, the await expression throws the rejected value.

```ts
(async function () {
    const result = await Promise.resolve('success');
    console.log(result);
})();   // success

(async function () {
    const result = await Promise.reject('success');
    console.log(result);
})()    // UnhandledPromiseRejectionWarning: success
```

## Conclusion

In this way, for me, when I don't care about the error, I perfer to use `throw Error`, when I want to process
error, `Promise.reject` maybe more useful.
