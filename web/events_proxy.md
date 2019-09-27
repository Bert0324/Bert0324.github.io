If there is a list including lots of lines, and every line has different events. In this situation, if we bind an event to every lines, it will cost a large number of memory. So, normally, using event proxy to do it. 

For the HTML like below:

```HTML
<ul id="list">
    <li>1</li>
    <li>2</li>
    <li>3</li>
</ul>
```

use event proxy:

```JavaScript
document.getElementById('list').addEventListener('click', e=>{
    if (e.target.nodeName.toLocaleLowerCase() === 'li'){
        console.log('the content is: ', e.target.innerHTML);
    }
})
```

In order to distinguish the element, we can use innerHTML or other things that is distinct for child elements. Except that, if the parent element has its own event, to avoid emit multiple events, we need to use ` e.stopPropagation() ` to stop event bubbling or trapping. 

In React, its events will be bind to `document`  object, which is the enter of all events. The DOM events will first from the top parent child propagates to the target element, after that from the target element propagates back to the top parent element. In React, it will trigger the event when the event is bubbling back to the `document`. The SyntheticEvent has the same API in W3C standard, so` e.preventDefault()` or other event functions can be used.





