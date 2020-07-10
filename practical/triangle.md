# Draw Triangles By CSS

The key point is to use `border` property.

## A Solid Triangle

```html
<div id="solid-triangle"></div>
<style>
  #solid-triangle {
    width: 0;
    height: 0;
    border: 50px solid transparent;
    border-top: 50px solid blue;
  }
</style>
```

The result is as below:

<div id='solid-triangle'></div>
<style>
#solid-triangle {
    width: 0;
    height: 0;
    border: 50px solid transparent;
    border-top: 50px solid blue;
}
</style>

## An Arrow

```html
<div id="arrow-triangle"></div>
<style>
  #arrow-triangle {
    width: 50px;
    height: 50px;
    border-top: 1px solid black;
    border-right: 1px solid black;
    transform: rotate(45deg);
  }
</style>
```

The result is as below:

<div id='arrow-triangle'></div>
<style>
#arrow-triangle {
    width: 50px;
    height: 50px;
    border-top: 1px solid black;
    border-right: 1px solid black;
    transform: rotate(45deg);
}
</style>
