# Memory Leak

## Browser

## NodeJS

Compared to the memory leak in the browser, nodejs memory leak maybe is more dangerous.

As it runs on the server side and normally run for a long time, if the memory leak leads to crush the service, it can be a disaster.

The common leaking codes in nodejs is as below:

1. global variables

2. closure

3. EventEmitter

## How to detect and analysis memory leak

## Reference

- <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/void>
- <https://github.com/bnoordhuis/node-heapdump>
- <https://github.com/node-inspector/v8-profiler>
