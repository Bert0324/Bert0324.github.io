# Why we need requestAnimationFrame

When we want to implement some of animation in the browser, the first thing in our mind must be CSS.

But for some tasks such as scrolling down, animation with complex data change, JS is still the only choice.

There is an example in [fiddle](https://jsfiddle.net/y6xshd3e/), we can see the animation will be stuck while the
main thread is beening used.

When under this circumstance, `requestAnimationFrame` will be a good choice.

There is a solution via `requestAnimationFrame` in [fiddle](https://jsfiddle.net/xe7oqfjs/1/).
