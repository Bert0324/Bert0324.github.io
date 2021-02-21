# Promise

`Promise` is a powerful alternative way to replace callback in JS. Compared to callback, `Promise` provides a better way to write coherent codes.

See its standard from [Promise/A+](https://promisesaplus.com/).

## How to use

First of all, let's see its TS definition:

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

## Promise implementation

For me, the key point to understand Promise's then and catch is the event-loop. Because the main thread task will be operated to the end first. So the `thenList` and `onCatch` must be ready when the first callback starts.

There is a simple example I wrote:

```js
class MyPromise {
    static statusList = {
        pending: Symbol("pending"),
        resolved: Symbol("resolved"),
        rejected: Symbol("rejected"),
    };
  
    static resolve = (p) => {
        if (p instanceof MyPromise) return p;
        return new MyPromise((resolve) => resolve(p));
    };
  
    static reject = (p) => {
        if (p instanceof MyPromise) return p;
        return new MyPromise((_, reject) => reject(p));
    };
  
    status = MyPromise.statusList.pending;
    thenList = [];
    onCatch = undefined;
  
    constructor(action) {
        action(this.resolve.bind(this), this.reject?.bind?.(this));
    }
  
    then(cb) {
        this.thenList.push(cb);
        return this;
    }
  
    catch(cb) {
        this.onCatch = cb;
        return this;
    }
  
    resolve(value) {
        queueMicrotask(() => {
            const task = this.thenList.shift().bind(this);
            if (task) {
                MyPromise.resolve(task(value))
                .then(this.resolve.bind(this))
                .catch((e) => {
                    this.status = MyPromise.statusList.rejected;
                    if (this.onCatch) this.onCatch(e);
                    else throw e;
                });
            } else {
                this.status = MyPromise.statusList.resolved;
            }
        });
        return this;
    }
  
    reject(value) {
      this.status = MyPromise.statusList.rejected;
      if (this.onCatch) this.onCatch(value);
      else throw new Error(value);
      return this;
    }
  }
  
var task = () =>
    new MyPromise((resolve) => {
        setTimeout(() => {
        resolve(1);
        }, 1000);
    }).then((v) => {
        console.log(v);
        return v + 1;
    });
task().then((v) => console.log(v));
  
```

## `Promise.all`, `Promise.race`, `Promise.finally` and `Promise.parallel`

About `all` and `race`, I know a really vivid and interesting metaphor: The `all` is a horse race that ends when all horses reach the terminal point, the `race` is a horse race that ends when the first horse reaches the terminal point.

In other word, the `all` will return results of all callback tasks, the `race` will return the callback result of the first finished task.

Notice, `race` and `all` both will run the whole asynchronize task, the only different is the final returned value.

Their implements are as below:

```ts
Promise.myRace = (tasks: Promise<unknown>[]) => new Promise((resolve, reject) => {
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


Promise.myAll = (tasks: Promise<unknown>[]) => new Promise((resolve, reject) => {
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
        v => Promise.resolve(cb()).then(() => v),
        e => Promise.resolve(cb()).then(() => { throw e })
    )
};

Promise.parallelByReduce = (tasks: Promise<unknown>[]) => new Promise((resolve, reject) => {
    try {
        resolve(await tasks.reduce(async (acc, crr) => {
            acc = await acc;
            acc.push(await crr);
            return acc;
        }, []));
    } catch (e) {
        reject(e);
    }
});

Promise.parallelByRecursion = (tasks: Promise<unknown>[]) => new Promise((resolve, reject) => {
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

## async & await

`async` and `await` it a better solution to replace `then`. Writing asynchronize codes with synchronize sequence.

If you use JS bundler, like [Babel](https://babeljs.io/), [esbuild](https://github.com/evanw/esbuild) or [swc](https://github.com/swc-project/swc), `async` and `await` will be transferred to `Generator`, refer to this [article](/documents/code/js/generator.md).

With native `async` and `await`, `async function` will return an `AsyncFunction` object, which can be created as below (notice: it is not a global variable):

```ts
Object.getPrototypeOf(async function(){}).constructor
```

## Reference

- <https://developer.mozilla.org/en-US/docs/Web/API/HTML_DOM_API/Microtask_guide>
