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
export default class HOC extends React.Component{
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

export default function Com1() {
  const sharingValue = sharingValue();
  return <div>{sharingValue}</div>;
}

export default function Com2() {
  const sharingValue = sharingValue();
  return <div>{sharingValue}</div>;
}
```

Via Hooks, it is more easy to share common functions without impacting components structure.

## useState

- Returns a stateful value, and a function to update it.

Base on `class` to update a component when `this.state` changing:

```js
class Example extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };
  }

  handleOnClick() {
    this.setState({ count: this.state.count + 1 });
  }

  render() {
    return (
      <div>
        <p>You clicked {this.state.count} times</p>
        <button onClick={this.handleOnClick}>Click me</button>
      </div>
    );
  }
}
```

We have use a

is equal to:

```js
import { useState } from "react";

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

## useEffect

`useState` receives the original value of the state and return an array, whose first element is
current state value and second one is the function to change this state.

For example:

```js
import { useState, useEffect } from "react";

function Example() {
  const [count, setCount] = useState(0);

  // === both operated in componentDidMount and componentDidUpdate:
  useEffect(() => {
    // update title
    document.title = `You clicked ${count} times`;
  });

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
}
```

useEffect === `componentDidMount` + `componentDidUpdate` + `componentWillUnmount`, we don't have to write the same code in these
3 functions.

### useLayoutEffect

## useReducer

## useMemo

## useCallback

## useRef

## Reference

There is a [source code](https://github.com/facebook/react/blob/5f06576f51ece88d846d01abd2ddd575827c6127/packages/react-reconciler/src/ReactFiberHooks.js) of React Hooks for reference.
