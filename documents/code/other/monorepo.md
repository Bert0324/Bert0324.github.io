# Node Monorepo & Dependencies

最近使用了很多monorepo，就想写一篇文章沉淀一下。

同时提起monorepo，就不得不提到node的模块管理机制。

关于前端的模块管理，可以看 => [JS的模块化和不同模块规范在webpack中的实现](<https://bert0324.github.io/blog/module.html>)

## Why Monorepo

为什么要使用monorepo？

在大部分的情况下，会考虑使用monorepo的现实原因是有拆包的需求。

在此基础上，当一个项目需要同时开发多个npm包时，会马上面临几个很现实的问题：

- 模块引用

如何引用其他正在开发中的模块？每次都发布一次

- 依赖复用

- 构建/发版顺序

## symlink / hardlink

- go to linked files: `cd -P "$symlink dir"`

### node_modules/.bin

## What is MonoRepo

## Yarn Workspace

- see: <https://github.com/yarnpkg/yarn/blob/3119382885ea373d3c13d6a846de743eca8c914b/src/package-linker.js>

### Mutex Lock

## Lerna

## pnpm

## Reference

- <https://classic.yarnpkg.com/en/docs/workspaces/>
- <https://man7.org/linux/man-pages/man2/symlink.2.html>
- <https://yuque.antfin-inc.com/haoli.chl/notebook/mutex-in-lerna>
- <https://cloud.tencent.com/developer/article/1810991>
- <https://juejin.cn/post/6844904150770122759>
- pnpm: <https://zhuanlan.zhihu.com/p/404784010>
