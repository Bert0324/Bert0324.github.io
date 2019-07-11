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
    options = new WebpackOptionsDefaulter().process(options);    
    let compiler = new Compiler(options.context);
    compiler.options = options;
    new NodeEnvironmentPlugin().apply(compiler);
    
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
    compiler.options = new WebpackOptionsApply().process(options, compiler);
    compiler.run(callback);
    return compiler;
}
```