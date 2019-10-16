## Why we need requestAnimationFrame

When we want to implement some of animation in the browser, the first thing in our mind must be CSS.

But for some tasks such as scrolling down, animation with complex data change, JS is still the only choice.

There is an example in [fiddle](https://jsfiddle.net/y6xshd3e/), we can see the animation will be stuck while the
main thread is beening used.

When under this circumstance, `requestAnimationFrame` will be a good choice.

There is a solution via `requestAnimationFrame` in [fiddle](https://jsfiddle.net/xe7oqfjs/1/).

Compared to the first animation, The second animation is smoother, the reason is that `setTimeout` cannot make sure the
task can be executed within specific interval while there is a task occupying the main thread.

## How requestAnimationFrame works

`requestAnimationFrame` will request that your animation function be called before the browser performs the next repaint. The number of callbacks is usually 60 times per second, but will generally match the display refresh rate in most web browsers as per W3C recommendation.

In this way, `requestAnimationFrame`'s interval is more stable, and aim to animation, browsers do more optimization via `requestAnimationFrame`.
