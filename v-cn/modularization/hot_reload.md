In Node.js and Browsers, hot reload is different.

## Node.js hot reload

In Node.js, hot reload is to watch files' change, once noticing changes, delete its `require.cache` path and require it again.
The example is as below:

```js
//main.js
const fs = require('fs');
const path = require('path');
const filePath = './value.js';
let value = require(filePath);

setInterval(()=>{
    console.log(value());
}, 2000);

fs.watch(path.resolve(filePath), ((event, filename) => {
    if (filename && event === 'change'){
        Object.keys(require.cache).forEach(cachePath=>{
            if (cachePath === path.resolve(filePath)){
                delete require.cache[cachePath];
                value = require(filePath);
            }
        });
    }
}));


//value.js
module.exports = ()=>3;
```

For file watcher, there is a neat wrapper named [chokidar](https://github.com/paulmillr/chokidar). Besides, 
anti-shake can be added.

[nodemon](https://github.com/remy/nodemon) is already a mature package for Node.js hot reload.

## Browser hot replacement

Unlike Node.js in server side, Browser can never know our files are changed in the server (of course). 
So server need to initiatively notice the browser: Hey! I changed the file and please update it! 

Fortunately, now there is Websocket and its package socket.io instead of polling in browsers.

There is a simple [Demo](https://github.com/Bert0324/web-hot-replacement-demo) I wrote for it.

## Webpack hot module replacement

There is already an official webpack plugin named `HotModuleReplacementPlugin` for it. And with `webpack-dev-server`, the development 
process can be very smooth with automatic compiling and frontend files reload.

The configuration is like as below:

```js
module.exports = {
  // ...
  plugins: [
      new webpack.HotModuleReplacementPlugin(),
  ],
  devServer: {
      hot: true,
    }
}
```

The webpack option `--watch` is also incremental and auto compile.

If you use `create-react-app` to start the project, these configurations are already installed.
