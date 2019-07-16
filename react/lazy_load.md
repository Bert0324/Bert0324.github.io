At the beginning, I try to use `react-loadable` to realize router lazy load, but it made me a mess..., an error like below

`Invariant Violation: Element type is invalid: expected a string`

Fortunately, I found in React v16.6, official router lazy load has came out! So I try it and it works perfectly:

```JavaScript

import React from 'react';
import {BrowserRouter, Redirect, Switch, Route} from 'react-router-dom';

function LoadingPage() {
    return (
        <div>Loading...</div>
    )
}

const Page = (path, componentPath, notLazy)=>{
    const Component = React.lazy(() => import(componentPath)
        .then(module=>({
            default:module.default
        })));

    return <Route path={path} component={props=>{
        if (notLazy){
            return  (
                <Component {...props}/>
            )
        } else {
            return  (
                <React.Suspense fallback={LoadingPage()}>
                    <Component {...props}/>
                </React.Suspense>
            )
        }
    }}/>
};

//in index
<BrowserRouter>
    <Switch>
        {Page('/login', "./pages/login")}
        <Redirect to={'/login'}/>
    </Switch>
</BrowserRouter>
```

Dont't need to import other things, simply use React to resolve whole things.

## How it works

React.lazy is to split code, instead of bundling whole code to one file, via it, when using webpack, the JS files can be split. After that, 
when browser is rendering to `<Suspense>`, it will throw an error which is a Promise. In the parent component's `ComponentDidCatch` period, it will catch this Promise, which is in `pending` status, 
the parent component will render `fallback` component when the Promise is in `pending`. One its status becomes `resolve`, the parent component will load real child component and replace `fallback`.



