When I was in an interview, the interviewer asked me one question: In the Node.js, is the `require` a global variable?

I said yes because in every module I can use it without require it (How can I require the require???). 

But actually I misunderstood it....

So I checked the official [document](https://nodejs.org/api/modules.html) and found why.

## Global Variables

In Node.JS, the global objects only include:

### Class: Buffer

Used to handle binary data.

### Timer

including `clearImmediate`, `clearInterval`, `clearTimeout`, `setImmediate`, `setInterval` and 
`setTimeout`.

### console

Used to print to stdout and stderr.

### global

The top-level scope in Node.JS. But it isn't recommended to use, the better choice is to 
create a new module to save data and other module can require it.

### process

The process object.

### URL

For processing url, including `URL` and `URLSearchParams`.


## Module wrapper

Each Module, including main module, Before being executed, Node.js will wrap it with a function wrapper that looks like the following:

```js
(function(exports, require, module, __filename, __dirname) {
// Module code actually lives in here
});
```

In this way, we can see, although `exports, require, module, __filename, __dirname` appear to be global but is not, it is from 
the module wrapper. Actually it is vey like AMD, the only difference in Node.js is that we don't need to write the wrapper by ourselves. 

Its source code is in [here](https://github.com/nodejs/node/blob/master/lib/internal/modules/cjs/loader.js). In it, we can see the 
definition of `require`:

```js
Module.prototype.require = function(id) {
  validateString(id, 'id');
  if (id === '') {
    throw new ERR_INVALID_ARG_VALUE('id', id,
                                    'must be a non-empty string');
  }
  requireDepth++;
  try {
    return Module._load(id, this, /* isMain */ false);
  } finally {
    requireDepth--;
  }
};
```

## require load rule

In source code's `Module._resolveFilename`, we can see `require`'s load rule. The simplified code is as below:

```js
Module._resolveFilename = function(request, parent) {

  // step1: if it is core module, directly return
  if (NativeModule.exists(request)) {
    return request;
  }

  // step2: check all possible paths
  var resolvedModule = Module._resolveLookupPaths(request, parent);
  var id = resolvedModule[0];
  var paths = resolvedModule[1];

  // step3: confirm which path is right
  var filename = Module._findPath(request, paths);
  if (!filename) {
    var err = new Error("Cannot find module '" + request + "'");
    err.code = 'MODULE_NOT_FOUND';
    throw err;
  }
  return filename;
};
```

There are some rules:

1. if the path does't start with '/', './', '../'

Firstly Node.js will find in core module. If not found, it finds in current module's `node_modules`.
If still not found, it will keep finding in parent paths until throwing an error not found.

2. if the starts with '/', './', '../'

Node.js will find by the path. If not found, it will automatically search `index.js` and `index.node` in the path. If still not 
found, it will throwing an error not found.

## require.cache

Modules are cached in this object when they are required. By deleting a key value from this object, 
the next require will reload the module. Note that this does not apply to native addons, for which reloading will result in an error.

It can be used for hot reload.








