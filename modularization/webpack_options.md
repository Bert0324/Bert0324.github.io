There are some options used in webpack.

The options are base on Webpack v4.0.

## mode

[source](https://webpack.js.org/configuration/mode/)

<table>
    <thead>
        <tr>
            <th>Option</th>
            <th>Description</th>
        </tr>
    </thead>
        <tr>
            <td>development</td>
            <td>Sets process.env.NODE_ENV on DefinePlugin to value development . Enables NamedChunksPlugin and NamedModulesPlugin .</td>
        </tr>
        <tr>
            <td>production</td>
            <td>Sets process.env.NODE_ENV on DefinePlugin to value production . Enables FlagDependencyUsagePlugin , FlagIncludedChunksPlugin , ModuleConcatenationPlugin , NoEmitOnErrorsPlugin , OccurrenceOrderPlugin , SideEffectsFlagPlugin and TerserPlugin .</td>
        </tr>
        <tr>
            <td>none</td>
            <td>Opts out of any default optimization options</td>
        </tr>
</table>

Please remember that setting NODE_ENV doesn't automatically set mode.

## bail

[source](https://webpack.js.org/configuration/other-options/#bail).

Fail out on the first error instead of tolerating it. By default webpack will log these errors in red in the terminal, as well as the browser console when using HMR, but continue bundling. 

Normally, in development, I prefer to set it as `false`, which is the default, because whole errors can be showed in the terminal or maybe some 
errors does not matter in development. But in production, it's better to set it as `true`, as keep compiling is waste time.

## resolve

It changes how modules are resolved. [source](https://webpack.js.org/configuration/resolve)

### modules

Tell webpack what directories should be searched when resolving modules.

The default is `['node_modules']`.

### extensions

Attempt to resolve these extensions in order.

The default is `[".js", ".json"]`.

For example, `import './index.js''` can be `import './index'`

### alias

Create aliases to import or require certain modules more easily.

### plugins

A list of additional resolve plugins which should be applied.

## resolveLoader

This set of options is identical to the resolve property set above, 
but is used only to resolve webpack's loader packages (such as babel, css-loader). Default:

```js
module.exports = {
  //...
  resolveLoader: {
    modules: ['node_modules'],
    extensions: ['.js', '.json'],
    mainFields: ['loader', 'main']
  }
};
```

## node

These options configure whether to polyfill or mock certain Node.js globals and modules. This allows code originally written for the Node.js environment to run in other environments like the browser.

This feature is provided by webpack's internal NodeStuffPlugin plugin. If the target is "web" (default) or "webworker", the NodeSourcePlugin plugin is also activated.

## performance

It allows you to control how webpack notifies you of assets and entry points that exceed a specific file limit. 

`create-react-app` uses `FileSizeReporter` to replace it.

## devtool

This option controls if and how source maps are generated.

After compiling, the code which is running is quite different from the source code, so the source map's function is to help us to find the place of error in 
source code.

## optimization

[source](https://webpack.js.org/configuration/optimization/).

Since version 4 webpack runs optimizations for you depending on the chosen mode, still all optimizations are available for manual configuration and overrides.

### minimize

Tell webpack to minimize the bundle using the TerserPlugin.

This is true by default in production mode.

It will less the size of bundle, but spend more time in compiling.

### minimizer

Allows you to override the default minimizer by providing a different one or more customized TerserPlugin instances.

See more TerserPlugin options in [here](https://webpack.js.org/plugins/terser-webpack-plugin/)

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
