# Number in JS

## 0.1 + 0.2 === 0.3

Actually, it returns false, which counters people's institution. The reason is that JS use 64-bit floating point representation, whose problem is that numbers are represented in this format as a whole number times a power of two; rational numbers (such as 0.1, which is 1/10) whose denominator is not a power of two cannot be exactly represented.

In this way, when we have to compare floats, the appropriate way is to:

```JS
Number.prototype.compare = f => Math.abs(f - this) < Number.EPSILON;
console.log(0.3.compare(0.1 + 0.2));   //true
```

## Max integer

Base on IEEE754, The max safe number in JS is `Math.pow(2, 53) - 1`, we can access it by `Number.MAX_SAFE_INTEGER`.

Over this number, the operation will be unsafe, for example:

```JS
console.log(Math.pow(2, 53) - 1 === Math.pow(2, 53) + 1);   // false
console.log(Math.pow(2, 54) - 1 === Math.pow(2, 54) + 1);   // true
```
