A classic problem, not only in JS:

`0.1 + 0.2 === 0.3`

Actually, it returns false, which counters people's institution. The reason is that JS use 64-bit floating point representation, whose problem is that numbers are represented in this format as a whole number times a power of two; rational numbers (such as 0.1, which is 1/10) whose denominator is not a power of two cannot be exactly represented.

In this way, when we have to compare floats, the approriate way is to:

```JavaScript
Number.prototype.compare = function(f) {
    return Math.abs(f - this) < Number.EPSILON  
};

console.log(0.3.compare(0.1 + 0.2));   //true
```
