# Hooks

## Definition

- Hooks are a new addition in React 16.8. They let you use state and other React features without writing a class.

And now it has 10 official Hooks, including:

> Basic Hooks
>
> > useState<br/>
> > useEffect<br/>
> > useContext<br/>

> Additional Hooks
>
> > useReducer<br/>
> > useCallback<br/>
> > useMemo<br/>
> > useRef<br/>
> > useImperativeHandle<br/>
> > useLayoutEffect<br/>
> > useDebugValue

Basic hooks is more important and frequently-used.

## Motivation

Before using Hooks, the first thing I want to figure out is that which kind of pain spots Hooks can solve?

### Reuse stateful logic

If there are a range of reusable behavior to a component, I may use HOC with render props. Such as below:

```js
class HOC extends React.Component{
 constructor(props) {
    super(props);
    this.state = {
      sharingValue: 0
    }
 }

  componentDidMount(){
    // mock some sharing behavior
    this.setState({
      sharingValue: 1
    })
  }

  render(){
    return (
      <Com1 sharingValue={this.state.sharingValue}/>
      <Com2 sharingValue={this.state.sharingValue}/>
    )
  }
}
```

Obviously, HOC will change the components structure, and lead to "wrapper hell". It means components surrounded by layers of providers, consumers, higher-order components, render props, and other abstractions, which can make filter them out in DevTools
difficult.

<img src="https://i.redd.it/pdvkpgjq6vo11.jpg" width="600">

But if we can use React Hooks, it makes more simple:

```js
const sharingValue = () => {
  const [sharingValue, changeSharingValue] = useState(initialSharingValue);
  return sharingValue;
};

function Com1() {
  const sharingValue = sharingValue();
  return <div>{sharingValue}</div>;
}

function Com2() {
  const sharingValue = sharingValue();
  return <div>{sharingValue}</div>;
}
```

Via Hooks, it is more easy to share common functions without impacting components structure.

## Hooks Examples

### useState

- Returns a stateful value, and a function to update it. `const [state, setState] = useState(initialState);`

Base on `useState` to update a component:

```js
function Example() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
}
```

Except specific value, `useState` can accept a function which will be executed only on the initial render if the initial state
is the result of an expensive computation:

```js
const [state, setState] = useState(() => {
  const initialState = someExpensiveComputation(props);
  return initialState;
});
```

### useReducer

- An alternative to useState. `const [state, dispatch] = useReducer(reducer, initialArg, init);`

Like redux, useReducer can rreturn a state and function to dispatch event, as below:

```js
const handleReducer = () => {
  const initialState = { count: 0 };
  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case "increment":
        return { ...initialState, count: state.count++ };
      case "decrement":
        return { ...initialState, count: state.count-- };
      default:
        throw new Eroor();
    }
  });
  return [
    state,
    action => {
      dispatch(action);
    }
  ];
};
function Example() {
  const [state, dispatch] = handleReducer();
  return (
    <>
      Count: {state.count}
      <button onClick={dispatch({ type: "decrement" })} />
    </>
  );
}
```

## useEffect

- Accepts a function that contains imperative, possibly effectful code. `useEffect(didUpdate);`

Mutations, subscriptions, timers, logging, and other side effects are not allowed inside the main body of a function component (referred to as React’s render phase). Doing so will lead to confusing bugs and inconsistencies in the UI.

Instead, use useEffect. The function passed to useEffect will run after the render is committed to the screen. Think of effects as an escape hatch from React’s purely functional world into the imperative world.

```js
const changeDocumentTitle = useEffect(() => {
  document.title = "Changed in useEffect";
});
```

By default, effects run after every completed render like `componentDidMount`, `componentDidUpdate` and `componentWillUnmount`, but you can choose to fire them only when certain values have changed by second parameter.

```js
const changeDocumentTitle = useEffect(() => {
  document.title = "Changed in useEffect";
}, [someValue]);
```

In addition, the function returned in useEffect callback will be trigger after rendering, as clean-up function.

```js
const changeDocumentTitle = useEffect(() => {
  document.title = "Changed in useEffect";
  return () => {
    console.log("useEffect rerendered");
  };
}, [someValue]);
```

### useLayoutEffect

The signature is identical to useEffect, but it fires synchronously after all DOM mutations. Use this to read layout from the DOM and synchronously re-render. Updates scheduled inside useLayoutEffect will be flushed synchronously, before the browser has a chance to paint.

The point is that useLayoutEffect's time point is before useEffect during DOM render life cycle.

## UseContext

- Accepts a context object (the value returned from React.createContext) and returns the current context value for that context. `const value = useContext(MyContext);`

The current context value is determined by the value prop of the nearest <MyContext.Provider> above the calling component in the tree.

When the nearest <MyContext.Provider> above the component updates, this Hook will trigger a rerender with the latest context value passed to that MyContext provider.

There is a example for passing values cross components:

```js
// parent.js
import { Child } from './child';

export const MyContext = React.createContext();

export function Parent(){
  return (
    <MyContext.Provider value={count:0}>
      <Child/>
    </MyContext.Provider>
  )
}

// child.js
import { MyContext } from './parent';

export function Child(){
  const context = useContext(MyContext);
  return (
    <>
      Count: {context.count}
    </>
  )
}
```

## useRef

- useRef returns a mutable ref object whose .current property is initialized to the passed argument (initialValue). The returned object will persist for the full lifetime of the component. `const refContainer = useRef(initialValue);`

Essentially, useRef is like a “box” that can hold a mutable value in its .current property, like bolow:

```js
const handleFoucsOnClick = () => {
  const ele = useRef(null);
  return {
    ele,
    handleClick: () => {
      ele.current.focus();
    }
  };
};

function Example() {
  const { ele, handleClick } = handleFoucsOnClick();
  return <div ref={ele} onClick={handleClick}></div>;
}
```

## useMemo

- Returns a memoized value. `const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);`

Pass a “create” function and an array of dependencies. useMemo will only recompute the memoized value when one of the dependencies has changed. This optimization helps to avoid expensive calculations on every render.\

### useCallback

- Returns a memoized callback. `const memoizedCallback = useCallback(() => {doSomething(a, b);},[a, b],);`

Like useMemo, when the dependencies has changed, the callback will be triggered.

This is useful when passing callbacks to optimized child components that rely on reference equality to prevent unnecessary renders (e.g. shouldComponentUpdate).

If useMemo and useCallback's second argument is an empty array, the value or function will be <u>memoized once and always returned</u>.

If the second argument is omitted, the value will never be memoized, and the useCallback and the useMemo doesn't do anything.

## Reference

There is a [source code](https://github.com/facebook/react/blob/5f06576f51ece88d846d01abd2ddd575827c6127/packages/react-reconciler/src/ReactFiberHooks.js) of React Hooks for reference.
