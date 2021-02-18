# Prototype

Unlike some of class-based languages, like Java and Cpp, JS uses prototype chain to implement inheritance.

JavaScript only has one construct: objects.

## `__proto__` and `prototype`

Each object has a private property which holds a link to another object called its prototype.

The constructor function has `__proto__` and its instance has `prototype` property, they point to the same prototype object.

The basic structure is as below:

<img src="../assets/base_prototype.png" width="400"/>

That prototype object has a prototype of its own, and so on until an object is reached with null as its prototype. By definition, null has no prototype, and acts as the final link in this prototype chain.

The link looks like as below:

<img src="../assets/prototype_chain.png" />

There is an example to use prototype to inherit properties:

```ts
function Person() {
    this.name = 'Bert';
}

function Man() {
    this.gender = 'male';
}

Man.prototype = new Person();
Man.prototype.constructor = Man;

const man = new Man();
```

### `instanceof` and `Object.isPrototypeOf`

`isPrototypeOf()` differs from the `instanceof` operator. In the expression "object instanceof AFunction", the object prototype chain is checked against AFunction.prototype, not against AFunction itself.

```ts
a instanceof A
A.prototype.isPrototypeOf(a);

a.__proto__ === A.prototype
```

## `constructor`

The `constructor` property returns a reference to the Object constructor function that created the instance object.

Note that the value of this property is a reference to the function itself, not a string containing the function's name.

There is an example to use it:

```ts
function Person() {
    this.name = 'Bert';
}

function Man() {
    Person.call(this);
    this.gender = 'male';
}

const man = new Man();
```

Notice: Unlike the object defined in `prototype` which will be shared within its all instances, the properties defined in `constructor` will create an object in each instantiation.

## Combination Inheritance

Combination inheritance combines prototype chaining and constructor stealing to get the best of each approach.

The basic idea is to use prototype chaining to inherit properties and methods on the prototype, and to use constructor stealing to inherit instance properties.

This allows function reuse by defining methods on the prototype and allows each instance to have its own properties. Consider the following:

```ts
function Person() {
    this.name = 'Bert';
}

Person.prototype.showName = function() {
    console.log(this.name);
};

function Man() {
    // inherit properties of Person
    Person.call(this);
    this.gender = 'male';
}

Man.prototype = new Person();
Man.prototype.constructor = Man;

Man.prototype.showGender = function() {
    console.log(this.gender);
}

const man = new Man();
```

## `class`

JavaScript classes, introduced in ECMAScript 2015, are primarily syntactical sugar over JavaScript's existing prototype-based inheritance.

The class syntax does not introduce a new object-oriented inheritance model to JavaScript.

It's always used with `new`, see more in [here](https://github.com/Bert0324/code-playground/blob/master/js/this.md)

## Reference

- <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Inheritance_and_the_prototype_chain>
- <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/constructor>
- <https://juejin.im/post/5c820d0e6fb9a04a0c2f3e12>
- <https://juejin.im/post/5bf5580c51882511a852881f>
- <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes>
