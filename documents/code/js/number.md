# Number in JS

## Precision

### 0.1 + 0.2 === 0.3

Actually, it returns false, which counters people's institution. The reason is that JS use 64-bit floating point representation, whose problem is that numbers are represented in this format as a whole number times a power of two; rational numbers (such as 0.1, which is 1/10) whose denominator is not a power of two cannot be exactly represented.

In this way, when we have to compare floats, the appropriate way is to:

```JS
Number.prototype.compare = f => Math.abs(f - this) < Number.EPSILON;
console.log(0.3.compare(0.1 + 0.2));   //true
```

### Max integer

Base on IEEE754, The max safe number in JS is `Math.pow(2, 53) - 1`, we can access it by `Number.MAX_SAFE_INTEGER`.

Over this number, the operation will be unsafe, for example:

```JS
console.log(Math.pow(2, 53) - 1 === Math.pow(2, 53) + 1);   // false
console.log(Math.pow(2, 54) - 1 === Math.pow(2, 54) + 1);   // true
```

## Bitwise

### ^ XOR

- `a ^ b`: Returns a 1 in each bit position for which the corresponding bits of either but not both operands are 1s.

There is an important trait of XOR operation: `a=a^b^b`.

In practice, XOR operation has application scenarios as below:

1. invert specific bit: For example, if we want to invert 5th and 6th bit in `10100110`, we can do XOR it with `00001100`.

2. Exchange Value without temporary variable:

```js
var a=0b10100001;
var b=0b00000110;
a=a^b; 　　//a=10100111
b=b^a; 　　//b=10100001
a=a^b; 　　//a=00000110
```

3. encryption. There is simple example as below base on `a=a^b^b`:

```js
const encryptAndDecrypt = (str, key) => {
    const keyCode = Array.from(key).map(char => char.charCodeAt(0)).join('').substr(0, 2);  // < 128
    return Array.from(str).map(char => String.fromCharCode(char.charCodeAt(0) ^ keyCode)).join('');
};
```
