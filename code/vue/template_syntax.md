# Template Syntax

## `v-if` and `v-show`

`v-if` is to totally remove the component from DOM, instead, `v-show` is to hide the component by `display: none` by CSS.

- If the component will be rendered frequently, `v-show` is the better choice because repaint performs much better than reflow.
- `v-if` can toggle whole component life cycle.

## 