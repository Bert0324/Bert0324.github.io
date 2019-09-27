## Basic use

As we know, JS only has one thread to process CPU tasks. In order to improve its calculation performance,
like other languages' multiple threads function, Web Worker can create a new thread that can be in charge of CPU-bound
tasks.

For example:

```js
//main thread
const worker = new Worker('worker.js');
worker.postMessage('Hi');
worker.onmessage = e => {
    console.log(e.data);
    worker.terminate();
}

//web worker
importScripts('....');  //load other reource

const _self = this;
_self.addEventListener('message', e => {
    console.log(e.data);
    _self.postMessage('I am working');
})
```

Except using a independent as Web Worker, a Blob object can be too. like:

```js
const task = new Blob([`importScripts('....');  //load other reource
                        
                        const _self = this;
                        _self.addEventListener('message', e => {
                            console.log(e.data);
                            _self.postMessage('I am working');
                        })`],  { type: 'application/javascript' });
const worker = new Worker(URL.createObjectURL(task));
worker.postMessage('Hi');
worker.onmessage = e => {
    console.log(e.data);
    worker.terminate();
}
```

## Worker-loader

[worker-loader](https://github.com/webpack-contrib/worker-loader) uses webpack to pack worker.js file to string and load in 
main thread, which is more convenient to use and maintain.

## Differences compared to main thread

Compared to main thread, Web Worker has some limits such as:

### same source

the script file loaded by Web Worker must from the same source of main thread script file.

### DOM operation

Web Worker cannot operate DOM, any DOM operation should be in main thread script. window.navigator and 
location is accessible in Web Worker.

### context

Web Worker has an independent context, any communication with main thread has to transfer by 
message.
