For some of simple components, hooks are more convenient and easy to reuse. For example:

```js
class Example extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };
  }

  render() {
    return (
      <div>
        <p>You clicked {this.state.count} times</p>
        <button onClick={() => this.setState({ count: this.state.count + 1 })}>
          Click me
        </button>
      </div>
    );
  }
}
```

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

### useState

`useState` receives the original value of the state and return an array, whose first element is
current state value and second one is the function to change this state.

### useEffect

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
