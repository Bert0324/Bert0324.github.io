The first time I was exposed to the concept of Life Cycle is in the IOS. There is many 
life cycle in its different components. Android also has the equivalent.

Now, in Web development, React helps us to use it make develop Web application easier.

## constructor

In a class extends React.Component, constructor with `super` is imperative. `super` is a key word to 
instantiate properties that extend from parent class.

And `super` can also be an object like below:

```js
class A{
    constructor() {
        this.a = 1;
    }
    fn(){
        console.log(this.a);
    }
}

class B extends A{
    constructor(props){
        super(props);
        this.a = 2;
        super.fn()         //2, this.a points to current class
    }
}

let b = new B();
```

Also, in constructor, `this.state` can be declared.

## componentWillMount

Before rendering, so the code in it will run in server side when using SSR. Normally, I will use it 
to do AJAX or data calculation. After React v16.3, this function is not safe for AJAX operation.

## componentDidMount

After rendering finished, in it, real DOM is accessible, such as this.setState or get DOM by refs.

## componentWillReceiveProps(nextProps)

When this.props is changing and before rendering again, it will be operated. In it, this.props is previous 
props and nextProps is new props. In 16.3, `getDerivedStateFromProps` is its replacement.

## static getDerivedStateFromProps(nextProps, prevState)

It is a static class function. return an object to trigger rerender and return null to deny, like below:

```js
static getDerivedStateFromProps(nextProps, prevState){
    if (!equal(nextProps, prevState)){
        return nextProps;
    }
    return null;
}
```

## shouldComponentUpdate(nextProps, nextState)

## componentWillUpdate(nextProps, nextState)

## getSnapshotBeforeUpdate(prevProps, prevState)

## componentDidUpdate()

## componentWillUnmount()

## React Fiber

In React Fiber, the code will be separated to many fragments. The operation has higher priority may break some of 
lower priority operation. So, some of life cycle in previous version, which would only operate one time, in new version, may 
operate more than once.

> componentWillMount
> componentWillReceiveProps
> shouldComponentUpdate
> componentWillUpdate

These 4 life cycles may be broken because of other higher priority operation. So AJAX operation is not safe 
in these life cycles anymore, multiple the same AJAX operations are a totally waste.

> componentDidMount
> componentDidUpdate
> componentWillUnmount

Once starting, these 3 life cycles won't be broken. 

> componentWillReceiveProps
> shouldComponentUpdate

These 2 life cycles won't be impacted in React Fiber, because in old version, they will be operated more than one time too.

## Hooks

### concept

### useState

### useEffect

## End

There is a nice page to show it, from [react-lifecycle-methods-diagram](http://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/).

<img src='../assets/react_life_cycle.png' width="800">

If you want to make a right or have some questions, welcome to leave a message.


