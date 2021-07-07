# Node Dubug

本文的项目demo：<https://github.com/Bert0324/node-debugger-demo>

众所周知，跑在node平台上的js是解释型的语言，因此断点调试必须要基于node的debug protocol，而非直接基于cpu的指令集。

较为主流的debug方式如下：

## `console.log`

兄弟们无须多言，对前端人员非常友好，与浏览器中调试一样，在代码中需要调试的地方直接写上，只是展示形式有所不同，在Node中是在终端命令行中打印。

这是最简单快速的调试手段，缺点也很明显，对原有代码入侵较大，在特定场景中使用较局限，而且不是同步的。

## v8 Debugger Protocol

[node-inspector](https://github.com/node-inspector/node-inspector)即是基于此protocol。但是已经被v8 Inspector Protocol取代。

## v8 Inspector Protocol

node提供了v8 Inspector Protocol，可以使用第三方的 Client/IDE 等监测和介入 Node(v8) 运行过程，进行调试。通过 websocket与 Client/IDE 交互，同时基于 Chrome/Chromium 浏览器的 devtools 提供了图形化的调试界面。

- `yarn legacy`
- `open http://localhost:5858/json/list`
- 打开devtoolsFrontendUrl

## VScode支持

使用浏览器调试的确更符合前端的使用习惯，但是直接使用ide调试显然才是更高级的享受。这里用vscode做例子。

- 打开JavaScript Debug Terminal (新打开一个vscode window必须要重新打开一个新的jdt)
- attach breakpoints
- `yarn vscode`

配合nodemon更显丝滑。

## Typescript的node调试

针对ts的调试，有两种方案。

### sourceMap的方式

在tsconfig.json上设置`"sourceMap": true`。

- `yarn ts`

### 使用ts-node

[ts-node](https://github.com/TypeStrong/ts-node)已经集成了debug的功能，通过ts-node可以直接在vscode上调试。

- 打开JavaScript Debug Terminal (新打开一个vscode window必须要重新打开一个新的jdt)
- attach breakpoints
- `yarn tsnode` 

## Addition: 命令行的动态ts引入

```ts
#! /usr/bin/env node
require('ts-node').register({
  typeCheck: true,
  files: true,
});
require('./bin');
```

## Reference

- <https://v8.dev/docs/inspector>
