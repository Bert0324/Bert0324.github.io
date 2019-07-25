## Event bus

Like Command bus in PHP and EventBus in Android, event bus is a traditional design for the communication 
among different components. Its key point is dispatch/subscribe or emit/on. 

There is a simple example in JS:

```js
export default new class EventBus{
    constructor() {
        this.events = {};
    }

    on(eventName, callback){
        const event = this.events[eventName];
        if (event){
            event.push(callback);
        } else {
            this.events[eventName] = [callback];
        }
    }

    emit(eventName, ...args){
        const event = this.events[eventName];
        if (Array.isArray(event)){
            event.forEach(callback=>{
                callback.apply(this, args);
            })
        }
    }
}();
```
It creates a new object to save and transmit event. 

For me, I feel event bus has these 3 obvious drawbacks:

1. the dispatcher is difficult to know the event result
2. the only identifier is event's name, which means maybe multiple subscriber use one 
event name. It will make data and event structure quite chaotic.
3. it is difficult to trace event process.

## Flux

Flux is a Design Pattern, which complements components by utilizing a unidirectional data flow. 

There is a image to show it:

<img src="https://facebook.github.io/flux/img/overview/flux-simple-f8-diagram-explained-1300w.png" width="600"/>

As we can see, it means views cannot directly update its UI by change data, it has to use Action to change data saved in the Store whose change 
can change UI.

It remind me of `this.setState` in React, which also uses actions to change UI.

In traditional MVC, it looks like:

<img src="../assets/mvc_image.png" width="600"/>

But by Flux, different components who want to change the same state saved in the store have to use the same way (Action) to update UI.

## Redux

Redux is an implementation of Flux, many of the concepts that apply to Redux apply to Flux as well.

### build simple Redux

Firstly, there is a simple Redux:

```js
export function createStore(reducer) {

    let currentState = {};
    const currentListeners = [];

    function getState() {
        return currentState;
    }
    
    function subscribe(event) {
        currentListeners.push(event);
    }
    
    function dispatch(action) {
        currentState = reducer(currentState, action);
        currentListeners.forEach(e=>{e()});
        return action;
    }

    return {getState, subscribe, dispatch}
}
```

There is only one store, compared to Flux that allows multiple store. It does not allow to change data directly. Users 
input Actions instead of data, next, Reducer will transfer Actions to data and update State in Store.

### Principles

There are 3 principle in Redux:

1. Single source of truth

    The state of your whole application is stored in an object tree within a single store.

2. State is read-only

    The only way to change the state is to emit an action, an object describing what happened.
    
3. Changes are made with pure functions

    To specify how the state tree is transformed by actions, you write pure reducers.

### State tree

In a real project, we may have lots of components and have to maintain lots of states. If these whole states are 
saved in one Store with the same Reducer, apparently, the Reducer will be large and complex.

So in Redux, there is `combineReducers` to combine Reducers, making each Reducer is independent.

Each Reducer has its state, which compose the State tree in the Store, definition is as below:

```js
const store = ()=>createStore({
    state1: reducer1,
    state2: reducer2
})
```

## Redux middleware





