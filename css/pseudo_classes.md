# Pseudo Classes and Pseudo Elements

CSS introduces the concepts of pseudo-elements and pseudo-classes to permit formatting based on information that lies outside the document tree.

## Pseudo Classes

A pseudo-class filters existing elements when the filter condition is not exist in DOM, such as `hover` and `active`.

### Example: `:hover`

- :hover: Selects links on mouse over

```html
<div class="test-class">
  <p>first line</p>
</div>
<style>
.test-class p:hover {
    color: red;
}
</style>
```

## Pseudo Elements

A pseudo-element is a new fake element when the selected elements is not exist in DOM, such as first character in a `<p>` tag.

### Example: `::before` and `::after`

- ::before: Insert content before every `<p>` element
- ::after: Insert content after every `<p>` element

```html
<div class="test-elements">
  <p>first line</p>
  <p>second line</p>
  <p>third line</p>
</div>
<style>
.test-elements p::after {
    content: " - after";
}
.test-elements p::before {
    content: "before - ";
}
</style>
```

## Reference

- <https://www.w3schools.com/css/css_pseudo_classes.asp>
- <https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-classes>
