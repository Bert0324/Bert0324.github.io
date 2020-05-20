# Ref

When I want to get the DOM instance of a class in React, refs can be used.

But to be honest, I don't think use real DOM in React is a good idea, in most of situations, I think we'd better to avoid to use refs.

## What can we get from refs

The refs return instance we got is exactly the same as return from React.render(). First check the code as below:

```JavaScript
class Component extends React.Component{
    render(){
        return (
            <button type="button">button2</button>
        )
    }
}
const Element = <button type="button">button1</button>;
const ref_element = ReactDom.render(Element, document.getElementById('root'));
const ref_component = ReactDom.render(<Component/>,document.getElementById('root'));
console.log(ref_element);
console.log(ref_component);
```

So, we can know, if we set ref in DOM element, what we get is DOM element node. When we set ref in React.Component, from ref, we can get the class's instance. It will be different.

## How to use refs

There have been many cases in React official website, use React.createRef(), this.refs is deprecated. And officials highly recommend use callback function in refs.

## Don't use refs in render function

the DOM returned in refs is not real DOM in the page, it may have not been rendered.

## refs and Higher-Order Components(HOC)

if we use refs in HOC in order to directly visit a child component instance, it cannot work, excepting doing some extra works. But to be honest, I think I can use redux to solve most of problems without refs.
