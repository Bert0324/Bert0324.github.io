# Webpack

## Module, Chunk and Bundle

- **Module**: Discrete chunks of functionality that provide a smaller surface area than a full program. Well-written modules provide solid abstractions and encapsulation boundaries which make up a coherent design and clear purpose.

- **Chunk**: This webpack-specific term is used **internally** to manage the bundling process. Bundles are composed out of chunks, of which there are several types (e.g. entry and child). Typically, chunks directly correspond with the output bundles however, there are some configurations that don't yield a one-to-one relationship.

- **Bundle**: Produced from a number of distinct modules, bundles contain the final versions of source files that have already undergone the loading and compilation process.

<img src='../assets/webpack_bundle_chunks.png' width="500px">

## Optimize Building Speed

- optimize babel-loader
  1. open `cacheDirectory`
  2. only `includes` src path
- noParse
  1. `noPase: [/react\.production\.min\.js$/]`, Notice: noParse shouldn't includes those packages which use `require`.
- thread-loader
  1. open multiple workers to process.
- ParallelUglifyPlugin

## Optimize Bundle

- mode set as `production`
- tiny images parsed as Base64
- bundle hash
- IgnorePlugin
  1. `new IgnorePlugin(/^\.\/locale$/, /moment$/),`
- split bundle: vendor bundle and common bundle
- lazy load
- scope hoisting
- tree shaking

## Building Process

## Loader

## Plugin

### splitChunks

By default webpack v4+ provides new common chunks strategies out of the box for dynamically imported modules. See available options for configuring this behavior in the SplitChunksPlugin page.

In our final bundles, the part of our own codes is changing frequently compared to the codes from node_modules. If they are in together,
every time we update the code, the bundle name and content will change, so the client has to reload the whole files. 

In this way, `splitChunks` can split vendor and common, set like as below:

```js
splitChunks: {
        chunks: 'all',
        name: false,
      },
```

### runtimeChunk

This option is to coordinate `splitChunks`, when the vendor code is split from the common, the runtime code whose responsibility is to manage the relationship of files, will change frequently as the common code's change will change it.

In this way, it is imperative to split runtime code for the long-term caching.

In my understanding, `splitChunks` and `runtimeChunk` should use together.

See more in [here](https://developers.google.com/web/fundamentals/performance/webpack/use-long-term-caching)
