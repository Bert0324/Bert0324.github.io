# Browser Rendering

## Browser Structure

Before talking about the steps of browser rendering, it's important to know modern
browser's structure.

There is an image showing FF's structure:

<img src="../assets/browser_structure.png" width="400"/>

Safari and Chrome use Webkit as their rendering engine instead of
Gecko.

Safari uses JavaScriptCore as their JS engine, while Chrome use V8.

[Webkit](https://github.com/WebKit/webkit) is an open source rendering engine originally designed for Linux, and Apple transplanted it to Mac and Windows.

## Process

When a modern browser is rendering a html page, the main steps are as below:

<img src="../assets/browser_rendering.png" width="400"/>

As we can see, there are 5 main steps:

1. parse HTML to DOM Tree.
2. Simultaneous with step 1, parse style to CSSOM Tree.
3. Combine DOM Tree and CSSOM Tree to Render Tree.
4. calculate layout and style, such as position, size, color.
5. render each Render Tree node in the screen.

## `<script>` and `<link>`

When browser meets a `<script>` tag ( or JS ), it will block parsing DOM, and next JS execution until the script finished. Besides, browser will render parsed DOM before this `<script>` ( No one want to look an empty page for a long time).

If browser meets a `<link>` ( or other CSS ) tag, it will keep parsing DOM, block Render, block next execution of JS script.

## Reflow and Repaint

Reflow, or Relayout, means the size of node has changed, in this way, render engine has to recalculate a large part of or total Render Tree.

Repaint, such as set `visibility: hidden` or change font color, doesn't include the change of size, which means it will only impacts a part of Render Tree, not involve others.

In some cases, such as changing elements' style at batch, browser will accumulate the operations changing element's style, and execute them at once, which is called increment reflow or asynchronize reflow.  

## Practice

### `<script>` block DOM parsing

The Demo is in [here](https://github.com/Bert0324/browser_render_demo). We can notice whether page's DOM parsing, Rendering, JS execution is blocked via observing page's changing.

In `/static/1.html` and `/static/2.html`, we can see `<script>` can block DOM parsing by checking whether DOM is `null`.

Except it, we can see the `div` is rendered when the script blocks
the render, it means `<script>` trigger rendering.

### `<link>` block DOM parsing

In `/static/3.html`'s console, we can see the `div` can be logged in the console while it have not be rendered. It means CSS won't block DOM parsing.

