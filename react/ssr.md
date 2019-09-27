## SSR's advantages

1. For me, the biggest reason is SEO. Although now Google started supporting JS in searching, 
but pure HTML is always better for SEO. 

2. Shorten first page response time. Don't need to waste time in downloading a lots of js files and css files to 
show the page, users can see the page quickly.

## Why is SSR possible in React

I think the main reason is the virtual DOM and node.js. Obviously, in node.js, there is no DOM object. React does't operate 
DOM directly too, it use VDOM to generate and change real DOM. So, in server side, node.js is able to generate a HTML template,
provided that there is no operation involving Browser Object or DOM.

## Key Points

We use Node.js in server side to generate a HTML instead of a Browser JS engine, there are some things I think is worth to notice:

1. No direct DOM and Browser Object operation.

2. Each request has its own status, instead of sharing.

3. Transfer Browser's JS to Node.js

## React's SSR

### static file server

I will start two servers, one is in charge of restful API, and another is charge of static files and SSR.
React has its specific API for SSR. The static files server based on express like as below:

```js
import React from "react";
import ReactDomServer from 'react-dom/server';
import App from '../src/app'
import express from 'express';
import path from 'path';
import fs from 'fs';
const app = express();
const port = 3000;


const SSR = (req, res, next)=>{
    if (req.url === '/index' || req.url === '/'){
        fs.readFile(path.resolve('./build/index.html'), 'utf8', (err, data)=>{
            if (err){
                console.log(err);
                return res.status(500).send('Server Error');
            } else {
                return res.send(data.replace('<div id="root"></div>',
                        `<div id="root">${ReactDomServer.renderToString(<App url={'/index'} env={'node'}/>)}</div>`))
            }
        })
    } else {
        return next();
    }
};
app.use('/media', express.static(path.resolve('media')));
app.use(SSR);
app.use(express.static(path.resolve('build')));
app.use((req, res)=>{
    res.sendFile(path.resolve('./build/index.html'));
});
app.listen(port, ()=>{
    console.log(`listen on http://localhost:${port}`);
});
```


### FrontEnd

in '../src/app', the code is as below:

```js
//return a function to create a store, because every request need a new store
const store = ()=>createStore(combineReducers(reducer), compose(
    applyMiddleware(thunk),
));
export default function (props) {
    return (
        <Provider store={store()}>
            {(()=>{
                //this is for SSR
                if (props.env === 'node'){
                    return (
                        <StaticRouter context={{}} location={props.url}>
                            <Switch>
                                <Route path={'/index'} component={Index}/>
                                <Redirect to={'/index'}/>
                            </Switch>
                        </StaticRouter>
                    )
                } else {
                    //this is for browser
                    return (
                        <BrowserRouter>
                            <Switch>
                            //Page is a dynamic router uses <Suspense> and lazy(), so cannot be render in SSR
                                {Page('/index', "index.page")}
                                {Page('/sub1', "sub1.page")}
                                {Page('/sub1', "sub2.page")}
                                <Redirect to={'/index'}/>
                            </Switch>
                        </BrowserRouter>
                    )
                }
            })()}
        </Provider>
    )
};
```

In server side, `<BrowserRouter>` cannot be used, use `<StaticRouter>` instead. The location property is imperative, without it, it will
render an empty page in server, and redirect in front end may lead to not SSR.

### Compile server code

Obviously, this code cannot directly run in node.js, so we need to compile it. There is a webpack example:

```js
const path = require('path');

module.exports = {
    mode: 'development',
    target: 'node',
    entry: {
        static:"./server/static.js"
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname)
    },
    module: {
        rules: [{
            test: /\.(js|jsx)?$/,
            exclude: /(node_modules)/,
            use: [{
                loader: 'babel-loader',
                options: {
                    presets: ["@babel/preset-react", '@babel/preset-env'],
                }
            }],
        },{
            test: /\.(css|scss)?$/,
            use: ['isomorphic-style-loader', {
                loader: 'css-loader',
                options: {modules: true}
            }]
        }]
    }
};
```

## End

After compile server side code and frontend code, when we start the static files server, we can see `/` and `/index` has been render in server 
side. 

This example does not consider about import images, svg and CSS framework. If you use some of CSS framework such as material-ui, you can find their SSR solution in the official website.

If you have more questions or have better way to do SSR, welcome to leave a message.






