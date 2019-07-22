There is an official [handbook](https://github.com/brigand/babel-plugin-handbook/blob/master/README.md), which is really useful for me to learn babel, is highly recommend。

## AST

In my understanding, it likes Virtual DOM Tree, using JS object to process and organize data. There is a [playground](https://astexplorer.net/).
It can be edit via visitor functions like as below:

```JavaScript
module.exports = function(babel){
    return {
        visitor:{
            ImportDeclaration(path){
                console.log(path.node.source.value);    //print import value
            }
        }
    }
};
```


## Babel Stages

1. parse

parse raw file content to AST:

```JavaScript
let ast = require('@babel/parser').parse(`let a = 1;`);
```

2. transform

In this stage, plugin and presets can be processed in inverted order.

3. generate

using AST to generate codes.

```JavaScript
let code = require('@babel/generator')(ast, { /* options */ }, source);
```

## plugin and presets

There are so many plugins for babel, even babel's core function is taken part to many plugins, such as "plugin-transform-arrow-functions".
So it can be very tedious to set plugins one by one. Presets is a gather of plugins.







