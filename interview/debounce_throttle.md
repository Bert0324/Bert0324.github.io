## Debounce

Thinking about a scenario, there is a button which will send a http request when clicked by a user.

Obviously, if an impatient user click it for multiple times at short time, 

```JavaScript
const debounce = (fn, delay)=>{
    let task = null;                //closure to save the timeout task handler
    return (...args)=>{             //get arguments array (DOM event)
        clearTimeout(task);
        task = setTimeout(()=>{
            fn.apply(this, args);
        }, delay);
    }
};

document.getElementsByTagName('button')[0].addEventListener('click', debounce((e)=>{
    console.log(e);
}, 2000));
```

## Throttle

```JavaScript


```
