## when input webpack --config webpack.config.js, what happened?

Once inputting `webpack`, the `bin/webpack.js` will be operated. After checking cli is installed, the 
`webpack-cli/bin/cli.js` is directly operated. Without any other options, the code can be simplified to:

```JavaScript
const webpack = require("webpack");
let compiler = webpack(options); //options is what we exports in webpack.config.js
compiler.run((err, stats) => {
    compilerCallback(err, stats);  //compilerCallback is to print some of information after compiling
});
``` 

Next, in `webpack/lib/webpack.js`, we can find the main webpack function which can be simplified as below:

```JavaScript
const webpack = (options, callback) => {
    options = new WebpackOptionsDefaulter().process(options);   //initialize options
    let compiler = new Compiler(options.context);   //options.context is the local path
    compiler.options = options;
    new NodeEnvironmentPlugin().apply(compiler);    //compiler gets node environment arguments
    
    if (options.plugins && Array.isArray(options.plugins)) {
        for (const plugin of options.plugins) {
            if (typeof plugin === "function") {
                plugin.call(compiler, compiler);
            } else {
                plugin.apply(compiler);
            }
        }
    }
    compiler.hooks.environment.call();
    compiler.hooks.afterEnvironment.call();
    compiler.options = new WebpackOptionsApply().process(options, compiler);    //process plugins
    return compiler;
}
```

`compiler` object gets all contents about webpack functions, including node environment, the client's options and the local path.

## Compiler Hooks and Complication Hooks

Entering into `webpack/lib/Complier.js`, we can see `compiler` extends from [tapable](https://github.com/webpack/tapable), which defines all hooks' classes, which can be used to create hooks for plugins.

In `this.hooks` of `Complier`, we can all hooks can be used in plugins. [Official Hooks Document](https://webpack.js.org/api/compiler-hooks/).




