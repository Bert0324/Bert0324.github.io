when we are using traversal like map an array to create components, like as below:

```JavaScript
function Component() {
    return (
        [1,2,3,4].map(value=>(
            <span>{value}</span>
        ))
    )
}
```

This is really common in React, and it will warn:

> Each child in a list should have a unique "key" prop.

## Why we need keys in this situation?

It is okey to not use keys if this array is fixed and never to update it. But, if it is updated without keys, there may be some problems.

React uses diff algorithm to update DOM, every time call useState, React will compare old and new virtual DOM tree to update DOM. For example:

```HTML
//old tree
 <ul>
  <li>1</li>
  <li>2</li>
</ul>
//new tree
 <ul>
  <li>1</li>
  <li>3</li>
</ul>
```
After comparison, React can know only second `<li>` needs to be updated: 
`e.innerHTML = "<li>3<li>"`. But if we want to insert:

```HTML
//old tree
 <ul>
  <li>1</li>
  <li>2</li>
</ul>
//new tree
 <ul>
  <li>1</li>
  <li>3</li>
  <li>2</li>
</ul>
```
React will remove second `<li>`, and insert two new` <li>`. We know this is not the best solution, which is to insert `<li>3<li>` between two` <li>`. And keys can help us to do it:

```HTML
//old tree
 <ul>
  <li key=0>1</li>
  <li key=1>2</li>
</ul>
//new tree
 <ul>
  <li key=0>1</li>
  <li key=2>3</li>
  <li key=1>2</li>
</ul>
```

Because keys can help React to identify VDOM, React can know insert operation is enough in this situation. 

## Why we can not use arrays index as keys?

Obviously, if we use index as keys, when array updated, the index would change, which is meaningless to add keys.

## What can be keys?

The id that is exclusive and invariable toward array items. If there is really no something like this, it can be:

```JavaScript
function Component() {

    let key = 0;
    const getKey = ()=>key++;

    return (
        [1,2,3,4].map(value=>(
            <span key={getKey()}>{value}</span>
        ))
    )
}
```
In addition, keys can not be accessed by this.props as it is used by React itself. Normally, in the same tag and the same structure, especially which are dynamic, keys are imperative to diff algorithm. 

If anyone have some additional remarks or want to right a wrong, welcome to leave a message.






