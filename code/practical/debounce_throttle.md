# Throttle and Debounce

## Throttle

Thinking about a scenario, there is a button which will send a http request when clicked by a user.

Obviously, if an impatient user clicked it for multiple times at short time, the page would send many unnecessary
requests to the backend.

One solution is to disable the button until the request got its response, one solution is to throttle the button, which means at certain time, it will send only one request.

There is a implementation.

```JavaScript
const throttle = (fn, delay)=>{
    let avaliable = true;                //closure to save the timeout task handler
    return (...args) => {
        if (!avaliable) return;
        avaliable = false;
        setTimeout(()=>{
            fn.apply(this, args);
            avaliable = true;
        }, delay);
    }
};

document.getElementsByTagName('button')[0].addEventListener('click', throttle((e)=>{
    console.log(e);
}, 2000));
```

## Debounce

Unlike throttle, debounce is to cancel last uncompleted task.

If there is a page which will auto save something after the user make an update, we can debounce the save until
no more updates for a set period of time. That way we don't spam the save function.

```JavaScript
const debounce = (fn, delay)=>{
    let task = null;
    return (...args)=>{
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
