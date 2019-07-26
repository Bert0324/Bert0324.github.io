## Box Model

All HTML elements can be considered as boxes. In CSS, the term "box model" is used when talking about design and layout.

The CSS box model is essentially a box that wraps around every HTML element. It consists of: margins, borders, padding, and the actual content. 

There is a screenshot from Chrome:

<img src="../assets/box_model.png" width="400"/>

## Margin collapse

You can see this example in [Here](https://jsfiddle.net/d9zb13jy/):

```html
<div>
    <p>p1</p>
    <p>p2</p>
</div>
```

```css
p{
    margin: 10px;
}
```

In the final result, the top margin of p2 is 0. In other word, its margin merged with p1's bottom margin.

But if we set `float: left;`, the horizontal margin won't collapse. As only one type of margin can collapse: Vertical (top and bottom). Margin collapse never applies to horizontal (left and right) margins.

## height and width in Box Model





## BFC



