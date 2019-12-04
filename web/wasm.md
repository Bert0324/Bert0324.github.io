# WebAssesmbly

## What is WebAssesmbly

Old rules, let's see the definition of WebAssesmbly:

> WebAssembly is a binary instruction format for a stack-based virtual machine.

So, WASM is not a specific programming language, but a bytecode standard. Whatever we write any language, it will be finally compiled to LLVM bytecode implemented by the language's compiler itself.

Also, it does't mean their performance is the same.

There is a [browser support list](https://caniuse.com/#search=wasm).

## A WASM Demo

There is a [demo](https://github.com/Bert0324/wasm-demo) base on Rust, to caculate fibonacci(30). I run it in different browsers, their logs are as below:

Chrome:

```log
832040
9
832040
28
```

Safari:

```log
832040
6
832040
35
```

Firefox:

```log
TypeError: Response has unsupported MIME type
```

As we can see, except Firefox haven't support it, in Chrome and Safari, wasm function is able to obviously imporve CPU-bound
tasks.
