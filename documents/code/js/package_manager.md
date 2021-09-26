# Node Package Manager

除了npm，node还有很多其他的包管理工具。感觉还是npm太不给力，node的包管理系统的设计过于灵活导致的，所以才导致了大家八仙过海，各显神通。

本文的demo已经上传至git仓库[package-manager-playground](https://github.com/Bert0324/package-manager-playground).

## 痛点

个人感觉到最痛的有以下这么几个。

### phantom dependencies

<img src='../../../assets/card-phantom.svg' />

由于现在npm和yarn的flat策略，是可以在非显式声明的情况下去引入某些包的. 比如这个[项目](https://github.com/Bert0324/package-manager-playground/blob/main/yarn/index.js)不存在`body-parser`依赖声明，但是因为`express`包含了`body-parser`的依赖，所以可以直接引用`body-parser`.
虽然有时候这种特性非常方便，比如在满足版本的情况下，可以少添加一个包，甚至可以避免下面要说的doppelgangers问题，但是这毕竟是一种不规范的做法.

### doppelgangers

<img src='../../../assets/card-doppel.svg' />

做了一个[demo](https://github.com/Bert0324/package-manager-playground/tree/main/modules), 在npm上发布了四个冗余的包，罪过罪过.....

可以看到，依赖关系是这样的：

```txt
a => b => d@2.0
a => c => d@2.0
a => d@1.0
```

最终，利用yarn装包后文件树是这样的：

<img src='../../../assets/dopple_modules.png' />

可以看到，d@2.0被安装了两次，尽管做了flat的算法，仍然有冗余的依赖安装。

### dependencies redundancy

这个也是老生常谈的问题，随着项目增多，node_modules占用内存的体积会急剧变大，256g的开发机真的已经落后于时代了....

## cargo

在聊node的解决方案之前，其实可以好好的看看

## pnpm

## Reference

- <https://nodejs.org/api/corepack.html>
- <https://pnpm.io/blog/2020/05/27/flat-node-modules-is-not-the-only-way>
- <https://juejin.cn/post/6916101419703468045>
- <https://rushjs.io/>
