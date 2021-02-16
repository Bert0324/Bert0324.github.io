# WebAssembly

## What is WebAssembly

Old rules, let's see the definition of WebAssembly:

> WebAssembly is a binary instruction format for a stack-based virtual machine.

So, WASM is not a specific programming language, but a bytecode standard. Whatever we write any language, it will be finally compiled to LLVM bytecode implemented by the language's compiler itself.

Also, it doesn't mean their performance is the same.

There is a [browser support list](https://caniuse.com/#search=wasm).

## A WASM Demo

There is a [demo](https://github.com/Bert0324/wasm-demo) base on Rust, to calculate fibonacci(30). I run it in different browsers, their logs are as below:

Chrome:

```
832040
9
832040
28
```

Safari:

```
832040
6
832040
35
```

Firefox:

```
TypeError: Response has unsupported MIME type
```

As we can see, in Chrome and Safari, wasm function is able to obviously improve CPU-bound
tasks.
