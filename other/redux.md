## build redux from scratch

The basic use of redux is as below:

```js
const createStore = require('redux').createStore;


function counter(state=0, action) {
    switch (action.type) {
        case 0:
            return state+1;
        case 1:
            return state-1;
        default:
            return state;
    }
}

function listenHandle() {
    const current = store.getState();
    console.log(`current state number ${current}`)
}

const store = createStore(counter);
store.subscribe(listenHandle);

store.dispatch({type:0});
store.dispatch({type:1});
store.dispatch({type:2});
```


