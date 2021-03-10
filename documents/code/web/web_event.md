# DOM Event

## Event Flow

<img src="./../../../assets/dom_events_model.svg" width="400" />

> Capture => Target => Bubbling

- Trigger Order

1. capturing: parent => child
2. bubbling: child => parent

## Register Handler

### `addEventListener`

> Definitely, it is the recommended way.

### HTML attribute

```html
<button onclick="alert('Hello world!')">
```

> This method should be avoided! It inflates the markup, and makes it less readable. Concerns of content/structure and behavior are not well-separated, making a bug harder to find.

### DOM element properties

```js
// Assuming myButton is a button element
myButton.onclick = function(event){alert('Hello world')}
```

> The problem with this method is that only one handler can be set per element and per event.

## Event Target

### `target`

it is a reference to the object onto which the event was dispatched.

### `currentTarget`

It identifies the current target for the event.

### `this`

If it is not the anonymous function, it identifies the current target for the event.

## Event Methods

### `stopPropagation`

prevents further propagation of the current event in the **capturing and bubbling** phases.

### `stopImmediatePropagation`

It prevents other listeners of the same event from being called.

### `preventDefault`

its default action should not be taken as it normally would be.

> See online examples in [here](https://stackblitz.com/edit/bert-web-event).

## Event Proxy

Assuming there is a list including lots of lines and every line need to bind a event, if we bind a event to each line, it will cost a large number of memory.

Normally, using event proxy to do it, like as below:

```html
<ul id="list">
    <li>1</li>
    <li>2</li>
    <li>3</li>
</ul>

<script>
document.getElementById('list').addEventListener('click', e => {
    if (e.target.nodeName.toLocaleLowerCase() === 'li') {
        console.log('the content is: ', e.target.innerHTML);
    }
});
</script>
```

## Reference

- <https://www.w3.org/TR/DOM-Level-3-Events/#dom-event-architecture>
- <https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Events>
- <https://developer.mozilla.org/en-US/docs/Web/API/Event/target>
